// @ts-nocheck

import test from 'ava'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { Server } from '../../src/provide/server'
import specs from '@liquify/liquid-language-specs'
import Scanner from '../../src/parser/parse'
import Incremental from '../../src/parser/increment'
import { Expressions } from '../../src/parser/lexical'
import { Document } from '../../src/provide/document'
import changes from './fixtures/deletes/changes'
import pretty from 'prettyoutput'
import Table from 'cli-table'

const opts = {
  alignKeyValues: false,
  maxDepth: 5,
  colors: {
    keys: 'magenta',
    string: 'cyan',
    dash: 'grey',
    number: 'cyan',
    undefined: 'white',
    null: 'red'
  }
}
const base = 'test/parsing/fixtures/deletes/base.txt'

const options = (uri, text, version) => ({
  languageId: 'shopify-liquid',
  uri,
  version,
  text: readFileSync(resolve(text), 'utf8').toString()
})

test.before('Incremental Deletions', async t => {

  Server.specification = (await specs('sissel siv')).shopify()
  Server.lexical = Expressions({
    tags: {
      objects: Object.keys(Server.specification.objects)
    },
    html: {
      comments: [ 'liquid-(format|linter)-(ignore|enable|disable)' ],
      tokens: [ 'script', 'style' ],
      tokens_with_attribute: [
        [ 'script' ],
        [ 'application/type="ld+json"' ]
      ]
    }
  })

  t.context.document = Document.create(options('base.liquid', base, 1))(Scanner)
  t.pass('Created document manager')

})

/**
 *
 * @example
 *
 * // {%- tag -%}
 * // {%- endtag -%}
 *
 */
test('case_1: Deletes entire tag block', t => {

  Document.create(options('test_1.liquid', base, 1))(Scanner)

  const document = Document.update({ uri: 'test_1.liquid', version: 2 }, changes.case_1)
  const increment = Incremental(document, changes.case_1)

  t.notDeepEqual(t.context.document.ast[1], increment.ast[1])
  t.notDeepEqual(t.context.document.ast[2], increment.ast[2])

  t.deepEqual(document.ast[0], increment.ast[0])
  t.deepEqual(document.ast[1], increment.ast[1])
  t.deepEqual(document.ast[2], increment.ast[2])

  const table = new Table({
    head: [ 'DELETED', 'REPLACED' ],
    colWidths: [ 45, 45 ],
    style: {
      'padding-left': 1,
      'padding-right': 1
    }

  })

  table.push([
    pretty(t.context.document.ast.slice(1, 3), opts),
    '-'
  ])

  t.log(table.toString())

})

/**
 *
 * @example
 *
 * // {%- tag -%}
 * {%- endtag -%}
 *
 */
test('case_2: Deletes start tag', t => {

  Document.create(options('test_2.liquid', base, 1))(Scanner)

  const document = Document.update({ uri: 'test_2.liquid', version: 2 }, changes.case_2)
  const increment = Incremental(document, changes.case_2)

  t.notDeepEqual(t.context.document.ast[1], increment.ast[1])

  t.deepEqual(document.ast[0], increment.ast[0])
  t.deepEqual(document.ast[1], increment.ast[1])
  t.deepEqual(document.ast[2], increment.ast[2])

  const table = new Table({
    head: [ 'BEFORE INCREMENT', 'AFTER INCREMENT' ],
    colWidths: [ 45, 45 ],
    style: {
      'padding-left': 1,
      'padding-right': 1
    }

  })

  table.push([
    pretty(t.context.document.ast[1], opts),
    pretty(increment.ast[1], opts)
  ])

  t.log(table.toString())

})

/**
 *
 * @example
 *
 * {%- tag -%} // {%- endtag -%}
 */
test.skip('case_3: Deletes end tag', t => {

  t.pass()

})

/**
 *
 * @example
 *
 * {{- tag -}} // {{- tag -}}
 * {%- tag -%} // {% tag -%}
 */
test.skip('case_4: Deletes entire singular tag', t => {

  t.pass()

})

/**
 *
 * @example
 *
 * tag %} {% endtag %} // {%
 *
 */
test.skip('case_5: Deletes left delimeter of start tag', t => {

  t.pass()

})

/**
 *
 * @example
 *
 * {% tag  {% endtag %} // -%}
 *
 */
test.skip('case_6: Deletes right delimeter of start tag', t => {

  t.pass()

})

/**
 *
 * @example
 *
 * {% tag %}  endtag %} // {%
 *
 */
test.skip('case_7: Deletes left delimeter of end tag', t => {

  t.pass()

})

/**
 *
 * @example
 *
 * {% tag %} {% endtag // %}
 *
 */
test.skip('case_8: Deletes right delimeter of end tag', t => {

  t.pass()

})

/**
 *
 * @example
 *
 *  tag -}} // {{-
 *
 */
test.skip('case_10: Deletes left delimeter of singular tag', t => {

  t.pass()

})

/**
 *
 * @example
 *
 * {{- tag  // -}}
 *
 */
test.skip('case_11: Deletes right delimeter of singular tag', t => {

  t.pass()

})

/**
 *
 * @example
 *
 * {% tag  // %} {% endtag %}
 *
 */
test.skip('case_12: Deletes right side delimeter and end tag', t => {

  t.pass()

})

/**
 *
 * @example
 *
 * {% tag %}  // {% endtag %}
 *
 * if foo %} {% endif %} // {%
 *
 */
test.skip('case_13: Deletes left side delimeter and end tag', t => {

  t.pass()

})

/**
 *
 * @example
 *
 * {% tag %} {% endtag // %}
 *
 * if foo %} {% endif %} // {% if
 *
 */
test.skip('case_14: Deletes left side start and right side end tag', t => {

  t.pass()

})
