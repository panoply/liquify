
import { Parser } from 'provide/parser';
import { Server, Service } from 'export';
import { runAsync, runSync } from 'utils/runners';
import { mark, stop } from 'marky';
import {
  DidChangeConfigurationNotification,
  TextDocumentSyncKind,
  createConnection,
  ShowDocumentParams,
  ShowMessageRequest
} from 'vscode-languageserver/node';

/**
 * Server Connection
 */
const connection = createConnection();

/* ---------------------------------------------------------------- */
/* onInitialize                                                     */
/* ---------------------------------------------------------------- */
connection.onInitialize(initializeParams => {

  return Server.capabilities(initializeParams, {
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
    // documentLinkProvider: {
    //  resolveProvider: true
    // },
    /* codeLensProvider: {
      workDoneProgress: true,
      resolveProvider: true
    }, */
    signatureHelpProvider: {
      triggerCharacters: [
        '%',
        ':',
        ',',
        '('
      ]
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
        '{'
      ]
    },
    implementationProvider: true,
    linkedEditingRangeProvider: true,
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
  });

});

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

  // return Parser.reparse();

});

/* ---------------------------------------------------------------- */
/* onDidOpenTextDocument                                            */
/* ---------------------------------------------------------------- */
connection.onDidOpenTextDocument(async ({ textDocument }) => {

  const document = Parser.scan(textDocument);

  if (!document) return null;

  const diagnostics = await Service.doValidation(document);

  if (!diagnostics) return null;

  connection.sendDiagnostics(diagnostics);

});

/* PARSER ------------------------------------- */
/* ---------------------------------------------------------------- */
/* onDidChangeTextDocument                                          */
/* ---------------------------------------------------------------- */

connection.onDidChangeTextDocument(async (textDocumentChanges) => {

  mark('onDidChangeTextDocument');

  const document = Parser.update(textDocumentChanges);

  if (!document) return null;

  console.log(`PARSED IN ${stop('onDidChangeTextDocument').duration}`);

  const diagnostics = await Service.doValidation(document);

  if (!diagnostics) return null;

  connection.sendDiagnostics(diagnostics);

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

/* ---------------------------------------------------------------- */
/* onDocumentRangeFormatting                                        */
/* ---------------------------------------------------------------- */

connection.onDocumentRangeFormatting(async ({ textDocument: { uri } }) => {

  if (Server.provider.format) {

    const document = Parser.get(uri);

    if (!document) return null;

    try {

      return Service.doFormat(document, Server.formatting);

    } catch (error) {

      connection.console.error(error);

    }

  }

});

/* ---------------------------------------------------------------- */
/* onLinkedEditingRange                                             */
/* ---------------------------------------------------------------- */

connection.languages.onLinkedEditingRange(async ({ position, textDocument: { uri } }) => {

  const document = Parser.get(uri);

  if (!document) return null;

  return Service.doLinkedEditing(document, position);

});

/* ---------------------------------------------------------------- */
/* onHover                                                          */
/* ---------------------------------------------------------------- */

connection.onHover(async ({ position, textDocument: { uri } }) => {

  if (Server.provider.hover) {

    const document = Parser.get(uri);

    if (!document) return null;

    return Service.doHover(document, position);

  }

  return null;

});

/* ---------------------------------------------------------------- */
/* onSignatureHelp                                                  */
/* ---------------------------------------------------------------- */

connection.onSignatureHelp(async ({ textDocument: { uri }, position, context }) => {

  if (Server.provider.completion) {

    const document = Parser.get(uri);

    if (!document) return null;

    return Service.doSignature(document.node, context);

  }

  return null;

});

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

/* ---------------------------------------------------------------- */
/* onDocumentLinkResolve                                            */
/* ---------------------------------------------------------------- */

/* ---------------------------------------------------------------- */
/* onCompletion                                                     */
/* ---------------------------------------------------------------- */

connection.onCompletion(async ({ textDocument: { uri }, position, context }) => {

  if (Server.provider.completion) {

    const document = Parser.get(uri);

    if (!document) return null;

    return Service.doComplete(document, position, context);

  }

  return null;

});

/* ---------------------------------------------------------------- */
/* onCompletionResolve                                              */
/* ---------------------------------------------------------------- */

connection.onCompletionResolve((item) => {

  return Service.doCompleteResolve(item);

});

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
