// @ts-nocheck

import { Parser } from 'provide/parser';
import { Server, Service } from 'export';
import { runAsync, runSync } from 'utils/runners';
import { mark, stop } from 'marky';
import {
  DidChangeConfigurationNotification,
  TextDocumentSyncKind,
  createConnection
} from 'vscode-languageserver/node';

/**
 * Server Connection
 */
const connection = createConnection();

/* ---------------------------------------------------------------- */
/* onInitialize                                                     */
/* ---------------------------------------------------------------- */

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
      firstTriggerCharacter: '}',
      moreTriggerCharacter: [

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
    signatureHelpProvider: {
      triggerCharacters: [ ':', ',' ],
      isRetrigger: true,
      retriggerCharacters: [ ' ' ]
    },
    completionProvider: {
      resolveProvider: true,
      triggerCharacters: [
        '"',
        '\'',
        ':',
        '.',
        '<',
        '/',
        '%',
        '|',
        '{',
        ' '
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

));

/* ---------------------------------------------------------------- */
/* onInitialized                                                    */
/* ---------------------------------------------------------------- */

connection.onInitialized(() => {

  connection.console.log('onInitialized');

  if (Server.capability.hasConfigurationCapability) {
    connection.client.register(DidChangeConfigurationNotification.type, undefined);
  }

  if (Server.capability.hasWorkspaceFolderCapability) {
    connection.workspace.onDidChangeWorkspaceFolders(event => {
      connection.console.log('Workspace folder change event received.');
    });
  }

  Service.configure(Server.service);

});

/* ---------------------------------------------------------------- */
/* onDidChangeConfiguration                                         */
/* ---------------------------------------------------------------- */

connection.onDidChangeConfiguration(change => {

  connection.console.log('onDidChangeConfiguration');

  Server.configure('onDidChangeConfiguration', change.settings);

  // documents.forEach(Service.doValidation)

});

/* ---------------------------------------------------------------- */
/* onDidOpenTextDocument                                            */
/* ---------------------------------------------------------------- */
connection.onDidOpenTextDocument(({ textDocument }) => {

  // connection.console.log('onDidOpenTextDocument')

  mark('onDidOpenTextDocument');

  try {

    const document = Parser.scan(textDocument);

    // console.log(document)

    console.log(`PARSED IN ${stop('onDidOpenTextDocument').duration}`);

    if (!document) return null;

    if (Server.provider.validateOnOpen) {
      return Service.doValidation(document).then(connection.sendDiagnostics);
    }

  } catch (e) {
    console.log(e);
  }

});
/* PARSER ------------------------------------- */
/* ---------------------------------------------------------------- */
/* onDidChangeTextDocument                                          */
/* ---------------------------------------------------------------- */

connection.onDidChangeTextDocument((textDocumentChanges) => {

  mark('onDidChangeTextDocument');

  try {

    const document = Parser.update(textDocumentChanges);

    if (!document) return null;

    // console.log('executed', document);

    console.log(`PARSED IN ${stop('onDidChangeTextDocument').duration}`);

    return Service.doValidation(document).then(connection.sendDiagnostics);

  } catch (e) {

    console.log(e);
  }

});

/* ---------------------------------------------------------------- */
/* onDidClose                                                       */
/* ---------------------------------------------------------------- */

connection.onDidCloseTextDocument(({ textDocument: { uri } }) => (

  Parser.delete(uri)

));

/* ---------------------------------------------------------------- */
/* onDidChangeWatchedFiles                                          */
/* ---------------------------------------------------------------- */

connection.onDidChangeWatchedFiles(change => {

  connection.console.log('onDidChangeWatchedFiles');

  return Server.configure('onDidChangeWatchedFiles', change);

});

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
) => !Server.provider.formatOnType || runSync(() => {

  return null;
  const document = Parser.get(uri);

  if (!document) return null;

  return Service.doFormatOnType(document, ch, position, options);

}, null, `Error while computing on type formatting for ${uri}`, token));

/* ---------------------------------------------------------------- */
/* onDocumentRangeFormatting                                        */
/* ---------------------------------------------------------------- */

connection.onDocumentRangeFormatting((
  { textDocument: { uri } }
  , token
) => !Server.provider.format || runSync(() => {

  return null;

  const document = Parser.get(uri);

  if (!document) return null;

  return Service.doFormat(document);

}, null, `Error while computing range formatting for ${uri}`, token));

/* ---------------------------------------------------------------- */
/* onHover                                                          */
/* ---------------------------------------------------------------- */

connection.onHover(
  ({
    position
    , textDocument: { uri }
  }, token) => !Server.provider.hover || runAsync(async () => {

    return null;
    const document = Parser.get(uri);

    if (!document) return null;

    return Service.doHover(document, position);

  }, null, `Error while computing hover for ${uri}`, token)
);

/* ---------------------------------------------------------------- */
/* onSignatureHelp                                                  */
/* ---------------------------------------------------------------- */

connection.onSignatureHelp(
  ({
    position
    , textDocument: { uri }
    , context
  }, token) => runAsync(async () => {

    return null;

    const document = Parser.get(uri);

    if (!document) return null;

    return Service.doSignature(document, position, context);

  }, null, `Error while computing hover for ${uri}`, token)
);

/* ---------------------------------------------------------------- */
/* onCodeLens                                                       */
/* ---------------------------------------------------------------- */

/* connection.onCodeLens(
  ({
    partialResultToken,
    textDocument: { uri }
  }, token) => runSync(() => {

    const document = Parser.get(uri)

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

  return null;

}, null, `Error while computing completion for ${uri}`, token));

/* ---------------------------------------------------------------- */
/* onDocumentLinkResolve                                            */
/* ---------------------------------------------------------------- */

connection.onDocumentLinkResolve((
  item
  , token
) => runSync(() => {

  return null;

  // return item

}, item, 'Error while resolving completion proposal', token));

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

  return null;

  const document = Parser.get(uri);

  if (!document) return null;

  return Service.doComplete(document, position, context);

}, null, `Error while computing completion for ${uri}`, token));

/* ---------------------------------------------------------------- */
/* onCompletionResolve                                              */
/* ---------------------------------------------------------------- */

connection.onCompletionResolve((
  item
  , token
) => runSync(() => {

  return null;

  return Service.doCompleteResolve(item);

}, item, 'Error while resolving completion proposal', token));

/* ---------------------------------------------------------------- */
/* onExecuteCommand                                                 */
/* ---------------------------------------------------------------- */

connection.onExecuteCommand((
  item
  , token
) => runSync(() => {

  return null;

  return item.arguments[0];

}, item, 'Error while resolving completion proposal', token));

/* ---------------------------------------------------------------- */
/* Connection Listener                                              */
/* ---------------------------------------------------------------- */

connection.listen();
