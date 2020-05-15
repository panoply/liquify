import inquirer from 'inquirer'
import figlet from 'figlet'
import boxen from 'boxen'
import chalk from 'chalk'
import clear from 'console-clear'
import { getLists } from './choices'
import execa from 'execa'

const { log } = console

/**
 * Intialize default launch operations list
 *
 * @param {import('argv.config.json')} config
 * @param {import('types').Options} options
 */
export default async function (config, options) {

  clear(true)

  const { argv, info, path } = options

  if (!argv.nobanner) {
    log(
      chalk`{cyan ${figlet.textSync('Liquify CLI', {
        font: 'Slant',
        horizontalLayout: 'controlled smushing'
      })}}\n`
    )
  }

  if (argv.task && info) {
    log(boxen([
      chalk`{magentaBright  Execute}{dim :} ${argv.task}                              `,
      chalk`{magentaBright  Package}{dim :} ${info.name}                      `,
      chalk`{magentaBright  Version}{dim :} ${info.version}                   `,
      chalk`{magentaBright   Remote}{dim :} ${info.repo}                      `,
      chalk`{magentaBright  Located}{dim :} ${path.pkg}                      `
    ].join('\n'), {
      padding: 0,
      borderColor: 'gray',
      dimBorder: true,
      borderStyle: {
        topLeft: ' ',
        topRight: ' ',
        bottomLeft: ' ',
        bottomRight: ' ',
        horizontal: '-',
        vertical: ' '
      }
    }))
  }

  const { execute = { pkg: null, task: null, option: null } } = options

  execute.pkg = await inquirer.prompt(getLists(argv.pkg, config.packages))
  execute.task = await inquirer.prompt(getLists(argv.task, config.tasks))
  const [ next ] = config.tasks.choices.filter(({
    name
  }) => (name === execute.task.name || name === execute.task.task))

  if (next && next.choices) {
    execute.option = await inquirer.prompt(getLists(null, next))
  }

  if (execute.task.name === 'build') {
    await execa('pnpm', [
      'run',
      'build',
      '--filter',
      './packages/clients/vscode'
    ], {
      stdio: 'inherit'
    })
  }

}
