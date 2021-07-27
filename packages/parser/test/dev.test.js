import test from 'ava';
import time from 'pretty-hrtime';
import { parser } from './cases/shared';
// import Stringify from 'json-stringify-safe';

const text = `

<div>

  <div>

    <style>
      .class {
        width: auto;
      }

      .class {
        width: auto;
        background: {{ something.prop }};
        font-size: {{ something.prop }};
      }

      {% if condition %}
        div > .some > .class {
          width: 100px;
          background: {{ something.prop }};
          font-size: 120px;
        }
      {% endif %}

      body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-overflow-scrolling: touch;
      }

      main {
        height: 100vh;
      }

      h1 {
        font-weight: {{ something.prop | filter: 'foo' }};
        font-size: {{ something.prop | filter: 'foo' }};
        line-height: 4.2rem;
      }

      p {
        font-weight: 400;
        color: rgb(211, 211, 211);
        font-size: 1.1rem;
        font-family: {{ something.prop | filter: 'foo' }};
      }
    </style>

  </div>

</div>
`;

function Stack (ast) {

  const arr = [];

  for (let i = 0; i < ast.nodes.length; i++) {
    const node = ast.nodes[i];
    const stack = [ node ];

    for (const child of stack) {
      arr.push({
        tag: child.tag,
        root: child.root,
        index: child.index,
        start: child.start,
        type: child.type,
        end: child.end,
        scope: child.scope,
        errors: child.errors,
        embeddedId: child.embeddedId,
        languageId: child.languageId,
        literal: child.regionLiteral,
        children: child.children.map(({ tag }) => tag),
        filters: child.filters || null,
        objects: child.objects || null,
        parent: child.parent.tag === 'ROOT' ? 'ROOT' : {
          tag: child.parent.tag,
          start: child.parent.start,
          end: child.parent.end,
          index: child.parent.index,
          root: child.parent.root,
          embeddedId: child.parent.embeddedId,
          languageId: child.parent.languageId,
          children: child.parent.children.length
        }

      });
      if (child.parent) stack.push(...child.children);
    }

  }

  return arr;
}

test('FullDocument Parse', t => {

  const start = process.hrtime();

  const ast = parser.scan({
    languageId: 'liquid',
    version: 1,
    text,
    uri: 'test.liquid'
  });

  // console.log(ast.getTokenAt(60));
  const end = process.hrtime(start);
  console.log(Stack(ast));
  // console.log(ast);
  // console.log(...ast.nodes);
  // console.log(ast.getHTMLNodes());

  // console.log(ast.diagnostics.length);
  // console.log(...ast.diagnostics);

  for (const n of ast.errors) console.log(n, ast.getText(n.range));

  // console.log(ast.nodes[0].getToken());

  // console.log(ast.nodes);

  t.log(time(end, { verbose: true }));
  t.pass();

});
