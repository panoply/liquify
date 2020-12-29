export default (
  [
    {
      title: 'HTML TAG\n',
      description: 'Test HTML tags parse',
      capture: {
        regex: /[\w]+/g,
        colour: 'greenBright',
        stringify: false
      },
      tests: (
        [
          [
            '<script>',
            '</script>'
          ],
          [
            '<style>',
            '</style>'
          ]
        ]
      )
    },
    {
      title: 'HTML TAG TABS\n',
      capture: {
        regex: /[\\][t]/g,
        colour: 'blueBright',
        stringify: true
      },
      tests: (
        [
          [
            '<script\t\t>',
            '</script\t\t>'
          ]
        ]
      )
    },
    {
      title: 'HTML TAG NEWLINES\n',
      description: 'Test HTML tags successfully parse newlines contained between delimeters.',
      capture: {
        regex: /[\\][n]/g,
        colour: 'blueBright',
        stringify: true
      },
      tests: (
        [
          [
            '<script\n>',
            '</script\n>'
          ],
          [
            '<script\n\n\n\n>',
            '</script\n\n\n>'
          ]
        ]
      )
    },
    {

      title: 'HTML TAG STRING SKIP\n',
      description: 'Test skipping HTML tag string values of single and double quoted strings',
      capture: {
        regex: /[\\"'][^\\'"]+[\\"']/g,
        colour: 'yellowBright',
        stringify: false
      },
      tests: (
        [
          [
            '<script data-attr="<nested> {% tag %}">',
            '</script>'
          ],
          [
            '<script data-attr="<nested> {{ tag }} " second="test <another> /> </">',
            '</script>'
          ],
          [
            '<style data-attr="<>{{ liquid_object }}">',
            '</style>'
          ]
        ]
      )
    }
  ]
)
