export const script_unformatted = `
const asibrace = function lexer_script_asibrace () {
let aa = parse.count;
do {
  aa = aa - 1;
} while (aa > -1 && data.token[aa] === 'x}');
if (data.stack[aa] === 'else') {
  return recordPush('');
}
aa = aa + 1;
parse.splice({
  data: data
  , howmany: 0
  , index: aa
  , record: {
    begin: data.begin[aa]
    , ender: -1
    , lexer: 'script'
    , lines: parse.linesSpace
    , stack: data.stack[aa]
    , token: ltoke
    , types: ltype
  }
});
recordPush('');
};

`;

/**
 * Invalid Script
 *
 * Error is the unterminated string in the if condition
 */
export const script_with_liquid = `
{% if exists %}
  (function($) {
    'use strict';

    function(){
      var x = {{ settings.x  }};
      var y = {{ settings.y | json }};

      {% assign z_array = settings.z | strip_newlines | split: ',' %}
      var zArray = [
        {% for a in z %}
        {% assign a_x = a | split: ':' | first %}
        {% assign a_y = a | split: ':' | last | plus: 0 %}
        {
          x:'{{ a_x }}',
          y: {{ a_y }}
        }{% unless forloop.last %},{% endunless %}
        {% endfor %}
      ];
    });
  };

{% endif %}
`;

/**
 * Invalid Script
 *
 * Error is the unterminated string in the if condition
 */
export const script_invalid = `
const asibrace = function lexer_script_asibrace () {
let aa = parse.count;
do {
  aa = aa - 1;
} while (aa > -1 && data.token[aa] === 'x}');

if (data.stack[aa] === 'else) {
  return recordPush('');
}

aa = aa + 1;
parse.splice({
  data: data
  , howmany: 0
  , index: aa
  , record: {
    begin: data.begin[aa]
    , ender: -1
    , lexer: 'script'
    , lines: parse.linesSpace
    , stack: data.stack[aa]
    , token: ltoke
    , types: ltype
  }
});
recordPush('');
};

`;
