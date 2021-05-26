// @ts-nocheck

import {
  DidChangeConfigurationNotification,
  TextDocumentSyncKind,
  createConnection,
  ProposedFeatures
  , TextEdit
} from 'vscode-languageserver'

import Server from 'provide/server'
import Service from 'provide/service'
import { Document } from 'provide/document'
import { Parser } from 'provide/parser'
import { runAsync, runSync } from 'utils/runners'
import { mark, stop } from 'marky'
import { repeat } from 'lodash'

/* ---------------------------------------------------------------- */
/* Providers                                                        */
/* ---------------------------------------------------------------- */

/**
 * Server Connection
 */
const connection = createConnection(ProposedFeatures.all)

/**
 * Liquid Documents
 */
const { documents } = Document

/* ---------------------------------------------------------------- */
/* onInitialize                                                     */
/* ---------------------------------------------------------------- */

/**
 * @param {LSP.InitializeParams} initializeParams
 */
connection.onInitialize(initializeParams => (

  Server.capabilities(initializeParams, {
    textDocumentSync: {
      openClose: true,
      change: TextDocumentSyncKind.Incremental,
      willSaveWaitUntil: true,
      save: {
        includeText: false
      }
    },
    documentOnTypeFormattingProvider: {
      moreTriggerCharacter: [
        ',',
        '|',
        ':'
      ]
    },
    documentRangeFormattingProvider: true,
    hoverProvider: true,
    documentLinkProvider: {
      resolveProvider: true
    },
    /* codeLensProvider: {
      workDoneProgress: true,
      resolveProvider: true
    }, */
    completionProvider: {
      resolveProvider: true,
      triggerCharacters: [
        '"',
        '\'',
        ':',
        '.',
        '<',
        '%',
        '|'
      ]
    },
    implementationProvider: true,
    executeCommandProvider: {
      commands: [
        'liquid.liquidrc',
        'liquid.enableFormatting',
        'liquid.disableFormatting',
        'liquid.formatDocument',
        'liquid.formatSelection',
        'liquid.toggleOutput',
        'liquid.enableValidation',
        'liquid.disableValidation',
        'liquid.changeEngine',
        'liquid.codelens',
        'liquid.updateWizard'
      ]
    }
  })

))

/* ---------------------------------------------------------------- */
/* onInitialized                                                    */
/* ---------------------------------------------------------------- */

connection.onInitialized(() => {

  connection.console.log('onInitialized')

  if (Server.capability.hasConfigurationCapability) {
    connection.client.register(DidChangeConfigurationNotification.type, undefined)
  }

  if (Server.capability.hasWorkspaceFolderCapability) {
    connection.workspace.onDidChangeWorkspaceFolders(event => {
      connection.console.log('Workspace folder change event received.')
    })
  }

  Service.configure(Server.service)

})

/* ---------------------------------------------------------------- */
/* onDidChangeConfiguration                                         */
/* ---------------------------------------------------------------- */

connection.onDidChangeConfiguration(change => {

  connection.console.log('onDidChangeConfiguration')

  Server.configure('onDidChangeConfiguration', change.settings)

  // documents.forEach(Service.doValidation)

})

/* ---------------------------------------------------------------- */
/* onDidOpenTextDocument                                            */
/* ---------------------------------------------------------------- */
connection.onDidOpenTextDocument(({ textDocument }) => {

  connection.console.log('onDidOpenTextDocument')

  mark('onDidOpenTextDocument')

  const document = Document.create(textDocument)

  if (!document?.textDocument?.uri) return null

  console.log(`PARSED IN ${stop('onDidOpenTextDocument').duration}`)

  if (Server.provider.validateOnOpen) {
    return Service.doValidation(document).then(({
      uri
      , diagnostics
    }) => {

      return connection.sendDiagnostics({
        uri,
        diagnostics
      })
    })
  }
})

/* ---------------------------------------------------------------- */
/* onDidChangeTextDocument                                          */
/* ---------------------------------------------------------------- */

connection.onDidChangeTextDocument(({ contentChanges, textDocument }) => {

  mark('onDidChangeTextDocument')

  const document = Document.update(textDocument, contentChanges)

  if (!document?.textDocument?.uri) return null

  Parser.parse(document)

  console.log(`PARSED IN ${stop('onDidChangeTextDocument').duration}`)

  console.log(document.ast, Parser.errors)

  return connection.sendDiagnostics({
    uri: document.textDocument.uri,
    diagnostics: Parser.errors
  })

  // console.log(document)

})

