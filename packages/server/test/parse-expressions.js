import test from 'ava'

const Expressions = {

  html: /<\/?\b(script|style)\b[^<>]*>/,
  blocks: /{%-?\s*\b(?:end)?(\w+)\b.?(?:[^%}]*})*[^%}]*%}/,
  output: /{{2}-?\s*\b(\w+)\b.?(?:[^{}]{2})*-?}{2}/,
  comments: /(?:<!--|\/\*).*?(?:\*\/|-->)/,
  frontmatter: /(-{3})/
}

test('block tags', t => {

  t.regex('{%- tag -%}', new RegExp(Expressions.blocks))
  t.regex('{%tag%}', new RegExp(Expressions.blocks))
  t.regex('{%    tag    %}', new RegExp(Expressions.blocks))
  t.regex('{%    tag    %}', new RegExp(Expressions.blocks))
  t.regex(`{%

    tag

    %}`, new RegExp(Expressions.blocks))

})
