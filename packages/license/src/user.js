import { ensureDir, pathExists, writeFile } from 'fs-extra'
import homeOrTmp from 'home-or-tmp'
import { machineId } from 'node-machine-id'
import os from 'os'
import ini from 'ini'

/**
 * Returns a unique identifier for this users machine
 *
 * @param {object} conf
 */
async function Machine (conf) {

  try {

    const machine = await machineId()

    conf.id = machine

  } catch {

    throw Error('Failed to identify this machine!')

  }

}

/**
 * Writes a hard-copy of the user information and licensing
 * to their home dir path under folder `.liquify`
 *
 */
export async function Write () {

  const conf = {}
  const exists = await pathExists(`${homeOrTmp}/.liquify`)

  await Machine(conf)

  try {
    const tt = await ensureDir(`${homeOrTmp}/.liquify`)

    console.log(tt, 'success!')
  } catch (err) {
    console.error(err)
  }

  await writeFile(homeOrTmp + '/.liquify/license.json', JSON.stringify({
    foo: conf
  }))

}
