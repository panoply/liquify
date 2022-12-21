# Snapshot report for `tests/cases/attributes.test.mjs`

The actual snapshot is saved in `attributes.test.mjs.snap`.

Generated by [AVA](https://avajs.dev).

## Liquid structure preservation

> ```js
> {
>   "wrap": 0,
>   "language": "liquid",
>   "markup": {
>     "forceAttribute": 2
>   }
> }
> ```

    `{% # The entire structure will chain starting at the if condition %}␊
    ␊
    <div␊
      id="foo"␊
      {% if x %}data-attr="x"{% elsif %}data-id="x"{% endif %}></div>`

> ```js
> {
>   "wrap": 0,
>   "language": "liquid",
>   "markup": {
>     "forceAttribute": 2
>   }
> }
> ```

    `{% # Chained edge case, attributes will connect (boolean structure) %}␊
    ␊
    <div data-{% if x %}id="foo"{% else %}name{% endif %}></div>`

> ```js
> {
>   "wrap": 0,
>   "language": "liquid",
>   "markup": {
>     "forceAttribute": 2
>   }
> }
> ```

    `{% # Preservation edge case, structure will be preserved and liquid tokens normalized %}␊
    ␊
    <div␊
      id="foo"␊
      data-bar␊
      {{ output.attr | filter: 'xxx' }}␊
      data-id="foo"␊
      {% if x %}␊
      {{ attr.2 }}␊
      {% endif %}␊
      {% if x %}data-x={{ foo }}{% else %}{{ attr.3 }}{% endif %}></div>`

> ```js
> {
>   "wrap": 0,
>   "language": "liquid",
>   "markup": {
>     "forceAttribute": 2
>   }
> }
> ```

    `{% # Preservation edge case, structure will be preserved %}␊
    ␊
    <div␊
      data{% if x %}-foo{% else %}-bar{% endif %}={{ x }}␊
      {% tag %}={% if x %}"foo"{% else %}{{ bar }}{% endif %}></div>`

> ```js
> {
>   "wrap": 0,
>   "language": "liquid",
>   "markup": {
>     "forceAttribute": 2
>   }
> }
> ```

    `{% # Preservation edge case, testing a multitude of expressions %}␊
    ␊
    <div␊
      aria-label={{ label }}␊
      class="x"␊
      data-attr␊
      {{ output.attribute }}␊
      {{ output.attribute | filter: 'foo' }}␊
      id={{ unquoted.value }}␊
      data-dq="{{ dq.value }}"␊
      data-sq='{{ sq.value }}'␊
      {{ attr }}="liquid-output-attr"␊
      {% tag %}="liquid-tag-attr"␊
      {% if x %}data-if{% elsif x > 0 %}data-elsif{% else %}data-else{% endif %}={{ value }}␊
      data-{% if x %}id="foo"{% else %}name{% endif %}></div>`

> ```js
> {
>   "wrap": 0,
>   "language": "liquid",
>   "markup": {
>     "forceAttribute": 2
>   }
> }
> ```

    `{% # Preservation edge case, testing a multitude of expressions (child nesting) %}␊
    ␊
    <div␊
      id={{ no.quotes }}␊
      {{ output.attribute }}>␊
      <div␊
        id="x"␊
        class="xxx xxx xxx"␊
        {% if x == 100 %}␊
        data-{% if x %}{{ x }}{%- else -%}foo{%- endif %}-id="xxx"␊
        {% elsif x != 200 %}␊
        {% unless u == 'foo' and x == 'bar' %}␊
        data-{{ object.prop | filter }}␊
        {% endunless %}␊
        {% endif %}␊
        aria-x="foo"␊
        style="background-color: {{ bg.color }}; font-size: 20px;"></div>␊
    </div>`

## Liquid delimiter handling

> ```js
> {
>   "language": "liquid",
>   "liquid": {
>     "normalizeSpacing": true
>   },
>   "markup": {
>     "forceAttribute": true
>   }
> }
> ```

    `{% # Testing HTML tag delimiter characters ">" and "<" within HTML attribute values. %}␊
    ␊
    <div␊
      data-a="a > b"␊
      data-b="c < d"␊
      data-c="e f > g < h"␊
      data-d="j < k > l"></div>`

> ```js
> {
>   "language": "liquid",
>   "liquid": {
>     "normalizeSpacing": true
>   },
>   "markup": {
>     "forceAttribute": true
>   }
> }
> ```

    `{% # Testing Liquid token containing HTML tag delimiter characters ">" and "<" within attribute values %}␊
    ␊
    <div␊
      {% if a > b %}␊
      data-a␊
      {% endif %}␊
      {% if c < d %}␊
      data-b␊
      {% endif %}␊
      {% unless e > f and g < h %}␊
      data-c="a > b"␊
      {% elsif i > j %}␊
      data-d="a > b"␊
      {% endunless %}␊
      {% if < k and l > m %}␊
      {{ output_1 | filter: '>' | filter: '<' }}␊
      {% else %}␊
      {{ output_2 | filter: '<' | filter: '>' }}␊
      {% endif %}></div>`

> ```js
> {
>   "language": "liquid",
>   "liquid": {
>     "normalizeSpacing": true
>   },
>   "markup": {
>     "forceAttribute": true
>   }
> }
> ```

    `{% # Testing Liquid tokens as attributes and containing HTML tag delimiter characters ">" and "<" %}␊
    ␊
    <div␊
      {% if a > b %}␊
      data-a␊
      {% endif %}␊
      {% if c < d %}␊
      data-b␊
      {% endif %}␊
      {% unless e > f and g < h %}data-c="a > b"{% elsif i > j %}data-d="a > b"{% endunless %}␊
      {% if < k and l > m %}␊
      {{ output_1 | filter: '>' | filter: '<' }}␊
      {% else %}␊
      {{ output_2 | filter: '<' | filter: '>' }}␊
      {% endif %}></div>`

## Casing rule cases

> ```js
> {
>   "language": "liquid",
>   "markup": {
>     "attributeCasing": "preserve"
>   }
> }
> ```

    `{% # Testing HTML  "attributeCasing" rule. This case tests HTML attributes only. %}␊
    ␊
    <div␊
      ID="FOO"␊
      class="HelloWorld"␊
      data-VaLuE="eXampLE"␊
      DATA-BOOLEAN></div>`

> ```js
> {
>   "language": "liquid",
>   "markup": {
>     "attributeCasing": "lowercase"
>   }
> }
> ```

    `{% # Testing HTML  "attributeCasing" rule. This case tests HTML attributes only. %}␊
    ␊
    <div␊
      id="foo"␊
      class="helloworld"␊
      data-value="example"␊
      data-boolean></div>`

> ```js
> {
>   "language": "liquid",
>   "markup": {
>     "attributeCasing": "lowercase-name"
>   }
> }
> ```

    `{% # Testing HTML  "attributeCasing" rule. This case tests HTML attributes only. %}␊
    ␊
    <div␊
      id="FOO"␊
      class="HelloWorld"␊
      data-value="eXampLE"␊
      data-boolean></div>`

> ```js
> {
>   "language": "liquid",
>   "markup": {
>     "attributeCasing": "lowercase-value"
>   }
> }
> ```

    `{% # Testing HTML  "attributeCasing" rule. This case tests HTML attributes only. %}␊
    ␊
    <div␊
      ID="foo"␊
      class="helloworld"␊
      data-VaLuE="example"␊
      data-boolean></div>`

> ```js
> {
>   "language": "liquid",
>   "markup": {
>     "attributeCasing": "preserve"
>   }
> }
> ```

    `{% # Testing HTML (markup) "attributeCasing" rule with Liquid attributes %}␊
    ␊
    <div␊
      {{ xx }}-ID="FOO"␊
      class="HelloWorld"␊
      data-VaLuE="eXampLE"␊
      DATA-BOOLEAN></div>`

> ```js
> {
>   "language": "liquid",
>   "markup": {
>     "attributeCasing": "lowercase"
>   }
> }
> ```

    `{% # Testing HTML (markup) "attributeCasing" rule with Liquid attributes %}␊
    ␊
    <div␊
      {{ xx }}-id="foo"␊
      class="helloworld"␊
      data-value="example"␊
      data-boolean></div>`

> ```js
> {
>   "language": "liquid",
>   "markup": {
>     "attributeCasing": "lowercase-name"
>   }
> }
> ```

    `{% # Testing HTML (markup) "attributeCasing" rule with Liquid attributes %}␊
    ␊
    <div␊
      {{ xx }}-id="FOO"␊
      class="HelloWorld"␊
      data-value="eXampLE"␊
      data-boolean></div>`

> ```js
> {
>   "language": "liquid",
>   "markup": {
>     "attributeCasing": "lowercase-value"
>   }
> }
> ```

    `{% # Testing HTML (markup) "attributeCasing" rule with Liquid attributes %}␊
    ␊
    <div␊
      {{ xx }}-ID="foo"␊
      class="helloworld"␊
      data-VaLuE="example"␊
      data-boolean></div>`

## Quote conversion within values

> ```js
> {
>   "language": "liquid",
>   "markup": {
>     "quoteConvert": "none"
>   }
> }
> ```

    `{% # single quotation "'" characters nesting in HTML attribute values. %}␊
    ␊
    <div␊
      id="{{ 'single' | single: 'double' }}"␊
      class="{% if 'single' %} {{ x | filter: 'quotes' }} {% endif %}"></div>`

> ```js
> {
>   "language": "liquid",
>   "markup": {
>     "quoteConvert": "double"
>   }
> }
> ```

    `{% # single quotation "'" characters nesting in HTML attribute values. %}␊
    ␊
    <div␊
      id="{{ 'single' | single: 'double' }}"␊
      class="{% if 'single' %} {{ x | filter: 'quotes' }} {% endif %}"></div>`

> ```js
> {
>   "language": "liquid",
>   "markup": {
>     "quoteConvert": "single"
>   }
> }
> ```

    `{% # single quotation "'" characters nesting in HTML attribute values. %}␊
    ␊
    <div␊
      id="{{ "single" | single: "double" }}"␊
      class="{% if "single" %} {{ x | filter: "quotes" }} {% endif %}"></div>`

> ```js
> {
>   "language": "liquid",
>   "markup": {
>     "quoteConvert": "none"
>   }
> }
> ```

    `{% # single quotation "'" characters nesting in HTML attribute values. %}␊
    ␊
    <div␊
      id="{{ 'single' | single: 'double' }}"␊
      class="{% if 'single' %} {{ x | filter: 'quotes' }} {% endif %}"></div>`

> ```js
> {
>   "language": "liquid",
>   "markup": {
>     "quoteConvert": "none"
>   }
> }
> ```

    `{% # double quotation '"' characters nesting in HTML attribute values %}␊
    ␊
    <div␊
      id="{{ "double" | double: "double" }}"␊
      class="{% if "double" %} {{ x | filter: "double" }} {% endif %}"></div>`

> ```js
> {
>   "language": "liquid",
>   "markup": {
>     "quoteConvert": "double"
>   }
> }
> ```

    `{% # double quotation '"' characters nesting in HTML attribute values %}␊
    ␊
    <div␊
      id="{{ 'double' | double: 'double' }}"␊
      class="{% if 'double' %} {{ x | filter: 'double' }} {% endif %}"></div>`

> ```js
> {
>   "language": "liquid",
>   "markup": {
>     "quoteConvert": "single"
>   }
> }
> ```

    `{% # double quotation '"' characters nesting in HTML attribute values %}␊
    ␊
    <div␊
      id="{{ "double" | double: "double" }}"␊
      class="{% if "double" %} {{ x | filter: "double" }} {% endif %}"></div>`

> ```js
> {
>   "language": "liquid",
>   "markup": {
>     "quoteConvert": "none"
>   }
> }
> ```

    `{% # double quotation '"' characters nesting in HTML attribute values %}␊
    ␊
    <div␊
      id="{{ "double" | double: "double" }}"␊
      class="{% if "double" %} {{ x | filter: "double" }} {% endif %}"></div>`

> ```js
> {
>   "language": "liquid",
>   "markup": {
>     "quoteConvert": "none"
>   }
> }
> ```

    `{% # mixture of double and single quotations nesting in HTML attribute values %}␊
    ␊
    <div␊
      id='{{ "double" | single: 'single' | double: "quotes" }}'␊
      class="{% if 'single' %} {{ "double" | filter: 'single' }} {% endif %}"></div>`

> ```js
> {
>   "language": "liquid",
>   "markup": {
>     "quoteConvert": "double"
>   }
> }
> ```

    `{% # mixture of double and single quotations nesting in HTML attribute values %}␊
    ␊
    <div␊
      id='{{ 'double' | single: 'single' | double: 'quotes' }}'␊
      class="{% if 'single' %} {{ 'double' | filter: 'single' }} {% endif %}"></div>`

> ```js
> {
>   "language": "liquid",
>   "markup": {
>     "quoteConvert": "single"
>   }
> }
> ```

    `{% # mixture of double and single quotations nesting in HTML attribute values %}␊
    ␊
    <div␊
      id='{{ "double" | single: "single" | double: "quotes" }}'␊
      class="{% if "single" %} {{ "double" | filter: "single" }} {% endif %}"></div>`

> ```js
> {
>   "language": "liquid",
>   "markup": {
>     "quoteConvert": "none"
>   }
> }
> ```

    `{% # mixture of double and single quotations nesting in HTML attribute values %}␊
    ␊
    <div␊
      id='{{ "double" | single: 'single' | double: "quotes" }}'␊
      class="{% if 'single' %} {{ "double" | filter: 'single' }} {% endif %}"></div>`

## Sorting alphabetically

> ```js
> {
>   "language": "liquid",
>   "markup": {
>     "attributeSort": false
>   }
> }
> ```

    `{% # Sorting attributes alphabetically %}␊
    ␊
    <main␊
      id="three"␊
      class="one"␊
      data-a="two">␊
    ␊
      <div␊
        data-c="3"␊
        data-b="2"␊
        data-d="4"␊
        data-e="5"␊
        data-e="6"␊
        data-a="1"␊
        id="last"></div>␊
    </main>`

> ```js
> {
>   "language": "liquid",
>   "markup": {
>     "attributeSort": true
>   }
> }
> ```

    `{% # Sorting attributes alphabetically %}␊
    ␊
    <main␊
      class="one"␊
      data-a="two"␊
      id="three">␊
    ␊
      <div␊
        data-a="1"␊
        data-b="2"␊
        data-c="3"␊
        data-d="4"␊
        data-e="5"␊
        data-e="6"␊
        id="last"></div>␊
    </main>`

## Sorting using sort list

> ```js
> {
>   "language": "liquid",
>   "markup": {
>     "attributeSort": true
>   }
> }
> ```

    `{% # Sorting attributes with sort list%}␊
    ␊
    <ul>␊
    ␊
      <li␊
        class="x"␊
        data-a="1"␊
        data-b="2"␊
        data-c="3"␊
        data-d="4"␊
        data-e="5"␊
        data-e="6"></li>␊
    ␊
      <li␊
        class="x {{ will.sort  }}"␊
        data-a="1"␊
        data-b="2"␊
        data-c="3"></li>␊
    </ul>`

> ```js
> {
>   "language": "liquid",
>   "markup": {
>     "attributeSort": true,
>     "attributeSortList": [
>       "data-b",
>       "data-e",
>       "class",
>       "data-a"
>     ]
>   }
> }
> ```

    `{% # Sorting attributes with sort list%}␊
    ␊
    <ul>␊
    ␊
      <li␊
        data-b="2"␊
        data-e="5"␊
        class="x"␊
        data-a="1"␊
        data-c="3"␊
        data-d="4"␊
        data-e="6"></li>␊
    ␊
      <li␊
        data-b="2"␊
        class="x {{ will.sort  }}"␊
        data-a="1"␊
        data-c="3"></li>␊
    </ul>`