import chalk from 'chalk'
import figlet from 'figlet'

const { log } = console

/**
 * Error handler which helps keeps error logging clean and
 * easy to understand
 *
 * @param {string} file
 * @returns {(error: string) => void }
 */
export const errorHandler = file => error => (
  log(chalk`{redBright Error} in {red ${file}}\n${error}\n`)
)

/**
 * Error handler which helps keeps error logging clean and
 * easy to understand
 *
 * @param {string} command
 */
export const cmdError = command => (
  chalk`{red liquify}: command not found: '{red ${command}}'`
)
