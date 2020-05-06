import inquirer from 'inquirer'

const execa = require('execa')

const PnpmRunCommmand = async (params) => {

  const command = execa('pnpm', params, { stdio: 'inherit' })

  try {
    await command
  } catch (error) {
    log(`${error.shortMessage}`)
  }

}

export default () => inquirer.prompt([
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
