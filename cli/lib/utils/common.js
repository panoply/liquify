import chalk from 'chalk'

/* -------------------------------------------- */
/*                   CONSTANTS                  */
/* -------------------------------------------- */

/**
 * The `package.json` file
 */
export const pkg = require('../../package.json')

/**
 * Console Log destruct
 */
export const { log } = console

/* -------------------------------------------- */
/*                   FUNCTIONS                  */
/* -------------------------------------------- */

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
