import { sparser } from '../parser/parse'
export default (function style_init () {

  const style = function lexer_style (source) {
    let a = 0
    let ltype = ''
    let ltoke = ''
    const parse = sparser.parse
    const data = parse.data
    const options = sparser.options
    const b = source.split('')
    const len = source.length
    const mapper = []
    const nosort = []
    const recordPush = function lexer_style_recordPush (structure) {
      const record = {
        begin: parse.structure[parse.structure.length - 1][1]
        , ender: -1
        , lexer: 'style'
        , lines: parse.linesSpace
        , stack: parse.structure[parse.structure.length - 1][0]
        , token: ltoke
        , types: ltype
      }
      parse.push(data, record, structure)
    }
    const esctest = function lexer_style_esctest (index) {
      const slashy = index
      do {
        index = index - 1
      } while (b[index] === '\\' && index > 0)
      if ((slashy - index) % 2 === 1) {
        return true
      }
      return false
    }
    // Since I am already identifying value types this is a good place to do some
    // quick analysis and clean up on certain value conditions. These things are
    // being corrected:
    // * fractional values missing a leading 0 are    provided a leading 0
    // * 0 values with a dimension indicator    (px, em) have the dimension
    // indicator    removed
    // * eliminate unnecessary leading 0s
    // * url values that are not quoted are wrapped    in double quote characters
    // * color values are set to lowercase and    reduced from 6 to 3 digits if
    // appropriate
    const value = function lexer_style_value (val) {
      const x = val.replace(/\s*!important/, ' !important').split('')
      const values = []
      const transition = (/-?transition$/).test(data.token[parse.count -
              2])
      const colorPush = function lexer_style_value_colorPush (value) {
        const vl = value.toLowerCase()
        if ((/^(#[0-9a-f]{3,6})$/).test(vl) === true);
        else if ((/^(rgba?\()/).test(vl) === true);
        else;
        return value
      }
      const valueSpace = function lexer_style_value_valueSpace (find) {
        find = find.replace(/\s*/g, '')
        if ((/\/\d/).test(find) === true && val.indexOf('url(') ===
                0) {
          return find
        }
        return ` ${find.charAt(0)} ${find.charAt(1)}`
      }
      const zerofix = function lexer_style_value_zerofix (find) {
        if (options.lexer_options.style.noLeadZero === true) {
          const scrub = function lexer_style_value_zerofix_scrub (
            search
          ) {
            return search.replace(/0+/, '')
          }
          return find.replace(/^-?\D0+(\.|\d)/, scrub)
        }
        if ((/0*\./).test(find) === true) {
          return find.replace(/0*\./, '0.')
        }
        if ((/0+/).test((/\d+/).exec(find)[0]) === true) {
          if ((/^\D*0+\D*$/).test(find) === true) {
            return find.replace(/0+/, '0')
          }
          return find.replace((/\d+/).exec(find)[0], (/\d+/).exec(
            find
          )[0].replace(/^0+/, ''))
        }
        return find
      }
      const commaspace = function lexer_style_value_commaspace (find) {
        return find.replace(',', ', ')
      }
      const diFix = function lexer_style_value_diFix (di) {
        return `${di} `
      }
      const slash = function lexer_style_value_slash () {
        const start = cc - 1
        let xx = start
        if (start < 1) {
          return true
        }
        do {
          xx = xx - 1
        } while (xx > 0 && x[xx] === '\\')
        // report true for odd numbers (escaped)
        if ((start - xx) % 2 === 1) {
          return true
        }
        return false
      }
      const zerodotstart = (/^-?0+\.\d+[a-z]/)
      const dotstart = (/^-?\.\d+[a-z]/)
      const zerodot = (/(\s|\(|,)-?0+\.?\d+([a-z]|\)|,|\s)/g)
      const dot = (/(\s|\(|,)-?\.?\d+([a-z]|\)|,|\s)/g)
      const dimensions = '%|cap|ch|cm|deg|dpcm|dpi|dppx|em|ex|fr|grad|Hz|ic|in|kHz|lh|mm|ms|mS|pc|pt|px|Q|rad|rem|rlh|s|turn|vb|vh|vi|vmax|vmin|vw'
      let cc = 0
      let dd = 0
      let block = ''
      let leng = x.length
      let items = []
      // this loop identifies containment so that tokens/sub-tokens are correctly
      // taken
      if (cc < leng) {
        do {
          items.push(x[cc])
          if (x[cc - 1] !== '\\' || slash() === false) {
            if (block === '') {
              if (x[cc] === '"') {
                block = '"'
                dd = dd + 1
              } else if (x[cc] === "'") {
                block = "'"
                dd = dd + 1
              } else if (x[cc] === '(') {
                block = ')'
                dd = dd + 1
              } else if (x[cc] === '[') {
                block = ']'
                dd = dd + 1
              }
            } else if ((x[cc] === '(' && block === ')') || (x[cc] ===
                    '[' && block === ']')) {
              dd = dd + 1
            } else if (x[cc] === block) {
              dd = dd - 1
              if (dd === 0) {
                block = ''
              }
            }
          }
          if (block === '' && x[cc] === ' ') {
            items.pop()
            values.push(colorPush(items.join('')))
            items = []
          }
          cc = cc + 1
        } while (cc < leng)
      }
      values.push(colorPush(items.join('')))
      leng = values.length
      // This is where the rules mentioned above are applied
      cc = 0
      if (cc < leng) {
        do {
          if (options.lexer_options.style.noLeadZero === true &&
                zerodotstart.test(values[cc]) === true) {
            values[cc] = values[cc].replace(/0+\./, '.')
          } else if ((options.lexer_options.style.noLeadZero ===
                  false || options.lexer_options.style
            .noLeadZero === undefined) && dotstart.test(values[
            cc]) === true) {
            values[cc] = values[cc].replace('.', '0.')
          } else if (zerodot.test(values[cc]) === true || dot.test(
            values[cc]
          ) === true) {
            values[cc] = values[cc].replace(zerodot, zerofix).replace(
              dot, zerofix
            )
          } else if ((/^(0+([a-z]{2,3}|%))$/).test(values[cc]) ===
                true && transition === false) {
            values[cc] = '0'
          } else if ((/^(0+)/).test(values[cc]) === true) {
            values[cc] = values[cc].replace(/0+/, '0')
            if ((/\d/).test(values[cc].charAt(1)) === true) {
              values[cc] = values[cc].substr(1)
            }
          } else if ((/^url\((?!('|"))/).test(values[cc]) === true &&
                values[cc].charAt(values[cc].length -
                  1) === ')') {
            block = values[cc].charAt(values[cc].indexOf('url(') + 4)
            if (block !== '@' && block !== '{' && block !== '<') {
              if (options.lexer_options.style.quoteConvert ===
                    'double') {
                values[cc] = values[cc]
                  .replace(/url\(/, 'url("')
                  .replace(/\)$/, '")')
              } else {
                values[cc] = values[cc]
                  .replace(/url\(/, "url('")
                  .replace(/\)$/, "')")
              }
            }
          }
          if ((/^(\+|-)?\d+(\.\d+)?(e-?\d+)?\D+$/).test(values[
            cc]) === true) {
            if (dimensions.indexOf(values[cc].replace(
              /(\+|-)?\d+(\.\d+)?(e-?\d+)?/, ''
            )) < 0) {
              values[cc] = values[cc].replace(
                /(\+|-)?\d+(\.\d+)?(e-?\d+)?/, diFix
              )
            }
          }
          if ((/^\w+\(/).test(values[cc]) === true &&
                values[cc].charAt(values[cc].length - 1) === ')' &&
                (values[cc].indexOf('url(') !== 0 || (values[cc].indexOf(
                  'url('
                ) === 0 && values[cc].indexOf(
                  ' '
                ) > 0))) {
            values[cc] = values[cc].replace(/,\S/g, commaspace)
          }
          cc = cc + 1
        } while (cc < leng)
      }
      block = values.join(' ')
      return block.charAt(0) + block.slice(1)
        .replace(/\s*(\/|\+|\*)\s*(\d|\$)/, valueSpace)
    }
    // the generic token builder
    const buildtoken = function lexer_style_build () {
      let aa = a
      let bb = 0
      const out = []
      let outy = ''
      let funk = null
      const block = []
      const qc = (options.lexer_options.style.quoteConvert ===
              undefined)
        ? 'none'
        : options.lexer_options.style.quoteConvert
      const spacestart = function lexer_style_build_spacestart () {
        out.push(b[aa])
        if ((/\s/).test(b[aa + 1]) === true) {
          do {
            aa = aa + 1
          } while (aa < len && (/\s/).test(b[aa + 1]) === true)
        }
      }
      if (aa < len) {
        // this loop accounts for grouping mechanisms
        do {
          if (b[aa] === '"' || b[aa] === "'") {
            if (funk === null) {
              funk = false
            }
            if (block[block.length - 1] === b[aa] && (b[aa - 1] !==
                    '\\' || esctest(aa - 1) === false)) {
              block.pop()
              if (qc === 'double') {
                b[aa] = '"'
              } else if (qc === 'single') {
                b[aa] = "'"
              }
            } else if (block[block.length - 1] !== '"' && block[block
              .length - 1] !== "'" && (b[aa - 1] !==
                    '\\' || esctest(aa - 1) === false)) {
              block.push(b[aa])
              if (qc === 'double') {
                b[aa] = '"'
              } else if (qc === 'single') {
                b[aa] = "'"
              }
            } else if (b[aa - 1] === '\\' && qc !== 'none') {
              if (esctest(aa - 1) === true) {
                if (qc === 'double' && b[aa] === "'") {
                  out.pop()
                } else if (qc === 'single' && b[aa] === '"') {
                  out.pop()
                }
              }
            } else if (qc === 'double' && b[aa] === '"') {
              b[aa] = '\\"'
            } else if (qc === 'single' && b[aa] === "'") {
              b[aa] = "\\'"
            }
            out.push(b[aa])
          } else if (b[aa - 1] !== '\\' || esctest(aa - 1) ===
                false) {
            if (b[aa] === '(') {
              if (funk === null) {
                funk = true
              }
              block.push(')')
              spacestart()
            } else if (b[aa] === '[') {
              funk = false
              block.push(']')
              spacestart()
            } else if ((b[aa] === '#' || b[aa] === '@') && b[aa +
                    1] === '{') {
              funk = false
              out.push(b[aa])
              aa = aa + 1
              block.push('}')
              spacestart()
            } else if (b[aa] === block[block.length - 1]) {
              out.push(b[aa])
              block.pop()
            } else {
              out.push(b[aa])
            }
          } else {
            out.push(b[aa])
          }
          if (parse.structure[parse.structure.length - 1][0] ===
                'map' && block.length === 0 && (b[aa + 1] ===
                  ',' || b[aa + 1] === ')')) {
            if (b[aa + 1] === ')' && data.token[parse.count] ===
                  '(') {
              parse.pop(data)
              parse.structure.pop()
              out.splice(0, 0, '(')
            } else {
              break
            }
          }
          if (b[aa + 1] === ':') {
            bb = aa
            if ((/\s/).test(b[bb]) === true) {
              do {
                bb = bb - 1
              } while ((/\s/).test(b[bb]) === true)
            }
            outy = b
              .slice(bb - 6, bb + 1)
              .join('')
            if (outy.indexOf('filter') === outy.length - 6 || outy
              .indexOf('progid') === outy.length - 6) {
              outy = 'filter'
            }
          }
          if (block.length === 0) {
            if ((b[aa + 1] === ';' && esctest(aa + 1) === true) ||
                  (b[aa + 1] === ':' &&
                    b[aa] !== ':' &&
                    b[aa + 2] !== ':' &&
                    outy !== 'filter' &&
                    outy !== 'progid') ||
                  b[aa + 1] === '}' ||
                  b[aa + 1] === '{' ||
                  (b[aa + 1] === '/' && (b[aa + 2] === '*' || b[aa +
                    2] === '/'))) {
              bb = out.length - 1
              if ((/\s/).test(out[bb]) === true) {
                do {
                  bb = bb - 1
                  aa = aa - 1
                  out.pop()
                } while ((/\s/).test(out[bb]) === true)
              }
              break
            }
            if (b[aa + 1] === ',') {
              break
            }
          }
          aa = aa + 1
        } while (aa < len)
      }
      a = aa
      if (parse.structure[parse.structure.length - 1][0] === 'map' &&
            out[0] === '(') {
        mapper[mapper.length - 1] = mapper[mapper.length - 1] - 1
      }
      ltoke = out
        .join('')
        .replace(/\s+/g, ' ')
        .replace(/^\s/, '')
        .replace(/\s$/, '')
      if (funk === true) {
        ltoke = ltoke.replace(/\s+\(/g, '(').replace(/\s+\)/g, ')')
          .replace(/,\(/g, ', (')
      }
      if (parse.count > -1 && data.token[parse.count].indexOf(
        'extend('
      ) === 0) {
        ltype = 'pseudo'
      } else if (funk === true &&
            (/\d/).test(ltoke.charAt(0)) === false &&
            (/^rgba?\(/).test(ltoke) === false &&
            ltoke.indexOf('url(') !== 0 &&
            (ltoke.indexOf(' ') < 0 || ltoke.indexOf(' ') > ltoke.indexOf(
              '('
            )) &&
            ltoke.charAt(ltoke.length - 1) === ')') {
        if (data.token[parse.count] === ':') {
          ltype = 'value'
        } else {
          ltoke = ltoke.replace(/,\u0020?/g, ', ')
          ltype = 'function'
        }
        ltoke = value(ltoke)
      } else if (parse.count > -1 && "\"'".indexOf(data.token[parse
        .count].charAt(0)) > -1 && data.types[parse
        .count] === 'variable') {
        ltype = 'item'
      } else if (out[0] === '@' || out[0] === '$') {
        if (data.types[parse.count] === 'colon' && options
          .language === 'css' && (data.types[parse.count -
                  1] === 'property' || data.types[parse.count - 1] ===
                'variable')) {
          ltype = 'value'
        } else if (parse.count > -1) {
          ltype = 'item'
          outy = data.token[parse.count]
          aa = outy.indexOf('(')
          if (outy.charAt(outy.length - 1) === ')' && aa > 0) {
            outy = outy.slice(aa + 1, outy.length - 1)
            data.token[parse.count] = data
              .token[parse.count]
              .slice(0, aa + 1) + value(outy) + ')'
          }
        }
        ltoke = value(ltoke)
      } else {
        ltype = 'item'
      }
      recordPush('')
    }
    // Some tokens receive a generic type named 'item' because their type is unknown
    // until we know the following syntax.  This function replaces the type 'item'
    // with something more specific.
    const item = function lexer_style_item (type) {
      let aa = parse.count
      let bb = 0
      let first = ''
      const comsa = []
      const priors = function lexer_style_item_priors () {
        // backtrack through immediately prior comments to find the correct token
        if (data.types[aa] === 'comment' || data.types[aa] ===
                'ignore') {
          do {
            aa = aa - 1
            comsa.push(data.token[aa])
          } while (aa > 0 && data.lexer[aa] === 'style' && (data
            .types[aa] === 'comment' || data.types[
            aa] === 'ignore'))
        }
        bb = aa - 1
        if (data.types[bb] === 'comment' || data.types[bb] ===
                'ignore') {
          do {
            bb = bb - 1
          } while (bb > 0 && data.lexer[aa] === 'style' && (data
            .types[bb] === 'comment' || data.types[
            bb] === 'ignore'))
        }
        first = data.token[aa].charAt(0)
      }
      const selectorPretty = function lexer_style_item_selectorPretty (
        index
      ) {
        let cc = index
        const dd = data.begin[cc]
        data.token[index] = data.token[index]
          .replace(/\s*&/, ' &')
          .replace(/(\s*>\s*)/g, ' > ')
          .replace(/:\s+/g, ': ')
          .replace(/^(\s+)/, '')
          .replace(/(\s+)$/, '')
          .replace(/\s+::\s+/, '::')
        if (data.token[cc - 1] === ',' || data.token[cc - 1] ===
                ':' || data.types[cc - 1] === 'comment') {
          do {
            cc = cc - 1
            if (data.begin[cc] === dd) {
              if (data.token[cc] === ';') {
                break
              }
              if (data.token[cc] !== ',' && data.types[cc] !==
                      'comment') {
                data.types[cc] = 'selector'
              }
              if (data.token[cc] === ':') {
                data.token[cc - 1] =
                        `${data.token[cc - 1]}:${data.token[cc + 1]}`
                parse.splice({
                  data: data
                  , howmany: 2
                  , index: cc
                })
              }
            } else {
              break
            }
          } while (cc > 0)
        }
        // sorts comma separated lists of selectors
        cc = parse.count
        if (options.lexer_options.style.objectSort === true && data
          .token[cc - 1] === ',') {
          const store = [ data.token[cc] ]
          do {
            cc = cc - 1
            if (data.types[cc] === 'comment' || data.types[cc] ===
                    'ignore') {
              do {
                cc = cc - 1
              } while (cc > 0 && (data.types[cc] === 'comment' ||
                        data.types[cc] === 'ignore'))
            }
            if (data.token[cc] === ',') {
              cc = cc - 1
            }
            store.push(data.token[cc])
          } while (cc > 0 && (data.token[cc - 1] === ',' || data
            .types[cc - 1] === 'selector' || data.types[
            cc - 1] === 'comment' || data.types[cc - 1] ===
                    'ignore'))
          store.sort()
          cc = parse.count
          data.token[cc] = store.pop()
          do {
            cc = cc - 1
            if (data.types[cc] === 'comment' || data.types[cc] ===
                    'ignore') {
              do {
                cc = cc - 1
              } while (cc > 0 && (data.types[cc] === 'comment' ||
                        data.types[cc] === 'ignore'))
            }
            if (data.token[cc] === ',') {
              cc = cc - 1
            }
            data.token[cc] = store.pop()
          } while (cc > 0 && (data.token[cc - 1] === ',' || data
            .token[cc - 1] === 'selector' || data.types[
            cc - 1] === 'comment' || data.types[cc - 1] ===
                    'ignore'))
        }
        aa = parse.count
        priors()
      }
      priors()
      // if the last non-comment type is 'item' then id it
      if (type === 'start' && (data.types[aa] === 'value' || data
        .types[aa] === 'variable')) {
        data.types[aa] = 'item'
      }
      if (data.lexer[parse.count - 1] !== 'style' || bb < 0) {
        if (type === 'colon') {
          if (first === '$' || first === '@') {
            data.types[aa] = 'variable'
          } else {
            data.types[aa] = 'property'
          }
        } else if (data.lexer[aa] === 'style') {
          data.types[aa] = 'selector'
          selectorPretty(aa)
        }
      } else if (type === 'start' && data.types[aa] === 'function' &&
            data.lexer[aa] === 'style') {
        data.types[aa] = 'selector'
        selectorPretty(aa)
      } else if (data.types[aa] === 'item' && data.lexer[aa] ===
            'style') {
        if (type === 'start') {
          selectorPretty(aa)
          data.types[aa] = 'selector'
          if (data.token[aa] === ':') {
            data.types[bb] = 'selector'
          }
          if (data.token[aa].indexOf('=\u201c') > 0) {
            sparser.parseError =
                  `Quote looking character (\u201c, \\201c) used instead of actual quotes on line number ${parse.lineNumber}`
          } else if (data.token[aa].indexOf('=\u201d') > 0) {
            sparser.parseError =
                  `Quote looking character (\u201d, \\201d) used instead of actual quotes on line number ${parse.lineNumber}`
          }
        } else if (type === 'end') {
          if (first === '$' || first === '@') {
            data.types[aa] = 'variable'
          } else {
            data.types[aa] = 'value'
          }
          data.token[aa] = value(data.token[aa])
        } else if (type === 'separator') {
          if (data.types[bb] === 'colon' || data.token[bb] === ',' ||
                data.token[bb] === '{') {
            if (b[a] !== ';' && (data.types[bb] === 'selector' || data
              .token[bb] === '{')) {
              data.types[aa] = 'selector'
              selectorPretty(aa)
            } else if (data.token[aa].charAt(0) === '$' || data.token[
              aa].charAt(0) === '@') {
              data.types[aa] = 'variable'
            } else {
              data.types[aa] = 'value'
            }
            data.token[aa] = value(data.token[aa])
            if (data.token[aa].charAt(0) === '\u201c') {
              sparser.parseError =
                    `Quote looking character (\u201c, \\201c) used instead of actual quotes on line number ${parse.lineNumber}`
            } else if (data.token[aa].charAt(0) === '\u201d') {
              sparser.parseError =
                    `Quote looking character (\u201d, \\201d) used instead of actual quotes on line number ${parse.lineNumber}`
            }
          } else {
            if (first === '$' || first === '@') {
              data.types[aa] = 'variable'
            } else if (data.types[bb] === 'value' || data.types[
              bb] === 'variable') {
              data.token[bb] = data.token[bb] + data.token[aa]
              parse.pop(data)
            } else {
              data.types[aa] = 'value'
            }
          }
        } else if (type === 'colon') {
          if (first === '$' || first === '@') {
            data.types[aa] = 'variable'
          } else {
            data.types[aa] = 'property'
          }
        } else if (data.token[bb].charAt(0) === '@' && ((data.types[
          bb - 2] !== 'variable' && data.types[bb -
                  2] !== 'property') || data.types[bb - 1] ===
                'separator')) {
          data.types[bb] = 'variable'
          ltype = 'variable'
          data.token[bb] = value(data.token[bb])
        }
      }
    }
    const semiComment = function lexer_style_separatorComment () {
      let x = parse.count
      do {
        x = x - 1
      } while (x > 0 && (data.types[x] === 'comment'))
      if (data.token[x] === ';') {
        return
      }
      parse.splice({
        data: data
        , howmany: 0
        , index: x + 1
        , record: {
          begin: parse.structure[parse.structure.length - 1][1]
          , ender: -1
          , lexer: 'style'
          , lines: parse.linesSpace
          , stack: parse.structure[parse.structure.length - 1][0]
          , token: ';'
          , types: 'separator'
        }
      })
    }
    const template = function lexer_style_template (open, end) {
      let quote = ''
      let name = ''
      let start = open.length
      let endlen = 0
      const store = []
      const exit = function lexer_style_template_exit (typename) {
        const endtype = data.types[parse.count - 1]
        if (ltype === 'item') {
          if (endtype === 'colon') {
            data.types[parse.count] = 'value'
          } else {
            item(endtype)
          }
        }
        ltype = typename
        if (ltype.indexOf('start') > -1 || ltype.indexOf('else') > -1) {
          recordPush(ltoke)
        } else {
          recordPush('')
        }
      }
      nosort[nosort.length - 1] = true
      if (a < len) {
        do {
          store.push(b[a])
          if (quote === '') {
            if (b[a] === '"') {
              quote = '"'
            } else if (b[a] === "'") {
              quote = "'"
            } else if (b[a] === '/') {
              if (b[a + 1] === '/') {
                quote = '/'
              } else if (b[a + 1] === '*') {
                quote = '*'
              }
            } else if (b[a + 1] === end.charAt(0)) {
              do {
                endlen = endlen + 1
                a = a + 1
                store.push(b[a])
              } while (a < len && endlen < end.length && b[a + 1] ===
                    end.charAt(endlen))
              if (endlen === end.length) {
                quote = store.join('')
                if ((/\s/).test(quote.charAt(start)) === true) {
                  do {
                    start = start + 1
                  } while ((/\s/).test(quote.charAt(start)) === true)
                }
                endlen = start
                do {
                  endlen = endlen + 1
                } while (endlen < end.length && (/\s/).test(quote
                  .charAt(endlen)) === false)
                if (endlen === quote.length) {
                  endlen = endlen - end.length
                }

                if (open === '{%') {

                  if (quote.indexOf('{%-') === 0) {
                    quote = quote
                      .replace(/^(\{%-\s*)/, '{%- ')
                      .replace(/(\s*-%\})$/, ' -%}')
                      .replace(/(\s*%\})$/, ' %}')

                    name = quote.slice(4)
                  } else {
                    quote = quote
                      .replace(/^(\{%\s*)/, '{% ')
                      .replace(/(\s*%\})$/, ' %}')
                      .replace(/(\s*-%\})$/, ' -%}')

                    name = quote.slice(3)
                  }
                }

                // HOTFIX
                // Prevent whitespace removals of output tag values
                if (open === '{{') {
                  quote = quote
                    .replace(/^(\{\{\s*)/, '{{ ')
                    .replace(/^(\{\{-\s*)/, '{{- ')
                    .replace(/(\s*-\}\})$/, ' -}}')
                    .replace(/(\s*\}\})$/, ' }}')
                }

                if (
                  ltype === 'item' &&
                      data.types[parse.count - 1] === 'colon' && (
                    data.types[parse.count - 2] === 'property' ||
                        data.types[parse.count - 2] === 'variable'
                  )
                ) {

                  ltype = 'value'
                  data.types[parse.count] = 'value'

                  if (Number.isNaN(Number(data.token[parse
                    .count])) === true && data.token[parse.count]
                    .charAt(data.token[parse.count].length - 1) !==
                        ')') {
                    data.token[parse.count] = data.token[parse
                      .count] + quote
                  } else {
                    data.token[parse.count] = data.token[parse
                      .count] + ' ' + quote
                  }
                  return
                }

                ltoke = quote

                if (open === '{%') {

                  const templateNames = [
                    'autoescape'
                    , 'block'
                    , 'capture'
                    , 'case'
                    , 'comment'
                    , 'embed'
                    , 'filter'
                    , 'for'
                    , 'form'
                    , 'if'
                    , 'macro'
                    , 'paginate'
                    , 'raw'
                    , 'sandbox'
                    , 'spaceless'
                    , 'tablerow'
                    , 'unless'
                    , 'verbatim'
                  ]

                  let namesLen = templateNames.length - 1

                  name = name.slice(0, name.indexOf(' '))
                  if (name.indexOf('(') > 0) {
                    name = name.slice(0, name.indexOf('('))
                  }
                  if (
                    name === 'else' ||
                        name === 'elseif' ||
                        name === 'when' ||
                        name === 'elif' ||
                        name === 'elsif'
                  ) {
                    exit('template_else')
                    return
                  }
                  namesLen = templateNames.length - 1
                  if (namesLen > -1) {
                    do {
                      if (name === templateNames[namesLen]) {
                        exit('template_start')
                        return
                      }
                      if (name === 'end' + templateNames[namesLen]) {
                        exit('template_end')
                        return
                      }
                      namesLen = namesLen - 1
                    } while (namesLen > -1)
                  }
                } else if (open === '{{') {

                  let group = quote.slice(2)
                  const ending = group.length
                  let begin = 0

                  do {
                    begin = begin + 1
                  } while (
                    begin < ending && (/\s/).test(group.charAt(
                      begin
                    )) === false &&
                        group.charAt(start) !== '('
                  )

                  group = group.slice(0, begin)

                  if (group.charAt(group.length - 2) === '}') {
                    group = group.slice(0, group.length - 2)
                  }

                  if (group === 'end') {
                    exit('template_end')
                    return
                  }

                  if (
                    group === 'block' ||
                        group === 'define' ||
                        group === 'form' ||
                        group === 'if' ||
                        group === 'range' ||
                        group === 'with'
                  ) {
                    exit('template_start')
                    return
                  }
                }

                exit('template')
                return
              }
              endlen = 0
            }
          } else if (quote === b[a]) {
            if (quote === '"' || quote === "'") {
              quote = ''
            } else if (quote === '/' && (b[a] === '\r' || b[a] ===
                    '\n')) {
              quote = ''
            } else if (quote === '*' && b[a + 1] === '/') {
              quote = ''
            }
          }
          a = a + 1
        } while (a < len)
      }
    }

    // finds comments including those JS looking '//' comments
    const comment = function lexer_style_comment (line) {
      const comm = (line === true)
        ? parse.wrapCommentLine({
          chars: b
          , end: len
          , lexer: 'style'
          , opening: '//'
          , start: a
          , terminator: '\n'
        })
        : parse.wrapCommentBlock({
          chars: b
          , end: len
          , lexer: 'style'
          , opening: '/*'
          , start: a
          , terminator: '\u002a/'
        })
      ltoke = comm[0]
      ltype = ((/^(\/\*\s*parse-ignore-start)/).test(ltoke) ===
              true)
        ? 'ignore'
        : 'comment'
      recordPush('')
      a = comm[1]
    }
    // consolidate margin and padding values
    const margin_padding = function lexer_style_marginPadding () {
      const lines = parse.linesSpace
      const props = {
        data: {
          margin: [ '', '', '', '', false ]
          , padding: [ '', '', '', '', false ]
        }
        , last: {
          margin: 0
          , padding: 0
        }
        , removes: []
      }
      const begin = parse.structure[parse.structure.length - 1][1]
      const populate = function lexer_style_marginPadding_populate (
        prop
      ) {
        if (data.token[aa - 2] === prop) {
          const values = data.token[aa].replace(/\s*!important\s*/g
            , '').split(' ')
          const vlen = values.length
          if (data.token[aa].indexOf('!important') > -1) {
            props.data[prop[4]] = true
          }
          if (vlen > 3) {
            if (props.data[prop][0] === '') {
              props.data[prop][0] = values[0]
            }
            if (props.data[prop][1] === '') {
              props.data[prop][1] = values[1]
            }
            if (props.data[prop][2] === '') {
              props.data[prop][2] = values[2]
            }
            if (props.data[prop][3] === '') {
              props.data[prop][3] = values[3]
            }
          } else if (vlen > 2) {
            if (props.data[prop][0] === '') {
              props.data[prop][0] = values[0]
            }
            if (props.data[prop][1] === '') {
              props.data[prop][1] = values[1]
            }
            if (props.data[prop][2] === '') {
              props.data[prop][2] = values[2]
            }
            if (props.data[prop][3] === '') {
              props.data[prop][3] = values[1]
            }
          } else if (vlen > 1) {
            if (props.data[prop][0] === '') {
              props.data[prop][0] = values[0]
            }
            if (props.data[prop][1] === '') {
              props.data[prop][1] = values[1]
            }
            if (props.data[prop][2] === '') {
              props.data[prop][2] = values[0]
            }
            if (props.data[prop][3] === '') {
              props.data[prop][3] = values[1]
            }
          } else {
            if (props.data[prop][0] === '') {
              props.data[prop][0] = values[0]
            }
            if (props.data[prop][1] === '') {
              props.data[prop][1] = values[0]
            }
            if (props.data[prop][2] === '') {
              props.data[prop][2] = values[0]
            }
            if (props.data[prop][3] === '') {
              props.data[prop][3] = values[0]
            }
          }
        } else if (data.token[aa - 2] === `${prop}-bottom`) {
          if (props.data[prop][2] === '') {
            props.data[prop][2] = data.token[aa]
          }
        } else if (data.token[aa - 2] === `${prop}-left`) {
          if (props.data[prop][3] === '') {
            props.data[prop][3] = data.token[aa]
          }
        } else if (data.token[aa - 2] === `${prop}-right`) {
          if (props.data[prop][1] === '') {
            props.data[prop][1] = data.token[aa]
          }
        } else if (data.token[aa - 2] === `${prop}-top`) {
          if (props.data[prop][0] === '') {
            props.data[prop][0] = data.token[aa]
          }
        } else {
          return
        }
        props.removes.push([ aa, prop ])
        props.last[prop] = aa
      }
      const removes = function lexer_style_marginPadding_removes () {
        let cc = 0
        let values = ''
        const zero = (/^(0+([a-z]+|%))/)
        const bb = props.removes.length
        const tmargin = (props.data.margin[0] !== '' && props.data
          .margin[1] !== '' && props.data.margin[
          2] !== '' && props.data.margin[3] !== '')
        const tpadding = (props.data.padding[0] !== '' && props.data
          .padding[1] !== '' && props.data.padding[
          2] !== '' && props.data.padding[3] !== '')
        const applyValues =
                function lexer_style_marginPadding_removes_applyValues (
                  prop
                ) {
                  if (zero.test(props.data[prop][0]) === true) {
                    props.data[prop][0] = '0'
                  }
                  if (zero.test(props.data[prop][1]) === true) {
                    props.data[prop][1] = '0'
                  }
                  if (zero.test(props.data[prop][2]) === true) {
                    props.data[prop][2] = '0'
                  }
                  if (zero.test(props.data[prop][3]) === true) {
                    props.data[prop][3] = '0'
                  }
                  if (props.data[prop][0] === props.data[prop][1] && props
                    .data[prop][0] === props.data[prop][
                    2
                  ] && props.data[prop][0] === props.data[prop][3]) {
                    values = props.data[prop][0]
                  } else if (props.data[prop][0] === props.data[prop][
                    2
                  ] && props.data[prop][1] === props.data[
                    prop][3] && props.data[prop][0] !== props.data[prop]
                    [1]) {
                    values =
                      `${props.data[prop][0]} ${props.data[prop][1]}`
                  } else if (props.data[prop][1] === props.data[prop][
                    3
                  ] && props.data[prop][0] !== props.data[
                    prop][2]) {
                    values =
                      `${props.data[prop][0]} ${props.data[prop][1]} ${props.data[prop][2]}`
                  } else {
                    values =
                      `${props.data[prop][0]} ${props.data[prop][1]} ${props.data[prop][2]} ${props.data[prop][3]}`
                  }
                  if (props.data[prop[4]] === true) {
                    values =
                      `${values.replace(' !important', '')} !important`
                  }
                  if (props.last[prop] > parse.count) {
                    cc = (begin < 1)
                      ? 1
                      : begin + 1
                    do {
                      if (data.begin[cc] === begin && data.types[cc] ===
                        'value' && data.token[cc - 2].indexOf(
                        prop
                      ) === 0) {
                        props.last[prop] = cc
                        break
                      }
                      cc = cc + 1
                    } while (cc < parse.count)
                  }
                  data.token[props.last[prop]] = values
                  data.token[props.last[prop] - 2] = prop
                }
        if (bb > 1 && (tmargin === true || tpadding === true)) {
          do {
            if (props.removes[cc][0] !== props.last.margin && props
              .removes[cc][0] !== props.last.padding &&
                    ((tmargin === true && props.removes[cc][1] ===
                      'margin') || (tpadding === true && props
                      .removes[cc][1] === 'padding'))) {
              parse.splice({
                data: data
                , howmany: (data.types[props.removes[cc][0] +
                          1] === 'separator')
                  ? 4 : 3
                , index: props.removes[cc][0] - 2
              })
            }
            cc = cc + 1
          } while (cc < bb - 1)
        }
        if (tmargin === true) {
          applyValues('margin')
        }
        if (tpadding === true) {
          applyValues('padding')
        }
        // this is necessary to fix the "begin" values of descendent blocks
        if (endtest === true) {
          if (begin < 0) {
            sparser.parseError =
                    'Brace mismatch.  There appears to be more closing braceAllman than starting braceAllman.'
          } else {
            parse.sortCorrection(begin, parse.count + 1)
          }
        }
      }
      let aa = parse.count
      let endtest = false
      do {
        aa = aa - 1
        if (data.begin[aa] === begin) {
          if (data.types[aa] === 'value' && data.types[aa - 2] ===
                'property') {
            if (data.token[aa - 2].indexOf('margin') === 0) {
              populate('margin')
            } else if (data.token[aa - 2].indexOf('padding') === 0) {
              populate('padding')
            }
          }
        } else {
          endtest = true
          aa = data.begin[aa]
        }
      } while (aa > begin)
      removes()
      parse.linesSpace = lines
    }
    // token building loop
    do {
      if ((/\s/).test(b[a]) === true) {
        a = parse.spacer({
          array: b
          , end: len
          , index: a
        })
      } else if (b[a] === '/' && b[a + 1] === '*') {
        comment(false)
      } else if (b[a] === '/' && b[a + 1] === '/') {
        comment(true)
      } else if (b[a] === '<' && b[a + 1] === '%') {
        // asp
        template('<%', '%>')
      } else if (b[a] === '{' && b[a + 1] === '%') {
        // asp
        template('{%', '%}')
      } else if (b[a] === '{' && b[a + 1] === '{' && b[a + 2] === '{') {
        // mustache
        template('{{{', '}}}')
      } else if (b[a] === '{' && b[a + 1] === '{') {
        // handlebars
        template('{{', '}}')
      } else if (b[a] === '<' && b[a + 1] === '!' && b[a + 2] === '-' &&
          b[a + 3] === '-' && b[a + 4] === '#') {
        // ssi
        template('<!--#', '-->')
      } else if (b[a] === '@' && b[a + 1] === 'e' && b[a + 2] === 'l' &&
          b[a + 3] === 's' && b[a + 4] === 'e' &&
          (b[a + 5] === '{' || (/\s/).test(b[a + 5]) === true)) {
        ltoke = '@else'
        ltype = 'template_else'
        recordPush('')
        a = a + 4
      } else if (b[a] === '{' || (b[a] === '(' && data.token[parse
        .count] === ':' && data.types[parse.count -
            1] === 'variable')) {
        item('start')
        ltype = 'start'
        ltoke = b[a]
        if (b[a] === '(') {
          recordPush('map')
          mapper.push(0)
        } else if (data.types[parse.count] === 'selector' || data.types[
          parse.count] === 'variable') {
          recordPush(data.token[parse.count])
        } else if (data.types[parse.count] === 'colon') {
          recordPush(data.token[parse.count - 1])
        } else {
          recordPush('block')
        }
        nosort.push(false)
      } else if (b[a] === '}' || (b[a] === ')' && parse.structure[parse
        .structure.length - 1][0] === 'map' &&
            mapper[mapper.length - 1] === 0)) {
        if (b[a] === '}' && data.types[parse.count] === 'item' && data
          .token[parse.count - 1] === '{' && data
          .token[parse.count - 2] !== undefined && data.token[parse
          .count - 2].charAt(data.token[parse.count -
              2].length - 1) === '@') {
          data.token[parse.count - 2] = data.token[parse.count - 2] +
              '{' + data.token[parse.count] +
              '}'
          parse.pop(data)
          parse.pop(data)
          parse.structure.pop()
        } else {
          if (b[a] === ')') {
            mapper.pop()
          }
          item('end')
          if (b[a] === '}' && data.token[parse.count] !== ';') {
            if (data.types[parse.count] === 'value' || data.types[parse
              .count] === 'function' || (data.types[
              parse.count] === 'variable' && (data.token[parse
              .count - 1] === ':' || data.token[parse
              .count - 1] === ';'))) {
              if (options.attemptCorrection === true) {
                ltoke = ';'
              } else {
                ltoke = 'x;'
              }
              ltype = 'separator'
              recordPush('')
            } else if (data.types[parse.count] === 'comment') {
              semiComment()
            }
          }
          ltype = 'end'
          nosort.pop()
          ltoke = b[a]
          ltype = 'end'
          if (b[a] === '}') {
            margin_padding()
          }
          if (options.lexer_options.style.objectSort === true && b[
            a] === '}') {
            parse.objectSort(data)
          }
          recordPush('')
        }
      } else if (b[a] === ';' || b[a] === ',') {
        if (data.types[parse.count - 1] === 'selector' || (data.token[
          parse.count - 1] === '}' && data.types[
          parse.count] !== 'function')) {
          item('start')
        } else {
          item('separator')
        }
        if (data.types[parse.count] !== 'separator' && esctest(a) ===
            true) {
          ltoke = b[a]
          ltype = 'separator'
          recordPush('')
        }
      } else if (b[a] === ':' && data.types[parse.count] !== 'end') {
        item('colon')
        ltoke = ':'
        ltype = 'colon'
        recordPush('')
      } else {
        if (parse.structure[parse.structure.length - 1][0] === 'map' &&
            b[a] === '(') {
          mapper[mapper.length - 1] = mapper[mapper.length - 1] + 1
        }
        buildtoken()
      }
      a = a + 1
    } while (a < len)
    if (options.lexer_options.style.objectSort === true) {
      parse.objectSort(data)
    }
    return data
  }
  sparser.lexers.style = style
}())
