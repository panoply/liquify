/* eslint
  key-spacing: ["error", {
    "align": {
      "beforeColon": true,
      "afterColon": true,
      "on": "colon"
    }
  }]
*/

import chalk from 'chalk'
import { Console } from 'console'

export const { log, error } = new Console({
  stdout : process.stdout,
  stderr : process.stderr
})

export const perf = require('execution-time')()

export const tree = [
  {
    start : text => log(chalk`{grey.dim ┌──} {cyan ${text}}`),
    while : text => log(chalk`{grey.dim ├──} ${text}`),
    end   : text => log(chalk`{grey.dim └──} ${text}`)
  },
  {
    while : text => log(chalk`{grey.dim │  ├──} ${text}`),
    end   : text => log(chalk`{grey.dim │  └──} ${text}`)
  },
  {
    while : text => log(chalk`{grey.dim │  │  ├──} ${text}`),
    end   : text => log(chalk`{grey.dim │  │  └──} ${text}`)
  }
]

/**
 * Info box - Use to show breakdown of current command executed
 * via the command prompt
 */
export const info = {
  task    : text => chalk`{magentaBright  Execute}{dim :} ${text}`,
  name    : text => chalk`{magentaBright  Package}{dim :} ${text}`,
  version : text => chalk`{magentaBright  Version}{dim :} ${text}`,
  repo    : text => chalk`{magentaBright   Remote}{dim :} ${text}`,
  package : text => chalk`{magentaBright  Located}{dim :} ${text}`
}

/**
 * Stats Console - Show basic statistics about the project and packages
 * within the project.
 */
export const stats = {
  pkgCount: text => chalk`{magentaBright  Packages No.}{dim :} ${text}`
}

/**
 * Prompt specific logging, used to describe what each command
 * does when executing via the prompt
 */
export const prompt = {
  command : text => chalk`${text} ${' '.repeat(15 - text.length)}`,
  message : text => chalk`{gray.italic ${text}`
}

/**
 * Status Results - Alt-code infused logging that is generally shown when
 * working with files in watch mode
 */
export const status = {
  success : text => log(chalk`{greenBright ✔} {green ${text}}`),
  error   : text => log(chalk`{redBright ✘} {red ${text}}`),
  warning : text => log(chalk`{yellow.bold !!} {yellow ${text}}`)
}

/**
 * Errors - Different error logs for when an issue occurs within execution
 * process. There are multiple different error logs.
 */
export const errors = {
  inError   : file => text => log(chalk`{redBright Error} in {red ${file}}\n${text}\n`),
  unknown   : text => log(chalk`{red Unknown}: command not found: '{red ${text}}'`),
  lineError : text => log(chalk`{red Unknown}: command not found: '{red ${text}}'`)

}