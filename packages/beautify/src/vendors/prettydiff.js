/* eslint-disable */


export default (function parse_init() {
  const parser = function parse_parser() {
      const langstore = [sparser.options.language, sparser.options.lexer];
      parse.count = -1;
      parse.data = {
        begin: [],
        ender: [],
        lexer: [],
        lines: [],
        stack: [],
        token: [],
        types: []
      };
      parse.datanames = [
        "begin",
        "ender",
        "lexer",
        "lines",
        "stack",
        "token",
        "types"
      ];
      parse.linesSpace = 0;
      parse.lineNumber = 1;
      parse.structure = [
        ["global", -1]
      ];
      parse.structure.pop = function parse_structure_pop() {
        const len = parse.structure.length - 1,
          arr = parse.structure[len];
        if (len > 0) {
          parse
            .structure
            .splice(len, 1);
        }
        return arr;
      };
      if (sparser.options.language === "auto" || sparser.options.lexer === "auto") {
        let lang = sparser.libs.language.auto(sparser.options.source, "javascript");
        if (sparser.options.language === "auto") {
          sparser.options.language = lang[0];
        }
        if (sparser.options.lexer === "auto") {
          sparser.options.lexer = lang[1];
        }
      }
      if (typeof sparser.lexers[sparser.options.lexer] === "function") {
        sparser.parseerror = "";
        // reset references data if sparser is used on multiple files
        parse.references = [
          []
        ];
        sparser.options.lexer_options = (sparser.options.lexer_options || {});
        Object.keys(sparser.lexers).forEach(function parse_lexers(value) {
          sparser.options.lexer_options[value] = (sparser.options.lexer_options[value] || {});
        });
        // This line parses the code using a lexer file
        sparser.lexers[sparser.options.lexer](`${sparser.options.source} `);
        // restore language and lexer values
      } else {
        sparser.parseerror = `Specified lexer, ${sparser.options.lexer}, is not a function.`;
      }
      // validate that all the data arrays are the same length
      (function parser_checkLengths() {
        let a = 0,
          b = 0;
        const keys = Object.keys(parse.data),
          c = keys.length;
        do {
          b = a + 1;
          do {
            if (parse.data[keys[a]].length !== parse.data[keys[b]].length) {
              sparser.parseerror = `"${keys[a]}" array is of different length than "${keys[b]}"`;
              break;
            }
            b = b + 1;
          } while (b < c);
          a = a + 1;
        } while (a < c - 1);
      }());
      // fix begin values.  They must be reconsidered after reordering from object sort
      if (parse.data.begin.length > 0 && (sparser.options.lexer_options[sparser.options.lexer].object_sort === true || sparser.options.lexer_options.markup.tag_sort === true)) {
        parse.sortCorrection(0, parse.count + 1);
      }
      if (sparser.options.format === "csv") {
        let a = 0;
        const d = parse.data,
          data = ["index,begin,ender,lexer,lines,stack,token,types"],
          len = parse.count + 1;
        do {
          data.push([
            a,
            d.begin[a],
            d.ender[a],
            `"${d.lexer[a].replace(/"/g, "\"\"")}"`,
            d.lines[a],
            `"${d.stack[a].replace(/"/g, "\"\"")}"`,
            `"${d.token[a].replace(/"/g, "\"\"")}"`,
            `"${d.types[a].replace(/"/g, "\"\"")}"`
          ].join(","));
          a = a + 1;
        } while (a < len);
        return data.join("\r\n");
      }
      if (sparser.options.format === "markdown") {
        let a = 0,
          b = 0,
          strlen = 0,
          row = [],
          heading = "",
          line = "",
          str = "",
          begin = 0;
        const data = [],
          names = parse.datanames,
          longest = [1, 5, 5, 5, 5, 5, 5, 5],
          len = parse.count + 1;
        // first gather the string length of each data item
        longest[0] = String(parse.count).length;
        if (longest[0] < 5) {
          longest[0] = 5;
        }
        do {
          begin = String(parse.data.begin[a]).length;
          if (begin > longest[1]) {
            longest[1] = begin;
          }
          begin = String(parse.data.ender[a]).length;
          if (begin > longest[2]) {
            longest[2] = begin;
          }
          if (parse.data.lexer[a].length > longest[3]) {
            longest[3] = parse.data.lexer[a].length;
          }
          begin = String(parse.data.lines[a]).length;
          if (begin > longest[4]) {
            longest[4] = begin;
          }
          if (parse.data.stack[a].length > longest[5]) {
            longest[5] = parse.data.stack[a].length;
          }
          if (parse.data.token[a].length > longest[6]) {
            longest[6] = parse.data.token[a].length;
          }
          if (parse.data.types[a].length > longest[7]) {
            longest[7] = parse.data.types[a].length;
          }
          a = a + 1;
        } while (a < len);
        names.splice(0, 0, "index");
        // second create the heading
        a = 0;
        do {
          row.push(parse.datanames[a]);
          if (longest[a] > 5) {
            b = 5;
            do {
              row.push(" ");
              b = b + 1;
            } while (b < longest[a]);
          }
          row.push("|");
          a = a + 1;
        } while (a < 8);
        row.pop();
        heading = row.join("");
        row = [];
        // third create the line of dashes
        a = 0;
        do {
          b = 0;
          do {
            row.push("-");
            b = b + 1;
          } while (b < longest[a]);
          row.push("|");
          a = a + 1;
        } while (a < 8);
        row.pop();
        line = row.join("");
        row = [];
        // fourth create each data record
        a = 0;
        do {
          if (a % 100 === 0) {
            data.push(heading);
            data.push(line);
          }
          str = String(a);
          row.push(str);
          b = str.length;
          if (b < longest[0]) {
            do {
              row.push(" ");
              b = b + 1;
            } while (b < longest[0]);
          }
          row.push("|");
          b = 1;
          do {
            str = String(parse.data[parse.datanames[b]][a]);
            row.push(str);
            strlen = str.length;
            if (strlen < longest[b]) {
              do {
                row.push(" ");
                strlen = strlen + 1;
              } while (strlen < longest[b]);
            }
            row.push("|");
            b = b + 1;
          } while (b < 8);
          row.pop();
          data.push(row.join(""));
          row = [];
          a = a + 1;
        } while (a < len);
        return data.join("\r\n");
      }
      if (sparser.options.format === "minimal") {
        let a = 0;
        const data = [],
          len = parse.count + 1;
        do {
          data.push([
            parse.data.begin[a],
            parse.data.ender[a],
            parse.data.lexer[a],
            parse.data.lines[a],
            parse.data.stack[a],
            parse.data.token[a],
            parse.data.types[a]
          ]);
          a = a + 1;
        } while (a < len);
        return data;
      }
      if (sparser.options.format === "objects") {
        let a = 0;
        const data = [],
          len = parse.count + 1;
        do {
          data.push({
            begin: parse.data.begin[a],
            ender: parse.data.ender[a],
            lexer: parse.data.lexer[a],
            lines: parse.data.lines[a],
            stack: parse.data.stack[a],
            token: parse.data.token[a],
            types: parse.data.types[a]
          });
          a = a + 1;
        } while (a < len);
        return data;
      }
      if (sparser.options.format === "testprep") {
        let a = 0;
        const data = [],
          len = parse.count + 1;
        if (sparser.parseerror !== "") {
          return sparser.parseerror;
        }
        do {
          data.push(JSON.stringify({
            begin: parse.data.begin[a],
            ender: parse.data.ender[a],
            lexer: parse.data.lexer[a],
            lines: parse.data.lines[a],
            stack: parse.data.stack[a],
            token: parse.data.token[a],
            types: parse.data.types[a]
          }));
          a = a + 1;
        } while (a < len);
        return `[\n${data.join(",\n")}\n]`;
      }
      sparser.options.language = langstore[0];
      sparser.options.lexer = langstore[1];
      return parse.data;
    },
    parse = {
      // stores the final index location of the data arrays
      count: -1,
      // stores the various data arrays of the parse table
      data: {
        begin: [],
        ender: [],
        lexer: [],
        lines: [],
        stack: [],
        token: [],
        types: []
      },
      // stores the name of the data arrays.  This is used for internal automation
      datanames: ["begin", "ender", "lexer", "lines", "stack", "token", "types"],
      // stores the current line number from the input string for logging parse errors
      lineNumber: 1,
      // stores the 'lines' value before the next token
      linesSpace: 0,
      // stores the declared variable names for the script lexer.  This must be stored outside the script lexer since some languages recursive use of the script lexer
      references: [
        []
      ],
      // stores the stack and begin values by stacking depth
      structure: [
        ["global", -1]
      ],
      // an extension of Array.prototype.concat to work across the data structure.  This is an expensive operation.
      concat: function parse_concat(data, array) {
        parse
          .datanames
          .forEach(function parse_concat_datanames(value) {
            data[value] = data[value].concat(array[value]);
          });
        if (data === parse.data) {
          parse.count = data.token.length - 1;
        }
      },
      // the function that sorts object properties
      object_sort: function parse_objectSort(data) {
        let cc = parse.count,
          global = (data.lexer[cc] === "style" && parse.structure[parse.structure.length - 1][0] === "global"),
          dd = parse.structure[parse.structure.length - 1][1],
          ee = 0,
          ff = 0,
          gg = 0,
          behind = 0,
          commaTest = true,
          front = 0,
          keyend = 0,
          keylen = 0;
        const keys = [],
          length = parse.count,
          begin = dd,
          stack = (global === true) ?
          "global" :
          parse.structure[parse.structure.length - 1][0],
          style = (data.lexer[cc] === "style"),
          delim = (style === true) ?
          [";", "separator"] :
          [",", "separator"],
          lines = parse.linesSpace,
          sort = function parse_objectSort_sort(x, y) {
            let xx = x[0],
              yy = y[0];
            if (data.types[xx] === "comment") {
              do {
                xx = xx + 1;
              } while (xx < length && (data.types[xx] === "comment"));
              if (data.token[xx] === undefined) {
                return 1;
              }
            }
            if (data.types[yy] === "comment") {
              do {
                yy = yy + 1;
              } while (yy < length && (data.types[yy] === "comment"));
              if (data.token[yy] === undefined) {
                return 1;
              }
            }
            if (style === true) {
              if (data.token[xx].indexOf("@import") === 0 || data.token[yy].indexOf("@import") === 0) {
                // JavaScript's standard array sort uses implementation specific algorithms.
                // This simple numeric trick forces conformance.
                if (xx < yy) {
                  return -1;
                }
                return 1;
              }
              if (data.types[xx] !== data.types[yy]) {
                if (data.types[xx] === "function") {
                  return 1;
                }
                if (data.types[xx] === "variable") {
                  return -1;
                }
                if (data.types[xx] === "selector") {
                  return 1;
                }
                if (data.types[xx] === "property" && data.types[yy] !== "variable") {
                  return -1;
                }
                if (data.types[xx] === "mixin" && data.types[yy] !== "property" && data.types[yy] !== "variable") {
                  return -1;
                }
              }
            }
            if (data.token[xx].toLowerCase() > data.token[yy].toLowerCase()) {
              return 1;
            }
            return -1;
          },
          store = {
            begin: [],
            ender: [],
            lexer: [],
            lines: [],
            stack: [],
            token: [],
            types: []
          };
        behind = cc;
        do {
          if (data.begin[cc] === dd || (global === true && cc < behind && data.token[cc] === "}" && data.begin[data.begin[cc]] === -1)) {
            if (data.types[cc].indexOf("template") > -1) {
              return;
            }
            if (data.token[cc] === delim[0] || (style === true && data.token[cc] === "}" && data.token[cc + 1] !== ";")) {
              commaTest = true;
              front = cc + 1;
            } else if (style === true && data.token[cc - 1] === "}") {
              commaTest = true;
              front = cc;
            }
            if (front === 0 && data.types[0] === "comment") {
              // keep top comments at the top
              do {
                front = front + 1;
              } while (data.types[front] === "comment");
            } else if (data.types[front] === "comment" && data.lines[front] < 2) {
              // if a comment follows code on the same line then keep the comment next to the code it follows
              front = front + 1;
            }
            if (commaTest === true && (data.token[cc] === delim[0] || (style === true && data.token[cc - 1] === "}")) && front <= behind) {
              if (style === true && "};".indexOf(data.token[behind]) < 0) {
                behind = behind + 1;
              } else if (style === false && data.token[behind] !== ",") {
                behind = behind + 1;
              }
              keys.push([front, behind]);
              if (style === true && data.token[front] === "}") {
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
          if (data.types[ee] === "comment" && data.lines[ee] > 1) {
            do {
              ee = ee - 1;
            } while (ee > 0 && data.types[ee] === "comment");
            keys[keys.length - 1][0] = ee + 1;
          }
          if (data.types[cc + 1] === "comment" && cc === -1) {
            do {
              cc = cc + 1;
            } while (data.types[cc + 1] === "comment");
          }
          keys.push([
            cc + 1,
            ee
          ]);
        }
        if (keys.length > 1) {
          if (style === true || data.token[cc - 1] === "=" || data.token[cc - 1] === ":" || data.token[cc - 1] === "(" || data.token[cc - 1] === "[" || data.token[cc - 1] === "," || data.types[cc - 1] === "word" || cc === 0) {
            keys.sort(sort);
            keylen = keys.length;
            commaTest = false;
            dd = 0;
            do {
              keyend = keys[dd][1];
              if (style === true) {
                gg = keyend;
                if (data.types[gg] === "comment") {
                  gg = gg - 1;
                }
                if (data.token[gg] === "}") {
                  keyend = keyend + 1;
                  delim[0] = "}";
                  delim[1] = "end";
                } else {
                  delim[0] = ";";
                  delim[1] = "separator";
                }
              }
              ee = keys[dd][0];
              if (style === true && data.types[keyend - 1] !== "end" && data.types[keyend] === "comment" && data.types[keyend + 1] !== "comment" && dd < keylen - 1) {
                // missing a terminal comment causes many problems
                keyend = keyend + 1;
              }
              if (ee < keyend) {
                do {
                  if (style === false && dd === keylen - 1 && ee === keyend - 2 && data.token[ee] === "," && data.lexer[ee] === "script" && data.types[ee + 1] === "comment") {
                    // do not include terminal commas that are followed by a comment
                    ff = ff + 1;
                  } else {
                    parse.push(store, {
                      begin: data.begin[ee],
                      ender: data.begin[ee],
                      lexer: data.lexer[ee],
                      lines: data.lines[ee],
                      stack: data.stack[ee],
                      token: data.token[ee],
                      types: data.types[ee]
                    }, "");
                    ff = ff + 1;
                  }
                  //remove extra commas
                  if (data.token[ee] === delim[0] && (style === true || data.begin[ee] === data.begin[keys[dd][0]])) {
                    commaTest = true;
                  } else if (data.token[ee] !== delim[0] && data.types[ee] !== "comment") {
                    commaTest = false;
                  }
                  ee = ee + 1;
                } while (ee < keyend);
              }
              // injecting the list delimiter
              if (commaTest === false && store.token[store.token.length - 1] !== "x;" && (style === true || dd < keylen - 1)) {
                ee = store.types.length - 1;
                if (store.types[ee] === "comment") {
                  do {
                    ee = ee - 1;
                  } while (ee > 0 && (store.types[ee] === "comment"));
                }
                ee = ee + 1;
                parse.splice({
                  data: store,
                  howmany: 0,
                  index: ee,
                  record: {
                    begin: begin,
                    ender: parse.count,
                    lexer: store.lexer[ee - 1],
                    lines: 0,
                    stack: stack,
                    token: delim[0],
                    types: delim[1]
                  }
                });
                ff = ff + 1;
              }
              dd = dd + 1;
            } while (dd < keylen);
            parse.splice({
              data: data,
              howmany: ff,
              index: cc + 1
            });
            parse.linesSpace = lines;
            parse.concat(data, store);
            return;
          }
        }
        return;
      },
      // an extension of Array.prototype.pop to work across the data structure
      pop: function parse_pop(data) {
        const output = {
          begin: data.begin.pop(),
          ender: data.ender.pop(),
          lexer: data.lexer.pop(),
          lines: data.lines.pop(),
          stack: data.stack.pop(),
          token: data.token.pop(),
          types: data.types.pop()
        };
        if (data === parse.data) {
          parse.count = parse.count - 1;
        }
        return output;
      },
      // an extension of Array.prototype.push to work across the data structure
      push: function parse_push(data, record, structure) {
        const ender = function parse_push_ender() {
          let a = parse.count;
          const begin = data.begin[a];
          if ((data.lexer[a] === "markup" && sparser.options.lexer_options.markup.tag_sort === true) ||
            ((data.lexer[a] === "script" || data.lexer[a] === "style") && sparser.options.lexer_options[data.lexer[a]].object_sort === true)) {
            // sorting can result in a token whose begin value is greater than either
            // its current index or the index of the end token, which results in an endless loop
            //
            // these end values are addressed at the end of the "parser" function with parse.sortCorrection
            return;
          }
          do {
            if (data.begin[a] === begin || (data.begin[data.begin[a]] === begin && data.types[a].indexOf("attribute") > -1 && data.types[a].indexOf("attribute_end") < 0)) {
              data.ender[a] = parse.count;
            } else {
              a = data.begin[a];
            }
            a = a - 1;
          } while (a > begin);
          if (a > -1) {
            data.ender[a] = parse.count;
          }
        };
        parse
          .datanames
          .forEach(function parse_push_datanames(value) {
            data[value].push(record[value]);
          });
        if (data === parse.data) {
          parse.count = parse.count + 1;
          parse.linesSpace = 0;
          if (record.lexer !== "style") {
            if (structure.replace(/(\{|\}|@|<|>|%|#|)/g, "") === "") {
              if (record.types === "else") {
                structure = "else";
              } else {
                structure = record.token;
              }
            } else if ((/^<\?(=|(php))/).test(structure) === false) {
              structure = structure.replace(/(\{|\}|@|<|>|%|#|)\s*/g, "");
            }
          }
          if (record.types === "start" || record.types.indexOf("_start") > 0) {
            parse.structure.push([structure, parse.count]);
          } else if (record.types === "end" || record.types.indexOf("_end") > 0) {
            // this big condition fixes language specific else blocks that are children of start/end blocks not associated with the if/else chain
            let case_ender = 0;
            if (parse.structure.length > 2 &&
              (data.types[parse.structure[parse.structure.length - 1][1]] === "else" || data.types[parse.structure[parse.structure.length - 1][1]].indexOf("_else") > 0) &&
              (data.types[parse.structure[parse.structure.length - 2][1]] === "start" || data.types[parse.structure[parse.structure.length - 2][1]].indexOf("_start") > 0) &&
              (data.types[parse.structure[parse.structure.length - 2][1] + 1] === "else" || data.types[parse.structure[parse.structure.length - 2][1] + 1].indexOf("_else") > 0)) {
              parse.structure.pop();
              data.begin[parse.count] = parse.structure[parse.structure.length - 1][1];
              data.stack[parse.count] = parse.structure[parse.structure.length - 1][0];
              data.ender[parse.count - 1] = parse.count;
              case_ender = data.ender[data.begin[parse.count] + 1];
            }
            ender();
            if (case_ender > 0) {
              data.ender[data.begin[parse.count] + 1] = case_ender;
            }
            parse.structure.pop();
          } else if (record.types === "else" || record.types.indexOf("_else") > 0) {
            if (structure === "") {
              structure = "else";
            }
            if (parse.count > 0 && (data.types[parse.count - 1] === "start" || data.types[parse.count - 1].indexOf("_start") > 0)) {
              parse.structure.push([structure, parse.count]);
            } else {
              ender();
              if (structure === "") {
                parse.structure[parse.structure.length - 1] = ["else", parse.count];
              } else {
                parse.structure[parse.structure.length - 1] = [structure, parse.count];
              }
            }
          }
        }
      },
      // a custom sort tool that is a bit more intelligent and multidimensional than Array.prototype.sort
      safeSort: function parse_safeSort(array, operation, recursive) {
        let extref = function parse_safeSort_extref(item) {
          //worthless function for backwards compatibility with older versions of V8 node.
          return item;
        };
        const arTest = function parse_safeSort_arTest(item) {
            if (Array.isArray(item) === true) {
              return true;
            }
            return false;
          },
          normal = function parse_safeSort_normal(item) {
            let storeb = item;
            const done = [item[0]],
              child = function safeSort_normal_child() {
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
              },
              recurse = function parse_safeSort_normal_recurse(x) {
                let a = 0;
                const storea = [],
                  len = storeb.length;
                if (a < len) {
                  do {
                    if (storeb[a] !== x) {
                      storea.push(storeb[a]);
                    }
                    a = a + 1;
                  } while (a < len);
                }
                storeb = storea;
                if (storea.length > 0) {
                  done.push(storea[0]);
                  extref(storea[0]);
                } else {
                  if (recursive === true) {
                    child();
                  }
                  item = storeb;
                }
              };
            extref = recurse;
            recurse(array[0]);
            return item;
          },
          descend = function parse_safeSort_descend(item) {
            let c = 0;
            const len = item.length,
              storeb = item,
              child = function parse_safeSort_descend_child() {
                let a = 0;
                const lenc = storeb.length;
                if (a < lenc) {
                  do {
                    if (arTest(storeb[a]) === true) {
                      storeb[a] = parse_safeSort_descend(storeb[a]);
                    }
                    a = a + 1;
                  } while (a < lenc);
                }
              },
              recurse = function parse_safeSort_descend_recurse(value) {
                let a = c,
                  b = 0,
                  d = 0,
                  e = 0,
                  ind = [],
                  key = storeb[c],
                  tstore = "";
                const tkey = typeof key;
                if (a < len) {
                  do {
                    tstore = typeof storeb[a];
                    if (storeb[a] > key || (tstore > tkey)) {
                      key = storeb[a];
                      ind = [a];
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
                  extref("");
                } else {
                  if (recursive === true) {
                    child();
                  }
                  item = storeb;
                }
                return value;
              };
            extref = recurse;
            recurse("");
            return item;
          },
          ascend = function parse_safeSort_ascend(item) {
            let c = 0;
            const len = item.length,
              storeb = item,
              child = function parse_safeSort_ascend_child() {
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
              },
              recurse = function parse_safeSort_ascend_recurse(value) {
                let a = c,
                  b = 0,
                  d = 0,
                  e = 0,
                  ind = [],
                  key = storeb[c],
                  tstore = "";
                const tkey = typeof key;
                if (a < len) {
                  do {
                    tstore = typeof storeb[a];
                    if (storeb[a] < key || tstore < tkey) {
                      key = storeb[a];
                      ind = [a];
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
                  extref("");
                } else {
                  if (recursive === true) {
                    child();
                  }
                  item = storeb;
                }
                return value;
              };
            extref = recurse;
            recurse("");
            return item;
          };
        if (arTest(array) === false) {
          return array;
        }
        if (operation === "normal") {
          return normal(array);
        }
        if (operation === "descend") {
          return descend(array);
        }
        return ascend(array);
      },
      // this functionality provides corrections to the "begin" and "ender" values after use of object_sort
      sortCorrection: function parse_sortCorrection(start, end) {
        let a = start,
          endslen = -1;
        const data = parse.data,
          ends = [],
          structure = (parse.structure.length < 2) ?
          [-1] :
          [parse.structure[parse.structure.length - 2][1]];
        // this first loop solves for the begin values
        do {
          if (a > 0 &&
            data.types[a].indexOf("attribute") > -1 &&
            data.types[a].indexOf("end") < 0 &&
            data.types[a - 1].indexOf("start") < 0 &&
            data.types[a - 1].indexOf("attribute") < 0 &&
            data.lexer[a] === "markup") {
            structure.push(a - 1);
          }
          if (a > 0 &&
            data.types[a - 1].indexOf("attribute") > -1 &&
            data.types[a].indexOf("attribute") < 0 &&
            data.lexer[structure[structure.length - 1]] === "markup" &&
            data.types[structure[structure.length - 1]].indexOf("start") < 0) {
            structure.pop();
          }
          if (data.begin[a] !== structure[structure.length - 1]) {
            if (structure.length > 0) {
              data.begin[a] = structure[structure.length - 1];
            } else {
              data.begin[a] = -1;
            }
          }
          if (data.types[a].indexOf("else") > -1) {
            if (structure.length > 0) {
              structure[structure.length - 1] = a;
            } else {
              structure.push(a);
            }
          }
          if (data.types[a].indexOf("end") > -1) {
            structure.pop();
          }
          if (data.types[a].indexOf("start") > -1) {
            structure.push(a);
          }
          a = a + 1;
        } while (a < end);
        // and now for the ender values
        a = end;
        do {
          a = a - 1;
          if (data.types[a].indexOf("end") > -1) {
            ends.push(a);
            endslen = endslen + 1;
          }
          if (endslen > -1) {
            data.ender[a] = ends[endslen];
          } else {
            data.ender[a] = -1;
          }
          if (data.types[a].indexOf("start") > -1) {
            ends.pop();
            endslen = endslen - 1;
          }
        } while (a > start);
      },
      // a simple tool to take note of whitespace between tokens
      spacer: function parse_spacer(args) {
        // * array - the characters to scan
        // * index - the index to start scanning from
        // * end   - the length of the array, to break the loop
        parse.linesSpace = 1;
        do {
          if (args.array[args.index] === "\n") {
            parse.linesSpace = parse.linesSpace + 1;
            parse.lineNumber = parse.lineNumber + 1;
          }
          if ((/\s/).test(args.array[args.index + 1]) === false) {
            break;
          }
          args.index = args.index + 1;
        } while (args.index < args.end);
        return args.index;
      },
      // an extension of Array.prototype.splice to work across the data structure
      splice: function parse_splice(spliceData) {
        const finalItem = [parse.data.begin[parse.count], parse.data.token[parse.count]];
        // * data    - The data object to alter
        // * howmany - How many indexes to remove
        // * index   - The index where to start
        // * record  - A new record to insert
        if (spliceData.record !== undefined && spliceData.record.token !== "") {
          parse
            .datanames
            .forEach(function parse_splice_datanames(value) {
              spliceData
                .data[value]
                .splice(spliceData.index, spliceData.howmany, spliceData.record[value]);
            });
          if (spliceData.data === parse.data) {
            parse.count = (parse.count - spliceData.howmany) + 1;
            if (finalItem[0] !== parse.data.begin[parse.count] || finalItem[1] !== parse.data.token[parse.count]) {
              parse.linesSpace = 0;
            }
          }
          return;
        }
        parse
          .datanames
          .forEach(function parse_splice_datanames(value) {
            spliceData
              .data[value]
              .splice(spliceData.index, spliceData.howmany);
          });
        if (spliceData.data === parse.data) {
          parse.count = parse.count - spliceData.howmany;
          parse.linesSpace = 0;
        }
      },
      // parsing block comments and simultaneously applying word wrap
      wrapCommentBlock: function parse_wrapCommentBlock(config) {
        let a = config.start,
          b = 0,
          c = 0,
          d = 0,
          len = 0,
          lines = [],
          space = "",
          bline = "",
          spaceLine, emptyLine = false,
          bulletLine = false,
          numberLine = false,
          bigLine = false,
          output = "",
          terml = config.terminator.length - 1,
          term = config.terminator.charAt(terml),
          twrap = 0;
        const build = [],
          second = [],
          lf = (sparser.options.crlf === true) ?
          "\r\n" :
          "\n",
          sanitize = function parse_wrapCommentBlock_sanitize(input) {
            return `\\${input}`;
          },
          regEsc = (/(\/|\\|\||\*|\[|\]|\{|\})/g),
          regEnd = new RegExp(`\\s*${config.terminator.replace(regEsc, sanitize)}$`),
          regIgnore = new RegExp(`^(${config.opening.replace(regEsc, sanitize)}\\s*parse-ignore-start)`),
          regStart = new RegExp(`(${config.opening.replace(regEsc, sanitize)}\\s*)`),
          wrap = sparser.options.wrap,
          emptyLines = function parse_wrapCommentBlock_emptyLines() {
            if ((/^\s+$/).test(lines[b + 1]) === true || lines[b + 1] === "") {
              do {
                b = b + 1;
              } while (b < len && ((/^\s+$/).test(lines[b + 1]) === true || lines[b + 1] === ""));
            }
            if (b < len - 1) {
              second.push("");
            }
          };
        do {
          build.push(config.chars[a]);
          if (config.chars[a] === "\n") {
            parse.lineNumber = parse.lineNumber + 1;
          }
          if (config.chars[a] === term && config.chars.slice(a - terml, a + 1).join("") === config.terminator) {
            break;
          }
          a = a + 1;
        } while (a < config.end);
        output = build.join("");

        if (regIgnore.test(output) === true) {

          let termination = "\n";
          a = a + 1;

          do {

            build.push(config.chars[a]);
            a = a + 1;

          } while (
            a < config.end && (
              config.chars[a - 1] !== "d" || (
                config.chars[a - 1] === "d" &&
                build.slice(build.length - 16).join("") !== "parse-ignore-end"
              )
            )
          );

          b = a;
          terml = config.opening.length - 1;
          term = config.opening.charAt(terml);

          do {

            if (
              config.opening === "/*" &&
              config.chars[b - 1] === "/" && (
                config.chars[b] === "*" ||
                config.chars[b] === "/"
              )
            ) {
              break; // for script
            }

            if (
              config.opening !== "/*" &&
              config.chars[b] === term &&
              config.chars.slice(b - terml, b + 1).join("") === config.opening
            ) {
              break; // for markup
            }

            b = b - 1;

          } while (b > config.start);


          if (config.opening === "/*" && config.chars[b] === "*") {
            termination = "\u002a/";
          } else if (config.opening !== "/*") {
            termination = config.terminator;
          }

          terml = termination.length - 1;
          term = termination.charAt(terml);

          if (termination !== "\n" || config.chars[a] !== "\n") {

            do {

              build.push(config.chars[a]);

              if (termination === "\n" && config.chars[a + 1] === "\n")  break;
              if (
                config.chars[a] === term &&
                config.chars.slice(a - terml, a + 1).join("") === termination
              ) {
                break;
              }

              a = a + 1;

            } while (a < config.end);

          }

          if (config.chars[a] === "\n") a = a - 1;

          output = build.join("").replace(/\s+$/, "");


          return [ output, a ];

        }


        if (
          a === config.end ||  wrap < 1 || (
            output.length <= wrap &&
            output.indexOf("\n") < 0
          ) ||  sparser.options.preserve_comment === true || (
            config.opening === "/*" &&
            output.indexOf("\n") > 0 &&
            output.replace("\n", "").indexOf("\n") > 0 && (
              /\n(?!(\s*\*))/).test(output) === false
            )
          ) {

          return [output, a];
        }

        b = config.start;

        if (
          b > 0 &&
          config.chars[b - 1] !== "\n" &&
          (/\s/).test(config.chars[b - 1]) === true
        ) {

          do {
            b = b - 1;
          } while (
            b > 0 &&
            config.chars[b - 1] !== "\n" &&
            (/\s/).test(config.chars[b - 1]
            ) === true
          );
        }

        space = config.chars.slice(b, config.start).join("");
        spaceLine = new RegExp(`\n${space}`, "g");
        lines = output.replace(/\r\n/g, "\n").replace(spaceLine, "\n").split("\n");
        len = lines.length;
        lines[0] = lines[0].replace(regStart, "");
        lines[len - 1] = lines[len - 1].replace(regEnd, "");

        if (len < 2)   lines = lines[0].split(" ");


        if (lines[0] === "") {
          lines[0] = config.opening;
        } else {
          lines.splice(0, 0, config.opening);
        }

        len = lines.length;
        b = 0;

        do {

          bline = (b < len - 1)
            ?  lines[b + 1].replace(/^\s+/, "")
            :  "";

          if ((/^\s+$/).test(lines[b]) === true || lines[b] === "") {
            emptyLines();
          } else if (lines[b].slice(0, 4) === "    ") {
            second.push(lines[b]);
          } else if (lines[b].replace(/^\s+/, "").length > wrap && lines[b].replace(/^\s+/, "").indexOf(" ") > wrap) {
            lines[b] = lines[b].replace(/^\s+/, "");
            c = lines[b].indexOf(" ");
            second.push(lines[b].slice(0, c));
            lines[b] = lines[b].slice(c + 1);
            b = b - 1;
          } else {
            if (config.opening === "/*" && lines[b].indexOf("/*") !== 0) {
              lines[b] = `   ${lines[b].replace(/^\s+/, "").replace(/\s+$/, "").replace(/\s+/g, " ")}`;
            } else {
              lines[b] = `${lines[b].replace(/^\s+/, "").replace(/\s+$/, "").replace(/\s+/g, " ")}`;
            }
            twrap = (b < 1) ?
              wrap - (config.opening.length + 1) :
              wrap;
            c = lines[b].length;
            d = lines[b].replace(/^\s+/, "").indexOf(" ");
            if (c > twrap && d > 0 && d < twrap) {
              c = twrap;
              do {
                c = c - 1;
                if ((/\s/).test(lines[b].charAt(c)) === true && c <= wrap) {
                  break;
                }
              } while (c > 0);
              if (lines[b].slice(0, 4) !== "    " && (/^\s*(\*|-)\s/).test(lines[b]) === true && (/^\s*(\*|-)\s/).test(lines[b + 1]) === false) {
                lines.splice(b + 1, 0, "* ");
              }
              if (lines[b].slice(0, 4) !== "    " && (/^\s*\d+\.\s/).test(lines[b]) === true && (/^\s*\d+\.\s/).test(lines[b + 1]) === false) {
                lines.splice(b + 1, 0, "1. ");
              }
              if (c < 4) {
                second.push(lines[b]);
                bigLine = true;
              } else if (b === len - 1) {
                second.push(lines[b].slice(0, c));
                lines[b] = lines[b].slice(c + 1);
                bigLine = true;
                b = b - 1;
              } else if ((/^\s+$/).test(lines[b + 1]) === true || lines[b + 1] === "") {
                second.push(lines[b].slice(0, c));
                lines[b] = lines[b].slice(c + 1);
                emptyLine = true;
                b = b - 1;
              } else if (lines[b + 1].slice(0, 4) !== "    " && (/^\s*(\*|-)\s/).test(lines[b + 1]) === true) {
                second.push(lines[b].slice(0, c));
                lines[b] = lines[b].slice(c + 1);
                bulletLine = true;
                b = b - 1;
              } else if (lines[b + 1].slice(0, 4) !== "    " && (/^\s*\d+\.\s/).test(lines[b + 1]) === true) {
                second.push(lines[b].slice(0, c));
                lines[b] = lines[b].slice(c + 1);
                numberLine = true;
                b = b - 1;
              } else if (lines[b + 1].slice(0, 4) === "    ") {
                second.push(lines[b].slice(0, c));
                lines[b] = lines[b].slice(c + 1);
                bigLine = true;
                b = b - 1;
              } else if (c + bline.length > wrap && bline.indexOf(" ") < 0) {
                second.push(lines[b].slice(0, c));
                lines[b] = lines[b].slice(c + 1);
                bigLine = true;
                b = b - 1;
              } else if (lines[b].replace(/^\s+/, "").indexOf(" ") < wrap) {
                if (lines[b].length > wrap) {
                  lines[b + 1] = lines[b].slice(c + 1) + lf + lines[b + 1];
                } else {
                  lines[b + 1] = `${lines[b].slice(c + 1)} ${lines[b + 1]}`;
                }
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
                  lines[b].length + bline.indexOf(" ") > wrap &&
                  bline.indexOf(" ") > 0
                ) || (
                  lines[b].length + bline.length > wrap &&
                  bline.indexOf(" ") < 0
                )
              )
            ) {

              second.push(lines[b]);
              b = b + 1;

            } else if (
              lines[b + 1] !== undefined &&
              (/^\s+$/).test(lines[b + 1]) === false &&
              lines[b + 1] !== "" &&
              lines[b + 1].slice(0, 4) !== "    " &&
              (/^\s*(\*|-|(\d+\.))\s/).test(lines[b + 1]) === false
            ) {
              lines[b + 1] = `${lines[b]} ${lines[b + 1]}`;
              emptyLine = true;
            }

            if (bigLine === false && bulletLine === false && numberLine === false) {

              if (emptyLine === true) {

                emptyLine = false;

              } else if ((/^\s*(\*|-|(\d+\.))\s*$/).test(lines[b]) === false) {

                if (
                  b < len - 1 &&
                  lines[b + 1] !== "" &&
                  (/^\s+$/).test(lines[b]) === false &&
                  lines[b + 1].slice(0, 4) !== "    " &&
                  (/^\s*(\*|-|(\d+\.))\s/).test(lines[b + 1]) === false

                ) {

                  lines[b] = `${lines[b]} ${lines[b + 1]}`;
                  lines.splice(b + 1, 1);
                  len = len - 1;
                  b = b - 1;

                } else {

                  if (
                    config.opening === "/*" &&
                    lines[b].indexOf("/*") !== 0
                  ) {

                    second.push(`   ${lines[b].replace(/^\s+/, "").replace(/\s+$/, "").replace(/\s+/g, " ")}`);

                  } else {

                    second.push(`${lines[b].replace(/^\s+/, "").replace(/\s+$/, "").replace(/\s+/g, " ")}`);
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

          if (second[second.length - 1].length > wrap - (config.terminator.length + 1)) {
            second.push(config.terminator);
          } else {
            second[second.length - 1] = `${second[second.length - 1]} ${config.terminator}`;
          }

          output = second.join(lf);

        } else {
          lines[lines.length - 1] = lines[lines.length - 1] + config.terminator;
          output = lines.join(lf);
        }

        return [output, a];

      },
      // parsing line comments and simultaneously applying word wrap
      wrapCommentLine: function parse_wrapCommentLine(config) {

        let a = config.start,
          b = 0,
          output = "",
          build = [];

        const wrap = sparser.options.wrap,
          recurse = function parse_wrapCommentLine_recurse() {

            let line = "";

            do {

              b = b + 1;

              if (config.chars[b + 1] === "\n")   return;

            } while (b < config.end && (/\s/).test(config.chars[b]) === true);

            if (config.chars[b] + config.chars[b + 1] === "//") {

              build = [];

              do {
                build.push(config.chars[b]);
                b = b + 1;
              } while (
                b < config.end &&
                config.chars[b] !== "\n"
              );

              line = build.join("");

              if (
                (/^\/\/ (\*|-|(\d+\.))/).test(line) === false &&
                line.slice(0, 6) !== "//    " &&
                (/^\/\/\s*$/).test(line) === false
              ) {
                output = `${output} ${line.replace(/(^\/\/\s*)/, "").replace(/\s+$/, "")}`;
                a = b - 1;
                parse_wrapCommentLine_recurse();
              }

            }

          },
          wordWrap = function parse_wrapCommentLine_wordWrap() {
            let c = 0,
              d = 0;
            const lines = [],
              record = (parse.count > -1) ?
              {
                begin: parse.structure[parse.structure.length - 1][1],
                ender: -1,
                lexer: config.lexer,
                lines: parse.linesSpace,
                stack: parse.structure[parse.structure.length - 1][0],
                token: parse.data.token[parse.count],
                types: "comment"
              } :
              {
                begin: -1,
                ender: -1,
                lexer: config.lexer,
                lines: parse.linesSpace,
                stack: "global",
                token: "",
                types: "comment"
              };
            output = output.replace(/\s+/g, " ").replace(/\s+$/, "");
            d = output.length;
            if (wrap > d) {
              return;
            }
            do {
              c = wrap;
              if (output.charAt(c) !== " ") {
                do {
                  c = c - 1;
                } while (c > 0 && output.charAt(c) !== " ");
                if (c < 3) {
                  c = wrap;
                  do {
                    c = c + 1;
                  } while (c < d - 1 && output.charAt(c) !== " ");
                }
              }
              lines.push(output.slice(0, c));
              output = `// ${output.slice(c).replace(/^\s+/, "")}`;
              d = output.length;
            } while (wrap < d);
            c = 0;
            d = lines.length;
            do {
              record.token = lines[c];
              parse.push(parse.data, record, "");
              record.lines = 2;
              parse.linesSpace = 2;
              c = c + 1;
            } while (c < d);
          };
        do {
          build.push(config.chars[a]);
          a = a + 1;
        } while (a < config.end && config.chars[a] !== "\n");
        if (a === config.end) {
          // necessary because the wrapping logic expects line termination
          config.chars.push("\n");
        } else {
          a = a - 1;
        }
        output = build.join("").replace(/\s+$/, "");

        if ((/^(\/\/\s*parse-ignore\u002dstart)/).test(output) === true) {
          let termination = "\n";
          a = a + 1;
          do {
            build.push(config.chars[a]);
            a = a + 1;
          } while (
            a < config.end && (
              config.chars[a - 1] !== "d" || (
                config.chars[a - 1] === "d" &&
                build.slice(build.length - 16).join("") !== "parse-ignore-end"
              )
            )
          );

          b = a;

          do {} while (
            b > config.start &&
            config.chars[b - 1] === "/" && (
              config.chars[b] === "*" ||
              config.chars[b] === "/"
            )
          );


          if (config.chars[b] === "*") {
            termination = "\u002a/";
          }

          if (termination !== "\n" || config.chars[a] !== "\n") {

            do {
              build.push(config.chars[a]);
              if (termination === "\n" && config.chars[a + 1] === "\n") {
                break;
              }
              a = a + 1;
            } while (
              a < config.end && (
                termination === "\n" || (
                  termination === "\u002a/" && (
                    config.chars[a - 1] !== "*" ||
                    config.chars[a] !== "/"
                  )
                )
              )
            );
          }

          if (config.chars[a] === "\n") a = a - 1;

          output = build.join("").replace(/\s+$/, "");

          return [output, a];
        }
        if (
          output === "//" ||
          output.slice(0, 6) === "//    " ||
          sparser.options.preserve_comment === true
        ) {
          return [output, a];
        }

        output = output.replace(/(\/\/\s*)/, "// ");

        if (
          wrap < 1 || (
            a === config.end - 1 &&
            parse.data.begin[parse.count] < 1
          )
        ) {
          return [output, a];
        }

        b = a + 1;
        recurse();
        wordWrap();

        return [output, a];

      }
    },
    sparser = {
      lexers: {},
      libs: {},
      options: {
        "lexer_options": {
          "markup": {
            "attribute_sort": false,
            "attribute_sort_list": "",
            "parse_space": false,
            "preserve_text": false,
            "quote_convert": "none",
            "tag_merge": false,
            "tag_sort": false,
            "unformatted": false
          },
          "script": {
            "end_comma": "none",
            "object_sort": false,
            "quote_convert": "none",
            "variable_list": "none"
          },
          "style": {
            "no_lead_zero": false,
            "object_sort": false,
            "quote_convert": "none"
          }
        },
        "correct": false,
        "crlf": false,
        "format": "arrays",
        "language": "auto",
        "lexer": "auto",
        "preserve_comment": false,
        "source": "",
        "wrap": 0
      },
      parse: parse,
      parser: parser,
      parseerror: "",
      version: {
        date: "18 Aug 2019",
        number: "1.4.12"
      }
    },
    prettydiff = function mode(diffmeta) {
      const pdcomment = function mode_pdcomment() {
          const ops = prettydiff.sparser.options;
          let sindex = options.source.search(/((\/(\*|\/))|<!--*)\s*prettydiff\.com/),
            dindex = options.diff.search(/((\/(\*|\/))|<!--*)\s*prettydiff\.com/),
            a = 0,
            b = 0,
            keys, def, len;
          // parses the prettydiff settings comment
          //
          // - Source Priorities:
          // * the prettydiff comment is only accepted if it occurs before non-comments (near the top)
          // * options.source is the priority material for reading the comment
          // * the prettydiff comment will be processed from options.diff only if it present there, missing from options.source, and options.mode is diff
          //
          // - Examples:
          //    /*prettydiff.com width:80 preserve:4*/
          //    /* prettydiff.com width:80 preserve:4 */
          //    /*prettydiff.com width=80 preserve=4 */
          //    // prettydiff.com width=80 preserve:4
          //    <!-- prettydiff.com width:80 preserve=4 -->
          //    <!--prettydiff.com width:40 preserve:2-->
          //
          // - Parsing Considerations:
          // * there may be any amount of space at the start or end of the comment
          // * "prettydiff.com" must exist at the start of the comment
          // * comment must exist prior to non-comment tokens (near top of code)
          // * parameters are name value pairs separated by white space
          // * the delimiter separating name and value is either ":" or "=" characters
          if ((sindex > -1 && (sindex === 0 || "\"':".indexOf(options.source.charAt(sindex - 1)) < 0)) || (options.mode === "diff" && dindex > -1 && (dindex === 0 || "\"':".indexOf(options.diff.charAt(dindex - 1)) < 0))) {
            let pdcom = sindex,
              a = (pdcom > -1) ?
              pdcom :
              dindex,
              b = 0,
              quote = "",
              item = "",
              lang = "",
              lex = "",
              valkey = [],
              op = [];
            const ops = [],
              source = (pdcom > -1) ?
              options.source :
              options.diff,
              len = source.length,
              comment = (source.charAt(a) === "<") ?
              "<!--" :
              (source.charAt(a + 1) === "/") ?
              "//" :
              "/\u002a",
              esc = function mode_pdcomment_esc() {
                if (source.charAt(a - 1) !== "\\") {
                  return false;
                }
                let x = a;
                do {
                  x = x - 1;
                } while (x > 0 && source.charAt(x) === "\\");
                if ((a - x) % 2 === 0) {
                  return true;
                }
                return false;
              };
            do {
              if (source.slice(a - 3, a) === "com") {
                break;
              }
              a = a + 1;
            } while (a < len);
            do {
              if (esc() === false) {
                if (quote === "") {
                  if (source.charAt(a) === "\"") {
                    quote = "\"";
                    if (ops.length > 0 && (ops[ops.length - 1].charAt(ops[ops.length - 1].length - 1) === ":" || ops[ops.length - 1].charAt(ops[ops.length - 1].length - 1) === "=")) {
                      b = a;
                    }
                  } else if (source.charAt(a) === "'") {
                    quote = "'";
                    if (ops.length > 0 && (ops[ops.length - 1].charAt(ops[ops.length - 1].length - 1) === ":" || ops[ops.length - 1].charAt(ops[ops.length - 1].length - 1) === "=")) {
                      b = a;
                    }
                  } else if (source.charAt(a) === "`") {
                    quote = "`";
                    if (ops.length > 0 && (ops[ops.length - 1].charAt(ops[ops.length - 1].length - 1) === ":" || ops[ops.length - 1].charAt(ops[ops.length - 1].length - 1) === "=")) {
                      b = a;
                    }
                  } else if ((/\s/).test(source.charAt(a)) === false && b === 0) {
                    b = a;
                  } else if (source.charAt(a) === "," || ((/\s/).test(source.charAt(a)) === true && b > 0)) {
                    item = source.slice(b, a);
                    if (ops.length > 0) {
                      if (ops.length > 0 && (item === ":" || item === "=") && ops[ops.length - 1].indexOf("=") < 0 && ops[ops.length - 1].indexOf(":") < 0) {
                        // for cases where white space is between option name and assignment operator
                        ops[ops.length - 1] = ops[ops.length - 1] + item;
                        b = a;
                      } else if (ops.length > 0 && (ops[ops.length - 1].charAt(ops[ops.length - 1].length - 1) === ":" || ops[ops.length - 1].charAt(ops[ops.length - 1].length - 1) === "=")) {
                        // for cases where white space is between assignment operator and value
                        ops[ops.length - 1] = ops[ops.length - 1] + item;
                        b = 0;
                      } else {
                        ops.push(item);
                        b = 0;
                      }
                    } else {
                      ops.push(item);
                      b = 0;
                    }
                  }
                  if (comment === "<!--" && source.slice(a - 2, a + 1) === "-->") {
                    break;
                  }
                  if (comment === "//" && source.charAt(a) === "\n") {
                    break;
                  }
                  if (comment === "/\u002a" && source.slice(a - 1, a + 1) === "\u002a/") {
                    break;
                  }
                } else if (source.charAt(a) === quote && quote !== "${") {
                  quote = "";
                } else if (quote === "`" && source.slice(a, a + 2) === "${") {
                  quote = "${";
                } else if (quote === "${" && source.charAt(a) === "}") {
                  quote = "`";
                }
              }
              a = a + 1;
            } while (a < len);
            if (b > 0) {
              quote = source.slice(b, a + 1);
              if (comment === "<!--") {
                quote = quote.replace(/\s*-+>$/, "");
              } else if (comment === "//") {
                quote = quote.replace(/\s+$/, "");
              } else {
                quote = quote.replace(/\s*\u002a\/$/, "");
              }
              ops.push(quote);
            }
            a = ops.length;
            if (a > 0) {
              do {
                a = a - 1;
                if (ops[a].indexOf("=") > 0 && ops[a].indexOf(":") > 0) {
                  if (ops[a].indexOf("=") < ops[a].indexOf(":")) {
                    op = [ops[a].slice(0, ops[a].indexOf("=")), ops[a].slice(ops[a].indexOf("=") + 1)];
                  }
                } else if (ops[a].indexOf("=") > 0) {
                  op = [ops[a].slice(0, ops[a].indexOf("=")), ops[a].slice(ops[a].indexOf("=") + 1)];
                } else if (ops[a].indexOf(":") > 0) {
                  op = [ops[a].slice(0, ops[a].indexOf(":")), ops[a].slice(ops[a].indexOf(":") + 1)];
                } else if (prettydiff.api.optionDef[ops[a]] !== undefined && prettydiff.api.optionDef[ops[a]].type === "boolean") {
                  options[ops[a]] = true;
                }
                if (op.length === 2 && prettydiff.api.optionDef[op[0]] !== undefined) {
                  if ((op[1].charAt(0) === "\"" || op[1].charAt(0) === "'" || op[1].charAt(0) === "`") && op[1].charAt(op[1].length - 1) === op[1].charAt(0)) {
                    op[1] = op[1].slice(1, op[1].length - 1);
                  }
                  if (prettydiff.api.optionDef[op[0]].type === "number" && isNaN(Number(op[1])) === false) {
                    options[op[0]] = Number(op[1]);
                  } else if (prettydiff.api.optionDef[op[0]].type === "boolean") {
                    if (op[1] === "true") {
                      options[op[0]] = true;
                    } else if (op[1] === "false") {
                      options[op[0]] = false;
                    }
                  } else {
                    if (prettydiff.api.optionDef[op[0]].values !== undefined) {
                      valkey = Object.keys(prettydiff.api.optionDef[op[0]].values);
                      b = valkey.length;
                      do {
                        b = b - 1;
                        if (valkey[b] === op[1]) {
                          options[op[0]] = op[1];
                          break;
                        }
                      } while (b > 0);
                    } else {
                      if (op[0] === "language") {
                        lang = op[1];
                      } else if (op[0] === "lexer") {
                        lex = op[1];
                      }
                      options[op[0]] = op[1];
                    }
                  }
                }
              } while (a > 0);
              if (lex === "" && lang !== "") {
                lex = prettydiff.api.language.setlexer(lang);
              }
            }
          }
          if (options.mode === "diff") {
            modeValue = "beautify";
          }
          if (options.mode === "minify" && options.minify_wrap === false) {
            options.wrap = -1;
          }
          if (options.lexer === "script") {
            let styleguide = {
                airbnb: function mode_pdcomment_styleairbnb() {
                  options.brace_padding = true;
                  options.correct = true;
                  options.lexerOptions.script.end_comma = "always";
                  options.indent_char = " ";
                  options.indent_size = 2;
                  options.preserve = 1;
                  options.quote_convert = "single";
                  options.variable_list = "each";
                  options.wrap = 80;
                },
                crockford: function mode_pdcomment_stylecrockford() {
                  options.brace_padding = false;
                  options.correct = true;
                  options.else_line = false;
                  options.lexerOptions.script.end_comma = "never";
                  options.indent_char = " ";
                  options.indent_size = 4;
                  options.no_case_indent = true;
                  options.space = true;
                  options.variable_list = "each";
                  options.vertical = false;
                },
                google: function mode_pdcomment_stylegoogle() {
                  options.correct = true;
                  options.indent_char = " ";
                  options.indent_size = 4;
                  options.preserve = 1;
                  options.quote_convert = "single";
                  options.vertical = false;
                  options.wrap = -1;
                },
                jquery: function mode_pdcomment_stylejquery() {
                  options.brace_padding = true;
                  options.correct = true;
                  options.indent_char = "\u0009";
                  options.indent_size = 1;
                  options.quote_convert = "double";
                  options.variable_list = "each";
                  options.wrap = 80;
                },
                jslint: function mode_pdcomment_stylejslint() {
                  options.brace_padding = false;
                  options.correct = true;
                  options.else_line = false;
                  options.lexerOptions.script.end_comma = "never";
                  options.indent_char = " ";
                  options.indent_size = 4;
                  options.no_case_indent = true;
                  options.space = true;
                  options.variable_list = "each";
                  options.vertical = false;
                },
                mrdoobs: function mode_pdcomment_stylemrdoobs() {
                  options.brace_line = true;
                  options.brace_padding = true;
                  options.correct = true;
                  options.indent_char = "\u0009";
                  options.indent_size = 1;
                  options.vertical = false;
                },
                mediawiki: function mode_pdcomment_stylemediawiki() {
                  options.brace_padding = true;
                  options.correct = true;
                  options.indent_char = "\u0009";
                  options.indent_size = 1;
                  options.preserve = 1;
                  options.quote_convert = "single";
                  options.space = false;
                  options.wrap = 80;
                },
                meteor: function mode_pdcomment_stylemeteor() {
                  options.correct = true;
                  options.indent_char = " ";
                  options.indent_size = 2;
                  options.wrap = 80;
                },
                semistandard: function mode_pdcomment_stylessemistandard() {
                  options.brace_line = false;
                  options.brace_padding = false;
                  options.braces = false;
                  options.correct = true;
                  options.end_comma = "never";
                  options.indent_char = " ";
                  options.indent_size = 2;
                  options.new_line = false;
                  options.no_semicolon = false;
                  options.preserve = 1;
                  options.quote_convert = "single";
                  options.space = true;
                  options.ternary_line = false;
                  options.variable_list = "each";
                  options.vertical = false;
                  options.wrap = 0;
                },
                standard: function mode_pdcomment_stylestandard() {
                  options.brace_line = false;
                  options.brace_padding = false;
                  options.braces = false;
                  options.correct = true;
                  options.end_comma = "never";
                  options.indent_char = " ";
                  options.indent_size = 2;
                  options.new_line = false;
                  options.no_semicolon = true;
                  options.preserve = 1;
                  options.quote_convert = "single";
                  options.space = true;
                  options.ternary_line = false;
                  options.variable_list = "each";
                  options.vertical = false;
                  options.wrap = 0;
                },
                yandex: function mode_pdcomment_styleyandex() {
                  options.brace_padding = false;
                  options.correct = true;
                  options.quote_convert = "single";
                  options.variable_list = "each";
                  options.vertical = false;
                }
              },
              brace_style = {
                collapse: function mode_pdcomment_collapse() {
                  options.brace_line = false;
                  options.brace_padding = false;
                  options.braces = false;
                  options.format_object = "indent";
                  options.never_flatten = true;
                },
                "collapse-preserve-inline": function mode_pdcomment_collapseInline() {
                  options.brace_line = false;
                  options.brace_padding = true;
                  options.braces = false;
                  options.format_object = "inline";
                  options.never_flatten = false;
                },
                expand: function mode_pdcomment_expand() {
                  options.brace_line = false;
                  options.brace_padding = false;
                  options.braces = true;
                  options.format_object = "indent";
                  options.never_flatten = true;
                }
              };
            if (styleguide[options.styleguide] !== undefined) {
              styleguide[options.styleguide]();
            }
            if (brace_style[options.brace_style] !== undefined) {
              brace_style[options.brace_style]();
            }
            if (options.language === "json") {
              options.wrap = 0;
            } else if (options.language === "titanium") {
              options.correct = false;
            }
            if (options.language !== "javascript" && options.language !== "typescript" && options.language !== "jsx") {
              options.jsscope = "none";
            }
          }
          if (options.lexer !== "markup" || options.language === "text") {
            options.diff_rendered_html = false;
          } else if (options.api === "node" && options.read_method !== "file") {
            options.diff_rendered_html = false;
          }
          def = prettydiff.sparser.libs.optionDef;
          keys = Object.keys(def);
          len = keys.length;
          do {
            if (options[keys[a]] !== undefined) {
              if (def[keys[a]].lexer[0] === "all") {
                ops[keys[a]] = options[keys[a]];
              } else {
                b = def[keys[a]].lexer.length;
                do {
                  b = b - 1;
                  if (keys[a] !== "parse_space" || (options.mode === "parse" && keys[a] === "parse_space" && options[keys[a]] === true)) {
                    ops.lexer_options[def[keys[a]].lexer[b]][keys[a]] = options[keys[a]];
                  }
                } while (b > 0);
              }
            }
            a = a + 1;
          } while (a < len);
        },
        options = prettydiff.options,
        lf = (options.crlf === true) ?
        "\r\n" :
        "\n";
      let modeValue = options.mode,
        result = "";
      if (options.api === "node" && (options.read_method === "directory" || options.read_method === "subdirectory")) {
        if (options.mode === "parse" && options.parse_format === "table") {
          return "Error: option parse_format with value 'table' is not available with read_method directory or subdirectory.";
        }
      }
      if (options.language === "text" && options.mode !== "diff") {
        options.language = "auto";
      }
      if (options.lexer === "text" && options.mode !== "diff") {
        options.lexer = "auto";
      }
      if (options.language === "text" || options.lexer === "text") {
        options.language = "text";
        options.language_name = "Plain Text";
        options.lexer = "text";
      } else if (options.language === "auto" || options.lexer === "auto") {
        const def = (options.language_default === "" || options.language_default === null || options.language_default === undefined) ?
          "javascript" :
          options.language_default;
        let lang = prettydiff.api.language.auto(options.source, def);
        if (lang[0] === "text") {
          if (options.mode === "diff") {
            lang[2] = "Plain Text";
          } else {
            lang = ["javascript", "script", "JavaScript"];
          }
        } else if (lang[0] === "csv") {
          lang[2] = "CSV";
        }
        if (options.language === "auto") {
          options.language = lang[0];
          options.language_name = lang[2];
        }
        if (options.lexer === "auto") {
          options.lexer = lang[1];
        }
      }
      pdcomment();
      if (options.mode === "parse") {
        const parse_format = (options.parse_format === "htmltable") ?
          "table" :
          options.parse_format,
          api = (options.parse_format === "htmltable") ?
          "dom" :
          options.api;
        options.parsed = prettydiff.sparser.parser();
        if (parse_format === "table") {
          if (api === "dom") {
            const parsLen = options.parsed.token.length,
              keys = Object.keys(options.parsed),
              keylen = keys.length,
              headingString = (function mode_parseHeading() {
                const hout = ["<tr><th>index</th>"];
                let b = 0;
                do {
                  if (keys[b] !== "token") {
                    hout.push(`<th>${keys[b]}</th>`);
                  }
                  b = b + 1;
                } while (b < keylen);
                hout.push("<th>token</th></tr>");
                return hout.join("");
              }()),
              row = function mode_parseRow() {
                const hout = ["<tr>"];
                let b = 0;
                hout.push(`<td>${a}</td>`);
                do {
                  if (keys[b] !== "token") {
                    hout.push(`<td>${options.parsed[keys[b]][a].toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>`);
                  }
                  b = b + 1;
                } while (b < keylen);
                hout.push(`<td>${options.parsed.token[a].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td></tr>`);
                return hout.join("");
              },
              parsOut = [];
            parsOut.push(`<p><strong>${parsLen}</strong> total parsed tokens</p>`);
            parsOut.push("<table><thead>");
            parsOut.push(headingString);
            parsOut.push("</thead><tbody>");
            let a = 0;
            do {
              if (a % 100 === 0 && a > 0) {
                parsOut.push(headingString);
              }
              parsOut.push(row());
              a = a + 1;
            } while (a < parsLen);
            parsOut.push("</tbody></table>");
            result = parsOut.join("");
          } else {
            let a = 0,
              str = [];
            const outputArrays = options.parsed,
              nodeText = {
                angry: "\u001b[1m\u001b[31m",
                blue: "\u001b[34m",
                bold: "\u001b[1m",
                cyan: "\u001b[36m",
                green: "\u001b[32m",
                nocolor: "\u001b[39m",
                none: "\u001b[0m",
                purple: "\u001b[35m",
                red: "\u001b[31m",
                underline: "\u001b[4m",
                yellow: "\u001b[33m"
              },
              output = [],
              b = outputArrays.token.length,
              pad = function mode_parsePad(x, y) {
                const cc = x
                  .toString()
                  .replace(/\s/g, " ");
                let dd = y - cc.length;
                str.push(cc);
                if (dd > 0) {
                  do {
                    str.push(" ");
                    dd = dd - 1;
                  } while (dd > 0);
                }
                str.push(" | ");
              },
              heading = "index | begin | ender | lexer  | lines | stack       | types       | token",
              bar = "------|-------|-------|--------|-------|-------------|-------------|------";
            output.push("");
            output.push(heading);
            output.push(bar);
            do {
              if (a % 100 === 0 && a > 0) {
                output.push("");
                output.push(heading);
                output.push(bar);
              }
              str = [];
              if (outputArrays.lexer[a] === "markup") {
                str.push(nodeText.red);
              } else if (outputArrays.lexer[a] === "script") {
                str.push(nodeText.green);
              } else if (outputArrays.lexer[a] === "style") {
                str.push(nodeText.yellow);
              }
              pad(a.toString(), 5);
              pad(outputArrays.begin[a].toString(), 5);
              pad(outputArrays.ender[a].toString(), 5);
              pad(outputArrays.lexer[a].toString(), 5);
              pad(outputArrays.lines[a].toString(), 5);
              pad(outputArrays.stack[a].toString(), 11);
              pad(outputArrays.types[a].toString(), 11);
              str.push(outputArrays.token[a].replace(/\s/g, " "));
              str.push(nodeText.none);
              output.push(str.join(""));
              a = a + 1;
            } while (a < b);
            result = output.join(lf);
          }
        } else {
          result = JSON.stringify(options.parsed);
        }
      } else {
        if (prettydiff[modeValue][options.lexer] === undefined && ((options.mode !== "diff" && options.language === "text") || options.language !== "text")) {
          result = `Error: Library prettydiff.${modeValue}.${options.lexer} does not exist.`;
        } else {
          options.parsed = prettydiff.sparser.parser();
          result = prettydiff[modeValue][options.lexer](options);
        }
      }
      if (options.new_line === true) {
        result = result.replace(/\s*$/, lf);
      } else {
        result = result.replace(/\s+$/, "");
      }
      if (options.complete_document === true && options.jsscope !== "report") {
        let finalFile = prettydiff.api.finalFile;
        finalFile.order[7] = options.color;
        finalFile.order[10] = result;
        if (options.crlf === true) {
          finalFile.order[12] = "\r\n";
          finalFile.order[15] = "\r\n";
        }
        if (options.mode === "diff") {
          finalFile.order[13] = finalFile.script.diff;
        } else if (options.mode === "beautify" && options.language === "javascript" && options.jsscope !== "none") {
          finalFile.order[13] = finalFile.script.beautify;
        } else {
          finalFile.order[13] = finalFile.script.minimal;
        }
        // escape changes characters that result in xml wellformedness errors
        prettydiff.end = 0;
        prettydiff.start = 0;
        return finalFile.order.join("");
      }
      prettydiff.end = 0;
      prettydiff.start = 0;
      return result;
    };
  prettydiff.api = {};
  prettydiff.beautify = {};
  prettydiff.end = 0;
  prettydiff.iterator = 0;
  prettydiff.meta = {
    error: "",
    lang: ["", "", ""],
    time: "",
    insize: 0,
    outsize: 0,
    difftotal: 0,
    difflines: 0
  };
  prettydiff.minify = {};
  prettydiff.options = {
    "attribute_sort": false,
    "attribute_sort_list": "",
    "brace_line": false,
    "brace_padding": false,
    "brace_style": "none",
    "braces": false,
    "case_space": false,
    "color": "white",
    "comment_line": false,
    "comments": false,
    "complete_document": false,
    "compressed_css": false,
    "conditional": false,
    "config": "",
    "content": false,
    "correct": false,
    "crlf": false,
    "css_insert_lines": false,
    "diff": "",
    "diff_comments": false,
    "diff_context": -1,
    "diff_format": "text",
    "diff_label": "New Sample",
    "diff_rendered_html": false,
    "diff_space_ignore": false,
    "diff_view": "sidebyside",
    "else_line": false,
    "end_comma": "never",
    "end_quietly": "default",
    "force_attribute": false,
    "force_indent": false,
    "format_array": "default",
    "format_object": "default",
    "function_name": false,
    "help": 80,
    "indent_char": " ",
    "indent_level": 0,
    "indent_size": 4,
    "jsscope": "none",
    "language": "auto",
    "language_default": "text",
    "language_name": "JavaScript",
    "lexer": "auto",
    "list_options": false,
    "method_chain": 3,
    "minify_keep_comments": false,
    "minify_wrap": false,
    "mode": "diff",
    "never_flatten": false,
    "new_line": false,
    "no_case_indent": false,
    "no_lead_zero": false,
    "no_semicolon": false,
    "node_error": false,
    "object_sort": false,
    "output": "",
    "parse_format": "parallel",
    "parse_space": false,
    "preserve": 0,
    "preserve_comment": false,
    "preserve_text": false,
    "quote": false,
    "quote_convert": "none",
    "read_method": "auto",
    "selector_list": false,
    "semicolon": false,
    "source": "",
    "source_label": "Source Sample",
    "space": true,
    "space_close": false,
    "styleguide": "none",
    "summary_only": false,
    "tag_merge": false,
    "tag_sort": false,
    "ternary_line": false,
    "top_comments": false,
    "unformatted": false,
    "variable_list": "none",
    "version": false,
    "vertical": false,
    "wrap": 0,
    "lexerOptions": {}
  };
  prettydiff.scopes = [];
  prettydiff.start = 0;
  (function options_init() {

    const optionDef = {
      attribute_sort: {
        default: false,
        definition: "Alphanumerically sort markup attributes. Sorting is ignored if a given tag contains an attribute with instructions for a different language such as a template scheme, child markup tag, or start of a code structure.",
        label: "Sort Attributes",
        lexer: ["markup"],
        type: "boolean"
      },
      attribute_sort_list: {
        default: "",
        definition: "A comma separated list of attribute names. Attributes will be sorted according to this list and then alphanumerically. This option requires 'attribute_sort' have a value of true.",
        label: "Sort Attribute List",
        lexer: ["markup"],
        type: "string"
      },
      correct: {
        default: false,
        definition: "Automatically correct sloppiness in code. If false missing syntax will be included starting with 'x', such as 'x;' for missing simicolons.",
        label: "Correct",
        lexer: ["all"],
        type: "boolean"
      },
      crlf: {
        default: false,
        definition: "If line termination should be crlf (Windows) otherwise line termination is lf (Unix).",
        label: "CRLF",
        lexer: ["all"],
        type: "boolean"
      },
      end_comma: {
        default: "none",
        definition: "Whether terminal commas in objects and arrays should be added or eliminated.",
        label: "End Comma",
        lexer: ["script"],
        type: "string",
        values: {
          "always": "Adds terminal commas if they are missing.",
          "never": "Removes terminal commas if they are present.",
          "none": "Ignores this option."
        }
      },
      format: {
        default: "arrays",
        definition: "Defines the output format of the parser.",
        label: "Output Format",
        lexer: ["all"],
        type: "string",
        values: {
          "arrays": "The output format is an object of arrays such that the same index of all the arrays represents one data record, for example: {begin:[],ender:[],lexer:[],lines[],stack:[],token:[],types:[]}.",
          "csv": "The output format is comma separated value format.",
          "markdown": "Generates the output in a markdown table.",
          "minimal": "The output format is an array of arrays which is structurally similar to the objects format but without key names, for example: [[-1,-1,\"script\",0,\"global\",\"const\",\"word\"]].",
          "objects": "The output format is an array of objects such that each array index is one data record, for example: [{begin:-1,ender:-1,lexer:\"script\",lines:0,stack:\"global\",token:\"const\",types:\"word\"}]."
        }
      },
      language: {
        default: "auto",
        definition: "The language to parse.  The value auto will result in language auto detection.",
        label: "Language",
        lexer: ["all"],
        type: "string"
      },
      lexer: {
        default: "auto",
        definition: "The lexer used to perform the parsing.  The value auto will result in language auto detection.",
        label: "Lexer",
        lexer: ["all"],
        type: "string"
      },
      no_lead_zero: {
        default: false,
        definition: "Whether the zero to the left of the decimal point should be removed from numbers between 0 and 1.",
        label: "No Lead Zero",
        lexer: ["style"],
        type: "boolean"
      },
      object_sort: {
        default: false,
        definition: "Where style properties should be sorted by type and then alphabetically and whether script object properties should be sorted alphabetically.",
        label: "Object Sort",
        lexer: ["script", "style"],
        type: "boolean"
      },
      parse_space: {
        default: false,
        definition: "Whether white space should be parsed as content tokens.",
        label: "Parse Markup White Space",
        lexer: ["markup"],
        type: "boolean"
      },
      preserve_comment: {
        default: false,
        definition: "Whether comments should be ignored from manipulation, such as word wrap.",
        label: "Preserve Comment",
        lexer: ["all"],
        type: "boolean"
      },
      preserve_text: {
        default: false,
        definition: "Whether text content should be preserved from manipulation, such as word wrap.",
        label: "Preserve Text",
        lexer: ["markup"],
        type: "boolean"
      },
      quote_convert: {
        default: "none",
        definition: "If quote characters should be converted from single quotes to double quotes or the opposite. This option does take into account escaped quote characters.",
        label: "Quote Convert",
        lexer: ["markup", "script", "style"],
        type: "string",
        values: {
          "double": "Converts single quote characters to double quote characters.",
          "none": "Ignores this option.",
          "single": "Converts double quote characters to single quote characters."
        }
      },
      source: {
        default: "",
        definition: "The source code to parse.",
        label: "Source",
        lexer: ["all"],
        type: "string"
      },
      tag_merge: {
        default: false,
        definition: "If adjacent start and end tags in markup should be merged into one singleton tag.",
        label: "Tag Merge",
        lexer: ["markup"],
        type: "boolean"
      },
      tag_sort: {
        default: false,
        definition: "Whether markup tags should be alphabetically sorted amonst their siblings.",
        label: "Tag Sort",
        lexer: ["markup"],
        type: "boolean"
      },
      unformatted: {
        default: false,
        definition: "If tags in markup code should be preserved from any manner of alteration.",
        label: "Tag Unformatted",
        lexer: ["markup"],
        type: "boolean"
      },
      variable_list: {
        default: "none",
        definition: "Whether consecutive variable declarations should be separate statements or a comma separated list. Use of this option respects the different types of declarations: var, const, let.",
        label: "Variable List",
        lexer: ["script"],
        type: "string",
        values: {
          "each": "Separates variable declarations into separate statements.",
          "list": "Combines consecutive variable declaration statements into a single comma separated list.",
          "none": "Ignores this option."
        }
      },
      wrap: {
        default: 0,
        definition: "The character distance in which to apply word wrap. A value of less than 1 eliminates word wrap.",
        label: "Wrap",
        lexer: ["all"],
        type: "number"
      }
    };
    sparser.libs.optionDef = optionDef;
  }());
  (function language_init() {

    const language = {
      setlexer: function language_setlexer(input) {
        const langmap = {
          c_cpp: "script",
          coldfusion: "markup",
          csharp: "script",
          css: "style",
          csv: "csv",
          dustjs: "markup",
          ejs: "markup",
          go: "markup",
          handlebars: "markup",
          html: "markup",
          html_ruby: "markup",
          java: "script",
          javascript: "script",
          json: "script",
          jsp: "markup",
          jsx: "script",
          less: "style",
          markdown: "markdown",
          markup: "markup",
          php: "script",
          phphtml: "markup",
          qml: "style",
          scss: "style",
          silverstripe: "markup",
          "styled-jsx": "script",
          "styled-components": "script",
          swig: "markup",
          text: "text",
          titanium: "script",
          tss: "script",
          twig: "markup",
          typescript: "script",
          vapor: "markup",
          velocity: "markup",
          xhtml: "markup",
          xml: "markup"
        };
        if (typeof input !== "string") {
          return "script";
        }
        if (input.indexOf("html") > -1) {
          return "markup";
        }
        if (langmap[input] === undefined) {
          return "script";
        }
        return langmap[input];
      },
      nameproper: function language_nameproper(input) {
        const langmap = {
          c_cpp: "C++ (Not yet supported)",
          coldfusion: "ColdFusion",
          csharp: "C#",
          dustjs: "Dust.js",
          ejs: "EJS Template",
          elm: "Elm Template",
          go: "Go Lang Template",
          handlebars: "Handlebars Template",
          html_ruby: "ERB (Ruby) Template",
          java: "Java",
          javascript: "JavaScript",
          jsp: "JSTL (JSP)",
          jsx: "React JSX",
          liquid: "Liquid Template",
          markdown: "markdown",
          markup: "markup",
          phphtml: "HTML/PHP",
          scss: "SCSS",
          silverstripe: "SilverStripe",
          text: "Plain Text",
          titanium: "Titanium Stylesheets",
          tss: "Titanium Stylesheets",
          twig: "HTML TWIG Template",
          typescript: "TypeScript",
          vapor: "Vapor Leaf",
          velocity: "Apache Velocity",
          volt: "Volt Template"
        };
        if (typeof input !== "string" || langmap[input] === undefined) {
          return input.toUpperCase();
        }
        return langmap[input];
      },
      // * [0] = language value
      // * [1] = lexer value
      // * [2] = pretty formatting for text output to user
      auto: function language_auto(sample, defaultLang) {
        let b = [],
          c = 0;
        const vartest = ((/(((var)|(let)|(const)|(function)|(import))\s+(\w|\$)+[a-zA-Z0-9]*)/).test(sample) === true && (/@import/).test(sample) === false),
          finalstatic = (/((((final)|(public)|(private))\s+static)|(static\s+void))/).test(sample),
          output = function language_auto_output(langname) {
            if (langname === "unknown") {
              return [defaultLang, language.setlexer(defaultLang), "unknown"];
            }
            if (langname === "xhtml" || langname === "markup") {
              return ["xml", language.setlexer("xml"), "XHTML"];
            }
            if (langname === "tss") {
              return ["tss", language.setlexer("tss"), "Titanium Stylesheets"];
            }
            if (langname === "phphtml") {
              return ["php", language.setlexer(langname), language.nameproper(langname)];
            }
            return [langname, language.setlexer(langname), language.nameproper(langname)];
          },
          cssA = function language_auto_cssA() {
            if ((/\n\s*#+\s+/).test(sample) === true || (/^#+\s+/).test(sample) === true) {
              return output("markdown");
            }
            if ((/\$[a-zA-Z]/).test(sample) === true || (/\{\s*(\w|\.|\$|#)+\s*\{/).test(sample) === true) {
              return output("scss");
            }
            if ((/@[a-zA-Z]/).test(sample) === true || (/\{\s*(\w|\.|@|#)+\s*\{/).test(sample) === true) {
              return output("less");
            }
            return output("css");
          },
          notmarkup = function language_auto_notmarkup() {
            let d = 1,
              join = "",
              flaga = false,
              flagb = false;
            const publicprivate = (/((public)|(private))\s+(static\s+)?(((v|V)oid)|(class)|(final))/).test(sample),
              javascriptA = function language_auto_notmarkup_javascriptA() {
                if (sample.indexOf("(") > -1 || sample.indexOf("=") > -1 || (sample.indexOf(";") > -1 && sample.indexOf("{") > -1)) {
                  if (vartest === false && ((/\n\s+#region\s/).test(sample) === true || (/\[\w+:/).test(sample) === true)) {
                    return output("csharp");
                  }
                  if (finalstatic === true || (/\w<\w+(,\s+\w+)*>/).test(sample) === true) {
                    if ((/:\s*((number)|(string))/).test(sample) === false && (finalstatic === true || publicprivate === true)) {
                      return output("java");
                    }
                    return output("typescript");
                  }
                  if ((/final\s+static/).test(sample) === true) {
                    return output("java");
                  }
                  if ((/<\/\w+>/).test(sample) === true && (/<\w+((\s+\w)|>)/).test(sample) === true) {
                    return output("jsx");
                  }
                  if ((/((var)|(let)|(const))\s+\w+\s*:/).test(sample) === true || (/=\s*<\w+/).test(sample) === true) {
                    return output("typescript");
                  }
                  return output("javascript");
                }
                return output("unknown");
              },
              cssOrJavaScript = function language_auto_notmarkup_cssOrJavaScript() {
                if ((/:\s*((number)|(string))/).test(sample) === true && (/((public)|(private))\s+/).test(sample) === true) {
                  return output("typescript");
                }
                if ((/import\s+java(\.|(fx))/).test(sample) === true || (/((public)|(private))\s+static\s+/).test(sample) === true) {
                  return output("java");
                }
                if ((/\sclass\s+\w/).test(sample) === false && (/<[a-zA-Z]/).test(sample) === true && (/<\/[a-zA-Z]/).test(sample) === true && ((/\s?\{%/).test(sample) === true || (/\{(\{|#)(?!(\{|#|=))/).test(sample) === true)) {
                  return output("twig");
                }
                if ((/^(\s*(\$|@))/).test(sample) === false && (/(\};?\s*)$/).test(sample) === true) {
                  if ((/export\s+default\s+\{/).test(sample) === true || (/(\?|:)\s*(\{|\[)/).test(sample) === true || (/(\{|\s|;)render\s*\(\)\s*\{/).test(sample) === true || (/^(\s*return;?\s*\{)/).test(sample) === true) {
                    return output("javascript");
                  }
                }
                if ((/\{\{#/).test(sample) === true && (/\{\{\//).test(sample) === true && (/<\w/).test(sample) === true) {
                  return output("handlebars");
                }
                if ((/\{\s*(\w|\.|@|#)+\s*\{/).test(sample) === true) {
                  return output("less");
                }
                if ((/\$(\w|-)/).test(sample) === true) {
                  return output("scss");
                }
                if ((/(;|\{|:)\s*@\w/).test(sample) === true) {
                  return output("less");
                }
                if ((/class\s+\w+\s+\{/).test(sample) === true) {
                  return output("java");
                }
                return output("css");
              };
            if (d < c) {
              do {
                if (flaga === false) {
                  if (b[d] === "*" && b[d - 1] === "/") {
                    b[d - 1] = "";
                    flaga = true;
                  } else if (flagb === false && b[d] === "f" && d < c - 6 && b[d + 1] === "i" && b[d + 2] === "l" && b[d + 3] === "t" && b[d + 4] === "e" && b[d + 5] === "r" && b[d + 6] === ":") {
                    flagb = true;
                  }
                } else if (flaga === true && b[d] === "*" && d !== c - 1 && b[d + 1] === "/") {
                  flaga = false;
                  b[d] = "";
                  b[d + 1] = "";
                } else if (flagb === true && b[d] === ";") {
                  flagb = false;
                  b[d] = "";
                }
                if (flaga === true || flagb === true) {
                  b[d] = "";
                }
                d = d + 1;
              } while (d < c);
            }
            join = b.join("");
            if ((/\s\/\//).test(sample) === false && (/\/\/\s/).test(sample) === false && (/^(\s*(\{|\[)(?!%))/).test(sample) === true && (/((\]|\})\s*)$/).test(sample) && sample.indexOf(",") !== -1) {
              return output("json");
            }
            if ((/((\}?(\(\))?\)*;?\s*)|([a-z0-9]("|')?\)*);?(\s*\})*)$/i).test(sample) === true && (vartest === true || publicprivate === true || (/console\.log\(/).test(sample) === true || (/export\s+default\s+class\s+/).test(sample) === true || (/document\.get/).test(sample) === true || (/((=|(\$\())\s*function)|(\s*function\s+(\w*\s+)?\()/).test(sample) === true || sample.indexOf("{") === -1 || (/^(\s*if\s+\()/).test(sample) === true)) {
              return javascriptA();
            }
            // * u007b === {
            // * u0024 === $
            // * u002e === .
            if (sample.indexOf("{") > -1 && ((/^(\s*[\u007b\u0024\u002e#@a-z0-9])/i).test(sample) === true || (/^(\s*\/(\*|\/))/).test(sample) === true || (/^(\s*\*\s*\{)/).test(sample) === true) && (/^(\s*if\s*\()/).test(sample) === false && (/=\s*(\{|\[|\()/).test(join) === false && (((/(\+|-|=|\?)=/).test(join) === false || (/\/\/\s*=+/).test(join) === true) || ((/=+('|")?\)/).test(sample) === true && (/;\s*base64/).test(sample) === true)) && (/function(\s+\w+)*\s*\(/).test(join) === false) {
              if ((/\s*#((include)|(define)|(endif))\s+/).test(sample)) {
                return output("c_cpp");
              }
              return cssOrJavaScript();
            }
            if ((/"\s*:\s*\{/).test(sample) === true) {
              return output("tss");
            }
            if (sample.indexOf("{%") > -1) {
              return output("twig");
            }
            return output("unknown");
          },
          markup = function language_auto_markup() {
            const html = function language_auto_markup_html() {
              if ((/<%\s*\}/).test(sample) === true) {
                return output("ejs");
              }
              if ((/<%\s+end_((if)|(with)|(loop)|(control)|(cached)|(uncached))/).test(sample) === true) {
                return output("silverstripe");
              }
              if ((/<%\s*end/).test(sample) === true) {
                return output("html_ruby");
              }
              if ((/\{\{(#|\/|\{)/).test(sample) === true) {
                return output("handlebars");
              }
              if ((/\{\{end\}\}/).test(sample) === true) {
                //place holder for Go lang templates
                return output("html");
              }
              if ((/\s?\{%/).test(sample) === true && (/\{(\{|#)(?!(\{|#|=))/).test(sample) === true) {
                return output("twig");
              }
              if ((/<\?/).test(sample) === true) {
                if ((/^\s*<\?/).test(sample) === true && (/\?>\s*$/).test(sample) === true) {
                  return output("php");
                }
                return output("phphtml");
              }
              if ((/<jsp:include\s/).test(sample) === true || (/<c:((set)|(if))\s/).test(sample) === true) {
                return output("jsp");
              }
              if ((/\{(#|\?|\^|@|<|\+|~)/).test(sample) === true && (/\{\//).test(sample) === true && sample.indexOf("<![CDATA[") < 0) {
                return output("dustjs");
              }
              if ((/#((if)|(for)|(set))?\(/).test(sample) === true) {
                return output("vapor");
              }
              return output("html");
            };
            if ((/<cfset\s/i).test(sample) === true || (/<cfif\s/i).test(sample) === true) {
              return output("coldfusion");
            }
            if ((/^(\s*<!doctype\s+html>)/i).test(sample) === true ||
              (/^(\s*<html)/i).test(sample) === true ||
              ((/<form\s/i).test(sample) === true &&
                (/<label\s/i).test(sample) === true &&
                (/<input\s/i).test(sample) === true) ||
              (/<((img)|(IMG))(\s+\w+=("|')?\S+("|')?)*\s+src\s*=/).test(sample) === true ||
              ((/^(\s*<!DOCTYPE\s+((html)|(HTML))\s+PUBLIC\s+)/).test(sample) === true &&
                (/XHTML\s+1\.1/).test(sample) === false &&
                (/XHTML\s+1\.0\s+(S|s)((trict)|(TRICT))/).test(sample) === false)) {
              return html();
            }
            if ((/<jsp:include\s/).test(sample) === true || (/<c:((set)|(if))\s/).test(sample) === true) {
              return output("jsp");
            }
            if ((/<%\s*\}/).test(sample) === true) {
              return output("ejs");
            }
            if ((/<%\s+end_((if)|(with)|(loop)|(control)|(cached)|(uncached))/).test(sample) === true) {
              return output("silverstripe");
            }
            if ((/<%\s*end/).test(sample) === true) {
              return output("html_ruby");
            }
            if ((/\{\{(#|\/|\{)/).test(sample) === true) {
              return output("handlebars");
            }
            if ((/\{\{end\}\}/).test(sample) === true) {
              //place holder for Go lang templates
              return output("xml");
            }
            if ((/\s?\{%/).test(sample) === true && (/\{\{(?!(\{|#|=))/).test(sample) === true) {
              return output("twig");
            }
            if ((/<\?(?!(xml))/).test(sample) === true) {
              if ((/^\s*<\?/).test(sample) === true && (/\?>\s*$/).test(sample) === true) {
                return output("php");
              }
              return output("phphtml");
            }
            if ((/\{(#|\?|\^|@|<|\+|~)/).test(sample) === true && (/\{\//).test(sample) === true) {
              return output("dustjs");
            }
            if ((/<jsp:include\s/).test(sample) === true || (/<c:((set)|(if))\s/).test(sample) === true) {
              return output("jsp");
            }
            if ((/#((if)|(for)|(set))?\(/).test(sample) === true) {
              return output("vapor");
            }
            return output("xml");
          };
        if (sample === null || sample.replace(/\s+/g, "") === "") {
          return output("unknown");
        }
        if (((/\n\s*#{1,6}\s+/).test(sample) === true || ((/\n\s*(\*|-|(\d+\.))\s/).test(sample) === true) && (/\/\*/).test(sample) === false) &&
          ((/\[( |x|X)\]/).test(sample) === true || (/\s\*\*?\S\D/).test(sample) === true || (/\n\s*```/).test(sample) === true || ((/-+\|(-+\|)+/).test(sample) === true && (/<!--/).test(sample) === false))) {
          return output("markdown");
        }
        if ((/^(\s*<!DOCTYPE\s+html>)/i).test(sample) === true) {
          return markup();
        }
        if ((/^\s*@((charset)|(import)|(include)|(keyframes)|(media)|(namespace)|(page))/).test(sample) === true) {
          return cssA();
        }
        if (finalstatic === false &&
          (/=(>|=|-|\+|\*)/).test(sample) === false &&
          (/^(\s*((if)|(for)|(function))\s*\()/).test(sample) === false &&
          (/(\s|;|\})((if)|(for)|(function\s*\w*))\s*\(/).test(sample) === false &&
          vartest === false && (/return\s*\w*\s*(;|\})/).test(sample) === false &&
          (sample === undefined ||
            (/^(\s*#(?!(!\/)))/).test(sample) === true ||
            ((/\n\s*(\.|@)\w+(\(|(\s*:))/).test(sample) === true && (/>\s*<\w/).test(sample) === false))) {
          return cssA();
        }
        b = sample
          .replace(/\[[a-zA-Z][\w-]*=("|')?[a-zA-Z][\w-]*("|')?\]/g, "")
          .split("");
        c = b.length;
        if ((/^(\s*(\{|<)(%|#|\{))/).test(sample) === true) {
          return markup();
        }
        if (((/^([\s\w-]*<)/).test(sample) === false && (/(>[\s\w-]*)$/).test(sample) === false) || finalstatic === true) {
          return notmarkup();
        }
        if ((((/(>[\w\s:]*)?<(\/|!|#)?[\w\s:\-[]+/).test(sample) === true || ((/^\s*</).test(sample) === true && (/<\/\w+(\w|\d)+>\s*$/).test(sample) === true) || (/^(\s*<\?xml)/).test(sample) === true) && ((/^([\s\w]*<)/).test(sample) === true || (/(>[\s\w]*)$/).test(sample) === true)) || ((/^(\s*<s((cript)|(tyle)))/i).test(sample) === true && (/(<\/s((cript)|(tyle))>\s*)$/i).test(sample) === true)) {
          if ((/^([\s\w]*<)/).test(sample) === false || (/(>[\s\w]*)$/).test(sample) === false) {
            return notmarkup();
          }
          return markup();
        }
        return output("unknown");
      }
    };
    sparser.libs.language = language;
    prettydiff.api.language = language;
  }());
  (function style_init() {

    const style = function lexer_style(source) {
      let a = 0,
        ltype = "",
        ltoke = "";
      const parse = sparser.parse,
        data = parse.data,
        options = sparser.options,
        b = source.split(""),
        len = source.length,
        mapper = [],
        nosort = [],
        recordPush = function lexer_style_recordPush(structure) {
          const record = {
            begin: parse.structure[parse.structure.length - 1][1],
            ender: -1,
            lexer: "style",
            lines: parse.linesSpace,
            stack: parse.structure[parse.structure.length - 1][0],
            token: ltoke,
            types: ltype
          };
          parse.push(data, record, structure);
        },
        esctest = function lexer_style_esctest(index) {
          const slashy = index;
          do {
            index = index - 1;
          } while (b[index] === "\\" && index > 0);
          if ((slashy - index) % 2 === 1) {
            return true;
          }
          return false;
        },
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
        value = function lexer_style_value(val) {
          const x = val.replace(/\s*!important/, " !important").split(""),
            values = [],
            transition = (/-?transition$/).test(data.token[parse.count - 2]),
            colorPush = function lexer_style_value_colorPush(value) {
              const vl = value.toLowerCase();
              if ((/^(#[0-9a-f]{3,6})$/).test(vl) === true);
              else if ((/^(rgba?\()/).test(vl) === true);
              else;
              return value;
            },
            valueSpace = function lexer_style_value_valueSpace(find) {
              find = find.replace(/\s*/g, "");
              if ((/\/\d/).test(find) === true && val.indexOf("url(") === 0) {
                return find;
              }
              return ` ${find.charAt(0)} ${find.charAt(1)}`;
            },
            zerofix = function lexer_style_value_zerofix(find) {
              if (options.lexer_options.style.no_lead_zero === true) {
                const scrub = function lexer_style_value_zerofix_scrub(search) {
                  return search.replace(/0+/, "");
                };
                return find.replace(/^-?\D0+(\.|\d)/, scrub);
              }
              if ((/0*\./).test(find) === true) {
                return find.replace(/0*\./, "0.");
              }
              if ((/0+/).test((/\d+/).exec(find)[0]) === true) {
                if ((/^\D*0+\D*$/).test(find) === true) {
                  return find.replace(/0+/, "0");
                }
                return find.replace((/\d+/).exec(find)[0], (/\d+/).exec(find)[0].replace(/^0+/, ""));
              }
              return find;
            },
            commaspace = function lexer_style_value_commaspace(find) {
              return find.replace(",", ", ");
            },
            diFix = function lexer_style_value_diFix(di) {
              return `${di} `;
            },
            slash = function lexer_style_value_slash() {
              const start = cc - 1;
              let xx = start;
              if (start < 1) {
                return true;
              }
              do {
                xx = xx - 1;
              } while (xx > 0 && x[xx] === "\\");
              // report true for odd numbers (escaped)
              if ((start - xx) % 2 === 1) {
                return true;
              }
              return false;
            },
            zerodotstart = (/^-?0+\.\d+[a-z]/),
            dotstart = (/^-?\.\d+[a-z]/),
            zerodot = (/(\s|\(|,)-?0+\.?\d+([a-z]|\)|,|\s)/g),
            dot = (/(\s|\(|,)-?\.?\d+([a-z]|\)|,|\s)/g),
            dimensions = "%|cap|ch|cm|deg|dpcm|dpi|dppx|em|ex|fr|grad|Hz|ic|in|kHz|lh|mm|ms|mS|pc|pt|px|Q|rad|rem|rlh|s|turn|vb|vh|vi|vmax|vmin|vw";
          let cc = 0,
            dd = 0,
            block = "",
            leng = x.length,
            items = [];
          // this loop identifies containment so that tokens/sub-tokens are correctly
          // taken
          if (cc < leng) {
            do {
              items.push(x[cc]);
              if (x[cc - 1] !== "\\" || slash() === false) {
                if (block === "") {
                  if (x[cc] === "\"") {
                    block = "\"";
                    dd = dd + 1;
                  } else if (x[cc] === "'") {
                    block = "'";
                    dd = dd + 1;
                  } else if (x[cc] === "(") {
                    block = ")";
                    dd = dd + 1;
                  } else if (x[cc] === "[") {
                    block = "]";
                    dd = dd + 1;
                  }
                } else if ((x[cc] === "(" && block === ")") || (x[cc] === "[" && block === "]")) {
                  dd = dd + 1;
                } else if (x[cc] === block) {
                  dd = dd - 1;
                  if (dd === 0) {
                    block = "";
                  }
                }
              }
              if (block === "" && x[cc] === " ") {
                items.pop();
                values.push(colorPush(items.join("")));
                items = [];
              }
              cc = cc + 1;
            } while (cc < leng);
          }
          values.push(colorPush(items.join("")));
          leng = values.length;
          //This is where the rules mentioned above are applied
          cc = 0;
          if (cc < leng) {
            do {
              if (options.lexer_options.style.no_lead_zero === true && zerodotstart.test(values[cc]) === true) {
                values[cc] = values[cc].replace(/0+\./, ".");
              } else if ((options.lexer_options.style.no_lead_zero === false || options.lexer_options.style.no_lead_zero === undefined) && dotstart.test(values[cc]) === true) {
                values[cc] = values[cc].replace(".", "0.");
              } else if (zerodot.test(values[cc]) === true || dot.test(values[cc]) === true) {
                values[cc] = values[cc].replace(zerodot, zerofix).replace(dot, zerofix);
              } else if ((/^(0+([a-z]{2,3}|%))$/).test(values[cc]) === true && transition === false) {
                values[cc] = "0";
              } else if ((/^(0+)/).test(values[cc]) === true) {
                values[cc] = values[cc].replace(/0+/, "0");
                if ((/\d/).test(values[cc].charAt(1)) === true) {
                  values[cc] = values[cc].substr(1);
                }
              } else if ((/^url\((?!('|"))/).test(values[cc]) === true && values[cc].charAt(values[cc].length - 1) === ")") {
                block = values[cc].charAt(values[cc].indexOf("url(") + 4);
                if (block !== "@" && block !== "{" && block !== "<") {
                  if (options.lexer_options.style.quote_convert === "double") {
                    values[cc] = values[cc]
                      .replace(/url\(/, "url(\"")
                      .replace(/\)$/, "\")");
                  } else {
                    values[cc] = values[cc]
                      .replace(/url\(/, "url('")
                      .replace(/\)$/, "')");
                  }
                }
              }
              if ((/^(\+|-)?\d+(\.\d+)?(e-?\d+)?\D+$/).test(values[cc]) === true) {
                if (dimensions.indexOf(values[cc].replace(/(\+|-)?\d+(\.\d+)?(e-?\d+)?/, "")) < 0) {
                  values[cc] = values[cc].replace(/(\+|-)?\d+(\.\d+)?(e-?\d+)?/, diFix);
                }
              }
              if ((/^\w+\(/).test(values[cc]) === true &&
                values[cc].charAt(values[cc].length - 1) === ")" &&
                (values[cc].indexOf("url(") !== 0 || (values[cc].indexOf("url(") === 0 && values[cc].indexOf(" ") > 0))) {
                values[cc] = values[cc].replace(/,\S/g, commaspace);
              }
              cc = cc + 1;
            } while (cc < leng);
          }
          block = values.join(" ");
          return block.charAt(0) + block.slice(1)
            .replace(/\s*(\/|\+|\*)\s*(\d|\$)/, valueSpace);
        },
        //the generic token builder
        buildtoken = function lexer_style_build() {
          let aa = a,
            bb = 0,
            out = [],
            outy = "",
            funk = null;
          const block = [],
            qc = (options.lexer_options.style.quote_convert === undefined) ?
            "none" :
            options.lexer_options.style.quote_convert,
            spacestart = function lexer_style_build_spacestart() {
              out.push(b[aa]);
              if ((/\s/).test(b[aa + 1]) === true) {
                do {
                  aa = aa + 1;
                } while (aa < len && (/\s/).test(b[aa + 1]) === true);
              }
            };
          if (aa < len) {
            //this loop accounts for grouping mechanisms
            do {
              if (b[aa] === "\"" || b[aa] === "'") {
                if (funk === null) {
                  funk = false;
                }
                if (block[block.length - 1] === b[aa] && (b[aa - 1] !== "\\" || esctest(aa - 1) === false)) {
                  block.pop();
                  if (qc === "double") {
                    b[aa] = "\"";
                  } else if (qc === "single") {
                    b[aa] = "'";
                  }
                } else if (block[block.length - 1] !== "\"" && block[block.length - 1] !== "'" && (b[aa - 1] !== "\\" || esctest(aa - 1) === false)) {
                  block.push(b[aa]);
                  if (qc === "double") {
                    b[aa] = "\"";
                  } else if (qc === "single") {
                    b[aa] = "'";
                  }
                } else if (b[aa - 1] === "\\" && qc !== "none") {
                  if (esctest(aa - 1) === true) {
                    if (qc === "double" && b[aa] === "'") {
                      out.pop();
                    } else if (qc === "single" && b[aa] === "\"") {
                      out.pop();
                    }
                  }
                } else if (qc === "double" && b[aa] === "\"") {
                  b[aa] = "\\\"";
                } else if (qc === "single" && b[aa] === "'") {
                  b[aa] = "\\'";
                }
                out.push(b[aa]);
              } else if (b[aa - 1] !== "\\" || esctest(aa - 1) === false) {
                if (b[aa] === "(") {
                  if (funk === null) {
                    funk = true;
                  }
                  block.push(")");
                  spacestart();
                } else if (b[aa] === "[") {
                  funk = false;
                  block.push("]");
                  spacestart();
                } else if ((b[aa] === "#" || b[aa] === "@") && b[aa + 1] === "{") {
                  funk = false;
                  out.push(b[aa]);
                  aa = aa + 1;
                  block.push("}");
                  spacestart();
                } else if (b[aa] === block[block.length - 1]) {
                  out.push(b[aa]);
                  block.pop();
                } else {
                  out.push(b[aa]);
                }
              } else {
                out.push(b[aa]);
              }
              if (parse.structure[parse.structure.length - 1][0] === "map" && block.length === 0 && (b[aa + 1] === "," || b[aa + 1] === ")")) {
                if (b[aa + 1] === ")" && data.token[parse.count] === "(") {
                  parse.pop(data);
                  parse.structure.pop();
                  out.splice(0, 0, "(");
                } else {
                  break;
                }
              }
              if (b[aa + 1] === ":") {
                bb = aa;
                if ((/\s/).test(b[bb]) === true) {
                  do {
                    bb = bb - 1;
                  } while ((/\s/).test(b[bb]) === true);
                }
                outy = b
                  .slice(bb - 6, bb + 1)
                  .join("");
                if (outy.indexOf("filter") === outy.length - 6 || outy.indexOf("progid") === outy.length - 6) {
                  outy = "filter";
                }
              }
              if (block.length === 0) {
                if ((b[aa + 1] === ";" && esctest(aa + 1) === true) ||
                  (b[aa + 1] === ":" &&
                    b[aa] !== ":" &&
                    b[aa + 2] !== ":" &&
                    outy !== "filter" &&
                    outy !== "progid") ||
                  b[aa + 1] === "}" ||
                  b[aa + 1] === "{" ||
                  (b[aa + 1] === "/" && (b[aa + 2] === "*" || b[aa + 2] === "/"))) {
                  bb = out.length - 1;
                  if ((/\s/).test(out[bb]) === true) {
                    do {
                      bb = bb - 1;
                      aa = aa - 1;
                      out.pop();
                    } while ((/\s/).test(out[bb]) === true);
                  }
                  break;
                }
                if (b[aa + 1] === ",") {
                  break;
                }
              }
              aa = aa + 1;
            } while (aa < len);
          }
          a = aa;
          if (parse.structure[parse.structure.length - 1][0] === "map" && out[0] === "(") {
            mapper[mapper.length - 1] = mapper[mapper.length - 1] - 1;
          }
          ltoke = out
            .join("")
            .replace(/\s+/g, " ")
            .replace(/^\s/, "")
            .replace(/\s$/, "");
          if (funk === true) {
            ltoke = ltoke.replace(/\s+\(/g, "(").replace(/\s+\)/g, ")").replace(/,\(/g, ", (");
          }
          if (parse.count > -1 && data.token[parse.count].indexOf("extend(") === 0) {
            ltype = "pseudo";
          } else if (funk === true &&
            (/\d/).test(ltoke.charAt(0)) === false &&
            (/^rgba?\(/).test(ltoke) === false &&
            ltoke.indexOf("url(") !== 0 &&
            (ltoke.indexOf(" ") < 0 || ltoke.indexOf(" ") > ltoke.indexOf("(")) &&
            ltoke.charAt(ltoke.length - 1) === ")") {
            if (data.token[parse.count] === ":") {
              ltype = "value";
            } else {
              ltoke = ltoke.replace(/,\u0020?/g, ", ");
              ltype = "function";
            }
            ltoke = value(ltoke);
          } else if (parse.count > -1 && "\"'".indexOf(data.token[parse.count].charAt(0)) > -1 && data.types[parse.count] === "variable") {
            ltype = "item";
          } else if (out[0] === "@" || out[0] === "$") {
            if (data.types[parse.count] === "colon" && options.language === "css" && (data.types[parse.count - 1] === "property" || data.types[parse.count - 1] === "variable")) {
              ltype = "value";
            } else if (parse.count > -1) {
              ltype = "item";
              outy = data.token[parse.count];
              aa = outy.indexOf("(");
              if (outy.charAt(outy.length - 1) === ")" && aa > 0) {
                outy = outy.slice(aa + 1, outy.length - 1);
                data.token[parse.count] = data
                  .token[parse.count]
                  .slice(0, aa + 1) + value(outy) + ")";
              }
            }
            ltoke = value(ltoke);
          } else {
            ltype = "item";
          }
          recordPush("");
        },
        // Some tokens receive a generic type named 'item' because their type is unknown
        // until we know the following syntax.  This function replaces the type 'item'
        // with something more specific.
        item = function lexer_style_item(type) {
          let aa = parse.count,
            bb = 0,
            first = "";
          const comsa = [],
            priors = function lexer_style_item_priors() {
              //backtrack through immediately prior comments to find the correct token
              if (data.types[aa] === "comment" || data.types[aa] === "ignore") {
                do {
                  aa = aa - 1;
                  comsa.push(data.token[aa]);
                } while (aa > 0 && data.lexer[aa] === "style" && (data.types[aa] === "comment" || data.types[aa] === "ignore"));
              }
              bb = aa - 1;
              if (data.types[bb] === "comment" || data.types[bb] === "ignore") {
                do {
                  bb = bb - 1;
                } while (bb > 0 && data.lexer[aa] === "style" && (data.types[bb] === "comment" || data.types[bb] === "ignore"));
              }
              first = data.token[aa].charAt(0);
            },
            selectorPretty = function lexer_style_item_selectorPretty(index) {
              let cc = index,
                dd = data.begin[cc];
              data.token[index] = data.token[index]
                .replace(/\s*&/, " &")
                .replace(/(\s*>\s*)/g, " > ")
                .replace(/:\s+/g, ": ")
                .replace(/^(\s+)/, "")
                .replace(/(\s+)$/, "")
                .replace(/\s+::\s+/, "::");
              if (data.token[cc - 1] === "," || data.token[cc - 1] === ":" || data.types[cc - 1] === "comment") {
                do {
                  cc = cc - 1;
                  if (data.begin[cc] === dd) {
                    if (data.token[cc] === ";") {
                      break;
                    }
                    if (data.token[cc] !== "," && data.types[cc] !== "comment") {
                      data.types[cc] = "selector";
                    }
                    if (data.token[cc] === ":") {
                      data.token[cc - 1] = `${data.token[cc - 1]}:${data.token[cc + 1]}`;
                      parse.splice({
                        data: data,
                        howmany: 2,
                        index: cc
                      });
                    }
                  } else {
                    break;
                  }
                } while (cc > 0);
              }
              // sorts comma separated lists of selectors
              cc = parse.count;
              if (options.lexer_options.style.object_sort === true && data.token[cc - 1] === ",") {
                const store = [data.token[cc]];
                do {
                  cc = cc - 1;
                  if (data.types[cc] === "comment" || data.types[cc] === "ignore") {
                    do {
                      cc = cc - 1;
                    } while (cc > 0 && (data.types[cc] === "comment" || data.types[cc] === "ignore"));
                  }
                  if (data.token[cc] === ",") {
                    cc = cc - 1;
                  }
                  store.push(data.token[cc]);
                } while (cc > 0 && (data.token[cc - 1] === "," || data.types[cc - 1] === "selector" || data.types[cc - 1] === "comment" || data.types[cc - 1] === "ignore"));
                store.sort();
                cc = parse.count;
                data.token[cc] = store.pop();
                do {
                  cc = cc - 1;
                  if (data.types[cc] === "comment" || data.types[cc] === "ignore") {
                    do {
                      cc = cc - 1;
                    } while (cc > 0 && (data.types[cc] === "comment" || data.types[cc] === "ignore"));
                  }
                  if (data.token[cc] === ",") {
                    cc = cc - 1;
                  }
                  data.token[cc] = store.pop();
                } while (cc > 0 && (data.token[cc - 1] === "," || data.token[cc - 1] === "selector" || data.types[cc - 1] === "comment" || data.types[cc - 1] === "ignore"));
              }
              aa = parse.count;
              priors();
            };
          priors();
          //if the last non-comment type is 'item' then id it
          if (type === "start" && (data.types[aa] === "value" || data.types[aa] === "variable")) {
            data.types[aa] = "item";
          }
          if (data.lexer[parse.count - 1] !== "style" || bb < 0) {
            if (type === "colon") {
              if (first === "$" || first === "@") {
                data.types[aa] = "variable";
              } else {
                data.types[aa] = "property";
              }
            } else if (data.lexer[aa] === "style") {
              data.types[aa] = "selector";
              selectorPretty(aa);
            }
          } else if (type === "start" && data.types[aa] === "function" && data.lexer[aa] === "style") {
            data.types[aa] = "selector";
            selectorPretty(aa);
          } else if (data.types[aa] === "item" && data.lexer[aa] === "style") {
            if (type === "start") {
              selectorPretty(aa);
              data.types[aa] = "selector";
              if (data.token[aa] === ":") {
                data.types[bb] = "selector";
              }
              if (data.token[aa].indexOf("=\u201c") > 0) {
                sparser.parseerror = `Quote looking character (\u201c, \\201c) used instead of actual quotes on line number ${parse.lineNumber}`;
              } else if (data.token[aa].indexOf("=\u201d") > 0) {
                sparser.parseerror = `Quote looking character (\u201d, \\201d) used instead of actual quotes on line number ${parse.lineNumber}`;
              }
            } else if (type === "end") {
              if (first === "$" || first === "@") {
                data.types[aa] = "variable";
              } else {
                data.types[aa] = "value";
              }
              data.token[aa] = value(data.token[aa]);
            } else if (type === "separator") {
              if (data.types[bb] === "colon" || data.token[bb] === "," || data.token[bb] === "{") {
                if (b[a] !== ";" && (data.types[bb] === "selector" || data.token[bb] === "{")) {
                  data.types[aa] = "selector";
                  selectorPretty(aa);
                } else if (data.token[aa].charAt(0) === "$" || data.token[aa].charAt(0) === "@") {
                  data.types[aa] = "variable";
                } else {
                  data.types[aa] = "value";
                }
                data.token[aa] = value(data.token[aa]);
                if (data.token[aa].charAt(0) === "\u201c") {
                  sparser.parseerror = `Quote looking character (\u201c, \\201c) used instead of actual quotes on line number ${parse.lineNumber}`;
                } else if (data.token[aa].charAt(0) === "\u201d") {
                  sparser.parseerror = `Quote looking character (\u201d, \\201d) used instead of actual quotes on line number ${parse.lineNumber}`;
                }
              } else {
                if (first === "$" || first === "@") {
                  data.types[aa] = "variable";
                } else if (data.types[bb] === "value" || data.types[bb] === "variable") {
                  data.token[bb] = data.token[bb] + data.token[aa];
                  parse.pop(data);
                } else {
                  data.types[aa] = "value";
                }
              }
            } else if (type === "colon") {
              if (first === "$" || first === "@") {
                data.types[aa] = "variable";
              } else {
                data.types[aa] = "property";
              }
            } else if (data.token[bb].charAt(0) === "@" && ((data.types[bb - 2] !== "variable" && data.types[bb - 2] !== "property") || data.types[bb - 1] === "separator")) {
              data.types[bb] = "variable";
              ltype = "variable";
              data.token[bb] = value(data.token[bb]);
            }
          }
        },
        semiComment = function lexer_style_separatorComment() {
          let x = parse.count;
          do {
            x = x - 1;
          } while (x > 0 && (data.types[x] === "comment"));
          if (data.token[x] === ";") {
            return;
          }
          parse.splice({
            data: data,
            howmany: 0,
            index: x + 1,
            record: {
              begin: parse.structure[parse.structure.length - 1][1],
              ender: -1,
              lexer: "style",
              lines: parse.linesSpace,
              stack: parse.structure[parse.structure.length - 1][0],
              token: ";",
              types: "separator"
            }
          });
        },
        template = function lexer_style_template(open, end) {
          let quote = "",
            name = "",
            start = open.length,
            endlen = 0;
          const store = [],
            exit = function lexer_style_template_exit(typename) {
              const endtype = data.types[parse.count - 1];
              if (ltype === "item") {
                if (endtype === "colon") {
                  data.types[parse.count] = "value";
                } else {
                  item(endtype);
                }
              }
              ltype = typename;
              if (ltype.indexOf("start") > -1 || ltype.indexOf("else") > -1) {
                recordPush(ltoke);
              } else {
                recordPush("");
              }
            };
          nosort[nosort.length - 1] = true;
          if (a < len) {
            do {
              store.push(b[a]);
              if (quote === "") {
                if (b[a] === "\"") {
                  quote = "\"";
                } else if (b[a] === "'") {
                  quote = "'";
                } else if (b[a] === "/") {
                  if (b[a + 1] === "/") {
                    quote = "/";
                  } else if (b[a + 1] === "*") {
                    quote = "*";
                  }
                } else if (b[a + 1] === end.charAt(0)) {
                  do {
                    endlen = endlen + 1;
                    a = a + 1;
                    store.push(b[a]);
                  } while (a < len && endlen < end.length && b[a + 1] === end.charAt(endlen));
                  if (endlen === end.length) {
                    quote = store.join("");
                    if ((/\s/).test(quote.charAt(start)) === true) {
                      do {
                        start = start + 1;
                      } while ((/\s/).test(quote.charAt(start)) === true);
                    }
                    endlen = start;
                    do {
                      endlen = endlen + 1;
                    } while (endlen < end.length && (/\s/).test(quote.charAt(endlen)) === false);
                    if (endlen === quote.length) {
                      endlen = endlen - end.length;
                    }
                    if (open === "{%") {
                      if (quote.indexOf("{%-") === 0) {
                        quote = quote
                          .replace(/^(\{%-\s*)/, "{%- ")
                          .replace(/(\s*-%\})$/, " -%}");
                        name = quote.slice(4);
                      } else {
                        quote = quote
                          .replace(/^(\{%\s*)/, "{% ")
                          .replace(/(\s*%\})$/, " %}");
                        name = quote.slice(3);
                      }
                    }

                    // HOTFIX
                    // Prevent whitespace removals of output tag values
                    if (open === "{{") {
                      quote = quote
                        .replace(/^({{\s+)/, "{{ ")
                        .replace(/(\s+}})$/, " }}");
                    }

                    // HOTFIX
                    // Allow trim style output delimeters
                    if (open === "{{-") {
                      quote = quote
                        .replace(/^({{-\s+)/, "{{")
                        .replace(/(\s+-}})$/, "}}");
                    }
                    if (
                      ltype === "item" &&
                      data.types[parse.count - 1] === "colon" && (
                        data.types[parse.count - 2] === "property" ||
                        data.types[parse.count - 2] === "variable"
                      )
                    ) {

                      ltype = "value";
                      data.types[parse.count] = "value";

                      if (Number.isNaN(Number(data.token[parse.count])) === true && data.token[parse.count].charAt(data.token[parse.count].length - 1) !== ")") {
                        data.token[parse.count] = data.token[parse.count] + quote;
                      } else {
                        data.token[parse.count] = data.token[parse.count] + " " + quote;
                      }
                      return;
                    }

                    ltoke = quote;

                    if (open === "{%") {

                      const templateNames = [
                        "autoescape",
                        "block",
                        "capture",
                        "case",
                        "comment",
                        "embed",
                        "filter",
                        "for",
                        "form",
                        "if",
                        "macro",
                        "paginate",
                        "raw",
                        "sandbox",
                        "spaceless",
                        "tablerow",
                        "unless",
                        "verbatim"
                      ];

                      let namesLen = templateNames.length - 1;

                      name = name.slice(0, name.indexOf(" "));
                      if (name.indexOf("(") > 0) {
                        name = name.slice(0, name.indexOf("("));
                      }
                      if (name === "else" || name === "elseif" || name === "when" || name === "elif") {
                        exit("template_else");
                        return;
                      }
                      namesLen = templateNames.length - 1;
                      if (namesLen > -1) {
                        do {
                          if (name === templateNames[namesLen]) {
                            exit("template_start");
                            return;
                          }
                          if (name === "end" + templateNames[namesLen]) {
                            exit("template_end");
                            return;
                          }
                          namesLen = namesLen - 1;
                        } while (namesLen > -1);
                      }
                    } else if (open === "{{") {
                      let group = quote.slice(2),
                        ending = group.length,
                        begin = 0;
                      do {
                        begin = begin + 1;
                      } while (begin < ending && (/\s/).test(group.charAt(begin)) === false && group.charAt(start) !== "(");
                      group = group.slice(0, begin);
                      if (group.charAt(group.length - 2) === "}") {
                        group = group.slice(0, group.length - 2);
                      }
                      if (group === "end") {
                        exit("template_end");
                        return;
                      }
                      if (group === "block" || group === "define" || group === "form" || group === "if" || group === "range" || group === "with") {
                        exit("template_start");
                        return;
                      }
                    }

                    exit("template");
                    return;
                  }
                  endlen = 0;
                }
              } else if (quote === b[a]) {
                if (quote === "\"" || quote === "'") {
                  quote = "";
                } else if (quote === "/" && (b[a] === "\r" || b[a] === "\n")) {
                  quote = "";
                } else if (quote === "*" && b[a + 1] === "/") {
                  quote = "";
                }
              }
              a = a + 1;
            } while (a < len);
          }
        },

        //finds comments including those JS looking '//' comments
        comment = function lexer_style_comment(line) {
          let comm = (line === true) ?
            parse.wrapCommentLine({
              chars: b,
              end: len,
              lexer: "style",
              opening: "//",
              start: a,
              terminator: "\n"
            }) :
            parse.wrapCommentBlock({
              chars: b,
              end: len,
              lexer: "style",
              opening: "/*",
              start: a,
              terminator: "\u002a/"
            });
          ltoke = comm[0];
          ltype = ((/^(\/\*\s*parse-ignore-start)/).test(ltoke) === true) ?
            "ignore" :
            "comment";
          recordPush("");
          a = comm[1];
        },
        //consolidate margin and padding values
        margin_padding = function lexer_style_marginPadding() {
          const lines = parse.linesSpace,
            props = {
              data: {
                margin: ["", "", "", "", false],
                padding: ["", "", "", "", false]
              },
              last: {
                margin: 0,
                padding: 0
              },
              removes: []
            },
            begin = parse.structure[parse.structure.length - 1][1],
            populate = function lexer_style_marginPadding_populate(prop) {
              if (data.token[aa - 2] === prop) {
                const values = data.token[aa].replace(/\s*!important\s*/g, "").split(" "),
                  vlen = values.length;
                if (data.token[aa].indexOf("!important") > -1) {
                  props.data[prop[4]] = true;
                }
                if (vlen > 3) {
                  if (props.data[prop][0] === "") {
                    props.data[prop][0] = values[0];
                  }
                  if (props.data[prop][1] === "") {
                    props.data[prop][1] = values[1];
                  }
                  if (props.data[prop][2] === "") {
                    props.data[prop][2] = values[2];
                  }
                  if (props.data[prop][3] === "") {
                    props.data[prop][3] = values[3];
                  }
                } else if (vlen > 2) {
                  if (props.data[prop][0] === "") {
                    props.data[prop][0] = values[0];
                  }
                  if (props.data[prop][1] === "") {
                    props.data[prop][1] = values[1];
                  }
                  if (props.data[prop][2] === "") {
                    props.data[prop][2] = values[2];
                  }
                  if (props.data[prop][3] === "") {
                    props.data[prop][3] = values[1];
                  }
                } else if (vlen > 1) {
                  if (props.data[prop][0] === "") {
                    props.data[prop][0] = values[0];
                  }
                  if (props.data[prop][1] === "") {
                    props.data[prop][1] = values[1];
                  }
                  if (props.data[prop][2] === "") {
                    props.data[prop][2] = values[0];
                  }
                  if (props.data[prop][3] === "") {
                    props.data[prop][3] = values[1];
                  }
                } else {
                  if (props.data[prop][0] === "") {
                    props.data[prop][0] = values[0];
                  }
                  if (props.data[prop][1] === "") {
                    props.data[prop][1] = values[0];
                  }
                  if (props.data[prop][2] === "") {
                    props.data[prop][2] = values[0];
                  }
                  if (props.data[prop][3] === "") {
                    props.data[prop][3] = values[0];
                  }
                }
              } else if (data.token[aa - 2] === `${prop}-bottom`) {
                if (props.data[prop][2] === "") {
                  props.data[prop][2] = data.token[aa];
                }
              } else if (data.token[aa - 2] === `${prop}-left`) {
                if (props.data[prop][3] === "") {
                  props.data[prop][3] = data.token[aa];
                }
              } else if (data.token[aa - 2] === `${prop}-right`) {
                if (props.data[prop][1] === "") {
                  props.data[prop][1] = data.token[aa];
                }
              } else if (data.token[aa - 2] === `${prop}-top`) {
                if (props.data[prop][0] === "") {
                  props.data[prop][0] = data.token[aa];
                }
              } else {
                return;
              }
              props.removes.push([aa, prop]);
              props.last[prop] = aa;
            },
            removes = function lexer_style_marginPadding_removes() {
              let cc = 0,
                values = "";
              const zero = (/^(0+([a-z]+|%))/),
                bb = props.removes.length,
                tmargin = (props.data.margin[0] !== "" && props.data.margin[1] !== "" && props.data.margin[2] !== "" && props.data.margin[3] !== ""),
                tpadding = (props.data.padding[0] !== "" && props.data.padding[1] !== "" && props.data.padding[2] !== "" && props.data.padding[3] !== ""),
                applyValues = function lexer_style_marginPadding_removes_applyValues(prop) {
                  if (zero.test(props.data[prop][0]) === true) {
                    props.data[prop][0] = "0";
                  }
                  if (zero.test(props.data[prop][1]) === true) {
                    props.data[prop][1] = "0";
                  }
                  if (zero.test(props.data[prop][2]) === true) {
                    props.data[prop][2] = "0";
                  }
                  if (zero.test(props.data[prop][3]) === true) {
                    props.data[prop][3] = "0";
                  }
                  if (props.data[prop][0] === props.data[prop][1] && props.data[prop][0] === props.data[prop][2] && props.data[prop][0] === props.data[prop][3]) {
                    values = props.data[prop][0];
                  } else if (props.data[prop][0] === props.data[prop][2] && props.data[prop][1] === props.data[prop][3] && props.data[prop][0] !== props.data[prop][1]) {
                    values = `${props.data[prop][0]} ${props.data[prop][1]}`;
                  } else if (props.data[prop][1] === props.data[prop][3] && props.data[prop][0] !== props.data[prop][2]) {
                    values = `${props.data[prop][0]} ${props.data[prop][1]} ${props.data[prop][2]}`;
                  } else {
                    values = `${props.data[prop][0]} ${props.data[prop][1]} ${props.data[prop][2]} ${props.data[prop][3]}`;
                  }
                  if (props.data[prop[4]] === true) {
                    values = `${values.replace(" !important", "")} !important`;
                  }
                  if (props.last[prop] > parse.count) {
                    cc = (begin < 1) ?
                      1 :
                      begin + 1;
                    do {
                      if (data.begin[cc] === begin && data.types[cc] === "value" && data.token[cc - 2].indexOf(prop) === 0) {
                        props.last[prop] = cc;
                        break;
                      }
                      cc = cc + 1;
                    } while (cc < parse.count);
                  }
                  data.token[props.last[prop]] = values;
                  data.token[props.last[prop] - 2] = prop;
                };
              if (bb > 1 && (tmargin === true || tpadding === true)) {
                do {
                  if (props.removes[cc][0] !== props.last.margin && props.removes[cc][0] !== props.last.padding && ((tmargin === true && props.removes[cc][1] === "margin") || (tpadding === true && props.removes[cc][1] === "padding"))) {
                    parse.splice({
                      data: data,
                      howmany: (data.types[props.removes[cc][0] + 1] === "separator") ?
                        4 :
                        3,
                      index: props.removes[cc][0] - 2
                    });
                  }
                  cc = cc + 1;
                } while (cc < bb - 1);
              }
              if (tmargin === true) {
                applyValues("margin");
              }
              if (tpadding === true) {
                applyValues("padding");
              }
              // this is necessary to fix the "begin" values of descendent blocks
              if (endtest === true) {
                if (begin < 0) {
                  sparser.parseerror = "Brace mismatch.  There appears to be more closing braces than starting braces.";
                } else {
                  parse.sortCorrection(begin, parse.count + 1);
                }
              }
            };
          let aa = parse.count,
            endtest = false;
          do {
            aa = aa - 1;
            if (data.begin[aa] === begin) {
              if (data.types[aa] === "value" && data.types[aa - 2] === "property") {
                if (data.token[aa - 2].indexOf("margin") === 0) {
                  populate("margin");
                } else if (data.token[aa - 2].indexOf("padding") === 0) {
                  populate("padding");
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
      //token building loop
      do {
        if ((/\s/).test(b[a]) === true) {
          a = parse.spacer({
            array: b,
            end: len,
            index: a
          });
        } else if (b[a] === "/" && b[a + 1] === "*") {
          comment(false);
        } else if (b[a] === "/" && b[a + 1] === "/") {
          comment(true);
        } else if (b[a] === "<" && b[a + 1] === "?" && b[a + 2] === "p" && b[a + 3] === "h" && b[a + 4] === "p") {
          //php
          template("<?php", "?>");
        } else if (b[a] === "<" && b[a + 1] === "?" && b[a + 2] === "=") {
          //php
          template("<?=", "?>");
        } else if (b[a] === "<" && b[a + 1] === "%") {
          //asp
          template("<%", "%>");
        } else if (b[a] === "{" && b[a + 1] === "%") {
          //asp
          template("{%", "%}");
        } else if (b[a] === "{" && b[a + 1] === "{" && b[a + 2] === "{") {
          //mustache
          template("{{{", "}}}");
        } else if (b[a] === "{" && b[a + 1] === "{") {
          //handlebars
          template("{{", "}}");
        } else if (b[a] === "<" && b[a + 1] === "!" && b[a + 2] === "-" && b[a + 3] === "-" && b[a + 4] === "#") {
          //ssi
          template("<!--#", "-->");
        } else if (b[a] === "@" && b[a + 1] === "e" && b[a + 2] === "l" && b[a + 3] === "s" && b[a + 4] === "e" && (b[a + 5] === "{" || (/\s/).test(b[a + 5]) === true)) {
          ltoke = "@else";
          ltype = "template_else";
          recordPush("");
          a = a + 4;
        } else if (b[a] === "{" || (b[a] === "(" && data.token[parse.count] === ":" && data.types[parse.count - 1] === "variable")) {
          item("start");
          ltype = "start";
          ltoke = b[a];
          if (b[a] === "(") {
            recordPush("map");
            mapper.push(0);
          } else if (data.types[parse.count] === "selector" || data.types[parse.count] === "variable") {
            recordPush(data.token[parse.count]);
          } else if (data.types[parse.count] === "colon") {
            recordPush(data.token[parse.count - 1]);
          } else {
            recordPush("block");
          }
          nosort.push(false);
        } else if (b[a] === "}" || (b[a] === ")" && parse.structure[parse.structure.length - 1][0] === "map" && mapper[mapper.length - 1] === 0)) {
          if (b[a] === "}" && data.types[parse.count] === "item" && data.token[parse.count - 1] === "{" && data.token[parse.count - 2] !== undefined && data.token[parse.count - 2].charAt(data.token[parse.count - 2].length - 1) === "@") {
            data.token[parse.count - 2] = data.token[parse.count - 2] + "{" + data.token[parse.count] +
              "}";
            parse.pop(data);
            parse.pop(data);
            parse.structure.pop();
          } else {
            if (b[a] === ")") {
              mapper.pop();
            }
            item("end");
            if (b[a] === "}" && data.token[parse.count] !== ";") {
              if (data.types[parse.count] === "value" || data.types[parse.count] === "function" || (data.types[parse.count] === "variable" && (data.token[parse.count - 1] === ":" || data.token[parse.count - 1] === ";"))) {
                if (options.correct === true) {
                  ltoke = ";";
                } else {
                  ltoke = "x;";
                }
                ltype = "separator";
                recordPush("");
              } else if (data.types[parse.count] === "comment") {
                semiComment();
              }
            }
            ltype = "end";
            nosort.pop();
            ltoke = b[a];
            ltype = "end";
            if (b[a] === "}") {
              margin_padding();
            }
            if (options.lexer_options.style.object_sort === true && b[a] === "}") {
              parse.object_sort(data);
            }
            recordPush("");
          }
        } else if (b[a] === ";" || b[a] === ",") {
          if (data.types[parse.count - 1] === "selector" || (data.token[parse.count - 1] === "}" && data.types[parse.count] !== "function")) {
            item("start");
          } else {
            item("separator");
          }
          if (data.types[parse.count] !== "separator" && esctest(a) === true) {
            ltoke = b[a];
            ltype = "separator";
            recordPush("");
          }
        } else if (b[a] === ":" && data.types[parse.count] !== "end") {
          item("colon");
          ltoke = ":";
          ltype = "colon";
          recordPush("");
        } else {
          if (parse.structure[parse.structure.length - 1][0] === "map" && b[a] === "(") {
            mapper[mapper.length - 1] = mapper[mapper.length - 1] + 1;
          }
          buildtoken();
        }
        a = a + 1;
      } while (a < len);
      if (options.lexer_options.style.object_sort === true) {
        parse.object_sort(data);
      }
      return data;
    };
    sparser.lexers.style = style;
  }());
  (function script_init() {

    const script = function lexer_script(source) {
      let a = 0,
        ltoke = "",
        ltype = "",
        lword = [],
        pword = [],
        lengthb = 0,
        wordTest = -1,
        paren = -1,
        funreferences = [],
        tempstore, pstack, comment;
      const parse = sparser.parse,
        data = parse.data,
        options = sparser.options,
        sourcemap = [
          0, ""
        ],
        references = parse.references,
        b = source.length,
        c = source.split(""),
        brace = [],
        classy = [],
        datatype = [false],
        // identify variable declarations
        vart = {
          count: [],
          index: [],
          len: -1,
          word: []
        },
        // automatic semicolon insertion
        asi = function lexer_script_asi(isEnd) {
          let aa = 0;
          const next = nextchar(1, false),
            record = {
              begin: data.begin[parse.count],
              ender: data.begin[parse.count],
              lexer: data.lexer[parse.count],
              lines: data.lines[parse.count],
              stack: data.stack[parse.count],
              token: data.token[parse.count],
              types: data.types[parse.count]
            },
            clist = (parse.structure.length === 0) ?
            "" :
            parse.structure[parse.structure.length - 1][0];
          if ((/^(\/(\/|\*)\s*parse-ignore\u002dstart)/).test(ltoke) === true) {
            return;
          }
          if (ltype === "start" || ltype === "type_start") {
            return;
          }
          if (options.language === "json" || options.language === "java" || options.language === "csharp") {
            return;
          }
          if (options.language === "json" || record.token === ";" || record.token === "," || next === "{" || record.stack === "class" || record.stack === "map" || record.stack === "attribute" || clist === "initializer" || data.types[record.begin - 1] === "generic") {
            return;
          }
          if (record.token === "}" && data.stack[record.begin - 1] === "global" && data.types[record.begin - 1] !== "operator" && record.stack === data.stack[parse.count - 1]) {
            return;
          }
          if (record.stack === "array" && record.token !== "]") {
            return;
          }
          if (data.token[data.begin[parse.count]] === "{" && record.stack === "data_type") {
            return;
          }
          if (record.types !== undefined && record.types.indexOf("template") > -1 && record.types.indexOf("template_string") < 0) {
            return;
          }
          if (next === ";" && isEnd === false) {
            return;
          }
          if (data.lexer[parse.count - 1] !== "script" && ((a < b && b === options.source.length - 1) || b < options.source.length - 1)) {
            return;
          }
          if (options.language === "qml") {
            if (record.types === "start") {
              return;
            }
            ltoke = (options.correct === true) ?
              ";" :
              "x;";
            ltype = "separator";
            recordPush("");
            if (next !== "}") {
              blockinsert();
            }
            return;
          }
          if (record.token === "}" && (record.stack === "function" || record.stack === "if" || record.stack === "else" || record.stack === "for" || record.stack === "do" || record.stack === "while" || record.stack === "switch" || record.stack === "class" || record.stack === "try" || record.stack === "catch" || record.stack === "finally" || record.stack === "block")) {
            if (record.stack === "function" && (data.stack[record.begin - 1] === "data_type" || data.types[record.begin - 1] === "type")) {
              aa = record.begin;
              do {
                aa = aa - 1;
              } while (aa > 0 && data.token[aa] !== ")" && data.stack[aa] !== "arguments");
              aa = data.begin[aa];
            } else {
              aa = data.begin[record.begin - 1];
            }
            if (data.token[aa] === "(") {
              aa = aa - 1;
              if (data.token[aa - 1] === "function") {
                aa = aa - 1;
              }
              if (data.stack[aa - 1] === "object" || data.stack[aa - 1] === "switch") {
                return;
              }
              if (data.token[aa - 1] !== "=" && data.token[aa - 1] !== "return" && data.token[aa - 1] !== ":") {
                return;
              }
            } else {
              return;
            }
          }
          if (record.types === "comment" ||
            clist === "method" ||
            clist === "paren" ||
            clist === "expression" ||
            clist === "array" ||
            clist === "object" ||
            (clist === "switch" && record.stack !== "method" && data.token[data.begin[parse.count]] === "(" && data.token[data.begin[parse.count] - 1] !== "return" && data.types[data.begin[parse.count] - 1] !== "operator")) {
            return;
          }
          if (data.stack[parse.count] === "expression" && (data.token[data.begin[parse.count] - 1] !== "while" || (data.token[data.begin[parse.count] - 1] === "while" && data.stack[data.begin[parse.count] - 2] !== "do"))) {
            return;
          }
          if (next !== "" && "=<>+*?|^:&%~,.()]".indexOf(next) > -1 && isEnd === false) {
            return;
          }
          if (record.types === "comment") {
            aa = parse.count;
            do {
              aa = aa - 1;
            } while (aa > 0 && data.types[aa] === "comment");
            if (aa < 1) {
              return;
            }
            record.token = data.token[aa];
            record.types = data.types[aa];
            record.stack = data.stack[aa];
          }
          if (record.token === undefined || record.types === "start" || record.types === "separator" || (record.types === "operator" && record.token !== "++" && record.token !== "--") || record.token === "x}" || record.token === "var" || record.token === "let" || record.token === "const" || record.token === "else" || record.token.indexOf("#!/") === 0 || record.token === "instanceof") {
            return;
          }
          if (record.stack === "method" && (data.token[record.begin - 1] === "function" || data.token[record.begin - 2] === "function")) {
            return;
          }
          if (options.lexer_options.script.variable_list === "list") {
            vart.index[vart.len] = parse.count;
          }
          ltoke = (options.correct === true) ?
            ";" :
            "x;";
          ltype = "separator";
          aa = parse.linesSpace;
          parse.linesSpace = 0;
          recordPush("");
          parse.linesSpace = aa;
          blockinsert();
        },
        // fixes asi location if inserted after an inserted brace
        asibrace = function lexer_script_asibrace() {
          let aa = parse.count;
          do {
            aa = aa - 1;
          } while (aa > -1 && data.token[aa] === "x}");
          if (data.stack[aa] === "else") {
            return recordPush("");
          }
          aa = aa + 1;
          parse.splice({
            data: data,
            howmany: 0,
            index: aa,
            record: {
              begin: data.begin[aa],
              ender: -1,
              lexer: "script",
              lines: parse.linesSpace,
              stack: data.stack[aa],
              token: ltoke,
              types: ltype
            }
          });
          recordPush("");
        },
        // cleans up improperly applied ASI
        asifix = function lexer_script_asifix() {
          let len = parse.count;
          if (data.types[len] === "comment") {
            do {
              len = len - 1;
            } while (len > 0 && data.types[len] === "comment");
          }
          if (data.token[len] === "from") {
            len = len - 2;
          }
          if (data.token[len] === "x;") {
            parse.splice({
              data: data,
              howmany: 1,
              index: len
            });
          }
        },
        // block comments
        blockComment = function lexer_script_blockComment() {
          asi(false);
          if (wordTest > -1) {
            word();
          }
          comment = parse.wrapCommentBlock({
            chars: c,
            end: b,
            lexer: "script",
            opening: "/*",
            start: a,
            terminator: "\u002a/"
          });
          a = comment[1];
          if (data.token[parse.count] === "var" || data.token[parse.count] === "let" || data.token[parse.count] === "const") {
            tempstore = parse.pop(data);
            recordPush("");
            parse.push(data, tempstore, "");
            if (data.lines[parse.count - 2] === 0) {
              data.lines[parse.count - 2] = data.lines[parse.count];
            }
            data.lines[parse.count] = 0;
          } else if (comment[0] !== "") {
            ltoke = comment[0];
            ltype = (/^\/\*\s*parse-ignore-start/).test(ltoke) ?
              "ignore" :
              "comment";
            if (ltoke.indexOf("# sourceMappingURL=") === 2) {
              sourcemap[0] = parse.count + 1;
              sourcemap[1] = ltoke;
            }
            parse.push(data, {
              begin: parse.structure[parse.structure.length - 1][1],
              ender: -1,
              lexer: "script",
              lines: parse.linesSpace,
              stack: parse.structure[parse.structure.length - 1][0],
              token: ltoke,
              types: ltype
            }, "");
          }
          if ((/\/\*\s*global\s+/).test(data.token[parse.count]) === true && data.types.indexOf("word") < 0) {
            references[0] = data.token[parse.count].replace(/\/\*\s*global\s+/, "").replace("\u002a/", "").replace(/,\s+/g, ",").split(",");
          }
        },
        // inserts ending curly brace (where absent)
        blockinsert = function lexer_script_blockinsert() {
          let next = nextchar(5, false),
            name = "";
          const g = parse.count,
            lines = parse.linesSpace;
          if (options.language === "json" || brace.length < 1 || brace[brace.length - 1].charAt(0) !== "x" || (/^x?(;|\}|\))$/).test(ltoke) === false) {
            return;
          }
          if (data.stack[parse.count] === "do" && next === "while" && data.token[parse.count] === "}") {
            return;
          }
          if (ltoke === ";" && data.token[g - 1] === "x{") {
            name = data.token[data.begin[g - 2] - 1];
            if (data.token[g - 2] === "do" || (data.token[g - 2] === ")" && "ifforwhilecatch".indexOf(name) > -1)) {
              tempstore = parse.pop(data);
              ltoke = (options.correct === true) ?
                "}" :
                "x}";
              ltype = "end";
              pstack = parse.structure[parse.structure.length - 1];
              recordPush("");
              brace.pop();
              parse.linesSpace = lines;
              return;
            }
            // to prevent the semicolon from inserting between the braces --> while (x) {};
            tempstore = parse.pop(data);
            ltoke = (options.correct === true) ?
              "}" :
              "x}";
            ltype = "end";
            pstack = parse.structure[parse.structure.length - 1];
            recordPush("");
            brace.pop();
            ltoke = ";";
            ltype = "end";
            parse.push(data, tempstore, "");
            parse.linesSpace = lines;
            return;
          }
          ltoke = (options.correct === true) ?
            "}" :
            "x}";
          ltype = "end";
          if (data.token[parse.count] === "x}") {
            return;
          }
          if (data.stack[parse.count] === "if" && (data.token[parse.count] === ";" || data.token[parse.count] === "x;") && next === "else") {
            pstack = parse.structure[parse.structure.length - 1];
            recordPush("");
            brace.pop();
            parse.linesSpace = lines;
            return;
          }
          do {
            pstack = parse.structure[parse.structure.length - 1];
            recordPush("");
            brace.pop();
            if (data.stack[parse.count] === "do") {
              break;
            }
          } while (brace[brace.length - 1] === "x{");
          parse.linesSpace = lines;
        },
        // commaComment ensures that commas immediately precede comments instead of
        // immediately follow
        commaComment = function lexer_script_commacomment() {
          let x = parse.count;
          if (data.stack[x] === "object" && options.lexer_options.script.object_sort === true) {
            ltoke = ",";
            ltype = "separator";
            asifix();
            recordPush("");
          } else {
            do {
              x = x - 1;
            } while (x > 0 && data.types[x - 1] === "comment");
            parse.splice({
              data: data,
              howmany: 0,
              index: x,
              record: {
                begin: data.begin[x],
                ender: -1,
                lexer: "script",
                lines: parse.linesSpace,
                stack: data.stack[x],
                token: ",",
                types: "separator"
              }
            });
            recordPush("");
          }
        },
        // operations for end types: ), ], }
        end = function lexer_script_end(x) {
          let insert = false,
            newarr = false;
          const next = nextchar(1, false),
            count = (data.token[parse.count] === "(") ?
            parse.count :
            data.begin[parse.count],
            newarray = function lexer_script_end_newarray() {
              let arraylen = 0;
              const ar = (data.token[count - 1] === "Array"),
                startar = (ar === true) ?
                "[" :
                "{",
                endar = (ar === true) ?
                "]" :
                "}",
                namear = (ar === true) ?
                "array" :
                "object";
              if (ar === true && data.types[parse.count] === "number") {
                arraylen = Number(data.token[parse.count]);
                tempstore = parse.pop(data);
              }
              tempstore = parse.pop(data);
              tempstore = parse.pop(data);
              tempstore = parse.pop(data);
              parse.structure.pop();
              ltoke = startar;
              ltype = "start";
              recordPush(namear);
              if (arraylen > 0) {
                ltoke = ",";
                ltype = "separator";
                do {
                  recordPush("");
                  arraylen = arraylen - 1;
                } while (arraylen > 0);
              }
              ltoke = endar;
              ltype = "end";
              recordPush("");
            };
          if (wordTest > -1) {
            word();
          }
          if (classy.length > 0) {
            if (classy[classy.length - 1] === 0) {
              classy.pop();
            } else {
              classy[classy.length - 1] = classy[classy.length - 1] - 1;
            }
          }
          if (x === ")" || x === "x)" || x === "]") {
            if (options.correct === true) {
              plusplus();
            }
            asifix();
          }
          if (x === ")" || x === "x)") {
            asi(false);
          }
          if (vart.len > -1) {
            if (x === "}" && ((options.lexer_options.script.variable_list === "list" && vart.count[vart.len] === 0) || (data.token[parse.count] === "x;" && options.lexer_options.script.variable_list === "each"))) {
              vartpop();
            }
            vart.count[vart.len] = vart.count[vart.len] - 1;
            if (vart.count[vart.len] < 0) {
              vartpop();
            }
          }
          if (ltoke === "," && data.stack[parse.count] !== "initializer" && ((x === "]" && data.token[parse.count - 1] === "[") || x === "}")) {
            tempstore = parse.pop(data);
          }
          if (x === ")" || x === "x)") {
            ltoke = x;
            if (lword.length > 0) {
              pword = lword[lword.length - 1];
              if (pword.length > 1 && next !== "{" && (pword[0] === "if" || pword[0] === "for" || (pword[0] === "while" && data.stack[pword[1] - 2] !== undefined && data.stack[pword[1] - 2] !== "do") || pword[0] === "with")) {
                insert = true;
              }
            }
          } else if (x === "]") {
            ltoke = "]";
          } else if (x === "}") {
            if (ltoke !== "," && options.correct === true) {
              plusplus();
            }
            if (parse.structure.length > 0 && parse.structure[parse.structure.length - 1][0] !== "object") {
              asi(true);
            }
            if (options.lexer_options.script.object_sort === true && parse.structure[parse.structure.length - 1][0] === "object") {
              parse.object_sort(data);
            }
            if (ltype === "comment") {
              ltoke = data.token[parse.count];
              ltype = data.types[parse.count];
            }
            ltoke = "}";
          }
          if (parse.structure[parse.structure.length - 1][0] === "data_type") {
            ltype = "type_end";
          } else {
            ltype = "end";
          }
          lword.pop();
          pstack = parse.structure[parse.structure.length - 1];
          if (x === ")" && options.correct === true && count - parse.count < 2 && (data.token[parse.count] === "(" || data.types[parse.count] === "number") && (data.token[count - 1] === "Array" || data.token[count - 1] === "Object") && data.token[count - 2] === "new") {
            newarray();
            newarr = true;
          }
          if (brace[brace.length - 1] === "x{" && x === "}") {
            blockinsert();
            brace.pop();
            if (data.stack[parse.count] !== "try") {
              if (next !== ":" && next !== ";" && data.token[data.begin[a] - 1] !== "?") {
                blockinsert();
              }
            }
            ltoke = "}";
          } else {
            brace.pop();
          }
          // options.end_comma
          if (options.lexer_options.script.end_comma !== undefined && options.lexer_options.script.end_comma !== "none" && parse.structure[parse.structure.length - 1][0] === "array" || parse.structure[parse.structure.length - 1][0] === "object" || parse.structure[parse.structure.length - 1][0] === "data_type") {
            if (options.lexer_options.script.end_comma === "always" && data.token[parse.count] !== ",") {
              const begin = parse.structure[parse.structure.length - 1][1];
              let y = parse.count;
              do {
                if (data.begin[y] === begin) {
                  if (data.token[y] === ",") {
                    break;
                  }
                } else {
                  y = data.begin[y];
                }
                y = y - 1;
              } while (y > begin);
              if (y > begin) {
                const type = ltype,
                  toke = ltoke;
                ltoke = ",";
                ltype = "separator";
                recordPush("");
                ltoke = toke;
                ltype = type;
              }
            } else if (options.lexer_options.script.end_comma === "never" && data.token[parse.count] === ",") {
              parse.pop(data);
            }
          }
          if (newarr === false) {
            recordPush("");
            if (ltoke === "}" && data.stack[parse.count] !== "object" && data.stack[parse.count] !== "class" && data.stack[parse.count] !== "data_type") {
              references.pop();
              blockinsert();
            }
          }
          if (insert === true) {
            ltoke = (options.correct === true) ?
              "{" :
              "x{";
            ltype = "start";
            recordPush(pword[0]);
            brace.push("x{");
            pword[1] = parse.count;
          }
          datatype.pop();
          if (parse.structure[parse.structure.length - 1][0] !== "data_type") {
            datatype[datatype.length - 1] = false;
          }
        },
        // the general function is a generic tokenizer start argument contains the
        // token's starting syntax offset argument is length of start minus control
        // chars end is how is to identify where the token ends
        general = function lexer_script_general(starting, ending, type) {
          let ee = 0,
            escape = false,
            ext = false,
            build = [starting],
            ender = ending.split(""),
            temp;
          const endlen = ender.length,
            start = a,
            qc = (options.lexer_options.script.quote_convert === undefined) ?
            "none" :
            options.lexer_options.script.quote_convert,
            base = a + starting.length,
            cleanUp = function lexer_script_general_cleanUp() {
              let linesSpace = 0;
              build = [];
              ltype = type;
              ee = a;
              if (type === "string" && (/\s/).test(c[ee + 1]) === true) {
                linesSpace = 1;
                do {
                  ee = ee + 1;
                  if (c[ee] === "\n") {
                    linesSpace = linesSpace + 1;
                  }
                } while (ee < b && (/\s/).test(c[ee + 1]) === true);
                parse.linesSpace = linesSpace;
              }
            },
            finish = function lexer_script_general_finish() {
              let str = "";
              //pads certain template tag delimiters with a space
              const bracketSpace = function lexer_script_general_finish_bracketSpace(input) {
                if (options.language !== "javascript" && options.language !== "typescript" && options.language !== "jsx" && options.language !== "tsx") {
                  const spaceStart = function lexer_script_general_finish_bracketSpace_spaceStart(start) {
                      return start.replace(/\s*$/, " ");
                    },
                    spaceEnd = function lexer_script_general_finish_bracketSpace_spaceStart(end) {
                      return end.replace(/^\s*/, " ");
                    };
                  if ((/\{(#|\/|(%>)|(%\]))/).test(input) === true || (/\}%(>|\])/).test(input) === true) {
                    return input;
                  }
                  input = input.replace(/\{((\{+)|%-?)\s*/g, spaceStart);
                  input = input.replace(/\s*((\}\}+)|(-?%\}))/g, spaceEnd);
                  return input;
                }
                return input;
              };
              if (starting === "\"" && qc === "single") {
                build[0] = "'";
                build[build.length - 1] = "'";
              } else if (starting === "'" && qc === "double") {
                build[0] = "\"";
                build[build.length - 1] = "\"";
              } else if (escape === true) {
                str = build[build.length - 1];
                build.pop();
                build.pop();
                build.push(str);
              }
              a = ee;
              if (ending === "\n") {
                a = a - 1;
                build.pop();
              }
              ltoke = build.join("");
              if (starting === "\"" || starting === "'" || starting === "{{" || starting === "{%" || starting === "{{{") {
                ltoke = bracketSpace(ltoke);
              }
              if (starting === "{%" || starting === "{{") {
                temp = tname(ltoke);
                ltype = temp[0];
                recordPush(temp[1]);
                return;
              }
              if (type === "string") {
                ltype = "string";
                if (options.language === "json") {
                  ltoke = ltoke
                    .replace(/\u0000/g, "\\u0000")
                    .replace(/\u0001/g, "\\u0001")
                    .replace(/\u0002/g, "\\u0002")
                    .replace(/\u0003/g, "\\u0003")
                    .replace(/\u0004/g, "\\u0004")
                    .replace(/\u0005/g, "\\u0005")
                    .replace(/\u0006/g, "\\u0006")
                    .replace(/\u0007/g, "\\u0007")
                    .replace(/\u0008/g, "\\u0008")
                    .replace(/\u0009/g, "\\u0009")
                    .replace(/\u000a/g, "\\u000a")
                    .replace(/\u000b/g, "\\u000b")
                    .replace(/\u000c/g, "\\u000c")
                    .replace(/\u000d/g, "\\u000d")
                    .replace(/\u000e/g, "\\u000e")
                    .replace(/\u000f/g, "\\u000f")
                    .replace(/\u0010/g, "\\u0010")
                    .replace(/\u0011/g, "\\u0011")
                    .replace(/\u0012/g, "\\u0012")
                    .replace(/\u0013/g, "\\u0013")
                    .replace(/\u0014/g, "\\u0014")
                    .replace(/\u0015/g, "\\u0015")
                    .replace(/\u0016/g, "\\u0016")
                    .replace(/\u0017/g, "\\u0017")
                    .replace(/\u0018/g, "\\u0018")
                    .replace(/\u0019/g, "\\u0019")
                    .replace(/\u001a/g, "\\u001a")
                    .replace(/\u001b/g, "\\u001b")
                    .replace(/\u001c/g, "\\u001c")
                    .replace(/\u001d/g, "\\u001d")
                    .replace(/\u001e/g, "\\u001e")
                    .replace(/\u001f/g, "\\u001f");
                } else if (starting.indexOf("#!") === 0) {
                  ltoke = ltoke.slice(0, ltoke.length - 1);
                  parse.linesSpace = 2;
                } else if (parse.structure[parse.structure.length - 1][0] !== "object" || (parse.structure[parse.structure.length - 1][0] === "object" && nextchar(1, false) !== ":" && data.token[parse.count] !== "," && data.token[parse.count] !== "{")) {
                  if ((ltoke.length > options.wrap && options.wrap > 0) || (options.wrap !== 0 && data.token[parse.count] === "+" && (data.token[parse.count - 1].charAt(0) === "\"" || data.token[parse.count - 1].charAt(0) === "'"))) {
                    let item = ltoke,
                      q = (qc === "double") ?
                      "\"" :
                      (qc === "single") ?
                      "'" :
                      item.charAt(0),
                      segment = "";
                    const limit = options.wrap,
                      uchar = (/u[0-9a-fA-F]{4}/),
                      xchar = (/x[0-9a-fA-F]{2}/);
                    item = item.slice(1, item.length - 1);
                    if (data.token[parse.count] === "+" && (data.token[parse.count - 1].charAt(0) === "\"" || data.token[parse.count - 1].charAt(0) === "'")) {
                      parse.pop(data);
                      q = data.token[parse.count].charAt(0);
                      item = data.token[parse.count].slice(1, data.token[parse.count].length - 1) + item;
                      parse.pop(data);
                    }
                    if (item.length > limit && limit > 0) {
                      do {
                        segment = item.slice(0, limit);
                        if (segment.charAt(limit - 5) === "\\" && uchar.test(item.slice(limit - 4, limit + 1)) === true) {
                          segment = segment.slice(0, limit - 5);
                        } else if (segment.charAt(limit - 4) === "\\" && uchar.test(item.slice(limit - 3, limit + 2)) === true) {
                          segment = segment.slice(0, limit - 4);
                        } else if (segment.charAt(limit - 3) === "\\" && (uchar.test(item.slice(limit - 2, limit + 3)) === true || xchar.test(item.slice(limit - 2, limit + 1)) === true)) {
                          segment = segment.slice(0, limit - 3);
                        } else if (segment.charAt(limit - 2) === "\\" && (uchar.test(item.slice(limit - 1, limit + 4)) === true || xchar.test(item.slice(limit - 1, limit + 2)) === true)) {
                          segment = segment.slice(0, limit - 2);
                        } else if (segment.charAt(limit - 1) === "\\") {
                          segment = segment.slice(0, limit - 1);
                        }
                        segment = q + segment + q;
                        item = item.slice(segment.length - 2);
                        ltoke = segment;
                        ltype = "string";
                        recordPush("");
                        parse.linesSpace = 0;
                        ltoke = "+";
                        ltype = "operator";
                        recordPush("");
                      } while (item.length > limit);
                    }
                    if (item === "") {
                      ltoke = q + q;
                    } else {
                      ltoke = q + item + q;
                    }
                    ltype = "string";
                  }
                }
              } else if ((/\{\s*\?>$/).test(ltoke) === true) {
                if ((/^<\?(=|(php))\s*\}\s*else/).test(ltoke) === true) {
                  ltype = "template_else";
                } else {
                  ltype = "template_start";
                }
              } else if ((/^<\?(=|(php))\s*\}/).test(ltoke) === true) {
                if ((/^<\?(=|(php))\s*\}\s*else/).test(ltoke) === true) {
                  ltype = "template_else";
                } else {
                  ltype = "template_end";
                }
              } else {
                ltype = type;
              }
              if (ltoke.length > 0) {
                recordPush("");
              }
            };
          if (wordTest > -1) {
            word();
          }
          // this insanity is for JSON where all the required quote characters are
          // escaped.
          if (c[a - 1] === "\\" && slashes(a - 1) === true && (c[a] === "\"" || c[a] === "'")) {
            parse.pop(data);
            if (data.token[0] === "{") {
              if (c[a] === "\"") {
                starting = "\"";
                ending = "\\\"";
                build = ["\""];
              } else {
                starting = "'";
                ending = "\\'";
                build = ["'"];
              }
              escape = true;
            } else {
              if (c[a] === "\"") {
                build = ["\\\""];
                finish();
                return;
              }
              build = ["\\'"];
              finish();
              return;
            }
          }
          ee = base;
          if (ee < b) {
            do {
              if (data.token[0] !== "{" && data.token[0] !== "[" && qc !== "none" && (c[ee] === "\"" || c[ee] === "'")) {
                if (c[ee - 1] === "\\") {
                  if (slashes(ee - 1) === true) {
                    if (qc === "double" && c[ee] === "'") {
                      build.pop();
                    } else if (qc === "single" && c[ee] === "\"") {
                      build.pop();
                    }
                  }
                } else if (qc === "double" && c[ee] === "\"" && c[a] === "'") {
                  c[ee] = "\\\"";
                } else if (qc === "single" && c[ee] === "'" && c[a] === "\"") {
                  c[ee] = "\\'";
                }
                build.push(c[ee]);
              } else if (ee > start) {
                ext = true;
                if (c[ee] === "<" && c[ee + 1] === "?" && c[ee + 2] === "p" && c[ee + 3] === "h" && c[ee + 4] === "p" && c[ee + 5] !== starting) {
                  finish();
                  // php
                  lexer_script_general("<?php", "?>", "template");
                  cleanUp();
                } else if (c[ee] === "<" && c[ee + 1] === "?" && c[ee + 2] === "=" && c[ee + 3] !== starting) {
                  finish();
                  // php
                  lexer_script_general("<?=", "?>", "template");
                  cleanUp();
                } else if (c[ee] === "<" && c[ee + 1] === "%" && c[ee + 2] !== starting) {
                  finish();
                  // asp
                  lexer_script_general("<%", "%>", "template");
                  cleanUp();
                } else if (c[ee] === "{" && c[ee + 1] === "%" && c[ee + 2] !== starting) {
                  finish();
                  // twig
                  lexer_script_general("{%", "%}", "template");
                  cleanUp();
                } else if (c[ee] === "{" && c[ee + 1] === "{" && c[ee + 2] === "{" && c[ee + 3] !== starting) {
                  finish();
                  // mustache
                  lexer_script_general("{{{", "}}}", "template");
                  cleanUp();
                } else if (c[ee] === "{" && c[ee + 1] === "{" && c[ee + 2] !== starting) {
                  finish();
                  // handlebars
                  lexer_script_general("{{", "}}", "template");
                  cleanUp();
                } else if (c[ee] === "<" && c[ee + 1] === "!" && c[ee + 2] === "-" && c[ee + 3] === "-" && c[ee + 4] === "#" && c[ee + 5] !== starting) {
                  finish();
                  // ssi
                  lexer_script_general("<!--#", "-->", "template");
                  cleanUp();
                } else {
                  ext = false;
                  build.push(c[ee]);
                }
              } else {
                build.push(c[ee]);
              }
              if ((starting === "\"" || starting === "'") && (ext === true || ee > start) && options.language !== "json" && c[ee - 1] !== "\\" && c[ee] !== "\"" && c[ee] !== "'" && (c[ee] === "\n" || ee === b - 1)) {
                sparser.parseerror = "Unterminated string in script on line number " + parse.lineNumber;
                break;
              }
              if (c[ee] === ender[endlen - 1] && (c[ee - 1] !== "\\" || slashes(ee - 1) === false)) {
                if (endlen === 1) {
                  break;
                }
                // `ee - base` is a cheap means of computing length of build array the `ee -
                // base` and `endlen` are both length based values, so adding two (1 for each)
                // provides an index based number
                if (build[ee - base] === ender[0] && build.slice(ee - base - endlen + 2).join("") === ending) {
                  break;
                }
              }
              ee = ee + 1;
            } while (ee < b);
          }
          finish();
        },
        // line comments
        lineComment = function lexer_script_lineComment() {
          asi(false);
          blockinsert();
          if (wordTest > -1) {
            word();
          }
          comment = parse.wrapCommentLine({
            chars: c,
            end: b,
            lexer: "script",
            opening: "//",
            start: a,
            terminator: "\n"
          });
          a = comment[1];
          if (comment[0] !== "") {
            ltoke = comment[0];
            ltype = (/^(\/\/\s*parse-ignore-start)/).test(ltoke) ?
              "ignore" :
              "comment";
            if (ltoke.indexOf("# sourceMappingURL=") === 2) {
              sourcemap[0] = parse.count + 1;
              sourcemap[1] = ltoke;
            }
            parse.push(data, {
              begin: parse.structure[parse.structure.length - 1][1],
              ender: -1,
              lexer: "script",
              lines: parse.linesSpace,
              stack: parse.structure[parse.structure.length - 1][0],
              token: ltoke,
              types: ltype
            }, "");
          }
        },
        // Identifies blocks of markup embedded within JavaScript for language super sets
        // like React JSX.
        markup = function lexer_script_markup() {
          let curlytest = false,
            endtag = false,
            anglecount = 0,
            curlycount = 0,
            tagcount = 0,
            d = 0,
            next = "",
            priorToken = "",
            priorType = "",
            output = [];
          const dt = datatype[datatype.length - 1],
            syntaxnum = "0123456789=<>+-*?|^:&.,;%(){}[]~",
            applyMarkup = function lexer_script_markup_applyMarkup() {
              if (ltoke === "(") {
                parse.structure[parse.structure.length - 1] = ["paren", parse.count];
              }
              sparser.lexers.markup(output.join(""));
            };
          if (wordTest > -1) {
            word();
          }
          // type generics tokenizer
          priorToken = (parse.count > 0) ?
            data.token[parse.count - 1] :
            "";
          priorType = (parse.count > 0) ?
            data.types[parse.count - 1] :
            "";
          next = nextchar(1, false);
          if (options.language !== "jsx" && options.language !== "tsx" && (/\d/).test(next) === false && (ltoke === "function" ||
              priorToken === "=>" ||
              priorToken === "void" ||
              priorToken === "." ||
              data.stack[parse.count] === "arguments" ||
              ((options.language === "csharp" || options.language === "java") && priorToken === "public" || priorToken === "private" || priorToken === "final" || priorToken === "static") ||
              (ltype === "type" && priorToken === "type") ||
              (ltype === "reference" && (priorType === "operator" || priorToken === "function" || priorToken === "class" || priorToken === "new")) ||
              (ltype === "type" && priorType === "operator") ||
              ltoke === "return" ||
              ltype === "operator")) {
            let inc = 0,
              e = 0;
            const build = [];
            d = a;
            do {
              build.push(c[d]);
              if (c[d] === "<") {
                inc = inc + 1;
              } else if (c[d] === ">") {
                inc = inc - 1;
                if (inc < 1) {
                  break;
                }
              }
              d = d + 1;
            } while (d < b);
            e = a;
            a = d;
            next = nextchar(1, false);
            if (c[d] === ">" && (dt === true || priorToken === "=>" || priorToken === "." || priorType !== "operator" || (priorType === "operator" && (next === "(" || next === "=")))) {
              ltype = "generic";
              ltoke = build.join("").replace(/^<\s+/, "<").replace(/\s+>$/, ">").replace(/,\s*/g, ", ");
              recordPush("");
              return;
            }
            a = e;
          }
          d = parse.count;
          if (data.types[d] === "comment") {
            do {
              d = d - 1;
            } while (d > 0 && data.types[d] === "comment");
          }
          if (dt === false &&
            nextchar(1, false) !== ">" && ((c[a] !== "<" && syntaxnum.indexOf(c[a + 1]) > -1) ||
              data.token[d] === "++" ||
              data.token[d] === "--" ||
              (/\s/).test(c[a + 1]) === true ||
              ((/\d/).test(c[a + 1]) === true &&
                (ltype === "operator" ||
                  ltype === "string" ||
                  ltype === "number" ||
                  ltype === "reference" ||
                  (ltype === "word" && ltoke !== "return"))))) {
            ltype = "operator";
            ltoke = operator();
            return recordPush("");
          }
          if (options.language !== "typescript" && options.language !== "flow" && (data.token[d] === "return" || data.types[d] === "operator" || data.types[d] === "start" || data.types[d] === "separator" || data.types[d] === "jsx_attribute_start" || (data.token[d] === "}" && parse.structure[parse.structure.length - 1][0] === "global"))) {
            ltype = "markup";
            options.language = "jsx";
            do {
              output.push(c[a]);
              if (c[a] === "{") {
                curlycount = curlycount + 1;
                curlytest = true;
              } else if (c[a] === "}") {
                curlycount = curlycount - 1;
                if (curlycount === 0) {
                  curlytest = false;
                }
              } else if (c[a] === "<" && curlytest === false) {
                if (c[a + 1] === "<") {
                  do {
                    output.push(c[a]);
                    a = a + 1;
                  } while (a < b && c[a + 1] === "<");
                }
                anglecount = anglecount + 1;
                if (nextchar(1, false) === "/") {
                  endtag = true;
                }
              } else if (c[a] === ">" && curlytest === false) {
                if (c[a + 1] === ">") {
                  do {
                    output.push(c[a]);
                    a = a + 1;
                  } while (c[a + 1] === ">");
                }
                anglecount = anglecount - 1;
                if (endtag === true) {
                  tagcount = tagcount - 1;
                } else if (c[a - 1] !== "/") {
                  tagcount = tagcount + 1;
                }
                if (anglecount === 0 && curlycount === 0 && tagcount < 1) {
                  next = nextchar(2, false);
                  if (next.charAt(0) !== "<") {
                    // if followed by nonmarkup
                    return applyMarkup();
                  }
                  // catch additional trailing tag sets
                  if (next.charAt(0) === "<" && syntaxnum.indexOf(next.charAt(1)) < 0 && (/\s/).test(next.charAt(1)) === false) {
                    // perform a minor safety test to verify if "<" is a tag start or a less than
                    // operator
                    d = a + 1;
                    do {
                      d = d + 1;
                      if (c[d] === ">" || ((/\s/).test(c[d - 1]) === true && syntaxnum.indexOf(c[d]) < 0)) {
                        break;
                      }
                      if (syntaxnum.indexOf(c[d]) > -1) {
                        // if followed by additional markup tags
                        return applyMarkup();
                      }
                    } while (d < b);
                  } else {
                    // if a nonmarkup "<" follows markup
                    return applyMarkup();
                  }
                }
                endtag = false;
              }
              a = a + 1;
            } while (a < b);
            return applyMarkup();
          }
          ltype = "operator";
          ltoke = operator();
          recordPush("");
          return;
        },
        // peek at whats up next
        nextchar = function lexer_script_nextchar(len, current) {
          let cc = (current === true) ?
            a :
            a + 1,
            dd = "";
          if (typeof len !== "number" || len < 1) {
            len = 1;
          }
          if (c[a] === "/") {
            if (c[a + 1] === "/") {
              dd = "\n";
            } else if (c[a + 1] === "*") {
              dd = "/";
            }
          }
          if (cc < b) {
            do {
              if ((/\s/).test(c[cc]) === false) {
                if (c[cc] === "/") {
                  if (dd === "") {
                    if (c[cc + 1] === "/") {
                      dd = "\n";
                    } else if (c[cc + 1] === "*") {
                      dd = "/";
                    }
                  } else if (dd === "/" && c[cc - 1] === "*") {
                    dd = "";
                  }
                }
                if (dd === "" && c[cc - 1] + c[cc] !== "\u002a/") {
                  return c
                    .slice(cc, cc + len)
                    .join("");
                }
              } else if (dd === "\n" && c[cc] === "\n") {
                dd = "";
              }
              cc = cc + 1;
            } while (cc < b);
          }
          return "";
        },
        // a tokenizer for numbers
        numb = function lexer_script_number() {
          const f = b,
            build = [c[a]];
          let ee = 0,
            test = /zz/,
            dot = (build[0] === ".");
          if (a < b - 2 && c[a] === "0") {
            if (c[a + 1] === "x") {
              test = /[0-9a-fA-F]/;
            } else if (c[a + 1] === "o") {
              test = /[0-9]/;
            } else if (c[a + 1] === "b") {
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
              return build.join("");
            }
          }
          ee = a + 1;
          if (ee < f) {
            do {
              if ((/[0-9]/).test(c[ee]) || (c[ee] === "." && dot === false)) {
                build.push(c[ee]);
                if (c[ee] === ".") {
                  dot = true;
                }
              } else {
                break;
              }
              ee = ee + 1;
            } while (ee < f);
          }
          if (ee < f - 1 && ((/\d/).test(c[ee - 1]) === true || ((/\d/).test(c[ee - 2]) === true && (c[ee - 1] === "-" || c[ee - 1] === "+"))) && (c[ee] === "e" || c[ee] === "E")) {
            build.push(c[ee]);
            if (c[ee + 1] === "-" || c[ee + 1] === "+") {
              build.push(c[ee + 1]);
              ee = ee + 1;
            }
            dot = false;
            ee = ee + 1;
            if (ee < f) {
              do {
                if ((/[0-9]/).test(c[ee]) || (c[ee] === "." && dot === false)) {
                  build.push(c[ee]);
                  if (c[ee] === ".") {
                    dot = true;
                  }
                } else {
                  break;
                }
                ee = ee + 1;
              } while (ee < f);
            }
          }
          a = ee - 1;
          return build.join("");
        },
        // a unique tokenizer for operator characters
        operator = function lexer_script_operator() {
          let g = 0,
            h = 0,
            jj = b,
            output = "";
          const syntax = [
              "=",
              "<",
              ">",
              "+",
              "*",
              "?",
              "|",
              "^",
              ":",
              "&",
              "%",
              "~"
            ],
            synlen = syntax.length;
          if (wordTest > -1) {
            word();
          }
          if (c[a] === "/" && (parse.count > -1 && ((ltype !== "word" && ltype !== "reference") || ltoke === "typeof" || ltoke === "return" || ltoke === "else") && ltype !== "number" && ltype !== "string" && ltype !== "end")) {
            if (ltoke === "return" || ltoke === "typeof" || ltoke === "else" || ltype !== "word") {
              ltoke = regex();
              ltype = "regex";
            } else {
              ltoke = "/";
              ltype = "operator";
            }
            recordPush("");
            return "regex";
          }
          if (c[a] === "?" && ("+-\u002a/.?".indexOf(c[a + 1]) > -1 || (c[a + 1] === ":" && syntax.join("").indexOf(c[a + 2]) < 0))) {
            if (c[a + 1] === "." && (/\d/).test(c[a + 2]) === false) {
              output = "?.";
            } else if (c[a + 1] === "?") {
              output = "??";
            }
            if (output === "") {
              return "?";
            }
          }
          if (c[a] === ":" && "+-\u002a/".indexOf(c[a + 1]) > -1) {
            return ":";
          }
          if (a < b - 1) {
            if (c[a] !== "<" && c[a + 1] === "<") {
              return c[a];
            }
            if (c[a] === "!" && c[a + 1] === "/") {
              return "!";
            }
            if (c[a] === "-") {
              datatype[datatype.length - 1] = false;
              if (c[a + 1] === "-") {
                output = "--";
              } else if (c[a + 1] === "=") {
                output = "-=";
              } else if (c[a + 1] === ">") {
                output = "->";
              }
              if (output === "") {
                return "-";
              }
            }
            if (c[a] === "+") {
              datatype[datatype.length - 1] = false;
              if (c[a + 1] === "+") {
                output = "++";
              } else if (c[a + 1] === "=") {
                output = "+=";
              }
              if (output === "") {
                return "+";
              }
            }
            if (c[a] === "=" && c[a + 1] !== "=" && c[a + 1] !== "!" && c[a + 1] !== ">") {
              datatype[datatype.length - 1] = false;
              return "=";
            }
          }
          if (c[a] === ":") {
            if (options.language === "typescript" || options.language === "flow") {
              if (data.stack[parse.count] === "arguments") {
                if (data.token[parse.count] === "?") {
                  parse.pop(data);
                  output = "?:";
                  a = a - 1;
                }
                datatype[datatype.length - 1] = true;
              } else if (ltoke === ")" && (data.token[data.begin[parse.count] - 1] === "function" || data.token[data.begin[parse.count] - 2] === "function")) {
                datatype[datatype.length - 1] = true;
              } else if (ltype === "reference") {
                g = parse.count;
                let colon = false;
                do {
                  if (data.begin[g] === data.begin[parse.count]) {
                    if (g < parse.count && data.token[g] === ":" && data.types[g + 1] !== "type") {
                      colon = true;
                    }
                    if (data.token[g] === "?" && colon === false) {
                      break;
                    }
                    if (data.token[g] === ";" || data.token[g] === "x;") {
                      break;
                    }
                    if (data.token[g] === "var" || data.token[g] === "let" || data.token[g] === "const" || data.types[g] === "type") {
                      datatype[datatype.length - 1] = true;
                      break;
                    }
                  } else {
                    if (data.types[g] === "type_end") {
                      datatype[datatype.length - 1] = true;
                      break;
                    }
                    g = data.begin[g];
                  }
                  g = g - 1;
                } while (g > data.begin[parse.count]);
              }
            } else if ((data.types[parse.count] === "word" || data.types[parse.count] === "reference") && data.token[parse.count - 1] === "[") {
              parse.structure[parse.structure.length - 1][0] = "attribute";
              data.stack[parse.count] = "attribute";
            }
          }
          if (output === "") {
            if ((c[a + 1] === "+" && c[a + 2] === "+") || (c[a + 1] === "-" && c[a + 2] === "-")) {
              output = c[a];
            } else {
              const buildout = [c[a]];
              g = a + 1;
              if (g < jj) {
                do {
                  if ((c[g] === "+" && c[g + 1] === "+") || (c[g] === "-" && c[g + 1] === "-")) {
                    break;
                  }
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
                  if (h === synlen) {
                    break;
                  }
                  g = g + 1;
                } while (g < jj);
              }
              output = buildout.join("");
            }
          }
          a = a + (output.length - 1);
          if (output === "=>" && ltoke === ")") {
            g = parse.count;
            jj = data.begin[g];
            do {
              if (data.begin[g] === jj) {
                data.stack[g] = "method";
              }
              g = g - 1;
            } while (g > jj - 1);
          }
          return output;
        },
        // convert ++ and -- into "= x +"  and "= x -" in most cases
        plusplus = function lexer_script_plusplus() {
          let pre = true,
            toke = "+",
            tokea = "",
            tokeb = "",
            tokec = "",
            inc = 0,
            ind = 0,
            walk = 0,
            next = "";
          const store = [],
            end = function lexer_script_plusplus_end() {
              walk = data.begin[walk] - 1;
              if (data.types[walk] === "end") {
                lexer_script_plusplus_end();
              } else if (data.token[walk - 1] === ".") {
                period();
              }
            },
            period = function lexer_script_plusplus_period() {
              walk = walk - 2;
              if (data.types[walk] === "end") {
                end();
              } else if (data.token[walk - 1] === ".") {
                lexer_script_plusplus_period();
              }
            },
            applyStore = function lexer_script_plusplus_applyStore() {
              let x = 0;
              const y = store.length;
              if (x < y) {
                do {
                  parse.push(data, store[x], "");
                  x = x + 1;
                } while (x < y);
              }
            },
            recordStore = function lexer_script_plusplus_recordStore(index) {
              return {
                begin: data.begin[index],
                ender: data.ender[index],
                lexer: data.lexer[index],
                lines: data.lines[index],
                stack: data.stack[index],
                token: data.token[index],
                types: data.types[index]
              };
            };
          tokea = data.token[parse.count];
          tokeb = data.token[parse.count - 1];
          tokec = data.token[parse.count - 2];
          if (tokea !== "++" && tokea !== "--" && tokeb !== "++" && tokeb !== "--") {
            walk = parse.count;
            if (data.types[walk] === "end") {
              end();
            } else if (data.token[walk - 1] === ".") {
              period();
            }
          }
          if (data.token[walk - 1] === "++" || data.token[walk - 1] === "--") {
            if ("startendoperator".indexOf(data.types[walk - 2]) > -1) {
              return;
            }
            inc = walk;
            if (inc < parse.count + 1) {
              do {
                store.push(recordStore(inc));
                inc = inc + 1;
              } while (inc < parse.count + 1);
              parse.splice({
                data: data,
                howmany: parse.count - walk,
                index: walk
              });
            }
          } else {
            if (options.correct === false || (tokea !== "++" && tokea !== "--" && tokeb !== "++" && tokeb !== "--")) {
              return;
            }
            next = nextchar(1, false);
            if ((tokea === "++" || tokea === "--") && (c[a] === ";" || next === ";" || c[a] === "}" || next === "}" || c[a] === ")" || next === ")")) {
              toke = data.stack[parse.count];
              if (toke === "array" || toke === "method" || toke === "object" || toke === "paren" || toke === "notation" || (data.token[data.begin[parse.count] - 1] === "while" && toke !== "while")) {
                return;
              }
              inc = parse.count;
              do {
                inc = inc - 1;
                if (data.token[inc] === "return") {
                  return;
                }
                if (data.types[inc] === "end") {
                  do {
                    inc = data.begin[inc] - 1;
                  } while (data.types[inc] === "end" && inc > 0);
                }
              } while (inc > 0 && (data.token[inc] === "." || data.types[inc] === "word" || data.types[inc] === "reference" || data.types[inc] === "end"));
              if (data.token[inc] === "," && c[a] !== ";" && next !== ";" && c[a] !== "}" && next !== "}" && c[a] !== ")" && next !== ")") {
                return;
              }
              if (data.types[inc] === "operator") {
                if (data.stack[inc] === "switch" && data.token[inc] === ":") {
                  do {
                    inc = inc - 1;
                    if (data.types[inc] === "start") {
                      ind = ind - 1;
                      if (ind < 0) {
                        break;
                      }
                    } else if (data.types[inc] === "end") {
                      ind = ind + 1;
                    }
                    if (data.token[inc] === "?" && ind === 0) {
                      return;
                    }
                  } while (inc > 0);
                } else {
                  return;
                }
              }
              pre = false;
              if (tokea === "--") {
                toke = "-";
              } else {
                toke = "+";
              }
            } else if (tokec === "[" || tokec === ";" || tokec === "x;" || tokec === "}" || tokec === "{" || tokec === "(" || tokec === ")" || tokec === "," || tokec === "return") {
              if (tokea === "++" || tokea === "--") {
                if (tokec === "[" || tokec === "(" || tokec === "," || tokec === "return") {
                  return;
                }
                if (tokea === "--") {
                  toke = "-";
                }
                pre = false;
              } else if (tokeb === "--" || tokea === "--") {
                toke = "-";
              }
            } else {
              return;
            }
            if (pre === false) {
              tempstore = parse.pop(data);
            }
            walk = parse.count;
            if (data.types[walk] === "end") {
              end();
            } else if (data.token[walk - 1] === ".") {
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
              data: data,
              howmany: 1,
              index: walk - 1
            });
            ltoke = "=";
            ltype = "operator";
            recordPush("");
            applyStore();
            ltoke = toke;
            ltype = "operator";
            recordPush("");
            ltoke = "1";
            ltype = "number";
            recordPush("");
          } else {
            ltoke = "=";
            ltype = "operator";
            recordPush("");
            applyStore();
            ltoke = toke;
            ltype = "operator";
            recordPush("");
            ltoke = "1";
            ltype = "number";
            recordPush("");
          }
          ltoke = data.token[parse.count];
          ltype = data.types[parse.count];
          if (next === "}" && c[a] !== ";") {
            asi(false);
          }
        },
        // determine the definition of containment by stack
        recordPush = function lexer_script_recordPush(structure) {
          const record = {
            begin: parse.structure[parse.structure.length - 1][1],
            ender: -1,
            lexer: "script",
            lines: parse.linesSpace,
            stack: parse.structure[parse.structure.length - 1][0],
            token: ltoke,
            types: ltype
          };
          parse.push(data, record, structure);
        },
        // a tokenizer for regular expressions
        regex = function lexer_script_regex() {
          let ee = a + 1,
            h = 0,
            i = 0,
            output = "",
            square = false;
          const f = b,
            build = ["/"];
          if (ee < f) {
            do {
              build.push(c[ee]);
              if (c[ee - 1] !== "\\" || c[ee - 2] === "\\") {
                if (c[ee] === "[") {
                  square = true;
                }
                if (c[ee] === "]") {
                  square = false;
                }
              }
              if (c[ee] === "/" && square === false) {
                if (c[ee - 1] === "\\") {
                  i = 0;
                  h = ee - 1;
                  if (h > 0) {
                    do {
                      if (c[h] === "\\") {
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
          if (c[ee + 1] === "g" || c[ee + 1] === "i" || c[ee + 1] === "m" || c[ee + 1] === "y" || c[ee + 1] === "u") {
            build.push(c[ee + 1]);
            if (c[ee + 2] !== c[ee + 1] && (c[ee + 2] === "g" || c[ee + 2] === "i" || c[ee + 2] === "m" || c[ee + 2] === "y" || c[ee + 2] === "u")) {
              build.push(c[ee + 2]);
              if (c[ee + 3] !== c[ee + 1] && c[ee + 3] !== c[ee + 2] && (c[ee + 3] === "g" || c[ee + 3] === "i" || c[ee + 3] === "m" || c[ee + 3] === "y" || c[ee + 3] === "u")) {
                build.push(c[ee + 3]);
                if (c[ee + 4] !== c[ee + 1] && c[ee + 4] !== c[ee + 2] && c[ee + 4] !== c[ee + 3] && (c[ee + 4] === "g" || c[ee + 4] === "i" || c[ee + 4] === "m" || c[ee + 4] === "y" || c[ee + 4] === "u")) {
                  build.push(c[ee + 4]);
                  if (c[ee + 5] !== c[ee + 1] && c[ee + 5] !== c[ee + 2] && c[ee + 5] !== c[ee + 3] && c[ee + 5] !== c[ee + 4] && (c[ee + 5] === "g" || c[ee + 5] === "i" || c[ee + 5] === "m" || c[ee + 5] === "y" || c[ee + 5] === "u")) {
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
          output = build.join("");
          return output;
        },
        // determines if a slash comprises a valid escape or if it is escaped itself
        slashes = function lexer_script_slashes(index) {
          const slashy = index;
          do {
            index = index - 1;
          } while (c[index] === "\\" && index > 0);
          if ((slashy - index) % 2 === 1) {
            return true;
          }
          return false;
        },
        // operations for start types: (, [, {
        start = function lexer_script_start(x) {
          let aa = parse.count,
            wordx = "",
            wordy = "",
            stack = "",
            func = false;
          brace.push(x);
          if (x === "{" && (data.types[parse.count] === "type" || data.types[parse.count] === "type_end" || data.types[parse.count] === "generic")) {
            // this block determines if a function body follows a type annotation
            let begin = 0;
            if (data.types[parse.count] === "type_end") {
              aa = data.begin[parse.count];
            }
            begin = aa;
            do {
              aa = aa - 1;
              if (data.begin[aa] !== begin && data.begin[aa] !== -1) {
                break;
              }
              if (data.token[aa] === ":") {
                break;
              }
            } while (aa > data.begin[aa]);
            if (data.token[aa] === ":" && data.stack[aa - 1] === "arguments") {
              datatype.push(false);
              func = true;
            } else {
              datatype.push(datatype[datatype.length - 1]);
            }
            aa = parse.count;
          } else if (x === "[" && data.types[parse.count] === "type_end") {
            datatype.push(true);
          } else {
            datatype.push(datatype[datatype.length - 1]);
          }
          if (wordTest > -1) {
            word();
            aa = parse.count;
          }
          if (vart.len > -1) {
            vart.count[vart.len] = vart.count[vart.len] + 1;
          }
          if (data.token[aa - 1] === "function") {
            lword.push([
              "function", aa + 1
            ]);
          } else {
            lword.push([
              ltoke, aa + 1
            ]);
          }
          ltoke = x;
          if (datatype[datatype.length - 1] === true) {
            ltype = "type_start";
          } else {
            ltype = "start";
          }
          if (x === "(" || x === "x(") {
            asifix();
          } else if (x === "{") {
            if (paren > -1) {
              if (data.begin[paren - 1] === data.begin[data.begin[aa] - 1] || data.token[data.begin[aa]] === "x(") {
                paren = -1;
                if (options.correct === true) {
                  end(")");
                } else {
                  end("x)");
                }
                asifix();
                ltoke = "{";
                ltype = "start";
              }
            } else if (ltoke === ")") {
              asifix();
            }
            if (ltype === "comment" && data.token[aa - 1] === ")") {
              ltoke = data.token[aa];
              data.token[aa] = "{";
              ltype = data.types[aa];
              data.types[aa] = "start";
            }
          }
          wordx = (function lexer_script_start_wordx() {
            let bb = parse.count;
            if (data.types[bb] === "comment") {
              do {
                bb = bb - 1;
              } while (bb > 0 && data.types[bb] === "comment");
            }
            return data.token[bb];
          }());
          wordy = (data.stack[aa] === undefined) ?
            "" :
            (function lexer_script_start_wordy() {
              let bb = parse.count;
              if (data.types[bb] === "comment") {
                do {
                  bb = bb - 1;
                } while (bb > 0 && data.types[bb] === "comment");
              }
              return data.token[data.begin[bb] - 1];
            }());
          if (ltoke === "{" && (data.types[aa] === "word" || data.token[aa] === "]")) {
            let bb = aa;
            if (data.token[bb] === "]") {
              do {
                bb = data.begin[bb] - 1;
              } while (data.token[bb] === "]");
            }
            do {
              if (data.types[bb] === "start" || data.types[bb] === "end" || data.types[bb] === "operator") {
                break;
              }
              bb = bb - 1;
            } while (bb > 0);
            if (data.token[bb] === ":" && data.stack[bb - 1] === "arguments") {
              stack = "function";
              references.push(funreferences);
              funreferences = [];
            }
          }
          if (ltype === "type_start") {
            stack = "data_type";
          } else if (stack === "" && (ltoke === "{" || ltoke === "x{")) {
            if (wordx === "else" || wordx === "do" || wordx === "try" || wordx === "finally" || wordx === "switch") {
              stack = wordx;
            } else if (classy[classy.length - 1] === 0 && wordx !== "return") {
              classy.pop();
              stack = "class";
            } else if (data.token[aa - 1] === "class") {
              stack = "class";
            } else if (data.token[aa] === "]" && data.token[aa - 1] === "[") {
              stack = "array";
            } else if ((data.types[aa] === "word" || data.types[aa] === "reference") &&
              (data.types[aa - 1] === "word" ||
                data.types[aa - 1] === "reference" ||
                (data.token[aa - 1] === "?" && (data.types[aa - 2] === "word" || data.types[aa - 2] === "reference"))) &&
              data.token[aa] !== "in" &&
              data.token[aa - 1] !== "export" &&
              data.token[aa - 1] !== "import") {
              stack = "map";
            } else if (data.stack[aa] === "method" &&
              data.types[aa] === "end" &&
              (data.types[data.begin[aa] - 1] === "word" || data.types[data.begin[aa] - 1] === "reference") &&
              data.token[data.begin[aa] - 2] === "new") {
              stack = "initializer";
            } else if (ltoke === "{" &&
              (wordx === ")" || wordx === "x)") &&
              (data.types[data.begin[aa] - 1] === "word" || data.types[data.begin[aa] - 1] === "reference" || data.token[data.begin[aa] - 1] === "]")) {
              if (wordy === "if") {
                stack = "if";
              } else if (wordy === "for") {
                stack = "for";
              } else if (wordy === "while") {
                stack = "while";
              } else if (wordy === "class") {
                stack = "class";
              } else if (wordy === "switch" || data.token[data.begin[aa] - 1] === "switch") {
                stack = "switch";
              } else if (wordy === "catch") {
                stack = "catch";
              } else {
                stack = "function";
              }
            } else if (ltoke === "{" && (wordx === ";" || wordx === "x;")) {
              // ES6 block
              stack = "block";
            } else if (ltoke === "{" && data.token[aa] === ":" && data.stack[aa] === "switch") {
              // ES6 block
              stack = "block";
            } else if (data.token[aa - 1] === "import" || data.token[aa - 2] === "import" || data.token[aa - 1] === "export" || data.token[aa - 2] === "export") {
              stack = "object";
            } else if (wordx === ")" && (pword[0] === "function" || pword[0] === "if" || pword[0] === "for" || pword[0] === "class" || pword[0] === "while" || pword[0] === "switch" || pword[0] === "catch")) {
              // if preceeded by a paren the prior containment is preceeded by a keyword if
              // (...) {
              stack = pword[0];
            } else if (data.stack[aa] === "notation") {
              // if following a TSX array type declaration
              stack = "function";
            } else if ((data.types[aa] === "number" ||
                data.types[aa] === "string" ||
                data.types[aa] === "word" ||
                data.types[aa] === "reference") &&
              (data.types[aa - 1] === "word" || data.types[aa - 1] === "reference") &&
              data.token[data.begin[aa] - 1] !== "for") {
              // if preceed by a word and either string or word public class {
              stack = "function";
            } else if (parse.structure.length > 0 && data.token[aa] !== ":" && parse.structure[parse.structure.length - 1][0] === "object" && (data.token[data.begin[aa] - 2] === "{" || data.token[data.begin[aa] - 2] === ",")) {
              // if an object wrapped in some containment which is itself preceeded by a curly
              // brace or comma var a={({b:{cat:"meow"}})};
              stack = "function";
            } else if (data.types[pword[1] - 1] === "markup" && data.token[pword[1] - 3] === "function") {
              // checking for TSX function using an angle brace name
              stack = "function";
            } else if (wordx === "=>") {
              // checking for fat arrow assignment
              stack = "function";
            } else if (func === true || (data.types[parse.count] === "type_end" && data.stack[data.begin[parse.count] - 2] === "arguments")) {
              // working around typescript inline interface
              stack = "function";
            } else if (wordx === ")" &&
              data.stack[aa] === "method" &&
              (data.types[data.begin[aa] - 1] === "word" || data.types[data.begin[aa] - 1] === "property" || data.types[data.begin[aa] - 1] === "reference")) {
              stack = "function";
            } else if (data.types[aa] === "word" && ltoke === "{" && data.token[aa] !== "return" && data.token[aa] !== "in" && data.token[aa] !== "import" && data.token[aa] !== "const" && data.token[aa] !== "let" && data.token[aa] !== "") {
              // ES6 block
              stack = "block";
            } else if (ltoke === "{" && (data.token[aa] === "x}" || data.token[aa] === "}") && "if|else|for|while|function|class|switch|catch|finally".indexOf(data.stack[aa]) > -1) {
              // ES6 block
              stack = "block";
            } else if (data.stack[aa] === "arguments") {
              stack = "function";
            } else if (data.types[aa] === "generic") {
              do {
                aa = aa - 1;
                if (data.token[aa] === "function" || data.stack[aa] === "arguments") {
                  stack = "function";
                  break;
                }
                if (data.token[aa] === "interface") {
                  stack = "map";
                  break;
                }
                if (data.token[aa] === ";") {
                  stack = "object";
                  break;
                }
              } while (aa > data.begin[parse.count]);
            } else if ((options.language === "java" || options.language === "csharp") && data.types[parse.count - 1] === "reference" && data.token[parse.count - 2] === "]") {
              stack = "array";
            } else {
              stack = "object";
            }
            if (stack !== "object" && stack !== "class") {
              if (stack === "function") {
                references.push(funreferences);
                funreferences = [];
              } else {
                references.push([]);
              }
            }
          } else if (ltoke === "[") {
            if ((/\s/).test(c[a - 1]) === true && (data.types[aa] === "word" || data.types[aa] === "reference") && wordx !== "return" && options.language !== "twig") {
              stack = "notation";
            } else {
              stack = "array";
            }
          } else if (ltoke === "(" || ltoke === "x(") {
            if (wordx === "function" || data.token[aa - 1] === "function" || data.token[aa - 1] === "function*" || data.token[aa - 2] === "function") {
              stack = "arguments";
            } else if (data.token[aa - 1] === "." || data.token[data.begin[aa] - 2] === ".") {
              stack = "method";
            } else if (data.types[aa] === "generic") {
              stack = "method";
            } else if (data.token[aa] === "}" && data.stack[aa] === "function") {
              stack = "method";
            } else if (wordx === "if" || wordx === "for" || wordx === "class" || wordx === "while" || wordx === "catch" || wordx === "finally" || wordx === "switch" || wordx === "with") {
              stack = "expression";
            } else if (data.types[aa] === "word" || data.types[aa] === "property" || data.types[aa] === "reference") {
              stack = "method";
            } else {
              stack = "paren";
            }
          }
          recordPush(stack);
          if (classy.length > 0) {
            classy[classy.length - 1] = classy[classy.length - 1] + 1;
          }
        },
        // ES6 template string support
        tempstring = function lexer_script_tempstring() {
          const output = [c[a]];
          a = a + 1;
          if (a < b) {
            do {
              output.push(c[a]);
              if (c[a] === "`" && (c[a - 1] !== "\\" || slashes(a - 1) === false)) {
                break;
              }
              if (c[a - 1] === "$" && c[a] === "{" && (c[a - 2] !== "\\" || slashes(a - 2) === false)) {
                break;
              }
              a = a + 1;
            } while (a < b);
          }
          return output.join("");
        },
        // determines tag names for {% %} based template tags and returns a type
        tname = function lexer_script_tname(x) {
          let sn = 2,
            en = 0,
            name = "";
          const st = x.slice(0, 2),
            len = x.length,
            namelist = [
              "autoescape",
              "block",
              "capture",
              "case",
              "comment",
              "embed",
              "filter",
              "for",
              "form",
              "if",
              "macro",
              "paginate",
              "raw",
              "sandbox",
              "spaceless",
              "tablerow",
              "unless",
              "verbatim"
            ];
          if (x.charAt(2) === "-") {
            sn = sn + 1;
          }
          if ((/\s/).test(x.charAt(sn)) === true) {
            do {
              sn = sn + 1;
            } while ((/\s/).test(x.charAt(sn)) === true && sn < len);
          }
          en = sn;
          do {
            en = en + 1;
          } while ((/\s/).test(x.charAt(en)) === false && x.charAt(en) !== "(" && en < len);
          if (en === len) {
            en = x.length - 2;
          }
          name = x.slice(sn, en);
          if (name === "else" || (st === "{%" && (name === "elseif" || name === "when" || name === "elif"))) {
            return ["template_else", `template_${name}`];
          }
          if (st === "{{") {
            if (name === "end") {
              return ["template_end", ""];
            }
            if ((name === "block" && (/\{%\s*\w/).test(source) === false) || name === "define" || name === "form" || name === "if" || name === "range" || name === "with") {
              return ["template_start", `template_${name}`];
            }
            return ["template", ""];
          }
          en = namelist.length - 1;
          if (en > -1) {
            do {
              if (name === namelist[en] && (name !== "block" || (/\{%\s*\w/).test(source) === false)) {
                return ["template_start", `template_${name}`];
              }
              if (name === "end" + namelist[en]) {
                return ["template_end", ""];
              }
              en = en - 1;
            } while (en > -1);
          }
          return ["template", ""];
        },
        // remove "vart" object data
        vartpop = function lexer_script_vartpop() {
          vart
            .count
            .pop();
          vart
            .index
            .pop();
          vart
            .word
            .pop();
          vart.len = vart.len - 1;
        },
        // A lexer for keywords, reserved words, and variables
        word = function lexer_script_word() {
          let f = wordTest,
            g = 1,
            output = "",
            nextitem = "",
            tokel = ltoke,
            typel = ltype;
          const lex = [],
            elsefix = function lexer_script_word_elsefix() {
              brace.push("x{");
              parse.splice({
                data: data,
                howmany: 1,
                index: parse.count - 3
              });
            },
            hoisting = function lexer_script_word_hoisting(index, ref, samescope) {
              const begin = data.begin[index];
              let parent = 0;
              do {
                if (data.token[index] === ref && data.types[index] === "word") {
                  if (samescope === true) {
                    // the simple state is for hoisted references, var and function declarations
                    data.types[index] = "reference";
                  } else if (data.begin[index] > begin && data.token[data.begin[index]] === "{" && data.stack[index] !== "object" && data.stack[index] !== "class" && data.stack[index] !== "data_type") {
                    // the complex state is for non-hoisted references living in prior functions of the same parent scope
                    if (data.stack[index] === "function") {
                      data.types[index] = "reference";
                    } else {
                      // this looping is necessary to determine if there is a function between the reference and the declared scope
                      parent = data.begin[index];
                      do {
                        if (data.stack[parent] === "function") {
                          data.types[index] = "reference";
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
            if (c[f] === "\\") {
              sparser.parseerror = `Illegal escape in JavaScript on line number ${parse.lineNumber}`;
            }
            f = f + 1;
          } while (f < a);
          if (ltoke.charAt(0) === "\u201c") {
            sparser.parseerror = `Quote looking character (\u201c, \\u201c) used instead of actual quotes on line number ${parse.lineNumber}`;
          } else if (ltoke.charAt(0) === "\u201d") {
            sparser.parseerror = `Quote looking character (\u201d, \\u201d) used instead of actual quotes on line number ${parse.lineNumber}`;
          }
          output = lex.join("");
          wordTest = -1;
          if (parse.count > 0 && output === "function" && data.token[parse.count] === "(" && (data.token[parse.count - 1] === "{" || data.token[parse.count - 1] === "x{")) {
            data.types[parse.count] = "start";
          }
          if (parse.count > 1 && output === "function" && ltoke === "(" && (data.token[parse.count - 1] === "}" || data.token[parse.count - 1] === "x}")) {
            if (data.token[parse.count - 1] === "}") {
              f = parse.count - 2;
              if (f > -1) {
                do {
                  if (data.types[f] === "end") {
                    g = g + 1;
                  } else if (data.types[f] === "start" || data.types[f] === "end") {
                    g = g - 1;
                  }
                  if (g === 0) {
                    break;
                  }
                  f = f - 1;
                } while (f > -1);
              }
              if (data.token[f] === "{" && data.token[f - 1] === ")") {
                g = 1;
                f = f - 2;
                if (f > -1) {
                  do {
                    if (data.types[f] === "end") {
                      g = g + 1;
                    } else if (data.types[f] === "start" || data.types[f] === "end") {
                      g = g - 1;
                    }
                    if (g === 0) {
                      break;
                    }
                    f = f - 1;
                  } while (f > -1);
                }
                if (data.token[f - 1] !== "function" && data.token[f - 2] !== "function") {
                  data.types[parse.count] = "start";
                }
              }
            } else {
              data.types[parse.count] = "start";
            }
          }
          if (options.correct === true && (output === "Object" || output === "Array") && c[a + 1] === "(" && c[a + 2] === ")" && data.token[parse.count - 1] === "=" && data.token[parse.count] === "new") {
            if (output === "Object") {
              data.token[parse.count] = "{";
              ltoke = "}";
              data.stack[parse.count] = "object";
              parse.structure[parse.structure.length - 1][0] = "object";
            } else {
              data.token[parse.count] = "[";
              ltoke = "]";
              data.stack[parse.count] = "array";
              parse.structure[parse.structure.length - 1][0] = "array";
            }
            data.types[parse.count] = "start";
            ltype = "end";
            c[a + 1] = "";
            c[a + 2] = "";
            a = a + 2;
          } else {
            g = parse.count;
            f = g;
            if (options.lexer_options.script.variable_list !== "none" && (output === "var" || output === "let" || output === "const")) {
              if (data.types[g] === "comment") {
                do {
                  g = g - 1;
                } while (g > 0 && (data.types[g] === "comment"));
              }
              if (options.lexer_options.script.variable_list === "list" && vart.len > -1 && vart.index[vart.len] === g && output === vart.word[vart.len]) {
                ltoke = ",";
                ltype = "separator";
                data.token[g] = ltoke;
                data.types[g] = ltype;
                vart.count[vart.len] = 0;
                vart.index[vart.len] = g;
                vart.word[vart.len] = output;
                return;
              }
              vart.len = vart.len + 1;
              vart
                .count
                .push(0);
              vart
                .index
                .push(g);
              vart
                .word
                .push(output);
              g = f;
            } else if (vart.len > -1 && output !== vart.word[vart.len] && parse.count === vart.index[vart.len] && data.token[vart.index[vart.len]] === ";" && ltoke !== vart.word[vart.len] && options.lexer_options.script.variable_list === "list") {
              vartpop();
            }
            if (output === "from" && data.token[parse.count] === "x;" && data.token[parse.count - 1] === "}") {
              asifix();
            }
            if (output === "while" && data.token[parse.count] === "x;" && data.token[parse.count - 1] === "}") {
              let d = 0,
                e = parse.count - 2;
              if (e > -1) {
                do {
                  if (data.types[e] === "end") {
                    d = d + 1;
                  } else if (data.types[e] === "start") {
                    d = d - 1;
                  }
                  if (d < 0) {
                    if (data.token[e] === "{" && data.token[e - 1] === "do") {
                      asifix();
                    }
                    return;
                  }
                  e = e - 1;
                } while (e > -1);
              }
            }
            if (typel === "comment") {
              let d = parse.count;
              do {
                d = d - 1;
              } while (d > 0 && data.types[d] === "comment");
              typel = data.types[d];
              tokel = data.token[d];
            }
            nextitem = nextchar(2, false);
            if (output === "void") {
              if (tokel === ":" && data.stack[parse.count - 1] === "arguments") {
                ltype = "type";
              } else {
                ltype = "word";
              }
            } else if ((options.language === "java" || options.language === "csharp") && output === "static") {
              ltype = "word";
            } else if ((parse.structure[parse.structure.length - 1][0] === "object" ||
                parse.structure[parse.structure.length - 1][0] === "class" ||
                parse.structure[parse.structure.length - 1][0] === "data_type") && (data.token[parse.count] === "{" ||
                (data.token[data.begin[parse.count]] === "{" && data.token[parse.count] === ",") ||
                (data.types[parse.count] === "template_end" && (data.token[data.begin[parse.count] - 1] === "{" || data.token[data.begin[parse.count] - 1] === ",")))) {
              if (output === "return" || output === "break") {
                ltype = "word";
              } else {
                ltype = "property";
              }
            } else if (datatype[datatype.length - 1] === true || ((options.language === "typescript" || options.language === "flow") && tokel === "type")) {
              ltype = "type";
            } else if ((options.language === "java" || options.language === "csharp") && (tokel === "public" || tokel === "private" || tokel === "static" || tokel === "final")) {
              ltype = "reference";
            } else if ((options.language === "java" || options.language === "csharp") && ltoke !== "var" && (ltype === "end" || ltype === "word") && nextitem.charAt(0) === "=" && nextitem.charAt(1) !== "=") {
              ltype = "reference";
            } else if (references.length > 0 && (tokel === "function" || tokel === "class" || tokel === "const" || tokel === "let" || tokel === "var" || tokel === "new" || tokel === "void")) {
              ltype = "reference";
              references[references.length - 1].push(output);
              if (options.language === "javascript" || options.language === "jsx" || options.language === "typescript" || options.language === "flow") {
                if (tokel === "var" || (tokel === "function" && data.types[parse.count - 1] !== "operator" && data.types[parse.count - 1] !== "start" && data.types[parse.count - 1] !== "end")) {
                  hoisting(parse.count, output, true);
                } else {
                  hoisting(parse.count, output, false);
                }
              } else {
                hoisting(parse.count, output, false);
              }
            } else if (parse.structure[parse.structure.length - 1][0] === "arguments" && ltype !== "operator") {
              ltype = "reference";
              funreferences.push(output);
            } else if (tokel === "," && data.stack[parse.count] !== "method" && (data.stack[parse.count] !== "expression" || data.token[data.begin[parse.count] - 1] === "for")) {
              let d = parse.count;
              const e = parse.structure[parse.structure.length - 1][1];
              do {
                if (data.begin[d] === e) {
                  if (data.token[d] === ";") {
                    break;
                  }
                  if (data.token[d] === "var" || data.token[d] === "let" || data.token[d] === "const" || data.token[d] === "type") {
                    break;
                  }
                } else if (data.types[d] === "end") {
                  d = data.begin[d];
                }
                d = d - 1;
              } while (d > e);
              if (references.length > 0 && data.token[d] === "var") {
                ltype = "reference";
                references[references.length - 1].push(output);
                if (options.language === "javascript" || options.language === "jsx" || options.language === "typescript" || options.language === "flow") {
                  hoisting(d, output, true);
                } else {
                  hoisting(d, output, false);
                }
              } else if (references.length > 0 && (data.token[d] === "let" || data.token[d] === "const" || (data.token[d] === "type" && (options.language === "typescript" || options.language === "flow")))) {
                ltype = "reference";
                references[references.length - 1].push(output);
                hoisting(d, output, false);
              } else {
                ltype = "word";
              }
            } else if (parse.structure[parse.structure.length - 1][0] !== "object" || (parse.structure[parse.structure.length - 1][0] === "object" && ltoke !== "," && ltoke !== "{")) {
              let d = references.length,
                e = 0;
              if (d > 0) {
                do {
                  d = d - 1;
                  e = references[d].length;
                  if (e > 0) {
                    do {
                      e = e - 1;
                      if (output === references[d][e]) {
                        break;
                      }
                    } while (e > 0);
                    if (output === references[d][e]) {
                      break;
                    }
                  }
                } while (d > 0);
                if (references[d][e] === output && tokel !== ".") {
                  ltype = "reference";
                } else {
                  ltype = "word";
                }
              } else {
                ltype = "word";
              }
            } else {
              ltype = "word";
            }
            ltoke = output;
            if (output === "from" && data.token[parse.count] === "}") {
              asifix();
            }
          }
          recordPush("");
          if (output === "class") {
            classy.push(0);
          }
          if (output === "do") {
            nextitem = nextchar(1, true);
            if (nextitem !== "{") {
              ltoke = (options.correct === true) ?
                "{" :
                "x{";
              ltype = "start";
              brace.push("x{");
              recordPush("do");
            }
          }
          if (output === "else") {
            nextitem = nextchar(2, true);
            let x = parse.count - 1;
            if (data.types[x] === "comment") {
              do {
                x = x - 1;
              } while (x > 0 && data.types[x] === "comment");
            }
            if (data.token[x] === "x}") {
              if (data.token[parse.count] === "else") {
                if (data.stack[parse.count - 1] !== "if" && data.types[parse.count - 1] !== "comment" && data.stack[parse.count - 1] !== "else") {
                  brace.pop();
                  parse.splice({
                    data: data,
                    howmany: 0,
                    index: parse.count - 1,
                    record: {
                      begin: data.begin[data.begin[data.begin[parse.count - 1] - 1] - 1],
                      ender: -1,
                      lexer: "script",
                      lines: 0,
                      stack: "if",
                      token: (options.correct === true) ?
                        "}" :
                        "x}",
                      types: "end"
                    }
                  });
                  if (parse.structure.length > 1) {
                    parse.structure.splice(parse.structure.length - 2, 1);
                    parse.structure[parse.structure.length - 1][1] = parse.count;
                  }
                } else if (data.token[parse.count - 2] === "x}" && pstack[0] !== "if" && data.stack[parse.count] === "else") {
                  elsefix();
                } else if (data.token[parse.count - 2] === "}" && data.stack[parse.count - 2] === "if" && pstack[0] === "if" && data.token[pstack[1] - 1] !== "if" && data.token[data.begin[parse.count - 1]] === "x{") {
                  // fixes when "else" is following a block that isn't "if"
                  elsefix();
                }
              } else if (data.token[parse.count] === "x}" && data.stack[parse.count] === "if") {
                elsefix();
              }
            }
            if (nextitem !== "if" && nextitem.charAt(0) !== "{") {
              ltoke = (options.correct === true) ?
                "{" :
                "x{";
              ltype = "start";
              brace.push("x{");
              recordPush("else");
            }
          }
          if ((output === "for" || output === "if" || output === "switch" || output === "catch") && options.language !== "twig" && data.token[parse.count - 1] !== ".") {
            nextitem = nextchar(1, true);
            if (nextitem !== "(") {
              paren = parse.count;
              if (options.correct === true) {
                start("(");
              } else {
                start("x(");
              }
            }
          }
        };
      do {
        if ((/\s/).test(c[a]) === true) {
          if (wordTest > -1) {
            word();
          }
          a = parse.spacer({
            array: c,
            end: b,
            index: a
          });
          if (parse.linesSpace > 1 && ltoke !== ";" && lengthb < parse.count && c[a + 1] !== "}") {
            asi(false);
            lengthb = parse.count;
          }
        } else if (c[a] === "<" && c[a + 1] === "?" && c[a + 2] === "p" && c[a + 3] === "h" && c[a + 4] === "p") {
          // php
          general("<?php", "?>", "template");
        } else if (c[a] === "<" && c[a + 1] === "?" && c[a + 2] === "=") {
          // php
          general("<?=", "?>", "template");
        } else if (c[a] === "<" && c[a + 1] === "%") {
          // asp
          general("<%", "%>", "template");
        } else if (c[a] === "{" && c[a + 1] === "%") {
          // twig
          general("{%", "%}", "template");
        } else if (c[a] === "{" && c[a + 1] === "{" && c[a + 2] === "{") {
          // mustache
          general("{{{", "}}}", "template");
        } else if (c[a] === "{" && c[a + 1] === "{") {
          // handlebars
          general("{{", "}}", "template");
        } else if (c[a] === "<" && c[a + 1] === "!" && c[a + 2] === "-" && c[a + 3] === "-" && c[a + 4] === "#") {
          // ssi
          general("<!--#", "-->", "template");
        } else if (c[a] === "<" && c[a + 1] === "!" && c[a + 2] === "-" && c[a + 3] === "-") {
          // markup comment
          general("<!--", "-->", "comment");
        } else if (c[a] === "<") {
          // markup
          markup();
        } else if (c[a] === "/" && (a === b - 1 || c[a + 1] === "*")) {
          // comment block
          blockComment();
        } else if ((parse.count < 0 || data.lines[parse.count] > 0) && c[a] === "#" && c[a + 1] === "!" && (c[a + 2] === "/" || c[a + 2] === "[")) {
          // shebang
          general("#!" + c[a + 2], "\n", "string");
        } else if (c[a] === "/" && (a === b - 1 || c[a + 1] === "/")) {
          // comment line
          lineComment();
        } else if (c[a] === "#" && c[a + 1] === "r" && c[a + 2] === "e" && c[a + 3] === "g" && c[a + 4] === "i" && c[a + 5] === "o" && c[a + 6] === "n" && (/\s/).test(c[a + 7]) === true) {
          // comment line
          asi(false);
          general("#region", "\n", "comment");
        } else if (c[a] === "#" && c[a + 1] === "e" && c[a + 2] === "n" && c[a + 3] === "d" && c[a + 4] === "r" && c[a + 5] === "e" && c[a + 6] === "g" && c[a + 7] === "i" && c[a + 8] === "o" && c[a + 9] === "n") {
          // comment line
          asi(false);
          general("#endregion", "\n", "comment");
        } else if (c[a] === "`" || (c[a] === "}" && parse.structure[parse.structure.length - 1][0] === "template_string")) {
          // template string
          if (wordTest > -1) {
            word();
          }
          ltoke = tempstring();
          if (ltoke.charAt(0) === "}" && ltoke.slice(ltoke.length - 2) === "${") {
            ltype = "template_string_else";
            recordPush("template_string");
          } else if (ltoke.slice(ltoke.length - 2) === "${") {
            ltype = "template_string_start";
            recordPush("template_string");
          } else if (ltoke.charAt(0) === "}") {
            ltype = "template_string_end";
            recordPush("");
          } else {
            ltype = "string";
            recordPush("");
          }
        } else if (c[a] === "\"" || c[a] === "'") {
          // string
          general(c[a], c[a], "string");
        } else if (c[a] === "-" &&
          (a < b - 1 && c[a + 1] !== "=" && c[a + 1] !== "-") &&
          (ltype === "number" || ltype === "word" || ltype === "reference") &&
          ltoke !== "return" &&
          (ltoke === ")" || ltoke === "]" || ltype === "word" || ltype === "reference" || ltype === "number")) {
          // subtraction
          if (wordTest > -1) {
            word();
          }
          ltoke = "-";
          ltype = "operator";
          recordPush("");
        } else if (wordTest === -1 && (c[a] !== "0" || (c[a] === "0" && c[a + 1] !== "b")) && ((/\d/).test(c[a]) || (a !== b - 2 && c[a] === "-" && c[a + 1] === "." && (/\d/).test(c[a + 2])) || (a !== b - 1 && (c[a] === "-" || c[a] === ".") && (/\d/).test(c[a + 1])))) {
          // number
          if (wordTest > -1) {
            word();
          }
          if (ltype === "end" && c[a] === "-") {
            ltoke = "-";
            ltype = "operator";
          } else {
            ltoke = numb();
            ltype = "number";
          }
          recordPush("");
        } else if (c[a] === ":" && c[a + 1] === ":") {
          if (wordTest > -1) {
            word();
          }
          if (options.correct === true) {
            plusplus();
          }
          asifix();
          a = a + 1;
          ltoke = "::";
          ltype = "separator";
          recordPush("");
        } else if (c[a] === ",") {
          // comma
          if (wordTest > -1) {
            word();
          }
          if (options.correct === true) {
            plusplus();
          }
          if (datatype[datatype.length - 1] === true && data.stack[parse.count].indexOf("type") < 0) {
            datatype[datatype.length - 1] = false;
          }
          if (ltype === "comment") {
            commaComment();
          } else if (vart.len > -1 && vart.count[vart.len] === 0 && options.lexer_options.script.variable_list === "each") {
            asifix();
            ltoke = ";";
            ltype = "separator";
            recordPush("");
            ltoke = vart.word[vart.len];
            ltype = "word";
            recordPush("");
            vart.index[vart.len] = parse.count;
          } else {
            ltoke = ",";
            ltype = "separator";
            asifix();
            recordPush("");
          }
        } else if (c[a] === ".") {
          // period
          if (wordTest > -1) {
            word();
          }
          datatype[datatype.length - 1] = false;
          if (c[a + 1] === "." && c[a + 2] === ".") {
            ltoke = "...";
            ltype = "operator";
            a = a + 2;
          } else {
            asifix();
            ltoke = ".";
            ltype = "separator";
          }
          if ((/\s/).test(c[a - 1]) === true) {
            parse.linesSpace = 1;
          }
          recordPush("");
        } else if (c[a] === ";") {
          // semicolon
          if (wordTest > -1) {
            word();
          }
          if (datatype[datatype.length - 1] === true && data.stack[parse.count].indexOf("type") < 0) {
            datatype[datatype.length - 1] = false;
          }
          if (options.language === "qml") {
            ltoke = (options.correct === true) ?
              ";" :
              "x;";
            ltype = "separator";
            recordPush("");
          } else {
            if (classy[classy.length - 1] === 0) {
              classy.pop();
            }
            if (vart.len > -1 && vart.count[vart.len] === 0) {
              if (options.lexer_options.script.variable_list === "each") {
                vartpop();
              } else {
                vart.index[vart.len] = parse.count + 1;
              }
            }
            if (options.correct === true) {
              plusplus();
            }
            ltoke = ";";
            ltype = "separator";
            if (data.token[parse.count] === "x}") {
              asibrace();
            } else {
              recordPush("");
            }
          }
          blockinsert();
        } else if (c[a] === "(" || c[a] === "[" || c[a] === "{") {
          start(c[a]);
        } else if (c[a] === ")" || c[a] === "]" || c[a] === "}") {
          end(c[a]);
        } else if (c[a] === "*" && data.stack[parse.count] === "object" && wordTest < 0 && (/\s/).test(c[a + 1]) === false && c[a + 1] !== "=" && (/\d/).test(c[a + 1]) === false) {
          wordTest = a;
        } else if (c[a] === "=" || c[a] === "&" || c[a] === "<" || c[a] === ">" || c[a] === "+" || c[a] === "-" || c[a] === "*" || c[a] === "/" || c[a] === "!" || c[a] === "?" || c[a] === "|" || c[a] === "^" || c[a] === ":" || c[a] === "%" || c[a] === "~") {
          // operator
          ltoke = operator();
          if (ltoke === "regex") {
            ltoke = data.token[parse.count];
          } else if (ltoke === "*" && data.token[parse.count] === "function") {
            data.token[parse.count] = "function*";
          } else {
            ltype = "operator";
            if (ltoke !== "!" && ltoke !== "++" && ltoke !== "--") {
              asifix();
            }
            recordPush("");
          }
        } else if (wordTest < 0 && c[a] !== "") {
          wordTest = a;
        }
        if (vart.len > -1 && parse.count === vart.index[vart.len] + 1 && data.token[vart.index[vart.len]] === ";" && ltoke !== vart.word[vart.len] && ltype !== "comment" && options.lexer_options.script.variable_list === "list") {
          vartpop();
        }
        a = a + 1;
      } while (a < b);
      if (wordTest > -1) {
        word();
      }
      if (((data.token[parse.count] !== "}" && data.token[0] === "{") || data.token[0] !== "{") && ((data.token[parse.count] !== "]" && data.token[0] === "[") || data.token[0] !== "[")) {
        asi(false);
      }
      if (sourcemap[0] === parse.count) {
        ltoke = "\n" + sourcemap[1];
        ltype = "string";
        recordPush("");
      }
      if (data.token[parse.count] === "x;" && (data.token[parse.count - 1] === "}" || data.token[parse.count - 1] === "]") && data.begin[parse.count - 1] === 0) {
        parse.pop(data);
      }
      return data;
    };
    sparser.lexers.script = script;
  }());
  (function markup_init() {

    const markup = function lexer_markup(source) {
      let a = 0,
        sgmlflag = 0,
        html = "",
        cftransaction = false,
        ext = false;
      const parse = sparser.parse,
        data = parse.data,
        count = {
          end: 0,
          index: -1,
          start: 0
        },
        options = sparser.options,
        b = source.split(""),
        c = b.length,
        htmlblocks = {
          body: "block",
          colgroup: "block",
          dd: "block",
          dt: "block",
          head: "block",
          html: "block",
          li: "block",
          option: "block",
          p: "block",
          tbody: "block",
          td: "block",
          tfoot: "block",
          th: "block",
          thead: "block",
          tr: "block",
        },
        attribute_sort_list = (typeof options.lexer_options.markup.attribute_sort_list === "string" && options.lexer_options.markup.attribute_sort_list !== "") ?
        options.lexer_options.markup.attribute_sort_list.split(",") :
        [],
        asl = attribute_sort_list.length,
        //pads certain template tag delimiters with a space
        bracketSpace = function lexer_markup_bracketSpace(input) {
          if (options.language !== "html" && options.language !== "xml" && options.language !== "sgml" && options.language !== "jsx") {
            const spaceStart = function lexer_markup_tag_spaceStart(start) {
                return start.replace(/\s*$/, " ");
              },
              spaceEnd = function lexer_markup_tag_spaceStart(end) {
                return end.replace(/^\s*/, " ");
              };
            if ((/\{(=|#|\/|(%>)|(%\]))/).test(input) === true || (/\}%(>|\])/).test(input) === true) {
              return input;
            }
            input = input.replace(/\{((\{+)|%-?)\s*/g, spaceStart);
            input = input.replace(/\s*((\}\}+)|(-?%\}))/g, spaceEnd);
            return input;
          }
          return input;
        },
        // pushes a record into the parse table
        recordPush = function lexer_markup_recordPush(target, record, structure) {
          if (target === data) {
            if (record.types.indexOf("end") > -1) {
              count.end = count.end + 1;
            } else if (record.types.indexOf("start") > -1) {
              count.start = count.start + 1;
            }
          }
          if (options.lexer_options.markup.parse_space === true) {
            record.lines = 0;
          }
          parse.push(target, record, structure);
        },
        // Find the lowercase tag name of the provided token.
        tagName = function lexer_markup_tagName(el) {
          let space = 0,
            name = "";
          const reg = (/^((\{|<)((%-?)|\{-?)=?\s*)/);
          if (typeof el !== "string") {
            return "";
          }
          space = el
            .replace(reg, "%")
            .replace(/\s+/, " ")
            .indexOf(" ");
          name = el.replace(reg, " ");
          name = (space < 0) ?
            name.slice(1, el.length - 1) :
            name.slice(1, space);
          if (html === "html") {
            name = name.toLowerCase();
          }
          name = name.replace(/(\}\})$/, "");
          if (name.indexOf("(") > 0) {
            name = name.slice(0, name.indexOf("("));
          }
          if (name === "?xml?") {
            return "xml";
          }
          return name;
        },
        // A fix for HTML missing end tags
        fixHtmlEnd = function lexer_markup_fixHtmlEnd(element, end) {
          const tname = tagName(element),
            record = {
              begin: parse.structure[parse.structure.length - 1][1],
              ender: -1,
              lexer: "markup",
              lines: (data.lines[parse.count] > 0) ? 1 : 0,
              stack: parse.structure[parse.structure.length - 1][0],
              token: `</${parse.structure[parse.structure.length - 1][0]}>`,
              types: "end"
            };
          recordPush(data, record, "");
          if (htmlblocks[parse.structure[parse.structure.length - 1][0]] === "block" && ((end === true && parse.structure.length > 1) || (end === false && `/${parse.structure[parse.structure.length - 1][0]}` !== tname))) {
            do {
              record.begin = parse.structure[parse.structure.length - 1][1];
              record.stack = parse.structure[parse.structure.length - 1][0];
              record.token = `</${parse.structure[parse.structure.length - 1][0]}>`;
              recordPush(data, record, "");
            } while (htmlblocks[parse.structure[parse.structure.length - 1][0]] === "block" && ((end === true && parse.structure.length > 1) || (end === false && `/${parse.structure[parse.structure.length - 1][0]}` !== tname)));
          }
        },

        //parses tags, attributes, and template elements
        tag = function lexer_markup_tag(end) {
          // markup is two smaller lexers that work together: tag - evaluates markup and
          // template tags content - evaluates text content and code for external lexers
          //
          //type definitions:
          // * start      end     type
          // * <![CDATA[   ]]>    cdata
          // * <!--       -->     comment
          // * <#--       -->     comment
          // * <%--       --%>    comment
          // * {!         !}      comment
          // * <!--[if    -->     conditional
          // * text       text    content
          // * </         >       end
          // * <pre       </pre>  ignore (html only)
          // * text       text    script
          // * <!         >       sgml
          // * <          />      singleton
          // * <          >       start
          // * text       text    style
          // * <!--#      -->     template
          // * <%         %>      template
          // * {{{        }}}     template
          // * {{         }}      template
          // * {%         %}      template
          // * [%         %]      template
          // * {@         @}      template
          // * {#         #}      template
          // * {#         /}      template
          // * {?         /}      template
          // * {^         /}      template
          // * {@         /}      template
          // * {<         /}      template
          // * {+         /}      template
          // * {~         }       template
          // * <?         ?>      template
          // * {:else}            template_else
          // * <#else     >       template_else
          // * {@}else{@}         template_else
          // * <%}else{%>         template_else
          // * {{         }}      template_end
          // * <%\s*}     %>      template_end
          // * [%\s*}     %]      template_end
          // * {@\s*}     @}      template_end
          // * {          }       template_end
          // * {{#        }}      template_start
          // * <%         {\s*%>  template_start
          // * [%         {\s*%]  template_start
          // * {@         {\s*@}  template_start
          // * {#         }       template_start
          // * {?         }       template_start
          // * {^         }       template_start
          // * {@         }       template_start
          // * {<         }       template_start
          // * {+         }       template_start
          // * <?xml      ?>      xml
          let igcount = 0,
            element = "",
            lastchar = "",
            ltype = "",
            tname = "",
            start = "",
            cheat = false,
            earlyexit = false,
            ignoreme = false,
            jscom = false,
            nosort = false,
            preserve = false,
            simple = false,
            singleton = false,
            attstore = [],
            comm = ["", 0];
          const record = {
              begin: parse.structure[parse.structure.length - 1][1],
              ender: -1,
              lexer: "markup",
              lines: parse.linesSpace,
              stack: parse.structure[parse.structure.length - 1][0],
              token: "",
              types: ""
            },
            //attribute name
            arname = function lexer_markup_tag_name(x) {
              const eq = x.indexOf("=");
              if (eq > 0 && ((eq < x.indexOf("\"") && x.indexOf("\"") > 0) || (eq < x.indexOf("'") && x.indexOf("'") > 0))) {
                return [x.slice(0, eq), x.slice(eq + 1)];
              }
              return [x, ""];
            },
            // attribute parser
            attributeRecord = function lexer_markup_tag_attributeRecord() {
              let ind = 0,
                eq = 0,
                dq = 0,
                sq = 0,
                slice = "",
                name = "",
                store = [],
                len = attstore.length;
              const qc =
                  options.lexer_options.markup.quote_convert === undefined
                    ? "none"
                    : options.lexer_options.markup.quote_convert,
                begin = parse.count,
                stack = tname.replace(/\/$/, ""),
                syntax = "<{\"'=/",
                convertQ = function lexer_markup_tag_attributeRecord_convertQ() {
                  if (
                    ignoreme === true ||
                    qc === "none" ||
                    record.types !== "attribute" ||
                    (qc === "single" && record.token.indexOf('"') < 0) ||
                    (qc === "double" && record.token.indexOf("'") < 0)
                  ) {
                    recordPush(data, record, "");
                  } else {
                    let ee = 0,
                      inner = false;
                    const chars = record.token.split(""),
                      eq = record.token.indexOf("="),
                      len = chars.length - 1;
                    if (
                      chars[eq + 1] !== '"' &&
                      qc === "single" &&
                      chars[chars.length - 1] !== '"'
                    ) {
                      recordPush(data, record, "");
                    } else if (
                      chars[eq + 1] !== "'" &&
                      qc === "double" &&
                      chars[chars.length - 1] !== "'"
                    ) {
                      recordPush(data, record, "");
                    } else {
                      ee = eq + 2;
                      if (qc === "double") {
                        if (record.token.slice(eq + 2, len).indexOf('"') > -1) {
                          inner = true;
                        }
                        chars[eq + 1] = '"';
                        chars[chars.length - 1] = '"';
                      } else {
                        if (record.token.slice(eq + 2, len).indexOf("'") > -1) {
                          inner = true;
                        }
                        chars[eq + 1] = "'";
                        chars[chars.length - 1] = "'";
                      }
                      if (inner === true) {
                        do {
                          if (chars[ee] === "'" && qc === "single") {
                            chars[ee] = '"';
                          } else if (chars[ee] === '"' && qc === "double") {
                            chars[ee] = "'";
                          }
                          ee = ee + 1;
                        } while (ee < len);
                      }
                      record.token = chars.join("");
                      recordPush(data, record, "");
                    }
                  }
                },
                templateAtt = function lexer_markup_tag_attributeRecord_templateAtt(
                  sample,
                  token
                ) {
                  if (
                    sample.charAt(0) === "{" &&
                    "{%#@:/?^<+~=".indexOf(sample.charAt(1)) > -1
                  ) {
                    record.types = "template_attribute";
                  } else if (sample.charAt(0) === "<") {
                    record.types = "template_attribute";
                  } else {
                    record.token = token;
                    convertQ();
                    return;
                  }
                  record.token = token;
                  convertQ();
                  record.types = "attribute";
                };
              if (attstore.length < 1) {
                return;
              }
              // fix for singleton tags, since "/" at the end of the tag is not an attribute
              if (attstore[attstore.length - 1][0] === "/") {
                attstore.pop();
                element = element.replace(/>$/, "/>");
              }
              // reconnects attribute names to their respective values if separated on "="
              eq = attstore.length;
              dq = 1;
              if (dq < eq) {
                do {
                  name = attstore[dq - 1][0];
                  if (
                    name.charAt(name.length - 1) === "=" &&
                    attstore[dq][0].indexOf("=") < 0
                  ) {
                    attstore[dq - 1][0] = name + attstore[dq][0];
                    attstore.splice(dq, 1);
                    eq = eq - 1;
                    dq = dq - 1;
                  }
                  dq = dq + 1;
                } while (dq < eq);
              }
              // sort the attributes
              if (
                (options.lexer_options.markup.attribute_sort === true ||
                  options.lexer_options.markup.tag_sort === true) &&
                jscom === false &&
                options.language !== "jsx" &&
                nosort === false &&
                tname !== "cfif" &&
                tname !== "cfelseif" &&
                tname !== "cfset"
              ) {
                // if making use of the 'attribute_sort_list` option
                if (asl > 0) {
                  const tempstore = [];
                  dq = 0;
                  eq = 0;
                  len = attstore.length;
                  // loop through the attribute_sort_list looking for attribute name matches
                  do {
                    // loop through the attstore
                    eq = 0;
                    do {
                      name = attstore[eq][0].split("=")[0];
                      if (attribute_sort_list[dq] === name) {
                        tempstore.push(attstore[eq]);
                        attstore.splice(eq, 1);
                        len = len - 1;
                        break;
                      }
                      eq = eq + 1;
                    } while (eq < len);
                    dq = dq + 1;
                  } while (dq < asl);
                  attstore = parse.safeSort(attstore, "", false);
                  attstore = tempstore.concat(attstore);
                  len = attstore.length;
                } else {
                  attstore = parse.safeSort(attstore, "", false);
                }
              }

              record.begin = begin;
              record.stack = stack;
              record.types = "attribute";
              store = [];
              if (ind < len) {
                do {
                  if (attstore[ind] === undefined) {
                    break;
                  }
                  attstore[ind][0] = attstore[ind][0].replace(/\s+$/, "");
                  record.lines = attstore[ind][1];
                  eq = attstore[ind][0].indexOf("=");
                  dq = attstore[ind][0].indexOf('"');
                  sq = attstore[ind][0].indexOf("'");
                  if (
                    /^\/(\/|\*)/.test(attstore[ind][0]) === true &&
                    options.language === "jsx"
                  ) {
                    record.types = "comment_attribute";
                    record.token = attstore[ind][0];
                    convertQ();
                  } else if (eq > -1 && store.length > 0) {
                    // put certain attributes together for coldfusion
                    record.token = store.join(" ");
                    convertQ();
                    if (
                      attstore[ind][0].indexOf("=") > 0 &&
                      attstore[ind][0].indexOf("//") < 0 &&
                      attstore[ind][0].charAt(0) !== ";"
                    ) {
                      record.token = attstore[ind][0].replace(/\s$/, "");
                    } else {
                      record.token = attstore[ind][0];
                    }
                    convertQ();
                    store = [];
                  } else if (
                    eq < 0 &&
                    attstore[ind][0].indexOf("=") < 0
                  ) {
                    // put certain attributes together for coldfusion
                    store.push(attstore[ind][0]);
                  }  else if (eq < 0) {
                    // in most markup languages an attribute without an expressed value has its name
                    // as its string value
                    if (
                      html === "html" &&
                      "[{(".indexOf(attstore[ind][0].charAt(0)) < 0 &&
                      attstore[ind][0].charAt(0) !== "#"
                    ) {
                      record.token = attstore[ind][0].toLowerCase();
                    } else {
                      record.token = attstore[ind][0];
                    }
                    convertQ();
                  } else {
                    // separates out the attribute name from its value
                    slice = attstore[ind][0].slice(eq + 1);
                    if (syntax.indexOf(slice.charAt(0)) < 0) {
                      slice = '"' + slice + '"';
                    }
                    name = attstore[ind][0].slice(0, eq);

                    if (options.language === "jsx" && /^(\s*\{)/.test(slice) === true) {
                      record.token = name + "={";
                      record.types = "jsx_attribute_start";
                      recordPush(data, record, "jsx_attribute");
                      sparser.lexers.script(slice.slice(1, slice.length - 1));
                      record.begin = parse.count;
                      if (/\s\}$/.test(slice) === true) {
                        slice = slice.slice(0, slice.length - 1);
                        slice = /\s+$/.exec(slice)[0];
                        if (slice.indexOf("\n") < 0) {
                          record.lines = 1;
                        } else {
                          record.lines = slice.split("\n").length;
                        }
                      } else {
                        record.lines = 0;
                      }
                      record.begin = parse.structure[parse.structure.length - 1][1];
                      record.stack = parse.structure[parse.structure.length - 1][0];
                      record.token = "}";
                      record.types = "jsx_attribute_end";
                      convertQ();
                      record.types = "attribute";
                      record.begin = begin;
                      record.stack = stack;
                    } else {
                      name = name + "=" + slice;
                      templateAtt(
                        slice.replace(/^("|')/, "").slice(0, 2),
                        name.replace(/(\s+)$/, "")
                      );
                    }
                  }
                  ind = ind + 1;
                } while (ind < len);
              }
              if (store.length > 0) {
                record.token = store.join(" ");
                convertQ();
              }
            };
          ext = false;
          // this complex series of conditions determines an elements delimiters look to
          // the types being pushed to quickly reason about the logic no type is pushed
          // for start tags or singleton tags just yet some types set the `preserve` flag,
          // which means to preserve internal white space The `nopush` flag is set when
          // parsed tags are to be ignored and forgotten
          (function lexer_markup_tag_types() {
            if (end === "]>") {
              end = ">";
              sgmlflag = sgmlflag - 1;
              ltype = "end";
            } else if (end === "---") {
              ltype = "comment";
              start = "---";
            } else if (b[a] === "<") {
              if (b[a + 1] === "/") {
                if (b[a + 2] === "#") {
                  ltype = "template_end";
                } else {
                  ltype = "end";
                }
                end = ">";
              } else if (b[a + 1] === "!") {
                if (b[a + 2] === "-" && b[a + 3] === "-") {
                  if (b[a + 4] === "#") {
                    end = "-->";
                    ltype = "template";
                  } else {
                    end = "-->";
                    ltype = "comment";
                    start = "<!--";
                  }
                } else if (b[a + 2] === "[" && b[a + 3] === "C" && b[a + 4] === "D" && b[a + 5] === "A" && b[a + 6] === "T" && b[a + 7] === "A" && b[a + 8] === "[") {
                  end = "]]>";
                  ltype = "cdata";
                  preserve = true;
                } else {
                  end = ">";
                  sgmlflag = sgmlflag + 1;
                  ltype = "sgml";
                }
              } else if (b[a + 1] === "?") {
                end = "?>";
                if (b[a + 2] === "x" && b[a + 3] === "m" && b[a + 4] === "l") {
                  ltype = "xml";
                  simple = true;
                } else {
                  preserve = true;
                  ltype = "template";
                }
              } else if (b[a + 1] === "%") {
                preserve = true;

              } else if ((b[a + 1] === "p" || b[a + 1] === "P") && (b[a + 2] === "r" || b[a + 2] === "R") && (b[a + 3] === "e" || b[a + 3] === "E") && (b[a + 4] === ">" || (/\s/).test(b[a + 4]) === true)) {
                end = "</pre>";
                preserve = true;
                ltype = "ignore";
              } else if ((b[a + 1] === "x" || b[a + 1] === "X") && (b[a + 2] === "m" || b[a + 2] === "M") && (b[a + 3] === "l" || b[a + 3] === "L") && b[a + 4] === ":" && (b[a + 5] === "t" || b[a + 5] === "T") && (b[a + 6] === "e" || b[a + 6] === "E") && (b[a + 7] === "x" || b[a + 7] === "X") && (b[a + 8] === "t" || b[a + 8] === "T") && (b[a + 9] === ">" || (/\s/).test(b[a + 9]) === true)) {
                end = "</xsl:text>";
                preserve = true;
                ltype = "ignore";
              } else if ((b[a + 1] === "c" || b[a + 1] === "C") && (b[a + 2] === "f" || b[a + 2] === "F") && (b[a + 3] === "q" || b[a + 3] === "Q") && (b[a + 4] === "u" || b[a + 4] === "U") && (b[a + 5] === "e" || b[a + 5] === "E") && (b[a + 6] === "r" || b[a + 6] === "R") && (b[a + 7] === "y" || b[a + 7] === "Y") && (b[a + 8] === ">" || (/\s/).test(b[a + 8]) === true)) {
                end = "</" + b.slice(a + 1, a + 8).join("") + ">";
                preserve = true;
                ltype = "content_preserve";
              } else if (b[a + 1] === "<") {
                if (b[a + 2] === "<") {
                  end = ">>>";
                } else {
                  end = ">>";
                }
                ltype = "template";
              } else if (b[a + 1] === "#") {
                if (b[a + 2] === "e" && b[a + 3] === "l" && b[a + 4] === "s" && b[a + 5] === "e") {
                  end = ">";
                  ltype = "template_else";
                } else if (b[a + 2] === "-" && b[a + 3] === "-") {
                  end = "-->";
                  ltype = "comment";
                  start = "<#--";
                } else {
                  end = ">";
                  ltype = "template_start";
                }
              } else {
                simple = true;
                end = ">";
              }
            } else if (b[a] === "{") {
              preserve = true;
              if (options.language === "jsx") {
                ext = true;
                earlyexit = true;
                record.token = "{";
                record.types = "script_start";
                recordPush(data, record, "");
                parse.structure.push(["script", parse.count]);
                return;
              }
               if (b[a + 1] === "{") {
                if (b[a + 2] === "{") {
                  end = "}}}";
                  ltype = "template";
                } else if (b[a + 2] === "#") {
                  end = "}}";
                  ltype = "template_start";
                } else if (b[a + 2] === "/") {
                  end = "}}";
                  ltype = "template_end";
                } else if (b[a + 2] === "e" && b[a + 3] === "n" && b[a + 4] === "d") {
                  end = "}}";
                  ltype = "template_end";
                } else if (b[a + 2] === "e" && b[a + 3] === "l" && b[a + 4] === "s" && b[a + 5] === "e") {
                  end = "}}";
                  ltype = "template_else";
                } else {
                  end = "}}";
                  ltype = "template";
                }
              } else if (b[a + 1] === "%") {
                end = "%}";
                ltype = "template";
              } else {
                end = b[a + 1] + "}";
                ltype = "template";
              }
            }

            if (options.lexer_options.markup.unformatted === true) {
              preserve = true;
            }

          }());
          if (earlyexit === true) {
            return;
          }
          // This is the real tag lexer. Everything that follows is attribute handling and
          // edge cases
          lastchar = end.charAt(end.length - 1);
          if (ltype === "comment" && b[a] === "<") {
            comm = parse.wrapCommentBlock({
              chars: b,
              end: c,
              lexer: "markup",
              opening: start,
              start: a,
              terminator: end
            });
            element = comm[0];
            a = comm[1];
            if (
              element
              .replace(start, "")
              .replace(/(^\s*)/, "")
              .indexOf("parse-ignore-start") === 0
            ) {
              record.token = element;
              record.types = "ignore";
              recordPush(data, record, "");
              return;
            }
          } else if (a < c) {
            let bcount = 0,
              braccount = 0,
              jsxcount = 0,
              e = 0,
              f = 0,
              parncount = 0,
              lines = 1,
              quote = "",
              jsxquote = "",
              stest = false,
              quotetest = false,
              dustatt = [],
              attribute = [];
            const lex = [],
              //finds slash escape sequences
              slashy = function lexer_markup_tag_slashy() {
                let x = a;
                do {
                  x = x - 1;
                } while (b[x] === "\\");
                x = a - x;
                if (x % 2 === 1) {
                  return false;
                }
                return true;
              },
              // attribute lexer
              attributeLexer = function lexer_markup_tag_attributeLexer(quotes) {
                let atty = "",
                  name, aa = 0,
                  bb = 0;
                if (quotes === true) {
                  atty = attribute.join("");
                  name = arname(atty);
                  if (name[0] === "data-parse-ignore" || name[0] === "data-prettydiff-ignore") {
                    ignoreme = true;
                  }
                  quote = "";
                } else {
                  atty = attribute
                    .join("");
                  if (options.language !== "jsx" || (options.language === "jsx" && atty.charAt(atty.length - 1) !== "}")) {
                    atty = atty.replace(/\s+/g, " ");
                  }
                  name = arname(atty);
                  if (name[0] === "data-parse-ignore" || name[0] === "data-prettydiff-ignore") {
                    ignoreme = true;
                  }
                  if (options.language === "jsx" && attribute[0] === "{" && attribute[attribute.length - 1] === "}") {
                    jsxcount = 0;
                  }
                }
                if (atty.slice(0, 2) === "{%") {
                  nosort = true;
                }
                atty = atty
                  .replace(/^\u0020/, "")
                  .replace(/\u0020$/, "");
                attribute = atty
                  .replace(/\r\n/g, "\n")
                  .split("\n");
                bb = attribute.length;
                if (aa < bb) {
                  do {
                    attribute[aa] = attribute[aa].replace(/(\s+)$/, "");
                    aa = aa + 1;
                  } while (aa < bb);
                }
                if (options.crlf === true) {
                  atty = attribute.join("\r\n");
                } else {
                  atty = attribute.join("\n");
                }
                atty = bracketSpace(atty);
                if (atty === "=") {
                  attstore[attstore.length - 1][0] = `${attstore[attstore.length - 1][0]}=`;
                } else if (atty.charAt(0) === "=" && attstore.length > 0 && attstore[attstore.length - 1][0].indexOf("=") < 0) {
                  //if an attribute starts with a `=` then adjoin it to the last attribute
                  attstore[attstore.length - 1][0] = attstore[attstore.length - 1][0] + atty;
                } else if (atty.charAt(0) !== "=" && attstore.length > 0 && attstore[attstore.length - 1][0].indexOf("=") === attstore[attstore.length - 1][0].length - 1) {
                  // if an attribute follows an attribute ending with `=` then adjoin it to the
                  // last attribute
                  attstore[attstore.length - 1][0] = attstore[attstore.length - 1][0] + atty;
                }  else if (atty !== "" && atty !== " ") {
                  attstore.push([atty, lines]);
                }
                if (attstore.length > 0 && attstore[attstore.length - 1][0].indexOf("=\u201c") > 0) {
                  sparser.parseerror = `Quote looking character (\u201c, &#x201c) used instead of actual quotes on line number ${parse.lineNumber}`;
                } else if (attstore.length > 0 && attstore[attstore.length - 1][0].indexOf("=\u201d") > 0) {
                  sparser.parseerror = `Quote looking character (\u201d, &#x201d) used instead of actual quotes on line number ${parse.lineNumber}`;
                }
                attribute = [];
                lines = (b[a] === "\n") ?
                  2 :
                  1;
              };
            do {
              if (b[a] === "\n") {
                lines = lines + 1;
                parse.lineNumber = parse.lineNumber + 1;
              }
              if (preserve === true || (((/\s/).test(b[a]) === false && quote !== "}") || quote === "}")) {
                lex.push(b[a]);
                if (lex[0] === "<" && lex[1] === ">" && end === ">") {
                  record.token = "<>";
                  record.types = "start";
                  recordPush(data, record, "(empty)");
                  return;
                }
                if (lex[0] === "<" && lex[1] === "/" && lex[2] === ">" && end === ">") {
                  record.token = "</>";
                  record.types = "end";
                  recordPush(data, record, "");
                  return;
                }
              }
              if (ltype === "cdata" && b[a] === ">" && b[a - 1] === "]" && b[a - 2] !== "]") {
                sparser.parseerror = `CDATA tag ${lex.join("")} is not properly terminated with ]]>`;
                break;
              }
              if (ltype === "comment") {
                quote = "";
                //comments must ignore fancy encapsulations and attribute parsing
                if (b[a] === lastchar && lex.length > end.length + 1) {
                  //if current character matches the last character of the tag ending sequence
                  f = lex.length;
                  e = end.length - 1;
                  if (e > -1) {
                    do {
                      f = f - 1;
                      if (lex[f] !== end.charAt(e)) {
                        break;
                      }
                      e = e - 1;
                    } while (e > -1);
                  }
                  if (e < 0) {
                    if (end === "endcomment") {
                      f = f - 1;
                      if ((/\s/).test(lex[f]) === true) {
                        do {
                          f = f - 1;
                        } while (f > 0 && (/\s/).test(lex[f]) === true);
                      }
                      if (lex[f - 2] === "{" && lex[f - 1] === "%" && lex[f] === "-") {
                        end = "-%}";
                        lastchar = "}";
                      } else if (lex[f - 1] === "{" && lex[f] === "%") {
                        end = "%}";
                        lastchar = "}";
                      }
                    } else {
                      break;
                    }
                  }
                }
              } else {
                if (quote === "") {
                  if (lex[0] + lex[1] === "<!" && ltype !== "cdata") {
                    if (b[a] === "[") {
                      if (b[a + 1] === "<") {
                        ltype = "start";
                        break;
                      }
                      if ((/\s/).test(b[a + 1]) === true) {
                        do {
                          a = a + 1;
                          if (b[a] === "\n") {
                            lines = lines + 1;
                          }
                        } while (a < c - 1 && (/\s/).test(b[a + 1]) === true);
                      }
                      if (b[a + 1] === "<") {
                        ltype = "start";
                        break;
                      }
                    }
                    if (b[a] !== ">" && b[a + 1] === "<") {
                      sparser.parseerror = `SGML tag ${lex.join("")} is missing termination with '[' or '>'.`;
                      break;
                    }
                  }
                  if (options.language === "jsx") {
                    if (b[a] === "{") {
                      jsxcount = jsxcount + 1;
                    } else if (b[a] === "}") {
                      jsxcount = jsxcount - 1;
                    }
                  }
                  if (data.types[parse.count] === "sgml" && b[a] === "[" && lex.length > 4) {
                    data.types[parse.count] = "template_start";
                    count.start = count.start + 1;
                    break;
                  }
                  if (b[a] === "<" && options.language !== "coldfusion" && preserve === false && lex.length > 1 && end !== ">>" && end !== ">>>" && simple === true) {
                    sparser.parseerror = `Parse error on line ${parse.lineNumber} on element: ${lex.join("")}`;
                  }
                  if (stest === true && (/\s/).test(b[a]) === false && b[a] !== lastchar) {
                    //attribute start
                    stest = false;
                    quote = jsxquote;
                    igcount = 0;
                    lex.pop();
                    if (a < c) {
                      do {
                        if (b[a] === "\n") {
                          parse.lineNumber = parse.lineNumber + 1;
                        }
                        if (options.lexer_options.markup.unformatted === true) {
                          lex.push(b[a]);
                        } else {
                          attribute.push(b[a]);
                        }

                        if ((
                          b[a] === "<" ||
                          b[a] === ">") && (
                            quote === "" ||
                            quote === ">"
                          ) && options.language !== "jsx"
                        ) {

                          if (quote === "" && b[a] === "<") {
                            quote = ">";
                            braccount = 1;
                          } else if (quote === ">") {
                            if (b[a] === "<") {
                              braccount = braccount + 1;
                            } else if (b[a] === ">") {
                              braccount = braccount - 1;
                              if (braccount === 0) {
                                // the following detects if a coldfusion tag is embedded within another markup
                                // tag
                                tname = tagName(attribute.join(""));
                                quote = "";
                                igcount = 0;
                                attributeLexer(false);
                                break;

                              }
                            }
                          }
                        } else if (quote === "") {
                          if (b[a + 1] === lastchar) {
                            //if at end of tag
                            if (attribute[attribute.length - 1] === "/" || (attribute[attribute.length - 1] === "?" && ltype === "xml")) {
                              attribute.pop();
                              if (preserve === true) {
                                lex.pop();
                              }
                              a = a - 1;
                            }
                            if (attribute.length > 0) {
                              attributeLexer(false);
                            }
                            break;
                          }

                          // HOTFIX

                          // When options is unformatter=true liquid attributes
                          // were being replaced in an incorrect manner, essentially,
                          // wreaking total fucking havoc. If preserve is set to false,
                          // then this control condition can pass, this code base is absolute
                          // chaos, so I have little clue what this condition does, but it seems
                          // to fix this issue and actually preserve attributes.

                          if (
                            preserve === false &&
                            (/^=?("|')?((\{(\{|%|#|@|:|\/|\?|\^|<|\+|~|=))|(\[%)|<)/).test(
                              b[a] + b[a + 1] + b[a + 2] + b[a + 3]
                            ) === true) {

                            attribute.pop();

                            if (b[a] !== "=" && attribute.length > 0) {
                              attributeLexer(false);
                            }

                            quote = "";

                            do {
                              attribute.push(b[a]);
                              if (b[a] === dustatt[dustatt.length - 1]) {
                                dustatt.pop();
                                if (b[a] === "}" && b[a + 1] === "}") {
                                  attribute.push("}");
                                  a = a + 1;
                                  if (b[a + 1] === "}") {
                                    attribute.push("}");
                                    a = a + 1;
                                  }
                                }
                                if (dustatt.length < 1) {
                                  attributeLexer(false);
                                  b[a] = " ";
                                  break;
                                }
                              } else if ((b[a] === "\"" || b[a] === "'") && dustatt[dustatt.length - 1] !== "\"" && dustatt[dustatt.length - 1] !== "'") {
                                dustatt.push(b[a]);
                              } else if (b[a] === "{" && "{%#@:/?^<+~=".indexOf(b[a + 1]) && dustatt[dustatt.length - 1] !== "}") {
                                dustatt.push("}");
                              } else if (b[a] === "<" && dustatt[dustatt.length - 1] !== ">") {
                                dustatt.push(">");
                              } else if (b[a] === "[" && b[a + 1] === ":" && dustatt[dustatt.length - 1] !== "]") {
                                dustatt.push("]");
                              }
                              a = a + 1;
                            } while (a < c);

                          } else if (b[a] === "{" && b[a - 1] === "=" && options.language !== "jsx") {
                            quote = "}";
                          } else if (b[a] === "\"" || b[a] === "'") {
                            quote = b[a];
                            if (b[a - 1] === "=" &&
                              (b[a + 1] === "<" ||
                                (b[a + 1] === "{" && b[a + 2] === "%") ||
                                ((/\s/).test(b[a + 1]) === true && b[a - 1] !== "="))) {
                              igcount = a;
                            }
                          } else if (b[a] === "(") {
                            quote = ")";
                            parncount = 1;
                          } else if (options.language === "jsx") {
                            //jsx variable attribute
                            if ((b[a - 1] === "=" || (/\s/).test(b[a - 1]) === true) && b[a] === "{") {
                              quote = "}";
                              bcount = 1;
                            } else if (b[a] === "/") {
                              //jsx comments
                              if (b[a + 1] === "*") {
                                quote = "\u002a/";
                              } else if (b[a + 1] === "/") {
                                quote = "\n";
                              }
                            }
                          } else if (lex[0] !== "{" && b[a] === "{" && (b[a + 1] === "{" || b[a + 1] === "%" || b[a + 1] === "@" || b[a + 1] === "#")) {
                            //opening embedded template expression
                            if (b[a + 1] === "{") {
                              if (b[a + 2] === "{") {
                                quote = "}}}";
                              } else {
                                quote = "}}";
                              }
                            } else {
                              quote = b[a + 1] + "}";
                            }
                          }
                          if ((/\s/).test(b[a]) === true && quote === "") {
                            // testing for a run of spaces between an attribute's = and a quoted value.
                            // Unquoted values separated by space are separate attributes
                            if (attribute[attribute.length - 2] === "=") {
                              e = a + 1;
                              if (e < c) {
                                do {
                                  if ((/\s/).test(b[e]) === false) {
                                    if (b[e] === "\"" || b[e] === "'") {
                                      a = e - 1;
                                      quotetest = true;
                                      attribute.pop();
                                    }
                                    break;
                                  }
                                  e = e + 1;
                                } while (e < c);
                              }
                            }
                            if (quotetest === true) {
                              quotetest = false;
                            } else if (jsxcount === 0 || (jsxcount === 1 && attribute[0] === "{")) {
                              //if there is an unquoted space attribute is complete
                              attribute.pop();
                              attributeLexer(false);
                              stest = true;
                              break;
                            }
                          }
                        } else if (b[a] === "(" && quote === ")") {
                          parncount = parncount + 1;
                        } else if (b[a] === ")" && quote === ")") {
                          parncount = parncount - 1;
                          if (parncount === 0) {
                            quote = "";
                            if (b[a + 1] === end.charAt(0)) {
                              attributeLexer(false);
                              break;
                            }
                          }
                        } else if (options.language === "jsx" && (quote === "}" || (quote === "\n" && b[a] === "\n") || (quote === "\u002a/" && b[a - 1] === "*" && b[a] === "/"))) {
                          //jsx attributes
                          if (quote === "}") {
                            if (b[a] === "{") {
                              bcount = bcount + 1;
                            } else if (b[a] === quote) {
                              bcount = bcount - 1;
                              if (bcount === 0) {
                                jsxcount = 0;
                                quote = "";
                                element = attribute.join("");
                                if (options.lexer_options.markup.unformatted === false) {
                                  if (options.language === "jsx") {
                                    if ((/^(\s*)$/).test(element) === false) {
                                      attstore.push([element, lines]);
                                    }
                                  } else {
                                    element = element.replace(/\s+/g, " ");
                                    if (element !== " ") {
                                      attstore.push([element, lines]);
                                    }
                                  }
                                }
                                attribute = [];
                                lines = 1;
                                break;
                              }
                            }
                          } else {
                            jsxquote = "";
                            jscom = true;
                            element = attribute.join("");
                            if (element !== " ") {
                              attstore.push([element, lines]);
                            }
                            attribute = [];
                            lines = (quote === "\n") ?
                              2 :
                              1;
                            quote = "";
                            break;
                          }
                        } else if (b[a] === "{" && b[a + 1] === "%" && b[igcount - 1] === "=" && (quote === "\"" || quote === "'")) {
                          quote = quote + "{%";
                          igcount = 0;
                        } else if (b[a - 1] === "%" && b[a] === "}" && (quote === "\"{%" || quote === "'{%")) {
                          quote = quote.charAt(0);
                          igcount = 0;
                        } else if (b[a] === "<" && end === ">" && b[igcount - 1] === "=" && (quote === "\"" || quote === "'")) {
                          quote = quote + "<";
                          igcount = 0;
                        } else if (b[a] === ">" && (quote === "\"<" || quote === "'<")) {
                          quote = quote.charAt(0);
                          igcount = 0;
                        } else if (igcount === 0 && quote !== ">" && (quote.length < 2 || (quote.charAt(0) !== "\"" && quote.charAt(0) !== "'"))) {
                          //terminate attribute at the conclusion of a quote pair
                          f = 0;
                          if (lex.length > 1) {
                            tname = lex[1] + lex[2];
                            tname = tname.toLowerCase();
                          }
                          // in coldfusion quotes are escaped in a string with double the characters:
                          // "cat"" and dog"
                          if (tname === "cf" && b[a] === b[a + 1] && (b[a] === "\"" || b[a] === "'")) {
                            attribute.push(b[a + 1]);
                            a = a + 1;
                          } else {
                            e = quote.length - 1;
                            if (e > -1) {
                              do {
                                if (b[a - f] !== quote.charAt(e)) {
                                  break;
                                }
                                f = f + 1;
                                e = e - 1;
                              } while (e > -1);
                            }
                            if (e < 0) {
                              attributeLexer(true);
                              if (b[a + 1] === lastchar) {
                                break;
                              }
                            }
                          }
                        } else if (igcount > 0 && (/\s/).test(b[a]) === false) {
                          igcount = 0;
                        }
                        a = a + 1;
                      } while (a < c);
                    }
                  } else if (end !== "%>" && end !== "\n" && (b[a] === "\"" || b[a] === "'")) {
                    //opening quote
                    quote = b[a];
                  } else if (ltype !== "comment" && end !== "\n" && b[a] === "<" && b[a + 1] === "!" && b[a + 2] === "-" && b[a + 3] === "-" && b[a + 4] !== "#" && data.types[parse.count] !== "conditional") {
                    quote = "-->";
                  } else if (b[a] === "{" && lex[0] !== "{" && end !== "\n" && end !== "%>" && end !== "%]" && (options.language === "dustjs" || b[a + 1] === "{" || b[a + 1] === "%" || b[a + 1] === "@" || b[a + 1] === "#")) {
                    //opening embedded template expression
                    if (b[a + 1] === "{") {
                      if (b[a + 2] === "{") {
                        quote = "}}}";
                      } else {
                        quote = "}}";
                      }
                    } else {
                      quote = b[a + 1] + "}";
                      if (attribute.length < 1 && (attstore.length < 1 || (/\s/).test(b[a - 1]) === true)) {
                        lex.pop();
                        do {
                          if (b[a] === "\n") {
                            lines = lines + 1;
                          }
                          attribute.push(b[a]);
                          a = a + 1;
                        } while (a < c && b[a - 1] + b[a] !== quote);
                        attribute.push("}");
                        attstore.push([attribute.join(""), lines]);
                        attribute = [];
                        lines = 1;
                        quote = "";
                      }
                    }
                    if (quote === end) {
                      quote = "";
                    }
                  } else if ((simple === true || ltype === "sgml") && end !== "\n" && (/\s/).test(b[a]) === true && b[a - 1] !== "<") {
                    //identify a space in a regular start or singleton tag
                    if (ltype === "sgml") {
                      lex.push(" ");
                    } else {
                      stest = true;
                    }
                  } else if (simple === true && options.language === "jsx" && b[a] === "/" && (b[a + 1] === "*" || b[a + 1] === "/")) {
                    //jsx comment immediately following tag name
                    stest = true;
                    lex[lex.length - 1] = " ";
                    attribute.push(b[a]);
                    if (b[a + 1] === "*") {
                      jsxquote = "\u002a/";
                    } else {
                      jsxquote = "\n";
                    }
                  } else if ((b[a] === lastchar || (end === "\n" && b[a + 1] === "<")) && (lex.length > end.length + 1 || lex[0] === "]") && (options.language !== "jsx" || jsxcount === 0)) {
                    if (end === "\n") {
                      if ((/\s/).test(lex[lex.length - 1]) === true) {
                        do {
                          lex.pop();
                          a = a - 1;
                        } while ((/\s/).test(lex[lex.length - 1]) === true);
                      }
                      break;
                    }
                    if (lex[0] === "{" && lex[1] === "%" && lex.join("").replace(/\s+/g, "") === "{%comment%}") {
                      end = "endcomment";
                      lastchar = "t";
                      preserve = true;
                      ltype = "comment";
                    } else if (lex[0] === "{" && lex[1] === "%" && lex[2] === "-" && lex.join("").replace(/\s+/g, "") === "{%-comment-%}") {
                      end = "endcomment";
                      lastchar = "t";
                      preserve = true;
                      ltype = "comment";
                    } else {
                      //if current character matches the last character of the tag ending sequence
                      f = lex.length;
                      e = end.length - 1;
                      if (e > -1) {
                        do {
                          f = f - 1;
                          if (lex[f] !== end.charAt(e)) {
                            break;
                          }
                          e = e - 1;
                        } while (e > -1);
                      }
                      if (e < 0) {
                        break;
                      }
                    }
                  }
                } else if (b[a] === quote.charAt(quote.length - 1) && ((options.language === "jsx" && end === "}" && (b[a - 1] !== "\\" || slashy() === false)) || options.language !== "jsx" || end !== "}")) {
                  //find the closing quote or embedded template expression
                  f = 0;
                  if (lex.length > 1) {
                    tname = lex[1] + lex[2];
                    tname = tname.toLowerCase();
                  }
                  // in coldfusion quotes are escaped in a string with double the characters:
                  // "cat"" and dog"
                  if (tname === "cf" && b[a] === b[a + 1] && (b[a] === "\"" || b[a] === "'")) {
                    attribute.push(b[a + 1]);
                    a = a + 1;
                  } else {
                    e = quote.length - 1;
                    if (e > -1) {
                      do {
                        if (b[a - f] !== quote.charAt(e)) {
                          break;
                        }
                        f = f + 1;
                        e = e - 1;
                      } while (e > -1);
                    }
                    if (e < 0) {
                      quote = "";
                    }
                  }
                }
              }
              a = a + 1;
            } while (a < c);
            //a correction to incomplete template tags that use multiple angle braces
            if (options.correct === true) {
              if (b[a + 1] === ">" && lex[0] === "<" && lex[1] !== "<") {
                do {
                  a = a + 1;
                } while (b[a + 1] === ">");
              } else if (lex[0] === "<" && lex[1] === "<" && b[a + 1] !== ">" && lex[lex.length - 2] !== ">") {
                do {
                  lex.splice(1, 1);
                } while (lex[1] === "<");
              }
            }
            igcount = 0;
            element = lex.join("");
            tname = tagName(element);
            element = bracketSpace(element);
            if (tname === "xml") {
              html = "xml";
            } else if (html === "" && tname === "!DOCTYPE" && element.toLowerCase().indexOf("xhtml") > 0) {
              html = "xml";
            } else if (html === "" && tname === "html") {
              html = "html";
            }
            if (
              element.replace(start, "")
              .replace(/^\s+/, "")
              .indexOf("parse-ignore-start") === 0
            ) {

              a = a + 1;

              do {

                lex.push(b[a]);

                if (
                  b[a] === "d" &&
                  lex.slice(lex.length - 16).join("") === "parse-ignore-end"
                ) {
                  break;
                }

                a = a + 1;

              } while (a < c);


              do {
                lex.push(b[a]);
                if (
                  b[a] === end.charAt(end.length - 1) &&
                  b.slice(a - (end.length - 1), a + 1).join("") === end
                ) {
                  break;
                }

                a = a + 1;

              } while (a < c);

              record.token = lex.join("");
              record.types = "ignore";
              recordPush(data, record, "");
              console.log(record, data, lex)
              return;
            }
          }
          record.token = element;
          record.types = ltype;
          tname = tagName(element);

          if (preserve === false && options.language !== "jsx") {
            element = element.replace(/\s+/g, " ");
          }
          //a quick hack to inject records for a type of template comments
          if (tname === "comment" && element.slice(0, 2) === "{%") {
            const lineFindStart = function lexer_markup_tag_lineFindStart(spaces) {
                if (spaces === "") {
                  linesStart = 0;
                } else {
                  linesStart = spaces.split("\n").length;
                }
                return "";
              },
              lineFindEnd = function lexer_markup_tag_lineFindEnd(spaces) {
                if (spaces === "") {
                  linesEnd = 0;
                } else {
                  linesEnd = spaces.split("\n").length;
                }
                return "";
              };
            let linesStart = 0,
              linesEnd = 0;
            record.begin = parse.structure[parse.structure.length - 1][1];
            record.ender = parse.count + 3;
            record.stack = parse.structure[parse.structure.length - 1][0];
            record.types = "template_start";
            if (element.charAt(2) === "-") {
              element = element
                .replace(/^(\s*\{%-\s*comment\s*-%\})/, "")
                .replace(/(\{%-\s*endcomment\s*-%\}\s*)$/, "");
              record.token = "{%- comment -%}";
              recordPush(data, record, "comment");
              record.begin = parse.count;
              element = element.replace(/^\s*/, lineFindStart);
              element = element.replace(/\s*$/, lineFindEnd);
              record.lines = linesStart;
              record.stack = "comment";
              record.token = element;
              record.types = "comment";
              recordPush(data, record, "");
              record.token = "{%- endcomment -%}";
            } else {
              element = element
                .replace(/^(\s*\{%\s*comment\s*%\})/, "")
                .replace(/(\{%\s*endcomment\s*%\}\s*)$/, "");
              record.token = "{% comment %}";
              recordPush(data, record, "comment");
              record.begin = parse.count;
              element = element.replace(/^\s*/, lineFindStart);
              element = element.replace(/\s*$/, lineFindEnd);
              record.lines = linesStart;
              record.stack = "comment";
              record.token = element;
              record.types = "comment";
              recordPush(data, record, "");
              record.token = "{% endcomment %}";
            }
            record.lines = linesEnd;
            record.types = "template_end";
            recordPush(data, record, "");
            return;
          }
          // a type correction for template tags who have variable start tag names but a
          // consistent ending tag name
          if (element.indexOf("{{") === 0 && element.slice(element.length - 2) === "}}") {
            if (tname === "end") {
              ltype = "template_end";
            } else if (tname === "else") {
              ltype = "template_else";
            }
          }

          record.types = ltype;
          //update a flag for subatomic parsing in SGML tags
          if (end !== "]>" && sgmlflag > 0 && element.charAt(element.length - 1) !== "[" && (element.slice(element.length - 2) === "]>" || (/^(<!((doctype)|(notation))\s)/i).test(element) === true)) {
            sgmlflag = sgmlflag - 1;
          }
          // cheat identifies HTML singleton elements as singletons even if formatted as
          // start tags, such as <br> (which is really <br/>)
          cheat = (function lexer_markup_tag_cheat() {

            const ender = (/(\/>)$/),
              htmlsings = {
                area: "singleton",
                base: "singleton",
                basefont: "singleton",
                br: "singleton",
                col: "singleton",
                embed: "singleton",
                eventsource: "singleton",
                frame: "singleton",
                hr: "singleton",
                image: "singleton",
                img: "singleton",
                input: "singleton",
                isindex: "singleton",
                keygen: "singleton",
                link: "singleton",
                meta: "singleton",
                param: "singleton",
                progress: "singleton",
                source: "singleton",
                wbr: "singleton"
              },
              fixsingleton = function lexer_markup_tag_cheat_fixsingleton() {
                let aa = parse.count,
                  bb = 0;
                const vname = tname.slice(1);
                if (aa > -1) {
                  do {
                    if (data.types[aa] === "end") {
                      bb = bb + 1;
                    } else if (data.types[aa] === "start") {
                      bb = bb - 1;
                      if (bb < 0) {
                        return false;
                      }
                    }
                    if (bb === 0 && data.token[aa].toLowerCase().indexOf(vname) === 1) {
                      data.types[aa] = "start";
                      count.start = count.start + 1;
                      data.token[aa] = data
                        .token[aa]
                        .replace(/(\s*\/>)$/, ">");
                      return false;
                    }
                    aa = aa - 1;
                  } while (aa > -1);
                }
                return false;
              },
              peertest = function lexer_markup_tag_cheat_peertest(name, item) {
                if (htmlblocks[name] === undefined) {
                  return false;
                }
                if (name === item)  return true;
                if (name === "dd" && item === "dt") return true;
                if (name === "dt" && item === "dd") return true;
                if (name === "td" && item === "th")  return true;
                if (name === "th" && item === "td")  return true;
                if (
                  name === "colgroup" && (
                    item === "tbody" ||
                    item === "tfoot" ||
                    item === "thead" ||
                    item === "tr"
                  )
                ) return true;

                if (
                  name === "tbody" && (
                    item === "colgroup" ||
                    item === "tfoot" ||
                    item === "thead"
                  )
                ) return true;

                if (
                  name === "tfoot" && (
                    item === "colgroup" ||
                    item === "tbody" ||
                    item === "thead"
                  )
                ) return true;

                if (
                  name === "thead" && (
                    item === "colgroup" ||
                    item === "tbody" ||
                    item === "tfoot"
                  )
                ) return true;

                if (name === "tr" && item === "colgroup") return true;

                return false;
              },
              addHtmlEnd = function(count) {
                record.lines = (data.lines[parse.count] > 0) ? 1 : 0;
                record.token = `</${parse.structure[parse.structure.length - 1][0]}>`;
                record.types = "end";
                recordPush(data, record, "");
                if (count > 0) {
                  do {
                    record.begin = parse.structure[parse.structure.length - 1][1];
                    record.stack = parse.structure[parse.structure.length - 1][0];
                    record.token = `</${parse.structure[parse.structure.length - 1][0]}>`;
                    recordPush(data, record, "");
                    count = count - 1;
                  } while (count > 0);
                }
                record.begin = parse.structure[parse.structure.length - 1][1];
                record.lines = parse.linesSpace;
                record.stack = parse.structure[parse.structure.length - 1][0];
                record.token = element;
                record.types = "end";
                data.lines[parse.count - 1] = 0;
              };
            //determine if the current end tag is actually part of an HTML singleton
            if (ltype === "end") {
              const lastToken = data.token[parse.count];
              if (data.types[parse.count - 1] === "singleton" && lastToken.charAt(lastToken.length - 2) !== "/" && "/" + tagName(lastToken) === tname) {
                data.types[parse.count - 1] = "start";
              } else if (
                tname !== "/span" &&
                tname !== "/div" &&
                tname !== "/script" &&
                options.lexer_options.markup.tag_merge === true && (
                  html !== "html" || (
                    html === "html" &&
                    tname !== "/li"
                  )
                )
              ) {

                if (
                  tname === "/" + tagName(data.token[parse.count]) &&
                  data.types[parse.count] === "start"
                ) {
                  parse.structure.pop();
                  data.token[parse.count] = data.token[parse.count].replace(/>$/, "/>");
                  data.types[parse.count] = "singleton";
                  singleton = true;
                  count.start = count.start - 1;
                  return false;
                }

                if (
                  tname === "/" + tagName(data.token[data.begin[parse.count]]) &&
                  data.types[parse.count].indexOf("attribute") > -1 &&
                  data.types[data.begin[parse.count]] === "start"
                ) {

                  parse.structure.pop();
                  data.token[data.begin[parse.count]] = data
                    .token[data.begin[parse.count]]
                    .replace(/>$/, "/>");

                  data.types[data.begin[parse.count]] = "singleton";
                  singleton = true;
                  count.start = count.start - 1;

                  return false;
                }
              }
            }

            if (html === "html") {

              // html gets tag names in lowercase, if you want to preserve case sensitivity
              // beautify as XML
              if (
                element.charAt(0) === "<" &&
                element.charAt(1) !== "!" &&
                element.charAt(1) !== "?" && (
                  parse.count < 0 ||
                  data.types[parse.count].indexOf("template") < 0
                )
              ) {
                element = element.toLowerCase();
              }
              if (
                htmlblocks[parse.structure[parse.structure.length - 1][0]] === "block" && peertest(tname.slice(1), parse.structure[parse.structure.length - 2][0]) === true) {
                // looks for HTML tags missing an ending pair when encountering an ending tag for a parent node
                addHtmlEnd(0);
              } else if (parse.structure.length > 3 &&
                htmlblocks[parse.structure[parse.structure.length - 1][0]] === "block" &&
                htmlblocks[parse.structure[parse.structure.length - 2][0]] === "block" &&
                htmlblocks[parse.structure[parse.structure.length - 3][0]] === "block" &&
                peertest(tname, parse.structure[parse.structure.length - 4][0]) === true) {
                // looks for consecutive missing end tags
                addHtmlEnd(3);
              } else if (parse.structure.length > 2 &&
                htmlblocks[parse.structure[parse.structure.length - 1][0]] === "block" &&
                htmlblocks[parse.structure[parse.structure.length - 2][0]] === "block" &&
                peertest(tname, parse.structure[parse.structure.length - 3][0]) === true) {
                // looks for consecutive missing end tags
                addHtmlEnd(2);
              } else if (parse.structure.length > 1 &&
                htmlblocks[parse.structure[parse.structure.length - 1][0]] === "block" &&
                peertest(tname, parse.structure[parse.structure.length - 2][0]) === true) {
                // looks for consecutive missing end tags
                addHtmlEnd(1);
              } else if (peertest(tname, parse.structure[parse.structure.length - 1][0]) === true) {
                // certain tags cannot contain other certain tags if such tags are peers
                addHtmlEnd(0);
              } else if (tname.charAt(0) === "/" && htmlblocks[parse.structure[parse.structure.length - 1][0]] === "block" && parse.structure[parse.structure.length - 1][0] !== tname.slice(1)) {
                // looks for consecutive missing end tags if the current element is an end tag
                fixHtmlEnd(element, false);
                record.begin = parse.structure[parse.structure.length - 1][1];
                record.lines = parse.linesSpace;
                record.stack = parse.structure[parse.structure.length - 1][0];
                record.token = element;
                record.types = "end";
                data.lines[parse.count - 1] = 0;
              }

              //inserts a trailing slash into singleton tags if they do not already have it
              if (htmlsings[tname] === "singleton") {
                if (options.correct === true && ender.test(element) === false) {
                  element = element.slice(0, element.length - 1) + " />";
                }
                return true;
              }
            }
            return false;
          }());
          //This escape flag is set in the cheat function
          if (singleton === true) {
            attributeRecord();
            return;
          }
          // determine if the markup tag potentially contains code interpreted by a
          // different lexer
          if ((tname === "script" || tname === "style") && element.slice(element.length - 2) !== "/>") {
            //get the attribute value for "type"
            let len = attstore.length - 1,
              attValue = "",
              attr = [];
            if (len > -1) {
              do {
                attr = arname(attstore[len][0]);
                if (attr[0] === "type") {
                  attValue = attr[1];
                  if (attValue.charAt(0) === "\"" || attValue.charAt(0) === "'") {
                    attValue = attValue.slice(1, attValue.length - 1);
                  }
                  break;
                }
                len = len - 1;
              } while (len > -1);
            }
            //ext is flag to send information between the tag lexer and the content lexer
            if (
              tname === "script" && (
                attValue === "" ||
                attValue === "text/javascript" ||
                attValue === "babel" ||
                attValue === "module" ||
                attValue === "application/javascript" ||
                attValue === "application/x-javascript" ||
                attValue === "text/ecmascript" ||
                attValue === "application/ecmascript" ||
                attValue === "text/jsx" ||
                attValue === "application/jsx" ||
                attValue === "text/cjs"
                )
              ) {
              ext = true;
            } else if (
              tname === "style" &&
              options.language !== "jsx" && (
                attValue === "" ||
                attValue === "text/css"
              )
            ) {
              ext = true;
            }

            if (ext === true) {
              len = a + 1;
              if (len < c) {
                do {
                  if ((/\s/).test(b[len]) === false) {
                    if (b[len] === "<") {
                      if (b.slice(len + 1, len + 4).join("") === "!--") {
                        len = len + 4;
                        if (len < c) {
                          do {
                            if ((/\s/).test(b[len]) === false) {
                              ext = false;
                              break;
                            }
                            if (b[len] === "\n" || b[len] === "\r") {
                              break;
                            }
                            len = len + 1;
                          } while (len < c);
                        }
                      } else {
                        ext = false;
                      }
                    }
                    break;
                  }
                  len = len + 1;
                } while (len < c);
              }
            }
          }
          //am I a singleton or a start type?
          if (simple === true && ignoreme === false && ltype !== "xml" && ltype !== "sgml") {
            if (cheat === true || element.slice(element.length - 2) === "/>") {
              ltype = "singleton";
            } else {
              ltype = "start";
            }
            record.types = ltype;
          }
          // additional logic is required to find the end of a tag with the attribute
          // data-parse-ignore
          if (
            simple === true &&
            preserve === false &&
            ignoreme &&
            end === ">" &&
            element.slice(element.length - 2) !== "/>"
          ) {

            let tags = [],
              atstring = [];

            if (cheat === true) {
              ltype = "singleton";
            } else {

              attstore.forEach(function lexer_markup_tag_atstore(value) {
                atstring.push(value[0]);
              });

              preserve = true;
              ltype = "ignore";

              a = a + 1;

              if (a < c) {

                let delim = "",
                  ee = 0,
                  ff = 0,
                  endtag = false;

                do {

                  if (b[a] === "\n") parse.lineNumber = parse.lineNumber + 1;

                  tags.push(b[a]);

                  if (delim === "") {

                    if (b[a] === "\"") {

                      delim = "\"";
                    } else if (b[a] === "'") {

                      delim = "'";

                    } else if (
                      tags[0] !== "{" &&
                      b[a] === "{" && (
                        options.language === "dustjs" ||
                        b[a + 1] === "{" ||
                        b[a + 1] === "%" ||
                        b[a + 1] === "@" ||
                        b[a + 1] === "#"
                      )
                    ) {

                      if (b[a + 1] === "{") {

                        if (b[a + 2] === "{") {
                          delim = "}}}";
                        } else {
                          delim = "}}";
                        }

                      } else {

                        delim = b[a + 1] + "}";

                      }

                    } else if (b[a] === "<" && simple === true) {

                      if (b[a + 1] === "/") {
                        endtag = true;
                      } else {
                        endtag = false;
                      }

                    } else if (b[a] === lastchar && b[a - 1] !== "/") {

                      if (endtag === true) {
                        igcount = igcount - 1;
                        if (igcount < 0) {
                          break;
                        }
                      } else {
                        igcount = igcount + 1;
                      }
                    }

                  } else if (b[a] === delim.charAt(delim.length - 1)) {
                    ff = 0;
                    ee = delim.length - 1;
                    if (ee > -1) {
                      do {
                        if (b[a - ff] !== delim.charAt(ee)) {
                          break;
                        }
                        ff = ff + 1;
                        ee = ee - 1;
                      } while (ee > -1);
                    }
                    if (ee < 0) {
                      delim = "";
                    }
                  }
                  a = a + 1;
                } while (a < c);
              }
            }
            element = element + tags.join("");
            element = element.replace(">", ` ${atstring.join(" ")}>`);
            record.token = element;
            record.types = "content-ignore";
            console.log(record, data)
            attstore = [];
          }

          // some template tags can be evaluated as a block start/end based on syntax
          // alone
          if (record.types.indexOf("template") > -1) {
            if (element.slice(0, 2) === "{%") {
              let names = [
                "autoescape",
                "case",
                "capture",
                "comment",
                "embed",
                "filter",
                "for",
                "form",
                "if",
                "macro",
                "paginate",
                "raw",
                "sandbox",
                "spaceless",
                "switch",
                "tablerow",
                "unless",
                "verbatim"
              ];
              if (
                (
                  tname === "case" ||
                  tname === "default"
                ) && (
                  parse.structure[parse.structure.length - 1][0] === "switch" ||
                  parse.structure[parse.structure.length - 1][0] === "case"
                )
              ) {
                record.types = "template_else";
              } else if (
                tname === "else" ||
                tname === "elseif" ||
                tname === "when" ||
                tname === "elif" ||
                tname === "elsif"
              ) {
                record.types = "template_else";
              } else {

                let namelen = names.length - 1;

                do {
                  if (tname === names[namelen]) {
                    record.types = "template_start";
                    break;
                  }

                  if (tname === "end" + names[namelen]) {
                    record.types = "template_end";
                    break;
                  }

                  namelen = namelen - 1;

                } while (namelen > -1);

              }

            } else if (
              element.slice(0, 2) === "{{" &&
              element.charAt(3) !== "{"
            ) {

              if ((/^(\{\{\s*-?\s*end\s*-?\s*\}\})$/).test(element)) {
                record.types = "template_end";
              } else if (
                tname === "define" ||
                tname === "form" ||
                tname === "if" ||
                tname === "range" ||
                tname === "with"
              ) {
                record.types = "template_start";
              }

            } else if (record.types === "template") {
              if (element.indexOf("else") > 2) {
                record.types = "template_else";
              }
            }
            if (record.types === "template_start" || record.types === "template_else") {
             if (tname === "" || tname === "%") {
                tname = tname + element.slice(1).replace(tname, "").replace(/^\s+/, "");
                tname = tname.slice(0, tname.indexOf("(")).replace(/\s+/, "");
              }
            }
          }
          // identify script and style hidden within a CDATA escape
          if (ltype === "cdata" && (record.stack === "script" || record.stack === "style")) {
            let counta = parse.count,
              countb = parse.count,
              stack = record.stack;
            if (data.types[countb] === "attribute") {
              do {
                counta = counta - 1;
                countb = countb - 1;
              } while (data.types[countb] === "attribute" && countb > -1);
            }
            record.begin = counta;
            element = element
              .replace(/^(\s*<!\[cdata\[)/i, "")
              .replace(/(\]\]>\s*)$/, "");
            record.token = "<![CDATA[";
            record.types = "cdata_start";
            recordPush(data, record, "");
            parse.structure.push(["cdata", parse.count]);
            if (stack === "script") {
              sparser.lexers.script(element);
            } else {
              sparser.lexers.style(element);
            }
            record.begin = parse.structure[parse.structure.length - 1][1];
            record.token = "]]>";
            record.types = "cdata_end";
            recordPush(data, record, "");
            parse.structure.pop();
          } else {
            recordPush(data, record, tname);
          }
          attributeRecord();
          // inserts a script space in anticipation of word wrap since JSX has unique white space rules
          if (options.wrap > 0 && options.language === "jsx") {
            let current_length = 0,
              bb = parse.count,
              cc = 0;
            if (data.types[bb].indexOf("attribute") > -1) {
              do {
                current_length = current_length + data.token[bb].length + 1;
                bb = bb - 1;
              } while (data.lexer[bb] !== "markup" || data.types[bb].indexOf("attribute") > -1);
              if (data.lines[bb] === 1) {
                current_length = current_length + data.token[bb].length + 1;
              }
            } else if (data.lines[bb] === 1) {
              current_length = data.token[bb].length + 1;
            }
            cc = bb - 1;
            if (current_length > 0 && data.types[cc] !== "script_end") {
              if (data.types[cc].indexOf("attribute") > -1) {
                do {
                  current_length = current_length + data.token[cc].length + 1;
                  cc = cc - 1;
                } while (data.lexer[cc] !== "markup" || data.types[cc].indexOf("attribute") > -1);
                if (data.lines[cc] === 1) {
                  current_length = current_length + data.token[cc].length + 1;
                }
              } else if (data.lines[cc] === 1) {
                current_length = data.token[cc].length + 1;
              }
              if (current_length > options.wrap && data.lines[bb] === 1) {
                record.begin = data.begin[bb];
                record.ender = bb + 2;
                record.lexer = data.lexer[bb];
                record.lines = 1;
                record.stack = data.stack[bb];
                record.token = "{";
                record.types = "script_start";
                parse.splice({
                  data: data,
                  howmany: 0,
                  index: bb,
                  record: record
                });
                record.begin = bb;
                record.lexer = "script";
                record.lines = 0;
                record.stack = "script";
                if (options.quote_convert === "single") {
                  record.token = "' '";
                } else {
                  record.token = "\" \"";
                }
                record.types = "string";
                parse.splice({
                  data: data,
                  howmany: 0,
                  index: bb + 1,
                  record: record
                });
                record.lexer = "markup";
                record.token = "}";
                record.types = "script_end";
                parse.splice({
                  data: data,
                  howmany: 0,
                  index: bb + 2,
                  record: record
                });
                data.ender[bb + 3] = data.ender[bb + 3] + 3;
                bb = bb + 4;
                do {
                  data.begin[bb] = data.begin[bb] + 3;
                  data.ender[bb] = data.ender[bb] + 3;
                  bb = bb + 1;
                } while (bb < parse.count);
              }
            }
          }
          //sorts child elements
          if (
            options.lexer_options.markup.tag_sort === true &&
            data.types[parse.count] === "end" &&
            data.types[parse.count - 1] !== "start" &&
            tname !== "/script" &&
            tname !== "/style"
          ) {
            let bb = 0,
              d = 0,
              startStore = 0,
              jsxatt = false,
              endData;
            const children = [],
              store = {
                begin: [],
                ender: [],
                lexer: [],
                lines: [],
                stack: [],
                token: [],
                types: []
              },
              storeRecord = function lexer_markup_tag_sorttag_storeRecord(index) {
                const output = {
                  begin: data.begin[index],
                  ender: data.ender[index],
                  lexer: data.lexer[index],
                  lines: data.lines[index],
                  stack: data.stack[index],
                  token: data.token[index],
                  types: data.types[index]
                };
                return output;
              },
              childsort = function lexer_markup_tag_sorttag_childsort(a, b) {
                if (data.token[a[0]] > data.token[b[0]]) {
                  return -1;
                }
                return 1;
              };
            bb = parse.count - 1;
            if (bb > -1) {
              let endStore = 0;
              do {
                if (data.types[bb] === "start") {
                  d = d - 1;
                  if (d < 0) {
                    startStore = bb + 1;
                    if (data.types[startStore] === "attribute" || data.types[startStore] === "jsx_attribute_start") {
                      jsxatt = false;
                      do {
                        startStore = startStore + 1;
                        if (jsxatt === false && data.types[startStore] !== "attribute") {
                          break;
                        }
                        if (data.types[startStore] === "jsx_attribute_start") {
                          jsxatt = true;
                        } else if (data.types[startStore] === "jsx_attribute_end") {
                          jsxatt = false;
                        }
                      } while (startStore < c);
                    }
                    break;
                  }
                } else if (data.types[bb] === "end") {
                  d = d + 1;
                  if (d === 1) {
                    endStore = bb;
                  }
                }
                if (d === 0) {
                  if (data.types[bb] === "start") {
                    children.push([bb, endStore]);
                  } else {
                    if (data.types[bb] === "singleton" && (data.types[bb + 1] === "attribute" || data.types[bb + 1] === "jsx_attribute_start")) {
                      let cc = bb + 1;
                      jsxatt = false;
                      do {
                        if (data.types[cc] === "jsx_attribute_start") {
                          jsxatt = true;
                        } else if (data.types[cc] === "jsx_attribute_end") {
                          jsxatt = false;
                        }
                        if (jsxatt === false && data.types[cc + 1] !== "attribute" && data.types[cc + 1] !== "jsx_attribute_start") {
                          break;
                        }
                        cc = cc + 1;
                      } while (cc < parse.count);
                      children.push([bb, cc]);
                    } else if (data.types[bb] !== "attribute" && data.types[bb] !== "jsx_attribute_start") {
                      children.push([bb, bb]);
                    }
                  }
                }
                bb = bb - 1;
              } while (bb > -1);
            }
            if (children.length < 2) {
              return;
            }
            children.sort(childsort);
            bb = children.length - 1;
            if (bb > -1) {
              do {
                recordPush(store, storeRecord(children[bb][0]), "");
                if (children[bb][0] !== children[bb][1]) {
                  d = children[bb][0] + 1;
                  if (d < children[bb][1]) {
                    do {
                      recordPush(store, storeRecord(d), "");
                      d = d + 1;
                    } while (d < children[bb][1]);
                  }
                  recordPush(store, storeRecord(children[bb][1]), "");
                }
                bb = bb - 1;
              } while (bb > -1);
            }
            endData = {
              begin: data.begin.pop(),
              ender: data.ender.pop(),
              lexer: data.lexer.pop(),
              lines: data.lines.pop(),
              stack: data.stack.pop(),
              token: data.token.pop(),
              types: data.types.pop()
            };
            (function lexer_markup_tag_sorttag_slice() {
              parse.datanames.forEach(function lexer_markup_tag_sorttag_slice_datanames(value) {
                data[value] = data[value].slice(0, startStore);
              });
            }());
            parse.concat(data, store);
            count.end = count.end - 1;
            recordPush(data, endData, "");
          }
          parse.linesSpace = 0;
        },
        // parses everything other than markup tags
        content = function lexer_markup_content() {
          let lex = [],
            ltoke = "",
            jsxbrace = (data.token[parse.count] === "{"),
            liner = parse.linesSpace,
            now = a;
          const name = (ext === true) ?
            (jsxbrace === true) ?
            "script" :
            (parse.structure[parse.structure.length - 1][1] > -1) ?
            tagName(data.token[parse.structure[parse.structure.length - 1][1]].toLowerCase()) :
            tagName(data.token[data.begin[parse.count]].toLowerCase()) :
            "",
            square = (data.types[parse.count] === "template_start" && data.token[parse.count].indexOf("<!") === 0 && data.token[parse.count].indexOf("<![") < 0 && data.token[parse.count].charAt(data.token[parse.count].length - 1) === "["),
            record = {
              begin: parse.structure[parse.structure.length - 1][1],
              ender: -1,
              lexer: "markup",
              lines: liner,
              stack: parse.structure[parse.structure.length - 1][0],
              token: "",
              types: "content"
            },
            esctest = function lexer_markup_content_esctest() {
              let aa = a - 1,
                bb = 0;
              if (b[a - 1] !== "\\") {
                return false;
              }
              if (aa > -1) {
                do {
                  if (b[aa] !== "\\") {
                    break;
                  }
                  bb = bb + 1;
                  aa = aa - 1;
                } while (aa > -1);
              }
              if (bb % 2 === 1) {
                return true;
              }
              return false;
            };
          if (a < c) {
            let end = "",
              quote = "",
              quotes = 0;
            do {
              if (b[a] === "\n") {
                parse.lineNumber = parse.lineNumber + 1;
              }
              // external code requires additional parsing to look for the appropriate end
              // tag, but that end tag cannot be quoted or commented
              if (ext === true) {
                if (quote === "") {
                  if (b[a] === "/") {
                    if (b[a + 1] === "*") {
                      quote = "*";
                    } else if (b[a + 1] === "/") {
                      quote = "/";
                    } else if (name === "script" && "([{!=,;.?:&<>".indexOf(b[a - 1]) > -1) {
                      if (options.language !== "jsx" || b[a - 1] !== "<") {
                        quote = "reg";
                      }
                    }
                  } else if ((b[a] === "\"" || b[a] === "'" || b[a] === "`") && esctest() === false) {
                    quote = b[a];
                  } else if (b[a] === "{" && jsxbrace === true) {
                    quotes = quotes + 1;
                  } else if (b[a] === "}" && jsxbrace === true) {
                    if (quotes === 0) {
                      sparser.lexers.script(lex.join("").replace(/^(\s+)/, "").replace(/(\s+)$/, ""));
                      parse.structure[parse.structure.length - 1][1] + 1;
                      if (data.types[parse.count] === "end" && data.lexer[data.begin[parse.count] - 1] === "script") {
                        record.lexer = "script";
                        record.token = (options.correct === true) ? ";" : "x;";
                        record.types = "separator";
                        recordPush(data, record, "");
                        record.lexer = "markup";
                      }
                      record.token = "}";
                      record.types = "script_end";
                      recordPush(data, record, "");
                      parse.structure.pop();
                      break;
                    }
                    quotes = quotes - 1;
                  }
                  end = b
                    .slice(a, a + 10)
                    .join("")
                    .toLowerCase();

                  //script requires use of the script lexer
                  if (name === "script") {
                    if (a === c - 9) {
                      end = end.slice(0, end.length - 1);
                    } else {
                      end = end.slice(0, end.length - 2);
                    }
                    if (end === "</script") {
                      let outside = lex.join("").replace(/^(\s+)/, "").replace(/(\s+)$/, "");
                      a = a - 1;
                      if (lex.length < 1) {
                        break;
                      }
                      if ((/^(<!--+)/).test(outside) === true && (/(--+>)$/).test(outside) === true) {
                        record.token = "<!--";
                        record.types = "comment";
                        recordPush(data, record, "");
                        outside = outside.replace(/^(<!--+)/, "").replace(/(--+>)$/, "");
                        sparser.lexers.script(outside);
                        record.token = "-->";
                        recordPush(data, record, "");
                      } else {
                        sparser.lexers.script(outside);
                      }
                      break;
                    }
                  }

                  //style requires use of the style lexer
                  if (name === "style") {
                    if (a === c - 8) {
                      end = end.slice(0, end.length - 1);
                    } else if (a === c - 9) {
                      end = end.slice(0, end.length - 2);
                    } else {
                      end = end.slice(0, end.length - 3);
                    }
                    if (end === "</style") {
                      let outside = lex.join("").replace(/^(\s+)/, "").replace(/(\s+)$/, "");
                      a = a - 1;
                      if (lex.length < 1) {
                        break;
                      }
                      if ((/^(<!--+)/).test(outside) === true && (/(--+>)$/).test(outside) === true) {
                        record.token = "<!--";
                        record.types = "comment";
                        recordPush(data, record, "");
                        outside = outside.replace(/^(<!--+)/, "").replace(/(--+>)$/, "");
                        sparser.lexers.style(outside);
                        record.token = "-->";
                        recordPush(data, record, "");
                      } else {
                        sparser.lexers.style(outside);
                      }
                      break;
                    }
                  }
                } else if (quote === b[a] && (quote === "\"" || quote === "'" || quote === "`" || (quote === "*" && b[a + 1] === "/")) && esctest() === false) {
                  quote = "";
                } else if (quote === "`" && b[a] === "$" && b[a + 1] === "{" && esctest() === false) {
                  quote = "}";
                } else if (quote === "}" && b[a] === "}" && esctest() === false) {
                  quote = "`";
                } else if (quote === "/" && (b[a] === "\n" || b[a] === "\r")) {
                  quote = "";
                } else if (quote === "reg" && b[a] === "/" && esctest() === false) {
                  quote = "";
                } else if (quote === "/" && b[a] === ">" && b[a - 1] === "-" && b[a - 2] === "-") {
                  end = b
                    .slice(a + 1, a + 11)
                    .join("")
                    .toLowerCase();
                  end = end.slice(0, end.length - 2);
                  if (name === "script" && end === "</script") {
                    quote = "";
                  }
                  end = end.slice(0, end.length - 1);
                  if (name === "style" && end === "</style") {
                    quote = "";
                  }
                }
              }
              //typically this logic is for artifacts nested within an SGML tag
              if (square === true && b[a] === "]") {
                a = a - 1;
                ltoke = lex.join("");
                if (options.lexer_options.markup.parse_space === false) {
                  ltoke = ltoke.replace(/\s+$/, "");
                }
                liner = 0;
                record.token = ltoke;
                recordPush(data, record, "");
                break;
              }
              //general content processing
              if (
                ext === false &&
                lex.length > 0 && (
                  (
                    b[a] === "<" &&
                    b[a + 1] !== "=" &&
                    !(/\s|\d/).test(b[a + 1])
                  ) || (
                    b[a] === "[" &&
                    b[a + 1] === "%"
                  ) || (
                    b[a] === "{" && (
                      options.language === "jsx" ||
                      b[a + 1] === "{" ||
                      b[a + 1] === "%"
                    )
                  )
                )
              ) {

                //regular content
                a = a - 1;

                if (
                  options.lexer_options.markup.parse_space === true ||
                  parse.structure[parse.structure.length - 1][0] === "comment"
                ) {
                  ltoke = lex.join("");
                } else {
                  ltoke = lex.join("").replace(/\s+$/, "");
                }

                ltoke = bracketSpace(ltoke);
                liner = 0;
                record.token = ltoke;

                if (
                  options.wrap > 0 &&
                  options.lexer_options.markup.preserve_text !== true
                ) {

                  let aa = options.wrap,
                    len = ltoke.length,
                    startSpace = "",
                    endSpace = "";

                  const wrap = options.wrap,
                    store = [],
                    wrapper = function beautify_markup_apply_content_wrapper() {
                      if (ltoke.charAt(aa) === " ") {
                        store.push(ltoke.slice(0, aa));
                        ltoke = ltoke.slice(aa + 1);
                        len = ltoke.length;
                        aa = wrap;
                        return;
                      }
                      do {
                        aa = aa - 1;
                      } while (aa > 0 && ltoke.charAt(aa) !== " ");
                      if (aa > 0) {
                        store.push(ltoke.slice(0, aa));
                        ltoke = ltoke.slice(aa + 1);
                        len = ltoke.length;
                        aa = wrap;
                      } else {
                        aa = wrap;
                        do {
                          aa = aa + 1;
                        } while (aa < len && ltoke.charAt(aa) !== " ");
                        store.push(ltoke.slice(0, aa));
                        ltoke = ltoke.slice(aa + 1);
                        len = ltoke.length;
                        aa = wrap;
                      }
                    };

                  // HTML anchor lists do not get wrapping unless the content itself exceeds the wrapping limit
                  if (data.token[data.begin[parse.count]] === "<a>" &&
                    data.token[data.begin[data.begin[parse.count]]] === "<li>" &&
                    data.lines[data.begin[parse.count]] === 0 &&
                    parse.linesSpace === 0 &&
                    ltoke.length < options.wrap) {
                    recordPush(data, record, "");
                    break;
                  }
                  if (len < wrap) {
                    recordPush(data, record, "");
                    break;
                  }
                  if (parse.linesSpace < 1) {
                    let bb = parse.count;
                    do {
                      aa = aa - data.token[bb].length;
                      if (data.types[bb].indexOf("attribute") > -1) {
                        aa = aa - 1;
                      }
                      if (data.lines[bb] > 0 && data.types[bb].indexOf("attribute") < 0) {
                        break;
                      }
                      bb = bb - 1;
                    } while (bb > 0 && aa > 0);
                    if (aa < 1) {
                      aa = ltoke.indexOf(" ");
                    }
                  }
                  ltoke = lex.join("");
                  if (options.lexer_options.markup.parse_space === true) {
                    startSpace = ((/\s/).test(ltoke.charAt(0)) === true) ?
                      (/\s+/).exec(ltoke)[0] :
                      "";
                    endSpace = ((/\s/).test(ltoke.charAt(ltoke.length - 1)) === true) ?
                      (/\s+$/).exec(ltoke)[0] :
                      "";
                  }
                  ltoke = ltoke.replace(/^\s+/, "").replace(/\s+$/, "").replace(/\s+/g, " ");
                  do {
                    wrapper();
                  } while (aa < len);
                  if (ltoke !== "" && ltoke !== " ") {
                    store.push(ltoke);
                  }
                  if (options.crlf === true) {
                    ltoke = store.join("\r\n");
                  } else {
                    ltoke = store.join("\n");
                  }
                  ltoke = startSpace + ltoke + endSpace;
                }
                liner = 0;
                record.token = ltoke;
                recordPush(data, record, "");
                break;
              }
              lex.push(b[a]);
              a = a + 1;
            } while (a < c);
          }
          if (options.lexer_options.markup.parse_space === false) {
            if (a > now && a < c) {
              if ((/\s/).test(b[a]) === true) {
                let x = a;
                parse.linesSpace = 1;
                do {
                  if (b[x] === "\n") {
                    parse.linesSpace = parse.linesSpace + 1;
                  }
                  x = x - 1;
                } while (x > now && (/\s/).test(b[x]) === true);
              } else {
                parse.linesSpace = 0;
              }
            } else if (a !== now || (a === now && ext === false)) {
              //regular content at the end of the supplied source
              ltoke = lex.join("").replace(/\s+$/, "");
              liner = 0;
              //this condition prevents adding content that was just added in the loop above
              if (record.token !== ltoke) {
                record.token = ltoke;
                recordPush(data, record, "");
                parse.linesSpace = 0;
              }
            }
          }
          ext = false;
        };
      // trim the attribute_sort_list values
      if (asl > 0) {
        do {
          attribute_sort_list[a] = attribute_sort_list[a].replace(/^\s+/, "").replace(/\s+$/, "");
          a = a + 1;
        } while (a < asl);
        a = 0;
      }
      if (options.language === "html") {
        html = "html";
      }

      do {
        if ((/\s/).test(b[a]) === true) {

          if (
            options.lexer_options.markup.parse_space === true || (
              data.types[parse.count] === "template_start" &&
              parse.structure[parse.structure.length - 1][0] === "comment"
            )
          ) {
            content();
          } else {
            a = parse.spacer({
              array: b,
              end: c,
              index: a
            });
          }
        } else if (ext) {
          content();
        } else if (b[a] === "<") {
          tag("");
        } else if (b[a] === "[" && b[a + 1] === "%") {
          tag("%]");
        } else if (
          b[a] === "{" && (
            options.language === "jsx" ||
            b[a + 1] === "{" ||
            b[a + 1] === "%"
          )
        ) {
          tag("");
        } else if (b[a] === "]" && sgmlflag > 0) {
          tag("]>");
        } else if (
          options.language === "jekyll" &&
          b[a] === "-" &&
          b[a + 1] === "-" &&
          b[a + 2] === "-"
        ) {
          tag("---");
        } else {
          content();
        }
        a = a + 1;
      } while (a < c);

      if (
        data.token[parse.count].charAt(0) !== "/" &&
        htmlblocks[parse.structure[parse.structure.length - 1][0]] === "block"
      ) {
        fixHtmlEnd(data.token[parse.count], true);
      }

      if (count.end !== count.start && sparser.parseerror === "") {
        if (count.end > count.start) {
          let x = count.end - count.start,
            plural = (x === 1) ?
            "" :
            "s";
          sparser.parseerror = `${x} more end type${plural} than start types.`;
        } else {
          let x = count.start - count.end,
            plural = (x === 1) ? "" : "s";
          sparser.parseerror = `${x} more start type${plural} than end types.`;
        }
      }
      return data;
    };
    sparser.lexers.markup = markup;
  }());
  (function beautify_style_init() {
    const style = function beautify_style(options) {
      const data = options.parsed,
        lf = (options.crlf === true) ?
        "\r\n" :
        "\n",
        len = (prettydiff.end > 0) ?
        prettydiff.end + 1 :
        data.token.length,
        build = [],
        //a single unit of indentation
        tab = (function beautify_style_tab() {
          let aa = 0,
            bb = [];
          do {
            bb.push(options.indent_char);
            aa = aa + 1;
          } while (aa < options.indent_size);
          return bb.join("");
        }()),
        pres = options.preserve + 1,
        //new lines plus indentation
        nl = function beautify_style_nl(tabs) {
          const linesout = [],
            total = (function beautify_style_nl_total() {
              if (a === len - 1) {
                return 1;
              }
              if (data.lines[a + 1] - 1 > pres) {
                return pres;
              }
              if (data.lines[a + 1] > 1) {
                return data.lines[a + 1] - 1;
              }
              return 1;
            }());
          let index = 0;
          if (tabs < 0) {
            tabs = 0;
          }
          do {
            linesout.push(lf);
            index = index + 1;
          } while (index < total);
          if (tabs > 0) {
            index = 0;
            do {
              linesout.push(tab);
              index = index + 1;
            } while (index < tabs);
          }
          build.push(linesout.join(""));
        },
        vertical = function beautify_style_vertical() {
          const start = data.begin[a],
            startChar = data.token[start],
            endChar = data.token[a],
            store = [];
          let b = a,
            c = 0,
            item, longest = 0;
          if (start < 0 || b <= start) {
            return;
          }
          do {
            b = b - 1;
            if (data.begin[b] === start) {
              if (data.token[b] === ":") {
                item = [b - 1, 0];
                do {
                  b = b - 1;
                  if ((((data.token[b] === ";" && startChar === "{") || (data.token[b] === "," && startChar === "(")) && data.begin[b] === start) || (data.token[b] === endChar && data.begin[data.begin[b]] === start)) {
                    break;
                  }
                  if (data.types[b] !== "comment" && data.types[b] !== "selector" && data.token[b] !== startChar && data.begin[b] === start) {
                    item[1] = data.token[b].length + item[1];
                  }
                } while (b > start + 1);
                if (item[1] > longest) {
                  longest = item[1];
                }
                store.push(item);
              }
            } else if (data.types[b] === "end") {
              if (b < data.begin[b]) {
                break;
              }
              b = data.begin[b];
            }
          } while (b > start);
          b = store.length;
          if (b < 2) {
            return;
          }
          do {
            b = b - 1;
            if (store[b][1] < longest) {
              c = store[b][1];
              do {
                data.token[store[b][0]] = data.token[store[b][0]] + " ";
                c = c + 1;
              } while (c < longest);
            }
          } while (b > 0);
        };
      let indent = options.indent_level,
        a = prettydiff.start,
        when = ["", ""];
      if (options.vertical === true && options.compressed_css === false) {
        a = len;
        do {
          a = a - 1;
          if (data.token[a] === "}" || data.token[a] === ")") {
            vertical();
          }
        } while (a > 0);
        a = prettydiff.start;
      }

      //beautification loop
      do {
        if (
          data.types[a + 1] === "end" ||
          data.types[a + 1] === "template_end" ||
          data.types[a + 1] === "template_else"
        ) {
          indent = indent - 1;
        }

        if (
          data.types[a] === "template" &&
          data.lines[a] > 0
        ) {

          build.push(data.token[a]);

          // HOTFIX
          //
          // Fixes semicolon newlines from occuring when output tag is used as a property
          // value within classes, eg:
          // .class { color: {{ foo}}; }
          if(data.types[a - 2] !== 'property' && data.types[a - 1] !== 'colon') nl(indent);

        } else if (data.types[a] === "template_else") {

          build.push(data.token[a]);
          indent = indent + 1;
          nl(indent);

        } else if (
          data.types[a] === "start" ||
          data.types[a] === "template_start"
        ) {

          indent = indent + 1;
          build.push(data.token[a]);

          if (
            data.types[a + 1] !== "end" &&
            data.types[a + 1] !== "template_end" && (
              options.compressed_css === false || (
                options.compressed_css === true &&
                data.types[a + 1] === "selector"
              )
            )
          ) {

            nl(indent);
          }

        } else if ((
          data.token[a] === ";" && (
            options.compressed_css === false || (
              options.compressed_css === true &&
                data.types[a + 1] === "selector"
              )
            )
          ) ||
          data.types[a] === "end" ||
          data.types[a] === "template_end" ||
          data.types[a] === "comment"
        ) {


          build.push(data.token[a]);

          if (data.types[a + 1] === "value") {

            if (data.lines[a + 1] === 1) {
              build.push(" ");
            } else if (data.lines[a + 1] > 1) {
              nl(indent);
            }

          } else if (data.types[a + 1] !== "separator") {

            if (
              data.types[a + 1] !== "comment" || (
                data.types[a + 1] === "comment" &&
                data.lines[a + 1] > 1
              )
            ) {

              nl(indent);

            } else {

              build.push(" ");

            }
          }

        } else if (data.token[a] === ":") {

          build.push(data.token[a]);

          if (options.compressed_css === false)  build.push(" ");

        } else if (data.types[a] === "selector") {

          if (
            options.css_insert_lines === true &&
            data.types[a - 1] === "end" &&
            data.lines[a] < 3
          ) {
            build.push(lf);
          }

          if (data.token[a].indexOf("when(") > 0) {
            when = data.token[a].split("when(");
            build.push(when[0].replace(/\s+$/, ""));
            nl(indent + 1);
            build.push(`when (${when[1]}`);
          } else {
            build.push(data.token[a]);
          }

          if (data.types[a + 1] === "start") {
            if (options.braces === true) {
              nl(indent);
            } else if (options.compressed_css === false) {
              build.push(" ");
            }
          }

        } else if (data.token[a] === ",") {

          build.push(data.token[a]);
          if (data.types[a + 1] === "selector" || data.types[a + 1] === "property") {
            nl(indent);
          } else if (options.compressed_css === false) {
            build.push(" ");
          }

        } else if (
          data.stack[a] === "map" &&
          data.token[a + 1] === ")" &&
          a - data.begin[a] > 5
        ) {

          build.push(data.token[a]);
          nl(indent);

        } else if (data.token[a] === "x;") {

          nl(indent);

        } else if (
          (
            data.types[a] === "variable" ||
            data.types[a] === "function"
          ) &&
          options.css_insert_lines === true &&
          data.types[a - 1] === "end" &&
          data.lines[a] < 3
        ) {
          build.push(lf);
          build.push(data.token[a]);

        } else if (

          data.token[a] !== ";" || (
            data.token[a] === ";" && (
              options.compressed_css === false || (
                options.compressed_css === true &&
                data.token[a + 1] !== "}"
              )
            )
          )
        ) {


          build.push(data.token[a]);

        }

        a = a + 1;
      } while (a < len);

      prettydiff.iterator = len - 1;

      return build.join("");

    };

    prettydiff.beautify.style = style;

  }());
  (function options_init() {
    const optionDef = {
      attribute_sort: {
        api: "any",
        default: false,
        definition: "Alphanumerically sort markup attributes. Attribute sorting is ignored on tags that contain attributes template attributes.",
        label: "Sort Attributes",
        lexer: "markup",
        mode: "any",
        type: "boolean"
      },
      attribute_sort_list: {
        api: "any",
        default: "",
        definition: "A comma separated list of attribute names. Attributes will be sorted according to this list and then alphanumerically. This option requires 'attribute_sort' have a value of true.",
        label: "Sort Attribute List",
        lexer: "markup",
        mode: "any",
        type: "string"
      },
      brace_line: {
        api: "any",
        default: false,
        definition: "If true an empty line will be inserted after opening curly braces and before clo" +
          "sing curly braces.",
        label: "Brace Lines",
        lexer: "script",
        mode: "beautify",
        type: "boolean"
      },
      brace_padding: {
        api: "any",
        default: false,
        definition: "Inserts a space after the start of a container and before the end of the contain" +
          "er if the contents of that container are not indented; such as: conditions, func" +
          "tion arguments, and escaped sequences of template strings.",
        label: "Brace Padding",
        lexer: "script",
        mode: "beautify",
        type: "boolean"
      },
      brace_style: {
        api: "any",
        default: "none",
        definition: "Emulates JSBeautify's brace_style option using existing Pretty Diff options.",
        label: "Brace Style",
        lexer: "script",
        mode: "beautify",
        type: "string",
        values: {
          "collapse": "Sets options.format_object to 'indent' and options.neverflatten to true.",
          "collapse-preserve-inline": "Sets options.bracepadding to true and options.format_object to 'inline'.",
          "expand": "Sets options.braces to true, options.format_object to 'indent', and options.never" +
            "flatten to true.",
          "none": "Ignores this option"
        }
      },
      braces: {
        api: "any",
        default: false,
        definition: "Determines if opening curly braces will exist on the same line as their conditio" +
          "n or be forced onto a new line. (Allman style indentation).",
        label: "Style of Indent",
        lexer: "script",
        mode: "beautify",
        type: "boolean"
      },
      case_space: {
        api: "any",
        default: false,
        definition: "If the colon separating a case's expression (of a switch/case block) from its statement should be followed by a space instead of indentation, thereby keeping the case on a single line of code.",
        label: "Space Following Case",
        lexer: "script",
        mode: "beautify",
        type: "boolean"
      },
      color: {
        api: "any",
        default: "white",
        definition: "The color scheme of the reports.",
        label: "Color",
        lexer: "any",
        mode: "any",
        type: "string",
        values: {
          "canvas": "A light brown color scheme",
          "shadow": "A black and ashen color scheme",
          "white": "A white and pale grey color scheme"
        }
      },
      comment_line: {
        api: "any",
        default: false,
        definition: "If a blank new line should be forced above comments.",
        label: "Force an Empty Line Above Comments",
        lexer: "markup",
        mode: "beautify",
        type: "boolean"
      },
      comments: {
        api: "any",
        default: false,
        definition: "This will determine whether comments should always start at position 0 of each l" +
          "ine or if comments should be indented according to the code.",
        label: "Indent Comments",
        lexer: "any",
        mode: "beautify",
        type: "boolean"
      },
      complete_document: {
        api: "any",
        default: false,
        definition: "Allows a preference for generating a complete HTML document instead of only gene" +
          "rating content.",
        label: "Generate A Complete HTML File",
        lexer: "markup",
        mode: "any",
        type: "boolean"
      },
      compressed_css: {
        api: "any",
        default: false,
        definition: "If CSS should be beautified in a style where the properties and values are minif" +
          "ed for faster reading of selectors.",
        label: "Compressed CSS",
        lexer: "style",
        mode: "beautify",
        type: "boolean"
      },
      conditional: {
        api: "any",
        default: false,
        definition: "If true then conditional comments used by Internet Explorer are preserved at min" +
          "ification of markup.",
        label: "IE Comments (HTML Only)",
        lexer: "markup",
        mode: "minify",
        type: "boolean"
      },
      config: {
        api: "node",
        default: "",
        definition: "By default Pretty Diff will look into the directory structure contain the value of option 'source' for a file named `.prettydiffrc` for saved option settings. This option allows a user to specify any file at any location in the local file system for configuration settings. A value of 'none' tells the application to bypass reading any configuration file.",
        label: "Custom Config File Location",
        lexer: "any",
        mode: "any",
        type: "string"
      },
      content: {
        api: "any",
        default: false,
        definition: "This will normalize all string content to 'text' so as to eliminate some differe" +
          "nces from the output.",
        label: "Ignore Content",
        lexer: "any",
        mode: "diff",
        type: "boolean"
      },
      correct: {
        api: "any",
        default: false,
        definition: "Automatically correct some sloppiness in code.",
        label: "Fix Sloppy Code",
        lexer: "any",
        mode: "any",
        type: "boolean"
      },
      crlf: {
        api: "any",
        default: false,
        definition: "If line termination should be Windows (CRLF) format.  Unix (LF) format is the de" +
          "fault.",
        label: "Line Termination",
        lexer: "any",
        mode: "any",
        type: "boolean"
      },
      css_insert_lines: {
        api: "any",
        default: false,
        definition: "Inserts new line characters between every CSS code block.",
        label: "Insert Empty Lines",
        lexer: "style",
        mode: "beautify",
        type: "boolean"
      },
      diff: {
        api: "any",
        default: "",
        definition: "The code sample to be compared to 'source' option.  This is required if mode is " +
          "'" + "diff'.",
        label: "Code to Compare",
        lexer: "any",
        mode: "diff",
        type: "string"
      },
      diff_comments: {
        api: "any",
        default: false,
        definition: "If true then comments will be preserved so that both code and comments are compa" +
          "red by the diff engine.",
        label: "Code Comments",
        lexer: "any",
        mode: "diff",
        type: "boolean"
      },
      diff_context: {
        api: "any",
        default: -1,
        definition: "This shortens the diff output by allowing a specified number of equivalent lines" +
          " between each line of difference.  This option is only used with diff_format:htm" +
          "l.",
        label: "Context Size",
        lexer: "any",
        mode: "diff",
        type: "number"
      },
      diff_format: {
        api: "any",
        default: "text",
        definition: "The format of the output.  The command line output format is text, similar to Un" +
          "ix 'diff'.",
        label: "Diff Format",
        lexer: "any",
        mode: "diff",
        type: "string",
        values: {
          "html": "An HTML format for embedding in web pages, or as a complete web page if document" +
            "_complete is true.",
          "json": "A JSON format.",
          "text": "Formatted similar to the Unix 'diff' command line utility."
        }
      },
      diff_label: {
        api: "any",
        default: "New Sample",
        definition: "This allows for a descriptive label for the diff file code of the diff HTML outp" +
          "ut.",
        label: "Label for Diff Sample",
        lexer: "any",
        mode: "diff",
        type: "string"
      },
      diff_rendered_html: {
        api: "any",
        default: false,
        definition: "Compares complete HTML documents and injects custom CSS so that the differences display not in the code, but in the rendered page in a browser.  This option is currently confined only to markup languages, read_method file, and mode diff.  Option diff_format is ignored.",
        label: "Compare Rendered HTML",
        lexer: "markup",
        mode: "diff",
        type: "boolean"
      },
      diff_space_ignore: {
        api: "any",
        default: false,
        definition: "If white space only differences should be ignored by the diff tool.",
        label: "Remove White Space",
        lexer: "any",
        mode: "diff",
        type: "boolean"
      },
      diff_view: {
        api: "any",
        default: "sidebyside",
        definition: "This determines whether the diff HTML output should display as a side-by-side co" +
          "mparison or if the differences should display in a single table column.",
        label: "Diff View Type",
        lexer: "any",
        mode: "diff",
        type: "string",
        values: {
          "inline": "A single column where insertions and deletions are vertically adjacent.",
          "sidebyside": "Two column comparison of changes."
        }
      },
      else_line: {
        api: "any",
        default: false,
        definition: "If else_line is true then the keyword 'else' is forced onto a new line.",
        label: "Else On New Line",
        lexer: "script",
        mode: "beautify",
        type: "boolean"
      },
      end_comma: {
        api: "any",
        default: "never",
        definition: "If there should be a trailing comma in arrays and objects. Value \"multiline\" o" +
          "nly applies to modes beautify and diff.",
        label: "Trailing Comma",
        lexer: "script",
        mode: "beautify",
        type: "string",
        values: {
          "always": "Always ensure there is a tailing comma",
          "never": "Remove trailing commas",
          "none": "Ignore this option"
        }
      },
      end_quietly: {
        api: "node",
        default: "default",
        definition: "A node only option to determine if terminal summary data should be logged to the" +
          " console.",
        label: "Log Summary to Console",
        lexer: "any",
        mode: "any",
        type: "string",
        values: {
          "default": "Default minimal summary",
          "log": "Verbose logging",
          "quiet": "No extraneous logging"
        }
      },
      force_attribute: {
        api: "any",
        default: false,
        definition: "If all markup attributes should be indented each onto their own line.",
        label: "Force Indentation of All Attributes",
        lexer: "markup",
        mode: "beautify",
        type: "boolean"
      },
      force_indent: {
        api: "any",
        default: false,
        definition: "Will force indentation upon all content and tags without regard for the creation" +
          " of new text nodes.",
        label: "Force Indentation of All Content",
        lexer: "markup",
        mode: "beautify",
        type: "boolean"
      },
      format_array: {
        api: "any",
        default: "default",
        definition: "Determines if all array indexes should be indented, never indented, or left to t" +
          "he default.",
        label: "Formatting Arrays",
        lexer: "script",
        mode: "beautify",
        type: "string",
        values: {
          "default": "Default formatting",
          "indent": "Always indent each index of an array",
          "inline": "Ensure all array indexes appear on a single line"
        }
      },
      format_object: {
        api: "any",
        default: "default",
        definition: "Determines if all object keys should be indented, never indented, or left to the" +
          " default.",
        label: "Formatting Objects",
        lexer: "script",
        mode: "beautify",
        type: "string",
        values: {
          "default": "Default formatting",
          "indent": "Always indent each key/value pair",
          "inline": "Ensure all key/value pairs appear on the same single line"
        }
      },
      function_name: {
        api: "any",
        default: false,
        definition: "If a space should follow a JavaScript function name.",
        label: "Space After Function Name",
        lexer: "script",
        mode: "beautify",
        type: "boolean"
      },
      help: {
        api: "node",
        default: 80,
        definition: "A node only option to print documentation to the console. The value determines w" +
          "here to wrap text.",
        label: "Help Wrapping Limit",
        lexer: "any",
        mode: "any",
        type: "number"
      },
      indent_char: {
        api: "any",
        default: " ",
        definition: "The string characters to comprise a single indentation. Any string combination i" +
          "s accepted.",
        label: "Indentation Characters",
        lexer: "any",
        mode: "beautify",
        type: "string"
      },
      indent_level: {
        api: "any",
        default: 0,
        definition: "How much indentation padding should be applied to beautification? This option is" +
          " internally used for code that requires switching between libraries.",
        label: "Indentation Padding",
        lexer: "any",
        mode: "beautify",
        type: "number"
      },
      indent_size: {
        api: "any",
        default: 4,
        definition: "The number of 'indent_char' values to comprise a single indentation.",
        label: "Indent Size",
        lexer: "any",
        mode: "beautify",
        type: "number"
      },
      jsscope: {
        api: "any",
        default: "none",
        definition: "An educational tool to generate HTML output of JavaScript code to identify scope" +
          " regions and declared references by color.  This option is ignored unless the code language is JavaScript or TypeScript.",
        label: "JavaScript Scope Identification",
        lexer: "script",
        mode: "beautify",
        type: "string",
        values: {
          html: "generates HTML output with escaped angle braces and ampersands for embedding as " +
            "code, which is handy in code producing tools",
          none: "prevents use of this option",
          report: "generates HTML output that renders in web browsers"
        }
      },
      language: {
        api: "any",
        default: "auto",
        definition: "The lowercase single word common name of the source code's programming language. The value 'auto' imposes language and lexer auto-detection, which ignores deliberately specified lexer values. The value 'text' is converted to 'auto' if options 'mode' is not 'diff'. Value 'text' allows literal comparisons.",
        label: "Language",
        lexer: "any",
        mode: "any",
        type: "string"
      },
      language_default: {
        api: "any",
        default: "text",
        definition: "The fallback option if option 'lang' is set to 'auto' and a language cannot be d" +
          "etected.",
        label: "Language Auto-Detection Default",
        lexer: "any",
        mode: "any",
        type: "string"
      },
      language_name: {
        api: "any",
        default: "JavaScript",
        definition: "The formatted proper name of the code sample's language for use in reports read " +
          "by people.",
        label: "Formatted Name of the Code's Language",
        lexer: "any",
        mode: "any",
        type: "string"
      },
      lexer: {
        api: "any",
        default: "auto",
        definition: "This option determines which sets of rules to use in the language parser. If opt" +
          "ion 'language' has a value of 'auto', which is the default value, this option is" +
          " ignored. The value 'text' is converted to 'auto' if options 'mode' is not 'diff'. Value 'text' allows literal comparisons.",
        label: "Parsing Lexer",
        lexer: "any",
        mode: "any",
        type: "string",
        values: {
          auto: "The value 'auto' imposes language and lexer auto-detection, which ignores deliberately specified language values.",
          markup: "parses languages like XML and HTML",
          script: "parses languages with a C style syntax, such as JavaScript",
          style: "parses CSS like languages"
        }
      },
      list_options: {
        api: "node",
        default: false,
        definition: "A Node.js only option that writes current option settings to the console.",
        label: "Options List",
        lexer: "any",
        mode: "any",
        type: "boolean"
      },
      method_chain: {
        api: "any",
        default: 3,
        definition: "When to break consecutively chained methods and properties onto separate lines. " +
          "A negative value disables this option. A value of 0 ensures method chains are ne" +
          "ver broken.",
        label: "Method Chains",
        lexer: "script",
        mode: "beautify",
        type: "number"
      },
      minify_keep_comments: {
        api: "any",
        default: false,
        definition: "Prevents minification from stripping out comments.",
        label: "Keep Comments",
        lexer: "any",
        mode: "minify",
        type: "boolean"
      },
      minify_wrap: {
        api: "any",
        default: false,
        definition: "Whether minified script should wrap after a specified character width.  This opt" +
          "ion requires a value from option 'wrap'.",
        label: "Minification Wrapping",
        lexer: "script",
        mode: "minify",
        type: "boolean"
      },
      mode: {
        api: "any",
        default: "diff",
        definition: "The operation to be performed.",
        label: "Mode",
        lexer: "any",
        mode: "any",
        type: "string",
        values: {
          beautify: "beautifies code and returns a string",
          diff: "returns either command line list of differences or an HTML report",
          minify: "minifies code and returns a string",
          parse: "using option 'parseFormat' returns an object with shallow arrays, a multidimensi" +
            "onal array, or an HTML report"
        }
      },
      never_flatten: {
        api: "any",
        default: false,
        definition: "If destructured lists in script should never be flattend.",
        label: "Never Flatten Destructured Lists",
        lexer: "script",
        mode: "beautify",
        type: "boolean"
      },
      new_line: {
        api: "any",
        default: false,
        definition: "Insert an empty line at the end of output.",
        label: "New Line at End of Code",
        lexer: "any",
        mode: "any",
        type: "boolean"
      },
      no_case_indent: {
        api: "any",
        default: false,
        definition: "If a case statement should receive the same indentation as the containing switch" +
          " block.",
        label: "Case Indentation",
        lexer: "script",
        mode: "beautify",
        type: "boolean"
      },
      no_lead_zero: {
        api: "any",
        default: false,
        definition: "Whether leading 0s in CSS values immediately preceding a decimal should be remo" +
          "ved or prevented.",
        label: "Leading 0s",
        lexer: "style",
        mode: "any",
        type: "boolean"
      },
      no_semicolon: {
        api: "any",
        default: false,
        definition: "Removes semicolons that would be inserted by ASI. This option is in conflict with option 'correct' and takes precedence over conflicting features. Use of this option is a possible security/stability risk.",
        label: "No Semicolons",
        lexer: "script",
        mode: "beautify",
        type: "boolean"
      },
      node_error: {
        api: "node",
        default: false,
        definition: "A Node.js only option if parse errors should be written to the console.",
        label: "Write Parse Errors in Node",
        lexer: "any",
        mode: "any",
        type: "boolean"
      },
      object_sort: {
        api: "any",
        default: false,
        definition: "Sorts markup attributes and properties by key name in script and style.",
        label: "Object/Attribute Sort",
        lexer: "any",
        mode: "beautify",
        type: "boolean"
      },
      output: {
        api: "node",
        default: "",
        definition: "A file path for which to write output. If this option is not specified output will be printed to the shell.",
        label: "Output Location",
        lexer: "any",
        mode: "any",
        type: "string"
      },
      parse_format: {
        api: "any",
        default: "parallel",
        definition: "Determines the output format for 'parse' mode.",
        label: "Parse Format",
        lexer: "any",
        mode: "parse",
        type: "string",
        values: {
          htmltable: "generates the 'table' type output for the DOM but escapes the HTML tags for rend" +
            "ering as HTML code in a HTML tool",
          parallel: "returns an object containing series of parallel arrays",
          sequential: "returns an array where each index is a child object containing the parsed token" +
            " and all descriptive data",
          table: "generates a colorful grid of output for either the dom or command line interface"
        }
      },
      parse_space: {
        api: "any",
        default: false,
        definition: "Whether whitespace tokens should be included in markup parse output.",
        label: "Retain White Space Tokens in Parse Output",
        lexer: "markup",
        mode: "parse",
        type: "boolean"
      },
      preserve: {
        api: "any",
        default: 0,
        definition: "The maximum number of consecutive empty lines to retain.",
        label: "Preserve Consecutive New Lines",
        lexer: "any",
        mode: "beautify",
        type: "number"
      },
      preserve_comment: {
        api: "any",
        default: false,
        definition: "Prevent comment reformatting due to option wrap.",
        label: "Eliminate Word Wrap Upon Comments",
        lexer: "any",
        mode: "beautify",
        type: "boolean"
      },
      preserve_text: {
        api: "any",
        default: false,
        definition: "If text in the provided markup code should be preserved exactly as provided. Thi" +
          "s option eliminates beautification and wrapping of text content.",
        label: "Preserve Markup Text White Space",
        lexer: "markup",
        mode: "any",
        type: "boolean"
      },
      quote: {
        api: "any",
        default: false,
        definition: "If true and mode is 'diff' then all single quote characters will be replaced by " +
          "double quote characters in both the source and diff file input so as to eliminat" +
          "e some differences from the diff report HTML output.",
        label: "Normalize Quotes",
        lexer: "any",
        mode: "diff",
        type: "boolean"
      },
      quote_convert: {
        api: "any",
        default: "none",
        definition: "If the quotes of script strings or markup attributes should be converted to sing" +
          "le quotes or double quotes.",
        label: "Indent Size",
        lexer: "any",
        mode: "any",
        type: "string",
        values: {
          "double": "Converts single quotes to double quotes",
          "none": "Ignores this option",
          "single": "Converts double quotes to single quotes"
        }
      },
      read_method: {
        api: "node",
        default: "auto",
        definition: "The option determines how Node.js should receive input.  All output will be prin" +
          "ted to the shell unless the option 'output' is specified, which will write outpu" +
          "t to a file.",
        label: "Read Method",
        lexer: "any",
        mode: "any",
        type: "string",
        values: {
          auto: "changes to value subdirectory, file, or screen depending on source resolution",
          directory: "process all files in the specified directory only",
          file: "reads a file and outputs to a file.  file requires option 'output'",
          screen: "reads from screen and outputs to screen",
          subdirectory: "process all files in a directory and its subdirectories"
        }
      },
      selector_list: {
        api: "any",
        default: false,
        definition: "If comma separated CSS selectors should present on a single line of code.",
        label: "Indent Size",
        lexer: "style",
        mode: "beautify",
        type: "boolean"
      },
      semicolon: {
        api: "any",
        default: false,
        definition: "If true and mode is 'diff' and lang is 'javascript' all semicolon characters tha" +
          "t immediately precede any white space containing a new line character will be re" +
          "moved so as to eliminate some differences from the code comparison.",
        label: "Indent Size",
        lexer: "script",
        mode: "diff",
        type: "boolean"
      },
      source: {
        api: "any",
        default: "",
        definition: "The source code or location for interpretation. This option is required for all " +
          "modes.",
        label: "Source Sample",
        lexer: "any",
        mode: "any",
        type: "string"
      },
      source_label: {
        api: "any",
        default: "Source Sample",
        definition: "This allows for a descriptive label of the source file code for the diff HTML o" +
          "utput.",
        label: "Label for Source Sample",
        lexer: "any",
        mode: "diff",
        type: "string"
      },
      space: {
        api: "any",
        default: true,
        definition: "Inserts a space following the function keyword for anonymous functions.",
        label: "Function Space",
        lexer: "script",
        mode: "beautify",
        type: "boolean"
      },
      space_close: {
        api: "any",
        default: false,
        definition: "Markup self-closing tags end will end with ' />' instead of '/>'.",
        label: "Close Markup Self-Closing Tags with a Space",
        lexer: "markup",
        mode: "beautify",
        type: "boolean"
      },
      styleguide: {
        api: "any",
        default: "none",
        definition: "Provides a collection of option presets to easily conform to popular JavaScript " +
          "style guides.",
        label: "Script Styleguide",
        lexer: "script",
        mode: "beautify",
        type: "string",
        values: {
          "airbnb": "https://github.com/airbnb/javascript",
          "crockford": "http://jslint.com/",
          "google": "https://google.github.io/styleguide/jsguide.html",
          "jquery": "https://contribute.jquery.org/style-guide/js/",
          "jslint": "http://jslint.com/",
          "mediawiki": "https://www.mediawiki.org/wiki/Manual:Coding_conventions/JavaScript",
          "mrdoob": "https://github.com/mrdoob/three.js/wiki/Mr.doob's-Code-Style%E2%84%A2",
          "none": "Ignores this option",
          "semistandard": "https://github.com/Flet/semistandard",
          "standard": "https://standardjs.com/",
          "yandex": "https://github.com/ymaps/codestyle/blob/master/javascript.md"
        }
      },
      summary_only: {
        api: "node",
        default: false,
        definition: "Node only option to output only number of differences.",
        label: "Output Diff Only Without A Summary",
        lexer: "any",
        mode: "diff",
        type: "boolean"
      },
      tag_merge: {
        api: "any",
        default: false,
        definition: "Allows immediately adjacement start and end markup tags of the same name to be c" +
          "ombined into a single self-closing tag.",
        label: "Merge Adjacent Start and End tags",
        lexer: "markup",
        mode: "any",
        type: "boolean"
      },
      tag_sort: {
        api: "any",
        default: false,
        definition: "Sort child items of each respective markup parent element.",
        label: "Sort Markup Child Items",
        lexer: "markup",
        mode: "any",
        type: "boolean"
      },
      ternary_line: {
        api: "any",
        default: false,
        definition: "If ternary operators in JavaScript ? and : should remain on the same line.",
        label: "Keep Ternary Statements On One Line",
        lexer: "script",
        mode: "beautify",
        type: "boolean"
      },
      top_comments: {
        api: "any",
        default: false,
        definition: "If mode is 'minify' this determines whether comments above the first line of cod" +
          "e should be kept.",
        label: "Retain Comment At Code Start",
        lexer: "any",
        mode: "minify",
        type: "boolean"
      },
      unformatted: {
        api: "any",
        default: false,
        definition: "If markup tags should have their insides preserved. This option is only available to markup and does not support child tokens that require a different lexer.",
        label: "Markup Tag Preservation",
        lexer: "markup",
        mode: "any",
        type: "boolean"
      },
      variable_list: {
        api: "any",
        default: "none",
        definition: "If consecutive JavaScript variables should be merged into a comma separated list" +
          " or if variables in a list should be separated.",
        label: "Variable Declaration Lists",
        lexer: "script",
        mode: "any",
        type: "string",
        values: {
          "each": "Ensurce each reference is a single declaration statement.",
          "list": "Ensure consecutive declarations are a comma separated list.",
          "none": "Ignores this option."
        }
      },
      version: {
        api: "node",
        default: false,
        definition: "A Node.js only option to write the version information to the console.",
        label: "Version",
        lexer: "any",
        mode: "any",
        type: "boolean"
      },
      vertical: {
        api: "any",
        default: false,
        definition: "If lists of assignments and properties should be vertically aligned. This option" +
          " is not used with the markup lexer.",
        label: "Vertical Alignment",
        lexer: "any",
        mode: "beautify",
        type: "boolean"
      },
      wrap: {
        api: "any",
        default: 0,
        definition: "Character width limit before applying word wrap. A 0 value disables this option." +
          " A negative value concatenates script strings.",
        label: "Wrap",
        lexer: "any",
        mode: "any",
        type: "number"
      }
    };
    prettydiff.api
      .optionDef = optionDef;
  }());
  (function beautify_markup_init() {
    const markup = function beautify_markup(options) {
      const data = options.parsed,
        lexer = "markup",
        c = (prettydiff.end < 1 || prettydiff.end > data.token.length) ?
        data.token.length :
        prettydiff.end + 1,
        lf = (options.crlf === true) ?
        "\r\n" :
        "\n",
        externalIndex = {},
        levels = (function beautify_markup_levels() {
          const level = (prettydiff.start > 0) ?
            Array(prettydiff.start).fill(0, 0, prettydiff.start) :
            [],
            nextIndex = function beautify_markup_levels_next() {
              let x = a + 1,
                y = 0;
              if (data.types[x] === undefined) {
                return x - 1;
              }
              if (data.types[x] === "comment" || (a < c - 1 && data.types[x].indexOf("attribute") > -1)) {
                do {
                  if (data.types[x] === "jsx_attribute_start") {
                    y = x;
                    do {
                      if (data.types[x] === "jsx_attribute_end" && data.begin[x] === y) {
                        break;
                      }
                      x = x + 1;
                    } while (x < c);
                  } else if (data.types[x] !== "comment" && data.types[x].indexOf("attribute") < 0) {
                    return x;
                  }
                  x = x + 1;
                } while (x < c);
              }
              return x;
            },
            anchorList = function beautify_markup_levels_anchorList() {
              let aa = a;
              const stop = data.begin[a];
              // verify list is only a link list before making changes
              do {
                aa = aa - 1;
                if (data.token[aa] === "</li>" && data.begin[data.begin[aa]] === stop && data.token[aa - 1] === "</a>" && data.begin[aa - 1] === data.begin[aa] + 1) {
                  aa = data.begin[aa];
                } else {
                  return;
                }
              } while (aa > stop + 1);
              // now make the changes
              aa = a;
              do {
                aa = aa - 1;
                if (data.types[aa + 1] === "attribute") {
                  level[aa] = -10;
                } else if (data.token[aa] !== "</li>") {
                  level[aa] = -20;
                }
              } while (aa > stop + 1);
            },
            comment = function beautify_markup_levels_comment() {
              let x = a,
                test = false;
              if (data.lines[a + 1] === 0 && options.force_indent === false) {
                do {
                  if (data.lines[x] > 0) {
                    test = true;
                    break;
                  }
                  x = x - 1;
                } while (x > comstart);
                x = a;
              } else {
                test = true;
              }
              // the first condition applies indentation while the else block does not
              if (test === true) {
                let ind = (data.types[next] === "end" || data.types[next] === "template_end") ?
                  indent + 1 :
                  indent;
                do {
                  level.push(ind);
                  x = x - 1;
                } while (x > comstart);
                // correction so that a following end tag is not indented 1 too much
                if (ind === indent + 1) {
                  level[a] = indent;
                }
                // indentation must be applied to the tag preceeding the comment
                if (data.types[x] === "attribute" || data.types[x] === "template_attribute" || data.types[x] === "jsx_attribute_start") {
                  level[data.begin[x]] = ind;
                } else {
                  level[x] = ind;
                }
              } else {
                do {
                  level.push(-20);
                  x = x - 1;
                } while (x > comstart);
                level[x] = -20;
              }
              comstart = -1;
            },
            content = function beautify_markup_levels_content() {
              let ind = indent;
              if (options.force_indent === true || options.force_attribute === true) {
                level.push(indent);
                return;
              }
              if (next < c && (data.types[next].indexOf("end") > -1 || data.types[next].indexOf("start") > -1) && data.lines[next] > 0) {
                level.push(indent);
                ind = ind + 1;
                if (data.types[a] === "singleton" && a > 0 && data.types[a - 1].indexOf("attribute") > -1 && data.types[data.begin[a - 1]] === "singleton") {
                  if (data.begin[a] < 0 || (data.types[data.begin[a - 1]] === "singleton" && data.begin[data.ender[a] - 1] !== a)) {
                    level[a - 1] = indent;
                  } else {
                    level[a - 1] = indent + 1;
                  }
                }
              } else if (data.types[a] === "singleton" && a > 0 && data.types[a - 1].indexOf("attribute") > -1) {
                level[a - 1] = indent;
                count = data.token[a].length;
                level.push(-10);
              } else if (data.lines[next] === 0) {
                level.push(-20);
              } else if (
                // wrap if
                // * options.wrap is 0
                // * next token is singleton with an attribute and exceeds wrap
                // * next token is template or singleton and exceeds wrap
                (options.wrap === 0 ||
                  (a < c - 2 && data.token[a].length + data.token[a + 1].length + data.token[a + 2].length + 1 > options.wrap && data.types[a + 2].indexOf("attribute") > -1) ||
                  (data.token[a].length + data.token[a + 1].length > options.wrap)) &&
                (data.types[a + 1] === "singleton" || data.types[a + 1] === "template")) {
                level.push(indent);
              } else {
                count = count + 1;
                level.push(-10);
              }
              if (a > 0 && data.types[a - 1].indexOf("attribute") > -1 && data.lines[a] < 1) {
                level[a - 1] = -20;
              }
              if (count > options.wrap) {
                let d = a,
                  e = Math.max(data.begin[a], 0);
                if (data.types[a] === "content" && options.preserve_text === false) {
                  let countx = 0,
                    chars = data.token[a].replace(/\s+/g, " ").split(" ");
                  do {
                    d = d - 1;
                    if (level[d] < 0) {
                      countx = countx + data.token[d].length;
                      if (level[d] === -10) {
                        countx = countx + 1;
                      }
                    } else {
                      break;
                    }
                  } while (d > 0);
                  d = 0;
                  e = chars.length;
                  do {
                    if (chars[d].length + countx > options.wrap) {
                      chars[d] = lf + chars[d];
                      countx = chars[d].length;
                    } else {
                      chars[d] = ` ${chars[d]}`;
                      countx = countx + chars[d].length;
                    }
                    d = d + 1;
                  } while (d < e);
                  if (chars[0].charAt(0) === " ") {
                    data.token[a] = chars.join("").slice(1);
                  } else {
                    level[a - 1] = ind;
                    data.token[a] = chars.join("").replace(lf, "");
                  }
                  if (data.token[a].indexOf(lf) > 0) {
                    count = data.token[a].length - data.token[a].lastIndexOf(lf);
                  }
                } else {
                  do {
                    d = d - 1;
                    if (level[d] > -1) {
                      count = data.token[a].length;
                      if (data.lines[a + 1] > 0) {
                        count = count + 1;
                      }
                      return;
                    }
                    if (data.types[d].indexOf("start") > -1) {
                      count = 0;
                      return;
                    }
                    if ((data.types[d] !== "attribute" || (data.types[d] === "attribute" && data.types[d + 1] !== "attribute")) && data.lines[d + 1] > 0) {
                      if (data.types[d] !== "singleton" || (data.types[d] === "singleton" && data.types[d + 1] !== "attribute")) {
                        count = data.token[a].length;
                        if (data.lines[a + 1] > 0) {
                          count = count + 1;
                        }
                        break;
                      }
                    }
                  } while (d > e);
                  level[d] = ind;
                }
              }
            },
            external = function beautify_markup_levels_external() {
              let skip = a;
              do {
                if (data.lexer[a + 1] === lexer && data.begin[a + 1] < skip && data.types[a + 1] !== "start" && data.types[a + 1] !== "singleton") {
                  break;
                }
                level.push(0);
                a = a + 1;
              } while (a < c);
              externalIndex[skip] = a;
              level.push(indent - 1);
              next = nextIndex();
              if (data.lexer[next] === lexer && data.stack[a].indexOf("attribute") < 0 && (data.types[next] === "end" || data.types[next] === "template_end")) {
                indent = indent - 1;
              }
            },
            attribute = function beautify_markup_levels_attribute() {
              const parent = a - 1,
                wrap = function beautify_markup_levels_attribute_wrap(index) {
                  const item = data.token[index].replace(/\s+/g, " ").split(" "),
                    ilen = item.length;
                  let bb = 1,
                    acount = item[0].length;
                  if ((/=("|')?(<|(\{(\{|%|#|@|!|\?|^))|(\[%))/).test(data.token[index]) === true) {
                    return;
                  }
                  do {
                    if (acount + item[bb].length > options.wrap) {
                      acount = item[bb].length;
                      item[bb] = lf + item[bb];
                    } else {
                      item[bb] = ` ${item[bb]}`;
                      acount = acount + item[bb].length;
                    }
                    bb = bb + 1;
                  } while (bb < ilen);
                  data.token[index] = item.join("");
                };

              let y = a,
                len = data.token[parent].length + 1,
                plural = false,
                lev = (function beautify_markup_levels_attribute_level() {

                  if (data.types[a].indexOf("start") > 0) {
                    let x = a;
                    do {
                      if (data.types[x].indexOf("end") > 0 && data.begin[x] === a) {
                        if (x < c - 1 && data.types[x + 1].indexOf("attribute") > -1) {
                          plural = true;
                          break;
                        }
                      }
                      x = x + 1;
                    } while (x < c);
                  } else if (a < c - 1 && data.types[a + 1].indexOf("attribute") > -1) {
                    plural = true;
                  }
                  if (data.types[next] === "end" || data.types[next] === "template_end") {
                    if (data.types[parent] === "singleton") {
                      return indent + 2;
                    }
                    return indent + 1;
                  }
                  if (data.types[parent] === "singleton") {
                    return indent + 1;
                  }
                  return indent;
                }()),
                earlyexit = false,
                attStart = false;
              if (plural === false && data.types[a] === "comment_attribute") {
                // lev must be indent unless the "next" type is end then its indent + 1
                level.push(indent);
                if (data.types[parent] === "singleton") {
                  level[parent] = indent + 1;
                } else {
                  level[parent] = indent;
                }
                return;
              }
              if (lev < 1) {
                lev = 1;
              }

              // first, set levels and determine if there are template attributes
              do {

                count = count + data.token[a].length + 1;

                if (data.types[a].indexOf("attribute") > 0) {


                   if (data.types[a] === "comment_attribute") {
                    level.push(lev);
                  } else if (data.types[a].indexOf("start") > 0) {
                    attStart = true;
                    if (a < c - 2 && data.types[a + 2].indexOf("attribute") > 0) {
                      level.push(-20);
                      a = a + 1;
                      externalIndex[a] = a;
                    } else {
                      if (parent === a - 1 && plural === false) {
                        level.push(lev);
                      } else {
                        level.push(lev + 1);
                      }
                      if (data.lexer[a + 1] !== lexer) {
                        a = a + 1;
                        external();
                      }
                    }
                  } else if (data.types[a].indexOf("end") > 0) {
                    if (level[a - 1] !== -20) {
                      level[a - 1] = level[data.begin[a]] - 1;
                    }
                    if (data.lexer[a + 1] !== lexer) {
                      level.push(-20);
                    } else {
                      level.push(lev);
                    }
                  } else {
                    level.push(lev);
                  }

                  earlyexit = true;

                } else if (data.types[a] === "attribute") {

                  len = len + data.token[a].length + 1;


                  //const outputDelim = /{{-?\s*/

                   // start delim
                  const startDelim = /{%-?\s*/

                  // end delim
                  const endDelim = /{%-?\s*end/

                  // any delim
                  const anyDelim = /{%-?\s*(?:end)?/


                  // HOT FIX
                  // align liquid attribute pairs
                  // when we have an end tag, we will keep them on the same line
                  if (options.unformatted === true) {

                    level.push(-10);

                  } else if (

                    //
                    // This will satisfy an {% else %} tag block,
                    // ensuring newlines when multiple attrs detected, eg:
                    //
                    // <div {% if x %} id="foo" class="bar" {% else %} attr {% endif %}

                    startDelim.test(data.token[a])

                  ) {

                    level.push(lev);


                    let ia = a
                    let ca = 0

                    // We will keep walking until we hit
                    // start tag liquid attribute, forcing newlines
                    // on all contained attributes.
                    while (ia-- && data.types[ia] === 'attribute') {

                      if (endDelim.test(data.token[ia])) {
                        ca = 0
                        break;
                      }

                      if (startDelim.test(data.token[ia])) {
                        if (ca === 1) ca = 0
                        break
                      }

                      if (!anyDelim.test(data.token[ia])) ca++

                    }

                    if(ca > 0) {

                      ia = a

                      while (ia--) {

                        if(ca === 0) break;

                        level[ia - 1] = lev
                        console.log(data.token[ia])

                        ca--

                      }

                    }

                    // If a liquid tag has been expressed as an
                    // attribute value outside of the quotation
                    // characters, we will always enforce alignments
                    // and prevent forced attributes
                   if(/={%\s*/.test(data.token[a - 1])) {
                     level[a - 1] = -10
                     level.push(-10)
                   }


                  } else if (

                    // We has a HTML attribute, we will force this
                    // to newline as long as it is not contained
                    // within Liquid pairs
                    //
                    // <div {% if x %} id="foo" {% endif %} class="bar"
                    //
                    // Where class="bar" will be forced onto newline
                    //
                    data.types[a] === 'attribute' &&
                    data.types[a - 1] === 'attribute' && (
                      (
                        anyDelim.test(data.token[a]) === false &&
                        anyDelim.test(data.token[a - 1]) === false
                      ) || (
                        endDelim.test(data.token[a - 1]) === true
                      )
                    )
                  ) {

                    level[a - 1] = lev
                    level.push(lev)

                  } else if(

                    // We have multiple attributes nested within
                    // a tag pair, when more than 1 html attribute
                    // we apply force ammendment, eg:
                    //
                    // <div {% if x %} id="foo" class="bar" {% endif %}
                    //
                    // We are currently within a {% end %} tag, so
                    // we will check 2 levels up, if the both levels
                    // are HTML attributes, we apply the force.

                    data.types[a] === 'attribute' &&
                    data.types[a - 1] === 'attribute' &&
                    data.types[a - 2] === 'attribute' &&
                    anyDelim.test(data.token[a - 1]) === false &&
                    anyDelim.test(data.token[a - 2]) === false && (
                      endDelim.test(data.token[a]) === true
                    )
                  ) {

                    let ia = a

                    // We will keep walking until we hit
                    // start tag liquid attribute, forcing newlines
                    // on all contained attributes.
                    while (ia-- && data.types[ia] === 'attribute') {
                      if(startDelim.test(data.token[ia])) {
                        level[ia] = lev
                        break
                      }
                    }

                    level.push(lev);

                  } else if (

                    // We have a single HTML attribute nested
                    // within a tag pair, when such is detected
                    // we allow and enforce inline attributes
                    //
                    // <div {% if x %} id="foo" {% endif %}
                    //
                    // We are currently within a {% end %} tag, so
                    // we will check 1 levels up and it should return
                    // a liquid tag
                    data.types[a] === 'attribute' &&
                    data.types[a - 1] === 'attribute' &&
                    data.types[a - 2] === 'attribute' &&
                    startDelim.test(data.token[a - 2]) === true &&
                    anyDelim.test(data.token[a - 1]) === false &&
                    endDelim.test(data.token[a]) === true
                  ) {

                    level[a - 1] = -10;
                    level.push(-10)

                  } else if (
                    options.force_attribute === true ||
                    attStart === true || (
                      a < c - 1 &&
                      data.types[a + 1] !== "template_attribute" &&
                      data.types[a + 1].indexOf("attribute") > 0
                    )
                  ) {


                    // HTML attribute within a Liquid tag contained in attribute
                    // It must be the 2nd attribute.
                    // eg: <div {% if foo %} data-attr="bar"
                    if(
                      (
                        data.types[a] === 'attribute' &&
                        data.types[a - 1] === 'attribute' &&
                        startDelim.test(data.token[a - 1]) === true
                      )
                    ) {

                      // Move the Liquid attribute inline
                      level[a - 1] = -10

                      // Move the html attribute inline
                      level.push(-10);

                    } else {

                      level.push(lev);

                    }

                  } else {

                    level.push(-10);

                  }


                } else if (data.begin[a] < parent + 1) {

                  break;

                }

                a = a + 1;

              } while (a < c);

              a = a - 1;

              if (
                level[a - 1] > 0 &&
                data.types[a].indexOf("end") > 0 &&
                data.types[a].indexOf("attribute") > 0 &&
                data.types[parent] !== "singleton" &&
                plural === true
              ) {

                level[a - 1] = level[a - 1] - 1;

              }

              if (level[a] !== -20) {

                if (
                  options.language === "jsx" &&
                  data.types[parent].indexOf("start") > -1 &&
                  data.types[a + 1] === "script_start"
                ) {
                  level[a] = lev;
                } else {
                  level[a] = level[parent];
                }
              }
              if (options.force_attribute === true) {

                // only force attributes when more than 1 exists or
                // it exceeds wrap
                if (
                  data.types[a - 1].indexOf("start") > -1 || (
                  len < options.wrap &&
                  options.wrap < 0
                )) {

                  level[parent] = -10;

                } else {

                  count = 0;
                  level[parent] = lev;
                  level[a] = lev;

                }
              } else {
                level[parent] = -10;
              }

              y = a;

              // second, ensure tag contains more than one attribute

              if (y > parent + 1) {

                // finally, indent attributes if tag length exceeds the wrap limit
                if (options.space_close === false) {
                  len = len - 1;
                }

                if (
                  len > options.wrap &&
                  options.wrap > 0 &&
                  options.force_attribute === false
                ) {

                  count = data.token[a].length;

                  do {
                    if (data.token[y].length > options.wrap && (/\s/).test(data.token[y]) === true) {
                      wrap(y);
                    }
                    y = y - 1;
                    level[y] = lev;
                  } while (y > parent);

                }
              } else if (

                data.types[a] === "attribute"  &&
                options.wrap > 0 &&
                data.token[a].length > options.wrap &&
                (/\s/).test(data.token[a]) === true
              ) {
                wrap(a);
              }

            };
          let a = prettydiff.start,
            comstart = -1,
            next = 0,
            count = 0,
            indent = (isNaN(options.indent_level) === true) ?
            0 :
            Number(options.indent_level);
          // data.lines -> space before token
          // level -> space after token
          do {
            if (data.lexer[a] === lexer) {
              if (data.token[a].toLowerCase().indexOf("<!doctype") === 0) {
                level[a - 1] = indent;
              }
              if (data.types[a].indexOf("attribute") > -1) {
                attribute();
              } else if (data.types[a] === "comment") {
                if (comstart < 0) {
                  comstart = a;
                }
                if (data.types[a + 1] !== "comment" || (a > 0 && data.types[a - 1].indexOf("end") > -1)) {
                  comment();
                }
              } else if (data.types[a] !== "comment") {
                next = nextIndex();
                if (data.types[next] === "end" || data.types[next] === "template_end") {
                  indent = indent - 1;
                  if (data.types[next] === "template_end" && data.types[data.begin[next] + 1] === "template_else") {
                    indent = indent - 1;
                  }
                  if (data.token[a] === "</ol>" || data.token[a] === "</ul>") {
                    anchorList();
                  }
                }
                if (data.types[a] === "script_end" && data.types[a + 1] === "end") {
                  if (data.lines[a + 1] < 1) {
                    level.push(-20);
                  } else {
                    level.push(-10);
                  }
                } else if ((options.force_indent === false || (options.force_indent === true && data.types[next] === "script_start")) && (data.types[a] === "content" || data.types[a] === "singleton" || data.types[a] === "template")) {
                  count = count + data.token[a].length;
                  if (data.lines[next] > 0 && data.types[next] === "script_start") {
                    level.push(-10);
                  } else if (options.wrap > 0 && (data.types[a].indexOf("template") < 0 || (next < c && data.types[a].indexOf("template") > -1 && data.types[next].indexOf("template") < 0))) {
                    content();
                  } else if (next < c && (data.types[next].indexOf("end") > -1 || data.types[next].indexOf("start") > -1) && (data.lines[next] > 0 || data.types[next].indexOf("template_") > -1)) {
                    level.push(indent);
                  } else if (data.lines[next] === 0) {
                    level.push(-20);
                  } else {
                    level.push(indent);
                  }
                } else if (data.types[a] === "start" || data.types[a] === "template_start") {
                  indent = indent + 1;
                  if (data.types[a] === "template_start" && data.types[a + 1] === "template_else") {
                    indent = indent + 1;
                  }
                  if (options.language === "jsx" && data.token[a + 1] === "{") {
                    if (data.lines[a + 1] === 0) {
                      level.push(-20);
                    } else {
                      level.push(-10);
                    }
                  } else if (data.types[a] === "start" && data.types[next] === "end") {
                    level.push(-20);
                  } else if (data.types[a] === "start" && data.types[next] === "script_start") {
                    level.push(-10);
                  } else if (options.force_indent === true) {
                    level.push(indent);
                  } else if (data.types[a] === "template_start" && data.types[next] === "template_end") {
                    level.push(-20);
                  } else if (data.lines[next] === 0 && (data.types[next] === "content" || data.types[next] === "singleton" || (data.types[a] === "start" && data.types[next] === "template"))) {
                    level.push(-20);
                  } else {
                    level.push(indent);
                  }
                } else if (options.force_indent === false && data.lines[next] === 0 && (data.types[next] === "content" || data.types[next] === "singleton")) {
                  level.push(-20);
                } else if (data.types[a + 2] === "script_end") {
                  level.push(-20);
                } else if (data.types[a] === "template_else") {
                  if (data.types[next] === "template_end") {
                    level[a - 1] = indent + 1;
                  } else {
                    level[a - 1] = indent - 1;
                  }
                  level.push(indent);
                } else {
                  level.push(indent);
                }
              }
              if (data.types[a] !== "content" && data.types[a] !== "singleton" && data.types[a] !== "template" && data.types[a] !== "attribute") {
                count = 0;
              }
            } else {
              count = 0;
              external();
            }
            a = a + 1;
          } while (a < c);
          return level;
        }());
      return (function beautify_markup_apply() {
        const build = [],
          ind = (function beautify_markup_apply_tab() {
            const indy = [options.indent_char],
              size = options.indent_size - 1;
            let aa = 0;
            if (aa < size) {
              do {
                indy.push(options.indent_char);
                aa = aa + 1;
              } while (aa < size);
            }
            return indy.join("");
          }()),
          // a new line character plus the correct amount of identation for the given line
          // of code
          nl = function beautify_markup_apply_nl(tabs) {
            const linesout = [],
              pres = options.preserve + 1,
              total = Math.min(data.lines[a + 1] - 1, pres);
            let index = 0;
            if (tabs < 0) {
              tabs = 0;
            }
            do {
              linesout.push(lf);
              index = index + 1;
            } while (index < total);
            if (tabs > 0) {
              index = 0;
              do {
                linesout.push(ind);
                index = index + 1;
              } while (index < tabs);
            }
            return linesout.join("");
          },
          multiline = function beautify_markup_apply_multiline() {
            const lines = data.token[a].split(lf),
              line = data.lines[a + 1],
              lev = (levels[a - 1] > -1) ?
              (data.types[a] === "attribute") ?
              levels[a - 1] + 1 :
              levels[a - 1] :
              (function beautify_markup_apply_multiline_lev() {
                let bb = a - 1,
                  start = (bb > -1 && data.types[bb].indexOf("start") > -1);
                if (levels[a] > -1 && data.types[a] === "attribute") {
                  return levels[a] + 1;
                }
                do {
                  bb = bb - 1;
                  if (levels[bb] > -1) {
                    if (data.types[a] === "content" && start === false) {
                      return levels[bb];
                    }
                    return levels[bb] + 1;
                  }
                  if (data.types[bb].indexOf("start") > -1) {
                    start = true;
                  }
                } while (bb > 0);
                return 1;
              }());
            let aa = 0,
              len = lines.length - 1;
            data.lines[a + 1] = 0;
            do {
              build.push(lines[aa]);
              build.push(nl(lev));
              aa = aa + 1;
            } while (aa < len);
            data.lines[a + 1] = line;
            build.push(lines[len]);
            if (levels[a] === -10) {
              build.push(" ");
            } else if (levels[a] > -1) {
              build.push(nl(levels[a]));
            }
          },
          attributeEnd = function beautify_markup_apply_attributeEnd() {
            const parent = data.token[a],
              regend = (/(\/|\?)?>$/),
              end = regend.exec(parent);
            let y = a + 1,
              space = (options.space_close === true && end !== null && end[0] === "/>") ?
              " " :
              "",
              jsx = false;
            if (end === null) {
              return;
            }
            data.token[a] = parent.replace(regend, "");
            do {
              if (data.types[y] === "jsx_attribute_end" && data.begin[data.begin[y]] === a) {
                jsx = false;
              } else if (data.begin[y] === a) {
                if (data.types[y] === "jsx_attribute_start") {
                  jsx = true;
                } else if (data.types[y].indexOf("attribute") < 0 && jsx === false) {
                  break;
                }
              } else if (jsx === false && (data.begin[y] < a || data.types[y].indexOf("attribute") < 0)) {
                break;
              }
              y = y + 1;
            } while (y < c);
            if (data.types[y - 1] === "comment_attribute") {
              space = nl(levels[y - 2] - 1);
            }
            data.token[y - 1] = data.token[y - 1] + space + end[0];
          };
        let a = prettydiff.start,
          external = "",
          lastLevel = options.indent_level;
        do {
          if (data.lexer[a] === lexer || prettydiff.beautify[data.lexer[a]] === undefined) {
            if ((data.types[a] === "start" || data.types[a] === "singleton" || data.types[a] === "xml" || data.types[a] === "sgml") && data.types[a].indexOf("attribute") < 0 && a < c - 1 && data.types[a + 1] !== undefined && data.types[a + 1].indexOf("attribute") > -1) {
              attributeEnd();
            }
            if (data.token[a] !== undefined && data.token[a].indexOf(lf) > 0 && ((data.types[a] === "content" && options.preserve_text === false) || data.types[a] === "comment" || data.types[a] === "attribute")) {
              multiline();
            } else {
              build.push(data.token[a]);
              if (levels[a] === -10 && a < c - 1) {
                build.push(" ");
              } else if (levels[a] > -1) {
                lastLevel = levels[a];
                build.push(nl(levels[a]));
              }
            }
          } else {
            if (externalIndex[a] === a && data.types[a] !== "reference") {
              build.push(data.token[a]);
            } else {
              prettydiff.end = externalIndex[a];
              options.indent_level = lastLevel;
              prettydiff.start = a;
              external = prettydiff.beautify[data.lexer[a]](options).replace(/\s+$/, "");
              build.push(external);
              if (levels[prettydiff.iterator] > -1 && externalIndex[a] > a) {
                build.push(nl(levels[prettydiff.iterator]));
              }
              a = prettydiff.iterator;
            }
          }
          a = a + 1;
        } while (a < c);
        prettydiff.iterator = c - 1;
        if (build[0] === lf || build[0] === " ") {
          build[0] = "";
        }
        return build.join("");
      }());
    };
    prettydiff.beautify.markup = markup;
  }());
  (function beautify_script_init() {
    const script = function beautify_script(options) {
      let scolon = 0,
        news = 0;
      const data = options.parsed,
        lexer = "script",
        scopes = prettydiff.scopes,
        b = (prettydiff.end < 1 || prettydiff.end > data.token.length) ?
        data.token.length :
        prettydiff.end + 1,
        externalIndex = {},
        // levels sets the white space value between the current token and the next token
        // * -20 value means no white space
        // * -10 means to separate with a space
        // * 0 and above is the number of indentation to insert
        levels = (function beautify_script_level() {
          let a = prettydiff.start, //will store the current level of indentation
            indent = (isNaN(options.indent_level) === true) ?
            0 :
            Number(options.indent_level),
            notcomment = false, // if in comments before any code
            lastlist = false, //remembers the list status of the most recently closed block
            ctype = "", //ctype stands for "current type"
            ctoke = "", //ctoke standa for "current token"
            ltype = data.types[0], //ltype stands for "last type"
            ltoke = data.token[0]; //ltype stands for "last token"
          const varindex = [-1], //index in current scope of last var, let, or const keyword
            list = [], //stores comma status of current block
            level = (prettydiff.start > 0) ?
            Array(prettydiff.start).fill(0, 0, prettydiff.start) :
            [],
            ternary = [], //used to identify ternary statments
            extraindent = [
              []
            ], //stores token indexes where extra indentation occurs from ternaries and broken method chains
            arrbreak = [], //array where a method break has occurred
            destruct = [], //attempt to identify object destructuring
            itemcount = [], //counts items in destructured lists
            assignlist = [false], //are you in a list right now?
            wordlist = [],
            count = [],
            comment = function beautify_script_level_comment() {
              destructfix(false, false);
              let ind = (options.comments === true) ?
                0 :
                indent;
              if (notcomment === false && (/\/\u002a\s*global\s/).test(data.token[a]) === true) {
                let globallist = data.token[a].replace(/\/\u002a\s*global\s+/, "").replace(/\s*\u002a\/$/, "").split(","),
                  aa = globallist.length;
                do {
                  aa = aa - 1;
                  globallist[aa] = globallist[aa].replace(/\s+/g, "");
                  if (globallist[aa] !== "") {
                    scopes.push([globallist[aa], -1]);
                  }
                } while (aa > 0);
              }
              if (data.types[a - 1] === "comment" || data.types[a + 1] === "comment") {
                level[a - 1] = ind;
              } else if (data.lines[a] < 2) {
                let aa = a + 1;
                if (data.types[aa] === "comment") {
                  do {
                    aa = aa + 1;
                  } while (aa < b && data.types[aa] === "comment");
                }
                if (a < b - 1 && data.stack[aa] !== "block" && (data.token[aa] === "{" || data.token[aa] === "x{")) {
                  let bb = scopes.length;
                  data.begin.splice(a, 0, data.begin[aa]);
                  data.ender.splice(a, 0, data.ender[aa]);
                  data.lexer.splice(a, 0, data.lexer[aa]);
                  data.lines.splice(a, 0, data.lines[aa]);
                  data.stack.splice(a, 0, data.stack[aa]);
                  data.token.splice(a, 0, data.token[aa]);
                  data.types.splice(a, 0, data.types[aa]);
                  if (bb > 0) {
                    do {
                      bb = bb - 1;
                      if (scopes[bb][1] === aa) {
                        scopes[bb][1] = a;
                      } else if (scopes[bb][1] < a) {
                        break;
                      }
                    } while (bb > 0);
                  }
                  aa = aa + 1;
                  data.begin.splice(aa, 1);
                  data.ender.splice(aa, 1);
                  data.lexer.splice(aa, 1);
                  data.lines.splice(aa, 1);
                  data.stack.splice(aa, 1);
                  data.token.splice(aa, 1);
                  data.types.splice(aa, 1);
                  bb = a + 1;
                  do {
                    data.begin[bb] = a;
                    data.stack[bb] = data.stack[aa];
                    bb = bb + 1;
                  } while (bb < aa);
                  bb = bb + 1;
                  do {
                    if (data.begin[bb] === data.begin[aa]) {
                      data.begin[bb] = a;
                      if (data.types[bb] === "end") {
                        break;
                      }
                    }
                    bb = bb + 1;
                  } while (bb < b - 1);
                  data.begin[aa] = a;
                  a = a - 1;
                } else {
                  level[a - 1] = -10;
                  if (data.stack[a] === "paren" || data.stack[a] === "method") {
                    level.push(indent + 2);
                  } else {
                    level.push(indent);
                  }
                  if (options.comment_line === true && level[a] > -1 && data.lines[a] < 3) {
                    data.lines[a] = 3;
                  }
                }
                if (data.types[a + 1] !== "comment") {
                  notcomment = true;
                }
                return;
              } else if (data.token[a - 1] === ",") {
                level[a - 1] = ind;
              } else if (ltoke === "=" && data.types[a - 1] !== "comment" && (/^(\/\*\*\s*@[a-z_]+\s)/).test(ctoke) === true) {
                level[a - 1] = -10;
              } else if (ltoke === "{" && data.types[a - 1] !== "comment" && data.lines[0] < 2) {
                level[a - 1] = -10;
              } else {
                level[a - 1] = ind;
              }
              if (data.types[a + 1] !== "comment") {
                notcomment = true;
              }
              if (data.token[data.begin[a]] === "(") {
                level.push(indent + 1);
              } else {
                level.push(indent);
              }
              if (options.comment_line === true && level[a] > -1 && data.lines[a] < 3) {
                data.lines[a] = 3;
              }
            },
            destructfix = function beautify_script_level_destructFix(listFix, override) {
              // listfix  - at the end of a list correct the containing list override - to
              // break arrays with more than 4 items into a vertical list
              let c = a - 1,
                d = (listFix === true) ?
                0 :
                1;
              const ei = (extraindent[extraindent.length - 1] === undefined) ?
                [] :
                extraindent[extraindent.length - 1],
                arrayCheck = (override === false && data.stack[a] === "array" && listFix === true && ctoke !== "[");
              if (destruct[destruct.length - 1] === false || (data.stack[a] === "array" && options.formatArray === "inline") || (data.stack[a] === "object" && options.format_object === "inline")) {
                return;
              }
              destruct[destruct.length - 1] = false;
              do {
                if (data.types[c] === "end") {
                  d = d + 1;
                } else if (data.types[c] === "start") {
                  d = d - 1;
                }
                if (data.stack[c] === "global") {
                  break;
                }
                if (d === 0) {
                  if (data.stack[a] === "class" || data.stack[a] === "map" || (arrayCheck === false && ((listFix === false && data.token[c] !== "(" && data.token[c] !== "x(") || (listFix === true && data.token[c] === ",")))) {
                    if (data.types[c + 1] === "template_start") {
                      if (data.lines[c] < 1) {
                        level[c] = -20;
                      } else {
                        level[c] = indent - 1;
                      }
                    } else if (ei.length > 0 && ei[ei.length - 1] > -1) {
                      level[c] = indent - 1;
                    } else {
                      level[c] = indent;
                    }
                  } else if (data.stack[a] === "array" && data.types[a] === "operator") {
                    if (data.token[c] === ",") {
                      level[c] = indent;
                    }
                    if (c === data.begin[a]) {
                      break;
                    }
                  }
                  if (listFix === false) {
                    break;
                  }
                }
                if (d < 0) {
                  if (data.types[c + 1] === "template_start" || data.types[c + 1] === "template_string_start") {
                    if (data.lines[c] < 1) {
                      level[c] = -20;
                    } else {
                      level[c] = indent - 1;
                    }
                  } else if (ei.length > 0 && ei[ei.length - 1] > -1) {
                    level[c] = indent - 1;
                  } else {
                    level[c] = indent;
                  }
                  break;
                }
                c = c - 1;
              } while (c > -1);
            },
            end = function beautify_script_level_end() {
              const ei = (extraindent[extraindent.length - 1] === undefined) ?
                [] :
                extraindent[extraindent.length - 1],
                markupList = function beautify_script_level_end_markupList() {
                  let aa = a,
                    markup = false;
                  const begin = data.begin[aa];
                  do {
                    aa = aa - 1;
                    if (data.lexer[aa] === "markup") {
                      markup = true;
                      break;
                    }
                    if (data.begin[aa] !== begin) {
                      aa = data.begin[aa];
                    }
                  } while (aa > begin);
                  if (markup === true) {
                    aa = a;
                    do {
                      aa = aa - 1;
                      if (data.begin[aa] !== begin) {
                        aa = data.begin[aa];
                      } else if (data.token[aa] === ",") {
                        level[aa] = indent + 1;
                      }
                    } while (aa > begin);
                    level[begin] = indent + 1;
                    level[a - 1] = indent;
                  } else {
                    level[a - 1] = -20;
                  }
                };
              if (ctoke === ")" && data.token[a + 1] === "." && ei[ei.length - 1] > -1 && data.token[ei[0]] !== ":") {
                let c = data.begin[a],
                  d = false,
                  e = false;
                do {
                  c = c - 1;
                } while (c > 0 && level[c] < -9);
                d = (level[c] === indent);
                c = a + 1;
                do {
                  c = c + 1;
                  if (data.token[c] === "{") {
                    e = true;
                    break;
                  }
                  if (data.begin[c] === data.begin[a + 1] && (data.types[c] === "separator" || data.types[c] === "end")) {
                    break;
                  }
                } while (c < b);
                if (d === false && e === true && extraindent.length > 1) {
                  extraindent[extraindent.length - 2].push(data.begin[a]);
                  indent = indent + 1;
                }
              }
              if (ltype !== "separator") {
                fixchain();
              }
              if (data.token[a + 1] === "," && (data.stack[a] === "object" || data.stack[a] === "array")) {
                destructfix(true, false);
              }
              if ((data.token[a + 1] === "}" || data.token[a + 1] === "]") && (data.stack[a] === "object" || data.stack[a] === "array") && data.token[data.begin[a] - 1] === ",") {
                destructfix(true, false);
              }
              if (data.stack[a] !== "attribute") {
                if (ctoke !== ")" && ctoke !== "x)" && (data.lexer[a - 1] !== "markup" || (data.lexer[a - 1] === "markup" && data.token[a - 2] !== "return"))) {
                  indent = indent - 1;
                }
                if (ctoke === "}" && data.stack[a] === "switch" && options.no_case_indent === false) {
                  indent = indent - 1;
                }
              }
              if (ctoke === "}" || ctoke === "x}") {
                if (data.types[a - 1] !== "comment" &&
                  ltoke !== "{" &&
                  ltoke !== "x{" &&
                  ltype !== "end" &&
                  ltype !== "string" &&
                  ltype !== "number" &&
                  ltype !== "separator" &&
                  ltoke !== "++" &&
                  ltoke !== "--" &&
                  (a < 2 || data.token[a - 2] !== ";" || data.token[a - 2] !== "x;" || ltoke === "break" || ltoke === "return")) {
                  let c = a - 1,
                    begin = data.begin[a],
                    assign = false,
                    listlen = list.length;
                  do {
                    if (data.begin[c] === begin) {
                      if (data.token[c] === "=" || data.token[c] === ";" || data.token[c] === "x;") {
                        assign = true;
                      }
                      if (data.token[c] === "." && level[c - 1] > -1) {
                        // setting destruct is necessary to prevent a rule below
                        destruct[destruct.length - 1] = false;
                        level[begin] = indent + 1;
                        level[a - 1] = indent;
                        break;
                      }
                      if (c > 0 && data.token[c] === "return" && (data.token[c - 1] === ")" || data.token[c - 1] === "x)" || data.token[c - 1] === "{" || data.token[c - 1] === "x{" || data.token[c - 1] === "}" || data.token[c - 1] === "x}" || data.token[c - 1] === ";" || data.token[c - 1] === "x;")) {
                        indent = indent - 1;
                        level[a - 1] = indent;
                        break;
                      }
                      if ((data.token[c] === ":" && ternary.length === 0) ||
                        (data.token[c] === "," && assign === false)) {
                        break;
                      }
                      if ((c === 0 || data.token[c - 1] === "{" || data.token[c - 1] === "x{") || data.token[c] === "for" || data.token[c] === "if" || data.token[c] === "do" || data.token[c] === "function" || data.token[c] === "while" || data.token[c] === "var" || data.token[c] === "let" || data.token[c] === "const" || data.token[c] === "with") {
                        if (list[listlen - 1] === false && listlen > 1 && (a === b - 1 || (data.token[a + 1] !== ")" && data.token[a + 1] !== "x)")) && data.stack[a] !== "object") {
                          indent = indent - 1;
                        }
                        break;
                      }
                    } else {
                      c = data.begin[c];
                    }
                    c = c - 1;
                  } while (c > begin);
                }
                varindex.pop();
              }
              if (options.brace_padding === false && ctoke !== "}" && ltype !== "markup") {
                level[a - 1] = -20;
              }
              if (options.brace_padding === true && ltype !== "start" && ltoke !== ";" && (level[data.begin[a]] < -9 || destruct[destruct.length - 1] === true)) {
                level[data.begin[a]] = -10;
                level[a - 1] = -10;
                level.push(-20);
              } else if (options.language === "qml") {
                if (ltype === "start" || ctoke === ")" || ctoke === "x)") {
                  level[a - 1] = -20;
                } else {
                  level[a - 1] = indent;
                }
                level.push(indent);
              } else if (data.stack[a] === "attribute") {
                level[a - 1] = -20;
                level.push(indent);
              } else if (data.stack[a] === "array" && (ei.length > 0 || arrbreak[arrbreak.length - 1] === true)) {
                endExtraInd();
                destruct[destruct.length - 1] = false;
                level[data.begin[a]] = indent + 1;
                level[a - 1] = indent;
                level.push(-20);
              } else if ((data.stack[a] === "object" || (data.begin[a] === 0 && ctoke === "}")) && ei.length > 0) {
                endExtraInd();
                destruct[destruct.length - 1] = false;
                level[data.begin[a]] = indent + 1;
                level[a - 1] = indent;
                level.push(-20);
              } else if (ctoke === ")" || ctoke === "x)") {
                const countx = (ctoke === ")" && ltoke !== "(" && count.length > 0) ?
                  count.pop() + 1 :
                  0,
                  countIf = (data.token[data.begin[a] - 1] === "if") ?
                  (function beautify_script_level_end_countIf() {
                    let bb = a;
                    do {
                      bb = bb - 1;
                      if (data.token[bb] === ")" && level[bb - 1] > -1) {
                        return countx;
                      }
                    } while (bb > data.begin[a]);
                    return countx + 5;
                  }()) :
                  countx;
                if (countx > 0 && (options.language !== "jsx" || (options.language === "jsx" && data.token[data.begin[a] - 1] !== "render"))) {
                  const wrap = options.wrap,
                    begin = data.begin[a],
                    len = count.length;
                  let aa = a - 2;
                  if (countIf > wrap) {
                    level[data.begin[a]] = indent + 1;
                    level[a - 1] = indent;
                    do {
                      if (data.begin[aa] === begin) {
                        if (data.token[aa] === "&&" || data.token[aa] === "||") {
                          level[aa] = indent + 1;
                        } else if (level[aa] > -1 && data.types[aa] !== "comment" && data.token[aa + 1] !== ".") {
                          level[aa] = level[aa] + 1;
                        }
                      } else if (level[aa] > -1 && data.token[aa + 1] !== ".") {
                        level[aa] = level[aa] + 1;
                      }
                      aa = aa - 1;
                    } while (aa > begin);
                  } else if (len > 0) {
                    count[len - 1] = count[len - 1] + countx;
                  }
                } else if (ctoke === ")" && a > data.begin[a] + 2 && data.lexer[data.begin[a] + 1] === lexer && data.token[data.begin[a] + 1] !== "function") {
                  const open = (data.begin[a] < 0) ?
                    0 :
                    data.begin[a];
                  let len = 0,
                    aa = 0,
                    short = 0,
                    first = 0,
                    inc = 0,
                    comma = false,
                    array = false,
                    wrap = options.wrap,
                    ind = (indent + 1),
                    exl = ei.length,
                    ready = false,
                    mark = false,
                    tern = false;
                  if (level[open] < -9) {
                    aa = open;
                    do {
                      aa = aa + 1;
                    } while (aa < a && level[aa] < -9);
                    first = aa;
                    do {
                      len = len + data.token[aa].length;
                      if (level[aa] === -10) {
                        len = len + 1;
                      }
                      if (data.token[aa] === "(" && short > 0 && short < wrap - 1 && first === a) {
                        short = -1;
                      }
                      if (data.token[aa] === ")") {
                        inc = inc - 1;
                      } else if (data.token[aa] === "(") {
                        inc = inc + 1;
                      }
                      if (aa === open && inc > 0) {
                        short = len;
                      }
                      aa = aa - 1;
                    } while (aa > open && level[aa] < -9);
                    if (data.token[aa + 1] === ".") {
                      ind = level[aa] + 1;
                    }
                    if (len > wrap - 1 && wrap > 0 && ltoke !== "(" && short !== -1 && destruct[destruct.length - 2] === false) {
                      if ((data.token[open - 1] === "if" && list[list.length - 1] === true) || data.token[open - 1] !== "if") {
                        level[open] = ind;
                        if (data.token[open - 1] === "for") {
                          aa = open;
                          do {
                            aa = aa + 1;
                            if (data.token[aa] === ";" && data.begin[aa] === open) {
                              level[aa] = ind;
                            }
                          } while (aa < a);
                        }
                      }
                    }
                  }
                  aa = a;
                  len = 0;
                  do {
                    aa = aa - 1;
                    if (data.stack[aa] === "function") {
                      aa = data.begin[aa];
                    } else if (data.begin[aa] === open) {
                      if (data.token[aa] === "?") {
                        tern = true;
                      } else if (data.token[aa] === "," && comma === false) {
                        comma = true;
                        if (len >= wrap && wrap > 0) {
                          ready = true;
                        }
                      } else if (data.types[aa] === "markup" && mark === false) {
                        mark = true;
                      }
                      if (level[aa] > -9 && data.token[aa] !== "," && data.types[aa] !== "markup") {
                        len = 0;
                      } else {
                        if (level[aa] === -10) {
                          len = len + 1;
                        }
                        len = len + data.token[aa].length;
                        if (len >= wrap && wrap > 0 && (comma === true || mark === true)) {
                          ready = true;
                        }
                      }
                    } else {
                      if (level[aa] > -9) {
                        len = 0;
                      } else {
                        len = len + data.token[aa].length;
                        if (len >= wrap && wrap > 0 && (comma === true || mark === true)) {
                          ready = true;
                        }
                      }
                    }
                  } while (aa > open && ready === false);
                  if (comma === false && data.token[data.begin[a] + 1].charAt(0) === "`") {
                    level[data.begin[a]] = -20;
                    level[a - 1] = -20;
                  } else if (((comma === true || mark === true) && len >= wrap && wrap > 0) || level[open] > -9) {
                    if (tern === true) {
                      ind = level[open];
                      if (data.token[open - 1] === "[") {
                        aa = a;
                        do {
                          aa = aa + 1;
                          if (data.types[aa] === "end" || data.token[aa] === "," || data.token[aa] === ";") {
                            break;
                          }
                        } while (aa < b);
                        if (data.token[aa] === "]") {
                          ind = ind - 1;
                          array = true;
                        }
                      }
                    } else if (exl > 0 && ei[exl - 1] > aa) {
                      ind = ind - exl;
                    }
                    destruct[destruct.length - 1] = false;
                    aa = a;
                    do {
                      aa = aa - 1;
                      if (data.begin[aa] === open) {
                        if (data.token[aa].indexOf("=") > -1 && data.types[aa] === "operator" && data.token[aa].indexOf("!") < 0 && data.token[aa].indexOf("==") < 0 && data.token[aa] !== "<=" && data.token[aa].indexOf(">") < 0) {
                          len = aa;
                          do {
                            len = len - 1;
                            if (data.begin[len] === open && (data.token[len] === ";" || data.token[len] === "," || len === open)) {
                              break;
                            }
                          } while (len > open);
                        } else if (data.token[aa] === ",") {
                          level[aa] = ind;
                        } else if (level[aa] > -9 && array === false && (data.token[open - 1] !== "for" || data.token[aa + 1] === "?" || data.token[aa + 1] === ":") && (data.token[data.begin[a]] !== "(" || data.token[aa] !== "+")) {
                          level[aa] = level[aa] + 1;
                        }
                      } else if (level[aa] > -9 && array === false) {
                        level[aa] = level[aa] + 1;
                      }
                    } while (aa > open);
                    level[open] = ind;
                    level[a - 1] = ind - 1;
                  } else {
                    level[a - 1] = -20;
                  }
                  if (data.token[data.begin[a] - 1] === "+" && level[data.begin[a]] > -9) {
                    level[data.begin[a] - 1] = -10;
                  }
                } else if (options.language === "jsx") {
                  markupList();
                } else {
                  level[a - 1] = -20;
                }
                level.push(-20);
              } else if (destruct[destruct.length - 1] === true) {
                if (ctoke === "]" && data.begin[a] - 1 > 0 && data.token[data.begin[data.begin[a] - 1]] === "[") {
                  destruct[destruct.length - 2] = false;
                }
                if (data.begin[a] < level.length) {
                  level[data.begin[a]] = -20;
                }
                if (options.language === "jsx") {
                  markupList();
                } else if (ctoke === "]" && level[data.begin[a]] > -1) {
                  level[a - 1] = level[data.begin[a]] - 1;
                } else {
                  level[a - 1] = -20;
                }
                level.push(-20);
              } else if (data.types[a - 1] === "comment" && data.token[a - 1].substr(0, 2) === "//") {
                if (data.token[a - 2] === "x}") {
                  level[a - 3] = indent + 1;
                }
                level[a - 1] = indent;
                level.push(-20);
              } else if (data.types[a - 1] !== "comment" && ((ltoke === "{" && ctoke === "}") || (ltoke === "[" && ctoke === "]"))) {
                level[a - 1] = -20;
                if (ctoke === "}" && options.language === "titanium") {
                  level.push(indent);
                } else {
                  level.push(-20);
                }
              } else if (ctoke === "]") {
                if ((list[list.length - 1] === true && destruct[destruct.length - 1] === false && options.format_array !== "inline") || (ltoke === "]" && level[a - 2] === indent + 1)) {
                  level[a - 1] = indent;
                  level[data.begin[a]] = indent + 1;
                } else if (level[a - 1] === -10) {
                  level[a - 1] = -20;
                }
                if (data.token[data.begin[a] + 1] === "function") {
                  level[a - 1] = indent;
                } else if (list[list.length - 1] === false) {
                  if (ltoke === "}" || ltoke === "x}") {
                    level[a - 1] = indent;
                  }
                  let c = a - 1,
                    d = 1;
                  do {
                    if (data.token[c] === "]") {
                      d = d + 1;
                    }
                    if (data.token[c] === "[") {
                      d = d - 1;
                      if (d === 0) {
                        if (c > 0 && (data.token[c + 1] === "{" || data.token[c + 1] === "x{" || data.token[c + 1] === "[")) {
                          level[c] = indent + 1;
                          break;
                        }
                        if (data.token[c + 1] !== "[" || lastlist === false) {
                          level[c] = -20;
                          break;
                        }
                        break;
                      }
                    }
                    if (d === 1 && data.token[c] === "+" && level[c] > 1) {
                      level[c] = level[c] - 1;
                    }
                    c = c - 1;
                  } while (c > -1);
                } else if (options.language === "jsx") {
                  markupList();
                }
                if (options.format_array === "inline") {
                  let c = a,
                    begin = data.begin[a];
                  do {
                    c = c - 1;
                    if (data.types[c] === "end") {
                      break;
                    }
                  } while (c > begin);
                  if (c > begin) {
                    level[data.begin[a]] = indent + 1;
                    level[a - 1] = indent;
                  } else {
                    level[data.begin[a]] = -20;
                    level[a - 1] = -20;
                  }
                } else if (level[data.begin[a]] > -1) {
                  level[a - 1] = level[data.begin[a]] - 1;
                }
                level.push(-20);
              } else if (ctoke === "}" || ctoke === "x}" || list[list.length - 1] === true) {
                if (ctoke === "}" && ltoke === "x}" && data.token[a + 1] === "else") {
                  level[a - 2] = indent + 2;
                  level.push(-20);
                } else {
                  level.push(indent);
                }
                level[a - 1] = indent;
              } else {
                level.push(-20);
              }
              if (data.types[a - 1] === "comment") {
                level[a - 1] = indent;
              }
              endExtraInd();
              lastlist = list[list.length - 1];
              list.pop();
              extraindent.pop();
              arrbreak.pop();
              itemcount.pop();
              wordlist.pop();
              destruct.pop();
              assignlist.pop();
            },
            endExtraInd = function beautify_script_level_endExtraInd() {
              const ei = extraindent[extraindent.length - 1];
              let c = 0;
              if (ei === undefined) {
                return;
              }
              c = ei.length - 1;
              if (c < 1 && ei[c] < 0 && (ctoke === ";" || ctoke === "x;" || ctoke === ")" || ctoke === "x)" || ctoke === "}" || ctoke === "x}")) {
                ei.pop();
                return;
              }
              if (c < 0 || ei[c] < 0) {
                return;
              }
              if (ctoke === ":") {
                if (data.token[ei[c]] !== "?") {
                  do {
                    ei.pop();
                    c = c - 1;
                    indent = indent - 1;
                  } while (c > -1 && ei[c] > -1 && data.token[ei[c]] !== "?");
                }
                ei[c] = a;
                level[a - 1] = indent;
              } else {
                do {
                  ei.pop();
                  c = c - 1;
                  indent = indent - 1;
                } while (c > -1 && ei[c] > -1);
              }
              if ((data.stack[a] === "array" || ctoke === ",") && ei.length < 1) {
                ei.push(-1);
              }
            },
            external = function beautify_script_level_external() {
              let skip = a;
              do {
                if (data.lexer[a + 1] === lexer && data.begin[a + 1] < skip) {
                  break;
                }
                if (data.token[skip - 1] === "return" && data.types[a] === "end" && data.begin[a] === skip) {
                  break;
                }
                level.push(0);
                a = a + 1;
              } while (a < b);
              externalIndex[skip] = a;
              level.push(indent - 1);
            },
            fixchain = function beautify_script_level_fixchain() {
              let bb = a - 1,
                cc = data.begin[a];
              if (indent < 1) {
                return;
              }
              do {
                if (cc !== data.begin[bb]) {
                  bb = data.begin[bb];
                } else {
                  if (data.types[bb] === "separator" || data.types[bb] === "operator") {
                    if (data.token[bb] === "." && level[bb - 1] > 0) {
                      if (data.token[cc - 1] === "if") {
                        indent = indent - 2;
                      } else {
                        indent = indent - 1;
                      }
                    }
                    break;
                  }
                }
                bb = bb - 1;
              } while (bb > 0 && bb > cc);
            },
            markup = function beautify_script_level_markup() {
              if ((data.token[a + 1] !== "," && ctoke.indexOf("/>") !== ctoke.length - 2) || (data.token[a + 1] === "," && data.token[data.begin[a] - 3] !== "React")) {
                destructfix(false, false);
              }
              if (ltoke === "return" || ltoke === "?" || ltoke === ":") {
                level[a - 1] = -10;
                level.push(-20);
              } else if (ltype === "start" || (data.token[a - 2] === "return" && data.stack[a - 1] === "method")) {
                level.push(indent);
              } else {
                level.push(-20);
              }
            },
            operator = function beautify_script_level_operator() {
              const ei = (extraindent[extraindent.length - 1] === undefined) ?
                [] :
                extraindent[extraindent.length - 1],
                opWrap = function beautify_script_level_operator_opWrap() {
                  const aa = data.token[a + 1];
                  let line = 0,
                    next = 0,
                    c = a,
                    ind = (ctoke === "+") ?
                    indent + 2 :
                    indent,
                    meth = 0;
                  if (options.wrap < 1) {
                    level.push(-10);
                    return;
                  }
                  do {
                    c = c - 1;
                    if (data.token[data.begin[a]] === "(") {
                      if (c === data.begin[a]) {
                        meth = line;
                      }
                      if (data.token[c] === "," && data.begin[c] === data.begin[a] && list[list.length - 1] === true) {
                        break;
                      }
                    }
                    if (line > options.wrap - 1) {
                      break;
                    }
                    if (level[c] > -9) {
                      break;
                    }
                    if (data.types[c] === "operator" && data.token[c] !== "=" && data.token[c] !== "+" && data.begin[c] === data.begin[a]) {
                      break;
                    }
                    line = line + data.token[c].length;
                    if (c === data.begin[a] && data.token[c] === "[" && line < options.wrap - 1) {
                      break;
                    }
                    if (data.token[c] === "." && level[c] > -9) {
                      break;
                    }
                    if (level[c] === -10) {
                      line = line + 1;
                    }
                  } while (c > 0);
                  if (meth > 0) {
                    meth = meth + aa.length;
                  }
                  line = line + aa.length;
                  next = c;
                  if (line > options.wrap - 1 && level[c] < -9) {
                    do {
                      next = next - 1;
                    } while (next > 0 && level[next] < -9);
                  }
                  if (data.token[next + 1] === "." && data.begin[a] <= data.begin[next]) {
                    ind = ind + 1;
                  } else if (data.types[next] === "operator") {
                    ind = level[next];
                  }
                  next = aa.length;
                  if (line + next < options.wrap) {
                    level.push(-10);
                    return;
                  }
                  if (data.token[data.begin[a]] === "(" && (data.token[ei[0]] === ":" || data.token[ei[0]] === "?")) {
                    ind = indent + 3;
                  } else if (data.stack[a] === "method") {
                    level[data.begin[a]] = indent;
                    if (list[list.length - 1] === true) {
                      ind = indent + 3;
                    } else {
                      ind = indent + 1;
                    }
                  } else if (data.stack[a] === "object" || data.stack[a] === "array") {
                    destructfix(true, false);
                  }
                  if (data.token[c] === "var" || data.token[c] === "let" || data.token[c] === "const") {
                    line = line - (options.indent_size * options.indent_char.length * 2);
                  }
                  if (meth > 0) {
                    c = options.wrap - meth;
                  } else {
                    c = options.wrap - line;
                  }
                  if (c > 0 && c < 5) {
                    level.push(ind);
                    if (data.token[a].charAt(0) === "\"" || data.token[a].charAt(0) === "'") {
                      a = a + 1;
                      level.push(-10);
                    }
                    return;
                  }
                  if (data.token[data.begin[a]] !== "(" || meth > options.wrap - 1 || meth === 0) {
                    if (meth > 0) {
                      line = meth;
                    }
                    if (line - aa.length < options.wrap - 1 && (aa.charAt(0) === "\"" || aa.charAt(0) === "'")) {
                      a = a + 1;
                      line = line + 3;
                      if (line - aa.length > options.wrap - 4) {
                        level.push(ind);
                        return;
                      }
                      level.push(-10);
                      return;
                    }
                    level.push(ind);
                    return;
                  }
                  level.push(-10);
                };
              fixchain();
              if (ei.length > 0 && ei[ei.length - 1] > -1 && data.stack[a] === "array") {
                arrbreak[arrbreak.length - 1] = true;
              }
              if (ctoke !== ":") {
                if (data.token[data.begin[a]] !== "(" && data.token[data.begin[a]] !== "x(" && destruct.length > 0) {
                  destructfix(true, false);
                }
                if (ctoke !== "?" && data.token[ei[ei.length - 1]] === ".") {
                  let c = a,
                    d = data.begin[c],
                    e = 0;
                  do {
                    if (data.begin[c] === d) {
                      if (data.token[c + 1] === "{" || data.token[c + 1] === "[" || data.token[c] === "function") {
                        break;
                      }
                      if (data.token[c] === "," || data.token[c] === ";" || data.types[c] === "end" || data.token[c] === ":") {
                        ei.pop();
                        indent = indent - 1;
                        break;
                      }
                      if (data.token[c] === "?" || data.token[c] === ":") {
                        if (data.token[ei[ei.length - 1]] === "." && e < 2) {
                          ei[ei.length - 1] = d + 1;
                        }
                        break;
                      }
                      if (data.token[c] === ".") {
                        e = e + 1;
                      }
                    }
                    c = c + 1;
                  } while (c < b);
                }
              }
              if (ctoke === "!" || ctoke === "...") {
                if (ltoke === "}" || ltoke === "x}") {
                  level[a - 1] = indent;
                }
                level.push(-20);
                return;
              }
              if (ltoke === ";" || ltoke === "x;") {
                if (data.token[data.begin[a] - 1] !== "for") {
                  level[a - 1] = indent;
                }
                level.push(-20);
                return;
              }
              if (ctoke === "*") {
                if (ltoke === "function" || ltoke === "yield") {
                  level[a - 1] = -20;
                } else {
                  level[a - 1] = -10;
                }
                level.push(-10);
                return;
              }
              if (ctoke === "?") {
                if (data.lines[a] === 0 && data.types[a - 2] === "word" && data.token[a - 2] !== "return" && data.token[a - 2] !== "in" && data.token[a - 2] !== "instanceof" && data.token[a - 2] !== "typeof" && (ltype === "reference" || ltype === "word")) {
                  if (data.types[a + 1] === "word" || data.types[a + 1] === "reference" || ((data.token[a + 1] === "(" || data.token[a + 1] === "x(") && data.token[a - 2] === "new")) {
                    level[a - 1] = -20;
                    if (data.types[a + 1] === "word" || data.types[a + 1] === "reference") {
                      level.push(-10);
                      return;
                    }
                    level.push(-20);
                    return;
                  }
                }
                if (data.token[a + 1] === ":") {
                  level[a - 1] = -20;
                  level.push(-20);
                  return;
                }
                ternary.push(a);
                if (options.ternary_line === true) {
                  level[a - 1] = -10;
                } else {
                  let c = a - 1;
                  do {
                    c = c - 1;
                  } while (c > -1 && level[c] < -9);
                  ei.push(a);
                  indent = indent + 1;
                  if (level[c] === indent && data.token[c + 1] !== ":") {
                    indent = indent + 1;
                    ei.push(a);
                  }
                  level[a - 1] = indent;
                  if (data.token[data.begin[a]] === "(" && (ei.length < 2 || ei[0] === ei[1])) {
                    destruct[destruct.length - 1] = false;
                    if (a - 2 === data.begin[a]) {
                      level[data.begin[a]] = indent - 1;
                    } else {
                      level[data.begin[a]] = indent;
                    }
                    c = a - 2;
                    do {
                      if (data.types[c] === "end" && level[c - 1] > -1) {
                        break;
                      }
                      if (level[c] > -1) {
                        level[c] = level[c] + 1;
                      }
                      c = c - 1;
                    } while (c > data.begin[a]);
                  }
                }
                level.push(-10);
                return;
              }
              if (ctoke === ":") {
                if (data.stack[a] === "map" || data.types[a + 1] === "type" || data.types[a + 1] === "type_start") {
                  level[a - 1] = -20;
                  level.push(-10);
                  return;
                }
                if (ternary.length > 0 && data.begin[ternary[ternary.length - 1]] === data.begin[a]) {
                  let c = a,
                    d = data.begin[a];
                  do {
                    c = c - 1;
                    if (data.begin[c] === d) {
                      if (data.token[c] === "," || data.token[c] === ";") {
                        level[a - 1] = -20;
                        break;
                      }
                      if (data.token[c] === "?") {
                        ternary.pop();
                        endExtraInd();
                        if (options.ternary_line === true) {
                          level[a - 1] = -10;
                        }
                        level.push(-10);
                        return;
                      }
                    } else if (data.types[c] === "end") {
                      c = data.begin[c];
                    }
                  } while (c > d);
                }
                if (data.token[a - 2] === "where" && data.stack[a - 2] === data.stack[a]) {
                  level[a - 1] = -10;
                  level.push(-10);
                  return;
                }
                if (ltype === "reference" && data.token[data.begin[a]] !== "(" && data.token[data.begin[a]] !== "x(") {
                  level[a - 1] = -20;
                  level.push(-10);
                  return;
                }
                if ((ltoke === ")" || ltoke === "x)") && data.token[data.begin[a - 1] - 2] === "function") {
                  level[a - 1] = -20;
                  level.push(-10);
                  return;
                }
                if (data.stack[a] === "attribute") {
                  level[a - 1] = -20;
                  level.push(-10);
                  return;
                }
                if (data.token[data.begin[a]] !== "(" &&
                  data.token[data.begin[a]] !== "x(" &&
                  (ltype === "reference" || ltoke === ")" || ltoke === "]" || ltoke === "?") &&
                  (data.stack[a] === "map" || data.stack[a] === "class" || data.types[a + 1] === "reference") &&
                  (ternary.length === 0 || ternary[ternary.length - 1] < data.begin[a]) &&
                  ("mapclassexpressionmethodglobalparen".indexOf(data.stack[a]) > -1 || (data.types[a - 2] === "word" && data.stack[a] !== "switch"))) {
                  level[a - 1] = -20;
                  level.push(-10);
                  return;
                }
                if (data.stack[a] === "switch" && (ternary.length < 1 || ternary[ternary.length - 1] < data.begin[a])) {
                  level[a - 1] = -20;
                  if (options.case_space === true) {
                    level.push(-10);
                  } else {
                    level.push(indent);
                  }
                  return;
                }
                if (data.stack[a] === "object") {
                  level[a - 1] = -20;
                } else if (ternary.length > 0) {
                  level[a - 1] = indent;
                } else {
                  level[a - 1] = -10;
                }
                level.push(-10);
                return;
              }
              if (ctoke === "++" || ctoke === "--") {
                if (ltype === "number" || ltype === "reference") {
                  level[a - 1] = -20;
                  level.push(-10);
                } else if (a < b - 1 && (data.types[a + 1] === "number" || data.types[a + 1] === "reference")) {
                  level.push(-20);
                } else {
                  level.push(-10);
                }
                return;
              }
              if (ctoke === "+") {
                if (ltype === "start") {
                  level[a - 1] = -20;
                } else {
                  level[a - 1] = -10;
                }
                if (options.wrap < 1 || data.token[data.begin[a]] === "x(") {
                  level.push(-10);
                  return;
                }
                let aa = data.token[a + 1];
                if (aa === undefined) {
                  level.push(-10);
                  return;
                }
                if (data.types[a - 1] === "operator" || data.types[a - 1] === "start") {
                  if (data.types[a + 1] === "reference" || aa === "(" || aa === "[") {
                    level.push(-20);
                    return;
                  }
                  if (Number(aa.slice(1, -1)) > -1 && ((/\d/).test(aa.charAt(1)) === true || aa.charAt(1) === "." || aa.charAt(1) === "-" || aa.charAt(1) === "+")) {
                    level.push(-20);
                    return;
                  }
                }
                return opWrap();
              }
              if (data.types[a - 1] !== "comment") {
                if (ltoke === "(") {
                  level[a - 1] = -20;
                } else if (ctoke === "*" && data.stack[a] === "object" && data.types[a + 1] === "reference" && (ltoke === "{" || ltoke === ",")) {
                  level[a - 1] = indent;
                } else if (ctoke !== "?" || ternary.length === 0) {
                  level[a - 1] = -10;
                }
              }
              if (ctoke.indexOf("=") > -1 && ctoke !== "==" && ctoke !== "===" && ctoke !== "!=" && ctoke !== "!==" && ctoke !== ">=" && ctoke !== "<=" && ctoke !== "=>" && data.stack[a] !== "method" && data.stack[a] !== "object") {
                let c = a + 1,
                  d = 0,
                  e = false,
                  f = "";
                if ((data.token[data.begin[a]] === "(" || data.token[data.begin[a]] === "x(") && data.token[a + 1] !== "function") {
                  return;
                }
                do {
                  if (data.types[c] === "start") {
                    if (e === true && data.token[c] !== "[") {
                      if (assignlist[assignlist.length - 1] === true) {
                        assignlist[assignlist.length - 1] = false;
                      }
                      break;
                    }
                    d = d + 1;
                  }
                  if (data.types[c] === "end") {
                    d = d - 1;
                  }
                  if (d < 0) {
                    if (assignlist[assignlist.length - 1] === true) {
                      assignlist[assignlist.length - 1] = false;
                    }
                    break;
                  }
                  if (d === 0) {
                    f = data.token[c];
                    if (e === true) {
                      if (data.types[c] === "operator" || data.token[c] === ";" || data.token[c] === "x;" || data.token[c] === "?" || data.token[c] === "var" || data.token[c] === "let" || data.token[c] === "const") {
                        if (f !== undefined && (f === "?" || (f.indexOf("=") > -1 && f !== "==" && f !== "===" && f !== "!=" && f !== "!==" && f !== ">=" && f !== "<="))) {
                          if (assignlist[assignlist.length - 1] === false) {
                            assignlist[assignlist.length - 1] = true;
                          }
                        }
                        if ((f === ";" || f === "x;" || f === "var" || f === "let" || f === "const") && assignlist[assignlist.length - 1] === true) {
                          assignlist[assignlist.length - 1] = false;
                        }
                        break;
                      }
                      if (assignlist[assignlist.length - 1] === true && (f === "return" || f === "break" || f === "continue" || f === "throw")) {
                        assignlist[assignlist.length - 1] = false;
                      }
                    }
                    if (f === ";" || f === "x;" || f === ",") {
                      e = true;
                    }
                  }
                  c = c + 1;
                } while (c < b);
                level.push(-10);
                return;
              }
              if ((ctoke === "-" && ltoke === "return") || ltoke === "=") {
                level.push(-20);
                return;
              }
              if (ltype === "operator" && data.types[a + 1] === "reference" && ltoke !== "--" && ltoke !== "++" && ctoke !== "&&" && ctoke !== "||") {
                level.push(-20);
                return;
              }
              return opWrap();
            },
            reference = function beautify_script_level_reference() {
              const hoist = function beautify_script_level_reference_hoist() {
                let func = data.begin[a];
                if (func < 0) {
                  scopes.push([data.token[a], -1]);
                } else {
                  if (data.stack[func + 1] !== "function") {
                    do {
                      func = data.begin[func];
                    } while (func > -1 && data.stack[func + 1] !== "function");
                  }
                  scopes.push([data.token[a], func]);
                }
              };
              if (data.types[a - 1] === "comment") {
                level[a - 1] = indent;
              } else if (ltype === "end" && ltoke !== ")" && data.token[data.begin[a - 1] - 1] !== ")") {
                level[a - 1] = -10;
              } else if (ltype !== "separator" && ltype !== "start" && ltype !== "end" && ltype.indexOf("template_string") < 0) {
                if (ltype === "word" || ltype === "operator" || ltype === "property" || ltype === "type" || ltype === "reference") {
                  level[a - 1] = -10;
                } else {
                  level[a - 1] = -20;
                }
              }
              if (ltoke === "var" && data.lexer[a - 1] === lexer) {
                // hoisted references following declaration keyword
                hoist();
              } else if (ltoke === "function") {
                scopes.push([data.token[a], a]);
              } else if (ltoke === "let" || ltoke === "const") {
                // not hoisted references following declaration keyword
                scopes.push([data.token[a], a]);
              } else if (data.stack[a] === "arguments") {
                scopes.push([data.token[a], a]);
              } else if (ltoke === ",") {
                // references following a comma, must be tested to see if a declaration list
                let index = a;
                do {
                  index = index - 1;
                } while (index > data.begin[a] && data.token[index] !== "var" && data.token[index] !== "let" && data.token[index] !== "const");
                if (data.token[index] === "var") {
                  hoist();
                } else if (data.token[index] === "let" || data.token[index] === "const") {
                  scopes.push([data.token[a], a]);
                }
              }
              level.push(-10);
            },
            separator = function beautify_script_level_separator() {
              const ei = (extraindent[extraindent.length - 1] === undefined) ?
                [] :
                extraindent[extraindent.length - 1],
                propertybreak = function beautify_script_level_separator_propertybreak() {
                  if (options.method_chain > 0) {
                    let x = a,
                      y = data.begin[a],
                      z = [a],
                      ify = (data.token[y - 1] === "if");
                    do {
                      x = x - 1;
                      if (data.types[x] === "end") {
                        x = data.begin[x];
                      }
                      if (data.begin[x] === y) {
                        if (data.types[x] === "string" && data.token[x].indexOf("${") === data.token[x].length - 2) {
                          break;
                        }
                        if (data.token[x] === ".") {
                          if (level[x - 1] > 0) {
                            level[a - 1] = (ify === true) ?
                              indent + 1 :
                              indent;
                            return;
                          }
                          z.push(x);
                        } else if (data.token[x] === ";" ||
                          data.token[x] === "," ||
                          data.types[x] === "operator" ||
                          ((data.types[x] === "word" || data.types[x] === "reference") &&
                            (data.types[x - 1] === "word" || data.types[x - 1] === "reference"))) {
                          break;
                        }
                      }
                    } while (x > y);
                    if (z.length < options.method_chain) {
                      level[a - 1] = -20;
                      return;
                    }
                    x = 0;
                    y = z.length;
                    do {
                      level[z[x] - 1] = (ify === true) ?
                        indent + 1 :
                        indent;
                      x = x + 1;
                    } while (x < y);
                    x = z[z.length - 1] - 1;
                    do {
                      if (level[x] > -1) {
                        level[x] = level[x] + 1;
                      }
                      x = x + 1;
                    } while (x < a);
                    indent = (ify === true) ?
                      indent + 2 :
                      indent + 1;
                  }
                  level[a - 1] = indent;
                };
              if (ctoke === "::") {
                level[a - 1] = -20;
                level.push(-20);
                return;
              }
              if (ctoke === ".") {
                if (data.token[data.begin[a]] !== "(" && data.token[data.begin[a]] !== "x(" && ei.length > 0) {
                  if (data.stack[a] === "object" || data.stack[a] === "array") {
                    destructfix(true, false);
                  } else {
                    destructfix(false, false);
                  }
                }
                if (options.method_chain === 0) {
                  // methodchain is 0 so methods and properties should be chained together
                  level[a - 1] = -20;
                } else if (options.method_chain < 0) {
                  if (data.lines[a] > 0) {
                    propertybreak();
                  } else {
                    level[a - 1] = -20;
                  }
                } else {
                  // methodchain is greater than 0 and should break methods if the chain reaches this value
                  propertybreak();
                }
                level.push(-20);
                return;
              }
              if (ctoke === ",") {
                fixchain();
                if (list[list.length - 1] === false && (data.stack[a] === "object" || data.stack[a] === "array" || data.stack[a] === "paren" || data.stack[a] === "expression" || data.stack[a] === "method")) {
                  list[list.length - 1] = true;
                  if (data.token[data.begin[a]] === "(") {
                    let aa = a;
                    do {
                      aa = aa - 1;
                      if (data.begin[aa] === data.begin[a] && data.token[aa] === "+" && level[aa] > -9) {
                        level[aa] = level[aa] + 2;
                      }
                    } while (aa > data.begin[a]);
                  }
                }
                if (data.stack[a] === "array" && options.format_array === "indent") {
                  level[a - 1] = -20;
                  level.push(indent);
                  return;
                }
                if (data.stack[a] === "array" && options.format_array === "inline") {
                  level[a - 1] = -20;
                  level.push(-10);
                  return;
                }
                if (data.stack[a] === "object" && options.format_object === "indent") {
                  level[a - 1] = -20;
                  level.push(indent);
                  return;
                }
                if (data.stack[a] === "object" && options.format_object === "inline") {
                  level[a - 1] = -20;
                  level.push(-10);
                  return;
                }
                if (ei.length > 0) {
                  if (ei[ei.length - 1] > -1) {
                    endExtraInd();
                  }
                  level[a - 1] = -20;
                  level.push(indent);
                  return;
                }
                if (data.token[a - 2] === ":" && data.token[a - 4] === "where") {
                  level[a - 1] = -20;
                  level.push(-10);
                  return;
                }
                level[a - 1] = -20;
                if (data.types[a + 1] !== "end") {
                  itemcount[itemcount.length - 1] = itemcount[itemcount.length - 1] + 1;
                }
                if ((data.token[data.begin[a]] === "(" || data.token[data.begin[a]] === "x(") && options.language !== "jsx" && data.stack[a] !== "global" && ((data.types[a - 1] !== "string" && data.types[a - 1] !== "number") || data.token[a - 2] !== "+" || (data.types[a - 1] === "string" && data.types[a - 1] !== "number" && data.token[a - 2] === "+" && data.types[a - 3] !== "string" && data.types[a - 3] !== "number"))) {
                  level.push(-10);
                  return;
                }
                if (ltype === "reference" && data.types[a - 2] === "word" && "var-let-const-from".indexOf(data.token[a - 2]) < 0 && (data.types[a - 3] === "end" || data.token[a - 3] === ";")) {
                  wordlist[wordlist.length - 1] = true;
                  level.push(-10);
                  return;
                }
                if (wordlist[wordlist.length - 1] === true || data.stack[a] === "notation") {
                  level.push(-10);
                  return;
                }
                if (itemcount[itemcount.length - 1] > 3 && (data.stack[a] === "array" || data.stack[a] === "object")) {
                  if (destruct[destruct.length - 1] === true) {
                    destructfix(true, true);
                  }
                  level[a - 1] = -20;
                  if (arrbreak[arrbreak.length - 1] === true) {
                    level.push(indent);
                    return;
                  }
                  let begin = data.begin[a],
                    c = a;
                  do {
                    if (data.types[c] === "end") {
                      c = data.begin[c];
                    } else {
                      if (data.token[c] === "," && data.types[c + 1] !== "comment") {
                        level[c] = indent;
                      }
                    }
                    c = c - 1;
                  } while (c > begin);
                  level[begin] = indent;
                  arrbreak[arrbreak.length - 1] = true;
                  return;
                }
                if (data.stack[a] === "object") {
                  if (destruct[destruct.length - 1] === true && data.types[data.begin[a] - 1] !== "word" && data.types[data.begin[a] - 1] !== "reference" && data.token[data.begin[a] - 1] !== "(" && data.token[data.begin[a] - 1] !== "x(") {
                    const bb = data.begin[a];
                    let aa = a - 1;
                    do {
                      if (data.begin[aa] === bb) {
                        if (data.token[aa] === ",") {
                          break;
                        }
                        if (data.token[aa] === ":") {
                          destructfix(true, false);
                          break;
                        }
                      }
                      aa = aa - 1;
                    } while (aa > bb);
                  }
                }
                if ((data.types[a - 1] === "word" || data.types[a - 1] === "reference") && data.token[a - 2] === "for") {
                  //This is for Volt templates
                  level.push(-10);
                  return;
                }
                if (destruct[destruct.length - 1] === false || (data.token[a - 2] === "+" && (ltype === "string" || ltype === "number") && level[a - 2] > 0 && (ltoke.charAt(0) === "\"" || ltoke.charAt(0) === "'"))) {
                  if (data.stack[a] === "method") {
                    if (data.token[a - 2] === "+" && (ltoke.charAt(0) === "\"" || ltoke.charAt(0) === "'") && (data.token[a - 3].charAt(0) === "\"" || data.token[a - 3].charAt(0) === "'")) {
                      level.push(indent + 2);
                      return;
                    }
                    if (data.token[a - 2] !== "+") {
                      level.push(-10);
                      return;
                    }
                  }
                  level.push(indent);
                  return;
                }
                if (destruct[destruct.length - 1] === true && data.stack[a] !== "object") {
                  level.push(-10);
                  return;
                }
                if (itemcount[itemcount.length - 1] < 4 && (data.stack[a] === "array" || data.stack[a] === "object")) {
                  level.push(-10);
                  return;
                }
                level.push(indent);
                return;
              }
              if (ctoke === ";" || ctoke === "x;") {
                fixchain();
                if (data.token[a + 1] !== undefined && data.types[a + 1].indexOf("attribute") > 0 && data.types[a + 1].indexOf("end") > 0) {
                  level[a - 1] = -20;
                  level.push(indent - 1);
                  return;
                }
                if (varindex[varindex.length - 1] > -1 && data.stack[varindex[varindex.length - 1]] !== "expression") {
                  let aa = a;
                  do {
                    aa = aa - 1;
                    if (data.token[aa] === ";") {
                      break;
                    }
                    if (data.token[aa] === ",") {
                      indent = indent - 1;
                      break;
                    }
                    if (data.types[aa] === "end") {
                      aa = data.begin[aa];
                    }
                  } while (aa > 0 && aa > data.begin[a]);
                }
                varindex[varindex.length - 1] = -1;
                endExtraInd();
                if (data.token[data.begin[a] - 1] !== "for") {
                  destructfix(false, false);
                }
                if (ctoke === "x;") {
                  scolon = scolon + 1;
                }
                wordlist[wordlist.length - 1] = false;
                level[a - 1] = -20;
                if (data.begin[a] > 0 && data.token[data.begin[a] - 1] === "for" && data.stack[a] !== "for") {
                  level.push(-10);
                  return;
                }
                level.push(indent);
                return;
              }
              level.push(-20);
            },
            start = function beautify_script_level_start() {
              const deep = data.stack[a + 1],
                deeper = (a === 0) ?
                data.stack[a] :
                data.stack[a - 1];
              if (ltoke === ")" || ((deeper === "object" || deeper === "array") && ltoke !== "]")) {
                if (deep !== "method" || (deep === "method" && data.token[a + 1] !== ")" && data.token[a + 2] !== ")")) {
                  if (ltoke === ")" && (deep !== "function" || data.token[data.begin[data.begin[a - 1] - 1]] === "(" || data.token[data.begin[data.begin[a - 1] - 1]] === "x(")) {
                    destructfix(false, false);
                  } else if (data.types[a + 1] !== "end" && data.types[a + 2] !== "end") {
                    destructfix(true, false);
                  }
                }
              }
              list.push(false);
              extraindent.push([]);
              assignlist.push(false);
              arrbreak.push(false);
              wordlist.push(false);
              itemcount.push(0);
              if (options.never_flatten === true || (deep === "array" && options.format_array === "indent") || options.language === "qml" || deep === "attribute" || ltype === "generic" || (deep === "class" && ltoke !== "(" && ltoke !== "x(") || (ctoke === "[" && data.token[a + 1] === "function")) {
                destruct.push(false);
              } else {
                if (deep === "expression" || deep === "method") {
                  destruct.push(true);
                } else if ((deep === "object" || deep === "class") && (ltoke === "(" || ltoke === "x(" || ltype === "word" || ltype === "reference")) {
                  //array or object literal following `return` or `(`
                  destruct.push(true);
                } else if (deep === "array" || ctoke === "(" || ctoke === "x(") {
                  //array, method, paren
                  destruct.push(true);
                } else if (ctoke === "{" && deep === "object" && ltype !== "operator" && ltype !== "start" && ltype !== "string" && ltype !== "number" && deeper !== "object" && deeper !== "array" && a > 0) {
                  //curly brace not in a list and not assigned
                  destruct.push(true);
                } else {
                  //not destructured (multiline)
                  destruct.push(false);
                }
              }
              if (ctoke !== "(" && ctoke !== "x(" && data.stack[a + 1] !== "attribute") {
                indent = indent + 1;
              }
              if (ctoke === "{" || ctoke === "x{") {
                varindex.push(-1);
                if (data.types[a - 1] !== "comment") {
                  if (ltype === "markup") {
                    level[a - 1] = indent;
                  } else if (options.braces === true && ltype !== "operator" && ltoke !== "return") {
                    level[a - 1] = indent - 1;
                  } else if (data.stack[a + 1] !== "block" && (deep === "function" || ltoke === ")" || ltoke === "x)" || ltoke === "," || ltoke === "}" || ltype === "markup")) {
                    level[a - 1] = -10;
                  } else if (ltoke === "{" || ltoke === "x{" || ltoke === "[" || ltoke === "}" || ltoke === "x}") {
                    level[a - 1] = indent - 1;
                  }
                }
                if (deep === "object") {
                  if (options.format_object === "indent") {
                    destruct[destruct.length - 1] = false;
                    level.push(indent);
                    return;
                  }
                  if (options.format_object === "inline") {
                    destruct[destruct.length - 1] = true;
                    level.push(-20);
                    return;
                  }
                }
                if (deep === "switch") {
                  if (options.no_case_indent === true) {
                    level.push(indent - 1);
                    return;
                  }
                  indent = indent + 1;
                  level.push(indent);
                  return;
                }
                if (destruct[destruct.length - 1] === true) {
                  if (ltype !== "word" && ltype !== "reference") {
                    level.push(-20);
                    return;
                  }
                }
                level.push(indent);
                return;
              }
              if (ctoke === "(" || ctoke === "x(") {
                if (options.wrap > 0 && ctoke === "(" && data.token[a + 1] !== ")") {
                  count.push(1);
                }
                if (ltoke === "-" && (data.token[a - 2] === "(" || data.token[a - 2] === "x(")) {
                  level[a - 2] = -20;
                }
                if (ltype === "end" && deeper !== "if" && deeper !== "for" && deeper !== "catch" && deeper !== "else" && deeper !== "do" && deeper !== "try" && deeper !== "finally" && deeper !== "catch") {
                  if (data.types[a - 1] === "comment") {
                    level[a - 1] = indent;
                  } else {
                    level[a - 1] = -20;
                  }
                }
                if (ltoke === "async") {
                  level[a - 1] = -10;
                } else if (deep === "method" || (data.token[a - 2] === "function" && ltype === "reference")) {
                  if (ltoke === "import" || ltoke === "in" || options.function_name === true) {
                    level[a - 1] = -10;
                  } else if ((ltoke === "}" && data.stack[a - 1] === "function") || ltype === "word" || ltype === "reference" || ltype === "property") {
                    level[a - 1] = -20;
                  } else if (deeper !== "method" && deep !== "method") {
                    level[a - 1] = indent;
                  }
                }
                if (ltoke === "+" && (data.token[a - 2].charAt(0) === "\"" || data.token[a - 2].charAt(0) === "'")) {
                  level.push(indent);
                  return;
                }
                if (ltoke === "}" || ltoke === "x}") {
                  level.push(-20);
                  return;
                }
                if ((ltoke === "-" && (a < 2 || (data.token[a - 2] !== ")" && data.token[a - 2] !== "x)" && data.token[a - 2] !== "]" && data.types[a - 2] !== "reference" && data.types[a - 2] !== "string" && data.types[a - 2] !== "number"))) || (options.space === false && ltoke === "function")) {
                  level[a - 1] = -20;
                }
                level.push(-20);
                return;
              }
              if (ctoke === "[") {
                if (ltoke === "[") {
                  list[list.length - 2] = true;
                }
                if (ltoke === "return" || ltoke === "var" || ltoke === "let" || ltoke === "const") {
                  level[a - 1] = -10;
                } else if (data.types[a - 1] !== "comment" && data.stack[a - 1] !== "attribute" && (ltype === "end" || ltype === "word" || ltype === "reference")) {
                  level[a - 1] = -20;
                } else if (ltoke === "[" || ltoke === "{" || ltoke === "x{") {
                  level[a - 1] = indent - 1;
                }
                if (data.stack[a] === "attribute") {
                  level.push(-20);
                  return;
                }
                if (options.format_array === "indent") {
                  destruct[destruct.length - 1] = false;
                  level.push(indent);
                  return;
                }
                if (options.format_array === "inline") {
                  destruct[destruct.length - 1] = true;
                  level.push(-20);
                  return;
                }
                if (deep === "method" || destruct[destruct.length - 1] === true) {
                  level.push(-20);
                  return;
                }
                let c = a + 1;
                do {
                  if (data.token[c] === "]") {
                    level.push(-20);
                    return;
                  }
                  if (data.token[c] === ",") {
                    level.push(indent);
                    return;
                  }
                  c = c + 1;
                } while (c < b);
                level.push(-20);
                return;
              }
            },
            string = function beautify_script_level_string() {
              if (ctoke.length === 1) {
                level.push(-20);
                if (data.lines[a] === 0) {
                  level[a - 1] = -20;
                }
              } else if (ctoke.indexOf("#!/") === 0) {
                level.push(indent);
              } else {
                level.push(-10);
              }
              if ((ltoke === "," || ltype === "start") && (data.stack[a] === "object" || data.stack[a] === "array") && destruct[destruct.length - 1] === false && a > 0) {
                level[a - 1] = indent;
              }
            },
            template = function beautify_script_level_template() {
              if (ctype === "template_else") {
                level[a - 1] = indent - 1;
                level.push(indent);
              } else if (ctype === "template_start") {
                indent = indent + 1;
                if (data.lines[a - 1] < 1) {
                  level[a - 1] = -20;
                }
                if (data.lines[a] > 0 || ltoke.length === 1 && ltype === "string") {
                  level.push(indent);
                } else {
                  level.push(-20);
                }
              } else if (ctype === "template_end") {
                indent = indent - 1;
                if (ltype === "template_start" || data.lines[a - 1] < 1) {
                  level[a - 1] = -20;
                } else {
                  level[a - 1] = indent;
                }
                if (data.lines[a] > 0) {
                  level.push(indent);
                } else {
                  level.push(-20);
                }
              } else if (ctype === "template") {
                if (data.lines[a] > 0) {
                  level.push(indent);
                } else {
                  level.push(-20);
                }
              }
            },
            templateString = function beautify_script_level_templateString() {
              if (ctype === "template_string_start") {
                indent = indent + 1;
                level.push(indent);
              } else if (ctype === "template_string_else") {
                fixchain();
                level[a - 1] = indent - 1;
                level.push(indent);
              } else {
                fixchain();
                indent = indent - 1;
                level[a - 1] = indent;
                level.push(-10);
              }
              if (a > 2 && (data.types[a - 2] === "template_string_else" || data.types[a - 2] === "template_string_start")) {
                if (options.brace_padding === true) {
                  level[a - 2] = -10;
                  level[a - 1] = -10;
                } else {
                  level[a - 2] = -20;
                  level[a - 1] = -20;
                }
              }
            },
            types = function beautify_script_level_types() {
              if (data.token[a - 1] === "," || (data.token[a - 1] === ":" && data.stack[a - 1] !== "data_type")) {
                level[a - 1] = -10;
              } else {
                level[a - 1] = -20;
              }
              if (data.types[a] === "type" || data.types[a] === "type_end") {
                level.push(-10);
              }
              if (data.types[a] === "type_start") {
                level.push(-20);
              }
            },
            word = function beautify_script_level_word() {
              if ((ltoke === ")" || ltoke === "x)") && data.stack[a] === "class" && (data.token[data.begin[a - 1] - 1] === "static" || data.token[data.begin[a - 1] - 1] === "final" || data.token[data.begin[a - 1] - 1] === "void")) {
                level[a - 1] = -10;
                level[data.begin[a - 1] - 1] = -10;
              }
              if (ltoke === "]") {
                level[a - 1] = -10;
              }
              if (ltoke === "}" || ltoke === "x}") {
                level[a - 1] = indent;
              }
              if (ctoke === "else" && ltoke === "}") {
                if (data.token[a - 2] === "x}") {
                  level[a - 3] = level[a - 3] - 1;
                }
                if (options.braces === true) {
                  level[a - 1] = indent;
                }
              }
              if (ctoke === "new") {
                let apiword = [
                  "ActiveXObject",
                  "ArrayBuffer",
                  "AudioContext",
                  "Canvas",
                  "CustomAnimation",
                  "DOMParser",
                  "DataView",
                  "Date",
                  "Error",
                  "EvalError",
                  "FadeAnimation",
                  "FileReader",
                  "Flash",
                  "Float32Array",
                  "Float64Array",
                  "FormField",
                  "Frame",
                  "Generator",
                  "HotKey",
                  "Image",
                  "Iterator",
                  "Intl",
                  "Int16Array",
                  "Int32Array",
                  "Int8Array",
                  "InternalError",
                  "Loader",
                  "Map",
                  "MenuItem",
                  "MoveAnimation",
                  "Notification",
                  "ParallelArray",
                  "Point",
                  "Promise",
                  "Proxy",
                  "RangeError",
                  "Rectangle",
                  "ReferenceError",
                  "Reflect",
                  "RegExp",
                  "ResizeAnimation",
                  "RotateAnimation",
                  "Set",
                  "SQLite",
                  "ScrollBar",
                  "Set",
                  "Shadow",
                  "StopIteration",
                  "Symbol",
                  "SyntaxError",
                  "Text",
                  "TextArea",
                  "Timer",
                  "TypeError",
                  "URL",
                  "Uint16Array",
                  "Uint32Array",
                  "Uint8Array",
                  "Uint8ClampedArray",
                  "URIError",
                  "WeakMap",
                  "WeakSet",
                  "Web",
                  "Window",
                  "XMLHttpRequest"
                ];
                if (apiword.indexOf(data.token[a + 1]) < 0) {
                  news = news + 1;
                }
                if (options.jsscope !== "none") {
                  data.token[a] = "<strong class='new'>new</strong>";
                }
              }
              if (ctoke === "from" && ltype === "end" && a > 0 && (data.token[data.begin[a - 1] - 1] === "import" || data.token[data.begin[a - 1] - 1] === ",")) {
                level[a - 1] = -10;
              }
              if (ctoke === "this" && options.jsscope !== "none") {
                data.token[a] = "<strong class=\"new\">this</strong>";
              }
              if (ctoke === "function") {
                if (options.space === false && a < b - 1 && (data.token[a + 1] === "(" || data.token[a + 1] === "x(")) {
                  level.push(-20);
                  return;
                }
                level.push(-10);
                return;
              }
              if (ltoke === "-" && a > 1) {
                if (data.types[a - 2] === "operator" || data.token[a - 2] === ",") {
                  level[a - 1] = -20;
                } else if (data.types[a - 2] === "start") {
                  level[a - 2] = -20;
                  level[a - 1] = -20;
                }
              } else if (ctoke === "while" && (ltoke === "}" || ltoke === "x}")) {
                //verify if this is a do/while block
                let c = a - 1,
                  d = 0;
                do {
                  if (data.token[c] === "}" || data.token[c] === "x}") {
                    d = d + 1;
                  }
                  if (data.token[c] === "{" || data.token[c] === "x{") {
                    d = d - 1;
                  }
                  if (d === 0) {
                    if (data.token[c - 1] === "do") {
                      level[a - 1] = -10;
                      break;
                    }
                    level[a - 1] = indent;
                    break;
                  }
                  c = c - 1;
                } while (c > -1);
              } else if (ctoke === "in" || (((ctoke === "else" && options.else_line === false && options.braces === false) || ctoke === "catch") && (ltoke === "}" || ltoke === "x}"))) {
                level[a - 1] = -10;
              } else if (ctoke === "var" || ctoke === "let" || ctoke === "const") {
                varindex[varindex.length - 1] = a;
                if (ltype === "end") {
                  level[a - 1] = indent;
                }
                if (data.token[data.begin[a] - 1] !== "for") {
                  let c = a + 1,
                    d = 0;
                  do {
                    if (data.types[c] === "end") {
                      d = d - 1;
                    }
                    if (data.types[c] === "start") {
                      d = d + 1;
                    }
                    if (d < 0 || (d === 0 && (data.token[c] === ";" || data.token[c] === ","))) {
                      break;
                    }
                    c = c + 1;
                  } while (c < b);
                  if (data.token[c] === ",") {
                    indent = indent + 1;
                  }
                }
                level.push(-10);
                return;
              }
              if ((ctoke === "default" || ctoke === "case") && ltype !== "word" && data.stack[a] === "switch") {
                level[a - 1] = indent - 1;
                level.push(-10);
                return;
              }
              if (ctoke === "catch" && ltoke === ".") {
                level[a - 1] = -20;
                level.push(-20);
                return;
              }
              if (ctoke === "catch" || ctoke === "finally") {
                level[a - 1] = -10;
                level.push(-10);
                return;
              }
              if (options.brace_padding === false && a < b - 1 && data.token[a + 1].charAt(0) === "}") {
                level.push(-20);
                return;
              }
              if (data.stack[a] === "object" && (ltoke === "{" || ltoke === ",") && (data.token[a + 1] === "(" || data.token[a + 1] === "x(")) {
                level.push(-20);
                return;
              }
              if (data.types[a - 1] === "comment" && data.token[data.begin[a]] === "(") {
                level[a - 1] = indent + 1;
              }
              level.push(-10);
            };
          if (options.language === "titanium") {
            indent = indent - 1;
          }
          do {
            if (data.lexer[a] === lexer) {
              ctype = data.types[a];
              ctoke = data.token[a];
              if (ctype === "comment") {
                comment();
              } else if (ctype === "regex") {
                level.push(-20);
              } else if (ctype === "string") {
                string();
              } else if (ctype.indexOf("template_string") === 0) {
                templateString();
              } else if (ctype === "separator") {
                separator();
              } else if (ctype === "start") {
                start();
              } else if (ctype === "end") {
                end();
              } else if (ctype === "type" || ctype === "type_start" || ctype === "type_end") {
                types();
              } else if (ctype === "operator") {
                operator();
              } else if (ctype === "word") {
                word();
              } else if (ctype === "reference") {
                reference();
              } else if (ctype === "markup") {
                markup();
              } else if (ctype.indexOf("template") === 0) {
                template();
              } else if (ctype === "generic") {
                if (ltoke !== "return" && ltoke.charAt(0) !== "#" && ltype !== "operator" && ltoke !== "public" && ltoke !== "private" && ltoke !== "static" && ltoke !== "final" && ltoke !== "implements" && ltoke !== "class" && ltoke !== "void") {
                  level[a - 1] = -20;
                }
                if (data.token[a + 1] === "(" || data.token[a + 1] === "x(") {
                  level.push(-20);
                } else {
                  level.push(-10);
                }
              } else {
                level.push(-10);
              }
              if (ctype !== "comment") {
                ltype = ctype;
                ltoke = ctoke;
              }
              if (count.length > 0 && data.token[a] !== ")") {
                if (data.types[a] === "comment" && count[count.length - 1] > -1) {
                  count[count.length - 1] = options.wrap + 1;
                } else if (level[a] > -1 || (data.token[a].charAt(0) === "`" && data.token[a].indexOf("\n") > 0)) {
                  count[count.length - 1] = -1;
                } else if (count[count.length - 1] > -1) {
                  count[count.length - 1] = count[count.length - 1] + data.token[a].length;
                  if (level[a] === -10) {
                    count[count.length - 1] = count[count.length - 1] + 1;
                  }
                }
              }
            } else {
              external();
            }
            a = a + 1;
          } while (a < b);
          return level;
        }()),
        output = (function beautify_script_output() {
          const build = [],
            tab = (function beautify_script_output_tab() {
              const ch = options.indent_char,
                tabby = [];
              let index = options.indent_size;
              if (typeof index !== "number" || index < 1) {
                return "";
              }
              do {
                tabby.push(ch);
                index = index - 1;
              } while (index > 0);
              return tabby.join("");
            }()),
            lf = (options.crlf === true) ?
            "\r\n" :
            "\n",
            pres = options.preserve + 1,
            nl = function beautify_script_output_outnl(tabs) {
              const linesout = [],
                total = (function beautify_script_output_outnl_total() {
                  if (a === b - 1) {
                    return 1;
                  }
                  if (data.lines[a + 1] - 1 > pres) {
                    return pres;
                  }
                  if (data.lines[a + 1] > 1) {
                    return data.lines[a + 1] - 1;
                  }
                  return 1;
                }());
              let index = 0;
              if (tabs < 0) {
                tabs = 0;
              }
              do {
                linesout.push(lf);
                index = index + 1;
              } while (index < total);
              if (tabs > 0) {
                index = 0;
                do {
                  linesout.push(tab);
                  index = index + 1;
                } while (index < tabs);
              }
              return linesout.join("");
            },
            reference = function beautify_script_output_reference() {
              let s = scopes.length,
                t = 0;
              const applyScope = function beautify_script_output_reference_applyScope() {
                // applyScope function exists to prevent presenting spaces as part of reference names if option 'vertical' is set to true
                let token = data.token[a],
                  space = "";
                const spaceIndex = token.indexOf(" "),
                  scopeValue = (function beautify_script_output_reference_applyScope_scopeValue() {
                    let begin = data.begin[scopes[s][1]],
                      value = "";
                    if (scopes[s][1] < 0 || begin < 0) {
                      return "0";
                    }
                    if (data.token[scopes[s][1]] !== undefined && data.token[scopes[s][1]].indexOf("<em") === 0) {
                      begin = scopes[s][1];
                    } else if (data.token[begin] === undefined || data.token[begin].indexOf("<em") !== 0) {
                      do {
                        begin = data.begin[begin];
                      } while (begin > 0 && data.token[begin].indexOf("<em") !== 0);
                    }
                    if (begin < 0) {
                      value = "0";
                    } else {
                      value = data.token[begin];
                      value = value.slice(value.indexOf("class=") + 8);
                      value = value.slice(0, value.indexOf(">") - 1);
                    }
                    if (data.stack[a] === "arguments" || data.stack[scopes[s][1]] === "arguments") {
                      return String(Number(value) + 1);
                    }
                    return value;
                  }());
                if (spaceIndex > 0) {
                  space = token.slice(spaceIndex);
                  token = token.slice(0, spaceIndex);
                }
                data.token[a] = `prettydiffltem class="s${scopeValue}"prettydiffgt${token}prettydifflt/emprettydiffgt${space}`;
                build.push(data.token[a]);
              };
              if (scopes.length < 1) {
                return;
              }
              do {
                s = s - 1;
                if (data.token[a].replace(/\s+/, "") === scopes[s][0]) {
                  if (scopes[s][1] <= a) {
                    t = scopes[s][1];
                    if (t < 0 || data.stack[a] === "arguments" || t === a) {
                      applyScope();
                      return;
                    }
                    do {
                      t = t + 1;
                      if (data.types[t] === "end" && data.begin[t] === scopes[s][1]) {
                        break;
                      }
                    } while (t < a);
                    if (t === a) {
                      applyScope();
                      return;
                    }
                  } else if (data.begin[scopes[s][1]] < data.begin[a]) {
                    applyScope();
                    return;
                  }
                }
              } while (s > 0);
              build.push(data.token[a]);
            },
            invisibles = ["x;", "x}", "x{", "x(", "x)"];
          let a = prettydiff.start,
            external = "",
            lastLevel = options.indent_level;
          if (options.vertical === true) {
            const vertical = function beautify_script_output_vertical(end) {
              let longest = 0,
                complex = 0,
                aa = end - 1,
                bb = 0,
                cc = 0;
              const begin = data.begin[a],
                list = [];
              do {
                if ((data.begin[aa] === begin || data.token[aa] === "]" || data.token[aa] === ")") && ((data.token[aa + 1] === ":" && data.stack[aa] === "object") || data.token[aa + 1] === "=")) {
                  bb = aa;
                  complex = 0;
                  do {
                    if (data.begin[bb] === begin) {
                      if (data.token[bb] === "," || data.token[bb] === ";" || data.token[bb] === "x;" || (levels[bb] > -1 && data.types[bb] !== "comment")) {
                        if (data.token[bb + 1] === ".") {
                          complex = complex + (options.indent_size * options.indent_char.length);
                        }
                        break;
                      }
                    } else if (levels[bb] > -1) {
                      break;
                    }
                    if (data.types[bb] !== "comment") {
                      if (levels[bb - 1] === -10) {
                        complex = complex + 1;
                      }
                      complex = data.token[bb].length + complex;
                    }
                    bb = bb - 1;
                  } while (bb > begin);
                  cc = bb;
                  if (data.token[cc] === "," && data.token[aa + 1] === "=") {
                    do {
                      if (data.types[cc] === "end") {
                        cc = data.begin[cc];
                      }
                      if (data.begin[cc] === begin) {
                        if (data.token[cc] === ";" || data.token[cc] === "x;") {
                          break;
                        }
                        if (data.token[cc] === "var" || data.token[cc] === "const" || data.token[cc] === "let") {
                          complex = complex + (options.indent_size * options.indent_char.length);
                          break;
                        }
                      }
                      cc = cc - 1;
                    } while (cc > begin);
                  }
                  if (complex > longest) {
                    longest = complex;
                  }
                  list.push([aa, complex]);
                  aa = bb;
                } else if (data.types[aa] === "end") {
                  aa = data.begin[aa];
                }
                aa = aa - 1;
              } while (aa > begin);
              aa = list.length;
              if (aa > 0) {
                do {
                  aa = aa - 1;
                  bb = list[aa][1];
                  if (bb < longest) {
                    do {
                      data.token[list[aa][0]] = data.token[list[aa][0]] + " ";
                      bb = bb + 1;
                    } while (bb < longest);
                  }
                } while (aa > 0);
              }
            };
            a = b;
            do {
              a = a - 1;
              if (data.lexer[a] === "script") {
                if (data.token[a] === "}" && data.token[a - 1] !== "{" && levels[data.begin[a]] > 0) {
                  vertical(a);
                }
              } else {
                a = data.begin[a];
              }
            } while (a > 0);
          }
          if (options.jsscope !== "none" && options.jsscope !== "interim") {
            let linecount = 1,
              last = "",
              scope = 0,
              scoped = [],
              indent = options.indent_level,
              foldindex = [],
              start = prettydiff.start,
              exlines = [],
              exlevel = 0,
              exline;
            const code = [],
              optionValue = options.jsscope,
              foldstart = function beautify_script_output_scope_foldstart() {
                let index = code.length;
                do {
                  index = index - 1;
                } while (index > 0 && code[index] !== "<li>");
                if (code[index] === "<li>") {
                  code[index] = `<li class="fold" title="folds from line ${linecount} to line xxx">`;
                  code[index + 1] = `-${code[index + 1]}`;
                  foldindex.push([index, a]);
                }
              },
              foldend = function beautify_script_output_scope_foldend() {
                const lastfold = foldindex[foldindex.length - 1];
                if (data.types[a] === "end" && lastfold[1] === data.begin[a]) {
                  code[lastfold[0]] = code[lastfold[0]].replace("xxx", String(linecount));
                  foldindex.pop();
                } else if (data.types[a - 1] === "comment") {
                  let endfold = (a === b - 1) ?
                    linecount :
                    linecount - 1;
                  code[lastfold[0]] = code[lastfold[0]].replace("xxx", String(endfold));
                  foldindex.pop();
                }
              },
              // splits block comments, which are single tokens, into multiple lines of output
              blockline = function beautify_script_output_scope_blockline(x) {
                const commentLines = x.split(lf),
                  ii = commentLines.length;
                let hh = 0;
                if (levels[a] > 0) {
                  do {
                    commentLines[0] = tab + commentLines[0];
                    hh = hh + 1;
                  } while (hh < levels[a]);
                }
                hh = 1;
                build.push(commentLines[0]);
                if (hh < ii) {
                  do {
                    linecount = linecount + 1;
                    code.push("<li>");
                    code.push(String(linecount));
                    code.push("</li>");
                    build.push(`<em class="line">&#xA;</em></li><li class="c0">${commentLines[hh]}`);
                    hh = hh + 1;
                  } while (hh < ii);
                }
              },
              //a function for calculating indentation after each new line
              nlscope = function beautify_script_output_scope_nlscope(x) {
                let dd = 0;
                const total = (function beautify_script_output_scope_nlscope_total() {
                    if (a === b - 1) {
                      return 0;
                    }
                    if (data.lines[a + 1] - 1 > pres) {
                      return pres - 1;
                    }
                    if (data.lines[a + 1] > 1) {
                      return data.lines[a + 1] - 2;
                    }
                    return 0;
                  }()),
                  scopepush = function beautify_script_output_scope_nlscope_scopepush() {
                    let aa = 0,
                      bb = 0;
                    if (x > 0) {
                      do {
                        build.push(`<span class="l${bb}">${tab}</span>`);
                        if (scoped[aa] === true) {
                          bb = bb + 1;
                        }
                        aa = aa + 1;
                      } while (aa < x);
                    }
                  };
                if (data.token[a] !== "x}" || (data.token[a] === "x}" && data.token[a + 1] !== "}")) {
                  let index = 0;
                  if (total > 0) {
                    do {
                      linecount = linecount + 1;
                      code.push("<li>");
                      code.push(String(linecount));
                      code.push("</li>");
                      build.push(`<em class="line">&#xA;</em></li><li class="s0">`);
                      index = index + 1;
                    } while (index < total);
                  }
                  linecount = linecount + 1;
                  code.push("<li>");
                  code.push(String(linecount));
                  code.push("</li>");
                  if (a < b - 1 && data.types[a + 1] === "comment") {
                    build.push(`<em class="line">&#xA;</em></li><li class="c0">`);
                    do {
                      build.push(tab);
                      dd = dd + 1;
                    } while (dd < levels[a]);
                  } else {
                    if (data.token[a + 1] === "}" && data.stack[a + 1] !== "object" && data.stack[a + 1] !== "class") {
                      build.push(`<em class="line">&#xA;</em></li><li class="l${scope - 1}">`);
                    } else {
                      build.push(`<em class="line">&#xA;</em></li><li class="l${scope}">`);
                    }
                    scopepush();
                  }
                } else {
                  scopepush();
                }
              },
              multiline = function beautify_script_output_scope_multiline(x) {
                const temparray = x.split(lf),
                  d = temparray.length;
                let c = 1;
                build.push(temparray[0]);
                do {
                  nlscope(indent);
                  build.push(temparray[c]);
                  c = c + 1;
                } while (c < d);
              };
            options.jsscope = "interim";
            code.push("<div class=\"beautify\" data-prettydiff-ignore=\"true\"><ol class=\"count\">");
            code.push("<li>");
            code.push("1");
            code.push("</li>");
            if (data.types[a] === "comment" && data.token[a].indexOf("/*") === 0) {
              build.push(`<ol class="data"><li class="c0">${tab}`);
            } else {
              build.push("<ol class=\"data\"><li>");
            }
            a = 0;
            if (indent > 0) {
              do {
                build.push(tab);
                a = a + 1;
              } while (a < indent);
            }
            scope = 0;
            // this loops combines the white space as determined from the algorithm with the
            // tokens to create the output
            a = prettydiff.start;
            do {
              if (data.lexer[a] === lexer || prettydiff.beautify[data.lexer[a]] === undefined) {
                if (levels[a] > -1 && a < b - 1) {
                  if (levels[a] < scoped.length) {
                    do {
                      scoped.pop();
                    } while (levels[a] < scoped.length);
                  }
                }
                if (data.types[a] === "comment" && data.token[a].indexOf("/*") === 0) {
                  blockline(data.token[a]);
                } else if (invisibles.indexOf(data.token[a]) < 0) {
                  if (data.types[a] === "start" && (levels[a] > -1 || data.types[a + 1] === "comment")) {
                    foldstart();
                  } else if (data.token[a].indexOf("//") === 0 && a < b - 1 && data.token[a + 1].indexOf("//") === 0 && data.token[a - 1].indexOf("//") !== 0 && levels[a - 1] > -1) {
                    foldstart();
                  } else if (foldindex.length > 0) {
                    if (data.types[a] === "end") {
                      foldend();
                    } else if ((data.token[a].indexOf("//") !== 0 || a === b - 1) && data.token[foldindex[foldindex.length - 1][1]].indexOf("//") === 0) {
                      foldend();
                    }
                  }
                  if (data.types[a] === "reference") {
                    reference();
                  } else if (data.token[a] === "{") {
                    if (data.stack[a + 1] === "object" || data.stack[a + 1] === "class") {
                      scoped.push(false);
                      build.push("{");
                    } else {
                      if (scoped.length === levels[a]) {
                        if (scoped[scoped.length - 1] === false) {
                          scoped[scoped.length - 1] = true;
                          scope = scope + 1;
                        }
                      } else {
                        scoped.push(true);
                        scope = scope + 1;
                      }
                      data.token[a] = `<em class="s${scope}">{</em>`;
                      build.push(data.token[a]);
                    }
                    if (levels[a] > scoped.length) {
                      do {
                        scoped.push(false);
                      } while (levels[a] > scoped.length);
                    }
                  } else if (data.token[a] === "}") {
                    if (data.stack[a] === "object" || data.stack[a] === "class") {
                      build.push("}");
                    } else {
                      build.push(`<em class="s${scope}">}</em>`);
                      scope = scope - 1;
                    }
                  } else {
                    if (data.types[a].indexOf("string") > -1 && data.token[a].indexOf("\n") > 0) {
                      multiline(data.token[a].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
                    } else if (data.types[a] === "operator" || data.types[a] === "comment" || data.types[a].indexOf("string") > -1 || data.types[a] === "regex") {
                      build.push(data.token[a].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
                    } else {
                      if (data.types[a] === "start" && levels[a] > -1) {
                        scoped.push(false);
                      }
                      if (data.token[a] !== ";" || options.no_semicolon === false) {
                        build.push(data.token[a]);
                      } else if (levels[a] < 0 && data.types[a + 1] !== "comment") {
                        build.push(";");
                      }
                    }
                  }
                }
                if (a < b - 1 && data.lexer[a + 1] !== lexer && data.begin[a] === data.begin[a + 1] && data.types[a + 1].indexOf("end") < 0 && data.token[a] !== ",") {
                  build.push(" ");
                } else if (levels[a] > -1 && a < b - 1) {
                  lastLevel = levels[a];
                  nlscope(levels[a]);
                } else if (levels[a] === -10) {
                  build.push(" ");
                  if (data.lexer[a + 1] !== lexer) {
                    lastLevel = lastLevel + 1;
                  }
                }
              } else {
                if (externalIndex[a] === a) {
                  build.push(data.token[a]
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/&lt;strong class="new"&gt;this&lt;\/strong&gt;/g, "<strong class=\"new\">this</strong>")
                    .replace(/&lt;strong class="new"&gt;new&lt;\/strong&gt;/g, "<strong class=\"new\">new</strong>"));
                } else {
                  prettydiff.end = externalIndex[a];
                  options.indent_level = lastLevel;
                  prettydiff.start = a;
                  external = prettydiff.beautify[data.lexer[a]](options)
                    .replace(/\s+$/, "")
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/&lt;strong class="new"&gt;this&lt;\/strong&gt;/g, "<strong class=\"new\">this</strong>")
                    .replace(/&lt;strong class="new"&gt;new&lt;\/strong&gt;/g, "<strong class=\"new\">new</strong>");
                  if (external.indexOf(lf) > -1) {
                    if (start === 0) {
                      exline = new RegExp(`\\r?\\n(${tab}){${lastLevel}}`, "g");
                      external = external.replace(exline, lf);
                    }
                    exlines = external.split(lf);
                    exlevel = 0;
                    if (exlines.length > 1) {
                      do {
                        build.push(exlines[exlevel]);
                        nlscope(lastLevel);
                        exlevel = exlevel + 1;
                      } while (exlevel < exlines.length - 1);
                      build.push(exlines[exlevel]);
                    }
                  } else {
                    build.push(external);
                  }
                  a = prettydiff.iterator;
                  if (levels[a] === -10) {
                    build.push(" ");
                  } else if (levels[a] > -1) {
                    nlscope(levels[a]);
                  }
                }
              }
              a = a + 1;
            } while (a < b);
            a = build.length - 1;
            do {
              if (build[a] === tab) {
                build.pop();
              } else {
                break;
              }
              a = a - 1;
            } while (a > -1);
            //this logic is necessary to some line counting corrections to the HTML output
            last = build[build.length - 1];
            if (last.indexOf("<li") > 0) {
              build[build.length - 1] = "<em class=\"line\">&#xA;</em></li>";
            } else if (last.indexOf("</li>") < 0) {
              build.push("<em class=\"line\">&#xA;</em></li>");
            }
            build.push("</ol></div>");
            last = build.join("").replace(/prettydifflt/g, "<").replace(/prettydiffgt/g, ">");
            if (last.match(/<li/g) !== null) {
              scope = last
                .match(/<li/g)
                .length;
              if (linecount - 1 > scope) {
                linecount = linecount - 1;
                do {
                  code.pop();
                  code.pop();
                  code.pop();
                  linecount = linecount - 1;
                } while (linecount > scope);
              }
            }
            code.push("</ol>");
            code.push(lf);
            code.push(last);
            if (options.new_line === true) {
              code.push(lf);
            }
            options.jsscope = optionValue;
            return [
              "<p>Scope analysis does not provide support for undeclared variables.</p>",
              "<p><em>",
              scolon,
              "</em> instances of <strong>missing semicolons</strong> counted.</p>",
              "<p><em>",
              news,
              "</em> unnecessary instances of the keyword <strong>new</strong> counted.</p>",
              code.join("")
            ].join("").replace(/(\s+)$/, "").replace(options.binary_check, "");
          }
          a = prettydiff.start;
          do {
            if (data.lexer[a] === lexer || prettydiff.beautify[data.lexer[a]] === undefined) {
              if (invisibles.indexOf(data.token[a]) < 0) {
                if (data.types[a] === "reference" && options.jsscope === "interim") {
                  reference();
                } else {
                  if (data.token[a] !== ";" || options.no_semicolon === false) {
                    build.push(data.token[a]);
                  } else if (levels[a] < 0 && data.types[a + 1] !== "comment") {
                    build.push(";");
                  }
                }
              }
              if (a < b - 1 && data.lexer[a + 1] !== lexer && data.begin[a] === data.begin[a + 1] && data.types[a + 1].indexOf("end") < 0 && data.token[a] !== ",") {
                build.push(" ");
              } else if (levels[a] > -1) {
                if (((levels[a] > -1 && data.token[a] === "{") || (levels[a] > -1 && data.token[a + 1] === "}")) && data.lines[a] < 3 && options.brace_line === true) {
                  build.push(nl(0));
                }
                lastLevel = levels[a];
                build.push(nl(levels[a]));
              } else if (levels[a] === -10) {
                build.push(" ");
                if (data.lexer[a + 1] !== lexer) {
                  lastLevel = lastLevel + 1;
                }
              }
            } else {
              if (externalIndex[a] === a) {
                build.push(data.token[a]);
              } else {
                prettydiff.end = externalIndex[a];
                options.indent_level = lastLevel;
                prettydiff.start = a;
                external = prettydiff.beautify[data.lexer[a]](options).replace(/\s+$/, "");
                build.push(external);
                a = prettydiff.iterator;
                if (levels[a] === -10) {
                  build.push(" ");
                } else if (levels[a] > -1) {
                  build.push(nl(levels[a]));
                }
              }
            }
            a = a + 1;
          } while (a < b);
          prettydiff.iterator = b - 1;
          return build.join("");
        }());
      return output;
    };
    prettydiff.beautify.script = script;
  }());
  prettydiff.sparser = sparser;
  prettydiff.version = {
    "date": "18 Aug 2019",
    "number": "101.2.6",
    "parse": "1.4.12"
  };
  return prettydiff;
}());
