// @ts-nocheck

import test from 'ava'
import specs from '@liquify/liquid-language-specs'
import { Expressions } from '../../src/parser/lexical'

test.before('Language Server Initialize', async t => {

  const spec = (await specs('sissel siv'))

  t.context.shopify = Object.keys(spec.shopify)
  t.context.jekyll = Object.keys(spec.jekyll)
  t.context.standard = Object.keys(spec.standard)
  t.context.html = {
    comments: [ 'liquid-(format|linter)-(ignore|enable|disable)' ],
    tokens: [ 'script', 'style' ],
    tokens_with_attribute: [
      [ 'script' ],
      [ 'application/type="ld+json"' ]
    ]
  }

  t.pass()

})

test('Parse: Full - onDidOpenTextDocument', t => {

  t.assert(t.context.document.ast.length)
  t.log('AST was generated')

  // const document = Scanner(DocumentManager)

})
