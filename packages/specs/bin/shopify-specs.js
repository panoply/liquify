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
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
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
var cwd = process.cwd();
var { log } = console;
log("\x1B[H\x1B[2J");
generate();
function output(type, name, src) {
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
function generate() {
  log(import_ansis.default.greenBright("Shopify Specifications"));
  objects();
}
function objects() {
  log(import_ansis.default.cyanBright("Shopify Objects"));
  const docs = ({
    name,
    summary = null,
    description = null,
    examples,
    deprecated,
    deprecation_reason
  }, path2) => {
    const string = [];
    if (deprecated === true) {
      string.push("\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F");
      if (deprecation_reason !== "") {
        string.push(
          unescape(deprecation_reason),
          "---"
        );
      } else {
        string.push(
          "No deprecation reason has been provided by the Shopify team \u{1F921}.",
          "---"
        );
      }
    }
    if (description !== "" && summary !== null) {
      let text = unescape(description).replace(/>\s(Tip|Note):/g, "\n\n**$1**\n").replace(/\(\/(docs\/api.*(?=\)))/g, "(https://shopify.dev/$1");
      if (text.trimStart()[0] === ">") {
        string.push(summary, text);
      } else {
        string.push(summary + " " + text);
      }
    } else {
      string.push(summary);
    }
    if (examples.length > 0) {
      const [example] = examples;
      if (example.name !== "") {
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
    if (path2) {
      string.push(`[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/${path2}#${name})

`);
    } else {
      string.push(`[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/${name})

`);
    }
    return string.join("\n\n");
  };
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
    log(import_ansis.default.blue(`- ${item.name}`));
    spec[item.name] = { summary: item.summary };
    if (item.access.global === true)
      spec[item.name].global = item.access.global;
    if (item.deprecated === true)
      spec[item.name].deprecated = item.deprecated;
    if (item.access.template.length > 0)
      spec[item.name].template = item.access.template;
    spec[item.name].description = docs(item);
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
        log(import_ansis.default.gray(`  - ${prop.name}`));
        spec[item.name].properties[prop.name] = { type: 22 /* unknown */ };
        spec[item.name].properties[prop.name].description = docs(prop, item.name);
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
  log(import_ansis.default.greenBright(`Writing objects JSON: ${import_ansis.default.whiteBright("data/liquid/shopify/objects.json")} `));
  import_fs.default.writeFileSync((0, import_path.join)(cwd, "data/liquid/shopify/objects.json"), parse);
  log(import_ansis.default.greenBright(`Writing objects DATA: ${import_ansis.default.whiteBright("src/liquid/data/shopify/objects.ts")} `));
  import_fs.default.writeFileSync((0, import_path.join)(cwd, "src/liquid/data/shopify/objects.ts"), output("Objects", "objects", parse));
}
