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
    }
  ]
)
