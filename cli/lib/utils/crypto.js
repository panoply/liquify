import Crypto from 'cryptorjs'
import specs from '@liquify/specs'

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

  if (param) return crypto.decode(specs[`${crypto.encode(param)}`])

  // const spec = {}

  // for (const id in specs) {
  // console.log(crypto.encode(param), specs[`${crypto.encode(param)}`])
  // specs[crypto.decode(id)] = crypto.decode(specs[id])
  // delete specs[id]
  // }

  return specs
}
