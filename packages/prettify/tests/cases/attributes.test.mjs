import test from 'ava';
import { forRules, forAssert, liquid } from '@liquify/ava/prettify';
import prettify from '@liquify/prettify';

test.serial('Liquid structure variations', t => {

  forAssert(
    [
      [
        liquid`<div {{ output }}></div>`,
        liquid`<div {{ output }}></div>`
      ],
      [
        liquid`<div {% singleton %}></div>`,
        liquid`<div {% singleton %}></div>`
      ],
      [
        liquid`<div {% if condition %}id="xx"{% endif %}></div>`,
        liquid`<div {% if condition %}id="xx"{% endif %}></div>`
      ],
      [
        liquid`<div {% if condition %}id={{ class }}{% endif %}></div>`,
        liquid`<div {% if condition %}id={{ class }}{% endif %}></div>`
      ],
      [
        liquid`<div {% singleton_attribute %}="liquid-tag-attr"></div>`,
        liquid`<div {% singleton_attribute %}="liquid-tag-attr"></div>`
      ],
      [
        liquid`<div {% singleton_attribute %}={% singleton_value_no_quotes %}></div>`,
        liquid`<div {% singleton_attribute %}={% singleton_value_no_quotes %}></div>`
      ],
      [
        liquid`<div data-x{% if chain %}-id{% else %}="xx"{% endif %}></div>`,
        liquid`<div data-x{% if chain %}-id{% else %}="xx"{% endif %}></div>`
      ],
      [
        liquid`<div data-x{% if chain %}-id{% else %}="xx"{% endif %}></div>`,
        liquid`<div data-x{% if chain %}-id{% else %}="xx"{% endif %}></div>`
      ],
      [
        liquid`<div {% singleton %}={% if condition %}"value"{% else %}{{ output }}{% endif %}></div>`,
        liquid`<div {% singleton %}={% if condition %}"value"{% else %}{{ output }}{% endif %}></div>`
      ],
      [
        liquid`<div {{ output }}={% unless condition %}{% singleton %}{% else %}"value"{% endunless %}></div>`,
        liquid`<div {{ output }}={% unless condition %}{% singleton %}{% else %}"value"{% endunless %}></div>`
      ]
    ]
  )(function (source, expect) {

    const actual = prettify.formatSync(source, { language: 'liquid' });

    t.is(actual, expect);

  });
});

test.serial('Liquid chaining and whitespace breaks', t => {

  forAssert(
    [
      [
        liquid`<div {% space_respect %} {{ stimulates_attribute }}></div>`,
        liquid`<div {% space_respect %} {{ stimulates_attribute }}></div>`
      ],
      [
        liquid`<div {% no_space %}{{ respect_structure }}></div>`,
        liquid`<div {% no_space %}{{ respect_structure }}></div>`
      ],
      [
        liquid`<div {% if space_start %} id="space-around"{% endif %}></div>`,
        liquid`<div {% if space_start %} id="space-around" {% endif %}></div>`
      ],
      [
        liquid`<div {% if space_end %}id="space-strip" {% endif %}></div>`,
        liquid`<div {% if space_end %}id="space-strip"{% endif %}></div>`
      ],
      [
        liquid`<div {% if keep_chain %}id={{ no_space }}{% else %}data-x{% endif %}></div>`,
        liquid`<div {% if keep_chain %}id={{ no_space }}{% else %}data-x{% endif %}></div>`
      ],
      [
        liquid`<div {% if no_chain %}id={{ next_space }} {% else %}stripped{% endif %}></div>`,
        liquid`<div {% if no_chain %}id={{ next_space }}{% else %}stripped{% endif %}></div>`
      ],
      [
        liquid`<div {% if unchain %} id={{ space_start }}{% else %}space-around{% endif %}></div>`,
        liquid`<div {% if unchain %} id={{ space_start }} {% else %} space-around {% endif %}></div>`
      ]
    ]
  )(function (source, expect) {

    const actual = prettify.formatSync(source, {
      language: 'liquid',
      markup: {
        forceAttribute: false
      }
    });

    t.is(actual, expect);

  });
});

