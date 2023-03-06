"use strict";var e=require("process"),t=require("os"),r=require("tty"),n=require("cli-highlight");function o(e){return e&&e.__esModule?e:{default:e}}var i=o(e),l=o(t),s=o(r),a=Object.defineProperty,c=Object.defineProperties,u=Object.getOwnPropertyDescriptors,g=Object.getOwnPropertySymbols,h=Object.prototype.hasOwnProperty,b=Object.prototype.propertyIsEnumerable,f=(e,t,r)=>t in e?a(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,p=(e,t)=>{for(var r in t||(t={}))h.call(t,r)&&f(e,r,t[r]);if(g)for(var r of g(t))b.call(t,r)&&f(e,r,t[r]);return e},m=10,d=(e=0)=>t=>`[${t+e}m`,O=(e=0)=>t=>`[${38+e};5;${t}m`,v=(e=0)=>(t,r,n)=>`[${38+e};2;${t};${r};${n}m`,y={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],overline:[53,55],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],blackBright:[90,39],gray:[90,39],grey:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgGray:[100,49],bgGrey:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}};Object.keys(y.modifier);Object.keys(y.color),Object.keys(y.bgColor);var T=function(){const e=new Map;for(const[t,r]of Object.entries(y)){for(const[t,n]of Object.entries(r))y[t]={open:`[${n[0]}m`,close:`[${n[1]}m`},r[t]=y[t],e.set(n[0],n[1]);Object.defineProperty(y,t,{value:r,enumerable:!1})}return Object.defineProperty(y,"codes",{value:e,enumerable:!1}),y.color.close="[39m",y.bgColor.close="[49m",y.color.ansi=d(),y.color.ansi256=O(),y.color.ansi16m=v(),y.bgColor.ansi=d(m),y.bgColor.ansi256=O(m),y.bgColor.ansi16m=v(m),Object.defineProperties(y,{rgbToAnsi256:{value:(e,t,r)=>e===t&&t===r?e<8?16:e>248?231:Math.round((e-8)/247*24)+232:16+36*Math.round(e/255*5)+6*Math.round(t/255*5)+Math.round(r/255*5),enumerable:!1},hexToRgb:{value(e){const t=/[a-f\d]{6}|[a-f\d]{3}/i.exec(e.toString(16));if(!t)return[0,0,0];let[r]=t;3===r.length&&(r=[...r].map((e=>e+e)).join(""));const n=Number.parseInt(r,16);return[n>>16&255,n>>8&255,255&n]},enumerable:!1},hexToAnsi256:{value:e=>y.rgbToAnsi256(...y.hexToRgb(e)),enumerable:!1},ansi256ToAnsi:{value(e){if(e<8)return 30+e;if(e<16)return e-8+90;let t,r,n;if(e>=232)t=(10*(e-232)+8)/255,r=t,n=t;else{const o=(e-=16)%36;t=Math.floor(e/36)/5,r=Math.floor(o/6)/5,n=o%6/5}const o=2*Math.max(t,r,n);if(0===o)return 30;let i=30+(Math.round(n)<<2|Math.round(r)<<1|Math.round(t));return 2===o&&(i+=60),i},enumerable:!1},rgbToAnsi:{value:(e,t,r)=>y.ansi256ToAnsi(y.rgbToAnsi256(e,t,r)),enumerable:!1},hexToAnsi:{value:e=>y.ansi256ToAnsi(y.hexToAnsi256(e)),enumerable:!1}}),y}();function B(e,t=(globalThis.Deno?globalThis.Deno.args:i.default.argv)){const r=e.startsWith("-")?"":1===e.length?"-":"--",n=t.indexOf(r+e),o=t.indexOf("--");return-1!==n&&(-1===o||n<o)}var w,{env:R}=i.default;function A(e,{streamIsTTY:t,sniffFlags:r=!0}={}){const n=function(){if("FORCE_COLOR"in R)return"true"===R.FORCE_COLOR?1:"false"===R.FORCE_COLOR?0:0===R.FORCE_COLOR.length?1:Math.min(Number.parseInt(R.FORCE_COLOR,10),3)}();void 0!==n&&(w=n);const o=r?w:n;if(0===o)return 0;if(r){if(B("color=16m")||B("color=full")||B("color=truecolor"))return 3;if(B("color=256"))return 2}if("TF_BUILD"in R&&"AGENT_NAME"in R)return 1;if(e&&!t&&void 0===o)return 0;const s=o||0;if("dumb"===R.TERM)return s;if("win32"===i.default.platform){const e=l.default.release().split(".");return Number(e[0])>=10&&Number(e[2])>=10586?Number(e[2])>=14931?3:2:1}if("CI"in R)return"GITHUB_ACTIONS"in R?3:["TRAVIS","CIRCLECI","APPVEYOR","GITLAB_CI","BUILDKITE","DRONE"].some((e=>e in R))||"codeship"===R.CI_NAME?1:s;if("TEAMCITY_VERSION"in R)return/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(R.TEAMCITY_VERSION)?1:0;if("truecolor"===R.COLORTERM)return 3;if("xterm-kitty"===R.TERM)return 3;if("TERM_PROGRAM"in R){const e=Number.parseInt((R.TERM_PROGRAM_VERSION||"").split(".")[0],10);switch(R.TERM_PROGRAM){case"iTerm.app":return e>=3?3:2;case"Apple_Terminal":return 2}}return/-256(color)?$/i.test(R.TERM)?2:/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(R.TERM)||"COLORTERM"in R?1:s}function x(e,t={}){return function(e){return 0!==e&&{level:e,hasBasic:!0,has256:e>=2,has16m:e>=3}}(A(e,p({streamIsTTY:e&&e.isTTY},t)))}B("no-color")||B("no-colors")||B("color=false")||B("color=never")?w=0:(B("color")||B("colors")||B("color=true")||B("color=always"))&&(w=1);var E={stdout:x({isTTY:s.default.isatty(1)}),stderr:x({isTTY:s.default.isatty(2)})};function C(e,t,r){let n=e.indexOf(t);if(-1===n)return e;const o=t.length;let i=0,l="";do{l+=e.slice(i,n)+t+r,i=n+o,n=e.indexOf(t,i)}while(-1!==n);return l+=e.slice(i),l}var{stdout:M,stderr:j}=E,F=Symbol("GENERATOR"),_=Symbol("STYLER"),I=Symbol("IS_EMPTY"),P=["ansi","ansi","ansi256","ansi16m"],k=Object.create(null),$=e=>{const t=(...e)=>e.join(" ");return((e,t={})=>{if(t.level&&!(Number.isInteger(t.level)&&t.level>=0&&t.level<=3))throw new Error("The `level` option should be an integer from 0 to 3");const r=M?M.level:0;e.level=void 0===t.level?r:t.level})(t,e),Object.setPrototypeOf(t,S.prototype),t};function S(e){return $(e)}Object.setPrototypeOf(S.prototype,Function.prototype);for(const[e,t]of Object.entries(T))k[e]={get(){const r=D(this,G(t.open,t.close,this[_]),this[I]);return Object.defineProperty(this,e,{value:r}),r}};k.visible={get(){const e=D(this,this[_],!0);return Object.defineProperty(this,"visible",{value:e}),e}};var N=(e,t,r,...n)=>"rgb"===e?"ansi16m"===t?T[r].ansi16m(...n):"ansi256"===t?T[r].ansi256(T.rgbToAnsi256(...n)):T[r].ansi(T.rgbToAnsi(...n)):"hex"===e?N("rgb",t,r,...T.hexToRgb(...n)):T[r][e](...n);for(const e of["rgb","hex","ansi256"]){k[e]={get(){const{level:t}=this;return function(...r){const n=G(N(e,P[t],"color",...r),T.color.close,this[_]);return D(this,n,this[I])}}};k["bg"+e[0].toUpperCase()+e.slice(1)]={get(){const{level:t}=this;return function(...r){const n=G(N(e,P[t],"bgColor",...r),T.bgColor.close,this[_]);return D(this,n,this[I])}}}}var L,Y=Object.defineProperties((()=>{}),(L=p({},k),c(L,u({level:{enumerable:!0,get(){return this[F].level},set(e){this[F].level=e}}})))),G=(e,t,r)=>{let n,o;return void 0===r?(n=e,o=t):(n=r.openAll+e,o=t+r.closeAll),{open:e,close:t,openAll:n,closeAll:o,parent:r}},D=(e,t,r)=>{const n=(...e)=>q(n,1===e.length?""+e[0]:e.join(" "));return Object.setPrototypeOf(n,Y),n[F]=e,n[_]=t,n[I]=r,n},q=(e,t)=>{if(e.level<=0||!t)return e[I]?"":t;let r=e[_];if(void 0===r)return t;const{openAll:n,closeAll:o}=r;if(t.includes(""))for(;void 0!==r;)t=C(t,r.close,r.open),r=r.parent;const i=t.indexOf("\n");return-1!==i&&(t=function(e,t,r,n){let o=0,i="";do{const l="\r"===e[n-1];i+=e.slice(o,l?n-1:n)+t+(l?"\r\n":"\n")+r,o=n+1,n=e.indexOf("\n",o)}while(-1!==n);return i+=e.slice(o),i}(t,o,n,i)),n+t+o};Object.defineProperties(S.prototype,k);var z=S();S({level:j?j.level:0});var V=z,Z={keyword:V.hex("#cb3f6e"),built_in:V.hex("#81D4FA"),literal:V.hex("#F48FB1"),number:V.hex("#F48FB1"),string:V.hex("#FFF78C"),function:V.hex("#81D4FA"),title:V.whiteBright,params:V.hex("#FFAB40"),comment:V.hex("#888888"),meta:V.whiteBright,"meta-keyword":V.whiteBright,"meta-string":V.whiteBright,section:V.whiteBright,tag:V.hex("#BECAFF"),name:V.hex("#FF93BC"),"builtin-name":V.whiteBright,attr:V.hex("#91EBC2"),attribute:V.whiteBright,variable:V.whiteBright,bullet:V.whiteBright,code:V.whiteBright,emphasis:V.italic,strong:V.bold,formula:V.whiteBright,link:V.underline,quote:V.whiteBright,"selector-tag":V.whiteBright,"selector-id":V.whiteBright,"selector-class":V.whiteBright,"selector-attr":V.whiteBright,"selector-pseudo":V.whiteBright,"template-tag":V.blueBright,"template-variable":V.green},U=e=>e.replace(/(\x9B|\x1B\[)[0-?]*[ -\\/]*[@-~]/g,""),W=e=>V.hex("#81D4FA")(e),H=e=>Z.keyword(U(e)),K=e=>V.hex("#FF91E3")(e),J=e=>Z.literal(U(e)),Q=e=>Z.string(U(e)),X=e=>V.hex("#5CD7E")(e),ee=e=>Z.comment(U(e)),te=e=>/\b(?:end)?comment/.test(e)?Z.comment(e):Z.keyword(e),re=e=>"{%-"===e?`${V.gray("{%")}${Z.keyword("-")}`:"{{-"===e?`${V.gray("{{")}${Z.keyword("-")}`:"-}}"===e?`${Z.keyword("-")}${V.gray("}}")}`:"-%}"===e?`${Z.keyword("-")}${V.gray("%}")}`:V.gray(e);function ne(e){return e.replace(/\s*[a-zA-Z._]+/,te).replace(new RegExp("(?<=[|,])\\s*[a-zA-Z_]*(?=:?)","g"),X).replace(/[a-zA-Z_]+?\s*(?=[[.])/,W).replace(/[|,.:]/g,H).replace(/(?:=|[!=]=|[<>]=?|\b(?:and|or|contains|with|in|null|with|as)\b)/g,K).replace(/["'].*?["']/g,Q)}function oe(e){return e.replace(new RegExp("(?<=[|,])\\s*[a-zA-Z_]*(?=:?)","g"),X).replace(/[a-zA-Z_]+?\s*(?=[[.])/,W).replace(/[|,.:]/g,H).replace(/["'].*?["']/g,Q)}var ie=e=>e.replace(/{%-?\s*#\s*[\s\S]+%}/g,(e=>(console.log(e),U(e))));module.exports=function(e,t={}){Object.assign(t,{theme:Z,language:"html"});const r=n.highlight(e,t);return"html"!==t.language?r:r.replace(new RegExp("(?<={%-?)[\\s\\S]+?(?=-?%})","g"),ne).replace(new RegExp("(?<={{-?)[\\s\\S]+?(?=-?}})","g"),oe).replace(/\b(null|false|nil|true|empty)\b/g,J).replace(/{[{%]-?|-?[%}]}/g,re).replace(/{%-?\s*comment[\s\S]+endcomment\s*-?%}/g,ee).replace(/{%-?\s*#\s*[\s\S]+%}/g,ie)};