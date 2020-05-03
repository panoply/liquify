import fs from 'fs-extra'
import stripJsonComments from 'strip-json-comments'
import jsonMinify from 'jsonminify'
import inquirer from 'inquirer'
import Crypto from 'cryptorjs'

const config = {
  grammar: './packages/grammar/liquid.jsonc',
  specs: './packages/specs/variations'
}

const generateParse = pattern => {

  const { grammar, parser } = pattern
  const { standard } = grammar

  for (const variant in grammar) {

    if (typeof parser[variant] !== 'object') parser[variant] = {}

    const { filter = [], object = [] } = grammar[variant]

    pattern.parser[variant].objects = [ ...object ].sort()
    pattern.parser[variant].filters = variant !== 'standard' ? [
      ...filter,
      ...standard.filter
    ].sort() : standard.filter.sort()

  }

  return pattern.parser

}

const generate = async (path, pattern) => {

  const { grammar } = pattern
  const specs = await fs.readdir(path.input)

  for (const variation of specs) {

    const content = await fs.readFile(`${path.input}/${variation}`)
    const parsed = JSON.parse(stripJsonComments(content.toString()))
    const variant = variation.replace(/\.[^/.]+$/, '')

    grammar[variant] = { deprecated: [] }

    for (const [ name, { type, deprecated } ] of Object.entries(parsed)) {
      if (!grammar[variant][type]) grammar[variant][type] = []
      if (deprecated) grammar[variant].deprecated.push(name)
      else grammar[variant][type].push(name)
    }

  }

  return generateParse(pattern)

}

const encrypt = async ({ output }, parsed, filename) => {

  const crypt = new Crypto(filename)
  const name = crypt.encode(filename)
  const hash = crypt.encode(parsed)

  await fs.writeFile(`${output}/${name}.js`, `module.exports="${hash}"`)
  return { [`_${name}`]: `_${name}=require("./${name}")` }

}

const write = async (path, filename) => {

  const content = await fs.readFile(`${path.input}/${filename}`)
  const parsed = JSON.parse(stripJsonComments(content.toString()))
  const variant = filename.replace(/\.[^/.]+$/, '')

  return encrypt(path, parsed, variant)

}

const bundle = async (path, state = {}) => {

  const specs = await fs.readdir(path.input)

  for (const file of specs) Object.assign(state, await write(path, file))

  const requires = `const ${Object.values(state).join(',')}`
  const filename = Object.keys(state).map(i => `[a("${i}")]:b(${i})`).join(',')
  const contents = `${requires};module.exports=(a,b)=>({${filename}});`

  await fs.writeFile(`${path.output}/index.js`, contents)

}

export default { bundle }