test.serial('Liquid structure preservation', t => {

  forRules(
    [
      liquid`

      {% # The entire structure will chain starting at the if condition %}

      <div

      id="foo"

      {% if x  %}data-attr="x"

      {% elsif %}
      data-id="x"{% endif %}

      ></div>

      `
      ,
      liquid`

      {% # Chained edge case, attributes will connect (boolean structure) %}

      <div

      data-{% if x %}id="foo"{% else %} name {% endif %}>

      </div>`

      ,

      liquid`

      {% # Preservation edge case, structure will be preserved and liquid tokens normalized %}

      <div

      id="foo"
      data-bar

      {{ output.attr | filter: 'xxx' }}

      data-id="foo"

      {% if x  %}
      {{ attr.2 }}
      {% endif %}
      {% if x  %}data-x={{ foo }}{% else %}{{ attr.3 }}{% endif %}>

      </div>`

      ,

      liquid`

      {% # Preservation edge case, structure will be preserved %}

      <div
      data{% if x %}-foo{% else %}-bar{% endif %}={{ x }}
      {% tag %}={% if x %}"foo"{% else %}{{ bar }}{% endif %}
      >
      </div>`

      ,

      liquid`

      {% # Preservation edge case, testing a multitude of expressions %}

      <div

      aria-label={{ label }}
      class="x"
      data-attr

      {{ output.attribute }}
      {{ output.attribute | filter: 'foo' }}

      id={{ unquoted.value }}
      data-dq="{{ dq.value }}"
      data-sq='{{ sq.value }}'

      {{ attr }}="liquid-output-attr"
      {% tag %}="liquid-tag-attr"
      {% if x %}data-if{% elsif x > 0 %}data-elsif{% else %}data-else{% endif %}={{ value }}

      data-{% if x %}id="foo"{% else %}name{% endif %}>

      </div>`

      ,

      liquid`

      {% # Preservation edge case, testing a multitude of expressions (child nesting) %}

      <div id={{ no.quotes }} {{ output.attribute }}>
      <div

      id="x"
      class="xxx xxx xxx"

      {% if x == 100 %}
      data-{% if x %}{{ x }}{%- else -%}foo{%- endif %}-id="xxx"
      {% elsif x != 200 %}

      {% unless u == 'foo' and x == 'bar' %}
      data-{{ object.prop | filter }}
      {% endunless %}

      {% endif %}

      aria-x="foo"
      style="background-color: {{ bg.color }}; font-size: 20px;">

      </div>
      </div>
      `

    ]
  )(
    {
      wrap: 0,
      language: 'liquid',
      markup: {
        forceAttribute: 2
      }
    }
  )(function (source, rules, label) {

    const snapshot = prettify.formatSync(source, rules);

    t.snapshot(snapshot, label);

  });

});

test.serial('Liquid delimiter handling', t => {

  forRules(
    [
      liquid`

      {% # Testing HTML tag delimiter characters ">" and "<" within HTML attribute values. %}

      <div

      data-a="a > b"
      data-b="c < d"
      data-c="e f > g < h"
      data-d="j < k > l"

      >

      </div>
      `
      ,

      liquid`

      {% # Testing Liquid token containing HTML tag delimiter characters ">" and "<" within attribute values %}

      <div

      {% if a > b %} data-a {% endif %}
      {% if c < d %} data-b {% endif %}
      {% unless e > f and g < h %} data-c="a > b" {% elsif i > j %} data-d="a > b"{% endunless %}
      {% if  < k and l > m %}
      {{ output_1 | filter: '>' | filter: '<' }}
      {% else %}
      {{ output_2 | filter: '<' | filter: '>' }}
      {% endif %}

      >

      </div>
      `
      ,

      liquid`

      {% # Testing Liquid tokens as attributes and containing HTML tag delimiter characters ">" and "<" %}

      <div

      {% if a > b %} data-a {% endif %}
      {% if c < d %} data-b {% endif %}
      {% unless e > f and g < h %}data-c="a > b"{% elsif i > j %}data-d="a > b"{% endunless %}
      {% if < k and l > m %}
      {{ output_1 | filter: '>' | filter: '<' }}
      {% else %}
      {{ output_2 | filter: '<' | filter: '>' }}
      {% endif %}

      >

      </div>

      `
    ]
  )(
    {
      language: 'liquid',
      liquid: {
        normalizeSpacing: true
      },
      markup: {
        forceAttribute: true
      }
    }
  )(function (source, rules, label) {

    const snapshot = prettify.formatSync(source, rules);

    //  console.log(snapshot);
    t.snapshot(snapshot, label);

  });

});

