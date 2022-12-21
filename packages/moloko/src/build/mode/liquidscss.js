var oop = require("../lib/oop");
var ScssMode = require("./scss").Mode;
var LiquidMode = require("./liquid").Mode;
var LiquidscssHighlightRules = require("./liquidscss_highlight_rules").LiquidscssHighlightRules;

var Mode = function () {

  ScssMode.call(this);

  this.HighlightRules = LiquidscssHighlightRules;
  this.createModeDelegates({ "liquid-": LiquidMode });

};

oop.inherits(Mode, ScssMode);

(function() { this.$id = "ace/mode/liquidscss"; }).call(Mode.prototype);

exports.Mode = Mode;


