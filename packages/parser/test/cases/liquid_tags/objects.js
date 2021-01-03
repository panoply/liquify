/**
 * Liquid Object Tags
 *
 * Each `tests[]` property
 *
 * [0]
 */

export default (
  [
    {
      title: 'LIQUID OBJECT KEYWORD (NAMES)',
      description: 'Tests expression captures used to match object keywords.',
      capture: {
        regex: /^[^0-9][$_a-zA-Z0-9-]+\b/g,
        colour: 'bgGrey',
        stringify: true
      },
      tests: (
        [
          {
            test: 'name',
            assert: 'name'
          },
          {
            test: 'name.prop',
            assert: 'name'
          },
          {
            test: '$name[\'prop\']',
            assert: '$name'
          },
          {
            test: '_name["prop"]',
            assert: '_name'
          },
          {
            test: 'name[object.prop]',
            assert: 'name'
          },
          {
            test: 'name-dash\n\n',
            assert: 'name-dash'
          },
          {
            test: 'name\nnewline',
            assert: 'name'
          },
          {
            test: '$_name',
            assert: '$_name'
          }
        ]
      )
    }
  ]
)
