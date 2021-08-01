/* eslint no-unmodified-loop-condition: "off" */
import { Parse } from '../../types/sparser';
import { sparser } from './sparser';

const parse: Parse = {

  // Stores the final index location of the data arrays
  count: -1,

  // Stores the various data arrays of the parse table
  data: {
    begin: []
    , ender: []
    , lexer: []
    , lines: []
    , stack: []
    , token: []
    , types: []
  },

  // Stores the name of the data arrays.  This is used for internal automation
  datanames: [
    'begin'
    , 'ender'
    , 'lexer'
    , 'lines'
    , 'stack'
    , 'token'
    , 'types'
  ],

  // Stores the current line number from the input string for logging parse errors
  lineNumber: 1,

  // Stores the 'lines' value before the next token
  linesSpace: 0,

  // Stores the declared variable names for the script lexer.  This must be stored outside the script lexer since some languages recursive use of the script lexer
  references: [
    []
  ],

  // Stores the stack and begin values by stacking depth
  structure: [
    [ 'global', -1 ]
  ],

  // An extension of Array.prototype.concat
  // to work across the data structure.
  // This is an expensive operation.
  concat (data, array) {
    for (const v of parse.datanames) data[v] = data[v].concat(array[v]);
    if (data === parse.data) parse.count = data.token.length - 1;
  },

  // The function that sorts object properties
  objectSort (data) {

    let cc = parse.count;
    let dd = parse.structure[parse.structure.length - 1][1];
    let ee = 0;
    let ff = 0;
    let gg = 0;
    let behind = 0;
    let commaTest = true;
    let front = 0;
    let keyend = 0;
    let keylen = 0;
    const global = (
      data.lexer[cc] === 'style' &&
      parse.structure[parse.structure.length - 1][0] === 'global'
    );

    const keys = [];
    const length = parse.count;
    const begin = dd;
    const style = data.lexer[cc] === 'style';
    const delim = style === true ? [ ';', 'separator' ] : [ ','
      , 'separator' ];
    const lines = parse.linesSpace;
    const stack = global === true
      ? 'global'
      : parse.structure[parse.structure.length - 1][0];

    function sort (x, y) {

      let xx = x[0];
      let yy = y[0];

      if (data.types[xx] === 'comment') {
        do {
          xx = xx + 1;
        } while (xx < length && (data.types[xx] === 'comment'));
        if (data.token[xx] === undefined) {
          return 1;
        }
      }

      if (data.types[yy] === 'comment') {
        do {
          yy = yy + 1;
        } while (yy < length && (data.types[yy] === 'comment'));
        if (data.token[yy] === undefined) {
          return 1;
        }
      }

      if (style === true) {

        // JavaScript's standard array sort uses implementation specific algorithms.
        // This simple numeric trick forces conformance.
        if (
          data.token[xx].indexOf('@import') === 0 ||
          data.token[yy].indexOf('@import') === 0
        ) return xx < yy ? -1 : 1;

        if (data.types[xx] !== data.types[yy]) {

          if (data.types[xx] === 'function') return 1;
          if (data.types[xx] === 'variable') return -1;
          if (data.types[xx] === 'selector') return 1;

          if (
            data.types[xx] === 'property' &&
            data.types[yy] !== 'variable'
          ) return -1;

          if (
            data.types[xx] === 'mixin' &&
            data.types[yy] !== 'property' &&
            data.types[yy] !== 'variable'
          ) return -1;
        }

      }

      if (data.token[xx].toLowerCase() > data.token[yy].toLowerCase()) { return 1; }

      return -1;

    }

    const store = {
      begin: []
      , ender: []
      , lexer: []
      , lines: []
      , stack: []
      , token: []
      , types: []
    };

    behind = cc;

    do {

      if (
        data.begin[cc] === dd || (
          global === true &&
          cc < behind &&
          data.token[cc] === '}' &&
          data.begin[data.begin[cc]] === -1
        )
      ) {

        if (data.types[cc].indexOf('template') > -1) return;

        if (
          data.token[cc] === delim[0] || (
            style === true &&
            data.token[cc] === '}' &&
            data.token[cc + 1] !== ';'
          )
        ) {

          commaTest = true;
          front = cc + 1;

        } else if (
          style === true &&
          data.token[cc - 1] === '}'
        ) {

          commaTest = true;
          front = cc;
        }

        if (front === 0 && data.types[0] === 'comment') {

          // keep top comments at the top
          do {
            front = front + 1;
          } while (data.types[front] === 'comment');

        } else if (data.types[front] === 'comment' && data.lines[front] <
          2) {

          // If a comment follows code on the same line then
          // keep the comment next to the code it follows
          front = front + 1;
        }

        if (
          commaTest === true && (
            data.token[cc] === delim[0] || (
              style === true &&
              data.token[cc - 1] === '}'
            )
          ) && front <= behind
        ) {

          if (style === true && '};'.indexOf(data.token[behind]) < 0) {
            behind = behind + 1;
          } else if (style === false && data.token[behind] !== ',') {
            behind = behind + 1;
          }

          keys.push([ front, behind ]);

          if (style === true && data.token[front] === '}') {
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
        do {
          ee = ee - 1;
        } while (ee > 0 && data.types[ee] === 'comment');
        keys[keys.length - 1][0] = ee + 1;
      }

      if (data.types[cc + 1] === 'comment' && cc === -1) {
        do {
          cc = cc + 1;
        } while (data.types[cc + 1] === 'comment');
      }

      keys.push([ cc + 1, ee ]);
    }

    if (keys.length > 1) {

      if (
        style === true ||
        data.token[cc - 1] === '=' ||
        data.token[cc - 1] === ':' ||
        data.token[cc - 1] === '(' ||
        data.token[cc - 1] === '[' ||
        data.token[cc - 1] === ',' ||
        data.types[cc - 1] === 'word' ||
        cc === 0
      ) {

        keys.sort(sort);
        keylen = keys.length;
        commaTest = false;
        dd = 0;

        do {

          keyend = keys[dd][1];

          if (style === true) {
            gg = keyend;

            if (data.types[gg] === 'comment') gg = gg - 1;
            if (data.token[gg] === '}') {
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
                data.token[ee] === ',' &&
                data.lexer[ee] === 'script' &&
                data.types[ee + 1] === 'comment'
              ) {

                // Do not include terminal commas that are followed by a comment
                ff = ff + 1;

              } else {

                parse.push(
                  store, {
                    begin: data.begin[ee]
                    , ender: data.begin[ee]
                    , lexer: data.lexer[ee]
                    , lines: data.lines[ee]
                    , stack: data.stack[ee]
                    , token: data.token[ee]
                    , types: data.types[ee]
                  }
                  , ''
                );

                ff = ff + 1;
              }

              // Remove extra commas
              if (
                data.token[ee] === delim[0] && (
                  style === true ||
                  data.begin[ee] === data.begin[keys[dd][0]]
                )
              ) {

                commaTest = true;

              } else if (
                data.token[ee] !== delim[0] &&
                data.types[ee] !== 'comment'
              ) {

                commaTest = false;
              }

              ee = ee + 1;

            } while (ee < keyend);

          }

          // Injecting the list delimiter
          if (
            commaTest === false &&
            store.token[store.token.length - 1] !== 'x;' && (
              style === true ||
              dd < keylen - 1
            )
          ) {

            ee = store.types.length - 1;

            if (store.types[ee] === 'comment') {
              do {
                ee = ee - 1;
              } while (ee > 0 && (store.types[ee] === 'comment'));
            }

            ee = ee + 1;

            parse.splice({
              data: store
              , howmany: 0
              , index: ee
              , record: {
                begin: begin
                , ender: parse.count
                , lexer: store.lexer[ee - 1]
                , lines: 0
                , stack: stack
                , token: delim[0]
                , types: delim[1]
              }
            });

            ff = ff + 1;

          }

          dd = dd + 1;

        } while (dd < keylen);

        parse.splice({
          data: data
          , howmany: ff
          , index: cc + 1
        });

        parse.linesSpace = lines;
        parse.concat(data, store);

      }
    }

  },

  // An extension of Array.prototype.pop to work
  // across the data structure
  pop (data) {

    const output = {
      begin: data.begin.pop()
      , ender: data.ender.pop()
      , lexer: data.lexer.pop()
      , lines: data.lines.pop()
      , stack: data.stack.pop()
      , token: data.token.pop()
      , types: data.types.pop()
    };

    if (data === parse.data) parse.count = parse.count - 1;
    return output;
  },

  // An extension of Array.prototype.push to work
  // across the data structure
  push (data, record, structure) {

    function ender () {

      let a = parse.count;

      const begin = data.begin[a];

      if (
        (
          data.lexer[a] === 'markup' &&
          sparser.options.lexerOptions.markup.tagSort === true
        ) || (
          (
            data.lexer[a] === 'script' ||
            data.lexer[a] === 'style'
          ) && sparser.options.lexerOptions[data.lexer[a]].objectSort ===
          true
        )
      ) {

        // Sorting can result in a token whose begin value is greater than either
        // Its current index or the index of the end token, which results in
        // an endless loop. These end values are addressed at the end of
        // the "parser" function with parse.sortCorrection
        return;
      }

      do {

        if (
          data.begin[a] === begin || (
            data.begin[data.begin[a]] === begin &&
            data.types[a].indexOf('attribute') > -1 &&
            data.types[a].indexOf('attribute_end') < 0
          )
        ) {

          data.ender[a] = parse.count;
        } else {

          a = data.begin[a];
        }

        a = a - 1;

      } while (a > begin);

      if (a > -1) data.ender[a] = parse.count;
    };

    // parse_push_datanames
    parse.datanames.forEach(value => {
      data[value].push(record[value]);
    });

    if (data === parse.data) {

      parse.count = parse.count + 1;
      parse.linesSpace = 0;

      if (record.lexer !== 'style') {
        if (structure.replace(/(\{|\}|@|<|>|%|#|)/g, '') === '') {
          structure = record.types === 'else' ? 'else' : structure =
            record.token;
        }
      }

      if (record.types === 'start' || record.types.indexOf('_start') >
        0) {

        parse.structure.push([ structure, parse.count ]);

      } else if (record.types === 'end' || record.types.indexOf('_end') >
        0) {

        // This big condition fixes language specific else blocks that
        // are children of start/end blocks not associated with
        // the if/else chain

        let case_ender = 0;

        if (parse.structure.length > 2 && (
          data.types[parse.structure[parse.structure.length - 1][1]] === 'else' ||
          data.types[parse.structure[parse.structure.length - 1][1]].indexOf('_else') > 0
        ) && (
          data.types[parse.structure[parse.structure.length - 2][1]] === 'start' ||
          data.types[parse.structure[parse.structure.length - 2][1]].indexOf('_start') > 0
        ) && (
          data.types[parse.structure[parse.structure.length - 2][1] + 1] === 'else' ||
          data.types[parse.structure[parse.structure.length - 2][1] + 1].indexOf('_else') > 0
        )) {

          parse.structure.pop();
          data.begin[parse.count] = parse.structure[parse.structure.length - 1][1];
          data.stack[parse.count] = parse.structure[parse.structure.length - 1][0];
          data.ender[parse.count - 1] = parse.count;
          case_ender = data.ender[data.begin[parse.count] + 1];

        }

        ender();

        if (case_ender > 0) {
          data.ender[data.begin[parse.count] + 1] =
          case_ender;
        }

        parse.structure.pop();

      } else if (
        record.types === 'else' ||
        record.types.indexOf('_else') > 0
      ) {

        if (structure === '') structure = 'else';
        if (
          parse.count > 0 && (
            data.types[parse.count - 1] === 'start' ||
            data.types[parse.count - 1].indexOf('_start') > 0
          )
        ) {

          parse.structure.push([ structure, parse.count ]);
        } else {

          ender();

          if (structure === '') {
            parse.structure[parse.structure.length - 1] = [ 'else', parse
              .count ];
          } else {
            parse.structure[parse.structure.length - 1] = [ structure
              , parse.count ];
          }

        }
      }
    }
  },

  // A custom sort tool that is a bit more intelligent and
  // multidimensional than Array.prototype.sort
  safeSort (array, operation, recursive) {

    // parse_safeSort_extref
    // worthless function for backwards compatibility with older versions of V8 node.
    let extref = item => item;

    // parse_safeSort_arTest
    const arTest = (item) => Array.isArray(item) === true;

    // parse_safeSort_normal
    const normal = function parse_safeSort_normal (item) {

      let storeb = item;
      const done = [ item[0] ];

      // safeSort_normal_child
      function child () {
        let a = 0;
        const len = storeb.length;
        if (a < len) {
          do {
            if (arTest(storeb[a]) === true) {
              storeb[a] = parse_safeSort_normal(storeb[a]);
            }
            a = a + 1;
          } while (a < len);
        }
      };

      // parse_safeSort_normal_recurse
      function recurse (x) {

        let a = 0;

        const storea = [];
        const len = storeb.length;

        if (a < len) {

          do {

            if (storeb[a] !== x) storea.push(storeb[a]);
            a = a + 1;

          } while (a < len);
        }

        storeb = storea;

        if (storea.length > 0) {
          done.push(storea[0]);
          extref(storea[0]);
        } else {
          if (recursive === true) child();
          item = storeb;
        }
      };

      extref = recurse;
      recurse(array[0]);

      return item;
    };

    const descend = function parse_safeSort_descend (item) {

      let c = 0;
      const len = item.length;
      const storeb = item;

      const child = function parse_safeSort_descend_child () {
        let a = 0;
        const lenc = storeb.length;

        if (a < lenc) {
          do {
            if (arTest(storeb[a])) {
              storeb[a] = parse_safeSort_descend(
                storeb[a]
              );
            }
            a = a + 1;
          } while (a < lenc);
        }
      };

      const recurse = function parse_safeSort_descend_recurse (value) {

        let a = c;
        let b = 0;
        let d = 0;
        let e = 0;
        let ind = [];
        let key = storeb[c];
        let tstore = '';

        const tkey = typeof key;

        if (a < len) {

          do {
            tstore = typeof storeb[a];

            if (storeb[a] > key || (tstore > tkey)) {
              key = storeb[a];
              ind = [ a ];
            } else if (storeb[a] === key) {
              ind.push(a);
            }

            a = a + 1;

          } while (a < len);
        }

        d = ind.length;
        a = c;
        b = d + c;

        if (a < b) {

          do {
            storeb[ind[e]] = storeb[a];
            storeb[a] = key;
            e = e + 1;
            a = a + 1;
          } while (a < b);
        }

        c = c + d;

        if (c < len) {
          extref('');
        } else {
          if (recursive === true) child();
          item = storeb;
        }

        return value;
      };

      extref = recurse;
      recurse('');
      return item;

    };

    const ascend = function parse_safeSort_ascend (item) {

      let c = 0;
      const len = item.length;
      const storeb = item;

      const child = function parse_safeSort_ascend_child () {
        let a = 0;
        const lenc = storeb.length;
        if (a < lenc) {
          do {
            if (arTest(storeb[a]) === true) {
              storeb[a] = parse_safeSort_ascend(storeb[a]);
            }
            a = a + 1;
          } while (a < lenc);
        }
      };

      const recurse = function parse_safeSort_ascend_recurse (value) {

        let a = c;
        let b = 0;
        let d = 0;
        let e = 0;
        let ind = [];
        let key = storeb[c];
        let tstore = '';

        const tkey = typeof key;

        if (a < len) {

          do {

            tstore = typeof storeb[a];

            if (storeb[a] < key || tstore < tkey) {
              key = storeb[a];
              ind = [ a ];
            } else if (storeb[a] === key) {
              ind.push(a);
            }

            a = a + 1;

          } while (a < len);
        }

        d = ind.length;
        a = c;
        b = d + c;

        if (a < b) {
          do {
            storeb[ind[e]] = storeb[a];
            storeb[a] = key;
            e = e + 1;
            a = a + 1;
          } while (a < b);
        }

        c = c + d;

        if (c < len) {
          extref('');
        } else {
          if (recursive === true) child();
          item = storeb;
        }

        return value;
      };

      extref = recurse;
      recurse('');

      return item;

    };

    if (arTest(array) === false) return array;
    if (operation === 'normal') return normal(array);
    if (operation === 'descend') return descend(array);

    return ascend(array);

  },

  // This functionality provides corrections to the
  // "begin" and "ender" values after use of objectSort
  sortCorrection (start, end) {

    let a = start;
    let endslen = -1;

    const data = parse.data;
    const ends = [];
    const structure = (parse.structure.length < 2) ? [ -1 ] : [ parse
      .structure[parse.structure.length - 2][1] ];

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
        if (structure.length > 0) {
          data.begin[a] = structure[structure.length - 1];
        } else {
          data.begin[a] = -1;
        }
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
  },

  // A simple tool to take note of whitespace between tokens
  // parseSpacer
  spacer (args) {

    // * array - the characters to scan
    // * index - the index to start scanning from
    // * end   - the length of the array, to break the loop
    parse.linesSpace = 1;

    do {
      if (args.array[args.index] === '\n') {
        parse.linesSpace = parse.linesSpace + 1;
        parse.lineNumber = parse.lineNumber + 1;
      }

      if ((/\s/).test(args.array[args.index + 1]) === false) break;

      args.index = args.index + 1;

    } while (args.index < args.end);

    return args.index;

  },

  // An extension of Array.prototype.splice to work across
  // the data structure
  splice (spliceData) {

    const finalItem = [
      parse.data.begin[parse.count]
      , parse.data.token[parse.count]
    ];

    // * data    - The data object to alter
    // * howmany - How many indexes to remove
    // * index   - The index where to start
    // * record  - A new record to insert
    if (spliceData.record !== undefined && spliceData.record.token !==
      '') {

      // parse_splice_datanames
      parse.datanames.forEach((value) => {
        spliceData.data[value].splice(
          spliceData.index
          , spliceData.howmany
          , spliceData.record[value]
        );
      });

      if (spliceData.data === parse.data) {

        parse.count = (parse.count - spliceData.howmany) + 1;

        if (
          finalItem[0] !== parse.data.begin[parse.count] ||
          finalItem[1] !== parse.data.token[parse.count]
        ) {
          parse.linesSpace = 0;
        }
      }

      return;
    }

    // parse_splice_datanames
    parse.datanames.forEach((value) => {
      spliceData.data[value].splice(
        spliceData.index
        , spliceData.howmany
      );
    });

    if (spliceData.data === parse.data) {
      parse.count = parse.count - spliceData.howmany;
      parse.linesSpace = 0;
    }

  },

  // Parsing block comments and simultaneously applying word wrap
  // parse_wrapCommentBlock
  wrapCommentBlock (config) {

    let a = config.start;
    let b = 0;
    let c = 0;
    let d = 0;
    let len = 0;
    let lines = [];
    let space = '';
    let bline = '';
    let emptyLine = false;
    let bulletLine = false;
    let numberLine = false;
    let bigLine = false;
    let output = '';
    let terml = config.terminator.length - 1;
    let term = config.terminator.charAt(terml);
    let twrap = 0;

    const sanitize = input => `\\${input}`;
    const build = [];
    const second = [];
    const lf = (sparser.options.crlf === true) ? '\r\n' : '\n';
    const regEsc = (/(\/|\\|\||\*|\[|\]|\{|\})/g);

    const regEnd = new RegExp(
      `\\s*${config.terminator.replace(regEsc, sanitize)}$`
    );

    const regIgnore = new RegExp(
      `^(${config.opening.replace(regEsc, sanitize)}\\s*@prettify\\s*ignore:start)`
    );

    const regStart = new RegExp(
      `(${config.opening.replace(regEsc, sanitize)}\\s*)`
    );

    const wrap = sparser.options.wrap;

    // parse_wrapCommentBlock_emptyLines
    function emptyLines () {

      if (/^\s+$/.test(lines[b + 1]) === true || lines[b + 1] === '') {
        do {
          b = b + 1;
        } while (b < len && (/^\s+$/.test(lines[b + 1]) || lines[b +
            1] === ''));
      }

      if (b < len - 1) second.push('');

    };

    do {

      build.push(config.chars[a]);

      if (config.chars[a] === '\n') {
        parse.lineNumber = parse.lineNumber +
        1;
      }

      if (
        config.chars[a] === term &&
        config.chars.slice(a - terml, a + 1).join('') === config
          .terminator
      ) break;

      a = a + 1;

    } while (a < config.end);

    output = build.join('');

    if (regIgnore.test(output) === true) {

      let termination = '\n';
      a = a + 1;

      do {

        build.push(config.chars[a]);
        a = a + 1;

      } while (a < config.end && (
        config.chars[a - 1] !== 'd' || (
          config.chars[a - 1] === 'd' &&
            build.slice(build.length - 10).join('') !== 'ignore:end'
        )
      ));

      b = a;
      terml = config.opening.length - 1;
      term = config.opening.charAt(terml);

      do {

        if (
          config.opening === '/*' &&
          config.chars[b - 1] === '/' && (
            config.chars[b] === '*' ||
            config.chars[b] === '/'
          )
        ) break; // for script

        if (
          config.opening !== '/*' &&
          config.chars[b] === term &&
          config.chars.slice(b - terml, b + 1).join('') === config.opening
        ) break; // for markup

        b = b - 1;

      } while (b > config.start);

      if (config.opening === '/*' && config.chars[b] === '*') {
        termination = '\u002a/';
      } else if (config.opening !== '/*') {
        termination = config.terminator;
      }

      terml = termination.length - 1;
      term = termination.charAt(terml);

      if (termination !== '\n' || config.chars[a] !== '\n') {

        do {

          build.push(config.chars[a]);

          if (termination === '\n' && config.chars[a + 1] === '\n') break;
          if (
            config.chars[a] === term &&
            config.chars.slice(a - terml, a + 1).join('') === termination
          ) break;

          a = a + 1;

        } while (a < config.end);

      }

      if (config.chars[a] === '\n') a = a - 1;

      output = build.join('').replace(/\s+$/, '');
      return [ output, a ];
    }

    if (
      a === config.end ||
      wrap < 1 || (
        output.length <= wrap &&
        output.indexOf('\n') < 0
      ) ||
      sparser.options.preserveComment === true || (
        config.opening === '/*' &&
        output.indexOf('\n') > 0 &&
        output.replace('\n', '').indexOf('\n') > 0 &&
        (/\n(?!(\s*\*))/).test(output) === false
      )
    ) {
      return [ output, a ];
    }

    b = config.start;

    if (b > 0 && config.chars[b - 1] !== '\n' && (/\s/).test(config.chars[
      b - 1])) {
      do {
        b = b - 1;
      } while (
        b > 0 &&
        config.chars[b - 1] !== '\n' &&
        (/\s/).test(config.chars[b - 1]) === true
      );
    }

    space = config.chars.slice(b, config.start).join('');
    const spaceLine = new RegExp(`\n${space}`, 'g');
    lines = output.replace(/\r\n/g, '\n').replace(spaceLine, '\n').split(
      '\n'
    );
    len = lines.length;
    lines[0] = lines[0].replace(regStart, '');
    lines[len - 1] = lines[len - 1].replace(regEnd, '');

    if (len < 2) lines = lines[0].split(' ');

    if (lines[0] === '') {
      lines[0] = config.opening;
    } else {
      lines.splice(0, 0, config.opening);
    }

    len = lines.length;
    b = 0;

    do {

      bline = (b < len - 1) ? lines[b + 1].replace(/^\s+/, '') : '';

      if ((/^\s+$/).test(lines[b]) === true || lines[b] === '') {

        emptyLines();

      } else if (lines[b].slice(0, 4) === '    ') {

        second.push(lines[b]);

      } else if (
        lines[b].replace(/^\s+/, '').length > wrap &&
        lines[b].replace(/^\s+/, '').indexOf(' ') > wrap
      ) {

        lines[b] = lines[b].replace(/^\s+/, '');
        c = lines[b].indexOf(' ');
        second.push(lines[b].slice(0, c));
        lines[b] = lines[b].slice(c + 1);
        b = b - 1;

      } else {

        lines[b] = (
          config.opening === '/*' &&
          lines[b].indexOf('/*') !== 0
        ) ? `   ${
          lines[b]
            .replace(/^\s+/, '')
            .replace(/\s+$/, '')
            .replace(/\s+/g, ' ')
        }` : `${
          lines[b]
            .replace(/^\s+/, '')
            .replace(/\s+$/, '')
            .replace(/\s+/g, ' ')
        }`;

        twrap = (b < 1) ? wrap - (config.opening.length + 1) : wrap;
        c = lines[b].length;
        d = lines[b].replace(/^\s+/, '').indexOf(' ');

        if (c > twrap && d > 0 && d < twrap) {

          c = twrap;

          do {
            c = c - 1;
            if ((/\s/).test(lines[b].charAt(c)) && c <= wrap) break;
          } while (c > 0);

          if (
            lines[b].slice(0, 4) !== '    ' &&
            (/^\s*(\*|-)\s/).test(lines[b]) === true &&
            (/^\s*(\*|-)\s/).test(lines[b + 1]) === false
          ) {

            lines.splice(b + 1, 0, '* ');
          }

          if (
            lines[b].slice(0, 4) !== '    ' &&
            (/^\s*\d+\.\s/).test(lines[b]) === true &&
            (/^\s*\d+\.\s/).test(lines[b + 1]) === false) {

            lines.splice(b + 1, 0, '1. ');
          }

          if (c < 4) {

            second.push(lines[b]);
            bigLine = true;

          } else if (b === len - 1) {

            second.push(lines[b].slice(0, c));
            lines[b] = lines[b].slice(c + 1);
            bigLine = true;
            b = b - 1;

          } else if (
            (/^\s+$/).test(lines[b + 1]) === true ||
            lines[b + 1] === ''
          ) {

            second.push(lines[b].slice(0, c));
            lines[b] = lines[b].slice(c + 1);
            emptyLine = true;
            b = b - 1;

          } else if (
            lines[b + 1].slice(0, 4) !== '    ' &&
            (/^\s*(\*|-)\s/).test(lines[b + 1]) === true
          ) {

            second.push(lines[b].slice(0, c));
            lines[b] = lines[b].slice(c + 1);
            bulletLine = true;
            b = b - 1;

          } else if (
            lines[b + 1].slice(0, 4) !== '    ' &&
            (/^\s*\d+\.\s/).test(lines[b + 1]) === true
          ) {

            second.push(lines[b].slice(0, c));
            lines[b] = lines[b].slice(c + 1);
            numberLine = true;
            b = b - 1;

          } else if (lines[b + 1].slice(0, 4) === '    ') {

            second.push(lines[b].slice(0, c));
            lines[b] = lines[b].slice(c + 1);
            bigLine = true;
            b = b - 1;

          } else if (c + bline.length > wrap && bline.indexOf(' ') < 0) {

            second.push(lines[b].slice(0, c));
            lines[b] = lines[b].slice(c + 1);
            bigLine = true;
            b = b - 1;

          } else if (lines[b].replace(/^\s+/, '').indexOf(' ') < wrap) {
            lines[b + 1] = lines[b].length > wrap
              ? lines[b].slice(c + 1) + lf + lines[b + 1]
              : `${lines[b].slice(c + 1)} ${lines[b + 1]}`;

          }

          if (
            emptyLine === false &&
            bulletLine === false &&
            numberLine === false &&
            bigLine === false
          ) {
            lines[b] = lines[b].slice(0, c);
          }

        } else if (
          lines[b + 1] !== undefined && (
            (
              lines[b].length + bline.indexOf(' ') > wrap &&
              bline.indexOf(' ') > 0
            ) || (
              lines[b].length + bline.length > wrap &&
              bline.indexOf(' ') < 0
            )
          )
        ) {

          second.push(lines[b]);
          b = b + 1;

        } else if (
          lines[b + 1] !== undefined &&
          (/^\s+$/).test(lines[b + 1]) === false &&
          lines[b + 1] !== '' &&
          lines[b + 1].slice(0, 4) !== '    ' &&
          (/^\s*(\*|-|(\d+\.))\s/).test(lines[b + 1]) === false
        ) {
          lines[b + 1] = `${lines[b]} ${lines[b + 1]}`;
          emptyLine = true;
        }

        if (bigLine === false && bulletLine === false && numberLine ===
          false) {

          if (emptyLine === true) {

            emptyLine = false;

          } else if ((/^\s*(\*|-|(\d+\.))\s*$/).test(lines[b]) ===
            false) {

            if (
              b < len - 1 &&
              lines[b + 1] !== '' &&
              (/^\s+$/).test(lines[b]) === false &&
              lines[b + 1].slice(0, 4) !== '    ' &&
              (/^\s*(\*|-|(\d+\.))\s/).test(lines[b + 1]) === false

            ) {

              lines[b] = `${lines[b]} ${lines[b + 1]}`;
              lines.splice(b + 1, 1);
              len = len - 1;
              b = b - 1;

            } else {
              if (config.opening === '/*' && lines[b].indexOf('/*') !==
                0) {
                second.push(`   ${
                  lines[b]
                    .replace(/^\s+/, '')
                    .replace(/\s+$/, '')
                    .replace(/\s+/g, ' ')
                }`);
              } else {
                second.push(`${
                  lines[b]
                    .replace(/^\s+/, '')
                    .replace(/\s+$/, '')
                    .replace(/\s+/g, ' ')
                }`);
              }
            }
          }
        }

        bigLine = false;
        bulletLine = false;
        numberLine = false;
      }

      b = b + 1;

    } while (b < len);

    if (second.length > 0) {

      if (second[second.length - 1].length > wrap - (config.terminator
        .length + 1)) {
        second.push(config.terminator);
      } else {
        second[second.length - 1] =
          `${second[second.length - 1]} ${config.terminator}`;
      }

      output = second.join(lf);

    } else {
      lines[lines.length - 1] = lines[lines.length - 1] + config
        .terminator;
      output = lines.join(lf);
    }

    return [ output, a ];

  },

  // Parsing line comments and simultaneously applying word wrap
  // parse_wrapCommentLine
  wrapCommentLine (config) {

    let a = config.start;
    let b = 0;
    let output = '';
    let build = [];

    const wrap = sparser.options.wrap;

    const recurse = function parse_wrapCommentLine_recurse () {

      let line = '';

      do {

        b = b + 1;

        if (config.chars[b + 1] === '\n') return;

      } while (b < config.end && (/\s/).test(config.chars[b]) === true);

      if (config.chars[b] + config.chars[b + 1] === '//') {

        build = [];

        do {
          build.push(config.chars[b]);
          b = b + 1;
        } while (b < config.end && config.chars[b] !== '\n');

        line = build.join('');

        if (
          (/^\/\/ (\*|-|(\d+\.))/).test(line) === false &&
          line.slice(0, 6) !== '//    ' &&
          (/^\/\/\s*$/).test(line) === false
        ) {
          output =
            `${output} ${line.replace(/(^\/\/\s*)/, '').replace(/\s+$/, '')}`;
          a = b - 1;
          parse_wrapCommentLine_recurse();
        }
      }

    };

    const wordWrap = function parse_wrapCommentLine_wordWrap () {

      let c = 0;
      let d = 0;

      const lines = [];
      const record = (parse.count > -1) ? {
        begin: parse.structure[parse.structure.length - 1][1]
        , ender: -1
        , lexer: config.lexer
        , lines: parse.linesSpace
        , stack: parse.structure[parse.structure.length - 1][0]
        , token: parse.data.token[parse.count]
        , types: 'comment'
      } : {
        begin: -1
        , ender: -1
        , lexer: config.lexer
        , lines: parse.linesSpace
        , stack: 'global'
        , token: ''
        , types: 'comment'
      };

      output = output.replace(/\s+/g, ' ').replace(/\s+$/, '');
      d = output.length;

      if (wrap > d) return;

      do {
        c = wrap;

        if (output.charAt(c) !== ' ') {
          do {
            c = c - 1;
          } while (c > 0 && output.charAt(c) !== ' ');
          if (c < 3) {
            c = wrap;
            do {
              c = c + 1;
            } while (c < d - 1 && output.charAt(c) !== ' ');
          }
        }

        lines.push(output.slice(0, c));
        output = `// ${output.slice(c).replace(/^\s+/, '')}`;
        d = output.length;

      } while (wrap < d);

      c = 0;
      d = lines.length;

      do {
        record.token = lines[c];
        parse.push(parse.data, record, '');
        record.lines = 2;
        parse.linesSpace = 2;
        c = c + 1;
      } while (c < d);

    };

    do {
      build.push(config.chars[a]);
      a = a + 1;
    } while (a < config.end && config.chars[a] !== '\n');

    if (a === config.end) {

      // Necessary because the wrapping logic expects line termination
      config.chars.push('\n');

    } else {
      a = a - 1;
    }

    output = build.join('').replace(/\s+$/, '');

    if ((/^(\/\/\s*parse-ignore\u002dstart)/).test(output) === true) {
      let termination = '\n';
      a = a + 1;

      do {
        build.push(config.chars[a]);
        a = a + 1;
      } while (a < config.end && (
        config.chars[a - 1] !== 'd' || (
          config.chars[a - 1] === 'd' &&
            build.slice(build.length - 16).join('') !== 'parse-ignore-end'
        )
      ));

      b = a;

      // eslint-disable-next-line
      do {} while (b > config.start && config.chars[b - 1] === '/' && (
        config.chars[b] === '*' ||
          config.chars[b] === '/'
      ));

      if (config.chars[b] === '*') termination = '\u002a/';
      if (termination !== '\n' || config.chars[a] !== '\n') {

        do {
          build.push(config.chars[a]);
          if (termination === '\n' && config.chars[a + 1] === '\n') break;
          a = a + 1;
        } while (a < config.end && (
          termination === '\n' || (
            termination === '\u002a/' && (
              config.chars[a - 1] !== '*' ||
                config.chars[a] !== '/'
            )
          )
        ));

      }

      if (config.chars[a] === '\n') a = a - 1;
      output = build.join('').replace(/\s+$/, '');
      return [ output, a ];
    }

    if (
      output === '//' ||
      output.slice(0, 6) === '//    ' ||
      sparser.options.preserveComment === true
    ) {
      return [ output, a ];
    }

    output = output.replace(/(\/\/\s*)/, '// ');

    if (wrap < 1 || (a === config.end - 1 && parse.data.begin[parse
      .count] < 1)) {
      return [ output, a ];
    }

    b = a + 1;
    recurse();
    wordWrap();

    return [ output, a ];
  }

};

export { parse, sparser };