/* ---------------------------------------------------------------- */
/* onDidClose                                                       */
/* ---------------------------------------------------------------- */

connection.onDidCloseTextDocument(({ textDocument: { uri } }) => (

  documents.delete(uri)

))

/* ---------------------------------------------------------------- */
/* onDidChangeWatchedFiles                                          */
/* ---------------------------------------------------------------- */

connection.onDidChangeWatchedFiles(change => {

  connection.console.log('onDidChangeWatchedFiles')

  Server.configure('onDidChangeWatchedFiles', change)

})

/* -------------------------------------------- */
/* onDocumentOnTypeFormatting                   */
/* -------------------------------------------- */

connection.onDocumentOnTypeFormatting((
  {
    textDocument: { uri }
    , ch
    , position
    , options
  }
  , token
) => !Server.provider.format || runSync(() => {

  const document = documents.get(uri)

  if (!document?.textDocument?.uri) return null

  return Service.doFormatOnType(document, ch, position, options)

}, null, `Error while computing on type formatting for ${uri}`, token))

/* ---------------------------------------------------------------- */
/* onDocumentRangeFormatting                                        */
/* ---------------------------------------------------------------- */

connection.onDocumentRangeFormatting((
  { textDocument: { uri } }
  , token
) => !Server.provider.format || runSync(() => {

  const document = documents.get(uri)

  if (!document?.textDocument?.uri) return null

  return Service.doFormat(document)

}, null, `Error while computing formatting for ${uri}`, token))

/* ---------------------------------------------------------------- */
/* onHover                                                          */
/* ---------------------------------------------------------------- */

connection.onHover(
  ({
    position
    , textDocument: { uri }
  }, token) => !Server.provider.hover || runSync(() => {

    const document = documents.get(uri)

    if (!document?.textDocument?.uri) return null

    return Service.doHover(document, position)

  }, null, `Error while computing hover for ${uri}`, token)
)

/* ---------------------------------------------------------------- */
/* onCodeLens                                                       */
/* ---------------------------------------------------------------- */

/* connection.onCodeLens(
  ({
    partialResultToken,
    textDocument: { uri }
  }, token) => runSync(() => {

    const document = documents.get(uri)

    if (!document.uri) return null

    return Document.includes(uri)

  }, null, `Error while computing completion for ${uri}`, token)
) */

/* ---------------------------------------------------------------- */
/* onCodeLensResolve                                                */
/* ---------------------------------------------------------------- */

/* connection.onCodeLensResolve(
  (
    item
    , token
  ) => runSync(() => {

    return item

  }, item, 'Error while resolving completion proposal', token)
)
*/
/* ---------------------------------------------------------------- */
/* onDocumentLinks                                            */
/* ---------------------------------------------------------------- */

connection.onDocumentLinks((
  { textDocument: { uri } }
  , token
) => runSync(() => {

  return null

  const document = documents.get(uri)

  if (!document.uri) return null

  return Parser.scanner.getLinks()

}, null, `Error while computing completion for ${uri}`, token))

/* ---------------------------------------------------------------- */
/* onDocumentLinkResolve                                            */
/* ---------------------------------------------------------------- */

connection.onDocumentLinkResolve((
  item
  , token
) => runSync(() => {

  return null

  return item

}, item, 'Error while resolving completion proposal', token))

/* ---------------------------------------------------------------- */
/* onCompletion                                                     */
/* ---------------------------------------------------------------- */

connection.onCompletion((
  {
    position
    , textDocument: { uri }
    , context
  }, token
) => !Server.provider.completion || runAsync(async () => {

  const document = documents.get(uri)

  if (!document?.textDocument?.uri) return null

  const onComplete = await Service.doComplete(document, position, context)

  return onComplete

}, null, `Error while computing completion for ${uri}`, token))

/* ---------------------------------------------------------------- */
/* onCompletionResolve                                              */
/* ---------------------------------------------------------------- */

connection.onCompletionResolve((
  item
  , token
) => runSync(() => {

  return Service.doCompleteResolve(item)

}, item, 'Error while resolving completion proposal', token))

/* ---------------------------------------------------------------- */
/* onExecuteCommand                                                 */
/* ---------------------------------------------------------------- */

connection.onExecuteCommand((
  item
  , token
) => runSync(() => {

  return null

  return item.arguments[0]

}, item, 'Error while resolving completion proposal', token))

/* ---------------------------------------------------------------- */
/* Connection Listener                                              */
/* ---------------------------------------------------------------- */

connection.listen()
