import inquirer from 'inquirer'
import chalk from 'chalk'

export default async () => {

  const { bundle } = await inquirer.prompt([
    {
      type: 'list',
      name: 'git',
      message: 'Select Bundle',
      choices: [
        chalk`Client    {gray.italic Build and compile bundles}`,
        chalk`Grammar   {gray.italic Packaging execution, eg: npm pack}`,
        chalk`Schema    {gray.italic Common git related operations for the project}`,
        chalk`Server    {gray.italic Publish to CDN, Netlify, Marketplace etc}`,
        chalk`Specs     {gray.italic Run various tests}`,
        chalk`{magenta < Go Back}`
      ]
    },
    {
      type: 'list',
      name: 'git',
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
