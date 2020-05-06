import inquirer from 'inquirer'
import figlet from 'figlet'
import boxen from 'boxen'
import chalk from 'chalk'
import clear from 'console-clear'
import bundle from './bundle'

const pkg = require('./../../package.json')
const { log } = console

export default async () => {

  const ascii = figlet.textSync('Liquify CLI', {
    font: 'Slant',
    horizontalLayout: 'controlled smushing'
  })
  const title = chalk`{cyan ${ascii}}\n`
  const stats = boxen([
    chalk`{magentaBright Package}{dim :} ${pkg.name}                              `,
    chalk`{magentaBright Version}{dim :} ${pkg.version}                           `,
    chalk`{magentaBright Private}{dim :} ${pkg.private || false} `
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
  })

  clear(true)
  log(title)
  log(stats)

  const { run } = await inquirer.prompt([
    {
      type: 'list',
      name: 'run',
      message: 'Select operation:',
      choices: [
        chalk`Bundle    {gray.italic Build and compile bundles}`,
        chalk`Package   {gray.italic Packaging execution, eg: npm pack}`,
        chalk`Git       {gray.italic Common git related operations for the project}`,
        chalk`Publish   {gray.italic Publish to CDN, Netlify, Marketplace etc}`,
        chalk`Test      {gray.italic Run various tests}`,
        chalk`Config    {gray.italic Project configuration and settings}`
      ]
    }
  ])

  const execute = run.toLowerCase().substring(0, run.indexOf(' '))

  await bundle()

}
