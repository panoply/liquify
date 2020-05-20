import Crypto from 'cryptorjs'

import * as specs from '@liquify/liquid-language-specs'

/**
 * File Encryption `IV` and export
 */
const crypto = new Crypto('sissel siv')

/**
 * @typedef {'specs' | 'grammar' | 'parsing'} types
 * @param param {types|types[]}
 * @return (types)
 */
export const getCrypt = async (param) => {

  // @ts-ignore
  if (param) return crypto.decode(specs[`${crypto.encode(param)}`])[param]

  // const spec = {}

  // for (const id in specs) {
  // console.log(crypto.encode(param), specs[`${crypto.encode(param)}`])
  // specs[crypto.decode(id)] = crypto.decode(specs[id])
  // delete specs[id]
  // }

  return specs
}
