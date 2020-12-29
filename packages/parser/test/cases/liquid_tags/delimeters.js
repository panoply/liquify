export default (
  [
    {
      title: 'LIQUID TAG DELIMETERS\n',
      description: 'Test Liquid tag delimeters',
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
      title: 'LIQUID OBJECT TAG DELIMETERS\n',
      description: 'Test Liquid object tag delimeters',
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
