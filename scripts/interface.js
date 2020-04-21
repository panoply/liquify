#!/usr/bin/env node

const inquirer = require('inquirer')
const figlet = require('figlet')
const chalk = require('chalk')
const clear = require('console-clear')
const { log } = console

const prompt = async () => {

  clear(true)
  log(chalk`{cyan ${figlet.textSync('Liquify', { font: 'Slant' })}}\n`)

  return inquirer.prompt([
    {
      type: 'checkbox',
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
    },
    {
      type: 'list',
      name: 'bundle',
      message: 'Choose Bundle',
      choices: [
        'Clients',
        'Server',
        'Grammar',
        'Specs',
        'Website'
      ]
    },
    {
      type: 'list',
      name: 'client',
      message: 'Choose Client Bundle',
      choices: [
        'VSCode',
        'Atom',
        'Sublime'
      ]
    },
    {
      type: 'list',
      name: 'publish',
      message: 'Publish',
      choices: [
        'VSCode Marketplace',
        'Atom Packages',
        'Sublime Package Control',
        'Website via Netlify'
      ]
    },
    {
      type: 'list',
      name: 'publish',
      message: 'Configure',
      choices: [
        'Relink Files',
        'Atom Packages',
        'Sublime Package Control',
        'Website via Netlify'
      ]
    },
    {
      type: 'list',
      name: 'git',
      message: 'Choose Git Operation',
      choices: [
        'Add',
        'Commit',
        'Checkout',
        'Merge',
        'Rebase',
        'Pull',
        'Push',
        'Ammend'
      ]
    }
  ])

}

(async () => {

  // const config = parse.expandKeys(await parse())
  // const ignore = await getIgnore(branch)

  // console.log({
  // project,
  //  branch,
  //  config
  // })

  const { branch } = await prompt()

  log(branch)

})()
