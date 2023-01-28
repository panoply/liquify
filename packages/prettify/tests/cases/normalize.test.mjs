import test from 'ava';
import { forAssert, liquid } from '@liquify/ava/prettify';
import prettify from '@liquify/prettify';

test('Spacing in object expressions', t => {

  forAssert(
    [

      [
        liquid`{{  object .  property  }}`,
        liquid`{{ object.property }}`
      ]
      ,
      [
        liquid`{{ object   .property  [  " foo "  ]   .foo }}`,
        liquid`{{ object.property[" foo "].foo }}`
      ],
      [
        liquid`{{   object.  property[  foo]   }}`,
        liquid`{{ object.property[foo] }}`
      ]

    ]
  )(function (source, expect) {

    const actual = prettify.format.sync(source, {
      language: 'liquid',
      liquid: {
        normalizeSpacing: true
      }
    });

    t.is(actual, expect);

  });

});

test('Spacing in control operators', t => {

  forAssert(
    [

      [
        liquid`{% if  foo>bar  or  foo>  bar  or  foo  >bar   or  foo  >   bar   %}{% endif %}`,
        liquid`{% if foo > bar or foo > bar or foo > bar or foo > bar %}{% endif %}`
      ],
      [
        liquid`{% if  foo<bar  or  foo<  bar  or  foo  <bar  or   foo  <   bar   %}{% endif %}`,
        liquid`{% if foo < bar or foo < bar or foo < bar or foo < bar %}{% endif %}`
      ],
      [
        liquid`{% if  foo==bar  or foo== bar  or foo  ==bar  or foo   ==   bar %}{% endif %}`,
        liquid`{% if foo == bar or foo == bar or foo == bar or foo == bar %}{% endif %}`
      ],
      [
        liquid`{% if  foo!=bar  or foo!= bar  or foo  !=bar  or foo   !=   bar %}{% endif %}`,
        liquid`{% if foo != bar or foo != bar or foo != bar or foo != bar %}{% endif %}`
      ],
      [
        liquid`{% if  foo<=bar or foo<=   bar  or foo   <=bar  or   foo   <=    bar   %}{% endif %}`,
        liquid`{% if foo <= bar or foo <= bar or foo <= bar or foo <= bar %}{% endif %}`
      ],
      [
        liquid`{% if  foo>=bar or   foo>=   bar  or   foo  >=bar or     foo  >=   bar   %}{% endif %}`,
        liquid`{% if foo >= bar or foo >= bar or foo >= bar or foo >= bar %}{% endif %}`
      ],
      [
        liquid`
        {%   case   object   .   prop [ 0 ]   %}
          {%  when  prop1  ,  prop2  ,'three','four'  %}
        {% endcase  %}
        `,
        liquid`
        {% case object.prop[0] %}
          {% when prop1, prop2, 'three', 'four' %}
        {% endcase %}
        `
      ]
    ]
  )(function (source, expect) {

    const actual = prettify.format.sync(source, {
      language: 'liquid',
      liquid: {
        normalizeSpacing: true
      }
    });

    t.is(actual, expect);

  });

});

test('Spacing in filter expressions', t => {

  forAssert(
    [

      [
        liquid`{{  object .  property   |  filter:   ' bar '   |  filter:  t:   'text   '    }}`,
        liquid`{{ object.property | filter: ' bar ' | filter: t: 'text   ' }}`
      ]
      ,
      [
        liquid`{{  object .  property|filter  :'bar'   |  filter:t:100   }}`,
        liquid`{{ object.property | filter: 'bar' | filter: t: 100 }}`
      ]
      ,
      [
        liquid`{{  'foo'     |filter|filter:  'bar'|  append:'from','to'  }}`,
        liquid`{{ 'foo' | filter | filter: 'bar' | append: 'from', 'to' }}`
      ]
      ,
      [
        liquid`{{  'foo'|filter|filter:'bar'  ,300|append:'from','to',something,1000  }}`,
        liquid`{{ 'foo' | filter | filter: 'bar', 300 | append: 'from', 'to', something, 1000 }}`
      ]
    ]
  )(function (source, expect) {

    const actual = prettify.format.sync(source, {
      language: 'liquid',
      liquid: {
        normalizeSpacing: true
      }
    });

    t.is(actual, expect);

  });

});

