#!/usr/bin/env node

const execa = require('execa')
const chalk = require('chalk')
const { existsSync, unlinkSync } = require('fs')
const { resolve } = require('path')
const { repository: { url }, projects } = require('../package.json')
const { log } = console

const linkFiles = async (directory, links = []) => {

  for (const link of links) {

    const path = resolve(directory, link)
    const file = resolve(link)

    if (!existsSync(file) || existsSync(path)) continue
    if (existsSync(path)) unlinkSync(path)

    await execa('ln', [ file, resolve(directory) ], { stdio: 'inherit' })

    log(chalk`linked {cyan ${link}} to {cyan.dim ${directory}/${link}}`)

  }

}

const gitCommand = async (params) => {

  const command = execa('git', params, { stdio: 'inherit' })

  try {
    await command
  } catch (error) {
    log(`${error.shortMessage}`)
  }

}

const dispatch = async ([ name, { directory, links, remote } ]) => {

  await linkFiles(directory, links)
  await gitCommand([ 'remote', 'add', name, remote ])

  if (name !== 'origin') {
    // await gitCommand([ 'subtree', 'add', `--prefix=${directory}/`, name, 'master' ])
    // await gitCommand([ 'subtree', 'add', `--prefix=${directory}/`, name, 'master' ])
  }
}

(async () => {

  Object.entries({
    ...projects,
    origin: {
      directory: '.',
      remote: `${url.replace('https://github.com/', 'git@github.com:')}.git`
    }
  }).forEach(dispatch)

})()
