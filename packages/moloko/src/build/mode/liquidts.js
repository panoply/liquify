
var oop = require("../lib/oop");
var TypescriptMode = require("./typescript").Mode;
var LiquidMode = require("./liquid").Mode;
var LiquidtsHighlightRules = require("./liquidts_highlight_rules").LiquidtsHighlightRules;

var Mode = function () {

  TypescriptMode.call(this);

  this.HighlightRules = LiquidtsHighlightRules;
  this.createModeDelegates({ "liquid-": LiquidMode });

};

oop.inherits(Mode, CssMode);

(function() { this.$id = "ace/mode/liquidts"; }).call(Mode.prototype);

exports.Mode = Mode;


