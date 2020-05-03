const inquirer = require('inquirer')
const figlet = require('figlet')
const chalk = require('chalk')
const clear = require('console-clear')
const { log } = console

export default (async () => {

  const ascii = figlet.textSync('Liquify', { font: 'Slant' })
  const title = chalk`{cyan ${ascii}}\n`

  clear(true)
  log(title)

  const prompt = await inquirer.prompt([
    {
      type: 'list',
      name: 'operation',
      message: 'Select operation:',
      choices: [
        chalk`Develop   {gray.italic Starts developer mode for entire project}`,
        chalk`Git       {gray.italic Common git related operations for the project}`,
        chalk`Bundle    {gray.italic Build and compile bundles}`,
        chalk`Publish   {gray.italic Publish to endpoint, eg: Marketplace}`,
        chalk`Package   {gray.italic Package extension/packages, eg: VSIX}`,
        chalk`Test      {gray.italic Run various tests}`,
        chalk`Config    {gray.italic Project configuration and settings}`
      ]
    }
  ])

  return prompt

})()
