import configs from '../../argv.config.json'

/**
 * Argument Config
 */
export const config = {
  ...configs,
  packages: {}
}

/**
 * Execution Paths
 */
export const path = {
  cwd: process.cwd(),
  dirname: null,
  root: null
}

/**
 * Command
 */
export const command = {
  argv: null,
  package: null,
  flags: null
}
