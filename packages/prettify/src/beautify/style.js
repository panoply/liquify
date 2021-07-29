import { prettydiff } from '../parser/prettydiff'

export default (function beautify_style_init () {
  const style = function beautify_style (options) {
    const data = options.parsed
    const lf = (options.crlf === true)
      ? '\r\n'
      : '\n'
    const len = (prettydiff.end > 0)
      ? prettydiff.end + 1
      : data.token.length
    const build = []
    // a single unit of indentation
    const tab = (function beautify_style_tab () {
      let aa = 0
      const bb = []
      do {
        bb.push(options.indentChar)
        aa = aa + 1
      } while (aa < options.indentSize)
      return bb.join('')
    }())
    const pres = options.preserveLine + 1
    // new lines plus indentation
    const nl = function beautify_style_nl (tabs) {
      const linesout = []
      const total = (function beautify_style_nl_total () {
        if (a === len - 1) {
          return 1
        }
        if (data.lines[a + 1] - 1 > pres) {
          return pres
        }
        if (data.lines[a + 1] > 1) {
          return data.lines[a + 1] - 1
        }
        return 1
      }())
      let index = 0
      if (tabs < 0) {
        tabs = 0
      }
      do {
        linesout.push(lf)
        index = index + 1
      } while (index < total)
      if (tabs > 0) {
        index = 0
        do {
          linesout.push(tab)
          index = index + 1
        } while (index < tabs)
      }
      build.push(linesout.join(''))
    }
    const vertical = function beautify_style_vertical () {
      const start = data.begin[a]
      const startChar = data.token[start]
      const endChar = data.token[a]
      const store = []
      let b = a
      let c = 0
      let item; let longest = 0
      if (start < 0 || b <= start) {
        return
      }
      do {
        b = b - 1
        if (data.begin[b] === start) {
          if (data.token[b] === ':') {
            item = [ b - 1, 0 ]
            do {
              b = b - 1
              if ((((data.token[b] === ';' && startChar === '{') || (
                data.token[b] === ',' && startChar ===
                      '(')) && data.begin[b] === start) || (data.token[
                b] === endChar && data.begin[data.begin[
                b]] === start)) {
                break
              }
              if (data.types[b] !== 'comment' && data.types[b] !==
                    'selector' && data.token[b] !==
                    startChar && data.begin[b] === start) {
                item[1] = data.token[b].length + item[1]
              }
            } while (b > start + 1)
            if (item[1] > longest) {
              longest = item[1]
            }
            store.push(item)
          }
        } else if (data.types[b] === 'end') {
          if (b < data.begin[b]) {
            break
          }
          b = data.begin[b]
        }
      } while (b > start)
      b = store.length
      if (b < 2) {
        return
      }
      do {
        b = b - 1
        if (store[b][1] < longest) {
          c = store[b][1]
          do {
            data.token[store[b][0]] = data.token[store[b][0]] + ' '
            c = c + 1
          } while (c < longest)
        }
      } while (b > 0)
    }
    let indent = options.indentLevel
    let a = prettydiff.start
    let when = [ '', '' ]
    if (options.vertical === true && options.compressCSS === false) {
      a = len
      do {
        a = a - 1
        if (data.token[a] === '}' || data.token[a] === ')') {
          vertical()
        }
      } while (a > 0)
      a = prettydiff.start
    }

    // beautification loop
    do {
      if (
        data.types[a + 1] === 'end' ||
          data.types[a + 1] === 'template_end' ||
          data.types[a + 1] === 'template_else'
      ) {
        indent = indent - 1
      }

      if (
        data.types[a] === 'template' &&
          data.lines[a] > 0
      ) {

        build.push(data.token[a])

        // HOTFIX
        //
        // Fixes semicolon newlines from occuring when output tag is used as a property
        // value within classes, eg:
        // .class { color: {{ foo}}; }
        if (data.types[a - 2] !== 'property' && data.types[a - 1] !==
            'colon') nl(indent)

      } else if (data.types[a] === 'template_else') {

        build.push(data.token[a])
        indent = indent + 1
        nl(indent)

      } else if (
        data.types[a] === 'start' ||
          data.types[a] === 'template_start'
      ) {

        indent = indent + 1
        build.push(data.token[a])

        if (
          data.types[a + 1] !== 'end' &&
            data.types[a + 1] !== 'template_end' && (
            options.compressCSS === false || (
              options.compressCSS === true &&
                data.types[a + 1] === 'selector'
            )
          )
        ) {

          nl(indent)
        }

      } else if ((
        data.token[a] === ';' && (
          options.compressCSS === false || (
            options.compressCSS === true &&
                data.types[a + 1] === 'selector'
          )
        )
      ) ||
          data.types[a] === 'end' ||
          data.types[a] === 'template_end' ||
          data.types[a] === 'comment'
      ) {

        build.push(data.token[a])

        if (data.types[a + 1] === 'value') {

          if (data.lines[a + 1] === 1) {
            build.push(' ')
          } else if (data.lines[a + 1] > 1) {
            nl(indent)
          }

        } else if (data.types[a + 1] !== 'separator') {

          if (
            data.types[a + 1] !== 'comment' || (
              data.types[a + 1] === 'comment' &&
                data.lines[a + 1] > 1
            )
          ) {

            nl(indent)

          } else {

            build.push(' ')

          }
        }

      } else if (data.token[a] === ':') {

        build.push(data.token[a])

        if (options.compressCSS === false) build.push(' ')

      } else if (data.types[a] === 'selector') {

        if (
          options.classPadding === true &&
            data.types[a - 1] === 'end' &&
            data.lines[a] < 3
        ) {
          build.push(lf)
        }

        if (data.token[a].indexOf('when(') > 0) {
          when = data.token[a].split('when(')
          build.push(when[0].replace(/\s+$/, ''))
          nl(indent + 1)
          build.push(`when (${when[1]}`)
        } else {
          build.push(data.token[a])
        }

        if (data.types[a + 1] === 'start') {
          if (options.braceAllman === true) {
            nl(indent)
          } else if (options.compressCSS === false) {
            build.push(' ')
          }
        }

      } else if (data.token[a] === ',') {

        build.push(data.token[a])
        if (data.types[a + 1] === 'selector' || data.types[a + 1] ===
            'property') {
          nl(indent)
        } else if (options.compressCSS === false) {
          build.push(' ')
        }

      } else if (
        data.stack[a] === 'map' &&
          data.token[a + 1] === ')' &&
          a - data.begin[a] > 5
      ) {

        build.push(data.token[a])
        nl(indent)

      } else if (data.token[a] === 'x;') {

        nl(indent)

      } else if (
        (
          data.types[a] === 'variable' ||
            data.types[a] === 'function'
        ) &&
          options.classPadding === true &&
          data.types[a - 1] === 'end' &&
          data.lines[a] < 3
      ) {
        build.push(lf)
        build.push(data.token[a])

      } else if (

        data.token[a] !== ';' || (
          data.token[a] === ';' && (
            options.compressCSS === false || (
              options.compressCSS === true &&
                data.token[a + 1] !== '}'
            )
          )
        )
      ) {

        build.push(data.token[a])

      }

      a = a + 1
    } while (a < len)

    prettydiff.iterator = len - 1

    return build.join('')

  }

  prettydiff.beautify.style = style

}())
