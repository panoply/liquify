import test from 'ava';
import { liquid, forSnippet, explore } from '@liquify/ava/parser';
import { LiquidParser } from '@liquify/liquid-parser';

export const parser = new LiquidParser(
  {
    engine: 'shopify'
  }
);

test('assign', t => {

  forSnippet(
    [
      liquid`{% assign is_nil = nil %}`
      ,
      liquid`{% assign truthy = true %}`
      ,
      liquid`{% assign falsey = false %}`
      ,
      liquid`{% assign float = -100.20 %}`
      ,
      liquid`{% assign number = 200 %}`
      ,
      liquid`{% assign string_double = "string" %}`
      ,
      liquid`{% assign string_single = 'string' %}`
      ,
      liquid`{% assign variable = foo %}`
      ,
      liquid`{% assign with_filter = "hello" | append: "world" | upcase %}`
      ,
      liquid`{% assign with_split = "one,two,three" | split: "," %}`
    ]
  )(function (sample) {

    const ast = parser.parse(sample);

    explore.errors(t)(ast);

    t.snapshot(ast);

  });

});

test('capture', t => {

  forSnippet(
    [
      liquid`
      {% capture foo %}
        Hello {{ variable }}! The is some text.
      {% endcapture %}
      `
    ]
  )(function (sample) {

    const ast = parser.parse(sample);

    explore.errors(t)(ast);

    t.snapshot(ast);

  });

});

test('case', t => {

  forSnippet(
    [
      liquid`
      {% case 100 %}
        {% when 25 %}
          foo
        {% when 50 %}
          bar
        {% when 75 %}
          baz
        {% else %}
          qux
      {% endcase %}
    `,
      liquid`
      {% case 'string' %}
        {% when 'foo' %}
          one
        {% when 'bar' %}
          two
        {% when 'baz' %}
          three
        {% else %}
          four
      {% endcase %}
    `,
      liquid`
      {% case variable %}
        {% when foo %}
          one
        {% when bar %}
          two
        {% when baz %}
          three
        {% else %}
          four
      {% endcase %}
    `,
      liquid`
      {% case 'multipe' %}
        {% when foo %}
          one
        {% when bar, baz, qux %}
          two
        {% when 'foo', bar, 100, nil, false %}
          three
        {% else %}
          four
      {% endcase %}
    `
    ]
  )(function (sample) {

    const ast = parser.parse(sample);

    explore.errors(t)(ast);

    t.snapshot(ast);

  });

});

test('if', t => {

  forSnippet(
    [
      liquid`{% if 'string' %}{% endif %}`
      ,
      liquid`{% if true %}{% endif %}`
      ,
      liquid`{% if false %}{% endif %}`
      ,
      liquid`{% if nil %}{% endif %}`
      ,
      liquid`{% if 100 %}{% endif %}`
      ,
      liquid`{% if -10 %}{% endif %}`
      ,
      liquid`{% if -100.50 %}{% endif %}`
      ,
      liquid`{% if truthy %}{% endif %}`
      ,
      liquid`{% if more_than > 100 %}{% endif %}`
      ,
      liquid`{% if less_than < 100 %}{% endif %}`
      ,
      liquid`{% if greater_or_equal >= 100 %}{% endif %}`
      ,
      liquid`{% if less_or_equal <= 100 %}{% endif %}`
      ,
      liquid`{% if equal == 'string' %}{% endif %}`
      ,
      liquid`{% if not_equal != 'string' %}{% endif %}`
      ,
      liquid`{% if is_truthy? %}{% endif %}`
      ,
      liquid`{% if foo or bar %}{% endif %}`
      ,
      liquid`{% if 'foo' == bar or 100 > more_than or truthy %}{% endif %}`
      ,
      liquid`{% if cond == nil and is_truthy? %}{% endif %}`
      ,
      liquid`{% if cond == nil and is_truthy? and less_than < 100 %}{% endif %}`
      ,
      liquid`{% if cond == 100 or is_truthy? and less_than < 100 or false %}{% endif %}`
      ,
      liquid`{% if cond contains 'contains' %}{% endif %}`
      ,
      liquid`{% if 'array' contains foo and greater_or_equal >= 100 %}{% endif %}`
    ]
  )(function (sample) {

    // t.log(sample.slice(0, sample.indexOf('{%', 2)));

    const ast = parser.parse(sample);

    explore.errors(t)(ast);

    t.snapshot(ast);

  });

});

test('else', t => {

  forSnippet(
    [
      liquid`{% if 'string' %}{% else %}{% endif %}`
      ,
      liquid`{% unless foo != 'bar' %}{% else %}{% endunless %}`
      ,
      liquid`{% if foo %}{% elsif 100 > 200 %}{% else %}{% endif %}`

    ]
  )(function (sample) {

    const ast = parser.parse(sample);

    explore.errors(t)(ast);

    t.snapshot(ast);

  });

});

