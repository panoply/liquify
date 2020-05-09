import execa from 'execa'
import { resolve } from 'path'

const { log } = console

/**
 * Pnpm run command execution
 *
 * @param {array} params
 */
export const PnpmRunCommmand = async (params) => {

  const command = execa('pnpm', params, { stdio: 'inherit' })

  try {
    await command
  } catch (error) {
    log(`${error.shortMessage}`)
  }

}

/**
 * Liquify command execution
 *
 * @param {array} params
 */
export const LiquifyCommmand = async (params) => {

  const command = execa('liquify', params, { stdio: 'inherit' })

  try {
    await command
  } catch (error) {
    log(`${error.shortMessage}`)
  }

}

/**
 * Command call filter
 *
 * @param {object} argv
 * @returns {{command: string, filter: null | string}}
 */
export const call = ({ _: [ cmd, filter = null ] }) => {
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
export const flags = (cwd, cmd) => async ([ flag, value ]) => {
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
