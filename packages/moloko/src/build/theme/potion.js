exports.isDark = true;
exports.cssClass = "ace-potion";
exports.cssText = require("./potion.css");

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass, false);
