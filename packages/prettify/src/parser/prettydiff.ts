/* eslint no-use-before-define: ["error", { "variables": false }] */
import { sparser } from './sparser'

const prettydiff = function mode (diffmeta) {

  const pdcomment = function mode_pdcomment () {

    const ops = prettydiff.sparser.options

    const sindex = options.source.search(/((\/(\*|\/))|<!--*)\s*prettydiff\.com/)
    const dindex = options.diff.search(/((\/(\*|\/))|<!--*)\s*prettydiff\.com/)
    let a = 0
    let b = 0
    let keys
    let def
    let len

    // Parses the prettydiff settings comment
    //
    // - Source Priorities:
    //
    // * The prettydiff comment is only accepted if it  occurs before non-comments (near top)
    // * The options.source is the priority material for reading the comment
    // * The prettydiff comment will be processed from options.diff only if it present there, // missing from options.source, and options.mode is diff
    //
    // - Examples:
    //
    //  /*prettydiff.com width:80 preserveLine:4*/
    //  /* prettydiff.com width:80 preserveLine:4 */
    //  /*prettydiff.com width=80 preserveLine=4 */
    //  // prettydiff.com width=80 preserveLine:4
    //  <!-- prettydiff.com width:80 preserveLine=4 -->
    //  <!--prettydiff.com width:40 preserveLine:2-->
    //
    // - Parsing Considerations:
    //
    // * there may be any amount of space at the start or end of the comment
    // * "prettydiff.com" must exist at the start of the comment
    // * comment must exist prior to non-comment tokens (near top of code)
    // * parameters are name value pairs separated by white space
    // * the delimiter separating name and value is either ":" or "=" characters

    if ((
      sindex > -1 && (
        sindex === 0 ||
            "\"':".indexOf(options.source.charAt(sindex - 1)) < 0)
    ) || (
      options.mode === 'diff' &&
          dindex > -1 && (
        dindex === 0 ||
            "\"':".indexOf(options.diff.charAt(dindex - 1)) < 0
      )
    )) {

      const pdcom = sindex
      let a = (pdcom > -1) ? pdcom : dindex
      let b = 0
      let quote = ''
      let item = ''
      let lang = ''
      let lex = ''
      let valkey = []
      let op = []

      const ops = []
      const source = (pdcom > -1) ? options.source : options.diff
      const len = source.length
      const comment = (source.charAt(a) === '<')
        ? '<!--'
        : (source.charAt(a + 1) === '/')
          ? '//'
          : '/\u002a'

      // mode_pdcomment_esc
      function esc () {

        if (source.charAt(a - 1) !== '\\') return false

        let x = a

        do {
          x = x - 1
        } while (x > 0 && source.charAt(x) === '\\')

        return (a - x) % 2 === 0
      };

      do {

        if (source.slice(a - 3, a) === 'com') break
        a = a + 1

      } while (a < len)

      do {

        if (esc() === false) {
          if (quote === '') {
            if (source.charAt(a) === '"') {

              quote = '"'

              if (ops.length > 0 && (
                ops[ops.length - 1].charAt(ops[ops.length - 1]
                  .length - 1) === ':' ||
                    ops[ops.length - 1].charAt(ops[ops.length - 1]
                      .length - 1) === '='
              )) {
                b = a
              }

            } else if (source.charAt(a) === "'") {

              quote = "'"

              if (
                ops.length > 0 && (
                  ops[ops.length - 1].charAt(ops[ops.length - 1]
                    .length - 1) === ':' ||
                    ops[ops.length - 1].charAt(ops[ops.length - 1]
                      .length - 1) === '='
                )
              ) b = a

            } else if (source.charAt(a) === '`') {

              quote = '`'

              if (

                ops.length > 0 && (
                  ops[ops.length - 1].charAt(ops[ops.length - 1]
                    .length - 1) === ':' ||
                    ops[ops.length - 1].charAt(ops[ops.length - 1]
                      .length - 1) === '='
                )

              ) b = a

            } else if ((/\s/).test(source.charAt(a)) === false && b ===
                0) {

              b = a

            } else if (
              source.charAt(a) === ',' || (
                (/\s/).test(source.charAt(a)) === true && b > 0)
            ) {

              item = source.slice(b, a)

              if (ops.length > 0) {

                if (
                  ops.length > 0 && (
                    item === ':' ||
                      item === '='
                  ) &&
                    ops[ops.length - 1].indexOf('=') < 0 &&
                    ops[ops.length - 1].indexOf(':') < 0
                ) {

                  // For cases where white space is between option name and
                  // assignment operator
                  ops[ops.length - 1] = ops[ops.length - 1] + item
                  b = a

                } else if (
                  ops.length > 0 && (
                    ops[ops.length - 1].charAt(ops[ops.length - 1]
                      .length - 1) === ':' ||
                      ops[ops.length - 1].charAt(ops[ops.length - 1]
                        .length - 1) === '='
                  )) {

                  // For cases where white space is between assignment
                  // operator and value
                  ops[ops.length - 1] = ops[ops.length - 1] + item
                  b = 0

                } else {

                  ops.push(item)
                  b = 0
                }

              } else {
                ops.push(item)
                b = 0
              }
            }

            if (comment === '<!--' && source.slice(a - 2, a + 1) ===
                '-->') break
            if (comment === '//' && source.charAt(a) === '\n') break
            if (comment === '/\u002a' && source.slice(a - 1, a + 1) ===
                '\u002a/') {
              break
            }

          } else if (source.charAt(a) === quote && quote !== '${') {
            quote = ''
          } else if (quote === '`' && source.slice(a, a + 2) === '${') {
            quote = '${'
          } else if (quote === '${' && source.charAt(a) === '}') {
            quote = '`'
          }
        }

        a = a + 1

      } while (a < len)

      if (b > 0) {

        quote = source.slice(b, a + 1)

        if (comment === '<!--') quote = quote.replace(/\s*-+>$/, '')
        else if (comment === '//') quote = quote.replace(/\s+$/, '')
        else quote = quote.replace(/\s*\u002a\/$/, '')

        ops.push(quote)
      }

      a = ops.length

      if (a > 0) {

        do {

          a = a - 1

          if (ops[a].indexOf('=') > 0 && ops[a].indexOf(':') > 0) {

            if (ops[a].indexOf('=') < ops[a].indexOf(':')) {
              op = [
                ops[a].slice(0, ops[a].indexOf('='))
                , ops[a].slice(ops[a].indexOf('=') + 1)
              ]
            }

          } else if (ops[a].indexOf('=') > 0) {

            op = [
              ops[a].slice(0, ops[a].indexOf('='))
              , ops[a].slice(ops[a].indexOf('=') + 1)
            ]

          } else if (ops[a].indexOf(':') > 0) {

            op = [
              ops[a].slice(0, ops[a].indexOf(':'))
              , ops[a].slice(ops[a].indexOf(':') + 1)
            ]

          } else if (
            prettydiff.api.optionDef[ops[a]] !== undefined &&
              prettydiff.api.optionDef[ops[a]].type === 'boolean'
          ) {
            options[ops[a]] = true
          }

          if (op.length === 2 && prettydiff.api.optionDef[op[0]] !==
              undefined) {
            if (
              (
                op[1].charAt(0) === '"' ||
                  op[1].charAt(0) === "'" ||
                  op[1].charAt(0) === '`'

              ) && op[1].charAt(op[1].length - 1) === op[1].charAt(0)
            ) {
              op[1] = op[1].slice(1, op[1].length - 1)
            }

            if (
              prettydiff.api.optionDef[op[0]].type === 'number' &&
                isNaN(Number(op[1])) === false
            ) {

              options[op[0]] = Number(op[1])

            } else if (prettydiff.api.optionDef[op[0]].type ===
                'boolean') {

              if (op[1] === 'true') {
                options[op[0]] = true
              } else if (op[1] === 'false') {
                options[op[0]] = false
              }

            } else {
              if (prettydiff.api.optionDef[op[0]].values !==
                  undefined) {

                valkey = Object.keys(prettydiff.api.optionDef[op[0]]
                  .values)
                b = valkey.length

                do {

                  b = b - 1

                  if (valkey[b] === op[1]) {
                    options[op[0]] = op[1]
                    break
                  }

                } while (b > 0)

              } else {

                if (op[0] === 'language') {
                  lang = op[1]
                } else if (op[0] === 'lexer') {
                  lex = op[1]
                }

                options[op[0]] = op[1]

              }
            }
          }
        } while (a > 0)

        if (lex === '' && lang !== '') {
          lex = prettydiff.api.language
            .setlexer(lang)
        }

      }
    }

    if (options.mode === 'diff') modeValue = 'beautify'

    if (options.lexer === 'script') {

      const styleguide = {
        airbnb () {
          options.bracePadding = true
          options.attemptCorrection = true
          options.lexerOptions.script.endComma = 'always'
          options.indentChar = ' '
          options.indentSize = 2
          options.preserveLine = 1
          options.quoteConvert = 'single'
          options.variableList = 'each'
          options.wrap = 80
        }
        , crockford () {
          options.bracePadding = false
          options.attemptCorrection = true
          options.elseNewline = false
          options.lexerOptions.script.endComma = 'never'
          options.indentChar = ' '
          options.indentSize = 4
          options.noCaseIndent = true
          options.space = true
          options.variableList = 'each'
          options.vertical = false
        }
        , google () {
          options.attemptCorrection = true
          options.indentChar = ' '
          options.indentSize = 4
          options.preserveLine = 1
          options.quoteConvert = 'single'
          options.vertical = false
          options.wrap = -1
        }
        , jquery () {
          options.bracePadding = true
          options.attemptCorrection = true
          options.indentChar = '\u0009'
          options.indentSize = 1
          options.quoteConvert = 'double'
          options.variableList = 'each'
          options.wrap = 80
        }
        , jslint () {
          options.bracePadding = false
          options.attemptCorrection = true
          options.elseNewline = false
          options.lexerOptions.script.endComma = 'never'
          options.indentChar = ' '
          options.indentSize = 4
          options.noCaseIndent = true
          options.space = true
          options.variableList = 'each'
          options.vertical = false
        }
        , mrdoobs () {
          options.braceNewline = true
          options.bracePadding = true
          options.attemptCorrection = true
          options.indentChar = '\u0009'
          options.indentSize = 1
          options.vertical = false
        }
        , mediawiki () {
          options.bracePadding = true
          options.attemptCorrection = true
          options.indentChar = '\u0009'
          options.indentSize = 1
          options.preserveLine = 1
          options.quoteConvert = 'single'
          options.space = false
          options.wrap = 80
        }
        , meteor () {
          options.attemptCorrection = true
          options.indentChar = ' '
          options.indentSize = 2
          options.wrap = 80
        }
        , semistandard () {
          options.braceNewline = false
          options.bracePadding = false
          options.braceAllman = false
          options.attemptCorrection = true
          options.endComma = 'never'
          options.indentChar = ' '
          options.indentSize = 2
          options.endNewline = false
          options.noSemicolon = false
          options.preserveLine = 1
          options.quoteConvert = 'single'
          options.space = true
          options.ternaryLine = false
          options.variableList = 'each'
          options.vertical = false
          options.wrap = 0
        }
        , standard () {
          options.braceNewline = false
          options.bracePadding = false
          options.braceAllman = false
          options.attemptCorrection = true
          options.endComma = 'never'
          options.indentChar = ' '
          options.indentSize = 2
          options.endNewline = false
          options.noSemicolon = true
          options.preserveLine = 1
          options.quoteConvert = 'single'
          options.space = true
          options.ternaryLine = false
          options.variableList = 'each'
          options.vertical = false
          options.wrap = 0
        }
        , yandex () {
          options.bracePadding = false
          options.attemptCorrection = true
          options.quoteConvert = 'single'
          options.variableList = 'each'
          options.vertical = false
        }
      }

      const braceStyle = {
        collapse () {
          options.braceNewline = false
          options.bracePadding = false
          options.braceAllman = false
          options.objectIndent = 'indent'
          options.neverFlatten = true
        }
        , 'collapse-preserve-inline': function () {
          options.braceNewline = false
          options.bracePadding = true
          options.braceAllman = false
          options.objectIndent = 'inline'
          options.neverFlatten = false
        }
        , expand () {
          options.braceNewline = false
          options.bracePadding = false
          options.braceAllman = true
          options.objectIndent = 'indent'
          options.neverFlatten = true
        }
      }

      if (styleguide[options.styleguide] !== undefined) {
        styleguide[options.styleguide]()
      }

      if (braceStyle[options.braceStyle] !== undefined) {
        braceStyle[options.braceStyle]()
      }

      if (options.language === 'json') options.wrap = 0

    }

    def = prettydiff.sparser.libs.optionDef
    keys = Object.keys(def)
    len = keys.length

    do {
      if (options[keys[a]] !== undefined) {

        if (def[keys[a]].lexer[0] === 'all') {
          ops[keys[a]] = options[keys[a]]
        } else {

          b = def[keys[a]].lexer.length

          do {

            b = b - 1

            if (
              keys[a] !== 'parseSpace' || (
                options.mode === 'parse' &&
                  keys[a] === 'parseSpace' &&
                  options[keys[a]] === true
              )
            ) {
              ops.lexer_options[def[keys[a]].lexer[b]][keys[a]] =
                  options[keys[a]]
            }

          } while (b > 0)
        }
      }

      a = a + 1

    } while (a < len)
  }

  const options = prettydiff.options
  const lf = (options.crlf === true) ? '\r\n' : '\n'

  let modeValue = options.mode
  let result = ''

  if (options.language === 'text' && options.mode !== 'diff') {
    options.language = 'auto'
  }

  if (options.lexer === 'text' && options.mode !== 'diff') {
    options.lexer = 'auto'
  }

  if (options.language === 'text' || options.lexer === 'text') {
    options.language = 'text'
    options.languageName = 'Plain Text'
    options.lexer = 'text'
  } else if (options.language === 'auto' || options.lexer === 'auto') {

    const def = (
      options.languageDefault === '' ||
        options.languageDefault === null ||
        options.languageDefault === undefined
    ) ? 'javascript' : options.languageDefault

    let lang = prettydiff.api.language.auto(options.source, def)

    if (lang[0] === 'text') {

      if (options.mode === 'diff') {
        lang[2] = 'Plain Text'
      } else {
        lang = [ 'javascript', 'script', 'JavaScript' ]
      }

    }

    if (options.language === 'auto') {
      options.language = lang[0]
      options.languageName = lang[2]
    }

    if (options.lexer === 'auto') {
      options.lexer = lang[1]
    }
  }

  pdcomment()

  if (options.mode === 'parse') {

    const parseFormat = options.parseFormat
    const api = options.api

    options.parsed = prettydiff.sparser.parser()

    result = JSON.stringify(options.parsed)

  } else {

    if (
      prettydiff[modeValue][options.lexer] === undefined && (
        (options.mode !== 'diff' && options.language === 'text') ||
          options.language !== 'text'
      )
    ) {
      result =
          `Error: Library prettydiff.${modeValue}.${options.lexer} does not exist.`
    } else {

      options.parsed = prettydiff.sparser.parser()
      result = prettydiff[modeValue][options.lexer](options)

    }
  }

  result = options.endNewline === true
    ? result.replace(/\s*$/, lf)
    : result.replace(/\s+$/, '')

  prettydiff.end = 0
  prettydiff.start = 0

  return result
}

