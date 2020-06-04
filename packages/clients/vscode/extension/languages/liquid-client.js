import {
  workspace, commands, Uri
} from 'vscode'
import { TransportKind, LanguageClient } from 'vscode-languageclient'
import { addspacer } from '../providers/tag-format'
import HTMLClient from './html-client'
import path from 'path'
import fs from 'fs'

/**
 * Get workspace root
 *
 * @param {object} document
 * @returns
 */
function getWorkspaceRoot (document = undefined) {

  const { workspaceFolders } = workspace
  if (!workspaceFolders || workspaceFolders.length === 0) return
  if (!document) {
    return workspaceFolders[0].uri.fsPath
  }

  const folder = workspace.getWorkspaceFolder(document.uri)
  if (!folder) return

  return folder.uri.fsPath

}

/**
 * Get the liquidrc file
 *
 * @param {string} root
 * @returns {string|boolean}
 */
function getLiquidrcFile () {

  const root = getWorkspaceRoot()

  const rcfile = path.join(root, '.liquidrc.json')
  if (!fs.existsSync(rcfile, 'utf8')) {
    return false
  }

  return rcfile

}

/**
 * Liquid Language Client
 *
 * Initializes the Liquid Language Server
 *
 * @export
 * @param {options}
 * @param {object} context
 */
export default (context) => {

  const { subscriptions } = context

  commands.registerCommand('liquid.releaseNotes', () => {
    const uri = Uri.file(path.join(__dirname, './../release', 'v2.4.0.md'))
    commands.executeCommand('markdown.showPreview', uri)
  })

  /**
   * Liquid Channel name
   */
  const name = 'Liquid Language Server'

  /**
   * Liquid Server Options
   *
   * @type { import("vscode-languageclient").ServerOptions }
   */
  const server = {
    run: {
      module: './../packages/server/package/server.js',
      transport: TransportKind.ipc
    },
    debug: {
      module: './../packages/server/package/server.js',
      transport: TransportKind.ipc,
      options: {
        execArgv: [ '--nolazy', '--inspect=6080' ]
      }
    }
  }

  /**
   * Liquid Client Options
   *
   * @type {import("vscode-languageclient").LanguageClientOptions}
   */
  const client = {
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
        scheme: 'untitled',
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
         * VS Codes native HTML Format settings
         */
        'editor.tabSize',
        'editor.wordWrapColumn',

        /**
         * Prettier
         */
        'prettier',

        /**
         * JS Beautify
         */
        'beautify'

        /**
         * NOT YET SUPPORTED
         * VS Codes native `HTML` Format settings

         'html.format',

         */

        /**
         * NOT YET SUPPORTED
         * VS Codes native `JSON` Format settings
         *

         'json.format',

        */

        /**
         * NOT YET SUPPORTED
         * VS Codes native `JavaScript` Format settings
         *

         'javascript.format',

        */

      ]
    },
    initializationOptions: {

      secret: 'sissel siv',

      /**
       * Runtime configuration `.liquidrc` file path
       */
      rcfile: getLiquidrcFile(),

      /**
       * Embedded Languages
       *
       * *IMPORTANT*
       * Language set to `false` are not yet implemented
       * so setting `true` will not active their Language Servers.
       */
      service: {
        json: true,
        css: false,
        scss: false, // NOT YET IMPLEMENTED
        javascript: false // NOT YET IMPLEMENTED
      }

    }

  }

  /**
   * Liquid Language Client
   */
  const liquid = new LanguageClient('liquid', name, server, client)

  const state = {}

  /**
   * Liquid Language Register
   */
  liquid.registerProposedFeatures()

  liquid.onReady().then(() => {

  })

  /**
   * Liquid Client Disposable
   */
  const dispose = liquid.start()

  /**
   * Liquid Disposable
   */
  subscriptions.push(dispose)
  subscriptions.push(addspacer(liquid))

  /**
   * HTML Language Client
   */
  const html = HTMLClient(client, subscriptions)

  /**
   * Return Client instances
   */
  return {
    liquid,
    html
  }

}
