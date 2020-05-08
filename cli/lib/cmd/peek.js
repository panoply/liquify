import inquirer from 'inquirer'
import execa from 'execa'
import { basename, resolve } from 'path'
import { readdir } from 'fs-extra'
import chalk from 'chalk'
import { crypto } from '../utils/crypto'
// import Crypto from 'cryptorjs'
// const crypto = new Crypto('sissel siv')

const { log } = console

const buildList = input => file => {
  file = basename(file).replace(/\.[^/.]+$/, '')
  if (file === 'index') return false
  chalk`${crypto.decode(file)}    {dim.magenta ${file} }`

  return resolve(input, file)
}

/**
 * Default exports - Digested by the CLI
 *
 * @param {object} config
 * @param {object} state prop values are the encoded names
 */
export default async (config) => {

  // const command = execa('pnpm', params, { stdio: 'inherit' })

  // console.log(config)
  const { input } = config
  const files = await readdir(input)
  // console.log(files)

  const setList = buildList(input)
  const choices = files.map(setList).filter(Boolean)

  const { file } = await inquirer.prompt([
    {
      type: 'list',
      name: 'bundle',
      message: 'Select Bundle',
      choices
    }
  ])

  const view = await execa('pnpx', [ 'fx', `${file}.js` ], { stdio: 'inherit' })

  try {
    await view
  } catch (error) {
    log(`${error.shortMessage}`)
  }

}
