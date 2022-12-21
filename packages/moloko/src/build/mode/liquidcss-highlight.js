var oop = require("../lib/oop");
var LiquidHighlightRules = require("./liquid_highlight_rules").LiquidHighlightRules;
var CssHighlightRules = require("./css_highlight_rules").CssHighlightRules;

var LiquidcssHighlightRules = function () {

  CssHighlightRules.call(this);

  var startRules = [
    {
      token: "keyword",
      regex: /{{/,
      next: "liquid-start"
    },
    {
      token: "keyword",
      regex: /{%/,
      next: "liquid-start"
    }
  ];

  var endRules = [
    {
      token: "keyword",
      regex: /}}/,
      next: "pop"
    },
    {
      token: "keyword",
      regex: /%}/,
      next: "pop"
    }
  ];

  this.embedRules(LiquidHighlightRules, "liquid-", endRules, ["start"]);

  for (var key in this.$rules) this.$rules[key].unshift.apply(this.$rules[key], startRules);

  this.normalizeRules();

}

oop.inherits(LiquidcssHighlightRules, CssHighlightRules);

exports.LiquidcssHighlightRules = LiquidcssHighlightRules;

