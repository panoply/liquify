import { join } from 'path';
import { workspace, commands, Uri, ExtensionContext } from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from 'vscode-languageclient/node';

/**
 * Execute release notes
 *
 * Displays a release notes page for new versions
 */
function getReleaseNotes () {

  const uri = Uri.file(join(__dirname, './release', 'v1.0.0-beta.1md'));
  commands.executeCommand('markdown.showPreview', uri);
}

export function LiquidClient (context: ExtensionContext): LanguageClient {

  commands.registerCommand('liquid.releaseNotes', getReleaseNotes);

  /**
   * Server Module Path
   */
  const module = context.asAbsolutePath('../../' + join(process.cwd(), '/packages/server/package/server.js'));

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
      }
    ],
    synchronize: {
      fileEvents: [
        // workspace.createFileSystemWatcher('**/.env'),
        workspace.createFileSystemWatcher('**/.liquidr{c,c.js,c.yaml,c.yml,c.json}')
        // workspace.createFileSystemWatcher('**/.editorconfig'),
        // workspace.createFileSystemWatcher('**/.jsbeautifyr{c,c.js,c.yaml,c.yml,c.json}'),
        // workspace.createFileSystemWatcher('**/.prettier{c,c.js,c.yaml,c.yml,c.json}'),
        // workspace.createFileSystemWatcher('**/.prettierignore'),
        // workspace.createFileSystemWatcher('**/package.json')
      ],
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
        'editor.formatOnSave',
        'editor.formatOnType',
        'editor.defaultFormatter',

        /**
         * VSCode Language Specific Options
         */
        '[json].defaultFormatter',
        '[javascript].defaultFormatter',
        '[css].defaultFormatter',

        /**
         * VSCode Language format settings
         */
        'html.format',
        'json.format',
        'javascript.format',

        /**
         * JSBeautify format settings
         */
        'beautify',

        /**
         * Prettier format settings
         */
        'prettier'

      ]
    },
    initializationOptions: {

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
        css: true,
        scss: false, // NOT YET IMPLEMENTED
        javascript: false // NOT YET IMPLEMENTED
      }

    }
  };

  return new LanguageClient('liquid', name, server, client);

}
