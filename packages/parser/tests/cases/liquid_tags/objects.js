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
          '{{ name }}'
          ,
          '{{ name.prop }}'
          ,
          '{{ $name[\'prop\'] }}'
          ,
          '{{ _name["prop"] }}'
          ,
          '{{ name[object.prop] }}'
          ,
          '{{ name[object.prop]["string_prop"] }}'
          ,
          '{{ name.prop[object.prop.foo]["string_prop"][bar.baz] }}'
          ,
          '{{ name-dash\n\n }}'
          ,
          '{{ name\nnewline }}'
          ,
          '{{ $_name }}'
        ]
      )
    }
  ]
)
