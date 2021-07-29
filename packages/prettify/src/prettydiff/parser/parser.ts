import { parse } from './parse'
import { sparser } from './sparser'

function parser () {

  const langstore = [
    sparser.options.language,
    sparser.options.lexer
  ]

  parse.count = -1
  parse.linesSpace = 0
  parse.lineNumber = 1
  parse.data = {
    begin: [],
    ender: [],
    lexer: [],
    lines: [],
    stack: [],
    token: [],
    types: []
  }

  parse.datanames = [
    'begin',
    'ender',
    'lexer',
    'lines',
    'stack',
    'token',
    'types'
  ]

  parse.structure = [ [ 'global', -1 ] ]
  parse.structure.pop = () => {
    const len = parse.structure.length - 1
    const arr = parse.structure[len]
    if (len > 0) parse.structure.splice(len, 1)
    return arr
  }

  if (sparser.options.language === 'auto' || sparser.options.lexer === 'auto') {
    const lang = sparser.libs.language.auto(sparser.options.source, 'javascript')
    if (sparser.options.language === 'auto') sparser.options.language = lang[0]
    if (sparser.options.lexer === 'auto') sparser.options.lexer = lang[1]
  }

  if (typeof sparser.lexers[sparser.options.lexer] === 'function') {

    // reset references data if sparser is used on multiple files
    parse.references = [ [] ]

    sparser.parseError = ''
    sparser.options.lexer_options = sparser.options.lexer_options || {}

    Object.keys(sparser.lexers).forEach((value) => {
      sparser.options.lexer_options[value] = sparser.options.lexer_options[value] || {}
    })

    // This line parses the code using a lexer file
    sparser.lexers[sparser.options.lexer](`${sparser.options.source} `)

  } else {

    // restore language and lexer values
    sparser.parseError = `Specified lexer, ${sparser.options.lexer}, is not a function.`
  }

  // validate that all the data arrays are the same length
  (function () {

    let a = 0
    let b = 0

    const keys = Object.keys(parse.data)
    const c = keys.length

    do {

      b = a + 1

      do {

        if (parse.data[keys[a]].length !== parse.data[keys[b]].length) {
          sparser.parseError = `"${keys[a]}" array is of different length than "${keys[b]}"`
          break
        }

        b = b + 1

      } while (b < c)

      a = a + 1

    } while (a < c - 1)

  })()

  // Fix begin values.
  // They must be reconsidered after reordering from object sort
  if (
    parse.data.begin.length > 0 && (
      sparser.options.lexer_options[sparser.options.lexer].objectSort === true ||
      sparser.options.lexer_options.markup.tagSort === true
    )
  ) {
    parse.sortCorrection(0, parse.count + 1)
  }

  if (sparser.options.format === 'minimal') {
    let a = 0
    const data = []
    const len = parse.count + 1

    do {
      data.push([
        parse.data.begin[a],
        parse.data.ender[a],
        parse.data.lexer[a],
        parse.data.lines[a],
        parse.data.stack[a],
        parse.data.token[a],
        parse.data.types[a]
      ])

      a = a + 1
    } while (a < len)

    return data
  }

  if (sparser.options.format === 'objects') {

    let a = 0

    const data = []
    const len = parse.count + 1

    do {

      data.push({
        begin: parse.data.begin[a],
        ender: parse.data.ender[a],
        lexer: parse.data.lexer[a],
        lines: parse.data.lines[a],
        stack: parse.data.stack[a],
        token: parse.data.token[a],
        types: parse.data.types[a]
      })

      a = a + 1

    } while (a < len)

    return data
  }

  if (sparser.options.format === 'testprep') {

    let a = 0

    const data = []
    const len = parse.count + 1

    if (sparser.parseError !== '') return sparser.parseError

    do {

      data.push(
        JSON.stringify({
          begin: parse.data.begin[a],
          ender: parse.data.ender[a],
          lexer: parse.data.lexer[a],
          lines: parse.data.lines[a],
          stack: parse.data.stack[a],
          token: parse.data.token[a],
          types: parse.data.types[a]
        })
      )

      a = a + 1

    } while (a < len)

    return `[\n${data.join(',\n')}\n]`
  }

  sparser.options.language = langstore[0]
  sparser.options.lexer = langstore[1]

  return parse.data
}

sparser.parse = parse
sparser.parser = parser

export { parse, sparser, parser }
