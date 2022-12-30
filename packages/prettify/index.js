'use strict';

var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/model.ts
var prettify = function() {
  const env = typeof process !== "undefined" && process.versions != null ? "node" : "browser";
  let input = "";
  return {
    env,
    mode: "beautify",
    end: 0,
    iterator: 0,
    start: 0,
    scopes: [],
    beautify: {},
    lexers: {},
    get source() {
      return env === "node" && Buffer.isBuffer(input) ? input.toString() : input;
    },
    set source(source) {
      input = env === "node" ? Buffer.isBuffer(source) ? source : Buffer.from(source) : source;
    },
    data: {
      begin: [],
      ender: [],
      lexer: [],
      lines: [],
      stack: [],
      token: [],
      types: []
    },
    hooks: {
      before: [],
      language: [],
      rules: [],
      after: []
    },
    stats: {
      chars: -1,
      time: -1,
      size: "",
      language: ""
    },
    options: {
      grammar: {},
      lexer: "markup",
      language: "liquid",
      languageName: "Liquid",
      mode: "beautify",
      indentLevel: 0,
      crlf: false,
      endNewline: false,
      indentChar: " ",
      indentSize: 2,
      preserveLine: 2,
      wrap: 0,
      liquid: {
        commentNewline: false,
        commentIndent: true,
        delimiterTrims: "preserve",
        ignoreTagList: [],
        lineBreakSeparator: "default",
        normalizeSpacing: true,
        preserveComment: false,
        quoteConvert: "none",
        valueForce: "intent"
      },
      markup: {
        correct: false,
        commentNewline: false,
        commentIndent: true,
        attributeCasing: "preserve",
        attributeSort: false,
        attributeSortList: [],
        forceAttribute: 3,
        forceLeadAttribute: true,
        forceIndent: false,
        ignoreStyles: false,
        ignoreScripts: false,
        preserveComment: false,
        preserveText: false,
        preserveAttributes: false,
        selfCloseSpace: true,
        quoteConvert: "none"
      },
      style: {
        correct: false,
        atRuleSpace: true,
        compressCSS: false,
        classPadding: false,
        noLeadZero: false,
        sortSelectors: false,
        sortProperties: false,
        quoteConvert: "none",
        forceValue: "preserve"
      },
      script: {
        arrayFormat: "default",
        braceNewline: false,
        bracePadding: false,
        braceStyle: "none",
        braceAllman: false,
        caseSpace: false,
        commentIndent: false,
        commentNewline: false,
        correct: false,
        elseNewline: false,
        endComma: "never",
        functionNameSpace: false,
        functionSpace: false,
        methodChain: 4,
        neverFlatten: false,
        noCaseIndent: false,
        noSemicolon: false,
        objectSort: false,
        objectIndent: "default",
        preserveComment: false,
        quoteConvert: "none",
        styleGuide: "none",
        ternaryLine: false,
        variableList: "none",
        vertical: false
      },
      json: {
        useStringify: false,
        arrayFormat: "default",
        braceAllman: false,
        bracePadding: false,
        objectIndent: "default",
        objectSort: false
      }
    }
  };
}();

// src/utils/native.ts
var assign = Object.assign;
var create = Object.create;
var keys = Object.keys;
var defineProperty = Object.defineProperty;
var isArray = Array.isArray;

// src/utils/chars.ts
var NIL = "";
var WSP = " ";
var NWL = "\n";

// src/utils/helpers.ts
function set(initial) {
  return new Set(initial);
}
function repeatChar(count, character = WSP) {
  if (count === 0)
    return character;
  let char = NIL;
  let i = 1;
  do {
    char += character;
  } while (i++ < count);
  return char;
}
var is = (string, code) => string ? string.charCodeAt(0) === code : false;
is.last = (string, code) => is(string[string.length - 1], code);
var not = (string, code) => is(string, code) === false;
not.last = (string, code) => is.last(string, code) === false;
function ws(string) {
  return /\s/.test(string);
}
function size(bytes) {
  const kb = 1024;
  const mb = 1048576;
  const gb = 1073741824;
  if (bytes < kb)
    return bytes + " B";
  else if (bytes < mb)
    return (bytes / kb).toFixed(1) + " KB";
  else if (bytes < gb)
    return (bytes / mb).toFixed(1) + " MB";
  else
    return (bytes / gb).toFixed(1) + " GB";
}
function sanitizeComment(input) {
  return `\\${input}`;
}
function getTagName(tag, slice = NaN) {
  if (typeof tag !== "string")
    return NIL;
  if (not(tag, 60 /* LAN */) && not(tag, 123 /* LCB */))
    return tag;
  if (is(tag, 60 /* LAN */)) {
    const name2 = tag.slice(1, tag.search(/[\s>]/));
    return is(name2, 63 /* QWS */) && is.last(name2, 63 /* QWS */) ? "xml" : isNaN(slice) ? name2.toLowerCase() : name2.slice(slice).toLowerCase();
  }
  const name = is(tag[2], 45 /* DSH */) ? tag.slice(3).trimStart() : tag.slice(2).trimStart();
  const tname = name.slice(0, name.search(/[\s=|!<>,.[]|-?[%}]}/)).toLowerCase();
  return isNaN(slice) ? tname : tname.slice(slice);
}
function isLiquidControl(input) {
  const begin = input.indexOf("{");
  if (is(input[begin + 1], 37 /* PER */)) {
    let token;
    token = input.slice(begin + (is(input[begin + 2], 45 /* DSH */) ? 3 : 2)).trimStart();
    token = token.slice(0, token.search(/[\s=|!<>,.[]|-?[%}]}/));
    return token.startsWith("end") ? false : grammar.liquid.control.has(token);
  }
  return false;
}
function isLiquidElse(input) {
  const begin = input.indexOf("{");
  if (is(input[begin + 1], 37 /* PER */)) {
    let token;
    token = input.slice(begin + (is(input[begin + 2], 45 /* DSH */) ? 3 : 2)).trimStart();
    token = token.slice(0, token.search(/[\s=|!<>,.[]|-?[%}]}/));
    return token.startsWith("end") ? false : grammar.liquid.else.has(token);
  }
  return false;
}
function isValueLiquid(input) {
  const eq = input.indexOf("=");
  if (eq > -1) {
    if (is(input[eq + 1], 34 /* DQO */) || is(input[eq + 1], 39 /* SQO */)) {
      return /{%-?\s*end\w+/.test(input.slice(eq, input.lastIndexOf(input[eq + 1])));
    }
  }
  return false;
}
function isLiquidLine(input) {
  if (isLiquidStart(input))
    return /{%-?\s*end\w+/.test(input);
  return false;
}
function isLiquidStart(input, strict = false) {
  let token;
  if (strict) {
    if (is(input[0], 123 /* LCB */) && is(input[1], 37 /* PER */) && is(input[input.length - 2], 37 /* PER */) && is(input[input.length - 1], 125 /* RCB */)) {
      token = input.slice(is(input[2], 45 /* DSH */) ? 3 : 2).trimStart();
      if (is(token, 34 /* DQO */) || is(token, 39 /* SQO */))
        return false;
      token = token.slice(0, token.search(/[\s=|!<"'>,.[]|-?[%}]}/));
      return token.startsWith("end") ? false : grammar.liquid.tags.has(token);
    }
    return false;
  }
  let begin = input.indexOf("{");
  if (begin === -1)
    return false;
  do {
    if (is(input[begin + 1], 37 /* PER */)) {
      token = input.slice(begin + (is(input[begin + 2], 45 /* DSH */) ? 3 : 2)).trimStart();
      token = token.slice(0, token.search(/[\s=|!<>,.[]|-?[%}]}/));
      return token.startsWith("end") ? false : grammar.liquid.tags.has(token);
    }
    begin = input.indexOf("{", begin + 1);
  } while (begin > -1);
  return false;
}
function isLiquidEnd(input) {
  let token = input;
  if (Array.isArray(input))
    token = input.join("");
  const begin = token.indexOf("{");
  if (is(token[begin + 1], 37 /* PER */)) {
    if (is(token[begin + 2], 45 /* DSH */))
      return token.slice(begin + 3).trimStart().startsWith("end");
    return token.slice(begin + 2).trimStart().startsWith("end");
  }
  return false;
}
function isLiquid(input, type) {
  if (type === 1 /* Open */) {
    return is(input[0], 123 /* LCB */) && (is(input[1], 37 /* PER */) || is(input[1], 123 /* LCB */));
  } else if (type === 6 /* OpenTag */) {
    return is(input[0], 123 /* LCB */) && is(input[1], 37 /* PER */);
  } else if (type === 7 /* OpenOutput */) {
    return is(input[0], 123 /* LCB */) && is(input[1], 123 /* LCB */);
  } else if (type === 8 /* CloseTag */) {
    return is(input[input.length - 2], 37 /* PER */) && is(input[input.length - 1], 125 /* RCB */);
  } else if (type === 9 /* CloseOutput */) {
    return is(input[input.length - 2], 125 /* RCB */) && is(input[input.length - 1], 125 /* RCB */);
  } else if (type === 4 /* HasOpen */) {
    return /{[{%]/.test(input);
  } else if (type === 5 /* HasOpenAndClose */) {
    return /{[{%]/.test(input) && /[%}]}/.test(input);
  } else if (type === 2 /* Close */) {
    const size2 = input.length;
    return is(input[size2 - 1], 125 /* RCB */) && (is(input[size2 - 2], 37 /* PER */) || is(input[size2 - 2], 125 /* RCB */));
  } else if (type === 3 /* OpenAndClose */) {
    const size2 = input.length;
    return is(input[0], 123 /* LCB */) && (is(input[1], 37 /* PER */) || is(input[1], 123 /* LCB */)) && (is(input[size2 - 1], 125 /* RCB */) && (is(input[size2 - 2], 37 /* PER */) || is(input[size2 - 2], 125 /* RCB */)));
  }
}
function safeSortAscend(item) {
  let c = 0;
  const len = item.length;
  const storeb = item;
  const safeSortAscendChild = () => {
    let a = 0;
    const lenc = storeb.length;
    if (a < lenc) {
      do {
        if (isArray(storeb[a]) === true)
          storeb[a] = safeSortAscend.apply(this, storeb[a]);
        a = a + 1;
      } while (a < lenc);
    }
  };
  const safeSortAscendRecurse = (value) => {
    let a = c;
    let b = 0;
    let d = 0;
    let e = 0;
    let ind = [];
    let key = storeb[c];
    let tstore = "";
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
      safeSortAscendRecurse("");
    } else {
      if (this.recursive === true)
        safeSortAscendChild();
      item = storeb;
    }
    return value;
  };
  safeSortAscendRecurse("");
  return item;
}
function safeSortDescend(item) {
  let c = 0;
  const len = item.length;
  const storeb = item;
  const safeSortDescendChild = () => {
    let a = 0;
    const lenc = storeb.length;
    if (a < lenc) {
      do {
        if (isArray(storeb[a]))
          storeb[a] = safeSortDescend.apply(this, storeb[a]);
        a = a + 1;
      } while (a < lenc);
    }
  };
  const safeSortDescendRecurse = (value) => {
    let a = c;
    let b = 0;
    let d = 0;
    let e = 0;
    let key = storeb[c];
    let ind = [];
    let tstore = "";
    const tkey = typeof key;
    if (a < len) {
      do {
        tstore = typeof storeb[a];
        if (storeb[a] > key || tstore > tkey) {
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
      safeSortDescendRecurse("");
    } else {
      if (this.recursive === true)
        safeSortDescendChild();
      item = storeb;
    }
    return value;
  };
  safeSortDescendRecurse("");
  return item;
}
function safeSortNormal(item) {
  let storeb = item;
  const done = [item[0]];
  const safeSortNormalChild = () => {
    let a = 0;
    const len = storeb.length;
    if (a < len) {
      do {
        if (isArray(storeb[a]))
          storeb[a] = safeSortNormal.apply(this, storeb[a]);
        a = a + 1;
      } while (a < len);
    }
  };
  const safeSortNormalRecurse = (x) => {
    let a = 0;
    const storea = [];
    const len = storeb.length;
    if (a < len) {
      do {
        if (storeb[a] !== x)
          storea.push(storeb[a]);
        a = a + 1;
      } while (a < len);
    }
    storeb = storea;
    if (storea.length > 0) {
      done.push(storea[0]);
      safeSortNormalRecurse(storea[0]);
    } else {
      if (this.recursive === true)
        safeSortNormalChild();
      item = storeb;
    }
  };
  safeSortNormalRecurse(this.array[0]);
  return item;
}

// src/options/grammar.ts
var _a;
var grammar = new (_a = class {
  constructor() {
    this.script = {};
    this.style = {};
    this.html = { embed: {} };
    this.liquid = { embed: {} };
    this.script.keywords = set(_a.script.keywords);
    this.style.units = set(_a.style.units);
    this.style.atrules = set(_a.style.atrules);
    this.style.pseudoFunctions = set(_a.style.pseudo.functions);
    this.style.pseudoClasses = set(_a.style.pseudo.classes);
    this.style.pseudoElements = set(_a.style.pseudo.elements);
    this.style.webkitClasses = set(_a.style.webkit.classes);
    this.style.webkitElements = set(_a.style.webkit.elements);
    this.html.tags = set(_a.html.tags);
    this.html.voids = set(_a.html.voids);
    this.liquid.tags = set(_a.liquid.tags);
    this.liquid.control = set(_a.liquid.control);
    this.liquid.else = set(_a.liquid.else);
    this.liquid.singletons = set(_a.liquid.singletons);
    this.liquid.scripts = /* @__PURE__ */ new Set();
    this.liquid.styles = /* @__PURE__ */ new Set();
    this.defaults();
  }
  defaults() {
    for (const tag in _a.html.embedded) {
      this.html.embed[tag] = {};
      for (const { language, attribute = null } of _a.html.embedded[tag]) {
        this.html.embed[tag].language = language;
        if (typeof attribute === "object") {
          for (const attr in attribute) {
            this.html.embed[tag].attribute = attr;
            if (isArray(attribute[attr])) {
              this.html.embed[tag].value = (v) => new Set(attribute[attr]).has(v);
            } else {
              this.html.embed[tag].value = (v) => new RegExp(attribute[attr]).test(v);
            }
          }
        } else {
          this.html.embed[tag].attribute = null;
        }
      }
    }
    for (const tag in _a.liquid.embedded) {
      this.liquid.embed[tag] = { end: (v) => new RegExp(`^{%-?\\s*end${tag}`).test(v) };
      for (const { language, argument } of _a.liquid.embedded[tag]) {
        this.liquid.embed[tag].language = language;
        if (argument) {
          if (isArray(argument)) {
            this.liquid.embed[tag].attribute = (v) => new Set(argument).has(v);
          } else {
            this.liquid.embed[tag].attribute = (v) => new RegExp(argument).test(v);
          }
        } else {
          this.liquid.embed[tag].attribute = null;
        }
      }
    }
  }
  atrules(input) {
    for (const rule of _a.style.atrules)
      if (input.startsWith(rule))
        return rule;
    return input;
  }
  embed(language, tag) {
    if (tag in this[language].embed) {
      return this[language].embed[tag];
    }
    return false;
  }
  extend(rules) {
    for (const rule in rules) {
      if (rule === "html") {
        if ("tags" in rules[rule] && isArray(rules[rule].tags)) {
          for (const tag of rules[rule].tags) {
            if (!this.html.tags.has(tag)) {
              _a.html.tags.push(tag);
              this.html.tags.add(tag);
            }
          }
        }
        if ("voids" in rules[rule] && isArray(rules[rule].voids)) {
          for (const tag of rules[rule].voids) {
            if (!this.html.voids.has(tag)) {
              _a.html.voids.push(tag);
              this.html.voids.add(tag);
            }
          }
        }
        if ("embedded" in rules[rule]) ;
      }
      if (rule === "liquid") {
        if ("tags" in rules[rule] && isArray(rules[rule].tags)) {
          for (const tag of rules[rule].tags) {
            if (!this.liquid.tags.has(tag)) {
              _a.liquid.tags.push(tag);
              this.liquid.tags.add(tag);
            }
          }
        }
        if ("else" in rules[rule] && isArray(rules[rule].else)) {
          for (const tag of rules[rule].else) {
            if (!this.liquid.else.has(tag)) {
              _a.liquid.else.push(tag);
              this.liquid.else.add(tag);
            }
          }
        }
        if ("singletons" in rules[rule] && isArray(rules[rule].singletons)) {
          for (const tag of rules[rule].singletons) {
            if (!this.liquid.singletons.has(tag)) {
              _a.liquid.singletons.push(tag);
              this.liquid.singletons.add(tag);
            }
          }
        }
        if ("embedded" in rules[rule] && typeof rules[rule].embedded === "object") {
          for (const tag in rules[rule].embedded) {
            if (!(tag in this.liquid.embed)) {
              this.liquid.embed[tag] = { end: (v) => new RegExp(`{%-?\\s*end${tag}`).test(v) };
            }
            for (const { language, argument } of rules[rule].embedded[tag]) {
              if (this.liquid.embed[tag].language !== language) {
                this.liquid.embed[tag].language = language;
              }
              if (argument) {
                if (this.liquid.embed[tag].attribute === null) {
                  if (isArray(argument)) {
                    this.liquid.embed[tag].attribute = (v) => set(argument).has(v);
                  } else {
                    this.liquid.embed[tag].attribute = (v) => new RegExp(argument).test(v);
                  }
                } else {
                  const args = [];
                  for (const defaults of _a.liquid.embedded[tag]) {
                    if (isArray(defaults.argument)) {
                      for (const def of defaults.argument) {
                        if (argument !== def)
                          args.push(argument);
                        else
                          args.push(def);
                      }
                      this.liquid.embed[tag].attribute = (v) => set(args).has(v);
                    } else {
                      if (defaults.argument !== argument) {
                        this.liquid.embed[tag].attribute = (v) => new RegExp(argument).test(v);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      if (rule === "style") {
        if ("units" in rules[rule] && isArray(rules[rule].units)) {
          for (const tag of rules[rule].units) {
            if (!this.style.units.has(tag)) {
              _a.style.units.push(tag);
              this.style.units.add(tag);
            }
          }
        }
        if ("atrules" in rules[rule] && isArray(rules[rule].atrules)) {
          for (const tag of rules[rule].atrules) {
            if (!this.style.atrules.has(tag)) {
              _a.style.atrules.push(tag);
              this.style.atrules.add(tag);
            }
          }
        }
        if ("webkit" in rules[rule]) {
          if ("classes" in rules[rule].webkit && isArray(rules[rule].webkit.classes)) {
            for (const tag of rules[rule].webkit.classes) {
              if (!this.style.webkitClasses.has(tag)) {
                _a.style.webkit.classes.push(tag);
                this.style.webkitClasses.add(tag);
              }
            }
          }
          if ("elements" in rules[rule].webkit && isArray(rules[rule].webkit.elements)) {
            for (const tag of rules[rule].webkit.elements) {
              if (!this.style.webkitElements.has(tag)) {
                _a.style.webkit.elements.push(tag);
                this.style.webkitElements.add(tag);
              }
            }
          }
        }
        if ("pseudo" in rules[rule]) {
          if ("classes" in rules[rule].pseudo && isArray(rules[rule].pseudo.classes)) {
            for (const tag of rules[rule].pseudo.classes) {
              if (!this.style.pseudoClasses.has(tag)) {
                _a.style.pseudo.classes.push(tag);
                this.style.pseudoClasses.add(tag);
              }
            }
          }
          if ("elements" in rules[rule].pseudo && isArray(rules[rule].pseudo.elements)) {
            for (const tag of rules[rule].pseudo.elements) {
              if (!this.style.pseudoElements.has(tag)) {
                _a.style.pseudo.elements.push(tag);
                this.style.pseudoElements.add(tag);
              }
            }
          }
        }
      }
      if (rule === "script") {
        if ("keywords" in rules[rule] && isArray(rules[rule].keywords)) {
          for (const tag of rules[rule].keywords) {
            if (!this.script.keywords.has(tag)) {
              _a.script.keywords.push(tag);
              this.script.keywords.add(tag);
            }
          }
        }
      }
    }
  }
}, _a.script = {
  keywords: [
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
  ]
}, _a.html = {
  embedded: {
    script: [
      {
        language: "javascript"
      },
      {
        language: "json",
        attribute: {
          type: [
            "application/json",
            "application/ld+json"
          ]
        }
      },
      {
        language: "jsx",
        attribute: {
          type: [
            "text/jsx",
            "application/jsx"
          ]
        }
      }
    ],
    style: [
      {
        language: "css"
      }
    ]
  },
  voids: [
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "keygen",
    "link",
    "menuitem",
    "meta",
    "param",
    "path",
    "circle",
    "source",
    "track",
    "wbr"
  ],
  tags: [
    "body",
    "colgroup",
    "dd",
    "dt",
    "head",
    "html",
    "li",
    "option",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "tr"
  ]
}, _a.liquid = {
  embedded: {
    schema: [
      { language: "json" }
    ],
    style: [
      { language: "css" }
    ],
    stylesheet: [
      { language: "css" },
      { language: "scss", argument: /\s*['"]scss['"]/ }
    ],
    javascript: [
      { language: "javascript" }
    ]
  },
  tags: [
    "form",
    "paginate",
    "capture",
    "case",
    "comment",
    "for",
    "if",
    "raw",
    "tablerow",
    "unless",
    "schema",
    "style",
    "script",
    "stylesheet",
    "javascript"
  ],
  control: [
    "if",
    "unless",
    "case"
  ],
  else: [
    "else",
    "elsif"
  ],
  singletons: [
    "include",
    "layout",
    "section",
    "assign",
    "liquid",
    "break",
    "continue",
    "cycle",
    "decrement",
    "echo",
    "increment",
    "render",
    "when"
  ]
}, _a.style = {
  units: [
    "%",
    "cap",
    "ch",
    "cm",
    "deg",
    "dpcm",
    "dpi",
    "dppx",
    "em",
    "ex",
    "fr",
    "grad",
    "Hz",
    "ic",
    "in",
    "kHz",
    "lh",
    "mm",
    "ms",
    "mS",
    "pc",
    "pt",
    "px",
    "Q",
    "rad",
    "rem",
    "rlh",
    "s",
    "turn",
    "vb",
    "vh",
    "vi",
    "vmax",
    "vmin",
    "vw"
  ],
  atrules: [
    "@charset",
    "@color-profile",
    "@counter-style",
    "@font-face",
    "@font-feature-values",
    "@font-palette-values",
    "@import",
    "@keyframes",
    "@layer",
    "@media",
    "@namespace",
    "@page",
    "@supports"
  ],
  webkit: {
    classes: [
      "webkit-any",
      "webkit-any-link*",
      "webkit-autofill"
    ],
    elements: [
      "webkit-file-upload-button",
      "webkit-inner-spin-button",
      "webkit-input-placeholder",
      "webkit-meter-bar",
      "webkit-meter-even-less-good-value",
      "webkit-meter-inner-element",
      "webkit-meter-optimum-value",
      "webkit-meter-suboptimum-value",
      "webkit-outer-spin-button",
      "webkit-progress-bar",
      "webkit-progress-inner-element",
      "webkit-progress-value",
      "webkit-search-cancel-button",
      "webkit-search-results-button",
      "webkit-slider-runnable-track",
      "webkit-slider-thumb"
    ]
  },
  pseudo: {
    classes: [
      "active",
      "any-link",
      "checked",
      "default",
      "defined",
      "disabled",
      "empty",
      "enabled",
      "first",
      "first-child",
      "first-of-type",
      "fullscreen",
      "focus",
      "focus-visible",
      "focus-within",
      "host",
      "hover",
      "indeterminate",
      "in-range",
      "invalid",
      "is",
      "lang",
      "last-child",
      "last-of-type",
      "left",
      "link",
      "modal",
      "not",
      "nth-child",
      "nth-col",
      "nth-last-child",
      "nth-last-of-type",
      "nth-of-type",
      "only-child",
      "only-of-type",
      "optional",
      "out-of-range",
      "picture-in-picture",
      "placeholder-shown",
      "paused",
      "playing",
      "read-only",
      "read-write",
      "required",
      "right",
      "root",
      "scope",
      "target",
      "valid",
      "visited",
      "where"
    ],
    elements: [
      "after",
      "backdrop",
      "before",
      "cue",
      "cue-region",
      "first-letter",
      "first-line",
      "file-selector-button",
      "marker",
      "part",
      "placeholder",
      "selection",
      "slotted"
    ],
    functions: [
      "after",
      "before",
      "first-letter",
      "first-line",
      "host",
      "host-context",
      "part",
      "slotted",
      "lang",
      "not",
      "nth-child",
      "nth-col",
      "nth-last-child",
      "nth-last-of-type",
      "nth-of-type",
      "where"
    ]
  }
}, _a)();

// src/parser/language.ts
var lexmap = {
  markup: "markup",
  html: "markup",
  liquid: "markup",
  xml: "markup",
  javascript: "script",
  typescript: "script",
  jsx: "script",
  tsx: "script",
  json: "script",
  less: "style",
  scss: "style",
  sass: "style",
  css: "style",
  text: "text"
};
var map = {
  html: "HTML",
  xhtml: "XHTML",
  liquid: "Liquid",
  xml: "XML",
  jsx: "JSX",
  tsx: "TSX",
  json: "JSON",
  yaml: "YAML",
  css: "CSS",
  scss: "SCSS",
  sass: "SASS",
  less: "LESS",
  text: "Plain Text",
  javascript: "JavaScript",
  typescript: "TypeScript"
};
function setLexer(input) {
  return typeof input !== "string" || input.indexOf("html") > -1 || lexmap[input] === void 0 ? "markup" : lexmap[input];
}
function setLanguageName(input) {
  if (typeof input !== "string" || map[input] === void 0)
    return input.toUpperCase();
  return map[input];
}
function reference(language) {
  const result = {};
  if (language === "unknown") {
    result.language = language;
    result.languageName = "Unknown";
    result.lexer = "markup";
  } else if (language === "xhtml" || language === "markup") {
    result.language = "xml";
    result.languageName = "XHTML";
    result.lexer = "markup";
  } else {
    result.language = language;
    result.languageName = setLanguageName(language);
    result.lexer = setLexer(language);
  }
  if (prettify.hooks.language.length > 0) {
    for (const hook of prettify.hooks.language) {
      const langhook = hook(result);
      if (typeof langhook === "object")
        assign(result, langhook);
    }
  }
  return result;
}
detect.reference = reference;
detect.listen = function(callback) {
  prettify.hooks.language.push(callback);
};
function detect(sample) {
  let b = [];
  let c = 0;
  const vartest = /(((var)|(let)|(const)|(function)|(import))\s+(\w|\$)+[a-zA-Z0-9]*)/.test(sample) && /@import/.test(sample) === false;
  const finalstatic = /((((final)|(public)|(private))\s+static)|(static\s+void))/.test(sample);
  function isStyle() {
    if (/\n\s*#+\s+/.test(sample) || /^#+\s+/.test(sample))
      return reference("markdown");
    if (/\$[a-zA-Z]/.test(sample) || /\{\s*(\w|\.|\$|#)+\s*\{/.test(sample) || /^[.#]?[\w][\w-]+\s+\{(?:\s+[a-z][a-z-]+:\s*\S+;)+\s+[&>+]?\s+[.#:]?[\w][\w-]\s+\{/.test(sample) && /:\s*@[a-zA-Z];/.test(sample) === false)
      return reference("scss");
    if (/@[a-zA-Z]:/.test(sample) || /\.[a-zA-Z]\(\);/.test(sample))
      return reference("less");
    return reference("css");
  }
  function notMarkup() {
    let d = 1;
    let join = NIL;
    let flaga = false;
    let flagb = false;
    const pp = /((public)|(private))\s+(static\s+)?(((v|V)oid)|(class)|(final))/.test(sample);
    function isScript() {
      if (sample.indexOf("(") > -1 || sample.indexOf("=") > -1 || sample.indexOf(";") > -1 && sample.indexOf("{") > -1) {
        if (finalstatic === true || /\w<\w+(,\s+\w+)*>/.test(sample))
          return reference("typescript");
        if (/(?:var|let|const)\s+\w+\s*:/.test(sample) || /=\s*<\w+/.test(sample))
          return reference("typescript");
        return reference("javascript");
      }
      return reference("unknown");
    }
    function isScriptOrStyle() {
      if (/:\s*(?:number|string|boolean|any|unknown)(?:\[\])?/.test(sample) || /(?:public|private)\s+/.test(sample) || /(?:export|declare)\s+type\s+\w+\s*=/.test(sample) || /(?:namespace|interface|enum|implements|declare)\s+\w+/.test(sample) || /(?:typeof|keyof|as)\s+\w+/.test(sample) || /\w+\s+as\s+\w+/.test(sample) || /\[\w+(?:(?::\s*\w+)|(?:\s+in\s+\w+))\]:/.test(sample) || /\):\s*\w+(?:\[\])?\s*(?:=>|\{)\s+/.test(sample) || /(var|const|let)\s+\w+:\s*(string|number|boolean|string|any)(\[\])?/.test(sample))
        return reference("typescript");
      if (/\s(class|var|const|let)\s+\w/.test(sample) === false && /<[a-zA-Z](?:-[a-zA-Z])?/.test(sample) && /<\/[a-zA-Z-](?:-[a-zA-Z])?/.test(sample) && (/\s?\{%/.test(sample) || /{{/.test(sample)))
        return reference("liquid");
      if (/^(\s*[$@])/.test(sample) === false && /([}\]];?\s*)$/.test(sample)) {
        if (/^\s*import\s+\*\s+as\s+\w+\s+from\s+['"]/.test(sample) || /module\.export\s+=\s+/.test(sample) || /export\s+default\s+\{/.test(sample) || /[?:]\s*[{[]/.test(sample) || /^(?:\s*return;?(?:\s+[{[])?)/.test(sample)) {
          return reference("javascript");
        }
      }
      if (/{%/.test(sample) && /{{/.test(sample) && /<\w/.test(sample))
        return reference("liquid");
      if (/{\s*(?:\w|\.|@|#)+\s*\{/.test(sample))
        return reference("less");
      if (/\$(\w|-)/.test(sample))
        return reference("scss");
      if (/[;{:]\s*@\w/.test(sample) === true)
        return reference("less");
      return reference("css");
    }
    if (d < c) {
      do {
        if (flaga === false) {
          if (is(b[d], 42 /* ARS */) && is(b[d - 1], 47 /* FWS */)) {
            b[d - 1] = NIL;
            flaga = true;
          } else if (flagb === false && d < c - 6 && b[d].charCodeAt(0) === 102 && b[d + 1].charCodeAt(0) === 105 && b[d + 2].charCodeAt(0) === 108 && b[d + 3].charCodeAt(0) === 116 && b[d + 4].charCodeAt(0) === 101 && b[d + 5].charCodeAt(0) === 114 && is(b[d + 6], 58 /* COL */)) {
            flagb = true;
          }
        } else if (flaga === true && is(b[d], 42 /* ARS */) && d !== c - 1 && is(b[d + 1], 47 /* FWS */)) {
          flaga = false;
          b[d] = NIL;
          b[d + 1] = NIL;
        } else if (flagb === true && is(b[d], 59 /* SEM */)) {
          flagb = false;
          b[d] = NIL;
        }
        if (flaga === true || flagb === true)
          b[d] = NIL;
        d = d + 1;
      } while (d < c);
    }
    join = b.join(NIL);
    if (/\s\/\//.test(sample) === false && /\/\/\s/.test(sample) === false && /^(\s*(\{|\[)(?!%))/.test(sample) === true && /((\]|\})\s*)$/.test(sample) && sample.indexOf(",") !== -1)
      return reference("json");
    if (/((\}?(\(\))?\)*;?\s*)|([a-z0-9]("|')?\)*);?(\s*\})*)$/i.test(sample) === true && (vartest === true || pp === true || /console\.log\(/.test(sample) === true || /export\s+default\s+class\s+/.test(sample) === true || /export\s+(const|var|let|class)s+/.test(sample) === true || /document\.get/.test(sample) === true || /((=|(\$\())\s*function)|(\s*function\s+(\w*\s+)?\()/.test(sample) === true || sample.indexOf("{") === -1 || /^(\s*if\s+\()/.test(sample) === true))
      return isScript();
    if (sample.indexOf("{") > -1 && (/^(\s*[\u007b\u0024\u002e#@a-z0-9])/i.test(sample) || /^(\s*\/(\*|\/))/.test(sample) || /^(\s*\*\s*\{)/.test(sample)) && /^(\s*if\s*\()/.test(sample) === false && /=\s*(\{|\[|\()/.test(join) === false && (/(\+|-|=|\?)=/.test(join) === false || /\/\/\s*=+/.test(join) || /=+('|")?\)/.test(sample) && /;\s*base64/.test(sample)) && /function(\s+\w+)*\s*\(/.test(join) === false)
      return isScriptOrStyle();
    return sample.indexOf("{%") > -1 ? reference("liquid") : reference("unknown");
  }
  function isMarkup() {
    function isHTML() {
      return /{%-?\s*(schema|for|if|unless|render|include)/.test(sample) || /{%-?\s*end\w+/.test(sample) || /{{-?\s*content_for/.test(sample) || /{{-?\s*[a-zA-Z0-9_'".[\]]+\s*-?}}/.test(sample) || /{%/.test(sample) && /%}/.test(sample) && /{{/.test(sample) && /}}/.test(sample) ? reference("liquid") : reference("html");
    }
    return /^(\s*<!doctype\s+html>)/i.test(sample) || /^(\s*<html)/i.test(sample) || /<form\s/i.test(sample) && /<label\s/i.test(sample) && /<input\s/i.test(sample) || (/<img(\s+\w+=['"]?\S+['"]?)*\s+src\s*=/.test(sample) || /<a(\s+\w+=['"]?\S+['"]?)*\s+href\s*=/.test(sample)) || /<ul\s/i.test(sample) && /<li\s/i.test(sample) && /<\/li>/i.test(sample) && /<\/ul>/i.test(sample) || /<head\s*>/.test(sample) && /<\/head>/.test(sample) || /^(\s*<!DOCTYPE\s+((html)|(HTML))\s+PUBLIC\s+)/.test(sample) && /XHTML\s+1\.1/.test(sample) === false && /XHTML\s+1\.0\s+(S|s)((trict)|(TRICT))/.test(sample) === false ? isHTML() : /\s?{[{%]-?/.test(sample) ? reference("liquid") : reference("xml");
  }
  if (sample === null || sample.replace(/\s+/g, NIL) === NIL)
    return reference("unknown");
  if ((/\n\s*#{1,6}\s+/.test(sample) || /\n\s*(?:\*|-|(?:\d+\.))\s/.test(sample)) && (/\[( |x|X)\]/.test(sample) || /\s[*_~]{1,2}\w+[*_~]{1,2}/.test(sample) || /\n\s*```[a-zA-Z]*?\s+/.test(sample) || /-+\|(-+\|)+/.test(sample)))
    return reference("markdown");
  if (/^(\s*<!DOCTYPE\s+html>)/i.test(sample))
    return isMarkup();
  if (/^\s*@(?:charset|import|include|keyframes|media|namespace|page)\b/.test(sample))
    return isStyle();
  if (finalstatic === false && /=(>|=|-|\+|\*)/.test(sample) === false && /^(?:\s*((if)|(for)|(function))\s*\()/.test(sample) === false && /(?:\s|;|\})((if)|(for)|(function\s*\w*))\s*\(/.test(sample) === false && vartest === false && /return\s*\w*\s*(;|\})/.test(sample) === false && (sample === void 0 || /^(?:\s*#(?!(!\/)))/.test(sample) || /\n\s*(\.|@)\w+(\(|(\s*:))/.test(sample) && />\s*<\w/.test(sample) === false || (/^\s*:root\s*\{/.test(sample) || /-{2}\w+\s*\{/.test(sample) || /^\s*(?:body|button|hr|section|h[1-6]|p|strong|\*)\s+\{\s+/.test(sample))))
    return isStyle();
  b = sample.replace(/\[[a-zA-Z][\w-]*=['"]?[a-zA-Z][\w-]*['"]?\]/g, NIL).split(NIL);
  c = b.length;
  if (/^(\s*({{|{%|<))/.test(sample))
    return isMarkup();
  if (finalstatic === true || /^(?:[\s\w-]*<)/.test(sample) === false && /(?:>[\s\w-]*)$/.test(sample) === false)
    return notMarkup();
  return (/^(?:\s*<\?xml)/.test(sample) || /(?:>[\w\s:]*)?<(?:\/|!|#)?[\w\s:\-[]+/.test(sample) || /^\s*</.test(sample) && /<\/\w+(\w|\d)+>\s*$/.test(sample)) && (/^(?:[\s\w]*<)/.test(sample) || /(?:>[\s\w]*)$/.test(sample)) || /^(?:\s*<s((cript)|(tyle)))/i.test(sample) && /(?:<\/s((cript)|(tyle))>\s*)$/i.test(sample) ? /^(?:[\s\w]*<)/.test(sample) === false || /(?:>[\s\w]*)$/.test(sample) === false ? notMarkup() : isMarkup() : reference("unknown");
}

// src/parser/parse.ts
var parse = new class Parse {
  constructor() {
    this.datanames = [
      "begin",
      "ender",
      "lexer",
      "lines",
      "stack",
      "token",
      "types"
    ];
    this.data = {
      begin: [],
      ender: [],
      lexer: [],
      lines: [],
      stack: [],
      token: [],
      types: []
    };
    this.structure = [
      [
        "global",
        -1
      ]
    ];
    this.attributes = /* @__PURE__ */ new Map();
    this.references = [[]];
    this.count = -1;
    this.lineStart = 0;
    this.lineNumber = 0;
    this.linesSpace = 0;
    this.error = NIL;
  }
  get scope() {
    const [token, index] = this.structure[this.structure.length - 1];
    return { token, index };
  }
  get current() {
    const {
      begin,
      ender,
      lexer: lexer2,
      lines,
      stack,
      token,
      types
    } = this.data;
    return {
      begin: begin[begin.length - 1],
      ender: ender[ender.length - 1],
      lexer: lexer2[lexer2.length - 1],
      lines: lines[lines.length - 1],
      stack: stack[stack.length - 1],
      token: token[begin.length - 1],
      types: types[begin.length - 1]
    };
  }
  full() {
    this.error = NIL;
    this.count = -1;
    this.linesSpace = 0;
    this.lineNumber = 0;
    this.references = [[]];
    this.data.begin = [];
    this.data.ender = [];
    this.data.lexer = [];
    this.data.lines = [];
    this.data.stack = [];
    this.data.token = [];
    this.data.types = [];
    this.structure = [["global", -1]];
    this.structure.pop = () => {
      const len = this.structure.length - 1;
      const arr = this.structure[len];
      if (len > 0)
        this.structure.splice(len, 1);
      return arr;
    };
    return this.data;
  }
  increment() {
    this.error = NIL;
    this.count = -1;
    this.linesSpace = 0;
    this.lineNumber = 0;
    this.references = [[]];
    this.data.begin = [];
    this.data.ender = [];
    this.data.lexer = [];
    this.data.lines = [];
    this.data.stack = [];
    this.data.token = [];
    this.data.types = [];
    this.structure = [["global", -1]];
    this.structure.pop = () => {
      const len = this.structure.length - 1;
      const arr = this.structure[len];
      if (len > 0)
        this.structure.splice(len, 1);
      return arr;
    };
    return this.data;
  }
  pushEnder(data) {
    let a = this.count;
    const begin = data.begin[a];
    if (data.lexer[a] === "style" && prettify.options.style.sortProperties === true || data.lexer[a] === "script" && (prettify.options.script.objectSort === true || prettify.options.json.objectSort === true)) {
      return;
    }
    do {
      if (data.begin[a] === begin || data.begin[data.begin[a]] === begin && data.types[a].indexOf("attribute") > -1 && data.types[a].indexOf("attribute_end") < 0) {
        data.ender[a] = this.count;
      } else {
        a = data.begin[a];
      }
      a = a - 1;
    } while (a > begin);
    if (a > -1)
      data.ender[a] = this.count;
  }
  lexer(output, language) {
    const mode = lexmap[language];
    const current = prettify.options.language;
    prettify.options.language = language;
    if (language === "json") {
      const json = assign({}, prettify.options.json);
      const clone = assign({}, prettify.options.script);
      prettify.options.script = assign(
        prettify.options.script,
        prettify.options.json,
        {
          quoteConvert: "double",
          endComma: "never",
          noSemicolon: true,
          vertical: false
        }
      );
      prettify.lexers[mode](output);
      if (language === "json" && prettify.options.json.objectSort === true) {
        this.sortCorrect(0, this.count + 1);
      }
      prettify.options.language = current;
      prettify.options.json = json;
      prettify.options.script = clone;
    } else {
      prettify.lexers[mode](output);
      if (language === "javascript" && prettify.options.script.objectSort === true || (language === "css" || language === "scss") && prettify.options.style.sortProperties === true) {
        this.sortCorrect(0, this.count + 1);
      }
      prettify.options.language = current;
    }
  }
  beautify(indent) {
    prettify.options.indentLevel = indent;
    const tagType = is(this.data.token[prettify.start], 123 /* LCB */) ? "liquid" : "html";
    const tagName = getTagName(this.data.stack[prettify.start]);
    const embedded = grammar.embed(tagType, tagName);
    const language = prettify.options.language;
    if (embedded !== false) {
      const lexer3 = this.data.lexer[prettify.start];
      prettify.options.language = embedded.language;
      if (embedded.language === "json") {
        const json = assign({}, prettify.options.json);
        const clone = assign({}, prettify.options.script);
        prettify.options.script = assign(
          prettify.options.script,
          prettify.options.json,
          {
            quoteConvert: "double",
            endComma: "never",
            noSemicolon: true,
            vertical: false
          }
        );
        return {
          reset() {
            prettify.options.language = language;
            prettify.options.indentLevel = 0;
            prettify.options.json = json;
            prettify.options.script = clone;
          },
          get beautify() {
            return prettify.beautify[lexer3](prettify.options);
          }
        };
      }
      return {
        reset() {
          prettify.options.language = language;
          prettify.options.indentLevel = 0;
        },
        get beautify() {
          return prettify.beautify[lexer3](prettify.options);
        }
      };
    }
    const lexer2 = this.data.lexer[prettify.start];
    return {
      reset() {
        prettify.options.language = language;
        prettify.options.indentLevel = 0;
      },
      get beautify() {
        return prettify.beautify[lexer2](prettify.options);
      }
    };
  }
  push(data, record, structure = NIL) {
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
      if (record.lexer !== "style" && structure.replace(/[{}@<>%#]/g, NIL) === NIL) {
        structure = record.types === "else" ? "else" : getTagName(record.token);
      }
      if (record.types === "start" || record.types.indexOf("_start") > 0) {
        this.structure.push([structure, this.count]);
      } else if (record.types === "end" || record.types.indexOf("_end") > 0) {
        let ender = 0;
        const length = this.structure.length;
        if (this.structure.length > 2 && (data.types[this.structure[length - 1][1]] === "else" || data.types[this.structure[length - 1][1]].indexOf("_else") > 0) && (data.types[this.structure[length - 2][1]] === "start" || data.types[this.structure[length - 2][1]].indexOf("_start") > 0) && (data.types[this.structure[length - 2][1] + 1] === "else" || data.types[this.structure[length - 2][1] + 1].indexOf("_else") > 0)) {
          this.structure.pop();
          data.begin[this.count] = this.structure[this.structure.length - 1][1];
          data.stack[this.count] = this.structure[this.structure.length - 1][0];
          data.ender[this.count - 1] = this.count;
          ender = data.ender[data.begin[this.count] + 1];
        }
        this.pushEnder(data);
        if (ender > 0)
          data.ender[data.begin[this.count] + 1] = ender;
        this.structure.pop();
      } else if (record.types === "else" || record.types.indexOf("_else") > 0) {
        if (structure === NIL)
          structure = "else";
        if (this.count > 0 && (data.types[this.count - 1] === "start" || data.types[this.count - 1].indexOf("_start") > 0)) {
          this.structure.push([structure, this.count]);
        } else {
          this.pushEnder(data);
          this.structure[this.structure.length - 1] = structure === NIL ? ["else", this.count] : [structure, this.count];
        }
      }
    }
  }
  pop(data) {
    const output = {
      begin: data.begin.pop(),
      ender: data.ender.pop(),
      lexer: data.lexer.pop(),
      lines: data.lines.pop(),
      stack: data.stack.pop(),
      token: data.token.pop(),
      types: data.types.pop()
    };
    if (data === this.data)
      this.count = this.count - 1;
    return output;
  }
  concat(data, record) {
    data.begin = data.begin.concat(record.begin);
    data.ender = data.ender.concat(record.ender);
    data.lexer = data.lexer.concat(record.lexer);
    data.stack = data.stack.concat(record.stack);
    data.token = data.token.concat(record.token);
    data.types = data.types.concat(record.types);
    data.lines = data.lines.concat(record.lines);
    if (data === this.data)
      this.count = data.token.length - 1;
  }
  sortObject(data) {
    let cc2 = this.count;
    let dd = this.structure[this.structure.length - 1][1];
    let ee = 0;
    let ff = 0;
    let gg = 0;
    let behind = 0;
    let front = 0;
    let keyend = 0;
    let keylen = 0;
    let comma = true;
    const keys2 = [];
    const begin = dd;
    const struc = this.structure[this.structure.length - 1][0];
    const lines = this.linesSpace;
    const length = this.count;
    const json = prettify.options.language === "json";
    const global = data.lexer[cc2] === "style" && struc === "global";
    const style3 = data.lexer[cc2] === "style";
    const delim = style3 === true ? [";", "separator"] : [",", "separator"];
    const stack = global === true ? "global" : struc;
    const store = {
      begin: [],
      ender: [],
      lexer: [],
      lines: [],
      stack: [],
      token: [],
      types: []
    };
    const sort = (x, y) => {
      let xx = x[0];
      let yy = y[0];
      if (data.types[xx] === "comment") {
        do
          xx = xx + 1;
        while (xx < length && data.types[xx] === "comment");
        if (data.token[xx] === void 0)
          return 1;
      }
      if (data.types[yy] === "comment") {
        do
          yy = yy + 1;
        while (yy < length && data.types[yy] === "comment");
        if (data.token[yy] === void 0)
          return 1;
      }
      if (style3 === true) {
        if (data.token[xx].indexOf("@import") === 0 || data.token[yy].indexOf("@import") === 0) {
          return xx < yy ? -1 : 1;
        }
        if (data.types[xx] !== data.types[yy]) {
          if (data.types[xx] === "function")
            return 1;
          if (data.types[xx] === "variable")
            return -1;
          if (data.types[xx] === "selector")
            return 1;
          if (data.types[xx] === "property" && data.types[yy] !== "variable")
            return -1;
          if (data.types[xx] === "mixin" && data.types[yy] !== "property" && data.types[yy] !== "variable")
            return -1;
        }
      }
      if (data.token[xx].toLowerCase() > data.token[yy].toLowerCase())
        return 1;
      return -1;
    };
    behind = cc2;
    do {
      if (data.begin[cc2] === dd || global === true && cc2 < behind && is(data.token[cc2], 125 /* RCB */) && data.begin[data.begin[cc2]] === -1) {
        if (data.types[cc2].indexOf("template") > -1)
          return;
        if (data.token[cc2] === delim[0] || style3 === true && is(data.token[cc2], 125 /* RCB */) && not(data.token[cc2 + 1], 59 /* SEM */)) {
          comma = true;
          front = cc2 + 1;
        } else if (style3 === true && is(data.token[cc2 - 1], 125 /* RCB */)) {
          comma = true;
          front = cc2;
        }
        if (front === 0 && data.types[0] === "comment") {
          do
            front = front + 1;
          while (data.types[front] === "comment");
        } else if (data.types[front] === "comment" && data.lines[front] < 2) {
          front = front + 1;
        }
        if (comma === true && (data.token[cc2] === delim[0] || style3 === true && is(data.token[cc2 - 1], 125 /* RCB */)) && front <= behind) {
          if (style3 === true && "};".indexOf(data.token[behind]) < 0) {
            behind = behind + 1;
          } else if (style3 === false && not(data.token[behind], 44 /* COM */)) {
            behind = behind + 1;
          }
          keys2.push([front, behind]);
          if (style3 === true && is(data.token[front], 125 /* RCB */)) {
            behind = front;
          } else {
            behind = front - 1;
          }
        }
      }
      cc2 = cc2 - 1;
    } while (cc2 > dd);
    if (keys2.length > 0 && keys2[keys2.length - 1][0] > cc2 + 1) {
      ee = keys2[keys2.length - 1][0] - 1;
      if (data.types[ee] === "comment" && data.lines[ee] > 1) {
        do
          ee = ee - 1;
        while (ee > 0 && data.types[ee] === "comment");
        keys2[keys2.length - 1][0] = ee + 1;
      }
      if (data.types[cc2 + 1] === "comment" && cc2 === -1) {
        do
          cc2 = cc2 + 1;
        while (data.types[cc2 + 1] === "comment");
      }
      keys2.push([cc2 + 1, ee]);
    }
    if (keys2.length > 1) {
      if (json === true || style3 === true || is(data.token[cc2 - 1], 61 /* EQS */) || is(data.token[cc2 - 1], 58 /* COL */) || is(data.token[cc2 - 1], 40 /* LPR */) || is(data.token[cc2 - 1], 91 /* LSB */) || is(data.token[cc2 - 1], 44 /* COM */) || data.types[cc2 - 1] === "word" || cc2 === 0) {
        keys2.sort(sort);
        keylen = keys2.length;
        comma = false;
        dd = 0;
        do {
          keyend = keys2[dd][1];
          if (style3 === true) {
            gg = keyend;
            if (data.types[gg] === "comment")
              gg = gg - 1;
            if (is(data.token[gg], 125 /* RCB */)) {
              keyend = keyend + 1;
              delim[0] = "}";
              delim[1] = "end";
            } else {
              delim[0] = ";";
              delim[1] = "separator";
            }
          }
          ee = keys2[dd][0];
          if (style3 === true && data.types[keyend - 1] !== "end" && data.types[keyend] === "comment" && data.types[keyend + 1] !== "comment" && dd < keylen - 1) {
            keyend = keyend + 1;
          }
          if (ee < keyend) {
            do {
              if (style3 === false && dd === keylen - 1 && ee === keyend - 2 && is(data.token[ee], 44 /* COM */) && data.lexer[ee] === "script" && data.types[ee + 1] === "comment") {
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
              if (data.token[ee] === delim[0] && (style3 === true || data.begin[ee] === data.begin[keys2[dd][0]])) {
                comma = true;
              } else if (data.token[ee] !== delim[0] && data.types[ee] !== "comment") {
                comma = false;
              }
              ee = ee + 1;
            } while (ee < keyend);
          }
          if (comma === false && store.token[store.token.length - 1] !== "x;" && (style3 === true || dd < keylen - 1)) {
            ee = store.types.length - 1;
            if (store.types[ee] === "comment") {
              do
                ee = ee - 1;
              while (ee > 0 && store.types[ee] === "comment");
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
                types: delim[1]
              }
            });
            ff = ff + 1;
          }
          dd = dd + 1;
        } while (dd < keylen);
        this.splice({ data, howmany: ff, index: cc2 + 1 });
        this.linesSpace = lines;
        this.concat(data, store);
      }
    }
  }
  sortSafe(array, operation, recursive) {
    if (isArray(array) === false)
      return array;
    if (operation === "normal")
      return safeSortNormal.call({ array, recursive }, array);
    if (operation === "descend")
      return safeSortDescend.call({ recursive }, array);
    return safeSortAscend.call({ recursive }, array);
  }
  sortCorrect(start, end) {
    let a = start;
    let endslen = -1;
    const data = this.data;
    const ends = [];
    const structure = this.structure.length < 2 ? [-1] : [this.structure[this.structure.length - 2][1]];
    do {
      if (a > 0 && data.types[a].indexOf("attribute") > -1 && data.types[a].indexOf("end") < 0 && data.types[a - 1].indexOf("start") < 0 && data.types[a - 1].indexOf("attribute") < 0 && data.lexer[a] === "markup") {
        structure.push(a - 1);
      }
      if (a > 0 && data.types[a - 1].indexOf("attribute") > -1 && data.types[a].indexOf("attribute") < 0 && data.lexer[structure[structure.length - 1]] === "markup" && data.types[structure[structure.length - 1]].indexOf("start") < 0) {
        structure.pop();
      }
      if (data.begin[a] !== structure[structure.length - 1]) {
        data.begin[a] = structure.length > 0 ? structure[structure.length - 1] : -1;
      }
      if (data.types[a].indexOf("else") > -1) {
        if (structure.length > 0) {
          structure[structure.length - 1] = a;
        } else {
          structure.push(a);
        }
      }
      if (data.types[a].indexOf("end") > -1)
        structure.pop();
      if (data.types[a].indexOf("start") > -1)
        structure.push(a);
      a = a + 1;
    } while (a < end);
    a = end;
    do {
      a = a - 1;
      if (data.types[a].indexOf("end") > -1) {
        ends.push(a);
        endslen = endslen + 1;
      }
      data.ender[a] = endslen > -1 ? ends[endslen] : -1;
      if (data.types[a].indexOf("start") > -1) {
        ends.pop();
        endslen = endslen - 1;
      }
    } while (a > start);
  }
  space(array, length) {
    this.linesSpace = 1;
    return (index) => {
      do {
        if (is(array[index], 10 /* NWL */))
          this.lineNumber = this.lineNumber + 1;
        if (ws(array[index]) === false)
          break;
        this.linesSpace = this.linesSpace + 1;
        index = index + 1;
      } while (index < length);
      return index;
    };
  }
  spacer(args) {
    this.linesSpace = 1;
    do {
      if (args.array[args.index] === NWL) {
        this.linesSpace = this.linesSpace + 1;
        this.lineNumber = this.lineNumber + 1;
      }
      if (ws(args.array[args.index + 1]) === false)
        break;
      args.index = args.index + 1;
    } while (args.index < args.end);
    return args.index;
  }
  splice(splice) {
    const { data } = this;
    const finalItem = [data.begin[this.count], data.token[this.count]];
    if (splice.record !== void 0 && splice.record.token !== NIL) {
      for (const value of this.datanames) {
        splice.data[value].splice(splice.index, splice.howmany, splice.record[value]);
      }
      if (splice.data === data) {
        this.count = this.count - splice.howmany + 1;
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

// src/utils/regex.ts
var SpaceLead = /^\s+/;
var SpaceEnd = /\s+$/;
var StripLead = /^[\t\v\f\r \u00a0\u2000-\u200b\u2028-\u2029\u3000]+/;
var StripEnd = /[\t\v\f \u00a0\u2000-\u200b\u2028-\u2029\u3000]+$/;
var SpaceOnly = /[\t\v\r \u00a0\u2000-\u200b\u2028-\u2029\u3000]+/g;
var CommControl = /(\/[*/]|{%-?\s*(?:comment\s*-?%}|#)|<!-{2})\s*@prettify\s+/;
var CommIgnoreFile = /(\/[*/]|{%-?\s*(?:comment\s*-?%})|<!-{2})\s*@prettify-ignore\b/;
var CommIgnoreNext = /(\/[*/]|{%-?\s*(?:comment\s*-?%}|#)|<!-{2})\s*@prettify-ignore-next\b/;
var LiqDelims = /{%-?\s*|\s*-?%}/g;
var CharEscape = /(\/|\\|\||\*|\[|\]|\{|\})/g;

// src/comments/parse.ts
function wrapCommentBlock(config) {
  const { options: options2 } = prettify;
  const build = [];
  const second = [];
  const lf = options2.crlf === true ? "\r\n" : NWL;
  const sanitize = config.begin.replace(CharEscape, sanitizeComment);
  const liqcomm = is(config.begin[0], 123 /* LCB */) && is(config.begin[1], 37 /* PER */);
  const regIgnore = new RegExp(`^(${sanitize}\\s*@prettify-ignore-start)`);
  const regStart = new RegExp(`(${sanitize}\\s*)`);
  const regEnd = liqcomm ? new RegExp(`\\s*${config.ender.replace(LiqDelims, (i) => is(i, 123 /* LCB */) ? "{%-?\\s*" : "\\s*-?%}")}$`) : new RegExp(config.ender.replace(CharEscape, sanitizeComment));
  let a = config.start;
  let b = 0;
  let c = 0;
  let d = 0;
  let len = 0;
  let lines = [];
  let space = NIL;
  let bline = NIL;
  let emptyLine = false;
  let bulletLine = false;
  let numberLine = false;
  let output = NIL;
  let terml = config.ender.length - 1;
  let term = config.ender.charAt(terml);
  let twrap = 0;
  function emptyLines() {
    if (/^\s+$/.test(lines[b + 1]) || lines[b + 1] === NIL) {
      do
        b = b + 1;
      while (b < len && (/^\s+$/.test(lines[b + 1]) || lines[b + 1] === NIL));
    }
    if (b < len - 1)
      second.push(NIL);
  }
  function ignoreComment() {
    let termination = NWL;
    a = a + 1;
    do {
      build.push(config.chars[a]);
      if (build.slice(build.length - 20).join(NIL) === "@prettify-ignore-end") {
        if (liqcomm) {
          const d2 = config.chars.indexOf("{", a);
          if (is(config.chars[d2 + 1], 37 /* PER */)) {
            const ender = config.chars.slice(d2, config.chars.indexOf("}", d2 + 1) + 1).join(NIL);
            if (regEnd.test(ender))
              config.ender = ender;
          }
        }
        a = a + 1;
        break;
      }
      a = a + 1;
    } while (a < config.end);
    b = a;
    terml = config.begin.length - 1;
    term = config.begin.charAt(terml);
    do {
      if (config.begin === "/*" && is(config.chars[b - 1], 47 /* FWS */) && (is(config.chars[b], 42 /* ARS */) || is(config.chars[b], 47 /* FWS */))) {
        break;
      }
      if (config.begin !== "/*" && config.chars[b] === term && config.chars.slice(b - terml, b + 1).join(NIL) === config.begin) {
        break;
      }
      b = b - 1;
    } while (b > config.start);
    if (config.begin === "/*" && is(config.chars[b], 42 /* ARS */)) {
      termination = "*/";
    } else if (config.begin !== "/*") {
      termination = config.ender;
    }
    terml = termination.length - 1;
    term = termination.charAt(terml);
    if (termination !== NWL || config.chars[a] !== NWL) {
      do {
        build.push(config.chars[a]);
        if (termination === NWL && config.chars[a + 1] === NWL)
          break;
        if (config.chars[a] === term && config.chars.slice(a - terml, a + 1).join(NIL) === termination)
          break;
        a = a + 1;
      } while (a < config.end);
    }
    if (config.chars[a] === NWL)
      a = a - 1;
    output = build.join(NIL).replace(StripEnd, NIL);
    return [output, a];
  }
  do {
    build.push(config.chars[a]);
    if (config.chars[a] === NWL)
      parse.lineNumber = parse.lineNumber + 1;
    if (config.chars[a] === term && config.chars.slice(a - terml, a + 1).join(NIL) === config.ender)
      break;
    a = a + 1;
  } while (a < config.end);
  output = build.join(NIL);
  if (regIgnore.test(output) === true)
    return ignoreComment();
  if (liqcomm === true && options2.liquid.preserveComment === true || liqcomm === false && options2.markup.preserveComment === true || options2.wrap < 1 || a === config.end || output.length <= options2.wrap && output.indexOf(NWL) < 0 || config.begin === "/*" && output.indexOf(NWL) > 0 && output.replace(NWL, NIL).indexOf(NWL) > 0 && /\n(?!(\s*\*))/.test(output) === false) {
    return [output, a];
  }
  b = config.start;
  if (b > 0 && not(config.chars[b - 1], 10 /* NWL */) && ws(config.chars[b - 1])) {
    do
      b = b - 1;
    while (b > 0 && not(config.chars[b - 1], 10 /* NWL */) && ws(config.chars[b - 1]));
  }
  space = config.chars.slice(b, config.start).join(NIL);
  const spaceLine = new RegExp(NWL + space, "g");
  lines = output.replace(/\r\n/g, NWL).replace(spaceLine, NWL).split(NWL);
  len = lines.length;
  lines[0] = lines[0].replace(regStart, NIL);
  lines[len - 1] = lines[len - 1].replace(regEnd, NIL);
  if (len < 2)
    lines = lines[0].split(WSP);
  if (lines[0] === NIL) {
    lines[0] = config.begin;
  } else {
    lines.splice(0, 0, config.begin);
  }
  len = lines.length;
  b = 0;
  do {
    bline = b < len - 1 ? lines[b + 1].replace(StripLead, NIL) : NIL;
    if (/^\s+$/.test(lines[b]) === true || lines[b] === NIL) {
      emptyLines();
    } else if (lines[b].replace(StripLead, NIL).length > options2.wrap && lines[b].replace(StripLead, NIL).indexOf(WSP) > options2.wrap) {
      lines[b] = lines[b].replace(StripLead, NIL);
      c = lines[b].indexOf(WSP);
      second.push(lines[b].slice(0, c));
      lines[b] = lines[b].slice(c + 1);
      b = b - 1;
    } else {
      lines[b] = config.begin === "/*" && lines[b].indexOf("/*") !== 0 ? `   ${lines[b].replace(StripLead, NIL).replace(StripEnd, NIL).replace(/\s+/g, WSP)}` : `${lines[b].replace(StripLead, NIL).replace(StripEnd, NIL).replace(/\s+/g, WSP)}`;
      twrap = b < 1 ? options2.wrap - (config.begin.length + 1) : options2.wrap;
      c = lines[b].length;
      d = lines[b].replace(StripLead, NIL).indexOf(WSP);
      if (c > twrap && d > 0 && d < twrap) {
        c = twrap;
        do {
          c = c - 1;
          if (ws(lines[b].charAt(c)) && c <= options2.wrap)
            break;
        } while (c > 0);
        if (/^\s*\d+\.\s/.test(lines[b]) === true && /^\s*\d+\.\s/.test(lines[b + 1]) === false) {
          lines.splice(b + 1, 0, "1. ");
        }
        if (/^\s+$/.test(lines[b + 1]) === true || lines[b + 1] === NIL) {
          second.push(lines[b].slice(0, c));
          lines[b] = lines[b].slice(c + 1);
          emptyLine = true;
          b = b - 1;
        } else if (/^\s*[*-]\s/.test(lines[b + 1])) {
          second.push(lines[b].slice(0, c));
          lines[b] = lines[b].slice(c + 1);
          bulletLine = true;
          b = b - 1;
        } else if (/^\s*\d+\.\s/.test(lines[b + 1])) {
          second.push(lines[b].slice(0, c));
          lines[b] = lines[b].slice(c + 1);
          numberLine = true;
          b = b - 1;
        } else if (lines[b].replace(StripLead, NIL).indexOf(WSP) < options2.wrap) {
          lines[b + 1] = lines[b].length > options2.wrap ? lines[b].slice(c + 1) + lf + lines[b + 1] : `${lines[b].slice(c + 1)} ${lines[b + 1]}`;
        }
        if (emptyLine === false && bulletLine === false && numberLine === false) {
          lines[b] = lines[b].slice(0, c);
        }
      } else if (lines[b + 1] !== void 0 && (lines[b].length + bline.indexOf(WSP) > options2.wrap && bline.indexOf(WSP) > 0 || lines[b].length + bline.length > options2.wrap && bline.indexOf(WSP) < 0)) {
        second.push(lines[b]);
        b = b + 1;
      } else if (lines[b + 1] !== void 0 && /^\s+$/.test(lines[b + 1]) === false && lines[b + 1] !== NIL && /^\s*(?:[*-]|\d+\.)\s/.test(lines[b + 1]) === false) {
        second.push(lines[b]);
        emptyLine = true;
      } else {
        second.push(lines[b]);
        emptyLine = true;
      }
      bulletLine = false;
      numberLine = false;
    }
    b = b + 1;
  } while (b < len);
  if (second.length > 0) {
    if (second[second.length - 1].length > options2.wrap - (config.ender.length + 1)) {
      second.push(config.ender);
    } else {
      second.push(config.ender);
    }
    output = second.join(lf);
  } else {
    lines[lines.length - 1] = lines[lines.length - 1] + config.ender;
    output = lines.join(lf);
  }
  return [output, a];
}
function wrapCommentLine(config) {
  const { wrap } = prettify.options;
  const { preserveComment } = prettify.options[config.lexer];
  let a = config.start;
  let b = 0;
  let output = NIL;
  let build = [];
  function recurse() {
    let line = NIL;
    do {
      b = b + 1;
      if (is(config.chars[b + 1], 10 /* NWL */))
        return;
    } while (b < config.end && ws(config.chars[b]));
    if (config.chars[b] + config.chars[b + 1] === "//") {
      build = [];
      do {
        build.push(config.chars[b]);
        b = b + 1;
      } while (b < config.end && not(config.chars[b], 10 /* NWL */));
      line = build.join(NIL);
      if (/^\/\/ (?:[*-]|\d+\.)/.test(line) === false && /^\/\/\s*$/.test(line) === false) {
        output = `${output} ${line.replace(/(^\/\/\s*)/, NIL).replace(StripEnd, NIL)}`;
        a = b - 1;
        recurse();
      }
    }
  }
  function wordWrap() {
    const lines = [];
    const record = {
      ender: -1,
      types: "comment",
      lexer: config.lexer,
      lines: parse.linesSpace
    };
    if (parse.count > -1) {
      record.begin = parse.structure[parse.structure.length - 1][1];
      record.stack = parse.structure[parse.structure.length - 1][0];
      record.token = parse.data.token[parse.count];
    } else {
      record.begin = -1;
      record.stack = "global";
      record.token = NIL;
    }
    let c = 0;
    let d = 0;
    output = output.replace(/\s+/g, WSP).replace(StripEnd, NIL);
    d = output.length;
    if (wrap > d)
      return;
    do {
      c = wrap;
      if (not(output[c], 32 /* WSP */)) {
        do
          c = c - 1;
        while (c > 0 && not(output[c], 32 /* WSP */));
        if (c < 3) {
          c = wrap;
          do
            c = c + 1;
          while (c < d - 1 && not(output[c], 32 /* WSP */));
        }
      }
      lines.push(output.slice(0, c));
      output = `// ${output.slice(c).replace(StripLead, NIL)}`;
      d = output.length;
    } while (wrap < d);
    c = 0;
    d = lines.length;
    do {
      record.token = lines[c];
      parse.push(parse.data, record, NIL);
      record.lines = 2;
      parse.linesSpace = 2;
      c = c + 1;
    } while (c < d);
  }
  do {
    build.push(config.chars[a]);
    a = a + 1;
  } while (a < config.end && not(config.chars[a], 10 /* NWL */));
  if (a === config.end) {
    config.chars.push(NWL);
  } else {
    a = a - 1;
  }
  output = build.join(NIL).replace(StripEnd, NIL);
  if (/^(\/\/\s*@prettify-ignore-start\b)/.test(output) === true) {
    let termination = NWL;
    a = a + 1;
    do {
      build.push(config.chars[a]);
      a = a + 1;
    } while (a < config.end && (not(config.chars[a - 1], 100) || is(config.chars[a - 1], 100) && build.slice(build.length - 20).join(NIL) !== "@prettify-ignore-end"));
    b = a;
    do
      ;
    while (b > config.start && is(config.chars[b - 1], 47 /* FWS */) && (is(config.chars[b], 42 /* ARS */) || is(config.chars[b], 47 /* FWS */)));
    if (is(config.chars[b], 42 /* ARS */))
      termination = "*/";
    if (termination !== NWL || not(config.chars[a], 10 /* NWL */)) {
      do {
        build.push(config.chars[a]);
        if (termination === NWL && is(config.chars[a + 1], 10 /* NWL */))
          break;
        a = a + 1;
      } while (a < config.end && (termination === NWL || termination === "*/" && (is(config.chars[a - 1], 42 /* ARS */) || is(config.chars[a], 47 /* FWS */))));
    }
    if (config.chars[a] === NWL)
      a = a - 1;
    output = build.join(NIL).replace(StripEnd, NIL);
    return [output, a];
  }
  if (output === "//" || preserveComment === true)
    return [output, a];
  output = output.replace(/(\/\/\s*)/, "// ");
  if (wrap < 1 || a === config.end - 1 && parse.data.begin[parse.count] < 1)
    return [output, a];
  b = a + 1;
  recurse();
  wordWrap();
  return [output, a];
}

// src/lexers/style.ts
prettify.lexers.style = function style(source) {
  const { options: options2 } = prettify;
  const rules = options2.style;
  const { data } = parse;
  const b = source.split(NIL);
  const c = source.length;
  const mapper = [];
  const nosort = [];
  let a = 0;
  let ltype = NIL;
  let ltoke = NIL;
  function push(structure) {
    parse.push(data, {
      begin: parse.structure[parse.structure.length - 1][1],
      ender: -1,
      lexer: "style",
      lines: parse.linesSpace,
      stack: parse.structure[parse.structure.length - 1][0],
      token: ltoke,
      types: ltype
    }, structure);
  }
  function esctest(index) {
    const slashy = index;
    do {
      index = index - 1;
    } while (b[index] === "\\" && index > 0);
    return (slashy - index) % 2 === 1;
  }
  function value(input) {
    const x = input.replace(/\s*!important/, " !important").split(NIL);
    const transition = /-?transition$/.test(data.token[parse.count - 2]);
    const values = [];
    const zerodot = /(\s|\(|,)-?0+\.?\d+([a-z]|\)|,|\s)/g;
    const dot = /(\s|\(|,)-?\.?\d+([a-z]|\)|,|\s)/g;
    let ii = 0;
    let dd = 0;
    let block = NIL;
    let leng = x.length;
    let items = [];
    const colorPush = (value2) => {
      return value2;
    };
    function valueSpace(find) {
      find = find.replace(/\s*/g, NIL);
      return /\/\d/.test(find) && input.indexOf("url(") === 0 ? find : ` ${find.charAt(0)} ${find.charAt(1)}`;
    }
    function zeroFix(find) {
      if (rules.noLeadZero === true) {
        return find.replace(/^-?\D0+(\.|\d)/, (search) => search.replace(/0+/, NIL));
      } else if (/0*\./.test(find)) {
        return find.replace(/0*\./, "0.");
      } else if (/0+/.test(/\d+/.exec(find)[0])) {
        return /^\D*0+\D*$/.test(find) ? find.replace(/0+/, "0") : find.replace(/\d+/.exec(find)[0], /\d+/.exec(find)[0].replace(/^0+/, NIL));
      }
      return find;
    }
    function commaSpace(find) {
      return find.replace(",", ", ");
    }
    function units(dimension) {
      return `${dimension} `;
    }
    function safeSlash() {
      const start = ii - 1;
      let xx = start;
      if (start < 1)
        return true;
      do {
        xx = xx - 1;
      } while (xx > 0 && x[xx] === "\\");
      return (start - xx) % 2 === 1;
    }
    if (ii < leng) {
      do {
        items.push(x[ii]);
        if (x[ii - 1] !== "\\" || safeSlash() === false) {
          if (block === NIL) {
            if (is(x[ii], 34 /* DQO */)) {
              block = '"';
              dd = dd + 1;
            } else if (is(x[ii], 39 /* SQO */)) {
              block = "'";
              dd = dd + 1;
            } else if (is(x[ii], 40 /* LPR */)) {
              block = ")";
              dd = dd + 1;
            } else if (is(x[ii], 91 /* LSB */)) {
              block = "]";
              dd = dd + 1;
            }
          } else if (is(x[ii], 40 /* LPR */) && is(block, 41 /* RPR */) || is(x[ii], 91 /* LSB */) && is(block, 93 /* RSB */)) {
            dd = dd + 1;
          } else if (x[ii] === block) {
            dd = dd - 1;
            if (dd === 0)
              block = NIL;
          }
        }
        if (block === NIL && is(x[ii], 32 /* WSP */)) {
          items.pop();
          values.push(colorPush(items.join(NIL)));
          items = [];
        }
        ii = ii + 1;
      } while (ii < leng);
    }
    values.push(colorPush(items.join(NIL)));
    leng = values.length;
    ii = 0;
    if (ii < leng) {
      do {
        if (rules.noLeadZero === true && /^-?0+\.\d+[a-z]/.test(values[ii]) === true) {
          values[ii] = values[ii].replace(/0+\./, ".");
        } else if (rules.noLeadZero === false && /^-?\.\d+[a-z]/.test(values[ii])) {
          values[ii] = values[ii].replace(".", "0.");
        } else if (zerodot.test(values[ii]) || dot.test(values[ii])) {
          values[ii] = values[ii].replace(zerodot, zeroFix).replace(dot, zeroFix);
        } else if (/^(0+([a-z]{2,3}|%))$/.test(values[ii]) && transition === false) {
          values[ii] = "0";
        } else if (/^(0+)/.test(values[ii])) {
          values[ii] = values[ii].replace(/0+/, "0");
          if (/\d/.test(values[ii].charAt(1)))
            values[ii] = values[ii].substr(1);
        } else if (/^url\((?!('|"))/.test(values[ii]) && values[ii].charCodeAt(values[ii].length - 1) === 41 /* RPR */) {
          block = values[ii].charAt(values[ii].indexOf("url(") + 4);
          if (block !== "@" && not(block, 40 /* LPR */) && not(block, 60 /* LAN */)) {
            if (rules.quoteConvert === "double") {
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
        if (/^\w+\(/.test(values[ii]) && values[ii].charAt(values[ii].length - 1) === ")" && (values[ii].indexOf("url(") !== 0 || values[ii].indexOf("url(") === 0 && values[ii].indexOf(WSP) > 0)) {
          values[ii] = values[ii].replace(/,\S/g, commaSpace);
        }
        ii = ii + 1;
      } while (ii < leng);
    }
    block = values.join(WSP);
    return block.charAt(0) + block.slice(1).replace(/\s*(\/|\+|\*)\s*(\d|\$)/, valueSpace);
  }
  function buildToken() {
    const block = [];
    const out = [];
    const qc = rules.quoteConvert;
    let aa = a;
    let bb = 0;
    let outy = NIL;
    let func = null;
    let nopush = false;
    function spaceStart() {
      out.push(b[aa]);
      if (ws(b[aa + 1]))
        do {
          aa = aa + 1;
        } while (aa < c && ws(b[aa + 1]));
    }
    if (aa < c) {
      do {
        if (is(b[aa], 34 /* DQO */) || is(b[aa], 39 /* SQO */)) {
          if (func === null)
            func = false;
          if (block[block.length - 1] === b[aa] && (b[aa - 1] !== "\\" || esctest(aa - 1) === false)) {
            block.pop();
            if (qc === "double") {
              b[aa] = '"';
            } else if (qc === "single") {
              b[aa] = "'";
            }
          } else if (not(block[block.length - 1], 34 /* DQO */) && not(block[block.length - 1], 39 /* SQO */) && (not(b[aa - 1], 92 /* BWS */) || esctest(aa - 1) === false)) {
            block.push(b[aa]);
            if (qc === "double") {
              b[aa] = '"';
            } else if (qc === "single") {
              b[aa] = "'";
            }
          } else if (b[aa - 1] === "\\" && qc !== "none") {
            if (esctest(aa - 1) === true) {
              if (qc === "double" && is(b[aa], 39 /* SQO */)) {
                out.pop();
              } else if (qc === "single" && is(b[aa], 34 /* DQO */)) {
                out.pop();
              }
            }
          } else if (qc === "double" && is(b[aa], 34 /* DQO */)) {
            b[aa] = '\\"';
          } else if (qc === "single" && is(b[aa], 39 /* SQO */)) {
            b[aa] = "\\'";
          }
          out.push(b[aa]);
        } else if (b[aa - 1] !== "\\" || esctest(aa - 1) === false) {
          if (is(b[aa], 40 /* LPR */)) {
            if (func === null)
              func = true;
            block.push(")");
            spaceStart();
          } else if (is(b[aa], 91 /* LSB */)) {
            func = false;
            block.push("]");
            spaceStart();
          } else if ((is(b[aa], 35 /* HSH */) || is(b[aa], 64 /* ATT */)) && is(b[aa + 1], 123 /* LCB */)) {
            func = false;
            out.push(b[aa]);
            aa = aa + 1;
            block.push("}");
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
        if (parse.structure[parse.structure.length - 1][0] === "map" && block.length === 0 && (is(b[aa + 1], 44 /* COM */) || is(b[aa + 1], 41 /* RPR */))) {
          if (is(b[aa + 1], 41 /* RPR */) && is(data.token[parse.count], 40 /* LPR */)) {
            parse.pop(data);
            parse.structure.pop();
            out.splice(0, 0, "(");
          } else {
            break;
          }
        }
        if (is(b[aa + 1], 58 /* COL */)) {
          bb = aa;
          if (ws(b[bb])) {
            do
              bb = bb - 1;
            while (ws(b[bb]));
          }
          outy = b.slice(bb - 6, bb + 1).join(NIL);
          if (outy.indexOf("filter") === outy.length - 6 || outy.indexOf("progid") === outy.length - 6) {
            outy = "filter";
          }
        }
        if (block.length === 0) {
          if (is(b[aa + 1], 59 /* SEM */) && esctest(aa + 1) === true || is(b[aa + 1], 58 /* COL */) && not(b[aa], 58 /* COL */) && not(b[aa + 2], 58 /* COL */) && outy !== "filter" && outy !== "progid" || (is(b[aa + 1], 123 /* LCB */) || is(b[aa + 1], 125 /* RCB */)) || is(b[aa + 1], 47 /* FWS */) && (is(b[aa + 2], 42 /* ARS */) || is(b[aa + 2], 47 /* FWS */))) {
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
          if (is(b[aa + 1], 44 /* COM */))
            break;
        }
        aa = aa + 1;
      } while (aa < c);
    }
    a = aa;
    if (parse.structure[parse.structure.length - 1][0] === "map" && is(out[0], 40 /* LPR */)) {
      mapper[mapper.length - 1] = mapper[mapper.length - 1] - 1;
    }
    ltoke = out.join(NIL).replace(/\s+/g, WSP).replace(/^\s/, NIL).replace(/\s$/, NIL);
    if (func === true) {
      if (grammar.style.atrules.has(grammar.atrules(ltoke)) && rules.atRuleSpace === true) {
        data.token[parse.count] = data.token[parse.count].replace(/\s*\(/g, " (").replace(/\s*\)\s*/g, ") ").replace(/,\(/g, ", (");
      } else {
        ltoke = ltoke.replace(/\s+\(/g, "(").replace(/\s+\)/g, ")").replace(/,\(/g, ", (");
      }
    }
    if (ltype === "colon" && data.types[parse.count - 1] === "start") {
      if (grammar.style.pseudoClasses.has(ltoke)) {
        data.token[parse.count] = ltoke = ":" + ltoke;
        ltype = "pseudo";
        nopush = true;
      }
    } else if (parse.count > -1 && data.token[parse.count].indexOf("extend(") === 0) {
      ltype = "pseudo";
    } else if (func === true && /\d/.test(ltoke.charAt(0)) === false && /^rgba?\(/.test(ltoke) === false && ltoke.indexOf("url(") !== 0 && (ltoke.indexOf(WSP) < 0 || ltoke.indexOf(WSP) > ltoke.indexOf("(")) && ltoke.charAt(ltoke.length - 1) === ")") {
      if (is(data.token[parse.count], 58 /* COL */)) {
        ltype = "value";
      } else {
        ltoke = ltoke.replace(/,\u0020?/g, ", ");
        ltype = "function";
      }
      ltoke = value(ltoke);
    } else if (parse.count > -1 && `"'`.indexOf(data.token[parse.count].charAt(0)) > -1 && data.types[parse.count] === "variable") {
      ltype = "item";
    } else if (is(out[0], 64 /* ATT */) || out[0] === "$") {
      if (data.types[parse.count] === "colon" && options2.language === "css" && (data.types[parse.count - 1] === "property" || data.types[parse.count - 1] === "variable")) {
        ltype = "value";
      } else if (parse.count > -1) {
        ltype = "item";
        outy = data.token[parse.count];
        aa = outy.indexOf("(");
        if (is(outy[outy.length - 1], 41 /* RPR */) && aa > 0) {
          outy = outy.slice(aa + 1, outy.length - 1);
          data.token[parse.count] = data.token[parse.count].slice(0, aa + 1) + value(outy) + ")";
        }
      }
      ltoke = value(ltoke);
    } else {
      ltype = "item";
    }
    if (nopush === false) {
      push(NIL);
    } else {
      nopush = false;
    }
  }
  function item(type) {
    let aa = parse.count;
    let bb = 0;
    let first = NIL;
    const comsa = [];
    function priors() {
      if (parse.count < 0)
        return;
      if (aa > 0 && (data.types[aa] === "comment" || data.types[aa] === "ignore")) {
        do {
          aa = aa - 1;
          comsa.push(data.token[aa]);
        } while (aa > 0 && data.lexer[aa] === "style" && (data.types[aa] === "comment" || data.types[aa] === "ignore"));
      }
      bb = aa - 1;
      if (bb > 0 && (data.types[bb] === "comment" || data.types[bb] === "ignore")) {
        do
          bb = bb - 1;
        while (bb > 0 && data.lexer[aa] === "style" && (data.types[bb] === "comment" || data.types[bb] === "ignore"));
      }
      if (bb < 0)
        bb = 0;
      if (aa < 0)
        aa = 0;
      first = data.token[aa][0];
    }
    function normalize(input) {
      return input.replace(/\s*&/, " &").replace(/\s*&\s*{/, " & {").replace(/\s*>\s*/g, " > ").replace(/\s*\+\s*/g, " + ");
    }
    function selector(index) {
      let ss = index;
      const dd = data.begin[ss];
      data.token[index] = data.token[index].replace(/\s*&/, " &").replace(/\s*&\s*{/, " & {").replace(/\s*>\s*/g, " > ").replace(/\s*\+\s*/g, " + ").replace(/:\s+/g, ": ").replace(/^\s+/, NIL).replace(/\s+$/, NIL).replace(/\s+::\s+/, "::");
      if (not(data.token[ss], 44 /* COM */) && data.types[ss] !== "comment") {
        data.types[ss] = "selector";
      }
      if (is(data.token[ss - 1], 44 /* COM */) || is(data.token[ss - 1], 58 /* COL */) || data.types[ss - 1] === "comment" || data.types[ss - 1] === "pseudo") {
        if (data.types[ss - 1] === "colon" && (data.types[ss] === "selector" || data.types[ss] === "at_rule") && (data.types[ss - 2] === "template" || data.types[ss - 2] === "template_start" || data.types[ss - 2] === "template_else" || data.types[ss - 2] === "template_end")) {
          data.token[ss - 1] = ":" + data.token[ss] + WSP;
          data.types[ss - 1] = "selector";
          parse.splice({
            data,
            howmany: 1,
            index: ss
          });
        } else if (data.types[ss - 1] === "pseudo") {
          data.token[ss - 1] = `${data.token[ss - 1]}${data.token[ss]}`;
          data.types[ss - 1] = "selector";
          parse.splice({
            data,
            howmany: 1,
            index: ss
          });
        } else if (data.types[ss - 2] === "comment") {
          data.token[ss - 1] = normalize(`${data.token[ss - 1]}${data.token[ss]}`);
          data.types[ss - 1] = "selector";
          parse.splice({
            data,
            howmany: 1,
            index: ss
          });
        } else {
          do {
            ss = ss - 1;
            if (data.begin[ss] === dd) {
              if (is(data.token[ss], 59 /* SEM */))
                break;
              if (not(data.token[ss], 44 /* COM */) && data.types[ss] !== "comment") {
                data.types[ss] = "selector";
              }
              if (data.token[ss] === ":" && not(data.token[ss - 1], 59 /* SEM */)) {
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
      ss = parse.count;
      if (rules.sortSelectors === true && is(data.token[ss - 1], 44 /* COM */)) {
        const store = [data.token[ss]];
        do {
          ss = ss - 1;
          if (data.types[ss] === "comment" || data.types[ss] === "ignore") {
            do
              ss = ss - 1;
            while (ss > 0 && (data.types[ss] === "comment" || data.types[ss] === "ignore"));
          }
          if (is(data.token[ss], 44 /* COM */))
            ss = ss - 1;
          store.push(data.token[ss]);
        } while (ss > 0 && (is(data.token[ss - 1], 44 /* COM */) || data.types[ss - 1] === "selector" || data.types[ss - 1] === "comment" || data.types[ss - 1] === "ignore"));
        store.sort();
        ss = parse.count;
        data.token[ss] = store.pop();
        do {
          ss = ss - 1;
          if (data.types[ss] === "comment" || data.types[ss] === "ignore") {
            do
              ss = ss - 1;
            while (ss > 0 && (data.types[ss] === "comment" || data.types[ss] === "ignore"));
          }
          if (is(data.token[ss], 44 /* COM */))
            ss = ss - 1;
          data.token[ss] = store.pop();
        } while (ss > 0 && (is(data.token[ss - 1], 44 /* COM */) || data.types[ss - 1] === "selector" || data.types[ss - 1] === "comment" || data.types[ss - 1] === "ignore"));
      }
      aa = parse.count;
      priors();
    }
    priors();
    if (type === "start" && (data.types[aa] === "value" || data.types[aa] === "variable")) {
      data.types[aa] = "item";
    }
    if (data.lexer[parse.count - 1] !== "style" || bb < 0) {
      if (type === "colon") {
        if (is(first, 36 /* DOL */) || is(first, 64 /* ATT */)) {
          data.types[aa] = "variable";
        } else if (data.stack[aa] !== "global" && (data.types[aa] !== "comment" || data.types[aa] !== "ignore")) {
          data.types[aa] = "property";
        }
      } else if (data.lexer[aa] === "style") {
        data.types[aa] = "selector";
        selector(aa);
      }
    } else if (type === "start" && data.types[aa] === "function" && data.lexer[aa] === "style") {
      data.types[aa] = "selector";
      selector(aa);
    } else if (data.types[aa] === "item" && data.lexer[aa] === "style") {
      if (type === "start") {
        selector(aa);
        data.types[aa] = "selector";
        if (data.token[aa] === ":")
          data.types[bb] = "selector";
        if (data.token[aa].indexOf("=\u201C") > 0) {
          parse.error = `Invalid Quote (\u201C, \\201c) used on line number ${parse.lineNumber}`;
        } else if (data.token[aa].indexOf("=\u201D") > 0) {
          parse.error = `Invalid Quote (\u201D, \\201d) used on line number ${parse.lineNumber}`;
        }
      } else if (type === "end") {
        if (is(first, 36 /* DOL */) || is(first, 64 /* ATT */)) {
          data.types[aa] = "variable";
        } else {
          data.types[aa] = "value";
        }
        data.token[aa] = value(data.token[aa]);
      } else if (type === "separator") {
        if (data.types[bb] === "colon" || is(data.token[bb], 44 /* COM */) || is(data.token[bb], 123 /* LCB */)) {
          if (not(b[a], 59 /* SEM */) && (data.types[bb] === "selector" || data.types[bb] === "at_rule" || is(data.token[bb], 123 /* LCB */))) {
            data.types[aa] = "selector";
            selector(aa);
          } else if (is(data.token[aa], 36 /* DOL */) || is(data.token[aa], 64 /* ATT */)) {
            data.types[aa] = "variable";
          } else {
            data.types[aa] = "value";
          }
          data.token[aa] = value(data.token[aa]);
          if (data.token[aa].charAt(0) === "\u201C") {
            parse.error = `Invalid Quote (\u201C, \\201c) used on line number ${parse.lineNumber}`;
          } else if (data.token[aa].charAt(0) === "\u201D") {
            parse.error = `Invalid (\u201D, \\201d) used on line number ${parse.lineNumber}`;
          }
        } else {
          if (is(first, 36 /* DOL */) || is(first, 64 /* ATT */)) {
            data.types[aa] = "variable";
          } else if (data.types[bb] === "value" || data.types[bb] === "variable") {
            data.token[bb] = data.token[bb] + data.token[aa];
            parse.pop(data);
          } else {
            data.types[aa] = "value";
          }
        }
      } else if (type === "colon") {
        if (is(first, 36 /* DOL */) || is(first, 64 /* ATT */)) {
          data.types[aa] = "variable";
        } else {
          data.types[aa] = "property";
        }
      } else if (is(data.token[bb], 64 /* ATT */) && (data.types[bb - 2] !== "variable" && data.types[bb - 2] !== "property" || data.types[bb - 1] === "separator")) {
        data.types[bb] = "variable";
        ltype = "variable";
        data.token[bb] = value(data.token[bb]);
      } else if (type === "comment") {
        if (is(first, 46 /* DOT */) || is(first, 35 /* HSH */)) {
          data.types[aa] = "selector";
        }
      }
    }
  }
  function semiComment() {
    let x = parse.count;
    do
      x = x - 1;
    while (x > 0 && data.types[x] === "comment");
    if (data.token[x] === ";")
      return;
    parse.splice({
      data,
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
  }
  function template(open, end) {
    const store = [];
    let quote = NIL;
    let name = NIL;
    let endlen = 0;
    let start = open.length;
    function exit(typeName) {
      const endtype = parse.count > 0 ? data.types[parse.count - 1] : data.types[parse.count];
      if (ltype === "item") {
        if (endtype === "colon") {
          data.types[parse.count] = "value";
        } else {
          item(endtype);
        }
      }
      if (is(b[a + 1], 32 /* WSP */)) {
        data.lines[parse.count] = 1;
      }
      ltype = typeName;
      if (ltype.indexOf("start") > -1 || ltype.indexOf("else") > -1) {
        push(ltoke);
      } else {
        push(NIL);
      }
    }
    nosort[nosort.length - 1] = true;
    if (a < c) {
      do {
        store.push(b[a]);
        if (quote === NIL) {
          if (is(b[a], 34 /* DQO */)) {
            quote = '"';
          } else if (is(b[a], 39 /* SQO */)) {
            quote = "'";
          } else if (is(b[a], 47 /* FWS */)) {
            if (is(b[a + 1], 47 /* FWS */)) {
              quote = "/";
            } else if (is(b[a + 1], 42 /* ARS */)) {
              quote = "*";
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
                do {
                  start = start + 1;
                } while (ws(quote.charAt(start)));
              }
              endlen = start;
              do {
                endlen = endlen + 1;
              } while (endlen < end.length && !ws(quote.charAt(endlen)));
              if (endlen === quote.length)
                endlen = endlen - end.length;
              if (open === "{%") {
                if (is(quote[2], 45 /* DSH */)) {
                  quote = quote.replace(/^{%-\s*/, "{%- ");
                  quote = quote.endsWith("-%}") ? quote.replace(/\s*-%}$/, " -%}") : quote.replace(/\s*%}$/, " %}");
                  name = quote.slice(4);
                } else {
                  quote = quote.replace(/^{%\s*/, "{% ");
                  quote = quote.endsWith("-%}") ? quote.replace(/\s*-%}$/, " -%}") : quote.replace(/\s*%}$/, " %}");
                  name = quote.slice(3);
                }
              }
              if (open === "{{") {
                if (is(quote[2], 45 /* DSH */)) {
                  quote = quote.replace(/^{{-\s*/, "{{- ");
                  quote = quote.endsWith("-}}") ? quote.replace(/\s*-}}$/, " -}}") : quote.replace(/\s*}}$/, " }}");
                } else {
                  quote = quote.replace(/^{{\s*/, "{{ ");
                  quote = quote.endsWith("-}}") ? quote.replace(/\s*-}}$/, " -}}") : quote.replace(/\s*%}}$/, " }}");
                }
              }
              if (ltype === "item" && data.types[parse.count - 1] === "colon" && (data.types[parse.count - 2] === "property" || data.types[parse.count - 2] === "variable")) {
                ltype = "value";
                data.types[parse.count] = "value";
                if (Number.isNaN(Number(data.token[parse.count])) === true && data.token[parse.count].charAt(data.token[parse.count].length - 1) !== ")") {
                  data.token[parse.count] = data.token[parse.count] + quote;
                } else {
                  data.token[parse.count] = data.token[parse.count] + WSP + quote;
                }
                return;
              }
              ltoke = quote;
              if (open === "{%") {
                const templateNames = Array.from(grammar.liquid.tags);
                let namesLen = templateNames.length - 1;
                name = name.slice(0, name.indexOf(WSP));
                if (name.indexOf("(") > 0) {
                  name = name.slice(0, name.indexOf("("));
                }
                if (grammar.liquid.else.has(name)) {
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
                let group = quote.slice(2);
                const ending = group.length;
                let begin = 0;
                do {
                  begin = begin + 1;
                } while (begin < ending && ws(group.charAt(begin)) === false && group.charCodeAt(start) !== 40 /* LPR */);
                group = group.slice(0, begin);
                if (is(group[group.length - 2], 125 /* RCB */))
                  group = group.slice(0, group.length - 2);
                if (group === "end") {
                  exit("template_end");
                  return;
                }
              }
              exit("template");
              return;
            }
            endlen = 0;
          }
        } else if (quote === b[a]) {
          if (is(quote, 34 /* DQO */) || is(quote, 39 /* SQO */)) {
            quote = NIL;
          } else if (is(quote, 47 /* FWS */) && (b[a] === "\r" || is(b[a], 10 /* NWL */))) {
            quote = NIL;
          } else if (is(quote, 42 /* ARS */) && is(b[a + 1], 47 /* FWS */)) {
            quote = NIL;
          }
        }
        a = a + 1;
      } while (a < c);
    }
  }
  function comment2(isLineComment) {
    let comm;
    if (isLineComment) {
      comm = wrapCommentLine({
        chars: b,
        start: a,
        end: c,
        lexer: "style",
        begin: "//",
        ender: "\n"
      });
      ltoke = comm[0];
      ltype = /^(\/\/\s*@prettify-ignore-start)/.test(ltoke) ? "ignore" : "comment";
    } else {
      comm = wrapCommentBlock({
        chars: b,
        start: a,
        end: c,
        lexer: "style",
        begin: "/*",
        ender: "*/"
      });
      ltoke = comm[0];
      ltype = /^(\/\*\s*@prettify-ignore-start)/.test(ltoke) ? "ignore" : "comment";
    }
    push(NIL);
    a = comm[1];
  }
  function marginPadding() {
    const lines = parse.linesSpace;
    const props = {
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
    function populate(prop) {
      if (data.token[aa - 2] === prop) {
        const values = data.token[aa].replace(/\s*!important\s*/g, NIL).split(WSP);
        const vlen = values.length;
        if (data.token[aa].indexOf("!important") > -1)
          props.data[prop[4]] = true;
        if (vlen > 3) {
          if (props.data[prop][0] === NIL)
            props.data[prop][0] = values[0];
          if (props.data[prop][1] === NIL)
            props.data[prop][1] = values[1];
          if (props.data[prop][2] === NIL)
            props.data[prop][2] = values[2];
          if (props.data[prop][3] === NIL)
            props.data[prop][3] = values[3];
        } else if (vlen > 2) {
          if (props.data[prop][0] === NIL)
            props.data[prop][0] = values[0];
          if (props.data[prop][1] === NIL)
            props.data[prop][1] = values[1];
          if (props.data[prop][2] === NIL)
            props.data[prop][2] = values[2];
          if (props.data[prop][3] === NIL)
            props.data[prop][3] = values[1];
        } else if (vlen > 1) {
          if (props.data[prop][0] === NIL)
            props.data[prop][0] = values[0];
          if (props.data[prop][1] === NIL)
            props.data[prop][1] = values[1];
          if (props.data[prop][2] === NIL)
            props.data[prop][2] = values[0];
          if (props.data[prop][3] === NIL)
            props.data[prop][3] = values[1];
        } else {
          if (props.data[prop][0] === NIL)
            props.data[prop][0] = values[0];
          if (props.data[prop][1] === NIL)
            props.data[prop][1] = values[0];
          if (props.data[prop][2] === NIL)
            props.data[prop][2] = values[0];
          if (props.data[prop][3] === NIL)
            props.data[prop][3] = values[0];
        }
      } else if (data.token[aa - 2] === `${prop}-bottom`) {
        if (props.data[prop][2] === NIL)
          props.data[prop][2] = data.token[aa];
      } else if (data.token[aa - 2] === `${prop}-left`) {
        if (props.data[prop][3] === NIL)
          props.data[prop][3] = data.token[aa];
      } else if (data.token[aa - 2] === `${prop}-right`) {
        if (props.data[prop][1] === NIL)
          props.data[prop][1] = data.token[aa];
      } else if (data.token[aa - 2] === `${prop}-top`) {
        if (props.data[prop][0] === NIL)
          props.data[prop][0] = data.token[aa];
      } else {
        return;
      }
      props.removes.push([aa, prop]);
      props.last[prop] = aa;
    }
    function removes() {
      let ii = 0;
      let values = NIL;
      const zero = /^(0+([a-z]+|%))/;
      const bb = props.removes.length;
      const tmargin = props.data.margin[0] !== NIL && props.data.margin[1] !== NIL && props.data.margin[2] !== NIL && props.data.margin[3] !== NIL;
      const tpadding = props.data.padding[0] !== NIL && props.data.padding[1] !== NIL && props.data.padding[2] !== NIL && props.data.padding[3] !== NIL;
      function applyValues(prop) {
        if (zero.test(props.data[prop][0]) === true)
          props.data[prop][0] = "0";
        if (zero.test(props.data[prop][1]) === true)
          props.data[prop][1] = "0";
        if (zero.test(props.data[prop][2]) === true)
          props.data[prop][2] = "0";
        if (zero.test(props.data[prop][3]) === true)
          props.data[prop][3] = "0";
        if (props.data[prop][0] === props.data[prop][1] && props.data[prop][0] === props.data[prop][2] && props.data[prop][0] === props.data[prop][3]) {
          values = props.data[prop][0];
        } else if (props.data[prop][0] === props.data[prop][2] && props.data[prop][1] === props.data[prop][3] && props.data[prop][0] !== props.data[prop][1]) {
          values = `${props.data[prop][0]} ${props.data[prop][1]}`;
        } else if (props.data[prop][1] === props.data[prop][3] && props.data[prop][0] !== props.data[prop][2]) {
          values = `${props.data[prop][0]} ${props.data[prop][1]} ${props.data[prop][2]}`;
        } else {
          values = `${props.data[prop][0]} ${props.data[prop][1]} ${props.data[prop][2]} ${props.data[prop][3]}`;
        }
        if (props.data[prop[4]] === true)
          values = `${values.replace(" !important", NIL)} !important`;
        if (props.last[prop] > parse.count) {
          ii = begin < 1 ? 1 : begin + 1;
          do {
            if (data.begin[ii] === begin && data.types[ii] === "value" && data.token[ii - 2].indexOf(prop) === 0) {
              props.last[prop] = ii;
              break;
            }
            ii = ii + 1;
          } while (ii < parse.count);
        }
        data.token[props.last[prop]] = values;
        data.token[props.last[prop] - 2] = prop;
      }
      if (bb > 1 && (tmargin === true || tpadding === true)) {
        do {
          if (props.removes[ii][0] !== props.last.margin && props.removes[ii][0] !== props.last.padding && (tmargin === true && props.removes[ii][1] === "margin" || tpadding === true && props.removes[ii][1] === "padding")) {
            parse.splice({
              data,
              howmany: data.types[props.removes[ii][0] + 1] === "separator" ? 4 : 3,
              index: props.removes[ii][0] - 2
            });
          }
          ii = ii + 1;
        } while (ii < bb - 1);
      }
      if (tmargin === true)
        applyValues("margin");
      if (tpadding === true)
        applyValues("padding");
      if (endtest === true) {
        if (begin < 0) {
          parse.error = "Brace mismatch. There appears to be more closing braces than starting braces.";
        } else {
          parse.sortCorrect(begin, parse.count + 1);
        }
      }
    }
    let aa = parse.count;
    let endtest = false;
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
  }
  function parseSpace() {
    parse.linesSpace = 1;
    do {
      if (is(b[a], 10 /* NWL */)) {
        parse.lineStart = a;
        parse.linesSpace = parse.linesSpace + 1;
        parse.lineNumber = parse.lineNumber + 1;
      }
      if (ws(b[a + 1]) === false)
        break;
      a = a + 1;
    } while (a < c);
  }
  do {
    if (ws(b[a])) {
      parseSpace();
    } else if (is(b[a], 47 /* FWS */) && is(b[a + 1], 42 /* ARS */)) {
      comment2(false);
    } else if (is(b[a], 47 /* FWS */) && is(b[a + 1], 47 /* FWS */)) {
      comment2(true);
    } else if (is(b[a], 123 /* LCB */) && is(b[a + 1], 37 /* PER */)) {
      template("{%", "%}");
    } else if (is(b[a], 123 /* LCB */) && is(b[a + 1], 123 /* LCB */)) {
      template("{{", "}}");
    } else if (is(b[a], 123 /* LCB */) || is(b[a], 40 /* LPR */) && is(data.token[parse.count], 58 /* COL */) && data.types[parse.count - 1] === "variable") {
      item("start");
      ltype = "start";
      ltoke = b[a];
      if (is(b[a], 40 /* LPR */)) {
        push("map");
        mapper.push(0);
      } else if (data.types[parse.count] === "at_rule" || data.types[parse.count] === "selector" || data.types[parse.count] === "variable") {
        if (is(data.token[parse.count], 64 /* ATT */)) {
          data.types[parse.count] = "at_rule";
          push(grammar.atrules(data.token[parse.count]));
        } else {
          push(data.token[parse.count]);
        }
      } else if (data.types[parse.count] === "colon") {
        push(data.token[parse.count - 1]);
      } else {
        push("block");
      }
      nosort.push(false);
    } else if (is(b[a], 125 /* RCB */) || b[a] === ")" && parse.structure[parse.structure.length - 1][0] === "map" && mapper[mapper.length - 1] === 0) {
      if (is(b[a], 125 /* RCB */) && is(data.token[parse.count - 1], 123 /* LCB */) && data.types[parse.count] === "item" && data.token[parse.count - 2] !== void 0 && data.token[parse.count - 2].charCodeAt(data.token[parse.count - 2].length - 1) === 64 /* ATT */) {
        data.token[parse.count - 2] = data.token[parse.count - 2] + "{" + data.token[parse.count] + "}";
        parse.pop(data);
        parse.pop(data);
        parse.structure.pop();
      } else {
        if (is(b[a], 41 /* RPR */))
          mapper.pop();
        item("end");
        if (is(b[a], 125 /* RCB */) && not(data.token[parse.count], 59 /* SEM */)) {
          if (data.types[parse.count] === "value" || data.types[parse.count] === "function" || data.types[parse.count] === "variable" && (is(data.token[parse.count - 1], 58 /* COL */) || is(data.token[parse.count - 1], 59 /* SEM */))) {
            if (rules.correct === true) {
              ltoke = ";";
            } else {
              ltoke = "x;";
            }
            ltype = "separator";
            push(NIL);
          } else if (data.types[parse.count] === "comment") {
            semiComment();
          }
        }
        nosort.pop();
        ltoke = b[a];
        ltype = "end";
        if (is(b[a], 125 /* RCB */))
          marginPadding();
        if (rules.sortProperties === true && is(b[a], 125 /* RCB */))
          parse.sortObject(data);
        push(NIL);
      }
    } else if (is(b[a], 59 /* SEM */) || is(b[a], 44 /* COM */)) {
      if (data.types[parse.count - 1] === "selector" || data.types[parse.count - 1] === "at_rule" || data.types[parse.count] !== "function" && is(data.token[parse.count - 1], 125 /* RCB */)) {
        item("start");
      } else {
        item("separator");
      }
      if (data.types[parse.count] !== "separator" && esctest(a) === true) {
        ltoke = b[a];
        ltype = "separator";
        push(NIL);
      }
    } else if (parse.count > -1 && is(b[a], 58 /* COL */) && data.types[parse.count] !== "end") {
      item("colon");
      ltoke = ":";
      ltype = "colon";
      push(NIL);
    } else {
      if (parse.structure[parse.structure.length - 1][0] === "map" && is(b[a], 40 /* LPR */)) {
        mapper[mapper.length - 1] = mapper[mapper.length - 1] + 1;
      }
      buildToken();
    }
    a = a + 1;
  } while (a < c);
  if (rules.sortProperties === true)
    parse.sortObject(data);
  return data;
};

// src/lexers/script.ts
prettify.lexers.script = function script(source) {
  const { options: options2 } = prettify;
  const cloneopts = assign({}, options2.script);
  if (options2.language === "json") {
    options2.script = assign(options2.script, options2.json, {
      quoteConvert: "double",
      endComma: "never",
      noSemicolon: true,
      vertical: false
    });
  }
  let a = 0;
  let ltoke = NIL;
  let ltype = NIL;
  let pword = [];
  let lengthb = 0;
  let wordTest = -1;
  let paren = -1;
  let funreferences = [];
  let tempstore;
  let pstack;
  let comment2;
  const { data } = parse;
  const { references } = parse;
  const b = source.length;
  const c = source.split(NIL);
  const lword = [];
  const brace = [];
  const classy = [];
  const sourcemap = [0, NIL];
  const datatype = [false];
  const namelist = [
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
  const vart = {};
  vart.count = [];
  vart.index = [];
  vart.len = -1;
  vart.word = [];
  function asi(isEnd) {
    let aa = 0;
    const next = nextchar(1, false);
    const clist = parse.structure.length === 0 ? "" : parse.structure[parse.structure.length - 1][0];
    const record = create(null);
    record.begin = data.begin[parse.count];
    record.ender = data.begin[parse.count];
    record.lexer = data.lexer[parse.count];
    record.lines = data.lines[parse.count];
    record.stack = data.stack[parse.count];
    record.token = data.token[parse.count];
    record.types = data.types[parse.count];
    if (/^(\/(\/|\*)\s*@prettify-ignore-start)/.test(ltoke))
      return;
    if (ltype === "start" || ltype === "type_start")
      return;
    if (options2.language === "json")
      return;
    if (is(record.token, 59 /* SEM */) || is(record.token, 44 /* COM */) || record.stack === "class" || record.stack === "map" || record.stack === "attribute" || data.types[record.begin - 1] === "generic" || next === "{" || clist === "initializer") {
      return;
    }
    if (is(record.token, 125 /* RCB */) && data.stack[record.begin - 1] === "global" && data.types[record.begin - 1] !== "operator" && record.stack === data.stack[parse.count - 1]) {
      return;
    }
    if (record.stack === "array" && record.token !== "]")
      return;
    if (data.token[data.begin[parse.count]] === "{" && record.stack === "data_type")
      return;
    if (record.types !== void 0 && record.types.indexOf("template") > -1 && record.types.indexOf("template_string") < 0) {
      return;
    }
    if (is(next, 59 /* SEM */) && isEnd === false)
      return;
    if (data.lexer[parse.count - 1] !== "script" && (a < b && b === prettify.source.length - 1 || b < prettify.source.length - 1)) {
      return;
    }
    if (is(record.token, 125 /* RCB */) && (record.stack === "function" || record.stack === "if" || record.stack === "else" || record.stack === "for" || record.stack === "do" || record.stack === "while" || record.stack === "switch" || record.stack === "class" || record.stack === "try" || record.stack === "catch" || record.stack === "finally" || record.stack === "block")) {
      if (record.stack === "function" && (data.stack[record.begin - 1] === "data_type" || data.types[record.begin - 1] === "type")) {
        aa = record.begin;
        do {
          aa = aa - 1;
        } while (aa > 0 && data.token[aa] !== ")" && data.stack[aa] !== "arguments");
        aa = data.begin[aa];
      } else {
        aa = data.begin[record.begin - 1];
      }
      if (is(data.token[aa], 40 /* LPR */)) {
        aa = aa - 1;
        if (data.token[aa - 1] === "function")
          aa = aa - 1;
        if (data.stack[aa - 1] === "object" || data.stack[aa - 1] === "switch")
          return;
        if (data.token[aa - 1] !== "=" && data.token[aa - 1] !== "return" && data.token[aa - 1] !== ":") {
          return;
        }
      } else {
        return;
      }
    }
    if (record.types === "comment" || clist === "method" || clist === "paren" || clist === "expression" || clist === "array" || clist === "object" || clist === "switch" && record.stack !== "method" && data.token[data.begin[parse.count]] === "(" && data.token[data.begin[parse.count] - 1] !== "return" && data.types[data.begin[parse.count] - 1] !== "operator") {
      return;
    }
    if (data.stack[parse.count] === "expression" && (data.token[data.begin[parse.count] - 1] !== "while" || data.token[data.begin[parse.count] - 1] === "while" && data.stack[data.begin[parse.count] - 2] !== "do")) {
      return;
    }
    if (next !== "" && "=<>+*?|^:&%~,.()]".indexOf(next) > -1 && isEnd === false)
      return;
    if (record.types === "comment") {
      aa = parse.count;
      do {
        aa = aa - 1;
      } while (aa > 0 && data.types[aa] === "comment");
      if (aa < 1)
        return;
      record.token = data.token[aa];
      record.types = data.types[aa];
      record.stack = data.stack[aa];
    }
    if (record.token === void 0 || record.types === "start" || record.types === "separator" || record.types === "operator" && record.token !== "++" && record.token !== "--" || record.token === "x}" || record.token === "var" || record.token === "let" || record.token === "const" || record.token === "else" || record.token.indexOf("#!/") === 0 || record.token === "instanceof") {
      return;
    }
    if (record.stack === "method" && (data.token[record.begin - 1] === "function" || data.token[record.begin - 2] === "function")) {
      return;
    }
    if (options2.script.variableList === "list")
      vart.index[vart.len] = parse.count;
    ltoke = options2.script.correct === true ? ";" : "x;";
    ltype = "separator";
    aa = parse.linesSpace;
    parse.linesSpace = 0;
    recordPush("");
    parse.linesSpace = aa;
    blockinsert();
  }
  function asibrace() {
    let aa = parse.count;
    do {
      aa = aa - 1;
    } while (aa > -1 && data.token[aa] === "x}");
    if (data.stack[aa] === "else")
      return recordPush("");
    aa = aa + 1;
    parse.splice({
      data,
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
  }
  function asifix() {
    let len = parse.count;
    if (data.types[len] === "comment") {
      do {
        len = len - 1;
      } while (len > 0 && data.types[len] === "comment");
    }
    if (data.token[len] === "from")
      len = len - 2;
    if (data.token[len] === "x;") {
      parse.splice({
        data,
        howmany: 1,
        index: len
      });
    }
  }
  function blockComment() {
    asi(false);
    if (wordTest > -1)
      word();
    comment2 = wrapCommentBlock({
      chars: c,
      end: b,
      lexer: "script",
      begin: "/*",
      start: a,
      ender: "*/"
    });
    a = comment2[1];
    if (data.token[parse.count] === "var" || data.token[parse.count] === "let" || data.token[parse.count] === "const") {
      tempstore = parse.pop(data);
      recordPush("");
      parse.push(data, tempstore, "");
      if (data.lines[parse.count - 2] === 0)
        data.lines[parse.count - 2] = data.lines[parse.count];
      data.lines[parse.count] = 0;
    } else if (comment2[0] !== "") {
      ltoke = comment2[0];
      ltype = /^\/\*\s*@prettify-ignore-start/.test(ltoke) ? "ignore" : "comment";
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
    if (/\/\*\s*global\s+/.test(data.token[parse.count]) === true && data.types.indexOf("word") < 0) {
      references[0] = data.token[parse.count].replace(/\/\*\s*global\s+/, "").replace("*/", "").replace(/,\s+/g, ",").split(",");
    }
  }
  function blockinsert() {
    let name = "";
    const next = nextchar(5, false);
    const g = parse.count;
    const lines = parse.linesSpace;
    if (options2.language === "json" || brace.length < 1 || brace[brace.length - 1].charAt(0) !== "x" || /^x?(;|\}|\))$/.test(ltoke) === false) {
      return;
    }
    if (data.stack[parse.count] === "do" && next === "while" && data.token[parse.count] === "}") {
      return;
    }
    if (ltoke === ";" && data.token[g - 1] === "x{") {
      name = data.token[data.begin[g - 2] - 1];
      if (data.token[g - 2] === "do" || data.token[g - 2] === ")" && "ifforwhilecatch".indexOf(name) > -1) {
        tempstore = parse.pop(data);
        ltoke = options2.script.correct === true ? "}" : "x}";
        ltype = "end";
        pstack = parse.structure[parse.structure.length - 1];
        recordPush("");
        brace.pop();
        parse.linesSpace = lines;
        return;
      }
      tempstore = parse.pop(data);
      ltoke = options2.script.correct === true ? "}" : "x}";
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
    ltoke = options2.script.correct === true ? "}" : "x}";
    ltype = "end";
    if (data.token[parse.count] === "x}")
      return;
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
      if (data.stack[parse.count] === "do")
        break;
    } while (brace[brace.length - 1] === "x{");
    parse.linesSpace = lines;
  }
  function commaComment() {
    let x = parse.count;
    if (data.stack[x] === "object" && options2.script.objectSort === true) {
      ltoke = ",";
      ltype = "separator";
      asifix();
      recordPush("");
    } else {
      do {
        x = x - 1;
      } while (x > 0 && data.types[x - 1] === "comment");
      parse.splice({
        data,
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
  }
  function end(x) {
    let insert = false;
    let newarr = false;
    const next = nextchar(1, false);
    const count = data.token[parse.count] === "(" ? parse.count : data.begin[parse.count];
    function newarray() {
      let arraylen = 0;
      const ar = data.token[count - 1] === "Array";
      const startar = ar === true ? "[" : "{";
      const endar = ar === true ? "]" : "}";
      const namear = ar === true ? "array" : "object";
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
    }
    if (wordTest > -1)
      word();
    if (classy.length > 0) {
      if (classy[classy.length - 1] === 0) {
        classy.pop();
      } else {
        classy[classy.length - 1] = classy[classy.length - 1] - 1;
      }
    }
    if (is(x, 41 /* RPR */) || x === "x)" || is(x, 93 /* RSB */)) {
      if (options2.script.correct === true)
        plusplus();
      asifix();
    }
    if (is(x, 41 /* RPR */) || x === "x)")
      asi(false);
    if (vart.len > -1) {
      if (is(x, 125 /* RCB */) && (options2.script.variableList === "list" && vart.count[vart.len] === 0 || data.token[parse.count] === "x;" && options2.script.variableList === "each")) {
        vartpop();
      }
      vart.count[vart.len] = vart.count[vart.len] - 1;
      if (vart.count[vart.len] < 0)
        vartpop();
    }
    if (is(ltoke, 44 /* COM */) && data.stack[parse.count] !== "initializer" && (is(x, 93 /* RSB */) && is(data.token[parse.count - 1], 91 /* LSB */) || is(x, 125 /* RCB */))) {
      tempstore = parse.pop(data);
    }
    if (is(x, 41 /* RPR */) || x === "x)") {
      ltoke = x;
      if (lword.length > 0) {
        pword = lword[lword.length - 1];
        if (pword.length > 1 && not(next, 123 /* LCB */) && (pword[0] === "if" || pword[0] === "for" || pword[0] === "with" || pword[0] === "while" && data.stack[pword[1] - 2] !== void 0 && data.stack[pword[1] - 2] !== "do")) {
          insert = true;
        }
      }
    } else if (is(x, 93 /* RSB */)) {
      ltoke = "]";
    } else if (is(x, 125 /* RCB */)) {
      if (not(ltoke, 44 /* COM */) && options2.script.correct === true)
        plusplus();
      if (parse.structure.length > 0 && parse.structure[parse.structure.length - 1][0] !== "object")
        asi(true);
      if ((options2.script.objectSort === true || options2.language === "json" && options2.json.objectSort === true) && parse.structure[parse.structure.length - 1][0] === "object") {
        parse.sortObject(data);
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
    if (is(x, 41 /* RPR */) && options2.script.correct === true && count - parse.count < 2 && (is(data.token[parse.count], 40 /* LPR */) || data.types[parse.count] === "number") && (data.token[count - 1] === "Array" || data.token[count - 1] === "Object") && data.token[count - 2] === "new") {
      newarray();
      newarr = true;
    }
    if (brace[brace.length - 1] === "x{" && is(x, 125 /* RCB */)) {
      blockinsert();
      brace.pop();
      if (data.stack[parse.count] !== "try") {
        if (not(next, 58 /* COL */) && not(next, 59 /* SEM */) && data.token[data.begin[a] - 1] !== "?")
          blockinsert();
      }
      ltoke = "}";
    } else {
      brace.pop();
    }
    if (options2.script.endComma !== void 0 && options2.script.endComma !== "none" && parse.structure[parse.structure.length - 1][0] === "array" || parse.structure[parse.structure.length - 1][0] === "object" || parse.structure[parse.structure.length - 1][0] === "data_type") {
      if (options2.script.endComma === "always" && data.token[parse.count] !== ",") {
        const begin = parse.structure[parse.structure.length - 1][1];
        let y = parse.count;
        do {
          if (data.begin[y] === begin) {
            if (is(data.token[y], 44 /* COM */))
              break;
          } else {
            y = data.begin[y];
          }
          y = y - 1;
        } while (y > begin);
        if (y > begin) {
          const type = ltype;
          const toke = ltoke;
          ltoke = ",";
          ltype = "separator";
          recordPush("");
          ltoke = toke;
          ltype = type;
        }
      } else if (options2.script.endComma === "never" && is(data.token[parse.count], 44 /* COM */)) {
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
      ltoke = options2.script.correct === true ? "{" : "x{";
      ltype = "start";
      recordPush(pword[0]);
      brace.push("x{");
      pword[1] = parse.count;
    }
    datatype.pop();
    if (parse.structure[parse.structure.length - 1][0] !== "data_type")
      datatype[datatype.length - 1] = false;
  }
  function general(starting, ending, type) {
    let ee = 0;
    let escape = false;
    let ext = false;
    let build = [starting];
    let temp;
    const ender = ending.split(NIL);
    const endlen = ender.length;
    const start2 = a;
    const base = a + starting.length;
    const qc = options2.script.quoteConvert === void 0 ? "none" : options2.script.quoteConvert;
    function cleanUp() {
      let linesSpace = 0;
      build = [];
      ltype = type;
      ee = a;
      if (type === "string" && /\s/.test(c[ee + 1]) === true) {
        linesSpace = 1;
        do {
          ee = ee + 1;
          if (c[ee] === "\n")
            linesSpace = linesSpace + 1;
        } while (ee < b && /\s/.test(c[ee + 1]) === true);
        parse.linesSpace = linesSpace;
      }
    }
    function finish() {
      let str = NIL;
      function bracketSpace(input) {
        if (options2.language !== "javascript" && options2.language !== "typescript" && options2.language !== "jsx" && options2.language !== "tsx") {
          const spaceStart = (start3) => start3.replace(/\s*$/, " ");
          const spaceEnd = (end2) => end2.replace(/^\s*/, " ");
          if (/\{(#|\/|(%>)|(%\]))/.test(input) || /\}%(>|\])/.test(input))
            return input;
          input = input.replace(/\{((\{+)|%-?)\s*/g, spaceStart);
          input = input.replace(/\s*((\}\}+)|(-?%\}))/g, spaceEnd);
          return input;
        }
        return input;
      }
      if (is(starting, 34 /* DQO */) && qc === "single") {
        build[0] = "'";
        build[build.length - 1] = "'";
      } else if (is(starting, 39 /* SQO */) && qc === "double") {
        build[0] = '"';
        build[build.length - 1] = '"';
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
      ltoke = build.join(NIL);
      if (is(starting, 34 /* DQO */) || is(starting, 39 /* SQO */) || starting === "{{" || starting === "{%") {
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
        if (options2.language === "json") {
          ltoke = ltoke.replace(/\u0000/g, "\\u0000").replace(/\u0001/g, "\\u0001").replace(/\u0002/g, "\\u0002").replace(/\u0003/g, "\\u0003").replace(/\u0004/g, "\\u0004").replace(/\u0005/g, "\\u0005").replace(/\u0006/g, "\\u0006").replace(/\u0007/g, "\\u0007").replace(/\u0008/g, "\\u0008").replace(/\u0009/g, "\\u0009").replace(/\u000a/g, "\\u000a").replace(/\u000b/g, "\\u000b").replace(/\u000c/g, "\\u000c").replace(/\u000d/g, "\\u000d").replace(/\u000e/g, "\\u000e").replace(/\u000f/g, "\\u000f").replace(/\u0010/g, "\\u0010").replace(/\u0011/g, "\\u0011").replace(/\u0012/g, "\\u0012").replace(/\u0013/g, "\\u0013").replace(/\u0014/g, "\\u0014").replace(/\u0015/g, "\\u0015").replace(/\u0016/g, "\\u0016").replace(/\u0017/g, "\\u0017").replace(/\u0018/g, "\\u0018").replace(/\u0019/g, "\\u0019").replace(/\u001a/g, "\\u001a").replace(/\u001b/g, "\\u001b").replace(/\u001c/g, "\\u001c").replace(/\u001d/g, "\\u001d").replace(/\u001e/g, "\\u001e").replace(/\u001f/g, "\\u001f");
        } else if (starting.indexOf("#!") === 0) {
          ltoke = ltoke.slice(0, ltoke.length - 1);
          parse.linesSpace = 2;
        } else if (parse.structure[parse.structure.length - 1][0] !== "object" || parse.structure[parse.structure.length - 1][0] === "object" && nextchar(1, false) !== ":" && not(data.token[parse.count], 44 /* COM */) && not(data.token[parse.count], 123 /* LCB */)) {
          if (ltoke.length > options2.wrap && options2.wrap > 0 || options2.wrap !== 0 && data.token[parse.count] === "+" && (data.token[parse.count - 1].charAt(0) === '"' || data.token[parse.count - 1].charAt(0) === "'")) {
            let item = ltoke;
            let segment = "";
            let q = qc === "double" ? '"' : qc === "single" ? "'" : item.charAt(0);
            const limit = options2.wrap;
            const uchar = /u[0-9a-fA-F]{4}/;
            const xchar = /x[0-9a-fA-F]{2}/;
            item = item.slice(1, item.length - 1);
            if (data.token[parse.count] === "+" && (data.token[parse.count - 1].charAt(0) === '"' || data.token[parse.count - 1].charAt(0) === "'")) {
              parse.pop(data);
              q = data.token[parse.count].charAt(0);
              item = data.token[parse.count].slice(1, data.token[parse.count].length - 1) + item;
              parse.pop(data);
            }
            if (item.length > limit && limit > 0) {
              do {
                segment = item.slice(0, limit);
                if (segment.charAt(limit - 5) === "\\" && uchar.test(item.slice(limit - 4, limit + 1))) {
                  segment = segment.slice(0, limit - 5);
                } else if (segment.charAt(limit - 4) === "\\" && uchar.test(item.slice(limit - 3, limit + 2))) {
                  segment = segment.slice(0, limit - 4);
                } else if (segment.charAt(limit - 3) === "\\" && (uchar.test(item.slice(limit - 2, limit + 3)) || xchar.test(item.slice(limit - 2, limit + 1)))) {
                  segment = segment.slice(0, limit - 3);
                } else if (segment.charAt(limit - 2) === "\\" && (uchar.test(item.slice(limit - 1, limit + 4)) || xchar.test(item.slice(limit - 1, limit + 2)))) {
                  segment = segment.slice(0, limit - 2);
                } else if (segment.charAt(limit - 1) === "\\") {
                  segment = segment.slice(0, limit - 1);
                }
                segment = q + segment + q;
                item = item.slice(segment.length - 2);
                ltoke = segment;
                ltype = "string";
                recordPush(NIL);
                parse.linesSpace = 0;
                ltoke = "+";
                ltype = "operator";
                recordPush(NIL);
              } while (item.length > limit);
            }
            if (item === NIL) {
              ltoke = q + q;
            } else {
              ltoke = q + item + q;
            }
            ltype = "string";
          }
        }
      } else if (/\{\s*\?>$/.test(ltoke)) {
        ltype = "template_start";
      } else {
        ltype = type;
      }
      if (ltoke.length > 0)
        recordPush(NIL);
    }
    if (wordTest > -1)
      word();
    if (c[a - 1] === "\\" && slashes(a - 1) === true && (is(c[a], 34 /* DQO */) || is(c[a], 39 /* SQO */))) {
      parse.pop(data);
      if (is(data.token[0], 123 /* LCB */)) {
        if (is(c[a], 34 /* DQO */)) {
          starting = '"';
          ending = '\\"';
          build = ['"'];
        } else {
          starting = "'";
          ending = "\\'";
          build = ["'"];
        }
        escape = true;
      } else {
        if (is(c[a], 34 /* DQO */)) {
          build = ['\\"'];
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
        if (not(data.token[0], 123 /* LCB */) && not(data.token[0], 91 /* LSB */) && qc !== "none" && (is(c[ee], 34 /* DQO */) || is(c[ee], 39 /* SQO */))) {
          if (c[ee - 1] === "\\") {
            if (slashes(ee - 1) === true) {
              if (qc === "double" && is(c[ee], 39 /* SQO */)) {
                build.pop();
              } else if (qc === "single" && is(c[ee], 34 /* DQO */)) {
                build.pop();
              }
            }
          } else if (qc === "double" && is(c[ee], 34 /* DQO */) && is(c[a], 39 /* SQO */)) {
            c[ee] = '\\"';
          } else if (qc === "single" && is(c[ee], 39 /* SQO */) && is(c[a], 34 /* DQO */)) {
            c[ee] = "\\'";
          }
          build.push(c[ee]);
        } else if (ee > start2) {
          ext = true;
          if (is(c[ee], 123 /* LCB */) && is(c[ee + 1], 37 /* PER */) && c[ee + 2] !== starting) {
            finish();
            general("{%", "%}", "template");
            cleanUp();
          } else if (is(c[ee], 123 /* LCB */) && is(c[ee + 1], 123 /* LCB */) && c[ee + 2] !== starting) {
            finish();
            general("{{", "}}", "template");
            cleanUp();
          } else {
            ext = false;
            build.push(c[ee]);
          }
        } else {
          build.push(c[ee]);
        }
        if (options2.language !== "json" && options2.language !== "javascript" && (is(starting, 34 /* DQO */) || is(starting, 39 /* SQO */)) && (ext === true || ee > start2) && c[ee - 1] !== "\\" && not(c[ee], 34 /* DQO */) && not(c[ee], 39 /* SQO */) && (is(c[ee], 10 /* NWL */) || ee === b - 1 === true)) {
          parse.error = "Unterminated string in script on line number " + parse.lineNumber;
          break;
        }
        if (c[ee] === ender[endlen - 1] && (c[ee - 1] !== "\\" || slashes(ee - 1) === false)) {
          if (endlen === 1)
            break;
          if (build[ee - base] === ender[0] && build.slice(ee - base - endlen + 2).join("") === ending)
            break;
        }
        ee = ee + 1;
      } while (ee < b);
    }
    finish();
  }
  function lineComment() {
    asi(false);
    blockinsert();
    if (wordTest > -1)
      word();
    comment2 = wrapCommentLine({
      chars: c,
      end: b,
      lexer: "script",
      begin: "//",
      start: a,
      ender: "\n"
    });
    a = comment2[1];
    if (comment2[0] !== "") {
      ltoke = comment2[0];
      ltype = /^(\/\/\s*@prettify-ignore-start)/.test(ltoke) ? "ignore" : "comment";
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
  }
  function lexerMarkup() {
    let d = 0;
    let curlytest = false;
    let endtag = false;
    let anglecount = 0;
    let curlycount = 0;
    let tagcount = 0;
    let next = "";
    let priorToken = "";
    let priorType = "";
    const output = [];
    const dt = datatype[datatype.length - 1];
    const syntaxnum = "0123456789=<>+-*?|^:&.,;%(){}[]~";
    function applyMarkup() {
      if (ltoke === "(")
        parse.structure[parse.structure.length - 1] = ["paren", parse.count];
      prettify.lexers.markup(output.join(""));
    }
    if (wordTest > -1)
      word();
    priorToken = parse.count > 0 ? data.token[parse.count - 1] : "";
    priorType = parse.count > 0 ? data.types[parse.count - 1] : "";
    next = nextchar(1, false);
    if (options2.language !== "jsx" && options2.language !== "tsx" && /\d/.test(next) === false && (ltoke === "function" || priorToken === "=>" || priorToken === "void" || priorToken === "." || data.stack[parse.count] === "arguments" || ltype === "type" && priorToken === "type" || ltype === "reference" && (priorType === "operator" || priorToken === "function" || priorToken === "class" || priorToken === "new") || ltype === "type" && priorType === "operator" || ltoke === "return" || ltype === "operator")) {
      const build = [];
      let inc = 0;
      let e = 0;
      d = a;
      do {
        build.push(c[d]);
        if (c[d] === "<") {
          inc = inc + 1;
        } else if (c[d] === ">") {
          inc = inc - 1;
          if (inc < 1)
            break;
        }
        d = d + 1;
      } while (d < b);
      e = a;
      a = d;
      next = nextchar(1, false);
      if (c[d] === ">" && (dt === true || priorToken === "=>" || priorToken === "." || priorType !== "operator" || priorType === "operator" && (next === "(" || next === "="))) {
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
    if (dt === false && nextchar(1, false) !== ">" && (c[a] !== "<" && syntaxnum.indexOf(c[a + 1]) > -1 || data.token[d] === "++" || data.token[d] === "--" || /\s/.test(c[a + 1]) === true || /\d/.test(c[a + 1]) === true && (ltype === "operator" || ltype === "string" || ltype === "number" || ltype === "reference" || ltype === "word" && ltoke !== "return"))) {
      ltype = "operator";
      ltoke = operator();
      return recordPush("");
    }
    if (options2.language !== "typescript" && (data.token[d] === "return" || data.types[d] === "operator" || data.types[d] === "start" || data.types[d] === "separator" || data.types[d] === "jsx_attribute_start" || data.token[d] === "}" && parse.structure[parse.structure.length - 1][0] === "global")) {
      ltype = "markup";
      options2.language = "jsx";
      do {
        output.push(c[a]);
        if (c[a] === "{") {
          curlycount = curlycount + 1;
          curlytest = true;
        } else if (c[a] === "}") {
          curlycount = curlycount - 1;
          if (curlycount === 0)
            curlytest = false;
        } else if (c[a] === "<" && curlytest === false) {
          if (c[a + 1] === "<") {
            do {
              output.push(c[a]);
              a = a + 1;
            } while (a < b && c[a + 1] === "<");
          }
          anglecount = anglecount + 1;
          if (nextchar(1, false) === "/")
            endtag = true;
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
            if (next.charAt(0) !== "<")
              return applyMarkup();
            if (next.charAt(0) === "<" && syntaxnum.indexOf(next.charAt(1)) < 0 && /\s/.test(next.charAt(1)) === false) {
              d = a + 1;
              do {
                d = d + 1;
                if (c[d] === ">" || /\s/.test(c[d - 1]) && syntaxnum.indexOf(c[d]) < 0)
                  break;
                if (syntaxnum.indexOf(c[d]) > -1)
                  return applyMarkup();
              } while (d < b);
            } else {
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
  }
  function nextchar(len, current) {
    let cc2 = current === true ? a : a + 1;
    let dd = "";
    if (typeof len !== "number" || len < 1)
      len = 1;
    if (c[a] === "/") {
      if (c[a + 1] === "/") {
        dd = "\n";
      } else if (c[a + 1] === "*") {
        dd = "/";
      }
    }
    if (cc2 < b) {
      do {
        if (/\s/.test(c[cc2]) === false) {
          if (c[cc2] === "/") {
            if (dd === "") {
              if (c[cc2 + 1] === "/") {
                dd = "\n";
              } else if (c[cc2 + 1] === "*") {
                dd = "/";
              }
            } else if (dd === "/" && c[cc2 - 1] === "*") {
              dd = "";
            }
          }
          if (dd === "" && c[cc2 - 1] + c[cc2] !== "*/")
            return c.slice(cc2, cc2 + len).join("");
        } else if (dd === "\n" && c[cc2] === "\n") {
          dd = "";
        }
        cc2 = cc2 + 1;
      } while (cc2 < b);
    }
    return "";
  }
  function numb() {
    const f = b;
    const build = [c[a]];
    let ee = 0;
    let test = /zz/;
    let dot = build[0] === ".";
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
        if (/[0-9]/.test(c[ee]) || c[ee] === "." && dot === false) {
          build.push(c[ee]);
          if (c[ee] === ".")
            dot = true;
        } else {
          break;
        }
        ee = ee + 1;
      } while (ee < f);
    }
    if (ee < f - 1 && (/\d/.test(c[ee - 1]) === true || /\d/.test(c[ee - 2]) === true && (c[ee - 1] === "-" || c[ee - 1] === "+")) && (c[ee] === "e" || c[ee] === "E")) {
      build.push(c[ee]);
      if (c[ee + 1] === "-" || c[ee + 1] === "+") {
        build.push(c[ee + 1]);
        ee = ee + 1;
      }
      dot = false;
      ee = ee + 1;
      if (ee < f) {
        do {
          if (/[0-9]/.test(c[ee]) || c[ee] === "." && dot === false) {
            build.push(c[ee]);
            if (c[ee] === ".")
              dot = true;
          } else {
            break;
          }
          ee = ee + 1;
        } while (ee < f);
      }
    }
    a = ee - 1;
    return build.join("");
  }
  function operator() {
    let g = 0;
    let h = 0;
    let jj = b;
    let output = "";
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
    ];
    const synlen = syntax.length;
    if (wordTest > -1)
      word();
    if (c[a] === "/" && (parse.count > -1 && (ltype !== "word" && ltype !== "reference" || ltoke === "typeof" || ltoke === "return" || ltoke === "else") && ltype !== "number" && ltype !== "string" && ltype !== "end")) {
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
    if (c[a] === "?" && ("+-*/.?".indexOf(c[a + 1]) > -1 || c[a + 1] === ":" && syntax.join("").indexOf(c[a + 2]) < 0)) {
      if (c[a + 1] === "." && /\d/.test(c[a + 2]) === false) {
        output = "?.";
      } else if (c[a + 1] === "?") {
        output = "??";
      }
      if (output === "")
        return "?";
    }
    if (c[a] === ":" && "+-*/".indexOf(c[a + 1]) > -1)
      return ":";
    if (a < b - 1) {
      if (c[a] !== "<" && c[a + 1] === "<")
        return c[a];
      if (c[a] === "!" && c[a + 1] === "/")
        return "!";
      if (c[a] === "-") {
        datatype[datatype.length - 1] = false;
        if (c[a + 1] === "-") {
          output = "--";
        } else if (c[a + 1] === "=") {
          output = "-=";
        } else if (c[a + 1] === ">") {
          output = "->";
        }
        if (output === "")
          return "-";
      }
      if (c[a] === "+") {
        datatype[datatype.length - 1] = false;
        if (c[a + 1] === "+") {
          output = "++";
        } else if (c[a + 1] === "=") {
          output = "+=";
        }
        if (output === "")
          return "+";
      }
      if (c[a] === "=" && c[a + 1] !== "=" && c[a + 1] !== "!" && c[a + 1] !== ">") {
        datatype[datatype.length - 1] = false;
        return "=";
      }
    }
    if (c[a] === ":") {
      if (options2.language === "typescript") {
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
              if (g < parse.count && data.token[g] === ":" && data.types[g + 1] !== "type")
                colon = true;
              if (data.token[g] === "?" && colon === false)
                break;
              if (data.token[g] === ";" || data.token[g] === "x;")
                break;
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
      } else if (data.token[parse.count - 1] === "[" && (data.types[parse.count] === "word" || data.types[parse.count] === "reference")) {
        parse.structure[parse.structure.length - 1][0] = "attribute";
        data.stack[parse.count] = "attribute";
      }
    }
    if (output === "") {
      if (c[a + 1] === "+" && c[a + 2] === "+" || c[a + 1] === "-" && c[a + 2] === "-") {
        output = c[a];
      } else {
        const buildout = [c[a]];
        g = a + 1;
        if (g < jj) {
          do {
            if (c[g] === "+" && c[g + 1] === "+" || c[g] === "-" && c[g + 1] === "-")
              break;
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
            if (h === synlen)
              break;
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
        if (data.begin[g] === jj)
          data.stack[g] = "method";
        g = g - 1;
      } while (g > jj - 1);
    }
    return output;
  }
  function plusplus() {
    let pre = true;
    let toke = "+";
    let tokea = "";
    let tokeb = "";
    let tokec = "";
    let inc = 0;
    let ind = 0;
    let walk = 0;
    let next = "";
    const store = [];
    function end2() {
      walk = data.begin[walk] - 1;
      if (data.types[walk] === "end") {
        end2();
      } else if (data.token[walk - 1] === ".") {
        period();
      }
    }
    function period() {
      walk = walk - 2;
      if (data.types[walk] === "end") {
        end2();
      } else if (data.token[walk - 1] === ".") {
        period();
      }
    }
    function applyStore() {
      let x = 0;
      const y = store.length;
      if (x < y) {
        do {
          parse.push(data, store[x], "");
          x = x + 1;
        } while (x < y);
      }
    }
    function recordStore(index) {
      const o = create(null);
      o.begin = data.begin[index];
      o.ender = data.ender[index];
      o.lexer = data.lexer[index];
      o.lines = data.lines[index];
      o.stack = data.stack[index];
      o.token = data.token[index];
      o.types = data.types[index];
      return o;
    }
    tokea = data.token[parse.count];
    tokeb = data.token[parse.count - 1];
    tokec = data.token[parse.count - 2];
    if (tokea !== "++" && tokea !== "--" && tokeb !== "++" && tokeb !== "--") {
      walk = parse.count;
      if (data.types[walk] === "end") {
        end2();
      } else if (data.token[walk - 1] === ".") {
        period();
      }
    }
    if (data.token[walk - 1] === "++" || data.token[walk - 1] === "--") {
      if ("startendoperator".indexOf(data.types[walk - 2]) > -1)
        return;
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
      if (options2.script.correct === false || tokea !== "++" && tokea !== "--" && tokeb !== "++" && tokeb !== "--") {
        return;
      }
      next = nextchar(1, false);
      if ((tokea === "++" || tokea === "--") && (c[a] === ";" || next === ";" || c[a] === "}" || next === "}" || c[a] === ")" || next === ")")) {
        toke = data.stack[parse.count];
        if (toke === "array" || toke === "method" || toke === "object" || toke === "paren" || toke === "notation" || data.token[data.begin[parse.count] - 1] === "while" && toke !== "while") {
          return;
        }
        inc = parse.count;
        do {
          inc = inc - 1;
          if (data.token[inc] === "return")
            return;
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
                if (ind < 0)
                  break;
              } else if (data.types[inc] === "end") {
                ind = ind + 1;
              }
              if (data.token[inc] === "?" && ind === 0)
                return;
            } while (inc > 0);
          } else {
            return;
          }
        }
        pre = false;
        toke = tokea === "--" ? "-" : "+";
      } else if (tokec === "[" || tokec === ";" || tokec === "x;" || tokec === "}" || tokec === "{" || tokec === "(" || tokec === ")" || tokec === "," || tokec === "return") {
        if (tokea === "++" || tokea === "--") {
          if (tokec === "[" || tokec === "(" || tokec === "," || tokec === "return")
            return;
          if (tokea === "--")
            toke = "-";
          pre = false;
        } else if (tokeb === "--" || tokea === "--") {
          toke = "-";
        }
      } else {
        return;
      }
      if (pre === false)
        tempstore = parse.pop(data);
      walk = parse.count;
      if (data.types[walk] === "end") {
        end2();
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
        data,
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
    if (next === "}" && c[a] !== ";")
      asi(false);
  }
  function recordPush(structure) {
    parse.push(data, {
      begin: parse.structure[parse.structure.length - 1][1],
      ender: -1,
      lexer: "script",
      lines: parse.linesSpace,
      stack: parse.structure[parse.structure.length - 1][0],
      token: ltoke,
      types: ltype
    }, structure);
  }
  function regex() {
    let ee = a + 1;
    let h = 0;
    let i = 0;
    let output = "";
    let square = false;
    const f = b;
    const build = ["/"];
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
  }
  function slashes(index) {
    const slashy = index;
    do {
      index = index - 1;
    } while (c[index] === "\\" && index > 0);
    return (slashy - index) % 2 === 1;
  }
  function start(x) {
    let aa = parse.count;
    let wordx = "";
    let wordy = "";
    let stack = "";
    let func = false;
    brace.push(x);
    if (x === "{" && (data.types[parse.count] === "type" || data.types[parse.count] === "type_end" || data.types[parse.count] === "generic")) {
      let begin = 0;
      if (data.types[parse.count] === "type_end")
        aa = data.begin[parse.count];
      begin = aa;
      do {
        aa = aa - 1;
        if (data.begin[aa] !== begin && data.begin[aa] !== -1)
          break;
        if (data.token[aa] === ":")
          break;
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
    if (vart.len > -1)
      vart.count[vart.len] = vart.count[vart.len] + 1;
    if (data.token[aa - 1] === "function") {
      lword.push(["function", aa + 1]);
    } else {
      lword.push([ltoke, aa + 1]);
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
          if (options2.script.correct === true) {
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
    wordx = (() => {
      let bb = parse.count;
      if (data.types[bb] === "comment") {
        do {
          bb = bb - 1;
        } while (bb > 0 && data.types[bb] === "comment");
      }
      return data.token[bb];
    })();
    wordy = data.stack[aa] === void 0 ? "" : (() => {
      let bb = parse.count;
      if (data.types[bb] === "comment") {
        do {
          bb = bb - 1;
        } while (bb > 0 && data.types[bb] === "comment");
      }
      return data.token[data.begin[bb] - 1];
    })();
    if (is(ltoke, 123 /* LCB */) && (data.types[aa] === "word" || data.token[aa] === "]")) {
      let bb = aa;
      if (data.token[bb] === "]") {
        do {
          bb = data.begin[bb] - 1;
        } while (data.token[bb] === "]");
      }
      do {
        if (data.types[bb] === "start" || data.types[bb] === "end" || data.types[bb] === "operator")
          break;
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
    } else if (stack === "" && (is(ltoke, 123 /* LCB */) || ltoke === "x{")) {
      if (wordx === "else" || wordx === "do" || wordx === "try" || wordx === "finally" || wordx === "switch") {
        stack = wordx;
      } else if (classy[classy.length - 1] === 0 && wordx !== "return") {
        classy.pop();
        stack = "class";
      } else if (data.token[aa - 1] === "class") {
        stack = "class";
      } else if (data.token[aa] === "]" && data.token[aa - 1] === "[") {
        stack = "array";
      } else if ((data.types[aa] === "word" || data.types[aa] === "reference") && (data.types[aa - 1] === "word" || data.types[aa - 1] === "reference" || data.token[aa - 1] === "?" && (data.types[aa - 2] === "word" || data.types[aa - 2] === "reference")) && data.token[aa] !== "in" && data.token[aa - 1] !== "export" && data.token[aa - 1] !== "import") {
        stack = "map";
      } else if (data.stack[aa] === "method" && data.types[aa] === "end" && (data.types[data.begin[aa] - 1] === "word" || data.types[data.begin[aa] - 1] === "reference") && data.token[data.begin[aa] - 2] === "new") {
        stack = "initializer";
      } else if (is(ltoke, 123 /* LCB */) && (is(wordx, 41 /* RPR */) || wordx === "x)") && (data.types[data.begin[aa] - 1] === "word" || data.types[data.begin[aa] - 1] === "reference" || data.token[data.begin[aa] - 1] === "]")) {
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
      } else if (is(ltoke, 123 /* LCB */) && (wordx === ";" || wordx === "x;")) {
        stack = "block";
      } else if (is(ltoke, 123 /* LCB */) && data.token[aa] === ":" && data.stack[aa] === "switch") {
        stack = "block";
      } else if (data.token[aa - 1] === "import" || data.token[aa - 2] === "import" || data.token[aa - 1] === "export" || data.token[aa - 2] === "export") {
        stack = "object";
      } else if (is(wordx, 41 /* RPR */) && (pword[0] === "function" || pword[0] === "if" || pword[0] === "for" || pword[0] === "class" || pword[0] === "while" || pword[0] === "switch" || pword[0] === "catch")) {
        stack = pword[0];
      } else if (data.stack[aa] === "notation") {
        stack = "function";
      } else if ((data.types[aa] === "number" || data.types[aa] === "string" || data.types[aa] === "word" || data.types[aa] === "reference") && (data.types[aa - 1] === "word" || data.types[aa - 1] === "reference") && data.token[data.begin[aa] - 1] !== "for") {
        stack = "function";
      } else if (parse.structure.length > 0 && data.token[aa] !== ":" && parse.structure[parse.structure.length - 1][0] === "object" && (data.token[data.begin[aa] - 2] === "{" || data.token[data.begin[aa] - 2] === ",")) {
        stack = "function";
      } else if (data.types[pword[1] - 1] === "markup" && data.token[pword[1] - 3] === "function") {
        stack = "function";
      } else if (wordx === "=>") {
        stack = "function";
      } else if (func === true || data.types[parse.count] === "type_end" && data.stack[data.begin[parse.count] - 2] === "arguments") {
        stack = "function";
      } else if (is(wordx, 41 /* RPR */) && data.stack[aa] === "method" && (data.types[data.begin[aa] - 1] === "word" || data.types[data.begin[aa] - 1] === "property" || data.types[data.begin[aa] - 1] === "reference")) {
        stack = "function";
      } else if (data.types[aa] === "word" && is(ltoke, 123 /* LCB */) && data.token[aa] !== "return" && data.token[aa] !== "in" && data.token[aa] !== "import" && data.token[aa] !== "const" && data.token[aa] !== "let" && data.token[aa] !== "") {
        stack = "block";
      } else if (is(ltoke, 123 /* LCB */) && "if|else|for|while|function|class|switch|catch|finally".indexOf(data.stack[aa]) > -1 && (data.token[aa] === "x}" || data.token[aa] === "}")) {
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
      stack = "array";
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
    if (classy.length > 0)
      classy[classy.length - 1] = classy[classy.length - 1] + 1;
  }
  function tempstring() {
    const output = [c[a]];
    a = a + 1;
    if (a < b) {
      do {
        output.push(c[a]);
        if (c[a] === "`" && (c[a - 1] !== "\\" || slashes(a - 1) === false))
          break;
        if (c[a - 1] === "$" && c[a] === "{" && (c[a - 2] !== "\\" || slashes(a - 2) === false))
          break;
        a = a + 1;
      } while (a < b);
    }
    return output.join("");
  }
  function tname(x) {
    let sn = 2;
    let en = 0;
    let name = "";
    const st = x.slice(0, 2);
    const len = x.length;
    if (x.charAt(2) === "-")
      sn = sn + 1;
    if (/\s/.test(x.charAt(sn)) === true) {
      do {
        sn = sn + 1;
      } while (/\s/.test(x.charAt(sn)) === true && sn < len);
    }
    en = sn;
    do {
      en = en + 1;
    } while (/\s/.test(x.charAt(en)) === false && x.charAt(en) !== "(" && en < len);
    if (en === len)
      en = x.length - 2;
    name = x.slice(sn, en);
    if (name === "else" || st === "{%" && (name === "elseif" || name === "when" || name === "elif" || name === "elsif")) {
      return ["template_else", `template_${name}`];
    }
    if (st === "{{") {
      if (name === "end")
        return ["template_end", ""];
      if (name === "block" && /\{%\s*\w/.test(source) === false || name === "define" || name === "form" || name === "if" || name === "unless" || name === "range" || name === "with") {
        return ["template_start", `template_${name}`];
      }
      return ["template", ""];
    }
    en = namelist.length - 1;
    if (en > -1) {
      do {
        if (name === namelist[en] && (name !== "block" || /\{%\s*\w/.test(source) === false)) {
          return ["template_start", `template_${name}`];
        }
        if (name === "end" + namelist[en]) {
          return [
            "template_end",
            ""
          ];
        }
        en = en - 1;
      } while (en > -1);
    }
    return ["template", ""];
  }
  function vartpop() {
    vart.count.pop();
    vart.index.pop();
    vart.word.pop();
    vart.len = vart.len - 1;
  }
  function word() {
    let f = wordTest;
    let g = 1;
    let output = "";
    let nextitem = "";
    let tokel = ltoke;
    let typel = ltype;
    const lex = [];
    function elsefix() {
      brace.push("x{");
      parse.splice({
        data,
        howmany: 1,
        index: parse.count - 3
      });
    }
    function hoisting(index, ref, samescope) {
      const begin = data.begin[index];
      let parent = 0;
      do {
        if (data.token[index] === ref && data.types[index] === "word") {
          if (samescope === true) {
            data.types[index] = "reference";
          } else if (data.begin[index] > begin && data.token[data.begin[index]] === "{" && data.stack[index] !== "object" && data.stack[index] !== "class" && data.stack[index] !== "data_type") {
            if (data.stack[index] === "function") {
              data.types[index] = "reference";
            } else {
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
    }
    do {
      lex.push(c[f]);
      if (c[f] === "\\") {
        parse.error = `Illegal escape in JavaScript on line number ${parse.lineNumber}`;
      }
      f = f + 1;
    } while (f < a);
    if (ltoke.charAt(0) === "\u201C") {
      parse.error = `Quote looking character (\u201C, \\u201c) used instead of actual quotes on line number ${parse.lineNumber}`;
    } else if (ltoke.charAt(0) === "\u201D") {
      parse.error = `Quote looking character (\u201D, \\u201d) used instead of actual quotes on line number ${parse.lineNumber}`;
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
            if (g === 0)
              break;
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
              if (g === 0)
                break;
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
    if (options2.script.correct === true && (output === "Object" || output === "Array") && c[a + 1] === "(" && c[a + 2] === ")" && data.token[parse.count - 1] === "=" && data.token[parse.count] === "new") {
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
      if (options2.script.variableList !== "none" && (output === "var" || output === "let" || output === "const")) {
        if (data.types[g] === "comment") {
          do {
            g = g - 1;
          } while (g > 0 && data.types[g] === "comment");
        }
        if (options2.script.variableList === "list" && vart.len > -1 && vart.index[vart.len] === g && output === vart.word[vart.len]) {
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
        vart.count.push(0);
        vart.index.push(g);
        vart.word.push(output);
        g = f;
      } else if (vart.len > -1 && output !== vart.word[vart.len] && parse.count === vart.index[vart.len] && data.token[vart.index[vart.len]] === ";" && ltoke !== vart.word[vart.len] && options2.script.variableList === "list") {
        vartpop();
      }
      if (output === "from" && data.token[parse.count] === "x;" && data.token[parse.count - 1] === "}") {
        asifix();
      }
      if (output === "while" && data.token[parse.count] === "x;" && data.token[parse.count - 1] === "}") {
        let d = 0;
        let e = parse.count - 2;
        if (e > -1) {
          do {
            if (data.types[e] === "end") {
              d = d + 1;
            } else if (data.types[e] === "start") {
              d = d - 1;
            }
            if (d < 0) {
              if (data.token[e] === "{" && data.token[e - 1] === "do")
                asifix();
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
      } else if ((parse.structure[parse.structure.length - 1][0] === "object" || parse.structure[parse.structure.length - 1][0] === "class" || parse.structure[parse.structure.length - 1][0] === "data_type") && (data.token[parse.count] === "{" || data.token[data.begin[parse.count]] === "{" && data.token[parse.count] === "," || data.types[parse.count] === "template_end" && (data.token[data.begin[parse.count] - 1] === "{" || data.token[data.begin[parse.count] - 1] === ","))) {
        if (output === "return" || output === "break") {
          ltype = "word";
        } else {
          ltype = "property";
        }
      } else if (datatype[datatype.length - 1] === true || (options2.language === "typescript" || options2.language === "flow") && tokel === "type") {
        ltype = "type";
      } else if (references.length > 0 && (tokel === "function" || tokel === "class" || tokel === "const" || tokel === "let" || tokel === "var" || tokel === "new" || tokel === "void")) {
        ltype = "reference";
        references[references.length - 1].push(output);
        if (options2.language === "javascript" || options2.language === "jsx" || options2.language === "typescript" || options2.language === "tsx") {
          if (tokel === "var" || tokel === "function" && data.types[parse.count - 1] !== "operator" && data.types[parse.count - 1] !== "start" && data.types[parse.count - 1] !== "end") {
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
            if (data.token[d] === ";")
              break;
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
          if (options2.language === "javascript" || options2.language === "jsx" || options2.language === "typescript" || options2.language === "tsx") {
            hoisting(d, output, true);
          } else {
            hoisting(d, output, false);
          }
        } else if (references.length > 0 && (data.token[d] === "let" || data.token[d] === "const" || data.token[d] === "type" && (options2.language === "typescript" || options2.language === "tsx"))) {
          ltype = "reference";
          references[references.length - 1].push(output);
          hoisting(d, output, false);
        } else {
          ltype = "word";
        }
      } else if (parse.structure[parse.structure.length - 1][0] !== "object" || parse.structure[parse.structure.length - 1][0] === "object" && ltoke !== "," && ltoke !== "{") {
        let d = references.length;
        let e = 0;
        if (d > 0) {
          do {
            d = d - 1;
            e = references[d].length;
            if (e > 0) {
              do {
                e = e - 1;
                if (output === references[d][e])
                  break;
              } while (e > 0);
              if (output === references[d][e])
                break;
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
      if (output === "from" && data.token[parse.count] === "}")
        asifix();
    }
    recordPush("");
    if (output === "class")
      classy.push(0);
    if (output === "do") {
      nextitem = nextchar(1, true);
      if (nextitem !== "{") {
        ltoke = options2.script.correct === true ? "{" : "x{";
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
              data,
              howmany: 0,
              index: parse.count - 1,
              record: {
                begin: data.begin[data.begin[data.begin[parse.count - 1] - 1] - 1],
                ender: -1,
                lexer: "script",
                lines: 0,
                stack: "if",
                token: options2.script.correct === true ? "}" : "x}",
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
            elsefix();
          }
        } else if (data.token[parse.count] === "x}" && data.stack[parse.count] === "if") {
          elsefix();
        }
      }
      if (nextitem !== "if" && nextitem.charAt(0) !== "{") {
        ltoke = options2.script.correct === true ? "{" : "x{";
        ltype = "start";
        brace.push("x{");
        recordPush("else");
      }
    }
    if ((output === "for" || output === "if" || output === "switch" || output === "catch") && data.token[parse.count - 1] !== ".") {
      nextitem = nextchar(1, true);
      if (nextitem !== "(") {
        paren = parse.count;
        if (options2.script.correct === true) {
          start("(");
        } else {
          start("x(");
        }
      }
    }
  }
  do {
    if (/\s/.test(c[a])) {
      if (wordTest > -1)
        word();
      a = parse.spacer({
        array: c,
        end: b,
        index: a
      });
      if (parse.linesSpace > 1 && ltoke !== ";" && lengthb < parse.count && c[a + 1] !== "}") {
        asi(false);
        lengthb = parse.count;
      }
    } else if (c[a] === "{" && c[a + 1] === "%") {
      general("{%", "%}", "template");
    } else if (c[a] === "{" && c[a + 1] === "{") {
      general("{{", "}}", "template");
    } else if (c[a] === "<" && c[a + 1] === "!" && c[a + 2] === "-" && c[a + 3] === "-") {
      general("<!--", "-->", "comment");
    } else if (c[a] === "<") {
      lexerMarkup();
    } else if (c[a] === "/" && (a === b - 1 || c[a + 1] === "*")) {
      blockComment();
    } else if ((parse.count < 0 || data.lines[parse.count] > 0) && c[a] === "#" && c[a + 1] === "!" && (c[a + 2] === "/" || c[a + 2] === "[")) {
      general("#!" + c[a + 2], "\n", "string");
    } else if (c[a] === "/" && (a === b - 1 || c[a + 1] === "/")) {
      lineComment();
    } else if (is(c[a], 96 /* TQO */) || is(c[a], 125 /* RCB */) && parse.structure[parse.structure.length - 1][0] === "template_string") {
      if (wordTest > -1)
        word();
      ltoke = tempstring();
      if (is(ltoke, 125 /* RCB */) && ltoke.slice(ltoke.length - 2) === "${") {
        ltype = "template_string_else";
        recordPush("template_string");
      } else if (ltoke.slice(ltoke.length - 2) === "${") {
        ltype = "template_string_start";
        recordPush("template_string");
      } else if (is(ltoke[0], 125 /* RCB */)) {
        ltype = "template_string_end";
        recordPush("");
      } else {
        ltype = "string";
        recordPush("");
      }
    } else if (c[a] === '"' || c[a] === "'") {
      general(c[a], c[a], "string");
    } else if (c[a] === "-" && (a < b - 1 && c[a + 1] !== "=" && c[a + 1] !== "-") && (ltype === "number" || ltype === "word" || ltype === "reference") && ltoke !== "return" && (ltoke === ")" || ltoke === "]" || ltype === "word" || ltype === "reference" || ltype === "number")) {
      if (wordTest > -1)
        word();
      ltoke = "-";
      ltype = "operator";
      recordPush("");
    } else if (wordTest === -1 && (c[a] !== "0" || c[a] === "0" && c[a + 1] !== "b") && (/\d/.test(c[a]) || a !== b - 2 && c[a] === "-" && c[a + 1] === "." && /\d/.test(c[a + 2]) || a !== b - 1 && (c[a] === "-" || c[a] === ".") && /\d/.test(c[a + 1]))) {
      if (wordTest > -1)
        word();
      if (ltype === "end" && c[a] === "-") {
        ltoke = "-";
        ltype = "operator";
      } else {
        ltoke = numb();
        ltype = "number";
      }
      recordPush("");
    } else if (c[a] === ":" && c[a + 1] === ":") {
      if (wordTest > -1)
        word();
      if (options2.script.correct === true)
        plusplus();
      asifix();
      a = a + 1;
      ltoke = "::";
      ltype = "separator";
      recordPush("");
    } else if (c[a] === ",") {
      if (wordTest > -1)
        word();
      if (options2.script.correct === true)
        plusplus();
      if (datatype[datatype.length - 1] === true && data.stack[parse.count].indexOf("type") < 0) {
        datatype[datatype.length - 1] = false;
      }
      if (ltype === "comment") {
        commaComment();
      } else if (vart.len > -1 && vart.count[vart.len] === 0 && options2.script.variableList === "each") {
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
      if (wordTest > -1)
        word();
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
      if (/\s/.test(c[a - 1]) === true)
        parse.linesSpace = 1;
      recordPush("");
    } else if (c[a] === ";") {
      if (wordTest > -1)
        word();
      if (datatype[datatype.length - 1] === true && data.stack[parse.count].indexOf("type") < 0) {
        datatype[datatype.length - 1] = false;
      }
      if (classy[classy.length - 1] === 0)
        classy.pop();
      if (vart.len > -1 && vart.count[vart.len] === 0) {
        if (options2.script.variableList === "each") {
          vartpop();
        } else {
          vart.index[vart.len] = parse.count + 1;
        }
      }
      if (options2.script.correct === true)
        plusplus();
      ltoke = ";";
      ltype = "separator";
      if (data.token[parse.count] === "x}") {
        asibrace();
      } else {
        recordPush("");
      }
      blockinsert();
    } else if (c[a] === "(" || c[a] === "[" || c[a] === "{") {
      start(c[a]);
    } else if (c[a] === ")" || c[a] === "]" || c[a] === "}") {
      end(c[a]);
    } else if (c[a] === "*" && data.stack[parse.count] === "object" && wordTest < 0 && /\s/.test(c[a + 1]) === false && c[a + 1] !== "=" && /\d/.test(c[a + 1]) === false) {
      wordTest = a;
    } else if (c[a] === "=" || c[a] === "&" || c[a] === "<" || c[a] === ">" || c[a] === "+" || c[a] === "-" || c[a] === "*" || c[a] === "/" || c[a] === "!" || c[a] === "?" || c[a] === "|" || c[a] === "^" || c[a] === ":" || c[a] === "%" || c[a] === "~") {
      ltoke = operator();
      if (ltoke === "regex") {
        ltoke = data.token[parse.count];
      } else if (ltoke === "*" && data.token[parse.count] === "function") {
        data.token[parse.count] = "function*";
      } else {
        ltype = "operator";
        if (ltoke !== "!" && ltoke !== "++" && ltoke !== "--")
          asifix();
        recordPush("");
      }
    } else if (wordTest < 0 && c[a] !== "") {
      wordTest = a;
    }
    if (vart.len > -1 && parse.count === vart.index[vart.len] + 1 && data.token[vart.index[vart.len]] === ";" && ltoke !== vart.word[vart.len] && ltype !== "comment" && options2.script.variableList === "list") {
      vartpop();
    }
    a = a + 1;
  } while (a < b);
  if (wordTest > -1)
    word();
  if ((data.token[parse.count] !== "}" && data.token[0] === "{" || data.token[0] !== "{") && (data.token[parse.count] !== "]" && data.token[0] === "[" || data.token[0] !== "[")) {
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
  options2.script = cloneopts;
  return data;
};

// src/lexers/markup.ts
prettify.lexers.markup = function lexer(source) {
  const { options: options2, options: { liquid } } = prettify;
  const { data } = parse;
  const jsx = options2.language === "jsx" || options2.language === "tsx";
  const markup = options2.language === "html" || options2.language === "liquid";
  const rules = options2.markup;
  const igl = new Set(liquid.ignoreTagList);
  const asl = rules.attributeSortList.length;
  const count = { end: 0, start: 0, line: 1, index: -1 };
  const b = source.split(NIL);
  const c = b.length;
  let a = 0;
  let embed = false;
  let language;
  markup ? options2.language : "html";
  let within = 0;
  function normalize(input) {
    if (!(markup === true && jsx === false))
      return input;
    if (/(?:{[=#/]|%[>\]])|\}%[>\]]/.test(input))
      return input;
    if (!isLiquid(input, 3))
      return input;
    const end = input.length - 3;
    if (liquid.delimiterTrims === "force") {
      if (is(input[1], 37 /* PER */)) {
        if (not(input[2], 45 /* DSH */))
          input = input.replace(/^{%/, "{%-");
        if (not(input[end], 45 /* DSH */))
          input = input.replace(/%}$/, "-%}");
      } else {
        if (not(input[2], 45 /* DSH */))
          input = input.replace(/^{{/, "{{-");
        if (not(input[end], 45 /* DSH */))
          input = input.replace(/}}$/, "-}}");
      }
    } else if (liquid.delimiterTrims === "strip") {
      input = input.replace(/^{%-/, "{%").replace(/-%}$/, "%}").replace(/^{{-/, "{{").replace(/-}}$/, "}}");
    } else if (liquid.delimiterTrims === "tags" && is(input[1], 37 /* PER */)) {
      if (not(input[2], 45 /* DSH */))
        input = input.replace(/^{%/, "{%-");
      if (not(input[end], 45 /* DSH */))
        input = input.replace(/%}$/, "-%}");
    } else if (liquid.delimiterTrims === "outputs" && is(input[1], 123 /* LCB */)) {
      if (not(input[2], 45 /* DSH */))
        input = input.replace(/^{{/, "{{-");
      if (not(input[end], 45 /* DSH */))
        input = input.replace(/}}$/, "-}}");
    }
    if (liquid.normalizeSpacing === false)
      return input;
    if (/^{%-?\s*#/.test(input) || /^{%-?\s*comment/.test(input))
      return input;
    if (/{%-?\s*(?:liquid)/.test(input))
      return input;
    let t;
    let q = 0;
    return input.split(/(["']{1})/).map((char, idx, arr) => {
      const quotation = is(char[0], 34 /* DQO */) || is(char[0], 39 /* SQO */);
      if (q > 0 || quotation && q === 0 && not(arr[idx - 1], 92 /* BWS */) || quotation) {
        if (q === 0)
          t = char.charCodeAt(0);
        if (q === 1 && not(arr[idx - 1], 92 /* BWS */)) {
          if (t === char.charCodeAt(0))
            q = 2;
          return char;
        }
        if (q !== 2) {
          q = q === 0 ? 1 : q === 1 ? is(arr[idx - 1], 92 /* BWS */) ? 1 : 2 : 0;
          return char;
        }
        q = 0;
      }
      return char.replace(SpaceOnly, WSP).replace(/^({[{%]-?)/, "$1 ").replace(/([!=]=|[<>]=?)/g, " $1 ").replace(new RegExp(" +(?=[|[\\],:.])|(?<=[[.]) +", "g"), NIL).replace(new RegExp("(\\||(?<=[^=!<>])(?:(?<=assign[^=]+)=(?=[^=!<>])|=$))", "g"), " $1 ").replace(/([:,]$|[:,](?=\S))/g, "$1 ").replace(/(-?[%}]})$/, " $1").replace(SpaceOnly, WSP);
    }).join(NIL);
  }
  function esc(idx) {
    let x = idx;
    do
      x = x - 1;
    while (is(b[x], 92 /* BWS */));
    x = idx - x;
    return x % 2 === 1;
  }
  function push(target, record, structure) {
    if (target === data) {
      if (record.types.indexOf("end") > -1) {
        count.end = count.end + 1;
      } else if (record.types.indexOf("start") > -1) {
        count.start = count.start + 1;
      }
    }
    count.index = parse.count;
    count.line = parse.lineNumber;
    parse.push(target, record, structure);
  }
  function peers(n, i) {
    if (!grammar.html.tags.has(n))
      return false;
    if (n === i)
      return true;
    if (n === "dd" && i === "dt")
      return true;
    if (n === "dt" && i === "dd")
      return true;
    if (n === "td" && i === "th")
      return true;
    if (n === "th" && i === "td")
      return true;
    if (n === "colgroup" && (i === "tbody" || i === "tfoot" || i === "thead" || i === "tr"))
      return true;
    if (n === "tbody" && (i === "colgroup" || i === "tfoot" || i === "thead"))
      return true;
    if (n === "tfoot" && (i === "colgroup" || i === "tbody" || i === "thead"))
      return true;
    if (n === "thead" && (i === "colgroup" || i === "tbody" || i === "tfoot"))
      return true;
    if (n === "tr" && i === "colgroup")
      return true;
    return false;
  }
  function error(message) {
    return `Parse Error (line ${parse.lineNumber}):
${Array.isArray(message) ? message.join(NIL) : message}`;
  }
  function fix(token, end) {
    const tname = getTagName(token);
    const record = {
      begin: parse.scope.index,
      ender: -1,
      lexer: "markup",
      lines: data.lines[parse.count] > 0 ? 1 : 0,
      stack: getTagName(parse.scope.token),
      token: `</${parse.scope.token}>`,
      types: "end"
    };
    push(data, record, NIL);
    if (grammar.html.tags.has(parse.scope.token) && (end === true && parse.structure.length > 1 || end === false && `/${parse.scope.token}` !== tname)) {
      do {
        record.begin = parse.scope.index;
        record.stack = getTagName(parse.scope.token);
        record.token = `</${parse.scope.token}>`;
        push(data, record, NIL);
      } while (grammar.html.tags.has(parse.scope.token) && (end === true && parse.structure.length > 1 || end === false && `/${parse.scope.token}` !== tname));
    }
  }
  function parseError() {
    parse.error = "Prettify Error:\n\n" + parse.error;
  }
  function parseToken(end) {
    const record = {
      lexer: "markup",
      lines: parse.linesSpace,
      stack: parse.scope.token !== "global" ? getTagName(parse.scope.token) : "global",
      begin: parse.scope.index,
      token: NIL,
      types: NIL,
      ender: -1
    };
    let token = NIL;
    let lchar = NIL;
    let ltype = NIL;
    let tname = NIL;
    let start = NIL;
    let cheat = false;
    let nowalk = false;
    let ignore = false;
    let icount = 0;
    let jscomm = false;
    let nosort = false;
    let preserve = false;
    let basic = false;
    let attrs = [];
    let comm = [NIL, 0];
    function attrname(x) {
      const eq = x.indexOf("=");
      if (eq > 0) {
        const dq = x.indexOf('"');
        if (eq < dq && dq > 0)
          return [x.slice(0, eq), x.slice(eq + 1)];
        const sq = x.indexOf("'");
        if (eq < sq && sq > 0)
          return [x.slice(0, eq), x.slice(eq + 1)];
      }
      return [x, NIL];
    }
    function insert(count2) {
      record.lines = data.lines[parse.count] > 0 ? 1 : 0;
      record.token = `</${parse.scope.token}>`;
      record.types = "end";
      push(data, record, NIL);
      if (count2 > 0) {
        do {
          record.begin = parse.scope.index;
          record.stack = getTagName(parse.scope.token);
          record.token = `</${parse.scope.token}>`;
          push(data, record, NIL);
          count2 = count2 - 1;
        } while (count2 > 0);
      }
      record.begin = parse.scope.index;
      record.lines = parse.linesSpace;
      record.stack = getTagName(parse.scope.token);
      record.token = token;
      record.types = "end";
      data.lines[parse.count - 1] = 0;
    }
    function correct() {
      if (ltype === "end") {
        const lastToken = data.token[parse.count];
        if (data.types[parse.count - 1] === "singleton" && lastToken.charCodeAt(lastToken.length - 2) !== 47 /* FWS */ && `/${getTagName(lastToken)}` === tname) {
          data.types[parse.count - 1] = "start";
        }
      }
      if (markup) {
        if (is(token[0], 60 /* LAN */) && not(token[1], 33 /* BNG */) && not(token[1], 63 /* QWS */) && (parse.count < 0 || data.types[parse.count].indexOf("template") < 0)) {
          token = token.toLowerCase();
        }
        if (grammar.html.tags.has(parse.scope.token) && peers(tname.slice(1), parse.structure[parse.structure.length - 2][0])) {
          insert(0);
        } else if (parse.structure.length > 3 && grammar.html.tags.has(parse.scope.token) && grammar.html.tags.has(parse.structure[parse.structure.length - 2][0]) && grammar.html.tags.has(parse.structure[parse.structure.length - 3][0]) && peers(tname, parse.structure[parse.structure.length - 4][0])) {
          insert(3);
        } else if (parse.structure.length > 2 && grammar.html.tags.has(parse.scope.token) && grammar.html.tags.has(parse.structure[parse.structure.length - 2][0]) && peers(tname, parse.structure[parse.structure.length - 3][0])) {
          insert(2);
        } else if (parse.structure.length > 1 && grammar.html.tags.has(parse.scope.token) && peers(tname, parse.structure[parse.structure.length - 2][0])) {
          insert(1);
        } else if (peers(tname, parse.scope.token)) {
          insert(0);
        } else if (is(tname[0], 47 /* FWS */) && grammar.html.tags.has(parse.scope.token) && parse.scope.token !== tname.slice(1)) {
          fix(token, false);
          record.begin = parse.scope.index;
          record.lines = parse.linesSpace;
          record.stack = getTagName(parse.scope.token);
          record.token = token;
          record.types = "end";
          data.lines[parse.count - 1] = 0;
        }
        if (jsx === false && grammar.html.voids.has(tname)) {
          if (rules.correct === true && /\/>$/.test(token) === false) {
            token = token.slice(0, token.length - 1) + " />";
          }
          return true;
        }
      }
      return false;
    }
    function cdata() {
      if (ltype !== "cdata")
        return attribute();
      if (record.stack === "script" || record.stack === "style") {
        const stack = record.stack;
        let begin = parse.count;
        let ender = parse.count;
        if (data.types[ender] === "attribute") {
          do {
            begin = begin - 1;
            ender = ender - 1;
          } while (data.types[ender] === "attribute" && ender > -1);
        }
        record.begin = begin;
        record.token = "<![CDATA[";
        record.types = "cdata_start";
        token = token.replace(/^(\s*<!\[cdata\[)/i, NIL).replace(/(\]{2}>\s*)$/, NIL);
        push(data, record, NIL);
        parse.structure.push(["cdata", parse.count]);
        if (stack === "script") {
          prettify.lexers.script(token);
        } else {
          prettify.lexers.style(token);
        }
        record.begin = parse.scope.index;
        record.token = "]]>";
        record.types = "cdata_end";
        push(data, record, NIL);
        parse.structure.pop();
      }
      return attribute();
    }
    function template() {
      if (record.types.indexOf("template") === -1)
        return cdata();
      if (is(token[0], 123 /* LCB */) && is(token[1], 37 /* PER */)) {
        if (grammar.liquid.else.has(tname)) {
          record.types = "template_else";
        } else if (grammar.liquid.tags.has(tname)) {
          record.types = "template_start";
        } else if (tname.startsWith("end")) {
          const name = tname.slice(3);
          if (grammar.liquid.tags.has(name)) {
            record.types = "template_end";
          } else {
            record.stack = name;
            record.types = "template_end";
            let i = 0;
            do {
              if (data.types[i] === "template" && data.stack[i] === name) {
                data.types[i] = "template_start";
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
      if (liquid.quoteConvert === "double") {
        record.token = record.token.replace(/'/g, '"');
      } else if (liquid.quoteConvert === "single") {
        record.token = record.token.replace(/"/g, "'");
      }
      return cdata();
    }
    function singular() {
      if (basic && ignore === false && ltype !== "xml") {
        if (cheat === true || grammar.html.voids.has(tname) || is(token[token.length - 2], 47 /* FWS */) && is(token[token.length - 1], 62 /* RAN */)) {
          ltype = "singleton";
        } else {
          ltype = "start";
        }
        record.types = ltype;
      }
      return ignored();
    }
    function ignored() {
      let ender = NIL;
      if (CommIgnoreNext.test(data.token[parse.count])) {
        ignore = true;
        preserve = false;
        if (ltype.indexOf("template") > 0 && grammar.liquid.tags.has(tname)) {
          ender = `end${tname}`;
        } else if (grammar.html.voids.has(tname)) {
          ender = null;
        }
      } else if (grammar.html.voids.has(tname)) {
        ender = null;
      } else if (grammar.embed("liquid", tname) !== false && igl.has(tname) === true) {
        ender = null;
      }
      if (ender !== null && preserve === false && ignore === true && (end === ">" || end === "%}" || end === "}}")) {
        const tags = [];
        if (cheat === true) {
          ltype = "singleton";
        } else {
          preserve = true;
          ltype = "ignore";
          a = a + 1;
          if (a < c) {
            let delim = NIL;
            let ee = 0;
            let ff = 0;
            let endtag = false;
            do {
              if (is(b[a], 10 /* NWL */))
                parse.lineNumber = parse.lineNumber + 1;
              tags.push(b[a]);
              if (delim === NIL) {
                delim = is(b[a], 34 /* DQO */) ? '"' : is(b[a], 39 /* SQO */) ? "'" : NIL;
                if (not(tags[0], 123 /* LCB */) && is(b[a], 123 /* LCB */) && (is(b[a + 1], 123 /* LCB */) || is(b[a + 1], 37 /* PER */))) {
                  delim = b[a + 1] + "}";
                } else if (is(b[a], 60 /* LAN */) && basic === true) {
                  endtag = is(b[a + 1], 47 /* FWS */);
                } else if (b[a] === lchar && not(b[a - 1], 47 /* FWS */)) {
                  if (endtag === true) {
                    icount = icount - 1;
                    if (icount < 0)
                      break;
                  } else {
                    icount = icount + 1;
                  }
                }
              } else if (is(b[a], delim.charCodeAt(delim.length - 1))) {
                ff = 0;
                ee = delim.length - 1;
                if (is(delim[ee], 125 /* RCB */)) {
                  if (b.slice(a + (is(b[a + 2], 45 /* DSH */) ? 3 : 2), b.indexOf("%", a + 2)).join(NIL).trim().startsWith(ender))
                    break;
                } else if (ee > -1) {
                  do {
                    if (not(b[a - ff], delim.charCodeAt(ee)))
                      break;
                    ff = ff + 1;
                    ee = ee - 1;
                  } while (ee > -1);
                }
                if (ee < 0)
                  delim = NIL;
              }
              a = a + 1;
            } while (a < c);
          }
        }
        token = token + tags.join(NIL);
        token = token.replace(">", ` ${attrs.map(([value]) => value).join(WSP)}>`);
        attrs = [];
        record.token = token;
        record.types = "content-ignore";
      }
      return template();
    }
    function external() {
      cheat = correct();
      if (grammar.embed("html", tname) === false && grammar.embed("liquid", tname) === false || grammar.embed("liquid", tname) !== false && igl.has(tname) === true) {
        return singular();
      }
      let len = attrs.length - 1;
      let value = NIL;
      let name;
      if (len > -1) {
        do {
          name = attrname(attrs[len][0]);
          if (name[0] === "type") {
            value = name[1];
            if (is(value, 34 /* DQO */) || is(value, 39 /* SQO */))
              value = value.slice(1, -1);
            break;
          }
          len = len - 1;
        } while (len > -1);
      }
      if (is(token, 60 /* LAN */) && grammar.embed("html", tname)) {
        embed = true;
        if (value === NIL) {
          language = grammar.html.embed[tname].language;
        } else if (grammar.html.embed[tname].value(value)) {
          language = grammar.html.embed[tname].language;
        }
      } else if (isLiquidStart(token, true) && grammar.embed("liquid", tname)) {
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
              if (is(b[len], 60 /* LAN */)) {
                if (b.slice(len + 1, len + 4).join(NIL) === "!--") {
                  len = len + 4;
                  if (len < c) {
                    do {
                      if (ws(b[len]) === false) {
                        embed = false;
                        break;
                      }
                      if (is(b[len], 10 /* NWL */) || is(b[len], 13 /* CAR */))
                        break;
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
    function attribute() {
      push(data, record, NIL);
      const begin = parse.count;
      const stack = tname.replace(/\/$/, NIL);
      const qc = rules.quoteConvert;
      let idx = 0;
      let eq = 0;
      let dq = 0;
      let sq = 0;
      let name = NIL;
      let value = NIL;
      let len = attrs.length;
      function quotes() {
        if (parse.attributes.has(begin)) {
          if (idx + 1 === len && not(record.token[record.token.length - 1], 62 /* RAN */)) {
            record.token = record.token + ">";
          }
        }
        let lq = isLiquid(record.token, 5);
        if (ignore === true || qc === "none" || record.types.indexOf("attribute") < 0 || lq === false && qc === "single" && record.token.indexOf('"') < 0 || lq === false && qc === "double" && record.token.indexOf("'") < 0) {
          push(data, record, NIL);
        } else {
          let ee = 0;
          let inner = false;
          const ch = record.token.split(NIL);
          const eq2 = record.token.indexOf("=");
          const ln = ch.length - 1;
          if (not(ch[eq2 + 1], 34 /* DQO */) && not(ch[ch.length - 1], 34 /* DQO */) && qc === "single" && lq === false) {
            push(data, record, NIL);
          } else if (not(ch[eq2 + 1], 39 /* SQO */) && not(ch[ch.length - 1], 39 /* SQO */) && qc === "double" && lq === false) {
            push(data, record, NIL);
          } else {
            ee = eq2 + 2;
            if (lq === false) {
              if (qc === "double") {
                if (record.token.slice(eq2 + 2, ln).indexOf('"') > -1)
                  inner = true;
                ch[eq2 + 1] = '"';
                ch[ch.length - 1] = '"';
              } else if (qc === "single") {
                if (record.token.slice(eq2 + 2, ln).indexOf("'") > -1)
                  inner = true;
                ch[eq2 + 1] = "'";
                ch[ch.length - 1] = "'";
              }
            }
            if (inner === true || lq === true) {
              lq = false;
              do {
                if (is(ch[ee - 1], 123 /* LCB */) && (is(ch[ee], 37 /* PER */) || is(ch[ee], 123 /* LCB */))) {
                  lq = true;
                } else if (is(ch[ee], 125 /* RCB */) && (is(ch[ee - 1], 37 /* PER */) || is(ch[ee - 1], 125 /* RCB */))) {
                  lq = false;
                }
                if (lq === true) {
                  if (is(ch[ee], 34 /* DQO */) && qc === "double") {
                    ch[ee] = "'";
                  } else if (is(ch[ee], 39 /* SQO */) && qc === "single") {
                    ch[ee] = '"';
                  }
                } else {
                  if (is(ch[ee], 39 /* SQO */) && qc === "double") {
                    ch[ee] = '"';
                  } else if (is(ch[ee], 34 /* DQO */) && qc === "single") {
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
      }
      function sorting() {
        if (!(!jsx && !jscomm && !nosort))
          return;
        if (asl === 0) {
          attrs = parse.sortSafe(attrs, NIL, false);
          return;
        }
        const tempstore = [];
        dq = 0;
        eq = 0;
        len = attrs.length;
        do {
          eq = 0;
          do {
            name = attrs[eq][0].split("=")[0];
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
      function jsxattr() {
        record.token = name + "={";
        record.types = "jsx_attribute_start";
        push(data, record, "jsx_attribute");
        prettify.lexers.script(value.slice(1, value.length - 1));
        record.begin = parse.count;
        if (/\s\}$/.test(value)) {
          value = value.slice(0, value.length - 1);
          value = SpaceEnd.exec(value)[0];
          record.lines = value.indexOf("\n") < 0 ? 1 : value.split("\n").length;
        } else {
          record.lines = 0;
        }
        record.begin = parse.scope.index;
        record.stack = parse.scope.token;
        record.token = "}";
        record.types = "jsx_attribute_end";
        quotes();
      }
      function liqattr() {
        if (isLiquidLine(attrs[idx][0])) {
          record.types = "attribute";
          record.token = attrs[idx][0];
        } else if (isLiquidEnd(attrs[idx][0])) {
          record.token = attrs[idx][0];
          record.types = "template_attribute_end";
          record.ender = record.begin;
        } else {
          if (isLiquidStart(attrs[idx][0])) {
            record.types = "template_attribute_start";
            record.begin = parse.count;
            record.token = attrs[idx][0];
          } else if (isLiquidElse(attrs[idx][0])) {
            record.types = "template_attribute_else";
            record.token = attrs[idx][0];
          } else {
            record.types = "attribute";
            record.token = attrs[idx][0];
          }
        }
        quotes();
      }
      if (attrs.length < 1)
        return script2();
      if (is(attrs[attrs.length - 1][0], 47 /* FWS */)) {
        attrs.pop();
        token = token.replace(/>$/, "/>");
      }
      eq = attrs.length;
      dq = 1;
      if (dq < eq) {
        do {
          name = attrs[dq - 1][0];
          if (is(name[name.length - 1], 61 /* EQS */) && attrs[dq][0].indexOf("=") < 0) {
            attrs[dq - 1][0] = name + attrs[dq][0];
            attrs.splice(dq, 1);
            eq = eq - 1;
            dq = dq - 1;
          }
          dq = dq + 1;
        } while (dq < eq);
      }
      if (rules.attributeSort)
        sorting();
      record.begin = begin;
      record.stack = stack;
      record.types = "attribute";
      if (idx < len) {
        do {
          if (attrs[idx] === void 0)
            break;
          record.lines = attrs[idx][1];
          attrs[idx][0] = attrs[idx][0].replace(SpaceEnd, NIL);
          if (jsx === true && /^\/[/*]/.test(attrs[idx][0])) {
            record.types = "comment_attribute";
            record.token = attrs[idx][0];
            quotes();
            idx = idx + 1;
            continue;
          }
          if (attrs[idx][1] <= 1 && isLiquidLine(attrs[idx][0])) {
            if (!isValueLiquid(attrs[idx][0])) {
              record.types = "attribute";
              record.token = attrs[idx][0];
              quotes();
              idx = idx + 1;
              continue;
            }
          }
          eq = attrs[idx][0].indexOf("=");
          dq = attrs[idx][0].indexOf('"');
          sq = attrs[idx][0].indexOf("'");
          if (eq < 0) {
            record.types = "attribute";
            if (is(attrs[idx][0], 35 /* HSH */) || is(attrs[idx][0], 91 /* LSB */) || is(attrs[idx][0], 123 /* LCB */) || is(attrs[idx][0], 40 /* LPR */) || jsx === true) {
              record.token = attrs[idx][0];
            } else {
              record.token = rules.attributeCasing === "preserve" ? attrs[idx][0] : attrs[idx][0].toLowerCase();
            }
            quotes();
          } else {
            name = attrs[idx][0].slice(0, eq);
            value = attrs[idx][0].slice(eq + 1);
            if (rules.attributeCasing === "lowercase-name") {
              name = name.toLowerCase();
              attrs[idx][0] = name + "=" + value;
            } else if (rules.attributeCasing === "lowercase-value") {
              value = value.toLowerCase();
              attrs[idx][0] = name + "=" + value;
            } else if (rules.attributeCasing === "lowercase") {
              name = name.toLowerCase();
              value = value.toLowerCase();
              attrs[idx][0] = name + "=" + value;
            }
            if (rules.correct && (not(value, 60 /* LAN */) || not(value, 123 /* LCB */) || not(value, 61 /* EQS */) || not(value, 34 /* DQO */) || not(value, 39 /* SQO */))) {
              value = '"' + value + '"';
            }
            if (jsx === true && /^\s*{/.test(value)) {
              jsxattr();
              record.types = "attribute";
              record.begin = begin;
              record.stack = stack;
            } else if (isLiquidStart(value) && (liquid.valueForce === "always" || (liquid.valueForce === "intent" || liquid.valueForce === "wrap") && options2.wrap > 0 && Math.abs(a - parse.lineStart) >= options2.wrap || value.indexOf(NWL) > 0 && (liquid.valueForce === "newline" || liquid.valueForce === "intent")) && (is(value[0], 34 /* DQO */) || is(value[0], 39 /* SQO */))) {
              record.token = `${name}=${sq > -1 ? "'" : '"'}`;
              record.types = "attribute";
              parse.attributes.set(begin, grammar.html.voids.has(record.stack));
              push(data, record, NIL);
              if (idx + 1 === len) {
                lexer(value.slice(1, -1));
                data.token[parse.count] = `${data.token[parse.count]}${sq > -1 ? "'" : '"'}>`;
                break;
              }
              if (rules.forceIndent === true) {
                const q = value.lastIndexOf(value[0]);
                if (is(value[q], 34 /* DQO */) || is(value[q], 39 /* SQO */)) {
                  lexer(value.slice(1, q));
                  data.token[parse.count] = `${data.token[parse.count]}${sq > -1 ? "'" : '"'}`;
                } else {
                  lexer(value.slice(1));
                }
              } else {
                lexer(value.slice(1));
              }
              record.types = "attribute";
              record.stack = stack;
              record.begin = begin;
            } else {
              if (isLiquid(name, 5)) {
                liqattr();
              } else {
                record.types = "attribute";
                record.token = attrs[idx][0];
                quotes();
              }
            }
          }
          idx = idx + 1;
        } while (idx < len);
      }
      embed = false;
      return script2();
    }
    function exclude(tag, from) {
      tag = tag.trimStart().split(/\s/)[0];
      if (tag === "comment" || igl.has(tag)) {
        const idx1 = source.indexOf("{%", from);
        let idx2 = idx1;
        if (b[idx1 + 1].charCodeAt(0) === 45 /* DSH */)
          idx2 = idx1 + 1;
        idx2 = source.indexOf(`end${tag}`, idx2);
        if (idx2 > 0) {
          idx2 = b.indexOf("}", idx2);
          if (idx2 > 0 && b[idx2 - 1].charCodeAt(0) === 37 /* PER */) {
            if (tag !== "comment") {
              ltype = "ignore";
              ignore = true;
              start = b.slice(a, from + 1).join(NIL);
              end = b.slice(idx1, idx2 + 1).join(NIL);
            } else {
              ltype = "comment";
              start = b.slice(a, from + 1).join(NIL);
              end = b.slice(idx1, idx2 + 1).join(NIL);
            }
          }
        }
      }
    }
    function delimiter() {
      if (end === "---") {
        start = "---";
        ltype = "ignore";
        preserve = true;
      } else if (is(b[a], 60 /* LAN */)) {
        if (is(b[a + 1], 47 /* FWS */)) {
          ltype = "end";
          end = ">";
        } else if (is(b[a + 1], 33 /* BNG */)) {
          if ((is(b[a + 2], 100) || is(b[a + 2], 68)) && (is(b[a + 3], 111) || is(b[a + 3], 79)) && (is(b[a + 4], 99) || is(b[a + 4], 67)) && (is(b[a + 5], 116) || is(b[a + 5], 84)) && (is(b[a + 6], 121) || is(b[a + 6], 89)) && (is(b[a + 7], 112) || is(b[a + 7], 80)) && (is(b[a + 8], 101) || is(b[a + 8], 69))) {
            end = ">";
            ltype = "doctype";
            preserve = true;
          } else if (is(b[a + 2], 45 /* DSH */) && is(b[a + 3], 45 /* DSH */)) {
            end = "-->";
            ltype = "comment";
            start = "<!--";
          } else if (is(b[a + 2], 91 /* LSB */) && b[a + 3].charCodeAt(0) === 67 && b[a + 4].charCodeAt(0) === 68 && b[a + 5].charCodeAt(0) === 65 && b[a + 6].charCodeAt(0) === 84 && b[a + 7].charCodeAt(0) === 65 && is(b[a + 8], 91 /* LSB */)) {
            end = "]]>";
            ltype = "cdata";
            preserve = true;
          }
        } else if (b[a + 1] === "?") {
          end = "?>";
          if (b[a + 2].charCodeAt(0) === 120 && b[a + 3].charCodeAt(0) === 109 && b[a + 4].charCodeAt(0) === 109) {
            ltype = "xml";
            basic = true;
          } else {
            preserve = true;
            ltype = "template";
          }
        } else if ((is(b[a + 1], 112) || is(b[a + 1], 80)) && (is(b[a + 2], 114) || is(b[a + 2], 82)) && (is(b[a + 3], 101) || is(b[a + 3], 69)) && (is(b[a + 4], 62 /* RAN */) || ws(b[a + 4]))) {
          end = "</pre>";
          ltype = "ignore";
          preserve = true;
        } else if (rules.ignoreScripts === true && b.slice(a + 1, a + 7).join(NIL).toLowerCase() === "script") {
          end = "<\/script>";
          ltype = "ignore";
          preserve = true;
          ignore = true;
        } else if (rules.ignoreStyles === true && b.slice(a + 1, a + 6).join(NIL).toLowerCase() === "style") {
          end = "</style>";
          ltype = "ignore";
          preserve = true;
          ignore = true;
        } else {
          basic = true;
          end = ">";
        }
      } else if (is(b[a], 123 /* LCB */)) {
        if (jsx) {
          embed = true;
          nowalk = true;
          record.token = "{";
          record.types = "script_start";
          parse.structure.push(["script", parse.count]);
          push(data, record, NIL);
          return;
        }
        if (is(b[a + 1], 123 /* LCB */)) {
          preserve = true;
          end = "}}";
          ltype = "template";
        } else if (is(b[a + 1], 37 /* PER */)) {
          preserve = true;
          end = "%}";
          ltype = "template";
          const from = b.indexOf("}", a + 2);
          if (is(b[from - 1], 37 /* PER */)) {
            let tag = b.slice(a + 2, from - 1).join(NIL);
            if (is(tag, 45 /* DSH */)) {
              start = "{%-";
              tag = tag.slice(1).trimStart();
            } else {
              start = "{%";
              tag = tag.trimStart();
            }
            if (is(tag[tag.length - 1], 45 /* DSH */)) {
              end = "-%}";
              tag = tag.slice(0, tag.length - 1).trimEnd();
            } else {
              end = "%}";
              tag = tag.trimEnd();
            }
            exclude(tag, from);
            if (is(tag, 35 /* HSH */)) {
              ltype = "comment";
              end = "%}";
              lchar = end.charAt(end.length - 1);
              return comments(true);
            }
          } else {
            preserve = true;
            end = "%}";
            ltype = "template";
          }
        } else {
          preserve = true;
          end = b[a + 1] + "}";
          ltype = "template";
        }
      }
      if (rules.preserveAttributes === true)
        preserve = true;
      if (nowalk)
        return external();
      lchar = end.charAt(end.length - 1);
      if (ltype === "comment" && (is(b[a], 60 /* LAN */) || is(b[a], 123 /* LCB */) && is(b[a + 1], 37 /* PER */))) {
        return comments();
      } else if (a < c) {
        return traverse();
      } else {
        return external();
      }
    }
    function comments(lineComment) {
      if (lineComment === true) {
        comm = wrapCommentLine({
          chars: b,
          end: c,
          lexer: "markup",
          begin: start,
          start: a,
          ender: end
        });
      } else {
        comm = wrapCommentBlock({
          chars: b,
          end: c,
          lexer: "markup",
          begin: start,
          start: a,
          ender: end
        });
      }
      token = comm[0];
      a = comm[1];
      if (token.replace(start, NIL).trimStart().startsWith("@prettify-ignore-start")) {
        record.token = token;
        record.types = "ignore";
        push(data, record, NIL);
      } else {
        if (is(token[0], 123 /* LCB */) && is(token[1], 37 /* PER */) && lineComment === false) {
          const begin = token.indexOf("%}", 2) + 2;
          const last = token.lastIndexOf("{%");
          token = normalize(token.slice(0, begin)) + token.slice(begin, last) + normalize(token.slice(last));
        }
        record.token = token;
        record.types = "comment";
        return external();
      }
    }
    function traverse() {
      const lexed = [];
      let e = 0;
      let f = 0;
      let acount = 0;
      let bcount = 0;
      let pcount = 0;
      let lines = 0;
      let quote = NIL;
      let jsxquote = NIL;
      let jsxparen = 0;
      let isliquid = false;
      let stest = false;
      let qattr = false;
      let qtest = false;
      let store = [];
      function tokenize(quotes) {
        let each;
        let attr = NIL;
        if (quotes === true) {
          attr = store.join(NIL);
          each = attrname(attr);
          quote = NIL;
          if (each[0] === "data-prettify-ignore")
            ignore = true;
        } else {
          attr = store.join(NIL);
          if (jsx === false || jsx && not.last(attr, 125 /* RCB */))
            attr = attr.replace(/\s+/g, WSP);
          each = attrname(attr);
          if (each[0] === "data-prettify-ignore")
            ignore = true;
          if (jsx && is(store[0], 123 /* LCB */) && is.last(store, 125 /* RCB */))
            jsxparen = 0;
        }
        if (is(attr[0], 123 /* LCB */) && is(attr[1], 37 /* PER */))
          nosort = true;
        if (quotes === false) {
          if (isLiquidStart(attr))
            within = within + 1;
          if (isLiquidEnd(attr))
            within = within - 1;
        }
        attr = attr.replace(/^\u0020/, NIL).replace(/\u0020$/, NIL);
        store = attr.replace(/\r\n/g, NWL).split(NWL);
        if (!store.length)
          store[0] = store[0].replace(/\s+$/, NIL);
        attr = options2.crlf === true ? normalize(store.join("\r\n")) : normalize(store.join(NWL));
        if (within > 0 || isLiquid(attr, 1)) {
          if (isLiquid(attr, 5) === false) {
            lines = 0;
            if (is(b[a + 1], 10 /* NWL */) || is(b[a], 10 /* NWL */))
              lines = 2;
            if (is(b[a], 32 /* WSP */) && not(b[a + 1], 32 /* WSP */))
              lines = 1;
          } else {
            if (is(b[a + 1], 10 /* NWL */)) {
              lines = 2;
            } else if (is(b[a + 1], 32 /* WSP */)) {
              lines = 1;
            } else if (lines >= 1) {
              lines = 0;
            }
          }
        } else {
          if (is(b[a + 1], 10 /* NWL */)) {
            lines = 2;
          } else if (is(b[a + 1], 32 /* WSP */)) {
            lines = 1;
          }
        }
        if (attrs.length > 0) {
          const ln = attrs.length - 1;
          if (is(attr, 61 /* EQS */) || is(attr, 45 /* DSH */)) {
            attrs[ln][0] = attrs[ln][0] + attr;
            attrs[ln][1] = lines;
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
            const i = attr.indexOf("{%");
            attrs.push([attr.slice(0, i), lines]);
            attr = attr.slice(i);
          }
        }
        if (attr !== NIL && attr !== WSP)
          attrs.push([attr, lines]);
        if (attrs.length > 0) {
          const [value] = attrs[attrs.length - 1];
          if (value.indexOf("=\u201C") > 0) {
            parse.error = error("Invalid quote character (\u201C, &#x201c) used.");
          } else if (value.indexOf("=\u201D") > 0) {
            parse.error = error("Invalid quote character (\u201D, &#x201d) used.");
          }
        }
        store = [];
        lines = is(b[a], 10 /* NWL */) ? 2 : 1;
      }
      do {
        if (is(b[a], 10 /* NWL */)) {
          lines = lines + 1;
          parse.lineNumber = parse.lineNumber + 1;
        }
        if (start === "---" && end === "---" && ltype === "ignore") {
          lexed.push(b[a]);
          if (a > 3 && is(b[a], 45 /* DSH */) && is(b[a - 1], 45 /* DSH */) && is(b[a - 2], 45 /* DSH */))
            break;
          a = a + 1;
          continue;
        }
        if (ltype === "ignore" && (end === "</style>" || end === "<\/script>")) {
          lexed.push(b[a]);
          if (b[a - 8] === "<" && b[a - 7] === "/" && b[a - 6] === "s" && b[a - 5] === "c" && b[a - 4] === "r" && b[a - 3] === "i" && b[a - 2] === "p" && b[a - 1] === "t" && b[a] === ">") {
            record.token = lexed.join("");
            push(data, record, "ignore");
            a = a + 1;
            return;
          }
          a = a + 1;
          continue;
        }
        if (preserve === true || (ws(b[a]) === false && not(quote, 125 /* RCB */) || is(quote, 125 /* RCB */))) {
          if (isliquid === false && is(b[a - 1], 123 /* LCB */) && (is(b[a], 123 /* LCB */) || is(b[a], 37 /* PER */))) {
            isliquid = true;
          } else if (isliquid === true && is(b[a], 125 /* RCB */) && (is(b[a - 1], 125 /* RCB */) || is(b[a - 1], 37 /* PER */))) {
            isliquid = false;
          }
          lexed.push(b[a]);
          if (is(lexed[0], 60 /* LAN */) && is(lexed[1], 62 /* RAN */) && is(end, 62 /* RAN */)) {
            record.token = "<>";
            record.types = "start";
            push(data, record, "(empty)");
            return;
          }
          if (is(lexed[0], 60 /* LAN */) && is(lexed[1], 47 /* FWS */) && is(lexed[2], 62 /* RAN */) && is(end, 62 /* RAN */)) {
            record.token = "</>";
            record.types = "end";
            push(data, record, NIL);
            return;
          }
        }
        if (ltype === "cdata" && is(b[a], 62 /* RAN */) && is(b[a - 1], 93 /* RSB */) && not(b[a - 2], 93 /* RSB */)) {
          parse.error = error(`CDATA tag (${lexed.join(NIL)}) not properly terminated with "]]>`);
          break;
        }
        if (ltype === "comment") {
          quote = NIL;
          if (b[a] === lchar && lexed.length > end.length + 1) {
            f = lexed.length;
            e = end.length - 1;
            if (e > -1) {
              do {
                f = f - 1;
                if (not(lexed[f], end.charCodeAt(e)))
                  break;
                e = e - 1;
              } while (e > -1);
            }
            if (e < 0)
              break;
          }
        } else {
          if (quote === NIL) {
            if (is(lexed[0], 60 /* LAN */) && is(lexed[1], 33 /* BNG */) && ltype !== "cdata") {
              if (ltype === "doctype" && is(b[a], 62 /* RAN */))
                break;
              if (is(b[a], 91 /* LSB */)) {
                if (is(b[a + 1], 60 /* LAN */)) {
                  ltype = "start";
                  break;
                }
                if (ws(b[a + 1])) {
                  do {
                    a = a + 1;
                    if (is(b[a], 10 /* NWL */))
                      lines = lines + 1;
                  } while (a < c - 1 && ws(b[a + 1]));
                }
                if (is(b[a + 1], 60 /* LAN */)) {
                  ltype = "start";
                  break;
                }
              }
            }
            if (jsx) {
              if (is(b[a], 123 /* LCB */)) {
                jsxparen = jsxparen + 1;
              } else if (is(b[a], 125 /* RCB */)) {
                jsxparen = jsxparen - 1;
              }
            }
            if (is(b[a], 60 /* LAN */) && basic === true && preserve === false && lexed.length > 1 && />{2,3}/.test(end) === false) {
              parse.error = error(`Invalid structure detected ${b.slice(a, a + 8).join(NIL)}`);
              break;
            }
            if (ws(b[a]) === false && stest === true && b[a] !== lchar) {
              stest = false;
              icount = 0;
              quote = jsxquote;
              lexed.pop();
              if (a < c) {
                do {
                  if (is(b[a], 10 /* NWL */))
                    parse.lineNumber = parse.lineNumber + 1;
                  if (rules.preserveAttributes === true) {
                    lexed.push(b[a]);
                  } else {
                    store.push(b[a]);
                  }
                  if (not(quote, 34 /* DQO */) || not(quote, 39 /* SQO */)) {
                    if (is(b[a - 1], 123 /* LCB */) && (is(b[a], 37 /* PER */) || is(b[a], 123 /* LCB */))) {
                      isliquid = true;
                    } else if ((is(b[a - 1], 125 /* RCB */) || is(b[a - 1], 37 /* PER */)) && is(b[a], 125 /* RCB */)) {
                      isliquid = false;
                    }
                  }
                  if (jsx === false && qattr === false && isliquid === true && rules.preserveAttributes === false) {
                    const isval = is(store[0], 61 /* EQS */);
                    while (a < c) {
                      a = a + 1;
                      if (is(b[a], 10 /* NWL */)) {
                        parse.lineNumber = parse.lineNumber + 1;
                        if (isval) {
                          isliquid = false;
                          quote = NIL;
                          tokenize(false);
                          break;
                        }
                      }
                      store.push(b[a]);
                      if (isval && is(b[a + 1], 62 /* RAN */)) {
                        isliquid = false;
                        quote = NIL;
                        attrs[attrs.length - 1][0] += store.join(NIL);
                        store = [];
                        break;
                      }
                      if (isval === false && is(b[a], 125 /* RCB */) && (is(b[a - 1], 125 /* RCB */) || is(b[a - 1], 37 /* PER */))) {
                        isliquid = false;
                        quote = NIL;
                        tokenize(false);
                        break;
                      }
                    }
                  }
                  if (jsx === false && (is(b[a], 60 /* LAN */) || is(b[a], 62 /* RAN */)) && (quote === NIL || is(quote, 62 /* RAN */))) {
                    if (quote === NIL && is(b[a], 60 /* LAN */)) {
                      quote = ">";
                      acount = 1;
                    } else if (is(quote, 62 /* RAN */)) {
                      if (is(b[a], 60 /* LAN */)) {
                        acount = acount + 1;
                      } else if (is(b[a], 62 /* RAN */)) {
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
                      if (is.last(store, 47 /* FWS */) || is.last(store, 63 /* QWS */) && ltype === "xml") {
                        store.pop();
                        if (preserve === true)
                          lexed.pop();
                        a = a - 1;
                      }
                      if (store.length > 0)
                        tokenize(false);
                      break;
                    }
                    if (jsx === false && is(b[a], 123 /* LCB */) && is(b[a - 1], 61 /* EQS */)) {
                      quote = "}";
                    } else if (is(b[a], 34 /* DQO */) || is(b[a], 39 /* SQO */)) {
                      quote = b[a];
                      if (qattr === false && isliquid === false)
                        qattr = true;
                      if (is(b[a - 1], 61 /* EQS */) && (is(b[a + 1], 60 /* LAN */) || is(b[a + 1], 123 /* LCB */) && is(b[a + 2], 37 /* PER */) || ws(b[a + 1]) && not(b[a - 1], 61 /* EQS */))) {
                        icount = a;
                      }
                    } else if (is(b[a], 40 /* LPR */)) {
                      quote = ")";
                      pcount = 1;
                    } else if (jsx) {
                      if ((is(b[a - 1], 61 /* EQS */) || ws(b[a - 1])) && is(b[a], 123 /* LCB */)) {
                        quote = "}";
                        bcount = 1;
                      } else if (is(b[a], 47 /* FWS */)) {
                        if (is(b[a + 1], 42 /* ARS */)) {
                          quote = "*/";
                        } else if (b[a + 1] === "/") {
                          quote = "\n";
                        }
                      }
                    } else if (is(lexed[0], 123 /* LCB */) && is(b[a], 123 /* LCB */) && (is(b[a + 1], 123 /* LCB */) || is(b[a + 1], 37 /* PER */))) {
                      quote = is(b[a + 1], 123 /* LCB */) ? "}}" : b[a + 1] + "}";
                    }
                    if (ws(b[a]) && quote === NIL) {
                      if (is(store[store.length - 2], 61 /* EQS */)) {
                        e = a + 1;
                        if (e < c) {
                          do {
                            if (ws(b[e]) === false) {
                              if (is(b[e], 34 /* DQO */) || is(b[e], 39 /* SQO */)) {
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
                      } else if (jsxparen === 0 || jsxparen === 1 && is(store[0], 123 /* LCB */)) {
                        store.pop();
                        if (store.length > 0)
                          tokenize(false);
                        stest = true;
                        break;
                      }
                    }
                  } else if (is(b[a], 40 /* LPR */) && is(quote, 41 /* RPR */)) {
                    pcount = pcount + 1;
                  } else if (is(b[a], 41 /* RPR */) && is(quote, 41 /* RPR */)) {
                    pcount = pcount - 1;
                    if (pcount === 0) {
                      quote = NIL;
                      if (is(b[a + 1], end.charCodeAt(0))) {
                        tokenize(false);
                        break;
                      }
                    }
                  } else if (jsx && (is(quote, 125 /* RCB */) || is(quote, 10 /* NWL */) && is(b[a], 10 /* NWL */) || quote === "*/" && is(b[a - 1], 42 /* ARS */) && is(b[a], 47 /* FWS */))) {
                    if (is(b[a], 96 /* TQO */)) {
                      a = a + 1;
                      do {
                        store.push(b[a]);
                        if (is(b[a], 96 /* TQO */))
                          break;
                        a = a + 1;
                      } while (a < b.length);
                    }
                    if (is(quote, 125 /* RCB */)) {
                      if (is(b[a], 125 /* RCB */) && b[a] !== quote) {
                        bcount = bcount + 1;
                      } else if (b[a] === quote) {
                        bcount = bcount - 1;
                        if (bcount === 0) {
                          jsxparen = 0;
                          quote = NIL;
                          token = store.join(NIL);
                          if (rules.preserveAttributes === false) {
                            if (jsx) {
                              if (!/^\s*$/.test(token))
                                attrs.push([token, lines]);
                            } else {
                              token = token.replace(/\s+/g, WSP);
                              if (token !== WSP)
                                attrs.push([token, lines]);
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
                      if (token !== WSP)
                        attrs.push([token, lines]);
                      store = [];
                      lines = is(quote, 10 /* NWL */) ? 2 : 1;
                      quote = NIL;
                      break;
                    }
                  } else if (is(b[a], 123 /* LCB */) && is(b[a + 1], 37 /* PER */) && is(b[icount - 1], 61 /* EQS */) && (is(quote, 34 /* DQO */) || is(quote, 39 /* SQO */))) {
                    quote = quote + "{%";
                    icount = 0;
                  } else if (is(b[a - 1], 37 /* PER */) && is(b[a], 125 /* RCB */) && (quote === '"{%' || quote === "'{%")) {
                    quote = quote[0];
                    icount = 0;
                  } else if (is(b[a], 60 /* LAN */) && is(end, 62 /* RAN */) && is(b[icount - 1], 61 /* EQS */) && (is(quote, 34 /* DQO */) || is(quote, 39 /* SQO */))) {
                    quote = quote + "<";
                    icount = 0;
                  } else if (is(b[a], 62 /* RAN */) && (quote === '"<' || quote === "'<")) {
                    quote = quote.charAt(0);
                    icount = 0;
                  } else if (icount === 0 && not(quote, 62 /* RAN */) && (quote.length < 2 || not(quote, 34 /* DQO */) && not(quote, 39 /* SQO */))) {
                    f = 0;
                    e = quote.length - 1;
                    if (e > -1) {
                      do {
                        if (not(b[a - f], quote.charCodeAt(e)))
                          break;
                        f = f + 1;
                        e = e - 1;
                      } while (e > -1);
                    }
                    if (e < 0 && isliquid === false && qattr === true) {
                      qattr = false;
                      tokenize(true);
                      if (b[a + 1] === lchar)
                        break;
                    }
                  } else if (icount > 0 && ws(b[a]) === false) {
                    icount = 0;
                  }
                  a = a + 1;
                } while (a < c);
              }
            } else if (is(end, 10 /* NWL */) === false && (is(b[a], 34 /* DQO */) || is(b[a], 39 /* SQO */))) {
              quote = b[a];
            } else if (ltype !== "comment" && not(end, 10 /* NWL */) && is(b[a], 60 /* LAN */) && is(b[a + 1], 33 /* BNG */) && is(b[a + 2], 45 /* DSH */) && is(b[a + 3], 45 /* DSH */) && data.types[parse.count] !== "conditional") {
              quote = "-->";
            } else if (is(b[a], 123 /* LCB */) && not(lexed[0], 123 /* LCB */) && not(end, 10 /* NWL */) && (is(b[a + 1], 123 /* LCB */) || is(b[a + 1], 37 /* PER */))) {
              if (is(b[a + 1], 123 /* LCB */)) {
                quote = "}}";
              } else {
                quote = b[a + 1] + "}";
                if (store.length < 1 && (attrs.length < 1 || ws(b[a - 1]))) {
                  lexed.pop();
                  do {
                    if (is(b[a], 10 /* NWL */))
                      lines = lines + 1;
                    store.push(b[a]);
                    a = a + 1;
                  } while (a < c && b[a - 1] + b[a] !== quote);
                  store.push("}");
                  attrs.push([store.join(NIL), lines]);
                  store = [];
                  lines = 1;
                  quote = NIL;
                }
              }
              if (quote === end)
                quote = NIL;
            } else if (basic && not(end, 10 /* NWL */) && ws(b[a]) && not(b[a - 1], 60 /* LAN */)) {
              stest = true;
            } else if (basic && jsx && is(b[a], 47 /* FWS */) && (is(b[a + 1], 42 /* ARS */) || is(b[a + 1], 47 /* FWS */))) {
              stest = true;
              lexed[lexed.length - 1] = WSP;
              jsxquote = is(b[a + 1], 42 /* ARS */) ? "*/" : NWL;
              store.push(b[a]);
            } else if (isliquid === false && (b[a] === lchar || is(end, 10 /* NWL */) && is(b[a + 1], 60 /* LAN */)) && (lexed.length > end.length + 1 || is(lexed[0], 93 /* RSB */)) && (jsx === false || jsxparen === 0)) {
              if (is(end, 10 /* NWL */)) {
                if (ws(lexed[lexed.length - 1])) {
                  do {
                    lexed.pop();
                    a = a - 1;
                  } while (ws(lexed[lexed.length - 1]));
                }
                break;
              }
              f = lexed.length;
              e = end.length - 1;
              if (e > -1) {
                do {
                  f = f - 1;
                  if (lexed[f] !== end.charAt(e))
                    break;
                  e = e - 1;
                } while (e > -1);
              }
              if (e < 0) {
                if (is(lexed[f], 62 /* RAN */) && is(b[a], 62 /* RAN */) && attrs.length > 0) {
                  if (attrs[attrs.length - 1][1] === 0 && is(b[a - 1], 125 /* RCB */) && ws(b[a + 1])) {
                    attrs[attrs.length - 1][1] = is(b[a + 1], 32 /* WSP */) ? 1 : 2;
                  }
                }
                break;
              }
            }
          } else if (is(b[a], quote.charCodeAt(quote.length - 1)) && (jsx && is(end, 125 /* RCB */) && (not(b[a - 1], 92 /* BWS */) || esc(a) === false) || (jsx === false || not(end, 125 /* RCB */)))) {
            f = 0;
            e = quote.length - 1;
            if (e > -1) {
              do {
                if (b[a - f] !== quote.charAt(e))
                  break;
                f = f + 1;
                e = e - 1;
              } while (e > -1);
            }
            if (e < 0)
              quote = NIL;
          }
        }
        a = a + 1;
      } while (a < c);
      icount = 0;
      token = lexed.join(NIL);
      tname = getTagName(token);
      if (ignore === false)
        token = normalize(token);
      record.token = token;
      record.types = ltype;
      if (preserve === false && jsx === false)
        token = token.replace(/\s+/g, WSP);
      return external();
    }
    function script2() {
      if (options2.wrap > 0 && jsx === true) {
        let clength = 0;
        let bb = parse.count;
        let cc2 = 0;
        if (data.types[bb].indexOf("attribute") > -1) {
          do {
            clength = clength + data.token[bb].length + 1;
            bb = bb - 1;
          } while (data.lexer[bb] !== "markup" || data.types[bb].indexOf("attribute") > -1);
          if (data.lines[bb] === 1)
            clength = clength + data.token[bb].length + 1;
        } else if (data.lines[bb] === 1) {
          clength = data.token[bb].length + 1;
        }
        cc2 = bb - 1;
        if (clength > 0 && data.types[cc2] !== "script_end") {
          if (data.types[cc2].indexOf("attribute") > -1) {
            do {
              clength = clength + data.token[cc2].length + 1;
              cc2 = cc2 - 1;
            } while (data.lexer[cc2] !== "markup" || data.types[cc2].indexOf("attribute") > -1);
            if (data.lines[cc2] === 1)
              clength = clength + data.token[cc2].length + 1;
          } else if (data.lines[cc2] === 1) {
            clength = data.token[cc2].length + 1;
          }
        }
      }
      parse.linesSpace = 0;
    }
    return delimiter();
  }
  function parseContent() {
    const now = a;
    const jsxbrace = jsx === true && is(data.token[parse.count], 123 /* LCB */);
    let lex = [];
    let ltoke = NIL;
    let liner = parse.linesSpace;
    let name = NIL;
    if (embed === true) {
      if (jsxbrace === true) {
        name = "script";
      } else if (parse.scope.index > -1) {
        name = getTagName(data.token[parse.scope.index]);
      } else if (data.begin[parse.count] > 1) {
        name = getTagName(data.token[data.begin[parse.count]]);
      } else {
        name = getTagName(data.token[data.begin[parse.count]]);
      }
    }
    const square = data.types[parse.count] === "template_start" && data.token[parse.count].indexOf("<!") === 0 && data.token[parse.count].indexOf("<![") < 0 && data.token[parse.count].charCodeAt(data.token[parse.count].length - 1) === 91 /* LSB */;
    const record = {
      begin: parse.scope.index,
      ender: -1,
      lexer: "markup",
      lines: liner,
      stack: getTagName(parse.scope.token),
      token: NIL,
      types: "content"
    };
    function esctest() {
      let aa = a - 1;
      let bb = 0;
      if (not(b[a - 1], 92 /* BWS */))
        return false;
      if (aa > -1) {
        do {
          if (not(b[aa], 92 /* BWS */))
            break;
          bb = bb + 1;
          aa = aa - 1;
        } while (aa > -1);
      }
      return bb % 2 === 1;
    }
    if (a < c) {
      let end = NIL;
      let quote = NIL;
      let output = NIL;
      let quotes = 0;
      do {
        if (is(b[a], 10 /* NWL */))
          parse.lineNumber = parse.lineNumber + 1;
        if (embed === true) {
          if (quote === NIL) {
            if (is(b[a], 47 /* FWS */)) {
              if (is(b[a + 1], 42 /* ARS */)) {
                quote = "*";
              } else if (is(b[a + 1], 47 /* FWS */)) {
                quote = "/";
              } else if (name === "script" && "([{!=,;.?:&<>".indexOf(b[a - 1]) > -1) {
                if (jsx === false || not(b[a - 1], 60 /* LAN */))
                  quote = "reg";
              }
            } else if ((is(b[a], 34 /* DQO */) || is(b[a], 39 /* SQO */) || is(b[a], 96 /* TQO */)) && esctest() === false) {
              quote = b[a];
            } else if (is(b[a], 123 /* LCB */) && jsxbrace === true) {
              quotes = quotes + 1;
            } else if (is(b[a], 125 /* RCB */) && jsxbrace === true) {
              if (quotes === 0) {
                output = lex.join(NIL).replace(SpaceLead, NIL).replace(SpaceEnd, NIL);
                prettify.lexers.script(output);
                parse.scope.index += 1;
                if (data.types[parse.count] === "end" && data.lexer[data.begin[parse.count] - 1] === "script") {
                  record.lexer = "script";
                  record.token = rules.correct === true ? ";" : "x;";
                  record.types = "separator";
                  push(data, record, NIL);
                  record.lexer = "markup";
                }
                record.token = "}";
                record.types = "script_end";
                push(data, record, NIL);
                parse.structure.pop();
                break;
              }
              quotes = quotes - 1;
            }
            if (isLiquid(data.token[parse.count], 3) === false) {
              end = b.slice(a, a + 10).join(NIL).toLowerCase();
              if (name === "script") {
                end = a === c - 9 ? end.slice(0, end.length - 1) : end.slice(0, end.length - 2);
                if (end === "<\/script") {
                  output = lex.join(NIL).replace(SpaceLead, NIL).replace(SpaceEnd, NIL);
                  a = a - 1;
                  if (lex.length < 1)
                    break;
                  if (/^<!--+/.test(output) && /--+>$/.test(output)) {
                    record.token = "<!--";
                    record.types = "comment";
                    push(data, record, NIL);
                    output = output.replace(/^<!--+/, NIL).replace(/--+>$/, NIL);
                    prettify.lexers.script(output);
                    record.token = "-->";
                    push(data, record, NIL);
                  } else {
                    options2.language = language;
                    prettify.lexers.script(output);
                    if (language === "json" && options2.json.objectSort || language !== "json" && options2.script.objectSort) {
                      parse.sortCorrect(0, parse.count + 1);
                    }
                    options2.language = "html";
                  }
                  break;
                }
              }
              if (name === "style") {
                if (a === c - 8) {
                  end = end.slice(0, end.length - 1);
                } else if (a === c - 9) {
                  end = end.slice(0, end.length - 2);
                } else {
                  end = end.slice(0, end.length - 3);
                }
                if (end === "</style") {
                  let outside = lex.join(NIL).replace(SpaceLead, NIL).replace(SpaceEnd, NIL);
                  a = a - 1;
                  if (lex.length < 1)
                    break;
                  if (/^<!--+/.test(outside) && /--+>$/.test(outside)) {
                    record.token = "<!--";
                    record.types = "comment";
                    push(data, record, NIL);
                    outside = outside.replace(/^<!--+/, NIL).replace(/--+>$/, NIL);
                    prettify.lexers.style(outside);
                    record.token = "-->";
                    push(data, record, NIL);
                  } else {
                    options2.language = language;
                    prettify.lexers.style(outside);
                    if (options2.style.sortProperties === true)
                      parse.sortCorrect(0, parse.count + 1);
                    options2.language = "html";
                  }
                  break;
                }
              }
            } else {
              const embed2 = grammar.embed("liquid", name);
              if (embed2 !== false && igl.has(name) === false) {
                const inner = b.slice(a).join(NIL);
                const ender = inner.search(new RegExp(`{%-?\\s*end${name}`));
                lex = lex.length > 0 ? lex.concat(lex, b.slice(a, a + ender)) : b.slice(a, a + ender);
                a = a + ender;
                end = b.slice(a).join(NIL).toLowerCase();
                if (embed2.end(end)) {
                  end = end.slice(0, end.indexOf("%}") + 2);
                  output = lex.join(NIL).replace(SpaceLead, NIL).replace(SpaceEnd, NIL);
                  a = a + (end.length - 1);
                  if (lex.length < 1)
                    break;
                  parse.lexer(output, embed2.language);
                  record.token = end;
                  record.types = "template_end";
                  push(data, record, NIL);
                }
                break;
              }
            }
          } else if (quote === b[a] && esctest() === false && (is(quote, 34 /* DQO */) || is(quote, 39 /* SQO */) || is(quote, 96 /* TQO */) || is(quote, 42 /* ARS */) && is(b[a + 1], 47 /* FWS */))) {
            quote = NIL;
          } else if (is(quote, 96 /* TQO */) && is(b[a], 36 /* DOL */) && is(b[a + 1], 123 /* LCB */) && esctest() === false) {
            quote = "}";
          } else if (is(quote, 125 /* RCB */) && is(b[a], 125 /* RCB */) && esctest() === false) {
            quote = "`";
          } else if (is(quote, 47 /* FWS */) && (is(b[a], 10 /* NWL */) || is(b[a], 13 /* CAR */))) {
            quote = NIL;
          } else if (quote === "reg" && is(b[a], 47 /* FWS */) && esctest() === false) {
            quote = NIL;
          } else if (is(quote, 47 /* FWS */) && is(b[a], 60 /* LAN */) && is(b[a - 1], 45 /* DSH */) && is(b[a - 2], 45 /* DSH */)) {
            end = b.slice(a + 1, a + 11).join(NIL).toLowerCase();
            end = end.slice(0, end.length - 2);
            if (name === "script" && end === "<\/script")
              quote = NIL;
            end = end.slice(0, end.length - 1);
            if (name === "style" && end === "</style")
              quote = NIL;
          }
        }
        if (square === true && is(b[a], 93 /* RSB */)) {
          a = a - 1;
          liner = 0;
          ltoke = lex.join(NIL);
          ltoke = ltoke.replace(SpaceEnd, NIL);
          record.token = ltoke;
          push(data, record, NIL);
          break;
        }
        if (embed === false && lex.length > 0 && (is(b[a], 60 /* LAN */) && not(b[a + 1], 61 /* EQS */) && !/[\s\d]/.test(b[a + 1]) || is(b[a], 91 /* LSB */) && is(b[a + 1], 37 /* PER */) || is(b[a], 123 /* LCB */) && (jsx === true || is(b[a + 1], 123 /* LCB */) || is(b[a + 1], 37 /* PER */)))) {
          a = a - 1;
          if (parse.scope.token === "comment") {
            ltoke = lex.join(NIL);
          } else {
            ltoke = lex.join(NIL).replace(SpaceEnd, NIL);
          }
          liner = 0;
          record.token = ltoke;
          if (options2.wrap > 0 && rules.preserveText === false) {
            let wrapper2 = function() {
              if (is(ltoke[aa], 32 /* WSP */)) {
                store.push(ltoke.slice(0, aa));
                ltoke = ltoke.slice(aa + 1);
                len = ltoke.length;
                aa = wrap;
                return;
              }
              do
                aa = aa - 1;
              while (aa > 0 && not(ltoke[aa], 32 /* WSP */));
              if (aa > 0) {
                store.push(ltoke.slice(0, aa));
                ltoke = ltoke.slice(aa + 1);
                len = ltoke.length;
                aa = wrap;
              } else {
                aa = wrap;
                do
                  aa = aa + 1;
                while (aa < len && not(ltoke[aa], 32 /* WSP */));
                store.push(ltoke.slice(0, aa));
                ltoke = ltoke.slice(aa + 1);
                len = ltoke.length;
                aa = wrap;
              }
            };
            const { wrap } = options2;
            const store = [];
            let aa = wrap;
            let len = ltoke.length;
            if (data.token[data.begin[parse.count]] === "<a>" && data.token[data.begin[data.begin[parse.count]]] === "<li>" && data.lines[data.begin[parse.count]] === 0 && parse.linesSpace === 0 && ltoke.length < options2.wrap) {
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
                if (data.types[bb].indexOf("attribute") > -1)
                  aa = aa - 1;
                if (data.lines[bb] > 0 && data.types[bb].indexOf("attribute") < 0)
                  break;
                bb = bb - 1;
              } while (bb > 0 && aa > 0);
              if (aa < 1)
                aa = ltoke.indexOf(WSP);
            }
            ltoke = lex.join(NIL).replace(SpaceLead, NIL).replace(SpaceEnd, NIL).replace(/\s+/g, WSP);
            do
              wrapper2();
            while (aa < len);
            if (ltoke !== NIL && not(ltoke, 32 /* WSP */))
              store.push(ltoke);
            ltoke = options2.crlf === true ? store.join("\r\n") : store.join("\n");
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
          if (is(b[x], 10 /* NWL */))
            parse.linesSpace = parse.linesSpace + 1;
          x = x - 1;
        } while (x > now && ws(b[x]));
      } else {
        parse.linesSpace = 0;
      }
    } else if (a !== now || a === now && embed === false) {
      ltoke = lex.join(NIL).replace(SpaceEnd, NIL);
      liner = 0;
      if (record.token !== ltoke) {
        record.token = ltoke;
        push(data, record, NIL);
        parse.linesSpace = 0;
      }
    }
    embed = false;
  }
  function parseSpace() {
    parse.linesSpace = 1;
    do {
      if (is(b[a], 10 /* NWL */)) {
        parse.lineStart = a;
        parse.linesSpace = parse.linesSpace + 1;
        parse.lineNumber = parse.lineNumber + 1;
      }
      if (ws(b[a + 1]) === false)
        break;
      a = a + 1;
    } while (a < c);
  }
  if (options2.language === "html" || options2.language === "liquid")
    ;
  do {
    if (ws(b[a])) {
      parseSpace();
    } else if (embed) {
      parseContent();
    } else if (is(b[a], 60 /* LAN */)) {
      parseToken(NIL);
    } else if (is(b[a], 123 /* LCB */) && (jsx || is(b[a + 1], 123 /* LCB */) || is(b[a + 1], 37 /* PER */))) {
      parseToken(NIL);
    } else if (is(b[a], 45 /* DSH */) && is(b[a + 1], 45 /* DSH */) && is(b[a + 2], 45 /* DSH */)) {
      parseToken("---");
    } else if (parse.error) {
      parseError();
      return data;
    } else {
      parseContent();
    }
    a = a + 1;
  } while (a < c);
  if (count.end !== count.start && parse.error === NIL) {
    console.log(count, parse.count);
    if (count.end > count.start) {
      const x = count.end - count.start;
      const p = x === 1 ? NIL : "s";
      parse.error = [
        `Prettify Error (line ${parse.lineNumber - x}):`,
        `	
${data.token[count.index]}
`,
        `${x} more end type${p} than start type${p}`
      ].join("\n");
    } else {
      const x = count.start - count.end;
      const p = x === 1 ? NIL : "s";
      parse.error = [
        `Prettify Error (line ${parse.lineNumber - x}):`,
        `
${data.token[count.index]}
`,
        `${x} more start type${p} than end type${p}`
      ].join("\n");
    }
  }
  return data;
};

// src/beautify/markup.ts
prettify.beautify.markup = function(options2) {
  const extidx = {};
  const lexer2 = "markup";
  const data = parse.data;
  const jsx = options2.language === "jsx" || options2.language === "tsx";
  const lf = options2.crlf === true ? String.fromCharCode(13, 10) : String.fromCharCode(10);
  const rules = options2.markup;
  const liquid = options2.liquid;
  const force = rules.forceAttribute;
  const c = prettify.end < 1 || prettify.end > data.token.length ? data.token.length : prettify.end + 1;
  const type = {
    is: (index, name) => data.types[index] === name,
    not: (index, name) => data.types[index] !== name,
    idx: (index, name) => index > -1 && (data.types[index] || NIL).indexOf(name)
  };
  const token = {
    is: (index, tag) => data.token[index] === tag,
    not: (index, tag) => data.token[index] !== tag
  };
  let a = prettify.start;
  let comstart = -1;
  let next = 0;
  let count = 0;
  let indent = isNaN(options2.indentLevel) ? 0 : Number(options2.indentLevel);
  const levels = function() {
    const level = prettify.start > 0 ? Array(prettify.start).fill(0, 0, prettify.start) : [];
    function forward() {
      let x = a + 1;
      let y = 0;
      if (type.is(x, void 0))
        return x - 1;
      if (type.is(x, "comment") || a < c - 1 && type.idx(x, "attribute") > -1) {
        do {
          if (type.is(x, "jsx_attribute_start")) {
            y = x;
            do {
              if (type.is(x, "jsx_attribute_end") && data.begin[x] === y)
                break;
              x = x + 1;
            } while (x < c);
          } else if (type.not(x, "comment") && type.idx(x, "attribute") < 0)
            return x;
          x = x + 1;
        } while (x < c);
      }
      return x;
    }
    function anchorlist() {
      const stop = data.begin[a];
      let aa = a;
      do {
        aa = aa - 1;
        if (token.is(aa, "</li>") && token.is(aa - 1, "</a>") && data.begin[data.begin[aa]] === stop && data.begin[aa - 1] === data.begin[aa] + 1) {
          aa = data.begin[aa];
        } else {
          return;
        }
      } while (aa > stop + 1);
      aa = a;
      do {
        aa = aa - 1;
        if (type.is(aa + 1, "attribute")) {
          level[aa] = -10;
        } else if (token.not(aa, "</li>")) {
          level[aa] = -20;
        }
      } while (aa > stop + 1);
    }
    function comment2() {
      let x = a;
      let test = false;
      if (data.lines[a + 1] === 0 && rules.forceIndent === false) {
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
      if (test === true) {
        if (type.is(data.begin[x] - 1, "template")) {
          level[data.begin[x] - 1] = indent;
        }
        const ind = type.is(next, "end") || type.is(next, "template_end") ? indent + 1 : indent;
        do {
          level.push(ind);
          x = x - 1;
        } while (x > comstart);
        if (ind === indent + 1)
          level[a] = indent;
        if (type.is(x, "attribute") || type.is(x, "template_attribute") || type.is(x, "jsx_attribute_start")) {
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
    }
    function content() {
      let ind = indent;
      if (rules.forceIndent === true || rules.forceAttribute === true) {
        level.push(indent);
        return;
      }
      if (next < c && (type.idx(next, "end") > -1 || type.idx(next, "start") > -1) && data.lines[next] > 0) {
        level.push(indent);
        ind = ind + 1;
        if (a > 0 && type.is(a, "singleton") && type.idx(a - 1, "attribute") > -1 && type.is(data.begin[a - 1], "singleton")) {
          if (data.begin[a] < 0 || type.is(data.begin[a - 1], "singleton") && data.begin[data.ender[a] - 1] !== a) {
            level[a - 1] = indent;
          } else {
            level[a - 1] = indent + 1;
          }
        }
      } else if (a > 0 && type.is(a, "singleton") && type.idx(a - 1, "attribute") > -1) {
        level[a - 1] = indent;
        count = data.token[a].length;
        level.push(-10);
      } else if (data.lines[next] === 0) {
        level.push(-20);
      } else if ((options2.wrap === 0 || a < c - 2 && data.token[a] !== void 0 && data.token[a + 1] !== void 0 && data.token[a + 2] !== void 0 && data.token[a].length + data.token[a + 1].length + data.token[a + 2].length + 1 > options2.wrap && type.idx(a + 2, "attribute") > -1 || data.token[a] !== void 0 && data.token[a + 1] !== void 0 && data.token[a].length + data.token[a + 1].length > options2.wrap) && (type.is(a + 1, "singleton") || type.is(a + 1, "template"))) {
        level.push(indent);
      } else {
        count = count + 1;
        level.push(-10);
      }
      if (a > 0 && type.idx(a - 1, "attribute") > -1 && data.lines[a] < 1) {
        level[a - 1] = -20;
      }
      if (count > options2.wrap) {
        let d = a;
        let e = Math.max(data.begin[a], 0);
        if (type.is(a, "content") && rules.preserveText === false) {
          let countx = 0;
          const chars = data.token[a].replace(/\s+/g, WSP).split(WSP);
          do {
            d = d - 1;
            if (level[d] < 0) {
              countx = countx + data.token[d].length;
              if (level[d] === -10)
                countx = countx + 1;
            } else {
              break;
            }
          } while (d > 0);
          d = 0;
          e = chars.length;
          do {
            if (chars[d].length + countx > options2.wrap) {
              chars[d] = lf + chars[d];
              countx = chars[d].length;
            } else {
              chars[d] = ` ${chars[d]}`;
              countx = countx + chars[d].length;
            }
            d = d + 1;
          } while (d < e);
          if (is(chars[0], 32 /* WSP */)) {
            data.token[a] = chars.join(NIL).slice(1);
          } else {
            level[a - 1] = ind;
            data.token[a] = chars.join(NIL).replace(lf, NIL);
          }
          if (data.token[a].indexOf(lf) > 0) {
            count = data.token[a].length - data.token[a].lastIndexOf(lf);
          }
        } else {
          do {
            d = d - 1;
            if (level[d] > -1) {
              count = data.token[a].length;
              if (data.lines[a + 1] > 0)
                count = count + 1;
              return;
            }
            if (type.idx(d, "start") > -1) {
              count = 0;
              return;
            }
            if (data.lines[d + 1] > 0 && (type.not(d, "attribute") || type.is(d, "attribute") && type.is(d + 1, "attribute"))) {
              if (type.not(d, "singleton") || type.is(d, "attribute") && type.is(d + 1, "attribute")) {
                count = data.token[a].length;
                if (data.lines[a + 1] > 0)
                  count = count + 1;
                break;
              }
            }
          } while (d > e);
          level[d] = ind;
        }
      }
    }
    function external() {
      const skip = a;
      if (data.types[skip - 1] === "script_start" && is(data.token[skip - 1], 123 /* LCB */)) {
        level[skip - 1] = -20;
      }
      do {
        if (data.lexer[a + 1] === lexer2 && data.begin[a + 1] < skip && type.not(a + 1, "start") && type.not(a + 1, "singleton"))
          break;
        level.push(0);
        a = a + 1;
      } while (a < c);
      extidx[skip] = a;
      if (data.types[a + 1] === "script_end" && data.token[a + 1] === "}") {
        level.push(-20);
      } else {
        level.push(indent - 1);
      }
      next = forward();
      if (data.lexer[next] === lexer2 && data.stack[a].indexOf("attribute") < 0 && (data.types[next] === "end" || data.types[next] === "template_end")) {
        indent = indent - 1;
      }
    }
    function attribute() {
      function attributeWrap(index) {
        const item = data.token[index].replace(/\s+/g, WSP).split(WSP);
        const size2 = item.length;
        let bb = 1;
        let acount = item[0].length;
        do {
          if (acount + item[bb].length > options2.wrap) {
            acount = item[bb].length;
            item[bb] = lf + item[bb];
          } else {
            item[bb] = ` ${item[bb]}`;
            acount = acount + item[bb].length;
          }
          bb = bb + 1;
        } while (bb < size2);
        data.token[index] = item.join(NIL);
      }
      let w = a;
      const parent = a - 1;
      let plural = false;
      let attrstart = false;
      let attcount = data.types.indexOf("end", parent + 1);
      let len = data.token[parent].length + 1;
      let lev = (() => {
        if (type.idx(a, "start") > 0) {
          let x = a;
          do {
            if (type.is(x, "end") && data.begin[x] === a) {
              if (x < c - 1 && type.idx(x + 1, "attribute") > -1) {
                plural = true;
                break;
              }
            }
            x = x + 1;
          } while (x < c);
        } else if (a < c - 1 && type.idx(a + 1, "attribute") > -1) {
          plural = true;
        }
        if (type.is(next, "end") || type.is(next, "template_end")) {
          return indent + (type.is(parent, "singleton") ? 2 : 1);
        }
        if (type.is(parent, "singleton"))
          return indent + 1;
        return indent;
      })();
      if (plural === false && type.is(a, "comment_attribute")) {
        level.push(indent);
        level[parent] = data.types[parent] === "singleton" ? indent + 1 : indent;
        return;
      }
      if (lev < 1)
        lev = 1;
      attcount = 0;
      do
        attcount = attcount + 1;
      while (type.idx(a + attcount, "attribute") > -1 && (type.not(a + attcount, "end") || type.not(a + attcount, "singleton") || type.not(a + attcount, "start") || type.not(a + attcount, "comment")));
      do {
        count = count + data.token[a].length + 1;
        if (data.types[a].indexOf("attribute") > 0) {
          if (type.is(a, "comment_attribute")) {
            level.push(lev);
          } else if (type.idx(a, "start") > 0 && type.idx(a, "template") < 0) {
            attrstart = true;
            if (a < c - 2 && data.types[a + 2].indexOf("attribute") > 0) {
              level.push(-20);
              a = a + 1;
              extidx[a] = a;
            } else {
              if (parent === a - 1 && plural === false) {
                if (jsx) {
                  level.push(-20);
                } else {
                  level.push(lev);
                }
              } else {
                if (jsx) {
                  level.push(-20);
                } else {
                  level.push(lev + 1);
                }
              }
              if (data.lexer[a + 1] !== lexer2) {
                a = a + 1;
                external();
              }
            }
          } else if (type.idx(a, "end") > 0) {
            if (level[a - 1] !== -20)
              level[a - 1] = level[data.begin[a]] - 1;
            if (data.lexer[a + 1] !== lexer2) {
              level.push(-20);
            } else {
              level.push(lev);
            }
          } else {
            level.push(lev);
          }
        } else if (type.is(a, "attribute")) {
          len = len + data.token[a].length + 1;
          if (rules.preserveAttributes === true) {
            level.push(-10);
          } else if (rules.forceAttribute === true || rules.forceAttribute >= 1 || attrstart === true || a < c - 1 && type.idx(a + 1, "attribute") > 0) {
            if (rules.forceAttribute === false && data.lines[a] === 1) {
              level.push(-10);
            } else {
              if (rules.forceAttribute === true) {
                level.push(lev);
              } else {
                level.push(-10);
              }
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
      if (type.idx(a, "template") < 0 && type.idx(a, "end") > 0 && type.idx(a, "attribute") > 0 && type.not(parent, "singleton") && level[a - 1] > 0 && plural === true) {
        level[a - 1] = level[a - 1] - 1;
      }
      if (level[a] !== -20) {
        if (jsx === true && type.idx(parent, "start") > -1 && type.is(a + 1, "script_start")) {
          level[a] = lev;
        } else {
          if (token.is(a, "/") && level[a - 1] !== 10) {
            level[a - 1] = -10;
          } else {
            level[a] = level[parent];
          }
        }
      }
      if (rules.forceAttribute === true) {
        count = 0;
        level[parent] = lev;
      } else if (rules.forceAttribute >= 1) {
        if (attcount >= rules.forceAttribute) {
          level[parent] = lev;
          let fa = a - 1;
          do {
            if (type.is(fa, "template") && level[fa] === -10) {
              level[fa] = lev;
            } else if (type.is(fa, "attribute") && level[fa] === -10) {
              level[fa] = lev;
            }
            fa = fa - 1;
          } while (fa > parent);
        } else {
          level[parent] = -10;
        }
      } else {
        level[parent] = -10;
      }
      if (rules.preserveAttributes === true || token.is(parent, "<%xml%>") || token.is(parent, "<?xml?>")) {
        count = 0;
        return;
      }
      w = a;
      if (w > parent + 1) {
        if (rules.selfCloseSpace === false)
          len = len - 1;
        if (len > options2.wrap && options2.wrap > 0 && rules.forceAttribute === false) {
          if (rules.forceLeadAttribute === true) {
            level[parent] = lev;
            w = w - 1;
          }
          count = data.token[a].length;
          do {
            if (data.token[w].length > options2.wrap && ws(data.token[w]))
              attributeWrap(w);
            if (type.idx(w, "template") > -1 && level[w] === -10) {
              level[w] = lev;
            } else if (type.is(w, "attribute") && level[w] === -10) {
              level[w] = lev;
            }
            w = w - 1;
          } while (w > parent);
        }
      } else if (options2.wrap > 0 && type.is(a, "attribute") && data.token[a].length > options2.wrap && ws(data.token[a])) {
        attributeWrap(a);
      }
    }
    function linebreaks() {
      const token2 = data.token[a].split(NWL);
      const trims = is(data.token[a][2], 45 /* DSH */);
      let offset = 0;
      let idx = 0;
      let nls = 0;
      let tok = NIL;
      let chr = NIL;
      if (level.length >= 2) {
        offset = level[level.length - 2] + 1;
      } else if (level.length === 1) {
        offset = level[level.length - 1] + 1;
      }
      let ind = trims ? repeatChar(offset * options2.indentSize) : repeatChar(offset * options2.indentSize - 1);
      do {
        if (idx === 0) {
          tok = token2[idx].trimEnd();
          if (tok.endsWith(",")) {
            chr = "," + WSP;
            token2[idx] = tok.slice(0, -1);
          } else if (tok.endsWith("|")) {
            chr = "|" + WSP;
            token2[idx] = tok.slice(0, -1);
          } else if (/^{[{%]-?$/.test(tok)) {
            token2[idx] = tok;
            idx = idx + 1;
            do {
              tok = token2[idx].trim();
              if (tok.length > 0)
                break;
              token2.splice(idx, 1);
              if (idx > token2.length)
                break;
            } while (idx < token2.length);
            const close = token2[token2.length - 1].trim();
            if (/^-?[%}]}$/.test(close)) {
              nls = 1;
              if (trims) {
                token2[idx] = ind + tok;
                token2[token2.length - 1] = ind.slice(2) + close;
                ind = ind.slice(2) + repeatChar(options2.indentSize);
              } else {
                token2[idx] = ind + repeatChar(options2.indentSize) + tok;
                token2[token2.length - 1] = ind.slice(1) + close;
                ind = ind + repeatChar(options2.indentSize);
              }
            } else {
              token2[idx] = ind + repeatChar(options2.indentSize) + tok;
            }
          } else if (tok.endsWith(",") === false && is(token2[idx + 1].trimStart(), 44 /* COM */) && liquid.lineBreakSeparator === "after") {
            token2[idx] = tok + ",";
          }
          idx = idx + 1;
          continue;
        }
        tok = token2[idx].trim();
        if (is(tok, 44 /* COM */) && liquid.lineBreakSeparator === "after") {
          if (tok.endsWith("%}")) {
            tok = WSP + tok.slice(1);
          } else {
            tok = WSP + tok.slice(1) + ",";
          }
        }
        if (tok.length === 0) {
          token2.splice(idx, 1);
          continue;
        }
        if (idx === token2.length - 1 && nls === 1)
          break;
        if (tok.endsWith(",") && liquid.lineBreakSeparator === "before") {
          token2[idx] = ind + chr + tok.slice(0, -1);
          chr = "," + WSP;
        } else if (tok.endsWith("|")) {
          token2[idx] = ind + chr + tok.slice(0, -1);
          chr = ind + "|" + WSP;
        } else {
          token2[idx] = ind + chr + tok;
          chr = NIL;
        }
        idx = idx + 1;
      } while (idx < token2.length);
      if (liquid.normalizeSpacing === true) {
        data.token[a] = token2.join(NWL).replace(/\s*-?[%}]}$/, (m) => m.replace(/\s*/, WSP));
      } else {
        const space = repeatChar(data.lines[a] - 1 === -1 ? options2.indentSize : data.lines[a] - 1);
        data.token[a] = token2.join(NWL).replace(/\s*-?[%}]}$/, (m) => m.replace(StripEnd, space));
      }
    }
    function isLineBreak(idx) {
      return type.is(idx, "template") && data.token[idx].indexOf(lf) > 0 && /{%-?\s*\bliquid/.test(data.token[idx]) === false;
    }
    do {
      if (data.lexer[a] === lexer2) {
        if (type.is(a, "doctype"))
          level[a - 1] = indent;
        if (type.idx(a, "attribute") > -1) {
          if (parse.attributes.has(data.begin[a]) && force !== true) {
            rules.forceAttribute = true;
          } else if (force !== rules.forceAttribute) {
            rules.forceAttribute = force;
          }
          attribute();
        } else if (type.is(a, "comment")) {
          if (comstart < 0)
            comstart = a;
          if (type.not(a + 1, "comment") || a > 0 && type.idx(a - 1, "end") > -1) {
            comment2();
          }
        } else if (type.not(a, "comment")) {
          next = forward();
          if (type.is(next, "end") || type.is(next, "template_end")) {
            if (parse.attributes.has(data.begin[a]) || data.types[data.begin[a - 1]] === "singleton" && data.types[a - 1] === "attribute") ;
            indent = indent - 1;
            if (type.is(next, "template_end") && type.is(data.begin[next] + 1, "template_else")) {
              indent = indent - 1;
            }
            if (token.is(a, "</ol>") || token.is(a, "</ul>") || token.is(a, "</dl>"))
              anchorlist();
          }
          if (type.is(a, "script_end") && type.is(next, "end")) {
            if (data.lines[next] < 1) {
              level.push(-20);
            } else if (data.lines[next] > 1) {
              level.push(indent);
            } else {
              level.push(-10);
            }
          } else if ((rules.forceIndent === false || rules.forceIndent === true && type.is(next, "script_start")) && (type.is(a, "content") || type.is(a, "singleton") || type.is(a, "template"))) {
            count = count + data.token[a].length;
            if (data.lines[next] > 0 && type.is(next, "script_start")) {
              level.push(-10);
            } else if (options2.wrap > 0 && (type.idx(a, "template") < 0 || next < c && type.idx(a, "template") > -1 && type.idx(next, "template") < 0)) {
              content();
            } else if (next < c && (type.idx(next, "end") > -1 || type.idx(next, "start") > -1) && (data.lines[next] > 0 || type.idx(a, "template_") > -1)) {
              level.push(indent);
              if (isLineBreak(a))
                linebreaks();
            } else if (data.lines[next] === 0) {
              level.push(-20);
              if (isLineBreak(a))
                linebreaks();
            } else if (data.lines[next] === 1) {
              level.push(-10);
            } else {
              level.push(indent);
              if (isLineBreak(a))
                linebreaks();
            }
          } else if (type.is(a, "start") || type.is(a, "template_start")) {
            indent = indent + 1;
            if (type.is(a, "template_start") && type.is(next, "template_else")) {
              indent = indent + 1;
            }
            if (jsx === true && token.is(a + 1, "{")) {
              if (data.lines[next] === 0) {
                level.push(-20);
              } else if (data.lines[next] > 1) {
                level.push(indent);
              } else {
                level.push(-10);
              }
            } else if (type.is(a, "start") && type.is(next, "end") || type.is(a, "template_start") && type.is(next, "template_end")) {
              level.push(-20);
            } else if (type.is(a, "start") && type.is(next, "script_start")) {
              level.push(-10);
            } else if (rules.forceIndent === true) {
              level.push(indent);
            } else if (data.lines[next] === 0 && (type.is(next, "content") || type.is(next, "singleton") || type.is(a, "start") && type.is(next, "template"))) {
              level.push(-20);
            } else {
              level.push(indent);
            }
          } else if (rules.forceIndent === false && data.lines[next] === 0 && (type.is(next, "content") || type.is(next, "singleton"))) {
            level.push(-20);
          } else if (type.is(a + 2, "script_end")) {
            level.push(-20);
          } else if (type.is(a, "template_else")) {
            level[a - 1] = indent - 1;
            if (type.is(next, "template_end")) {
              level[a - 1] = indent - 1;
            }
            level.push(indent);
          } else if (rules.forceIndent === true && (type.is(a, "content") && (type.is(next, "template") || type.is(next, "content")) || type.is(a, "template") && (type.is(next, "content") || type.is(next, "template")))) {
            if (data.lines[next] < 1) {
              level.push(-20);
            } else if (data.lines[next] > 1) {
              level.push(indent);
            } else {
              level.push(-10);
            }
          } else {
            level.push(indent);
          }
        }
        if (type.not(a, "content") && type.not(a, "singleton") && type.not(a, "template") && type.not(a, "attribute")) {
          count = 0;
        }
      } else {
        count = 0;
        external();
      }
      a = a + 1;
    } while (a < c);
    return level;
  }();
  return function() {
    const build = [];
    const ind = function() {
      const indy = [options2.indentChar];
      const size2 = options2.indentSize - 1;
      let aa = 0;
      if (aa < size2) {
        do {
          indy.push(options2.indentChar);
          aa = aa + 1;
        } while (aa < size2);
      }
      return indy.join(NIL);
    }();
    function newline(tabs) {
      const linesout = [];
      const pres = options2.preserveLine + 1;
      const total = Math.min(data.lines[a + 1] - 1, pres);
      let index = 0;
      if (tabs < 0)
        tabs = 0;
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
      return linesout.join(NIL);
    }
    function multiline() {
      let lines = data.token[a].split(lf);
      const line = data.lines[a + 1];
      if (type.is(a, "comment") && (is(data.token[a][1], 37 /* PER */) && liquid.preserveComment === false || is(data.token[a][1], 37 /* PER */) === false && rules.preserveComment === false)) {
        lines = lines.map((l) => l.trimStart());
      }
      const lev = levels[a - 1] > -1 ? type.is(a, "attribute") ? levels[a - 1] + 1 : levels[a - 1] : (() => {
        let bb = a - 1;
        let start = bb > -1 && type.idx(bb, "start") > -1;
        if (levels[a] > -1 && type.is(a, "attribute"))
          return levels[a] + 1;
        do {
          bb = bb - 1;
          if (levels[bb] > -1)
            return type.is(a, "content") && start === false ? levels[bb] : levels[bb] + 1;
          if (type.idx(bb, "start") > -1)
            start = true;
        } while (bb > 0);
        return bb === -2 ? 0 : 1;
      })();
      let aa = 0;
      data.lines[a + 1] = 0;
      const len = lines.length - 1;
      do {
        if (type.is(a, "comment")) {
          if (aa === 0 && (is(data.token[a][1], 37 /* PER */) && liquid.commentNewline === true || is(data.token[a][1], 37 /* PER */) === false && rules.commentNewline === true)) {
            if (options2.preserveLine === 0) {
              build.push(newline(lev));
            } else {
              if (build.length > 0 && build[build.length - 1].lastIndexOf(NWL) + 1 < 2) {
                build.push(newline(lev));
              }
            }
          }
          if (lines[aa] !== NIL) {
            if (aa > 0 && (is(data.token[a][1], 37 /* PER */) && liquid.commentIndent === true || is(data.token[a][1], 37 /* PER */) === false && rules.commentIndent === true)) {
              build.push(ind);
            }
            if (lines[aa + 1].trimStart() !== NIL) {
              build.push(lines[aa], newline(lev));
            } else {
              build.push(lines[aa], NWL);
            }
          } else {
            if (lines[aa + 1].trimStart() === NIL) {
              build.push(NWL);
            } else {
              build.push(newline(lev));
            }
          }
        } else {
          build.push(lines[aa]);
          build.push(newline(lev));
        }
        aa = aa + 1;
      } while (aa < len);
      data.lines[a + 1] = line;
      build.push(lines[len]);
      if (type.is(a, "comment") && (type.is(a + 1, "template_end") || type.is(a - 1, "template_end"))) {
        build.push(newline(levels[a]));
      } else if (levels[a] === -10) {
        build.push(WSP);
      } else if (levels[a] > 1) {
        build.push(newline(levels[a]));
      } else if (levels[a] === 0 && a === 0 && type.is(a, "comment")) {
        build.push(newline(levels[a]));
      } else if (type.is(a, "comment") && levels[a] === 0 && (type.is(a + 1, "template_start") || type.is(a + 1, "ignore"))) {
        build.push(newline(levels[a]));
      }
    }
    function endattr() {
      const regend = /(?!=)\/?>$/;
      const parent = data.token[a];
      const end = regend.exec(parent);
      if (end === null)
        return;
      let y = a + 1;
      let isjsx = false;
      let space = rules.selfCloseSpace === true && end !== null && end[0] === "/>" ? WSP : NIL;
      data.token[a] = parent.replace(regend, NIL);
      do {
        if (type.is(y, "jsx_attribute_end") && data.begin[data.begin[y]] === a) {
          isjsx = false;
        } else if (data.begin[y] === a) {
          if (type.is(y, "jsx_attribute_start")) {
            isjsx = true;
          } else if (type.idx(y, "attribute") < 0 && isjsx === false) {
            break;
          }
        } else if (isjsx === false && (data.begin[y] < a || type.idx(y, "attribute") < 0)) {
          break;
        }
        y = y + 1;
      } while (y < c);
      if (type.is(y - 1, "comment_attribute"))
        space = newline(levels[y - 2] - 1);
      if (!parse.attributes.has(a)) {
        data.token[y - 1] = `${data.token[y - 1]}${space}${end[0]}`;
      }
      if (type.is(y, "comment") && data.lines[a + 1] < 2)
        levels[a] = -10;
    }
    a = prettify.start;
    let lastLevel = options2.indentLevel;
    do {
      if (data.lexer[a] === lexer2) {
        if ((type.is(a, "start") || type.is(a, "singleton") || type.is(a, "xml")) && type.idx(a, "attribute") < 0 && a < c - 1 && data.types[a + 1] !== void 0 && type.idx(a + 1, "attribute") > -1) {
          endattr();
        }
        if (token.not(a, void 0) && data.token[a].indexOf(lf) > 0 && (type.is(a, "content") && rules.preserveText === false || type.is(a, "comment") || type.is(a, "attribute"))) {
          multiline();
        } else if (type.is(a, "comment") && (is(data.token[a][1], 37 /* PER */) && liquid.preserveComment === false && liquid.commentNewline === true || is(data.token[a][1], 37 /* PER */) === false && rules.preserveComment === false && rules.commentNewline === true) && (options2.preserveLine === 0 || build.length > 0 && build[build.length - 1].lastIndexOf(NWL) + 1 < 2)) {
          build.push(
            newline(levels[a]),
            data.token[a],
            newline(levels[a])
          );
        } else {
          build.push(data.token[a]);
          if (levels[a] === -10 && a < c - 1) {
            build.push(WSP);
          } else if (levels[a] > -1) {
            lastLevel = levels[a];
            build.push(newline(levels[a]));
          }
        }
      } else {
        prettify.start = a;
        prettify.end = extidx[a];
        const external = parse.beautify(lastLevel);
        const embedded = external.beautify.replace(StripEnd, NIL);
        if (options2.language === "jsx" && (data.types[a - 1] === "template_string_end" || data.types[a - 1] === "jsx_attribute_start" || data.types[a - 1] === "script_start")) {
          build.push(embedded.trimEnd());
        } else {
          build.push(embedded);
          if (embedded.endsWith(NWL)) {
            if (lastLevel - 1 > 0)
              build.push(repeatChar(lastLevel - 1, ind));
          } else {
            if (rules.forceIndent === true || levels[prettify.iterator] > -1 && extidx[a] > a) {
              build.push(newline(levels[prettify.iterator]));
            }
          }
        }
        a = prettify.iterator;
        external.reset();
      }
      a = a + 1;
    } while (a < c);
    prettify.iterator = c - 1;
    if (build[0] === lf || is(build[0], 32 /* WSP */))
      build[0] = NIL;
    return build.join(NIL);
  }();
};

// src/beautify/style.ts
prettify.beautify.style = function style2(options2) {
  const build = [];
  const data = prettify.data;
  const rules = options2.style;
  const lf = options2.crlf === true ? "\r\n" : "\n";
  const len = prettify.end > 0 ? prettify.end + 1 : data.token.length;
  const pres = options2.preserveLine + 1;
  const tab = (() => {
    let aa = 0;
    const bb = [];
    do {
      bb.push(options2.indentChar);
      aa = aa + 1;
    } while (aa < options2.indentSize);
    return bb.join(NIL);
  })();
  let indent = options2.indentLevel;
  let a = prettify.start;
  let when = [NIL, NIL];
  const type = {
    is: (index, name) => data.types[index] === name,
    not: (index, name) => data.types[index] !== name,
    idx: (index, name) => index > -1 && (data.types[index] || NIL).indexOf(name)
  };
  function newline(tabs) {
    const linesout = [];
    const total = (() => {
      if (a === len - 1)
        return 1;
      if (data.lines[a + 1] - 1 > pres)
        return pres;
      if (data.lines[a + 1] > 1)
        return data.lines[a + 1] - 1;
      return 1;
    })();
    let index = 0;
    if (tabs < 0)
      tabs = 0;
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
    build.push(linesout.join(NIL));
  }
  do {
    if (type.is(a + 1, "end") || type.is(a + 1, "template_end") || type.is(a + 1, "template_else")) {
      indent = indent - 1;
    }
    if (type.is(a, "template") && data.lines[a] > 0) {
      build.push(data.token[a]);
      if (not(data.token[a + 1], 59 /* SEM */) && grammar.style.units.has(data.token[a + 1]) === false) {
        newline(indent);
      }
    } else if (type.is(a - 1, "selector") && type.is(a, "template") && type.is(a + 1, "selector")) {
      build.push(data.token[a]);
      if (is.last(data.token[a - 1], 45 /* DSH */) && (is(data.token[a + 1], 46 /* DOT */) || is(data.token[a + 1], 35 /* HSH */) || is(data.token[a + 1], 38 /* AND */))) {
        build.push(WSP);
      }
    } else if (type.is(a, "template_else")) {
      build.push(data.token[a]);
      indent = indent + 1;
      newline(indent);
    } else if (type.is(a, "start") || type.is(a, "template_start")) {
      indent = indent + 1;
      build.push(data.token[a]);
      if (type.not(a + 1, "end") && type.not(a + 1, "template_end")) {
        newline(indent);
      }
    } else if (is(data.token[a], 59 /* SEM */) || (type.is(a, "end") || type.is(a, "template_end") || type.is(a, "comment"))) {
      build.push(data.token[a]);
      if (type.is(a + 1, "value")) {
        if (data.lines[a + 1] === 1) {
          build.push(WSP);
        } else if (data.lines[a + 1] > 1) {
          newline(indent);
        }
      } else if (type.not(a + 1, "separator")) {
        if (type.not(a + 1, "comment") || type.is(a + 1, "comment") && data.lines[a + 1] > 1) {
          newline(indent);
        } else {
          build.push(WSP);
        }
      }
    } else if (is(data.token[a], 58 /* COL */)) {
      build.push(data.token[a]);
      if (type.not(a + 1, "selector") && not(data.token[a + 1], 44 /* COM */)) {
        build.push(WSP);
      }
    } else if (type.is(a, "selector") || type.is(a, "at_rule")) {
      if (rules.classPadding === true && type.is(a - 1, "end") && data.lines[a] < 3) {
        build.push(lf);
      }
      if (data.token[a].indexOf("and(") > 0) {
        data.token[a] = data.token[a].replace(/and\(/, "and (");
        build.push(data.token[a]);
      } else if (data.token[a].indexOf("when(") > 0) {
        when = data.token[a].split("when(");
        build.push(when[0].replace(/\s+$/, NIL));
        newline(indent + 1);
        build.push(`when (${when[1]}`);
      } else {
        build.push(data.token[a]);
      }
      if (type.is(a + 1, "start")) {
        build.push(WSP);
      }
    } else if (is(data.token[a], 44 /* COM */)) {
      if (type.is(a + 1, "value")) {
        newline(indent);
        build.push(data.token[a]);
      } else {
        build.push(data.token[a]);
      }
      if (type.is(a + 1, "selector") || type.is(a + 1, "property")) {
        newline(indent);
      } else {
        build.push(WSP);
      }
    } else if (data.stack[a] === "map" && is(data.token[a + 1], 41 /* RPR */) && a - data.begin[a] > 5) {
      build.push(data.token[a]);
      newline(indent);
    } else if (data.token[a] === "x;") {
      newline(indent);
    } else if ((type.is(a, "variable") || type.is(a, "function")) && rules.classPadding === true && type.is(a - 1, "end") && data.lines[a] < 3) {
      build.push(lf);
      build.push(data.token[a]);
    } else if (not(data.token[a], 59 /* SEM */)) {
      build.push(data.token[a]);
    }
    a = a + 1;
  } while (a < len);
  prettify.iterator = len - 1;
  return build.join(NIL);
};

// src/beautify/script.ts
prettify.beautify.script = (options2) => {
  const apiword = /* @__PURE__ */ new Set([
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
  ]);
  const externalIndex = {};
  const data = prettify.data;
  const lexer2 = "script";
  const scopes = prettify.scopes;
  const b = prettify.end < 1 || prettify.end > data.token.length ? data.token.length : prettify.end + 1;
  const levels = (() => {
    let a = prettify.start;
    let indent = isNaN(options2.indentLevel) ? 0 : Number(options2.indentLevel);
    let notcomment = false;
    let lastlist = false;
    let ctype = "";
    let ctoke = "";
    let ltype = data.types[0];
    let ltoke = data.token[0];
    const varindex = [-1];
    const list = [];
    const level = prettify.start > 0 ? Array(prettify.start).fill(0, 0, prettify.start) : [];
    const ternary = [];
    const extraindent = [[]];
    const arrbreak = [];
    const destruct = [];
    const itemcount = [];
    const assignlist = [false];
    const wordlist = [];
    const count = [];
    function comment2() {
      destructfix(false, false);
      const ind = options2.script.commentIndent === true ? indent : 0;
      if (notcomment === false && /\/\u002a\s*global\s/.test(data.token[a])) {
        const globallist = data.token[a].replace(/\/\u002a\s*global\s+/, "").replace(/\s*\u002a\/$/, "").split(",");
        let aa = globallist.length;
        do {
          aa = aa - 1;
          globallist[aa] = globallist[aa].replace(/\s+/g, "");
          if (globallist[aa] !== "")
            scopes.push([globallist[aa], -1]);
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
          if (options2.script.commentIndent === true && level[a] > -1 && data.lines[a] < 3) {
            data.lines[a] = 3;
          }
        }
        if (data.types[a + 1] !== "comment")
          notcomment = true;
        return;
      } else if (data.token[a - 1] === ",") {
        level[a - 1] = ind;
      } else if (ltoke === "=" && data.types[a - 1] !== "comment" && /^(\/\*\*\s*@[a-z_]+\s)/.test(ctoke) === true) {
        level[a - 1] = -10;
      } else if (ltoke === "{" && data.types[a - 1] !== "comment" && data.lines[0] < 2) {
        if (data.stack[a] === "function") {
          level[a - 1] = ind;
        } else {
          level[a - 1] = /\n/.test(ctoke) ? ind : -10;
        }
      } else {
        level[a - 1] = ind;
      }
      if (data.types[a + 1] !== "comment")
        notcomment = true;
      if (data.token[data.begin[a]] === "(") {
        level.push(indent + 1);
      } else {
        level.push(indent);
      }
      if (level[a] > -1 && data.lines[a] < 3) {
        if (data.types[a - 1] === "comment" && ctoke.startsWith("//")) {
          data.lines[a] = 2;
        } else {
          data.lines[a] = 3;
        }
      }
      if (options2.script.commentNewline === true && ctoke.startsWith("//") === false && data.lines[a] >= 3) {
        data.lines[a] = 2;
      }
    }
    function destructfix(listFix, override) {
      let c = a - 1;
      let d = listFix === true ? 0 : 1;
      const ei = extraindent[extraindent.length - 1] === void 0 ? [] : extraindent[extraindent.length - 1];
      const arrayCheck = override === false && data.stack[a] === "array" && listFix === true && ctoke !== "[";
      if (destruct[destruct.length - 1] === false || data.stack[a] === "array" && options2.script.arrayFormat === "inline" || data.stack[a] === "object" && options2.script.objectIndent === "inline") {
        return;
      }
      destruct[destruct.length - 1] = false;
      do {
        if (data.types[c] === "end") {
          d = d + 1;
        } else if (data.types[c] === "start") {
          d = d - 1;
        }
        if (data.stack[c] === "global")
          break;
        if (d === 0) {
          if (data.stack[a] === "class" || data.stack[a] === "map" || arrayCheck === false && (listFix === false && data.token[c] !== "(" && data.token[c] !== "x(" || listFix === true && data.token[c] === ",")) {
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
            if (data.token[c] === ",")
              level[c] = indent;
            if (c === data.begin[a])
              break;
          }
          if (listFix === false)
            break;
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
    }
    function end() {
      const ei = extraindent[extraindent.length - 1] === void 0 ? [] : extraindent[extraindent.length - 1];
      const markuplist = () => {
        let aa = a;
        let markup2 = false;
        const begin = data.begin[aa];
        do {
          aa = aa - 1;
          if (data.lexer[aa] === "markup") {
            markup2 = true;
            break;
          }
          if (data.begin[aa] !== begin)
            aa = data.begin[aa];
        } while (aa > begin);
        if (markup2 === true) {
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
        let c = data.begin[a];
        let d = false;
        let e = false;
        do {
          c = c - 1;
        } while (c > 0 && level[c] < -9);
        d = level[c] === indent;
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
      if (ltype !== "separator")
        fixchain();
      if (data.token[a + 1] === "," && (data.stack[a] === "object" || data.stack[a] === "array")) {
        destructfix(true, false);
      }
      if (data.token[data.begin[a] - 1] === "," && (data.token[a + 1] === "}" || data.token[a + 1] === "]") && (data.stack[a] === "object" || data.stack[a] === "array")) {
        destructfix(true, false);
      }
      if (data.stack[a] !== "attribute") {
        if (ctoke !== ")" && ctoke !== "x)" && (data.lexer[a - 1] !== "markup" || data.lexer[a - 1] === "markup" && data.token[a - 2] !== "return")) {
          indent = indent - 1;
        }
        if (ctoke === "}" && data.stack[a] === "switch" && options2.script.noCaseIndent === false) {
          indent = indent - 1;
        }
      }
      if (ctoke === "}" || ctoke === "x}") {
        if (data.types[a - 1] !== "comment" && ltoke !== "{" && ltoke !== "x{" && ltype !== "end" && ltype !== "string" && ltype !== "number" && ltype !== "separator" && ltoke !== "++" && ltoke !== "--" && (a < 2 || data.token[a - 2] !== ";" || data.token[a - 2] !== "x;" || ltoke === "break" || ltoke === "return")) {
          let c = a - 1;
          let assign2 = false;
          const begin = data.begin[a];
          const listlen = list.length;
          do {
            if (data.begin[c] === begin) {
              if (data.token[c] === "=" || data.token[c] === ";" || data.token[c] === "x;") {
                assign2 = true;
              }
              if (data.token[c] === "." && level[c - 1] > -1) {
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
              if (data.token[c] === ":" && ternary.length === 0 || data.token[c] === "," && assign2 === false) {
                break;
              }
              if (c === 0 || data.token[c - 1] === "{" || data.token[c - 1] === "x{" || data.token[c] === "for" || data.token[c] === "if" || data.token[c] === "do" || data.token[c] === "function" || data.token[c] === "while" || data.token[c] === "var" || data.token[c] === "let" || data.token[c] === "const" || data.token[c] === "with") {
                if (list[listlen - 1] === false && listlen > 1 && (a === b - 1 || data.token[a + 1] !== ")" && data.token[a + 1] !== "x)") && data.stack[a] !== "object") {
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
      if (options2.script.bracePadding === false && ctoke !== "}" && ltype !== "markup") {
        level[a - 1] = -20;
      }
      if (options2.script.bracePadding === true && ltype !== "start" && ltoke !== ";" && (level[data.begin[a]] < -9 || destruct[destruct.length - 1] === true)) {
        level[data.begin[a]] = -10;
        level[a - 1] = -10;
        level.push(-20);
      } else if (data.stack[a] === "attribute") {
        level[a - 1] = -20;
        level.push(indent);
      } else if (data.stack[a] === "array" && (ei.length > 0 || arrbreak[arrbreak.length - 1] === true)) {
        endExtraInd();
        destruct[destruct.length - 1] = false;
        level[data.begin[a]] = indent + 1;
        level[a - 1] = indent;
        level.push(-20);
      } else if ((data.stack[a] === "object" || data.begin[a] === 0 && ctoke === "}") && ei.length > 0) {
        endExtraInd();
        destruct[destruct.length - 1] = false;
        level[data.begin[a]] = indent + 1;
        level[a - 1] = indent;
        level.push(-20);
      } else if (ctoke === ")" || ctoke === "x)") {
        const countx = ctoke === ")" && ltoke !== "(" && count.length > 0 ? count.pop() + 1 : 0;
        const countif = data.token[data.begin[a] - 1] === "if" ? (() => {
          let bb = a;
          do {
            bb = bb - 1;
            if (data.token[bb] === ")" && level[bb - 1] > -1)
              return countx;
          } while (bb > data.begin[a]);
          return countx + 5;
        })() : countx;
        if (countx > 0 && (options2.language !== "jsx" || options2.language === "jsx" && data.token[data.begin[a] - 1] !== "render")) {
          const wrap = options2.wrap;
          const begin = data.begin[a];
          const len = count.length;
          let aa = a - 2;
          if (countif > wrap) {
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
        } else if (ctoke === ")" && a > data.begin[a] + 2 && data.lexer[data.begin[a] + 1] === lexer2 && data.token[data.begin[a] + 1] !== "function") {
          const open = data.begin[a] < 0 ? 0 : data.begin[a];
          const wrap = options2.wrap;
          const exl = ei.length;
          let len = 0;
          let aa = 0;
          let short = 0;
          let first = 0;
          let inc = 0;
          let comma = false;
          let array = false;
          let ind = indent + 1;
          let ready = false;
          let mark = false;
          let tern = false;
          if (level[open] < -9) {
            aa = open;
            do {
              aa = aa + 1;
            } while (aa < a && level[aa] < -9);
            first = aa;
            do {
              len = len + data.token[aa].length;
              if (level[aa] === -10)
                len = len + 1;
              if (data.token[aa] === "(" && short > 0 && short < wrap - 1 && first === a) {
                short = -1;
              }
              if (data.token[aa] === ")") {
                inc = inc - 1;
              } else if (data.token[aa] === "(") {
                inc = inc + 1;
              }
              if (aa === open && inc > 0)
                short = len;
              aa = aa - 1;
            } while (aa > open && level[aa] < -9);
            if (data.token[aa + 1] === ".")
              ind = level[aa] + 1;
            if (len > wrap - 1 && wrap > 0 && ltoke !== "(" && short !== -1 && destruct[destruct.length - 2] === false) {
              if (data.token[open - 1] === "if" && list[list.length - 1] === true || data.token[open - 1] !== "if") {
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
                if (len >= wrap && wrap > 0)
                  ready = true;
              } else if (data.types[aa] === "markup" && mark === false) {
                mark = true;
              }
              if (level[aa] > -9 && data.token[aa] !== "," && data.types[aa] !== "markup") {
                len = 0;
              } else {
                if (level[aa] === -10)
                  len = len + 1;
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
          } else if ((comma === true || mark === true) && len >= wrap && wrap > 0 || level[open] > -9) {
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
        } else if (options2.language === "jsx") {
          markuplist();
        } else {
          level[a - 1] = -20;
        }
        level.push(-20);
      } else if (destruct[destruct.length - 1] === true) {
        if (ctoke === "]" && data.begin[a] - 1 > 0 && data.token[data.begin[data.begin[a] - 1]] === "[") {
          destruct[destruct.length - 2] = false;
        }
        if (data.begin[a] < level.length)
          level[data.begin[a]] = -20;
        if (options2.language === "jsx") {
          markuplist();
        } else if (ctoke === "]" && level[data.begin[a]] > -1) {
          level[a - 1] = level[data.begin[a]] - 1;
        } else {
          level[a - 1] = -20;
        }
        level.push(-20);
      } else if (data.types[a - 1] === "comment" && data.token[a - 1].substring(0, 2) === "//") {
        if (data.token[a - 2] === "x}")
          level[a - 3] = indent + 1;
        level[a - 1] = indent;
        level.push(-20);
      } else if (data.types[a - 1] !== "comment" && (ltoke === "{" && ctoke === "}" || ltoke === "[" && ctoke === "]")) {
        level[a - 1] = -20;
        level.push(-20);
      } else if (ctoke === "]") {
        if (list[list.length - 1] === true && destruct[destruct.length - 1] === false && options2.script.arrayFormat !== "inline" || ltoke === "]" && level[a - 2] === indent + 1) {
          level[a - 1] = indent;
          level[data.begin[a]] = indent + 1;
        } else if (level[a - 1] === -10) {
          level[a - 1] = -20;
        }
        if (data.token[data.begin[a] + 1] === "function") {
          level[a - 1] = indent;
        } else if (list[list.length - 1] === false) {
          if (ltoke === "}" || ltoke === "x}")
            level[a - 1] = indent;
          let c = a - 1;
          let d = 1;
          do {
            if (data.token[c] === "]")
              d = d + 1;
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
        } else if (options2.language === "jsx") {
          markuplist();
        }
        if (options2.script.arrayFormat === "inline") {
          let c = a;
          const begin = data.begin[a];
          do {
            c = c - 1;
            if (data.types[c] === "end")
              break;
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
      if (data.types[a - 1] === "comment")
        level[a - 1] = indent;
      endExtraInd();
      lastlist = list[list.length - 1];
      list.pop();
      extraindent.pop();
      arrbreak.pop();
      itemcount.pop();
      wordlist.pop();
      destruct.pop();
      assignlist.pop();
    }
    function endExtraInd() {
      let c = 0;
      const ei = extraindent[extraindent.length - 1];
      if (ei === void 0)
        return;
      c = ei.length - 1;
      if (c < 1 && ei[c] < 0 && (ctoke === ";" || ctoke === "x;" || ctoke === ")" || ctoke === "x)" || ctoke === "}" || ctoke === "x}")) {
        ei.pop();
        return;
      }
      if (c < 0 || ei[c] < 0)
        return;
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
      if ((data.stack[a] === "array" || ctoke === ",") && ei.length < 1)
        ei.push(-1);
    }
    function external() {
      const skip = a;
      do {
        if (data.lexer[a + 1] === lexer2 && data.begin[a + 1] < skip)
          break;
        if (data.token[skip - 1] === "return" && data.types[a] === "end" && data.begin[a] === skip)
          break;
        level.push(0);
        a = a + 1;
      } while (a < b);
      externalIndex[skip] = a;
      level.push(indent - 1);
    }
    function fixchain() {
      let bb = a - 1;
      const cc2 = data.begin[a];
      if (indent < 1)
        return;
      do {
        if (cc2 !== data.begin[bb]) {
          bb = data.begin[bb];
        } else {
          if (data.types[bb] === "separator" || data.types[bb] === "operator") {
            if (data.token[bb] === "." && level[bb - 1] > 0) {
              if (data.token[cc2 - 1] === "if") {
                indent = indent - 2;
              } else {
                indent = indent - 1;
              }
            }
            break;
          }
        }
        bb = bb - 1;
      } while (bb > 0 && bb > cc2);
    }
    function markup() {
      if (data.token[a + 1] !== "," && ctoke.indexOf("/>") !== ctoke.length - 2 || data.token[a + 1] === "," && data.token[data.begin[a] - 3] !== "React") {
        destructfix(false, false);
      }
      if (ltoke === "return" || ltoke === "?" || ltoke === ":") {
        level[a - 1] = -10;
        level.push(-20);
      } else if (ltype === "start" || data.token[a - 2] === "return" && data.stack[a - 1] === "method") {
        level.push(indent);
      } else {
        level.push(-20);
      }
    }
    function operator() {
      const ei = extraindent[extraindent.length - 1] === void 0 ? [] : extraindent[extraindent.length - 1];
      function opWrap() {
        const aa = data.token[a + 1];
        let line = 0;
        let next = 0;
        let c = a;
        let ind = ctoke === "+" ? indent + 2 : indent;
        let meth = 0;
        if (options2.wrap < 1) {
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
          if (line > options2.wrap - 1)
            break;
          if (level[c] > -9)
            break;
          if (data.types[c] === "operator" && data.token[c] !== "=" && data.token[c] !== "+" && data.begin[c] === data.begin[a]) {
            break;
          }
          line = line + data.token[c].length;
          if (c === data.begin[a] && data.token[c] === "[" && line < options2.wrap - 1) {
            break;
          }
          if (data.token[c] === "." && level[c] > -9)
            break;
          if (level[c] === -10)
            line = line + 1;
        } while (c > 0);
        if (meth > 0)
          meth = meth + aa.length;
        line = line + aa.length;
        next = c;
        if (line > options2.wrap - 1 && level[c] < -9) {
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
        if (line + next < options2.wrap) {
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
          line = line - options2.indentSize * options2.indentChar.length * 2;
        }
        if (meth > 0) {
          c = options2.wrap - meth;
        } else {
          c = options2.wrap - line;
        }
        if (c > 0 && c < 5) {
          level.push(ind);
          if (data.token[a].charAt(0) === '"' || data.token[a].charAt(0) === "'") {
            a = a + 1;
            level.push(-10);
          }
          return;
        }
        if (data.token[data.begin[a]] !== "(" || meth > options2.wrap - 1 || meth === 0) {
          if (meth > 0)
            line = meth;
          if (line - aa.length < options2.wrap - 1 && (aa.charAt(0) === '"' || aa.charAt(0) === "'")) {
            a = a + 1;
            line = line + 3;
            if (line - aa.length > options2.wrap - 4) {
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
      }
      fixchain();
      if (ei.length > 0 && ei[ei.length - 1] > -1 && data.stack[a] === "array") {
        arrbreak[arrbreak.length - 1] = true;
      }
      if (ctoke !== ":") {
        if (data.token[data.begin[a]] !== "(" && data.token[data.begin[a]] !== "x(" && destruct.length > 0) {
          destructfix(true, false);
        }
        if (ctoke !== "?" && data.token[ei[ei.length - 1]] === ".") {
          let e = 0;
          let c = a;
          const d = data.begin[c];
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
                if (data.token[ei[ei.length - 1]] === "." && e < 2)
                  ei[ei.length - 1] = d + 1;
                break;
              }
              if (data.token[c] === ".")
                e = e + 1;
            }
            c = c + 1;
          } while (c < b);
        }
      }
      if (ctoke === "!" || ctoke === "...") {
        if (ltoke === "}" || ltoke === "x}")
          level[a - 1] = indent;
        level.push(-20);
        return;
      }
      if (ltoke === ";" || ltoke === "x;") {
        if (data.token[data.begin[a] - 1] !== "for")
          level[a - 1] = indent;
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
          if (data.types[a + 1] === "word" || data.types[a + 1] === "reference" || (data.token[a + 1] === "(" || data.token[a + 1] === "x(") && data.token[a - 2] === "new") {
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
        if (options2.script.ternaryLine === true) {
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
              if (data.types[c] === "end" && level[c - 1] > -1)
                break;
              if (level[c] > -1)
                level[c] = level[c] + 1;
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
          let c = a;
          const d = data.begin[a];
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
                if (options2.script.ternaryLine === true)
                  level[a - 1] = -10;
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
        if (data.token[data.begin[a]] !== "(" && data.token[data.begin[a]] !== "x(" && (ltype === "reference" || ltoke === ")" || ltoke === "]" || ltoke === "?") && (data.stack[a] === "map" || data.stack[a] === "class" || data.types[a + 1] === "reference") && (ternary.length === 0 || ternary[ternary.length - 1] < data.begin[a]) && ("mapclassexpressionmethodglobalparen".indexOf(data.stack[a]) > -1 || data.types[a - 2] === "word" && data.stack[a] !== "switch")) {
          level[a - 1] = -20;
          level.push(-10);
          return;
        }
        if (data.stack[a] === "switch" && (ternary.length < 1 || ternary[ternary.length - 1] < data.begin[a])) {
          level[a - 1] = -20;
          if (options2.script.caseSpace === true) {
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
        if (options2.wrap < 1 || data.token[data.begin[a]] === "x(") {
          level.push(-10);
          return;
        }
        const aa = data.token[a + 1];
        if (aa === void 0) {
          level.push(-10);
          return;
        }
        if (data.types[a - 1] === "operator" || data.types[a - 1] === "start") {
          if (data.types[a + 1] === "reference" || aa === "(" || aa === "[") {
            level.push(-20);
            return;
          }
          if (Number(aa.slice(1, -1)) > -1 && (/\d/.test(aa.charAt(1)) === true || aa.charAt(1) === "." || aa.charAt(1) === "-" || aa.charAt(1) === "+")) {
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
        let c = a + 1;
        let d = 0;
        let e = false;
        let f = "";
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
          if (data.types[c] === "end")
            d = d - 1;
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
                if (f !== void 0 && (f === "?" || f.indexOf("=") > -1 && f !== "==" && f !== "===" && f !== "!=" && f !== "!==" && f !== ">=" && f !== "<=")) {
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
            if (f === ";" || f === "x;" || f === ",")
              e = true;
          }
          c = c + 1;
        } while (c < b);
        level.push(-10);
        return;
      }
      if (ctoke === "-" && ltoke === "return" || ltoke === "=") {
        level.push(-20);
        return;
      }
      if (ltype === "operator" && data.types[a + 1] === "reference" && ltoke !== "--" && ltoke !== "++" && ctoke !== "&&" && ctoke !== "||") {
        level.push(-20);
        return;
      }
      return opWrap();
    }
    function reference2() {
      const hoist = () => {
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
      if (ltoke === "var" && data.lexer[a - 1] === lexer2) {
        hoist();
      } else if (ltoke === "function") {
        scopes.push([data.token[a], a]);
      } else if (ltoke === "let" || ltoke === "const") {
        scopes.push([data.token[a], a]);
      } else if (data.stack[a] === "arguments") {
        scopes.push([data.token[a], a]);
      } else if (ltoke === ",") {
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
    }
    function separator() {
      const ei = extraindent[extraindent.length - 1] === void 0 ? [] : extraindent[extraindent.length - 1];
      const propertybreak = () => {
        if (options2.script.methodChain > 0) {
          let x = a;
          let y = data.begin[a];
          const z = [a];
          const ify = data.token[y - 1] === "if";
          do {
            x = x - 1;
            if (data.types[x] === "end")
              x = data.begin[x];
            if (data.begin[x] === y) {
              if (data.types[x] === "string" && data.token[x].indexOf("${") === data.token[x].length - 2) {
                break;
              }
              if (data.token[x] === ".") {
                if (level[x - 1] > 0) {
                  level[a - 1] = ify === true ? indent + 1 : indent;
                  return;
                }
                z.push(x);
              } else if (data.token[x] === ";" || data.token[x] === "," || data.types[x] === "operator" || (data.types[x] === "word" || data.types[x] === "reference") && (data.types[x - 1] === "word" || data.types[x - 1] === "reference")) {
                break;
              }
            }
          } while (x > y);
          if (z.length < options2.script.methodChain) {
            level[a - 1] = -20;
            return;
          }
          x = 0;
          y = z.length;
          do {
            level[z[x] - 1] = ify === true ? indent + 1 : indent;
            x = x + 1;
          } while (x < y);
          x = z[z.length - 1] - 1;
          do {
            if (level[x] > -1)
              level[x] = level[x] + 1;
            x = x + 1;
          } while (x < a);
          indent = ify === true ? indent + 2 : indent + 1;
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
        if (options2.script.methodChain === 0) {
          level[a - 1] = -20;
        } else if (options2.script.methodChain < 0) {
          if (data.lines[a] > 0) {
            propertybreak();
          } else {
            level[a - 1] = -20;
          }
        } else {
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
        if (data.stack[a] === "array" && options2.script.arrayFormat === "indent") {
          level[a - 1] = -20;
          level.push(indent);
          return;
        }
        if (data.stack[a] === "array" && options2.script.arrayFormat === "inline") {
          level[a - 1] = -20;
          level.push(-10);
          return;
        }
        if (data.stack[a] === "object" && options2.script.objectIndent === "indent") {
          level[a - 1] = -20;
          level.push(indent);
          return;
        }
        if (data.stack[a] === "object" && options2.script.objectIndent === "inline") {
          level[a - 1] = -20;
          level.push(-10);
          return;
        }
        if (ei.length > 0) {
          if (ei[ei.length - 1] > -1)
            endExtraInd();
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
        if ((data.token[data.begin[a]] === "(" || data.token[data.begin[a]] === "x(") && options2.language !== "jsx" && data.stack[a] !== "global" && (data.types[a - 1] !== "string" && data.types[a - 1] !== "number" || data.token[a - 2] !== "+" || data.types[a - 1] === "string" && data.types[a - 1] !== "number" && data.token[a - 2] === "+" && data.types[a - 3] !== "string" && data.types[a - 3] !== "number")) {
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
          if (destruct[destruct.length - 1] === true)
            destructfix(true, true);
          level[a - 1] = -20;
          if (arrbreak[arrbreak.length - 1] === true) {
            level.push(indent);
            return;
          }
          const begin = data.begin[a];
          let c = a;
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
                if (data.token[aa] === ",")
                  break;
                if (data.token[aa] === ":") {
                  destructfix(true, false);
                  break;
                }
              }
              aa = aa - 1;
            } while (aa > bb);
          }
        }
        if (destruct[destruct.length - 1] === false || data.token[a - 2] === "+" && (ltype === "string" || ltype === "number") && level[a - 2] > 0 && (ltoke.charAt(0) === '"' || ltoke.charAt(0) === "'")) {
          if (data.stack[a] === "method") {
            if (data.token[a - 2] === "+" && (ltoke.charAt(0) === '"' || ltoke.charAt(0) === "'") && (data.token[a - 3].charAt(0) === '"' || data.token[a - 3].charAt(0) === "'")) {
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
        if (data.token[a + 1] !== void 0 && data.types[a + 1].indexOf("attribute") > 0 && data.types[a + 1].indexOf("end") > 0) {
          level[a - 1] = -20;
          level.push(indent - 1);
          return;
        }
        if (varindex[varindex.length - 1] > -1 && data.stack[varindex[varindex.length - 1]] !== "expression") {
          let aa = a;
          do {
            aa = aa - 1;
            if (data.token[aa] === ";")
              break;
            if (data.token[aa] === ",") {
              indent = indent - 1;
              break;
            }
            if (data.types[aa] === "end")
              aa = data.begin[aa];
          } while (aa > 0 && aa > data.begin[a]);
        }
        varindex[varindex.length - 1] = -1;
        endExtraInd();
        if (data.token[data.begin[a] - 1] !== "for")
          destructfix(false, false);
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
    }
    function start() {
      const deep = data.stack[a + 1];
      const deeper = a === 0 ? data.stack[a] : data.stack[a - 1];
      if (ltoke === ")" || (deeper === "object" || deeper === "array") && ltoke !== "]") {
        if (deep !== "method" || deep === "method" && data.token[a + 1] !== ")" && data.token[a + 2] !== ")") {
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
      if (options2.script.neverFlatten === true || deep === "array" && options2.script.arrayFormat === "indent" || deep === "attribute" || ltype === "generic" || deep === "class" && ltoke !== "(" && ltoke !== "x(" || ctoke === "[" && data.token[a + 1] === "function") {
        destruct.push(false);
      } else {
        if (deep === "expression" || deep === "method") {
          destruct.push(true);
        } else if ((deep === "object" || deep === "class") && (ltoke === "(" || ltoke === "x(" || ltype === "word" || ltype === "reference")) {
          destruct.push(true);
        } else if (deep === "array" || ctoke === "(" || ctoke === "x(") {
          destruct.push(true);
        } else if (ctoke === "{" && deep === "object" && ltype !== "operator" && ltype !== "start" && ltype !== "string" && ltype !== "number" && deeper !== "object" && deeper !== "array" && a > 0) {
          destruct.push(true);
        } else {
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
          } else if (options2.script.braceAllman === true && ltype !== "operator" && ltoke !== "return") {
            level[a - 1] = indent - 1;
          } else if (data.stack[a + 1] !== "block" && (deep === "function" || ltoke === ")" || ltoke === "x)" || ltoke === "," || ltoke === "}" || ltype === "markup")) {
            level[a - 1] = -10;
          } else if (ltoke === "{" || ltoke === "x{" || ltoke === "[" || ltoke === "}" || ltoke === "x}") {
            level[a - 1] = indent - 1;
          }
        }
        if (deep === "object") {
          if (options2.script.objectIndent === "indent") {
            destruct[destruct.length - 1] = false;
            level.push(indent);
            return;
          }
          if (options2.script.objectIndent === "inline") {
            destruct[destruct.length - 1] = true;
            level.push(-20);
            return;
          }
        }
        if (deep === "switch") {
          if (options2.script.noCaseIndent === true) {
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
        if (options2.wrap > 0 && ctoke === "(" && data.token[a + 1] !== ")") {
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
        } else if (deep === "method" || data.token[a - 2] === "function" && ltype === "reference") {
          if (ltoke === "import" || ltoke === "in" || options2.script.functionNameSpace === true) {
            level[a - 1] = -10;
          } else if (ltoke === "}" && data.stack[a - 1] === "function" || ltype === "word" || ltype === "reference" || ltype === "property") {
            level[a - 1] = -20;
          } else if (deeper !== "method" && deep !== "method") {
            level[a - 1] = indent;
          }
        }
        if (ltoke === "+" && (data.token[a - 2].charAt(0) === '"' || data.token[a - 2].charAt(0) === "'")) {
          level.push(indent);
          return;
        }
        if (ltoke === "}" || ltoke === "x}") {
          level.push(-20);
          return;
        }
        if (ltoke === "-" && (a < 2 || data.token[a - 2] !== ")" && data.token[a - 2] !== "x)" && data.token[a - 2] !== "]" && data.types[a - 2] !== "reference" && data.types[a - 2] !== "string" && data.types[a - 2] !== "number") || options2.script.functionSpace === false && ltoke === "function") {
          level[a - 1] = -20;
        }
        level.push(-20);
        return;
      }
      if (ctoke === "[") {
        if (ltoke === "[")
          list[list.length - 2] = true;
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
        if (options2.script.arrayFormat === "indent") {
          destruct[destruct.length - 1] = false;
          level.push(indent);
          return;
        }
        if (options2.script.arrayFormat === "inline") {
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
      }
    }
    function string() {
      if (ctoke.length === 1) {
        level.push(-20);
        if (data.lines[a] === 0)
          level[a - 1] = -20;
      } else if (ctoke.indexOf("#!/") === 0) {
        level.push(indent);
      } else if (ltype !== "template" && data.types[a + 1] !== "template") {
        level.push(-10);
      }
      if ((ltoke === "," || ltype === "start") && (data.stack[a] === "object" || data.stack[a] === "array") && destruct[destruct.length - 1] === false && a > 0) {
        level[a - 1] = indent;
      }
    }
    function template() {
      if (options2.language !== "json" && data.types[a - 1] !== "string") {
        if (ctype === "template_else") {
          level[a - 1] = indent - 1;
          level.push(indent);
        } else if (ctype === "template_start") {
          indent = indent + 1;
          if (data.lines[a - 1] < 1)
            level[a - 1] = -20;
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
      }
    }
    function templateString() {
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
        if (options2.script.bracePadding === true) {
          level[a - 2] = -10;
          level[a - 1] = -10;
        } else {
          level[a - 2] = -20;
          level[a - 1] = -20;
        }
      }
    }
    function types() {
      if (data.token[a - 1] === "," || data.token[a - 1] === ":" && data.stack[a - 1] !== "data_type") {
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
    }
    function word() {
      if ((ltoke === ")" || ltoke === "x)") && data.stack[a] === "class" && (data.token[data.begin[a - 1] - 1] === "static" || data.token[data.begin[a - 1] - 1] === "final" || data.token[data.begin[a - 1] - 1] === "void")) {
        level[a - 1] = -10;
        level[data.begin[a - 1] - 1] = -10;
      }
      if (ltoke === "]")
        level[a - 1] = -10;
      if (ctoke === "else" && ltoke === "}") {
        if (data.token[a - 2] === "x}")
          level[a - 3] = level[a - 3] - 1;
        if (options2.script.braceAllman === true || options2.script.elseNewline === true) {
          level[a - 1] = indent;
        }
      }
      if (ctoke === "new" && apiword.has(data.token[a + 1]))
        ;
      if (ctoke === "from" && ltype === "end" && a > 0 && (data.token[data.begin[a - 1] - 1] === "import" || data.token[data.begin[a - 1] - 1] === ",")) {
        level[a - 1] = -10;
      }
      if (ctoke === "function") {
        if (options2.script.functionSpace === false && a < b - 1 && (data.token[a + 1] === "(" || data.token[a + 1] === "x(")) {
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
        let c = a - 1;
        let d = 0;
        do {
          if (data.token[c] === "}" || data.token[c] === "x}")
            d = d + 1;
          if (data.token[c] === "{" || data.token[c] === "x{")
            d = d - 1;
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
      } else if (ctoke === "in" || (ctoke === "else" && options2.script.elseNewline === false && options2.script.braceAllman === false || ctoke === "catch") && (ltoke === "}" || ltoke === "x}")) {
        level[a - 1] = -10;
      } else if (ctoke === "var" || ctoke === "let" || ctoke === "const") {
        varindex[varindex.length - 1] = a;
        if (ltype === "end")
          level[a - 1] = indent;
        if (data.token[data.begin[a] - 1] !== "for") {
          let c = a + 1;
          let d = 0;
          do {
            if (data.types[c] === "end")
              d = d - 1;
            if (data.types[c] === "start")
              d = d + 1;
            if (d < 0 || d === 0 && (data.token[c] === ";" || data.token[c] === ",")) {
              break;
            }
            c = c + 1;
          } while (c < b);
          if (data.token[c] === ",")
            indent = indent + 1;
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
      if (options2.script.bracePadding === false && a < b - 1 && data.token[a + 1].charAt(0) === "}") {
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
    }
    do {
      if (data.lexer[a] === lexer2) {
        ctype = data.types[a];
        ctoke = data.token[a];
        if (ctype === "comment") {
          comment2();
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
          reference2();
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
            count[count.length - 1] = options2.wrap + 1;
          } else if (level[a] > -1 || data.token[a].charAt(0) === "`" && data.token[a].indexOf(NWL) > 0) {
            count[count.length - 1] = -1;
          } else if (count[count.length - 1] > -1) {
            count[count.length - 1] = count[count.length - 1] + data.token[a].length;
            if (level[a] === -10)
              count[count.length - 1] = count[count.length - 1] + 1;
          }
        }
      } else {
        external();
      }
      a = a + 1;
    } while (a < b);
    return level;
  })();
  const output = (() => {
    const build = [];
    const tab = (() => {
      const tabby = [];
      const ch = options2.indentChar;
      let index = options2.indentSize;
      if (typeof index !== "number" || index < 1)
        return "";
      do {
        tabby.push(ch);
        index = index - 1;
      } while (index > 0);
      return tabby.join("");
    })();
    const lf = options2.crlf === true ? "\r\n" : NWL;
    const pres = options2.preserveLine + 1;
    const invisibles = ["x;", "x}", "x{", "x(", "x)"];
    let a = prettify.start;
    let external = "";
    let lastLevel = options2.indentLevel;
    function nl(tabs) {
      const linesout = [];
      const total = (() => {
        if (a === b - 1)
          return 1;
        if (data.lines[a + 1] - 1 > pres)
          return pres;
        if (data.lines[a + 1] > 1)
          return data.lines[a + 1] - 1;
        return 1;
      })();
      let index = 0;
      if (tabs < 0)
        tabs = 0;
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
      return linesout.join(NIL);
    }
    if (options2.script.vertical === true) {
      let vertical2 = function(end) {
        let longest = 0;
        let complex = 0;
        let aa = end - 1;
        let bb = 0;
        let cc2 = 0;
        const begin = data.begin[a];
        const list = [];
        do {
          if ((data.begin[aa] === begin || data.token[aa] === "]" || data.token[aa] === ")") && (data.token[aa + 1] === ":" && data.stack[aa] === "object" || data.token[aa + 1] === "=")) {
            bb = aa;
            complex = 0;
            do {
              if (data.begin[bb] === begin) {
                if (data.token[bb] === "," || data.token[bb] === ";" || data.token[bb] === "x;" || levels[bb] > -1 && data.types[bb] !== "comment") {
                  if (data.token[bb + 1] === ".") {
                    complex = complex + options2.indentSize * options2.indentChar.length;
                  }
                  break;
                }
              } else if (levels[bb] > -1) {
                break;
              }
              if (data.types[bb] !== "comment") {
                if (levels[bb - 1] === -10)
                  complex = complex + 1;
                complex = data.token[bb].length + complex;
              }
              bb = bb - 1;
            } while (bb > begin);
            cc2 = bb;
            if (data.token[cc2] === "," && data.token[aa + 1] === "=") {
              do {
                if (data.types[cc2] === "end")
                  cc2 = data.begin[cc2];
                if (data.begin[cc2] === begin) {
                  if (data.token[cc2] === ";" || data.token[cc2] === "x;")
                    break;
                  if (data.token[cc2] === "var" || data.token[cc2] === "const" || data.token[cc2] === "let") {
                    complex = complex + options2.indentSize * options2.indentChar.length;
                    break;
                  }
                }
                cc2 = cc2 - 1;
              } while (cc2 > begin);
            }
            if (complex > longest)
              longest = complex;
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
                data.token[list[aa][0]] = data.token[list[aa][0]] + WSP;
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
            vertical2(a);
          }
        } else {
          a = data.begin[a];
        }
      } while (a > 0);
    }
    a = prettify.start;
    do {
      if (data.lexer[a] === lexer2 || prettify.beautify[data.lexer[a]] === void 0) {
        if (data.types[a] === "comment" && options2.script.commentIndent === true) {
          if (/\n/.test(data.token[a])) {
            const space = data.begin[a] > -1 ? data.token[a].charAt(2) === "*" ? repeatChar(levels[a], tab) + options2.indentChar : repeatChar(levels[a], tab) : options2.indentChar;
            const comm = data.token[a].split(/\n/);
            let i = 1;
            do {
              comm[i] = space + comm[i].trimStart();
              i = i + 1;
            } while (i < comm.length);
            data.token.splice(a, 1, comm.join(NWL));
          }
        }
        if (invisibles.indexOf(data.token[a]) < 0) {
          if (data.token[a] !== ";" || options2.script.noSemicolon === false) {
            build.push(data.token[a]);
          } else if (levels[a] < 0 && data.types[a + 1] !== "comment") {
            build.push(";");
          }
        }
        if (a < b - 1 && data.lexer[a + 1] !== lexer2 && data.begin[a] === data.begin[a + 1] && data.types[a + 1].indexOf("end") < 0 && data.token[a] !== ",") {
          build.push(WSP);
        } else if (levels[a] > -1) {
          if ((levels[a] > -1 && data.token[a] === "{" || levels[a] > -1 && data.token[a + 1] === "}") && data.lines[a] < 3 && options2.script.braceNewline === true) {
            if (data.lines[a + 1] < 3)
              build.push(nl(0));
          }
          build.push(nl(levels[a]));
          lastLevel = levels[a];
        } else if (levels[a] === -10) {
          build.push(WSP);
          if (data.lexer[a + 1] !== lexer2)
            lastLevel = lastLevel + 1;
        }
      } else {
        if (externalIndex[a] === a) {
          build.push(data.token[a]);
        } else {
          prettify.end = externalIndex[a];
          prettify.start = a;
          const ex = parse.beautify(lastLevel);
          external = ex.beautify.replace(StripEnd, NIL);
          build.push(external);
          a = prettify.iterator;
          if (levels[a] === -10) {
            build.push(WSP);
          } else if (levels[a] > -1) {
            build.push(nl(levels[a]));
          }
          ex.reset();
        }
      }
      a = a + 1;
    } while (a < b);
    prettify.iterator = b - 1;
    return build.join(NIL);
  })();
  return output;
};

// src/prettify.ts
var prettify_exports = {};
__export(prettify_exports, {
  definitions: () => definitions,
  format: () => format,
  formatSync: () => formatSync,
  language: () => detect,
  options: () => options,
  parse: () => parse2,
  parseSync: () => parseSync
});

// src/options/definitions.ts
var definitions = {
  language: {
    description: "The language name",
    lexer: "all",
    type: "select",
    default: "auto",
    values: [
      {
        rule: "auto",
        description: "Prettify will automatically detect the language"
      },
      {
        rule: "text",
        description: "Plain Text"
      },
      {
        rule: "html",
        description: "HTML"
      },
      {
        rule: "liquid",
        description: "HTML + Liquid"
      },
      {
        rule: "javascript",
        description: "JavaScript"
      },
      {
        rule: "jsx",
        description: "JSX"
      },
      {
        rule: "typescript",
        description: "TypeScript"
      },
      {
        rule: "tsx",
        description: "TSX"
      },
      {
        rule: "json",
        description: "JSON"
      },
      {
        rule: "css",
        description: "CSS"
      },
      {
        rule: "scss",
        description: "SCSS"
      },
      {
        rule: "less",
        description: "LESS"
      },
      {
        rule: "xml",
        description: "XML"
      }
    ]
  },
  wrap: {
    default: 0,
    description: "Character width limit before applying word wrap. A 0 value disables this option. A negative value concatenates script strings.",
    lexer: "all",
    type: "number"
  },
  indentSize: {
    default: 2,
    description: 'The number of "indentChar" values to comprise a single indentation.',
    lexer: "all",
    type: "number"
  },
  indentChar: {
    default: " ",
    description: "The string characters to comprise a single indentation. Any string combination is accepted.",
    lexer: "all",
    type: "string"
  },
  crlf: {
    default: false,
    description: "If line termination should be Windows (CRLF) format. Unix (LF) format is the default.",
    lexer: "all",
    type: "boolean"
  },
  endNewline: {
    default: false,
    description: "Insert an empty line at the end of output.",
    lexer: "all",
    type: "boolean"
  },
  preserveLine: {
    default: 2,
    description: "The maximum number of consecutive empty lines to retain.",
    lexer: "all",
    type: "number"
  },
  preserveComment: {
    default: false,
    description: "Prevent comment reformatting due to option wrap.",
    lexer: "all",
    type: "boolean"
  },
  commentNewline: {
    default: false,
    description: "If a blank new line should be forced above comments.",
    lexer: "all",
    type: "boolean"
  },
  commentIndent: {
    default: false,
    description: "This will determine whether comments should always start at position 0 of each line or if comments should be indented according to the code.",
    lexer: "all",
    type: "boolean"
  },
  correct: {
    default: false,
    description: "Automatically correct some sloppiness in code.",
    lexer: "all",
    type: "boolean"
  },
  quoteConvert: {
    lexer: "all",
    description: "If the quotes should be converted to single quotes or double quotes.",
    type: "select",
    default: "none",
    values: [
      {
        rule: "none",
        description: "Ignores this option"
      },
      {
        rule: "single",
        description: "Converts double quotes to single quotes"
      },
      {
        rule: "double",
        description: "Converts single quotes to double quotes"
      }
    ]
  },
  delimiterTrims: {
    default: "preserve",
    description: "How delimiter whitespace trim dashes should handled on Liquid tokens. You should avoid setting this to force in order to avoid stripping whitespace between text content.",
    lexer: "markup",
    type: "select",
    values: [
      {
        rule: "preserve",
        description: "All trim dash occurances of trims intact"
      },
      {
        rule: "strip",
        description: "Removes all trim dash occurances for tags and output tokens"
      },
      {
        rule: "force",
        description: "Applies trime dashes to all tags and output tokens"
      },
      {
        rule: "tags",
        description: "Applies trim dashes to tags tokens only"
      },
      {
        rule: "output",
        description: "Applies trim dashes to output object tokens only"
      }
    ]
  },
  normalizeSpacing: {
    default: true,
    description: "Whether or not to normalize the distributed spacing contained in Liquid tokens.",
    lexer: "markup",
    type: "boolean"
  },
  lineBreakSeparator: {
    default: "default",
    description: "Controls the placement of Liquid tag separator type characters in newline structures.",
    lexer: "markup",
    type: "select",
    values: [
      {
        rule: "default",
        description: "Leave line break character intace"
      },
      {
        rule: "before",
        description: "Place line break character at the start of expressions"
      },
      {
        rule: "after",
        description: "Place line break character at the end of expressions"
      }
    ]
  },
  valueForce: {
    default: "intent",
    description: "Controls force indentation applied in accordance with the attribute value expressions. This rule is Liquid specific.",
    lexer: "markup",
    type: "select",
    values: [
      {
        rule: "wrap",
        description: "Apply by wrap"
      },
      {
        rule: "newline",
        description: "Apply when newlines"
      },
      {
        rule: "intent",
        description: "Apply on either newline or wrap"
      },
      {
        rule: "always",
        description: "Always apply"
      },
      {
        rule: "never",
        description: "Never apply"
      }
    ]
  },
  ignoreTagList: {
    default: [],
    description: "A lis tof liquid tag to ignore",
    lexer: "liquid",
    type: "array"
  },
  attributeSort: {
    default: false,
    description: "Alphanumerically sort markup attributes. Attribute sorting is ignored on tags that contain attributes template attributes.",
    lexer: "markup",
    type: "boolean"
  },
  attributeSortList: {
    default: [],
    description: "A comma separated list of attribute names. Attributes will be sorted according to this list and then alphanumerically. This option requires 'attributeSort' have a value of true.",
    lexer: "markup",
    type: "array"
  },
  attributeCasing: {
    default: "preserve",
    description: "Controls the casing of attribute values and keys.",
    type: "select",
    lexer: "markup",
    values: [
      {
        rule: "preserve",
        description: "All tag attribute keys/values are preserved and left intact."
      },
      {
        rule: "lowercase",
        description: "All tag attribute keys/values are converted to lowercase"
      },
      {
        rule: "lowercase-name",
        description: "Only attribute keys are converted to lowercase"
      },
      {
        rule: "lowercase-value",
        description: "Only attribute values are converted to lowercase"
      }
    ]
  },
  forceAttribute: {
    default: false,
    description: "If all markup attributes should be indented each onto their own line. This option accepts either a boolean or number value, depending on your preferences you can either force attributes based a count limit, disable forcing or always enable enforcing.",
    lexer: "markup",
    type: ["number", "boolean"],
    multi: {
      number: {
        default: 1,
        description: "Optionally define an attribute force threshold. When the number of attributes exceeds this limit then they will be forced, otherwise they will be left intact."
      },
      boolean: {
        default: false,
        description: "Whether or not to enforce the rule. A value of true will always force attributes, whereas a value of false will never force attributes."
      }
    }
  },
  forceLeadAttribute: {
    default: false,
    description: "Forces leading attribute onto a newline when using wrap based indentation.",
    lexer: "markup",
    type: "boolean"
  },
  forceIndent: {
    default: false,
    description: "Will force indentation upon all content and tags without regard for the creation of new text nodes.",
    lexer: "markup",
    type: "boolean"
  },
  preserveAttributes: {
    default: false,
    description: "If markup tags should have their insides preserved. This option is only available to markup and does not support child tokens that require a different lexer.",
    lexer: "markup",
    type: "boolean"
  },
  preserveText: {
    default: false,
    description: "If text in the provided markup code should be preserved exactly as provided. This option eliminates beautification and wrapping of text content.",
    lexer: "markup",
    type: "boolean"
  },
  selfCloseSpace: {
    default: false,
    description: 'Markup self-closing tags end will end with " />" instead of "/>".',
    lexer: "markup",
    type: "boolean"
  },
  ignoreScripts: {
    default: false,
    description: "Whether to ignore embedded regions of tags identified to contain JavaScript",
    lexer: "markup",
    type: "boolean"
  },
  ignoreStyles: {
    default: false,
    description: "Whether to ignore embedded regions of tags identified to contain CSS",
    lexer: "markup",
    type: "boolean"
  },
  classPadding: {
    description: "Inserts new line characters between every CSS code block.",
    default: false,
    type: "boolean",
    lexer: "style"
  },
  sortSelectors: {
    default: false,
    type: "boolean",
    description: "If comma separated CSS selectors should present on a single line of code.",
    lexer: "style"
  },
  sortProperties: {
    lexer: "style",
    description: "This option will alphabetically sort CSS properties contained within classes.",
    default: false,
    type: "boolean"
  },
  noLeadZero: {
    lexer: "style",
    description: "This will eliminate leading zeros from numbers expressed within values.",
    default: false,
    type: "boolean"
  },
  atRuleSpace: {
    default: true,
    description: "Insert a single whitespace character betwen @ rules.",
    type: "boolean",
    lexer: "style"
  },
  braceAllman: {
    lexer: "script",
    default: false,
    description: 'Determines if opening curly braces will exist on the same line as their condition or be forced onto a new line, otherwise known as "Allman Style" indentation.',
    type: "boolean"
  },
  bracePadding: {
    default: false,
    description: "This will create a newline before and after objects values",
    type: "boolean",
    lexer: "script"
  },
  braceNewline: {
    default: false,
    description: "If true an empty line will be inserted after opening curly braces and before closing curly braces.",
    type: "boolean",
    lexer: "script"
  },
  braceStyle: {
    default: "none",
    description: "Emulates JSBeautify's brace_style option using existing Prettify options",
    type: "select",
    lexer: "script",
    values: [
      {
        rule: "none",
        description: "Ignores this option"
      },
      {
        rule: "collapse",
        description: "Sets formatObject to indent and neverflatten to true."
      },
      {
        rule: "collapse-preserve-inline",
        description: "Sets formatObject to inline and bracePadding to true"
      },
      {
        rule: "expand",
        description: "Sets objectIndent to indent and braceNewline + neverflatten to true."
      }
    ]
  },
  arrayFormat: {
    lexer: "script",
    description: "Determines if all array indexes should be indented, never indented, or left to the default",
    type: "select",
    default: "default",
    values: [
      {
        rule: "default",
        description: "Default formatting"
      },
      {
        rule: "indent",
        description: "Always indent each index of an array"
      },
      {
        rule: "inline",
        description: "Ensure all array indexes appear on a single line"
      }
    ]
  },
  objectSort: {
    default: false,
    description: "This option will alphabetically sort object properties in JSON objects",
    type: "boolean",
    lexer: "script"
  },
  objectIndent: {
    description: "This option will alphabetically sort object properties in JSON objects",
    type: "select",
    lexer: "script",
    default: "default",
    values: [
      {
        rule: "default",
        description: "Default formatting"
      },
      {
        rule: "indent",
        description: "Always indent each index of an array"
      },
      {
        rule: "inline",
        description: "Ensure all array indexes appear on a single line"
      }
    ]
  },
  functionSpace: {
    lexer: "script",
    default: true,
    type: "boolean",
    description: "Inserts a space following the function keyword for anonymous functions."
  },
  functionNameSpace: {
    lexer: "script",
    default: true,
    type: "boolean",
    description: "If a space should follow a JavaScript function name."
  },
  methodChain: {
    lexer: "script",
    default: -1,
    description: "When to break consecutively chained methods and properties onto separate lines. A negative value disables this option. A value of 0 ensures method chainsare never broken.",
    type: "number"
  },
  caseSpace: {
    default: false,
    type: "boolean",
    description: "If the colon separating a case's expression (of a switch/case block) from its statement should be followed by a space instead of indentation thereby keeping the case on a single line of code.",
    lexer: "script"
  },
  elseNewline: {
    lexer: "script",
    default: false,
    type: "boolean",
    description: 'If keyword "else" is forced onto a new line.'
  },
  ternaryLine: {
    lexer: "script",
    description: "If ternary operators in JavaScript `?` and `:` should remain on the same line.",
    type: "boolean",
    default: false
  },
  neverFlatten: {
    lexer: "script",
    default: true,
    description: "If destructured lists in script should never be flattend.",
    type: "boolean"
  },
  variableList: {
    lexer: "script",
    description: "If consecutive JavaScript variables should be merged into a comma separated list or if variables in a list should be separated. each \u2014 Ensure each reference is a single declaration statement.",
    type: "select",
    default: "none",
    values: [
      {
        rule: "none",
        description: "Ignores this option"
      },
      {
        rule: "each",
        description: "Ensure each reference is a single declaration statement"
      },
      {
        rule: "list",
        description: "Ensure consecutive declarations are a comma separated list"
      }
    ]
  },
  vertical: {
    lexer: "script",
    description: "If lists of assignments and properties should be vertically aligned",
    type: "boolean",
    default: false
  },
  noCaseIndent: {
    lexer: "script",
    description: "If the colon separating a case's expression (of a switch/case block) from its statement should be followed by a space instead of indentation, thereby keeping the case on a single line of code.",
    default: false,
    type: "boolean"
  },
  noSemicolon: {
    lexer: "script",
    description: "Removes semicolons that would be inserted by ASI. This option is in conflict with option `attemptCorrection` and takes precedence over conflicting features. Use of this option is a possible security/stability risk.",
    default: false,
    type: "boolean"
  },
  endComma: {
    description: "If there should be a trailing comma in arrays and objects.",
    type: "select",
    lexer: "script",
    default: "none",
    values: [
      {
        rule: "none",
        description: "Ignore this option"
      },
      {
        rule: "always",
        description: "Always ensure there is a tailing comma"
      },
      {
        rule: "never",
        description: "Remove trailing commas"
      }
    ]
  }
};

// src/parser/comment.ts
function comment(prettify2) {
  const sindex = prettify2.source.search(CommControl);
  const signore = prettify2.source.search(CommIgnoreFile);
  const k = keys(definitions);
  const len = k.length;
  let a = 0;
  if (signore > -1 && prettify2.source.slice(0, signore).trimStart() === NIL)
    return false;
  if (sindex > -1 && (sindex === 0 || `"':`.indexOf(prettify2.source.charAt(sindex - 1)) < 0)) {
    let esc2 = function() {
      if (source.charAt(a2 - 1) !== "\\")
        return false;
      let x = a2;
      do {
        x = x - 1;
      } while (x > 0 && source.charAt(x) === "\\");
      return (a2 - x) % 2 === 0;
    };
    const ops = [];
    const pdcom = sindex;
    const source = prettify2.source;
    const len2 = source.length;
    let a2 = pdcom;
    let b2 = 0;
    let quote = NIL;
    let item = NIL;
    let lang = NIL;
    let lex = NIL;
    let valkey = [];
    let op = [];
    let rcb;
    let comment2;
    if (is(source[a2], 60 /* LAN */)) {
      comment2 = "<!--";
    } else if (is(source[a2 + 1], 47 /* FWS */)) {
      comment2 = "//";
    } else if (is(source[a2 + 1], 37 /* PER */)) {
      rcb = source.indexOf("}", a2 + 1);
      if (is(source[rcb - 1], 37 /* PER */))
        comment2 = source.slice(a2, rcb + 1);
    } else {
      comment2 = "/*";
    }
    do {
      if (source.slice(a2 - 9, a2) === "@prettify")
        break;
      a2 = a2 + 1;
    } while (a2 < len2);
    do {
      if (esc2() === false) {
        if (quote === NIL) {
          if (is(source[a2], 34 /* DQO */) || is(source[a2], 39 /* SQO */) || is(source[a2], 96 /* TQO */)) {
            quote = source.charAt(a2);
            if (ops.length > 0 && ops[ops.length - 1].charAt(ops[ops.length - 1].length - 1) === ":")
              b2 = a2;
          } else if (/\s/.test(source.charAt(a2)) === false && b2 === 0) {
            b2 = a2;
          } else if (is(source[a2], 44 /* COM */) || ws(source.charAt(a2)) === true && b2 > 0) {
            item = source.slice(b2, a2);
            if (ops.length > 0) {
              if (ops.length > 0 && is(item, 58 /* COL */) && ops[ops.length - 1].indexOf(":") < 0) {
                ops[ops.length - 1] = ops[ops.length - 1] + item;
                b2 = a2;
              } else if (ops.length > 0 && ops[ops.length - 1].charAt(ops[ops.length - 1].length - 1) === ":") {
                ops[ops.length - 1] = ops[ops.length - 1] + item;
                b2 = 0;
              } else {
                ops.push(item);
                b2 = 0;
              }
            } else {
              ops.push(item);
              b2 = 0;
            }
          }
          if (comment2 === "<!--" && source.slice(a2 - 2, a2 + 1) === "-->")
            break;
          if (comment2 === "//" && source.charAt(a2) === "\n")
            break;
          if (comment2 === "/*" && source.slice(a2 - 1, a2 + 1) === "*/")
            break;
          if (comment2.charCodeAt(1) === 37 /* PER */ && source.slice(a2 - 1, a2 + 1) === "%" && source.indexOf("endcomment", source.indexOf("{%", rcb)) > 0)
            break;
        } else if (source.charAt(a2) === quote && quote !== "${") {
          quote = NIL;
        } else if (quote === "`" && source.slice(a2, a2 + 2) === "${") {
          quote = "${";
        } else if (quote === "${" && source.charAt(a2) === "}") {
          quote = "`";
        }
      }
      a2 = a2 + 1;
    } while (a2 < len2);
    if (b2 > 0) {
      quote = source.slice(b2, a2 + 1);
      if (comment2 === "<!--")
        quote = quote.replace(/\s*-+>$/, NIL);
      else if (comment2 === "//")
        quote = quote.replace(/\s+$/, NIL);
      else
        quote = quote.replace(/\s*\u002a\/$/, NIL);
      ops.push(quote);
    }
    a2 = ops.length;
    if (a2 > 0) {
      do {
        a2 = a2 - 1;
        if (ops[a2].indexOf(":") > 0) {
          op = [ops[a2].slice(0, ops[a2].indexOf(":")), ops[a2].slice(ops[a2].indexOf(":") + 1)];
        } else if (definitions[ops[a2]] !== void 0 && definitions[ops[a2]].type === "boolean") {
          prettify2.options[ops[a2]] = true;
        }
        if (op.length === 2 && definitions[op[0]] !== void 0) {
          if (op[1].charAt(op[1].length - 1) === op[1].charAt(0) && (op[1].charAt(0) === '"' || op[1].charAt(0) === "'" || op[1].charAt(0) === "`")) {
            op[1] = op[1].slice(1, op[1].length - 1);
          }
          if (definitions[op[0]].type === "number" && isNaN(Number(op[1])) === false) {
            prettify2.options[op[0]] = Number(op[1]);
          } else if (definitions[op[0]].type === "boolean") {
            prettify2.options[op[0]] = op[1] === "true";
          } else {
            if (definitions[op[0]].values !== void 0) {
              valkey = keys(definitions[op[0]].values);
              b2 = valkey.length;
              do {
                b2 = b2 - 1;
                if (valkey[b2] === op[1]) {
                  prettify2.options[op[0]] = op[1];
                  break;
                }
              } while (b2 > 0);
            } else {
              if (op[0] === "language") {
                lang = op[1];
              } else if (op[0] === "lexer") {
                lex = op[1];
              }
              prettify2.options[op[0]] = op[1];
            }
          }
        }
      } while (a2 > 0);
      if (lex === NIL && lang !== NIL)
        lex = setLexer(lang);
    }
  }
  if (prettify2.options.lexer === "script") {
    if (prettify2.options.script.styleGuide !== void 0) {
      switch (prettify2.options.script.styleGuide) {
        case "airbnb":
          prettify2.options.wrap = 80;
          prettify2.options.indentChar = " ";
          prettify2.options.indentSize = 2;
          prettify2.options.preserveLine = 1;
          prettify2.options.script.correct = true;
          prettify2.options.script.quoteConvert = "single";
          prettify2.options.script.variableList = "each";
          prettify2.options.script.endComma = "always";
          prettify2.options.script.bracePadding = true;
          break;
        case "crockford":
          prettify2.options.indentChar = " ";
          prettify2.options.indentSize = 4;
          prettify2.options.script.correct = true;
          prettify2.options.script.bracePadding = false;
          prettify2.options.script.elseNewline = false;
          prettify2.options.script.endComma = "never";
          prettify2.options.script.noCaseIndent = true;
          prettify2.options.script.functionSpace = true;
          prettify2.options.script.variableList = "each";
          prettify2.options.script.vertical = false;
          break;
        case "google":
          prettify2.options.wrap = -1;
          prettify2.options.indentChar = " ";
          prettify2.options.indentSize = 4;
          prettify2.options.preserveLine = 1;
          prettify2.options.script.correct = true;
          prettify2.options.script.quoteConvert = "single";
          prettify2.options.script.vertical = false;
          break;
        case "jquery":
          prettify2.options.wrap = 80;
          prettify2.options.indentChar = "	";
          prettify2.options.indentSize = 1;
          prettify2.options.script.correct = true;
          prettify2.options.script.bracePadding = true;
          prettify2.options.script.quoteConvert = "double";
          prettify2.options.script.variableList = "each";
          break;
        case "jslint":
          prettify2.options.indentChar = " ";
          prettify2.options.indentSize = 4;
          prettify2.options.script.correct = true;
          prettify2.options.script.bracePadding = false;
          prettify2.options.script.elseNewline = false;
          prettify2.options.script.endComma = "never";
          prettify2.options.script.noCaseIndent = true;
          prettify2.options.script.functionSpace = true;
          prettify2.options.script.variableList = "each";
          prettify2.options.script.vertical = false;
          break;
        case "standard":
          prettify2.options.wrap = 0;
          prettify2.options.indentChar = " ";
          prettify2.options.indentSize = 2;
          prettify2.options.endNewline = false;
          prettify2.options.preserveLine = 1;
          prettify2.options.script.correct = true;
          prettify2.options.script.noSemicolon = true;
          prettify2.options.script.endComma = "never";
          prettify2.options.script.braceNewline = false;
          prettify2.options.script.bracePadding = false;
          prettify2.options.script.braceAllman = false;
          prettify2.options.script.quoteConvert = "single";
          prettify2.options.script.functionSpace = true;
          prettify2.options.script.ternaryLine = false;
          prettify2.options.script.variableList = "each";
          prettify2.options.script.vertical = false;
          break;
        case "yandex":
          prettify2.options.script.correct = true;
          prettify2.options.script.bracePadding = false;
          prettify2.options.script.quoteConvert = "single";
          prettify2.options.script.variableList = "each";
          prettify2.options.script.vertical = false;
          break;
      }
    }
    if (prettify2.options.script.braceStyle !== void 0) {
      switch (prettify2.options.script.braceStyle) {
        case "collapse":
          prettify2.options.script.braceNewline = false;
          prettify2.options.script.bracePadding = false;
          prettify2.options.script.braceAllman = false;
          prettify2.options.script.objectIndent = "indent";
          prettify2.options.script.neverFlatten = true;
          break;
        case "collapse-preserve-inline":
          prettify2.options.script.braceNewline = false;
          prettify2.options.script.bracePadding = true;
          prettify2.options.script.braceAllman = false;
          prettify2.options.script.objectIndent = "indent";
          prettify2.options.script.neverFlatten = false;
          break;
        case "expand":
          prettify2.options.script.braceNewline = false;
          prettify2.options.script.bracePadding = false;
          prettify2.options.script.braceAllman = true;
          prettify2.options.script.objectIndent = "indent";
          prettify2.options.script.neverFlatten = true;
          break;
      }
    }
    if (prettify2.options.language === "json")
      prettify2.options.wrap = 0;
  }
  do {
    if (prettify2.options[keys[a]] !== void 0) {
      definitions[keys[a]].lexer.length;
    }
    a = a + 1;
  } while (a < len);
}

// src/parser/mode.ts
function parser(prettify2) {
  const { source, options: options2 } = prettify2;
  const { lexer: lexer2, language } = options2;
  if (typeof prettify2.lexers[lexer2] === "function") {
    prettify2.lexers[lexer2](`${source} `);
  } else {
    parse.error = `Specified lexer, ${lexer2}, is not a function.`;
  }
  let a = 0;
  let b = 0;
  const k = keys(parse.data);
  const c = k.length;
  do {
    b = a + 1;
    do {
      if (parse.data[k[a]].length !== parse.data[k[b]].length) {
        parse.error = `"${k[a]}" array is of different length than "${k[b]}"`;
        break;
      }
      b = b + 1;
    } while (b < c);
    a = a + 1;
  } while (a < c - 1);
  if (parse.data.begin.length > 0) {
    if (lexer2 === "script" && (language === "json" && options2.json.objectSort === true || options2.language !== "json" && options2.script.objectSort === true)) {
      parse.sortCorrect(0, parse.count + 1);
    } else if (lexer2 === "style" && options2.style.sortProperties === true) {
      parse.sortCorrect(0, parse.count + 1);
    }
  }
  return parse.data;
}
function stats(language) {
  const start = Date.now();
  const store = { language, chars: -1 };
  return (output) => {
    store.chars = output;
    store.size = size(output);
    store.time = (Date.now() - start).toFixed(1);
    return store;
  };
}
function blank(prettify2) {
  const { languageName } = reference(prettify2.options.language);
  const crlf = prettify2.options.crlf === true ? "\r\n" : "\n";
  const input = prettify2.source.match(/\n/g);
  const timer = stats(languageName);
  let output = NIL;
  if (input === null) {
    if (prettify2.options.endNewline)
      output = crlf;
    prettify2.stats = timer(output.length);
  } else {
    output = input[0].length > prettify2.options.preserveLine ? repeatChar(prettify2.options.preserveLine, crlf) : repeatChar(input[0].length, crlf);
    if (prettify2.options.endNewline)
      output += crlf;
    prettify2.stats = timer(output.length);
  }
  return output;
}
function execute(prettify2) {
  prettify2.data = parse.full();
  if (!/\S/.test(prettify2.source))
    return blank(prettify2);
  if (prettify2.options.language === "text") {
    prettify2.options.language = "text";
    prettify2.options.languageName = "Plain Text";
    prettify2.options.lexer = "markup";
  } else if (prettify2.options.lexer === "auto" && prettify2.options.language !== "text") {
    prettify2.options.lexer = setLexer(prettify2.options.language);
    prettify2.options.languageName = setLanguageName(prettify2.options.language);
  } else if (prettify2.options.language === "auto" || prettify2.options.language === void 0) {
    const { lexer: lexer2, language, languageName } = detect(prettify2.source);
    if (language === "unknown") {
      console.warn("Prettify: unknown and/or unsupport language");
      console.info("Prettify: define a support language (fallback is HTML)");
    }
    prettify2.options.lexer = lexer2;
    prettify2.options.language = language;
    prettify2.options.languageName = languageName;
  } else {
    const { lexer: lexer2, language, languageName } = reference(prettify2.options.language);
    if (language === "unknown") {
      console.warn(`Prettify: unsupport ${prettify2.options.language}`);
      console.info("Prettify: language is not supported (fallback is HTML)");
    }
    prettify2.options.lexer = lexer2;
    prettify2.options.language = language;
    prettify2.options.languageName = languageName;
  }
  const time = stats(prettify2.options.languageName);
  const mode = prettify2.mode;
  const crlf = prettify2.options.crlf === true ? "\r\n" : "\n";
  let output = prettify2.source;
  if (comment(prettify2) === false) {
    prettify2.stats = time(output.length);
    return output;
  }
  prettify2.data = parser(prettify2);
  if (mode === "parse") {
    prettify2.stats = time(output.length);
    return parse.data;
  }
  output = prettify2.beautify[prettify2.options.lexer](prettify2.options);
  output = prettify2.options.endNewline === true ? output.replace(/\s*$/, crlf) : output.replace(/\s+$/, NIL);
  prettify2.stats = time(output.length);
  prettify2.end = 0;
  prettify2.start = 0;
  return output;
}

// src/prettify.ts
format.before = function(callback) {
  prettify.hooks.before.push(callback);
};
format.after = function(callback) {
  prettify.hooks.after.push(callback);
};
options.listen = function(callback) {
  prettify.hooks.rules.push(callback);
};
defineProperty(format, "stats", {
  get() {
    return prettify.stats;
  }
});
defineProperty(parse2, "stats", {
  get() {
    return prettify.stats;
  }
});
defineProperty(options, "rules", {
  get() {
    return prettify.options;
  }
});
function formatSync(source, rules) {
  prettify.source = source;
  if (typeof rules === "object")
    prettify.options = options(rules);
  if (prettify.hooks.before.length > 0) {
    for (const cb of prettify.hooks.before) {
      if (cb(prettify.options, source) === false)
        return source;
    }
  }
  const output = execute(prettify);
  if (prettify.hooks.after.length > 0) {
    for (const cb of prettify.hooks.after) {
      if (cb.call(parse.data, output, prettify.options) === false)
        return source;
    }
  }
  if (parse.error.length)
    throw new Error(parse.error);
  return output;
}
function format(source, rules) {
  prettify.source = source;
  if (typeof rules === "object")
    prettify.options = options(rules);
  if (prettify.hooks.before.length > 0) {
    for (const cb of prettify.hooks.before) {
      if (cb(prettify.options, source) === false)
        return source;
    }
  }
  const output = execute(prettify);
  if (prettify.hooks.after.length > 0) {
    for (const cb of prettify.hooks.after) {
      if (cb.call(parse.data, output, prettify.options) === false)
        return source;
    }
  }
  return new Promise((resolve, reject) => {
    if (parse.error.length)
      return reject(parse.error);
    return resolve(output);
  });
}
function options(rules) {
  for (const rule of keys(rules)) {
    if (rule in definitions && definitions[rule].lexer === "auto") {
      prettify.options[rule] = rules[rule];
    } else if (rule === "liquid") {
      assign(prettify.options.liquid, rules.liquid);
    } else if (rule === "markup") {
      assign(prettify.options.markup, rules.markup);
    } else if (rule === "script") {
      assign(prettify.options.script, rules.script);
    } else if (rule === "style") {
      assign(prettify.options.style, rules.style);
    } else if (rule === "json") {
      assign(prettify.options.json, rules.json);
    } else if (rule === "grammar") {
      grammar.extend(rules.grammar);
    } else if (rule in prettify.options) {
      prettify.options[rule] = rules[rule];
    }
  }
  if (prettify.hooks.rules.length > 0) {
    for (const cb of prettify.hooks.rules)
      cb(prettify.options);
  }
  return prettify.options;
}
function parse2(source, rules) {
  prettify.source = source;
  prettify.mode = "parse";
  if (typeof rules === "object")
    prettify.options = options(rules);
  const formatted = execute(prettify);
  return new Promise((resolve, reject) => {
    if (parse.error.length)
      return reject(parse.error);
    return resolve(formatted);
  });
}
function parseSync(source, rules) {
  prettify.source = source;
  prettify.mode = "parse";
  if (typeof rules === "object")
    prettify.options = options(rules);
  const parsed = execute(prettify);
  if (parse.error.length)
    throw new Error(parse.error);
  return parsed;
}

module.exports = prettify_exports;
