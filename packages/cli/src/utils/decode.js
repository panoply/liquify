import { writeFile, readdir, readFile, watch } from 'fs-extra'
import { resolve } from 'path'
import stripJsonComments from 'strip-json-comments'
import jsonMinify from 'jsonminify'
import Crypto from 'cryptorjs'
import chalk from 'chalk'

const { log } = console

/**
 * @param {string} output
 * @param {object} parsedJSON
 * @param {string} filename
 */
export const decode = (name, output) => {

  const crypt = new Crypto(name)
  const encode = crypt.encode(name)
  const decrypt = crypt.decode(encode)

  // log(chalk`encrypt {cyan ${name}} {magenta ${crpytName}}`)

  return decrypt

}
