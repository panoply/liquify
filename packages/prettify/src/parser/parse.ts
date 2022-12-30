/* eslint no-unmodified-loop-condition: "off" */
import type { Data, Types, Record, Structure, Spacer, Splice, ScriptOptions, JSONOptions, LexerNames, LanguageNames } from 'types/prettify';
import { prettify } from '@prettify/model';
import { grammar } from '@options/grammar';
import { assign, isArray } from '@utils/native';
import { cc as ch, NIL, NWL } from '@utils/chars';
import { getTagName, is, not, safeSortAscend, safeSortDescend, safeSortNormal, ws } from '@utils/helpers';
import { lexmap } from './language';

export const parse = new class Parse {

  /**
   * Stores the name of the data arrays. This is used for internal automation
   * and describes the data structure (AST) result.
   */
  public datanames = [
    'begin',
    'ender',
    'lexer',
    'lines',
    'stack',
    'token',
    'types'
  ];

  /**
   * Stores the various data arrays of the parse table
   */
  public data: Data = {
    begin: [],
    ender: [],
    lexer: [],
    lines: [],
    stack: [],
    token: [],
    types: []
  };

  /**
   * Stores the stack and begin values by stacking depth
   */
  public structure: Structure[] = [
    [
      'global', -1
    ]
  ];

  /**
   * Reference of attributes of new line values with containing Liquid block tokens.
   * It maintains a store which is generated in the markup lexer and used within
   * the beautify process.
   */
  public attributes: Map<number, boolean> = new Map();

  /**
   * Stores the declared variable names for the script lexer.
   * This must be stored outside the script lexer since some languages
   * recursive use of the script lexer
   */
  public references = [ [] ];

  /**
   * Stores the final index location of the data arrays
   */
  public count = -1;

  /**
   * Stores the offset location of last known new line offset
   */
  public lineStart = 0;

  /**
   * Stores the current line number from the input string for logging parse errors
   */
  public lineNumber = 0;

  /**
   * Stores the 'lines' value before the next token
   */
  public linesSpace = 0;

  /**
   * Parse Error Message
   */
  public error = NIL;

  /**
   * Returns the last known structure entry in a deconstructed manner.
   */
  get scope () {

    const [ token, index ] = this.structure[this.structure.length - 1];
    return { token, index };

  }

  /**
   * Returns the last known record within `data` set.  This is typically going to be
   * the current item in sequence, ie: the previus record before `push` is executed.
   */
  get current () {

    const {
      begin,
      ender,
      lexer,
      lines,
      stack,
      token,
      types
    } = this.data;

    return {
      begin: begin[begin.length - 1],
      ender: ender[ender.length - 1],
      lexer: lexer[lexer.length - 1],
      lines: lines[lines.length - 1],
      stack: stack[stack.length - 1],
      token: token[begin.length - 1],
      types: types[begin.length - 1]
    };

  }

  /**
   * Initialize
   *
   * Sets up the runtime and data structures that will be populated
   * during lexical walk. Invoked each time `parse` or `format` happens.
   */
  public full () {

    this.error = NIL;
    this.count = -1;
    this.linesSpace = 0;
    this.lineNumber = 0;
    this.references = [ [] ];
    this.data.begin = [];
    this.data.ender = [];
    this.data.lexer = [];
    this.data.lines = [];
    this.data.stack = [];
    this.data.token = [];
    this.data.types = [];
    this.structure = [ [ 'global', -1 ] ];
    this.structure.pop = () => {
      const len = this.structure.length - 1;
      const arr = this.structure[len];
      if (len > 0) this.structure.splice(len, 1);
      return arr;
    };

    return this.data;
  }

  /**
   * Initialize
   *
   * Sets up the runtime and data structures that will be populated
   * during lexical walk. Invoked each time `parse` or `format` happens.
   */
  increment () {

    this.error = NIL;
    this.count = -1;
    this.linesSpace = 0;
    this.lineNumber = 0;
    this.references = [ [] ];
    this.data.begin = [];
    this.data.ender = [];
    this.data.lexer = [];
    this.data.lines = [];
    this.data.stack = [];
    this.data.token = [];
    this.data.types = [];
    this.structure = [ [ 'global', -1 ] ];
    this.structure.pop = () => {
      const len = this.structure.length - 1;
      const arr = this.structure[len];
      if (len > 0) this.structure.splice(len, 1);
      return arr;
    };

    return this.data;
  }

  public pushEnder (data: Data) {

    let a = this.count;

    const begin = data.begin[a];

    if ((
      data.lexer[a] === 'style' &&
      prettify.options.style.sortProperties === true
    ) || (
      data.lexer[a] === 'script' && (
        prettify.options.script.objectSort === true ||
        prettify.options.json.objectSort === true
      )
    )) {

      // Sorting can result in a token whose begin value is greater than either
      // Its current index or the index of the end token, which results in
      // an endless loop. These end values are addressed at the end of
      // the "parser" function with this.sortCorrection
      return;

    }

    do {

      if (data.begin[a] === begin || (
        data.begin[data.begin[a]] === begin &&
        data.types[a].indexOf('attribute') > -1 &&
        data.types[a].indexOf('attribute_end') < 0
      )) {

        data.ender[a] = this.count;

      } else {

        a = data.begin[a];

      }

      a = a - 1;

    } while (a > begin);

    if (a > -1) data.ender[a] = this.count;

  };

  public lexer (output: string, language: LanguageNames) {

    const mode = lexmap[language];
    const current = prettify.options.language;

    prettify.options.language = language;

    if (language === 'json') {

      const json = assign<JSONOptions, JSONOptions>({}, prettify.options.json);
      const clone = assign<ScriptOptions, ScriptOptions>({}, prettify.options.script);

      prettify.options.script = assign<ScriptOptions, JSONOptions, ScriptOptions>(
        prettify.options.script,
        prettify.options.json, {
          quoteConvert: 'double',
          endComma: 'never',
          noSemicolon: true,
          vertical: false
        }
      );

      prettify.lexers[mode](output);

      if (language === 'json' && prettify.options.json.objectSort === true) {
        this.sortCorrect(0, this.count + 1);
      }

      prettify.options.language = current;
      prettify.options.json = json;
      prettify.options.script = clone;

    } else {

      prettify.lexers[mode](output);

      if ((language === 'javascript' && prettify.options.script.objectSort === true) || (((
        language === 'css' ||
        language === 'scss'
      )) && prettify.options.style.sortProperties === true)) {

        this.sortCorrect(0, this.count + 1);

      }

      prettify.options.language = current;

    }

  }

  /**
   * Embedded Language
   *
   * Handler for embedded language regions.
   * Does all the heavy lifting during a lex traversal
   * and format.
   */
  public beautify (indent: number) {

    prettify.options.indentLevel = indent;

    const tagType = is(this.data.token[prettify.start], ch.LCB) ? 'liquid' : 'html';
    const tagName = getTagName(this.data.stack[prettify.start]);
    const embedded = grammar.embed(tagType, tagName);
    const language = prettify.options.language;

    if (embedded !== false) {

      const lexer: LexerNames = this.data.lexer[prettify.start] as LexerNames;
      prettify.options.language = embedded.language;

      if (embedded.language === 'json') {

        const json = assign<JSONOptions, JSONOptions>({}, prettify.options.json);
        const clone = assign<ScriptOptions, ScriptOptions>({}, prettify.options.script);

        prettify.options.script = assign<ScriptOptions, JSONOptions, ScriptOptions>(
          prettify.options.script,
          prettify.options.json, {
            quoteConvert: 'double',
            endComma: 'never',
            noSemicolon: true,
            vertical: false
          }
        );

        return {
          reset () {

            prettify.options.language = language;
            prettify.options.indentLevel = 0;
            prettify.options.json = json;
            prettify.options.script = clone;

          },
          get beautify () {

            return prettify.beautify[lexer](prettify.options);

          }
        };

      }

      return {
        reset () {

          prettify.options.language = language;
          prettify.options.indentLevel = 0;

        },
        get beautify () {

          return prettify.beautify[lexer](prettify.options);

        }
      };
    }

    const lexer = this.data.lexer[prettify.start];

    return {
      reset () {

        prettify.options.language = language;
        prettify.options.indentLevel = 0;

      },
      get beautify () {

        return prettify.beautify[lexer](prettify.options);

      }
    };

  }

  /**
   * An extension of `Array.prototype.push` to work across the data structure
   */
  public push (data: Data, record: Record, structure: string = NIL) {

    // parse_push_datanames
    data.begin.push(record.begin);
    data.ender.push(record.ender);
    data.lexer.push(record.lexer);
    data.stack.push(record.stack);
    data.token.push(record.token);
    data.types.push(record.types);
    data.lines.push(record.lines);

    if (data === this.data) {

      this.count = this.count + 1;
      this.linesSpace = 0;

      if (record.lexer !== 'style' && structure.replace(/[{}@<>%#]/g, NIL) === NIL) {
        structure = record.types === 'else'
          ? 'else'
          : getTagName(record.token);
      }

      if (record.types === 'start' || record.types.indexOf('_start') > 0) {

        this.structure.push([ structure, this.count ]);

      } else if (record.types === 'end' || record.types.indexOf('_end') > 0) {

        // This big condition fixes language specific else blocks that
        // are children of start/end blocks not associated with
        // the if/else chain

        let ender = 0;

        const length = this.structure.length;

        if (this.structure.length > 2 && (
          data.types[this.structure[length - 1][1]] === 'else' ||
          data.types[this.structure[length - 1][1]].indexOf('_else') > 0
        ) && (
          data.types[this.structure[length - 2][1]] === 'start' ||
          data.types[this.structure[length - 2][1]].indexOf('_start') > 0
        ) && (
          data.types[this.structure[length - 2][1] + 1] === 'else' ||
          data.types[this.structure[length - 2][1] + 1].indexOf('_else') > 0
        )) {

          this.structure.pop();

          data.begin[this.count] = this.structure[this.structure.length - 1][1];
          data.stack[this.count] = this.structure[this.structure.length - 1][0];
          data.ender[this.count - 1] = this.count;

          ender = data.ender[data.begin[this.count] + 1];

        }

        this.pushEnder(data);

        if (ender > 0) data.ender[data.begin[this.count] + 1] = ender;

        this.structure.pop();

      } else if (record.types === 'else' || record.types.indexOf('_else') > 0) {

        if (structure === NIL) structure = 'else';
        if (this.count > 0 && (
          data.types[this.count - 1] === 'start' ||
          data.types[this.count - 1].indexOf('_start') > 0
        )) {

          this.structure.push([ structure, this.count ]);

        } else {

          this.pushEnder(data);

          this.structure[this.structure.length - 1] = structure === NIL
            ? [ 'else', this.count ]
            : [ structure, this.count ];

        }
      }
    }
  }

  /**
   * An extension of `Array.prototype.pop` to work across the data
   * structure
   */
  public pop (data: Data): Record {

    const output = {
      begin: data.begin.pop(),
      ender: data.ender.pop(),
      lexer: data.lexer.pop(),
      lines: data.lines.pop(),
      stack: data.stack.pop(),
      token: data.token.pop(),
      types: data.types.pop()
    };

    if (data === this.data) this.count = this.count - 1;

    return output;

  }

  /**
   * An extension of `Array.prototype.concat` to work across
   * the data structure. This is an expensive operation.
   */
  public concat (data: Data, record: Data) {

    // parse_push_datanames
    data.begin = data.begin.concat(record.begin);
    data.ender = data.ender.concat(record.ender);
    data.lexer = data.lexer.concat(record.lexer);
    data.stack = data.stack.concat(record.stack);
    data.token = data.token.concat(record.token);
    data.types = data.types.concat(record.types);
    data.lines = data.lines.concat(record.lines);

    if (data === this.data) this.count = data.token.length - 1;
  }

  /**
   * The function that sorts object properties. Applies alphanumeric
   * sorting for objects.
   */
  public sortObject (data: Data) {

    let cc = this.count;
    let dd = this.structure[this.structure.length - 1][1];
    let ee = 0;
    let ff = 0;
    let gg = 0;
    let behind = 0;
    let front = 0;
    let keyend = 0;
    let keylen = 0;
    let comma = true;

    const keys = [];
    const begin = dd;
    const struc = this.structure[this.structure.length - 1][0];
    const lines = this.linesSpace;
    const length = this.count;
    const json = prettify.options.language === 'json';
    const global = data.lexer[cc] === 'style' && struc === 'global';
    const style = data.lexer[cc] === 'style';
    const delim = style === true ? [ ';', 'separator' ] : [ ',', 'separator' ];
    const stack = global === true ? 'global' : struc;
    const store: Data = {
      begin: [],
      ender: [],
      lexer: [],
      lines: [],
      stack: [],
      token: [],
      types: []
    };

    const sort = (x: number[], y: number[]) => {

      let xx = x[0];
      let yy = y[0];

      if (data.types[xx] === 'comment') {
        do xx = xx + 1;
        while (xx < length && (data.types[xx] === 'comment'));
        if (data.token[xx] === undefined) return 1;
      }

      if (data.types[yy] === 'comment') {
        do yy = yy + 1;
        while (yy < length && (data.types[yy] === 'comment'));
        if (data.token[yy] === undefined) return 1;
      }

      if (style === true) {

        // JavaScript's standard array sort uses implementation specific algorithms.
        // This simple numeric trick forces conformance.
        if (data.token[xx].indexOf('@import') === 0 || data.token[yy].indexOf('@import') === 0) {
          return xx < yy ? -1 : 1;
        }

        if (data.types[xx] !== data.types[yy]) {
          if (data.types[xx] === 'function') return 1;
          if (data.types[xx] === 'variable') return -1;
          if (data.types[xx] === 'selector') return 1;
          if (data.types[xx] === 'property' && data.types[yy] !== 'variable') return -1;
          if (data.types[xx] === 'mixin' && data.types[yy] !== 'property' && data.types[yy] !== 'variable') return -1;
        }

      }

      if (data.token[xx].toLowerCase() > data.token[yy].toLowerCase()) return 1;

      return -1;

    };

    behind = cc;

    do {

      if (data.begin[cc] === dd || (
        global === true &&
        cc < behind &&
        is(data.token[cc], ch.RCB) &&
        data.begin[data.begin[cc]] === -1
      )) {

        if (data.types[cc].indexOf('template') > -1) return;

        if (data.token[cc] === delim[0] || (
          style === true &&
          is(data.token[cc], ch.RCB) &&
          not(data.token[cc + 1], ch.SEM)
        )) {

          comma = true;
          front = cc + 1;

        } else if (style === true && is(data.token[cc - 1], ch.RCB)) {

          comma = true;
          front = cc;

        }

        if (front === 0 && data.types[0] === 'comment') {

          // Keep top comments at the top
          do front = front + 1;
          while (data.types[front] === 'comment');

        } else if (data.types[front] === 'comment' && data.lines[front] < 2) {

          // When a comment follows code on the same line then
          // keep the comment next to the code it follows
          front = front + 1;
        }

        if (comma === true && (data.token[cc] === delim[0] || (
          style === true &&
          is(data.token[cc - 1], ch.RCB)
        )) && front <= behind) {

          if (style === true && '};'.indexOf(data.token[behind]) < 0) {
            behind = behind + 1;
          } else if (style === false && not(data.token[behind], ch.COM)) {
            behind = behind + 1;
          }

          keys.push([ front, behind ]);

          if (style === true && is(data.token[front], ch.RCB)) {
            behind = front;
          } else {
            behind = front - 1;
          }
        }
      }

      cc = cc - 1;

    } while (cc > dd);

    if (keys.length > 0 && keys[keys.length - 1][0] > cc + 1) {

      ee = keys[keys.length - 1][0] - 1;

      if (data.types[ee] === 'comment' && data.lines[ee] > 1) {
        do ee = ee - 1;
        while (ee > 0 && data.types[ee] === 'comment');
        keys[keys.length - 1][0] = ee + 1;
      }

      if (data.types[cc + 1] === 'comment' && cc === -1) {
        do cc = cc + 1;
        while (data.types[cc + 1] === 'comment');
      }

      keys.push([ cc + 1, ee ]);
    }

    if (keys.length > 1) {

      // HOT PATCH
      // Fixes JSON embedded region and language object sorting
      if (
        json === true ||
        style === true ||
        is(data.token[cc - 1], ch.EQS) ||
        is(data.token[cc - 1], ch.COL) ||
        is(data.token[cc - 1], ch.LPR) ||
        is(data.token[cc - 1], ch.LSB) ||
        is(data.token[cc - 1], ch.COM) ||
        data.types[cc - 1] === 'word' ||
        cc === 0
      ) {

        keys.sort(sort);

        keylen = keys.length;
        comma = false;
        dd = 0;

        do {

          keyend = keys[dd][1];

          if (style === true) {
            gg = keyend;

            if (data.types[gg] === 'comment') gg = gg - 1;
            if (is(data.token[gg], ch.RCB)) {
              keyend = keyend + 1;
              delim[0] = '}';
              delim[1] = 'end';
            } else {
              delim[0] = ';';
              delim[1] = 'separator';
            }
          }

          ee = keys[dd][0];

          if (
            style === true &&
            data.types[keyend - 1] !== 'end' &&
            data.types[keyend] === 'comment' &&
            data.types[keyend + 1] !== 'comment' &&
            dd < keylen - 1
          ) {

            // missing a terminal comment causes many problems
            keyend = keyend + 1;
          }

          if (ee < keyend) {

            do {

              if (
                style === false &&
                dd === keylen - 1 &&
                ee === keyend - 2 &&
                is(data.token[ee], ch.COM) &&
                data.lexer[ee] === 'script' &&
                data.types[ee + 1] === 'comment'
              ) {

                // Do not include terminal commas that are followed by a comment
                ff = ff + 1;

              } else {

                this.push(store, {
                  begin: data.begin[ee],
                  ender: data.ender[ee],
                  lexer: data.lexer[ee],
                  lines: data.lines[ee],
                  stack: data.stack[ee],
                  token: data.token[ee],
                  types: data.types[ee]
                });

                ff = ff + 1;
              }

              // Remove extra commas
              if (data.token[ee] === delim[0] && (style === true || data.begin[ee] === data.begin[keys[dd][0]])) {

                comma = true;

              } else if (data.token[ee] !== delim[0] && data.types[ee] !== 'comment') {

                comma = false;
              }

              ee = ee + 1;

            } while (ee < keyend);

          }

          // Injecting the list delimiter
          if (comma === false && store.token[store.token.length - 1] !== 'x;' && (
            style === true ||
            dd < keylen - 1
          )) {

            ee = store.types.length - 1;

            if (store.types[ee] === 'comment') {
              do ee = ee - 1;
              while (ee > 0 && (store.types[ee] === 'comment'));
            }

            ee = ee + 1;

            this.splice({
              data: store,
              howmany: 0,
              index: ee,
              record: {
                begin,
                stack,
                ender: this.count,
                lexer: store.lexer[ee - 1],
                lines: 0,
                token: delim[0],
                types: delim[1] as Types
              }
            });

            ff = ff + 1;

          }

          dd = dd + 1;

        } while (dd < keylen);

        this.splice({ data, howmany: ff, index: cc + 1 });
        this.linesSpace = lines;
        this.concat(data, store);

      }
    }

  }

  /**
   * A custom sort tool that is a bit more intelligent and
   * multidimensional than `Array.prototype.sort`
   */
  public sortSafe (
    array: [
      token: string,
      lines: number,
      chain?: boolean
    ][],
    operation: string,
    recursive: boolean
  ): [ token: string, lines: number, chain?: boolean][] {

    if (isArray(array) === false) return array;
    if (operation === 'normal') return safeSortNormal.call({ array, recursive }, array);
    if (operation === 'descend') return safeSortDescend.call({ recursive }, array);

    return safeSortAscend.call({ recursive }, array);

  }

  /**
   * This functionality provides corrections to the `begin` and `ender` values
   * after use of objectSort
   */
  public sortCorrect (start: number, end: number) {

    let a = start;
    let endslen = -1;

    const data = this.data;
    const ends = [];
    const structure = (this.structure.length < 2)
      ? [ -1 ]
      : [ this.structure[this.structure.length - 2][1] ];

    // This first loop solves for the begin values
    do {

      if (a > 0 &&
        data.types[a].indexOf('attribute') > -1 &&
        data.types[a].indexOf('end') < 0 &&
        data.types[a - 1].indexOf('start') < 0 &&
        data.types[a - 1].indexOf('attribute') < 0 &&
        data.lexer[a] === 'markup') {
        structure.push(a - 1);
      }

      if (a > 0 &&
        data.types[a - 1].indexOf('attribute') > -1 &&
        data.types[a].indexOf('attribute') < 0 &&
        data.lexer[structure[structure.length - 1]] === 'markup' &&
        data.types[structure[structure.length - 1]].indexOf('start') < 0
      ) {
        structure.pop();
      }

      if (data.begin[a] !== structure[structure.length - 1]) {
        data.begin[a] = structure.length > 0 ? structure[structure.length - 1] : -1;
      }

      if (data.types[a].indexOf('else') > -1) {
        if (structure.length > 0) {
          structure[structure.length - 1] = a;
        } else {
          structure.push(a);
        }
      }

      if (data.types[a].indexOf('end') > -1) structure.pop();
      if (data.types[a].indexOf('start') > -1) structure.push(a);

      a = a + 1;

    } while (a < end);

    // Now for the ender values
    a = end;

    do {

      a = a - 1;

      if (data.types[a].indexOf('end') > -1) {
        ends.push(a);
        endslen = endslen + 1;
      }

      data.ender[a] = endslen > -1 ? ends[endslen] : -1;

      if (data.types[a].indexOf('start') > -1) {
        ends.pop();
        endslen = endslen - 1;
      }

    } while (a > start);

  }

  /**
   * Parse Space
   *
   * This function is responsible for parsing whitespace
   * characters and newlines. The lexical `a` scope is incremented
   * and both `parse.lineNumber` and `parse.linesSpace` are
   * updated accordinly.
   */
  public space (array: string[], length: number) {

    this.linesSpace = 1;

    return (index: number) => {

      do {

        if (is(array[index], ch.NWL)) this.lineNumber = this.lineNumber + 1;
        if (ws(array[index]) === false) break;

        this.linesSpace = this.linesSpace + 1;
        index = index + 1;

      } while (index < length);

      return index;

    };

  }

  spacer (args: Spacer): number {

    // * array - the characters to scan
    // * index - the index to start scanning from
    // * end   - the length of the array, to break the loop
    this.linesSpace = 1;

    do {

      if (args.array[args.index] === NWL) {
        this.linesSpace = this.linesSpace + 1;
        this.lineNumber = this.lineNumber + 1;
      }

      if (ws(args.array[args.index + 1]) === false) break;

      args.index = args.index + 1;

    } while (args.index < args.end);

    return args.index;

  }

  /**
   * An extension of `Array.prototype.splice` to work across the data structure
   */
  public splice (splice: Splice) {

    const { data } = this;
    const finalItem = [ data.begin[this.count], data.token[this.count] ];

    // * data    - The data object to alter
    // * howmany - How many indexes to remove
    // * index   - The index where to start
    // * record  - A new record to insert
    if (splice.record !== undefined && splice.record.token !== NIL) {

      // parse_splice_datanames
      for (const value of this.datanames) {
        splice.data[value].splice(splice.index, splice.howmany, splice.record[value]);
      }

      if (splice.data === data) {
        this.count = (this.count - splice.howmany) + 1;
        if (finalItem[0] !== data.begin[this.count] || finalItem[1] !== data.token[this.count]) {
          this.linesSpace = 0;
        }
      }

      return;
    }

    splice.data.begin.splice(splice.index, splice.howmany);
    splice.data.ender.splice(splice.index, splice.howmany);
    splice.data.token.splice(splice.index, splice.howmany);
    splice.data.lexer.splice(splice.index, splice.howmany);
    splice.data.stack.splice(splice.index, splice.howmany);
    splice.data.types.splice(splice.index, splice.howmany);
    splice.data.lines.splice(splice.index, splice.howmany);

    if (splice.data === data) {

      this.count = this.count - splice.howmany;
      this.linesSpace = 0;

    }

  }

}();
