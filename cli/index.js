
import specs from './lib/run/specs'
import prompt from './lib/prompt'
import { basename } from 'path'
import { statSync } from 'fs-extra'
export { default as grammar } from './lib/run/grammar'

export const run = async (run, config) => {

  switch (run) {
    case 'specs':
      await specs(config); break
    // case 'schema':
      // await schema(config); break
    // case 'server':
      //  await server(config); break
    // case 'client':
      // await client(config); break
      //  case 'grammar':
      // await grammar(config); break
    default:
      await prompt()
      // log(chalk`{red Command does not exist}`)
  }

}

export const banner = ({ name, main, version, author }) => `
/**
 * @license
 *
 * THIS IS PROPRIETARY CODE
 *
 * Copyright of Vellocet, Inc - All Rights Reserved.
 * Unauthorized copying or modification of this file, via any medium is strictly prohibited.
 * Please refer to the LICENSE.txt and/or ThirdPartyNotices.txt files included in bundle.
 *
 * ${basename(main)}
 *
 * Package:  ${name}
 * Version:  ${version}
 * Updated:  ${new Date(statSync(main).mtimeMs).toISOString().replace(/T/, ' ').substr(0, 19)}
 * Website:  https://www.liquify.dev
 * License:  See LICENSE.txt
 * Notices:  See ThirdPartyNotices.txt
 *
 * Written by ${author}
 *
 */`
