export default ([
  {
    title: 'LIQUID TAG WHITESPACE\n',
    capture: {
      regex: /[\s]/g,
      colour: 'bgGrey',
      stringify: true
    },
    tests: (
      [
        '{% space %}',
        '{%no_space%}',
        '{%         space_around        %}',
        '{%space_right    %}',
        '{%    space_left%}',
        '{{ space }}',
        '{{no_space}}',
        '{{        space_around         }}',
        '{{space_right    }}',
        '{{    space_left}}'
      ]
    )
  },
  {
    title: 'LIQUID TAG TABS\n',
    capture: {
      regex: /[\\][t]/g,
      colour: 'blueBright',
      stringify: true
    },
    tests: (
      [
        '{%\ttabs\t%}',
        '{%\t\t\ttab_around\t\t\t%}',
        '{%tab_right\t%}',
        '{%\t\ttab_left%}',
        '{{\ttabs\t}}',
        '{{\t\t\ttab_around\t\t\t}}',
        '{{tab_right\t}}',
        '{{\t\ttab_left}}'
      ]
    )
  },
  {
    title: 'LIQUID TAG NEWLINES\n',
    capture: {
      regex: /[\\][n]/g,
      colour: 'blueBright',
      stringify: true
    },
    tests: (
      [
        '{%\nnewline\n%}',
        '{%\nnewline_left%}',
        '{%newline_right\n%}',
        '{%\n\n\nnewline_multiple\n\n\n\n%}',
        '{{\nnewline\n}}',
        '{{\nnewline_left}}',
        '{{newline_right\n}}',
        '{{\n\n\nnewline_multiple\n\n\n\n}}'
      ]
    )
  },
  {

    title: 'LIQUID TAG STRING SKIP\n',
    capture: {
      regex: /[\\"'][^\\'"]+[\\"']/g,
      colour: 'yellowBright',
      stringify: false
    },
    tests: (
      [
        '{%- tag = \'string\' | filter: \'{{ object_in_string }}\' -%}',
        '{%- tag = "{% singular_in_string %}" -%}',
        '{{ object | filter: \'{{ object_in_string }}\' }}',
        '{{object|filter:\'{{object_in_string}}\'}}',
        '{{ object | filter: "{%- start -%} {{ tag }} {% endstart%}" }}',
        '{% tag = \'value\' | filter: "escape \\" here \\" " -%}'
      ]
    )

  }
])
