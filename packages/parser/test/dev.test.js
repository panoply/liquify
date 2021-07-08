import test from 'ava';
import time from 'pretty-hrtime';
import * as parser from './common';
import Stringify from 'json-stringify-safe';

const text = `

<div
 id="bar{% unless something %} bar {% endunless %}"
 class="one" {{ foo }} {% if something %} id="bar" {% endif %}>
  {% unless bar %}
    <ul>
      <li>{{ foo | replace: article.id, 'dd'  }}</li>
      <li {% if something %} id="bar" {% endif %}>{{ bar }}</li>
      <li> {{ baz }}</li>
      <li>{{ 'sss' }}</li>
      <li>{{ bae }}</li>
      <li>{{ s }}</li>
    </ul>
  {% endunless %}
</div>

    {{- product.title | replace: 'sss', 'sosos' | remove: article.author | slice: '33'  }}


{% if condition %}

  <div class="red">


    {% unless abcde %}
      <div class="blue">
        <nav>
          <a href="link">{{ link }}</a>

        </nav>
      {% endunless %}
      </div>
  </div>

{% endif %}

<main>
  <ul>
    <li>{{ foo }}</li>
    <li>{{ bar }}</li>
    <li>{{ baz }}</li>
  </ul>
</main>

<img src="example.png">

<aside>
  {% if product %}
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



{{ product['id'] | asset_img_url: '240x', format: 'jpg' }}

<footer>
  <nav id="footer">
    <ul>
      <li>{% if alphabet == 2%} {{ abc | replace: 'sss', 'sosos'  | append: 'd'  | font_modify: 'style', 'normal'  }} {% endif %}</li>
      <li>{{ def }}</li>
      <li>{{ ghi }}</li>
    </ul>
  </nav>
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
        start: child.start,
        end: child.end,
        children: child.children.map(({ tag }) => tag),
        filters: child.filters || null,
        objects: child.objects || null,
        parent: child.parent.tag === 'ROOT' ? 'ROOT' : {
          tag: child.parent.tag,
          start: child.parent.start,
          end: child.parent.end,
          index: child.parent.index,
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
  // console.log(Stack(ast));

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
