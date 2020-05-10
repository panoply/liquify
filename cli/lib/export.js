import Crypto from 'cryptorjs'
import chalk from 'chalk'

/**
 * The `package.json` file
 */
export const pkg = require('./../package.json')

/**
 * File Encryption `IV` and export
 */
export const crypto = new Crypto('sissel siv')

/**
 * Console Log
 */
export const { log } = console

/**
 * Error Colours
 */
export const error = chalk.redBright
