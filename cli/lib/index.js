
import { resolve } from 'path'
import peek from './commands/peek'
import specs from './packages/specs'
import grammar from './packages/grammar'
import prompt from './commands/default'
import { errorHandler } from './utils/common'
import config from './config'

export { default as rollup } from './packages/rollup'

/**
 * Command call filter
 *
 * @param {object} argv
 * @returns {{command: string, filter: null | string}}
 */
const call = ({ _: [ cmd, filter = null ] }) => {
  for (const { command, filters } of config.calls) {
    console.log(command === cmd)
    if (command === cmd) return { command, filter }
    if (command === cmd && filter && filters.length > 0) {
      for (const f of filters) if (f.command === filter) return { command, filter }
    }
  }
}

/**
 * Command flags
 *
 * @param {string} cwd
 * @param {object} cmd
 */
const flags = (cwd, cmd) => async ([ flag, value ]) => {
  for (const { name, short } of config.options) {
    if (name === flag || short === flag) {
      await Object.assign(cmd, {
        [name]: [
          'config',
          'main',
          'input',
          'output',
          'peek'
        ].includes(name) ? resolve(cwd, value) : value
      })
    }
  }
}

export const run = async argv => {

  const cwd = process.cwd()
  const cmd = call(argv)

  console.log(argv)

  if (!cmd) return errorHandler('Command\n')(JSON.stringify(cmd))

  const options = flags(cwd, cmd)

  Object.entries(argv).forEach(await options)

  switch (cmd.command) {
    case 'specs':
      await specs(cmd); break
    case 'peek':
      await peek(cmd); break
    // case 'schema':
      // await schema(config); break
    // case 'server':
      //  await server(config); break
    // case 'client':
      // await client(config); break
    case 'grammar':
      await grammar(cmd); break
    default:
      await prompt()
      // log(chalk`{red Command does not exist}`)
  }

}
