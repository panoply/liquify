import inquirer from 'inquirer'
import boxen from 'boxen'
import chalk from 'chalk'
import clear from 'console-clear'

const pkg = require('./../../package.json')
const { log } = console

const execa = require('execa')

const runCommmand = async (params) => {

  const command = execa('pnpm', params, { stdio: 'inherit' })

  try {
    await command
  } catch (error) {
    log(`${error.shortMessage}`)
  }

}

export default async () => {

  const { bundle } = await inquirer.prompt([
    {
      type: 'list',
      name: 'bundle',
      message: 'Select Bundle',
      choices: [
        chalk`Client    {gray.italic Build and compile bundles}`,
        chalk`Grammar   {gray.italic Packaging execution, eg: npm pack}`,
        chalk`Schema    {gray.italic Common git related operations for the project}`,
        chalk`Server    {gray.italic Publish to CDN, Netlify, Marketplace etc}`,
        chalk`Specs     {gray.italic Run various tests}`,
        chalk`{magenta < Go Back}`
      ]
    }
  ])

  const value = bundle.toLowerCase().substring(0, bundle.indexOf(' '))

  runCommmand([ 'run', 'build', '--filter', './packages/specs' ])

  return bundle.toLowerCase().substring(0, bundle.indexOf(' '))

}