prettydiff.api = {}
prettydiff.beautify = {}
prettydiff.end = 0
prettydiff.iterator = 0

prettydiff.meta = {
  error: ''
  , lang: [ '', '', '' ]
  , time: ''
  , insize: 0
  , outsize: 0
  , difftotal: 0
  , difflines: 0
}

prettydiff.options = {
  attributeSort: false
  , attributeSortList: []
  , braceNewline: false
  , bracePadding: false
  , braceStyle: 'none'
  , braceAllman: false
  , caseSpace: false
  , commentNewline: false
  , comments: false
  , compressCSS: false
  , config: ''
  , content: false
  , attemptCorrection: false
  , crlf: false
  , classPadding: false
  , diff: ''
  , diffFormat: 'text'
  , elseNewline: false
  , endComma: 'never'
  , endQuietly: 'default'
  , forceAttribute: false
  , forceIndent: false
  , arrayFormat: 'default'
  , objectIndent: 'default'
  , functionNameSpace: false
  , help: 80
  , indentChar: ' '
  , indentLevel: 0
  , indentSize: 4
  , language: 'auto'
  , languageDefault: 'text'
  , languageName: 'JavaScript'
  , lexer: 'auto'
  , methodChain: 3
  , mode: 'diff'
  , neverFlatten: false
  , endNewline: false
  , noCaseIndent: false
  , noLeadZero: false
  , noSemicolon: false
  , objectSort: false
  , output: ''
  , parseFormat: 'parallel'
  , parseSpace: false
  , preserveLine: 0
  , preserveComment: false
  , preserveText: false
  , quote: false
  , quoteConvert: 'none'
  , selector_list: false
  , semicolon: false
  , source: ''
  , space: true
  , selfCloseSpace: false
  , styleguide: 'none'
  , tagMerge: false
  , tagSort: false
  , ternaryLine: false
  , preserveAttribute: false
  , variableList: 'none'
  , version: false
  , vertical: false
  , wrap: 0
  , lexerOptions: {}
}

prettydiff.scopes = []
prettydiff.start = 0
prettydiff.sparser = sparser

export { prettydiff }
