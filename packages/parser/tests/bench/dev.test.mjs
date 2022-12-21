import test from 'ava';
import time from 'pretty-hrtime';
import { LiquidParser } from '../../package/index.js';
// import Stringify from 'json-stringify-safe';

export const parser = new LiquidParser({
  engine: 'shopify'
});

const text = `
{% assign foo = article %}

{{ foo['user'].image['src']  }}

{% assign bar = article %}

{{ bar.user.email | append: foo.image.src   }}



`;

function Stack (ast) {

  const arr = [];

  for (let i = 0; i < ast.nodes.length; i++) {
    const node = ast.nodes[i];
    const stack = [ node ];

    for (const child of stack) {
      console.log(child.scope);
      console.log(child.objects);
      continue;
      arr.push({
        tag: child.tag,
        root: child.root,
        index: child.index,
        start: child.start,
        type: child.type,
        end: child.end,
        scope: child.scope,
        offsets: child.offsets,
        errors: child.errors,
        languageId: child.languageId,
        literal: child.regionLiteral,
        var: child.var,
        line: child.line,
        children: child.children.map(({ tag }) => tag),
        filters: child.filters || null,
        arguments: child.arguments || null,
        objects: child.objects || null,
        parent: child.parent.tag === 'ROOT' ? 'ROOT' : {
          tag: child.parent.tag,
          start: child.parent.start,
          end: child.parent.end,
          index: child.parent.index,
          root: child.parent.root,
          languageId: child.parent.languageId,
          children: child.parent.children.length
        }

      });

      if (child.parent) stack.push(...child.children);
    }

  }

  return arr;
}
parser.scan({
  languageId: 'liquid',
  version: 1,
  text,
  uri: 'test.liquid'
});

test('FullDocument Parse', t => {

  const start = process.hrtime();

  const ast = parser.update({
    textDocument: {
      uri: 'test.liquid',
      version: 2
    },
    contentChanges: [
      {
        range: {
          start: { line: 4, character: 20 },
          end: { line: 4, character: 20 }
        },
        rangeLength: 0,
        text: ' '
      }
    ]

  });

  /* const ast = parser.scan({
    languageId: 'liquid',
    version: 1,
    text,
    uri: 'test.liquid'
  }); */

  // console.log(ast.getTokenAt(60));
  const end = process.hrtime(start);
  console.log(Stack(ast));
  // console.log(ast);
  //  console.log(...ast.nodes);
  // console.log(ast.getHTMLNodes());

  // console.log(ast.diagnostics.length);
  // console.log(...ast.diagnostics);

  const errs = ast.diagnostics();

  if (errs !== null) {
    for (const n of errs.diagnostics) console.log(n, ast.getText(n.range));
  }
  // console.log(ast.getToken(n.range);

  // console.log(ast.nodes);

  t.log(time(end, { verbose: true }));
  t.pass();

});
