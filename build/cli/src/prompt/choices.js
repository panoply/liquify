import chalk from 'chalk'
import { basename } from 'path'

const { log } = console

export const getLists = (command, { name, choices }) => ([
  {
    type: 'list',
    name,
    pageSize: 15,
    choices: choices.map(({ name, message }) => ([
      chalk`${basename(name)}`,
      chalk`${' '.repeat(20 - name.length)}`,
      chalk`{gray.italic ${message}}`
    ].join('')
    )),
    filter (value) {
      const getIndex = value.indexOf(' ')
      const subString = value.substring(0, getIndex).toLowerCase()
      return subString
    },
    when (answers) {
      if (command) {
        log(chalk`{green ?} {bold ${name}} {cyan ${command}}`)
        answers.name = command || name
        return false
      } else {
        return true
      }
    }
  }
])
