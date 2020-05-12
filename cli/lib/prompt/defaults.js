import inquirer from 'inquirer'
import figlet from 'figlet'
import boxen from 'boxen'
import chalk from 'chalk'
import clear from 'console-clear'

const { log } = console

/**
 * Intialize default launch operations list
 *
 */
export default async (state, config) => {

  clear(true)

  log(
    chalk`{cyan ${figlet.textSync('Liquify CLI', {
      font: 'Slant',
      horizontalLayout: 'controlled smushing'
    })}}`
  )

  const { name, path, remote, version } = state.packages[state.active]

  log(boxen([
    chalk`{magentaBright Command}{dim :} ${state.command}                              `,
    chalk`{magentaBright Package}{dim :} ${name}                            `,
    chalk`{magentaBright Version}{dim :} ${version}                            `,
    chalk`{magentaBright  Remote}{dim :} ${remote}                            `,
    chalk`{magentaBright Located}{dim :} ${path}`
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

  const options = [
    {
      type: 'list',
      name: 'run',
      message: 'Select operation:',
      choices: config.commands.filter(i => !i.pkg).map(({ command, description }) => ([
        chalk`${command}`,
        chalk`${' '.repeat(15 - command.length)}`,
        chalk`{gray.italic ${description}}`
      ]).join(''))
    }
  ]

  const { run } = await inquirer.prompt(options)
  // const execute = run.toLowerCase().substring(0, run.indexOf(' '))
  // const promise = await bundle()

  return run

}
