import { join } from 'path';
import { existsSync } from 'fs';
import { workspace, commands, Uri, ExtensionContext } from 'vscode';
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind
} from 'vscode-languageclient/node';

/**
 * Execute release notes
 *
 * Displays a release notes page for new versions
 */
function getReleaseNotes () {

  const uri = Uri.file(join(__dirname, './release', 'v2.4.0.md'));
  commands.executeCommand('markdown.showPreview', uri);
}

/**
 * Workspace Root
 *
 * Returns the absolute path to current workspace root
 */
function getWorkspaceRoot (document = undefined) {

  const { workspaceFolders } = workspace;

  if (!workspace.workspaceFolders || workspaceFolders.length === 0) return;
  if (!document) return workspaceFolders[0].uri.fsPath;

  const folder = workspace.getWorkspaceFolder(document.uri);

  if (!folder) return;

  return folder.uri.fsPath;

}

/**
 * Get liquidrc path
 *
 * Returns the `.liquidrc.json` file path.
 */
function getLiquidrcPath (): string | false {

  const root = getWorkspaceRoot();
  const file = join(root, '.liquidrc.json');
  const exist = existsSync(file);

  if (!exist) return false;

  return file;

}

export function LiquidClient (_context: ExtensionContext): LanguageClient {

  commands.registerCommand('liquid.releaseNotes', getReleaseNotes);

  /**
   * Server Module Path
   */
  const module = join(process.env.SERVER_PATH, 'packages/server/package/server.js');

  /**
   * Language Server Name
   */
  const name = 'Liquid Language Server';

  /**
   * Language Server Options
   */
  const server: ServerOptions = {
    run: {
      module,
      transport: TransportKind.ipc
    },
    debug: {
      module,
      transport: TransportKind.ipc,
      options: {
        execArgv: [ '--nolazy', '--inspect=6009' ]
      }
    }
  };

  /**
   * Language Client Options
   */
  const client: LanguageClientOptions = {
    diagnosticCollectionName: name,
    outputChannelName: name,
    documentSelector: [
      {
        scheme: 'file',
        language: 'liquid'
      },
      {
        scheme: 'untitled',
        language: 'liquid'
      },
      {
        scheme: 'file',
        language: 'liquid-shopify'
      },
      {
        scheme: 'file',
        language: 'liquid-jekyll'
      },
      {
        scheme: 'untitled',
        language: 'liquid-jekyll'
      }
    ],
    synchronize: {
      fileEvents: workspace.createFileSystemWatcher('**/.liquidrc.json'),
      configurationSection: [

        /**
         * Liquid Settings
         */
        'liquid',

        /**
         * VSCode editor based settings
         */
        'editor.tabSize',
        'editor.wordWrapColumn',

        /**
         * VSCode Language format settings
         */
        'html.format',
        'json.format',
        'javascript.format'

      ]
    },
    initializationOptions: {

      /**
       * Runtime configuration `.liquidrc` file path
       */
      rcfile: getLiquidrcPath(),

      /**
       * Embedded Languages
       *
       * *IMPORTANT*
       *
       * Language set to `false` are not yet implemented
       * so setting `true` will not active their Language Servers.
       */
      service: {
        json: true,
        html: true,
        css: true,
        javascript: true, // NOT YET IMPLEMENTED
        scss: false // NOT YET IMPLEMENTED
      }

    }
  };

  return new LanguageClient(
    'liquid',
    name,
    server,
    client
  );

}
