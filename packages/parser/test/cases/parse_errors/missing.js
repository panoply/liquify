export default (
  [
    {
      title: 'Missing Tag Name\n',
      description: '',
      capture: {
        regex: /[\w\n\t]+/g,
        colour: 'greenBright',
        stringify: false
      },
      tests: (
        [
          '{{}}',
          '{{ }}',
          '{{\n\n\n\n}}',
          '{{--}}',
          '{%%}',
          '{% %}',
          '{%\n\n\n\n%}',
          '{%--%}'
        ]
      )
    },
    {
      title: 'Missing Object Name\n',
      description: '',
      capture: {
        regex: /\.\bproperty\b/g,
        colour: 'greenBright',
        stringify: false
      },
      tests: (
        [
          '{{ .property }}',
          '{%- tag = \'string\' | filter: .property -%}'
        ]
      )
    },
    {
      title: 'Missing Start Tag\n',
      description: 'Throws errors when Liquid tag is missing its start tag',
      capture: {
        regex: /\bend[a-z]+\b/g,
        colour: 'greenBright',
        stringify: false
      },
      tests: (
        [
          '{% endif %}',
          '{% endfor %}',
          '{% endunless %}'
        ]
      )
    },
    {
      title: 'Missing Close Delimeter\n',
      description: '',
      capture: {
        regex: /-?[%}]\}?/g,
        colour: 'greenBright',
        stringify: false
      },
      tests: (
        [
          '{% tag',
          '{% tag }',
          '{% tag %',
          '{% tag -%',
          '{% tag -}',
          '{% tag % }',
          '{{ object',
          '{{ object -',
          '{{ object }',
          '{{ object -}',
          '{{ object -} }',
          '{{ object } }'
        ]
      )
    },
    {
      title: 'Missing Tag Name\n',
      description: '',
      capture: {
        regex: /[\w\n\t]+/g,
        colour: 'greenBright',
        stringify: false
      },
      tests: (
        [
          '{{}}',
          '{{ }}',
          '{{\n\n\n\n}}',
          '{{--}}',
          '{%%}',
          '{% %}',
          '{%\n\n\n\n%}',
          '{%--%}'
        ]
      )
    }
  ]
)
