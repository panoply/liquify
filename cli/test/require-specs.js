const Crypto = require('cryptorjs')
const crypto = new Crypto('sissel siv')
const specs = require('@liquify/specs')

/**
 * @typedef {'standard' | 'shopify' | 'jekyll' | 'parsing'} spec
 * @param param {spec|spec[]}
 */
// const modul = (param) => {

//  const decode = crypto.encode(param)
//  const spec = require(`./../../specs/package/${decode}`)

//  return crypto.decode(spec)
// }

/**
 * @typedef {'specs' | 'grammar' | 'parsing'} types
 * @param param {types|types[]}
 */
const get = param => {

  // if (typeof param === 'string') return crypto.decode(specs[crypto.encode(param)])

  for (const id in specs) {
    specs[crypto.decode(id)] = crypto.decode(specs[id])
    delete specs[id]
  }

  return specs
}

// console.log(crypto.decode(specs[i]))
// newobj[crypto.decode(i)] = crypto.decode(specs[i])

console.log(get())
