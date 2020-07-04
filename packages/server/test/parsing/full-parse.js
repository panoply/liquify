// @ts-nocheck

import test from 'ava'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { Server } from '../../src/provide/server'
import specs from '@liquify/liquid-language-specs'
import Scanner from '../../src/parser/parse'
import { Expressions } from '../../src/parser/lexical'
import { Document } from '../../src/provide/document'

const options = {
  uri: 'test.liquid',
  languageId: 'shopify-liquid',
  version: 1,
  text: readFileSync(resolve('test/fixtures/text.txt'), 'utf8').toString()
}

test.before('Language Server Initialize', async t => {

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

  t.context.document = Document.create(options)(Scanner)

  t.pass('Applies parser configuration options to Server')

})

test('Parse: Full - onDidOpenTextDocument', t => {

  t.assert(t.context.document.ast.length)
  t.log('AST was generated')

  // const document = Scanner(DocumentManager)

})

test('Parse: AST Nodes', t => {

  const { ast } = t.context.document

  // t.log(t.context.document.ast)

  // t.snapshot(ast)
  t.pass()
  // const document = Scanner(DocumentManager)

})
