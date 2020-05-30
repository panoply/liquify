import test from 'ava'
import fs from 'fs-extra'
import globs from '../package/index.cjs'

function sleep (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

test.serial.before(async t => {

  await globs({
    globs: [ './tmp/dir/.dotfile', './tmp/dir/file.json', './tmp/dir/text.txt' ],
    dest: './tmp/dest'
  }).buildStart()

  await sleep(1000)

})

test.serial('copying file, eg: dir/file.ext ', async t => {

  const result = await fs.pathExists('./tmp/dest/file.json')

  t.is(result, true)

})