test.serial('Casing rule cases', t => {

  forRules(
    [
      liquid`

      {% # Testing HTML  "attributeCasing" rule. This case tests HTML attributes only. %}

      <div ID="FOO" class="HelloWorld" data-VaLuE="eXampLE" DATA-BOOLEAN></div>

      `,
      liquid`

      {% # Testing HTML (markup) "attributeCasing" rule with Liquid attributes %}

      <div {{ xx }}-ID="FOO" class="HelloWorld" data-VaLuE="eXampLE" DATA-BOOLEAN></div>

      `
    ]
  )(
    [
      { language: 'liquid', markup: { attributeCasing: 'preserve' } },
      { language: 'liquid', markup: { attributeCasing: 'lowercase' } },
      { language: 'liquid', markup: { attributeCasing: 'lowercase-name' } },
      { language: 'liquid', markup: { attributeCasing: 'lowercase-value' } }
    ]
  )(function (source, rules, label) {

    const snapshot = prettify.formatSync(source, rules);

    t.snapshot(snapshot, label);

  });

});

test.serial('Quote conversion within values', t => {

  forRules(
    [
      liquid`

      {% # single quotation "'" characters nesting in HTML attribute values. %}

      <div

      id="{{ 'single' | single: 'double' }}"
      class="{% if 'single' %} {{ x | filter: 'quotes' }} {% endif %}"

      >

      </div>`
      ,
      liquid`

      {% # double quotation '"' characters nesting in HTML attribute values %}

      <div

      id="{{ "double" | double: "double" }}"
      class="{% if "double" %} {{ x | filter: "double" }} {% endif %}"

      >

      </div>`
      ,
      liquid`

      {% # mixture of double and single quotations nesting in HTML attribute values %}

      <div

      id='{{ "double" | single: 'single' | double: "quotes" }}'
      class="{% if 'single' %} {{ "double" | filter: 'single' }} {% endif %}"

      >

      </div>

      `
    ]
  )(
    [
      { language: 'liquid', markup: { quoteConvert: 'none' } },
      { language: 'liquid', markup: { quoteConvert: 'double' } },
      { language: 'liquid', markup: { quoteConvert: 'single' } },
      { language: 'liquid', markup: { quoteConvert: 'none' } }

    ]
  )(function (source, rules, label) {

    const snapshot = prettify.formatSync(source, rules);

    t.snapshot(snapshot, label);

  });

});

test.serial('Sorting alphabetically', t => {

  forRules(
    [
      liquid`

      {% # Sorting attributes alphabetically %}

      <main

      id="three"
      class="one"
      data-a="two">

      <div

      data-c="3"
      data-b="2"
      data-d="4"
      data-e="5"
      data-e="6"
      data-a="1"
      id="last"

      >

      </div>
      </main>`
    ]
  )(
    [
      {
        language: 'liquid',
        markup: { attributeSort: false }
      },
      {
        language: 'liquid',
        markup: { attributeSort: true }
      }
    ]
  )(function (source, rules, label) {

    const snapshot = prettify.formatSync(source, rules);

    t.snapshot(snapshot, label);

  });

});

test.serial('Sorting using sort list', t => {

  forRules(
    [
      liquid`

      {% # Sorting attributes with sort list%}

      <ul>

      <li

      class="x"
      data-c="3"
      data-b="2"
      data-d="4"
      data-e="5"
      data-e="6"
      data-a="1"

      >

      </li>

      <li

      class="x {{ will.sort  }}"
      data-c="3"
      data-b="2"
      data-a="1"

      >

      </li>
      </ul>`
    ]
  )(
    [
      {
        language: 'liquid',
        markup: { attributeSort: true }
      },
      {
        language: 'liquid',
        markup: {
          attributeSort: true,
          attributeSortList: [
            'data-b',
            'data-e',
            'class',
            'data-a'
          ]
        }
      }
    ]
  )(function (source, rules, label) {

    const snapshot = prettify.formatSync(source, rules);

    t.snapshot(snapshot, label);

  });
});

test.serial('Sorting excluded when Liquid attributes', t => {

  forAssert(
    [
      [
        liquid`<div data-a="1" data-b="2" class="3" id="4" {{ will.sort }}></div>`,
        liquid`<div class="3" data-a="1" data-b="2" id="4" {{ will.sort }}></div>`
      ],
      [
        liquid`<div data-z="1" {% if x %} {{ no.sort }} {% endif %} class="3" id="4"></div>`,
        liquid`<div data-z="1" {% if x %} {{ no.sort }} {% endif %} class="3" id="4"></div>`
      ],
      [
        liquid`<div data-z="1" data-b="2" class="3" id={{ will.sort }}></div>`,
        liquid`<div class="3" data-b="2" data-z="1" id={{ will.sort }}></div>`
      ]
    ]
  )(function (source, expect) {

    const actual = prettify.formatSync(source, {
      language: 'liquid',
      markup: {
        attributeSort: true,
        attributeSortList: [],
        forceAttribute: false
      }
    });

    t.is(actual, expect);

  });
});
