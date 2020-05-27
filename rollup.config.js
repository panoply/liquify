// import prompt from './build/prompt/rollup.config'
// import rollup from './build/rollup/rollup.config'
import vscode from './packages/clients/vscode/rollup.config'
import server from './packages/server/rollup.config'
// import specs from './packages/specs/rollup.config'

export default [
  server,
  vscode
]
