import { prettydiff } from '../parser/prettydiff'
import { sparser } from '../parser/sparser'

export default (function language_init () {

  const language = {

    setlexer (input) {

      const langmap = {
        css: 'style'
        , handlebars: 'markup'
        , html: 'markup'
        , javascript: 'script'
        , json: 'script'
        , jsp: 'markup'
        , jsx: 'script'
        , less: 'style'
        , markup: 'markup'
        , qml: 'style'
        , scss: 'style'
        , 'styled-jsx': 'script'
        , 'styled-components': 'script'
        , text: 'text'
        , typescript: 'script'
        , xhtml: 'markup'
        , xml: 'markup'
      }
      if (typeof input !== 'string') {
        return 'script'
      }
      if (input.indexOf('html') > -1) {
        return 'markup'
      }
      if (langmap[input] === undefined) {
        return 'script'
      }
      return langmap[input]
    },

    nameproper (input) {

      const langmap = {
        handlebars: 'Handlebars Template'
        , javascript: 'JavaScript'
        , jsp: 'JSTL (JSP)'
        , jsx: 'React JSX'
        , liquid: 'Liquid Template'
        , markup: 'markup'
        , scss: 'SCSS'
        , text: 'Plain Text'
        , typescript: 'TypeScript'

      }

      if (typeof input !== 'string' || langmap[input] === undefined) {
        return input.toUpperCase()
      }

      return langmap[input]
    },

    // * [0] = language value
    // * [1] = lexer value
    // * [2] = pretty formatting for text output to user
    auto (sample, defaultLang) {

      let b = []
      let c = 0

      const vartest = (
        (
          /(((var)|(let)|(const)|(function)|(import))\s+(\w|\$)+[a-zA-Z0-9]*)/
        ).test(sample) === true && (/@import/).test(sample) === false
      )

      const finalstatic = (
        /((((final)|(public)|(private))\s+static)|(static\s+void))/)
        .test(sample)

      // language_auto_output
      function output (langname) {

        if (langname === 'unknown') {
          return [ defaultLang,
            language.setlexer(defaultLang)
            , 'unknown' ]
        }
        if (langname === 'xhtml' || langname === 'markup') {
          return [ 'xml', language.setlexer('xml'), 'XHTML' ]
        }
        return [ langname, language.setlexer(langname), language
          .nameproper(langname) ]
      }

      // language_auto_cssA
      function cssA () {

        if (
          (/\$[a-zA-Z]/).test(sample) === true ||
            (/\{\s*(\w|\.|\$|#)+\s*\{/).test(sample) === true
        ) return output('scss')

        if (
          (/@[a-zA-Z]/).test(sample) === true ||
            (/\{\s*(\w|\.|@|#)+\s*\{/).test(sample) === true
        ) return output('less')

        return output('css')
      }

      // language_auto_notmarkup
      function notmarkup () {

        let d = 1
        let join = ''
        let flaga = false
        let flagb = false

        const publicprivate = (
          /((public)|(private))\s+(static\s+)?(((v|V)oid)|(class)|(final))/
        ).test(sample)

        // language_auto_notmarkup_javascriptA
        function javascriptA () {

          if (
            sample.indexOf('(') > -1 ||
              sample.indexOf('=') > -1 || (
              sample.indexOf(';') > -1 &&
                sample.indexOf('{') > -1
            )
          ) {

            if (finalstatic === true || (/\w<\w+(,\s+\w+)*>/).test(
              sample
            ) === true) {
              return output('typescript')
            }

            if (
              (/<\/\w+>/).test(sample) === true &&
                (/<\w+((\s+\w)|>)/).test(sample) === true) {
              return output(
                'jsx'
              )
            }

            if (
              (/((var)|(let)|(const))\s+\w+\s*:/).test(sample) ===
                true ||
                (/=\s*<\w+/).test(sample) === true) {
              return output(
                'typescript'
              )
            }

            return output('javascript')
          }

          return output('unknown')
        }

        // language_auto_notmarkup_cssOrJavaScript
        function cssOrJavaScript () {

          if (
            (/:\s*((number)|(string))/).test(sample) === true &&
              (/((public)|(private))\s+/).test(sample) === true
          ) return output('typescript')

          if (
            (/^(\s*(\$|@))/).test(sample) === false &&
              (/(\};?\s*)$/).test(sample) === true) {
            if (
              (/export\s+default\s+\{/).test(sample) === true ||
                (/(\?|:)\s*(\{|\[)/).test(sample) === true ||
                (/(\{|\s|;)render\s*\(\)\s*\{/).test(sample) === true ||
                (/^(\s*return;?\s*\{)/).test(sample) === true
            ) return output('javascript')
          }

          if (
            (/\{\{#/).test(sample) === true &&
              (/\{\{\//).test(sample) === true &&
              (/<\w/).test(sample) === true
          ) return output('handlebars')

          if ((/\{\s*(\w|\.|@|#)+\s*\{/).test(sample) === true) { return output('less') }
          if ((/\$(\w|-)/).test(sample) === true) return output('scss')
          if ((/(;|\{|:)\s*@\w/).test(sample) === true) {
            return output(
              'less'
            )
          }

          return output('css')

        };

        if (d < c) {

          do {

            if (flaga === false) {

              if (b[d] === '*' && b[d - 1] === '/') {

                b[d - 1] = ''
                flaga = true

              } else if (
                flagb === false &&
                  b[d] === 'f' &&
                  d < c - 6 &&
                  b[d + 1] === 'i' &&
                  b[d + 2] === 'l' &&
                  b[d + 3] === 't' &&
                  b[d + 4] === 'e' &&
                  b[d + 5] === 'r' &&
                  b[d + 6] === ':'
              ) {
                flagb = true
              }

            } else if (
              flaga === true &&
                b[d] === '*' &&
                d !== c - 1 &&
                b[d + 1] === '/'
            ) {

              flaga = false
              b[d] = ''
              b[d + 1] = ''

            } else if (flagb === true && b[d] === ';') {

              flagb = false
              b[d] = ''

            }

            if (flaga === true || flagb === true) b[d] = ''

            d = d + 1

          } while (d < c)

        }

        join = b.join('')

        if (
          (/\s\/\//).test(sample) === false &&
            (/\/\/\s/).test(sample) === false &&
            (/^(\s*(\{|\[)(?!%))/).test(sample) === true &&
            (/((\]|\})\s*)$/).test(sample) &&
            sample.indexOf(',') !== -1
        ) return output('json')

        if (
          (/((\}?(\(\))?\)*;?\s*)|([a-z0-9]("|')?\)*);?(\s*\})*)$/i)
            .test(sample) === true && (
            vartest === true ||
              publicprivate === true ||
              (/console\.log\(/).test(sample) === true ||
              (/export\s+default\s+class\s+/).test(sample) === true ||
              (/document\.get/).test(sample) === true ||
              (/((=|(\$\())\s*function)|(\s*function\s+(\w*\s+)?\()/)
                .test(sample) === true || sample.indexOf(
              '{'
            ) === -1 ||
              (/^(\s*if\s+\()/).test(sample) === true
          )
        ) return javascriptA()

        // * u007b === {
        // * u0024 === $
        // * u002e === .
        if (sample.indexOf('{') > -1 && (
          (/^(\s*[\u007b\u0024\u002e#@a-z0-9])/i).test(sample) ===
              true ||
              (/^(\s*\/(\*|\/))/).test(sample) === true ||
              (/^(\s*\*\s*\{)/).test(sample) === true) &&
            (/^(\s*if\s*\()/).test(sample) === false &&
            (/=\s*(\{|\[|\()/).test(join) === false && (
          ((/(\+|-|=|\?)=/).test(join) === false ||
                (/\/\/\s*=+/).test(join) === true) || (
            (/=+('|")?\)/).test(sample) === true &&
                (/;\s*base64/).test(sample) === true
          )
        ) && (/function(\s+\w+)*\s*\(/).test(join) === false
        ) return cssOrJavaScript()

        return output('unknown')
      }

      // language_auto_markup
      function markup () {

        function html () {
          if ((/\{\{(#|\/|\{)/).test(sample) === true) {
            return output(
              'handlebars'
            )
          }
          return output('html')
        };

        if (
          (/^(\s*<!doctype\s+html>)/i).test(sample) === true ||
            (/^(\s*<html)/i).test(sample) === true || (
            (/<form\s/i).test(sample) === true &&
              (/<label\s/i).test(sample) === true &&
              (/<input\s/i).test(sample) === true) ||
            (/<((img)|(IMG))(\s+\w+=("|')?\S+("|')?)*\s+src\s*=/).test(
              sample
            ) === true || (
            (/^(\s*<!DOCTYPE\s+((html)|(HTML))\s+PUBLIC\s+)/).test(
              sample
            ) === true &&
              (/XHTML\s+1\.1/).test(sample) === false &&
              (/XHTML\s+1\.0\s+(S|s)((trict)|(TRICT))/).test(sample) ===
              false)
        ) return html()

        if (
          (/<jsp:include\s/).test(sample) === true ||
            (/<c:((set)|(if))\s/).test(sample) === true
        ) return output('jsp')

        if ((/\{\{(#|\/|\{)/).test(sample) === true) {
          return output(
            'handlebars'
          )
        }

        if (
          (/<jsp:include\s/).test(sample) === true ||
            (/<c:((set)|(if))\s/).test(sample) === true
        ) return output('jsp')

        return output('xml')

      };

      if (sample === null || sample.replace(/\s+/g, '') === '') {
        return output('unknown')
      }

      if ((/^(\s*<!DOCTYPE\s+html>)/i).test(sample) === true) {
        return markup()
      }

      if ((
        /^\s*@((charset)|(import)|(include)|(keyframes)|(media)|(namespace)|(page))/
      ).test(sample) ===
          true) {
        return cssA()
      }

      if (
        finalstatic === false &&
          (/=(>|=|-|\+|\*)/).test(sample) === false &&
          (/^(\s*((if)|(for)|(function))\s*\()/).test(sample) === false &&
          (/(\s|;|\})((if)|(for)|(function\s*\w*))\s*\(/).test(sample) ===
          false &&
          vartest === false &&
          (/return\s*\w*\s*(;|\})/).test(sample) === false && (
          sample === undefined ||
            (/^(\s*#(?!(!\/)))/).test(sample) === true || (
            (/\n\s*(\.|@)\w+(\(|(\s*:))/).test(sample) === true &&
              (/>\s*<\w/).test(sample) === false
          )
        )
      ) return cssA()

      b = sample.replace(
        /\[[a-zA-Z][\w-]*=("|')?[a-zA-Z][\w-]*("|')?\]/g, ''
      ).split(
        ''
      )
      c = b.length

      if ((/^(\s*(\{|<)(%|#|\{))/).test(sample) === true) { return markup() }

      if (
        (
          (/^([\s\w-]*<)/).test(sample) === false &&
            (/(>[\s\w-]*)$/).test(sample) === false
        ) || finalstatic === true
      ) return notmarkup()

      if (
        (
          (
            (/(>[\w\s:]*)?<(\/|!|#)?[\w\s:\-[]+/).test(sample) ===
              true || (
              (/^\s*</).test(sample) === true &&
                (/<\/\w+(\w|\d)+>\s*$/).test(sample) === true
            ) || (/^(\s*<\?xml)/).test(sample) === true
          ) && (
            (/^([\s\w]*<)/).test(sample) === true ||
              (/(>[\s\w]*)$/).test(sample) === true
          )
        ) || (
          (/^(\s*<s((cript)|(tyle)))/i).test(sample) === true &&
            (/(<\/s((cript)|(tyle))>\s*)$/i).test(sample) === true
        )
      ) {
        return (
          (/^([\s\w]*<)/).test(sample) === false ||
            (/(>[\s\w]*)$/).test(sample) === false
        ) ? markup() : notmarkup()
      }

      return output('unknown')
    }

  }

  sparser.libs.language = language
  prettydiff.api.language = language

}())
