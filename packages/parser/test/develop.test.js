import test from 'ava';
import time from 'pretty-hrtime';
import * as parser from './common';
import Stringify from 'json-stringify-safe';

const text = `
  <nav class="blue">
    {% if condition %}

      <div class="red">
        {{ something }}
      </div>

      {% unless bar %}
        <ul>
          <li>{{ hello }}</li>
        </ul>
      {% endunless %}

    {% endif %}

  </nav>

<img src="example.png">

<aside>
  {% if sidebar %}
    <div class="blue">
      {% if nested_1 %}
        <nav id="sidebar">
          {% unless nested_1 %}
            <a href="/some-url">
              {{ some_url }}
            </a>
          {% endunless %}
        </nav>
      {% endif %}
    </div>
  {% endif %}
</aside>




<footer>
  <nav id="footer">
    <ul>
      <li>{% if alphabet %} {{ abc }} {% endif %}</li>
      <li>{{ def }}</li>
      <li>{{ ghi }}</li>
    </ul>
  </nav> slsl
</footer>

<hr>

<p>This is our test document</p>


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
        start: child.parent.start,
        end: child.parent.end,
        errors: child.errors,
        children: child.children.map(({ tag }) => tag),
        parent: child.parent.tag === 'ROOT' ? 'ROOT' : {
          tag: child.parent.tag,
          start: child.parent.start,
          end: child.parent.end,
          index: child.parent.index,
          errors: child.parent.errors,
          root: child.parent.root,
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

  const end = process.hrtime(start);
  console.log(Stack(ast));

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
