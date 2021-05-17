import { readFileSync, writeFileSync } from 'fs-extra'
import rollup from './../rollup.config'
import chalk from 'chalk'

const { log } = console

log(chalk`{cyanBright running {bold Template Literal post build script}}`)
rollup.output.forEach(({ file }) => {

  const content = readFileSync(file).toString()
  const strip = content.replace(/\\n\s+/g, '')

  writeFileSync(file, strip)

  log(
    chalk`- Stripped newlines and extraneous spacing in: {magentaBright  ${file}}`
  )
})
