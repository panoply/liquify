// @ts-nocheck

import { DidChangeConfigurationNotification, TextDocumentSyncKind, createConnection, ProposedFeatures } from 'vscode-languageserver'
import { Server } from './provide/server'
import { Service } from './provide/service'
import { Document } from './provide/document'
import { LiquidParser } from '@liquify/liquid-parser'
import { runAsync, runSync } from './utils/runners'
import { mark, stop } from 'marky'

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
        '|',
        '.',
        '<'
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

  if (Server.hasConfigurationCapability) {
    connection.client.register(DidChangeConfigurationNotification.type, undefined)
  }

  if (Server.hasWorkspaceFolderCapability) {
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

  const document = Document.create(textDocument)(LiquidParser)

  if (!document) return null

  console.log(`PARSED IN ${stop('onDidOpenTextDocument').duration}`)

  return
  if (Server.provider.validateOnOpen) {

    Service.doValidation(document).then(({
      uri
      , diagnostics
    }) => (
      connection.sendDiagnostics({
        uri,
        diagnostics
      })
    ))

  }
})

/* ---------------------------------------------------------------- */
/* onDidChangeTextDocument                                          */
/* ---------------------------------------------------------------- */

connection.onDidChangeTextDocument(({ contentChanges, textDocument }) => {

  mark('onDidChangeTextDocument')
  console.log('onDidChangeTextDocument', textDocument.uri)

  const document = Document.update(textDocument, contentChanges)

  if (!document) return null

  // Parser.increment(document, contentChanges)
  const parsed = Parser(document, Server.specification).scan()
  console.log(parsed.ast)

  // console.log(documents)

  // console.log(document)
  console.log(`PARSED IN ${stop('onDidChangeTextDocument').duration}`)

  // Document creation is executed via the `onDidOpenTextDocument`
  // the model will be passed to the Parser
  // console.log(documents)
  // await Parser.increment(document, changes)

  return
  Service.doValidation(document).then(({
    uri
    , diagnostics
  }) => (
    connection.sendDiagnostics({
      uri,
      diagnostics
    })
  ))

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

/* ---------------------------------------------------------------- */
/* onDocumentRangeFormatting                                        */
/* ---------------------------------------------------------------- */

connection.onDocumentRangeFormatting((
  { textDocument: { uri } }
  , token
) => !Server.provider.format || runSync(() => {

  return null

  const document = documents.get(uri)

  if (!document?.uri) return null

  return Service.doFormat(document, Server.format)

}, null, `Error while computing formatting for ${uri}`, token))

/* ---------------------------------------------------------------- */
/* onHover                                                          */
/* ---------------------------------------------------------------- */

connection.onHover(
  ({
    position
    , textDocument: { uri }
  }, token) => !Server.provider.hover || runSync(() => {

    return null

    const document = documents.get(uri)

    if (!document?.uri) return null

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

  return null

  const document = documents.get(uri)

  if (!document.uri) return null

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
  return null

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
