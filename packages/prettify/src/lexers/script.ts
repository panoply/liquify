/* eslint-disable no-mixed-operators */
/* eslint-disable no-control-regex */

import { JSONOptions, Record, ScriptOptions, Structure } from 'types/prettify';
import { prettify } from '@prettify/model';
import { wrapCommentBlock, wrapCommentLine } from '@comments/parse';
import { parse } from '@parser/parse';
import { assign, create } from '@utils/native';
import { is, not } from '@utils/helpers';
import { cc, NIL } from '@utils/chars';

prettify.lexers.script = function script (source: string) {

  const { options } = prettify;
  const cloneopts = assign({}, options.script);

  if (options.language === 'json') {
    options.script = assign<ScriptOptions, JSONOptions, ScriptOptions>(options.script, options.json, {
      quoteConvert: 'double',
      endComma: 'never',
      noSemicolon: true,
      vertical: false
    });
  }

  /**
   * Advancement
   */
  let a = 0;

  /**
   * Last Token
   */
  let ltoke = NIL;

  /**
   * Last Type
   */
  let ltype = NIL;

  /**
   * Parse Word, ie: `for`, `if` `while` etc etc
   */
  let pword = [];

  /**
   * Parse count or similar
   */
  let lengthb = 0;

  /**
   * Hold reference of word test
   */
  let wordTest = -1;

  /**
   * Hold reference of parenthesis test
   */
  let paren = -1;

  /**
   * Function references
   */
  let funreferences = [];

  /**
   * Temporary token store
   */
  let tempstore: Record;

  /**
   * Parse Stack
   */
  let pstack: Structure;

  /**
   * Comment stack
   */
  let comment: [string, number];

  /**
   * Reference to `parse.data` - Stores the various
   * data arrays of the parse table
   */
  const { data } = parse;

  /**
   * Reference to `parse.references` - Stores the declared
   * variable names for the script lexer. This must be stored
   * outside the script lexer since some languages recursive
   * use of the script lexer
   */
  const { references } = parse;

  /**
   * The length of the document source,
   * ie: number of characters (`source.length`)
   */
  const b = source.length;
  /**
   * The document source as an array list,
   * ie: source.split('')
   */
  const c = source.split(NIL);
  const lword = [];
  const brace = [];
  const classy = [];
  const sourcemap = [ 0, NIL ];
  const datatype = [ false ];

  /**
   * Name list tests (used within `tname()`)
   * Helps determine tag names for {% %} based template tags
   *
   * @todo This needs to refactored to better support liquid
   */
  const namelist = [
    'autoescape',
    'block',
    'capture',
    'case',
    'comment',
    'embed',
    'filter',
    'for',
    'form',
    'if',
    'macro',
    'paginate',
    'raw',
    'sandbox',
    'spaceless',
    'tablerow',
    'unless',
    'verbatim'
  ];

  /**
   * Identify variable declarations
   */
  const vart: {
    count?: number[],
    index?: number[];
    len?: number;
    word?: string[];
  } = {};

  vart.count = [];
  vart.index = [];
  vart.len = -1;
  vart.word = [];

  /**
   * Automatic semicolon insertion
   */
  function asi (isEnd: boolean) {

    let aa = 0;

    const next = nextchar(1, false);
    const clist = parse.structure.length === 0 ? '' : parse.structure[parse.structure.length - 1][0];
    const record = create(null);

    record.begin = data.begin[parse.count];
    record.ender = data.begin[parse.count];
    record.lexer = data.lexer[parse.count];
    record.lines = data.lines[parse.count];
    record.stack = data.stack[parse.count];
    record.token = data.token[parse.count];
    record.types = data.types[parse.count];

    if ((/^(\/(\/|\*)\s*@prettify-ignore-start)/).test(ltoke)) return;
    if (ltype === 'start' || ltype === 'type_start') return;
    if (options.language === 'json') return;
    if (
      is(record.token, cc.SEM) ||
      is(record.token, cc.COM) ||
      record.stack === 'class' ||
      record.stack === 'map' ||
      record.stack === 'attribute' ||
      data.types[record.begin - 1] === 'generic' ||
      next === '{' ||
      clist === 'initializer'
    ) {

      return;
    }

    if (
      is(record.token, cc.RCB) &&
      data.stack[record.begin - 1] === 'global' &&
      data.types[record.begin - 1] !== 'operator' &&
      record.stack === data.stack[parse.count - 1]
    ) {

      return;
    }

    if (record.stack === 'array' && record.token !== ']') return;
    if (data.token[data.begin[parse.count]] === '{' && record.stack === 'data_type') return;

    if (
      record.types !== undefined &&
      record.types.indexOf('template') > -1 &&
      record.types.indexOf('template_string') < 0
    ) {

      return;
    }

    if (is(next, cc.SEM) && isEnd === false) return;

    if (data.lexer[parse.count - 1] !== 'script' && (
      (a < b && b === prettify.source.length - 1) ||
      b < prettify.source.length - 1
    )) {

      return;
    }

    if (is(record.token, cc.RCB) && (
      record.stack === 'function' ||
      record.stack === 'if' ||
      record.stack === 'else' ||
      record.stack === 'for' ||
      record.stack === 'do' ||
      record.stack === 'while' ||
      record.stack === 'switch' ||
      record.stack === 'class' ||
      record.stack === 'try' ||
      record.stack === 'catch' ||
      record.stack === 'finally' ||
      record.stack === 'block'
    )) {

      if (record.stack === 'function' && (
        data.stack[record.begin - 1] === 'data_type' ||
        data.types[record.begin - 1] === 'type'
      )) {

        aa = record.begin;

        do { aa = aa - 1; } while (aa > 0 && data.token[aa] !== ')' && data.stack[aa] !== 'arguments');

        aa = data.begin[aa];
      } else {

        aa = data.begin[record.begin - 1];
      }

      if (is(data.token[aa], cc.LPR)) {
        aa = aa - 1;

        if (data.token[aa - 1] === 'function') aa = aa - 1;
        if (data.stack[aa - 1] === 'object' || data.stack[aa - 1] === 'switch') return;
        if (data.token[aa - 1] !== '=' && data.token[aa - 1] !== 'return' && data.token[aa - 1] !== ':') {

          return;
        }

      } else {

        return;
      }
    }

    if (
      record.types === 'comment' ||
      clist === 'method' ||
      clist === 'paren' ||
      clist === 'expression' ||
      clist === 'array' ||
      clist === 'object' || (clist === 'switch' &&
        record.stack !== 'method' &&
        data.token[data.begin[parse.count]] === '(' &&
        data.token[data.begin[parse.count] - 1] !== 'return' &&
        data.types[data.begin[parse.count] - 1] !== 'operator'
      )
    ) {

      return;
    }

    if (data.stack[parse.count] === 'expression' && (
      data.token[data.begin[parse.count] - 1] !== 'while' || (
        data.token[data.begin[parse.count] - 1] === 'while' &&
        data.stack[data.begin[parse.count] - 2] !== 'do'
      )
    )) {

      return;
    }

    if (next !== '' && '=<>+*?|^:&%~,.()]'.indexOf(next) > -1 && isEnd === false) return;

    if (record.types === 'comment') {

      aa = parse.count;

      do {
        aa = aa - 1;
      } while (aa > 0 && data.types[aa] === 'comment');

      if (aa < 1) return;

      record.token = data.token[aa];
      record.types = data.types[aa];
      record.stack = data.stack[aa];
    }

    if (
      record.token === undefined ||
      record.types === 'start' ||
      record.types === 'separator' || (
        record.types === 'operator' &&
        record.token !== '++' &&
        record.token !== '--'
      ) ||
      record.token === 'x}' ||
      record.token === 'var' ||
      record.token === 'let' ||
      record.token === 'const' ||
      record.token === 'else' ||
      record.token.indexOf('#!/') === 0 ||
      record.token === 'instanceof'
    ) {

      return;
    }

    if (record.stack === 'method' && (
      data.token[record.begin - 1] === 'function' ||
      data.token[record.begin - 2] === 'function')
    ) {

      return;
    }

    if (options.script.variableList === 'list') vart.index[vart.len] = parse.count;

    ltoke = (options.script.correct === true) ? ';' : 'x;';
    ltype = 'separator';

    aa = parse.linesSpace;

    parse.linesSpace = 0;
    recordPush('');

    parse.linesSpace = aa;
    blockinsert();

  };

  /**
   * fixes asi location if inserted after an inserted brace
   */
  function asibrace () {

    let aa = parse.count;

    do { aa = aa - 1; } while (aa > -1 && data.token[aa] === 'x}');
    if (data.stack[aa] === 'else') return recordPush('');

    aa = aa + 1;

    parse.splice({
      data,
      howmany: 0,
      index: aa,
      record: {
        begin: data.begin[aa],
        ender: -1,
        lexer: 'script',
        lines: parse.linesSpace,
        stack: data.stack[aa],
        token: ltoke,
        types: ltype as any
      }
    });

    recordPush('');
  };

  /**
   * Cleans up improperly applied ASI
   */
  function asifix () {

    let len = parse.count;

    if (data.types[len] === 'comment') {
      do { len = len - 1; } while (len > 0 && data.types[len] === 'comment');
    }

    if (data.token[len] === 'from') len = len - 2;

    if (data.token[len] === 'x;') {
      parse.splice({
        data,
        howmany: 1,
        index: len
      });
    }
  };

  /**
   * Block comments
   */
  function blockComment () {

    asi(false);

    if (wordTest > -1) word();

    comment = wrapCommentBlock({
      chars: c,
      end: b,
      lexer: 'script',
      begin: '/*',
      start: a,
      ender: '\u002a/'
    });

    a = comment[1];

    if (
      data.token[parse.count] === 'var' ||
      data.token[parse.count] === 'let' ||
      data.token[parse.count] === 'const'
    ) {

      tempstore = parse.pop(data);

      recordPush('');

      parse.push(data, tempstore, '');

      if (data.lines[parse.count - 2] === 0) data.lines[parse.count - 2] = data.lines[parse.count];

      data.lines[parse.count] = 0;

    } else if (comment[0] !== '') {

      ltoke = comment[0];
      ltype = (/^\/\*\s*@prettify-ignore-start/).test(ltoke) ? 'ignore' : 'comment';

      if (ltoke.indexOf('# sourceMappingURL=') === 2) {
        sourcemap[0] = parse.count + 1;
        sourcemap[1] = ltoke;
      }

      parse.push(data, {
        begin: parse.structure[parse.structure.length - 1][1],
        ender: -1,
        lexer: 'script',
        lines: parse.linesSpace,
        stack: parse.structure[parse.structure.length - 1][0],
        token: ltoke,
        types: ltype as any
      }, '');
    }

    if ((/\/\*\s*global\s+/).test(data.token[parse.count]) === true && data.types.indexOf('word') < 0) {

      references[0] = data.token[parse.count]
        .replace(/\/\*\s*global\s+/, '')
        .replace('\u002a/', '')
        .replace(/,\s+/g, ',').split(',');
    }
  };

  /**
   * Inserts ending curly brace (where absent)
   */
  function blockinsert () {

    let name = '';

    const next = nextchar(5, false);
    const g = parse.count;
    const lines = parse.linesSpace;

    if (
      options.language === 'json' ||
      brace.length < 1 ||
      brace[brace.length - 1].charAt(0) !== 'x' ||
      (/^x?(;|\}|\))$/).test(ltoke) === false
    ) {

      return;
    }

    if (data.stack[parse.count] === 'do' && next === 'while' && data.token[parse.count] === '}') {
      return;
    }

    if (ltoke === ';' && data.token[g - 1] === 'x{') {

      name = data.token[data.begin[g - 2] - 1];

      if (data.token[g - 2] === 'do' || (data.token[g - 2] === ')' && 'ifforwhilecatch'.indexOf(name) > -1)) {

        tempstore = parse.pop(data);
        ltoke = (options.script.correct === true) ? '}' : 'x}';
        ltype = 'end';
        pstack = parse.structure[parse.structure.length - 1];
        recordPush('');
        brace.pop();
        parse.linesSpace = lines;
        return;
      }

      // to prevent the semicolon from inserting between the braceAllman --> while (x) {};
      tempstore = parse.pop(data);
      ltoke = (options.script.correct === true) ? '}' : 'x}';
      ltype = 'end';
      pstack = parse.structure[parse.structure.length - 1];

      recordPush('');
      brace.pop();

      ltoke = ';';
      ltype = 'end';

      parse.push(data, tempstore, '');
      parse.linesSpace = lines;

      return;
    }

    ltoke = (options.script.correct === true) ? '}' : 'x}';
    ltype = 'end';

    if (data.token[parse.count] === 'x}') return;

    if (data.stack[parse.count] === 'if' && (
      data.token[parse.count] === ';' ||
      data.token[parse.count] === 'x;'
    ) && next === 'else') {

      pstack = parse.structure[parse.structure.length - 1];
      recordPush('');
      brace.pop();
      parse.linesSpace = lines;

      return;
    }

    do {

      pstack = parse.structure[parse.structure.length - 1];
      recordPush('');
      brace.pop();

      if (data.stack[parse.count] === 'do') break;

    } while (brace[brace.length - 1] === 'x{');

    parse.linesSpace = lines;

  };

  /**
   * Ensures that commas immediately precede comments
   * instead of immediately follow
   */
  function commaComment () {

    let x = parse.count;

    if (data.stack[x] === 'object' && options.script.objectSort === true) {

      ltoke = ',';
      ltype = 'separator';
      asifix();
      recordPush('');

    } else {

      do { x = x - 1; } while (x > 0 && data.types[x - 1] === 'comment');

      parse.splice({
        data
        , howmany: 0
        , index: x
        , record: {
          begin: data.begin[x]
          , ender: -1
          , lexer: 'script'
          , lines: parse.linesSpace
          , stack: data.stack[x]
          , token: ','
          , types: 'separator'
        }
      });

      recordPush('');
    }
  };

  /**
   * Operations for end types:
   *
   * - `)`
   * - `]`
   * - `}`
   */
  function end (x: string) {

    let insert = false;
    let newarr = false;

    const next = nextchar(1, false);
    const count = data.token[parse.count] === '(' ? parse.count : data.begin[parse.count];

    function newarray () {

      let arraylen = 0;

      const ar = (data.token[count - 1] === 'Array');
      const startar = (ar === true) ? '[' : '{';
      const endar = (ar === true) ? ']' : '}';
      const namear = (ar === true) ? 'array' : 'object';

      if (ar === true && data.types[parse.count] === 'number') {
        arraylen = Number(data.token[parse.count]);
        tempstore = parse.pop(data);
      }

      tempstore = parse.pop(data);
      tempstore = parse.pop(data);
      tempstore = parse.pop(data);

      parse.structure.pop();

      ltoke = startar;
      ltype = 'start';

      recordPush(namear);

      if (arraylen > 0) {

        ltoke = ',';
        ltype = 'separator';

        do {
          recordPush('');
          arraylen = arraylen - 1;
        } while (arraylen > 0);
      }

      ltoke = endar;
      ltype = 'end';

      recordPush('');
    };

    if (wordTest > -1) word();

    if (classy.length > 0) {

      if (classy[classy.length - 1] === 0) {
        classy.pop();
      } else {
        classy[classy.length - 1] = classy[classy.length - 1] - 1;
      }
    }

    if (is(x, cc.RPR) || x === 'x)' || is(x, cc.RSB)) {
      if (options.script.correct === true) plusplus();
      asifix();
    }

    if (is(x, cc.RPR) || x === 'x)') asi(false);

    if (vart.len > -1) {
      if (is(x, cc.RCB) && (
        (options.script.variableList === 'list' && vart.count[vart.len] === 0) ||
        (data.token[parse.count] === 'x;' && options.script.variableList === 'each')
      )) {

        vartpop();
      }

      vart.count[vart.len] = vart.count[vart.len] - 1;

      if (vart.count[vart.len] < 0) vartpop();

    }

    if (
      is(ltoke, cc.COM) &&
      data.stack[parse.count] !== 'initializer' &&
      ((is(x, cc.RSB) && is(data.token[parse.count - 1], cc.LSB)) || is(x, cc.RCB))
    ) {

      tempstore = parse.pop(data);
    }

    if (is(x, cc.RPR) || x === 'x)') {

      ltoke = x;

      if (lword.length > 0) {

        pword = lword[lword.length - 1];

        if (pword.length > 1 &&
          not(next, cc.LCB) && (
          pword[0] === 'if' ||
            pword[0] === 'for' ||
            pword[0] === 'with' || (
            pword[0] === 'while' &&
              data.stack[pword[1] - 2] !== undefined &&
              data.stack[pword[1] - 2] !== 'do'
          )
        )) {

          insert = true;
        }
      }

    } else if (is(x, cc.RSB)) {

      ltoke = ']';

    } else if (is(x, cc.RCB)) {

      if (not(ltoke, cc.COM) && options.script.correct === true) plusplus();
      if (parse.structure.length > 0 && parse.structure[parse.structure.length - 1][0] !== 'object') asi(true);
      if ((
        options.script.objectSort === true || (
          options.language === 'json' &&
          options.json.objectSort === true
        )
      ) && parse.structure[parse.structure.length - 1][0] === 'object') {

        parse.sortObject(data);

      }

      if (ltype === 'comment') {
        ltoke = data.token[parse.count];
        ltype = data.types[parse.count];
      }

      ltoke = '}';
    }

    if (parse.structure[parse.structure.length - 1][0] === 'data_type') {
      ltype = 'type_end';
    } else {
      ltype = 'end';
    }

    lword.pop();
    pstack = parse.structure[parse.structure.length - 1];

    if (
      is(x, cc.RPR) &&
      options.script.correct === true &&
      count - parse.count < 2 && (
        is(data.token[parse.count], cc.LPR) ||
        data.types[parse.count] === 'number'
      ) && (
        data.token[count - 1] === 'Array' ||
        data.token[count - 1] === 'Object'
      ) && data.token[count - 2] === 'new'
    ) {

      newarray();
      newarr = true;
    }

    if (brace[brace.length - 1] === 'x{' && is(x, cc.RCB)) {

      blockinsert();
      brace.pop();

      if (data.stack[parse.count] !== 'try') {
        if (not(next, cc.COL) && not(next, cc.SEM) && data.token[data.begin[a] - 1] !== '?') blockinsert();
      }

      ltoke = '}';

    } else {

      brace.pop();
    }

    // options.endComma
    if (
      options.script.endComma !== undefined &&
      options.script.endComma !== 'none' &&
      parse.structure[parse.structure.length - 1][0] === 'array' ||
      parse.structure[parse.structure.length - 1][0] === 'object' ||
      parse.structure[parse.structure.length - 1][0] === 'data_type'
    ) {

      if (
        options.script.endComma === 'always' &&
        data.token[parse.count] !== ','
      ) {

        const begin = parse.structure[parse.structure.length - 1][1];
        let y = parse.count;

        do {
          if (data.begin[y] === begin) {
            if (is(data.token[y], cc.COM)) break;
          } else {
            y = data.begin[y];
          }

          y = y - 1;

        } while (y > begin);

        if (y > begin) {

          const type = ltype;
          const toke = ltoke;

          ltoke = ',';
          ltype = 'separator';

          recordPush('');

          ltoke = toke;
          ltype = type;
        }

      } else if (options.script.endComma === 'never' && is(data.token[parse.count], cc.COM)) {

        parse.pop(data);
      }
    }

    if (newarr === false) {
      recordPush('');
      if (
        ltoke === '}' &&
        data.stack[parse.count] !== 'object' &&
        data.stack[parse.count] !== 'class' &&
        data.stack[parse.count] !== 'data_type'
      ) {
        references.pop();
        blockinsert();
      }
    }

    if (insert === true) {

      ltoke = (options.script.correct === true) ? '{' : 'x{';
      ltype = 'start';

      recordPush(pword[0]);

      brace.push('x{');
      pword[1] = parse.count;
    }

    datatype.pop();

    if (parse.structure[parse.structure.length - 1][0] !== 'data_type') datatype[datatype.length - 1] = false;

  };

  /**
   * The general function is a generic tokenizer start argument contains
   * the token's starting syntax offset argument is length of start minus
   * control chars end is how is to identify where the token ends
   */
  function general (starting: string, ending: string, type: string) {

    let ee = 0;
    let escape = false;
    let ext = false;
    let build = [ starting ];
    let temp: string[];

    const ender = ending.split(NIL);
    const endlen = ender.length;
    const start = a;
    const base = a + starting.length;
    const qc = (options.script.quoteConvert === undefined)
      ? 'none'
      : options.script.quoteConvert;

    function cleanUp () {

      let linesSpace = 0;

      build = [];
      ltype = type;
      ee = a;

      if (type === 'string' && (/\s/).test(c[ee + 1]) === true) {

        linesSpace = 1;

        do {
          ee = ee + 1;
          if (c[ee] === '\n') linesSpace = linesSpace + 1;
        } while (ee < b && (/\s/).test(c[ee + 1]) === true);

        parse.linesSpace = linesSpace;
      }
    };

    function finish () {

      let str = NIL;

      /**
       * Pads certain template tag delimiters with a space
       */
      function bracketSpace (input: string) {

        if (
          options.language !== 'javascript' &&
          options.language !== 'typescript' &&
          options.language !== 'jsx' &&
          options.language !== 'tsx'
        ) {

          const spaceStart = (start: string) => start.replace(/\s*$/, ' ');
          const spaceEnd = (end: string) => end.replace(/^\s*/, ' ');

          if ((/\{(#|\/|(%>)|(%\]))/).test(input) || (/\}%(>|\])/).test(input)) return input;

          input = input.replace(/\{((\{+)|%-?)\s*/g, spaceStart);
          input = input.replace(/\s*((\}\}+)|(-?%\}))/g, spaceEnd);

          return input;
        }

        return input;
      };

      if (is(starting, cc.DQO) && qc === 'single') {

        build[0] = "'";
        build[build.length - 1] = "'";

      } else if (is(starting, cc.SQO) && qc === 'double') {

        build[0] = '"';
        build[build.length - 1] = '"';

      } else if (escape === true) {

        str = build[build.length - 1];
        build.pop();
        build.pop();
        build.push(str);

      }

      a = ee;

      if (ending === '\n') {
        a = a - 1;
        build.pop();
      }

      ltoke = build.join(NIL);

      if (
        is(starting, cc.DQO) ||
        is(starting, cc.SQO) ||
        starting === '{{' ||
        starting === '{%'
      ) {

        ltoke = bracketSpace(ltoke);
      }

      if (starting === '{%' || starting === '{{') {

        temp = tname(ltoke);
        ltype = temp[0];

        recordPush(temp[1]);

        return;
      }

      if (type === 'string') {

        ltype = 'string';

        if (options.language === 'json') {

          ltoke = ltoke
            .replace(/\u0000/g, '\\u0000')
            .replace(/\u0001/g, '\\u0001')
            .replace(/\u0002/g, '\\u0002')
            .replace(/\u0003/g, '\\u0003')
            .replace(/\u0004/g, '\\u0004')
            .replace(/\u0005/g, '\\u0005')
            .replace(/\u0006/g, '\\u0006')
            .replace(/\u0007/g, '\\u0007')
            .replace(/\u0008/g, '\\u0008')
            .replace(/\u0009/g, '\\u0009')
            .replace(/\u000a/g, '\\u000a')
            .replace(/\u000b/g, '\\u000b')
            .replace(/\u000c/g, '\\u000c')
            .replace(/\u000d/g, '\\u000d')
            .replace(/\u000e/g, '\\u000e')
            .replace(/\u000f/g, '\\u000f')
            .replace(/\u0010/g, '\\u0010')
            .replace(/\u0011/g, '\\u0011')
            .replace(/\u0012/g, '\\u0012')
            .replace(/\u0013/g, '\\u0013')
            .replace(/\u0014/g, '\\u0014')
            .replace(/\u0015/g, '\\u0015')
            .replace(/\u0016/g, '\\u0016')
            .replace(/\u0017/g, '\\u0017')
            .replace(/\u0018/g, '\\u0018')
            .replace(/\u0019/g, '\\u0019')
            .replace(/\u001a/g, '\\u001a')
            .replace(/\u001b/g, '\\u001b')
            .replace(/\u001c/g, '\\u001c')
            .replace(/\u001d/g, '\\u001d')
            .replace(/\u001e/g, '\\u001e')
            .replace(/\u001f/g, '\\u001f');

        } else if (starting.indexOf('#!') === 0) {

          ltoke = ltoke.slice(0, ltoke.length - 1);
          parse.linesSpace = 2;

        } else if (
          parse.structure[parse.structure.length - 1][0] !== 'object' || (
            parse.structure[parse.structure.length - 1][0] === 'object' &&
            nextchar(1, false) !== ':' &&
            not(data.token[parse.count], cc.COM) &&
            not(data.token[parse.count], cc.LCB)
          )
        ) {

          if ((ltoke.length > options.wrap && options.wrap > 0) || (
            options.wrap !== 0 &&
            data.token[parse.count] === '+' && (
              data.token[parse.count - 1].charAt(0) === '"' ||
              data.token[parse.count - 1].charAt(0) === "'"
            )
          )) {

            let item = ltoke;
            let segment = '';
            let q = (qc === 'double') ? '"' : (qc === 'single') ? "'" : item.charAt(0);

            const limit = options.wrap;
            const uchar = (/u[0-9a-fA-F]{4}/);
            const xchar = (/x[0-9a-fA-F]{2}/);

            item = item.slice(1, item.length - 1);

            if (
              data.token[parse.count] === '+' && (
                data.token[parse.count - 1].charAt(0) === '"' ||
                data.token[parse.count - 1].charAt(0) === "'"
              )
            ) {

              parse.pop(data);

              q = data.token[parse.count].charAt(0);
              item = data.token[parse.count].slice(1, data.token[parse.count].length - 1) + item;

              parse.pop(data);
            }

            if (item.length > limit && limit > 0) {

              do {

                segment = item.slice(0, limit);

                if (
                  segment.charAt(limit - 5) === '\\' &&
                  uchar.test(item.slice(limit - 4, limit + 1))
                ) {

                  segment = segment.slice(0, limit - 5);

                } else if (
                  segment.charAt(limit - 4) === '\\' &&
                  uchar.test(item.slice(limit - 3, limit + 2))
                ) {

                  segment = segment.slice(0, limit - 4);

                } else if (
                  segment.charAt(limit - 3) === '\\' &&
                  (uchar.test(item.slice(limit - 2, limit + 3)) || xchar.test(item.slice(limit - 2, limit + 1)))
                ) {

                  segment = segment.slice(0, limit - 3);

                } else if (
                  segment.charAt(limit - 2) === '\\' &&
                  (uchar.test(item.slice(limit - 1, limit + 4)) || xchar.test(item.slice(limit - 1, limit + 2)))
                ) {

                  segment = segment.slice(0, limit - 2);

                } else if (segment.charAt(limit - 1) === '\\') {

                  segment = segment.slice(0, limit - 1);
                }

                segment = q + segment + q;
                item = item.slice(segment.length - 2);
                ltoke = segment;
                ltype = 'string';

                recordPush(NIL);

                parse.linesSpace = 0;
                ltoke = '+';
                ltype = 'operator';

                recordPush(NIL);

              } while (item.length > limit);
            }

            if (item === NIL) {
              ltoke = q + q;
            } else {
              ltoke = q + item + q;
            }

            ltype = 'string';
          }
        }

      } else if ((/\{\s*\?>$/).test(ltoke)) {

        ltype = 'template_start';

      } else {

        ltype = type;
      }

      if (ltoke.length > 0) recordPush(NIL);

    };

    if (wordTest > -1) word();

    // This insanity is for JSON where all the
    // required quote characters are escaped.
    if (c[a - 1] === '\\' && slashes(a - 1) === true && (is(c[a], cc.DQO) || is(c[a], cc.SQO))) {

      parse.pop(data);

      if (is(data.token[0], cc.LCB)) {
        if (is(c[a], cc.DQO)) {
          starting = '"';
          ending = '\\"';
          build = [ '"' ];
        } else {
          starting = "'";
          ending = "\\'";
          build = [ "'" ];
        }

        escape = true;

      } else {

        if (is(c[a], cc.DQO)) {
          build = [ '\\"' ];
          finish();
          return;
        }

        build = [ "\\'" ];
        finish();
        return;
      }
    }

    ee = base;

    if (ee < b) {

      do {

        if (
          not(data.token[0], cc.LCB) &&
          not(data.token[0], cc.LSB) &&
          qc !== 'none' && (
            is(c[ee], cc.DQO) ||
            is(c[ee], cc.SQO)
          )
        ) {

          if (c[ee - 1] === '\\') {
            if (slashes(ee - 1) === true) {
              if (qc === 'double' && is(c[ee], cc.SQO)) {
                build.pop();
              } else if (qc === 'single' && is(c[ee], cc.DQO)) {
                build.pop();
              }
            }

          } else if (qc === 'double' && is(c[ee], cc.DQO) && is(c[a], cc.SQO)) {
            c[ee] = '\\"';
          } else if (qc === 'single' && is(c[ee], cc.SQO) && is(c[a], cc.DQO)) {
            c[ee] = "\\'";
          }

          build.push(c[ee]);

        } else if (ee > start) {

          ext = true;

          if (is(c[ee], cc.LCB) && is(c[ee + 1], cc.PER) && c[ee + 2] !== starting) {

            finish();
            general('{%', '%}', 'template');
            cleanUp();

          } else if (is(c[ee], cc.LCB) && is(c[ee + 1], cc.LCB) && c[ee + 2] !== starting) {

            finish();
            general('{{', '}}', 'template');
            cleanUp();

          } else {
            ext = false;
            build.push(c[ee]);
          }

        } else {

          build.push(c[ee]);
        }

        if (
          options.language !== 'json' &&
          options.language !== 'javascript' &&
          (is(starting, cc.DQO) || is(starting, cc.SQO)) &&
          (ext === true || ee > start) &&
          c[ee - 1] !== '\\' &&
          not(c[ee], cc.DQO) &&
          not(c[ee], cc.SQO) &&
          (is(c[ee], cc.NWL) || (ee === b - 1) === true)
        ) {

          parse.error = 'Unterminated string in script on line number ' + parse.lineNumber;
          break;

        }

        if (c[ee] === ender[endlen - 1] && (c[ee - 1] !== '\\' || slashes(ee - 1) === false)) {

          if (endlen === 1) break;

          // `ee - base` is a cheap means of computing length of build array the `ee -
          // base` and `endlen` are both length based values, so adding two (1 for each)
          // provides an index based number
          if (build[ee - base] === ender[0] && build.slice(ee - base - endlen + 2).join('') === ending) break;

        }

        ee = ee + 1;

      } while (ee < b);
    }

    finish();
  };

  // line comments
  function lineComment () {

    asi(false);
    blockinsert();

    if (wordTest > -1) word();

    comment = wrapCommentLine({
      chars: c,
      end: b,
      lexer: 'script',
      begin: '//',
      start: a,
      ender: '\n'
    });

    a = comment[1];

    if (comment[0] !== '') {
      ltoke = comment[0];
      ltype = (/^(\/\/\s*@prettify-ignore-start)/).test(ltoke)
        ? 'ignore'
        : 'comment';
      if (ltoke.indexOf('# sourceMappingURL=') === 2) {
        sourcemap[0] = parse.count + 1;
        sourcemap[1] = ltoke;
      }
      parse.push(data, {
        begin: parse.structure[parse.structure.length - 1][1]
        , ender: -1
        , lexer: 'script'
        , lines: parse.linesSpace
        , stack: parse.structure[parse.structure.length - 1][0]
        , token: ltoke
        , types: ltype as any
      }, '');
    }
  };

  /**
   * Identifies blocks of markup embedded within JavaScript
   * for language super sets like React JSX.
   */
  function lexerMarkup () {

    let d = 0;
    let curlytest = false;
    let endtag = false;
    let anglecount = 0;
    let curlycount = 0;
    let tagcount = 0;
    let next = '';
    let priorToken = '';
    let priorType = '';

    const output = [];
    const dt = datatype[datatype.length - 1];
    const syntaxnum = '0123456789=<>+-*?|^:&.,;%(){}[]~';

    function applyMarkup () {

      if (ltoke === '(') parse.structure[parse.structure.length - 1] = [ 'paren', parse.count ];

      // console.log(output.join(''));
      prettify.lexers.markup(output.join(''));

    };

    if (wordTest > -1) word();

    // type generics tokenizer
    priorToken = (parse.count > 0) ? data.token[parse.count - 1] : '';
    priorType = (parse.count > 0) ? data.types[parse.count - 1] : '';
    next = nextchar(1, false);

    if (
      options.language !== 'jsx' &&
      options.language !== 'tsx' &&
      (/\d/).test(next) === false &&
      (
        ltoke === 'function' ||
        priorToken === '=>' ||
        priorToken === 'void' ||
        priorToken === '.' ||
        data.stack[parse.count] === 'arguments' ||
        (ltype === 'type' && priorToken === 'type') ||
        (ltype === 'reference' && (
          priorType === 'operator' ||
          priorToken === 'function' ||
          priorToken === 'class' ||
          priorToken === 'new'
        )) ||
        (ltype === 'type' && priorType === 'operator') ||
        ltoke === 'return' ||
        ltype === 'operator'
      )
    ) {

      const build = [];

      let inc = 0;
      let e = 0;

      d = a;

      do {

        build.push(c[d]);
        if (c[d] === '<') {
          inc = inc + 1;
        } else if (c[d] === '>') {
          inc = inc - 1;
          if (inc < 1) break;
        }

        d = d + 1;

      } while (d < b);

      e = a;
      a = d;

      next = nextchar(1, false);

      if (c[d] === '>' && (
        dt === true ||
        priorToken === '=>' ||
        priorToken === '.' ||
        priorType !== 'operator' ||
        (priorType === 'operator' && (next === '(' || next === '='))
      )) {

        ltype = 'generic';
        ltoke = build
          .join('')
          .replace(/^<\s+/, '<')
          .replace(/\s+>$/, '>')
          .replace(/,\s*/g, ', ');

        recordPush('');

        return;
      }
      a = e;
    }

    d = parse.count;

    if (data.types[d] === 'comment') {
      do { d = d - 1; } while (d > 0 && data.types[d] === 'comment');
    }

    if (
      dt === false &&
      nextchar(1, false) !== '>' &&
      (
        (c[a] !== '<' && syntaxnum.indexOf(c[a + 1]) > -1) ||
        data.token[d] === '++' ||
        data.token[d] === '--' ||
        /\s/.test(c[a + 1]) === true ||
        (/\d/.test(c[a + 1]) === true && (
          ltype === 'operator' ||
          ltype === 'string' ||
          ltype === 'number' ||
          ltype === 'reference' ||
          (ltype === 'word' && ltoke !== 'return')
        ))
      )
    ) {

      ltype = 'operator';
      ltoke = operator();

      return recordPush('');
    }

    if (
      options.language !== 'typescript' && (
        data.token[d] === 'return' ||
        data.types[d] === 'operator' ||
        data.types[d] === 'start' ||
        data.types[d] === 'separator' ||
        data.types[d] === 'jsx_attribute_start' || (
          data.token[d] === '}' &&
          parse.structure[parse.structure.length - 1][0] === 'global'
        )
      )
    ) {

      ltype = 'markup';
      options.language = 'jsx';

      do {

        output.push(c[a]);

        if (c[a] === '{') {

          curlycount = curlycount + 1;
          curlytest = true;

        } else if (c[a] === '}') {

          curlycount = curlycount - 1;

          if (curlycount === 0) curlytest = false;

        } else if (c[a] === '<' && curlytest === false) {

          if (c[a + 1] === '<') {

            do {
              output.push(c[a]);
              a = a + 1;
            } while (a < b && c[a + 1] === '<');
          }

          anglecount = anglecount + 1;

          if (nextchar(1, false) === '/') endtag = true;

        } else if (c[a] === '>' && curlytest === false) {

          if (c[a + 1] === '>') {
            do {
              output.push(c[a]);
              a = a + 1;
            } while (c[a + 1] === '>');
          }

          anglecount = anglecount - 1;

          if (endtag === true) {
            tagcount = tagcount - 1;
          } else if (c[a - 1] !== '/') {
            tagcount = tagcount + 1;
          }

          if (anglecount === 0 && curlycount === 0 && tagcount < 1) {

            next = nextchar(2, false);

            // if followed by nonmarkup
            if (next.charAt(0) !== '<') return applyMarkup();

            // catch additional trailing tag sets
            if (
              next.charAt(0) === '<' &&
              syntaxnum.indexOf(next.charAt(1)) < 0 &&
              /\s/.test(next.charAt(1)) === false) {

              // perform a minor safety test to verify if "<" is a tag start
              // or a less than operator
              d = a + 1;

              do {

                d = d + 1;
                if (c[d] === '>' || ((/\s/).test(c[d - 1]) && syntaxnum.indexOf(c[d]) < 0)) break;

                // if followed by additional markup tags
                if (syntaxnum.indexOf(c[d]) > -1) return applyMarkup();

              } while (d < b);

            } else {

              return applyMarkup(); // if a nonmarkup "<" follows markup
            }
          }

          endtag = false;
        }

        a = a + 1;

      } while (a < b);

      return applyMarkup();
    }

    ltype = 'operator';
    ltoke = operator();

    recordPush('');

  };

  /**
   * Peek at whats up next
   */
  function nextchar (len: number, current: boolean) {

    let cc = (current === true) ? a : a + 1;
    let dd = '';

    if (typeof len !== 'number' || len < 1) len = 1;

    if (c[a] === '/') {
      if (c[a + 1] === '/') {
        dd = '\n';
      } else if (c[a + 1] === '*') {
        dd = '/';
      }
    }

    if (cc < b) {
      do {
        if ((/\s/).test(c[cc]) === false) {

          if (c[cc] === '/') {
            if (dd === '') {

              if (c[cc + 1] === '/') {
                dd = '\n';
              } else if (c[cc + 1] === '*') {
                dd = '/';
              }

            } else if (dd === '/' && c[cc - 1] === '*') {
              dd = '';
            }
          }

          if (dd === '' && c[cc - 1] + c[cc] !== '\u002a/') return c.slice(cc, cc + len).join('');

        } else if (dd === '\n' && c[cc] === '\n') {
          dd = '';
        }

        cc = cc + 1;
      } while (cc < b);
    }

    return '';
  };

  /**
   * Tokenizer for numbers
   */
  function numb () {

    const f = b;
    const build = [ c[a] ];

    let ee = 0;
    let test = /zz/;
    let dot = (build[0] === '.');

    if (a < b - 2 && c[a] === '0') {
      if (c[a + 1] === 'x') {
        test = /[0-9a-fA-F]/;
      } else if (c[a + 1] === 'o') {
        test = /[0-9]/;
      } else if (c[a + 1] === 'b') {
        test = /0|1/;
      }

      if (test.test(c[a + 2]) === true) {

        build.push(c[a + 1]);
        ee = a + 1;

        do {
          ee = ee + 1;
          build.push(c[ee]);
        } while (test.test(c[ee + 1]) === true);

        a = ee;
        return build.join('');
      }
    }

    ee = a + 1;

    if (ee < f) {
      do {

        if ((/[0-9]/).test(c[ee]) || (c[ee] === '.' && dot === false)) {
          build.push(c[ee]);
          if (c[ee] === '.') dot = true;
        } else {
          break;
        }

        ee = ee + 1;
      } while (ee < f);
    }

    if (ee < f - 1 && (
      /\d/.test(c[ee - 1]) === true || (
        /\d/.test(c[ee - 2]) === true && (
          c[ee - 1] === '-' ||
          c[ee - 1] === '+'
        )
      )) && (
      c[ee] === 'e' ||
        c[ee] === 'E'
    )) {

      build.push(c[ee]);

      if (c[ee + 1] === '-' || c[ee + 1] === '+') {
        build.push(c[ee + 1]);
        ee = ee + 1;
      }

      dot = false;
      ee = ee + 1;

      if (ee < f) {
        do {
          if ((/[0-9]/).test(c[ee]) || (c[ee] === '.' && dot === false)) {
            build.push(c[ee]);
            if (c[ee] === '.') dot = true;
          } else {
            break;
          }
          ee = ee + 1;
        } while (ee < f);
      }
    }
    a = ee - 1;
    return build.join('');
  };

  /**
   * A unique tokenizer for operator characters
   */
  function operator () {

    let g = 0;
    let h = 0;
    let jj = b;
    let output = '';

    const syntax = [
      '=',
      '<',
      '>',
      '+',
      '*',
      '?',
      '|',
      '^',
      ':',
      '&',
      '%',
      '~'
    ];

    const synlen = syntax.length;

    if (wordTest > -1) word();

    if (c[a] === '/' && (parse.count > -1 && ((ltype !== 'word' && ltype !== 'reference') ||
      ltoke === 'typeof' ||
      ltoke === 'return' ||
      ltoke === 'else'
    ) && ltype !== 'number' &&
      ltype !== 'string' &&
      ltype !== 'end'
    )) {

      if (ltoke === 'return' || ltoke === 'typeof' || ltoke === 'else' || ltype !== 'word') {
        ltoke = regex();
        ltype = 'regex';
      } else {
        ltoke = '/';
        ltype = 'operator';
      }

      recordPush('');

      return 'regex';
    }

    if (
      c[a] === '?' &&
      ('+-\u002a/.?'.indexOf(c[a + 1]) > -1 || (
        c[a + 1] === ':' &&
        syntax.join('').indexOf(c[a + 2]) < 0
      ))
    ) {

      if (c[a + 1] === '.' && (/\d/).test(c[a + 2]) === false) {
        output = '?.';
      } else if (c[a + 1] === '?') {
        output = '??';
      }

      if (output === '') return '?';
    }

    if (c[a] === ':' && '+-\u002a/'.indexOf(c[a + 1]) > -1) return ':';

    if (a < b - 1) {

      if (c[a] !== '<' && c[a + 1] === '<') return c[a];
      if (c[a] === '!' && c[a + 1] === '/') return '!';
      if (c[a] === '-') {

        datatype[datatype.length - 1] = false;

        if (c[a + 1] === '-') {
          output = '--';
        } else if (c[a + 1] === '=') {
          output = '-=';
        } else if (c[a + 1] === '>') {
          output = '->';
        }

        if (output === '') return '-';
      }

      if (c[a] === '+') {

        datatype[datatype.length - 1] = false;

        if (c[a + 1] === '+') {
          output = '++';
        } else if (c[a + 1] === '=') {
          output = '+=';
        }

        if (output === '') return '+';
      }

      if (c[a] === '=' && c[a + 1] !== '=' && c[a + 1] !== '!' && c[a + 1] !== '>') {
        datatype[datatype.length - 1] = false;
        return '=';
      }
    }

    if (c[a] === ':') {

      if (options.language === 'typescript') {

        if (data.stack[parse.count] === 'arguments') {

          if (data.token[parse.count] === '?') {
            parse.pop(data);
            output = '?:';
            a = a - 1;
          }

          datatype[datatype.length - 1] = true;

        } else if (ltoke === ')' && (
          data.token[data.begin[parse.count] - 1] === 'function' ||
          data.token[data.begin[parse.count] - 2] === 'function'
        )) {

          datatype[datatype.length - 1] = true;

        } else if (ltype === 'reference') {

          g = parse.count;

          let colon = false;

          do {
            if (data.begin[g] === data.begin[parse.count]) {

              if (g < parse.count && data.token[g] === ':' && data.types[g + 1] !== 'type') colon = true;

              if (data.token[g] === '?' && colon === false) break;
              if (data.token[g] === ';' || data.token[g] === 'x;') break;

              if (
                data.token[g] === 'var' ||
                data.token[g] === 'let' ||
                data.token[g] === 'const' || data.types[g] === 'type'
              ) {

                datatype[datatype.length - 1] = true;
                break;
              }

            } else {

              if (data.types[g] === 'type_end') {
                datatype[datatype.length - 1] = true;
                break;
              }

              g = data.begin[g];
            }

            g = g - 1;

          } while (g > data.begin[parse.count]);
        }

      } else if (data.token[parse.count - 1] === '[' && (
        data.types[parse.count] === 'word' ||
        data.types[parse.count] === 'reference'
      )) {

        parse.structure[parse.structure.length - 1][0] = 'attribute';
        data.stack[parse.count] = 'attribute';
      }
    }

    if (output === '') {

      if (
        (c[a + 1] === '+' && c[a + 2] === '+') ||
        (c[a + 1] === '-' && c[a + 2] === '-')
      ) {

        output = c[a];
      } else {

        const buildout = [ c[a] ];

        g = a + 1;

        if (g < jj) {
          do {

            if ((c[g] === '+' && c[g + 1] === '+') || (c[g] === '-' && c[g + 1] === '-')) break;

            h = 0;

            if (h < synlen) {
              do {
                if (c[g] === syntax[h]) {
                  buildout.push(syntax[h]);
                  break;
                }

                h = h + 1;
              } while (h < synlen);
            }

            if (h === synlen) break;

            g = g + 1;
          } while (g < jj);
        }

        output = buildout.join('');
      }
    }

    a = a + (output.length - 1);

    if (output === '=>' && ltoke === ')') {

      g = parse.count;
      jj = data.begin[g];

      do {

        if (data.begin[g] === jj) data.stack[g] = 'method';
        g = g - 1;

      } while (g > jj - 1);
    }

    return output;
  };

  /**
   * Convert `++` and `--` into `"= x +"`  and `"= x -"` in most cases
   */
  function plusplus () {

    let pre = true;
    let toke = '+';
    let tokea = '';
    let tokeb = '';
    let tokec = '';
    let inc = 0;
    let ind = 0;
    let walk = 0;
    let next = '';

    const store = [];

    function end () {
      walk = data.begin[walk] - 1;
      if (data.types[walk] === 'end') {
        end();
      } else if (data.token[walk - 1] === '.') {
        period();
      }
    };

    function period () {
      walk = walk - 2;
      if (data.types[walk] === 'end') {
        end();
      } else if (data.token[walk - 1] === '.') {
        period();
      }
    };

    function applyStore () {
      let x = 0;
      const y = store.length;
      if (x < y) {
        do {
          parse.push(data, store[x], '');
          x = x + 1;
        } while (x < y);
      }
    };

    function recordStore (index: number) {

      const o = create(null);

      o.begin = data.begin[index];
      o.ender = data.ender[index];
      o.lexer = data.lexer[index];
      o.lines = data.lines[index];
      o.stack = data.stack[index];
      o.token = data.token[index];
      o.types = data.types[index];

      return o;

    };

    tokea = data.token[parse.count];
    tokeb = data.token[parse.count - 1];
    tokec = data.token[parse.count - 2];

    if (tokea !== '++' && tokea !== '--' && tokeb !== '++' && tokeb !== '--') {

      walk = parse.count;

      if (data.types[walk] === 'end') {
        end();
      } else if (data.token[walk - 1] === '.') {
        period();
      }
    }

    if (data.token[walk - 1] === '++' || data.token[walk - 1] === '--') {

      if ('startendoperator'.indexOf(data.types[walk - 2]) > -1) return;

      inc = walk;

      if (inc < parse.count + 1) {
        do {
          store.push(recordStore(inc));
          inc = inc + 1;
        } while (inc < parse.count + 1);
        parse.splice({
          data,
          howmany: parse.count - walk,
          index: walk
        });
      }
    } else {

      if (options.script.correct === false || (
        tokea !== '++' &&
        tokea !== '--' &&
        tokeb !== '++' &&
        tokeb !== '--'
      )) {
        return;
      }

      next = nextchar(1, false);

      if ((tokea === '++' || tokea === '--') && (
        c[a] === ';' ||
        next === ';' ||
        c[a] === '}' ||
        next === '}' ||
        c[a] === ')' ||
        next === ')'
      )) {

        toke = data.stack[parse.count];

        if (
          toke === 'array' ||
          toke === 'method' ||
          toke === 'object' ||
          toke === 'paren' ||
          toke === 'notation' || (data.token[data.begin[parse.count] - 1] === 'while' && toke !== 'while')
        ) {
          return;
        }

        inc = parse.count;

        do {

          inc = inc - 1;

          if (data.token[inc] === 'return') return;
          if (data.types[inc] === 'end') {
            do {
              inc = data.begin[inc] - 1;
            } while (data.types[inc] === 'end' && inc > 0);
          }

        } while (inc > 0 && (
          data.token[inc] === '.' ||
          data.types[inc] === 'word' ||
          data.types[inc] === 'reference' ||
          data.types[inc] === 'end'
        ));

        if (
          data.token[inc] === ',' &&
          c[a] !== ';' &&
          next !== ';' &&
          c[a] !== '}' &&
          next !== '}' &&
          c[a] !== ')' &&
          next !== ')'
        ) {
          return;
        }

        if (data.types[inc] === 'operator') {
          if (data.stack[inc] === 'switch' && data.token[inc] === ':') {

            do {

              inc = inc - 1;

              if (data.types[inc] === 'start') {
                ind = ind - 1;
                if (ind < 0) break;
              } else if (data.types[inc] === 'end') {
                ind = ind + 1;
              }

              if (data.token[inc] === '?' && ind === 0) return;

            } while (inc > 0);

          } else {

            return;
          }
        }

        pre = false;
        toke = tokea === '--' ? '-' : '+';

      } else if (
        tokec === '[' ||
        tokec === ';' ||
        tokec === 'x;' ||
        tokec === '}' ||
        tokec === '{' ||
        tokec === '(' ||
        tokec === ')' ||
        tokec === ',' ||
        tokec === 'return'
      ) {

        if (tokea === '++' || tokea === '--') {
          if (tokec === '[' || tokec === '(' || tokec === ',' || tokec === 'return') return;
          if (tokea === '--') toke = '-';
          pre = false;
        } else if (tokeb === '--' || tokea === '--') {
          toke = '-';
        }
      } else {
        return;
      }

      if (pre === false) tempstore = parse.pop(data);

      walk = parse.count;

      if (data.types[walk] === 'end') {
        end();
      } else if (data.token[walk - 1] === '.') {
        period();
      }

      inc = walk;

      if (inc < parse.count + 1) {
        do {
          store.push(recordStore(inc));
          inc = inc + 1;
        } while (inc < parse.count + 1);
      }
    }

    if (pre === true) {
      parse.splice({
        data
        , howmany: 1
        , index: walk - 1
      });

      ltoke = '=';
      ltype = 'operator';
      recordPush('');
      applyStore();

      ltoke = toke;
      ltype = 'operator';
      recordPush('');

      ltoke = '1';
      ltype = 'number';
      recordPush('');

    } else {

      ltoke = '=';
      ltype = 'operator';
      recordPush('');
      applyStore();

      ltoke = toke;
      ltype = 'operator';
      recordPush('');

      ltoke = '1';
      ltype = 'number';
      recordPush('');

    }
    ltoke = data.token[parse.count];
    ltype = data.types[parse.count];

    if (next === '}' && c[a] !== ';') asi(false);

  };

  /**
   * Determine the definition of containment by stack
   */
  function recordPush (structure: string) {

    parse.push(data, {
      begin: parse.structure[parse.structure.length - 1][1],
      ender: -1,
      lexer: 'script',
      lines: parse.linesSpace,
      stack: parse.structure[parse.structure.length - 1][0],
      token: ltoke,
      types: ltype
    }, structure);

  };

  /**
   * A tokenizer for regular expressions
   */
  function regex () {

    let ee = a + 1;
    let h = 0;
    let i = 0;
    let output = '';
    let square = false;
    const f = b;
    const build = [ '/' ];
    if (ee < f) {
      do {
        build.push(c[ee]);
        if (c[ee - 1] !== '\\' || c[ee - 2] === '\\') {
          if (c[ee] === '[') {
            square = true;
          }
          if (c[ee] === ']') {
            square = false;
          }
        }
        if (c[ee] === '/' && square === false) {
          if (c[ee - 1] === '\\') {
            i = 0;
            h = ee - 1;
            if (h > 0) {
              do {
                if (c[h] === '\\') {
                  i = i + 1;
                } else {
                  break;
                }
                h = h - 1;
              } while (h > 0);
            }
            if (i % 2 === 0) {
              break;
            }
          } else {
            break;
          }
        }
        ee = ee + 1;
      } while (ee < f);
    }
    if (
      c[ee + 1] === 'g' ||
      c[ee + 1] === 'i' ||
      c[ee + 1] === 'm' ||
      c[ee + 1] === 'y' ||
      c[ee + 1] === 'u'
    ) {

      build.push(c[ee + 1]);

      if (
        c[ee + 2] !== c[ee + 1] && (
          c[ee + 2] === 'g' ||
          c[ee + 2] === 'i' ||
          c[ee + 2] === 'm' ||
          c[ee + 2] === 'y' ||
          c[ee + 2] === 'u'
        )
      ) {

        build.push(c[ee + 2]);

        if (
          c[ee + 3] !== c[ee + 1] && c[ee + 3] !== c[ee + 2] && (
            c[ee + 3] === 'g' ||
            c[ee + 3] === 'i' ||
            c[ee + 3] === 'm' ||
            c[ee + 3] === 'y' ||
            c[ee + 3] === 'u'
          )
        ) {

          build.push(c[ee + 3]);

          if (c[ee + 4] !== c[ee + 1] && c[ee + 4] !== c[ee + 2] && c[ee + 4] !== c[ee + 3] && (
            c[ee + 4] === 'g' ||
            c[ee + 4] === 'i' ||
            c[ee + 4] === 'm' ||
            c[ee + 4] === 'y' ||
            c[ee + 4] === 'u'
          )) {
            build.push(c[ee + 4]);

            if (c[ee + 5] !== c[ee + 1] && c[ee + 5] !== c[ee
              + 2] && c[ee + 5] !== c[ee + 3] && c[ee
              + 5] !== c[ee + 4] && (c[ee + 5] === 'g' || c[ee
                + 5] === 'i' || c[ee + 5] === 'm' || c[ee
                + 5] === 'y' || c[ee + 5] === 'u')) {
              build.push(c[ee + 4]);
              a = ee + 5;
            } else {
              a = ee + 4;
            }
          } else {
            a = ee + 3;
          }
        } else {
          a = ee + 2;
        }
      } else {
        a = ee + 1;
      }
    } else {
      a = ee;
    }
    output = build.join('');
    return output;
  };

  /**
   * Determines if a slash comprises a valid escape
   * or if it is escaped itself
   */
  function slashes (index: number) {

    const slashy = index;

    do { index = index - 1; } while (c[index] === '\\' && index > 0);

    return (slashy - index) % 2 === 1;
  };

  /**
   * Operations for start types:
   *
   * - `(`
   * - `[`
   * - `{`
   */
  function start (x: string) {

    let aa = parse.count;
    let wordx = '';
    let wordy = '';
    let stack = '';
    let func = false;

    brace.push(x);

    if (x === '{' && (data.types[parse.count] === 'type' || data
      .types[parse.count] === 'type_end' || data
      .types[parse.count] === 'generic')) {

      /**
       * This block determines if a function body
       * follows a type annotation
       */
      let begin = 0;

      if (data.types[parse.count] === 'type_end') aa = data.begin[parse.count];

      begin = aa;

      do {

        aa = aa - 1;

        if (data.begin[aa] !== begin && data.begin[aa] !== -1) break;
        if (data.token[aa] === ':') break;

      } while (aa > data.begin[aa]);

      if (data.token[aa] === ':' && data.stack[aa - 1] === 'arguments') {

        datatype.push(false);
        func = true;

      } else {

        datatype.push(datatype[datatype.length - 1]);
      }

      aa = parse.count;

    } else if (x === '[' && data.types[parse.count] === 'type_end') {

      datatype.push(true);
    } else {

      datatype.push(datatype[datatype.length - 1]);
    }

    if (wordTest > -1) {
      word();
      aa = parse.count;
    }

    if (vart.len > -1) vart.count[vart.len] = vart.count[vart.len] + 1;

    if (data.token[aa - 1] === 'function') {
      lword.push([ 'function', aa + 1 ]);
    } else {
      lword.push([ ltoke, aa + 1 ]);
    }

    ltoke = x;

    if (datatype[datatype.length - 1] === true) {
      ltype = 'type_start';
    } else {
      ltype = 'start';
    }

    if (x === '(' || x === 'x(') {

      asifix();

    } else if (x === '{') {

      if (paren > -1) {
        if (
          data.begin[paren - 1] === data.begin[data.begin[aa] - 1] ||
          data.token[data.begin[aa]] === 'x('
        ) {

          paren = -1;

          if (options.script.correct === true) {
            end(')');
          } else {
            end('x)');
          }

          asifix();

          ltoke = '{';
          ltype = 'start';
        }

      } else if (ltoke === ')') {

        asifix();
      }

      if (ltype === 'comment' && data.token[aa - 1] === ')') {

        ltoke = data.token[aa];
        data.token[aa] = '{';

        ltype = data.types[aa];
        data.types[aa] = 'start';
      }
    }

    wordx = (() => {

      let bb = parse.count;

      if (data.types[bb] === 'comment') {
        do { bb = bb - 1; } while (bb > 0 && data.types[bb] === 'comment');
      }

      return data.token[bb];

    })();

    wordy = (data.stack[aa] === undefined) ? '' : (() => {

      let bb = parse.count;

      if (data.types[bb] === 'comment') {
        do { bb = bb - 1; } while (bb > 0 && data.types[bb] === 'comment');
      }

      return data.token[data.begin[bb] - 1];

    })();

    if (is(ltoke, cc.LCB) && (data.types[aa] === 'word' || data.token[aa] === ']')) {

      let bb = aa;

      if (data.token[bb] === ']') {
        do { bb = data.begin[bb] - 1; } while (data.token[bb] === ']');
      }

      do {
        if (data.types[bb] === 'start' || data.types[bb] === 'end' || data.types[bb] === 'operator') break;
        bb = bb - 1;
      } while (bb > 0);

      if (data.token[bb] === ':' && data.stack[bb - 1] === 'arguments') {
        stack = 'function';
        references.push(funreferences);
        funreferences = [];
      }
    }

    if (ltype === 'type_start') {

      stack = 'data_type';

    } else if (stack === '' && (is(ltoke, cc.LCB) || ltoke === 'x{')) {

      if (
        wordx === 'else' ||
        wordx === 'do' ||
        wordx === 'try' ||
        wordx === 'finally' ||
        wordx === 'switch'
      ) {

        stack = wordx;
      } else if (
        classy[classy.length - 1] === 0 &&
        wordx !== 'return'
      ) {

        classy.pop();
        stack = 'class';

      } else if (data.token[aa - 1] === 'class') {

        stack = 'class';

      } else if (data.token[aa] === ']' && data.token[aa - 1] === '[') {

        stack = 'array';

      } else if (
        (
          data.types[aa] === 'word' ||
          data.types[aa] === 'reference'
        ) && (
          data.types[aa - 1] === 'word' ||
          data.types[aa - 1] === 'reference' || (
            data.token[aa - 1] === '?' && (
              data.types[aa - 2] === 'word' ||
              data.types[aa - 2] === 'reference'
            )
          )
        ) &&
        data.token[aa] !== 'in' &&
        data.token[aa - 1] !== 'export' &&
        data.token[aa - 1] !== 'import'
      ) {

        stack = 'map';

      } else if (
        data.stack[aa] === 'method' &&
        data.types[aa] === 'end' &&
        (data.types[data.begin[aa] - 1] === 'word' || data.types[data.begin[aa] - 1] === 'reference') &&
        data.token[data.begin[aa] - 2] === 'new'
      ) {

        stack = 'initializer';

      } else if (
        is(ltoke, cc.LCB) &&
        (is(wordx, cc.RPR) || wordx === 'x)') &&
        (
          data.types[data.begin[aa] - 1] === 'word' ||
          data.types[data.begin[aa] - 1] === 'reference' ||
          data.token[data.begin[aa] - 1] === ']'
        )
      ) {

        if (wordy === 'if') {

          stack = 'if';

        } else if (wordy === 'for') {

          stack = 'for';

        } else if (wordy === 'while') {

          stack = 'while';

        } else if (wordy === 'class') {

          stack = 'class';

        } else if (wordy === 'switch' || data.token[data.begin[aa] - 1] === 'switch') {

          stack = 'switch';

        } else if (wordy === 'catch') {

          stack = 'catch';

        } else {

          stack = 'function';
        }

      } else if (is(ltoke, cc.LCB) && (wordx === ';' || wordx === 'x;')) {

        // ES6 block
        stack = 'block';

      } else if (is(ltoke, cc.LCB) && data.token[aa] === ':' && data.stack[aa] === 'switch') {

        // ES6 block
        stack = 'block';

      } else if (
        data.token[aa - 1] === 'import' ||
        data.token[aa - 2] === 'import' ||
        data.token[aa - 1] === 'export' ||
        data.token[aa - 2] === 'export'
      ) {

        stack = 'object';

      } else if (
        is(wordx, cc.RPR) &&
        (
          pword[0] === 'function' ||
          pword[0] === 'if' ||
          pword[0] === 'for' ||
          pword[0] === 'class' ||
          pword[0] === 'while' ||
          pword[0] === 'switch' ||
          pword[0] === 'catch'
        )
      ) {

        // if preceeded by a paren the prior containment is preceeded by a keyword if
        // (...) {
        stack = pword[0];

      } else if (data.stack[aa] === 'notation') {

        // if following a TSX array type declaration
        stack = 'function';

      } else if ((
        data.types[aa] === 'number' ||
        data.types[aa] === 'string' ||
        data.types[aa] === 'word' ||
        data.types[aa] === 'reference'
      ) && (
        data.types[aa - 1] === 'word' ||
          data.types[aa - 1] === 'reference'
      ) && data.token[data.begin[aa] - 1] !== 'for'
      ) {

        // if preceed by a word and either string or word public class {
        stack = 'function';

      } else if (
        parse.structure.length > 0 &&
        data.token[aa] !== ':' &&
        parse.structure[parse.structure.length - 1][0] === 'object' &&
        (data.token[data.begin[aa] - 2] === '{' || data.token[data.begin[aa] - 2] === ',')) {

        // if an object wrapped in some containment which is itself preceeded by a curly
        // brace or comma var a={({b:{cat:"meow"}})};
        stack = 'function';

      } else if (data.types[pword[1] - 1] === 'markup' as any && data.token[pword[1] - 3] === 'function') {

        // checking for TSX function using an angle brace name
        stack = 'function';

      } else if (wordx === '=>') {

        // checking for fat arrow assignment
        stack = 'function';

      } else if (func === true || (
        data.types[parse.count] === 'type_end' &&
        data.stack[data.begin[parse.count] - 2] === 'arguments')
      ) {

        // working around typescript inline interface
        stack = 'function';

      } else if (
        is(wordx, cc.RPR) &&
        data.stack[aa] === 'method' &&
        (
          data.types[data.begin[aa] - 1] === 'word' ||
          data.types[data.begin[aa] - 1] === 'property' ||
          data.types[data.begin[aa] - 1] === 'reference'
        )
      ) {

        stack = 'function';

      } else if (
        data.types[aa] === 'word' &&
        is(ltoke, cc.LCB) &&
        data.token[aa] !== 'return' &&
        data.token[aa] !== 'in' &&
        data.token[aa] !== 'import' &&
        data.token[aa] !== 'const' &&
        data.token[aa] !== 'let' &&
        data.token[aa] !== ''
      ) {

        // ES6 block
        stack = 'block';

      } else if (
        is(ltoke, cc.LCB) &&
        'if|else|for|while|function|class|switch|catch|finally'.indexOf(data.stack[aa]) > -1 &&
        (
          data.token[aa] === 'x}' ||
          data.token[aa] === '}'
        )
      ) {

        // ES6 block
        stack = 'block';

      } else if (data.stack[aa] === 'arguments') {

        stack = 'function';

      } else if (data.types[aa] === 'generic') {

        do {
          aa = aa - 1;

          if (data.token[aa] === 'function' || data.stack[aa] === 'arguments') {
            stack = 'function';
            break;
          }

          if (data.token[aa] === 'interface') {
            stack = 'map';
            break;
          }

          if (data.token[aa] === ';') {
            stack = 'object';
            break;
          }

        } while (aa > data.begin[parse.count]);

      } else {

        stack = 'object';
      }

      if (stack !== 'object' && stack !== 'class') {
        if (stack === 'function') {
          references.push(funreferences);
          funreferences = [];
        } else {
          references.push([]);
        }
      }

    } else if (ltoke === '[') {

      stack = 'array';

    } else if (ltoke === '(' || ltoke === 'x(') {

      if (
        wordx === 'function' ||
        data.token[aa - 1] === 'function' ||
        data.token[aa - 1] === 'function*' ||
        data.token[aa - 2] === 'function'
      ) {

        stack = 'arguments';

      } else if (
        data.token[aa - 1] === '.' ||
        data.token[data.begin[aa] - 2] === '.'
      ) {

        stack = 'method';

      } else if (data.types[aa] === 'generic') {

        stack = 'method';

      } else if (
        data.token[aa] === '}' &&
        data.stack[aa] === 'function'
      ) {

        stack = 'method';

      } else if (
        wordx === 'if' ||
        wordx === 'for' ||
        wordx === 'class' ||
        wordx === 'while' ||
        wordx === 'catch' ||
        wordx === 'finally' ||
        wordx === 'switch' ||
        wordx === 'with'
      ) {

        stack = 'expression';

      } else if (
        data.types[aa] === 'word' ||
        data.types[aa] === 'property' ||
        data.types[aa] === 'reference'
      ) {

        stack = 'method';

      } else {

        stack = 'paren';
      }
    }

    recordPush(stack);

    if (classy.length > 0) classy[classy.length - 1] = classy[classy.length - 1] + 1;

  };

  /**
   * ES6 template string support
   */
  function tempstring () {

    const output = [ c[a] ];

    a = a + 1;

    if (a < b) {
      do {
        output.push(c[a]);

        if (c[a] === '`' && (c[a - 1] !== '\\' || slashes(a - 1) === false)) break;
        if (c[a - 1] === '$' && c[a] === '{' && (c[a - 2] !== '\\' || slashes(a - 2) === false)) break;

        a = a + 1;

      } while (a < b);
    }

    return output.join('');
  };

  /**
   * Determines tag names for {% %} based template tags
   * and returns a type
   */
  function tname (x: string) {

    let sn = 2;
    let en = 0;
    let name = '';

    const st = x.slice(0, 2);
    const len = x.length;

    if (x.charAt(2) === '-') sn = sn + 1;

    if ((/\s/).test(x.charAt(sn)) === true) {
      do {
        sn = sn + 1;
      } while ((/\s/).test(x.charAt(sn)) === true && sn < len);
    }

    en = sn;

    do {
      en = en + 1;
    } while ((/\s/).test(x.charAt(en)) === false && x.charAt(en) !== '(' && en < len);

    if (en === len) en = x.length - 2;

    name = x.slice(sn, en);

    if (
      name === 'else' || (
        st === '{%' && (
          name === 'elseif' ||
          name === 'when' ||
          name === 'elif' ||
          name === 'elsif'
        )
      )
    ) {

      return [ 'template_else', `template_${name}` ];

    }

    if (st === '{{') {

      if (name === 'end') return [ 'template_end', '' ];

      if (
        (name === 'block' && (/\{%\s*\w/).test(source) === false) ||
        name === 'define' ||
        name === 'form' ||
        name === 'if' ||
        name === 'unless' ||
        name === 'range' ||
        name === 'with'
      ) {

        return [ 'template_start', `template_${name}` ];
      }

      return [ 'template', '' ];
    }

    en = namelist.length - 1;

    if (en > -1) {
      do {
        if (
          name === namelist[en] && (
            name !== 'block' ||
            (/\{%\s*\w/).test(source) === false
          )
        ) {

          return [ 'template_start', `template_${name}` ];
        }

        if (name === 'end' + namelist[en]) {
          return [ 'template_end'
            , '' ];
        }
        en = en - 1;

      } while (en > -1);
    }

    return [ 'template', '' ];
  };

  /**
   * Remove "vart" object data
   */
  function vartpop () {

    vart.count.pop();
    vart.index.pop();
    vart.word.pop();
    vart.len = vart.len - 1;

  };

  /**
   * A lexer for keywords, reserved words, and variables
   */
  function word () {

    let f = wordTest;
    let g = 1;
    let output = '';
    let nextitem = '';
    let tokel = ltoke;
    let typel = ltype;

    const lex = [];

    function elsefix () {

      brace.push('x{');

      parse.splice({
        data
        , howmany: 1
        , index: parse.count - 3
      });
    };

    function hoisting (index: number, ref: string, samescope: boolean) {

      const begin = data.begin[index];

      let parent = 0;

      do {
        if (data.token[index] === ref && data.types[index] === 'word') {
          if (samescope === true) {

            // the simple state is for hoisted references, var and function declarations
            data.types[index] = 'reference';

          } else if (
            data.begin[index] > begin &&
            data.token[data.begin[index]] === '{' &&
            data.stack[index] !== 'object' &&
            data.stack[index] !== 'class' &&
            data.stack[index] !== 'data_type'
          ) {

            // the complex state is for non-hoisted references living
            // in prior functions of the same parent scope
            if (data.stack[index] === 'function') {

              data.types[index] = 'reference';

            } else {

              // this looping is necessary to determine if there is a function
              // between the reference and the declared scope
              parent = data.begin[index];

              do {

                if (data.stack[parent] === 'function') {
                  data.types[index] = 'reference';
                  break;
                }

                parent = data.begin[parent];

              } while (parent > begin);
            }
          }
        }

        index = index - 1;

      } while (index > begin);

    };

    do {

      lex.push(c[f]);

      if (c[f] === '\\') {
        parse.error = `Illegal escape in JavaScript on line number ${parse.lineNumber}`;
      }

      f = f + 1;
    } while (f < a);

    if (ltoke.charAt(0) === '\u201c') {
      parse.error = `Quote looking character (\u201c, \\u201c) used instead of actual quotes on line number ${parse.lineNumber}`;
    } else if (ltoke.charAt(0) === '\u201d') {
      parse.error = `Quote looking character (\u201d, \\u201d) used instead of actual quotes on line number ${parse.lineNumber}`;
    }

    output = lex.join('');
    wordTest = -1;

    if (
      parse.count > 0 &&
      output === 'function' &&
      data.token[parse.count] === '(' &&
      (data.token[parse.count - 1] === '{' || data.token[parse.count - 1] === 'x{')
    ) {

      data.types[parse.count] = 'start';
    }

    if (
      parse.count > 1 &&
      output === 'function' &&
      ltoke === '(' &&
      (data.token[parse.count - 1] === '}' || data.token[parse.count - 1] === 'x}')
    ) {

      if (data.token[parse.count - 1] === '}') {

        f = parse.count - 2;

        if (f > -1) {

          do {

            if (data.types[f] === 'end') {
              g = g + 1;
            } else if (data.types[f] === 'start' || data.types[f] === 'end') {
              g = g - 1;
            }

            if (g === 0) break;
            f = f - 1;

          } while (f > -1);
        }
        if (data.token[f] === '{' && data.token[f - 1] === ')') {

          g = 1;
          f = f - 2;

          if (f > -1) {
            do {

              if (data.types[f] === 'end') {
                g = g + 1;
              } else if (data.types[f] === 'start' || data.types[f] === 'end') {
                g = g - 1;
              }

              if (g === 0) break;

              f = f - 1;

            } while (f > -1);
          }

          if (data.token[f - 1] !== 'function' && data.token[f - 2] !== 'function') {
            data.types[parse.count] = 'start';
          }
        }
      } else {
        data.types[parse.count] = 'start';
      }
    }

    if (
      options.script.correct === true &&
      (output === 'Object' || output === 'Array') &&
      c[a + 1] === '(' &&
      c[a + 2] === ')' &&
      data.token[parse.count - 1] === '=' &&
      data.token[parse.count] === 'new'
    ) {

      if (output === 'Object') {
        data.token[parse.count] = '{';
        ltoke = '}';
        data.stack[parse.count] = 'object';
        parse.structure[parse.structure.length - 1][0] = 'object';
      } else {
        data.token[parse.count] = '[';
        ltoke = ']';
        data.stack[parse.count] = 'array';
        parse.structure[parse.structure.length - 1][0] = 'array';
      }

      data.types[parse.count] = 'start';

      ltype = 'end';
      c[a + 1] = '';
      c[a + 2] = '';
      a = a + 2;

    } else {

      g = parse.count;
      f = g;

      if (
        options.script.variableList !== 'none' &&
        (output === 'var' || output === 'let' || output === 'const')
      ) {

        if (data.types[g] === 'comment') {

          do { g = g - 1; } while (g > 0 && (data.types[g] === 'comment'));
        }

        if (
          options.script.variableList === 'list' &&
          vart.len > -1 &&
          vart.index[vart.len] === g &&
          output === vart.word[vart.len]
        ) {

          ltoke = ',';
          ltype = 'separator';
          data.token[g] = ltoke;
          data.types[g] = ltype as any;
          vart.count[vart.len] = 0;
          vart.index[vart.len] = g;
          vart.word[vart.len] = output;
          return;
        }

        vart.len = vart.len + 1;

        vart.count.push(0);
        vart.index.push(g);
        vart.word.push(output);

        g = f;

      } else if (
        vart.len > -1 &&
        output !== vart.word[vart.len] &&
        parse.count === vart.index[vart.len] &&
        data.token[vart.index[vart.len]] === ';' &&
        ltoke !== vart.word[vart.len] &&
        options.script.variableList === 'list'
      ) {

        vartpop();
      }

      if (
        output === 'from' &&
        data.token[parse.count] === 'x;' &&
        data.token[parse.count - 1] === '}'
      ) {

        asifix();
      }

      if (output === 'while' && data.token[parse.count] === 'x;' && data.token[parse.count - 1] === '}') {

        let d = 0;
        let e = parse.count - 2;

        if (e > -1) {

          do {

            if (data.types[e] === 'end') {
              d = d + 1;
            } else if (data.types[e] === 'start') {
              d = d - 1;
            }

            if (d < 0) {
              if (data.token[e] === '{' && data.token[e - 1] === 'do') asifix();
              return;
            }

            e = e - 1;

          } while (e > -1);
        }
      }

      if (typel === 'comment') {

        let d = parse.count;
        do { d = d - 1; } while (d > 0 && data.types[d] === 'comment');

        typel = data.types[d];
        tokel = data.token[d];
      }

      nextitem = nextchar(2, false);

      if (output === 'void') {

        if (tokel === ':' && data.stack[parse.count - 1] === 'arguments') {
          ltype = 'type';
        } else {
          ltype = 'word';
        }

      } else if ((
        parse.structure[parse.structure.length - 1][0] === 'object' ||
        parse.structure[parse.structure.length - 1][0] === 'class' ||
        parse.structure[parse.structure.length - 1][0] === 'data_type'
      ) && (
        data.token[parse.count] === '{' ||
          (data.token[data.begin[parse.count]] === '{' && data.token[parse.count] === ',') ||
          (data.types[parse.count] === 'template_end' &&
            (data.token[data.begin[parse.count] - 1] === '{' || data.token[data.begin[parse.count] - 1] === ',')
          )
      )) {

        if (output === 'return' || output === 'break') {
          ltype = 'word';
        } else {
          ltype = 'property';
        }

      } else if (
        datatype[datatype.length - 1] === true ||
        ((options.language === 'typescript' || options.language === 'flow') && tokel === 'type')
      ) {

        ltype = 'type';

      } else if (references.length > 0 && (
        tokel === 'function' ||
        tokel === 'class' ||
        tokel === 'const' ||
        tokel === 'let' ||
        tokel === 'var' ||
        tokel === 'new' ||
        tokel === 'void'
      )) {

        ltype = 'reference';
        references[references.length - 1].push(output);

        if (
          options.language === 'javascript' ||
          options.language === 'jsx' ||
          options.language === 'typescript' ||
          options.language === 'tsx' // originally was "flow" changed to TSX
        ) {

          if (tokel === 'var' || (
            tokel === 'function' &&
            data.types[parse.count - 1] !== 'operator' &&
            data.types[parse.count - 1] !== 'start' &&
            data.types[parse.count - 1] !== 'end'
          )) {
            hoisting(parse.count, output, true);
          } else {
            hoisting(parse.count, output, false);
          }

        } else {
          hoisting(parse.count, output, false);
        }

      } else if (parse.structure[parse.structure.length - 1][0] === 'arguments' && ltype !== 'operator') {

        ltype = 'reference';
        funreferences.push(output);

      } else if (
        tokel === ',' &&
        data.stack[parse.count] !== 'method' &&
        (data.stack[parse.count] !== 'expression' || data.token[data.begin[parse.count] - 1] === 'for')
      ) {

        let d = parse.count;
        const e = parse.structure[parse.structure.length - 1][1];

        do {
          if (data.begin[d] === e) {

            if (data.token[d] === ';') break;
            if (
              data.token[d] === 'var' ||
              data.token[d] === 'let' ||
              data.token[d] === 'const' ||
              data.token[d] === 'type'
            ) {

              break;
            }

          } else if (data.types[d] === 'end') {
            d = data.begin[d];
          }

          d = d - 1;

        } while (d > e);

        if (references.length > 0 && data.token[d] === 'var') {

          ltype = 'reference';
          references[references.length - 1].push(output);

          if (
            options.language === 'javascript' ||
            options.language === 'jsx' ||
            options.language === 'typescript' ||
            options.language === 'tsx' // originally was "flow" changed to TSX
          ) {
            hoisting(d, output, true);
          } else {
            hoisting(d, output, false);
          }

        } else if (references.length > 0 && (
          data.token[d] === 'let' ||
          data.token[d] === 'const' ||
          (data.token[d] === 'type' && (
            options.language === 'typescript' ||
            options.language === 'tsx' // originally was "flow" changed to TSX
          ))
        )) {

          ltype = 'reference';
          references[references.length - 1].push(output);
          hoisting(d, output, false);

        } else {

          ltype = 'word';
        }

      } else if (
        parse.structure[parse.structure.length - 1][0] !== 'object' || (
          parse.structure[parse.structure.length - 1][0] === 'object' &&
          ltoke !== ',' &&
          ltoke !== '{'
        )
      ) {

        let d = references.length;
        let e = 0;

        if (d > 0) {
          do {

            d = d - 1;
            e = references[d].length;

            if (e > 0) {
              do {

                e = e - 1;
                if (output === references[d][e]) break;

              } while (e > 0);

              if (output === references[d][e]) break;

            }
          } while (d > 0);

          if (references[d][e] === output && tokel !== '.') {
            ltype = 'reference';
          } else {
            ltype = 'word';
          }

        } else {
          ltype = 'word';
        }

      } else {
        ltype = 'word';
      }

      ltoke = output;

      if (output === 'from' && data.token[parse.count] === '}') asifix();

    }

    recordPush('');

    if (output === 'class') classy.push(0);
    if (output === 'do') {

      nextitem = nextchar(1, true);

      if (nextitem !== '{') {

        ltoke = (options.script.correct === true) ? '{' : 'x{';
        ltype = 'start';

        brace.push('x{');
        recordPush('do');

      }
    }

    if (output === 'else') {

      nextitem = nextchar(2, true);
      let x = parse.count - 1;

      if (data.types[x] === 'comment') {
        do { x = x - 1; } while (x > 0 && data.types[x] === 'comment');
      }

      if (data.token[x] === 'x}') {
        if (data.token[parse.count] === 'else') {

          if (
            data.stack[parse.count - 1] !== 'if' &&
            data.types[parse.count - 1] !== 'comment' &&
            data.stack[parse.count - 1] !== 'else'
          ) {

            brace.pop();
            parse.splice({
              data,
              howmany: 0,
              index: parse.count - 1,
              record: {
                begin: data.begin[data.begin[data.begin[parse.count - 1] - 1] - 1],
                ender: -1,
                lexer: 'script',
                lines: 0,
                stack: 'if',
                token: (options.script.correct === true) ? '}' : 'x}',
                types: 'end'
              }
            });

            if (parse.structure.length > 1) {
              parse.structure.splice(parse.structure.length - 2, 1);
              parse.structure[parse.structure.length - 1][1] = parse.count;
            }

          } else if (
            data.token[parse.count - 2] === 'x}' &&
            pstack[0] !== 'if' &&
            data.stack[parse.count] === 'else'
          ) {

            elsefix();

          } else if (
            data.token[parse.count - 2] === '}' &&
            data.stack[parse.count - 2] === 'if' &&
            pstack[0] === 'if' &&
            data.token[pstack[1] - 1] !== 'if' &&
            data.token[data.begin[parse.count - 1]] === 'x{'
          ) {

            // fixes when "else" is following a block that isn't "if"
            elsefix();
          }

        } else if (data.token[parse.count] === 'x}' && data.stack[parse.count] === 'if') {
          elsefix();
        }
      }

      if (nextitem !== 'if' && nextitem.charAt(0) !== '{') {
        ltoke = (options.script.correct === true) ? '{' : 'x{';
        ltype = 'start';
        brace.push('x{');
        recordPush('else');
      }
    }

    if ((
      output === 'for' ||
      output === 'if' ||
      output === 'switch' ||
      output === 'catch'
    ) && data.token[parse.count - 1] !== '.') {

      nextitem = nextchar(1, true);

      if (nextitem !== '(') {
        paren = parse.count;
        if (options.script.correct === true) {
          start('(');
        } else {
          start('x(');
        }
      }
    }

  };

  /* -------------------------------------------- */
  /* BEGIN                                        */
  /* -------------------------------------------- */

  do {

    if ((/\s/).test(c[a])) {

      if (wordTest > -1) word();

      a = parse.spacer({
        array: c,
        end: b,
        index: a
      });

      if (
        parse.linesSpace > 1 &&
        ltoke !== ';' &&
        lengthb < parse.count && c[a + 1] !== '}'
      ) {

        asi(false);
        lengthb = parse.count;
      }

    } else if (c[a] === '{' && c[a + 1] === '%') {

      // TODO: HANDLE LIQUID COMMENTS

      general('{%', '%}', 'template');

    } else if (c[a] === '{' && c[a + 1] === '{') {

      general('{{', '}}', 'template');

    } else if (c[a] === '<' && c[a + 1] === '!' && c[a + 2] === '-' && c[a + 3] === '-') {

      // markup comment
      general('<!--', '-->', 'comment');

    } else if (c[a] === '<') {

      // markup
      lexerMarkup();

    } else if (c[a] === '/' && (a === b - 1 || c[a + 1] === '*')) {

      // comment block
      blockComment();

    } else if ((parse.count < 0 || data.lines[parse.count] > 0) &&
      c[a] === '#' &&
      c[a + 1] === '!' &&
      (c[a + 2] === '/' || c[a + 2] === '[')
    ) {

      // shebang
      general('#!' + c[a + 2], '\n', 'string');

    } else if (c[a] === '/' && (a === b - 1 || c[a + 1] === '/')) {

      // comment line
      lineComment();

    } else if (is(c[a], cc.TQO) || (
      is(c[a], cc.RCB) &&
      parse.structure[parse.structure.length - 1][0] === 'template_string'
    )) {

      // template string
      if (wordTest > -1) word();

      ltoke = tempstring();

      if (is(ltoke, cc.RCB) && ltoke.slice(ltoke.length - 2) === '${') {

        ltype = 'template_string_else';
        recordPush('template_string');

      } else if (ltoke.slice(ltoke.length - 2) === '${') {

        ltype = 'template_string_start';
        recordPush('template_string');

      } else if (is(ltoke[0], cc.RCB)) {

        ltype = 'template_string_end';
        recordPush('');

      } else {

        ltype = 'string';
        recordPush('');
      }

    } else if (c[a] === '"' || c[a] === "'") {
      // string
      general(c[a], c[a], 'string');

    } else if (
      c[a] === '-' &&
      (
        a < b - 1 &&
        c[a + 1] !== '=' &&
        c[a + 1] !== '-') &&
      (
        ltype === 'number' ||
        ltype === 'word' ||
        ltype === 'reference'
      ) &&
      ltoke !== 'return' &&
      (
        ltoke === ')' ||
        ltoke === ']' ||
        ltype === 'word' ||
        ltype === 'reference' ||
        ltype === 'number'
      )
    ) {

      // subtraction
      if (wordTest > -1) word();

      ltoke = '-';
      ltype = 'operator';

      recordPush('');

    } else if (
      wordTest === -1 &&
      (c[a] !== '0' || (c[a] === '0' && c[a + 1] !== 'b')) &&
      (
        (/\d/).test(c[a]) ||
        (
          a !== b - 2 &&
          c[a] === '-' &&
          c[a + 1] === '.' &&
          (/\d/).test(c[a + 2])
        ) || (
          a !== b - 1 &&
          (
            c[a] === '-' ||
            c[a] === '.'
          ) && (/\d/).test(c[a + 1])
        )
      )
    ) {

      // number
      if (wordTest > -1) word();

      if (ltype === 'end' && c[a] === '-') {
        ltoke = '-';
        ltype = 'operator';
      } else {
        ltoke = numb();
        ltype = 'number';
      }

      recordPush('');

    } else if (c[a] === ':' && c[a + 1] === ':') {

      if (wordTest > -1) word();
      if (options.script.correct === true) plusplus();

      asifix();

      a = a + 1;
      ltoke = '::';
      ltype = 'separator';

      recordPush('');

    } else if (c[a] === ',') {

      // comma
      if (wordTest > -1) word();
      if (options.script.correct === true) plusplus();

      if (
        datatype[datatype.length - 1] === true &&
        data.stack[parse.count].indexOf('type') < 0
      ) {

        datatype[datatype.length - 1] = false;
      }

      if (ltype === 'comment') {

        commaComment();
      } else if (
        vart.len > -1 &&
        vart.count[vart.len] === 0 &&
        options.script.variableList === 'each'
      ) {

        asifix();

        ltoke = ';';
        ltype = 'separator';

        recordPush('');

        ltoke = vart.word[vart.len];
        ltype = 'word';

        recordPush('');

        vart.index[vart.len] = parse.count;

      } else {

        ltoke = ',';
        ltype = 'separator';

        asifix();

        recordPush('');

      }

    } else if (c[a] === '.') {

      // period
      if (wordTest > -1) word();

      datatype[datatype.length - 1] = false;

      if (c[a + 1] === '.' && c[a + 2] === '.') {

        ltoke = '...';
        ltype = 'operator';

        a = a + 2;

      } else {

        asifix();
        ltoke = '.';
        ltype = 'separator';
      }

      if ((/\s/).test(c[a - 1]) === true) parse.linesSpace = 1;

      recordPush('');

    } else if (c[a] === ';') {

      // semicolon
      if (wordTest > -1) word();

      if (
        datatype[datatype.length - 1] === true &&
        data.stack[parse.count].indexOf('type') < 0
      ) {

        datatype[datatype.length - 1] = false;
      }

      if (classy[classy.length - 1] === 0) classy.pop();
      if (vart.len > -1 && vart.count[vart.len] === 0) {

        if (options.script.variableList === 'each') {
          vartpop();
        } else {
          vart.index[vart.len] = parse.count + 1;
        }
      }

      if (options.script.correct === true) plusplus();

      ltoke = ';';
      ltype = 'separator';
      if (data.token[parse.count] === 'x}') {
        asibrace();
      } else {
        recordPush('');
      }

      blockinsert();

    } else if (c[a] === '(' || c[a] === '[' || c[a] === '{') {

      start(c[a]);

    } else if (c[a] === ')' || c[a] === ']' || c[a] === '}') {

      end(c[a]);

    } else if (
      c[a] === '*' &&
      data.stack[parse.count] === 'object' &&
      wordTest < 0 &&
      (/\s/).test(c[a + 1]) === false &&
      c[a + 1] !== '=' &&
      (/\d/).test(c[a + 1]) === false
    ) {

      wordTest = a;

    } else if (
      c[a] === '=' ||
      c[a] === '&' ||
      c[a] === '<' ||
      c[a] === '>' ||
      c[a] === '+' ||
      c[a] === '-' ||
      c[a] === '*' ||
      c[a] === '/' ||
      c[a] === '!' ||
      c[a] === '?' ||
      c[a] === '|' ||
      c[a] === '^' ||
      c[a] === ':' ||
      c[a] === '%' ||
      c[a] === '~'
    ) {

      // operator
      ltoke = operator();

      if (ltoke === 'regex') {

        ltoke = data.token[parse.count];

      } else if (ltoke === '*' && data.token[parse.count] === 'function') {

        data.token[parse.count] = 'function*';

      } else {

        ltype = 'operator';

        if (ltoke !== '!' && ltoke !== '++' && ltoke !== '--') asifix();

        recordPush('');

      }

    } else if (wordTest < 0 && c[a] !== '') {

      wordTest = a;
    }

    if (
      vart.len > -1 &&
      parse.count === vart.index[vart.len] + 1 &&
      data.token[vart.index[vart.len]] === ';' &&
      ltoke !== vart.word[vart.len] &&
      ltype !== 'comment' &&
      options.script.variableList === 'list'
    ) {

      vartpop();
    }

    a = a + 1;

  } while (a < b);

  if (wordTest > -1) word();

  if ((
    (
      data.token[parse.count] !== '}' &&
      data.token[0] === '{'
    ) ||
    data.token[0] !== '{'
  ) && (
    (
      data.token[parse.count] !== ']' &&
        data.token[0] === '['
    ) ||
      data.token[0] !== '['
  )) {

    asi(false);
  }

  if (sourcemap[0] === parse.count) {
    ltoke = '\n' + sourcemap[1];
    ltype = 'string';
    recordPush('');
  }

  if (
    data.token[parse.count] === 'x;' &&
    (
      data.token[parse.count - 1] === '}' ||
      data.token[parse.count - 1] === ']'
    ) &&
    data.begin[parse.count - 1] === 0
  ) {

    parse.pop(data);
  }

  options.script = cloneopts;

  return data;

};