test('Spacing in assignment', t => {

  forAssert(
    [
      [
        liquid`{%  assign   foo='bar'   %}`,
        liquid`{% assign foo = 'bar' %}`
      ]
      ,
      [
        liquid`{%   assign     foo . bar   =    'bar'   %}`,
        liquid`{% assign foo.bar = 'bar' %}`
      ]
      ,
      [
        liquid`{%  assign   foo=   'bar'   %}`,
        liquid`{% assign foo = 'bar' %}`
      ]
      ,
      [
        liquid`{%  assign   foo   ='bar'   %}`,
        liquid`{% assign foo = 'bar' %}`
      ]
    ]
  )(function (source, expect) {

    const actual = prettify.format.sync(source, {
      language: 'liquid',
      liquid: {
        normalizeSpacing: true
      }
    });

    t.is(actual, expect);

  });

});

test('Spacing in arguments', t => {

  forAssert(
    [
      [
        liquid`{%  render 'foo' ,   foo :   'bar' ,foo:'bar'  , foo :bar  %}`,
        liquid`{% render 'foo', foo: 'bar', foo: 'bar', foo: bar %}`
      ],
      [
        liquid`{%  render 'foo' with object [prop ] as arr [0 ] ,  foo :   'bar' ,foo:'bar'  , foo :bar  %}`,
        liquid`{% render 'foo' with object[prop] as arr[0], foo: 'bar', foo: 'bar', foo: bar %}`
      ]

    ]
  )(function (source, expect) {

    const actual = prettify.format.sync(source, {
      language: 'liquid',
      liquid: {
        normalizeSpacing: true
      }
    });

    t.is(actual, expect);

  });

});

test('Spacing in parameters', t => {

  forAssert(
    [
      [
        liquid`{%  for    x   in   object . prop [ 'array'  ] parameter  :  2000  %}{%   endif  %}`,
        liquid`{% for x in object.prop['array'] parameter: 2000 %}{% endif %}`
      ],
      [
        liquid`{%  for    x   in   (foo .. bar) parameter  :  2000  %}{%   endif  %}`,
        liquid`{% for x in (foo..bar) parameter: 2000 %}{% endif %}`
      ],
      [
        liquid`{%  for    x   in   (10 . . 200) parameter  :  2000 param  limit :1  %}{%   endif  %}`,
        liquid`{% for x in (10..200) parameter: 2000 param limit: 1 %}{% endif %}`
      ]

    ]
  )(function (source, expect) {

    const actual = prettify.format.sync(source, {
      language: 'liquid',
      liquid: {
        normalizeSpacing: true
      }
    });

    t.is(actual, expect);

  });

});

test('Spacing skipping strings', t => {

  forAssert(
    [

      [
        liquid`{% if  '   space left'=='   space between    '    %}{% endif %}`,
        liquid`{% if '   space left' == '   space between    ' %}{% endif %}`
      ],
      [
        liquid`{% if  'double in single'!='   "double"    '    %}{% endif %}`,
        liquid`{% if 'double in single' != '   "double"    ' %}{% endif %}`
      ],
      [
        liquid`{{  'xxx'|replace:'"double"','single'|filter  : "single in 'double' "|filter :100    }}`,
        liquid`{{ 'xxx' | replace: '"double"', 'single' | filter: "single in 'double' " | filter: 100 }}`
      ],
      [
        liquid`{{  'edge case quotes'  |prepend: '"'|append  :  "'"|filter|replace : " ' ",'"'|abs  }}`,
        liquid`{{ 'edge case quotes' | prepend: '"' | append: "'" | filter | replace: " ' ", '"' | abs }}`
      ],
      [
        liquid`{{   'space right   '  |   filter:  '   space left'  }}`,
        liquid`{{ 'space right   ' | filter: '   space left' }}`
      ],
      [
        liquid`{{   'test escaped'  |   filter:  'using \'escaped\' single'  |  quoted  :true }}`,
        liquid`{{ 'test escaped' | filter: 'using \'escaped\' single' | quoted: true }}`
      ],
      [
        liquid`{{   "test escaped"  |   filter:  "using \"escaped\" double"  |  quoted  :true }}`,
        liquid`{{ "test escaped" | filter: "using \"escaped\" double" | quoted: true }}`
      ]
    ]
  )(function (source, expect) {

    const actual = prettify.format.sync(source, {
      language: 'liquid',
      liquid: {
        normalizeSpacing: true
      }
    });

    t.is(actual, expect);

  });

});
