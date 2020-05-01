#!/usr/bin/env node

const standard = require('./variations/standard.json')
const shopify = require('./variations/shopify.json')
const jekyll = require('./variations/jekyll.json')

const patterns = (pattern = {
  objects: [],
  deprecated: []
}) => {

  // @ts-ignore
  for (const [ name, { type, deprecated = false } ] of Object.entries(shopify)) {
    if (deprecated) {
      pattern.deprecated.push(name)
    } else {
      if (type === 'object') pattern.objects.push(name)
    }
  }

  return pattern

}

module.exports = (async () => {

  const { objects, deprecated } = patterns()

  return console.log({
    injectionSelector: 'L:source.liquid',
    scopeName: 'source.liquid.objects',
    patterns: [
      {
        include: '#object-name'
      },
      {
        include: '#invalid-deprecated'
      }
    ],
    repository: {
      'object-name': {
        name: 'support.class.object.liquid',
        match: `\\b(${objects.join('|')})\\b`
      },
      'invalid-deprecated': {
        name: 'invalid.deprecated.liquid',
        match: `\\b(${deprecated.join('|')})\\b`
      }
    }
  })

})()
