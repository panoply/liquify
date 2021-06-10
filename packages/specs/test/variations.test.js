import test from 'ava'
import { config } from 'dotenv'
import { has, keys } from 'rambda'
import specs from '../package/index'
import sizeof from 'object-sizeof'
import ps from 'pretty-bytes'

config()

/**
 * **!!    IMPORTANT    !!**
 *
 * This must match the "defaults" option supplied in specs
 */
const defaults = {
  filters: {
    type: 'filter'
  },
  objects: {
    type: 'object',
    filters: true,
    singular: true,
    global: false,
    deprecated: false,
    trims: true
  },
  tags: {
    filters: false,
    singular: false,
    trims: true,
    deprecated: false,
    arguments: true
  }
}

/**
 * Defaults Merger
 *
 * Merges Defaults into each specification and encodes
 * each file, returning the enigmatic encryption
 *
 * @param {string} json
 * @returns {object}
 */
const merge = file => {

  const json = require(file)

  for (const key of Object.keys(json)) {
    if (defaults[key]) {
      for (const prop of Object.keys(json[key])) {

        // sets arguments length on an $i field
        if (key === 'filters' && has('arguments', json[key][prop])) {
          json[key][prop].$i = { argsize: json[key][prop].arguments.length - 1 }
        }

        // Merges passed default properties
        json[key][prop] = { ...defaults[key], ...json[key][prop] }

      }
    }
  }

  return json

}

/**
 * We will define all specs and test against them
 */
test.before(t => {

  const standard = merge('../variations/standard.json')
  const shopify = merge('../variations/shopify.json')
  const variations = {
    standard,
    shopify: {
      engine: shopify.engine,
      updated: shopify.updated,
      tags: {
        ...standard.tags,
        ...shopify.tags
      },
      filters: {
        ...standard.filters,
        ...shopify.filters
      },
      objects: {
        ...standard.objects,
        ...shopify.objects
      }
    }
  }

  t.context = {
    log: process.argv.slice(2)[0] === 'logs',
    specs: variations,
    stats: {
      standard: {
        tags: {
          amount: keys(standard.tags).length
        },
        filters: {
          amount: keys(standard.filters).length
        }
      },
      shopify: {
        tags: {
          amount: keys(variations.shopify.tags).length
        },
        filters: {
          amount: keys(variations.shopify.filters).length
        },
        objects: {
          amount: keys(variations.shopify.objects).length
        }
      }
    }
  }

})

test('Standard Variation', t => {

  const s = specs({
    variation: 'standard',
    license: process.env.MASTER_KEY
  })

  if (t.context.log) t.log(s)

  const equals = {
    engine: s.engine,
    updated: s.updated,
    tags: s.tags,
    filters: s.filters
  }

  t.deepEqual(equals, t.context.specs.standard)

  t.log(`
    ${t.context.stats.standard.tags.amount}   Tags         ${ps(sizeof(equals.tags))}
    ${t.context.stats.standard.filters.amount}   Filters      ${ps(sizeof(equals.filters))}

    Total Size:       ${ps(sizeof(equals))}
  `)

  t.pass()

})

test('Standard Entries Array', t => {

  const { entries, tags, filters } = specs({
    variation: 'standard',
    license: process.env.MASTER_KEY
  })

  const entry = entries

  t.is(t.context.stats.standard.tags.amount, entry.tags.length)

  if (t.context.log) {
    t.log('Tags')
    t.log(keys(tags))
  }

  t.is(t.context.stats.standard.filters.amount, entry.filters.length)

  if (t.context.log) {
    t.log('Filters')
    t.log(keys(filters))
  }

  t.log(`
    ${entry.tags.length}   Tags         ${ps(sizeof(entry.tags))}
    ${entry.filters.length}   Filters      ${ps(sizeof(entry.filters))}

    Total Size:       ${ps(sizeof(entry))}
  `)

  t.pass()

})

test('Shopify Variation', t => {

  const s = specs({
    variation: 'shopify',
    license: process.env.MASTER_KEY
  })

  if (t.context.log) t.log(s)

  const equals = {
    engine: s.engine,
    updated: s.updated,
    tags: s.tags,
    filters: s.filters,
    objects: s.objects
  }

  t.deepEqual(equals, t.context.specs.shopify)

  t.log(`
    ${t.context.stats.shopify.tags.amount}   Tags        ${ps(sizeof(equals.tags))}
    ${t.context.stats.shopify.filters.amount}   Filters     ${ps(sizeof(equals.filters))}
    ${t.context.stats.shopify.objects.amount}   Objects     ${ps(sizeof(equals.objects))}

    Total Size:      ${ps(sizeof(equals))}
  `)

  t.pass()

})

test('Shopify Entries Array', t => {

  const { entries, tags, filters, objects } = specs({
    variation: 'shopify',
    license: process.env.MASTER_KEY
  })

  const entry = entries

  t.is(t.context.stats.shopify.tags.amount, entry.tags.length)

  if (t.context.log) {
    t.log('Tags')
    t.log(keys(tags))
  }

  t.is(t.context.stats.shopify.filters.amount, entry.filters.length)

  if (t.context.log) {
    t.log('Filters')
    t.log(keys(filters))
  }

  t.is(t.context.stats.shopify.objects.amount, entry.objects.length)

  if (t.context.log) {
    t.log('Objects')
    t.log(keys(objects))
  }

  t.log(`
    ${entry.tags.length}   Tags        ${ps(sizeof(entry.tags))}
    ${entry.filters.length}   Filters     ${ps(sizeof(entry.filters))}
    ${entry.objects.length}   Objects     ${ps(sizeof(entry.objects))}

    Total Size:      ${ps(sizeof(entry))}
  `)

  t.pass()

})