test('elsif', t => {

  forSnippet(
    [
      liquid`
      {% if string %}
      {% elsif 'string' %}
      {% endif %}
      `,
      liquid`
      {% unless boolean_true %}
      {% elsif true %}
      {% endunless %}
      `,
      liquid`
      {% if boolean_false %}
      {% elsif false %}
      {% endif %}
      `,
      liquid`
      {% unless is_nil %}
      {% elsif nil %}
      {% endunless %}
      `,
      liquid`
      {% if number %}
      {% elsif 100 %}
      {% endif %}
      `,
      liquid`
      {% unless negative_float %}
      {% elsif -10 %}
      {% endunless %}
      `,
      liquid`
      {% if negative_float_decimal %}
      {% elsif -200.20 %}
      {% endif %}
      `,
      liquid`
      {% if 'truthy' %}
      {% elsif truthy %}
      {% endif %}
      `,
      liquid`
      {% unless 'more_than' %}
      {% elsif more_than > 100 %}
      {% endunless %}
      `,
      liquid`
      {% if 'less_than' %}
      {% elsif 50 < 100 %}
      {% endif %}
      `,
      liquid`
      {% if 'greater_or_equal' %}
      {% elsif 200 >= 100 %}
      {% endif %}
      `,
      liquid`
      {% if 'less_or_equal' %}
      {% elsif 40000.21 <= 100 %}
      {% endif %}
      `,
      liquid`
      {% unless 'equal' %}
      {% elsif variable == 'string' %}
      {% endunless %}
      `,
      liquid`
      {% if 'not_equal' %}
      {% elsif variable != 'string' %}
      {% endif %}
      `,
      liquid`
      {% unless 'is_truthy' %}
      {% elsif foo? %}
      {% endunless %}
      `,
      liquid`
      {% if 'using_or' %}
      {% elsif foo or bar %}
      {% endif %}
      `,
      liquid`
      {% unless 'multiple_or' %}
      {% elsif 'foo' == bar or 100 > more_than or truthy %}
      {% endunless %}
      `,
      liquid`
      {% if 'using_and' %}
      {% elsif cond == nil and is_truthy? %}
      {% endif %}
      `,
      liquid`
      {% unless 'using_multiple_and' %}
      {% elsif cond != nil and is_truthy? and less_than < 100 %}
      {% endunless %}
      `,
      liquid`
      {% if 'using_or_and_and' %}
      {% elsif cond == 100 or is_truthy? and less_than < 100 or false %}
      {% endif %}
      `,
      liquid`
      {% unless 'contains' %}
      {% elsif cond contains 'contains' %}
      {% endunless %}
      `,
      liquid`
      {% if 'multiple_contains' %}
      {% elsif 'array' contains foo and greater_or_equal >= 100 %}
      {% endif %}
      `
    ]
  )(function (sample) {

    const ast = parser.parse(sample);

    explore.errors(t)(ast);

    t.snapshot(ast);

  });

});

test('unless', t => {

  forSnippet(
    [
      liquid`{% unless 'string' %}{% endunless %}`
      ,
      liquid`{% unless true %}{% endunless %}`
      ,
      liquid`{% unless false %}{% endunless %}`
      ,
      liquid`{% unless nil %}{% endunless %}`
      ,
      liquid`{% unless 100 %}{% endunless %}`
      ,
      liquid`{% unless -10 %}{% endunless %}`
      ,
      liquid`{% unless -100.50 %}{% endunless %}`
      ,
      liquid`{% unless truthy %}{% endunless %}`
      ,
      liquid`{% unless more_than > 100 %}{% endunless %}`
      ,
      liquid`{% unless less_than < 100 %}{% endunless %}`
      ,
      liquid`{% unless greater_or_equal >= 100 %}{% endunless %}`
      ,
      liquid`{% unless less_or_equal <= 100 %}{% endunless %}`
      ,
      liquid`{% unless equal == 'string' %}{% endunless %}`
      ,
      liquid`{% unless not_equal != 'string' %}{% endunless %}`
      ,
      liquid`{% unless is_truthy? %}{% endunless %}`
      ,
      liquid`{% unless foo or bar %}{% endunless %}`
      ,
      liquid`{% unless 'foo' == bar or 100 > more_than or truthy %}{% endunless %}`
      ,
      liquid`{% unless cond == nil and is_truthy? %}{% endunless %}`
      ,
      liquid`{% unless cond == nil and is_truthy? and less_than < 100 %}{% endunless %}`
      ,
      liquid`{% unless cond == 100 or is_truthy? and less_than < 100 or false %}{% endunless %}`
      ,
      liquid`{% unless cond contains 'contains' %}{% endunless %}`
      ,
      liquid`{% unless 'array' contains foo and greater_or_equal >= 100 %}{% endunless %}`
    ]
  )(function (sample) {

    const ast = parser.parse(sample);

    explore.errors(t)(ast);

    t.snapshot(ast);
  });

});

