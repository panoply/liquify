import test from 'ava'
import { Expressions } from '../../src/parser/lexical'

test('block tags', t => {

  t.regex('{%- tag -%}', new RegExp(Expressions.blocks))
  t.regex('{%tag%}', new RegExp(Expressions.blocks))
  t.regex('{%    tag    %}', new RegExp(Expressions.blocks))
  t.regex('{%    tag    %}', new RegExp(Expressions.blocks))
  t.regex(`{%

    tag

    %}`, new RegExp(Expressions.blocks))

})
