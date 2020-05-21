import cli from './cli'
import vscode from './packages/clients/vscode/rollup.config'
import server from './packages/server/rollup.config'

export default [
  ...cli,
  ...vscode,
  ...server
]
