import type { Record, Data, Types, Counter, LanguageProperName } from 'types/prettify';
import { prettify } from '@prettify/model';
import { grammar } from '@options/grammar';
import { parse } from '@parser/parse';
import { wrapCommentBlock, wrapCommentLine } from '@comments/parse';
import { cc, NIL, NWL, WSP } from '@utils/chars';
import {
  is,
  not,
  ws,
  isLiquid,
  isLiquidEnd,
  isLiquidStart,
  getTagName,
  isLiquidControl,
  isLiquidElse,
  isLiquidLine,
  isValueLiquid
} from '@utils/helpers';

import {
  SpaceLead,
  SpaceEnd,
  SpaceOnly,
  CommIgnoreNext
} from '@utils/regex';

/* -------------------------------------------- */
/* LEXER                                        */
/* -------------------------------------------- */

/**
 * Markup Lexer
 *
 * Used to parse markup languages. This used to be used for multiple
 * template languages in options but has been refactored to solely
 * focus and support the following language only:
 *
 * - HTML
 * - XML
 * - JSX
 * - SGML
 * - Liquid.
 */
prettify.lexers.markup = function lexer (source: string) {

  /* -------------------------------------------- */
  /* CONSTANTS                                    */
  /* -------------------------------------------- */

  /**
   * Prettify Options
   */
  const { options, options: { liquid } } = prettify;

  /**
   * Parse data reference
   */
  const { data } = parse;

  /**
   * Whether or not language mode is TSX / JSX
   */
  const jsx = options.language === 'jsx' || options.language === 'tsx';

  /**
   * Whether or not language mode is HTML or Liquid
   */
  const markup = options.language === 'html' || options.language === 'liquid';

  /**
   * Cached option markup beautification rules
   */
  const rules = options.markup;

  /**
   * Ignored Liquid Tags
   */
  const igl = new Set(liquid.ignoreTagList);

  /**
   * Attribute sorting list length
   */
  const asl = rules.attributeSortList.length;

  /**
   * Count reference to be assigned to the generated tree.
   */
  const count: Counter = { end: 0, start: 0, line: 1, index: -1 };

  /**
   * The document source as an array list
   */
  const b = source.split(NIL);

  /**
   * The length of the document source, ie: number of characters
   */
  const c = b.length;

  /* -------------------------------------------- */
  /* LEXICAL SCOPES                               */
  /* -------------------------------------------- */

  /**
   * Advancement reference
   */
  let a: number = 0;

  /**
   * embed Tag, eg: <scrip> or {% schema %} etc
   */
  let embed: boolean = false;

  /**
   * embed Tags embedded language
   */
  let language: LanguageProperName;

  /**
   * HTML String
   */
  let html = markup ? options.language : 'html';

  /**
   * Stack nesting reference for Liquid tokens, increments by 1
   * for each opener and decrements for each ender.
   */
  let within: number = 0;

  /* -------------------------------------------- */
  /* FUNCTIONS                                    */
  /* -------------------------------------------- */

  /**
   * Normalize
   *
   * Pads template tag delimters with a space. This function
   * was updated to also support whitespace dashes:
   *
   * - `{{` or `{{-`
   * - `{%` or`{%-`
   * - `}}` or `-}}`
   * - `%}`or `-%}`
   */
  function normalize (input: string) {

    if (!(markup === true && jsx === false)) return input;
    if (/(?:{[=#/]|%[>\]])|\}%[>\]]/.test(input)) return input;
    if (!isLiquid(input, 3)) return input;

    const end = input.length - 3;

    if (liquid.delimiterTrims === 'force') {

      if (is(input[1], cc.PER)) {

        if (not(input[2], cc.DSH)) input = input.replace(/^{%/, '{%-');
        if (not(input[end], cc.DSH)) input = input.replace(/%}$/, '-%}');

      } else {

        if (not(input[2], cc.DSH)) input = input.replace(/^{{/, '{{-');
        if (not(input[end], cc.DSH)) input = input.replace(/}}$/, '-}}');

      }
    } else if (liquid.delimiterTrims === 'strip') {

      input = input
        .replace(/^{%-/, '{%')
        .replace(/-%}$/, '%}')
        .replace(/^{{-/, '{{')
        .replace(/-}}$/, '}}');

    } else if (liquid.delimiterTrims === 'tags' && is(input[1], cc.PER)) {

      if (not(input[2], cc.DSH)) input = input.replace(/^{%/, '{%-');
      if (not(input[end], cc.DSH)) input = input.replace(/%}$/, '-%}');

    } else if (liquid.delimiterTrims === 'outputs' && is(input[1], cc.LCB)) {

      if (not(input[2], cc.DSH)) input = input.replace(/^{{/, '{{-');
      if (not(input[end], cc.DSH)) input = input.replace(/}}$/, '-}}');
    }

    // ensure normalize spacing is enabld
    if (liquid.normalizeSpacing === false) return input;

    // skip line comments
    if (/^{%-?\s*#/.test(input) || /^{%-?\s*comment/.test(input)) return input;

    // skip liquid tag
    if (/{%-?\s*(?:liquid)/.test(input)) return input;

    /**
     * The starting quotation code character
     */
    let t: cc.DQO | cc.SQO;

    /**
     * Quotation Reference
     *
     * Tracks string quotes allowing them to be skipped.
     *
     * - `0` token is not a string
     * - `1` We have encountered a string, eg: {{ '^
     * - `2` We have closed the last known string, eg: {{ 'foo'^
     */
    let q: 0 | 1 | 2 = 0;

    return input.split(/(["']{1})/).map((char, idx, arr) => {

      const quotation = is(char[0], cc.DQO) || is(char[0], cc.SQO);

      if (q > 0 || (quotation && q === 0 && not(arr[idx - 1], cc.BWS)) || quotation) {

        if (q === 0) t = char.charCodeAt(0);

        // Move forward for nested quote type, eg: '"' or "'"
        if (q === 1 && not(arr[idx - 1], cc.BWS)) {
          if (t === char.charCodeAt(0)) q = 2;
          return char;
        }

        if (q !== 2) {
          q = q === 0 ? 1 : q === 1 ? is(arr[idx - 1], cc.BWS) ? 1 : 2 : 0;
          return char;
        }

        q = 0;

      }

      return char
        .replace(SpaceOnly, WSP)
        .replace(/^({[{%]-?)/, '$1 ')
        .replace(/([!=]=|[<>]=?)/g, ' $1 ')
        .replace(/ +(?=[|[\],:.])|(?<=[[.]) +/g, NIL)
        .replace(/(\||(?<=[^=!<>])(?:(?<=assign[^=]+)=(?=[^=!<>])|=$))/g, ' $1 ')
        .replace(/([:,]$|[:,](?=\S))/g, '$1 ')
        .replace(/(-?[%}]})$/, ' $1')
        .replace(SpaceOnly, WSP);

    }).join(NIL);

  };

  /**
   * Finds slash escape sequences
   */
  function esc (idx: number) {

    let x: number = idx;

    do x = x - 1; while (is(b[x], cc.BWS));

    x = idx - x;

    return x % 2 === 1;

  };

  /**
   * Push Record
   *
   * Pushes a record into the parse table populating the
   * data structure. All tokenized tags and content will
   * pass through this function.
   */
  function push (target: Data, record: Record, structure: Types) {

    if (target === data) {
      if (record.types.indexOf('end') > -1) {
        count.end = count.end + 1;
      } else if (record.types.indexOf('start') > -1) {
        count.start = count.start + 1;
      }
    }

    count.index = parse.count;
    count.line = parse.lineNumber;

    parse.push(target, record, structure);

  };

  /**
   * Peer Detection
   *
   * This function is used together with `fix()` and `correct()`.
   * The correct/fix feature needs refactoring, so this like the
   * the functions which leverage this will likely be overhauled.
   */
  function peers (n: string, i: string) {

    if (!grammar.html.tags.has(n)) return false;
    if (n === i) return true;
    if (n === 'dd' && i === 'dt') return true;
    if (n === 'dt' && i === 'dd') return true;
    if (n === 'td' && i === 'th') return true;
    if (n === 'th' && i === 'td') return true;
    if (n === 'colgroup' && (i === 'tbody' || i === 'tfoot' || i === 'thead' || i === 'tr')) return true;
    if (n === 'tbody' && (i === 'colgroup' || i === 'tfoot' || i === 'thead')) return true;
    if (n === 'tfoot' && (i === 'colgroup' || i === 'tbody' || i === 'thead')) return true;
    if (n === 'thead' && (i === 'colgroup' || i === 'tbody' || i === 'tfoot')) return true;
    if (n === 'tr' && i === 'colgroup') return true;

    return false;

  }

  /**
   * Parse Error Message
   *
   * Helper utility for composing the parse error message.
   * Generates a readable message for errors.
   */
  function error (message: string | string[]) {

    return `Parse Error (line ${parse.lineNumber}):\n${
      Array.isArray(message)
        ? message.join(NIL)
        : message
    }`;

  }

  /**
   * Fix Tags
   *
   * Utility function fixer for HTML missing end tags.
   * This is a little buggy and I'll likely remove or
   * refactor this in later versions, for now it suffices.
   */
  function fix (token: string, end: boolean) {

    /* -------------------------------------------- */
    /* CONSTANTS                                    */
    /* -------------------------------------------- */

    /**
     * The tag name
     */
    const tname = getTagName(token);

    /**
     * Parse record - This is generated as a drop-in as
     * this function is a fix utility that borders "linting"
     */
    const record = {
      begin: parse.scope.index,
      ender: -1,
      lexer: 'markup',
      lines: data.lines[parse.count] > 0 ? 1 : 0,
      stack: getTagName(parse.scope.token),
      token: `</${parse.scope.token}>`,
      types: 'end'
    };

    /* -------------------------------------------- */
    /* BEGIN                                        */
    /* -------------------------------------------- */

    push(data, record, NIL);

    if (grammar.html.tags.has(parse.scope.token) && (
      (end === true && parse.structure.length > 1) ||
      (end === false && `/${parse.scope.token}` !== tname)
    )) {

      do {

        record.begin = parse.scope.index;
        record.stack = getTagName(parse.scope.token);
        record.token = `</${parse.scope.token}>`;

        push(data, record, NIL);

      } while (
        grammar.html.tags.has(parse.scope.token) && ((
          end === true &&
          parse.structure.length > 1
        ) || (
          end === false &&
          `/${parse.scope.token}` !== tname
        ))
      );
    }

  };

  /* -------------------------------------------- */
  /* PARSE HANDLERS                               */
  /* -------------------------------------------- */

  /**
   * Parse Error
   *
   * This function is responsible cancelling the traversal and
   * returning a parse error when the lexing encounters an
   * error. The `parse.error` is assigned a string value that
   * informs about the issue.
   */
  function parseError () {

    parse.error = 'Prettify Error:\n\n' + parse.error;

  }

  /**
   * Parses tags, attrs, and template elements.
   * Markup is two smaller lexers that work together:
   *
   * 1. tag - evaluates markup (ie: HTML)
   * 2. template tags - (ie: Liquid)
   * 3. content - evaluates text content and code for embed lexers
   *
   * Type Definitions:
   *
   * ```none
   * START       END     TYPE
   *
   * ---         ---     frontmatter
   * <![CDATA[   ]]>     cdata
   * <!--        -->     comment
   * <!--[if     -->     conditional
   * text       text     content
   * <\/          >      end
   * <pre      </pre>    ignore (html only)
   * text       text     script
   * <!          >       sgml
   * <          />       singleton
   * <           >       start/end
   * text       text     style
   * {{          }}      template
   * {%          %}      template_start/template_end
   * <?xml       ?>      xml
   *
   * ```
   */
  function parseToken (end: string) {

    /* -------------------------------------------- */
    /* CONSTANTS                                    */
    /* -------------------------------------------- */

    const record: Record = {
      lexer: 'markup',
      lines: parse.linesSpace,
      stack: parse.scope.token !== 'global' ? getTagName(parse.scope.token) : 'global',
      begin: parse.scope.index,
      token: NIL,
      types: NIL,
      ender: -1
    };

    /* -------------------------------------------- */
    /* LOCAL SCOPES                                 */
    /* -------------------------------------------- */

    /**
     * The token string reference
     */
    let token: string = NIL;

    /**
     * The last known character of a token
     */
    let lchar: string = NIL;

    /**
     * Last Type, ie: `start`, `template` etc etc
     */
    let ltype: Types = NIL;

    /**
     * Tag Name, ie: `div`, `main` etc
     */
    let tname: string = NIL;

    /**
     * Starting delimeter token, ie: `{{` or `<` etc etc.
     */
    let start: string = NIL;

    /**
     * Whether or not to pass to cheat functions.
     */
    let cheat: boolean = false;

    /**
     * Whether or not to exit early from walk
     */
    let nowalk: boolean = false;

    /**
     * Ignored reference to skip lexing certain sources
     */
    let ignore: boolean = false;

    /**
     * Ignore count
     */
    let icount: number = 0;

    /**
     * Whether or not JavaScript comment exists
     */
    let jscomm: boolean = false;

    /**
     * Whether or not attribute sorting should be applied
     */
    let nosort: boolean = false;

    /**
     * Whether or not the contents of the token should be preserved
     */
    let preserve: boolean = false;

    /**
     * Infers a basic lex operation, typically used on easy tags, ie: <div>
     */
    let basic: boolean = false;

    /**
     * Attribute store reference. When chain is asserted (`index[2]`) then
     * the data type will be inferred to `template_attribute_chain` - This
     * is only used for template (liquid) attribute expressions.
     */
    let attrs: [ token: string, lines: number, chain?: boolean ][] = [];

    /**
     * Comment related reference
     */
    let comm = [ NIL, 0 ];

    /* -------------------------------------------- */
    /* FUNCTIONS                                    */
    /* -------------------------------------------- */

    /**
     * Attribute Name
     *
     * Returns the markup attribute name and its value reference. This is determined by
     * an `=` character and quotation character separator, the return type is an array,
     * where index `0` is attr name and index `1` is attribute value.
     *
     * > When a _void_ attribute exists an empty string is returned for index `1`.
     */
    function attrname (x: string): [string, string] {

      const eq = x.indexOf('=');

      if (eq > 0) {

        const dq = x.indexOf('"');
        if ((eq < dq && dq > 0)) return [ x.slice(0, eq), x.slice(eq + 1) ];

        const sq = x.indexOf("'");
        if ((eq < sq && sq > 0)) return [ x.slice(0, eq), x.slice(eq + 1) ];

      }

      return [ x, NIL ];

    };

    function insert (count: number) {

      record.lines = data.lines[parse.count] > 0 ? 1 : 0;
      record.token = `</${parse.scope.token}>`;
      record.types = 'end';

      push(data, record, NIL);

      if (count > 0) {
        do {
          record.begin = parse.scope.index;
          record.stack = getTagName(parse.scope.token);
          record.token = `</${parse.scope.token}>`;

          push(data, record, NIL);
          count = count - 1;
        } while (count > 0);
      }

      record.begin = parse.scope.index;
      record.lines = parse.linesSpace;
      record.stack = getTagName(parse.scope.token);
      record.token = token;
      record.types = 'end';

      data.lines[parse.count - 1] = 0;

    };

    function correct () {

      // determine if the current end tag is actually part of an HTML singleton
      if (ltype === 'end') {

        const lastToken = data.token[parse.count];

        if (data.types[parse.count - 1] === 'singleton' &&
          lastToken.charCodeAt(lastToken.length - 2) !== cc.FWS &&
          `/${getTagName(lastToken)}` === tname
        ) {

          data.types[parse.count - 1] = 'start';
        }
      }

      if (markup) {

        // HTML gets tag names in lowercase, if you want to
        // preserveLine case sensitivity beautify as XML
        if (
          is(token[0], cc.LAN) &&
          not(token[1], cc.BNG) &&
          not(token[1], cc.QWS) && (
            parse.count < 0 ||
            data.types[parse.count].indexOf('template') < 0
          )
        ) {

          token = token.toLowerCase();
        }

        // console.log(parse.scope.token);

        if (
          grammar.html.tags.has(parse.scope.token) &&
          peers(tname.slice(1), parse.structure[parse.structure.length - 2][0])
        ) {

          // Looks for HTML tags missing an ending pair when encountering
          // an ending tag for a parent node
          insert(0);

        } else if (
          parse.structure.length > 3 &&
          grammar.html.tags.has(parse.scope.token) &&
          grammar.html.tags.has(parse.structure[parse.structure.length - 2][0]) &&
          grammar.html.tags.has(parse.structure[parse.structure.length - 3][0]) &&
          peers(tname, parse.structure[parse.structure.length - 4][0])
        ) {

          // Looks for consecutive missing end tags
          insert(3);

        } else if (
          parse.structure.length > 2 &&
          grammar.html.tags.has(parse.scope.token) &&
          grammar.html.tags.has(parse.structure[parse.structure.length - 2][0]) &&
          peers(tname, parse.structure[parse.structure.length - 3][0])
        ) {

          // Looks for consecutive missing end tags
          insert(2);

        } else if (
          parse.structure.length > 1 &&
          grammar.html.tags.has(parse.scope.token) &&
          peers(tname, parse.structure[parse.structure.length - 2][0])
        ) {

          // Looks for consecutive missing end tags
          insert(1);

        } else if (peers(tname, parse.scope.token)) {

          // Certain tags cannot contain other certain tags if such tags are peers
          insert(0);

        } else if (
          is(tname[0], cc.FWS) &&
          grammar.html.tags.has(parse.scope.token) &&
          parse.scope.token !== tname.slice(1)
        ) {

          // Looks for consecutive missing end tags if the current token is an end tag
          fix(token, false);

          record.begin = parse.scope.index;
          record.lines = parse.linesSpace;
          record.stack = getTagName(parse.scope.token);
          record.token = token;
          record.types = 'end';

          data.lines[parse.count - 1] = 0;

        }

        // Inserts a trailing slash into singleton tags if they do not already have it
        if (jsx === false && grammar.html.voids.has(tname)) {
          if (rules.correct === true && /\/>$/.test(token) === false) {
            token = token.slice(0, token.length - 1) + ' />';
          }
          return true;
        }

      }

      return false;

    }

    /**
     * Parse CDATA
     *
     * Handling for <![CDATA[   ]]> markup (html) type comment expressions.
     * While rare this function correctly composes the data structures.
     *
     * @next attribute()
     */
    function cdata () {

      if (ltype !== 'cdata') return attribute();

      if (record.stack === 'script' || record.stack === 'style') {

        const stack = record.stack;

        let begin = parse.count;
        let ender = parse.count;

        if (data.types[ender] === 'attribute') {
          do {
            begin = begin - 1;
            ender = ender - 1;
          } while (data.types[ender] === 'attribute' && ender > -1);
        }

        record.begin = begin;
        record.token = '<![CDATA[';
        record.types = 'cdata_start';

        token = token.replace(/^(\s*<!\[cdata\[)/i, NIL).replace(/(\]{2}>\s*)$/, NIL);

        push(data, record, NIL);

        parse.structure.push([ 'cdata', parse.count ]);

        if (stack === 'script') {
          prettify.lexers.script(token);
        } else {
          prettify.lexers.style(token);
        }

        record.begin = parse.scope.index;
        record.token = ']]>';
        record.types = 'cdata_end';

        push(data, record, NIL);

        parse.structure.pop();
      }

      return attribute();

    }

    /**
     * Parse Template
     *
     * This will parse template identified tokens and
     * tags (Liquid). It aligns the the data `record` for identification.
     *
     * @next cdata()
     */
    function template () {

      /* -------------------------------------------- */
      /* LIQUID TOKEN                                 */
      /* -------------------------------------------- */

      if (record.types.indexOf('template') === -1) return cdata();

      if (is(token[0], cc.LCB) && is(token[1], cc.PER)) {

        if (grammar.liquid.else.has(tname)) {

          record.types = 'template_else';

        } else if (grammar.liquid.tags.has(tname)) {

          record.types = 'template_start';

        } else if (tname.startsWith('end')) {

          const name = tname.slice(3);

          if (grammar.liquid.tags.has(name)) {

            record.types = 'template_end';

          } else {

            // Unknown tag handling for situations where a custom endtag
            // name is used, we will look for a matching start tag name
            //
            record.stack = name;
            record.types = 'template_end';

            let i = 0;

            do {

              if (data.types[i] === 'template' && data.stack[i] === name) {
                data.types[i] = 'template_start';
                count.start = count.start + 1;
                break;
              }

              i = data.stack.indexOf(name, i + 1);

            } while (i > -1);

          }
        } else {

          record.stack = tname;

        }

      }

      if (liquid.quoteConvert === 'double') {
        record.token = record.token.replace(/'/g, '"');
      } else if (liquid.quoteConvert === 'single') {
        record.token = record.token.replace(/"/g, "'");
      }

      return cdata();

    }

    /**
     * Singular Types
     *
     * Utility function which will re-assign the `ltype` when HTML `void`
     * type tags. This only detects HTML tags, Liquid (template) types are
     * handled by the `template()` function.
     *
     * @next ignored()
     */
    function singular () {

      if (basic && ignore === false && ltype !== 'xml') {

        if (cheat === true || grammar.html.voids.has(tname) || (
          is(token[token.length - 2], cc.FWS) &&
          is(token[token.length - 1], cc.RAN)
        )) {
          ltype = 'singleton';
        } else {
          ltype = 'start';
        }

        record.types = ltype;
      }

      return ignored();

    }

    /**
     * Parse Ignores
     *
     * Additional logic required to find the end of a tag when it contains
     * a `data-prettify-ignore` attribute annotation. The function also
     * handles `@prettify-ignore-next` ignore comments placed above tag regions.
     *
     * @next liquid()
     */
    function ignored () {

      /**
       * The ender token name, used for Liquid tag ignores
       */
      let ender: string = NIL;

      if (CommIgnoreNext.test(data.token[parse.count])) {

        ignore = true;
        preserve = false;

        if (ltype.indexOf('template') > 0 && grammar.liquid.tags.has(tname)) {
          ender = `end${tname}`;
        } else if (grammar.html.voids.has(tname)) {
          ender = null;
        }

      } else if (grammar.html.voids.has(tname)) {

        ender = null;

      } else if (grammar.embed('liquid', tname) !== false && igl.has(tname) === true) {

        ender = null;

      }

      if (ender !== null && preserve === false && ignore === true && (
        end === '>' ||
        end === '%}' ||
        end === '}}'
      )) {

        /**
         * Lexed characters traversed in the ignored region
         */
        const tags: string[] = [];

        if (cheat === true) {

          ltype = 'singleton';

        } else {

          preserve = true;
          ltype = 'ignore';

          a = a + 1;

          if (a < c) {

            /* -------------------------------------------- */
            /* LOCAL SCOPES                                 */
            /* -------------------------------------------- */

            /**
             * The delimiter match
             */
            let delim = NIL;

            /**
             * The delimiter length used to validate endtag match
             */
            let ee = 0;

            /**
             * The iterator index for matching entag
             */
            let ff = 0;

            /**
             * Whether or not we've reached the endtag
             */
            let endtag: boolean = false;

            /* -------------------------------------------- */
            /* ITERATOR                                     */
            /* -------------------------------------------- */

            do {

              if (is(b[a], cc.NWL)) parse.lineNumber = parse.lineNumber + 1;

              tags.push(b[a]);

              if (delim === NIL) {

                delim = is(b[a], cc.DQO) ? '"' : is(b[a], cc.SQO) ? "'" : NIL;

                if (not(tags[0], cc.LCB) &&
                  is(b[a], cc.LCB) && (
                  is(b[a + 1], cc.LCB) ||
                  is(b[a + 1], cc.PER))) {

                  delim = b[a + 1] + '}';

                } else if (is(b[a], cc.LAN) && basic === true) {

                  endtag = is(b[a + 1], cc.FWS);

                } else if (b[a] === lchar && not(b[a - 1], cc.FWS)) {

                  if (endtag === true) {

                    icount = icount - 1;

                    if (icount < 0) break;

                  } else {
                    icount = icount + 1;
                  }
                }

              } else if (is(b[a], delim.charCodeAt(delim.length - 1))) {

                ff = 0;
                ee = delim.length - 1;

                if (is(delim[ee], cc.RCB)) {

                  if (b
                    .slice(a + (is(b[a + 2], cc.DSH) ? 3 : 2), b.indexOf('%', a + 2))
                    .join(NIL)
                    .trim()
                    .startsWith(ender)) break;

                } else if (ee > -1) {

                  do {

                    if (not(b[a - ff], delim.charCodeAt(ee))) break;

                    ff = ff + 1;
                    ee = ee - 1;

                  } while (ee > -1);

                }

                if (ee < 0) delim = NIL;
              }

              a = a + 1;

            } while (a < c);

          }
        }

        token = token + tags.join(NIL);
        token = token.replace('>', ` ${attrs.map(([ value ]) => value).join(WSP)}>`);
        attrs = [];

        record.token = token;
        record.types = 'content-ignore';

      }

      return template();

    }

    /**
     * Parse Externals
     *
     * Determines whether or not the token contains an external (embedded) region
     * like that of `<script>`, `<style>` and Liquid equivalents `{% schema %}` etc.
     * Some additional context is required before passing the contents of these tags
     * to different lexers. It's here where we establish that context.
     *
     * @next singular()
     */
    function external () {

      cheat = correct();

      if ((
        grammar.embed('html', tname) === false &&
        grammar.embed('liquid', tname) === false
      ) || (
        grammar.embed('liquid', tname) !== false &&
        igl.has(tname) === true
      )) {

        return singular();

      }

      let len = attrs.length - 1;
      let value = NIL;
      let name: [ name: string, value: string ];

      if (len > -1) {
        do {

          name = attrname(attrs[len][0]);

          if (name[0] === 'type') {
            value = name[1];
            if (is(value, cc.DQO) || is(value, cc.SQO)) value = value.slice(1, -1);
            break;
          }

          len = len - 1;
        } while (len > -1);
      }

      if (is(token, cc.RAN) && grammar.embed('html', tname)) {

        embed = true;

        if (value === NIL) {
          language = grammar.html.embed[tname].language;
        } else if (grammar.html.embed[tname].value(value)) {
          language = grammar.html.embed[tname].language;
        }

      } else if (isLiquidStart(token, true) && grammar.embed('liquid', tname)) {

        if (igl.has(tname)) {
          ignore = true;
          preserve = false;
          return ignored();
        }

        embed = true;
        language = grammar.liquid.embed[tname].language;

      }

      if (embed === true) {

        len = a + 1;

        if (len < c) {

          do {

            if (ws(b[len]) === false) {

              if (is(b[len], cc.LAN)) {

                if (b.slice(len + 1, len + 4).join(NIL) === '!--') {

                  len = len + 4;

                  if (len < c) {

                    do {

                      if (ws(b[len]) === false) {
                        embed = false;
                        break;
                      }

                      if (is(b[len], cc.NWL) || is(b[len], cc.CAR)) break;

                      len = len + 1;
                    } while (len < c);
                  }

                } else {
                  embed = false;
                }

              }
              break;
            }

            len = len + 1;

          } while (len < c);
        }
      }

      return singular();

    }

    /**
     * Attributes
     *
     * The attribute lexer and tokenizer. This reasons with the traversed
     * tokens and populates the data structure. It is only responsible for
     * attribute expressions.
     *
     * @next script()
     */
    function attribute () {

      /* PUSH RECORD -------------------------------- */

      push(data, record, NIL);

      /* -------------------------------------------- */
      /* CONSTANTS                                    */
      /* -------------------------------------------- */

      /**
       * The index of data record in the tree
       */
      const begin = parse.count;

      /**
       * The tag name, ie: `tname`
       */
      const stack = tname.replace(/\/$/, NIL);

      /**
       * Type of quotation character to convert
       */
      const qc = rules.quoteConvert;

      /* -------------------------------------------- */
      /* LOCAL SCOPES                                 */
      /* -------------------------------------------- */

      /**
       * The current index of the attribute
       */
      let idx = 0;

      /**
       * Equals `=` operator index in the token
       */
      let eq = 0;

      /**
       * Double quotation `"` index in the token
       */
      let dq = 0;

      /**
       * Single quotation `'` index in the token
       */
      let sq = 0;

      /**
       * The attribute name
       */
      let name = NIL;

      /**
       * The attribute value
       */
      let value = NIL;

      /**
       * The amount of attrs in the store
       */
      let len = attrs.length;

      /* -------------------------------------------- */
      /* FUNCTIONS                                    */
      /* -------------------------------------------- */

      /**
       * Convert Quotes
       *
       * Converts quotation characters and pushes the attribute record.
       */
      function quotes () {

        if (parse.attributes.has(begin)) {
          if (idx + 1 === len && not(record.token[record.token.length - 1], cc.RAN)) {
            record.token = record.token + '>';
          }
        }

        let lq = isLiquid(record.token, 5);

        if (
          ignore === true ||
          qc === 'none' ||
          record.types.indexOf('attribute') < 0 ||
          (lq === false && qc === 'single' && record.token.indexOf('"') < 0) ||
          (lq === false && qc === 'double' && record.token.indexOf("'") < 0)) {

          push(data, record, NIL);

        } else {

          let ee = 0;
          let inner = false;

          const ch = record.token.split(NIL);
          const eq = record.token.indexOf('=');
          const ln = ch.length - 1;

          if (
            not(ch[eq + 1], cc.DQO) &&
            not(ch[ch.length - 1], cc.DQO) &&
            qc === 'single' &&
            lq === false) {

            push(data, record, NIL);

          } else if (
            not(ch[eq + 1], cc.SQO) &&
            not(ch[ch.length - 1], cc.SQO) &&
            qc === 'double' &&
            lq === false) {

            push(data, record, NIL);

          } else {

            ee = eq + 2;

            if (lq === false) {
              if (qc === 'double') {
                if (record.token.slice(eq + 2, ln).indexOf('"') > -1) inner = true;
                ch[eq + 1] = '"';
                ch[ch.length - 1] = '"';
              } else if (qc === 'single') {
                if (record.token.slice(eq + 2, ln).indexOf("'") > -1) inner = true;
                ch[eq + 1] = "'";
                ch[ch.length - 1] = "'";
              }
            }

            if (inner === true || lq === true) {

              lq = false;

              do {

                if (is(ch[ee - 1], cc.LCB) && (is(ch[ee], cc.PER) || is(ch[ee], cc.LCB))) {
                  lq = true;
                } else if (is(ch[ee], cc.RCB) && (is(ch[ee - 1], cc.PER) || is(ch[ee - 1], cc.RCB))) {
                  lq = false;
                }

                if (lq === true) {
                  if (is(ch[ee], cc.DQO) && qc === 'double') {
                    ch[ee] = "'";
                  } else if (is(ch[ee], cc.SQO) && qc === 'single') {
                    ch[ee] = '"';
                  }
                } else {
                  if (is(ch[ee], cc.SQO) && qc === 'double') {
                    ch[ee] = '"';
                  } else if (is(ch[ee], cc.DQO) && qc === 'single') {
                    ch[ee] = "'";
                  }
                }

                ee = ee + 1;

              } while (ee < ln);
            }

            record.token = ch.join(NIL);

            push(data, record, NIL);

          }
        }
      };

      /**
       * Sorting Attributes
       *
       * Applies attributes sorting when `attributeSort` and/or `attributeSortList`
       * rules are enabled or defined. The sorting is applied in post process.
       */
      function sorting () {

        if (!(!jsx && !jscomm && !nosort)) return;

        if (asl === 0) {
          attrs = parse.sortSafe(attrs, NIL, false);
          return;
        }

        // if making use of the 'options.attributeSortList` option

        const tempstore = [];

        dq = 0;
        eq = 0;
        len = attrs.length;

        // loop through the options.attributeSortList looking for attribute name matches
        do {

          // loop through the attrs
          eq = 0;

          do {

            name = attrs[eq][0].split('=')[0];

            if (rules.attributeSortList[dq] === name) {
              tempstore.push(attrs[eq]);
              attrs.splice(eq, 1);
              len = len - 1;
              break;
            }

            eq = eq + 1;

          } while (eq < len);

          dq = dq + 1;

        } while (dq < asl);

        attrs = parse.sortSafe(attrs, NIL, false);
        attrs = tempstore.concat(attrs);
        len = attrs.length;

      }

      /**
       * JSX Attributes
       *
       * Passes JSX attributes literals to the `script` lexer and pushes the
       * attributes onto the data structure stack accordingly.
       */
      function jsxattr () {

        record.token = name + '={';
        record.types = 'jsx_attribute_start';

        push(data, record, 'jsx_attribute');

        prettify.lexers.script(value.slice(1, value.length - 1));
        record.begin = parse.count;

        if (/\s\}$/.test(value)) {
          value = value.slice(0, value.length - 1);
          value = SpaceEnd.exec(value)[0];
          record.lines = value.indexOf('\n') < 0 ? 1 : value.split('\n').length;
        } else {
          record.lines = 0;
        }

        record.begin = parse.scope.index;
        record.stack = parse.scope.token;
        record.token = '}';
        record.types = 'jsx_attribute_end';

        quotes();

      }

      /**
       * Liquid Attributes
       *
       * Liquid infused attribute handling for record type assignment. Accepts an
       * optional `skipEnd` parameter to prevent checking of `endtag` liquid tokens.
       */
      function liqattr () {

        if (isLiquidLine(attrs[idx][0])) {

          record.types = 'attribute';
          record.token = attrs[idx][0];

        } else if (isLiquidEnd(attrs[idx][0])) {

          record.token = attrs[idx][0];
          record.types = 'template_attribute_end';
          record.ender = record.begin;

        } else {

          if (isLiquidStart(attrs[idx][0])) {

            record.types = 'template_attribute_start';
            record.begin = parse.count;
            record.token = attrs[idx][0];

          } else if (isLiquidElse(attrs[idx][0])) {

            record.types = 'template_attribute_else';
            record.token = attrs[idx][0];

          } else {

            record.types = 'attribute';
            record.token = attrs[idx][0];

          }
        }

        //  console.log(record);

        quotes();

      }

      /* -------------------------------------------- */
      /* TOKENIZE                                     */
      /* -------------------------------------------- */

      if (attrs.length < 1) return script();

      // Fixes Singleton Tags
      //
      // Since a forward slash "/" character at
      // the end of the tag then this is not an attribute
      //
      if (is(attrs[attrs.length - 1][0], cc.FWS)) {
        attrs.pop();
        token = token.replace(/>$/, '/>');
      }

      // Reconnects attribute names to their respective values if separated on "="
      eq = attrs.length;
      dq = 1;

      if (dq < eq) {
        do {

          name = attrs[dq - 1][0];

          if (is(name[name.length - 1], cc.EQS) && attrs[dq][0].indexOf('=') < 0) {
            attrs[dq - 1][0] = name + attrs[dq][0];
            attrs.splice(dq, 1);

            eq = eq - 1;
            dq = dq - 1;
          }

          dq = dq + 1;

        } while (dq < eq);
      }

      // Sort the attrs
      if (rules.attributeSort) sorting();

      record.begin = begin;
      record.stack = stack;
      record.types = 'attribute';

      if (idx < len) {

        do {

          if (attrs[idx] === undefined) break;

          record.lines = attrs[idx][1];

          attrs[idx][0] = attrs[idx][0].replace(SpaceEnd, NIL);

          if (jsx === true && /^\/[/*]/.test(attrs[idx][0])) {

            record.types = 'comment_attribute';
            record.token = attrs[idx][0];

            quotes();

            idx = idx + 1;
            continue;
          }

          if (attrs[idx][1] <= 1 && isLiquidLine(attrs[idx][0])) {
            if (!isValueLiquid(attrs[idx][0])) {

              record.types = 'attribute';
              record.token = attrs[idx][0];

              quotes();

              idx = idx + 1;
              continue;
            }
          }

          eq = attrs[idx][0].indexOf('=');
          dq = attrs[idx][0].indexOf('"');
          sq = attrs[idx][0].indexOf("'");

          if (eq < 0) {

            record.types = 'attribute';

            if (
              is(attrs[idx][0], cc.HSH) ||
              is(attrs[idx][0], cc.LSB) ||
              is(attrs[idx][0], cc.LCB) ||
              is(attrs[idx][0], cc.LPR) || jsx === true) {

              record.token = attrs[idx][0];

            } else {

              record.token = rules.attributeCasing === 'preserve'
                ? attrs[idx][0]
                : attrs[idx][0].toLowerCase();

            }

            quotes();

          } else {

            // Separates out the attribute name from its value
            // We need context of the attribute expression for
            // dealing with and handling Liquid attributes specifically
            //
            name = attrs[idx][0].slice(0, eq);
            value = attrs[idx][0].slice(eq + 1);

            if (rules.attributeCasing === 'lowercase-name') {
              name = name.toLowerCase();
              attrs[idx][0] = name + '=' + value;
            } else if (rules.attributeCasing === 'lowercase-value') {
              value = value.toLowerCase();
              attrs[idx][0] = name + '=' + value;
            } else if (rules.attributeCasing === 'lowercase') {
              name = name.toLowerCase();
              value = value.toLowerCase();
              attrs[idx][0] = name + '=' + value;
            }

            if (rules.correct && (
              not(value, cc.LAN) ||
              not(value, cc.LCB) ||
              not(value, cc.EQS) ||
              not(value, cc.DQO) ||
              not(value, cc.SQO))) {

              value = '"' + value + '"';

            }

            if (jsx === true && /^\s*{/.test(value)) {

              jsxattr();

              record.types = 'attribute';
              record.begin = begin;
              record.stack = stack;

            } else if (isLiquidStart(value) && (
              (
                liquid.valueForce === 'always' || (
                  (liquid.valueForce === 'intent' || liquid.valueForce === 'wrap') &&
                  options.wrap > 0 &&
                  Math.abs(a - parse.lineStart) >= options.wrap
                )
              ) || (
                value.indexOf(NWL) > 0 && (
                  liquid.valueForce === 'newline' ||
                  liquid.valueForce === 'intent'
                )
              )
            ) && (
              is(value[0], cc.DQO) ||
              is(value[0], cc.SQO)
            )) {

              record.token = `${name}=${sq > -1 ? "'" : '"'}`;
              record.types = 'attribute';

              parse.attributes.add(begin);

              push(data, record, NIL);

              if (idx + 1 === len) {
                lexer(value.slice(1, -1));
                data.token[parse.count] = `${data.token[parse.count]}${sq > -1 ? "'" : '"'}>`;
                break;
              }

              if (rules.forceIndent === true) {
                const q = value.lastIndexOf(value[0]);
                if (is(value[q], cc.DQO) || is(value[q], cc.SQO)) {
                  lexer(value.slice(1, q));
                  data.token[parse.count] = `${data.token[parse.count]}${sq > -1 ? "'" : '"'}`;
                } else {
                  lexer(value.slice(1));
                }
              } else {
                lexer(value.slice(1));
              }

              record.types = 'attribute';
              record.stack = stack;
              record.begin = begin;

            } else {

              if (isLiquid(name, 5)) {

                liqattr();

              } else {

                record.types = 'attribute';
                record.token = attrs[idx][0];

                quotes();

              }

            }
          }

          idx = idx + 1;
        } while (idx < len);
      }

      embed = false;

      return script();

    };

    /**
     * Exclude
     *
     * This is a utility function for obtaining ending liquid tags
     * before traversal. Specifically for handling comment blocks
     * and/or ignored markup tags like scripts or styles.
     *
     * @next traverse()
     */
    function exclude (tag: string, from: number) {

      // Lets look for liquid tokens keyword sbefore proceeding,
      // We are skipping ahead from the normal parse here.
      //
      if (tag === 'comment' || igl.has(tag)) {

        const idx1 = source.indexOf('{%', from);

        //  Lets reference this index
        let idx2 = idx1;

        // Lets make sure to consume any whitespace dash
        // characters that might be defined
        //
        if (b[idx1 + 1].charCodeAt(0) === cc.DSH) idx2 = idx1 + 1;

        // Lets now look for the starting index of the `endcomment` keyword
        //
        idx2 = source.indexOf(`end${tag}`, idx2);

        if (idx2 > 0) {

          idx2 = b.indexOf('}', idx2);

          if (idx2 > 0 && b[idx2 - 1].charCodeAt(0) === cc.PER) {

            if (tag !== 'comment') {
              ltype = 'ignore';
              ignore = true;
              start = b.slice(a, from + 1).join(NIL);
              end = b.slice(idx1, idx2 + 1).join(NIL);
            } else {
              ltype = 'comment';
              start = b.slice(a, from + 1).join(NIL);
              end = b.slice(idx1, idx2 + 1).join(NIL);
            }

          }
        }

      }

    }

    /**
     * Delimiters
     *
     * This is the first function to execute and prepares the traversal
     * for what to expect in terms of tag types.
     *
     * @next traverse()
     */
    function delimiter () {

      if (end === '---') {

        start = '---';
        ltype = 'ignore';
        preserve = true;

      } else if (is(b[a], cc.LAN)) {

        if (is(b[a + 1], cc.FWS)) {

          ltype = 'end';
          end = '>';

        } else if (is(b[a + 1], cc.BNG)) {

          if ((
            is(b[a + 2], 100) ||
            is(b[a + 2], 68) // d D
          ) && (
            is(b[a + 3], 111) ||
            is(b[a + 3], 79) // o O
          ) && (
            is(b[a + 4], 99) ||
            is(b[a + 4], 67) // c C
          ) && (
            is(b[a + 5], 116) ||
            is(b[a + 5], 84) // t T
          ) && (
            is(b[a + 6], 121) ||
            is(b[a + 6], 89) // y Y
          ) && (
            is(b[a + 7], 112) ||
            is(b[a + 7], 80) // p P
          ) && (
            is(b[a + 8], 101) ||
            is(b[a + 8], 69) // e E
          )) {

            end = '>';
            ltype = 'doctype';
            preserve = true;

          } else if (is(b[a + 2], cc.DSH) && is(b[a + 3], cc.DSH)) {

            end = '-->';
            ltype = 'comment';
            start = '<!--';

          } else if (
            is(b[a + 2], cc.LSB) &&
            b[a + 3].charCodeAt(0) === 67 && // C
            b[a + 4].charCodeAt(0) === 68 && // D
            b[a + 5].charCodeAt(0) === 65 && // A
            b[a + 6].charCodeAt(0) === 84 && // T
            b[a + 7].charCodeAt(0) === 65 && // A
            is(b[a + 8], cc.LSB)
          ) {

            end = ']]>';
            ltype = 'cdata';
            preserve = true;

          }

        } else if (b[a + 1] === '?') {

          end = '?>';

          if (
            b[a + 2].charCodeAt(0) === 120 && // x
            b[a + 3].charCodeAt(0) === 109 && // m
            b[a + 4].charCodeAt(0) === 109 // l
          ) {
            ltype = 'xml';
            basic = true;
          } else {
            preserve = true;
            ltype = 'template';
          }

        } else if ((
          is(b[a + 1], 112) ||
          is(b[a + 1], 80) // p P
        ) && (
          is(b[a + 2], 114) ||
          is(b[a + 2], 82) // r R
        ) && (
          is(b[a + 3], 101) ||
          is(b[a + 3], 69) // e E
        ) && (
          is(b[a + 4], cc.RAN) ||
          ws(b[a + 4])
        )) {

          end = '</pre>';
          ltype = 'ignore';
          preserve = true;

        } else if (
          rules.ignoreScripts === true &&
          b.slice(a + 1, a + 7).join(NIL).toLowerCase() === 'script'
        ) {

          end = '</script>';
          ltype = 'ignore';
          preserve = true;
          ignore = true;

        } else if (
          rules.ignoreStyles === true &&
          b.slice(a + 1, a + 6).join(NIL).toLowerCase() === 'style'
        ) {

          end = '</style>';
          ltype = 'ignore';
          preserve = true;
          ignore = true;

        } else {

          basic = true;
          end = '>';

        }

      } else if (is(b[a], cc.LCB)) {

        if (jsx) {

          embed = true;
          nowalk = true;

          record.token = '{';
          record.types = 'script_start';
          parse.structure.push([ 'script', parse.count ]);

          push(data, record, NIL);

          return;
        }

        if (is(b[a + 1], cc.LCB)) {

          preserve = true;
          end = '}}';
          ltype = 'template';

        } else if (is(b[a + 1], cc.PER)) {

          preserve = true; // Required for lexer
          end = '%}';
          ltype = 'template';

          /**
            * `}` - The index of the next Right Curly brace
            */
          const from = b.indexOf('}', a + 2);

          if (is(b[from - 1], cc.PER)) {

            let tag = b.slice(a + 2, from - 1).join(NIL);

            // Lets make sure we do not interfere with dash delimiters
            if (is(tag, cc.DSH)) {
              start = '{%-';
              tag = tag.slice(1).trimStart();
            } else {
              start = '{%';
              tag = tag.trimStart();
            }

            // Same as above but for closing delimiters
            if (is(tag[tag.length - 1], cc.DSH)) {
              end = '-%}';
              tag = tag.slice(0, tag.length - 1).trimEnd();
            } else {
              end = '%}';
              tag = tag.trimEnd();
            }

            exclude(tag, from);

            if (is(tag, cc.HSH)) {

              ltype = 'comment';
              end = '%}';
              lchar = end.charAt(end.length - 1);

              return comments(true);
            }

          } else {

            preserve = true;
            end = '%}';
            ltype = 'template';

          }
        } else {

          preserve = true;
          end = b[a + 1] + '}';
          ltype = 'template';

        }
      }

      if (rules.preserveAttributes === true) preserve = true;
      if (nowalk) return external();

      lchar = end.charAt(end.length - 1);

      if (ltype === 'comment' && (is(b[a], cc.LAN) || (is(b[a], cc.LCB) && is(b[a + 1], cc.PER)))) {
        return comments();
      } else if (a < c) {
        return traverse();
      } else {
        return external();
      }
    }

    /**
     * Comments
     *
     * Handling for comment lines and blocks. Additional processing for
     * dealing with Liquid comment blocks. The function also reasons
     * with ignore comment regions.
     *
     * @next external()
     * @note traverse() will run depending on current iteration
     */
    function comments (lineComment?: boolean) {

      if (lineComment === true) {

        comm = wrapCommentLine({
          chars: b,
          end: c,
          lexer: 'markup',
          begin: start,
          start: a,
          ender: end
        });

      } else {

        comm = wrapCommentBlock({
          chars: b,
          end: c,
          lexer: 'markup',
          begin: start,
          start: a,
          ender: end
        });
      }

      token = comm[0] as string;
      a = comm[1] as number;

      if (token.replace(start, NIL).trimStart().startsWith('@prettify-ignore-start')) {

        record.token = token;
        record.types = 'ignore';
        push(data, record, NIL);

      } else {

        if (is(token[0], cc.LCB) && is(token[1], cc.PER) && lineComment === false) {
          const begin = token.indexOf('%}', 2) + 2;
          const last = token.lastIndexOf('{%');
          token = normalize(token.slice(0, begin)) + token.slice(begin, last) + normalize(token.slice(last));
        }

        record.token = token;
        record.types = 'comment';

      }

      return external();

    }

    /**
     * Traverse
     *
     * The real tag lexer. This walks the tag/s and tokenizes
     * attributes and Liquid tokens contained within the markup.
     *
     *  @next external()
     */
    function traverse () {

      /* -------------------------------------------- */
      /* CONSTANTS                                    */
      /* -------------------------------------------- */

      /**
       * Lexing store - Character in the lex will reside here
       */
      const lexed: string[] = [];

      /* -------------------------------------------- */
      /* REFERENCES                                   */
      /* -------------------------------------------- */

      /**
       * An advancement index reference
       */
      let e: number = 0;

      /**
       * An advancement index reference
       */
      let f: number = 0;

      /**
       * Angle bracket count, ie: `<` and `>`
       */
      let acount: number = 0;

      /**
       * Brace count, ie: `{` and ``
       */
      let bcount: number = 0;

      /**
       * Parenthesis count, ie: `(` and `)`
       */
      let pcount: number = 0;

      /**
       * Line count - This is applied to the data structure
       */
      let lines: number = 0;

      /**
       * The quotation character store reference
       */
      let quote: string = NIL;

      /**
       * JSX/TSX quotataion character
       */
      let jsxquote: string = NIL;

      /**
       * JSX/TSX parenthesis counts, ie: `{` and `}`
       */
      let jsxparen: number = 0;

      /**
       * Whether or not we are within a Liquid template token
       */
      let isliquid: boolean = false;

      /**
       * Whether or not we should invoke a whitespace test
       */
      let stest: boolean = false;

      /**
       * Whether or not we are at a starting attribute value quote.
       * This reference will always us to consume nested quotes
       * like those we'd encounter in Liquid tokens.
       */
      let qattr: boolean = false;

      /**
       * Whether or not we should invoke a quotation test
       */
      let qtest: boolean = false;

      /**
       * Attribute store
       */
      let store: string[] = [];

      /* -------------------------------------------- */
      /* FUNCTIONS                                    */
      /* -------------------------------------------- */

      /**
       * Attribute Tokenizer
       *
       * This function is responsible reasoning with the lexed contents of
       * the recently traversed attribute. This updates the `attrs` reference
       * by using the `store[]` entries populated during traversal.
       */
      function tokenize (quotes: boolean) {

        /* -------------------------------------------- */
        /* LEXICAL SCOPES                               */
        /* -------------------------------------------- */

        /**
         * The attribute name (index `0`) and value (index `0`)
         */
        let each: [ name: string, value: string ];

        /**
         * The attribute token, eg: `id="foo"`
         */
        let attr: string = NIL;

        /* -------------------------------------------- */
        /* LEXICAL HANDLING                             */
        /* -------------------------------------------- */

        if (quotes === true) {

          attr = store.join(NIL);
          each = attrname(attr);
          quote = NIL;

          if (each[0] === 'data-prettify-ignore') ignore = true;

        } else {

          attr = store.join(NIL);

          if (jsx === false || (jsx && not.last(attr, cc.RCB))) attr = attr.replace(/\s+/g, WSP);

          each = attrname(attr);

          if (each[0] === 'data-prettify-ignore') ignore = true;

          if (jsx && is(store[0], cc.LCB) && is.last(store, cc.RCB)) jsxparen = 0;
        }

        // Prevent sorting of attributes when tags contains Liquid tokens
        if (is(attr[0], cc.LCB) && is(attr[1], cc.PER)) nosort = true;

        if (quotes === false) {
          if (isLiquidStart(attr)) within = within + 1;
          if (isLiquidEnd(attr)) within = within - 1;
        }

        attr = attr.replace(/^\u0020/, NIL).replace(/\u0020$/, NIL);
        store = attr.replace(/\r\n/g, NWL).split(NWL);

        if (!store.length) store[0] = store[0].replace(/\s+$/, NIL);

        attr = options.crlf === true ? normalize(store.join('\r\n')) : normalize(store.join(NWL));

        if (within > 0 || isLiquid(attr, 1)) {
          if (isLiquid(attr, 5) === false) {
            lines = 0;
            if (is(b[a + 1], cc.NWL) || is(b[a], cc.NWL)) lines = 2;
            if (is(b[a], cc.WSP) && not(b[a + 1], cc.WSP)) lines = 1;
          } else {
            if (is(b[a + 1], cc.NWL)) {
              lines = 2;
            } else if (is(b[a + 1], cc.WSP)) {
              lines = 1;
            } else if (lines >= 1) {
              lines = 0;
            }
          }
        } else {
          if (is(b[a + 1], cc.NWL)) {
            lines = 2;
          } else if (is(b[a + 1], cc.WSP)) {
            lines = 1;
          }
        }

        if (attrs.length > 0) {

          const ln = attrs.length - 1;

          if (is(attr, cc.EQS) || is(attr, cc.DSH)) {

            // If an attribute starts with a `=` then adjoin it to the attrs.length -1 attribute
            attrs[ln][0] = attrs[ln][0] + attr;
            attrs[ln][1] = lines;

            // Prevent adding the entry to store as we've connected it to the last entry
            attr = NIL;

          } else if (lines === 0 && attrs[ln][1] === 0) {

            attrs[ln][0] = attrs[ln][0] + attr;
            attrs[ln][1] = lines;
            attr = NIL;

          } else if (lines > 0 && attrs[ln][1] === 0 && isLiquidEnd(attr) === true) {

            attrs[ln][0] = attrs[ln][0] + attr;
            attrs[ln][1] = lines;
            attr = NIL;

          } else if (lines > 0 && attrs[ln][1] === 0 && isLiquid(attrs[ln][0], 4)) {

            attrs[ln][0] = attrs[ln][0] + attr;
            attr = NIL;

          } else if (attrs[ln][1] > 0 && lines === 0 && isLiquidControl(attr) === false) {

            lines = attrs[ln][1];

          } else if (attrs[ln][1] > 0 && lines > 0 && isLiquidEnd(attr) && !isLiquid(attr, 6)) {

            // Edge Case
            const i = attr.indexOf('{%');
            attrs.push([ attr.slice(0, i), lines ]);

            attr = attr.slice(i);

          }
        }

        // Populates the "attrs[]" array which will be used
        // when adding the records to the data structures
        //
        if (attr !== NIL && attr !== WSP) attrs.push([ attr, lines ]);

        if (attrs.length > 0) {

          const [ value ] = attrs[attrs.length - 1];

          if (value.indexOf('=\u201c') > 0) { // “

            parse.error = error('Invalid quote character (\u201c, &#x201c) used.');

          } else if (value.indexOf('=\u201d') > 0) { // ”

            parse.error = error('Invalid quote character (\u201d, &#x201d) used.');

          }
        }

        store = [];
        lines = is(b[a], cc.NWL) ? 2 : 1;

      };

      /* -------------------------------------------- */
      /* TRAVERSAL                                    */
      /* -------------------------------------------- */

      do {

        if (is(b[a], cc.NWL)) {
          lines = lines + 1;
          parse.lineNumber = parse.lineNumber + 1;
        }

        if (start === '---' && end === '---' && ltype === 'ignore') {

          lexed.push(b[a]);

          if (a > 3 && is(b[a], cc.DSH) && is(b[a - 1], cc.DSH) && is(b[a - 2], cc.DSH)) break;
          a = a + 1;
          continue;
        }

        if (preserve === true || ((ws(b[a]) === false && not(quote, cc.RCB)) || is(quote, cc.RCB))) {

          if (isliquid === false && is(b[a - 1], cc.LCB) && (is(b[a], cc.LCB) || is(b[a], cc.PER))) {
            isliquid = true;
          } else if (isliquid === true && is(b[a], cc.RCB) && (is(b[a - 1], cc.RCB) || is(b[a - 1], cc.PER))) {
            isliquid = false;
          }

          lexed.push(b[a]);

          if (is(lexed[0], cc.LAN) && is(lexed[1], cc.RAN) && is(end, cc.RAN)) {
            record.token = '<>';
            record.types = 'start';
            push(data, record, '(empty)');
            return;
          }

          if (is(lexed[0], cc.LAN) && is(lexed[1], cc.FWS) && is(lexed[2], cc.RAN) && is(end, cc.RAN)) {
            record.token = '</>';
            record.types = 'end';
            push(data, record, NIL);
            return;
          }
        }

        if (ltype === 'cdata' && is(b[a], cc.RAN) && is(b[a - 1], cc.RSB) && not(b[a - 2], cc.RSB)) {

          parse.error = error(`CDATA tag (${lexed.join(NIL)}) not properly terminated with "]]>`);

          break;
        }

        if (ltype === 'comment') {

          quote = NIL;

          // Comments must ignore fancy encapsulations and attribute parsing
          //
          if (b[a] === lchar && lexed.length > end.length + 1) {

            // If current character matches the last character of the tag ending sequence
            //
            f = lexed.length;
            e = end.length - 1;

            if (e > -1) {
              do {
                f = f - 1;
                if (not(lexed[f], end.charCodeAt(e))) break;
                e = e - 1;
              } while (e > -1);
            }

            if (e < 0) break;

          }
        } else {

          if (quote === NIL) {

            if (is(lexed[0], cc.LAN) && is(lexed[1], cc.BNG) && ltype !== 'cdata') {

              if (ltype === 'doctype' && is(b[a], cc.RAN)) break;

              if (is(b[a], cc.LSB)) {

                if (is(b[a + 1], cc.LAN)) {
                  ltype = 'start';
                  break;
                }

                if (ws(b[a + 1])) {
                  do {
                    a = a + 1;
                    if (is(b[a], cc.NWL)) lines = lines + 1;
                  } while (a < c - 1 && ws(b[a + 1]));
                }

                if (is(b[a + 1], cc.LAN)) {
                  ltype = 'start';
                  break;
                }
              }
            }

            if (jsx) {
              if (is(b[a], cc.LCB)) {
                jsxparen = jsxparen + 1;
              } else if (is(b[a], cc.RCB)) {
                jsxparen = jsxparen - 1;
              }
            }

            if (
              is(b[a], cc.LAN) &&
              basic === true &&
              preserve === false &&
              lexed.length > 1 &&
              />{2,3}/.test(end) === false) {
              parse.error = error(`Invalid structure detected ${b.slice(a, a + 8).join(NIL)}`);
              break;
            }

            if (ws(b[a]) === false && stest === true && b[a] !== lchar) {

              // Attribute start
              //
              stest = false;
              icount = 0;
              quote = jsxquote;

              lexed.pop();

              if (a < c) {

                do {

                  if (is(b[a], cc.NWL)) parse.lineNumber = parse.lineNumber + 1;

                  if (rules.preserveAttributes === true) {
                    lexed.push(b[a]);
                  } else {
                    store.push(b[a]);
                  }

                  if (not(quote, cc.DQO) || not(quote, cc.SQO)) {
                    if (is(b[a - 1], cc.LCB) && (is(b[a], cc.PER) || is(b[a], cc.LCB))) {
                      isliquid = true;
                    } else if ((is(b[a - 1], cc.RCB) || is(b[a - 1], cc.PER)) && is(b[a], cc.RCB)) {
                      isliquid = false;
                    }
                  }

                  if (
                    jsx === false &&
                    qattr === false &&
                    isliquid === true &&
                    rules.preserveAttributes === false
                  ) {

                    const isval = is(store[0], cc.EQS);

                    while (a < c) {

                      a = a + 1;

                      if (is(b[a], cc.NWL)) {

                        parse.lineNumber = parse.lineNumber + 1;

                        if (isval) {

                          isliquid = false;
                          quote = NIL;

                          tokenize(false);

                          break;
                        }
                      }

                      store.push(b[a]);

                      if (isval && is(b[a + 1], cc.RAN)) {

                        isliquid = false;
                        quote = NIL;

                        attrs[attrs.length - 1][0] += store.join(NIL);
                        store = [];

                        break;
                      }

                      if (isval === false && is(b[a], cc.RCB) && (
                        is(b[a - 1], cc.RCB) ||
                        is(b[a - 1], cc.PER)
                      )) {

                        isliquid = false;
                        quote = NIL;

                        tokenize(false);

                        break;
                      }

                    }

                  }

                  if (jsx === false && (
                    is(b[a], cc.LAN) ||
                    is(b[a], cc.RAN)
                  ) && (
                    quote === NIL ||
                    is(quote, cc.RAN)
                  )) {

                    if (quote === NIL && is(b[a], cc.LAN)) {

                      quote = '>';
                      acount = 1;

                    } else if (is(quote, cc.RAN)) {

                      if (is(b[a], cc.LAN)) {

                        acount = acount + 1;

                      } else if (is(b[a], cc.RAN)) {

                        acount = acount - 1;

                        if (acount === 0) {
                          quote = NIL;
                          icount = 0;
                          tokenize(false);
                          break;
                        }
                      }
                    }

                  } else if (quote === NIL) {

                    if (b[a + 1] === lchar) {

                      // If we are at end of tag, we exit the traversal.
                      //
                      if (is.last(store, cc.FWS) || (
                        is.last(store, cc.QWS) &&
                        ltype === 'xml'
                      )) {

                        store.pop();
                        if (preserve === true) lexed.pop();
                        a = a - 1;
                      }

                      if (store.length > 0) tokenize(false);

                      break;
                    }

                    if (jsx === false && is(b[a], cc.LCB) && is(b[a - 1], cc.EQS)) {

                      quote = '}';

                    } else if (is(b[a], cc.DQO) || is(b[a], cc.SQO)) {

                      quote = b[a];

                      if (qattr === false && isliquid === false) qattr = true;

                      if (is(b[a - 1], cc.EQS) && (is(b[a + 1], cc.LAN) || (
                        is(b[a + 1], cc.LCB) &&
                        is(b[a + 2], cc.PER)
                      ) || (
                        ws(b[a + 1]) &&
                        not(b[a - 1], cc.EQS)
                      ))) {

                        icount = a;

                      }

                    } else if (is(b[a], cc.LPR)) {

                      quote = ')';
                      pcount = 1;

                    } else if (jsx) {

                      // JSX Variable attribute
                      //
                      if ((is(b[a - 1], cc.EQS) || ws(b[a - 1])) && is(b[a], cc.LCB)) {

                        quote = '}';
                        bcount = 1;

                      } else if (is(b[a], cc.FWS)) {

                        // JSX Comments
                        if (is(b[a + 1], cc.ARS)) {
                          quote = '\u002a/';
                        } else if (b[a + 1] === '/') {
                          quote = '\n';
                        }

                      }

                    } else if (is(lexed[0], cc.LCB) && is(b[a], cc.LCB) && (
                      is(b[a + 1], cc.LCB) ||
                      is(b[a + 1], cc.PER)
                    )) {

                      // Opening embedded template expression
                      //
                      quote = is(b[a + 1], cc.LCB) ? '}}' : b[a + 1] + '}';

                    }

                    if (ws(b[a]) && quote === NIL) {

                      // Testing for a run of spaces between an attribute's = and a quoted value.
                      // Unquoted values separated by space are separate attrs
                      //
                      if (is(store[store.length - 2], cc.EQS)) {

                        e = a + 1;

                        if (e < c) {
                          do {

                            if (ws(b[e]) === false) {

                              if (is(b[e], cc.DQO) || is(b[e], cc.SQO)) {
                                a = e - 1;
                                qtest = true;
                                store.pop();
                              }

                              break;
                            }

                            e = e + 1;
                          } while (e < c);
                        }
                      }

                      if (qtest === true) {

                        qtest = false;

                      } else if (jsxparen === 0 || (jsxparen === 1 && is(store[0], cc.LCB))) {

                        // If there is an unquoted space attribute is complete
                        //
                        store.pop();

                        if (store.length > 0) tokenize(false);

                        stest = true;
                        break;
                      }
                    }
                  } else if (is(b[a], cc.LPR) && is(quote, cc.RPR)) {

                    pcount = pcount + 1;

                  } else if (is(b[a], cc.RPR) && is(quote, cc.RPR)) {

                    pcount = pcount - 1;

                    if (pcount === 0) {

                      quote = NIL;

                      if (is(b[a + 1], end.charCodeAt(0))) {
                        tokenize(false);
                        break;
                      }
                    }

                  } else if (jsx && (
                    is(quote, cc.RCB) || (
                      is(quote, cc.NWL) &&
                      is(b[a], cc.NWL)
                    ) || (
                      quote === '\u002a/' &&
                      is(b[a - 1], cc.ARS) &&
                      is(b[a], cc.FWS)
                    )
                  )) {

                    if (is(b[a], cc.TQO)) {

                      a = a + 1;

                      do {
                        store.push(b[a]);
                        if (is(b[a], cc.TQO)) break;
                        a = a + 1;
                      } while (a < b.length);
                    }

                    // JSX attributes
                    if (is(quote, cc.RCB)) {
                      if (is(b[a], cc.RCB) && b[a] !== quote) {

                        bcount = bcount + 1;

                      } else if (b[a] === quote) {

                        bcount = bcount - 1;

                        if (bcount === 0) {

                          jsxparen = 0;
                          quote = NIL;
                          token = store.join(NIL);

                          if (rules.preserveAttributes === false) {
                            if (jsx) {
                              if (!/^\s*$/.test(token)) attrs.push([ token, lines ]);
                            } else {
                              token = token.replace(/\s+/g, WSP);
                              if (token !== WSP) attrs.push([ token, lines ]);
                            }
                          }

                          store = [];
                          lines = 1;
                          break;
                        }
                      }

                    } else {

                      jsxquote = NIL;
                      jscomm = true;
                      token = store.join(NIL);

                      if (token !== WSP) attrs.push([ token, lines ]);

                      store = [];
                      lines = is(quote, cc.NWL) ? 2 : 1;
                      quote = NIL;

                      break;
                    }

                  } else if (
                    is(b[a], cc.LCB) &&
                    is(b[a + 1], cc.PER) &&
                    is(b[icount - 1], cc.EQS) && (
                      is(quote, cc.DQO) ||
                      is(quote, cc.SQO))) {

                    quote = quote + '{%';
                    icount = 0;

                  } else if (
                    is(b[a - 1], cc.PER) &&
                    is(b[a], cc.RCB) && (
                      quote === '"{%' ||
                      quote === "'{%")) {

                    quote = quote[0];
                    icount = 0;

                  } else if ((
                    is(b[a], cc.LAN) &&
                    is(end, cc.RAN) &&
                    is(b[icount - 1], cc.EQS) && (
                      is(quote, cc.DQO) ||
                      is(quote, cc.SQO)
                    )
                  )) {

                    quote = quote + '<';
                    icount = 0;

                  } else if (
                    is(b[a], cc.RAN) && (
                      quote === '"<' ||
                      quote === "'<"
                    )
                  ) {

                    quote = quote.charAt(0);
                    icount = 0;

                  } else if (icount === 0 &&
                    not(quote, cc.RAN) && (
                    quote.length < 2 || (
                      not(quote, cc.DQO) &&
                      not(quote, cc.SQO)
                    ))) {

                    // Terminate attribute at the conclusion of a quote pair
                    f = 0;
                    e = quote.length - 1;

                    if (e > -1) {

                      do {

                        if (not(b[a - f], quote.charCodeAt(e))) break;

                        f = f + 1;
                        e = e - 1;

                      } while (e > -1);
                    }

                    if (e < 0 && isliquid === false && qattr === true) {
                      qattr = false;
                      tokenize(true);
                      if (b[a + 1] === lchar) break;
                    }

                  } else if (icount > 0 && ws(b[a]) === false) {

                    icount = 0;

                  }

                  a = a + 1;

                } while (a < c);
              }
            } else if (is(end, cc.NWL) === false && (is(b[a], cc.DQO) || is(b[a], cc.SQO))) {

              // Opening quote
              quote = b[a];

            } else if (
              ltype !== 'comment' &&
              not(end, cc.NWL) &&
              is(b[a], cc.LAN) &&
              is(b[a + 1], cc.BNG) &&
              is(b[a + 2], cc.DSH) &&
              is(b[a + 3], cc.DSH) &&
              data.types[parse.count] !== 'conditional'
            ) {

              quote = '-->';

            } else if (is(b[a], cc.LCB) && not(lexed[0], cc.LCB) && not(end, cc.NWL) && (
              is(b[a + 1], cc.LCB) ||
              is(b[a + 1], cc.PER)
            )) {

              if (is(b[a + 1], cc.LCB)) {

                quote = '}}';

              } else {

                quote = b[a + 1] + '}';

                if (store.length < 1 && (attrs.length < 1 || ws(b[a - 1]))) {

                  lexed.pop();

                  do {

                    if (is(b[a], cc.NWL)) lines = lines + 1;
                    store.push(b[a]);

                    a = a + 1;
                  } while (a < c && b[a - 1] + b[a] !== quote);

                  store.push('}');
                  attrs.push([ store.join(NIL), lines ]);

                  store = [];
                  lines = 1;
                  quote = NIL;

                }
              }

              if (quote === end) quote = NIL;

            } else if (basic && not(end, cc.NWL) && ws(b[a]) && not(b[a - 1], cc.LAN)) {

              // Identify a space in a regular start or singleton tag
              //
              stest = true;

            } else if (basic && jsx && is(b[a], cc.FWS) && (is(b[a + 1], cc.ARS) || is(b[a + 1], cc.FWS))) {

              // JSX Comment immediately following tag each
              //
              stest = true;
              lexed[lexed.length - 1] = WSP;
              jsxquote = is(b[a + 1], cc.ARS) ? '\u002a/' : NWL;
              store.push(b[a]);

            } else if (isliquid === false && (
              b[a] === lchar || (
                is(end, cc.NWL) &&
                is(b[a + 1], cc.LAN)
              )
            ) && (
              lexed.length > end.length + 1 ||
              is(lexed[0], cc.RSB)
            ) && (
              jsx === false ||
              jsxparen === 0
            )) {

              if (is(end, cc.NWL)) {
                if (ws(lexed[lexed.length - 1])) {
                  do {
                    lexed.pop();
                    a = a - 1;
                  } while (ws(lexed[lexed.length - 1]));
                }

                break;
              }

              // If current character matches the last character of the tag ending sequence
              //
              f = lexed.length;
              e = end.length - 1;

              if (e > -1) {
                do {
                  f = f - 1;
                  if (lexed[f] !== end.charAt(e)) break;
                  e = e - 1;
                } while (e > -1);
              }

              if (e < 0) {

                // This condition will fix incorrect line spaces applied
                // on template attrs that are contained in the attribute store
                //
                if (is(lexed[f], cc.RAN) && is(b[a], cc.RAN) && attrs.length > 0) {
                  if (attrs[attrs.length - 1][1] === 0 && is(b[a - 1], cc.RCB) && ws(b[a + 1])) {
                    attrs[attrs.length - 1][1] = is(b[a + 1], cc.WSP) ? 1 : 2;
                  }
                }

                break;

              }
            }
          } else if ((
            is(b[a], quote.charCodeAt(quote.length - 1)) && ((
              jsx &&
              is(end, cc.RCB) && (
                not(b[a - 1], cc.BWS) ||
                esc(a) === false
              )
            ) || (jsx === false || not(end, cc.RCB)))
          )) {

            // Find the closing quote or embedded template expression
            //
            f = 0;
            e = quote.length - 1;

            if (e > -1) {
              do {
                if (b[a - f] !== quote.charAt(e)) break;
                f = f + 1;
                e = e - 1;
              } while (e > -1);
            }

            if (e < 0) quote = NIL;

          }
        }

        a = a + 1;

      } while (a < c);

      // Correction to incomplete template tags that use multiple angle braceAllman
      //
      // if (rules.correct === true) {

      //   if (
      //     is(b[a + 1], cc.RAN) &&
      //     is(lexed[0], cc.LAN) &&
      //     not(lexed[0], cc.LAN)
      //   ) {

      //     do a = a + 1; while (is(b[a + 1], cc.RAN));

      //   } else if (
      //     is(lexed[0], cc.LAN) &&
      //     is(lexed[1], cc.LAN) &&
      //     not(b[a + 1], cc.RAN) &&
      //     not(lexed[lexed.length - 2], cc.RAN)
      //   ) {

      //     do lexed.splice(1, 1); while (is(lexed[1], cc.LAN));

      //   }
      // }

      icount = 0;
      token = lexed.join(NIL);
      tname = getTagName(token);

      if (ignore === false) token = normalize(token);

      if (tname === 'xml') {
        html = 'xml';
      } else if (html === NIL && tname === 'html') {
        html = 'html';
      }

      record.token = token;
      record.types = ltype;

      if (preserve === false && jsx === false) token = token.replace(/\s+/g, WSP);

      return external();

    }

    /**
     * Scripts
     *
     * This the JSX related and does some additional processing for
     * the data structures. This will likely undergo refactors as the
     * script lexer operations are improved in later versions.
     *
     * This function concludes the `parseToken()` lexing operation.
     */
    function script () {

      if (options.wrap > 0 && jsx === true) {

        let clength: number = 0;
        let bb: number = parse.count;
        let cc: number = 0;

        if (data.types[bb].indexOf('attribute') > -1) {

          do {
            clength = clength + data.token[bb].length + 1;
            bb = bb - 1;
          } while (data.lexer[bb] !== 'markup' || data.types[bb].indexOf('attribute') > -1);

          if (data.lines[bb] === 1) clength = clength + data.token[bb].length + 1;

        } else if (data.lines[bb] === 1) {

          clength = data.token[bb].length + 1;
        }

        cc = bb - 1;

        if (clength > 0 && data.types[cc] !== 'script_end') {
          if (data.types[cc].indexOf('attribute') > -1) {
            do {
              clength = clength + data.token[cc].length + 1;
              cc = cc - 1;
            } while (data.lexer[cc] !== 'markup' || data.types[cc].indexOf('attribute') > -1);
            if (data.lines[cc] === 1) clength = clength + data.token[cc].length + 1;
          } else if (data.lines[cc] === 1) {
            clength = data.token[cc].length + 1;
          }
        }
      }

      parse.linesSpace = 0;

    }

    /* -------------------------------------------- */
    /* INVOKE                                       */
    /* -------------------------------------------- */

    return delimiter();

  }

  /**
   * Parse Content
   *
   * This function is responsible for parsing everything
   * other than markup identified tags.
   */
  function parseContent (): void {

    /* -------------------------------------------- */
    /* CONSTANTS                                    */
    /* -------------------------------------------- */

    /**
     * The current index content parse has began, ie: `a` number
     */
    const now = a;

    /**
     * Whether or not content is JSX brace token
     */
    const jsxbrace = jsx === true && is(data.token[parse.count], cc.LCB);

    /* -------------------------------------------- */
    /* LEXICAL SCOPES                               */
    /* -------------------------------------------- */

    /**
     * The current lexed character references
     */
    let lex: string[] = [];

    /**
     * The last known token
     */
    let ltoke: string = NIL;

    /**
     * The number of line spaces incurred, ie: `parse.linesSpace`
     */
    let liner: number = parse.linesSpace;

    /**
     * The tag name or known name reference
     */
    let name: string = NIL;

    if (embed === true) {
      if (jsxbrace === true) {
        name = 'script';
      } else if (parse.scope.index > -1) {
        name = getTagName(data.token[parse.scope.index]);
      } else if (data.begin[parse.count] > 1) {
        name = getTagName(data.token[data.begin[parse.count]]);
      } else {
        name = getTagName(data.token[data.begin[parse.count]]);
      }
    }

    const square = (
      data.types[parse.count] === 'template_start' &&
      data.token[parse.count].indexOf('<!') === 0 &&
      data.token[parse.count].indexOf('<![') < 0 &&
      data.token[parse.count].charCodeAt(data.token[parse.count].length - 1) === cc.LSB
    );

    /**
     * Initial data record state for the parsed content
     */
    const record: Record = {
      begin: parse.scope.index,
      ender: -1,
      lexer: 'markup',
      lines: liner,
      stack: getTagName(parse.scope.token),
      token: NIL,
      types: 'content'
    };

    function esctest () {

      let aa = a - 1;
      let bb = 0;

      if (not(b[a - 1], cc.BWS)) return false;

      if (aa > -1) {
        do {
          if (not(b[aa], cc.BWS)) break;
          bb = bb + 1;
          aa = aa - 1;
        } while (aa > -1);
      }

      return bb % 2 === 1;

    };

    if (a < c) {

      let end = NIL;
      let quote = NIL;
      let output = NIL;
      let quotes = 0;

      do {

        if (is(b[a], cc.NWL)) parse.lineNumber = parse.lineNumber + 1;

        // Embed code requires additional parsing to look for the appropriate end
        // tag, but that end tag cannot be quoted or commented
        if (embed === true) {
          if (quote === NIL) {

            if (is(b[a], cc.FWS)) {

              if (is(b[a + 1], cc.ARS)) {
                quote = '*';
              } else if (is(b[a + 1], cc.FWS)) {
                quote = '/';
              } else if (name === 'script' && '([{!=,;.?:&<>'.indexOf(b[a - 1]) > -1) {
                if (jsx === false || not(b[a - 1], cc.LAN)) quote = 'reg';
              }

            } else if ((is(b[a], cc.DQO) || is(b[a], cc.SQO) || is(b[a], cc.TQO)) && esctest() === false) {

              quote = b[a];

            } else if (is(b[a], cc.LCB) && jsxbrace === true) {

              quotes = quotes + 1;

            } else if (is(b[a], cc.RCB) && jsxbrace === true) {

              if (quotes === 0) {

                output = lex
                  .join(NIL)
                  .replace(SpaceLead, NIL)
                  .replace(SpaceEnd, NIL);

                prettify.lexers.script(output);
                parse.scope.index += 1; // Added incremental

                if (data.types[parse.count] === 'end' && data.lexer[data.begin[parse.count] - 1] === 'script') {

                  record.lexer = 'script';
                  record.token = rules.correct === true ? ';' : 'x;';
                  record.types = 'separator';

                  push(data, record, NIL);

                  record.lexer = 'markup';

                }

                record.token = '}';
                record.types = 'script_end';

                push(data, record, NIL);

                parse.structure.pop();

                break;
              }

              quotes = quotes - 1;
            }

            if (isLiquid(data.token[parse.count], 3) === false) {

              end = b.slice(a, a + 10).join(NIL).toLowerCase();

              // script requires use of the script lexer
              if (name === 'script') {

                end = a === c - 9
                  ? end.slice(0, end.length - 1)
                  : end.slice(0, end.length - 2);

                if (end === '</script') {

                  output = lex
                    .join(NIL)
                    .replace(SpaceLead, NIL)
                    .replace(SpaceEnd, NIL);

                  a = a - 1;

                  if (lex.length < 1) break;

                  if ((/^<!--+/).test(output) && (/--+>$/).test(output)) {

                    record.token = '<!--';
                    record.types = 'comment';

                    push(data, record, NIL);

                    output = output.replace(/^<!--+/, NIL).replace(/--+>$/, NIL);

                    prettify.lexers.script(output);
                    record.token = '-->';

                    push(data, record, NIL);

                  } else {

                    options.language = language;

                    prettify.lexers.script(output);

                    if (
                      (language === 'json' && options.json.objectSort) ||
                      (language !== 'json' && options.script.objectSort)) {

                      parse.sortCorrect(0, parse.count + 1);

                    }

                    options.language = 'html';

                  }

                  break;
                }
              }

              // style requires use of the style lexer
              if (name === 'style') {

                if (a === c - 8) {
                  end = end.slice(0, end.length - 1);
                } else if (a === c - 9) {
                  end = end.slice(0, end.length - 2);
                } else {
                  end = end.slice(0, end.length - 3);
                }

                if (end === '</style') {

                  let outside = lex
                    .join(NIL)
                    .replace(SpaceLead, NIL)
                    .replace(SpaceEnd, NIL);

                  a = a - 1;

                  if (lex.length < 1) break;

                  if ((/^<!--+/).test(outside) && (/--+>$/).test(outside)) {
                    record.token = '<!--';
                    record.types = 'comment';

                    push(data, record, NIL);

                    outside = outside.replace(/^<!--+/, NIL).replace(/--+>$/, NIL);

                    prettify.lexers.style(outside);
                    record.token = '-->';

                    push(data, record, NIL);

                  } else {

                    options.language = language;
                    prettify.lexers.style(outside);

                    if (options.style.sortProperties === true) parse.sortCorrect(0, parse.count + 1);

                    options.language = 'html';

                  }

                  break;
                }
              }

            } else {

              const embed = grammar.embed('liquid', name);

              if (embed !== false && igl.has(name) === false) {

                const inner = b.slice(a).join(NIL);
                const ender = inner.search(new RegExp(`{%-?\\s*end${name}`));

                lex = lex.length > 0 ? lex.concat(lex, b.slice(a, a + ender)) : b.slice(a, a + ender);
                a = a + ender;
                end = b.slice(a).join(NIL).toLowerCase();

                if (embed.end(end)) {

                  end = end.slice(0, end.indexOf('%}') + 2);
                  output = lex.join(NIL).replace(SpaceLead, NIL).replace(SpaceEnd, NIL);

                  a = a + (end.length - 1);

                  if (lex.length < 1) break;

                  parse.lexer(output, embed.language);

                  record.token = end;
                  record.types = 'template_end';

                  push(data, record, NIL);

                }

                break;
              }

            }

          } else if (quote === b[a] && esctest() === false && (
            is(quote, cc.DQO) ||
            is(quote, cc.SQO) ||
            is(quote, cc.TQO) || (is(quote, cc.ARS) && is(b[a + 1], cc.FWS))
          )) {
            quote = NIL;
          } else if (is(quote, cc.TQO) && is(b[a], cc.DOL) && is(b[a + 1], cc.LCB) && esctest() === false) {
            quote = '}';
          } else if (is(quote, cc.RCB) && is(b[a], cc.RCB) && esctest() === false) {
            quote = '`';
          } else if (is(quote, cc.FWS) && (is(b[a], cc.NWL) || is(b[a], cc.CAR))) {
            quote = NIL;
          } else if (quote === 'reg' && is(b[a], cc.FWS) && esctest() === false) {
            quote = NIL;
          } else if (is(quote, cc.FWS) && is(b[a], cc.LAN) && is(b[a - 1], cc.DSH) && is(b[a - 2], cc.DSH)) {

            end = b.slice(a + 1, a + 11).join(NIL).toLowerCase();
            end = end.slice(0, end.length - 2);

            if (name === 'script' && end === '</script') quote = NIL;

            end = end.slice(0, end.length - 1);

            if (name === 'style' && end === '</style') quote = NIL;

          }
        }

        // typically this logic is for artifacts nested within an SGML tag
        if (square === true && is(b[a], cc.RSB)) {

          a = a - 1;

          liner = 0;
          ltoke = lex.join(NIL);
          ltoke = ltoke.replace(SpaceEnd, NIL);

          record.token = ltoke;
          push(data, record, NIL);

          break;
        }

        // general content processing
        if (embed === false && lex.length > 0 && (
          (
            is(b[a], cc.LAN) &&
            not(b[a + 1], cc.EQS) && !/[\s\d]/.test(b[a + 1])) ||
            (is(b[a], cc.LSB) && is(b[a + 1], cc.PER)) ||
            (is(b[a], cc.LCB) && (jsx === true || is(b[a + 1], cc.LCB) || is(b[a + 1], cc.PER)))
        )) {

          // Regular content
          a = a - 1;

          if (parse.scope.token === 'comment') {
            ltoke = lex.join(NIL);
          } else {
            ltoke = lex.join(NIL).replace(SpaceEnd, NIL);
          }

          // ltoke = normalize(ltoke);

          liner = 0;
          record.token = ltoke;

          if (options.wrap > 0 && rules.preserveText === false) {

            /* -------------------------------------------- */
            /* CONSTANTS                                    */
            /* -------------------------------------------- */

            const { wrap } = options;
            const store = [];

            /* -------------------------------------------- */
            /* LEXICALS                                     */
            /* -------------------------------------------- */

            let aa = wrap;
            let len = ltoke.length;

            function wrapper () {

              if (is(ltoke[aa], cc.WSP)) {
                store.push(ltoke.slice(0, aa));
                ltoke = ltoke.slice(aa + 1);
                len = ltoke.length;
                aa = wrap;
                return;
              }

              do aa = aa - 1; while (aa > 0 && not(ltoke[aa], cc.WSP));

              if (aa > 0) {

                store.push(ltoke.slice(0, aa));
                ltoke = ltoke.slice(aa + 1);
                len = ltoke.length;
                aa = wrap;

              } else {

                aa = wrap;

                do aa = aa + 1; while (aa < len && not(ltoke[aa], cc.WSP));

                store.push(ltoke.slice(0, aa));

                ltoke = ltoke.slice(aa + 1);
                len = ltoke.length;
                aa = wrap;

              }

            };

            // HTML anchor lists do not get wrapping unless the content itself exceeds
            // the wrapping limit defined in globals
            if (
              data.token[data.begin[parse.count]] === '<a>' &&
              data.token[data.begin[data.begin[parse.count]]] === '<li>' &&
              data.lines[data.begin[parse.count]] === 0 &&
              parse.linesSpace === 0 &&
              ltoke.length < options.wrap
            ) {
              push(data, record, NIL);
              break;
            }

            if (len < wrap) {

              push(data, record, NIL);
              break;
            }

            if (parse.linesSpace < 1 && parse.count > -1) {

              let bb = parse.count;

              do {

                aa = aa - data.token[bb].length;

                if (data.types[bb].indexOf('attribute') > -1) aa = aa - 1;
                if (data.lines[bb] > 0 && data.types[bb].indexOf('attribute') < 0) break;

                bb = bb - 1;

              } while (bb > 0 && aa > 0);

              if (aa < 1) aa = ltoke.indexOf(WSP);

            }

            ltoke = lex
              .join(NIL)
              .replace(SpaceLead, NIL)
              .replace(SpaceEnd, NIL)
              .replace(/\s+/g, WSP);

            do wrapper(); while (aa < len);

            if (ltoke !== NIL && not(ltoke, cc.WSP)) store.push(ltoke);

            ltoke = options.crlf === true ? store.join('\r\n') : store.join('\n');
            ltoke = NIL + ltoke + NIL;

          } else {

            const nwl = ltoke.indexOf(NWL);

            if (nwl > -1) {

              record.token = ltoke.slice(0, nwl);

              push(data, record, NIL);

              ltoke = ltoke.slice(nwl);

              const m = ltoke.match(/^\n+/);

              if (m === null) {
                record.lines = 1;
              } else {
                record.lines = 2;
                ltoke = ltoke.replace(SpaceLead, NIL);
              }
            }
          }

          liner = 0;
          record.token = ltoke;

          push(data, record, NIL);
          break;
        }

        lex.push(b[a]);

        a = a + 1;

      } while (a < c);
    }

    if (a > now && a < c) {

      if (ws(b[a])) {

        let x = a;

        parse.linesSpace = 1;

        do {
          if (is(b[x], cc.NWL)) parse.linesSpace = parse.linesSpace + 1;
          x = x - 1;
        } while (x > now && ws(b[x]));

      } else {

        parse.linesSpace = 0;
      }

    } else if (a !== now || (a === now && embed === false)) {

      // regular content at the end of the supplied source
      ltoke = lex.join(NIL).replace(SpaceEnd, NIL);
      liner = 0;

      // this condition prevents adding content that was just added in the loop above
      if (record.token !== ltoke) {
        record.token = ltoke;

        push(data, record, NIL);
        parse.linesSpace = 0;
      }
    }

    embed = false;

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

  if (options.language === 'html' || options.language === 'liquid') html = 'html';

  do {

    if (ws(b[a])) {

      parseSpace();

    } else if (embed) {

      parseContent();

    } else if (is(b[a], cc.LAN)) {

      parseToken(NIL);

    } else if (is(b[a], cc.LCB) && (jsx || is(b[a + 1], cc.LCB) || is(b[a + 1], cc.PER))) {

      parseToken(NIL);

    } else if (is(b[a], cc.DSH) && is(b[a + 1], cc.DSH) && is(b[a + 2], cc.DSH)) {

      parseToken('---');

    } else if (parse.error) {

      parseError();

      return data;

    } else {

      parseContent();

    }

    a = a + 1;

  } while (a < c);

  if (count.end !== count.start && parse.error === NIL) {

    if (count.end > count.start) {
      const x = count.end - count.start;
      const p = (x === 1) ? NIL : 's';
      parse.error = `Prettify Error (line ${count.line}):\n${x} more end type${p} than start type${p}`;
    } else {
      const x = count.start - count.end;
      const p = (x === 1) ? NIL : 's';
      parse.error = `Prettify Error (line ${count.line}):\n${x} more start type${p} than end type${p}`;
    }

  }

  // console.log(data);
  return data;

};
