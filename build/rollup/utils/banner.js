import { basename } from 'path'
import { statSync } from 'fs-extra'

/**
 * License banner applied to javascript files
 *
 * @param {object} package
 * @returns {string}
 */
export default function ({
  name
  , main
  , version
  , author
}) {

  const stat = statSync(main).mtimeMs
  const date = new Date(stat).toISOString().replace(/T/, ' ').substr(0, 19)

  return `
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
   * Updated:  ${date}
   * Website:  https://www.liquify.dev
   * License:  See LICENSE.txt
   *
   * Written by ${author}
   *
   */`
}
