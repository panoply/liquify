import LiquidClient from './src/languages/liquid'

/**
 * vscode-liquid
 *
 * @author Nikolas Savvidis
 * @version 2.4.0
 */

let client

exports.activate = context => (client = LiquidClient(context))

exports.deactivate = () => {

  for (const [ index, server ] of Object.entries(client)) {
    if (index !== 'documentSelector') {
      if (!client.length > 0) {
        return undefined
      } else {
        return server.stop()
      }
    }
  }

}