test('for', t => {

  forSnippet(
    [
      liquid`{% for iteree in array %}{% endfor %}`
      ,
      liquid`{% for iteree in (1..300) %}{% endfor %}`
      ,
      liquid`{% for iteree in (foo..300) %}{% endfor %}`
      ,
      liquid`{% for iteree in (0..foo) %}{% endfor %}`
      ,
      liquid`{% for iteree in (foo..bar) %}{% endfor %}`
      ,
      liquid`{% for iteree in array reversed %}{% endfor %}`
      ,
      liquid`{% for iteree in array limit: 10  %}{% endfor %}`
      ,
      liquid`{% for iteree in array limit: variable  %}{% endfor %}`
      ,
      liquid`{% for iteree in array offset: 10  %}{% endfor %}`
      ,
      liquid`{% for iteree in array offset: variable  %}{% endfor %}`
      ,
      liquid`{% for iteree in array reversed offset: 10 %}{% endfor %}`
      ,
      liquid`{% for iteree in array  offset: var reversed %}{% endfor %}`
      ,
      liquid`{% for iteree in array  offset: var reversed limit: var %}{% endfor %}`
      ,
      liquid`{% for iteree in array  reversed offset: var limit: var %}{% endfor %}`
      ,
      liquid`{% for iteree in (1..300) offset: 10 %}{% endfor %}`
      ,
      liquid`{% for iteree in (foo..300) reversed offset: 200 limit: 10 %}{% endfor %}`
      ,
      liquid`{% for iteree in (0..foo) offset: 20 reversed limit: 10 %}{% endfor %}`
      ,
      liquid`{% for iteree in (foo..bar) offset: 30 limit: var %}{% endfor %}`
    ]
  )(function (sample, { size, last, tokens }) {

    const ast = parser.parse(sample);

    explore.errors(t)(ast);

    t.snapshot(ast);

  });

});

test('tablerow', t => {

  forSnippet(
    [
      liquid`{% tablerow i in array %}{% endtablerow %}`
      ,
      liquid`{% tablerow i in (1..300) %}{% endtablerow %}`
      ,
      liquid`{% tablerow i in (foo..300) %}{% endtablerow %}`
      ,
      liquid`{% tablerow i in (0..foo) %}{% endtablerow %}`
      ,
      liquid`{% tablerow i in (foo..bar) %}{% endtablerow %}`
      ,
      liquid`{% tablerow i in array cols: 10 %}{% endtablerow %}`
      ,
      liquid`{% tablerow i in array cols: var %}{% endtablerow %}`
      ,
      liquid`{% tablerow i in array limit: 10  %}{% endtablerow %}`
      ,
      liquid`{% tablerow i in array limit: variable  %}{% endtablerow %}`
      ,
      liquid`{% tablerow i in array offset: 10  %}{% endtablerow %}`
      ,
      liquid`{% tablerow i in array offset: variable  %}{% endtablerow %}`
      ,
      liquid`{% tablerow i in array cols: 7 offset: 10 %}{% endtablerow %}`
      ,
      liquid`{% tablerow i in array  offset: var cols: var %}{% endtablerow %}`
      ,
      liquid`{% tablerow i in array  offset: var cols: 7 limit: var %}{% endtablerow %}`
      ,
      liquid`{% tablerow i in array  cols: 7 offset: var limit: var %}{% endtablerow %}`
      ,
      liquid`{% tablerow i in (1..300) offset: 10 %}{% endtablerow %}`
      ,
      liquid`{% tablerow i in (foo..300) cols: 7 offset: 200 limit: 10 %}{% endtablerow %}`
      ,
      liquid`{% tablerow i in (0..foo) offset: 20 cols: var limit: 10 %}{% endtablerow %}`
      ,
      liquid`{% tablerow i in (foo..bar) offset: 30 limit: var %}{% endtablerow %}`
    ]
  )(function (sample) {

    const ast = parser.parse(sample);

    explore.errors(t)(ast);

    t.pass();
    // t.snapshot(ast);

  });

});

test.todo('render');
test.todo('echo');
test.todo('section');
test.todo('include');
test.todo('paginate');
test.todo('cycle');
test.todo('form');
test.todo('layout');
