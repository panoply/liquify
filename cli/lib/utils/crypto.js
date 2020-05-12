
import specs from '@liquify/specs'
import Crypto from 'cryptorjs'

/**
 * File Encryption `IV` and export
 */
export const crypto = new Crypto('sissel siv')

/**
 * @typedef {'specs' | 'grammar' | 'parsing'} types
 * @param param {types|types[]}
 * @return (types)
 */
export const getCrypt = async (param) => {

  if (typeof param === 'string') return crypto.decode(specs[param])

  for (const id in specs) {
    specs[crypto.decode(id)] = crypto.decode(specs[id])
    delete specs[id]
  }

  return specs
}
