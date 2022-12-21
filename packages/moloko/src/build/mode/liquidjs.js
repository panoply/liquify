var oop = require("../lib/oop");
var JavascriptMode = require("./javascript").Mode;
var LiquidMode = require("./liquid").Mode;
var LiquidjsHighlightRules = require("./liquidjs_highlight_rules").LiquidjsHighlightRules;

var Mode = function () {

  JavascriptMode.call(this);

  this.HighlightRules = LiquidjsHighlightRules;
  this.createModeDelegates({ "liquid-": LiquidMode });

};

oop.inherits(Mode, CssMode);

(function() { this.$id = "ace/mode/liquidjs"; }).call(Mode.prototype);

exports.Mode = Mode;

