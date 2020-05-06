import execa from 'execa'

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
