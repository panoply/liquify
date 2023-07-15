#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../node_modules/.pnpm/ansis@1.5.5/node_modules/ansis/bundle.js
var require_bundle = __commonJS({
  "../../node_modules/.pnpm/ansis@1.5.5/node_modules/ansis/bundle.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var e = (e2) => {
      let [, t2] = /([a-f\d]{3,6})/i.exec(e2) || [], r2 = t2 ? t2.length : 0;
      if (3 === r2)
        t2 = t2[0] + t2[0] + t2[1] + t2[1] + t2[2] + t2[2];
      else if (6 !== r2)
        return [0, 0, 0];
      let n2 = parseInt(t2, 16);
      return [n2 >> 16 & 255, n2 >> 8 & 255, 255 & n2];
    };
    var t = (e2, t2, r2) => t2 > e2 ? t2 : e2 > r2 ? r2 : e2;
    var r = (e2, t2, r2) => {
      if ("" === t2)
        return e2;
      let n2 = e2.indexOf(t2);
      if (n2 < 0)
        return e2;
      let i2 = t2.length, o2 = 0, l2 = "";
      for (; ~n2; )
        l2 += e2.slice(o2, n2) + r2, o2 = n2 + i2, n2 = e2.indexOf(t2, o2);
      return l2 + e2.slice(o2);
    };
    var n = { open: "", close: "" };
    var i = ((e2) => {
      const t2 = (e3) => !!l2.find((t3) => e3.test(t3)), r2 = e2 || ("undefined" != typeof process ? process : {}), { stdout: n2, platform: i2 } = r2, o2 = r2.env || {}, l2 = r2.argv || [], s2 = "FORCE_COLOR" in o2, g2 = o2.FORCE_COLOR, c2 = "true" === g2 || parseInt(g2) > 0, a2 = "NO_COLOR" in o2 || s2 && !c2 || t2(/^-{1,2}(no-color|color=false|color=never)$/), b2 = s2 && c2 || t2(/^-{1,2}(color|color=true|color=always)$/), p2 = n2 && "isTTY" in n2 && /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(o2.TERM);
      return !a2 && (b2 || p2 || "win32" === i2 || "CI" in o2);
    })() ? (e2, t2) => ({ open: `\x1B[${e2}m`, close: `\x1B[${t2}m` }) : () => n;
    var o = (e2, t2, r2) => i(`38;2;${e2};${t2};${r2}`, 39);
    var l = (e2, t2, r2) => i(`48;2;${e2};${t2};${r2}`, 49);
    var s = { visible: n, reset: i(0, 0), inverse: i(7, 27), hidden: i(8, 28), bold: i(1, 22), dim: i(2, 22), faint: i(2, 22), italic: i(3, 23), underline: i(4, 24), doubleUnderline: i(21, 24), strikethrough: i(9, 29), strike: i(9, 29), frame: i(51, 54), encircle: i(52, 54), overline: i(53, 55), black: i(30, 39), red: i(31, 39), green: i(32, 39), yellow: i(33, 39), blue: i(34, 39), magenta: i(35, 39), cyan: i(36, 39), white: i(37, 39), grey: i(90, 39), gray: i(90, 39), blackBright: i(90, 39), redBright: i(91, 39), greenBright: i(92, 39), yellowBright: i(93, 39), blueBright: i(94, 39), magentaBright: i(95, 39), cyanBright: i(96, 39), whiteBright: i(97, 39), bgBlack: i(40, 49), bgRed: i(41, 49), bgGreen: i(42, 49), bgYellow: i(43, 49), bgBlue: i(44, 49), bgMagenta: i(45, 49), bgCyan: i(46, 49), bgWhite: i(47, 49), bgBlackBright: i(100, 49), bgRedBright: i(101, 49), bgGreenBright: i(102, 49), bgYellowBright: i(103, 49), bgBlueBright: i(104, 49), bgMagentaBright: i(105, 49), bgCyanBright: i(106, 49), bgWhiteBright: i(107, 49) };
    var { defineProperty: g, defineProperties: c, setPrototypeOf: a } = Object;
    var b = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
    var p = /(\r*\n)/g;
    var u = function() {
      const t2 = (e2) => e2;
      return t2.strip = (e2) => e2.replace(b, ""), t2.extend = (r2) => {
        for (let t3 in r2) {
          let n2 = r2[t3], i2 = null != n2.open ? n2 : o(...e(n2));
          B[t3] = { get() {
            const e2 = f(this, i2);
            return g(this, t3, { value: e2 }), e2;
          } };
        }
        O = c(() => {
        }, B), a(t2, O);
      }, t2.extend(s), t2;
    };
    var f = ({ props: e2 }, { open: t2, close: r2 }) => {
      const n2 = (e3, ...t3) => d(e3, t3, n2.props);
      let i2 = t2, o2 = r2;
      return void 0 !== e2 && (i2 = e2.openStack + t2, o2 = r2 + e2.closeStack), a(n2, O), n2.props = { open: t2, close: r2, openStack: i2, closeStack: o2, parent: e2 }, n2.open = i2, n2.close = o2, n2;
    };
    var d = (e2, t2, n2) => {
      if (!e2)
        return "";
      const { openStack: i2, closeStack: o2 } = n2;
      let l2 = null != e2.raw ? String.raw(e2, ...t2) : e2;
      if (~l2.indexOf("\x1B"))
        for (; void 0 !== n2; )
          l2 = r(l2, n2.close, n2.open), n2 = n2.parent;
      return ~l2.indexOf("\n") && (l2 = l2.replace(p, o2 + "$1" + i2)), i2 + l2 + o2;
    };
    var h = { ansi: (e2) => ((e3) => i(`38;5;${e3}`, 39))(t(e2, 0, 255)), bgAnsi: (e2) => ((e3) => i(`48;5;${e3}`, 49))(t(e2, 0, 255)), hex: (t2) => o(...e(t2)), bgHex: (t2) => l(...e(t2)), rgb: (e2, r2, n2) => o(t(e2, 0, 255), t(r2, 0, 255), t(n2, 0, 255)), bgRgb: (e2, r2, n2) => l(t(e2, 0, 255), t(r2, 0, 255), t(n2, 0, 255)) };
    var B = {};
    var O;
    for (let e2 in h)
      B[e2] = { get() {
        return (...t2) => f(this, h[e2](...t2));
      } };
    B.ansi256 = B.fg = B.ansi, B.bgAnsi256 = B.bg = B.bgAnsi;
    var x = new u();
    exports.Ansis = u, exports.default = x;
  }
});

// ../../node_modules/.pnpm/ansis@1.5.5/node_modules/ansis/index.js
var require_ansis = __commonJS({
  "../../node_modules/.pnpm/ansis@1.5.5/node_modules/ansis/index.js"(exports, module2) {
    "use strict";
    var bundle = require_bundle();
    module2.exports = bundle.default;
    module2.exports.Ansis = bundle.Ansis;
  }
});

// scripts/shopify-specs.ts
var import_fs = __toESM(require("fs"));
var import_path = require("path");
var import_ansis = __toESM(require_ansis());

// src/liquid/data/standard/export.ts
var export_exports = {};
__export(export_exports, {
  filters: () => filters,
  tags: () => tags
});

// src/liquid/data/standard/filters.ts
var filters = {
  abs: {
    description: "Returns the absolute value of a number",
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/abs/"
    }
  },
  append: {
    description: "Concatenates two strings and returns the concatenated value",
    snippet: "append: '$1' $0",
    arguments: [
      {
        type: "string",
        required: true
      }
    ],
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/append/"
    }
  },
  at_least: {
    description: "Limits a number to a minimum value",
    snippet: "at_least: $1 $0",
    arguments: [
      {
        type: "number",
        required: true
      }
    ],
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/at_least/"
    }
  },
  at_most: {
    description: "Limits a number to a maximum value",
    snippet: "at_most: $1 $0",
    arguments: [
      {
        type: "number",
        required: true
      }
    ],
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/at_most/"
    }
  },
  capitalize: {
    description: "Makes the first character of a string capitalized",
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/capitalize/"
    }
  },
  ceil: {
    description: "Rounds the input up to the nearest whole number. Liquid tries to convert the input to a number before the filter is applied",
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/ceil/"
    }
  },
  compact: {
    description: "Removes any `nil` values from an array",
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/compact/"
    }
  },
  concat: {
    description: "Concatenates (combines) an array with another array. The resulting array contains all the elements of the original arrays",
    snippet: "concat: $1 $0",
    arguments: [
      {
        type: "array",
        required: true
      }
    ],
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/concat/"
    }
  },
  date: {
    description: "Converts a timestamp into another date format. The format for this syntax is the same as `strftime` - The input uses the same format as Ruby\u2019s `Time.parse`",
    snippet: "date: '$1' $0",
    arguments: [
      {
        type: "string",
        required: true
      }
    ],
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/date/"
    }
  },
  default: {
    description: "Allows you to specify a fallback in case a value doesn\u2019t exist. default will show its value if the left side is `nil`, `false`, or `empty`",
    snippet: "default: '$1' $0",
    arguments: [
      {
        type: "any",
        required: true
      },
      {
        type: "parameter",
        value: {
          allow_false: {
            type: "boolean",
            description: "To allow variables to return false instead of the default value, you can use the `allow_false` parameter."
          }
        }
      }
    ],
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/default/"
    }
  },
  divided_by: {
    description: "Divides a number by another number",
    snippet: "divided_by: $1 $0",
    arguments: [
      {
        type: "number",
        required: true
      }
    ],
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/divided_by/"
    }
  },
  downcase: {
    description: "Makes each character in a string lowercase. It has no effect on strings which are already all lowercase",
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/downcase/"
    }
  },
  escape: {
    description: "Escapes a string by replacing characters with escape sequences (so that the string can be used in a URL, for example). It doesn\u2019t change strings that don\u2019t have anything to escape",
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/escape/"
    }
  },
  escape_once: {
    description: "Escapes a string without changing existing escaped entities. It doesn\u2019t change strings that don\u2019t have anything to escape",
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/escape_once/"
    }
  },
  first: {
    description: "Returns the first item of an array.",
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/first/"
    }
  },
  floor: {
    description: "Rounds the input down to the nearest whole number. Liquid tries to convert the input to a number before the filter is applied",
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/floor/"
    }
  },
  join: {
    description: "Joins the elements of an array with the character passed as the parameter. The result is a single string.",
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/join/"
    },
    snippet: "join: '$1' $0",
    arguments: [
      {
        type: "string",
        required: true
      }
    ]
  },
  last: {
    description: "Gets the last element in an array",
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/last/"
    }
  },
  lstrip: {
    description: "Removes all whitespace (tabs, spaces, and newlines) from the left side of a string. It does not affect spaces between words",
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/lstrip/"
    }
  },
  map: {
    description: "Accepts an array element\u2019s attribute as a parameter and creates a string out of each array element\u2019s value.",
    snippet: "map: '$1' $0",
    arguments: [
      {
        type: "string",
        required: true
      }
    ],
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/map/"
    }
  },
  minus: {
    description: "Subtracts a number from another number",
    snippet: "minus: $1 $0",
    arguments: [
      {
        type: "number",
        required: true
      }
    ],
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/minus/"
    }
  },
  modulo: {
    description: "Returns the remainder of a division operation",
    snippet: "modulo: $1 $0",
    arguments: [
      {
        type: "number",
        required: true
      }
    ],
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/modulo/"
    }
  },
  newline_to_br: {
    description: "Replaces every newline in a string with an HTML line break (`<br />`)",
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/newline_to_br/"
    }
  },
  plus: {
    description: "Adds a number to another number",
    snippet: "plus: $1 $0",
    arguments: [
      {
        type: "number",
        required: true
      }
    ],
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/plus/"
    }
  },
  prepend: {
    description: "Adds the specified string to the beginning of another string",
    snippet: "prepend: '$1' $0",
    arguments: [
      {
        type: "string",
        required: true
      }
    ],
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/prepend/"
    }
  },
  remove: {
    description: "Removes every occurrence of the specified substring from a string",
    snippet: "remove: '$1' $0",
    arguments: [
      {
        type: "string",
        required: true
      }
    ],
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/remove/"
    }
  },
  remove_first: {
    description: "Removes only the first occurrence of the specified substring from a string",
    snippet: "remove_first: '$1' $0",
    arguments: [
      {
        type: "string",
        required: true
      }
    ],
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/remove_first/"
    }
  },
  replace: {
    description: "Replaces every occurrence of the first argument in a string with the second argument",
    snippet: "replace: '$1', '$2' $0",
    arguments: [
      {
        type: "string",
        required: true
      },
      {
        type: "string",
        required: true
      }
    ],
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/replace/"
    }
  },
  replace_first: {
    description: "Replaces only the first occurrence of the first argument in a string with the second argument",
    snippet: "replace_first: '$1', '$2' $0",
    arguments: [
      {
        type: "string",
        required: true
      },
      {
        type: "string",
        required: true
      }
    ],
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/replace_first/"
    }
  },
  reverse: {
    description: "Reverses the order of the items in an array. `reverse` cannot reverse a string",
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/reverse/"
    }
  },
  round: {
    description: "Rounds a number to the nearest integer or, if a number is passed as an argument, to that number of decimal places",
    arguments: [
      {
        type: "number",
        required: false
      }
    ],
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/round/"
    }
  },
  rstrip: {
    description: "Removes all whitespace (tabs, spaces, and newlines) from the right side of a string. It does not affect spaces between words",
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/rstrip/"
    }
  },
  size: {
    description: "Returns the number of characters in a string or the number of items in an array",
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/size/"
    }
  },
  slice: {
    description: "Returns a substring of 1 character beginning at the index specified by the first argument. An optional second argument specifies the length of the substring to be returned",
    snippet: "slice: $1 $0",
    arguments: [
      {
        type: "number",
        required: true
      },
      {
        type: "number",
        required: false
      }
    ],
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/slice/"
    }
  },
  sort: {
    description: "Sorts items in an array in case-sensitive order - An optional argument specifies which property of the array\u2019s items to use for sorting",
    arguments: [
      {
        type: "number",
        required: false
      }
    ],
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/sort/"
    }
  },
  sort_natural: {
    description: "Sorts items in an array in case-insensitive order",
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/sort_natural/"
    }
  },
  split: {
    description: "Divides a string into an array using the argument as a separator. split is commonly used to convert comma-separated items from a string to an array",
    snippet: "split: $1",
    arguments: [
      {
        type: "string",
        required: true
      }
    ],
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/split/"
    }
  },
  strip: {
    description: "Removes all whitespace (tabs, spaces, and newlines) from both the left and right sides of a string. It does not affect spaces between words",
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/strip/"
    }
  },
  strip_html: {
    description: "Removes any HTML tags from a string",
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/strip_html/"
    }
  },
  strip_newlines: {
    description: "Removes any newline characters (line breaks) from a string",
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/strip_newlines/"
    }
  },
  times: {
    description: "Multiplies a number by another number",
    snippet: "times: $1 $0",
    arguments: [
      {
        type: "number",
        required: true
      }
    ],
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/times/"
    }
  },
  truncate: {
    description: "Shortens a string down to the number of characters passed as an argument. If the specified number of characters is less than the length of the string, an ellipsis (\u2026) is appended to the string and is included in the character count",
    snippet: "truncate: $1 $0",
    arguments: [
      {
        type: "number",
        required: true
      },
      {
        type: "string",
        required: false
      }
    ],
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/truncate/"
    }
  },
  truncatewords: {
    description: "Shortens a string down to the number of words passed as an argument. If the specified number of words is less than the number of words in the string, an ellipsis (\u2026) is appended to the string",
    snippet: "truncatewords: $1 $0",
    arguments: [
      {
        type: "number",
        required: true
      },
      {
        type: "string",
        required: false
      }
    ],
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/truncatewords/"
    }
  },
  uniq: {
    description: "Removes any duplicate elements in an array",
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/uniq/"
    }
  },
  upcase: {
    description: "Makes each character in a string uppercase. It has no effect on strings which are already all uppercase",
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/upcase/"
    }
  },
  url_decode: {
    description: "Decodes a string that has been encoded as a URL or by `url_encode`",
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/url_decode/"
    }
  },
  url_encode: {
    description: "Converts any URL-unsafe characters in a string into percent-encoded characters",
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/url_encode/"
    }
  },
  where: {
    description: "Creates an array including only the objects with a given property value, or any truthy value by default",
    snippet: "where: '$1'$0",
    arguments: [
      {
        type: "string",
        required: true
      },
      {
        type: "string",
        required: false
      }
    ],
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/filters/where/"
    }
  }
};

// src/liquid/data/standard/tags.ts
var tags = {
  "#": {
    type: "comment",
    description: "Prevents an expression from being rendered or output.",
    snippet: "$1",
    singleton: true,
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.dev/api/liquid/tags#inline_comment"
    }
  },
  assign: {
    type: "variable",
    description: "Creates a new variable.",
    snippet: "$1 = $2",
    filters: true,
    singleton: true,
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/tags/variable/#assign"
    }
  },
  break: {
    type: "iteration",
    singleton: true,
    parents: [
      "for",
      "tablerow"
    ],
    description: "Causes the loop to stop iterating when it encounters the break tag.",
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/tags/iteration/#break"
    }
  },
  capture: {
    type: "variable",
    filters: false,
    description: "Captures the string inside of the opening and closing tags and assigns it to a variable. Variables created through `{% capture %}` are strings.",
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/tags/variable/#capture"
    }
  },
  case: {
    type: "control",
    description: "Creates a switch statement to compare a variable with different values. case initializes the switch statement, and when compares its values.",
    children: ["when", "else"],
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/tags/control-flow/#case"
    }
  },
  comment: {
    type: "comment",
    description: "Allows you to leave un-rendered code inside a Liquid template. Any text within the opening and closing comment blocks will not be output, and any Liquid code within will not be executed.",
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/tags/comment/"
    }
  },
  continue: {
    type: "iteration",
    description: "Causes the loop to skip the current iteration when it encounters the continue tag.",
    singleton: true,
    parents: [
      "for",
      "tablerow"
    ],
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/tags/iteration/#continue"
    }
  },
  cycle: {
    type: "iteration",
    singleton: true,
    description: "Loops through a group of strings and outputs them in the order that they were passed as parameters. Each time cycle is called, the next string that was passed as a parameter is output.",
    parents: ["for", "tablerow"],
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/tags/iteration/#cycle"
    }
  },
  decrement: {
    description: "Creates a new number variable, and decreases its value by one every time it is called. The initial value is -1.",
    singleton: true,
    filters: false,
    type: "variable",
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/tags/variable/#decrement"
    }
  },
  echo: {
    type: "output",
    description: "Using the echo tag is the same as wrapping an expression in curly brackets ({{ and }}). However, unlike the curly bracket method, you can use the echo tag inside liquid tags.",
    singleton: true,
    filters: true,
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/tags/template/#echo"
    }
  },
  else: {
    type: "control",
    description: "Add condition within an if or unless block.",
    singleton: true,
    parents: [
      "if",
      "elsif",
      "case",
      "unless",
      "when",
      "for"
    ],
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/tags/control-flow/#unless"
    }
  },
  elsif: {
    description: "Adds more conditions within an if or unless block.",
    singleton: true,
    type: "control",
    parents: ["if"],
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/tags/control-flow/#unless"
    }
  },
  for: {
    description: "Repeatedly executes a block of code.",
    type: "iteration",
    snippet: "$1 in $2",
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/tags/iteration/#for"
    },
    parameters: {
      offset: {
        type: "number",
        description: "Begins the loop at the specified index"
      },
      limit: {
        type: "number",
        description: "Limits the loop to the specified number of iterations"
      },
      reversed: {
        type: "keyword",
        description: "Reverses the order of the loop. Note that this flag\u2019s spelling is different from the filter reverse"
      }
    }
  },
  if: {
    description: "Executes a block of code only if a certain condition is met.",
    type: "control",
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/tags/control-flow/#if"
    }
  },
  increment: {
    description: "Creates a new number variable, and increases its value by one every time it is called. The initial value is 0.",
    singleton: true,
    filters: false,
    type: "variable",
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/tags/variable/#increment"
    }
  },
  liquid: {
    description: "Encloses multiple tags within one set of delimiters, to allow writing Liquid logic more concisely.",
    type: "unknown",
    singleton: true,
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/tags/template/#liquid"
    }
  },
  raw: {
    type: "raw",
    description: "Allows output of Liquid code on a page without being parsed.",
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/tags/raw/"
    }
  },
  render: {
    description: "Insert the rendered content of another template within the current template.\n\nThe code within the rendered template does not automatically have access to the variables assigned using variable tags within the parent template. Similarly, variables assigned within the rendered template cannot be accessed by code in any other template.",
    snippet: "'$1'",
    filters: false,
    singleton: true,
    type: "import",
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/tags/template/#render"
    }
  },
  tablerow: {
    description: "Generates an HTML `<table>`. Must be wrapped in an opening `<table>` and closing `</table>` HTML tags.",
    type: "iteration",
    parameters: {
      cols: {
        type: "number",
        description: "Defines how many columns the tables should have."
      },
      limit: {
        type: "number",
        description: "Exits the tablerow loop after a specific index."
      },
      offset: {
        type: "number",
        description: "Starts the tablerow loop after a specific index."
      }
    },
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/tags/iteration/#tablerow"
    }
  },
  unless: {
    description: "The opposite of if \u2013 executes a block of code only if a certain condition is not met.",
    type: "control",
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/tags/control-flow/#unless"
    }
  },
  when: {
    description: 'Define the various conditions set by the "{% case %}" tag',
    singleton: true,
    type: "control",
    parents: ["case"],
    reference: {
      name: "Standard Liquid",
      url: "https://shopify.github.io/liquid/tags/control-flow/#casewhen"
    }
  }
};

// src/liquid/data/shopify/export.ts
var export_exports2 = {};
__export(export_exports2, {
  filters: () => filters2,
  objects: () => objects,
  tags: () => tags2
});

// src/liquid/data/shopify/tags.ts
var Tags = {
  form: {
    type: "generator",
    description: "Creates an HTML `<form>` element along with the required `<input>` elements to submit the form to a particular endpoint.",
    arguments: [
      {
        type: "string",
        required: true,
        pattern: /(?:activate_|recover_|reset_|create_)customer_password|contact|guest_login|storefront_password|currency|product|new_comment|(?:create_)?customer(?:_address|_login)?|localization/,
        value: [
          {
            value: "activate_customer_password",
            template: "customer/activate_account",
            description: "Generates a form for activating a customer account on the activate_account.liquid template."
          },
          {
            value: "product",
            description: 'Generates a form for adding a product variant to the cart. Requires a "product" object as a parameter.'
          },
          {
            value: "new_comment",
            template: "article",
            description: "Generates a form for creating a new comment in the article.liquid template. Requires the article object as a parameter."
          },
          {
            description: "Generates a form for creating a new customer account on the register.liquid template.",
            value: "create_customer",
            template: "customer/register"
          },
          {
            value: "customer",
            description: "Generates a form for creating a new customer without registering a new account. This form is useful for collecting customer information when you don't want customers to log in to your store, such as building a list of emails from a newsletter signup."
          },
          {
            value: "customer_address",
            description: "Generates a form for creating or editing customer account addresses on the addresses.liquid template. When creating a new address, include the parameter customer.new_address. When editing an existing address, include the parameter address."
          },
          {
            value: "customer_login",
            description: "Generates a form for logging into Customer Accounts on the login.liquid template.",
            template: "customer/login"
          },
          {
            value: "recover_customer_password",
            description: "Generates a form for recovering a lost password on the login.liquid template.",
            template: "customer/login"
          },
          {
            value: "contact",
            description: "Generates a form for submitting an email through the Liquid contact form"
          },
          {
            value: "reset_customer_password",
            description: "Generates a form on the customers/reset_password.liquid template for a customer to reset their password.",
            template: "customer/login"
          },
          {
            value: "guest_login",
            description: "Generates a form on the login.liquid template that directs customers back to their checkout session as a guest instead of logging in to an account.",
            template: "customer/login"
          },
          {
            value: "localization",
            description: "Generates a form for customers to select their preferred country so they're shown the appropriate language and currency. Inside the form, you can build two different selectors"
          },
          {
            value: "storefront_password",
            description: "Generates a form on the password.liquid template for entering a password-protected storefront."
          },
          {
            value: "currency",
            deprecated: true,
            description: "Generates a form that lets your customer change the currency in your storefront. This form generator is deprecated, use the `localization` form instead."
          }
        ]
      },
      {
        type: "object",
        separator: 44,
        value: {
          product: [
            {
              value: "product",
              description: "The `product` object is required when generating a form for adding a product variant to the cart"
            }
          ],
          new_comment: [
            {
              value: "article",
              description: "The `article` object"
            }
          ],
          customer_address: [
            {
              value: "customer.new_address",
              description: "The `customer.new_address` is required for creating a new address"
            },
            {
              value: "address",
              description: "The `address` is required when editing an existing address"
            }
          ]
        }
      },
      {
        type: "parameter",
        strict: false,
        separator: 44,
        value: {
          id: {
            type: "string",
            description: "Provide a custom HTML attribute `id` value."
          },
          class: {
            type: "string",
            description: "Provide a custom HTML attribute `class`"
          }
        }
      }
    ],
    reference: {
      name: "Shopify Liquid",
      url: "https://shopify.dev/docs/themes/liquid/reference/tags/theme-tags#form"
    }
  },
  include: {
    description: "The include tag has been deprecated because the way that it handles variables reduces performance and makes theme code harder to both read and maintain.",
    filters: false,
    deprecated: true,
    singleton: true,
    type: "import",
    reference: {
      name: "Shopify Liquid",
      url: "https://help.shopify.com/en/themes/liquid/tags/deprecated-tags#include"
    }
  },
  layout: {
    description: `Include "{% layout 'alternate' %}" at the beginning of a template file to use an alternate layout file from the Layout folder of your theme. If you don't define an alternate layout, the theme.liquid template file is used by default:`,
    singleton: true,
    type: "import",
    arguments: [
      {
        type: "string",
        required: true
      }
    ],
    reference: {
      name: "Shopify Liquid",
      url: "https://shopify.dev/api/liquid/tags/theme-tags#layout"
    }
  },
  paginate: {
    type: "iteration",
    description: "Splitting products, blog articles, and search results across multiple pages is a necessary part of theme design as you are limited to 50 results per page in any for loop.",
    arguments: [
      {
        type: "array",
        required: true
      },
      {
        type: "keyword",
        value: "by",
        required: true
      },
      {
        type: "number",
        required: true,
        pattern: [1, 50]
      }
    ],
    reference: {
      name: "Shopify Liquid",
      url: "https://shopify.dev/api/liquid/tags/theme-tags#paginate"
    }
  },
  section: {
    description: "Renders a section from the sections folder of a theme.",
    filters: false,
    singleton: true,
    type: "import",
    arguments: [
      {
        type: "string",
        required: true
      }
    ],
    reference: {
      name: "Shopify Liquid",
      url: "https://shopify.dev/api/liquid/tags/theme-tags#section"
    }
  },
  sections: {
    description: "Renders a [section group](https://shopify.dev/themes/architecture/section-groups). Use this tag to render section groups as part of the theme's layout content. Place the sections tag where you want to render it in the layout.",
    filters: false,
    singleton: true,
    type: "import",
    arguments: [
      {
        type: "string",
        required: true
      }
    ],
    reference: {
      name: "Shopify Liquid",
      url: "https://shopify.dev/api/liquid/tags/theme-tags#sections"
    }
  },
  schema: {
    description: "The schema tag is used by Shopify sections. Each section can have a single schema tag, and schema tags must contain valid JSON. schema tags can be placed anywhere within a section file but cannot be nested inside another Liquid tag.  ",
    filters: false,
    language: "json",
    unique: true,
    type: "embedded",
    reference: {
      name: "Shopify Liquid",
      url: "https://help.shopify.com/en/themes/development/sections#using-section-schema-tags"
    }
  },
  style: {
    type: "embedded",
    description: "The Liquid style tag renders an HTML `<style>` tag with a Shopify data attribute.",
    filters: false,
    language: "css",
    reference: {
      name: "Shopify Liquid",
      url: "https://help.shopify.com/themes/liquid/tags/theme-tags#style"
    }
  },
  stylesheet: {
    type: "embedded",
    description: "The stylesheet tag is used by Shopify sections. Code is concatenated into a single file by Shopify and injected into `{{ content_for_header }}`.",
    filters: false,
    unique: true,
    deprecated: true,
    language: "css",
    arguments: [
      {
        type: "string",
        value: "scss",
        description: "SASS support is used by Shopify sections. Code is concatenated into a single file by Shopify and injected into `{{ content_for_header }}`."
      }
    ],
    reference: {
      name: "Shopify Liquid",
      url: "https://shopify.dev/themes/architecture/sections/section-schema"
    }
  },
  javascript: {
    type: "embedded",
    description: "The javascript tag is used by Shopify sections. Code is concatenated into a single file by Shopify and injected into `{{ content_for_header }}`.",
    filters: false,
    deprecated: true,
    language: "javascript",
    reference: {
      name: "Shopify Liquid",
      url: "https://shopify.dev/themes/architecture/sections/section-assets#javascript"
    }
  }
};

// src/utils/native.ts
var assign = Object.assign;
var isArray = Array.isArray;

// src/liquid/data/shopify/objects.ts
var objects = {
  "media": {
    "summary": "An abstract media object that can represent the following object types:\n\n- [`image`](/docs/api/liquid/objects/image)\n- [`model`](/docs/api/liquid/objects/model)\n- [`video`](/docs/api/liquid/objects/video)\n- [`external_video`](/docs/api/liquid/objects/external_video)",
    "description": "An abstract media object that can represent the following object types:\n\n- [`image`](https://shopify.dev/docs/api/liquid/objects/image)\n- [`model`](https://shopify.dev/docs/api/liquid/objects/model)\n- [`video`](https://shopify.dev/docs/api/liquid/objects/video)\n- [`external_video`](https://shopify.dev/docs/api/liquid/objects/external_video) The `media` object can be returned by the [`product.media` array](https://shopify.dev/docs/api/liquid/objects/product#product-media) or a\n[`file_reference` metafield](https://shopify.dev/apps/metafields/types).\n\nYou can use [media filters](https://shopify.dev/docs/api/liquid/filters/media-filters) to generate URLs and media displays. To learn about how\nto use media in your theme, refer to [Support product media](https://shopify.dev/themes/product-merchandising/media/support-media).\n\n\n\n**Note**\n\n> Each media type has unique properties in addition to the general `media` properties. To learn about these\n> additional properties, refer to the reference for each type.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/media)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "id": {
        "type": "number",
        "description": "The ID of the media. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/media#id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "position": {
        "type": "number",
        "description": "The position of the media in the [`product.media` array](https://shopify.dev/docs/api/liquid/objects/product#product-media). If the source is a [`file_reference` metafield](https://shopify.dev/apps/metafields/types), then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/media#position)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "media_type": {
        "type": "string",
        "description": "The media type. \n\n\n\n#### Filter for media of a specific type\n\nYou can use the `media_type` property with the [`where` filter](/docs/api/liquid/filters/where) to filter the [`product.media` array](/docs/api/liquid/objects/product#product-media) for all media of a desired type.\n\n\n```liquid\n\n{% assign images = product.media | where: 'media_type', 'image' %}\n\n{% for image in images %}\n  {{- image | image_url: width: 300 | image_tag }}\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/media#media_type)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "literal": [
          "image",
          "model",
          "video",
          "external_video"
        ]
      },
      "preview_image": {
        "type": "object",
        "description": "A preview image of the media. \n\n**Note**\n\n> Preview images don't have an ID attribute.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/media#preview_image)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "image"
      },
      "alt": {
        "type": "string",
        "description": "The alt text of the media. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/media#alt)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "address": {
    "summary": "An address, such as a customer address or order shipping address.",
    "description": "An address, such as a customer address or order shipping address. \n\n**Tip**\n\n> Use the [`format_address` filter](https://shopify.dev/docs/api/liquid/filters/format_address) to output an address according to its locale.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "company": {
        "type": "string",
        "description": "The company of the address. If no company is specified, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address#company)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "phone": {
        "type": "string",
        "description": "The phone number of the address. If no phone number is specified, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address#phone)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "first_name": {
        "type": "string",
        "description": "The first name of the address. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address#first_name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "last_name": {
        "type": "string",
        "description": "The last name of the address. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address#last_name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "name": {
        "type": "string",
        "description": "A combination of the first and last names of the address. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address#name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "url": {
        "type": "string",
        "description": "The relative URL for the address. \n\n**Note**\n\n> This only applies to customer addresses.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address#url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "summary": {
        "type": "string",
        "description": "A summary of the address, including the following properties:\n\n- First and last name\n- First and second lines\n- City\n- Province\n- Country \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address#summary)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "id": {
        "type": "number",
        "description": "The ID of the address. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address#id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "address1": {
        "type": "string",
        "description": "The first line of the address. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address#address1)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "address2": {
        "type": "string",
        "description": "The second line of the address. If no second line is specified, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address#address2)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "city": {
        "type": "string",
        "description": "The city of the address. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address#city)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "zip": {
        "type": "string",
        "description": "The zip or postal code of the address. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address#zip)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "country_code": {
        "type": "string",
        "description": "The country of the address in [ISO 3166-1 (alpha 2) format](https://www.iso.org/glossary-for-iso-3166.html). \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address#country_code)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "province_code": {
        "type": "string",
        "description": "The province of the address in [ISO 3166-2 (alpha 2) format](https://www.iso.org/glossary-for-iso-3166.html). \n\n**Note**\n\n> The value doesn't include the preceding [ISO 3166-1](https://www.iso.org/glossary-for-iso-3166.html) country code.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address#province_code)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "country": {
        "type": "object",
        "description": "The country of the address. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address#country)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "country"
      },
      "street": {
        "type": "string",
        "description": "A combination of the first and second lines of the address. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address#street)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "province": {
        "type": "string",
        "description": "The province of the address. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address#province)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "collections": {
    "summary": "All of the [collections](/docs/api/liquid/objects/collection) on a store.",
    "global": true,
    "description": "All of the [collections](https://shopify.dev/docs/api/liquid/objects/collection) on a store. \n\n\n\n#### Iterate over the collections\n\nYou can iterate over `collections` to build a collection list.\n\n\n```liquid\n\n{% for collection in collections %}\n  {{- collection.title | link_to: collection.url }}\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collections)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "array",
    "scope": "collection"
  },
  "pages": {
    "summary": "All of the [pages](/docs/api/liquid/objects/page) on a store.",
    "global": true,
    "description": "All of the [pages](https://shopify.dev/docs/api/liquid/objects/page) on a store. \n\n\n\n#### Example\n\nYou can access a specific page through the `pages` object using the page's [handle](/docs/api/liquid/basics#handles).\n\n\n```liquid\n\n{{ pages.contact.title }}\n{{ pages['about-us'].title }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/pages)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "array",
    "scope": "page"
  },
  "all_products": {
    "summary": "All of the products on a store.",
    "global": true,
    "description": "All of the products on a store. \n\n**Note**\n\n> The `all_products` object has a limit of 20 unique handles per page. If you want more than 20 products,\nthen consider using a collection instead.\n\n#### Example\n\nYou can use `all_products` to access a product by its [handle](/docs/api/liquid/basics#handles). If the product isn't found, then `nil` is returned.\n\n```liquid\n\n{{ all_products['love-potion'].title }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/all_products)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "array",
    "scope": "product"
  },
  "app": {
    "summary": "An app. This object is usually used to access app-specific information for use with [theme app extensions](/apps/online-store/theme-app-extensions).",
    "description": "An app. This object is usually used to access app-specific information for use with [theme app extensions](https://shopify.dev/apps/online-store/theme-app-extensions). \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/app)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "metafields": {
        "type": 22,
        "description": "The [metafields](https://shopify.dev/docs/api/liquid/objects/metafield) that are [owned by the app](https://shopify.dev/apps/metafields/app-owned). \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/app#metafields)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "discount": {
    "summary": "A discount applied to a cart, line item, or order.",
    "deprecated": true,
    "description": "\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F\n\nDeprecated because not all discount types and details are captured.\n\nThe `discount` object has been replaced by the [`discount_allocation`](/docs/api/liquid/objects/discount_allocation) and\n[`discount_application`](/docs/api/liquid/objects/discount_application) objects.\n\n---\n\nA discount applied to a cart, line item, or order. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "amount": {
        "type": "number",
        "description": "The amount of the discount in the currency's subunit. \n\n**Note**\n\n> This is the same value as [`discount.total_amount`](https://shopify.dev/docs/api/liquid/objects/discount#discount-total_amount).\n\nThe value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount#amount)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "deprecated": true
      },
      "total_amount": {
        "type": "number",
        "description": "The amount of the discount in the currency's subunit. \n\n**Note**\n\n> This is the same value as [`discount.amount`](https://shopify.dev/docs/api/liquid/objects/discount#discount-amount).\n\nThe value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount#total_amount)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "deprecated": true
      },
      "code": {
        "type": "string",
        "description": "The customer-facing name of the discount. \n\n**Note**\n\n> This is the same value as [`discount.title`](https://shopify.dev/docs/api/liquid/objects/discount#discount-title).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount#code)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "deprecated": true
      },
      "title": {
        "type": "string",
        "description": "The customer-facing name of the discount. \n\n**Note**\n\n> This is the same value as [`discount.code`](https://shopify.dev/docs/api/liquid/objects/discount#discount-code).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount#title)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "deprecated": true
      },
      "type": {
        "type": "string",
        "description": "The type of the discount. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount#type)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "deprecated": true,
        "literal": [
          "FixedAmountDiscount",
          "PercentageDiscount",
          "ShippingDiscount"
        ]
      },
      "savings": {
        "type": "number",
        "description": "The amount of the discount as a negative value, in the currency's subunit. \n\n**Note**\n\n> This is the same value as [`discount.total_savings`](https://shopify.dev/docs/api/liquid/objects/discount#discount-total_savings).\nThe value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount#savings)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "deprecated": true
      },
      "total_savings": {
        "type": "number",
        "description": "The amount of the discount as a negative value, in the currency's subunit. \n\n**Note**\n\n> This is the same value as [`discount.savings`](https://shopify.dev/docs/api/liquid/objects/discount#discount-savings).\nThe value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount#total_savings)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "deprecated": true
      }
    }
  },
  "articles": {
    "summary": "All of the articles across the blogs in the store.",
    "global": true,
    "description": "All of the articles across the blogs in the store. \n\n\n\n#### Example\n\nYou can use `articles` to access an article by its [handle](/docs/api/liquid/basics#handles).\n\n\n```liquid\n\n{% assign article = articles['potion-notions/new-potions-for-spring'] %}\n{{ article.title | link_to: article.url }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/articles)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "array",
    "scope": "article"
  },
  "article": {
    "summary": "An article, or [blog post](https://help.shopify.com/manual/online-store/blogs/writing-blogs), in a blog.",
    "template": [
      "article"
    ],
    "description": "An article, or [blog post](https://help.shopify.com/manual/online-store/blogs/writing-blogs), in a blog. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "image": {
        "type": "object",
        "description": "The featured image for the article. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article#image)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "image"
      },
      "author": {
        "type": "string",
        "description": "The full name of the author of the article. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article#author)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "metafields": {
        "type": "any",
        "description": "The [metafields](https://shopify.dev/docs/api/liquid/objects/metafield) applied to the article. \n\n**Tip**\n\n> To learn about how to create metafields, refer to [Create and manage metafields](https://shopify.dev/apps/metafields/manage) or visit\n> the [Shopify Help Center](https://help.shopify.com/manual/metafields).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article#metafields)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "handle": {
        "type": "string",
        "description": "The [handle](https://shopify.dev/docs/api/liquid/basics#handles) of the article. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article#handle)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "id": {
        "type": "string",
        "description": "The ID of the article. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article#id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "title": {
        "type": "string",
        "description": "The title of the article. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article#title)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "url": {
        "type": "string",
        "description": "The relative URL of the article. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article#url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "template_suffix": {
        "type": "string",
        "description": "The name of the [custom template](https://shopify.dev/themes/architecture/templates#alternate-templates) assigned to the article. The name doesn't include the `article.` prefix, or the file extension (`.json` or `.liquid`).\n\n If a custom template isn't assigned to the article, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article#template_suffix)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "created_at": {
        "type": "string",
        "description": "A timestamp for when the article was created. \n\n**Tip**\n\n> Use the [`date` filter](https://shopify.dev/docs/api/liquid/filters/date) to format the timestamp.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article#created_at)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "published_at": {
        "type": "string",
        "description": "A timestamp for when the article was published. \n\n**Tip**\n\n> Use the [`date` filter](https://shopify.dev/docs/api/liquid/filters/date) to format the timestamp.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article#published_at)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "updated_at": {
        "type": "string",
        "description": "A timestamp for when the article was updated. \n\n**Tip**\n\n> Use the [`date` filter](https://shopify.dev/docs/api/liquid/filters/date) to format the timestamp.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article#updated_at)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "moderated?": {
        "type": "boolean",
        "description": "Returns `true` if the blog that the article belongs to is set to [moderate comments](https://help.shopify.com/manual/online-store/blogs/managing-comments).\nReturns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article#moderated?)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "comments": {
        "type": "array",
        "description": "The published comments for the article. Returns an empty array if comments are disabled.\n\n\n\n**Tip**\n\n> Use the [paginate](https://shopify.dev/docs/api/liquid/tags/paginate) tag to choose how many comments to show at once, up to a limit of 50.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article#comments)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "comment"
      },
      "comments_count": {
        "type": "number",
        "description": "The number of published comments for the article. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article#comments_count)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "comments_enabled?": {
        "type": "boolean",
        "description": "Returns `true` if comments are enabled. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article#comments_enabled?)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "comment_post_url": {
        "type": "string",
        "description": "The relative URL where POST requests are sent when creating new comments. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article#comment_post_url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "content": {
        "type": "string",
        "description": "The content of the article. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article#content)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "excerpt": {
        "type": "string",
        "description": "The excerpt of the article. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article#excerpt)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "excerpt_or_content": {
        "type": "string",
        "description": "Returns the article [excerpt](https://shopify.dev/docs/api/liquid/objects/article#article-excerpt) if it exists. Returns the article\n[content](https://shopify.dev/docs/api/liquid/objects/article#article-content) if no excerpt exists. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article#excerpt_or_content)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "tags": {
        "type": "array",
        "description": "The tags applied to the article. \n\n\n\n#### Show the total tag count\n\nWhen looping through `article.tags`, you can print how many times a tag is used with `tag.total_count`. This number shows visitors how many blog posts have been tagged with a particular tag.\n\n\n```liquid\n\n{% for tag in article.tags -%}\n  {{ tag }} ({{ tag.total_count }})\n{%- endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article#tags)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "user": {
        "type": "object",
        "description": "The user associated with the author of the article. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article#user)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "user"
      }
    }
  },
  "block": {
    "summary": "The content and settings of a [section block](/themes/architecture/sections/section-schema#blocks).",
    "description": "The content and settings of a [section block](https://shopify.dev/themes/architecture/sections/section-schema#blocks). Sections and blocks are reusable modules of content that make up [templates](https://shopify.dev/themes/architecture/templates).\n\nTo learn more about using blocks, refer to the [Shopify Partners blog](https://www.shopify.com/partners/blog/theme-blocks).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/block)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "description": "The ID of the block. The ID is dynamically generated by Shopify.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/block#id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "settings": {
        "type": "any",
        "description": "The [settings](https://shopify.dev/themes/architecture/sections/section-schema#blocks) of the block. To learn about how to access settings, refer to [Access settings](https://shopify.dev/themes/architecture/settings#access-settings). To learn which input settings can be applied to the `type` property within settings, refer to [Input settings](/themes/architecture/settings/input-settings).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/block#settings)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "type": {
        "type": "string",
        "description": "The type of the block. The type is a free-form string that's defined in the [block's schema](https://shopify.dev/themes/architecture/sections/section-schema#blocks).\nYou can use the type as an identifier. For example, you might display different markup based on the block type.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/block#type)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "shopify_attributes": {
        "type": "string",
        "description": "The data attributes for the block for use in the theme editor. The theme editor's [JavaScript API](https://shopify.dev/themes/architecture/sections/integrate-sections-with-the-theme-editor#section-and-block-javascript-events)\nuses the data attributes to identify blocks and listen for events. No value for `block.shopify_attributes` is returned\noutside the theme editor.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/block#shopify_attributes)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "blogs": {
    "summary": "All of the blogs in the store.",
    "global": true,
    "description": "All of the blogs in the store. \n\n\n\n#### Example\n\nYou can use `blogs` to access a blog by its [handle](/docs/api/liquid/basics#handles).\n\n\n```liquid\n\n{% for article in blogs.potion-notions.articles %}\n  {{- article.title | link_to: article.url }}\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/blogs)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "array",
    "scope": "blog"
  },
  "blog": {
    "summary": "Information about a specific [blog](https://help.shopify.com/manual/online-store/blogs/adding-a-blog) in the store.",
    "template": [
      "blog",
      "article"
    ],
    "description": "Information about a specific [blog](https://help.shopify.com/manual/online-store/blogs/adding-a-blog) in the store. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/blog)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "id": {
        "type": "number",
        "description": "The ID of the blog. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/blog#id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "title": {
        "type": "string",
        "description": "The title of the blog. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/blog#title)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "handle": {
        "type": "string",
        "description": "The [handle](https://shopify.dev/docs/api/liquid/basics#handles) of the blog. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/blog#handle)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "articles": {
        "type": "array",
        "description": "The articles in the blog. \n\n**Tip**\n\n> Use the [paginate](https://shopify.dev/docs/api/liquid/tags/paginate) tag to choose how many articles to show per page, up to a limit of 50.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/blog#articles)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "article"
      },
      "articles_count": {
        "type": "number",
        "description": "The total number of articles in the blog. This total doesn't include hidden articles. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/blog#articles_count)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "metafields": {
        "type": "array",
        "description": "The [metafields](https://shopify.dev/docs/api/liquid/objects/metafield) applied to the blog. \n\n**Tip**\n\n> To learn about how to create metafields, refer to [Create and manage metafields](https://shopify.dev/apps/metafields/manage) or visit\n> the [Shopify Help Center](https://help.shopify.com/manual/metafields).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/blog#metafields)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "metafield"
      },
      "url": {
        "type": "string",
        "description": "The relative URL of the blog. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/blog#url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "template_suffix": {
        "type": "string",
        "description": "The name of the [custom template](https://shopify.dev/themes/architecture/templates#alternate-templates) assigned to the blog. The name doesn't include the `blog.` prefix, or the file extension (`.json` or `.liquid`).\n\n If a custom template isn't assigned to the blog, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/blog#template_suffix)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "all_tags": {
        "type": "array",
        "description": "All of the tags on the articles in the blog. This includes tags of articles that aren't in the current pagination view.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/blog#all_tags)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "tags": {
        "type": "array",
        "description": "A list of all of the tags on all of the articles in the blog.\n\nUnlike [`blog.all_tags`](https://shopify.dev/docs/api/liquid/objects/blog#blog-all_tags), this property only returns tags of articles that are in the\nfiltered view. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/blog#tags)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "comments_enabled?": {
        "type": "boolean",
        "description": "Returns `true` if comments are enabled for the blog. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/blog#comments_enabled?)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "moderated?": {
        "type": "boolean",
        "description": "Returns `true` if the blog is set to\n[moderate comments](https://help.shopify.com/manual/online-store/blogs/managing-comments). Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/blog#moderated?)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "next_article": {
        "type": "object",
        "description": "The next (older) article in the blog. Returns `nil` if there is no next article.\n\nThis property can be used on the [article page](https://shopify.dev/themes/architecture/templates/article) to output `next` links.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/blog#next_article)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "article"
      },
      "previous_article": {
        "type": "object",
        "description": "The previous (newer) article in the blog. Returns `nil` if there is no previous article.\n\nThis property can be used on the [article page](https://shopify.dev/themes/architecture/templates/article) to output `previous` links.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/blog#previous_article)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "article"
      }
    }
  },
  "brand": {
    "summary": "The [brand assets](https://help.shopify.com/manual/promoting-marketing/managing-brand-assets) for the store.",
    "description": "The [brand assets](https://help.shopify.com/manual/promoting-marketing/managing-brand-assets) for the store. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/brand)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "slogan": {
        "type": "string",
        "description": "The slogan for the brand. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/brand#slogan)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "short_description": {
        "type": "string",
        "description": "A short description of the brand. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/brand#short_description)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "favicon_url": {
        "type": "object",
        "description": "The square logo for the brand, resized to 32x32 px. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/brand#favicon_url)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "image"
      },
      "cover_image": {
        "type": "object",
        "description": "The square logo for the brand, resized to 32x32 px. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/brand#cover_image)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "image"
      },
      "logo": {
        "type": "object",
        "description": "The default logo for the brand. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/brand#logo)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "image"
      },
      "square_logo": {
        "type": "object",
        "description": "The square logo for the brand. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/brand#square_logo)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "image"
      },
      "colors": {
        "type": 22,
        "description": "The brand's colors. To learn about how to access brand colors, refer to [`brand_color`](https://shopify.dev/docs/api/liquid/objects/brand_color).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/brand#colors)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "metafields": {
        "type": 22,
        "description": "The social links for the brand. Social links are stored in [metafields](https://shopify.dev/docs/api/liquid/objects/metafield), and can be accessed using the syntax `shop.brand.metafields.social_links.<platform>.value`.\n\n| Platforms |\n| --- |\n| `facebook` |\n| `pinterest` |\n| `instagram` |\n| `tiktok` |\n| `tumblr` |\n| `snapchat` |\n| `vimeo` |\n\n#### Access social links\n\n```liquid\n\n{{ shop.brand.metafields.social_links.twitter.value }}\n{{ shop.brand.metafields.social_links.youtube.value }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/brand#metafields)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "cart": {
    "summary": "A customer\u2019s cart.",
    "global": true,
    "template": [
      "cart"
    ],
    "description": "A customer\u2019s cart. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "requires_shipping": {
        "type": "boolean",
        "description": "Returns `true` if any of the products in the cart require shipping. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart#requires_shipping)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "note": {
        "type": "string",
        "description": 'Additional information captured with the cart. To learn more about capturing cart notes, refer to the [`cart` template](https://shopify.dev/themes/architecture/templates/cart#support-cart-notes-and-attributes).\n\n#### Capture cart notes\n\nTo capture a cart note, include an HTML input such as a `<textarea>` with an attribute of `name="note"` within the cart `<form>`.\n\n```liquid\n<label>Gift note:</label>\n<textarea name="note"></textarea>\n```\n\n> Note:\n> There can only be one instance of `{{ cart.note }}` on the cart page. If there are multiple instances,\n> then the one that comes latest in the Document Object Model (DOM) will be submitted with the form.\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart#note)\n\n\nLast Updated: 6th April 2023\n\n\n'
      },
      "item_count": {
        "type": "number",
        "description": "The number of items in the cart. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart#item_count)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "total_price": {
        "type": "number",
        "description": "The total price of all of the items in the cart in the currency's subunit, after discounts have been applied. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart#total_price)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "checkout_charge_amount": {
        "type": "number",
        "description": "The amount that the customer will be charged at checkout in the currency's subunit. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart#checkout_charge_amount)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "original_total_price": {
        "type": "number",
        "description": "The total price of all of the items in the cart in the currency's subunit, before discounts have been applied. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart#original_total_price)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "items_subtotal_price": {
        "type": "number",
        "description": "The total price of all of the items in the cart in the currency's subunit, after any line item discounts. This\ndoesn't include taxes (unless taxes are included in the prices), cart discounts, or shipping costs. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart#items_subtotal_price)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "total_discount": {
        "type": "number",
        "description": "The total amount of all discounts (the amount saved) for the cart in the currency's subunit. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart#total_discount)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "items": {
        "type": "array",
        "description": "The line items in the cart. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart#items)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "line_item"
      },
      "empty?": {
        "type": "boolean",
        "description": "Returns `true` if there are no items in the cart. Return's `false` if there are. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart#empty?)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "currency": {
        "type": 22,
        "description": "The currency of the cart. If the store uses multi-currency, then this is the same as the customer's local\n(presentment) currency. Otherwise, it's the same as the store currency.\n\n\n\n**Tip**\n\n> You can output the store's available currencies using [`shop.enabled_currencies`](https://shopify.dev/docs/api/liquid/objects/shop#shop-enabled_currencies).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart#currency)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "total_weight": {
        "type": "number",
        "description": "The total weight of all of the items in the cart in grams. \n\n**Tip**\n\n> Use the [`weight_with_unit`](https://shopify.dev/docs/api/liquid/filters/weight_with_unit) filter to format the weight in\n> [the store's format](https://www.shopify.com/admin/settings/general), or override the default unit.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart#total_weight)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "discount_applications": {
        "type": "array",
        "description": "The discount applications for the cart. \n\n\n\n#### Display discount applications\n\n```liquid\n\n{% for discount_application in cart.discount_applications %}\n  Discount name: {{ discount_application.title }}\n  Savings: -{{ discount_application.total_allocated_amount | money }}\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart#discount_applications)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "discount_application"
      },
      "attributes": {
        "type": "any",
        "description": 'Additional attributes entered by the customer with the cart. To learn more about capturing cart attributes, refer to the [`cart` template](https://shopify.dev/themes/architecture/templates/cart#support-cart-notes-and-attributes).\n\n#### Capture cart attributes\n\nTo capture a cart attribute, include an HTML input with an attribute of `name="attributes[attribute-name]"` within the cart `<form>`.\n\n```liquid\n<label>What do you want engraved on your cauldron?</label>\n<input type="text" name="attributes[cauldron-engraving]" value="{{ cart.attributes.cauldron-engraving }}" />\n```\n\n> Tip:\n> You can add a double underscore `__` prefix to an attribute name to make it private. Private attributes behave like other cart attributes, except that they can\'t be read from Liquid or the Ajax API.\n> You can use them for data that doesn\'t affect the page rendering, which allows for more effective page caching.\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart#attributes)\n\n\nLast Updated: 6th April 2023\n\n\n'
      },
      "cart_level_discount_applications": {
        "type": "array",
        "description": "The cart-specific discount applications for the cart. \n\n\n\n#### Display cart-level discount applications\n\n```liquid\n\n{% for discount_application in cart.cart_level_discount_applications %}\n  Discount name: {{ discount_application.title }}\n  Savings: -{{ discount_application.total_allocated_amount | money }}\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart#cart_level_discount_applications)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "discount_application"
      },
      "discounts": {
        "type": "array",
        "description": "\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F\n\nDeprecated because not all discount types and details are available.\n\nThe `cart.discounts` property has been replaced by [`cart.discount_applications`](/docs/api/liquid/objects/cart#cart-discount_applications).\n\n---\n\nThe discounts applied to the cart. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart#discounts)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "discount"
      },
      "taxes_included": {
        "type": "boolean",
        "description": "Returns `true` if taxes are included in the prices of products in the cart. Returns `false` if not. This can be set in a store\u2019s [tax settings](https://www.shopify.com/admin/settings/taxes).\n\nIf the store includes or exclude tax [based on the customer\u2019s country](https://help.shopify.com/manual/taxes/location#include-or-exclude-tax-based-on-your-customers-country),\nthen the value reflects the tax requirements of the customer\u2019s country.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart#taxes_included)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "collection": {
    "summary": "A [collection](https://help.shopify.com/manual/products/collections) in a store.",
    "template": [
      "collection"
    ],
    "description": "A [collection](https://help.shopify.com/manual/products/collections) in a store. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "metafields": {
        "type": "array",
        "description": "The [metafields](https://shopify.dev/docs/api/liquid/objects/metafield) applied to the collection. \n\n**Tip**\n\n> To learn about how to create metafields, refer to [Create and manage metafields](https://shopify.dev/apps/metafields/manage) or visit\n> the [Shopify Help Center](https://help.shopify.com/manual/metafields).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection#metafields)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "metafield"
      },
      "id": {
        "type": "number",
        "description": "The ID of the collection. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection#id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "handle": {
        "type": "string",
        "description": "The [handle](https://shopify.dev/docs/api/liquid/basics#handles) of the collection. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection#handle)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "title": {
        "type": "string",
        "description": "The title of the collection. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection#title)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "description": {
        "type": "string",
        "description": "The description of the collection. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection#description)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "template_suffix": {
        "type": "string",
        "description": "The name of the [custom template](https://shopify.dev/themes/architecture/templates#alternate-templates) assigned to the collection. The name doesn't include the `collection.` prefix, or the file extension (`.json` or `.liquid`).\n\n If a custom template isn't assigned to the collection, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection#template_suffix)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "current_vendor": {
        "type": "string",
        "description": "The vendor name on a vendor collection page. You can query for products from a certain vendor at the `/collections/vendors` URL\nwith a query parameter in the format of `?q=[vendor]`, where `[vendor]` is your desired product vendor.\n\n\n\n**Tip**\n\n> The query value is case-insensitive, so `apparelco` is equivalent to `ApparelCo` or `APPARELCO`.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection#current_vendor)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "current_type": {
        "type": "string",
        "description": "The product type on a product type collection page. You can query for products of a certain type at the `/collections/types` URL\nwith a query parameter in the format of `?q=[type]`, where `[type]` is your desired product type.\n\n\n\n**Tip**\n\n> The query value is case-insensitive, so `shirts` is equivalent to `Shirts` or `SHIRTS`.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection#current_type)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "url": {
        "type": "string",
        "description": "The relative URL of the collection. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection#url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "published_at": {
        "type": "string",
        "description": "A timestamp for when the collection was published. \n\n**Tip**\n\n> Use the [`date` filter](https://shopify.dev/docs/api/liquid/filters/date) to format the timestamp.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection#published_at)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "image": {
        "type": "object",
        "description": "The image for the collection. This image is added on the collection's page in the Shopify admin.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection#image)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "image"
      },
      "sort_options": {
        "type": "array",
        "description": 'The available sorting options for the collection. \n\n\n\n#### Output the sort options\n\n```liquid\n\n{%- assign sort_by = collection.sort_by | default: collection.default_sort_by -%}\n\n<select>\n{%- for option in collection.sort_options %}\n  <option\n    value="{{ option.value }}"\n    {%- if option.value == sort_by %}\n      selected="selected"\n    {%- endif %}\n  >\n    {{ option.name }}\n  </option>\n{% endfor -%}\n</select>\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection#sort_options)\n\n\nLast Updated: 6th April 2023\n\n\n',
        "scope": "sort_option"
      },
      "sort_by": {
        "type": "string",
        "description": "The sort order applied to the collection by the `sort_by` URL parameter. If there's no `sort_by` URL parameter, then the value is `nil`.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection#sort_by)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "default_sort_by": {
        "type": "string",
        "description": "The default sort order of the collection. This is set on the collection's page in the Shopify admin.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection#default_sort_by)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "literal": [
          "manual",
          "best-selling",
          "title-ascending",
          "price-ascending",
          "price-descending",
          "created-ascending",
          "created-descending"
        ]
      },
      "next_product": {
        "type": "object",
        "description": "The next product in the collection. Returns `nil` if there's no next product. This property can be used on the [product page](https://shopify.dev/themes/architecture/templates/product) to output `next` links.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection#next_product)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "product"
      },
      "previous_product": {
        "type": "object",
        "description": "The previous product in the collection. Returns `nil` if there's no previous product. This property can be used on the [product page](https://shopify.dev/themes/architecture/templates/product) to output `previous` links.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection#previous_product)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "product"
      },
      "products_count": {
        "type": "number",
        "description": "The total number of products in the current view of the collection. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection#products_count)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "products": {
        "type": "array",
        "description": "All of the products in the collection. \n\n**Tip**\n\n> Use the [paginate](https://shopify.dev/docs/api/liquid/tags/paginate) tag to choose how many products to show per page, up to a limit of 50.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection#products)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "product"
      },
      "all_products_count": {
        "type": "number",
        "description": "The total number of products in a collection. This includes products that have been filtered out of the current view.\n\n\n\n**Tip**\n\n> To display the number of products in a filtered collection, use [`collection.products_count`](https://shopify.dev/docs/api/liquid/objects/collection#collection-products_count).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection#all_products_count)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "all_tags": {
        "type": "array",
        "description": "All of the tags applied to the products in the collection. This includes tags for products that have been filtered out of the current view.\nA maximum of 1,000 tags can be returned.\n\n\n\n**Tip**\n\n> To display the tags that are currently applied, use [`collection.tags`](https://shopify.dev/docs/api/liquid/objects/collection#collection-tags).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection#all_tags)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "tags": {
        "type": "array",
        "description": "The tags that are currently applied to the collection. This doesn't include tags for products that have been filtered out of the current view.\nReturns `nil` if no tags have been applied, or all products with tags have been filtered out of the current view.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection#tags)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "all_types": {
        "type": "array",
        "description": "All of the product types in a collection. \n\n\n\n#### Create links to product types\n\nUse the [`link_to_type`](/docs/api/liquid/filters/link_to_type) filter to create links to the product types in a collection.\n\n\n```liquid\n\n{% for product_type in collection.all_types -%}\n  {{- product_type | link_to_type }}\n{%- endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection#all_types)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "all_vendors": {
        "type": "array",
        "description": "All of the product vendors in a collection. \n\n\n\n#### Create links to vendors\n\nUse the [`link_to_vendor`](/docs/api/liquid/filters/link_to_vendor) filter to create links to the vendors in a collection.\n\n\n```liquid\n\n{% for product_vendor in collection.all_vendors %}\n  {{- product_vendor | link_to_vendor }}\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection#all_vendors)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "filters": {
        "type": "array",
        "description": "The [storefront filters](https://help.shopify.com/manual/online-store/themes/customizing-themes/storefront-filters) that\nhave been set up on the collection. Only filters relevant to the current collection are returned. Filters will be empty for collections that contain over 1000 products.\n\nTo learn about supporting filters in your theme, refer to [Support storefront filtering](https://shopify.dev/themes/navigation-search/filtering/storefront-filtering/support-storefront-filtering).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection#filters)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "filter"
      },
      "featured_image": {
        "type": "object",
        "description": "The featured image for the collection. The default is the [collection image](https://shopify.dev/docs/api/liquid/objects/collection#collection-image). If this image isn't available, then\nShopify falls back to the featured image of the first product in the collection. If the first product in the collection\ndoesn't have a featured image, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection#featured_image)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "image"
      }
    }
  },
  "brand_color": {
    "summary": "The colors defined as part of a store's [brand assets](https://help.shopify.com/manual/promoting-marketing/managing-brand-assets).",
    "description": "The colors defined as part of a store's [brand assets](https://help.shopify.com/manual/promoting-marketing/managing-brand-assets). \n\n\n\n#### Example\n\nTo access a brand color, specify the following:\n- The brand color group: either `primary` or `secondary`\n- The color role: Whether the color is a `background` or `foreground` (contrasting) color\n- The 0-based index of the color within the group and role\n\n\n```liquid\n\n{{ shop.brand.colors.primary[0].background }}\n{{ shop.brand.colors.primary[0].foreground }}\n{{ shop.brand.colors.secondary[0].background }}\n{{ shop.brand.colors.secondary[1].background }}\n{{ shop.brand.colors.secondary[0].foreground }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/brand_color)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "string",
    "const": true
  },
  "color": {
    "summary": "A color from a [`color` setting](/themes/architecture/settings/input-settings#color).",
    "description": "A color from a [`color` setting](https://shopify.dev/themes/architecture/settings/input-settings#color). \n\n**Tip**\n\n> Use [color filters](https://shopify.dev/docs/api/liquid/filters/color-filters) to modify or extract properties of a `color` object.\n\n#### Referencing color settings directly\n\nWhen a color setting is referenced directly, the hexidecimal color code is returned.\n\n\n```liquid\n\n{{ settings.colors_accent_2 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/color)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "red": {
        "type": "number",
        "description": "The red component of the color, which is a number between 0 and 255. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/color#red)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "green": {
        "type": "number",
        "description": "The green component of the color, which is a number between 0 and 255. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/color#green)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "blue": {
        "type": "number",
        "description": "The blue component of the color, which is a number between 0 and 255. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/color#blue)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "rgb": {
        "type": "string",
        "description": "The red, green, and blue values of the color, represented as a space-separated string. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/color#rgb)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "rgba": {
        "type": "string",
        "description": "The red, green, blue, and alpha values of the color, represented as a\nspace-separated string, with a slash before the alpha channel. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/color#rgba)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "hue": {
        "type": "number",
        "description": "The hue component of the color, which is a number between 0 and 360. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/color#hue)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "saturation": {
        "type": "number",
        "description": "The saturation component of the color, which is a number between 0 and 100. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/color#saturation)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "lightness": {
        "type": "number",
        "description": "The lightness component of the color, which is a number between 0 and 100. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/color#lightness)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "alpha": {
        "type": "number",
        "description": "The alpha component of the color, which is a decimal number between 0.0 and 1.0. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/color#alpha)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "color_scheme": {
    "summary": "A color_scheme from a [`color_scheme` setting](/themes/architecture/settings/input-settings#color_scheme).",
    "description": "A color_scheme from a [`color_scheme` setting](https://shopify.dev/themes/architecture/settings/input-settings#color_scheme). \n\n**Tip**\n\n> To learn about color scheme groups in themes, refer to [`color_scheme_group` setting](https://shopify.dev/themes/architecture/settings/input-settings#color_scheme_group).\n\n#### Referencing color_scheme settings directly\n\nWhen a color_scheme setting is referenced directly, the color scheme ID is returned.\n\n\n```liquid\n\n{{ settings.card_color_scheme }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/color_scheme)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "description": "The ID of the color_scheme \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/color_scheme#id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "settings": {
        "type": "any",
        "description": "The [settings](https://shopify.dev/docs/themes/architecture/settings/input-settings#color_scheme_group) of the color_scheme. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/color_scheme#settings)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "color_scheme_group": {
    "summary": "A color_scheme_group from a [`color_scheme_group` setting](/themes/architecture/settings/input-settings#color_scheme_group).",
    "description": "A color_scheme_group from a [`color_scheme_group` setting](https://shopify.dev/themes/architecture/settings/input-settings#color_scheme_group). \n\n**Tip**\n\n> To learn about color schemes in themes, refer to [`color_scheme` setting](https://shopify.dev/themes/architecture/settings/input-settings#color_scheme).\n\n#### Referencing color_scheme_group settings directly\n\n```liquid\n\n{% for scheme in settings.color_schemes %}\n  .color-{{ scheme.id }} {\n    --color-background: {{ scheme.settings.background }};\n    --color-text: {{ scheme.settings.text }};\n  }\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/color_scheme_group)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "const": true
  },
  "company_address": {
    "summary": "The address of a company location.",
    "description": "The address of a company location. To learn about B2B in themes, refer to [Support B2B customers in your theme](https://shopify.dev/themes/pricing-payments/b2b).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_address)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "attention": {
        "type": "string",
        "description": "The attention line of the address. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_address#attention)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "id": {
        "type": "number",
        "description": "The ID of the address. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_address#id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "address1": {
        "type": "string",
        "description": "The first line of the address. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_address#address1)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "address2": {
        "type": "string",
        "description": "The second line of the address. If no second line is specified, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_address#address2)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "city": {
        "type": "string",
        "description": "The city of the address. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_address#city)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "zip": {
        "type": "string",
        "description": "The zip or postal code of the address. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_address#zip)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "country_code": {
        "type": "string",
        "description": "The country of the address in [ISO 3166-1 (alpha 2) format](https://www.iso.org/glossary-for-iso-3166.html). \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_address#country_code)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "province_code": {
        "type": "string",
        "description": "The province of the address in [ISO 3166-2 (alpha 2) format](https://www.iso.org/glossary-for-iso-3166.html). \n\n**Note**\n\n> The value doesn't include the preceding [ISO 3166-1](https://www.iso.org/glossary-for-iso-3166.html) country code.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_address#province_code)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "country": {
        "type": "object",
        "description": "The country of the address. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_address#country)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "country"
      },
      "street": {
        "type": "string",
        "description": "A combination of the first and second lines of the address. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_address#street)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "province": {
        "type": "string",
        "description": "The province of the address. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_address#province)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "company": {
    "summary": "A company that a [customer](/docs/api/liquid/objects/customer) is purchasing for.",
    "description": "A company that a [customer](https://shopify.dev/docs/api/liquid/objects/customer) is purchasing for. To learn about B2B in themes, refer to [Support B2B customers in your theme](https://shopify.dev/themes/pricing-payments/b2b).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "id": {
        "type": "number",
        "description": "The ID of the company. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company#id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "name": {
        "type": "string",
        "description": "The name of the company. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company#name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "available_locations": {
        "type": "array",
        "description": "The company locations that the current customer has access to, or can interact with. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company#available_locations)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "company_location"
      }
    }
  },
  "company_location": {
    "summary": "A location of the [company](/docs/api/liquid/objects/company) that a [customer](/docs/api/liquid/objects/customer) is purchasing for.",
    "description": "A location of the [company](https://shopify.dev/docs/api/liquid/objects/company) that a [customer](https://shopify.dev/docs/api/liquid/objects/customer) is purchasing for. To learn about B2B in themes, refer to [Support B2B customers in your theme](https://shopify.dev/themes/pricing-payments/b2b).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_location)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "id": {
        "type": "number",
        "description": "The ID of the location. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_location#id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "name": {
        "type": "string",
        "description": "The name of the location. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_location#name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "url_to_set_as_current": {
        "type": "string",
        "description": "The URL to set the location as the current location for the customer. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_location#url_to_set_as_current)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "current?": {
        "type": "boolean",
        "description": "Returns `true` if the location is currently selected. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_location#current?)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "company": {
        "type": "object",
        "description": "The company that the location is associated with. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_location#company)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "company"
      },
      "shipping_address": {
        "type": "object",
        "description": "The address of the location. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_location#shipping_address)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "company_address"
      },
      "tax_registration_id": {
        "type": "number",
        "description": "The tax ID of the location. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_location#tax_registration_id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "content_for_header": {
    "summary": "Dynamically returns all scripts required by Shopify.",
    "global": true,
    "description": "Dynamically returns all scripts required by Shopify. Include the `content_for_header` object in your [layout files](https://shopify.dev/themes/architecture/layouts) between the `<head>` and\n`</head>` HTML tags.\n\nYou shouldn't try to modify or parse the `content_for_header` object because the contents are subject to change, which can\nchange the behaviour of your code.\n\n\n\n**Note**\n\n> The `content_for_header` object is required in `theme.liquid`.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/content_for_header)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "const": true
  },
  "country": {
    "summary": "A country supported by the store's localization options.",
    "description": "A country supported by the store's localization options. To learn how to use the `country` object to offer localization options in your theme,\nrefer to [Support multiple currencies and languages](https://shopify.dev/themes/internationalization/multiple-currencies-languages).\n\n#### Referencing the `country` object directly\n\nWhen the country object is referenced directly, `country.name` is returned.\n\n\n```liquid\n\n{% for country in localization.available_countries -%}\n  {{ country }}\n{%- endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/country)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "description": "The name of the country. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/country#name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "iso_code": {
        "type": "string",
        "description": "The ISO code of the country in [ISO 3166-1 (alpha 2) format](https://www.iso.org/glossary-for-iso-3166.html). \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/country#iso_code)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "unit_system": {
        "type": "string",
        "description": "The unit system of the country. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/country#unit_system)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "literal": [
          "imperial",
          "metric"
        ]
      },
      "currency": {
        "type": "object",
        "description": "The currency used in the country. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/country#currency)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "currency"
      },
      "market": {
        "type": "object",
        "description": "The market that includes this country. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/country#market)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "market"
      }
    }
  },
  "currency": {
    "summary": "Information about a currency, like the ISO code and symbol.",
    "description": "Information about a currency, like the ISO code and symbol. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/currency)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "iso_code": {
        "type": "string",
        "description": "The [ISO code](https://www.iso.org/iso-4217-currency-codes.html) of the currency. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/currency#iso_code)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "symbol": {
        "type": "string",
        "description": "The symbol of the currency. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/currency#symbol)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "name": {
        "type": "string",
        "description": "The name of the currency. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/currency#name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "customer": {
    "summary": "A [customer](https://help.shopify.com/manual/customers) of the store.",
    "global": true,
    "template": [
      "customers/account",
      "customers/addresses",
      "customers/order"
    ],
    "description": "A [customer](https://help.shopify.com/manual/customers) of the store. The `customer` object is directly accessible globally when a customer is logged in to their account. It's also defined in\nthe following contexts:\n\n- The [`customers/account` template](https://shopify.dev/themes/architecture/templates/customers-account)\n- The [`customers/addresses` template](https://shopify.dev/themes/architecture/templates/customers-addresses)\n- The [`customers/order` template](https://shopify.dev/themes/architecture/templates/customers-order)\n- When accessing [`checkout.customer`](https://shopify.dev/docs/api/liquid/objects/checkout#checkout-customer)\n- When accessing [`gift_card.customer`](https://shopify.dev/docs/api/liquid/objects/gift_card#gift_card-customer)\n- When accessing [`order.customer`](https://shopify.dev/docs/api/liquid/objects/order#order-customer)\n\nOutside of the above contexts, if the customer isn't logged into their account, the `customer` object returns `nil`.\n\n#### Check whether the `customer` object is defined\n\nWhen using the `customer` object outside of customer-specific templates or objects that specifically return a customer, you should check whether the `customer` object is defined.\n\n\n```liquid\n\n{% if customer %}\n  Hello, {{ customer.first_name }}!\n{% endif %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "first_name": {
        "type": "string",
        "description": "The first name of the customer. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer#first_name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "last_name": {
        "type": "string",
        "description": "The last name of the customer. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer#last_name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "orders_count": {
        "type": "number",
        "description": "The total number of orders that the customer has placed. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer#orders_count)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "total_spent": {
        "type": "number",
        "description": "The total amount that the customer has spent on all orders in the currency's subunit. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer#total_spent)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "orders": {
        "type": "array",
        "description": "All of the orders placed by the customer. \n\n**Tip**\n\n> Use the [paginate](https://shopify.dev/docs/api/liquid/tags/paginate) tag to choose how many orders to show at once, up to a limit of 20.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer#orders)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "order"
      },
      "last_order": {
        "type": "object",
        "description": "The last order placed by the customer, not including test orders. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer#last_order)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "order"
      },
      "name": {
        "type": "string",
        "description": "The full name of the customer. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer#name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "email": {
        "type": "string",
        "description": "The email of the customer. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer#email)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "phone": {
        "type": "string",
        "description": "The phone number of the customer. This phone number is only populated if the customer checks out using a phone number during checkout, opts in to SMS\nnotifications, or if the merchant has manually entered it.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer#phone)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "has_account": {
        "type": "boolean",
        "description": "Returns `true` if the email associated with the customer is tied to a\n[customer account](https://help.shopify.com/manual/customers/customer-accounts). Returns `false` if not. A customer can complete a checkout without making an account with the store. If the customer\ndoesn't have an account with the store, then `customer.has_account` is `false` at checkout.\n\nDuring the checkout process, if the customer has an account with the store and enters an email associated\nwith an account, then `customer.has_account` is `true`. The email is associated with the account regardless\nof whether the customer has logged into their account.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer#has_account)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "accepts_marketing": {
        "type": "boolean",
        "description": "Returns `true` if the customer accepts marketing. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer#accepts_marketing)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "id": {
        "type": "number",
        "description": "The ID of the customer. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer#id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "tags": {
        "type": "array",
        "description": "The tags associated with the customer. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer#tags)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "default_address": {
        "type": "object",
        "description": "The default address of the customer. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer#default_address)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "address"
      },
      "addresses": {
        "type": "array",
        "description": "All of the addresses associated with the customer. \n\n**Tip**\n\n> Use the [paginate](https://shopify.dev/docs/api/liquid/tags/paginate) tag to choose how many addresses to show at once, up to a limit of 20.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer#addresses)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "address"
      },
      "addresses_count": {
        "type": "number",
        "description": "The number of addresses associated with the customer. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer#addresses_count)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "tax_exempt": {
        "type": "boolean",
        "description": "Returns `true` if the customer is exempt from taxes. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer#tax_exempt)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "b2b?": {
        "type": "boolean",
        "description": "Returns `true` if the customer is a B2B customer. Returns `false` if not. To learn about B2B in themes, refer to [Support B2B customers in your theme](https://shopify.dev/themes/pricing-payments/b2b).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer#b2b?)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "company_available_locations": {
        "type": "array",
        "description": "The company locations that the customer has access to, or can interact with. To learn about B2B in themes, refer to [Support B2B customers in your theme](https://shopify.dev/themes/pricing-payments/b2b).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer#company_available_locations)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "company_location"
      },
      "current_location": {
        "type": "object",
        "description": "The currently selected company location. To learn about B2B in themes, refer to [Support B2B customers in your theme](https://shopify.dev/themes/pricing-payments/b2b).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer#current_location)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "company_location"
      },
      "current_company": {
        "type": "object",
        "description": "The company that the customer is purchasing for. To learn about B2B in themes, refer to [Support B2B customers in your theme](https://shopify.dev/themes/pricing-payments/b2b).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer#current_company)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "company"
      }
    }
  },
  "discount_allocation": {
    "summary": "Information about how a discount affects an item.",
    "description": "Information about how a discount affects an item. To learn about how to display discounts in your theme, refer to [Discounts](https://shopify.dev/themes/pricing-payments/discounts).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount_allocation)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "discount_application": {
        "type": "object",
        "description": "The discount application that applies the discount to the item. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount_allocation#discount_application)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "discount_application"
      },
      "amount": {
        "type": "number",
        "description": "The amount that the item is discounted by in the currency's subunit. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount_allocation#amount)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "discount_application": {
    "summary": "Information about the intent of a discount.",
    "description": "Information about the intent of a discount. To learn about how to display discounts in your theme, refer to [Discounts](https://shopify.dev/themes/pricing-payments/discounts).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount_application)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "total_allocated_amount": {
        "type": "number",
        "description": "The total amount of the discount in the currency's subunit. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount_application#total_allocated_amount)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "title": {
        "type": "string",
        "description": "The customer-facing name of the discount. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount_application#title)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "value": {
        "type": "number",
        "description": "The value of the discount. How this value is interpreted depends on the [value type](https://shopify.dev/docs/api/liquid/objects/discount_application#discount_application-value_type) of the\ndiscount. The following table outlines what the value represents for each value type:\n\n| Value type | Value |\n| --- | --- |\n| `fixed_amount` | The amount of the discount in the currency's subunit. |\n| `percentage` | The percent amount of the discount. |\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount_application#value)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "target_selection": {
        "type": "string",
        "description": "The selection method for line items or shipping lines to be discounted. \n\n**Note**\n\n> Whether the selection method applies to line items or shipping lines depends on the discount's\n> [target type](https://shopify.dev/docs/api/liquid/objects/discount_application#discount_application-target_type).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount_application#target_selection)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "literal": [
          "all",
          "entitled",
          "explicit"
        ]
      },
      "type": {
        "type": "string",
        "description": "The type of the discount. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount_application#type)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "literal": [
          "automatic",
          "discount_code",
          "manual",
          "script"
        ]
      },
      "value_type": {
        "type": "string",
        "description": "The value type of the discount. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount_application#value_type)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "literal": [
          "fixed_amount",
          "percentage"
        ]
      },
      "target_type": {
        "type": "string",
        "description": "The type of item that the discount applies to. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount_application#target_type)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "literal": [
          "line_item",
          "shipping_line"
        ]
      }
    }
  },
  "external_video": {
    "summary": "Information about an external video from YouTube or Vimeo.",
    "description": "Information about an external video from YouTube or Vimeo. \n\n**Tip**\n\n> Use the [`external_video_tag` filter](https://shopify.dev/docs/api/liquid/filters/external_video_tag) to output the video in an\n> HTML `<iframe>` tag. Use the [`external_video_url` filter](https://shopify.dev/docs/api/liquid/filters/external_video_url) to specify parameters\n> for the external video player.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/external_video)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "external_id": {
        "type": "string",
        "description": "The ID of the video from its external source. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/external_video#external_id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "aspect_ratio": {
        "type": "number",
        "description": "The aspect ratio of the video as a decimal. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/external_video#aspect_ratio)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "host": {
        "type": "string",
        "description": "The service that hosts the video. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/external_video#host)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "literal": [
          "youtube",
          "vimeo"
        ]
      },
      "alt": {
        "type": "string",
        "description": "The alt text of the external video. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/external_video#alt)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "id": {
        "type": "number",
        "description": "The ID of the external video. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/external_video#id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "media_type": {
        "type": "string",
        "description": "The media type of the external video. Always returns `external_video`. \n\n\n\n#### Filter for media of a specific type\n\nYou can use the `media_type` property with the [`where` filter](/docs/api/liquid/filters/where) to filter the [`product.media` array](/docs/api/liquid/objects/product#product-media) for all media of a desired type.\n\n\n```liquid\n\n{% assign external_videos = product.media | where: 'media_type', 'external_video' %}\n\n{% for external_video in external_videos %}\n  {{- external_video | external_video_tag }}\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/external_video#media_type)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "position": {
        "type": "number",
        "description": "The position of the external video in the [`product.media`](https://shopify.dev/docs/api/liquid/objects/product#product-media) array. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/external_video#position)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "preview_image": {
        "type": "object",
        "description": "A preview image of the media. \n\n**Note**\n\n> Preview images don't have an ID attribute.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/external_video#preview_image)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "image"
      }
    }
  },
  "filter": {
    "summary": "A [storefront filter](https://help.shopify.com/manual/online-store/themes/customizing-themes/storefront-filters).",
    "description": "A [storefront filter](https://help.shopify.com/manual/online-store/themes/customizing-themes/storefront-filters). To learn about supporting filters in your theme, refer to [Support storefront filtering](https://shopify.dev/themes/navigation-search/filtering/storefront-filtering/support-storefront-filtering).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "param_name": {
        "type": "string",
        "description": "The URL parameter for the filter. For example, `filter.v.option.color`. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter#param_name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "label": {
        "type": "string",
        "description": "The customer-facing label for the filter. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter#label)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "type": {
        "type": "string",
        "description": "The type of the filter. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter#type)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "literal": [
          "boolean",
          "list",
          "price_range"
        ]
      },
      "active_values": {
        "type": "array",
        "description": "The values of the filter that are currently active.\n\nThe array can have values only for `boolean` and `list` type filters. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter#active_values)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "filter_value"
      },
      "inactive_values": {
        "type": "array",
        "description": "The values of the filter that are currently inactive. The array can have values only for `boolean` and `list` type filters.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter#inactive_values)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "filter_value"
      },
      "values": {
        "type": "array",
        "description": "The values of the filter.\n\nThe array can have values only for `boolean` and `list` type filters. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter#values)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "filter_value"
      },
      "false_value": {
        "type": "object",
        "description": "The `false` filter value.\n\nReturns a value only for `boolean` type filters. Returns `nil` for other types. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter#false_value)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "filter_value"
      },
      "true_value": {
        "type": "object",
        "description": "The `true` filter value.\n\nReturns a value only for `boolean` type filters. Returns `nil` for other types. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter#true_value)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "filter_value"
      },
      "max_value": {
        "type": "object",
        "description": "The highest filter value.\n\nReturns a value only for `price_range` type filters. Returns `nil` for other types. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter#max_value)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "filter_value"
      },
      "min_value": {
        "type": "object",
        "description": "The lowest filter value.\n\nReturns a value only for `price_range` type filters. Returns `nil` for other types. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter#min_value)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "filter_value"
      },
      "range_max": {
        "type": "number",
        "description": "The highest product price within the collection or search results.\n\nReturns a value only for `price_range` type filters. Returns `nil` for other types. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter#range_max)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "url_to_remove": {
        "type": "string",
        "description": "The current page URL with the URL parameter related to the filter removed. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter#url_to_remove)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "filter_value": {
    "summary": "A specific value of a filter.",
    "description": "A specific value of a filter. To learn about supporting filters in your theme, refer to [Support storefront filtering](https://shopify.dev/themes/navigation-search/filtering/storefront-filtering/support-storefront-filtering).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter_value)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "param_name": {
        "type": "string",
        "description": "The URL parameter for the parent filter of the filter value. For example, `filter.v.option.color`.\n\nFilters of type `price_range` include an extra component depending on whether the filter value is for the filter's\n`min_value` or `max_value`. The following table outlines the URL parameter for each:\n\n| Value type | URL parameter |\n| --- | --- |\n| `min_value` | `filter.v.price.lte` |\n| `max_value` | `filter.v.price.gte` |\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter_value#param_name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "value": {
        "type": "string",
        "description": "The value. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter_value#value)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "active": {
        "type": "boolean",
        "description": "Returns `true` if the value is currently active. Returns `false` if not.\n\nCan only return `true` for filters of type `boolean` or `list`. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter_value#active)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "count": {
        "type": "number",
        "description": "The number of results related to the filter value.\n\nReturns a value only for `boolean` and `list` type filters. Returns `nil` for `price_range` type filters. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter_value#count)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "label": {
        "type": "string",
        "description": "The customer-facing label for the filter value. For example, `Red` or `Rouge`.\n\nReturns a value only for `boolean` and `list` type filters. Returns `nil` for `price_range` type filters. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter_value#label)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "url_to_add": {
        "type": "string",
        "description": "The current page URL with the filter value parameter added. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter_value#url_to_add)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "url_to_remove": {
        "type": "string",
        "description": "The current page URL with the filter value parameter removed. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter_value#url_to_remove)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "focal_point": {
    "summary": "The focal point for an image.",
    "description": "The focal point for an image. The focal point will remain visible when the image is cropped by the\ntheme. [Learn more about supporting focal points in your theme](https://shopify.dev/themes/architecture/settings/input-settings#image-focal-points).\n\n\n\n**Tip**\n\n> Use the [`image_tag`](https://shopify.dev/docs/api/liquid/filters/image_tag) filter to automatically apply focal point settings to an\n> image on the storefront. This applies the focal point using the `object-position` CSS property.\n\n#### Referencing the `focal_point` object directly\n\nWhen a `focal_point` object is referenced directly, the coordinates are returned as a string, in the format `X% Y%`.\n\n\n```liquid\n\n{{ images['potions-header.png'].presentation.focal_point }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/focal_point)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "x": {
        "type": "number",
        "description": "The horizontal position of the focal point, as a percent of the image width. Returns `50` if no focal point is set. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/focal_point#x)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "y": {
        "type": "number",
        "description": "The vertical position of the focal point, as a percent of the image height. Returns `50` if no focal point is set. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/focal_point#y)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "font": {
    "summary": "A font from a [`font_picker` setting](/themes/architecture/settings/input-settings#font_picker).",
    "description": "A font from a [`font_picker` setting](https://shopify.dev/themes/architecture/settings/input-settings#font_picker). You can use the `font` object in Liquid [assets](https://shopify.dev/themes/architecture#assets) or inside a [`style` tag](https://shopify.dev/docs/api/liquid/tags/style)\nto apply font setting values to theme CSS.\n\n\n\n**Tip**\n\n> Use [font filters](https://shopify.dev/docs/api/liquid/filters/font-filters) to modify properties of the `font` object, load the font,\n> or obtain font variants.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/font)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "family": {
        "type": "string",
        "description": "The family name of the font. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/font#family)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "fallback_families": {
        "type": "string",
        "description": "The fallback families of the font. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/font#fallback_families)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "baseline_ratio": {
        "type": "number",
        "description": "The baseline ratio of the font as a decimal. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/font#baseline_ratio)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "weight": {
        "type": "number",
        "description": "The weight of the font. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/font#weight)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "style": {
        "type": "string",
        "description": "The style of the font. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/font#style)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "variants": {
        "type": "array",
        "description": "The variants in the family of the font. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/font#variants)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "font"
      },
      "system?": {
        "type": "boolean",
        "description": "Returns `true` if the font is a system font. Returns `false` if not. \n\n**Tip**\n\n> You can use this property to determine whether you need to include a corresponding [font-face](https://shopify.dev/docs/api/liquid/filters/font_face)\n> declaration for the font.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/font#system?)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "form": {
    "summary": "Information about a form created by a [`form` tag](/docs/api/liquid/tags/form).",
    "description": "Information about a form created by a [`form` tag](https://shopify.dev/docs/api/liquid/tags/form). \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "errors": {
        "type": "object",
        "description": "Any errors from the form. If there are no errors, then `nil` is returned.\n\n\n\n**Tip**\n\n> You can apply the [`default_errors` filter](https://shopify.dev/docs/api/liquid/filters/default_errors) to `form.errors` to output default\n> error messages without having to loop through the array.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form#errors)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "form_errors"
      },
      "address1": {
        "type": "string",
        "description": "The first address line associated with the address. This property is exclusive to the [`customer_address` form](https://shopify.dev/docs/api/liquid/tags/form#form-customer_address).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form#address1)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "address2": {
        "type": "string",
        "description": "The second address line associated with the address. This property is exclusive to the [`customer_address` form](https://shopify.dev/docs/api/liquid/tags/form#form-customer_address).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form#address2)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "author": {
        "type": "string",
        "description": "The name of the author of the article comment. This property is exclusive to the [`new_comment` form](https://shopify.dev/docs/api/liquid/tags/form#form-new_comment).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form#author)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "body": {
        "type": "string",
        "description": "The content of the contact submission or article comment. This property is exclusive to the [`contact`](https://shopify.dev/docs/api/liquid/tags/form#form-contact) and [`new_comment`](https://shopify.dev/docs/api/liquid/tags/form#form-new_comment)\nforms.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form#body)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "city": {
        "type": "string",
        "description": "The city associated with the address. This property is exclusive to the [`customer_address` form](https://shopify.dev/docs/api/liquid/tags/form#form-customer_address).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form#city)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "company": {
        "type": "string",
        "description": "The company associated with the address. This property is exclusive to the [`customer_address` form](https://shopify.dev/docs/api/liquid/tags/form#form-customer_address).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form#company)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "country": {
        "type": "string",
        "description": "The country associated with the address. This property is exclusive to the [`customer_address` form](https://shopify.dev/docs/api/liquid/tags/form#form-customer_address).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form#country)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "email": {
        "type": "string",
        "description": "The email associated with the form. This property is exclusive to the following forms:\n\n- [`contact`](https://shopify.dev/docs/api/liquid/tags/form#form-contact)\n- [`create_customer`](https://shopify.dev/docs/api/liquid/tags/form#form-create_customer)\n- [`customer`](https://shopify.dev/docs/api/liquid/tags/form#form-customer)\n- [`customer_login`](https://shopify.dev/docs/api/liquid/tags/form#form-customer_login)\n- [`new_comment`](https://shopify.dev/docs/api/liquid/tags/form#form-new_comment)\n- [`recover_customer_password`](https://shopify.dev/docs/api/liquid/tags/form#form-recover_customer_password)\n- [`product`](https://shopify.dev/docs/api/liquid/tags/form#form-product)\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form#email)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "first_name": {
        "type": "string",
        "description": "The first name associated with the customer or address. This property is exclusive to the [`create_customer`](https://shopify.dev/docs/api/liquid/tags/form#form-create_customer) and\n[`customer_address`](https://shopify.dev/docs/api/liquid/tags/form#form-customer_address) forms.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form#first_name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "id": {
        "type": "string",
        "description": "The ID of the form. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form#id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "last_name": {
        "type": "string",
        "description": "The last name associated with the customer or address. This property is exclusive to the [`create_customer`](https://shopify.dev/docs/api/liquid/tags/form#form-create_customer) and\n[`customer_address`](https://shopify.dev/docs/api/liquid/tags/form#form-customer_address) forms.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form#last_name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "password_needed": {
        "type": "boolean",
        "description": "Returns `true`. This property is exclusive to the [`customer_login` form](https://shopify.dev/docs/api/liquid/tags/form#form-customer_login).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form#password_needed)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "phone": {
        "type": "string",
        "description": "The phone number associated with the address. This property is exclusive to the [`customer_address` form](https://shopify.dev/docs/api/liquid/tags/form#form-customer_address).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form#phone)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "posted_successfully?": {
        "type": "boolean",
        "description": "Returns `true` if the form was submitted successfully. Returns `false` if there were errors. \n\n**Note**\n\n> The [`customer_address` form](https://shopify.dev/docs/api/liquid/tags/form#form-customer_address) always returns `true`.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form#posted_successfully?)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "province": {
        "type": "string",
        "description": "The province associated with the address. This property is exclusive to the [`customer_address` form](https://shopify.dev/docs/api/liquid/tags/form#form-customer_address).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form#province)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "set_as_default_checkbox": {
        "type": "string",
        "description": "Renders an HTML checkbox that can submit the address as the customer's default address. This property is exclusive to the [`customer_address` form](https://shopify.dev/docs/api/liquid/tags/form#form-customer_address).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form#set_as_default_checkbox)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "name": {
        "type": "string",
        "description": "The nickname of the gift card recipient. This property is exclusive to the [`product` form](https://shopify.dev/docs/api/liquid/tags/form#form-product).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form#name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "message": {
        "type": "string",
        "description": "The personalized message intended for the recipient. This property is exclusive to the [`product` form](https://shopify.dev/docs/api/liquid/tags/form#form-product).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form#message)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "zip": {
        "type": "string",
        "description": "The zip or postal code associated with the address. This property is exclusive to the [`customer_address` form](https://shopify.dev/docs/api/liquid/tags/form#form-customer_address).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form#zip)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "fulfillment": {
    "summary": "An order [fulfillment](https://help.shopify.com/manual/orders/fulfillment), which includes information like the line items\nbeing fulfilled and shipment tracking.",
    "description": "An order [fulfillment](https://help.shopify.com/manual/orders/fulfillment), which includes information like the line items\nbeing fulfilled and shipment tracking. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/fulfillment)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "created_at": {
        "type": "string",
        "description": "A timestamp for when the fulfillment was created. \n\n**Tip**\n\n> Use the [`date` filter](https://shopify.dev/docs/api/liquid/filters/date) to format the timestamp.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/fulfillment#created_at)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "item_count": {
        "type": "number",
        "description": "The number of items in the fulfillment. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/fulfillment#item_count)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "fulfillment_line_items": {
        "type": "array",
        "description": "The line items in the fulfillment. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/fulfillment#fulfillment_line_items)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "line_item"
      },
      "tracking_company": {
        "type": "string",
        "description": "The name of the fulfillment service. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/fulfillment#tracking_company)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "tracking_number": {
        "type": "string",
        "description": "The fulfillment's tracking number. If there's no tracking number, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/fulfillment#tracking_number)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "tracking_url": {
        "type": "string",
        "description": "The URL for the fulfillment's tracking number. If there's no tracking number, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/fulfillment#tracking_url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "generic_file": {
    "summary": "A file from a `file_reference` type [metafield](/docs/api/liquid/objects/metafield) that is neither an image or video.",
    "description": "A file from a `file_reference` type [metafield](https://shopify.dev/docs/api/liquid/objects/metafield) that is neither an image or video. \n\n**Tip**\n\n> To learn about metafield types, refer to [Metafield types](https://shopify.dev/apps/metafields/types).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/generic_file)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "url": {
        "type": "string",
        "description": "The [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for the file. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/generic_file#url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "id": {
        "type": "number",
        "description": "The ID of the file. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/generic_file#id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "media_type": {
        "type": "string",
        "description": "The media type of the model. Always returns `generic_file`. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/generic_file#media_type)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "preview_image": {
        "type": "object",
        "description": "A preview image for the file. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/generic_file#preview_image)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "image"
      },
      "position": {
        "type": "number",
        "description": "The position of the media in the [`product.media` array](https://shopify.dev/docs/api/liquid/objects/product#product-media). If the source is a [`file_reference` metafield](https://shopify.dev/apps/metafields/types), then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/generic_file#position)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "alt": {
        "type": "string",
        "description": "The alt text of the media. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/generic_file#alt)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "gift_card": {
    "summary": "A [gift card](https://help.shopify.com/manual/products/gift-card-products) that's been issued to a customer or a recipient.",
    "template": [
      "gift_card.liquid"
    ],
    "description": "A [gift card](https://help.shopify.com/manual/products/gift-card-products) that's been issued to a customer or a recipient. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "balance": {
        "type": "number",
        "description": "The remaining balance of the gift card in the currency's subunit. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card#balance)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "code": {
        "type": "string",
        "description": "The code used to redeem the gift card. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card#code)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "currency": {
        "type": "string",
        "description": "The [ISO code](https://www.iso.org/iso-4217-currency-codes.html) of the currency that the gift card was issued in. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card#currency)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "customer": {
        "type": "object",
        "description": "The customer associated with the gift card. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card#customer)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "customer"
      },
      "recipient": {
        "type": "object",
        "description": "The recipient associated with the gift card. If there is no recipient associated with the gift card, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card#recipient)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "recipient"
      },
      "message": {
        "type": "string",
        "description": "The personalized message intended for the recipient. If there is no message intended for the recipient, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card#message)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "send_on": {
        "type": "string",
        "description": "The scheduled date on which the gift card will be sent to the recipient. If the gift card does not have a scheduled date, then `nil` is returned.\n\n\n**Tip**\n\n> Use the [`date` filter](https://shopify.dev/docs/api/liquid/filters/date) to format the date.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card#send_on)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "enabled": {
        "type": "boolean",
        "description": "Returns `true` if the gift card is enabled. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card#enabled)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "expired": {
        "type": "boolean",
        "description": "Returns `true` if the gift card is expired. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card#expired)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "expires_on": {
        "type": "string",
        "description": "A timestamp for when the gift card expires. If the gift card never expires, then `nil` is returned.\n\n\n**Tip**\n\n> Use the [`date` filter](https://shopify.dev/docs/api/liquid/filters/date) to format the timestamp.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card#expires_on)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "initial_value": {
        "type": "number",
        "description": "The initial balance of the gift card in the currency's subunit. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card#initial_value)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "url": {
        "type": "string",
        "description": "The URL to view the gift card. This URL is on the `checkout.shopify.com` domain. \n\n**Tip**\n\n> The page at this URL is rendered through the [`gift_card.liquid` template](https://shopify.dev/themes/architecture/templates/gift-card-liquid)\n> of the theme.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card#url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "template_suffix": {
        "type": "string",
        "description": "The name of the [custom template](https://shopify.dev/themes/architecture/templates#alternate-templates) assigned to the gift card. The name doesn't include the `gift_card.` prefix, or the `.liquid` file extension.\n\n If a custom template isn't assigned to the gift card, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card#template_suffix)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "properties": {
        "type": "array",
        "description": "The [line item properties](https://shopify.dev/docs/api/liquid/objects/line_item#line_item-properties) assigned to the gift card. If there aren't any line item properties, then an [`EmptyDrop`](https://shopify.dev/docs/api/liquid/basics#emptydrop) is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card#properties)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "untyped"
      },
      "qr_identifier": {
        "type": "string",
        "description": "A string used to generate a QR code for the gift card. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card#qr_identifier)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "pass_url": {
        "type": "string",
        "description": "The URL to download the gift card as an Apple Wallet Pass. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card#pass_url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "product": {
        "type": "object",
        "description": "The product associated with the gift card. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card#product)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "product"
      },
      "last_four_characters": {
        "type": "string",
        "description": "The last 4 characters of the code used to redeem the gift card. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card#last_four_characters)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "image": {
    "summary": "An image, such as a product or collection image.",
    "description": "An image, such as a product or collection image. To learn about the image formats that Shopify supports, visit the [Shopify Help Center](https://help.shopify.com/manual/online-store/images/theme-images#image-formats).\n\n\n\n**Tip**\n\n> Use the [`image_url`](https://shopify.dev/docs/api/liquid/filters/image_url) and [`image_tag`](https://shopify.dev/docs/api/liquid/filters/image_tag) filters to display\n> images on the storefront.\n\n#### Referencing the `image` object directly\n\nWhen an `image` object is referenced directly, the image's relative URL path is returned.\n\n\n```liquid\n\n{{ product.featured_image }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/image)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "scope": "image",
    "properties": {
      "presentation": {
        "type": "object",
        "description": "The presentation settings for the image. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/image#presentation)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "image_presentation"
      },
      "src": {
        "type": "string",
        "description": "The relative URL of the image. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/image#src)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "width": {
        "type": "number",
        "description": "The width of the image in pixels. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/image#width)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "height": {
        "type": "number",
        "description": "The height of the image in pixels. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/image#height)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "aspect_ratio": {
        "type": "number",
        "description": "The aspect ratio of the image as a decimal. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/image#aspect_ratio)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "alt": {
        "type": "string",
        "description": "The alt text of the image. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/image#alt)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "attached_to_variant?": {
        "type": "boolean",
        "description": "Returns `true` if the image is associated with a variant. Returns `false` if not. The `attached_to_variant?` property is only available for images accessed through the following sources:\n\n- [`product.featured_image`](https://shopify.dev/docs/api/liquid/objects/product#product-featured_image)\n- [`product.images`](https://shopify.dev/docs/api/liquid/objects/product#product-images)\n\nIf you reference this property on an image from another source, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/image#attached_to_variant?)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "id": {
        "type": "number",
        "description": "The ID of the image. If you reference the `id` property for preview images of [`generic_file`](https://shopify.dev/docs/api/liquid/objects/generic_file) or\n[`media`](https://shopify.dev/docs/api/liquid/objects/media) objects, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/image#id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "media_type": {
        "type": "string",
        "description": "The media type of the image. Always returns `image`. The `media_type` property is only available for images accessed through the following sources:\n\n- [`product.media`](https://shopify.dev/docs/api/liquid/objects/product#product-media)\n- [`file_reference` type metafields](https://shopify.dev/apps/metafields/types#supported-types)\n\nIf you reference this property on an image from another source, then `nil` is returned.\n\n#### Filter for media of a specific type\n\nYou can use the `media_type` property with the [`where` filter](/docs/api/liquid/filters/where) to filter the [`product.media` array](/docs/api/liquid/objects/product#product-media) for all media of a desired type.\n\n\n```liquid\n\n{% assign images = product.media | where: 'media_type', 'image' %}\n\n{% for image in images %}\n  {{- image | image_url: width: 300 | image_tag }}\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/image#media_type)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "position": {
        "type": "number",
        "description": "The position of the image in the [`product.images`](https://shopify.dev/docs/api/liquid/objects/product#product-images) or [`product.media`](https://shopify.dev/docs/api/liquid/objects/product#product-media)\narray. The `position` property is only available for images that are associated with a product. If you reference this property\non an image from another source, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/image#position)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "preview_image": {
        "type": "object",
        "description": "A preview image for the image. The `preview_image` property is only available for images accessed through the following sources:\n\n- [`product.featured_media`](https://shopify.dev/docs/api/liquid/objects/product#product-featured_media)\n- [`product.media`](https://shopify.dev/docs/api/liquid/objects/product#product-media)\n- [`file_reference` type metafields](https://shopify.dev/apps/metafields/types#supported-types)\n\nIf you reference this property on an image from another source, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/image#preview_image)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "image"
      },
      "product_id": {
        "type": "number",
        "description": "The ID of the product that the image is associated with. The `product_id` property is only available for images associated with a product. If you reference this property on\nan image from another source, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/image#product_id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "variants": {
        "type": "array",
        "description": "The product variants that the image is associated with. The `variants` property is only available for images accessed through the following sources:\n\n- [`product.featured_image`](https://shopify.dev/docs/api/liquid/objects#product-featured_image)\n- [`product.images`](https://shopify.dev/docs/api/liquid/objects/product#product-images)\n\nIf you reference this property on an image from another source, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/image#variants)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "variant"
      }
    }
  },
  "image_presentation": {
    "summary": "The presentation settings for an image.",
    "description": "The presentation settings for an image. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/image_presentation)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "focal_point": {
        "type": "object",
        "description": "The focal point for the image. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/image_presentation#focal_point)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "focal_point"
      }
    }
  },
  "images": {
    "summary": "All of the [images](/docs/api/liquid/objects/image) that have been [uploaded](https://help.shopify.com/manual/online-store/images/theme-images#upload-images)\nto a store.",
    "global": true,
    "description": "All of the [images](https://shopify.dev/docs/api/liquid/objects/image) that have been [uploaded](https://help.shopify.com/manual/online-store/images/theme-images#upload-images)\nto a store. \n\n\n\n#### Example\n\nYou can access images from the `images` array by their filename.\n\n\n```liquid\n\n{{ images['potions-header.png'] | image_url: width: 300 | image_tag }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/images)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "array",
    "scope": "image"
  },
  "line_item": {
    "summary": "A line in a cart, checkout, or order. Each line item represents a product variant.",
    "description": "A line in a cart, checkout, or order. Each line item represents a product variant. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "id": {
        "type": "number",
        "description": "The ID of the line item. The ID differs depending on the context. The following table outlines the possible contexts and their associated values:\n\n| Context | Value |\n| --- | --- |\n| [`cart.items`](https://shopify.dev/docs/api/liquid/objects/cart#cart-items) | The ID of the line item's variant.<br><br>This ID isn't unique, and can be shared by multiple items with the same variant. |\n| [`checkout.line_items`](https://shopify.dev/docs/api/liquid/objects/checkout#checkout-line_items) | A temporary unique hash generated for the checkout. |\n| [`order.line_items`](https://shopify.dev/docs/api/liquid/objects/order#order-line_items) | A unique integer ID. |\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "quantity": {
        "type": "number",
        "description": "The quantity of the line item. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#quantity)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "price": {
        "type": "number",
        "description": "\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F\n\nDeprecated because discounts from automatic discounts and discount codes aren't included.\n\nThe `line_item.price` property has been replaced by [`line_item.final_price`](/docs/api/liquid/objects/line_item#line_item-final_price).\n\n---\n\nThe price of the line item in the currency's subunit. This includes any discounts from [Shopify Scripts](https://help.shopify.com/manual/checkout-settings/script-editor). The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#price)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "line_price": {
        "type": "number",
        "description": "\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F\n\nDeprecated because discounts from automatic discounts and discount codes aren't included.\n\nThe `line_item.line_price` property has been replaced by [`line_item.final_line_price`](/docs/api/liquid/objects/line_item#line_item-final_line_price).\n\n---\n\nThe combined price, in the currency's subunit, of all of the items in a line item. This includes any discounts from [Shopify Scripts](https://help.shopify.com/manual/checkout-settings/script-editor). The value is equal to `line_item.price` multiplied by `line_item.quantity`. It's output in the customer's local\n(presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#line_price)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "total_discount": {
        "type": "number",
        "description": "\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F\n\nDeprecated because discounts from automatic discounts and discount codes aren't included.\n\nThe `line_item.total_discount` property has been replaced by [`line_item.line_level_total_discount`](/docs/api/liquid/objects/line_item#line_item-line_level_total_discount).\n\n---\n\nThe total amount, in the currency's subunit, of any discounts applied to the line item by [Shopify Scripts](https://help.shopify.com/manual/checkout-settings/script-editor). The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#total_discount)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "discount_allocations": {
        "type": "array",
        "description": "The discount allocations that apply to the line item. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#discount_allocations)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "discount_allocation"
      },
      "final_price": {
        "type": "number",
        "description": "The price of the line item in the currency's subunit. This includes any line-level discounts. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#final_price)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "final_line_price": {
        "type": "number",
        "description": "The combined price, in the currency's subunit, of all of the items in the line item. This includes any line-level discounts. The value is equal to `line_item.final_price` multiplied by `line_item.quantity`. It's output in the customer's local\n(presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#final_line_price)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "variant_id": {
        "type": "number",
        "description": "The [ID](https://shopify.dev/docs/api/liquid/objects/variant#variant-id) of the line item's variant. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#variant_id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "product_id": {
        "type": "number",
        "description": "The [ID](https://shopify.dev/docs/api/liquid/objects/product#product-id) of the line item's product. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#product_id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "product": {
        "type": "object",
        "description": "The product associated with the line item. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#product)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "product"
      },
      "variant": {
        "type": "object",
        "description": "The variant associated with the line item. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#variant)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "variant"
      },
      "tax_lines": {
        "type": "array",
        "description": "The tax lines for the line item. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#tax_lines)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "tax_line"
      },
      "fulfillment": {
        "type": "object",
        "description": "The fulfillment of the line item. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#fulfillment)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "fulfillment"
      },
      "successfully_fulfilled_quantity": {
        "type": "number",
        "description": "The number of items from the line item that have been successfully fulfilled. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#successfully_fulfilled_quantity)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "fulfillment_service": {
        "type": "string",
        "description": "The [fulfillment service](https://help.shopify.com/manual/shipping/understanding-shipping/dropshipping-and-fulfillment-services)\nfor the vartiant associated with the line item. If there's no fulfillment service, then `manual` is returned. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#fulfillment_service)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "properties": {
        "type": "array",
        "description": 'The properties of the line item. You can add, or allow customers to add, custom information to a line item with line item properties.\n\nLine item properties consist of a name and value pair. They can be captured with the following methods:\n\n- [A custom input inside a product form](https://shopify.dev/themes/architecture/templates/product#line-item-properties)\n- [The AJAX Cart API](https://shopify.dev/api/ajax/reference/cart#add-line-item-properties)\n\n\n\n**Tip**\n\n> To learn about how to display captured properties, refer to [Display line item properties](https://shopify.dev/themes/architecture/templates/cart#display-line-item-properties).\n\n#### Capture line item properties in the product form\n\nTo capture line item properties inside the [product form](/docs/api/liquid/tags/form#form-product), you need to include an input, for each property. Each  input needs a unique `name` attribute. Use the following format:\n\n```\nname="properties[property-name]"\n```\n\nThe value of the input is captured as the value of the property.\n\nFor example, you can use the following code to capture custom engraving text for a product:\n\n```liquid\n{% form \'product\', product %}\n  ...\n  <label for="engravingText">Engraving<label>\n  <input type="text" id="engravingText" name="properties[Engraving]">\n  ...\n{% endform %}\n```\n\n> Tip:\n> You can add an underscore to the beginning of a property name to hide it from customers at checkout. For example,\n> `properties[_hiddenPropertyName]`.\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#properties)\n\n\nLast Updated: 6th April 2023\n\n\n',
        "scope": "untyped"
      },
      "unit_price_measurement": {
        "type": "object",
        "description": "The unit price measurement of the line item. \n\n**Note**\n\n> Unit prices are available only to stores located in Germany or France.\n\nTo learn about how to display unit prices in your theme, refer to [Unit pricing](https://shopify.dev/themes/pricing-payments/unit-pricing).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#unit_price_measurement)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "unit_price_measurement"
      },
      "unit_price": {
        "type": "number",
        "description": "The [unit price](https://help.shopify.com/manual/intro-to-shopify/initial-setup/sell-in-france/price-per-unit#add-unit-prices-to-your-product)\n of the line item in the currency's subunit. The price reflects any discounts that are applied to the line item. The value is output in the customer's local\n(presentment) currency.\n\n\n\n**Note**\n\n> Unit prices are available only to stores located in Germany and France.\n\nTo learn about how to display unit prices in your theme, refer to [Unit pricing](https://shopify.dev/themes/pricing-payments/unit-pricing).\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#unit_price)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "sku": {
        "type": "string",
        "description": "The [sku](https://shopify.dev/docs/api/liquid/objects/variant#variant-sku) of the variant associated with the line item. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#sku)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "message": {
        "type": "string",
        "description": "Information about the discounts that have affected the line item. The following table outlines what's returned depending on the number of discounts affecting the line item:\n\n| Number of discounts | Value |\n| --- | --- |\n| 0 | `nil` |\n| 1 | The [title](https://shopify.dev/docs/api/liquid/objects/discount_application#discount_application-title) of the discount. |\n| More than 1 | A Shopify generated string noting how many discounts have been applied. |\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#message)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "vendor": {
        "type": "string",
        "description": "The vendor of the variant associated with the line item. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#vendor)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "title": {
        "type": "string",
        "description": "The title of the line item. The title is a combination of `line_item.product.title` and `line_item.variant.title`, separated\nby a hyphen. In most contexts, the line item title appears in the customer's preferred language. However, in the context of an\n[order](https://shopify.dev/docs/api/liquid/objects/order), the line item title appears in the language that the customer checked out in.\n\n#### Line item title history\n\nWhen referencing line item, product, and variant titles in the context of an order, the following changes might result\nin a different output than you expect:\n\n- A product or variant being deleted\n- A product or variant title being edited\n\nWhen `line_item.title` is referenced for an order, the line item title at the time of the order is returned.\nHowever, when `line_item.product.title` and `line_item.variant.title` are referenced, the current value for\neach title is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#title)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "taxable": {
        "type": "boolean",
        "description": "Returns `true` if taxes should be charged on the line item. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#taxable)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "original_price": {
        "type": "number",
        "description": "The price of the line item in the currency's subunit, before discounts have been applied. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#original_price)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "original_line_price": {
        "type": "number",
        "description": "The combined price of all of the items in a line item in the currency's subunit, before any discounts have been applied. The value is equal to `line_item.original_price` multiplied by `line_item.quantity`. It's output in the customer's local\n(presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#original_line_price)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "line_level_total_discount": {
        "type": "number",
        "description": "The total amount of any discounts applied to the line item in the currency's subunit. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#line_level_total_discount)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "line_level_discount_allocations": {
        "type": "array",
        "description": "The discount allocations that apply directly to the line item. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#line_level_discount_allocations)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "discount_allocation"
      },
      "discounts": {
        "type": "array",
        "description": "\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F\n\nDeprecated because not all discount types and details are available.\n\nThe `line_item.discounts` property has been replaced by [`line_item.discount_allocations`](/docs/api/liquid/objects/line_item#line_item-discount_allocations).\n\n---\n\nThe discounts applied to the line item. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#discounts)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "discount"
      },
      "gift_card": {
        "type": "boolean",
        "description": "Returns `true` if the product associated with the line item is a gift card. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#gift_card)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "requires_shipping": {
        "type": "boolean",
        "description": "Returns `true` if the variant associated with the line item requires shipping. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#requires_shipping)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "options_with_values": {
        "type": "array",
        "description": 'The name and value pairs for each option of the variant associated with the line item. \n\n**Note**\n\n> The array is never empty because variants with no options still have a default option. Because of this, you should use\n> `line_item.product.has_only_default_variant` to check whether there\'s any information to output.\n\n#### Output the option values\n\n```liquid\n\n{% for item in cart.items %}\n<div class="cart__item">\n  <p class="cart__item-title">\n    {{ item.title }}\n  </p>\n\n  {%- unless item.product.has_only_default_variant %}\n  <ul>\n    {% for option in item.options_with_values -%}\n    <li>{{ option.name }}: {{ option.value }}</li>\n    {%- endfor %}\n  </ul>\n  {% endunless %}\n</div>\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#options_with_values)\n\n\nLast Updated: 6th April 2023\n\n\n',
        "scope": "untyped"
      },
      "key": {
        "type": "string",
        "description": "The key of the line item. Line item keys are unique identifiers that consist of the following components separated by a colon:\n\n- The ID of the variant associated with the line item\n- A hash of the properties of the line item, even if there are no properties\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#key)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "grams": {
        "type": "number",
        "description": "The weight of the line item in the store's [default weight unit](https://help.shopify.com/manual/intro-to-shopify/initial-setup/setup-business-settings#set-or-change-your-stores-default-weight-unit). \n\n**Tip**\n\n> Use this property with the [`weight_with_unit` filter](https://shopify.dev/docs/api/liquid/filters/weight_with_unit) to format the weight.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#grams)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "url": {
        "type": "string",
        "description": "The relative URL of the variant associated with the line item. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "url_to_remove": {
        "type": "string",
        "description": "A URL to remove the line item from the cart. \n\n**Tip**\n\n> To learn more about how to use this property in your theme, refer to [Remove line items from the cart](https://shopify.dev/themes/architecture/templates/cart#remove-line-items-from-the-cart).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#url_to_remove)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "image": {
        "type": "object",
        "description": "The image of the line item. The image can come from one of the following sources:\n\n- The image of the variant associated with the line item\n- The featured image of the product associated with the line item, if there's no variant image\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#image)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "image"
      },
      "selling_plan_allocation": {
        "type": "object",
        "description": "The selling plan allocation of the line item. If the line item doesn't have a selling plan allocation, then `nil` is returned. #### Availability of selling plan information\n\nThe following properties aren't available when referencing selling plan information through an\n[order's line items](https://shopify.dev/docs/api/liquid/objects/order#order-line_items):\n\n- [`selling_plan_allocation.compare_at_price`](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation#selling_plan_allocation-compare_at_price)\n- [`selling_plan_allocation.price_adjustments`](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation#selling_plan_allocation-price_adjustments)\n- [`selling_plan_allocation.selling_plan.group_id`](https://shopify.dev/docs/api/liquid/objects/selling_plan#selling_plan-group_id)\n- [`selling_plan_allocation.selling_plan.options`](https://shopify.dev/docs/api/liquid/objects/selling_plan#selling_plan-options)\n- [`selling_plan_allocation.selling_plan.price_adjustments`](https://shopify.dev/docs/api/liquid/objects/selling_plan#selling_plan-price_adjustments)\n- [`selling_plan_allocation.selling_plan_group_id`](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation#selling_plan_allocation-selling_plan_group_id)\n\n\n\n**Tip**\n\n> If you need to show selling plan information post-purchase, then you should use [`selling_plan.name`](https://shopify.dev/docs/api/liquid/objects/selling_plan#selling_plan-name).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item#selling_plan_allocation)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "selling_plan_allocation"
      }
    }
  },
  "link": {
    "summary": "A link in a [menu](https://help.shopify.com/manual/online-store/menus-and-links/drop-down-menus).",
    "description": "A link in a [menu](https://help.shopify.com/manual/online-store/menus-and-links/drop-down-menus). To learn about how to implement navigation in a theme, refer to [Add navigation to your theme](https://shopify.dev/themes/navigation-search/navigation).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/link)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "active": {
        "type": "boolean",
        "description": 'Returns `true` if the link is active. Returns `false` if not. A link is considered to be active if the current URL path matches, or contains, the link\'s [url](https://shopify.dev/docs/api/liquid/objects/link#link-url).\nFor example, if the current URL path is `/blog/potion-notions/new-potions-for-spring`, then the following link URLs\nwould be considered active:\n\n- `/blog/potion-notions/new-potions-for-spring`\n- `/blog/potion-notions`\n\n\n\n**Tip**\n\n> The `link.active` property is useful for menu designs that highlight when top-level navigation categories are being\n> viewed. For example, if a customer is viewing an article from the "Potion notions" blog, then the "Potion notions" link\n> is highlighted in the menu.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/link#active)\n\n\nLast Updated: 6th April 2023\n\n\n'
      },
      "current": {
        "type": "boolean",
        "description": "Returns `true` if the current URL path matches the [URL](https://shopify.dev/docs/api/liquid/objects/link#link-url) of the link. Returns `false` if not. \n\n**Note**\n\n> URL parameters are ignored when determining a match.\n>\n> Product URLs [within the context of a collection](https://shopify.dev/docs/api/liquid/filters/within) are treated as equal to a standard product\n> URL for the same product.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/link#current)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "child_active": {
        "type": "boolean",
        "description": "Returns `true` if a link's child link is active. Returns `false` if not. A link is considered to be active if the current URL path matches, or contains, the [URL](https://shopify.dev/docs/api/liquid/objects/link#link-url) of\nthe link.\n\nFor example, if the current URL path is `/blog/potion-notions/new-potions-for-spring`, then the following link URLs\nwould be considered active:\n\n- `/blog/potion-notions/new-potions-for-spring`\n- `/blog/potion-notions`\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/link#child_active)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "child_current": {
        "type": "boolean",
        "description": "Returns `true` if current URL path matches a link's child link [URL](https://shopify.dev/docs/api/liquid/objects/link#link-url). Returns `false` if not. \n\n**Note**\n\n> URL parameters are ignored when determining a match.\n>\n> Product URLs [within the context of a collection](https://shopify.dev/docs/api/liquid/filters/within) and standard product URLs are treated\n> the same.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/link#child_current)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "handle": {
        "type": "string",
        "description": "The [handle](https://shopify.dev/docs/api/liquid/basics#handles) of the link. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/link#handle)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "links": {
        "type": "array",
        "description": "The child links of the link. \n\n\n\n#### Check the number of links\n\n```liquid\n\n{% for link in linklists.main-menu.links -%}\n  {% if link.links.size > 0 -%}\n    - {{ link.title }} ({{ link.links.size }} children)<br>\n  {%- else -%}\n    - {{ link.title }}<br>\n  {%- endif %}\n{%- endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/link#links)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "link"
      },
      "object": {
        "type": "any",
        "description": "The object associated with the link. The object can be one of the following:\n\n- [`article`](https://shopify.dev/docs/api/liquid/objects/article)\n- [`blog`](https://shopify.dev/docs/api/liquid/objects/blog)\n- [`collection`](https://shopify.dev/docs/api/liquid/objects/collection)\n- [`page`](https://shopify.dev/docs/api/liquid/objects/page)\n- [`policy`](https://shopify.dev/docs/api/liquid/objects/policy)\n- [`product`](https://shopify.dev/docs/api/liquid/objects/product)\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/link#object)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "title": {
        "type": "string",
        "description": "The title of the link. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/link#title)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "type": {
        "type": "string",
        "description": "The type of the link. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/link#type)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "literal": [
          "article_link",
          "blog_link",
          "catalog_link",
          "collection_link",
          "collections_link",
          "frontpage_link",
          "http_link",
          "page_link",
          "policy_link",
          "product_link",
          "search_link"
        ]
      },
      "levels": {
        "type": "number",
        "description": "The number of nested levels under the link. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/link#levels)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "url": {
        "type": "string",
        "description": "The URL of the link. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/link#url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "linklists": {
    "summary": "All of the [menus](https://help.shopify.com/manual/online-store/menus-and-links/drop-down-menus) in a store.",
    "global": true,
    "description": "All of the [menus](https://help.shopify.com/manual/online-store/menus-and-links/drop-down-menus) in a store. \n\n\n\n#### Example\n\nYou can access a specific menu through the `linklists` object using the menu's [handle](/docs/api/liquid/basics#handles).\n\n\n```liquid\n\n<!-- Main menu -->\n{% for link in linklists.main-menu.links -%}\n  {{ link.title | link_to: link.url }}\n{%- endfor %}\n\n<!-- Footer menu -->\n{% for link in linklists['footer'].links -%}\n  {{ link.title | link_to: link.url }}\n{%- endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/linklists)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "array",
    "scope": "linklist"
  },
  "linklist": {
    "summary": "A [menu](https://help.shopify.com/manual/online-store/menus-and-links/drop-down-menus) in a store.",
    "description": "A [menu](https://help.shopify.com/manual/online-store/menus-and-links/drop-down-menus) in a store. To learn about how to implement navigation in a theme, refer to [Add navigation to your theme](https://shopify.dev/themes/navigation-search/navigation).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/linklist)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "links": {
        "type": "array",
        "description": "The links in the menu. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/linklist#links)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "link"
      },
      "handle": {
        "type": "string",
        "description": "The [handle](https://shopify.dev/docs/api/liquid/basics#handles) of the menu. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/linklist#handle)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "levels": {
        "type": "number",
        "description": "The number of nested levels in the menu. \n\n**Note**\n\n> There's a maximum of 3 levels.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/linklist#levels)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "title": {
        "type": "string",
        "description": "The title of the menu. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/linklist#title)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "forloop": {
    "summary": "Information about a parent [`for` loop](/docs/api/liquid/tags/for).",
    "description": "Information about a parent [`for` loop](https://shopify.dev/docs/api/liquid/tags/for). \n\n\n\n#### Use the `forloop` object\n\n```liquid\n\n{% for page in pages -%}\n  {%- if forloop.length > 0 -%}\n    {{ page.title }}{% unless forloop.last %}, {% endunless -%}\n  {%- endif -%}\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/forloop)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "length": {
        "type": "number",
        "description": "The total number of iterations in the loop. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/forloop#length)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "parentloop": {
        "type": "object",
        "description": "The parent `forloop` object. If the current `for` loop isn't nested inside another `for` loop, then `nil` is returned.\n\n#### Use the `parentloop` property\n\n```liquid\n\n{% for i in (1..3) -%}\n  {% for j in (1..3) -%}\n    {{ forloop.parentloop.index }} - {{ forloop.index }}\n  {%- endfor %}\n{%- endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/forloop#parentloop)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "forloop"
      },
      "index": {
        "type": "number",
        "description": "The 1-based index of the current iteration. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/forloop#index)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "index0": {
        "type": "number",
        "description": "The 0-based index of the current iteration. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/forloop#index0)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "rindex": {
        "type": "number",
        "description": "The 1-based index of the current iteration, in reverse order. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/forloop#rindex)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "rindex0": {
        "type": "number",
        "description": "The 0-based index of the current iteration, in reverse order. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/forloop#rindex0)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "first": {
        "type": "boolean",
        "description": "Returns `true` if the current iteration is the first. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/forloop#first)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "last": {
        "type": "boolean",
        "description": "Returns `true` if the current iteration is the last. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/forloop#last)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "tablerowloop": {
    "summary": "Information about a parent [`tablerow` loop](/docs/api/liquid/tags/tablerow).",
    "description": "Information about a parent [`tablerow` loop](https://shopify.dev/docs/api/liquid/tags/tablerow). \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tablerowloop)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "length": {
        "type": "number",
        "description": "The total number of iterations in the loop. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tablerowloop#length)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "col": {
        "type": "number",
        "description": "The 1-based index of the current column. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tablerowloop#col)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "row": {
        "type": "number",
        "description": "The 1-based index of current row. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tablerowloop#row)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "index": {
        "type": "number",
        "description": "The 1-based index of the current iteration. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tablerowloop#index)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "index0": {
        "type": "number",
        "description": "The 0-based index of the current iteration. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tablerowloop#index0)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "col0": {
        "type": "number",
        "description": "The 0-based index of the current column. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tablerowloop#col0)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "rindex": {
        "type": "number",
        "description": "The 1-based index of the current iteration, in reverse order. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tablerowloop#rindex)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "rindex0": {
        "type": "number",
        "description": "The 0-based index of the current iteration, in reverse order. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tablerowloop#rindex0)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "first": {
        "type": "boolean",
        "description": "Returns `true` if the current iteration is the first. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tablerowloop#first)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "last": {
        "type": "boolean",
        "description": "Returns `true` if the current iteration is the last. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tablerowloop#last)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "col_first": {
        "type": "boolean",
        "description": "Returns `true` if the current column is the first in the row. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tablerowloop#col_first)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "col_last": {
        "type": "boolean",
        "description": "Returns `true` if the current column is the last in the row. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tablerowloop#col_last)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "localization": {
    "summary": "Information about the countries and languages that are available on a store.",
    "global": true,
    "description": "Information about the countries and languages that are available on a store. The `localization` object can be used in a [localization form](https://shopify.dev/docs/api/liquid/tags/form#form-localization).\n\nTo learn about how to offer localization options in your theme, refer to [Support multiple currencies and languages](https://shopify.dev/themes/internationalization/multiple-currencies-languages).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/localization)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "available_countries": {
        "type": "array",
        "description": "The countries that are available on the store. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/localization#available_countries)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "country"
      },
      "available_languages": {
        "type": "array",
        "description": "The languages that are available on the store. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/localization#available_languages)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "shop_locale"
      },
      "market": {
        "type": "object",
        "description": "The currently selected market on the storefront. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/localization#market)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "market"
      },
      "country": {
        "type": "object",
        "description": "The currently selected country on the storefront. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/localization#country)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "country"
      },
      "language": {
        "type": "object",
        "description": "The currently selected language on the storefront. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/localization#language)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "shop_locale"
      }
    }
  },
  "location": {
    "summary": "A store [location](https://help.shopify.com/manual/locations).",
    "description": "A store [location](https://help.shopify.com/manual/locations). \n\n**Tip**\n\n> The `location` object is defined only if one or more locations has [local pickup](https://help.shopify.com/manual/shipping/setting-up-and-managing-your-shipping/local-methods/local-pickup)\n> enabled.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/location)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "id": {
        "type": "number",
        "description": "The location's ID. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/location#id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "name": {
        "type": "string",
        "description": "The location's name. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/location#name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "address": {
        "type": "object",
        "description": "The location's address. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/location#address)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "address"
      },
      "latitude": {
        "type": "number",
        "description": "The latitude of the location's address. If the location's address isn't verified, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/location#latitude)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "longitude": {
        "type": "number",
        "description": "The longitude of the location's address. If the location's address isn't verified, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/location#longitude)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "metafields": {
        "type": "any",
        "description": "The [metafields](https://shopify.dev/docs/api/liquid/objects/metafield) applied to the location. \n\n**Tip**\n\n> To learn about how to create metafields, refer to [Create and manage metafields](https://shopify.dev/apps/metafields/manage) or visit\n> the [Shopify Help Center](https://help.shopify.com/manual/metafields).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/location#metafields)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "market": {
    "summary": "A group of one or more regions of the world that a merchant is targeting for sales.",
    "description": "A group of one or more regions of the world that a merchant is targeting for sales. To learn more about markets, refer to [the Shopify Markets conceptual\noverview](https://shopify.dev/docs/apps/markets).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/market)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "description": "The ID of the market. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/market#id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "handle": {
        "type": "string",
        "description": "The [handle](https://shopify.dev/docs/api/liquid/basics#handles) of the market. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/market#handle)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "metafields": {
        "type": "array",
        "description": "The [metafields](https://shopify.dev/docs/api/liquid/objects/metafield) applied to the market. \n\n**Tip**\n\n> To learn about how to create metafields, refer to [Create and manage\n> metafields](https://shopify.dev/apps/metafields/manage) or visit the [Shopify Help\n> Center](https://help.shopify.com/manual/metafields).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/market#metafields)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "metafield"
      }
    }
  },
  "measurement": {
    "summary": "A measurement from one of the following metafield types:\n\n- `dimension`\n- `volume`\n- `weight`",
    "description": "A measurement from one of the following metafield types:\n\n- `dimension`\n- `volume`\n- `weight` \n\n**Tip**\n\n> To learn about metafield types, refer to [Metafield types](https://shopify.dev/apps/metafields/types).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/measurement)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "description": "The measurement type. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/measurement#type)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "literal": [
          "dimension",
          "volume",
          "weight"
        ]
      },
      "value": {
        "type": "number",
        "description": "The measurement value. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/measurement#value)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "unit": {
        "type": "string",
        "description": "The measurement unit. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/measurement#unit)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "metafield": {
    "summary": "A [metafield](/apps/metafields) attached to a parent object.",
    "description": "A [metafield](https://shopify.dev/apps/metafields) attached to a parent object. To learn about how to access a metafield on a specific object, refer to [Access metafields](https://shopify.dev/docs/api/liquid/objects/metafield#metafield-access-metafields).\n\nMetafields support [multiple data types](https://shopify.dev/apps/metafields/types), which determine the kind of information that's stored\nin the metafield. You can also output the metafield content in a type-specific format using\n[metafield filters](https://shopify.dev/docs/api/liquid/filters/metafield-filters).\n\n\n\n**Note**\n\n> You can't create metafields in Liquid. Metafields can be created in only the following ways:\n>\n> - [In the Shopify admin](https://help.shopify.com/manual/metafields)\n> - [Through an app](https://shopify.dev/apps/metafields)\n\n\n\n**Note**\n\n> Metafields of type `integer`, `json_string`, and `string` are older implementations that don't have the properties\n  noted on this page, and aren't compatible with metafield filters. To learn more, refer to [Deprecated metafields](https://shopify.dev/docs/api/liquid/objects/metafield#metafield-deprecated-metafields).\n\n#### Access metafields\n\nThe access path for metafields consists of two layers:\n\n- namespace - A grouping of metafields to prevent conflicts.\n- key - The metafield name.\n\nGiven this, you can access the metafield object with the following syntax:\n\n```liquid\n{{ resource.metafields.namespace.key }}\n```\n\n\n```liquid\n\nType: {{ product.metafields.information.directions.type }}\nValue: {{ product.metafields.information.directions.value }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/metafield)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "value": {
        "type": "any",
        "description": `The value of the metafield. The following table outlines the value format for each metafield type:

<table>
  <thead>
    <tr>
      <th>Type</th>
      <th>Returned format</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>single_line_text_field</code><br><br>
        <code>multi_line_text_field</code>
      </td>
      <td><a href="/docs/api/liquid/basics#string">A string</a></td>
    </tr>
    <tr>
      <td>
        <code>product_reference</code>
      </td>
      <td><a href="/docs/api/liquid/objects/product">A product object</a></td>
    </tr>
    <tr>
      <td>
        <code>collection_reference</code>
      </td>
      <td><a href="/docs/api/liquid/objects/collection">A collection object</a></td>
    </tr>
    <tr>
      <td>
        <code>variant_reference</code>
      </td>
      <td><a href="/docs/api/liquid/objects/variant">A variant object</a></td>
    </tr>
    <tr>
      <td>
       <code>page_reference</code>
     </td>
     <td><a href="/docs/api/liquid/objects/page">A page object</a></td>
    </tr>
    <tr>
      <td>
        <code>file_reference</code>
     </td>
     <td>
       <a href="/docs/api/liquid/objects/generic-file">A generic_file object</a><br><br>
       <a href="/docs/api/liquid/objects/media">A media object (images and videos only)</a>
     </td>
    </tr>
    <tr>
      <td>
        <code>number_integer</code><br><br>
        <code>number_decimal</code>
      </td>
      <td><a href="/docs/api/liquid/basics#number">A number</a></td>
    </tr>
    <tr>
      <td>
        <code>date</code><br><br>
        <code>date_time</code>
      </td>
      <td>A date string. To format the string, use the <a href="/docs/api/liquid/filters/date">date</a> filter.</td>
    </tr>
    <tr>
      <td>
        <code>url_reference</code>
      </td>
      <td><a href="/docs/api/liquid/basics#string">A url string</a></td>
    </tr>
    <tr>
      <td>
        <code>json</code>
      </td>
      <td><a href="https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON">A JSON object</a></td>
    </tr>
    <tr>
      <td>
       <code>boolean</code>
      </td>
      <td><a href="/docs/api/liquid/basics#boolean">A boolean</a></td>
    <tr>
      <td>
        <code>color</code>
      </td>
      <td><a href="/docs/api/liquid/objects/color">A color object</a></td>
    </tr>
    <tr>
      <td>
        <code>weight</code><br><br>
        <code>volume</code><br><br>
        <code>dimension</code>
      </td>
      <td><a href="/docs/api/liquid/objects/measurement">A measurement object</a></td>
    </tr>
    <tr>
      <td>
        <code>rating</code>
      </td>
      <td><a href="/docs/api/liquid/objects/rating">A rating object</a></td>
    </tr>
    <tr>
      <td>
        <code>list</code>
      </td>
      <td><a href="/docs/api/liquid/basics#array">An array of objects, numbers, or strings, depending on the list type</a></td>
    </tr>
    <tr>
      <td>
        <code>money</code>
      </td>
      <td><a href="/docs/api/liquid/objects/money">A money object, displayed in the customer's local (presentment) currency.</a></td>
    </tr>
  </tbody>
</table>

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/metafield#value)


Last Updated: 6th April 2023


`
      },
      "type": {
        "type": "string",
        "description": "The [type](https://shopify.dev/apps/metafields/types) of the metafield. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/metafield#type)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "literal": [
          "single_line_text_field",
          "multi_line_text_field",
          "product_reference",
          "collection_reference",
          "variant_reference",
          "page_reference",
          "file_reference",
          "number_integer",
          "number_decimal",
          "date",
          "date_time",
          "url_reference",
          "json",
          "boolean",
          "color",
          "weight",
          "volume",
          "dimension",
          "rating",
          "list",
          "money"
        ]
      },
      "list?": {
        "type": "boolean",
        "description": "Returns `true` if the metafield is a list type. Returns `false` if not. \n\n**Tip**\n\n> To learn about metafield types, refer to [Metafield types](https://shopify.dev/apps/metafields/types).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/metafield#list?)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "metaobject_definition": {
    "summary": "A `metaobject_definition` defines the structure of a metaobject type for the store, which consists of\na merchant-defined set of [field definitions](https://help.shopify.com/en/manual/metafields/metafield-definitions).",
    "description": "A `metaobject_definition` defines the structure of a metaobject type for the store, which consists of\na merchant-defined set of [field definitions](https://help.shopify.com/en/manual/metafields/metafield-definitions). One or more corresponding [`metaobject`](https://shopify.dev/docs/api/liquid/objects#metaobject) objects contain values for\nthe fields specified in the metaobject definition.\n\n#### Loop over entries of a metaobject definition\n\nIf a metaobject definition has multiple metaobject entries, then you can loop over them using the `values` property.\nFor example, you can display the field `author` for each metaobject using the following `forloop`:\n\n```liquid\n{% for testimonial in shop.metaobjects.testimonials.values %}\n  {{ testimonial.author.value }}\n{% endfor %}\n```\n\n> Note:\n> When the [`publishable` capability](/apps/data-extensions/metaobjects/capabilities) is enabled, loops return only metaobjects with a status of `active`. Metaobjects with a status of `draft` are skipped.\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/metaobject_definition)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "values": {
        "type": "array",
        "description": "The [metaobjects](https://shopify.dev/docs/api/liquid/objects#metaobject) that follow the definition. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/metaobject_definition#values)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "metaobject"
      },
      "values_count": {
        "type": "number",
        "description": "The total number of entries for the metaobject definition. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/metaobject_definition#values_count)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "metaobject": {
    "summary": "A metaobject entry, which includes the values for a set of [fields](/docs/api/liquid/objects#metafield).\nThe set is defined by the parent [`metaobject_definition`](/docs/api/liquid/objects#metaobject_definition).",
    "description": "A metaobject entry, which includes the values for a set of [fields](https://shopify.dev/docs/api/liquid/objects#metafield).\nThe set is defined by the parent [`metaobject_definition`](https://shopify.dev/docs/api/liquid/objects#metaobject_definition). \n\n\n\n#### Access metaobjects individually\n\nThe access path for a metaobject consists of two layers:\n\n- type - The type of the parent metaobject definition.\n- handle - The unique [handle](/docs/api/liquid/basics#handles) of the metaobject.\n\nGiven this, you can access a metaobject with the following syntax:\n\n```liquid\n{{ shop.metaobjects.type.handle }}\n```\n\nYou can also use square bracket notation:\n\n```liquid\n{{ shop.metaobjects['type']['handle'] }}\n```\n\nA metaobjects's field values can be accessed using the key of the desired field:\n\n```liquid\n{{ shop.metaobjects.testimonials.homepage.title }}\n{{ shop.metaobjects['highlights']['washable'].image.value }}\n```\n\n> Note:\n> When the [`publishable` capability](/apps/data-extensions/metaobjects/capabilities) is enabled, a metaobject can only be accessed if its status is `active`.  If its status is `draft`, then the return value is `nil`.\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/metaobject)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "system": {
        "type": "object",
        "description": "Basic information about the metaobject. These properties are grouped under the `system` object to avoid collisions between system property names and user-defined metaobject fields. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/metaobject#system)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "metaobject_system"
      }
    }
  },
  "metaobject_system": {
    "summary": "Basic information about a [`metaobject`](/api/liquid/objects#metaobject). These properties are grouped under the `system` object to avoid collisions between system property names and user-defined metaobject fields.",
    "description": 'Basic information about a [`metaobject`](https://shopify.dev/api/liquid/objects#metaobject). These properties are grouped under the `system` object to avoid collisions between system property names and user-defined metaobject fields. \n\n\n\n#### Using the `metaobject_system` object\n\nYou can access the `metaobject_system` object and its properties through the metaobject\'s `system` property. You can use the following syntax:\n\n```liquid\n{{ shop.metaobjects.testimonials["home_page"].system.id }}\n```\n\nYou can also access `metaobject_system` properties when iterating over a list of metaobjects:\n\n```liquid\n{% for metaobject in product.metafields.custom.mixed_metaobject_list.value %}\n  {% if metaobject.system.type == "testimonial" %}\n    {% render \'testimonial\' with metaobject as testimonial  %}\n  {% else %}\n    {{ metaobject.system.handle }}\n  {% endif %}\n{% endfor %}\n```\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/metaobject_system)\n\n\nLast Updated: 6th April 2023\n\n\n',
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "description": "The type of the metaobject definition. This is a free-form string that's defined when the metaobject definition is created.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/metaobject_system#type)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "handle": {
        "type": "string",
        "description": "The unique [handle](https://shopify.dev/api/liquid/basics#handles) of the metaobject. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/metaobject_system#handle)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "id": {
        "type": "number",
        "description": "The ID of the metaobject. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/metaobject_system#id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "model": {
    "summary": "A 3D model uploaded as product media.",
    "description": "A 3D model uploaded as product media. \n\n**Tip**\n\n> Use the [`model_viewer_tag` filter](https://shopify.dev/docs/api/liquid/filters/model_viewer_tag) to output a [Google model viewer component](https://modelviewer.dev)\n> for the model.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/model)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "sources": {
        "type": "array",
        "description": "The source files for the model. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/model#sources)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "model_source"
      },
      "alt": {
        "type": "string",
        "description": "The alt text of the model. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/model#alt)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "id": {
        "type": "number",
        "description": "The ID of the model. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/model#id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "media_type": {
        "type": "string",
        "description": "The media type of the model. Always returns `model`. \n\n\n\n#### Filter for media of a specific type\n\nYou can use the `media_type` property with the [`where` filter](/docs/api/liquid/filters/where) to filter the [`product.media` array](/docs/api/liquid/objects/product#product-media) for all media of a desired type.\n\n\n```liquid\n\n{% assign models = product.media | where: 'media_type', 'model' %}\n\n{% for model in models %}\n  {{- model | model_viewer_tag }}\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/model#media_type)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "position": {
        "type": "number",
        "description": "The position of the model in the [`product.media`](https://shopify.dev/docs/api/liquid/objects/product#product-media) array. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/model#position)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "preview_image": {
        "type": "object",
        "description": "A preview image for the model. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/model#preview_image)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "image"
      }
    }
  },
  "model_source": {
    "summary": "A model source file.",
    "description": "A model source file. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/model_source)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "format": {
        "type": "string",
        "description": "The format of the model source file. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/model_source#format)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "mime_type": {
        "type": "string",
        "description": "The [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) of the model source file. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/model_source#mime_type)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "url": {
        "type": "string",
        "description": "The [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) of the model source file. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/model_source#url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "money": {
    "summary": "A money value, in the the customer's local (presentment) currency.",
    "description": "A money value, in the the customer's local (presentment) currency. \n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.\n\n#### Referencing money objects directly\n\nWhen a money object is referenced directly, the money value in cents is returned.\n\n\n```liquid\n\n{{ product.metafields.details.price_per_100g.value }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/money)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "currency": {
        "type": "object",
        "description": "The customer's local (presentment) currency. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/money#currency)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "currency"
      }
    }
  },
  "order": {
    "summary": "An [order](https://help.shopify.com/manual/orders).",
    "template": [
      "customers/order"
    ],
    "description": "An [order](https://help.shopify.com/manual/orders). \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "discounts": {
        "type": "object",
        "description": "\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F\n\nDeprecated because not all discount types and details are captured.\n\nThe `order.discounts` property has been replaced by [`order.discount_applications`](/docs/api/liquid/objects/order#order-discount_applications).\n\n---\n\nThe discounts on the order. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#discounts)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "discount"
      },
      "attributes": {
        "type": "any",
        "description": "The attributes on the order. If there are no attributes on the order, then `nil` is returned.\n\n\n**Tip**\n\n> Attributes are [collected with the cart](https://shopify.dev/themes/architecture/templates/cart#support-cart-notes-and-attributes).\n\n#### Output the attributes\n\n```liquid\n<ul>\n  {% for attribute in order.attributes -%}\n    <li><strong>{{ attribute.first }}:</strong> {{ attribute.last }}</li>\n  {%- endfor %}\n</ul>\n```\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#attributes)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "cancel_reason": {
        "type": "string",
        "description": "The reason that the order was cancelled. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#cancel_reason)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "literal": [
          "customer",
          "declined",
          "fraud",
          "inventory",
          "other"
        ]
      },
      "cancel_reason_label": {
        "type": "string",
        "description": "The localized version of the [cancellation reason](https://shopify.dev/docs/api/liquid/objects/order#order-cancel_reason) for the order. \n\n**Tip**\n\n> Use this property to output the cancellation reason on the storefront.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#cancel_reason_label)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "cancelled": {
        "type": "boolean",
        "description": "Returns `true` if the order was cancelled. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#cancelled)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "cancelled_at": {
        "type": "string",
        "description": "A timestamp for when the order was cancelled. \n\n**Tip**\n\n> Use the [`date` filter](https://shopify.dev/docs/api/liquid/filters/date) to format the timestamp.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#cancelled_at)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "cart_level_discount_applications": {
        "type": "array",
        "description": "The discount applications that apply at the order level. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#cart_level_discount_applications)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "discount_application"
      },
      "created_at": {
        "type": "string",
        "description": "A timestamp for when the order was created. \n\n**Tip**\n\n> Use the [`date` filter](https://shopify.dev/docs/api/liquid/filters/date) to format the timestamp.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#created_at)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "total_duties": {
        "type": "number",
        "description": "The sum of all duties applied to the line items in the order in the currency's subunit. If there are no duties, then `nil` is returned. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#total_duties)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "customer_url": {
        "type": "string",
        "description": "The URL for the customer to view the order in their account. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#customer_url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "customer": {
        "type": "object",
        "description": "The customer that placed the order. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#customer)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "customer"
      },
      "discount_applications": {
        "type": "array",
        "description": "All of the discount applications for the order and its line items. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#discount_applications)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "discount_application"
      },
      "total_discounts": {
        "type": "number",
        "description": "The total amount of all discounts applied to the order in the currency's subunit. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#total_discounts)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "total_net_amount": {
        "type": "number",
        "description": "The net amount of the order in the currency's subunit. The amount is calculated after refunds are applied, so is equal to `order.total_price` minus `order.total_refunded_amount`.\n\nThe value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#total_net_amount)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "tax_price": {
        "type": "number",
        "description": "The total amount of taxes applied to the order in the currency's subunit. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#tax_price)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "total_refunded_amount": {
        "type": "number",
        "description": "The total amount that's been refunded from the order in the currency's subunit. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#total_refunded_amount)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "email": {
        "type": "string",
        "description": "The email that's associated with the order. If no email is associated with the order, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#email)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "financial_status": {
        "type": "string",
        "description": "The order's financial status. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#financial_status)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "literal": [
          "authorized",
          "expired",
          "paid",
          "partially_paid",
          "partially_refunded",
          "pending",
          "refunded",
          "unpaid",
          "voided"
        ]
      },
      "financial_status_label": {
        "type": 22,
        "description": "The localized version of the [financial status](https://shopify.dev/docs/api/liquid/objects/order#order-financial_status) of the order. \n\n**Tip**\n\n> Use this property to output the financial status on the storefront.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#financial_status_label)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "fulfillment_status": {
        "type": "string",
        "description": "The fulfillment status of the order. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#fulfillment_status)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "fulfillment_status_label": {
        "type": "string",
        "description": "The localized version of the [fulfillment status](https://shopify.dev/docs/api/liquid/objects/order#order-fulfillment_status) of the order. \n\n**Tip**\n\n> Use this property to output the fulfillment status on the storefront.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#fulfillment_status_label)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "literal": [
          "complete",
          "fulfilled",
          "partial",
          "restocked",
          "unfulfilled"
        ]
      },
      "id": {
        "type": "string",
        "description": "The ID of the order. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "metafields": {
        "type": "any",
        "description": "The [metafields](https://shopify.dev/docs/api/liquid/objects/metafield) applied to the order. \n\n**Tip**\n\n> To learn about how to create metafields, refer to [Create and manage metafields](https://shopify.dev/apps/metafields/manage) or visit\n> the [Shopify Help Center](https://help.shopify.com/manual/metafields).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#metafields)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "name": {
        "type": "string",
        "description": "The name of the order. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "note": {
        "type": "string",
        "description": "The note on the order. If there's no note on the order, then `nil` is returned.\n\n\n**Tip**\n\n> Notes are [collected with the cart](https://shopify.dev/themes/architecture/templates/cart#support-cart-notes-and-attributes).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#note)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "order_number": {
        "type": "number",
        "description": "The integer representation of the order [name](https://shopify.dev/docs/api/liquid/objects/order#order-name). \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#order_number)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "order_status_url": {
        "type": "string",
        "description": "The URL for the [order status page](https://help.shopify.com/manual/orders/status-tracking) for the order. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#order_status_url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "customer_order_url": {
        "type": "string",
        "description": "The URL for the new order details page. The new customer accounts includes a list of Buyers Orders and an Order Details View.\nThis liquid function exposes a URL to a specific Orders Details in new customer accounts.\n[Setup process for the new order details page](https://help.shopify.com/en/manual/customers/customer-accounts/new-customer-accounts)\ncan be found in the help center.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#customer_order_url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "phone": {
        "type": "string",
        "description": "The phone number associated with the order. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#phone)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "shipping_address": {
        "type": "object",
        "description": "The shipping address of the order. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#shipping_address)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "address"
      },
      "billing_address": {
        "type": "object",
        "description": "The billing address of the order. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#billing_address)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "address"
      },
      "tags": {
        "type": "array",
        "description": "The [tags](https://help.shopify.com/manual/shopify-admin/productivity-tools/using-tags) on the order. The tags are returned in alphabetical order.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#tags)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "tax_lines": {
        "type": "array",
        "description": "The tax lines on the order. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#tax_lines)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "tax_line"
      },
      "transactions": {
        "type": "array",
        "description": "The transactions of the order. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#transactions)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "transaction"
      },
      "line_items": {
        "type": "array",
        "description": "The line items in the order. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#line_items)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "line_item"
      },
      "subtotal_line_items": {
        "type": "array",
        "description": "The non-tip line items in the order. \n\n**Note**\n\n> These line items are used to calculate the the [subtotal price](https://shopify.dev/docs/api/liquid/objects/order#order-subtotal_price).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#subtotal_line_items)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "line_item"
      },
      "item_count": {
        "type": "number",
        "description": "The number of items in the order. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#item_count)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "shipping_methods": {
        "type": "array",
        "description": "The shipping methods for the order. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#shipping_methods)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "shipping_method"
      },
      "line_items_subtotal_price": {
        "type": "number",
        "description": "The sum of the prices of all of the line items in the order in the currency's subunit, after any line item discounts have\nbeen applied. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#line_items_subtotal_price)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "subtotal_price": {
        "type": "number",
        "description": "The sum of the prices of the [subtotal line items](https://shopify.dev/docs/api/liquid/objects/order#order-subtotal_line_items) in the currency's subunit, after any line item or\ncart discounts have been applied. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#subtotal_price)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "total_price": {
        "type": "number",
        "description": "The total price of the order in the currency's subunit. \n\n**Note**\n\n> The total price is calculated before refunds are applied. Use [`order.total_net_amount`](https://shopify.dev/docs/api/liquid/objects/order#order-total_net_amount)\n> to output the total minus any refunds.\n\nThe value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#total_price)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "shipping_price": {
        "type": "number",
        "description": "The shipping price of the order in the currency's subunit. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order#shipping_price)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "page": {
    "summary": "A [page](https://help.shopify.com/manual/online-store/themes/theme-structure/pages) on a store.",
    "template": [
      "page"
    ],
    "description": "A [page](https://help.shopify.com/manual/online-store/themes/theme-structure/pages) on a store. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/page)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "id": {
        "type": "number",
        "description": "The ID of the page. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/page#id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "author": {
        "type": "string",
        "description": "The author of the page. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/page#author)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "handle": {
        "type": "string",
        "description": "The [handle](https://shopify.dev/docs/api/liquid/basics#handles) of the page. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/page#handle)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "title": {
        "type": "string",
        "description": "The title of the page. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/page#title)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "template_suffix": {
        "type": "string",
        "description": "The name of the [custom template](https://shopify.dev/themes/architecture/templates#alternate-templates) assigned to the page. The name doesn't include the `page.` prefix, or the file extension (`.json` or `.liquid`).\n\n If a custom template isn't assigned to the page, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/page#template_suffix)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "content": {
        "type": "string",
        "description": "The content of the page. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/page#content)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "url": {
        "type": "string",
        "description": "The relative URL of the page. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/page#url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "metafields": {
        "type": "any",
        "description": "The [metafields](https://shopify.dev/docs/api/liquid/objects/metafield) applied to the page. \n\n**Tip**\n\n> To learn about how to create metafields, refer to [Create and manage metafields](https://shopify.dev/apps/metafields/manage) or visit\n> the [Shopify Help Center](https://help.shopify.com/manual/metafields).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/page#metafields)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "published_at": {
        "type": "string",
        "description": "A timestamp for when the page was published. \n\n**Tip**\n\n> Use the [`date` filter](https://shopify.dev/docs/api/liquid/filters/date) to format the timestamp.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/page#published_at)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "paginate": {
    "summary": "Information about the pagination inside a set of [`paginate` tags](/docs/api/liquid/tags/paginate).",
    "description": "Information about the pagination inside a set of [`paginate` tags](https://shopify.dev/docs/api/liquid/tags/paginate). \n\n**Tip**\n\n> Use the [`default_pagination` filter](https://shopify.dev/docs/api/liquid/filters/default_pagination) to output pagination links.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/paginate)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "page_size": {
        "type": "number",
        "description": "The number of items displayed per page. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/paginate#page_size)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "current_offset": {
        "type": "number",
        "description": "The total number of items on pages previous to the current page. For example, if you show 5 items per page and are on page 3, then the value of `paginate.current_offset` is 10.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/paginate#current_offset)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "current_page": {
        "type": "number",
        "description": "The page number of the current page. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/paginate#current_page)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "items": {
        "type": "number",
        "description": "The total number of items to be paginated. For example, if you paginate a collection of 120 products, then the value of `paginate.items` is 120.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/paginate#items)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "parts": {
        "type": "array",
        "description": "The pagination parts. Pagination parts are used to build pagination navigation.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/paginate#parts)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "part"
      },
      "next": {
        "type": "object",
        "description": "The pagination part to go to the next page. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/paginate#next)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "part"
      },
      "previous": {
        "type": "object",
        "description": "The pagination part to go to the previous page. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/paginate#previous)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "part"
      },
      "pages": {
        "type": "number",
        "description": "The total number of pages. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/paginate#pages)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "page_param": {
        "type": "string",
        "description": "The URL parameter denoting the pagination. The default value is `page`.\n\nIf you paginate over an array defined in a setting or a metafield list type, then a unique key is appended to page to allow the paginated list to\noperate independently from other lists on the page. For example, a paginated list defined in a setting might use the key\n`page_a9e329dc`.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/paginate#page_param)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "predictive_search": {
    "summary": "Information about the results from a predictive search query through the\n[Predictive Search API](/api/ajax/reference/predictive-search#get-locale-search-suggest).",
    "description": "Information about the results from a predictive search query through the\n[Predictive Search API](https://shopify.dev/api/ajax/reference/predictive-search#get-locale-search-suggest). \n\n**Note**\n\n> The `predictive_search` object returns results only when rendered in a section using the Predictive Saerch API and the\n[Section Rendering API](https://shopify.dev/api/section-rendering). To learn about how to include predictive search in your theme,\n> refer to [Add predictive search to your theme](https://shopify.dev/themes/navigation-search/search/predictive-search).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/predictive_search)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "performed": {
        "type": "boolean",
        "description": "Returns `true` when being referenced inside a section that's been rendered using the Predictive Search API and\nthe Section Rendering API. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/predictive_search#performed)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "resources": {
        "type": "object",
        "description": "The resources associated with the query. You can check whether any resources of a specific type were returned using the [`size` filter](https://shopify.dev/docs/api/liquid/filters/size).\n\n```liquid\n{% if predictive_search.resources.articles.size > 0 %}\n  {% for article in predictive_search.resources.articles %}\n    {{ article.title }}\n  {% endfor %}\n{% endif %}\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/predictive_search#resources)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "predictive_search_resources"
      },
      "terms": {
        "type": "string",
        "description": "The entered search terms. \n\n**Tip**\n\n> Use the [`highlight` filter](https://shopify.dev/docs/api/liquid/filters/highlight) to highlight the search terms in search results content.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/predictive_search#terms)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "types": {
        "type": "array",
        "description": "The object types that the search was performed on. Searches can be performed on the following object types:\n\n- [`article`](https://shopify.dev/docs/api/liquid/objects/article)\n- [`collection`](https://shopify.dev/docs/api/liquid/objects/collection)\n- [`page`](https://shopify.dev/docs/api/liquid/objects/page)\n- [`product`](https://shopify.dev/docs/api/liquid/objects/product)\n\n\n\n**Note**\n\n> The types are determined by the [`types` query parameter](https://shopify.dev/api/ajax/reference/predictive-search#query-parameters).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/predictive_search#types)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "selling_plan_price_adjustment": {
    "summary": "Information about how a selling plan changes the price of a variant for a given period of time.",
    "description": "Information about how a selling plan changes the price of a variant for a given period of time. To learn about how to support selling plans in your theme, refer to [Purchase options](https://shopify.dev/themes/pricing-payments/purchase-options).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_price_adjustment)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "order_count": {
        "type": "number",
        "description": "The number of orders that the price adjustment applies to. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_price_adjustment#order_count)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "position": {
        "type": "number",
        "description": "The 1-based index of the price adjustment in the [`selling_plan.price_adjustments` array](https://shopify.dev/docs/api/liquid/objects/selling_plan#selling_plan-price_adjustments). \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_price_adjustment#position)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "value_type": {
        "type": "string",
        "description": "The type of price adjustment. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_price_adjustment#value_type)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "literal": [
          "percentage",
          "fixed_amount",
          "price"
        ]
      },
      "value": {
        "type": "number",
        "description": "The value of the price adjustment as a decimal. How this value is interpreted depends on the [value type](https://shopify.dev/docs/api/liquid/objects/selling_plan_price_adjustment#selling_plan_price_adjustment-value_type) of\nthe price adjustment. The following table outlines what the value represents for each value type:\n\n| Value type | Value |\n| --- | --- |\n| `fixed_amount` | The amount that the original price is being adjusted by, in the currency's subunit. |\n| `percentage` | The percent amount that the original price is being adjusted by. |\n| `price` | The adjusted amount in the currency's subunit. |\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_price_adjustment#value)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "product": {
    "summary": "A [product](https://help.shopify.com/manual/products) in the store.",
    "template": [
      "product"
    ],
    "description": "A [product](https://help.shopify.com/manual/products) in the store. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "variants": {
        "type": "array",
        "description": "The variants of the product. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#variants)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "variant"
      },
      "images": {
        "type": "array",
        "description": "The images attached to the product. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#images)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "image"
      },
      "metafields": {
        "type": "any",
        "description": "The [metafields](https://shopify.dev/docs/api/liquid/objects/metafield) applied to the product. \n\n**Tip**\n\n> To learn about how to create metafields, refer to [Create and manage metafields](https://shopify.dev/apps/metafields/manage) or visit\n> the [Shopify Help Center](https://help.shopify.com/manual/metafields).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#metafields)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "options_with_values": {
        "type": "array",
        "description": "The options on the product. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#options_with_values)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "product_option"
      },
      "id": {
        "type": "number",
        "description": "The ID of the product. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "title": {
        "type": "string",
        "description": "The title of the product. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#title)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "handle": {
        "type": "string",
        "description": "The [handle](https://shopify.dev/docs/api/liquid/basics#handles) of the product. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#handle)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "template_suffix": {
        "type": "string",
        "description": "The name of the [custom template](https://shopify.dev/themes/architecture/templates#alternate-templates) of the product. The name doesn't include the `product.` prefix, or the file extension (`.json` or `.liquid`).\n\nIf a custom template isn't assigned to the product, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#template_suffix)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "vendor": {
        "type": "string",
        "description": "The vendor of the product. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#vendor)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "description": {
        "type": "string",
        "description": "The description of the product. \n\n**Note**\n\n> This is the same value as [`product.content`](https://shopify.dev/docs/api/liquid/objects/product#product-content).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#description)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "content": {
        "type": "string",
        "description": "The description of the product. \n\n**Note**\n\n> This is the same value as [`product.description`](https://shopify.dev/docs/api/liquid/objects/product#product-description).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#content)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "featured_image": {
        "type": "object",
        "description": "The first (featured) image attached to the product. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#featured_image)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "image"
      },
      "featured_media": {
        "type": "object",
        "description": "The first (featured) media attached to the product. \n\n**Tip**\n\n> You can use [media filters](https://shopify.dev/docs/api/liquid/filters/media-filters) to output media URLs and displays. To learn about how\n> to include media in your theme, refer to [Support product media](https://shopify.dev/themes/product-merchandising/media/support-media).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#featured_media)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "media"
      },
      "media": {
        "type": "array",
        "description": "The media attached to the product, sorted by the date it was added to the product. \n\n**Tip**\n\n> You can use [media filters](https://shopify.dev/docs/api/liquid/filters/media-filters) to output media URLs and displays. To learn about how\n> to include media in your theme, refer to [Support product media](https://shopify.dev/themes/product-merchandising/media/support-media).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#media)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "media"
      },
      "price_min": {
        "type": "number",
        "description": "The lowest price of any variants of the product in the currency's subunit. \n\n**Note**\n\n> This is the same value as [`product.price`](https://shopify.dev/docs/api/liquid/objects/product#product-price).\n\nThe value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#price_min)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "price": {
        "type": "number",
        "description": "The lowest price of any variants of the product in the currency's subunit. \n\n**Note**\n\n> This is the same value as [`product.price_min`](https://shopify.dev/docs/api/liquid/objects/product#product-price_min).\n\nThe value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#price)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "price_max": {
        "type": "number",
        "description": "The highest price of any variants of the product in the currency's subunit. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#price_max)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "price_varies": {
        "type": "boolean",
        "description": "Returns `true` if the product's variant prices vary. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#price_varies)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "selected_or_first_available_variant": {
        "type": "object",
        "description": "The currently selected or first available variant of the product. \n\n**Note**\n\n> The selected variant is determined by the `variant` URL parameter. The `selected_variant` parameter is available on product pages only.\n\nFor a variant to be available, it needs to meet one of the following criteria:\n\n- The `variant.inventory_quantity` is greater than 0.\n- The `variant.inventory_policy` is set to `continue`.\n- The `variant.inventory_management` is `nil`.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#selected_or_first_available_variant)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "variant"
      },
      "collections": {
        "type": "array",
        "description": "The collections that the product belongs to. \n\n**Note**\n\n> Collections that aren't [available](https://help.shopify.com/manual/products/collections/make-collections-available) on\n> the Online Store sales channel aren't included.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#collections)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "collection"
      },
      "selected_variant": {
        "type": "object",
        "description": "The currently selected variant of the product. If no variant is currently selected, then `nil` is returned.\n\n\n\n**Note**\n\n> The selected variant is determined by the `variant` URL parameter. This URL parameter is available on product pages URLs only.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#selected_variant)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "variant"
      },
      "first_available_variant": {
        "type": "object",
        "description": "The first available variant of the product. For a variant to be available, it needs to meet one of the following criteria:\n\n- The `variant.inventory_quantity` is greater than 0.\n- The `variant.inventory_policy` is set to `continue`.\n- The `variant.inventory_management` is `nil`.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#first_available_variant)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "variant"
      },
      "available": {
        "type": "boolean",
        "description": "Returns `true` if at least one of the variants of the product is available. Returns `false` if not. For a variant to be available, it needs to meet one of the following criteria:\n\n- The `variant.inventory_quantity` is greater than 0.\n- The `variant.inventory_policy` is set to `continue`.\n- The `variant.inventory_management` is `nil`.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#available)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "options": {
        "type": "array",
        "description": "The option names of the product. \n\n\n\n#### Output the options\n\nYou can use the [`size` filter](/docs/api/liquid/filters/size) with dot notation to determine how many options a product has.\n\n\n```liquid\n\n{% if product.options.size > 0 -%}\n  {% for option in product.options -%}\n    - {{ option }}\n  {%- endfor %}\n{%- endif %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#options)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "type": {
        "type": "string",
        "description": "The type of the product. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#type)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "compare_at_price_min": {
        "type": "number",
        "description": "The lowest **compare at** price of any variants of the product in the currency's subunit. This is the same as\n`product.compare_at_price`. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#compare_at_price_min)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "compare_at_price_max": {
        "type": "number",
        "description": "The highest **compare at** price of any variants of the product in the currency's subunit. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#compare_at_price_max)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "compare_at_price": {
        "type": "number",
        "description": "The lowest **compare at** price of any variants of the product in the currency's subunit. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#compare_at_price)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "compare_at_price_varies": {
        "type": "boolean",
        "description": "Returns `true` if the variant **compare at** prices of the product vary. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#compare_at_price_varies)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "url": {
        "type": "string",
        "description": "The relative URL of the product. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "tags": {
        "type": "array",
        "description": "The [tags](https://help.shopify.com/manual/shopify-admin/productivity-tools/using-tags) of the product. \n\n**Note**\n\n> The tags are returned in alphabetical order.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#tags)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "published_at": {
        "type": "string",
        "description": "A timestamp for when the product was published. \n\n**Tip**\n\n> Use the [`date` filter](https://shopify.dev/docs/api/liquid/filters/date) to format the timestamp.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#published_at)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "created_at": {
        "type": "string",
        "description": "A timestamp for when the product was created. \n\n**Tip**\n\n> Use the [`date` filter](https://shopify.dev/docs/api/liquid/filters/date) to format the timestamp.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#created_at)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "options_by_name": {
        "type": "any",
        "description": "Allows you to access a specific [product option](https://shopify.dev/docs/api/liquid/objects/product_option) by its name. \n\n\n\n#### Output the values for a specific option\n\nWhen accessing a specific option, the name is case-insensitive.\n\n```liquid\n\n<label>\n  Strength\n  <select>\n    {%- for value in product.options_by_name['strength'].values %}\n    <option>{{ value }}</option>\n    {%- endfor %}\n  </select>\n</label>\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#options_by_name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "has_only_default_variant": {
        "type": "boolean",
        "description": "Returns `true` if the product doesn't have any options. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#has_only_default_variant)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "requires_selling_plan": {
        "type": "boolean",
        "description": "Returns `true` if all of the variants of the product require a selling plan. Returns `false` if not. \n\n**Note**\n\n> A variant requires a selling plan if [`variant.requires_selling_plan`](https://shopify.dev/docs/api/liquid/objects/variant#variant-requires_selling_plan)\n> is `true`.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#requires_selling_plan)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "selling_plan_groups": {
        "type": "array",
        "description": "The selling plan groups that the variants of the product are included in. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#selling_plan_groups)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "selling_plan_group"
      },
      "selected_selling_plan": {
        "type": "object",
        "description": "The currently selected selling plan. If no selling plan is selected, then `nil` is returned.\n\n\n\n**Note**\n\n> The selected selling plan is determined by the `selling_plan` URL parameter.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#selected_selling_plan)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "selling_plan"
      },
      "selected_selling_plan_allocation": {
        "type": "object",
        "description": "The currently selected selling plan allocation for the currently selected variant. If no variant and selling plan are selected, then `nil` is returned.\n\n\n\n**Note**\n\n> The selected variant is determined by the `variant` URL parameter, and the selected selling plan is determined by the\n> `selling_plan` URL parameter.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#selected_selling_plan_allocation)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "selling_plan_allocation"
      },
      "selected_or_first_available_selling_plan_allocation": {
        "type": "object",
        "description": "The currently selected, or first available, selling plan allocation. The following logic is used to determine which selling plan allocation is returned:\n\n| Selling plan allocation | Return criteria |\n| --- | --- |\n| The currently selected allocation | Returned if a variant and selling plan are selected.<br><br>The selected variant is determined by the `variant` URL parameter, and the selected selling plan is determined by the `selling_plan` URL parameter. |\n| The first allocation on the first available variant | Returned if no allocation is currently selected. |\n| The first allocation on the first variant | Returned if no allocation is currently selected, and there are no available variants. |\n\nIf the product doesn't have any selling plans, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#selected_or_first_available_selling_plan_allocation)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "selling_plan_allocation"
      },
      "gift_card?": {
        "type": "boolean",
        "description": "Returns `true` if the product is a gift card. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product#gift_card?)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "product_option": {
    "summary": "A product option, such as size or color.",
    "description": "A product option, such as size or color. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product_option)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "description": "The name of the product option. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product_option#name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "position": {
        "type": "number",
        "description": "The 1-based index of the product option in the [`product.options_with_values` array](https://shopify.dev/docs/api/liquid/objects/product#product-options_with_values). \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product_option#position)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "values": {
        "type": "array",
        "description": "The possible values for the product option. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product_option#values)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "selected_value": {
        "type": "string",
        "description": "The currently selected product option value. If no value is currently selected, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product_option#selected_value)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "variant": {
    "summary": "A [product variant](https://help.shopify.com/manual/products/variants).",
    "description": "A [product variant](https://help.shopify.com/manual/products/variants). \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "metafields": {
        "type": "any",
        "description": "The [metafields](https://shopify.dev/docs/api/liquid/objects/metafield) applied to the variant. \n\n**Tip**\n\n> To learn about how to create metafields, refer to [Create and manage metafields](https://shopify.dev/apps/metafields/manage) or visit\n> the [Shopify Help Center](https://help.shopify.com/manual/metafields).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#metafields)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "product": {
        "type": "object",
        "description": "The parent product of the variant. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#product)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "product"
      },
      "selected": {
        "type": "boolean",
        "description": "Returns `true` if the variant is currently selected. Returns `false` if it's not. \n\n**Note**\n\n> The selected variant is determined by the `variant` URL parameter. This URL parameter is available on product pages URLs only.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#selected)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "matched": {
        "type": "boolean",
        "description": "Returns `true` if the variant has been matched by a [storefront filter](https://shopify.dev/themes/navigation-search/filtering/storefront-filtering).\nReturns `false` if it hasn't. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#matched)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "id": {
        "type": "number",
        "description": "The ID of the variant. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "title": {
        "type": "string",
        "description": "A concatenation of each variant option, separated by a `/`. \n\n\n\n#### The variant title\n\n```liquid\n\n{{ product.variants.first.title }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#title)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "quantity_rule": {
        "type": "object",
        "description": "Returns the specified quantity rule for the variant if one exists in the current customer context. Otherwise returns `min=1,max=nil,increment=1` if the variant does not have any quantity rule. \n\n**Note**\n\n> The default quantity rule is `min=1,max=null,increment=1`.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#quantity_rule)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "quantity_rule"
      },
      "price": {
        "type": "number",
        "description": "The price of the variant in the currency's subunit. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#price)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "compare_at_price": {
        "type": "number",
        "description": "The **compare at** price of the variant in the currency's subunit. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#compare_at_price)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "selected_selling_plan_allocation": {
        "type": "object",
        "description": "The selected `selling_plan_allocation`. If no selling plan is selected, then `nil` is returned.\n\n\n\n**Note**\n\n> The selected selling plan is determined by the `selling_plan` URL parameter.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#selected_selling_plan_allocation)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "selling_plan_allocation"
      },
      "selling_plan_allocations": {
        "type": "array",
        "description": "The `selling_plan_allocation` objects for the variant. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#selling_plan_allocations)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "selling_plan_allocation"
      },
      "sku": {
        "type": "string",
        "description": "The SKU of the variant. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#sku)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "barcode": {
        "type": "string",
        "description": "The barcode of the variant. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#barcode)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "available": {
        "type": "boolean",
        "description": "Returns `true` if the variant is available. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#available)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "options": {
        "type": "string",
        "description": "The values of the variant for each [product option](https://shopify.dev/docs/api/liquid/objects/product_option). \n\n\n\n#### Output the options of each variant\n\n```liquid\n\n{% for variant in product.variants -%}\n  {%- capture options -%}\n    {% for option in variant.options -%}\n      {{ option }}{%- unless forloop.last -%}/{%- endunless -%}\n    {%- endfor %}\n  {%- endcapture -%}\n  \n  {{ variant.id }}: {{ options }}\n{%- endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#options)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "option1": {
        "type": "string",
        "description": "The value of the variant for the first product option. If there's no first product option, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#option1)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "option2": {
        "type": "string",
        "description": "The value of the variant for the second product option. If there's no second product option, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#option2)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "option3": {
        "type": "string",
        "description": "The value of the variant for the third product option. If there's no third product option, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#option3)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "url": {
        "type": "string",
        "description": "The URL of the variant. Variant URLs use the following structure:\n\n```\n/products/[product-handle]?variant=[variant-id]\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "weight_unit": {
        "type": "string",
        "description": "The unit for the weight of the variant. \n\n**Tip**\n\n> To output the weight of a variant in this unit, use this property, and the `variant.weight_in_unit` property, with the\n> [`weight_with_unit` filter](https://shopify.dev/docs/api/liquid/filters/weight_with_unit).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#weight_unit)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "weight_in_unit": {
        "type": "number",
        "description": "The weight of the variant in the unit specified by `variant.weight_unit`. \n\n**Tip**\n\n> To output this weight, use this property, and the `variant.weight_unit` property, with the [`weight_with_unit` filter](https://shopify.dev/docs/api/liquid/filters/weight_with_unit).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#weight_in_unit)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "weight": {
        "type": "number",
        "description": "The weight of the variant in grams. \n\n**Tip**\n\n> Use the [`weight_with_unit`](https://shopify.dev/docs/api/liquid/filters/weight_with_unit) filter to format the weight in\n> [the store's format](https://www.shopify.com/admin/settings/general).\n>\n> Use `variant.weight_in_unit` to output the weight in the unit configured on the variant.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#weight)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "unit_price_measurement": {
        "type": "object",
        "description": "The unit price measurement of the variant. \n\n**Note**\n\n> Unit prices are available only to stores located in Germany and France.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#unit_price_measurement)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "unit_price_measurement"
      },
      "unit_price": {
        "type": "number",
        "description": "The [unit price](https://help.shopify.com/manual/intro-to-shopify/initial-setup/sell-in-france/price-per-unit#add-unit-prices-to-your-product)\nof the variant in the currency's subunit. The price reflects any discounts that are applied to the line item. The value is output in the customer's local\n(presentment) currency.\n\n\n\n**Note**\n\n> Unit prices are available only to stores located in Germany and France.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#unit_price)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "inventory_quantity": {
        "type": "number",
        "description": "The inventory quantity of the variant. If inventory isn't tracked, then the number of items sold is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#inventory_quantity)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "inventory_management": {
        "type": "string",
        "description": "The inventory management service of the variant. If inventory isn't tracked, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#inventory_management)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "inventory_policy": {
        "type": "string",
        "description": "Whether the variant should continue to be sold when it's out of stock. \n\n**Tip**\n\n> To learn about why merchants might want to continue selling products when they're out of stock, visit the\n> [Shopify Help Center](https://help.shopify.com/manual/products/inventory/getting-started-with-inventory/selling-when-out-of-stock).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#inventory_policy)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "literal": [
          "continue",
          "deny"
        ]
      },
      "requires_shipping": {
        "type": "boolean",
        "description": "Returns `true` if the variant requires shipping. Returns `false` if it doesn't. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#requires_shipping)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "taxable": {
        "type": "boolean",
        "description": "Returns `true` if taxes should be charged on the variant. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#taxable)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "featured_image": {
        "type": "object",
        "description": "The image attached to the variant. \n\n**Note**\n\n> This is the same value as [`variant.image`](https://shopify.dev/docs/api/liquid/objects/variant#variant-image).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#featured_image)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "image"
      },
      "image": {
        "type": "object",
        "description": "The image attached to the variant. \n\n**Note**\n\n> This is the same value as [`variant.featured_image`](https://shopify.dev/docs/api/liquid/objects/variant#variant-featured_image).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#image)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "image"
      },
      "featured_media": {
        "type": "object",
        "description": "The first media object attached to the variant. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#featured_media)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "media"
      },
      "incoming": {
        "type": "boolean",
        "description": "Returns `true` if the variant has incoming inventory. Returns `false` if not. Incoming inventory information is populated by [inventory transfers](https://help.shopify.com/manual/products/inventory/transfers).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#incoming)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "next_incoming_date": {
        "type": "string",
        "description": "The arrival date for the next incoming inventory of the variant. Incoming inventory information is populated by [inventory transfers](https://help.shopify.com/manual/products/inventory/transfers).\n\n\n\n**Tip**\n\n> Use the [`date` filter](https://shopify.dev/docs/api/liquid/filters/date) to format the date.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#next_incoming_date)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "store_availabilities": {
        "type": "array",
        "description": "The store availabilities for the variant. The array is defined in only the following cases:\n\n- `variant.selected` is `true`\n- The variant is the product's first available variant. For example, `product.first_available_variant` or `product.selected_or_first_available_variant`.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#store_availabilities)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "store_availability"
      },
      "requires_selling_plan": {
        "type": "boolean",
        "description": "Returns `true` if the variant is set to require a `selling_plan` when being added to the cart. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant#requires_selling_plan)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "rating": {
    "summary": "Information for a [`rating` type](/apps/metafields/types) metafield.",
    "description": "Information for a [`rating` type](https://shopify.dev/apps/metafields/types) metafield. \n\n**Tip**\n\n> To learn about metafield types, refer to [Metafield types](https://shopify.dev/apps/metafields/types).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/rating)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "rating": {
        "type": "number",
        "description": "The rating value. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/rating#rating)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "scale_min": {
        "type": "number",
        "description": "The minimum value of the rating scale. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/rating#scale_min)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "scale_max": {
        "type": "number",
        "description": "The maximum value of the rating scale. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/rating#scale_max)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "recipient": {
    "summary": "A recipient that is associated with a [gift card](https://help.shopify.com/manual/products/gift-card-products).",
    "template": [
      "gift_card.liquid"
    ],
    "description": "A recipient that is associated with a [gift card](https://help.shopify.com/manual/products/gift-card-products). \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/recipient)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "nickname": {
        "type": "string",
        "description": "The nickname of the recipient. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/recipient#nickname)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "email": {
        "type": "string",
        "description": "The email of the recipient. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/recipient#email)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "name": {
        "type": "string",
        "description": "The full name of the recipient. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/recipient#name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "recommendations": {
    "summary": "Product recommendations for a specific product based on sales data, product descriptions, and collection relationships.",
    "description": "Product recommendations for a specific product based on sales data, product descriptions, and collection relationships. Product recommendations become more accurate over time as new orders and product data become available. To learn more about\nhow product recommendations are generated, refer to [Product recommendations](https://shopify.dev/themes/product-merchandising/recommendations).\n\n\n\n**Note**\n\n> The `recommendations` object returns products only when rendered in a section using the [Product Recommendations API](https://shopify.dev/api/ajax/reference/product-recommendations)\n> and the [Section Rendering API](https://shopify.dev/api/section-rendering). To learn about how to include product recommendations in your theme,\n> refer to [Show product recommendations](https://shopify.dev/themes/product-merchandising/recommendations/show-product-recommendations).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/recommendations)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "performed?": {
        "type": "boolean",
        "description": "Returns `true` when being referenced inside a section that's been rendered using the Product Recommendations API and\nthe Section Rendering API. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/recommendations#performed?)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "products": {
        "type": "array",
        "description": "The recommended products. If `performed?` is `false`, then an [EmptyDrop](https://shopify.dev/docs/api/liquid/basics#emptydrop) is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/recommendations#products)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "product"
      },
      "products_count": {
        "type": "number",
        "description": "The number of recommended products. If `performed?` is `false`, then 0 is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/recommendations#products_count)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "intent": {
        "type": "string",
        "description": "The recommendation intent. If `performed?` is `false`, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/recommendations#intent)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "request": {
    "summary": "Information about the current URL and the associated page.",
    "global": true,
    "description": "Information about the current URL and the associated page. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/request)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "design_mode": {
        "type": "boolean",
        "description": "Returns `true` if the request is being made from within the theme editor. Returns `false` if not. You can use `request.design_mode` to control theme behavior depending on whether the theme is being viewed in the editor.\nFor example, you can prevent session data from being tracked by tracking scripts in the theme editor.\n\n> Caution:\n> You shouldn't use `request.design_mode` to change customer-facing functionality. The theme editor preview should match\n> what the merchant's customers see on the live store.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/request#design_mode)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "page_type": {
        "type": "string",
        "description": "The type of page being requested. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/request#page_type)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "literal": [
          "404",
          "article",
          "blog",
          "captcha",
          "cart",
          "collection",
          "list-collections",
          "customers/account",
          "customers/activate_account",
          "customers/addresses",
          "customers/login",
          "customers/order",
          "customers/register",
          "customers/reset_password",
          "gift_card",
          "index",
          "page",
          "password",
          "policy",
          "product",
          "search"
        ]
      },
      "host": {
        "type": "string",
        "description": "The domain that the request is hosted on. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/request#host)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "origin": {
        "type": "string",
        "description": "The protocol and host of the request. \n\n\n\n#### Create a context-aware absolute URL\n\nYou can use `request.origin` with any object, object property, or filter that returns a relative URL to build a context-aware absolute URL.\n\n\n```liquid\n\n{{ product.selected_variant.url | default: product.url | prepend: request.origin }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/request#origin)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "path": {
        "type": "string",
        "description": "The path of the request. \n\n**Note**\n\n> If the current path is for a page that doesn't exist, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/request#path)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "locale": {
        "type": "object",
        "description": "The locale of the request. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/request#locale)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "shop_locale"
      }
    }
  },
  "robots": {
    "summary": "The default rule groups for the `robots.txt` file.",
    "template": [
      "robots.txt.liquid"
    ],
    "description": "The default rule groups for the `robots.txt` file. \n\n**Tip**\n\n> You can [customize the `robots.txt` file](https://shopify.dev/themes/seo/robots-txt) with the [`robots.txt.liquid` template](/themes/architecture/templates/robots-txt-liquid).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/robots)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "default_groups": {
        "type": "array",
        "description": "The rule groups. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/robots#default_groups)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "group"
      }
    }
  },
  "group": {
    "summary": "A group of rules for the `robots.txt` file.",
    "description": "A group of rules for the `robots.txt` file. \n\n**Tip**\n\n> You can [customize the `robots.txt` file](https://shopify.dev/themes/seo/robots-txt) with the [`robots.txt.liquid` template](/themes/architecture/templates/robots-txt-liquid).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/group)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "user_agent": {
        "type": "object",
        "description": "The user agent for the group. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/group#user_agent)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "user_agent"
      },
      "rules": {
        "type": "array",
        "description": "The rules in the group. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/group#rules)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "rule"
      },
      "sitemap": {
        "type": "object",
        "description": "The sitemap for the group. If the group doesn't require a sitemap, then `blank` is returned.\n\nThe sitemap can be accessed at `/sitemap.xml`.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/group#sitemap)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "sitemap"
      }
    }
  },
  "rule": {
    "summary": "A rule for the `robots.txt` file, which tells crawlers which pages can, or can't, be accessed.",
    "description": "A rule for the `robots.txt` file, which tells crawlers which pages can, or can't, be accessed. A rule consists of a directive, which can be either `Allow` or `Disallow`, and a value of the associated URL path.\n\nFor example:\n\n```\nDisallow: /policies/\n```\n\nYou can output a rule directly, instead of referencing each of its properties.\n\n\n\n**Tip**\n\n> You can [customize the `robots.txt` file](https://shopify.dev/themes/seo/robots-txt) with the [`robots.txt.liquid` template](/themes/architecture/templates/robots-txt-liquid).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/rule)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "directive": {
        "type": "string",
        "description": "The directive of the rule. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/rule#directive)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "value": {
        "type": "string",
        "description": "The value of the rule. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/rule#value)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "routes": {
    "summary": "Allows you to generate standard URLs for the storefront.",
    "global": true,
    "description": "Allows you to generate standard URLs for the storefront. Using the `routes` object instead of hardcoding URLs helps ensure that your theme supports\n[multiple languages](https://shopify.dev/themes/internationalization/multiple-currencies-languages), as well as any possible changes in URL\nformat.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "root_url": {
        "type": "string",
        "description": "The index (home page) URL. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes#root_url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "account_url": {
        "type": "string",
        "description": "The [account page](https://help.shopify.com/manual/customers/customer-accounts) URL. Redirects to [new customer accounts](https://help.shopify.com/en/manual/customers/customer-accounts/new-customer-accounts) when enabled. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes#account_url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "account_login_url": {
        "type": "string",
        "description": "The [account login page](https://shopify.dev/themes/architecture/templates/customers-login) URL. Redirects to [new customer accounts](https://help.shopify.com/en/manual/customers/customer-accounts/new-customer-accounts) when enabled. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes#account_login_url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "account_logout_url": {
        "type": "string",
        "description": "The URL to log a customer out of their account. Redirects to [new customer accounts](https://help.shopify.com/en/manual/customers/customer-accounts/new-customer-accounts) when enabled. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes#account_logout_url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "account_recover_url": {
        "type": "string",
        "description": "The [password recovery page](https://shopify.dev/themes/architecture/templates/customers-reset-password) URL. Redirects to [new customer accounts](https://help.shopify.com/en/manual/customers/customer-accounts/new-customer-accounts) when enabled. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes#account_recover_url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "account_register_url": {
        "type": "string",
        "description": "The [account registration page](https://shopify.dev/themes/architecture/templates/customers-register) URL. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes#account_register_url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "account_addresses_url": {
        "type": "string",
        "description": "The [account addresses page](https://shopify.dev/themes/architecture/templates/customers-addresses) URL. Redirects to [new customer accounts](https://help.shopify.com/en/manual/customers/customer-accounts/new-customer-accounts) when enabled. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes#account_addresses_url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "collections_url": {
        "type": "string",
        "description": "The [collection list page](https://shopify.dev/themes/architecture/templates/list-collections) URL. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes#collections_url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "all_products_collection_url": {
        "type": "string",
        "description": "The all-products collection page URL. The all-products collection is automatically generated by Shopify and contains all products in the store.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes#all_products_collection_url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "search_url": {
        "type": "string",
        "description": "The [search page](https://shopify.dev/themes/architecture/templates/search) URL. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes#search_url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "predictive_search_url": {
        "type": "string",
        "description": "The [Predictive Search API](https://shopify.dev/api/ajax/reference/predictive-search) URL. \n\n**Tip**\n\n> To learn about how to support predictive search in your theme, refer to [Add predictive search to your theme](https://shopify.dev/themes/navigation-search/search/predictive-search).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes#predictive_search_url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "cart_url": {
        "type": "string",
        "description": "The [cart page](https://shopify.dev/themes/architecture/templates/cart) URL. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes#cart_url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "cart_add_url": {
        "type": "string",
        "description": "The URL for the [`/cart/add` Cart API endpoint](https://shopify.dev/api/ajax/reference/cart#post-locale-cart-add-js). \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes#cart_add_url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "cart_change_url": {
        "type": "string",
        "description": "The URL for the [`/cart/change` Cart API endpoint](https://shopify.dev/api/ajax/reference/cart#post-locale-cart-change-js). \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes#cart_change_url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "cart_clear_url": {
        "type": "string",
        "description": "The URL for the [`/cart/clear` Cart API endpoint](https://shopify.dev/api/ajax/reference/cart#post-locale-cart-clear-js). \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes#cart_clear_url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "cart_update_url": {
        "type": "string",
        "description": "The URL for the [`/cart/update` Cart API endpoint](https://shopify.dev/api/ajax/reference/cart#post-locale-cart-update-js). \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes#cart_update_url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "product_recommendations_url": {
        "type": "string",
        "description": "The [Product Recommendations API](https://shopify.dev/api/ajax/reference/product-recommendations) URL. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes#product_recommendations_url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "script": {
    "summary": "Information about a Shopify Script.",
    "description": "Information about a Shopify Script. \n\n**Tip**\n\n> To learn more about Shopify Scripts and the Script Editor, visit the [Shopify Help Center](https://help.shopify.com/manual/checkout-settings/script-editor).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/script)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "id": {
        "type": "number",
        "description": "The ID of the script. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/script#id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "name": {
        "type": "string",
        "description": "The name of the script. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/script#name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "search": {
    "summary": "Information about a storefront search query.",
    "template": [
      "search"
    ],
    "description": "Information about a storefront search query. To learn about storefront search and how to include it in your theme, refer to [Storefront search](https://shopify.dev/themes/navigation-search/search).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/search)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "terms": {
        "type": "string",
        "description": "The entered search terms. \n\n**Tip**\n\n> Use the [`highlight` filter](https://shopify.dev/docs/api/liquid/filters/highlight) to highlight the search terms in search result content.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/search#terms)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "filters": {
        "type": "array",
        "description": "The filters that have been set up on the search page. Only filters that are relevant to the current search results are returned. If the search results contain more than 1000\nproducts, then the array will be empty.\n\n\n\n**Tip**\n\n> To learn about how to set up filters in the admin, visit the [Shopify Help Center](https://help.shopify.com/manual/online-store/themes/customizing-themes/storefront-filters).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/search#filters)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "filter"
      },
      "performed": {
        "type": "boolean",
        "description": "Returns `true` if a search was successfully performed. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/search#performed)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "results": {
        "type": "any",
        "description": 'The search result items. An item can be an [`article`](https://shopify.dev/docs/api/liquid/objects/article), a [`page`](https://shopify.dev/docs/api/liquid/objects/page), or a\n[`product`](https://shopify.dev/docs/api/liquid/objects/product).\n\n\n\n**Tip**\n\n> Use the [paginate](https://shopify.dev/docs/api/liquid/tags/paginate) tag to choose how many results to show per page, up to a limit of 50.\n\n#### Search result `object_type`\n\nSearch results have an additional `object_type` property that returns the object type of the result.\n\n```liquid\n\n{% for item in search.results %}\n<!-- Result {{ forloop.index }}-->\n<h3>\n  {{ item.title | link_to: item.url }}\n</h3>\n\n{% if item.object_type == \'article\' -%}\n  {%- comment -%}\n     \'item\' is an article\n     All article object properties can be accessed.\n  {%- endcomment -%}\n\n  {% if item.image -%}\n    <div class="result-image">\n      <a href="{{ item.url }}" title="{{ item.title | escape }}">\n        {{ item | image_url: width: 100 | image_tag }}\n       </a>\n    </div>\n   {% endif %}\n{%- elsif item.object_type == \'page\' -%}\n  {%- comment -%}\n    \'item\' is a page.\n     All page object properties can be accessed.\n  {%- endcomment -%}\n{%- else -%}\n  {%- comment -%}\n     \'item\' is a product.\n     All product object properties can be accessed.\n  {%- endcomment -%}\n\n  {%- if item.featured_image -%}\n    <div class="result-image">\n       <a href="{{ item.url }}" title="{{ item.title | escape }}">\n         {{ item.featured_image | image_url: width: 100 | image_tag }}\n      </a>\n    </div>\n  {% endif %}\n{%- endif -%}\n\n<span>{{ item.content | strip_html | truncatewords: 40 | highlight: search.terms }}</span>\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/search#results)\n\n\nLast Updated: 6th April 2023\n\n\n'
      },
      "results_count": {
        "type": "number",
        "description": "The number of results. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/search#results_count)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "sort_options": {
        "type": "array",
        "description": 'The available sorting options for the search results. \n\n\n\n#### Output the sort options\n\n```liquid\n\n{%- assign sort_by = search.sort_by | default: search.default_sort_by -%}\n\n<select>\n{%- for option in search.sort_options %}\n  <option\n    value="{{ option.value }}"\n    {%- if option.value == sort_by %}\n      selected="selected"\n    {%- endif %}\n  >\n    {{ option.name }}\n  </option>\n{% endfor -%}\n</select>\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/search#sort_options)\n\n\nLast Updated: 6th April 2023\n\n\n',
        "scope": "sort_option"
      },
      "sort_by": {
        "type": 22,
        "description": "The sort order of the search results. This is determined by the `sort_by` URL parameter. If there's no `sort_by` URL parameter, then the value is `nil`.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/search#sort_by)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "default_sort_by": {
        "type": "string",
        "description": "The default sort order of the search results, which is `relevance`. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/search#default_sort_by)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "types": {
        "type": "array",
        "description": "The object types that the search was performed on. A search can be performed on the following object types:\n\n- [`article`](https://shopify.dev/docs/api/liquid/objects/article)\n- [`page`](https://shopify.dev/docs/api/liquid/objects/page)\n- [`product`](https://shopify.dev/docs/api/liquid/objects/product)\n\n\n\n**Note**\n\n> The types are determined by the `types` URL parameter.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/search#types)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "section": {
    "summary": "The properties and settings of a section.",
    "description": "The properties and settings of a section. \n\n**Tip**\n\n> To learn about sections and using them in a theme, refer to [Sections](https://shopify.dev/themes/architecture/sections).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/section)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "description": "The ID of the section. The ID for sections included through [JSON templates](https://shopify.dev/themes/architecture/templates/json-templates) are dynamically\ngenerated by Shopify.\n\nThe ID for static sections is the section file name without the `.liquid` extension. For example, a `header.liquid`\nsection has an ID of `header`.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/section#id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "settings": {
        "type": "any",
        "description": "The [settings](https://shopify.dev/themes/architecture/sections/section-schema#settings) of the section. To learn about how to access settings, refer to [Access settings](https://shopify.dev/themes/architecture/settings#access-settings).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/section#settings)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "blocks": {
        "type": "array",
        "description": "The blocks of the section. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/section#blocks)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "block"
      }
    }
  },
  "selling_plan_allocation": {
    "summary": "Information about how a specific [selling plan](/apps/subscriptions/selling-plans) affects a line item.",
    "description": "Information about how a specific [selling plan](https://shopify.dev/apps/subscriptions/selling-plans) affects a line item. To learn about how to support selling plans in your theme, refer to [Purchase options](https://shopify.dev/themes/pricing-payments/purchase-options).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "price": {
        "type": "number",
        "description": "The price of the selling plan allocation in the currency's subunit. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation#price)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "compare_at_price": {
        "type": "number",
        "description": "The **compare at** price of the selling plan allocation in the currency's subunit. The value of the **compare at** price is the line item's price without the selling plan applied. If the price and compare\nat price are equal, then `nil` is returned.\n\nThe value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation#compare_at_price)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "price_adjustments": {
        "type": "array",
        "description": "The selling plan allocation price adjustments. The maximum length of the array is two. If the associated selling plan doesn't create any price adjustments, then the\narray is empty.\n\nEach `selling_plan_allocation_price_adjustment` maps to a [`selling_plan_price_adjustment`](https://shopify.dev/docs/api/liquid/objects/selling_plan_price_adjustment)\nin the [`selling_plan.price_adjustments` array](https://shopify.dev/docs/api/liquid/objects/selling_plan#selling_plan-price_adjustments). The\n`selling_plan.price_adjustments` array contains the intent of the selling plan, and the\n`selling_plan_allocation.price_adjustments` array contains the resulting money amounts.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation#price_adjustments)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "selling_plan_allocation_price_adjustment"
      },
      "unit_price": {
        "type": "number",
        "description": "The [unit price](https://shopify.dev/docs/api/liquid/objects/variant#variant-unit_price) of the variant associated with the selling plan, in the currency's subunit. If the variant doesn't have a unit price, then `nil` is returned.\n\nThe value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation#unit_price)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "per_delivery_price": {
        "type": "number",
        "description": "The price for each delivery in the selling plan in the currency's subunit. If a selling plan includes multiple deliveries, then the `per_delivery_price` is the `price` divided by the number of\ndeliveries.\n\nThe value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation#per_delivery_price)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "selling_plan": {
        "type": "object",
        "description": "The selling plan that created the allocation. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation#selling_plan)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "selling_plan"
      },
      "selling_plan_group_id": {
        "type": "string",
        "description": "The ID of the [`selling_plan_group`](https://shopify.dev/docs/api/liquid/objects/selling_plan_group) that the selling plan of the allocation belongs to. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation#selling_plan_group_id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "checkout_charge_amount": {
        "type": "number",
        "description": "The amount that the customer will be charged at checkout in the currency's subunit. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation#checkout_charge_amount)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "remaining_balance_charge_amount": {
        "type": "number",
        "description": "The remaining amount for the customer to pay, in the currency's subunit. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation#remaining_balance_charge_amount)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "selling_plan_allocation_price_adjustment": {
    "summary": "The resulting price from the intent of the associated [`selling_plan_price_adjustment`](/docs/api/liquid/objects/selling_plan_price_adjustment).",
    "description": "The resulting price from the intent of the associated [`selling_plan_price_adjustment`](https://shopify.dev/docs/api/liquid/objects/selling_plan_price_adjustment). To learn about how to support selling plans in your theme, refer to [Purchase options](https://shopify.dev/themes/pricing-payments/purchase-options).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation_price_adjustment)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "position": {
        "type": "number",
        "description": "The 1-based index of the price adjustment in the\n[`selling_plan_allocation.price_adjustments` array](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation#selling_plan_allocation-price_adjustments). \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation_price_adjustment#position)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "price": {
        "type": "number",
        "description": "The price that will be charged for the price adjustment's lifetime, in the currency's subunit. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation_price_adjustment#price)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "selling_plan_checkout_charge": {
    "summary": "Information about how a specific [selling plan](/apps/subscriptions/selling-plans) affects the amount that a\ncustomer needs to pay for a line item at checkout.",
    "description": "Information about how a specific [selling plan](https://shopify.dev/apps/subscriptions/selling-plans) affects the amount that a\ncustomer needs to pay for a line item at checkout. To learn about how to support selling plans in your theme, refer to [Purchase options](https://shopify.dev/themes/pricing-payments/purchase-options).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_checkout_charge)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "value_type": {
        "type": "string",
        "description": "The value type of the checkout charge. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_checkout_charge#value_type)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "literal": [
          "percentage",
          "price"
        ]
      },
      "value": {
        "type": "number",
        "description": "The value of the checkout charge. How this value is interpreted depends on the [value type](https://shopify.dev/docs/api/liquid/objects/selling_plan_checkout_charge#selling_plan_checkout_charge-value_type) of\nthe checkout charge. The following table outlines what the value represents for each value type:\n\n| Value type | Value |\n| --- | --- |\n| `percentage` | The percent amount of the original price that the customer needs to pay.<br><br>For example, if the value is 50, then the customer needs to pay 50% of the original price. |\n| `price` | The amount that the customer needs to pay in the currency's subunit. |\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_checkout_charge#value)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "selling_plan": {
    "summary": "Information about the intent of how a specific [selling plan](/apps/subscriptions/selling-plans) affects a line item.",
    "description": "Information about the intent of how a specific [selling plan](https://shopify.dev/apps/subscriptions/selling-plans) affects a line item. To learn about how to support selling plans in your theme, refer to [Purchase options](https://shopify.dev/themes/pricing-payments/purchase-options).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "id": {
        "type": "number",
        "description": "The ID of the selling plan. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan#id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "name": {
        "type": "string",
        "description": "The name of the selling plan. \n\n**Note**\n\n> The name is shown at checkout with the line item summary.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan#name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "description": {
        "type": "string",
        "description": "The description of the selling plan. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan#description)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "group_id": {
        "type": "string",
        "description": "The ID of the [`selling_plan_group`](https://shopify.dev/docs/api/liquid/objects/selling_plan_group) that the selling plan belongs to. \n\n**Note**\n\n> The name is shown at checkout with the line item summary.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan#group_id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "recurring_deliveries": {
        "type": "boolean",
        "description": "Returns `true` if the selling plan includes multiple deliveries. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan#recurring_deliveries)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "options": {
        "type": "array",
        "description": "The selling plan options. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan#options)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "selling_plan_option"
      },
      "price_adjustments": {
        "type": "array",
        "description": "The selling plan price adjustments. The maximum length of the array is two. If the selling plan doesn't create any price adjustments, then the\narray is empty.\n\nEach `selling_plan_price_adjustment` maps to a [`selling_plan_allocation_price_adjustment`](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation_price_adjustment)\nin the [`selling_plan_allocation.price_adjustments` array](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation#selling_plan_allocation-price_adjustments).\nThe `selling_plan.price_adjustments` array contains the intent of the selling plan, and the\n`selling_plan_allocation.price_adjustments` contains the resulting money amounts.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan#price_adjustments)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "selling_plan_price_adjustment"
      },
      "selected": {
        "type": "boolean",
        "description": "Returns `true` if the selling plan is currently selected. Returns `false` if not. \n\n**Note**\n\n> The selected selling plan is determined by the `selling_plan` URL parameter.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan#selected)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "checkout_charge": {
        "type": "object",
        "description": "The checkout charge of the selling plan. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan#checkout_charge)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "selling_plan_checkout_charge"
      }
    }
  },
  "selling_plan_group": {
    "summary": "Information about a specific group of [selling plans](/apps/subscriptions/selling-plans) that include any of a\nproduct's variants.",
    "description": "Information about a specific group of [selling plans](https://shopify.dev/apps/subscriptions/selling-plans) that include any of a\nproduct's variants. Selling plans are grouped based on shared [selling plan option names](https://shopify.dev/docs/api/liquid/objects/selling_plan_option#selling_plan_option-name).\n\nTo learn about how to support selling plans in your theme, refer to [Purchase options](https://shopify.dev/themes/pricing-payments/purchase-options).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_group)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "selling_plans": {
        "type": "array",
        "description": "The selling plans in the group. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_group#selling_plans)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "selling_plan"
      },
      "id": {
        "type": "number",
        "description": "The ID of the selling plan group. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_group#id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "name": {
        "type": "number",
        "description": "The name of the selling plan group. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_group#name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "app_id": {
        "type": "string",
        "description": "An optional string provided by an app to identify selling plan groups created by that app. If the app doesn't provide a value, then `nil` is returned.\n\n\n\n**Tip**\n\n> You can use this property, with the [`where` filter](https://shopify.dev/docs/api/liquid/filters/where), to filter the\n> [`product.selling_plan_groups` array](https://shopify.dev/docs/api/liquid/objects/product#product-selling_plan_groups) for all selling plan groups\n> from a specific app.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_group#app_id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "options": {
        "type": "array",
        "description": "The selling plan group options. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_group#options)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "selling_plan_group_option"
      },
      "selling_plan_selected": {
        "type": "boolean",
        "description": "Returns `true` if the currently selected selling plan is part of the selling plan group. Returns `false` if not. \n\n**Note**\n\n> The selected selling plan is determined by the `selling_plan` URL parameter.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_group#selling_plan_selected)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "selling_plan_group_option": {
    "summary": "Information about a specific option in a [selling plan group](/docs/api/liquid/objects/selling_plan_group).",
    "description": "Information about a specific option in a [selling plan group](https://shopify.dev/docs/api/liquid/objects/selling_plan_group). \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_group_option)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "description": "The name of the option. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_group_option#name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "position": {
        "type": "number",
        "description": "The 1-based index of the option in the [`selling_plan_group.options` array](https://shopify.dev/docs/api/liquid/objects/selling_plan_group#selling_plan_group-options). \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_group_option#position)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "values": {
        "type": "array",
        "description": "The values of the option. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_group_option#values)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "selected_value": {
        "type": "string",
        "description": "The option value of the currently selected selling plan. If no selling plan is currently selected, then `nil` is returned.\n\n\n\n**Note**\n\n> The selected selling plan is determined by the `selling_plan` URL parameter.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_group_option#selected_value)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "selling_plan_option": {
    "summary": "Information about a selling plan's value for a specific [`selling_plan_group_option`](/docs/api/liquid/objects/selling_plan_group_option).",
    "description": "Information about a selling plan's value for a specific [`selling_plan_group_option`](https://shopify.dev/docs/api/liquid/objects/selling_plan_group_option). To learn about how to support selling plans in your theme, refer to [Purchase options](https://shopify.dev/themes/pricing-payments/purchase-options).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_option)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "description": "The name of the associated `selling_plan_group_option`. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_option#name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "position": {
        "type": "number",
        "description": "The 1-based index of the selling plan option in the associated [`selling_plan_group.options` array](https://shopify.dev/docs/api/liquid/objects/selling_plan_group#selling_plan_group-options). \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_option#position)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "value": {
        "type": "string",
        "description": "The value of the selling plan option. The value is one of the [`selling_plan_group_option.values`](https://shopify.dev/docs/api/liquid/objects/selling_plan_group_option#selling_plan_group_option-values).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_option#value)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "shipping_method": {
    "summary": "Information about the shipping method for an order.",
    "description": "Information about the shipping method for an order. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shipping_method)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "title": {
        "type": "string",
        "description": "The title of the shipping method. In most contexts, the shipping method title appears in the customer's preferred language. However, in the context of an\n[order](https://shopify.dev/docs/api/liquid/objects/order), the shipping method title appears in the language that the customer checked out in.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shipping_method#title)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "original_price": {
        "type": "number",
        "description": "The price of the shipping method in the currency's subunit, before discounts have been applied. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shipping_method#original_price)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "price": {
        "type": "number",
        "description": "The price of the shipping method in the currency's subunit, after discounts have been applied. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shipping_method#price)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "handle": {
        "type": "string",
        "description": "The [handle](https://shopify.dev/docs/api/liquid/basics#handles) of the shipping method. \n\n**Note**\n\n> The price of the shipping method is appended to handle.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shipping_method#handle)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "id": {
        "type": "string",
        "description": "The ID of the shipping method. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shipping_method#id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "tax_lines": {
        "type": "array",
        "description": "The tax lines for the shipping method. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shipping_method#tax_lines)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "tax_line"
      },
      "discount_allocations": {
        "type": "array",
        "description": "The discount allocations that apply to the shipping method. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shipping_method#discount_allocations)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "discount_allocation"
      }
    }
  },
  "shop": {
    "summary": "Information about the store, such as the store address, the total number of products, and various settings.",
    "global": true,
    "description": "Information about the store, such as the store address, the total number of products, and various settings. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "description": "The ID of the store. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "name": {
        "type": "string",
        "description": "The name of the store. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "description": {
        "type": "string",
        "description": "The [description](https://help.shopify.com/manual/online-store/setting-up/preferences#edit-the-title-and-meta-description)\nof the store. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#description)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "enabled_currencies": {
        "type": "array",
        "description": "The currencies that the store accepts. \n\n**Tip**\n\n> You can get the store's currency with [`shop.currency`](https://shopify.dev/docs/api/liquid/objects/shop#shop-currency).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#enabled_currencies)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "currency"
      },
      "published_locales": {
        "type": "array",
        "description": "The locales (languages) that are published on the store. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#published_locales)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "shop_locale"
      },
      "enabled_locales": {
        "type": "array",
        "description": "\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F\n\nDeprecated because the name didn't make it clear that the returned locales were published.\n\nThe `shop.enabled_locales` property has been replaced by [`shop.published_locales`](/docs/api/liquid/objects/shop#shop-published_locales).\n\n---\n\nThe locales (languages) that are published on the store. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#enabled_locales)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "shop_locale"
      },
      "locale": {
        "type": "object",
        "description": "\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F\n\nDeprecated because this value is contextual to the request and not a property of the shop resource.\n\nThe `shop.locale` property has been replaced by [request.locale](/docs/api/liquid/objects/request#request-locale).\n\n---\n\nThe currently active locale (language). \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#locale)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "shop_locale"
      },
      "url": {
        "type": "string",
        "description": "The full URL of the store. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "email": {
        "type": "string",
        "description": "The [sender email](https://help.shopify.com/manual/intro-to-shopify/initial-setup/setup-your-email#change-your-sender-email-address)\nof the store. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#email)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "secure_url": {
        "type": "string",
        "description": "The full URL of the store, with an `https` protocol. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#secure_url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "domain": {
        "type": "string",
        "description": "The primary domain of the store. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#domain)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "permanent_domain": {
        "type": "string",
        "description": "The `.myshopify.com` domain of the store. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#permanent_domain)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "phone": {
        "type": "string",
        "description": "The phone number of the store. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#phone)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "password_message": {
        "type": "string",
        "description": "The password page message of the store. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#password_message)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "address": {
        "type": "object",
        "description": "The address of the store. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#address)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "address"
      },
      "customer_accounts_enabled": {
        "type": "boolean",
        "description": "Returns `true` if customer accounts are required to complete checkout. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#customer_accounts_enabled)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "customer_accounts_optional": {
        "type": "boolean",
        "description": "Returns `true` if customer accounts are optional to complete checkout. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#customer_accounts_optional)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "currency": {
        "type": "object",
        "description": "The currency of the store. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#currency)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "currency"
      },
      "money_format": {
        "type": "object",
        "description": "The money format of the store. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#money_format)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "currency"
      },
      "money_with_currency_format": {
        "type": "object",
        "description": "The money format of the store with the currency included. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#money_with_currency_format)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "currency"
      },
      "metafields": {
        "type": 22,
        "description": "The [metafields](https://shopify.dev/docs/api/liquid/objects/metafield) applied to the store. \n\n**Tip**\n\n> To learn about how to create metafields, refer to [Create and manage metafields](https://shopify.dev/apps/metafields/manage) or visit\n> the [Shopify Help Center](https://help.shopify.com/manual/metafields).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#metafields)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "enabled_payment_types": {
        "type": "string",
        "description": "The accepted payment types on the store. The payment types are based on the store's enabled [payment providers](https://help.shopify.com/manual/payments) and\nthe customer's current region and currency.\n\n\n\n**Tip**\n\n> You can output an `svg` logo for each payment type with the [`payment_type_svg_tag` filter](https://shopify.dev/docs/api/liquid/filters/payment_type_svg_tag).\n> Alternatively, you can get the source URL for each `svg` with the [`payment_type_img_url` filter](https://shopify.dev/docs/api/liquid/filters/payment_type_img_url).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#enabled_payment_types)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "taxes_included": {
        "type": "boolean",
        "description": "\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F\n\nDeprecated because whether or not prices have taxes included is dependent on the customer's country.\n\nThe `shop.taxes_included` property has been replaced by [cart.taxes_included](/docs/api/liquid/objects/cart#cart-taxes_included).\n\n---\n\nReturns `true` if prices include taxes. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#taxes_included)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "refund_policy": {
        "type": "object",
        "description": "The refund policy for the store. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#refund_policy)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "policy"
      },
      "shipping_policy": {
        "type": "object",
        "description": "The shipping policy for the store. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#shipping_policy)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "policy"
      },
      "privacy_policy": {
        "type": "object",
        "description": "The privacy policy for the store. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#privacy_policy)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "policy"
      },
      "terms_of_service": {
        "type": "object",
        "description": "The terms of service for the store. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#terms_of_service)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "policy"
      },
      "subscription_policy": {
        "type": "object",
        "description": "The subscription policy for the store. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#subscription_policy)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "policy"
      },
      "policies": {
        "type": "array",
        "description": "The policies for the store. The policies are set in the store's [Policies settings](https://www.shopify.com/admin/settings/legal).\n\n#### Output the policies\n\n```liquid\n\n<ul>\n{%- for policy in shop.policies %}\n  <li>{{ policy.title }}</li>\n{%- endfor %}\n</ul>\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#policies)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "policy"
      },
      "vendors": {
        "type": "array",
        "description": "All of the product vendors for the store. \n\n\n\n#### Output the vendors\n\n```liquid\n\n{% for vendor in shop.vendors %}\n  {{- vendor | link_to_vendor }}\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#vendors)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "types": {
        "type": "array",
        "description": "All of the product types in the store. \n\n\n\n#### Output the product types\n\n```liquid\n\n{% for type in shop.types %}\n  {{- type | link_to_type }}\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#types)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "products_count": {
        "type": "number",
        "description": "The number of products in the store. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#products_count)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "collections_count": {
        "type": "number",
        "description": "The number of collections in the store. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#collections_count)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "accepts_gift_cards": {
        "type": "boolean",
        "description": "Returns `true` if the store accepts gift cards. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#accepts_gift_cards)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "brand": {
        "type": "object",
        "description": "The [brand assets](https://help.shopify.com/manual/promoting-marketing/managing-brand-assets) for the store. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#brand)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "brand"
      },
      "metaobjects": {
        "type": 22,
        "description": "All of the [metaobjects](https://shopify.dev/docs/api/liquid/objects/metaobject) of the store. Metaobjects can only be accessed by specifying their type and handle. For more information, refer to [Access metaobjects individually](https://shopify.dev/docs/api/liquid/objects#metaobject-access-metaobjects-individually).\n\nMetaobjects are created in the [Content](https://www.shopify.com/admin/content) page of the Shopify admin.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop#metaobjects)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "shop_locale": {
    "summary": "A language in a store.",
    "description": "A language in a store. To learn how to offer localization options in your theme, refer to [Support multiple currencies and languages](https://shopify.dev/themes/internationalization/multiple-currencies-languages).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop_locale)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "description": "The name of the locale in the store's primary locale. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop_locale#name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "endonym_name": {
        "type": "string",
        "description": "The name of the locale in the locale itself. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop_locale#endonym_name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "iso_code": {
        "type": "string",
        "description": "The ISO code of the locale in [IETF language tag format](https://en.wikipedia.org/wiki/IETF_language_tag). \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop_locale#iso_code)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "primary": {
        "type": "boolean",
        "description": "Returns `true` if the locale is the store's primary locale. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop_locale#primary)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "root_url": {
        "type": "string",
        "description": "The relative root URL of the locale. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop_locale#root_url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "policy": {
    "summary": "A [store policy](https://help.shopify.com/manual/checkout-settings/refund-privacy-tos), such as a privacy or return policy.",
    "description": "A [store policy](https://help.shopify.com/manual/checkout-settings/refund-privacy-tos), such as a privacy or return policy. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/policy)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "description": "The ID of the policy. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/policy#id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "body": {
        "type": "string",
        "description": "The content of the policy. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/policy#body)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "url": {
        "type": "string",
        "description": "The relative URL of the policy. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/policy#url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "title": {
        "type": "string",
        "description": "The title of the policy. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/policy#title)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "store_availability": {
    "summary": "A variant's inventory information for a physical store location.",
    "description": "A variant's inventory information for a physical store location. If a location doesn't stock a variant, then there won't be a `store_availability` for that variant and location.\n\n\n\n**Note**\n\n> The `store_availability` object is defined only if one or more locations has [local pickup](https://help.shopify.com/manual/shipping/setting-up-and-managing-your-shipping/local-methods/local-pickup)\n> enabled.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/store_availability)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "available": {
        "type": "boolean",
        "description": "Returns `true` if the variant has available inventory at the location. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/store_availability#available)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "pick_up_enabled": {
        "type": "boolean",
        "description": "Returns `true` if the location has pickup enabled. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/store_availability#pick_up_enabled)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "pick_up_time": {
        "type": "string",
        "description": "The amount of time that it takes for pickup orders to be ready at the location. \n\n**Tip**\n\n> This value can be configured in the Shopify admin. To learn more, visit the [Shopify Help Center](https://help.shopify.com/en/manual/sell-in-person/shopify-pos/order-management/local-pickup-for-online-orders#manage-preferences-for-a-local-pickup-location).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/store_availability#pick_up_time)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "location": {
        "type": "object",
        "description": "The location that the variant is stocked at. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/store_availability#location)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "location"
      }
    }
  },
  "tax_line": {
    "summary": "Information about a tax line of a checkout or order.",
    "description": "Information about a tax line of a checkout or order. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tax_line)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "title": {
        "type": "string",
        "description": "The title of the tax. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tax_line#title)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "price": {
        "type": "number",
        "description": "The tax amount in the currency's subunit. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tax_line#price)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "rate": {
        "type": "number",
        "description": "The decimal value of the tax rate. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tax_line#rate)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "rate_percentage": {
        "type": "number",
        "description": "The decimal value of the tax rate, as a percentage. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tax_line#rate_percentage)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "theme": {
    "summary": "Information about the current theme.",
    "global": true,
    "deprecated": true,
    "description": "\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F\n\nDeprecated because the values of this object's properties are subject to change, so can't be relied on within the theme.\n\nIf you want to link to the theme editor for the published theme, then you can use the URL path `/admin/themes/current/editor`.\n\nWhile this object is deprecated in Liquid and shouldn't be used, you can still access it through the [REST Admin API](/api/admin-rest/current/resources/theme).\n\n---\n\nInformation about the current theme. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/theme)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "id": {
        "type": "number",
        "description": "The ID of the theme. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/theme#id)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "deprecated": true
      },
      "name": {
        "type": "string",
        "description": "The name of the theme. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/theme#name)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "deprecated": true
      },
      "role": {
        "type": "string",
        "description": "The role of the theme. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/theme#role)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "deprecated": true,
        "literal": [
          "main",
          "unpublished",
          "demo",
          "development"
        ]
      }
    }
  },
  "settings": {
    "summary": "Allows you to access all of the theme's settings from the [`settings_schema.json` file](/themes/architecture/config/settings-schema-json).",
    "global": true,
    "description": 'Allows you to access all of the theme\'s settings from the [`settings_schema.json` file](https://shopify.dev/themes/architecture/config/settings-schema-json). \n\n**Tip**\n\n> To learn about the available setting types, refer to [Input settings](https://shopify.dev/themes/architecture/settings/input-settings).\n\n#### Reference a setting value\n\n```liquid\n\n{% if settings.favicon != blank %}\n  <link rel="icon" type="image/png" href="{{ settings.favicon | image_url: width: 32, height: 32 }}">\n{% endif %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/settings)\n\n\nLast Updated: 6th April 2023\n\n\n',
    "const": true
  },
  "template": {
    "summary": "Information about the current [template](/docs/themes/architecture/templates).",
    "global": true,
    "description": "Information about the current [template](https://shopify.dev/docs/themes/architecture/templates). \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/template)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "description": "The name of the template's [type](https://shopify.dev/docs/themes/architecture/templates#template-types). \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/template#name)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "literal": [
          "404",
          "article",
          "blog",
          "cart",
          "collection",
          "list-collections",
          "customers/account",
          "customers/activate_account",
          "customers/addresses",
          "customers/login",
          "customers/order",
          "customers/register",
          "customers/reset_password",
          "gift_card",
          "index",
          "page",
          "password",
          "product",
          "search"
        ]
      },
      "suffix": {
        "type": "string",
        "description": "The custom name of an [alternate template](https://shopify.dev/themes/architecture/templates#alternate-templates). Returns `nil` if the default template is being used.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/template#suffix)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "directory": {
        "type": "string",
        "description": "The name of the template's parent directory. Returns `nil` if the template's parent directory is `/templates`.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/template#directory)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "transaction": {
    "summary": "A transaction associated with a checkout or order.",
    "description": "A transaction associated with a checkout or order. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "id": {
        "type": "number",
        "description": "The ID of the transaction. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction#id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "name": {
        "type": "string",
        "description": "The name of the transaction. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction#name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "status": {
        "type": "string",
        "description": "The status of the transaction. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction#status)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "literal": [
          "success",
          "pending",
          "failure",
          "error"
        ]
      },
      "created_at": {
        "type": "string",
        "description": "A timestamp of when the transaction was created. \n\n**Tip**\n\n> Use the [`date` filter](https://shopify.dev/docs/api/liquid/filters/date) to format the timestamp.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction#created_at)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "receipt": {
        "type": "string",
        "description": "Information from the payment provider about the payment receipt. This includes things like whether the payment was a test, or an authorization code if there was one.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction#receipt)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "kind": {
        "type": "string",
        "description": "The type of transaction. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction#kind)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "literal": [
          "authorization",
          "capture",
          "sale",
          "void",
          "refund"
        ]
      },
      "gateway": {
        "type": "string",
        "description": "The [handleized](https://shopify.dev/docs/api/liquid/basics#modifying-handles) name of the payment provider used for the transaction. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction#gateway)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "status_label": {
        "type": "string",
        "description": "The status of the transaction, translated based on the current locale. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction#status_label)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "payment_details": {
        "type": "object",
        "description": "The transaction payment details. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction#payment_details)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "transaction_payment_details"
      },
      "amount": {
        "type": "string",
        "description": "The amount of the transaction in the currency's subunit. The amount is in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction#amount)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "gateway_display_name": {
        "type": "string",
        "description": "The name of the payment provider used for the transaction. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction#gateway_display_name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "show_buyer_pending_payment_instructions?": {
        "type": "boolean",
        "description": "Whether the transaction is pending, and whether additional customer info is required to process the payment. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction#show_buyer_pending_payment_instructions?)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "buyer_pending_payment_notice": {
        "type": "string",
        "description": "A notice that contains instructions for the customer on how to complete their payment.\nThe messages are specific to the payment method used. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction#buyer_pending_payment_notice)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "buyer_pending_payment_instructions": {
        "type": "array",
        "description": 'A list of `pending_payment_instruction_input` header-value pairs, with payment method-specific details.\nThe customer can use these details to complete their purchase offline.\n\nIf the payment method doesn\u2019t support pending payment instructions, then an empty array is returned.\n\n| Supported payment method | Expected Values |\n| --- | ----------- |\n| ShopifyPayments - Multibanco | [{header="Entity", value="12345"}, {header="Reference", value="999999999"}] | \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction#buyer_pending_payment_instructions)\n\n\nLast Updated: 6th April 2023\n\n\n',
        "scope": "pending_payment_instruction_input"
      }
    }
  },
  "unit_price_measurement": {
    "summary": "Information about how units of a product variant are measured. It's used to calculate\n[unit prices](https://help.shopify.com/manual/intro-to-shopify/initial-setup/sell-in-france/price-per-unit#add-unit-prices-to-your-product).",
    "description": "Information about how units of a product variant are measured. It's used to calculate\n[unit prices](https://help.shopify.com/manual/intro-to-shopify/initial-setup/sell-in-france/price-per-unit#add-unit-prices-to-your-product). \n\n**Note**\n\n> Unit prices are available only to stores located in Germany and France.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/unit_price_measurement)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "measured_type": {
        "type": "string",
        "description": "The type of unit measurement. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/unit_price_measurement#measured_type)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "literal": [
          "volume",
          "weight",
          "dimension"
        ]
      },
      "quantity_value": {
        "type": "number",
        "description": "The quantity of the unit. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/unit_price_measurement#quantity_value)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "quantity_unit": {
        "type": "string",
        "description": "The unit of measurement used to measure the [`quantity_value`](https://shopify.dev/docs/api/liquid/objects/unit_price_measurement#unit_price_measurement-quantity_value). \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/unit_price_measurement#quantity_unit)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "reference_value": {
        "type": "number",
        "description": "The quantity of the unit for the base unit price. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/unit_price_measurement#reference_value)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "reference_unit": {
        "type": "string",
        "description": "The unit of measurement used to measure the [`reference_value`](https://shopify.dev/docs/api/liquid/objects/unit_price_measurement#unit_price_measurement-reference_value). \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/unit_price_measurement#reference_unit)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "user": {
    "summary": "The author of a blog article.",
    "description": "The author of a blog article. \n\n**Tip**\n\n> The information returned by the `user` object can be edited on the [**Account** page](https://www.shopify.com/admin/settings/account)\n> of the Shopify admin.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/user)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "account_owner": {
        "type": "boolean",
        "description": "Returns `true` if the author is the account owner of the store. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/user#account_owner)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "bio": {
        "type": "string",
        "description": "The bio associated with the author's account. If no bio is specified, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/user#bio)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "email": {
        "type": "string",
        "description": "The email associated with the author's account. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/user#email)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "first_name": {
        "type": "string",
        "description": "The first name associated with the author's account. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/user#first_name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "homepage": {
        "type": "string",
        "description": "The URL for the personal website associated with the author's account. If no personal website is specified, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/user#homepage)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "image": {
        "type": "object",
        "description": "The image associated with the author's account. If no image is specified, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/user#image)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "image"
      },
      "last_name": {
        "type": "string",
        "description": "The last name associated with the author's account. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/user#last_name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "name": {
        "type": "string",
        "description": "The first and last name associated with the author's account. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/user#name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "video": {
    "summary": "Information about a video uploaded as [product media](/docs/api/liquid/objects/product-media) or a [`file_reference` metafield](/apps/metafields/types).",
    "description": "Information about a video uploaded as [product media](https://shopify.dev/docs/api/liquid/objects/product-media) or a [`file_reference` metafield](https://shopify.dev/apps/metafields/types). \n\n**Tip**\n\n> Use the [`video_tag` filter](https://shopify.dev/docs/api/liquid/filters/video_tag) to output the video in an HTML `<video>` tag.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/video)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "sources": {
        "type": "array",
        "description": "The source files for the video. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/video#sources)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "video_source"
      },
      "duration": {
        "type": "number",
        "description": "The duration of the video in milliseconds. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/video#duration)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "aspect_ratio": {
        "type": "number",
        "description": "The aspect ratio of the video as a decimal. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/video#aspect_ratio)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "alt": {
        "type": "string",
        "description": "The alt text of the video. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/video#alt)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "id": {
        "type": "number",
        "description": "The ID of the video. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/video#id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "media_type": {
        "type": "string",
        "description": "The media type of the model. Always returns `video`. \n\n\n\n#### Filter for media of a specific type\n\nYou can use the `media_type` property with the [`where` filter](/docs/api/liquid/filters/where) to filter the [`product.media` array](/docs/api/liquid/objects/product#product-media) for all media of a desired type.\n\n\n```liquid\n\n{% assign videos = product.media | where: 'media_type', 'video' %}\n\n{% for video in videos %}\n  {{- video | video_tag }}\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/video#media_type)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "position": {
        "type": "number",
        "description": "The position of the video in the [`product.media`](https://shopify.dev/docs/api/liquid/objects/product#product-media) array. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/video#position)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "preview_image": {
        "type": "object",
        "description": "A preview image for the video. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/video#preview_image)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "image"
      }
    }
  },
  "video_source": {
    "summary": "Information about the source files for a video.",
    "description": "Information about the source files for a video. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/video_source)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "width": {
        "type": "number",
        "description": "The width of the video source file. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/video_source#width)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "format": {
        "type": "string",
        "description": "The format of the video source file. \n\n**Note**\n\n> When mp4 videos are uploaded, Shopify generates an m3u8 file as an additional video source. An m3u8 file enables video\n> players to leverage HTTP live streaming (HLS), resulting in an optimized video experience based on the user's internet\n> connection.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/video_source#format)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "literal": [
          "mov",
          "mp4",
          "m3u8"
        ]
      },
      "height": {
        "type": "number",
        "description": "The height of the video source file. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/video_source#height)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "mime_type": {
        "type": "string",
        "description": "The [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) of the video source file. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/video_source#mime_type)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "url": {
        "type": "string",
        "description": "The [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) of the video source file. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/video_source#url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "additional_checkout_buttons": {
    "summary": "Returns `true` if a store has any payment providers with offsite checkouts, such as PayPal Express Checkout.",
    "global": true,
    "description": "Returns `true` if a store has any payment providers with offsite checkouts, such as PayPal Express Checkout. Use `additional_checkout_buttons` to check whether these payment providers exist, and\n[`content_for_additional_checkout_buttons`](https://shopify.dev/docs/api/liquid/objects/content_for_additional_checkout_buttons)\nto show the associated checkout buttons. To learn more about how to use these objects, refer to\n[Accelerated checkout](https://shopify.dev/themes/pricing-payments/accelerated-checkout).\n\n```liquid\n{% if additional_checkout_buttons %}\n  {{ content_for_additional_checkout_buttons }}\n{% endif %}\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/additional_checkout_buttons)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "boolean",
    "const": true
  },
  "all_country_option_tags": {
    "summary": "Creates an `&lt;option&gt;` tag for each country.",
    "global": true,
    "description": "Creates an `<option>` tag for each country. An attribute called `data-provinces` is set for each `<option>`, and contains a JSON-encoded array of the\ncountry or region's subregions. If a country doesn't have any subregions, then an empty array is set for\nits `data-provinces` attribute.\n\n\n\n**Tip**\n\n> To return only the countries and regions included in the store's shipping zones, use the [`country_option_tags` object](https://shopify.dev/docs/api/liquid/objects/country_option_tags).\n\n#### Example\n\nYou can wrap the `all_country_option_tags` object in `<select>` tags to build a country option selector.\n\n```liquid\n<select name=\"country\">\n  {{ all_country_option_tags }}\n</select>\n```\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/all_country_option_tags)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "string",
    "const": true
  },
  "canonical_url": {
    "summary": "The canonical URL for the current page.",
    "global": true,
    "description": "The canonical URL for the current page. To learn about canonical URLs, refer to [Google's documentation](https://support.google.com/webmasters/answer/139066?hl=en).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/canonical_url)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "string",
    "const": true
  },
  "checkout": {
    "summary": "A customer's checkout.",
    "template": [
      "checkout"
    ],
    "description": 'A customer\'s checkout.\n\n> Deprecated:\n> <p>The <code>checkout</code> object will be deprecated for the Information, Shipping, and Payment pages on August 13, 2024. Merchants who have customized these pages using <code>checkout.liquid</code> to <a href="https://help.shopify.com/manual/online-store/themes/theme-structure/extend/checkout-migration#migrate-to-checkout-extensibility">upgrade to checkout extensibility</a> before August 13, 2024.</p>\n> <p>Learn <a href="/apps/checkout">how to build checkout extensions</a> that extend the functionality of Shopify checkout.</p>\n\nYou can access the `checkout` object on the [order status page](https://help.shopify.com/manual/orders/status-tracking/customize-order-status).\n\nShopify Plus merchants can access the `checkout` object in the [`checkout.liquid` layout](https://shopify.dev/themes/architecture/layouts/checkout-liquid).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout)\n\n\nLast Updated: 6th April 2023\n\n\n',
    "type": "object",
    "properties": {
      "applied_gift_cards": {
        "type": "array",
        "description": "The gift cards applied to the checkout. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#applied_gift_cards)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "gift_card"
      },
      "attributes": {
        "type": "any",
        "description": "Additional attributes entered by the customer with the [cart](https://shopify.dev/docs/api/liquid/objects/cart#cart-attributes). Shopify Plus merchants that have access to `checkout.liquid` can [capture attributes at checkout](https://shopify.dev/themes/architecture/layouts/checkout-liquid#capture-checkout-attributes).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#attributes)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "billing_address": {
        "type": "object",
        "description": "The billing address entered at checkout. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#billing_address)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "address"
      },
      "buyer_accepts_marketing": {
        "type": "boolean",
        "description": "Returns `true` if the customer checks the email marketing subscription checkbox. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#buyer_accepts_marketing)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "cancelled": {
        "type": "boolean",
        "description": "\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F\n\nDeprecated because `false` is always returned.\n\n---\n\nReturns `true` if the checkout has been cancelled. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#cancelled)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "cart_level_discount_applications": {
        "type": "array",
        "description": "The cart-specific discount applications for the checkout. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#cart_level_discount_applications)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "discount_application"
      },
      "currency": {
        "type": "string",
        "description": "The [ISO code](https://www.iso.org/iso-4217-currency-codes.html) of the currency of the checkout. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#currency)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "customer": {
        "type": "object",
        "description": "The customer associated with the checkout.\n> Note:\n> The `customer` object is available only on the Thank You and Order Status [pages](https://help.shopify.com/manual/orders/status-tracking). \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#customer)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "customer"
      },
      "discount": {
        "type": "object",
        "description": "\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F\n\nDeprecated because an unsaved discount doesn't exist on the [Order status page](https://help.shopify.com/manual/orders/status-tracking).\n\n---\n\nA discount applied to the checkout without being saved. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#discount)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "discount"
      },
      "discounts": {
        "type": "array",
        "description": "\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F\n\nDeprecated because not all discount types and details are captured.\n\nThe `checkout.discounts` property has been replaced by [`checkout.discount_applications`](/docs/api/liquid/objects/checkout#checkout-discount_applications).\n\n---\n\nThe discounts applied to the checkout. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#discounts)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "discount"
      },
      "discount_applications": {
        "type": "array",
        "description": "The discount applications for the checkout. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#discount_applications)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "discount_application"
      },
      "discounts_amount": {
        "type": "array",
        "description": "The total amount of the discounts applied to the checkout in the currency's subunit. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#discounts_amount)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "discount_application"
      },
      "discounts_savings": {
        "type": "array",
        "description": "The total amount of the discounts applied to the checkout in the currency's subunit, as a negative value. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#discounts_savings)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "discount_application"
      },
      "email": {
        "type": "string",
        "description": "The email associated with the checkout. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#email)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "financial_status": {
        "type": "string",
        "description": "\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F\n\nDeprecated because `nil` is always returned.\n\n---\n\nThe financial status of the checkout. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#financial_status)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "fulfilled_at": {
        "type": "string",
        "description": "\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F\n\nDeprecated because `nil` is always returned.\n\n---\n\nA timestamp for the fulfullment of the checkout. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#fulfilled_at)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "fulfilled_line_items": {
        "type": "array",
        "description": "\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F\n\nDeprecated because the array is always empty.\n\n---\n\nThe fulfilled line items from the checkout. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#fulfilled_line_items)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "line_item"
      },
      "fulfillment_status": {
        "type": "string",
        "description": "\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F\n\nDeprecated because `unfulfilled` is always returned.\n\n---\n\nThe fulfillment status of the checkout. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#fulfillment_status)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "gift_cards_amount": {
        "type": "string",
        "description": "The amount of the checkout price paid in gift cards. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#gift_cards_amount)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "id": {
        "type": "number",
        "description": "The ID of the checkout. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "line_items": {
        "type": "array",
        "description": "The line items of the checkout. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#line_items)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "line_item"
      },
      "line_items_subtotal_price": {
        "type": "number",
        "description": "The sum of the prices of all of the line items of the checkout in the currency's subunit, after any line item discounts\nhave been applied. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#line_items_subtotal_price)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "name": {
        "type": "number",
        "description": "The name of the checkout. This value is the same as [`checkout.id`](https://shopify.dev/docs/api/liquid/objects/checkout#checkout-id) with a `#` prepended to it.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "note": {
        "type": "string",
        "description": "Additional information entered by the customer with the [cart](https://shopify.dev/docs/api/liquid/objects/cart#cart-note). \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#note)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "order": {
        "type": "object",
        "description": "The order created by the checkout. Depending on the payment provider, the order might not have been created when the [Thank You page](https://help.shopify.com/en/manual/orders/status-tracking)\nis first viewed. In this case, `nil` is returned.\n\n\n**Note**\n\n> The `order` object isn't available on the Thank You page.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#order)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "order"
      },
      "order_id": {
        "type": "string",
        "description": "The ID of the order created by the checkout. The value is the same as [`order.id`](https://shopify.dev/docs/api/liquid/objects/order#order-id).\n\nDepending on the payment provider, the order might not have been created when the [Order status page](https://help.shopify.com/en/manual/orders/status-tracking)\nis first viewed. In this case, `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#order_id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "order_name": {
        "type": "string",
        "description": "The name of the order created by the checkout. The value is the same as [`order.name`](https://shopify.dev/docs/api/liquid/objects/order#order-name).\n\nDepending on the payment provider, the order might not have been created when the [Order status page](https://help.shopify.com/en/manual/orders/status-tracking)\nis first viewed. In this case, `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#order_name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "order_number": {
        "type": "string",
        "description": "An integer representation of the name of the order created by the checkout. The value is the same as [`order.order_number`](https://shopify.dev/docs/api/liquid/objects/order#order-order_number).\n\nDepending on the payment provider, the order might not have been created when the [Order status page](https://help.shopify.com/en/manual/orders/status-tracking)\nis first viewed. In this case, `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#order_number)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "requires_shipping": {
        "type": "boolean",
        "description": "Returns `true` if any of the line items of the checkout require shipping. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#requires_shipping)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "shipping_address": {
        "type": "object",
        "description": "The shipping address of the checkout. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#shipping_address)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "address"
      },
      "shipping_method": {
        "type": "object",
        "description": "The shipping method of the checkout. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#shipping_method)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "shipping_method"
      },
      "shipping_price": {
        "type": "number",
        "description": "The shipping price of the checkout in the currency's subunit. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#shipping_price)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "tax_lines": {
        "type": "array",
        "description": "The tax lines for the checkout. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#tax_lines)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "tax_line"
      },
      "tax_price": {
        "type": "number",
        "description": "The total tax amount of the checkout in the currency's subunit. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#tax_price)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "total_price": {
        "type": "number",
        "description": "The total price of the checkout in the currency's subunit. The value is output in the customer's local (presentment) currency.\n\n\n\n**Tip**\n\n> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#total_price)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "transactions": {
        "type": "array",
        "description": "The transactions of the checkout. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#transactions)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "transaction"
      },
      "unavailable_line_items": {
        "type": "array",
        "description": "\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F\n\nDeprecated because the array is always empty.\n\n---\n\nThe unavailable line items of the checkout. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#unavailable_line_items)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "line_item"
      },
      "unfulfilled_line_items": {
        "type": "array",
        "description": "\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F\n\nDeprecated because the array is always the same as [`checkout.line_items`](/docs/api/liquid/objects/checkout#checkout-line_items).\n\n---\n\nThe unfulfilled line items of the checkout. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#unfulfilled_line_items)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "line_item"
      },
      "item_count": {
        "type": "number",
        "description": "The number of items in the checkout. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout#item_count)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "comment": {
    "summary": "An article comment.",
    "description": "An article comment. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/comment)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "author": {
        "type": "string",
        "description": "The full name of the author of the comment. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/comment#author)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "content": {
        "type": "string",
        "description": "The content of the comment. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/comment#content)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "created_at": {
        "type": "string",
        "description": "A timestamp for when the comment was created. \n\n**Tip**\n\n> Use the [`date` filter](https://shopify.dev/docs/api/liquid/filters/date) to format the timestamp.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/comment#created_at)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "email": {
        "type": "string",
        "description": "The email of he author of the comment. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/comment#email)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "id": {
        "type": "number",
        "description": "The ID of the comment. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/comment#id)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "status": {
        "type": "string",
        "description": "The status of the comment. Always returns `published`. Outside of the Liquid context, the status of a comment can vary based on spam detection and whether blog comments are\nmoderated. However, only comments with a status of `published` are included in the [`article.comments` array](https://shopify.dev/docs/api/liquid/objects/article#article-comments).\n\n\n\n**Tip**\n\n> To learn more about blog comments, visit the [Shopify Help Center](https://help.shopify.com/manual/online-store/blogs/managing-comments).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/comment#status)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "updated_at": {
        "type": "string",
        "description": "A timestamp for when the status of the comment was last updated. \n\n**Tip**\n\n> Use the [`date` filter](https://shopify.dev/docs/api/liquid/filters/date) to format the timestamp.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/comment#updated_at)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "url": {
        "type": "string",
        "description": "The relative URL of the article that the comment is associated with, with [`comment.id`](https://shopify.dev/docs/api/liquid/objects/comment#comment-id)\nappended. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/comment#url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "content_for_additional_checkout_buttons": {
    "summary": "Returns checkout buttons for any active payment providers with offsite checkouts.",
    "global": true,
    "description": "Returns checkout buttons for any active payment providers with offsite checkouts. Use [`additional_checkout_buttons`](https://shopify.dev/docs/api/liquid/objects/additional_checkout_buttons)\nto check whether these payment providers exist, and `content_for_additional_checkout_buttons`\nto show the associated checkout buttons. To learn more about how to use these objects, refer to\n[Accelerated checkout](https://shopify.dev/themes/pricing-payments/accelerated-checkout).\n\n```liquid\n{% if additional_checkout_buttons %}\n  {{ content_for_additional_checkout_buttons }}\n{% endif %}\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/content_for_additional_checkout_buttons)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "string",
    "const": true
  },
  "content_for_index": {
    "summary": "Dynamically returns the content of [sections](/themes/architecture/sections) to be rendered on the home page.",
    "global": true,
    "description": "Dynamically returns the content of [sections](https://shopify.dev/themes/architecture/sections) to be rendered on the home page. If you use a [Liquid index template](https://shopify.dev/themes/architecture/templates/index-template) (`templates/index.liquid`), then you must include `{{ content_for_index }}` in the template. This object can't be used in JSON index templates.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/content_for_index)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "string",
    "const": true
  },
  "content_for_layout": {
    "summary": "Dynamically returns content based on the current [template](/themes/architecture/templates).",
    "global": true,
    "description": "Dynamically returns content based on the current [template](https://shopify.dev/themes/architecture/templates). Include the `content_for_layout` object in your [layout files](https://shopify.dev/themes/architecture/layouts) between the `<body>` and\n`</body>` HTML tags.\n\n\n\n**Note**\n\n> The `content_for_layout` object is required in `theme.liquid`.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/content_for_layout)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "string",
    "const": true
  },
  "country_option_tags": {
    "summary": "Creates an `&lt;option&gt;` tag for each country and region that's included in a shipping zone on the [Shipping](https://www.shopify.com/admin/settings/shipping) page of the Shopify admin.",
    "global": true,
    "description": "Creates an `<option>` tag for each country and region that's included in a shipping zone on the [Shipping](https://www.shopify.com/admin/settings/shipping) page of the Shopify admin. An attribute called `data-provinces` is set for each `<option>`, and contains a JSON-encoded array of the\ncountry or region's subregions. If a country doesn't have any subregions, then an empty array is set for its\n`data-provinces` attribute.\n\n\n\n**Tip**\n\n> To return all countries and regions included in the store's shipping zones, use [`all_country_option_tags`](https://shopify.dev/docs/api/liquid/objects/all_country_option_tags).\n\n#### Example\n\nYou can wrap the `country_option_tags` object in `<select>` tags to build a country option selector.\n\n```liquid\n\n<select name=\"country\">\n  {{ country_option_tags }}\n</select>\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/country_option_tags)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "string",
    "const": true
  },
  "current_page": {
    "summary": "The current page number.",
    "global": true,
    "description": "The current page number. The `current_page` object has a value of 1 for non-paginated resources.\n\n#### Example\n\n```liquid\n\n{{ page_title }}{% unless current_page == 1 %} - Page {{ current_page }}{% endunless %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/current_page)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "number",
    "const": true
  },
  "current_tags": {
    "summary": "The currently applied tags.",
    "template": [
      "blog",
      "collection"
    ],
    "description": "The currently applied tags. You can [add tags](https://help.shopify.com/en/manual/shopify-admin/productivity-tools/using-tags) to articles and\nproducts. Article tags can be used to [filter a blog page](https://shopify.dev/themes/architecture/templates/blog#filter-articles-by-tag)\nto show only articles with specific tags. Similarly, product tags can be used to [filter a collection page](https://shopify.dev/themes/navigation-search/filtering/tag-filtering)\nto show only products with specific tags.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/current_tags)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "array"
  },
  "form_errors": {
    "summary": "The error category strings for errors from a form created by a [`form` tag](/docs/api/liquid/tags/form).",
    "description": "The error category strings for errors from a form created by a [`form` tag](https://shopify.dev/docs/api/liquid/tags/form). The following table outlines the strings that can be returned and the reason that they would be:\n\n| Form property name | Return reason |\n| --- | --- |\n| `author` | There were issues with required name fields. |\n| `body` | There were issues with required text content fields. |\n| `email` | There were issues with required email fields. |\n| `form` | There were general issues with the form. |\n| `password` | There were issues with required password fields. |\n\n#### Output form errors\n\nYou can output the name of the field related to the error, and the error message, by using the error as a key to access the `translated_fields` and `messages` properties.\n\n```liquid\n<ul>\n  {% for error in form.errors %}\n    <li>\n      {% if error == 'form' %}\n        {{ form.errors.messages[error] }}\n      {% else %}\n        {{ form.errors.translated_fields[error] }} - {{ form.errors.messages[error] }}\n      {% endif %}\n    </li>\n  {% endfor %}\n</ul>\n```\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form_errors)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "messages": {
        "type": "array",
        "description": "The translated error messages for each value in the `form_errors` array. You can access a specific message in the array by using a specific error from the `form_errors` array as a key.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form_errors#messages)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "translated_fields": {
        "type": "array",
        "description": "The translated names for each value in the `form_errors` array. You can access a specific field in the array by using a specific error from the `form_errors` array as a key.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form_errors#translated_fields)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "handle": {
    "summary": "The [handle](/docs/api/liquid/basics#handles) of the resource associated with the current template.",
    "global": true,
    "description": "The [handle](https://shopify.dev/docs/api/liquid/basics#handles) of the resource associated with the current template. The `handle` object will return a value only when the following templates are being viewed:\n\n- [article](https://shopify.dev/themes/architecture/templates/article)\n- [blog](https://shopify.dev/themes/architecture/templates/blog)\n- [collection](https://shopify.dev/themes/architecture/templates/collection)\n- [page](https://shopify.dev/themes/architecture/templates/page)\n- [product](https://shopify.dev/themes/architecture/templates/product)\n\nIf none of the above templates are being viewed, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/handle)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "string",
    "const": true
  },
  "page_description": {
    "summary": "The meta description of the current page.",
    "global": true,
    "description": "The meta description of the current page. The `page_description` object can be used to provide a brief description of a page for search engine listings and social\nmedia previews.\n\nTo learn about where to edit the meta description for a page, visit the [Shopify Help Center](https://help.shopify.com/manual/promoting-marketing/seo/adding-keywords#edit-the-title-and-meta-description-for-a-page).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/page_description)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "string",
    "const": true
  },
  "page_image": {
    "summary": "An image to be shown in search engine listings and social media previews for the current page.",
    "global": true,
    "description": "An image to be shown in search engine listings and social media previews for the current page. The resource's featured image for product and collection pages, and blog posts, is used. For all other pages, or pages where\nthere's no featured image, the [social sharing image](https://help.shopify.com/manual/online-store/images/showing-social-media-thumbnail-images?#setting-the-social-sharing-image-in-your-admin)\nis used.\n\n### Open Graph fallback tags\n\nThe `page_image` object can be used for creating [Open Graph](https://ogp.me/) `og:image` meta tags.\n\nIf a theme doesn't include `og:image` tags for a page, then Shopify automatically generates the following tags using the\n`page_image` object:\n\n- `og:image`\n- `og:image:secure_url`\n- `og:image:width`\n- `og:image:height`\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/page_image)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "scope": "image",
    "const": true
  },
  "page_title": {
    "summary": "The page title of the current page.",
    "global": true,
    "description": "The page title of the current page. The `page_title` object can be used to specify the title of page for search engine listings and social media previews.\n\nTo learn about where to edit the title for a page, visit the [Shopify Help Center](https://help.shopify.com/manual/promoting-marketing/seo/adding-keywords#edit-the-title-and-meta-description-for-a-page).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/page_title)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "string",
    "const": true
  },
  "part": {
    "summary": "A part in the navigation for pagination.",
    "description": "A part in the navigation for pagination. \n\n\n\n#### Create pagination navigation with `part`\n\nYou can create a pagination navigation by iterating over each `part` of a [`paginate` object](/docs/api/liquid/objects/paginate).\n\n\n```liquid\n\n{% paginate collection.products by 5 -%}\n  {% for part in paginate.parts -%}\n    {% if part.is_link -%}\n      {{ part.title | link_to: part.url}}\n    {%- else -%}\n      <span>{{ part.title }}</span>\n    {% endif %}\n  {%- endfor %}\n{%- endpaginate %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/part)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "is_link": {
        "type": "boolean",
        "description": "Returns `true` if the part is a link. Returns `false` if not. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/part#is_link)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "title": {
        "type": "string",
        "description": "The page number associated with the part. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/part#title)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "url": {
        "type": "string",
        "description": "The URL of the part. It consists of the current page URL path with the pagination parameter for the current part appended.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/part#url)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "pending_payment_instruction_input": {
    "summary": "Header-value pairs that make up the list of payment information specific to the payment method.\nThis information can be be used by the customer to complete the transaction offline.",
    "description": "Header-value pairs that make up the list of payment information specific to the payment method.\nThis information can be be used by the customer to complete the transaction offline. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/pending_payment_instruction_input)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "header": {
        "type": "string",
        "description": 'The header of the payment instruction.\nThese are payment method-specific. Example: "Entity" and "Reference" for Multibanco \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/pending_payment_instruction_input#header)\n\n\nLast Updated: 6th April 2023\n\n\n'
      },
      "value": {
        "type": "string",
        "description": "Contains the corresponding values to the headers of the payment instruction. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/pending_payment_instruction_input#value)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "powered_by_link": {
    "summary": "Creates an HTML link element that links to a localied version of `shopify.com`, based on the locale of the store.",
    "global": true,
    "description": "Creates an HTML link element that links to a localied version of `shopify.com`, based on the locale of the store. \n\n\n\n#### Example\n\n```liquid\n\n{{ powered_by_link }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/powered_by_link)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "const": true
  },
  "predictive_search_resources": {
    "summary": "Contains arrays of objects for each resource type that can be returned by a [predictive search query](/api/ajax/reference/predictive-search#get-locale-search-suggest).",
    "description": "Contains arrays of objects for each resource type that can be returned by a [predictive search query](https://shopify.dev/api/ajax/reference/predictive-search#get-locale-search-suggest). You can check whether any resources of a specific type were returned using the [`size` filter](https://shopify.dev/docs/api/liquid/filters/size).\n\n```liquid\n{% if predictive_search.resources.articles.size > 0 %}\n  {% for article in predictive_search.resources.articles %}\n    {{ article.title }}\n  {% endfor %}\n{% endif %}\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/predictive_search_resources)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "articles": {
        "type": "array",
        "description": "The articles associated with the query. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/predictive_search_resources#articles)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "article"
      },
      "collections": {
        "type": "array",
        "description": "The collections associated with the query. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/predictive_search_resources#collections)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "collection"
      },
      "pages": {
        "type": "array",
        "description": "The pages associated with the query. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/predictive_search_resources#pages)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "page"
      },
      "products": {
        "type": "array",
        "description": "The products associated with the query. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/predictive_search_resources#products)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "product"
      }
    }
  },
  "quantity_rule": {
    "summary": "A variant order quantity rule (minimum, maximum, and increment). The default order variant quantity rule is `min=1,max=null,increment=1`.",
    "description": "A variant order quantity rule (minimum, maximum, and increment). The default order variant quantity rule is `min=1,max=null,increment=1`. \n\n\n\n#### The variant order quantity rule\n\n```liquid\n\n{{ product.variants.first.quantity_rule }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/quantity_rule)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "min": {
        "type": "number",
        "description": "Minimum order quantity (default 1) \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/quantity_rule#min)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "max": {
        "type": "number",
        "description": "Maximum order quantity If there is no maximum, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/quantity_rule#max)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "increment": {
        "type": "number",
        "description": "Order quantity increment (default 1) \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/quantity_rule#increment)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "scripts": {
    "summary": "The active scripts, of each script type, on the store.",
    "global": true,
    "description": "The active scripts, of each script type, on the store. There can be only one active script of each type. Currently, the only type accessible in Liquid is\n`cart_calculate_line_items`.\n\n\n\n**Tip**\n\n> To learn more about Shopify Scripts and the Script Editor, visit the [Shopify Help Center](https://help.shopify.com/manual/checkout-settings/script-editor).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/scripts)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "cart_calculate_line_items": {
        "type": "object",
        "description": "The active line item script. If no line item script is currently active, then `nil` is returned.\n\n#### Advertise the currently active line item script\n\n```liquid\n\n{% if scripts.cart_calculate_line_items %}\n  <p>Don't miss our current sale: <strong>{{ scripts.cart_calculate_line_items.name }}</strong></p>\n{% endif %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/scripts#cart_calculate_line_items)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "script"
      }
    }
  },
  "sitemap": {
    "summary": "The sitemap for a specific group in the [`robots.txt` file](/themes/architecture/templates/robots-txt-liquid).",
    "description": "The sitemap for a specific group in the [`robots.txt` file](https://shopify.dev/themes/architecture/templates/robots-txt-liquid). The sitemap provides information about the pages and content on a site, and the relationships between them, which helps\ncrawlers crawl a site more efficiently.\n\n\n\n**Tip**\n\n> To learn more about sitemaps, refer to [Google's documentation](https://developers.google.com/search/docs/advanced/sitemaps/overview).\n\nThe `sitemap` object consists of a `Sitemap` directive, and a value of the URL that the sitemap is hosted at. For example:\n\n```\nSitemap: https://your-store.myshopify.com/sitemap.xml\n```\n\n\n\n**Tip**\n\n> You can [customize the `robots.txt` file](https://shopify.dev/themes/seo/robots-txt) with the [`robots.txt.liquid` template](/themes/architecture/templates/robots-txt-liquid).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/sitemap)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "directive": {
        "type": "string",
        "description": "Returns `Sitemap`. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/sitemap#directive)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "value": {
        "type": "string",
        "description": "The URL that the sitemap is hosted at. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/sitemap#value)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "sort_option": {
    "summary": "A sort option for a collection or search results page.",
    "description": "A sort option for a collection or search results page. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/sort_option)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "description": "The customer-facing name of the sort option. The name can be edited by merchants in the [language editor](https://help.shopify.com/manual/online-store/themes/customizing-themes/language/change-wording).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/sort_option#name)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "value": {
        "type": "string",
        "description": "The value of the sort option. This value is used when assigning the [`collection.sort_by`](https://shopify.dev/docs/api/liquid/objects/collection#collection-sort_by) and\n[`search.sort_by`](https://shopify.dev/docs/api/liquid/objects/search#search-sort_by) parameters.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/sort_option#value)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  },
  "transaction_payment_details": {
    "summary": "Information about the payment methods used for a transaction.",
    "description": "Information about the payment methods used for a transaction. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction_payment_details)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "credit_card_company": {
        "type": "string",
        "description": "The name of the company that issued the credit card used for the transaction. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction_payment_details#credit_card_company)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "credit_card_last_four_digits": {
        "type": "string",
        "description": "The last four digits of the credit card number of the credit card used for the transaction. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction_payment_details#credit_card_last_four_digits)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "credit_card_number": {
        "type": "string",
        "description": "The credit card number of the credit card used for the transaction. All but the last four digits are redacted.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction_payment_details#credit_card_number)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "gift_card": {
        "type": "object",
        "description": "The gift card used for the transaction. If no gift card was used, then `nil` is returned.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction_payment_details#gift_card)\n\n\nLast Updated: 6th April 2023\n\n\n",
        "scope": "gift_card"
      }
    }
  },
  "user_agent": {
    "summary": "The user-agent, which is the name of the crawler, for a specific group in the [`robots.txt` file](/themes/architecture/templates/robots-txt-liquid).",
    "description": "The user-agent, which is the name of the crawler, for a specific group in the [`robots.txt` file](https://shopify.dev/themes/architecture/templates/robots-txt-liquid). The `user_agent` object consists of a `User-agent` directive, and a value of the name of the user-agent. For example:\n\n```\nUser-agent: *\n```\n\n\n\n**Tip**\n\n> You can [customize the `robots.txt` file](https://shopify.dev/themes/seo/robots-txt) with the [`robots.txt.liquid` template](/themes/architecture/templates/robots-txt-liquid).\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/user_agent)\n\n\nLast Updated: 6th April 2023\n\n\n",
    "type": "object",
    "properties": {
      "directive": {
        "type": "string",
        "description": "Returns `User-agent`. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/user_agent#directive)\n\n\nLast Updated: 6th April 2023\n\n\n"
      },
      "value": {
        "type": "string",
        "description": "The name of the user-agent. \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/user_agent#value)\n\n\nLast Updated: 6th April 2023\n\n\n"
      }
    }
  }
};

// src/liquid/data/shopify/filters.ts
var filters2 = {
  item_count_for_variant: {
    description: "Returns the total item count for a specified variant in the cart. \n\n\n\n#### Example\n\n```liquid\n\n{{ cart | item_count_for_variant: 39888235757633 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/item_count_for_variant)\n\n",
    returns: "number",
    snippet: "item_count_for_variant: ${1}",
    arguments: [
      {
        type: "any",
        required: true
      }
    ]
  },
  link_to_type: {
    description: "Generates an HTML `<a>` tag with an `href` attribute linking to a collection page that lists all products of the given\nproduct type. \n\n\n\n#### Example\n\n```liquid\n\n{{ 'Health' | link_to_type }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/link_to_type)\n\n",
    returns: "string",
    snippet: "link_to_type"
  },
  link_to_vendor: {
    description: 'Generates an HTML `<a>` tag with an `href` attribute linking to a collection page that lists all products of a given\nproduct vendor. \n\n\n\n#### Example\n\n```liquid\n\n{{ "Polina\'s Potent Potions" | link_to_vendor }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/link_to_vendor)\n\n',
    snippet: "link_to_vendor",
    returns: "string"
  },
  sort_by: {
    description: "Generates a collection URL with the provided `sort_by` parameter appended. This filter must be applied to a collection URL. Accepts the following values:\n\n- `manual`\n- `best-selling`\n- `title-ascending`\n- `title-descending`\n- `price-ascending`\n- `price-descending`\n- `created-ascending`\n- `created-descending`\n\n\n\n**Tip**\n\n> You can append the `sort_by` filter to the [`url_for_type`](https://shopify.dev/docs/api/liquid/filters/url_for_type)\n> and [`url_for_vendor`](https://shopify.dev/docs/api/liquid/filters/url_for_vendor) filters.\n\n#### Example\n\n```liquid\n\n{{ collection.url | sort_by: 'best-selling' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/sort_by)\n\n",
    snippet: "sort_by: '${1|manual,best-selling,title-ascending,title-descending,price-ascending,price-descending,created-ascending,created-descending|}'",
    returns: "string",
    arguments: [
      {
        type: "string",
        required: true,
        value: [
          "manual",
          "best-selling",
          "title-ascending",
          "title-descending",
          "price-ascending",
          "price-descending",
          "created-ascending",
          "created-descending"
        ]
      }
    ]
  },
  url_for_type: {
    description: "Generates a URL for a collection page that lists all products of the given product type. \n\n\n\n#### Example\n\n```liquid\n\n{{ 'health' | url_for_type }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/url_for_type)\n\n",
    returns: "string"
  },
  url_for_vendor: {
    description: 'Generates a URL for a collection page that lists all products from the given product vendor. \n\n\n\n#### Example\n\n```liquid\n\n{{ "Polina\'s Potent Potions" | url_for_vendor }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/url_for_vendor)\n\n',
    returns: "string"
  },
  within: {
    description: "Generates a product URL within the context of the provided collection. When the collection context is included, you can access the associated [`collection` object](https://shopify.dev/docs/api/liquid/objects/collection)\nin the [product template](https://shopify.dev/themes/architecture/templates/product).\n\n> Caution:\n> Because a standard product page and a product page in the context of a collection have the same content on separate\n> URLs, you should consider the SEO implications of using the `within` filter.\n\n#### Example\n\n```liquid\n\n{%- assign collection_product = collection.products.first -%}\n\n{{ collection_product.url | within: collection }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/within)\n\n",
    snippet: "within: ${1}",
    returns: "string",
    arguments: [
      {
        type: "array",
        required: true
      }
    ]
  },
  brightness_difference: {
    description: "Calculates the [perceived brightness difference](https://www.w3.org/WAI/ER/WD-AERT/#color-contrast) between two colors. \n\n**Tip**\n\n> For accessibility best practices, it's recommended to have a minimum brightness difference of 125.\n\n#### Example\n\n```liquid\n\n{{ '#E800B0' | brightness_difference: '#FECEE9' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/brightness_difference)\n\n",
    snippet: "brightness_difference: '${1:#FECEE9}'",
    arguments: [
      {
        type: "string",
        pattern: /#(?:[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/,
        required: true
      }
    ],
    returns: "number"
  },
  color_brightness: {
    description: "Calculates the [perceived brightness](https://www.w3.org/WAI/ER/WD-AERT/#color-contrast) of a given color. \n\n\n\n#### Example\n\n```liquid\n\n{{ '#EA5AB9' | color_brightness }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_brightness)\n\n",
    returns: "number"
  },
  color_contrast: {
    description: "Calculates the contrast ratio between two colors and returns the ratio's numerator. The ratio's denominator, which isn't\nreturned, is always 1. For example, with a contrast ratio of 3.5:1, this filter returns 3.5. The order in which you specify the colors doesn't matter.\n\n\n\n**Tip**\n\n> For accessibility best practices, the\n> [WCAG 2.0 level AA](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.0#qr-visual-audio-contrast-contrast) requires a\n> minimum contrast ratio of 4.5:1 for normal text, and 3:1 for large text. [Level AAA](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.0#qr-visual-audio-contrast7)\n> requires a minimum contrast ratio of 7:1 for normal text, and 4.5:1 for large text.\n\n#### Example\n\n```liquid\n\n{{ '#E800B0' | color_contrast: '#D9D8FF' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_contrast)\n\n",
    snippet: "color_contrast: color: ${1:#FFF3F9}",
    arguments: [
      {
        type: "string",
        description: "A color to compare with the provided color.",
        pattern: /#(?:[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/,
        required: true
      }
    ],
    returns: "number"
  },
  color_darken: {
    description: "Darkens a given color by a specific percentage. The percentage must be between 0 and 100. \n\n\n\n#### Example\n\n```liquid\n\n{{ '#EA5AB9' | color_darken: 30 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_darken)\n\n",
    returns: "string",
    snippet: "color_darken: ${1:30}",
    arguments: [
      {
        type: "number",
        description: "A color to compare with the provided color.",
        pattern: [0, 100],
        required: true
      }
    ]
  },
  color_desaturate: {
    description: "Desaturates a given color by a specific percentage. The percentage must be between 0 and 100. \n\n\n\n#### Example\n\n```liquid\n\n{{ '#EA5AB9' | color_desaturate: 30 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_desaturate)\n\n",
    snippet: "color_desaturate: ${1:30}",
    arguments: [
      {
        type: "number",
        required: true,
        pattern: [0, 100],
        description: "The amount to desaturate the provided color by."
      }
    ],
    returns: "string"
  },
  color_difference: {
    description: "Calculates the [color difference](https://www.w3.org/WAI/ER/WD-AERT/#color-contrast) between two colors. \n\n**Tip**\n\n> For accessibility best practices, it's recommended to have a minimum color difference of 500.\n\n#### Example\n\n```liquid\n\n{{ '#720955' | color_difference: '#FFF3F9' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_difference)\n\n",
    snippet: "color_difference: ${1:#FFF3F9}",
    arguments: [
      {
        type: "string",
        pattern: /#(?:[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/,
        required: true,
        description: "A color to compare with the provided color."
      }
    ],
    returns: "number"
  },
  color_extract: {
    description: "Extracts a specific color component from a given color. Accepts the following color components:\n\n- `alpha`\n- `red`\n- `green`\n- `blue`\n- `hue`\n- `saturation`\n- `lightness`\n\n#### Example\n\n```liquid\n\n{{ '#EA5AB9' | color_extract: 'red' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_extract)\n\n",
    returns: "number",
    snippet: "color_extract: '${1|alpha,red,green,blue,hue,saturation,lightness|}'",
    arguments: [
      {
        type: "string",
        required: true,
        value: [
          "alpha",
          "red",
          "green",
          "blue",
          "hue",
          "saturation",
          "lightness"
        ]
      }
    ]
  },
  color_lighten: {
    description: "Lightens a given color by a specific percentage. The percentage must be between 0 and 100. \n\n\n\n#### Example\n\n```liquid\n\n{{ '#EA5AB9' | color_lighten: 30 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_lighten)\n\n",
    snippet: "color_lighten: percent: ${1:30}",
    arguments: [
      {
        type: "number",
        pattern: [0, 100],
        required: true,
        description: "The amount to lighten the provided color by."
      }
    ],
    returns: "string"
  },
  color_mix: {
    description: "Blends two colors together by a specific percentage factor. The percentage must be between 0 and 100. \n\n**Tip**\n\n> A percentage factor of 100 returns the color being filtered. A percentage factor of 0 returns the color\n> supplied to the filter.\n\n#### Example\n\n```liquid\n\n{{ '#E800B0' | color_mix: '#00936F', 50 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_mix)\n\n",
    snippet: "color_mix: '${1:#FECEE9}', ${2:100}",
    arguments: [
      {
        type: "string",
        pattern: /#(?:[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/,
        required: true
      },
      {
        type: "number",
        pattern: [0, 100],
        required: true
      }
    ],
    returns: "string"
  },
  color_modify: {
    description: "Modifies a specific color component of a given color by a specific amount. The following table outlines valid color components, and the value range for their modifications:\n\n| Component | Value range |\n| --- | --- |\n| <ul><li>`red`</li><li>`green`</li><li>`blue`</li></ul> | An integer between 0 and 255 |\n| `alpha` | A decimal between 0 and 1 |\n| `hue` | An integer between 0 and 360 |\n| <ul><li>`saturation`<li>`lightness`</li></ul> | An integer between 0 and 100 |\n\n#### Example\n\n```liquid\n\n{{ '#EA5AB9' | color_modify: 'red', 255 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_modify)\n\n",
    snippet: "color_modify: '${1|red,green,blue,alpha,hue,saturation,lightness|}', ${2:100}",
    arguments: [
      {
        type: "string",
        required: true,
        value: [
          "red",
          "green",
          "blue",
          "alpha",
          "hue",
          "saturation",
          "lightness"
        ]
      },
      {
        type: "number",
        required: true,
        pattern: {
          red: [
            0,
            255
          ],
          green: [
            0,
            255
          ],
          blue: [
            0,
            255
          ],
          alpha: [
            0,
            1
          ],
          hue: [
            0,
            360
          ],
          saturation: [
            0,
            100
          ]
        }
      }
    ],
    returns: "string"
  },
  color_saturate: {
    description: "Saturates a given color by a specific percentage. The percentage must be between 0 and 100. \n\n\n\n#### Example\n\n```liquid\n\n{{ '#EA5AB9' | color_saturate: 30 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_saturate)\n\n",
    snippet: "color_saturate: ${1:30}",
    arguments: [
      {
        type: "number",
        pattern: [0, 100],
        required: true,
        description: "The amount to saturate the provided color by."
      }
    ],
    returns: "string"
  },
  color_to_hex: {
    description: "Converts a CSS color string to hexadecimal format (`hex6`). Because colors are converted to `hex6` format, if a color with an alpha component is provided, then the alpha component\nis excluded from the output.\n\n#### Example\n\n```liquid\n\n{{ 'rgb(234, 90, 185)' | color_to_hex }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_to_hex)\n\n",
    returns: "string"
  },
  color_to_hsl: {
    description: "Converts a CSS color string to `HSL` format. If a color with an alpha component is provided, the color is converted to `HSLA` format.\n\n#### Example\n\n```liquid\n\n{{ '#EA5AB9' | color_to_hsl }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_to_hsl)\n\n",
    returns: "string"
  },
  color_to_rgb: {
    description: "Converts a CSS color string to `RGB` format. If a color with an alpha component is provided, then the color is converted to `RGBA` format.\n\n#### Example\n\n```liquid\n\n{{ '#EA5AB9' | color_to_rgb }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_to_rgb)\n\n",
    returns: "string"
  },
  hex_to_rgba: {
    description: "\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F\n\nThe `hex_to_rgba` filter has been replaced by [`color_to_rgb`](/docs/api/liquid/filters/color_to_rgb) and\n[`color_modify`](/docs/api/liquid/filters/color_modify).\n\n---\n\nConverts a CSS color string from  hexadecimal format to `RGBA` format. Shorthand hexadecimal formatting (`hex3`) is also accepted. \n\n\n\n#### Example\n\n```liquid\n\n{{ '#EA5AB9' | hex_to_rgba }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/hex_to_rgba)\n\n",
    returns: "string",
    deprecated: true,
    snippet: "hex_to_rgba"
  },
  hmac_sha1: {
    description: "Converts a string into an SHA-1 hash using a hash message authentication code (HMAC). The secret key for the message is supplied as a parameter to the filter.\n\n#### Example\n\n```liquid\n\n{%- assign secret_potion = 'Polyjuice' | hmac_sha1: 'Polina' -%}\n\nMy secret potion: {{ secret_potion }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/hmac_sha1)\n\n",
    returns: "string",
    snippet: "hmac_sha1: $1",
    arguments: [
      {
        type: "any",
        required: true
      }
    ]
  },
  hmac_sha256: {
    description: "Converts a string into an SHA-256 hash using a hash message authentication code (HMAC). The secret key for the message is supplied as a parameter to the filter.\n\n#### Example\n\n```liquid\n\n{%- assign secret_potion = 'Polyjuice' | hmac_sha256: 'Polina' -%}\n\nMy secret potion: {{ secret_potion }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/hmac_sha256)\n\n",
    returns: "string",
    snippet: "hmac_sha256: $1",
    arguments: [
      {
        type: "any",
        required: true
      }
    ]
  },
  md5: {
    description: "Converts a string into an MD5 hash. \n\n\n\n#### Example\n\n```liquid\n\n{{ '' | md5 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/md5)\n\n",
    returns: "string"
  },
  sha1: {
    description: "Converts a string into an SHA-1 hash. \n\n\n\n#### Example\n\n```liquid\n\n{%- assign secret_potion = 'Polyjuice' | sha1 -%}\n\nMy secret potion: {{ secret_potion }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/sha1)\n\n",
    returns: "string"
  },
  sha256: {
    description: "Converts a string into an SHA-256 hash. \n\n\n\n#### Example\n\n```liquid\n\n{%- assign secret_potion = 'Polyjuice' | sha256 -%}\n\nMy secret potion: {{ secret_potion }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/sha256)\n\n",
    returns: "string",
    snippet: "sha256"
  },
  currency_selector: {
    description: "\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F\n\nDeprecated without a direct replacement because the [currency form](/docs/api/liquid/tags/form#form-currency) has also been\ndeprecated.\n\n---\n\nGenerates an HTML `<select>` element with an option for each currency available on the store. The `currency_selector` filter must be applied to the [`form` object](https://shopify.dev/docs/api/liquid/objects/form) within a\n[currency form](https://shopify.dev/docs/api/liquid/tags/form#form-currency).\n\n#### Example\n\n```liquid\n\n{% form 'currency' %}\n  {{ form | currency_selector }}\n{% endform %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/currency_selector)\n\n",
    scope: "form",
    deprecated: true,
    returns: "string",
    snippet: "currency_selector"
  },
  customer_login_link: {
    description: "Generates an HTML link to the customer login page. \n\n\n\n#### Example\n\n```liquid\n\n{{ 'Log in' | customer_login_link }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/customer_login_link)\n\n",
    returns: "string"
  },
  customer_logout_link: {
    description: "Generates an HTML link to log the customer out of their account and redirect to the homepage. \n\n\n\n#### Example\n\n```liquid\n\n{{ 'Log out' | customer_logout_link }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/customer_logout_link)\n\n",
    returns: "string"
  },
  customer_register_link: {
    description: "Generates an HTML link to the customer registration page. \n\n\n\n#### Example\n\n```liquid\n\n{{ 'Create an account' | customer_register_link }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/customer_register_link)\n\n",
    returns: "string"
  },
  date: {
    description: "Converts a timestamp into another date format. The `date` filter accepts the same parameters as Ruby's strftime method for formatting the date. For a list of shorthand\nformats, refer to the [Ruby documentation](https://ruby-doc.org/core-3.1.1/Time.html#method-i-strftime) or\n[strftime reference and sandbox](http://www.strfti.me/).\n\n#### Example\n\n```liquid\n\n{{ article.created_at | date: '%B %d, %Y' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/date)\n\n",
    arguments: [
      {
        type: "string",
        required: false,
        description: "The desired date format."
      }
    ],
    returns: "string"
  },
  font_face: {
    description: "Generates a CSS [`@font_face` declaration](https://developer.mozilla.org/en-US/docs/Web/CSS/%40font-face) to load the provided font. \n\n\n\n#### Example\n\n```liquid\n\n{{ settings.type_header_font | font_face }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/font_face)\n\n",
    arguments: [
      {
        type: "parameter",
        value: {
          font_display: {
            type: "string",
            pattern: /\b(?:auto|block|swap|fallback|optional)\b/,
            description: "[string] Customize the [`font_display` property](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display) of the `@font-face` declaration.",
            value: [
              {
                value: "auto",
                description: "The font display strategy is defined by the user agent."
              },
              {
                value: "block",
                description: "Gives the font face a short block period and an infinite swap period."
              },
              {
                value: "swap",
                description: "Gives the font face an extremely small block period and an infinite swap period."
              },
              {
                value: "fallback",
                description: "Gives the font face an extremely small block period and a short swap period."
              },
              {
                value: "optional",
                description: "Gives the font face an extremely small block period and no swap period."
              }
            ]
          }
        }
      }
    ],
    returns: "string"
  },
  font_modify: {
    description: 'Modifies a specific property of a given font. The `font_modify` filter requires two parameters. The first indicates which property should be modified and the second is\neither the new value, or modification amount, for that property.\n\n\n\n**Tip**\n\n> You can access every variant of the chosen font\'s family by using [`font.variants`](https://shopify.dev/docs/api/liquid/objects/font#font-variants).\n> However, you can more easily access specific styles and weights by using the `font_modify` filter.\n\nThe following table outlines the valid font properties and modification values:\n\n<table>\n  <thead>\n    <th>Property</th>\n    <th>Modification value</th>\n    <th>Output</th>\n  </thead>\n  <tbody>\n    <tr>\n      <td rowspan=3><code>style</code></td>\n      <td><code>normal</code></td>\n      <td>Returns the normal variant of the same weight, if it exists.</td>\n    </tr>\n    <tr>\n      <td><code>italic</code></td>\n      <td>Returns the italic variant of the same weight, if it exists.</td>\n    </tr>\n    <tr>\n      <td><code>oblique</code></td>\n      <td>\n        <p>Returns the oblique variant of the same weight, if it exists.</p>\n        <p>Oblique variants are similar to italic variants in appearance. All Shopify fonts have only oblique or italic variants, not both.</p>\n      </td>\n    </tr>\n    <tr>\n      <td rowspan=7><code>weight</code></td>\n      <td><code>100</code> &rarr; <code>900</code></td>\n      <td>Returns a variant of the same style with the given weight, if it exists.</td>\n    </tr>\n    <tr>\n      <td><code>normal</code></td>\n      <td>Returns a variant of the same style with a weight of <code>400</code>, if it exists.</td>\n    </tr>\n    <tr>\n      <td><code>bold</code></td>\n      <td>Returns a variant of the same style with a weight of <code>700</code>, if it exists.</td>\n    </tr>\n    <tr>\n      <td><code>+100</code> &rarr; <code>+900</code></td>\n      <td>\n        <p>Returns a variant of the same style with a weight incremented by the given value, if it exists.</p>\n        <p>For example, if a font has a weight of <code>400</code>, then using <code>+100</code> would return the font with a weight of <code>500</code>.</p>\n      </td>\n    </tr>\n    <tr>\n      <td><code>-100</code> &rarr; <code>-900</code></td>\n      <td>\n        <p>Returns a variant of the same style with a weight decremented by the given value, if it exists.</p>\n        <p>For example, if a font has a weight of <code>400</code>, then using <code>-100</code> would return the font with a weight of <code>300</code>.</p>\n      </td>\n    </tr>\n    <tr>\n      <td><code>lighter</code></td>\n      <td>Returns a lighter variant of the same style by applying the rules used by the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#Meaning_of_relative_weights">CSS <code>font-weight</code> property</a> and browser <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#Fallback_weights">fallback weights</a>, if it exists.</td>\n    </tr>\n    <tr>\n      <td><code>bolder</code></td>\n      <td>Returns a bolder variant of the same style by applying the rules used by the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#Meaning_of_relative_weights">CSS <code>font-weight</code> property</a> and browser <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#Fallback_weights">fallback weights</a>, if it exists.</td>\n    </tr>\n  </tbody>\n</table>\n\n#### Example\n\n```liquid\n\n{%- assign bold_font = settings.type_body_font | font_modify: \'weight\', \'bold\' -%}\n\nh2 {\n  font-weight: {{ bold_font.weight }};\n}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/font_modify)\n\n',
    snippet: "font_modify: '${1|normal,italic,oblique|}', '${2|100,200,300,400,500,600,700,800,900,lighter,normal,bold,bolder|}'",
    arguments: [
      {
        type: "string",
        required: true,
        value: ["style", "weight"]
      },
      {
        type: "string",
        required: true,
        pattern: {
          style: /\b(?:normal|italic|oblique)\b/,
          weight: /\b(?:normal|bold|bolder|lighter|[+-]?[1-9]0{2})\b/
        },
        value: {
          style: [
            {
              value: "normal",
              description: "Returns the normal variant of the same weight (if it exists)"
            },
            {
              value: "italic",
              description: "Returns the italic variant of the same weight (if it exists)"
            },
            {
              value: "oblique",
              description: "Has the same behavior as italic. None of the font families provided by Shopify have both italic and oblique styles."
            }
          ],
          weight: [
            {
              value: "normal",
              description: "Has the same behavior as `400`."
            },
            {
              value: "bold",
              description: "Has the same behavior as `700`"
            },
            {
              value: "bolder",
              description: "Returns a bolder variant of the same style by applying the rules used by the CSS `font-weight` property and browser fallback weights (if it exists)."
            },
            {
              value: "lighter",
              description: "Returns a lighter variant of the same style by applying the rules used by the CSS `font-weight` property and browser fallback weights (if it exists)."
            }
          ]
        }
      }
    ],
    returns: "any"
  },
  font_url: {
    description: "Returns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for the provided font in `woff2` format. \n\n\n\n#### Example\n\n```liquid\n\n{{ settings.type_header_font | font_url }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/font_url)\n\n",
    arguments: [
      {
        type: "string",
        required: false,
        description: "Choose to return the URL for the font in `woff` format, instead of `woff2`."
      }
    ],
    returns: "string"
  },
  default_errors: {
    description: "Generates default error messages for each possible value of [`form.errors`](https://shopify.dev/docs/themes/liquid/reference/objects/form#form-errors). \n\n\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/default_errors)\n\n",
    scope: "form",
    returns: "string"
  },
  payment_button: {
    description: "Generates an HTML container to host [dynamic checkout buttons](https://help.shopify.com/manual/online-store/dynamic-checkout)\nfor a product. The `payment_button` filter must be used on the `form` object within a [product form](https://shopify.dev/docs/api/liquid/tags/form#form-product). \n\n**Note**\n\n> You can't render dynamic checkout buttons through AJAX requests, including those through the\n> [Section Rendering API](https://shopify.dev/api/section-rendering). The dynamic checkout buttons are added by JavaScript included\n> by Shopify through the [`content_for_header`](https://shopify.dev/docs/api/liquid/objects/content_for_header) object, which only runs on\n> the initial page load.\n\n#### Example\n\n```liquid\n\n{% form 'product', product %}\n  {{ form | payment_button }}\n{% endform %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/payment_button)\n\n",
    scope: "form",
    returns: "string"
  },
  payment_terms: {
    description: "Generates the HTML for the [Shop Pay Installments banner](https://shopify.dev/themes/pricing-payments/installments). The `payment_terms` filter must be used on the `form` object within a [product form](https://shopify.dev/docs/api/liquid/tags/form#form-product) or\n[cart form](https://shopify.dev/docs/api/liquid/tags/form#form-cart).\n\n```liquid\n{% form 'product', product %}\n  {{ form | payment_terms }}\n{% endform %}\n```\n\n```liquid\n{% form 'cart', cart %}\n  {{ form | payment_terms }}\n{% endform %}\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/payment_terms)\n\n",
    returns: "string"
  },
  time_tag: {
    description: "Converts a timestamp into an HTML `<time>` tag. The `time_tag` filter accepts the same parameters as Ruby's strftime method for formatting the date. For a list of shorthand\nformats, refer to the [Ruby documentation](https://ruby-doc.org/core-3.1.1/Time.html#method-i-strftime) or\n[strftime reference and sandbox](http://www.strfti.me/).\n\n#### Example\n\n```liquid\n\n{{ article.created_at | time_tag: '%B %d, %Y' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/time_tag)\n\n",
    arguments: [
      {
        type: "string",
        pattern: /%[AaBbCcDdeFGgHhIjkLlMmNnPpRrSsTtrUuVvWwXxYyZz0-9^%_-]+/,
        description: "The time_tag filter accepts the same parameters as Ruby's strftime method."
      },
      {
        type: "parameter",
        value: {
          datetime: {
            type: "string",
            pattern: /%[AaBbCcDdeFGgHhIjkLlMmNnPpRrSsTtrUuVvWwXxYyZz0-9^%_-]+/,
            description: "A datetime parameter with strftime shorthand formats to use a custom format for the datetime attribute of the output `<time>` tag."
          },
          format: {
            type: "string",
            description: "The font-display descriptor determines how a font face is displayed based on whether and when it is downloaded and ready to use",
            strict: false,
            value: [
              {
                value: "abbreviated_date",
                description: "Dec 31, 2018"
              },
              {
                value: "basic",
                description: "12/31/2018"
              },
              {
                value: "date",
                description: "December 31, 2018"
              },
              {
                value: "date_at_time",
                description: "December 31, 2018 at 1:00 pm"
              },
              {
                value: "default",
                description: "Monday, December 31, 2018 at 1:00 pm -0500"
              },
              {
                value: "on_date",
                description: "on Dec 31, 2018"
              }
            ]
          }
        }
      }
    ],
    returns: "string",
    snippet: "time_tag"
  },
  translate: {
    description: "Returns a string of translated text for a given translation key from a [locale file](https://shopify.dev/themes/architecture/locales). The `translate` filter has an alias of `t`, which is more commonly used.\n\n\n\n**Tip**\n\n> To learn more about using the `t` filter, refer to [storefront locale file usage](https://shopify.dev/themes/architecture/locales/storefront-locale-files#usage)\n> or [schema locale file usage](https://shopify.dev/themes/architecture/locales/schema-locale-files#usage).\n\n#### Example\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/translate)\n\n",
    returns: "string"
  },
  json: {
    description: "Converts a string, or object, into JSON format. \n\n**Tip**\n\n> When using the JSON output in JavaScript, you don't need to wrap it in quotes because the `json` filter includes them.\n> The `json` filter also escapes any quotes inside the output.\n\n#### Product inventory\n\nWhen applied to a [`product` object](https://shopify.dev/docs/api/liquid/objects/product) on any Shopify store created after December 5, 2017, the\n`json` filter doesn't output values for the `inventory_quantity` and `inventory_policy` properties of any associated\n[variants](https://shopify.dev/docs/api/liquid/objects/variant). These properties are excluded to help prevent bots and crawlers from retrieving\ninventory quantities for stores to which they aren't granted access.\n\nIf you need inventory information, you can access it through individual variants.\n\n#### Example\n\n```liquid\n\n{{ product | json }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/json)\n\n",
    returns: "string"
  },
  abs: {
    description: "Returns the absolute value of a number. \n\n\n\n#### Example\n\n```liquid\n\n{{ -3 | abs }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/abs)\n\n",
    returns: "number"
  },
  append: {
    description: "Adds a given string to the end of a string. \n\n\n\n#### Example\n\n```liquid\n\n{%-  assign path = product.url -%}\n\n{{ request.origin | append: path }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/append)\n\n",
    snippet: "append: '${1}'",
    arguments: [
      {
        type: "string",
        required: true
      }
    ],
    returns: "string"
  },
  at_least: {
    description: "Limits a number to a minimum value. \n\n\n\n#### Example\n\n```liquid\n\n{{ 4 | at_least: 5 }}\n{{ 4 | at_least: 3 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/at_least)\n\n",
    snippet: "at_least: $1 $0",
    arguments: [
      {
        type: "number",
        required: true
      }
    ],
    returns: "number"
  },
  at_most: {
    description: "Limits a number to a maximum value. \n\n\n\n#### Example\n\n```liquid\n\n{{ 6 | at_most: 5 }}\n{{ 4 | at_most: 5 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/at_most)\n\n",
    snippet: "at_most: $1 $0",
    arguments: [
      {
        type: "number",
        required: true
      }
    ],
    returns: "number"
  },
  base64_decode: {
    description: "Decodes a string in [Base64 format](https://developer.mozilla.org/en-US/docs/Glossary/Base64). \n\n\n\n#### Example\n\n```liquid\n\n{{ 'b25lIHR3byB0aHJlZQ==' | base64_decode }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/base64_decode)\n\n",
    returns: "string"
  },
  base64_encode: {
    description: "Encodes a string to [Base64 format](https://developer.mozilla.org/en-US/docs/Glossary/Base64). \n\n\n\n#### Example\n\n```liquid\n\n{{ 'one two three' | base64_encode }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/base64_encode)\n\n",
    returns: "string"
  },
  base64_url_safe_decode: {
    description: "Decodes a string in URL-safe [Base64 format](https://developer.mozilla.org/en-US/docs/Glossary/Base64). \n\n\n\n#### Example\n\n```liquid\n\n{{ 'b25lIHR3byB0aHJlZQ==' | base64_url_safe_decode }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/base64_url_safe_decode)\n\n",
    returns: "string"
  },
  base64_url_safe_encode: {
    description: "Encodes a string to URL-safe [Base64 format](https://developer.mozilla.org/en-US/docs/Glossary/Base64). \n\n\n\n#### Example\n\nTo produce URL-safe Base64, this filter uses `-` and `_` in place of `+` and `/`.\n\n```liquid\n\n{{ 'one two three' | base64_url_safe_encode }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/base64_url_safe_encode)\n\n",
    returns: "string"
  },
  capitalize: {
    description: "Capitalizes the first word in a string. \n\n\n\n#### Example\n\n```liquid\n\n{{ 'this sentence should start with a capitalized word.' | capitalize }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/capitalize)\n\n",
    returns: "string"
  },
  ceil: {
    description: "Rounds a number up to the nearest integer. \n\n\n\n#### Example\n\n```liquid\n\n{{ 1.2 | ceil }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/ceil)\n\n",
    returns: "number"
  },
  compact: {
    description: "Removes any `nil` items from an array. \n\n\n\n#### Example\n\n```liquid\n\n{%- assign original_prices = collection.products | map: 'compare_at_price' -%}\n\nOriginal prices:\n\n{% for price in original_prices -%}\n  - {{ price }}\n{%- endfor %}\n\n{%- assign compacted_original_prices = original_prices | compact -%}\n\nOriginal prices - compacted:\n\n{% for price in compacted_original_prices -%}\n  - {{ price }}\n{%- endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/compact)\n\n",
    returns: "array"
  },
  concat: {
    description: "Concatenates (combines) two arrays. \n\n**Note**\n\n> The `concat` filter won't filter out duplicates. If you want to remove duplicates, then you need to use the\n> [`uniq` filter](https://shopify.dev/docs/api/liquid/filters/uniq).\n\n#### Example\n\n```liquid\n\n{%- assign types_and_vendors = collection.all_types | concat: collection.all_vendors -%}\n\nTypes and vendors:\n\n{% for item in types_and_vendors -%}\n  {%- if item != blank -%}\n    - {{ item }}\n  {%- endif -%}\n{%- endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/concat)\n\n",
    snippet: "concat: ${1}",
    arguments: [
      {
        type: "array",
        required: true
      }
    ],
    returns: "array"
  },
  default: {
    description: "Sets a default value for any variable whose value is one of the following:\n\n- [`empty`](https://shopify.dev/docs/api/liquid/basics#empty)\n- [`false`](https://shopify.dev/docs/api/liquid/basics#truthy-and-falsy)\n- [`nil`](https://shopify.dev/docs/api/liquid/basics#nil) \n\n\n\n#### Example\n\n```liquid\n\n{{ product.selected_variant.url | default: product.url }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/default)\n\n",
    arguments: [
      {
        type: "parameter",
        value: {
          allow_false: {
            type: "boolean",
            description: "Whether to use false values instead of the default."
          }
        }
      }
    ],
    returns: "any"
  },
  divided_by: {
    description: "Divides a number by a given number. The `divided_by` filter produces a result of the same type as the divisor. This means if you divide by an integer, the result will be an integer, and if you divide by a float, the result will be a float. \n\n\n\n#### Example\n\n```liquid\n\n{{ 4 | divided_by: 2 }}\n\n# divisor is an integer\n{{ 20 | divided_by: 7 }}\n\n# divisor is a float \n{{ 20 | divided_by: 7.0 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/divided_by)\n\n",
    snippet: "divided_by: $1",
    arguments: [
      {
        type: "number",
        required: true
      }
    ],
    returns: "number"
  },
  downcase: {
    description: "Converts a string to all lowercase characters. \n\n\n\n#### Example\n\n```liquid\n\n{{ product.title | downcase }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/downcase)\n\n",
    returns: "string"
  },
  escape: {
    description: "Escapes special characters in HTML, such as `<>`, `'`, and `&`, and converts characters into escape sequences. The filter doesn't effect characters within the string that don\u2019t have a corresponding escape sequence.\". \n\n\n\n#### Example\n\n```liquid\n\n{{ '<p>Text to be escaped.</p>' | escape }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/escape)\n\n",
    returns: "string"
  },
  escape_once: {
    description: "Escapes a string without changing characters that have already been escaped. \n\n\n\n#### Example\n\n```liquid\n\n{%- assign escaped_text = '<p>Text to be escaped.</p>' | escape -%}\n\n{{ escaped_text }}\n{{ escaped_text | escape_once }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/escape_once)\n\n",
    returns: "string"
  },
  first: {
    description: "Returns the first item in an array. \n\n\n\n#### Example\n\n```liquid\n\n{%- assign first_product = collection.products | first -%}\n\n{{ first_product.title }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/first)\n\n",
    returns: "any"
  },
  floor: {
    description: "Rounds a number down to the nearest integer. \n\n\n\n#### Example\n\n```liquid\n\n{{ 1.2 | floor }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/floor)\n\n",
    returns: "number"
  },
  join: {
    description: "Combines all of the items in an array into a single string, separated by a space. \n\n\n\n#### Example\n\n```liquid\n\n{{ collection.all_tags | join }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/join)\n\n",
    snippet: "join: '$1' $0",
    arguments: [
      {
        type: "string",
        required: true
      }
    ],
    returns: "string"
  },
  last: {
    description: "Returns the last item in an array. \n\n\n\n#### Example\n\n```liquid\n\n{%- assign last_product = collection.products | last -%}\n\n{{ last_product.title }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/last)\n\n",
    returns: "any"
  },
  lstrip: {
    description: 'Strips all whitespace from the left of a string. \n\n\n\n#### Example\n\n```liquid\n\n{%- assign text = \'  Some potions create whitespace.      \' -%}\n\n"{{ text }}"\n"{{ text | lstrip }}"\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/lstrip)\n\n',
    returns: "string"
  },
  map: {
    description: "Creates an array of values from a specific property of the items in an array. \n\n\n\n#### Example\n\n```liquid\n\n{%- assign product_titles = collection.products | map: 'title' -%}\n\n{{ product_titles | join: ', ' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/map)\n\n",
    snippet: "map: $1",
    arguments: [
      {
        type: "any",
        required: true
      }
    ],
    returns: "array"
  },
  minus: {
    description: "Subtracts a given number from another number. \n\n\n\n#### Example\n\n```liquid\n\n{{ 4 | minus: 2 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/minus)\n\n",
    snippet: "minus: $1",
    arguments: [
      {
        type: "number",
        required: true
      }
    ],
    returns: "number"
  },
  modulo: {
    description: "Returns the remainder of dividing a number by a given number. \n\n\n\n#### Example\n\n```liquid\n\n{{ 12 | modulo: 5 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/modulo)\n\n",
    snippet: "modulo: $1",
    arguments: [
      {
        type: "number",
        required: true
      }
    ],
    returns: "number"
  },
  newline_to_br: {
    description: "Converts newlines (`\\n`) in a string to HTML line breaks (`<br>`). \n\n\n\n#### Example\n\n```liquid\n\n{{ product.description | newline_to_br }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/newline_to_br)\n\n",
    returns: "string"
  },
  plus: {
    description: "Adds two numbers. \n\n\n\n#### Example\n\n```liquid\n\n{{ 2 | plus: 2 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/plus)\n\n",
    snippet: "plus: $1",
    arguments: [
      {
        type: "number",
        required: true
      }
    ],
    returns: "number"
  },
  prepend: {
    description: "Adds a given string to the beginning of a string. \n\n\n\n#### Example\n\n```liquid\n\n{%- assign origin = request.origin -%}\n\n{{ product.url | prepend: origin }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/prepend)\n\n",
    snippet: "prepend: '$1' $0",
    arguments: [
      {
        type: "string",
        required: true
      }
    ],
    returns: "string"
  },
  remove: {
    description: 'Removes any instance of a substring inside a string. \n\n\n\n#### Example\n\n```liquid\n\n{{ "I can\'t do it!" | remove: "\'t" }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/remove)\n\n',
    snippet: "remove: '$1' $0",
    arguments: [
      {
        type: "string",
        required: true
      }
    ],
    returns: "string"
  },
  remove_first: {
    description: "Removes the first instance of a substring inside a string. \n\n\n\n#### Example\n\n```liquid\n\n{{ \"I hate it when I accidentally spill my duplication potion accidentally!\" | remove_first: ' accidentally' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/remove_first)\n\n",
    snippet: "remove_first: $1",
    arguments: [
      {
        type: "string",
        required: true
      }
    ],
    returns: "string"
  },
  remove_last: {
    description: "Removes the last instance of a substring inside a string. \n\n\n\n#### Example\n\n```liquid\n\n{{ \"I hate it when I accidentally spill my duplication potion accidentally!\" | remove_last: ' accidentally' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/remove_last)\n\n",
    returns: "string",
    snippet: "remove_last: ${1}",
    arguments: [
      {
        type: "string",
        required: true
      }
    ]
  },
  replace: {
    description: "Replaces any instance of a substring inside a string with a given string. \n\n\n\n#### Example\n\n```liquid\n\n{{ product.handle | replace: '-', ' ' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/replace)\n\n",
    snippet: "replace: $1, $2",
    arguments: [
      {
        type: "string",
        required: true
      },
      {
        type: "string",
        required: true
      }
    ],
    returns: "string"
  },
  replace_first: {
    description: "Replaces the first instance of a substring inside a string with a given string. \n\n\n\n#### Example\n\n```liquid\n\n{{ product.handle | replace_first: '-', ' ' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/replace_first)\n\n",
    snippet: "replace_first: $1, $2",
    arguments: [
      {
        type: "string",
        required: true
      },
      {
        type: "string",
        required: true
      }
    ],
    returns: "string"
  },
  replace_last: {
    description: "Replaces the last instance of a substring inside a string with a given string. \n\n\n\n#### Example\n\n```liquid\n\n{{ product.handle | replace_last: '-', ' ' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/replace_last)\n\n",
    returns: "string",
    snippet: "replace_last: $1, $2",
    arguments: [
      {
        type: "string",
        required: true
      },
      {
        type: "string",
        required: true
      }
    ]
  },
  reverse: {
    description: "Reverses the order of the items in an array. \n\n\n\n#### Example\n\n```liquid\n\nOriginal order:\n{{ collection.products | map: 'title' | join: ', ' }}\n\nReverse order:\n{{ collection.products | reverse | map: 'title' | join: ', ' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/reverse)\n\n",
    returns: "array"
  },
  round: {
    description: "Rounds a number to the nearest integer. \n\n\n\n#### Example\n\n```liquid\n\n{{ 2.7 | round }}\n{{ 1.3 | round }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/round)\n\n",
    arguments: [
      {
        type: "number",
        required: false
      }
    ],
    returns: "number"
  },
  rstrip: {
    description: 'Strips all whitespace from the right of a string. \n\n\n\n#### Example\n\n```liquid\n\n{%- assign text = \'  Some potions create whitespace.      \' -%}\n\n"{{ text }}"\n"{{ text | rstrip }}"\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/rstrip)\n\n',
    returns: "string"
  },
  size: {
    description: "Returns the size of a string or array. The size of a string is the number of characters that the string includes. The size of an array is the number of items\nin the array.\n\n#### Example\n\n```liquid\n\n{{ collection.title | size }}\n{{ collection.products | size }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/size)\n\n",
    returns: "number"
  },
  slice: {
    description: "Returns a substring or series of array items, starting at a given 0-based index. By default, the substring has a length of one character, and the array series has one array item. However, you can\nprovide a second parameter to specify the number of characters or array items.\n\n#### Example\n\n```liquid\n\n{{ collection.title | slice: 0 }}\n{{ collection.title | slice: 0, 5 }}\n\n{{ collection.all_tags | slice: 1, 2 | join: ', ' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/slice)\n\n",
    snippet: "slice: $1 $0",
    arguments: [
      {
        type: "number",
        required: true
      },
      {
        type: "number",
        required: false
      }
    ],
    returns: "string"
  },
  sort: {
    description: "Sorts the items in an array in case-sensitive alphabetical, or numerical, order. \n\n\n\n#### Example\n\n```liquid\n\n{% assign tags = collection.all_tags | sort %}\n\n{% for tag in tags -%}\n  {{ tag }}\n{%- endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/sort)\n\n",
    arguments: [
      {
        type: "number",
        required: false
      }
    ],
    returns: "array"
  },
  sort_natural: {
    description: "Sorts the items in an array in case-insensitive alphabetical order.\n\n> Caution:\n> You shouldn't use the `sort_natural` filter to sort numerical values. When comparing items an array, each item is converted to a\n> string, so sorting on numerical values can lead to unexpected results.\n\n#### Example\n\n```liquid\n\n{% assign tags = collection.all_tags | sort_natural %}\n\n{% for tag in tags -%}\n  {{ tag }}\n{%- endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/sort_natural)\n\n",
    returns: "array"
  },
  split: {
    description: "Splits a string into an array of substrings based on a given separator. \n\n\n\n#### Example\n\n```liquid\n\n{%- assign title_words = product.handle | split: '-' -%}\n\n{% for word in title_words -%}\n  {{ word }}\n{%- endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/split)\n\n",
    snippet: "split: $1",
    arguments: [
      {
        type: "any",
        required: true
      }
    ],
    returns: "array"
  },
  strip: {
    description: 'Strips all whitespace from the left and right of a string. \n\n\n\n#### Example\n\n```liquid\n\n{%- assign text = \'  Some potions create whitespace.      \' -%}\n\n"{{ text }}"\n"{{ text | strip }}"\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/strip)\n\n',
    returns: "string"
  },
  strip_html: {
    description: "Strips all HTML tags from a string. \n\n\n\n#### Example\n\n```liquid\n\n<!-- With HTML -->\n{{ product.description }}\n\n<!-- HTML stripped -->\n{{ product.description | strip_html }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/strip_html)\n\n",
    returns: "string"
  },
  strip_newlines: {
    description: "Strips all newline characters (line breaks) from a string. \n\n\n\n#### Example\n\n```liquid\n\n<!-- With newlines -->\n{{ product.description }}\n\n<!-- Newlines stripped -->\n{{ product.description | strip_newlines }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/strip_newlines)\n\n",
    returns: "string"
  },
  times: {
    description: "Multiplies a number by a given number. \n\n\n\n#### Example\n\n```liquid\n\n{{ 2 | times: 2 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/times)\n\n",
    snippet: "times: $1",
    arguments: [
      {
        type: "number",
        required: true
      }
    ],
    returns: "number"
  },
  truncate: {
    description: "Truncates a string down to a given number of characters. If the specified number of characters is less than the length of the string, then an ellipsis (`...`) is appended to\nthe truncated string. The ellipsis is included in the character count of the truncated string.\n\n#### Example\n\n```liquid\n\n{{ article.title | truncate: 15 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/truncate)\n\n",
    snippet: "truncate: $1",
    arguments: [
      {
        type: "number",
        required: true
      }
    ],
    returns: "string"
  },
  truncatewords: {
    description: "Truncates a string down to a given number of words. If the specified number of words is less than the number of words in the string, then an ellipsis (`...`) is appended to\nthe truncated string.\n\n> Caution:\n> HTML tags are treated as words, so you should strip any HTML from truncated content. If you don't strip HTML, then\n> closing HTML tags can be removed, which can result in unexpected behavior.\n\n#### Example\n\n```liquid\n\n{{ article.content | strip_html | truncatewords: 15 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/truncatewords)\n\n",
    snippet: "truncatewords: $1",
    arguments: [
      {
        type: "number",
        required: true
      }
    ],
    returns: "string"
  },
  uniq: {
    description: "Removes any duplicate items in an array. \n\n\n\n#### Example\n\n```liquid\n\n{% assign potion_array = 'invisibility, health, love, health, invisibility' | split: ', ' %}\n\n{{ potion_array | uniq | join: ', ' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/uniq)\n\n",
    returns: "array"
  },
  upcase: {
    description: "Converts a string to all uppercase characters. \n\n\n\n#### Example\n\n```liquid\n\n{{ product.title | upcase }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/upcase)\n\n",
    returns: "string"
  },
  url_decode: {
    description: "Decodes any [percent-encoded](https://developer.mozilla.org/en-US/docs/Glossary/percent-encoding) characters\nin a string. \n\n\n\n#### Example\n\n```liquid\n\n{{ 'test%40test.com' | url_decode }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/url_decode)\n\n",
    returns: "string"
  },
  url_encode: {
    description: "Converts any URL-unsafe characters in a string to the\n[percent-encoded](https://developer.mozilla.org/en-US/docs/Glossary/percent-encoding) equivalent. \n\n**Note**\n\n> Spaces are converted to a `+` character, instead of a percent-encoded character.\n\n#### Example\n\n```liquid\n\n{{ 'test@test.com' | url_encode }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/url_encode)\n\n",
    returns: "string"
  },
  where: {
    description: "Filters an array to include only items with a specific property value. This requires you to provide both the property name and the associated value.\n\n#### Example\n\n```liquid\n\n{% assign polina_products = collection.products | where: 'vendor', \"Polina's Potent Potions\" %}\n\nProducts from Polina's Potent Potions:\n\n{% for product in polina_products -%}\n  - {{ product.title }}\n{%- endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/where)\n\n",
    snippet: "where: ${1}, ${2}",
    arguments: [
      {
        type: "string",
        required: true
      },
      {
        type: "string",
        required: true
      }
    ],
    returns: "array"
  },
  external_video_tag: {
    description: "Generates an HTML `<iframe>` tag containing the player for a given external video. The input for the `external_video_tag`\nfilter can be either a [`media` object](https://shopify.dev/docs/api/liquid/objects/media) or [`external_video_url`](https://shopify.dev/docs/api/liquid/filters/external_video_url). If [alt text is set on the video](https://help.shopify.com/en/manual/products/product-media/add-alt-text), then it's\nincluded in the `title` attribute of the `<iframe>`. If no alt text is set, then the `title` attribute is set to the\nproduct title.\n\n#### Example\n\n```liquid\n\n{% for media in product.media %}\n  {% if media.media_type == 'external_video' %}\n    {% if media.host == 'youtube' %}\n      {{ media | external_video_url: color: 'white' | external_video_tag }}\n    {% elsif media.host == 'vimeo' %}\n      {{ media | external_video_url: loop: '1', muted: '1' | external_video_tag }}\n    {% endif %}\n  {% endif %}\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/external_video_tag)\n\n",
    returns: "string"
  },
  external_video_url: {
    description: "Returns the URL for a given external video. Use this filter to specify parameters for the external video player generated\nby the [`external_video_tag` filter](https://shopify.dev/docs/api/liquid/filters/external_video_tag). \n\n\n\n#### Example\n\nYou can specify [YouTube](https://developers.google.com/youtube/player_parameters#Parameters) and [Vimeo](https://vimeo.zendesk.com/hc/en-us/articles/360001494447-Using-Player-Parameters) video parameters by adding a parameter that matches the parameter name, and the desired value.\n\n\n```liquid\n\n{% for media in product.media %}\n  {% if media.media_type == 'external_video' %}\n    {% if media.host == 'youtube' %}\n      {{ media | external_video_url: color: 'white' | external_video_tag }}\n    {% elsif media.host == 'vimeo' %}\n      {{ media | external_video_url: loop: '1', muted: '1' | external_video_tag }}\n    {% endif %}\n  {% endif %}\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/external_video_url)\n\n",
    returns: "string",
    snippet: "external_video_url: $1: $2",
    arguments: [
      {
        type: "any",
        required: true
      },
      {
        type: "any",
        required: true
      }
    ]
  },
  image_tag: {
    description: "Generates an HTML `<img>` tag for a given [`image_url`](https://shopify.dev/docs/api/liquid/filters/image_url). By default, `width` and `height` attributes are added to the `<img>` tag based on the dimensions and aspect ratio from\nthe image URL. However, you can override these attributes with the [width](https://shopify.dev/docs/api/liquid/filters/image_tag#image_tag-width) and [height](https://shopify.dev/docs/api/liquid/filters/image_tag#image_tag-height)\nparameters. If only one parameter is provided, then only that attribute is added.\n\n\n\n**Note**\n\n> This filter automatically applies the `object-position` css style from the focal point value if set. For more\n> information, refer to the [`focal_point` object](https://shopify.dev/docs/api/liquid/objects/focal_point).\n\n#### Example\n\n```liquid\n\n{{ product | image_url: width: 200 | image_tag }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/image_tag)\n\n",
    returns: "string",
    snippet: "image_tag"
  },
  media_tag: {
    description: "Generates an appropriate HTML tag for a given media object. \n\n\n\n#### Example\n\n```liquid\n\n{% for media in product.media %}\n  {{- media | media_tag }}\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/media_tag)\n\n",
    returns: "string",
    snippet: "media_tag"
  },
  model_viewer_tag: {
    description: "Generates a [Google model viewer component](https://modelviewer.dev/) for a given 3D model. \n\n\n\n#### Example\n\n```liquid\n\n{% for media in product.media %}\n  {% if media.media_type == 'model' %}\n    {{ media | model_viewer_tag }}\n  {% endif %}\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/model_viewer_tag)\n\n",
    returns: "string",
    snippet: "model_viewer_tag"
  },
  video_tag: {
    description: "Generates an HTML `<video>` tag for a given video. \n\n**Note**\n\n> When `mp4` videos are uploaded, Shopify generates an `m3u8` file as an additional [`video_source`](https://shopify.dev/docs/api/liquid/objects/video_source).\n> An `m3u8` file enables video players to leverage [HTTP live streaming (HLS)](https://developer.apple.com/streaming/),\n> resulting in an optimized video experience based on the user's internet connection. If loop is enabled, the HLS source is not used\n> in order to allow progessive download to cache the video.\n>\n> If the `m3u8` source isn't supported, then the player falls back to the `mp4` source.\n\n#### Example\n\n```liquid\n\n{% for media in product.media %}\n  {% if media.media_type == 'video' %}\n    {{ media | video_tag }}\n  {% endif %}\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/video_tag)\n\n",
    returns: "string",
    snippet: "video_tag"
  },
  metafield_tag: {
    description: 'Generates an HTML element to host the metafield data. The type of element that\'s generated differs depending on the\ntype of metafield. \n\n**Note**\n\n> The `metafield_tag` filter doesn\'t support list metafields other than `list.single_line_text_field`.\n\n#### Basic types\n\nMost metafield types return a simple HTML element:\n\n| Type | Element | Attributes |\n| --- | --- | --- |\n| `boolean` | `<span>` | `class="metafield-boolean"` |\n| `collection_reference` | `<a>` | `class="metafield-collection_reference"` |\n| `color` | `<span>` | `class="metafield-color"` |\n| `date` | `<time>` | `datetime="<the metafield value>"`<br><br>`class="metafield-date"`<br><br>Value is localized to the customer |\n| `date_time` | `<time>` | `datetime="<the metafield value>"`<br><br>`class="metafield-date"`<br><br>Value is localized to the customer |\n| `json` | `<script>` | `type="application/json"`<br><br>`class="metafield-json"` |\n| `money` | `<span>` | `class="metafield-money"`<br><br>Value is formatted using the store\'s [HTML with currency setting](https://help.shopify.com/manual/payments/currency-formatting) |\n| `multi_line_text_field` | `<span>` | `class="metafield-multi_line_text_field"` |\n| `number_decimal` | `<span>` | `class="metafield-number_decimal"` |\n| `number_integer` | `<span>` | `class="metafield-number_integer"` |\n| `page_reference` | `<a>` | `class="metafield-page_reference"` |\n| `product_reference` | `<a>` | `class="metafield-page_reference"` |\n| `rating` | `<span>` | `class="metafield-rating"` | |\n| `single_line_text_field` | `<span>` | `class="metafield-single_line_text_field"` |\n| `url` | `<a>` | `class="metafield-url"` |\n| `variant_reference` | `<a>` | `class="metafield-variant_reference"` |\n| `rich_text_field` | `<div>` | `class="metafield-rich_text_field"` |\n\n\n```liquid\n\n<!-- boolean -->\n{{ product.metafields.information.seasonal | metafield_tag }}\n\n<!-- collection_reference -->\n{{ product.metafields.information.related_collection | metafield_tag }}\n\n<!-- color -->\n{{ product.metafields.details.potion_color | metafield_tag }}\n\n<!-- date -->\n{{ product.metafields.information.expiry | metafield_tag }}\n\n<!-- date_time -->\n{{ product.metafields.information.brew_date | metafield_tag }}\n\n<!-- json -->\n{{ product.metafields.information.burn_temperature | metafield_tag }}\n\n<!-- money -->\n{{ product.metafields.details.price_per_ml | metafield_tag }}\n\n<!-- multi_line_text_field -->\n{{ product.metafields.information.shipping | metafield_tag }}\n\n<!-- number_decimal -->\n{{ product.metafields.information.salinity | metafield_tag }}\n\n<!-- number_integer -->\n{{ product.metafields.information.doses_per_day | metafield_tag }}\n\n<!-- page_reference -->\n{{ product.metafields.information.dosage | metafield_tag }}\n\n<!-- product_reference -->\n{{ product.metafields.information.related_product | metafield_tag }}\n\n<!-- rating -->\n{{ product.metafields.details.rating | metafield_tag }}\n\n<!-- single_line_text_field -->\n{{ product.metafields.information.directions | metafield_tag }}\n\n<!-- url -->\n{{ product.metafields.information.health | metafield_tag }}\n\n<!-- variant_reference -->\n{{ product.metafields.information.health | metafield_tag }}\n\n<!-- rich_text_field -->\n{{ product.metafields.information.rich_description | metafield_tag }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/metafield_tag)\n\n',
    returns: "string"
  },
  metafield_text: {
    description: "Generates a text version of the metafield data. The following outlines the output for each metafield type:\n\n| Metafield type | Output |\n| --- | --- |\n| `single_line_text_field` | The metafield text. |\n| `multi_line_text_field` | The metafield text. |\n| `page_reference` | The page title. |\n| `product_reference` | The product title. |\n| `collection_reference` | The collection title. |\n| `variant_reference` | The variant title. |\n| `file_reference` | The file URL. |\n| `number_integer` | The number. |\n| `number_decimal` | The number. |\n| `date` | The date. |\n| `date-time` | The date and time. |\n| `url` | The URL. |\n| `json` | The JSON. |\n| `boolean` | The boolean value. |\n| `color` | The color value. |\n| `weight` | The weight value and unit.<br><br>If the value is a decimal with more than two places, then it'll be formatted to have a precision of two with trailing zeros removed. |\n| `volume` | The volume value and unit.<br><br>If the value is a decimal with more than two places, then it'll be formatted to have a precision of two with trailing zeros removed. |\n| `dimension` | The dimension value and unit.<br><br>If the value is a decimal with more than two places, then it'll be formatted to have a precision of two with trailing zeros removed. |\n| `rating` | The rating value. |\n| `list.single_line_text_field` | The metafield values converted to a sentence.<br><br>For example, if you had the values `Toronto`, `Ottawa`, and `Vancouver`, then the output would be:<br><br>`Toronto, Ottawa, and Vancouver` |\n| `money` | The money value, formatted using the store's [**HTML with currency** setting](https://help.shopify.com/manual/payments/currency-formatting). |\n| `rich_text_field` | The rich text value as simple text. |\n\n#### Example\n\n```liquid\n\n{{ product.metafields.information.dosage | metafield_text }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/metafield_text)\n\n",
    returns: "string"
  },
  money: {
    description: "Formats a given price based on the store's [**HTML without currency** setting](https://help.shopify.com/manual/payments/currency-formatting). \n\n\n\n#### Example\n\n```liquid\n\n{{ product.price | money }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/money)\n\n",
    returns: "string"
  },
  money_with_currency: {
    description: "Formats a given price based on the store's [**HTML with currency** setting](https://help.shopify.com/manual/payments/currency-formatting). \n\n\n\n#### Example\n\n```liquid\n\n{{ product.price | money_with_currency }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/money_with_currency)\n\n",
    returns: "string"
  },
  money_without_currency: {
    description: "Formats a given price based on the store's [**HTML without currency** setting](https://help.shopify.com/manual/payments/currency-formatting), without the currency symbol. \n\n\n\n#### Example\n\n```liquid\n\n{{ product.price | money_without_currency }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/money_without_currency)\n\n",
    returns: "string"
  },
  money_without_trailing_zeros: {
    description: "Formats a given price based on the store's [**HTML without currency** setting](https://help.shopify.com/manual/payments/currency-formatting), excluding the decimal separator\n(either `.` or `,`) and trailing zeros.\n\nIf the price has a non-zero decimal value, then the output is the same as the [`money` filter](https://shopify.dev/docs/api/liquid/filters#money). \n\n\n\n#### Example\n\n```liquid\n\n{{ product.price | money_without_trailing_zeros }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/money_without_trailing_zeros)\n\n",
    returns: "string"
  },
  default_pagination: {
    description: "Generates HTML for a set of links for paginated results. Must be applied to the [`paginate` object](https://shopify.dev/docs/api/liquid/objects/paginate). \n\n\n\n#### Example\n\n```liquid\n\n{% paginate collection.products by 2 %}\n  {% for product in collection.products %}\n    {{- product.title }}\n  {% endfor %}\n\n  {{- paginate | default_pagination -}}\n{% endpaginate %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/default_pagination)\n\n",
    scope: "paginate",
    returns: "string"
  },
  login_button: {
    description: "Generates an HTML Button that enables a customer to follow the Shop in the Shop App Configure the storefront for Follow on Shop. [Learn more](https://help.shopify.com/manual/online-store/themes/customizing-themes/follow-on-shop)\n\n\n\n**Note**\n\n> The presence of the [Shop](https://shopify.dev/docs/api/liquid/objects/shop) object\n> is required for validation purposes only.\n\n\n\n**Note**\n\n> The `action` specified is always `'follow'`. If this parameter is not supplied the button will not render.\n\n```liquid\n{{ shop | login_button: action: 'follow' }}\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/login_button)\n\n",
    returns: "string",
    scope: "shop",
    snippet: "login_button: action: 'follow'",
    arguments: [
      {
        type: "parameter",
        requires: ["action"],
        value: {
          action: {
            type: "string",
            value: "follow"
          }
        }
      }
    ]
  },
  camelize: {
    description: "Converts a string to CamelCase. \n\n\n\n#### Example\n\n```liquid\n\n{{ 'variable-name' | camelize }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/camelize)\n\n",
    returns: "string"
  },
  handleize: {
    description: "Converts a string into a [handle](https://shopify.dev/docs/api/liquid/basics#handles). \n\n**Note**\n\n> The `handleize` filter has an alias of `handle`.\n\n#### Example\n\n```liquid\n\n{{ product.title | handleize }}\n{{ product.title | handle }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/handleize)\n\n",
    returns: "string"
  },
  url_escape: {
    description: "Escapes any URL-unsafe characters in a string. \n\n\n\n#### Example\n\n```liquid\n\n{{ '<p>Health & Love potions</p>' | url_escape }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/url_escape)\n\n",
    returns: "string"
  },
  url_param_escape: {
    description: "Escapes any characters in a string that are unsafe for URL parameters. The `url_param_escape` filter escapes the same characters as [`url_escape`](https://shopify.dev/docs/api/liquid/filters/url_escape), with the\naddition of `&`.\n\n#### Example\n\n```liquid\n\n{{ '<p>Health & Love potions</p>' | url_param_escape }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/url_param_escape)\n\n",
    returns: "string"
  },
  highlight_active_tag: {
    description: "Wraps a given tag in an HTML `<span>` tag, with a `class` attribute of `active`, if the tag is currently active. Only\napplies to collection tags. \n\n\n\n#### Example\n\n```liquid\n\n{% for tag in collection.all_tags %}\n  {{- tag | highlight_active_tag | link_to_tag: tag }}\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/highlight_active_tag)\n\n",
    scope: "collection",
    returns: "string"
  },
  link_to_add_tag: {
    description: "Generates an HTML `<a>` tag with an `href` attribute linking to the current blog or collection, filtered to show\nonly articles or products that have a given tag, as well as any currently active tags. \n\n**Tip**\n\n> To learn more about filtering by tag, refer to [Filter articles by tag](https://shopify.dev/themes/architecture/templates/blog#filter-articles-by-tag)\n> or [Filter collections by tag](https://shopify.dev/themes/navigation-search/filtering/tag-filtering).\n\n#### Example\n\n```liquid\n\n{% for tag in collection.all_tags %}\n  {%- if current_tags contains tag -%}\n    {{ tag }}\n  {%- else -%}\n    {{ tag | link_to_add_tag: tag }}\n  {%- endif -%}\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/link_to_add_tag)\n\n",
    snippet: "link_to_add_tag: $1",
    arguments: [
      {
        type: "string",
        required: true
      }
    ],
    returns: "string"
  },
  link_to_remove_tag: {
    description: "Generates an HTML `<a>` tag with an `href` attribute linking to the current blog or collection, filtered to show\nonly articles or products that have any currently active tags, except the provided tag. \n\n**Tip**\n\n> To learn more about filtering by tag, refer to [Filter articles by tag](https://shopify.dev/themes/architecture/templates/blog#filter-articles-by-tag)\n> or [Filter collections by tag](https://shopify.dev/themes/navigation-search/filtering/tag-filtering).\n\n#### Example\n\n```liquid\n\n{% for tag in collection.all_tags %}\n  {%- if current_tags contains tag -%}\n    {{ tag | link_to_remove_tag: tag }}\n  {%- else -%}\n    {{ tag | link_to_add_tag: tag }}\n  {%- endif -%}\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/link_to_remove_tag)\n\n",
    snippet: "link_to_remove_tag: $1",
    arguments: [
      {
        type: "string",
        required: true
      }
    ],
    returns: "string"
  },
  link_to_tag: {
    description: "Generates an HTML `<a>` tag with an `href` attribute linking to the current blog or collection, filtered to show\nonly articles or products that have a given tag. \n\n**Tip**\n\n> To learn more about filtering by tag, refer to [Filter articles by tag](https://shopify.dev/themes/architecture/templates/blog#filter-articles-by-tag)\n> or [Filter collections by tag](https://shopify.dev/themes/navigation-search/filtering/tag-filtering).\n\n#### Example\n\n```liquid\n\n{% for tag in collection.all_tags %}\n  {{- tag | link_to_tag: tag }}\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/link_to_tag)\n\n",
    snippet: "link_to_tag: $1",
    arguments: [
      {
        type: "string",
        required: true
      }
    ],
    returns: "string"
  },
  format_address: {
    description: "Generates an HTML address display, with each address component ordered according to the address's locale. \n\n\n\n#### Example\n\n```liquid\n\n{{ shop.address | format_address }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/format_address)\n\n",
    returns: "string"
  },
  highlight: {
    description: "Wraps all instances of a specific string, within a given string, with an HTML `<strong>` tag with a `class` attribute\nof `highlight`. \n\n\n\n#### Example\n\n```liquid\n\n{% for item in search.results %}\n  {% if item.object_type == 'product' %}\n    {{ item.description | highlight: search.terms }}\n  {% else %}\n    {{ item.content | highlight: search.terms }}\n  {% endif %}\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/highlight)\n\n",
    scope: "search",
    returns: "string",
    snippet: "highlight: ${1:search.terms}",
    arguments: [
      {
        type: "string",
        required: true
      }
    ]
  },
  pluralize: {
    description: "Outputs the singular or plural version of a string based on a given number.\n\n> Caution:\n> The `pluralize` filter applies English pluralization rules to determine which string to output. You shouldn't use this\n> filter on non-English strings because it could lead to incorrect pluralizations.\n\n#### Example\n\n```liquid\n\nCart item count: {{ cart.item_count }} {{ cart.item_count | pluralize: 'item', 'items' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/pluralize)\n\n",
    returns: "string",
    snippet: "pluralize: $1, $2",
    arguments: [
      {
        type: "string",
        required: true
      },
      {
        type: "string",
        required: true
      }
    ]
  },
  article_img_url: {
    description: "\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F\n\nThe `article_img_url` filter has been replaced by [`image_url`](/docs/api/liquid/filters/image_url).\n\n---\n\nReturns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for an [article's image](https://shopify.dev/docs/api/liquid/objects/article#article-image). \n\n\n\n#### Example\n\n```liquid\n\n{{ article.image | article_img_url }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/article_img_url)\n\n",
    returns: "string",
    deprecated: true,
    snippet: "article_img_url"
  },
  asset_img_url: {
    description: "Returns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for an image in the\n[`assets` directory](https://shopify.dev/themes/architecture#assets) of a theme. \n\n\n\n#### Example\n\n```liquid\n\n{{ 'red-and-black-bramble-berries.jpg' | asset_img_url }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/asset_img_url)\n\n",
    arguments: [
      {
        type: "string",
        description: "The original image size",
        pattern: /\b(?:master|x?[1-9]\d{2,3}|[1-9]\d{2,3}x|[1-9]\d{2,3}x[1-9]\d{2,3})\b/,
        value: [
          "master",
          "2000x",
          "1500x",
          "1000x",
          "500x",
          "250x",
          "1500x1500",
          "1000x1000",
          "500x500",
          "250x250"
        ]
      },
      {
        type: "parameter",
        value: {
          crop: {
            type: "string",
            description: "You can specify a crop parameter to make sure that the resulting image's dimensions match the requested dimensions. If the entire image won't fit in your requested dimensions, the crop parameter specifies what part of the image to show",
            pattern: /\b(?:top|center|bottom|right)\b/,
            value: [
              "top",
              "center",
              "bottom",
              "left",
              "right"
            ]
          },
          scale: {
            type: "number",
            description: "The scale parameter lets you specify the pixel density of the image",
            pattern: /\b[23]\b/,
            value: [
              "2",
              "3"
            ]
          },
          format: {
            type: "string",
            description: "The format parameter lets you specify what file format to use for the displayed image.",
            pattern: /\bp?jpg\b/,
            value: [
              {
                value: "jpg"
              },
              {
                value: "pjpg",
                description: "pjpg is progressive JPEG. A browser loads a full-sized progressive JPEG with gradually increasing quality, instead of loading the full-quality image from top to bottom like a traditional JPEG."
              }
            ]
          }
        }
      }
    ],
    returns: "string",
    snippet: "asset_img_url"
  },
  asset_url: {
    description: "Returns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for a file in the\n[`assets` directory](https://shopify.dev/themes/architecture#assets) of a theme. \n\n\n\n#### Example\n\n```liquid\n\n{{ 'cart.js' | asset_url }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/asset_url)\n\n",
    returns: "string"
  },
  collection_img_url: {
    description: "\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F\n\nThe `collection_img_url` filter has been replaced by [`image_url`](/docs/api/liquid/filters/image_url).\n\n---\n\nReturns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for a [collection's image](https://shopify.dev/docs/api/liquid/objects/collection#collection-image). \n\n\n\n#### Example\n\n```liquid\n\n{{ collection.image | collection_img_url }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/collection_img_url)\n\n",
    returns: "string",
    deprecated: true,
    snippet: "collection_img_url"
  },
  file_img_url: {
    description: "Returns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for an image from the\n[Files](https://www.shopify.com/admin/settings/files) page of the Shopify admin. \n\n\n\n#### Example\n\n```liquid\n\n{{ 'potions-header.png' | file_img_url }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/file_img_url)\n\n",
    snippet: "file_img_url",
    returns: "string"
  },
  file_url: {
    description: "Returns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for a file from the\n[Files](https://www.shopify.com/admin/settings/files) page of the Shopify admin. \n\n\n\n#### Example\n\n```liquid\n\n{{ 'disclaimer.pdf' | file_url }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/file_url)\n\n",
    returns: "string",
    snippet: "file_url"
  },
  global_asset_url: {
    description: "Returns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for a global asset. Global assets are kept in a directory on Shopify's server. Using global assets can be faster than loading the resource\ndirectly.\n\nDepending on the resource type, you might need to use an additional filter to load the resource. The following table\noutlines which filter to use for specific resource types.\n\n| Resource type | Additional filter |\n| --- | --- |\n| JavaScript (`.js`) | [`script_tag`](https://shopify.dev/docs/api/liquid/filters/script_tag) |\n| CSS (`.css`) | [`stylesheet_tag`](https://shopify.dev/docs/api/liquid/filters/stylesheet_tag)  |\n\nThe following table outlines the available global assets:\n\n| Category | Assets |\n| --- | --- |\n| Firebug | - `firebug/firebug.css`<br>- `firebug/firebug.html`<br>- `firebug/firebug.js`<br>- `firebug/firebugx.js`<br>- `firebug/errorIcon.png`<br>- `firebug/infoIcon.png`<br>- `firebug/warningIcon.png` |\n| JavaScript libraries | - `controls.js`<br>- `dragdrop.js`<br>- `effects.js`<br>- `ga.js`<br>- `mootools.js` |\n| Lightbox | - `lightbox.css`<br>- `lightbox.js`<br><br>- `lightbox/v1/lightbox.css`<br>- `lightbox/v1/lightbox.js`<br><br>- `lightbox/v2/lightbox.css`<br>- `lightbox/v2/lightbox.js`<br>- `lightbox/v2/close.gif`<br>- `lightbox/v2/loading.gif`<br>- `lightbox/v2/overlay.png`<br>- `lightbox/v2/zoom-lg.gif`<br><br>- `lightbox/v204/lightbox.css`<br>- `lightbox/v204/lightbox.js`<br>- `lightbox/v204/bullet.gif`<br>- `lightbox/v204/close.gif`<br>- `lightbox/v204/closelabel.gif`<br>- `lightbox/v204/donatebutton.gif`<br>- `lightbox/v204/downloadicon.gif`<br>- `lightbox/v204/loading.gif`<br>- `lightbox/v204/nextlabel.png`<br>- `lightbox/v204/prevlabel.gif` |\n| Prototype | - `prototype.js`<br>- `prototype/1.5/prototype.js`<br>- `prototype/1.6/prototype.js` |\n| script.aculo.us | - `scriptaculous/1.8.2/scriptaculous.js`<br>- `scriptaculous/1.8.2/builder.js`<br>- `scriptaculous/1.8.2/controls.js`<br>- `scriptaculous/1.8.2/dragdrop.js`<br>- `scriptaculous/1.8.2/effects.js`<br>- `scriptaculous/1.8.2/slider.js`<br>- `scriptaculous/1.8.2/sound.js`<br>- `scriptaculous/1.8.2/unittest.js` |\n| Shopify | - `list-collection.css`<br>- `textile.css` |\n\n#### Example\n\n```liquid\n\n{{ 'lightbox.js' | global_asset_url | script_tag }}\n\n{{ 'lightbox.css' | global_asset_url | stylesheet_tag }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/global_asset_url)\n\n",
    returns: "string"
  },
  image_url: {
    description: "Returns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for an image. You can use the `image_url` filter on the following objects, as well as their `src` property:\n\n- [`article`](https://shopify.dev/docs/api/liquid/objects/article)\n- [`collection`](https://shopify.dev/docs/api/liquid/objects/collection)\n- [`image`](https://shopify.dev/docs/api/liquid/objects/image)\n- [`line_item`](https://shopify.dev/docs/api/liquid/objects/line_item)\n- [`product`](https://shopify.dev/docs/api/liquid/objects/product)\n- [`variant`](https://shopify.dev/docs/api/liquid/objects/variant)\n- [`country`](https://shopify.dev/docs/api/liquid/objects/country)\n\n> Caution:\n> You need to specify either a [`width`](https://shopify.dev/docs/api/liquid/filters/image_url#image_url-width) or\n> [`height`](https://shopify.dev/docs/api/liquid/filters/image_url#image_url-height) parameter. If neither are specified, then an error is returned.\n\n\n\n**Note**\n\n> Regardless of the specified dimensions, an image can never be resized to be larger than its original dimensions.\n\n#### Example\n\n```liquid\n\n{{ product | image_url: width: 450 }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/image_url)\n\n",
    returns: "string",
    objects: [
      "article",
      "collection",
      "image",
      "line_item",
      "product",
      "variant",
      "country"
    ],
    snippet: "image_url: ${1|width,height}: $2",
    arguments: [
      {
        type: "parameter",
        strict: true,
        requires: /\b(?:width|height)\b/,
        value: {
          width: {
            type: "number",
            description: "Specify the width of the image up to a maximum of `5760px`. If only the width is specified, then the height is automatically calculated based on the image's dimensions.",
            pattern: [0, 5760]
          },
          height: {
            type: "number",
            description: "Specify the height of the image up to a maximum of `5760px`. If only the height is specified, then the width is automatically calculated based on the image's dimensions.",
            pattern: [0, 5760]
          },
          format: {
            type: "string",
            description: "Specify which file format to use for the image. The valid formats are `pjpg` and `jpg`.\n\nIt's not practical to convert a lossy image format, like `jpg`, to a lossless image format, like `png`, so Shopify can do only the following conversions:\n\n- `png` to `jpg`\n- `png` to `pjpg`\n- `jpg` to `pjpg`\n\n> **Note**\n>\n>Shopify automatically detects which image formats are supported by the client (e.g. `WebP`, `AVIF`, etc.) and selects a file format for optimal quality and file size. When a format is specified, Shopify takes into account the features (e.g. progressive, alpha channel) of the specified file format when making the final automatic format selection. To learn more, visit [https://cdn.shopify.com/](https://cdn.shopify.com/).",
            pattern: /\b(?:p?jpg)\b/,
            value: [
              "jpg",
              "pjpg"
            ]
          },
          pad_color: {
            type: "string",
            pattern: /(?:[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/,
            description: "Specify a color to pad the image if the specified dimensions result in an aspect ratio that differs from the original. The color must be in hexadecimal format (`hex3` or `hex6`)."
          },
          crop: {
            type: "string",
            description: "Specify which part of the image to show if the specified dimensions result in an aspect ratio that differs from the original. You can use the following values:\n\n- top\n- center\n- bottom\n- left\n- right\n- region\n\nThe default value is `center`.\n\nWhen using the `region` crop mode, the starting point for the crop is defined by `crop_left` and `crop_top` and extends to the `crop_width` and `crop_height`. Optionally, to resize the region extracted by the crop, use the width and height parameters.",
            value: [
              "top",
              "center",
              "bottom",
              "left",
              "right",
              "region"
            ]
          },
          crop_left: {
            type: "number",
            pattern: [0, 5760],
            when: [
              ["crop", "region"]
            ]
          },
          crop_top: {
            type: "number",
            pattern: [0, 5760],
            when: [
              ["crop", "region"]
            ]
          },
          crop_width: {
            type: "number",
            pattern: [0, 5760],
            when: [
              ["crop", "region"]
            ]
          },
          crop_height: {
            type: "number",
            pattern: [0, 5760],
            when: [
              ["crop", "region"]
            ]
          }
        }
      }
    ]
  },
  img_tag: {
    description: "\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F\n\nThe `img_tag` filter has been replaced by [`image_tag`](/docs/api/liquid/filters/image_tag).\n\n---\n\nGenerates an HTML `<img>` tag for a given image URL. You can also use the `img_tag` filter on the following objects:\n\n- [`article`](https://shopify.dev/docs/api/liquid/objects/article)\n- [`collection`](https://shopify.dev/docs/api/liquid/objects/collection)\n- [`image`](https://shopify.dev/docs/api/liquid/objects/image)\n- [`line_item`](https://shopify.dev/docs/api/liquid/objects/line_item)\n- [`product`](https://shopify.dev/docs/api/liquid/objects/product)\n- [`variant`](https://shopify.dev/docs/api/liquid/objects/variant)\n\n#### Example\n\n```liquid\n\n{{ product | img_tag }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/img_tag)\n\n",
    returns: "string",
    deprecated: true,
    arguments: [
      {
        type: "string"
      },
      {
        type: "string"
      },
      {
        type: "string"
      }
    ]
  },
  img_url: {
    description: "\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F\n\nThe `img_url` filter has been replaced by [`image_url`](/docs/api/liquid/filters/image_url).\n\n---\n\nReturns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for an image. You can use the `img_url` filter on the following objects:\n\n- [`article`](https://shopify.dev/docs/api/liquid/objects/article)\n- [`collection`](https://shopify.dev/docs/api/liquid/objects/collection)\n- [`image`](https://shopify.dev/docs/api/liquid/objects/image)\n- [`line_item`](https://shopify.dev/docs/api/liquid/objects/line_item)\n- [`product`](https://shopify.dev/docs/api/liquid/objects/product)\n- [`variant`](https://shopify.dev/docs/api/liquid/objects/variant)\n\n#### Example\n\n```liquid\n\n{{ product | img_url }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/img_url)\n\n",
    snippet: "img_url: '${2:medium}'",
    returns: "string",
    deprecated: true,
    objects: [
      "article",
      "collection",
      "image",
      "line_item",
      "product",
      "variant",
      "country"
    ]
  },
  link_to: {
    description: "Generates an HTML `<a>` tag. \n\n\n\n#### Example\n\n```liquid\n\n{{ 'Shopify' | link_to: 'https://www.shopify.com' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/link_to)\n\n",
    snippet: "link_to: $1",
    arguments: [
      {
        type: "string",
        required: true,
        description: "The URL to link to."
      },
      {
        type: "parameter",
        strict: false,
        description: "You can specify [HTML attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attributes) by including a parameter that matches the attribute name, and the desired value.\n\n#### Example\n\n```liquid\n\n{{ 'Shopify' | link_to: 'https://www.shopify.com', class: 'link-class' }}\n\n```\n\n",
        value: {
          class: {
            type: "string"
          },
          id: {
            type: "string"
          },
          title: {
            type: "string"
          }
        }
      }
    ],
    returns: "string"
  },
  payment_type_img_url: {
    description: 'Returns the URL for an SVG image of a given [payment type](https://shopify.dev/docs/api/liquid/objects/shop#shop-enabled_payment_types). \n\n\n\n#### Example\n\n```liquid\n\n{% for type in shop.enabled_payment_types %}\n<img src="{{ type | payment_type_img_url }}" />\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/payment_type_img_url)\n\n',
    returns: "string"
  },
  payment_type_svg_tag: {
    description: "Generates an HTML `<svg>` tag for a given [payment type](https://shopify.dev/docs/api/liquid/objects/shop#shop-enabled_payment_types). \n\n\n\n#### Example\n\n```liquid\n\n{% for type in shop.enabled_payment_types -%}\n  {{ type | payment_type_svg_tag }}\n{% endfor %}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/payment_type_svg_tag)\n\n",
    returns: "string"
  },
  placeholder_svg_tag: {
    description: "Generates an HTML `<svg>` tag for a given placeholder name. Accepts the following placeholder names:\n\n- `collection-1`\n- `collection-2`\n- `collection-3`\n- `collection-4`\n- `collection-5`\n- `collection-6`\n- `image`\n- `lifestyle-1`\n- `lifestyle-2`\n- `product-1`\n- `product-2`\n- `product-3`\n- `product-4`\n- `product-5`\n- `product-6`\n\n#### Example\n\n```liquid\n\n{{ 'collection-1' | placeholder_svg_tag }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/placeholder_svg_tag)\n\n",
    returns: "string"
  },
  preload_tag: {
    description: "Generates an HTML `<link>` tag with a `rel` attribute of `preload` to prioritize loading a given Shopify-hosted asset.\nThe asset URL is also added to the [Link header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link)\nwith a `rel` attribute of `preload`. You should use this filter sparingly. For example, consider preloading only resources necessary for rendering\nabove-the-fold content. To learn more about preloading resources, refer to\n[Performance best practices for Shopify themes](https://shopify.dev/themes/best-practices/performance#preload-key-resources-defer-or-avoid-loading-others).\n\n\n\n**Tip**\n\n> If you want to preload a stylesheet, then use [`stylesheet_tag`](https://shopify.dev/docs/api/liquid/filters/stylesheet_tag). If you want to\n> preload an image, then use [`image_tag`](https://shopify.dev/docs/api/liquid/filters/image_tag).\n\nThe input to this filter must be a URL from one of the following filters:\n\n- [`asset_url`](https://shopify.dev/docs/api/liquid/filters/asset_url)\n- [`global_asset_url`](https://shopify.dev/docs/api/liquid/filters/global_asset_url)\n- [`shopify_asset_url`](https://shopify.dev/docs/api/liquid/filters/shopify_asset_url)\n\nThe `preload_tag` filter also requires an [`as` parameter](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#attr-as)\nbased on the kind of resource being preloaded.\n\n#### Example\n\n```liquid\n\n{{ 'cart.js' | asset_url | preload_tag: as: 'script' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/preload_tag)\n\n",
    returns: "string",
    snippet: "preload_tag: as: ${1|audio,document,embed,fetch,font,image,object,script,style,track,video,worker}",
    filters: [
      "asset_url",
      "global_asset_url",
      "shopify_asset_url"
    ],
    arguments: [
      {
        type: "parameter",
        strict: false,
        requires: ["as"],
        value: {
          as: {
            type: "string",
            value: [
              "audio",
              "document",
              "embed",
              "fetch",
              "font",
              "image",
              "object",
              "script",
              "style",
              "track",
              "video",
              "worker"
            ]
          }
        }
      }
    ]
  },
  product_img_url: {
    description: "\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F\n\nThe `product_img_url` filter has been replaced by [`image_url`](/docs/api/liquid/filters/image_url).\n\n---\n\nReturns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for a [product image](https://shopify.dev/docs/api/liquid/objects/product). This can be the product's `featured_image` or any image from the `images` array.\n\n#### Example\n\n```liquid\n\n{{ product.featured_image | product_img_url }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/product_img_url)\n\n",
    returns: "string",
    deprecated: true,
    snippet: "product_img_url"
  },
  script_tag: {
    description: "Generates an HTML `<script>` tag for a given resource URL. The tag has a `type` attribute of `text/javascript`. \n\n\n\n#### Example\n\n```liquid\n\n{{ 'cart.js' | asset_url | script_tag }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/script_tag)\n\n",
    returns: "string"
  },
  shopify_asset_url: {
    description: "Returns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for a globally accessible Shopify asset. The following are the globally accessible Shopify assets:\n\n- `option_selection.js`\n- `api.jquery.js`\n- `shopify_common.js`\n- `customer_area.js`\n- `currencies.js`\n- `customer.css`\n\n#### Example\n\n```liquid\n\n{{ 'option_selection.js' | shopify_asset_url }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/shopify_asset_url)\n\n",
    returns: "string"
  },
  stylesheet_tag: {
    description: "Generates an HTML `<link>` tag for a given resource URL. The tag has the following parameters:\n\n| Attribute | Value |\n| --- | --- |\n| `rel` | `stylesheet` |\n| `type` | `text/css` |\n| `media` | `all` | \n\n\n\n#### Example\n\n```liquid\n\n{{ 'base.css' | asset_url | stylesheet_tag }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/stylesheet_tag)\n\n",
    returns: "string",
    snippet: "stylesheet_tag",
    arguments: [
      {
        type: "parameter",
        value: {
          preload: {
            type: "boolean",
            description: "Specify whether the stylesheet should be preloaded. When preload is set to true, a resource hint is sent as a Link header with a rel value of [preload](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preload).\n\nThis option doesn't affect the HTML link tag directly. You should use the preload parameter sparingly. For example, consider preloading only render-blocking stylesheets that are needed for initial functionality of the page, such as above-the-fold content. To learn more about resource hints in Shopify themes, refer to [Performance best practices for Shopify themes](https://shopify.dev/themes/best-practices/performance#preload-key-resources-defer-or-avoid-loading-others)."
          }
        }
      }
    ]
  },
  weight_with_unit: {
    description: "Generates a formatted weight for a [`variant` object](https://shopify.dev/docs/api/liquid/objects/variant#variant-weight). The weight unit is\nset in the [general settings](https://www.shopify.com/admin/settings/general) in the Shopify admin. \n\n\n\n#### Example\n\n```liquid\n\n{%- assign variant = product.variants.first -%}\n\n{{ variant.weight | weight_with_unit }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/weight_with_unit)\n\n",
    arguments: [
      {
        type: "string",
        required: false,
        description: "The weight unit to use in place of the default weight unit."
      }
    ],
    returns: "string"
  }
};

// src/liquid/data/shopify/export.ts
var tags2 = assign({}, Tags, tags);

// src/liquid/data/jekyll/export.ts
var export_exports3 = {};
__export(export_exports3, {
  filters: () => filters3,
  objects: () => objects2,
  tags: () => tags3
});

// src/liquid/data/jekyll/filters.ts
var FILTERS = {
  relative_url: {
    description: "Prepend the baseurl value to the input. Useful if your site is hosted at a subpath rather than the root of the domain.",
    reference: {
      name: "Jekyll Liquid",
      url: "https://jekyllrb.com/docs/liquid/filters/"
    }
  },
  absolute_url: {
    description: "Prepend the url and baseurl value to the input.",
    reference: {
      name: "Jekyll Liquid",
      url: "https://jekyllrb.com/docs/liquid/filters/"
    }
  },
  date_to_xmlschema: {
    description: "Convert a Date into XML Schema (ISO 8601) format.",
    reference: {
      name: "Jekyll Liquid",
      url: "https://jekyllrb.com/docs/liquid/filters/"
    }
  },
  date_to_rfc822: {
    description: "Convert a Date into the RFC-822 format used for RSS feeds.",
    reference: {
      name: "Jekyll Liquid",
      url: "https://jekyllrb.com/docs/liquid/filters/"
    }
  },
  date_to_string: {
    description: "Convert a date to short format.",
    reference: {
      name: "Jekyll Liquid",
      url: "https://jekyllrb.com/docs/liquid/filters/"
    }
  }
};

// src/liquid/data/jekyll/tags.ts
var TAGS = {
  post_url: {
    type: "output",
    description: "Link to a post on your site, the post_url tag will generate the correct permalink URL for the post you specify",
    singleton: true,
    reference: {
      name: "Jekyll Liquid",
      url: "https://jekyllrb.com/docs/liquid/tags/#linking-to-posts"
    }
  },
  include: {
    type: "import",
    description: "The include tag allows you to include the content from another file stored in the _includes folder",
    singleton: true,
    reference: {
      name: "Jekyll Liquid",
      url: "https://jekyllrb.com/docs/includes"
    }
  },
  include_relative: {
    type: "import",
    description: "Include file fragments relative to the current file by using the include_relative tag",
    singleton: true,
    reference: {
      name: "Jekyll Liquid",
      url: "https://jekyllrb.com/docs/includes/#including-files-relative-to-another-file"
    }
  },
  link: {
    type: "output",
    filters: true
  },
  highlight: {
    type: "raw",
    description: "Render a code block with syntax highlighting.",
    snippet: "highlight ${1}",
    filters: false,
    reference: {
      name: "Jekyll Liquid",
      url: "https://jekyllrb.com/docs/liquid/tags/#code-snippet-highlighting"
    }
  }
};

// src/liquid/data/jekyll/objects.ts
var objects2 = {
  site: {
    type: "object",
    description: "Site wide information + configuration settings from _config.yml. See below for details.",
    properties: {
      pages: {
        description: "A list of all Pages.",
        type: "array"
      },
      posts: {
        description: "A reverse chronological list of all Posts.",
        type: "array"
      },
      related_posts: {
        type: "array",
        description: "If the page being processed is a Post, this contains a list of up to ten related Posts. By default, these are the ten most recent posts. For high quality but slow to compute results, run the jekyll command with the --lsi (latent semantic indexing) option. "
      },
      time: {
        description: "The current time (when you run the jekyll command).",
        type: "string"
      }
    },
    reference: {
      name: "Jekyll Liquid",
      url: "https://jekyllrb.com/docs/variables/#site-variables"
    }
  }
};

// src/liquid/data/jekyll/export.ts
var filters3 = Object.assign(/* @__PURE__ */ Object.create(null), FILTERS, filters);
var tags3 = Object.assign(/* @__PURE__ */ Object.create(null), TAGS, tags);

// scripts/shopify-specs.ts
var cwd = process.cwd();
var PREFIX = `${import_ansis.default.gray("[")}SPECS${import_ansis.default.gray("]")} ${import_ansis.default.magenta("RUN")}`;
var { log } = console;
generate();
function generate() {
  log(`${PREFIX} ${import_ansis.default.magenta.bold("Building Shopify Specifications")}`);
  objects3();
  filters4();
  log(`${PREFIX} ${import_ansis.default.magenta.bold("Finished Shopify Specifications")}`);
}
function lastUpdate() {
  const date = /* @__PURE__ */ new Date();
  const Y = date.getFullYear();
  const M = date.getMonth();
  const D = date.getDay();
  const month = (i) => ({
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December"
  })[i];
  const day = (i) => {
    const a = i % 10;
    const b = i % 100;
    return i + (a === 1 && b !== 11 ? "st" : a === 2 && b !== 12 ? "nd" : a === 3 && b !== 13 ? "rd" : "th");
  };
  return `${day(D)} ${month(M)} ${Y}`;
}
function createTSFile(type, name, src) {
  return `import { ${type} } from '../..'

export const ${name}: ${type} = ${src}`;
}
function unescape(string) {
  string = string.replace(/&lt;/g, "<");
  string = string.replace(/&gt;/g, ">");
  string = string.replace(/&quot;/g, '"');
  string = string.replace(/&#39;/g, "'");
  string = string.replace(/&amp;/g, "&");
  return string;
}
function documentation(type, ref, path) {
  const string = [];
  const { name, summary = null, description = null, examples, deprecated, deprecation_reason } = ref;
  if (deprecated === true) {
    string.push("\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F");
    if (deprecation_reason !== "") {
      string.push(unescape(deprecation_reason), "---");
    } else {
      string.push("No deprecation reason has been provided by the Shopify team \u{1F921}.", "---");
    }
  }
  if (description !== "" && summary !== null) {
    let text = unescape(description).replace(/>\s(Tip|Note):/g, "\n\n**$1**\n").replace(/\(\/(docs\/api.*(?=\)))/g, "(https://shopify.dev/$1").replace(/\]\(\/(.*)(?=\))/g, "](https://shopify.dev/$1");
    let summ = unescape(summary).replace(/\(\/(docs\/api.*(?=\)))/g, "(https://shopify.dev/$1").replace(/\]\(\/(.*)(?=\))/g, "](https://shopify.dev/$1");
    if (text.trimStart()[0] === ">") {
      string.push(unescape(summ), text);
    } else {
      string.push(unescape(summ) + " " + text);
    }
  } else {
    let text = "";
    if (description !== "") {
      text = unescape(description).replace(/>\s(Tip|Note):/g, "\n\n**$1**\n").replace(/\(\/(docs\/api.*(?=\)))/g, "(https://shopify.dev/$1").replace(/\]\(\/(.*)(?=\))/g, "](https://shopify.dev/$1");
    }
    if (summary.length > 0) {
      let summ = unescape(summary).replace(/\(\/(docs\/api.*(?=\)))/g, "(https://shopify.dev/$1").replace(/\]\(\/(.*)(?=\))/g, "](https://shopify.dev/$1");
      if (text.trimStart()[0] === ">") {
        string.push(unescape(summ), text);
      } else {
        string.push(unescape(summ) + " " + text);
      }
    }
    string.push(text);
  }
  if (examples.length > 0) {
    const [example] = examples;
    if (example.name === "") {
      string.push("#### Example");
    } else {
      string.push(`#### ${example.name}`);
    }
    if (example.description !== "") {
      string.push(unescape(example.description));
    }
    if (example.raw_liquid !== "") {
      string.push(
        "```liquid",
        unescape(example.raw_liquid),
        "```"
      );
    }
  }
  string.push("---");
  if (path) {
    string.push(`[Shopify Liquid](https://shopify.dev/docs/api/liquid/${type}/${path}#${name})
`);
  } else {
    string.push(`[Shopify Liquid](https://shopify.dev/docs/api/liquid/${type}/${name})
`);
  }
  string.push(`Last Updated: ${lastUpdate()}`, "\n");
  return string.join("\n\n");
}
function filters4() {
  log(`${PREFIX} ${import_ansis.default.magenta("Shopify Filters")}`);
  const path = (0, import_path.join)(cwd, "node_modules/.specs/data", "filters.json");
  const read = import_fs.default.readFileSync(path).toString();
  const data = JSON.parse(read);
  const spec = {};
  const curr = export_exports2.filters;
  for (const item of data) {
    if (item.name in curr)
      continue;
    spec[item.name] = {};
    spec[item.name].description = documentation("filters", item);
    if (item.return_type[0].type === "string") {
      spec[item.name].returns = "string";
    } else if (item.return_type[0].type === "number") {
      spec[item.name].returns = "number";
    } else if (item.return_type[0].type === "boolean") {
      spec[item.name].returns = "boolean";
    } else if (item.return_type[0].type === "array") {
      spec[item.name].returns = "array";
    } else if (item.return_type[0].type === "boolean") {
      spec[item.name].returns = "boolean";
    } else if (item.return_type[0].type === "object") {
      spec[item.name].returns = "object";
    } else {
      spec[item.name].returns = "any";
    }
    if (item.deprecated === true)
      spec[item.name].deprecated = item.deprecated;
    if (item.parameters.length === 0) {
      const snippet = [];
      const args = [];
      const syntax = item.syntax.split(" ");
      if (syntax[2][syntax[2].length - 1] === ":") {
        snippet.push(syntax[2]);
        let number = 0;
        for (const entry of syntax.slice(3)) {
          number = number + 1;
          let type;
          if (entry.slice(0, -1) === "string") {
            type = "string";
          } else if (entry.slice(0, -1) === "number") {
            type = "number";
          } else if (entry.slice(0, -1) === "boolean") {
            type = "boolean";
          } else if (entry.slice(0, -1) === "array") {
            type = "array";
          } else if (entry.slice(0, -1) === "boolean") {
            type = "boolean";
          } else if (entry.slice(0, -1) === "object") {
            type = "object";
          } else {
            type = "any";
          }
          if (entry[entry.length - 1] === ",") {
            if (type === "string") {
              snippet.push("'$" + number + "',");
            } else {
              snippet.push("$" + number + ",");
            }
            args.push({
              type,
              required: true
            });
          } else {
            if (type === "string") {
              snippet.push("'$" + number + "'");
            } else {
              snippet.push("$" + number + ",");
            }
            args.push({
              type,
              required: true
            });
          }
        }
        spec[item.name].snippet = snippet.join(" ");
        spec[item.name].arguments = args;
      }
    } else {
      const syntax = item.syntax.split(" ");
      const snippet = [];
      const args = [];
      snippet.push(syntax[2]);
      syntax.splice(0, 3);
      for (let i = 0; i < item.parameters.length; i++) {
        const param = item.parameters[i];
        if (syntax.length > 0 && syntax[0][syntax[0].length - 1] === ",") {
          if ("arguments" in spec[item.name] && spec[item.name].arguments.length < 0) {
            for (let number = 0; number < syntax.length; number++) {
              let type;
              if (param.types[0] === "string") {
                type = "string";
              } else if (param.types[0] === "number") {
                type = "number";
              } else if (param.types[0] === "boolean") {
                type = "boolean";
              } else if (param.types[0] === "array") {
                type = "array";
              } else if (param.types[0] === "boolean") {
                type = "boolean";
              } else if (param.types[0] === "object") {
                type = "object";
              } else {
                type = "any";
              }
              const arg = syntax[number];
              const entry = { type };
              if (param.required === true)
                entry.required = true;
              if (param.description !== "") {
                entry.description = unescape(param.description).replace(/\]\(\/(.*)(?=\))/g, "](https://shopify.dev/$1");
              }
              args.push(entry);
              if (arg[arg.length - 1] === ",") {
                if (type === "string") {
                  snippet.push("'$" + (number + 1) + "',");
                } else {
                  snippet.push("$" + (number + 1) + ",");
                }
              } else {
                if (type === "string") {
                  snippet.push("'$" + (number + 1) + "'");
                } else {
                  snippet.push("$" + (number + 1));
                }
              }
            }
          }
        } else {
          if (Array.isArray(spec[item.name].arguments)) {
            if (args.length === 0)
              args.push({ type: "parameter", value: {} });
            if (args[args.length - 1].type !== "parameter")
              args.push({ type: "parameter", value: {} });
            if (param.required)
              snippet.push(`${param.name}:`, "${" + (i + 1) + "}");
            let type;
            if (param.types[0] === "string") {
              type = "string";
            } else if (param.types[0] === "number") {
              type = "number";
            } else if (param.types[0] === "boolean") {
              type = "boolean";
            } else if (param.types[0] === "array") {
              type = "array";
            } else if (param.types[0] === "boolean") {
              type = "boolean";
            } else if (param.types[0] === "object") {
              type = "object";
            } else {
              type = "any";
            }
            args[args.length - 1].value[param.name] = { type, required: param.required };
            if (param.description !== "") {
              args[args.length - 1].value[param.name].description = unescape(param.description).replace(/\]\(\/(.*)(?=\))/g, "](https://shopify.dev/$1");
            }
          }
        }
      }
      if (snippet.length > 0) {
        if (snippet.length === 1 && snippet[0][snippet[0].length - 1] === ":")
          snippet[0] = snippet[0].slice(0, -1);
        spec[item.name].snippet = snippet.join(" ");
      }
      if (args.length > 0)
        spec[item.name].arguments = args;
    }
  }
  const count = Object.keys(spec);
  if (count.length > 0) {
    log(PREFIX + import_ansis.default.bold.redBright("NEW FILTERS AVAILABLE"));
    Object.keys(spec).forEach((name) => {
      log(PREFIX + import_ansis.default.white(name));
    });
  }
}
function objects3() {
  log(`${PREFIX} ${import_ansis.default.magenta("Shopify Objects")}`);
  const types = (returns, data2) => {
    const refs = {
      scope: null,
      items: null,
      type: "any",
      literal: null
    };
    const type = returns[0].type;
    const value = returns[0].array_value;
    if (type === "string" || type === "boolean" || type === "number") {
      refs.type = type;
    } else if (type === "array") {
      refs.type = type;
      if (value === "string" || value === "boolean" || value === "number") {
        refs.items = value;
      } else {
        refs.scope = value;
      }
    } else if (type !== "" && data2.some((v) => v.name === type)) {
      refs.type = "object";
      refs.scope = type;
    }
    for (const { name } of returns) {
      if (name !== "") {
        if (refs.literal === null)
          refs.literal = [];
        refs.literal.push(name);
      }
    }
    return refs;
  };
  const path = (0, import_path.join)(cwd, "node_modules/.specs/data", "objects.json");
  const read = import_fs.default.readFileSync(path).toString();
  const data = JSON.parse(read);
  const spec = {};
  for (const item of data) {
    spec[item.name] = { summary: item.summary };
    if (item.access.global === true)
      spec[item.name].global = item.access.global;
    if (item.deprecated === true)
      spec[item.name].deprecated = item.deprecated;
    if (item.access.template.length > 0)
      spec[item.name].template = item.access.template;
    spec[item.name].description = documentation("objects", item);
    if (item.return_type.length > 0) {
      const { type, scope, literal } = types(item.return_type, data);
      if (literal !== null)
        spec[item.name].literal = literal;
      if (scope !== null) {
        spec[item.name].type = type;
        spec[item.name].scope = scope;
      } else {
        spec[item.name].type = type;
      }
    }
    if (item.properties.length > 0) {
      spec[item.name].type = "object";
      if (!(typeof spec[item.name].properties === "object"))
        spec[item.name].properties = {};
      for (const prop of item.properties) {
        spec[item.name].properties[prop.name] = { type: 22 /* unknown */ };
        spec[item.name].properties[prop.name].description = documentation("objects", prop, item.name);
        if (item.deprecated === true)
          spec[item.name].properties[prop.name].deprecated = item.deprecated;
        if (prop.return_type.length > 0) {
          const { type, scope, literal } = types(prop.return_type, data);
          if (literal !== null)
            spec[item.name].properties[prop.name].literal = literal;
          if (scope !== null) {
            spec[item.name].properties[prop.name].type = type;
            spec[item.name].properties[prop.name].scope = scope;
          } else {
            spec[item.name].properties[prop.name].type = type;
          }
        }
      }
    } else {
      if (spec[item.name].type !== "array")
        spec[item.name].const = true;
    }
  }
  const parse = JSON.stringify(spec, null, 2);
  log(PREFIX + import_ansis.default.cyan(` Writing objects JSON: ${import_ansis.default.whiteBright("data/liquid/shopify/objects.json")} `));
  import_fs.default.writeFileSync((0, import_path.join)(cwd, "data/liquid/shopify/objects.json"), parse);
  log(PREFIX + import_ansis.default.cyan(` Writing objects DATA: ${import_ansis.default.whiteBright("src/liquid/data/shopify/objects.ts")} `));
  import_fs.default.writeFileSync((0, import_path.join)(cwd, "src/liquid/data/shopify/objects.ts"), createTSFile("Objects", "objects", parse));
}
