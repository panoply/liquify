// @ts-nocheck

import { DidChangeConfigurationNotification, TextDocumentSyncKind } from 'vscode-languageserver'
import { LiquidDocuments } from './provide/document'
import { connection, Server } from './export'
import { runAsync, runSync } from './utils/runners'
import { performance } from 'perf_hooks'
import { LiquidService } from './provide/service'
import * as Parse from './parser/export'

/**
 * Liquid Service
 */
const service = new LiquidService()

/**
 * Text Documents
 */
const documents = new LiquidDocuments()

/* ---------------------------------------------------------------- */
/* onInitialize                                                     */
/* ---------------------------------------------------------------- */

/**
 * @param {import('vscode-languageserver').InitializeParams} initializeParams
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
    documentRangeFormattingProvider: false,
    hoverProvider: false,
    completionProvider: {
      resolveProvider: false,
      triggerCharacters: [ '"', ':', '|', '.', '<' ]
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
        'liquid.changeEngine'
      ]
    }
  })

))

/* ---------------------------------------------------------------- */
/* onInitialized                                                    */
/* ---------------------------------------------------------------- */

connection.onInitialized(() => {

  if (Server.hasConfigurationCapability) {
    connection.client.register(DidChangeConfigurationNotification.type, undefined)
  }

  if (Server.hasWorkspaceFolderCapability) {
    connection.workspace.onDidChangeWorkspaceFolders(event => {
      connection.console.log('Workspace folder change event received.')
    })
  }

  return service.configure(Server.service)

})

/* ---------------------------------------------------------------- */
/* onDidChangeConfiguration                                         */
/* ---------------------------------------------------------------- */

connection.onDidChangeConfiguration(change => {

  if (Server.hasConfigurationCapability) {
    Server.settings.clear()
  } else {
    globalSettings = (change.settings.liquid || Server.settings)
  }

  if (change.settings) {
    Server.configure('onDidChangeConfiguration', change.settings)
  }

  console.log(change)
  // Server.documents.all().forEach(service.doValidation)

})

/* ---------------------------------------------------------------- */
/* onDidOpenTextDocument                                            */
/* ---------------------------------------------------------------- */
connection.onDidOpenTextDocument(async ({ textDocument }) => (

  documents.create(textDocument)(Parse.scan)

  // console.log(parsed)
  /* return service.doValidation(document, parsed).then(({
      uri
      , diagnostics
    }) => (
      connection.sendDiagnostics({
        uri,
        diagnostics
      })
    )) */

))

/* ---------------------------------------------------------------- */
/* onDidChangeTextDocument                                          */
/* ---------------------------------------------------------------- */

connection.onDidChangeTextDocument(async ({
  contentChanges
  , textDocument: { uri }
}) => {

  const v1 = performance.now()

  const { document, ast } = documents.get(uri)

  if (!document) return null

  const changes = documents.update(document, contentChanges)
  const parsed = await Parse.increment(document, ast, ...changes)

  // console.log(parsed)
  const v2 = performance.now()

  // console.log(parsed)

  // return connection.console.log('total time  taken = ' + (v2 - v1) + 'milliseconds')

  // return Documents.set(textDocument.uri)

  // const parsed = await Parse(document, contentChanges)

  service.doValidation(document, parsed).then(({
    uri
    , diagnostics
  }) => (
    connection.sendDiagnostics({
      uri,
      diagnostics
    })
  ))

  // const v2 = performance.now()

  console.log('total time  taken = ' + (v2 - v1) + 'milliseconds')

})

/* ---------------------------------------------------------------- */
/* onDidClose                                                       */
/* ---------------------------------------------------------------- */

connection.onDidCloseTextDocument(params => {

  /// Documents.remove(uri).then(() => Server.settings.delete(uri))

})

/* ---------------------------------------------------------------- */
/* onDidChangeWatchedFiles                                          */
/* ---------------------------------------------------------------- */

connection.onDidChangeWatchedFiles(change => (

  Server.configure('onDidChangeWatchedFiles', change)

))

/* ---------------------------------------------------------------- */
/* onDocumentRangeFormatting                                        */
/* ---------------------------------------------------------------- */

connection.onDocumentRangeFormatting(
  ({
    textDocument: { uri }
  }, token) => !Server.provider.format || runSync(() => {

    const { document } = documents.get(uri)

    if (!document || document.languageId !== 'liquid') return null

    return service.doFormat(document, Server.format)

  }, null, `Error while computing formatting for ${uri}`, token)
)

/* ---------------------------------------------------------------- */
/* onHover                                                          */
/* ---------------------------------------------------------------- */

connection.onHover(
  ({
    position
    , textDocument: { uri }
  }, token) => !Server.provider.hover || runSync(() => {

    const { document } = documents.get(uri)

    if (!document) return null

    return service.doHover(document, position)

  }, null, `Error while computing hover for ${uri}`, token)
)

/* ---------------------------------------------------------------- */
/* onCompletion                                                     */
/* ---------------------------------------------------------------- */

connection.onCompletion(
  ({
    position
    , textDocument: { uri }
    , context
  }, token) => !Server.provider.completion || runAsync(async () => {

    const { document } = documents.get(uri)

    if (!document) return null

    const onComplete = await service.doComplete(document, position, context)
    return onComplete

  }, null, `Error while computing completion for ${uri}`, token)
)

/* ---------------------------------------------------------------- */
/* onCompletionResolve                                              */
/* ---------------------------------------------------------------- */

connection.onCompletionResolve(
  (
    item
    , token
  ) => runSync(() => {

    return service.doCompleteResolve(item)

  }, item, 'Error while resolving completion proposal', token)
)

/* ---------------------------------------------------------------- */
/* Connection Listener                                              */
/* ---------------------------------------------------------------- */

connection.listen()
