import test from 'ava';
import time from 'pretty-hrtime';
import * as parser from './common';

const text = `

<div
 id="bar{% unless something %} bar {% endunless %}"
 class="one" {{ foo }} {% if something %} something {% endif %}>
  {% unless bar %}
    <ul>
      <li>{{ foo }}</li>
      <li {% if something %} id="bar" {% endif %}>{{ bar }}</li>
      <li>{{ baz }}</li>
      <li>{{ ban }}</li>
      <li>{{ bae }}</li>
      <li>{{ baw }}</li>
    </ul>
  {% endunless %}
</div>
`;

test('FullDocument Parse', t => {

  const start = process.hrtime();

  const ast = parser.scan({
    languageId: 'liquid',
    version: 1,
    text,
    uri: 'test.liquid'
  });

  const end = process.hrtime(start);

  // console.log(...ast.nodes);
  // console.log(ast.getHTMLNodes());

  console.log(...ast.diagnostics);

  // for (const n of ast.errors) console.log(n, ast.getText(n.range));

  // console.log(ast.nodes[0].getToken());

  // console.log(ast.nodes);

  t.log(time(end, { verbose: true }));
  t.pass();

});
