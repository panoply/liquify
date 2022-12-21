"use strict";

var oop = require("../lib/oop");

var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
var CssHighlightRules = require("./css_highlight_rules").CssHighlightRules;
var HtmlHighlightRules = require("./html_highlight_rules").HtmlHighlightRules;
var JsonHighlightRules = require("./json_highlight_rules").JsonHighlightRules;
var JavaScriptHighlightRules =  require("./javascript_highlight_rules").JavaScriptHighlightRules;

var LiquidHighlightRules = function () {

  HtmlHighlightRules.call(this);

  /**
   * Embedded Matches
   *
   * Handles `onMatch` tokens and correct parses the
   * inner contents of the tag.
   */
  function onMatchEmbedded(name) {

    const length = name.length;

    return function (value) {

      const idx = value.indexOf(name);

      const x = [
        {
          type: "meta.tag.punctuation.tag-open.liquid",
          value: "{%",
        },
        {
          type: "text",
          value: value.slice(2, idx),
        },
        {
          type: "keyword.tag" + name + ".tag-name.liquid",
          value: value.slice(idx, idx + length),
        },
        {
          type: "text",
          value: value.slice(idx + length, value.indexOf("%}")),
        },
        {
          type: "meta.tag.punctuation.tag-close.liquid",
          value: "%}",
        },
      ];

      return x;
    };
  }


  function onPrettifyInlineControl(ender) {
    return [
      {
        token: "prettify.inline-control.liquid",
        regex: /@prettify(?:-ignore(?:-(?:start|end|next-line))?)?/
      },
      ender,
      { defaultToken: "comment", caseInsensitive: false }
    ]
  }


  for (var rule in this.$rules) {

    this.$rules[rule].unshift(
      {
        token: "comment.block.liquid",
        regex: /{%-?\s*comment\s*-?%}/,
        next: onPrettifyInlineControl({
          token: "comment.block.liquid",
          regex: /{%-?\s*endcomment\s*-?%}/,
          next: "pop",
        })
      },
      {
        token: "comment.line.liquid",
        regex: /{%-?\s*#/,
        next: onPrettifyInlineControl({
          token: "comment.block.liquid",
          regex: /-?%}/,
          next: "pop",
        })
      },
      {
        token: 'style.embedded.start.liquid',
        regex: /({%-?\s*\bstyle\b\s*-?%})/,
        next: "style-start",
        onMatch: onMatchEmbedded("style"),
      },
      {
        regex: /({%-?\s*\bstylesheet\b\s*-?%})/,
        next: "stylesheet-start",
        onMatch: onMatchEmbedded("stylesheet"),
      },
      {
        regex: /({%-?\s*\bschema\b\s*-?%})/,
        next: "schema-start",
        onMatch: onMatchEmbedded("schema"),
      },
      {
        regex: /({%-?\s*\bjavascript\b\s*-?%})/,
        next: "javascript-start",
        onMatch: onMatchEmbedded("javascript"),
      },
      {
        token: "meta.tag.punctuation.tag-open.liquid",
        regex: /({%)/,
        push: "liquid-start",
      },
      {
        token: "meta.tag.punctuation.ouput-open.liquid",
        regex: /({{)/,
        push: "liquid-start",
      }
    );
  }

  /* -------------------------------------------- */
  /* EMBEDDED REGIONS                             */
  /* -------------------------------------------- */

  this.embedRules(JsonHighlightRules, "schema-", [
    {
      token: "schema-start",
      next: "pop",
      regex: /({%-?\s*\bendschema\b\s*-?%})/,
      onMatch: onMatchEmbedded("endschema"),
    },
  ]);

  this.embedRules(JavaScriptHighlightRules, "javascript-", [
    {
      token: "javascript-start",
      next: "pop",
      regex: /({%-?\s*\bendjavascript\b\s*-?%})/,
      onMatch: onMatchEmbedded("endjavascript"),
    },
  ]);



  this.embedRules(CssHighlightRules, "style-", [
    {
      token: "style-start",
      next: "pop",
      regex: /({%-?\s*\bendstyle\b\s*-?%})/,
      onMatch: onMatchEmbedded("endstyle"),
    },
  ]);

  this.embedRules(CssHighlightRules, "stylesheet-", [
    {
      token: "stylesheet-start",
      next: "pop",
      regex: /({%-?\s*\bendstylesheet\b\s*-?%})/,
      onMatch: onMatchEmbedded("endstylesheet"),
    },
  ]);

  /* -------------------------------------------- */
  /* LIQUID GRAMMARS                              */
  /* -------------------------------------------- */

  this.addRules({
    "liquid-start": [
      {
        token: "punctuation.close.output.liquid",
        regex: /}}/,
        next: "pop",
      },
      {
        token: "punctuation.close.tag.liquid",
        regex: /%}/,
        next: "pop",
      },
      {
        token: "string.liquid",
        regex: /['](?:(?:\\.)|(?:[^'\\]))*?[']/,
      },
      {
        token: "string.liquid",
        regex: /["](?:(?:\\.)|(?:[^'\\]))*?["]/,
      },
      {
        token: "constant.numeric.liquid",
        regex: /0[xX][0-9a-fA-F]+\b/,
      },
      {
        token: "constant.numeric.liquid",
        regex: /[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/,
      },
      {
        token: "keyword.operator.liquid",
        regex: /\||\*|\-|\+|=|!=|\?\|\:/,
      },
      {
        token: "constant.language.boolean.liquid",
        regex: /(?:true|false|nil|empty)\b/,
      },
      {
        token: "keyword.operator.liquid",
        regex: /(?:and|contains|in|with)\b/,
      },
      {
        token: "keyword.block.liquid",
        regex: /(?<={%-?)\s*[a-zA-Z_$][a-zA-Z0-9_$]+\b/,
      },
      {
        token: "support.function.liquid",
        regex: /(?<=\|)\s*([a-zA-Z_]*\b)/,

      },
      {
        token: "support.function.liquid",
        regex: /(?<=[a-zA-Z_]\b:\s?)\s*([a-zA-Z_]+\b)(?=:)/,
      },
      {
        token: "keyword.operator.liquid",
        regex:
          /(?<=[a-zA-Z_]\b)(:)\s*(?=[a-zA-Z_])/,
      },
      {
        token: [
          "support.class.liquid",
          "keyword.operator.liquid",
          "support.object.liquid",
          "keyword.operator.liquid",
          "variable.parameter.liquid"
        ],
        regex: /(\s*\w+)(\.)(\w+)(\.)?(\w+)?/,
      },
      {
        token: "variable.parameter.liquid",
        regex: /\.([a-zA-Z_$][a-zA-Z0-9_$]*\b)$/,
      },
      {
        token: "support.class.liquid",
        regex: /(?:additional_checkout_buttons|content_for_additional_checkout_buttons)\b/,
      },
      {
        token: "paren.lparen.liquid",
        regex: /[\[\({]/,
      },
      {
        token: "paren.rparen.liquid",
        regex: /[\])}]/,
      },
      {
        token: "text.liquid",
        regex: /\s+/,
      },
    ],
  });

  this.normalizeRules();

}

oop.inherits(LiquidHighlightRules, TextHighlightRules);

exports.LiquidHighlightRules = LiquidHighlightRules;
