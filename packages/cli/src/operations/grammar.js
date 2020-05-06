import fs from 'fs-extra'
import stripJsonComments from 'strip-json-comments'
import jsonMinify from 'jsonminify'
import inquirer from 'inquirer'

const config = {
  grammar: './packages/grammar/liquid.jsonc',
  specs: './packages/specs/variations'
}

const writeSyntax = async pattern => {

  const jsonc = await fs.readFile(config.grammar)
  const strip = JSON.parse(stripJsonComments(jsonc.toString()))

  console.log(strip)

  return pattern

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

  return writeSyntax(pattern)

}

const generateSpecs = async pattern => {

  const { grammar } = pattern
  const specs = await fs.readdir(config.specs)

  for (const variation of specs) {

    const content = await fs.readFile(`${config.specs}/${variation}`)
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

const rollup = async (pattern = { grammar: {}, parser: {}, syntax: {} }) => {

  const specs = await generateSpecs(pattern)

  // const parsed = JSON.parse(stripJsonComments(jsonc.toString()))
  // const string = JSON.stringify(parsed, null, 2)
  console.log(specs)

}

const generate = async type => {

  const prompt = await inquirer.prompt([
    {
      type: 'list',
      name: 'bundle',
      message: 'Select the type of Grammar',
      choices: [
        'include',
        'injection'
      ]
    },
    {
      type: 'input',
      name: 'filename',
      message: 'Enter the filename'
    }
  ])

  const dir = prompt.bundle === 'include' ? prompt.bundle : 'injects'
  const path = `./packages/grammar/${dir}/${prompt.filename}.json`

  await fs.writeFile(path, JSON.stringify(dir === 'include' ? {
    $schema: 'https://cdn.liquify.dev/schema/include-tmlanguage.json',
    patterns: []
  } : {
    $schema: 'https://cdn.liquify.dev/schema/tmlanguage.json',
    injectionSelector: '',
    scopeName: '',
    patterns: []
  }, null, 2))

  return prompt

}

export default { generate, rollup }
