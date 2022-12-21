var oop = require("../lib/oop");
var CssMode = require("./css").Mode;
var LiquidMode = require("./liquid").Mode;
var LiquidcssHighlightRules = require("./liquidcss_highlight_rules").LiquidcssHighlightRules;

var Mode = function () {

  CssMode.call(this);

  this.HighlightRules = LiquidcssHighlightRules;
  this.createModeDelegates({ "liquid-": LiquidMode });

};

oop.inherits(Mode, CssMode);

(function() { this.$id = "ace/mode/liquidcss"; }).call(Mode.prototype);

exports.Mode = Mode;


