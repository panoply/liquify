var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var HtmlMode = require("./html").Mode;
var JavascriptMode = require("./javascript").Mode;
var TypescriptMode = require("./typescript").Mode;
var JsonMode = require("./json").Mode;
var CssMode = require("./css").Mode;
var LiquidHighlightRules = require("./liquid_highlight_rules").LiquidHighlightRules;

/* -------------------------------------------- */
/* FOLDS                                        */
/* -------------------------------------------- */

var FoldMode = require("./folding/cstyle").FoldMode;

/* -------------------------------------------- */
/* MODE                                         */
/* -------------------------------------------- */

var Mode = function () {

  JsonMode.call(this);
  HtmlMode.call(this);
  CssMode.call(this);
  JavascriptMode.call(this);
  TypescriptMode.call(this);

  this.HighlightRules = LiquidHighlightRules;
  this.foldingRules = new FoldMode();

};

oop.inherits(Mode, TextMode);

(function () { this.$id = "ace/mode/liquid"; }.call(Mode.prototype));

exports.Mode = Mode;


