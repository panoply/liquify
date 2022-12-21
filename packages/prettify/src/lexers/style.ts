/* eslint-disable no-use-before-define */
import type { Types } from 'types/prettify';
import { wrapCommentBlock, wrapCommentLine } from '@comments/parse';
import { prettify } from '@prettify/model';
import { parse } from '@parser/parse';
import { grammar } from '@options/grammar';
import { is, not, ws } from '@utils/helpers';
import { cc, NIL, WSP } from '@utils/chars';

/* -------------------------------------------- */
/* LEXER                                        */
/* -------------------------------------------- */

/**
 * Style Lexer
 *
 * Used to parse style languages. This lexing algorithm supports
 * the following languages
 *
 * - CSS
 * - SCSS
 * - LESS
 * - Liquid.
 */
prettify.lexers.style = function style (source: string) {

  const { options } = prettify;

  /**
   * Cached option style beautification rules
   */
  const rules = options.style;

  /**
   * Parse data reference
   */
  const { data } = parse;

  /**
   * The document source as an array list, ie: `source.split(NIL)`
   */
  const b = source.split(NIL);

  /**
   * The input source string length
   */
  const c = source.length;

  /**
   * Holds a _number_ array reference, (I am unsure of exact use)
   */
  const mapper: number[] = [];

  /**
   * Holds a _boolean_ reference to sorting
   */
  const nosort: boolean[] = [];

  /* -------------------------------------------- */
  /* LEXICAL SCOPES                               */
  /* -------------------------------------------- */

  /**
   * Advancement reference
   */
  let a = 0;

  /**
   * Last Type, ie: `start`, `selector`, `template` etc etc
   */
  let ltype: Types = NIL;

  /**
   * Last Token, ie: `.selector`, `font-size`, `:` etc etc
   */
  let ltoke = NIL;

  /* -------------------------------------------- */
  /* FUNCTIONS                                    */
  /* -------------------------------------------- */

  /**
   * Pushes a record into the parse table
   */
  function push (structure: string) {

    parse.push(data, {
      begin: parse.structure[parse.structure.length - 1][1],
      ender: -1,
      lexer: 'style',
      lines: parse.linesSpace,
      stack: parse.structure[parse.structure.length - 1][0],
      token: ltoke,
      types: ltype as Types
    }, structure);

  };

  /**
   * Escape Character Test
   */
  function esctest (index: number) {

    const slashy = index;

    do { index = index - 1; } while (b[index] === '\\' && index > 0);

    return (slashy - index) % 2 === 1;

  };

  /**
   * CSS Values
   *
   * Handles the processing and beautification ammendments of CSS
   * property values. See the below note from Austin.
   *
   * ---
   *
   * Original Note:
   *
   * Since I am already identifying value types this is a good place to do some
   * quick analysis and clean up on certain value conditions.
   *
   * These things are being corrected:
   *
   * - Fractional values missing a leading `0` are provided a leading `0`
   * - Zero (`0`) values with a dimension indicator (px, em) have the dimension indicator removed
   * - Eliminate unnecessary leading `0s`
   * - URL values that are not quoted are wrapped in double quote characters
   * - Color values are set to lowercase and reduced from `6` to `3` digits if appropriate
   */
  function value (input: string) {

    /**
     * The values list - All `!important` extraneous whitespace is stripped.
     */
    const x = input.replace(/\s*!important/, ' !important').split(NIL);

    /**
     * Whether or not we are dealing with a `transition` value
     */
    const transition = (/-?transition$/).test(data.token[parse.count - 2]);

    /**
     * The CSS property values token list
     */
    const values: string[] = [];

    /**
     * Zero Dot Expression
     */
    const zerodot = (/(\s|\(|,)-?0+\.?\d+([a-z]|\)|,|\s)/g);

    /**
     * Dot Expression
     */
    const dot = (/(\s|\(|,)-?\.?\d+([a-z]|\)|,|\s)/g);

    /* -------------------------------------------- */
    /* LEXICAL SCOPES                               */
    /* -------------------------------------------- */

    let ii = 0;
    let dd = 0;
    let block = NIL;
    let leng = x.length;
    let items = [];

    /**
     * Color Push - NOT IN USE
     */
    const colorPush = (value: string) => {

      // const vl = value.toLowerCase();
      // if ((/^(#[0-9a-f]{3,6})$/).test(vl) === true) {

      // } else if ((/^(rgba?\()/).test(vl) === true) {

      // else;
      return value;
    };

    /**
     * Property Value Spacing - Correctly formats values
     */
    function valueSpace (find: string) {

      find = find.replace(/\s*/g, NIL);

      return /\/\d/.test(find) && input.indexOf('url(') === 0
        ? find
        : ` ${find.charAt(0)} ${find.charAt(1)}`;

    };

    /**
     * Zero fixes - Handles `noLeadZero` rule
     */
    function zeroFix (find: string) {

      if (rules.noLeadZero === true) {

        return find.replace(/^-?\D0+(\.|\d)/, (search: string) => search.replace(/0+/, NIL));

      } else if (/0*\./.test(find)) {

        return find.replace(/0*\./, '0.');

      } else if (/0+/.test((/\d+/).exec(find)[0])) {

        return (/^\D*0+\D*$/).test(find)
          ? find.replace(/0+/, '0')
          : find.replace((/\d+/).exec(find)[0], (/\d+/).exec(find)[0].replace(/^0+/, NIL));
      }

      return find;
    };

    /**
     * Commas Space
     */
    function commaSpace (find: string) {

      return find.replace(',', ', ');

    }

    /**
     * Unit Fixes (ie: dimensions)
     */
    function units (dimension: string) {

      return `${dimension} `;

    }

    /**
     * Slash handler - Escaped character processing
     */
    function safeSlash () {

      const start = ii - 1;

      let xx = start;

      if (start < 1) return true;

      do { xx = xx - 1; } while (xx > 0 && x[xx] === '\\');

      return (start - xx) % 2 === 1; // report true for odd numbers (escaped)

    };

    // This loop identifies containment so that tokens/sub-tokens are correctly taken
    if (ii < leng) {

      do {

        items.push(x[ii]);

        if (x[ii - 1] !== '\\' || safeSlash() === false) {

          if (block === NIL) {

            if (is(x[ii], cc.DQO)) {

              block = '"';
              dd = dd + 1;

            } else if (is(x[ii], cc.SQO)) {

              block = "'";
              dd = dd + 1;

            } else if (is(x[ii], cc.LPR)) {

              block = ')';
              dd = dd + 1;

            } else if (is(x[ii], cc.LSB)) {

              block = ']';
              dd = dd + 1;

            }

          } else if ((
            is(x[ii], cc.LPR) &&
            is(block, cc.RPR)
          ) || (
            is(x[ii], cc.LSB) &&
            is(block, cc.RSB)
          )) {

            dd = dd + 1;

          } else if (x[ii] === block) {

            dd = dd - 1;

            if (dd === 0) block = NIL;

          }
        }

        if (block === NIL && is(x[ii], cc.WSP)) {
          items.pop();
          values.push(colorPush(items.join(NIL)));
          items = [];
        }

        ii = ii + 1;

      } while (ii < leng);
    }

    values.push(colorPush(items.join(NIL)));

    leng = values.length;

    // This is where the rules mentioned above are applied
    ii = 0;

    if (ii < leng) {

      do {

        if (rules.noLeadZero === true && /^-?0+\.\d+[a-z]/.test(values[ii]) === true) {

          values[ii] = values[ii].replace(/0+\./, '.');

        } else if (rules.noLeadZero === false && /^-?\.\d+[a-z]/.test(values[ii])) {

          values[ii] = values[ii].replace('.', '0.');

        } else if (zerodot.test(values[ii]) || dot.test(values[ii])) {

          values[ii] = values[ii].replace(zerodot, zeroFix).replace(dot, zeroFix);

        } else if (/^(0+([a-z]{2,3}|%))$/.test(values[ii]) && transition === false) {

          values[ii] = '0';

        } else if (/^(0+)/.test(values[ii])) {

          values[ii] = values[ii].replace(/0+/, '0');

          if (/\d/.test(values[ii].charAt(1))) values[ii] = values[ii].substr(1);

        } else if (/^url\((?!('|"))/.test(values[ii]) && values[ii].charCodeAt(values[ii].length - 1) === cc.RPR) {

          block = values[ii].charAt(values[ii].indexOf('url(') + 4);

          if (block !== '@' && not(block, cc.LPR) && not(block, cc.LAN)) {
            if (rules.quoteConvert === 'double') {
              values[ii] = values[ii].replace(/url\(/, 'url("').replace(/\)$/, '")');
            } else {
              values[ii] = values[ii].replace(/url\(/, "url('").replace(/\)$/, "')");
            }
          }
        }

        if (/^(\+|-)?\d+(\.\d+)?(e-?\d+)?\D+$/.test(values[ii])) {
          if (!grammar.style.units.has(values[ii].replace(/(\+|-)?\d+(\.\d+)?(e-?\d+)?/, NIL))) {
            values[ii] = values[ii].replace(/(\+|-)?\d+(\.\d+)?(e-?\d+)?/, units);
          }
        }

        if (/^\w+\(/.test(values[ii]) && values[ii].charAt(values[ii].length - 1) === ')' && (
          values[ii].indexOf('url(') !== 0 || (
            values[ii].indexOf('url(') === 0 &&
            values[ii].indexOf(WSP) > 0
          )
        )) {

          values[ii] = values[ii].replace(/,\S/g, commaSpace);
        }

        ii = ii + 1;

      } while (ii < leng);
    }

    block = values.join(WSP);

    return block.charAt(0) + block.slice(1).replace(/\s*(\/|\+|\*)\s*(\d|\$)/, valueSpace);

  };

  // the generic token builder
  function buildToken () {

    const block = [];
    const out = [];
    const qc = rules.quoteConvert;

    /* -------------------------------------------- */
    /* LEXICAL SCOPES                               */
    /* -------------------------------------------- */

    let aa = a;
    let bb = 0;
    let outy = NIL;
    let func = null;
    let nopush = false;

    function spaceStart () {

      out.push(b[aa]);

      if (ws(b[aa + 1])) do { aa = aa + 1; } while (aa < c && ws(b[aa + 1]));

    };

    if (aa < c) {

      // this loop accounts for grouping mechanisms
      do {

        if (is(b[aa], cc.DQO) || is(b[aa], cc.SQO)) {

          if (func === null) func = false;

          if (block[block.length - 1] === b[aa] && (b[aa - 1] !== '\\' || esctest(aa - 1) === false)) {

            block.pop();

            if (qc === 'double') {
              b[aa] = '"';
            } else if (qc === 'single') {
              b[aa] = "'";
            }

          } else if (
            not(block[block.length - 1], cc.DQO) &&
            not(block[block.length - 1], cc.SQO) && (
              not(b[aa - 1], cc.BWS) ||
              esctest(aa - 1) === false
            )
          ) {

            block.push(b[aa]);

            if (qc === 'double') {
              b[aa] = '"';
            } else if (qc === 'single') {
              b[aa] = "'";
            }

          } else if (b[aa - 1] === '\\' && qc !== 'none') {

            if (esctest(aa - 1) === true) {
              if (qc === 'double' && is(b[aa], cc.SQO)) {
                out.pop();
              } else if (qc === 'single' && is(b[aa], cc.DQO)) {
                out.pop();
              }
            }

          } else if (qc === 'double' && is(b[aa], cc.DQO)) {
            b[aa] = '\\"';
          } else if (qc === 'single' && is(b[aa], cc.SQO)) {
            b[aa] = "\\'";
          }

          out.push(b[aa]);

        } else if (b[aa - 1] !== '\\' || esctest(aa - 1) === false) {

          if (is(b[aa], cc.LPR)) {

            if (func === null) func = true;

            block.push(')');
            spaceStart();

          } else if (is(b[aa], cc.LSB)) {

            func = false;
            block.push(']');
            spaceStart();

          } else if ((is(b[aa], cc.HSH) || is(b[aa], cc.ATT)) && is(b[aa + 1], cc.LCB)) {

            func = false;
            out.push(b[aa]);

            aa = aa + 1;
            block.push('}');
            spaceStart();

          } else if (b[aa] === block[block.length - 1]) {

            out.push(b[aa]);
            block.pop();

          } else {
            out.push(b[aa]);

          }

        } else {

          out.push(b[aa]);

        }

        if (parse.structure[parse.structure.length - 1][0] === 'map' && block.length === 0 && (
          is(b[aa + 1], cc.COM) ||
          is(b[aa + 1], cc.RPR)
        )) {

          if (is(b[aa + 1], cc.RPR) && is(data.token[parse.count], cc.LPR)) {

            parse.pop(data);
            parse.structure.pop();
            out.splice(0, 0, '(');

          } else {
            break;
          }
        }

        if (is(b[aa + 1], cc.COL)) {

          bb = aa;

          if (ws(b[bb])) {

            do bb = bb - 1;
            while (ws(b[bb]));

          }

          outy = b.slice(bb - 6, bb + 1).join(NIL);

          if (outy.indexOf('filter') === outy.length - 6 || outy.indexOf('progid') === outy.length - 6) {
            outy = 'filter';
          }

        }

        if (block.length === 0) {

          if ((is(b[aa + 1], cc.SEM) && esctest(aa + 1) === true) || (
            is(b[aa + 1], cc.COL) &&
            not(b[aa], cc.COL) &&
            not(b[aa + 2], cc.COL) &&
            outy !== 'filter' &&
            outy !== 'progid'
          ) || (
            is(b[aa + 1], cc.LCB) ||
            is(b[aa + 1], cc.RCB)
          ) || (
            is(b[aa + 1], cc.FWS) && (
              is(b[aa + 2], cc.ARS) ||
              is(b[aa + 2], cc.FWS)
            )
          )) {

            bb = out.length - 1;

            if (ws(out[bb])) {
              do {
                bb = bb - 1;
                aa = aa - 1;
                out.pop();
              } while (ws(out[bb]));
            }

            break;
          }

          if (is(b[aa + 1], cc.COM)) break;

        }

        aa = aa + 1;

      } while (aa < c);
    }

    a = aa;

    if (parse.structure[parse.structure.length - 1][0] === 'map' && is(out[0], cc.LPR)) {

      mapper[mapper.length - 1] = mapper[mapper.length - 1] - 1;

    }

    ltoke = out
      .join(NIL)
      .replace(/\s+/g, WSP)
      .replace(/^\s/, NIL)
      .replace(/\s$/, NIL);

    if (func === true) {

      if (grammar.style.atrules.has(grammar.atrules(ltoke)) && rules.atRuleSpace === true) {

        data.token[parse.count] = data.token[parse.count]
          .replace(/\s*\(/g, ' (')
          .replace(/\s*\)\s*/g, ') ')
          .replace(/,\(/g, ', (');

      } else {

        ltoke = ltoke
          .replace(/\s+\(/g, '(')
          .replace(/\s+\)/g, ')')
          .replace(/,\(/g, ', (');
      }

    }

    if (ltype === 'colon' && data.types[parse.count - 1] === 'start') {

      // Handle pseudo class selectors
      //
      if (grammar.style.pseudoClasses.has(ltoke)) {
        data.token[parse.count] = ltoke = ':' + ltoke;
        ltype = 'pseudo';
        nopush = true;
      }

    } else if (parse.count > -1 && data.token[parse.count].indexOf('extend(') === 0) {

      ltype = 'pseudo';

    } else if (
      func === true &&
      /\d/.test(ltoke.charAt(0)) === false &&
      /^rgba?\(/.test(ltoke) === false &&
      ltoke.indexOf('url(') !== 0 && (
        ltoke.indexOf(WSP) < 0 ||
        ltoke.indexOf(WSP) > ltoke.indexOf('(')
      ) && ltoke.charAt(ltoke.length - 1) === ')'
    ) {

      if (is(data.token[parse.count], cc.COL)) {
        ltype = 'value';
      } else {
        ltoke = ltoke.replace(/,\u0020?/g, ', ');
        ltype = 'function';
      }

      ltoke = value(ltoke);

    } else if (
      parse.count > -1 &&
      "\"'".indexOf(data.token[parse.count].charAt(0)) > -1 &&
      data.types[parse.count] === 'variable'
    ) {

      ltype = 'item';

    } else if (is(out[0], cc.ATT) || out[0] === '$') {

      if (
        data.types[parse.count] === 'colon' &&
        options.language === 'css' && (
          data.types[parse.count - 1] === 'property' ||
          data.types[parse.count - 1] === 'variable'
        )
      ) {

        ltype = 'value';

      } else if (parse.count > -1) {

        ltype = 'item';
        outy = data.token[parse.count];
        aa = outy.indexOf('(');

        if (is(outy[outy.length - 1], cc.RPR) && aa > 0) {
          outy = outy.slice(aa + 1, outy.length - 1);
          data.token[parse.count] = data.token[parse.count].slice(0, aa + 1) + value(outy) + ')';
        }
      }

      ltoke = value(ltoke);

    } else {

      ltype = 'item';
    }

    if (nopush === false) {
      push(NIL);
    } else {
      nopush = false;
    }

  };

  /**
   * Some tokens receive a generic type named 'item' because their type is unknown,
   * until we know the following syntax.  This function replaces the type 'item'
   * with something more specific.
   */
  function item (type: string) {

    /**
     * Current character in sequence
     */
    let aa = parse.count;

    /**
     * Previous character in sequence
     */
    let bb = 0;

    /**
     * First character
     */
    let first = NIL;

    const comsa = [];

    /* -------------------------------------------- */
    /* FUNCTIONS                                    */
    /* -------------------------------------------- */

    function priors () {

      if (parse.count < 0) return;

      // backtrack through immediately prior comments to find the correct token
      if (aa > 0 && (data.types[aa] === 'comment' || data.types[aa] === 'ignore')) {

        do {
          aa = aa - 1;
          comsa.push(data.token[aa]);
        } while (aa > 0 && data.lexer[aa] === 'style' && (
          data.types[aa] === 'comment' ||
          data.types[aa] === 'ignore'
        ));

      }

      bb = aa - 1;

      if (bb > 0 && (data.types[bb] === 'comment' || data.types[bb] === 'ignore')) {

        do bb = bb - 1;
        while (bb > 0 && data.lexer[aa] === 'style' && (
          data.types[bb] === 'comment' ||
          data.types[bb] === 'ignore'
        ));

      }

      if (bb < 0) bb = 0;
      if (aa < 0) aa = 0;

      first = data.token[aa][0];

    };

    function normalize (input: string) {

      return input
        .replace(/\s*&/, ' &')
        .replace(/\s*&\s*{/, ' & {')
        .replace(/\s*>\s*/g, ' > ')
        .replace(/\s*\+\s*/g, ' + ');

    }

    /**
     * CSS Selectors
     *
     * Process the selector tokens and apply the various
     * corrections. Pushes formatter token sequences in the
     * data structure, everything else is handled by beautifier.
     */
    function selector (index: number) {

      let ss = index;

      const dd = data.begin[ss];

      data.token[index] = data.token[index]
        .replace(/\s*&/, ' &')
        .replace(/\s*&\s*{/, ' & {')
        .replace(/\s*>\s*/g, ' > ')
        .replace(/\s*\+\s*/g, ' + ') // HOT PATCH - Included + for SCSS
        .replace(/:\s+/g, ': ')
        .replace(/^\s+/, NIL)
        .replace(/\s+$/, NIL)
        .replace(/\s+::\s+/, '::');

      if (not(data.token[ss], cc.COM) && data.types[ss] !== 'comment') {

        data.types[ss] = 'selector';

      }

      if (
        is(data.token[ss - 1], cc.COM) ||
        is(data.token[ss - 1], cc.COL) ||
        data.types[ss - 1] === 'comment' ||
        data.types[ss - 1] === 'pseudo'
      ) {

        if (data.types[ss - 1] === 'colon' && (
          data.types[ss] === 'selector' ||
          data.types[ss] === 'at_rule'
        ) && (
          data.types[ss - 2] === 'template' ||
          data.types[ss - 2] === 'template_start' ||
          data.types[ss - 2] === 'template_else' ||
          data.types[ss - 2] === 'template_end'
        )) {

          data.token[ss - 1] = ':' + data.token[ss] + WSP;
          data.types[ss - 1] = 'selector';
          parse.splice({
            data,
            howmany: 1,
            index: ss
          });

        } else if (data.types[ss - 1] === 'pseudo') {

          data.token[ss - 1] = `${data.token[ss - 1]}${data.token[ss]}`;
          data.types[ss - 1] = 'selector';
          parse.splice({
            data,
            howmany: 1,
            index: ss
          });

        } else if (data.types[ss - 2] === 'comment') {

          data.token[ss - 1] = normalize(`${data.token[ss - 1]}${data.token[ss]}`);
          data.types[ss - 1] = 'selector';
          parse.splice({
            data,
            howmany: 1,
            index: ss
          });

        } else {

          do {

            ss = ss - 1;

            if (data.begin[ss] === dd) {

              if (is(data.token[ss], cc.SEM)) break;

              if (not(data.token[ss], cc.COM) && data.types[ss] !== 'comment') {

                data.types[ss] = 'selector';

              }

              if (data.token[ss] === ':' && not(data.token[ss - 1], cc.SEM)) {

                data.token[ss - 1] = normalize(`${data.token[ss - 1]}:${data.token[ss + 1]}`);

                parse.splice({
                  data,
                  howmany: 2,
                  index: ss
                });

              }
            } else {

              break;

            }

          } while (ss > 0);

        }
      }

      // sorts comma separated lists of selectors
      ss = parse.count;

      if (rules.sortSelectors === true && is(data.token[ss - 1], cc.COM)) {

        const store = [ data.token[ss] ];

        do {

          ss = ss - 1;

          if (data.types[ss] === 'comment' || data.types[ss] === 'ignore') {
            do ss = ss - 1;
            while (ss > 0 && (data.types[ss] === 'comment' || data.types[ss] === 'ignore'));
          }

          if (is(data.token[ss], cc.COM)) ss = ss - 1;

          store.push(data.token[ss]);

        } while (ss > 0 && (is(data.token[ss - 1], cc.COM) ||
          data.types[ss - 1] === 'selector' ||
          data.types[ss - 1] === 'comment' ||
          data.types[ss - 1] === 'ignore'
        ));

        store.sort();
        ss = parse.count;
        data.token[ss] = store.pop();

        do {

          ss = ss - 1;

          if (data.types[ss] === 'comment' || data.types[ss] === 'ignore') {
            do ss = ss - 1;
            while (ss > 0 && (data.types[ss] === 'comment' || data.types[ss] === 'ignore'));
          }

          if (is(data.token[ss], cc.COM)) ss = ss - 1;

          data.token[ss] = store.pop();

        } while (ss > 0 && (is(data.token[ss - 1], cc.COM) ||
          data.types[ss - 1] === 'selector' ||
          data.types[ss - 1] === 'comment' ||
          data.types[ss - 1] === 'ignore'
        ));
      }

      aa = parse.count;

      // if (is(data.token[aa], cc.ATT)) {

      //   console.log(data.stack[aa]);

      //   data.stack[aa] = grammar.atrules(data.token[aa]);
      //   parse.structure[parse.structure.length - 1][0] = data.stack[aa];

      // }

      priors();

    };

    priors();

    // if the last non-comment type is 'item' then id it
    if (type === 'start' && (data.types[aa] === 'value' || data.types[aa] === 'variable')) {

      data.types[aa] = 'item';

    }

    if (data.lexer[parse.count - 1] !== 'style' || bb < 0) {

      if (type === 'colon') {

        if (is(first, cc.DOL) || is(first, cc.ATT)) {

          data.types[aa] = 'variable';

        } else if (data.stack[aa] !== 'global' && (data.types[aa] !== 'comment' || data.types[aa] !== 'ignore')) {

          data.types[aa] = 'property';

        }

      } else if (data.lexer[aa] === 'style') {
        data.types[aa] = 'selector';
        selector(aa);
      }

    } else if (type === 'start' && data.types[aa] === 'function' && data.lexer[aa] === 'style') {

      data.types[aa] = 'selector';

      selector(aa);

    } else if (data.types[aa] === 'item' && data.lexer[aa] === 'style') {

      if (type === 'start') {

        selector(aa);

        data.types[aa] = 'selector';

        if (data.token[aa] === ':') data.types[bb] = 'selector';

        if (data.token[aa].indexOf('=\u201c') > 0) {
          parse.error = `Invalid Quote (\u201c, \\201c) used on line number ${parse.lineNumber}`;
        } else if (data.token[aa].indexOf('=\u201d') > 0) {
          parse.error = `Invalid Quote (\u201d, \\201d) used on line number ${parse.lineNumber}`;
        }

      } else if (type === 'end') {

        if (is(first, cc.DOL) || is(first, cc.ATT)) {

          data.types[aa] = 'variable';
        } else {
          data.types[aa] = 'value';
        }

        data.token[aa] = value(data.token[aa]);

      } else if (type === 'separator') {

        if (data.types[bb] === 'colon' || is(data.token[bb], cc.COM) || is(data.token[bb], cc.LCB)) {

          if (not(b[a], cc.SEM) && (
            data.types[bb] === 'selector' ||
            data.types[bb] === 'at_rule' ||
            is(data.token[bb], cc.LCB)
          )) {

            data.types[aa] = 'selector';
            selector(aa);

          } else if (is(data.token[aa], cc.DOL) || is(data.token[aa], cc.ATT)) {

            data.types[aa] = 'variable';

          } else {

            data.types[aa] = 'value';

          }

          data.token[aa] = value(data.token[aa]);

          if (data.token[aa].charAt(0) === '\u201c') {

            parse.error = `Invalid Quote (\u201c, \\201c) used on line number ${parse.lineNumber}`;

          } else if (data.token[aa].charAt(0) === '\u201d') {

            parse.error = `Invalid (\u201d, \\201d) used on line number ${parse.lineNumber}`;

          }

        } else {

          if (is(first, cc.DOL) || is(first, cc.ATT)) {

            // @import
            // console.log(data.token[aa]);

            data.types[aa] = 'variable';

          } else if (data.types[bb] === 'value' || data.types[bb] === 'variable') {

            data.token[bb] = data.token[bb] + data.token[aa];
            parse.pop(data);

          } else {
            data.types[aa] = 'value';
          }
        }

      } else if (type === 'colon') {

        if (is(first, cc.DOL) || is(first, cc.ATT)) {
          data.types[aa] = 'variable';
        } else {
          data.types[aa] = 'property';
        }

      } else if (is(data.token[bb], cc.ATT) && (
        (
          data.types[bb - 2] !== 'variable' &&
          data.types[bb - 2] !== 'property'
        ) || data.types[bb - 1] === 'separator'
      )) {

        data.types[bb] = 'variable';
        ltype = 'variable';
        data.token[bb] = value(data.token[bb]);

      } else if (type === 'comment') {

        // if comment is nested above a selector.
        // this ensure that "item" type is not applied
        // to the data structure
        //
        if (is(first, cc.DOT) || is(first, cc.HSH)) {

          data.types[aa] = 'selector';

        }

      }

    }
  };

  /**
   * Original: lexer_style_separatorComment
   */
  function semiComment () {

    let x = parse.count;

    do x = x - 1;
    while (x > 0 && (data.types[x] === 'comment'));

    // console.log(data.token[x]);

    if (data.token[x] === ';') return;

    parse.splice({
      data,
      howmany: 0,
      index: x + 1,
      record: {
        begin: parse.structure[parse.structure.length - 1][1],
        ender: -1,
        lexer: 'style',
        lines: parse.linesSpace,
        stack: parse.structure[parse.structure.length - 1][0],
        token: ';',
        types: 'separator'
      }
    });

  };

  function template (open: string, end: string) {

    const store = [];

    /* -------------------------------------------- */
    /* LEXICAL SCOPES                               */
    /* -------------------------------------------- */

    let quote = NIL;
    let name = NIL;
    let endlen = 0;
    let start = open.length;

    function exit (typeName: Types) {

      const endtype = parse.count > 0
        ? data.types[parse.count - 1]
        : data.types[parse.count];

      if (ltype === 'item') {

        if (endtype === 'colon') {
          data.types[parse.count] = 'value';
        } else {
          item(endtype);
        }
      }

      if (is(b[a + 1], cc.WSP)) {

        data.lines[parse.count] = 1;

      }

      ltype = typeName;

      if (ltype.indexOf('start') > -1 || ltype.indexOf('else') > -1) {
        push(ltoke);
      } else {
        push(NIL);
      }

    };

    nosort[nosort.length - 1] = true;

    if (a < c) {

      do {

        store.push(b[a]);

        if (quote === NIL) {

          if (is(b[a], cc.DQO)) {

            quote = '"';

          } else if (is(b[a], cc.SQO)) {

            quote = "'";

          } else if (is(b[a], cc.FWS)) {

            if (is(b[a + 1], cc.FWS)) {
              quote = '/';
            } else if (is(b[a + 1], cc.ARS)) {
              quote = '*';
            }

          } else if (b[a + 1] === end.charAt(0)) {

            do {

              endlen = endlen + 1;
              a = a + 1;
              store.push(b[a]);

            } while (a < c && endlen < end.length && b[a + 1] === end.charAt(endlen));

            if (endlen === end.length) {

              quote = store.join(NIL);

              if (ws(quote.charAt(start))) {
                do { start = start + 1; } while (ws(quote.charAt(start)));
              }

              endlen = start;

              do {
                endlen = endlen + 1;
              } while (endlen < end.length && !ws(quote.charAt(endlen)));

              if (endlen === quote.length) endlen = endlen - end.length;

              if (open === '{%') {

                if (is(quote[2], cc.DSH)) {

                  quote = quote.replace(/^{%-\s*/, '{%- ');
                  quote = quote.endsWith('-%}')
                    ? quote.replace(/\s*-%}$/, ' -%}')
                    : quote.replace(/\s*%}$/, ' %}');

                  name = quote.slice(4);

                } else {

                  quote = quote.replace(/^{%\s*/, '{% ');
                  quote = quote.endsWith('-%}')
                    ? quote.replace(/\s*-%}$/, ' -%}')
                    : quote.replace(/\s*%}$/, ' %}');
                  name = quote.slice(3);
                }

              }

              // HOTFIX
              // Prevent whitespace removals of output tag values
              if (open === '{{') {

                if (is(quote[2], cc.DSH)) {

                  quote = quote.replace(/^{{-\s*/, '{{- ');
                  quote = quote.endsWith('-}}')
                    ? quote.replace(/\s*-}}$/, ' -}}')
                    : quote.replace(/\s*}}$/, ' }}');

                } else {

                  quote = quote.replace(/^{{\s*/, '{{ ');
                  quote = quote.endsWith('-}}')
                    ? quote.replace(/\s*-}}$/, ' -}}')
                    : quote.replace(/\s*%}}$/, ' }}');

                }

              }

              if (ltype === 'item' && data.types[parse.count - 1] === 'colon' && (
                data.types[parse.count - 2] === 'property' ||
                data.types[parse.count - 2] === 'variable'
              )) {

                ltype = 'value';
                data.types[parse.count] = 'value';

                if (
                  Number.isNaN(Number(data.token[parse.count])) === true &&
                  data.token[parse.count].charAt(data.token[parse.count].length - 1) !== ')'
                ) {
                  data.token[parse.count] = data.token[parse.count] + quote;
                } else {
                  data.token[parse.count] = data.token[parse.count] + WSP + quote;
                }

                return;
              }

              ltoke = quote;

              if (open === '{%') {

                const templateNames = Array.from(grammar.liquid.tags);

                let namesLen = templateNames.length - 1;

                name = name.slice(0, name.indexOf(WSP));

                if (name.indexOf('(') > 0) {
                  name = name.slice(0, name.indexOf('('));
                }

                if (grammar.liquid.else.has(name)) {
                  exit('template_else');
                  return;
                }

                namesLen = templateNames.length - 1;

                if (namesLen > -1) {
                  do {

                    if (name === templateNames[namesLen]) {
                      exit('template_start');
                      return;
                    }

                    if (name === 'end' + templateNames[namesLen]) {
                      exit('template_end');
                      return;
                    }

                    namesLen = namesLen - 1;

                  } while (namesLen > -1);
                }

              } else if (open === '{{') {

                let group = quote.slice(2);
                const ending = group.length;
                let begin = 0;

                do {
                  begin = begin + 1;
                } while (
                  begin < ending &&
                  ws(group.charAt(begin)) === false &&
                  group.charCodeAt(start) !== cc.LPR
                );

                group = group.slice(0, begin);

                if (is(group[group.length - 2], cc.RCB)) group = group.slice(0, group.length - 2);

                if (group === 'end') {
                  exit('template_end');
                  return;
                }

              }

              exit('template');

              return;
            }

            endlen = 0;
          }
        } else if (quote === b[a]) {

          if (is(quote, cc.DQO) || is(quote, cc.SQO)) {
            quote = NIL;
          } else if (is(quote, cc.FWS) && (b[a] === '\r' || is(b[a], cc.NWL))) {
            quote = NIL;
          } else if (is(quote, cc.ARS) && is(b[a + 1], cc.FWS)) {
            quote = NIL;
          }
        }

        a = a + 1;

      } while (a < c);
    }
  };

  /**
   * Accepts a _boolean_ parameter value to infer whether or not
   * we have encountered a JS looking '//' commment.
   */
  function comment (isLineComment: boolean) {

    let comm: [string, number];

    if (isLineComment) {

      comm = wrapCommentLine({
        chars: b,
        start: a,
        end: c,
        lexer: 'style',
        begin: '//',
        ender: '\n'
      });

      ltoke = comm[0];
      ltype = ((/^(\/\/\s*@prettify-ignore-start)/).test(ltoke)) ? 'ignore' : 'comment';

    } else {

      comm = wrapCommentBlock({
        chars: b,
        start: a,
        end: c,
        lexer: 'style',
        begin: '/*',
        ender: '\u002a/'
      });

      ltoke = comm[0];
      ltype = ((/^(\/\*\s*@prettify-ignore-start)/).test(ltoke)) ? 'ignore' : 'comment';

    }

    push(NIL);

    a = comm[1];

  };

  /**
   * Consolidate margin and padding values
   */
  function marginPadding () {

    const lines = parse.linesSpace;
    const props: {
      data: {
        margin?: [
          top?: string,
          right?: string,
          bottom?: string,
          left?: string,
          semi?: boolean
        ];
        padding?: [
          top?: string,
          right?: string,
          bottom?: string,
          left?: string,
          semi?: boolean
        ]
      },
      last?: {
        margin?: number;
        padding?: number;
      }
      removes?: any[]
    } = {
      data: {
        margin: [
          NIL,
          NIL,
          NIL,
          NIL,
          false
        ],
        padding: [
          NIL,
          NIL,
          NIL,
          NIL,
          false
        ]
      },
      last: {
        margin: 0,
        padding: 0
      },
      removes: []
    };

    const begin = parse.structure[parse.structure.length - 1][1];

    function populate (prop: string) {

      if (data.token[aa - 2] === prop) {

        const values = data.token[aa].replace(/\s*!important\s*/g, NIL).split(WSP);
        const vlen = values.length;

        if (data.token[aa].indexOf('!important') > -1) props.data[prop[4]] = true;

        if (vlen > 3) {

          if (props.data[prop][0] === NIL) props.data[prop][0] = values[0];
          if (props.data[prop][1] === NIL) props.data[prop][1] = values[1];
          if (props.data[prop][2] === NIL) props.data[prop][2] = values[2];
          if (props.data[prop][3] === NIL) props.data[prop][3] = values[3];

        } else if (vlen > 2) {

          if (props.data[prop][0] === NIL) props.data[prop][0] = values[0];
          if (props.data[prop][1] === NIL) props.data[prop][1] = values[1];
          if (props.data[prop][2] === NIL) props.data[prop][2] = values[2];
          if (props.data[prop][3] === NIL) props.data[prop][3] = values[1];

        } else if (vlen > 1) {

          if (props.data[prop][0] === NIL) props.data[prop][0] = values[0];
          if (props.data[prop][1] === NIL) props.data[prop][1] = values[1];
          if (props.data[prop][2] === NIL) props.data[prop][2] = values[0];
          if (props.data[prop][3] === NIL) props.data[prop][3] = values[1];

        } else {

          if (props.data[prop][0] === NIL) props.data[prop][0] = values[0];
          if (props.data[prop][1] === NIL) props.data[prop][1] = values[0];
          if (props.data[prop][2] === NIL) props.data[prop][2] = values[0];
          if (props.data[prop][3] === NIL) props.data[prop][3] = values[0];
        }

      } else if (data.token[aa - 2] === `${prop}-bottom`) {
        if (props.data[prop][2] === NIL) props.data[prop][2] = data.token[aa];
      } else if (data.token[aa - 2] === `${prop}-left`) {
        if (props.data[prop][3] === NIL) props.data[prop][3] = data.token[aa];
      } else if (data.token[aa - 2] === `${prop}-right`) {
        if (props.data[prop][1] === NIL) props.data[prop][1] = data.token[aa];
      } else if (data.token[aa - 2] === `${prop}-top`) {
        if (props.data[prop][0] === NIL) props.data[prop][0] = data.token[aa];
      } else {
        return;
      }

      props.removes.push([ aa, prop ]);
      props.last[prop] = aa;

    };

    /**
     * Original: lexer_style_marginPadding_
     */
    function removes () {

      let ii = 0;
      let values = NIL;

      const zero = /^(0+([a-z]+|%))/;
      const bb = props.removes.length;
      const tmargin = (
        props.data.margin[0] !== NIL &&
        props.data.margin[1] !== NIL &&
        props.data.margin[2] !== NIL &&
        props.data.margin[3] !== NIL
      );

      const tpadding = (
        props.data.padding[0] !== NIL &&
        props.data.padding[1] !== NIL &&
        props.data.padding[2] !== NIL &&
        props.data.padding[3] !== NIL
      );

      /**
       * Original: lexer_style_marginPadding_removes_applyValues
       */
      function applyValues (prop: string) {

        if (zero.test(props.data[prop][0]) === true) props.data[prop][0] = '0';
        if (zero.test(props.data[prop][1]) === true) props.data[prop][1] = '0';
        if (zero.test(props.data[prop][2]) === true) props.data[prop][2] = '0';
        if (zero.test(props.data[prop][3]) === true) props.data[prop][3] = '0';

        if (
          props.data[prop][0] === props.data[prop][1] &&
          props.data[prop][0] === props.data[prop][2] &&
          props.data[prop][0] === props.data[prop][3]
        ) {

          values = props.data[prop][0];

        } else if (
          props.data[prop][0] === props.data[prop][2] &&
          props.data[prop][1] === props.data[prop][3] &&
          props.data[prop][0] !== props.data[prop][1]
        ) {

          values = `${props.data[prop][0]} ${props.data[prop][1]}`;

        } else if (
          props.data[prop][1] === props.data[prop][3] &&
          props.data[prop][0] !== props.data[prop][2]
        ) {

          values = `${props.data[prop][0]} ${props.data[prop][1]} ${props.data[prop][2]}`;

        } else {

          values = `${props.data[prop][0]} ${props.data[prop][1]} ${props.data[prop][2]} ${props.data[prop][3]}`;
        }

        if (props.data[prop[4]] === true) values = `${values.replace(' !important', NIL)} !important`;

        if (props.last[prop] > parse.count) {
          ii = (begin < 1) ? 1 : begin + 1;
          do {
            if (
              data.begin[ii] === begin &&
                data.types[ii] === 'value' &&
                data.token[ii - 2].indexOf(prop) === 0
            ) {
              props.last[prop] = ii;
              break;
            }
            ii = ii + 1;
          } while (ii < parse.count);
        }

        data.token[props.last[prop]] = values;
        data.token[props.last[prop] - 2] = prop;

      };

      if (bb > 1 && (tmargin === true || tpadding === true)) {
        do {
          if (
            props.removes[ii][0] !== props.last.margin &&
            props.removes[ii][0] !== props.last.padding && ((
              tmargin === true &&
              props.removes[ii][1] === 'margin'
            ) || (
              tpadding === true &&
              props.removes[ii][1] === 'padding'
            ))
          ) {

            parse.splice({
              data,
              howmany: (data.types[props.removes[ii][0] + 1] === 'separator') ? 4 : 3,
              index: props.removes[ii][0] - 2
            });
          }

          ii = ii + 1;
        } while (ii < bb - 1);
      }

      if (tmargin === true) applyValues('margin');
      if (tpadding === true) applyValues('padding');

      // this is necessary to fix the "begin" values of descendent blocks
      if (endtest === true) {
        if (begin < 0) {
          parse.error = 'Brace mismatch. There appears to be more closing braces than starting braces.';
        } else {
          parse.sortCorrect(begin, parse.count + 1);
        }
      }
    };

    let aa = parse.count;
    let endtest = false;

    do {
      aa = aa - 1;
      if (data.begin[aa] === begin) {
        if (data.types[aa] === 'value' && data.types[aa - 2] === 'property') {

          if (data.token[aa - 2].indexOf('margin') === 0) {
            populate('margin');
          } else if (data.token[aa - 2].indexOf('padding') === 0) {
            populate('padding');
          }
        }

      } else {
        endtest = true;
        aa = data.begin[aa];
      }
    } while (aa > begin);

    removes();
    parse.linesSpace = lines;
  };

  /**
   * Parse Space
   *
   * This function is responsible for parsing whitespace
   * characters and newlines. The lexical `a` scope is incremented
   * and both `parse.lineNumber` and `parse.linesSpace` are
   * updated accordinly.
   */
  function parseSpace (): void {

    parse.linesSpace = 1;

    do {

      if (is(b[a], cc.NWL)) {
        parse.lineStart = a;
        parse.linesSpace = parse.linesSpace + 1;
        parse.lineNumber = parse.lineNumber + 1;
      }

      if (ws(b[a + 1]) === false) break;

      a = a + 1;

    } while (a < c);

  }

  /* -------------------------------------------- */
  /* TOKEN BUILD                                  */
  /* -------------------------------------------- */

  do {

    if (ws(b[a])) {

      parseSpace();

    } else if (is(b[a], cc.FWS) && is(b[a + 1], cc.ARS)) {

      comment(false);

    } else if (is(b[a], cc.FWS) && is(b[a + 1], cc.FWS)) {

      comment(true);

    } else if (is(b[a], cc.LCB) && is(b[a + 1], cc.PER)) {

      // Liquid
      template('{%', '%}');

    } else if (is(b[a], cc.LCB) && is(b[a + 1], cc.LCB)) {

      // Liquid
      template('{{', '}}');

    } else if ((
      is(b[a], cc.LCB)
    ) || (
      is(b[a], cc.LPR) &&
      is(data.token[parse.count], cc.COL) &&
      data.types[parse.count - 1] === 'variable'
    )) {

      item('start');
      ltype = 'start';
      ltoke = b[a];

      if (is(b[a], cc.LPR)) {

        push('map');
        mapper.push(0);

      } else if (
        data.types[parse.count] === 'at_rule' ||
        data.types[parse.count] === 'selector' ||
        data.types[parse.count] === 'variable'
      ) {

        if (is(data.token[parse.count], cc.ATT)) {

          data.types[parse.count] = 'at_rule';

          push(grammar.atrules(data.token[parse.count]));

        } else {

          push(data.token[parse.count]);

        }

      } else if (data.types[parse.count] === 'colon') {
        push(data.token[parse.count - 1]);
      } else {
        push('block');
      }

      nosort.push(false);

    } else if (
      is(b[a], cc.RCB) || (
        b[a] === ')' &&
        parse.structure[parse.structure.length - 1][0] === 'map' &&
        mapper[mapper.length - 1] === 0
      )
    ) {

      if (
        is(b[a], cc.RCB) &&
        is(data.token[parse.count - 1], cc.LCB) &&
        data.types[parse.count] === 'item' &&
        data.token[parse.count - 2] !== undefined &&
        data.token[parse.count - 2].charCodeAt(data.token[parse.count - 2].length - 1) === cc.ATT
      ) {

        data.token[parse.count - 2] = data.token[parse.count - 2] + '{' + data.token[parse.count] + '}';

        parse.pop(data);
        parse.pop(data);
        parse.structure.pop();

      } else {

        if (is(b[a], cc.RPR)) mapper.pop();

        item('end');

        if (is(b[a], cc.RCB) && not(data.token[parse.count], cc.SEM)) {

          if (data.types[parse.count] === 'value' || data.types[parse.count] === 'function' || (
            data.types[parse.count] === 'variable' && (
              is(data.token[parse.count - 1], cc.COL) ||
              is(data.token[parse.count - 1], cc.SEM)
            )
          )) {

            if (rules.correct === true) {
              ltoke = ';';
            } else {
              ltoke = 'x;';
            }

            ltype = 'separator';
            push(NIL);

          } else if (data.types[parse.count] === 'comment') {

            semiComment();

          }
        }

        nosort.pop();

        ltoke = b[a];
        ltype = 'end';

        if (is(b[a], cc.RCB)) marginPadding();
        if (rules.sortProperties === true && is(b[a], cc.RCB)) parse.sortObject(data);

        push(NIL);

      }

    } else if (is(b[a], cc.SEM) || is(b[a], cc.COM)) {

      if ((data.types[parse.count - 1] === 'selector' || data.types[parse.count - 1] === 'at_rule') || (
        data.types[parse.count] !== 'function' &&
        is(data.token[parse.count - 1], cc.RCB)
      )) {

        item('start');

      } else {

        item('separator');
      }

      if (data.types[parse.count] !== 'separator' && esctest(a) === true) {
        ltoke = b[a];
        ltype = 'separator';
        push(NIL);
      }

    } else if (parse.count > -1 && is(b[a], cc.COL) && data.types[parse.count] !== 'end') {

      item('colon');
      ltoke = ':';
      ltype = 'colon';
      push(NIL);

    } else {

      if (parse.structure[parse.structure.length - 1][0] === 'map' && is(b[a], cc.LPR)) {
        mapper[mapper.length - 1] = mapper[mapper.length - 1] + 1;
      }

      buildToken();
    }

    a = a + 1;

  } while (a < c);

  if (rules.sortProperties === true) parse.sortObject(data);

  // console.log(data);
  return data;
};
