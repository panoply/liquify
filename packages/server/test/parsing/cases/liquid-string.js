
export default ([
  {

    title: 'Object tag nexted in singular tag string',
    string: (
      [
        '{%- tag = \'string\' | filter: \'{{ object_in_string }}\' -%}'
      ]
    )

  },
  {
    title: 'Singular tag nested in singular string',
    string: (
      [
        '{%- tag = "{% singular_in_string %}" -%}'
      ]
    )
  },
  {
    title: 'Object tag nested in object filter string',
    string: (
      [
        '{{ object | filter: \'{{ object_in_string }}\' }}'
      ]
    )
  },
  {
    title: 'Object tag in object tag string (no spacing)',
    string: (
      [
        '{{object|filter:\'{{object_in_string}}\'}}'
      ]
    )
  },
  {
    title: 'Object tag nested start and end tags in string',
    string: (
      [
        '{{ object | filter: "{%- start -%} {{ tag }} {% endstart%}" }}'
      ]
    )
  },
  {
    title: 'Escaped string in Liquid tag',
    string: (
      [
        '{% tag = \'value\' | filter: "escape \\" here \\" " -%}'
      ]
    )
  },
  {
    title: 'Object tag contained within HTML attribute string',
    string: (
      [
        '<div data-attr="{{ object }}" ></div>'
      ]
    ),
    expect: (
      [
        '{{ object }}'
      ]
    )
  },
  {
    title: 'Multiple objects contained in HTML tag and attribute strings',
    string: (
      [
        '<div {{ another_tag }}="class" ></div>'
      ]
    ),
    expect: (
      [
        '{{ another_tag }}'
      ]
    )
  }
]).reduce((
  context
  , {
    title
    , string
    , expect = null
  }
) => {

  context.fixture = context.fixture + string.join('\n') + '\n\n'
  context.tests.push(Array.isArray(expect) ? expect.reduce((x, s, i) => {
    x.title = title
    x.tests = [ s ]
    return x
  }, {
    title: undefined,
    tests: undefined
  }) : {
    title,
    tests: string
  })

  return context

}, { fixture: '', tests: [] })
