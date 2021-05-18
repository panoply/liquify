export default (
  [
    {
      title: 'LIQUID TAG DELIMITERS\n',
      description: 'Test Liquid tag delimiters',
      capture: {
        regex: /[\s]/g,
        colour: 'bgGrey',
        stringify: true
      },
      tests: (
        [
          '{%- dash -%}',
          '{%-dash_no_space-%}',
          '{%- left_dash %}',
          '{% right_dash -%}',
          '{%-\n\ndash_left_newlines-%}',
          '{%-dash_right_newlines\n\n-%}',
          '{%-\ndash_newlines\n-%}'
        ]
      )
    },
    {
      title: 'LIQUID OBJECT TAG DELIMITERS\n',
      description: 'Test Liquid object tag delimiters',
      capture: {
        regex: /[\s]/g,
        colour: 'bgGrey',
        stringify: true
      },
      tests: (
        [
          '{{- dash -}}',
          '{{-dash_no_space-}}',
          '{{- left_dash }}',
          '{{ right_dash -}}',
          '{{-\n\ndash_left_newlines-}}',
          '{{-dash_right_newlines\n\n-}}',
          '{{-\ndash_newlines\n-}}'
        ]
      )
    }
  ]
)
