import { readFileSync, writeFileSync } from 'fs'
import { read } from '@liquify/rollup-plugin-utils'
import chalk from 'chalk'

const { log } = console

const arr = [
  read.pkg.exports.import
  , read.pkg.exports.require
]

log(chalk`{cyanBright running {bold Template Literal post build script}}`)

arr.forEach((file) => {

  const content = readFileSync(file).toString()
  const strip = content.replace(/\\n\s+/g, '')

  writeFileSync(file, strip)

  log(
    chalk`- Stripped newlines and extraneous spacing in: {magentaBright  ${file}}`
  )
})
