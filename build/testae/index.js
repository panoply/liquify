
/**
 * Normalize string
 *
 * @param data
 * @returns {import('./index').fixtures}
 */
export const fixtures = data => (

  data.reduce((context, { title, string, expect = null }, n) => {

    context.fixture = context.fixture + string.join('\n') + '\n\n'
    context.tests.push(
      Array.isArray(expect) ? expect.reduce((x, s, i) => {
        x.title = title + i
        x.tests = [ s ]
        return x
      }, {}) : { title, tests: string }
    )

    return context

  }, { fixture: '', tests: [] })

)
