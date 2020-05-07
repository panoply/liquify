import { basename } from 'path'
import { statSync } from 'fs-extra'

/**
 * License banner applied to javascript files
 *
 * @param {object} package
 * @returns {string}
 */
const banner = ({ name, main, version, author }) => `
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
 * License:  See LICENSE
 *
 * Written by ${author}
 *
 */`

export default { banner }
