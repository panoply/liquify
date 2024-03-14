#!/usr/bin/env node
"use strict";var re=Object.create;var I=Object.defineProperty;var pe=Object.getOwnPropertyDescriptor;var de=Object.getOwnPropertyNames;var ce=Object.getPrototypeOf,he=Object.prototype.hasOwnProperty;var N=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),k=(e,t)=>{for(var o in t)I(e,o,{get:t[o],enumerable:!0})},le=(e,t,o,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of de(t))!he.call(e,r)&&r!==o&&I(e,r,{get:()=>t[r],enumerable:!(n=pe(t,r))||n.enumerable});return e};var Y=(e,t,o)=>(o=e!=null?re(ce(e)):{},le(t||!e||!e.__esModule?I(o,"default",{value:e,enumerable:!0}):o,e));var V=N(R=>{"use strict";Object.defineProperty(R,"__esModule",{value:!0});var E=e=>{let[,t]=/([a-f\d]{3,6})/i.exec(e)||[],o=t?t.length:0;if(o===3)t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2];else if(o!==6)return[0,0,0];let n=parseInt(t,16);return[n>>16&255,n>>8&255,255&n]},_=(e,t,o)=>t>e?t:e>o?o:e,ue=(e,t,o)=>{if(t==="")return e;let n=e.indexOf(t);if(n<0)return e;let r=t.length,h=0,s="";for(;~n;)s+=e.slice(h,n)+o,h=n+r,n=e.indexOf(t,h);return s+e.slice(h)},W={open:"",close:""},a=(e=>{let t=u=>!!s.find(g=>u.test(g)),o=e||(typeof process!="undefined"?process:{}),{stdout:n,platform:r}=o,h=o.env||{},s=o.argv||[],i="FORCE_COLOR"in h,p=h.FORCE_COLOR,c=p==="true"||parseInt(p)>0,d="NO_COLOR"in h||i&&!c||t(/^-{1,2}(no-color|color=false|color=never)$/),f=i&&c||t(/^-{1,2}(color|color=true|color=always)$/),l=n&&"isTTY"in n&&/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(h.TERM);return!d&&(f||l||r==="win32"||"CI"in h)})()?(e,t)=>({open:`\x1B[${e}m`,close:`\x1B[${t}m`}):()=>W,F=(e,t,o)=>a(`38;2;${e};${t};${o}`,39),H=(e,t,o)=>a(`48;2;${e};${t};${o}`,49),fe={visible:W,reset:a(0,0),inverse:a(7,27),hidden:a(8,28),bold:a(1,22),dim:a(2,22),faint:a(2,22),italic:a(3,23),underline:a(4,24),doubleUnderline:a(21,24),strikethrough:a(9,29),strike:a(9,29),frame:a(51,54),encircle:a(52,54),overline:a(53,55),black:a(30,39),red:a(31,39),green:a(32,39),yellow:a(33,39),blue:a(34,39),magenta:a(35,39),cyan:a(36,39),white:a(37,39),grey:a(90,39),gray:a(90,39),blackBright:a(90,39),redBright:a(91,39),greenBright:a(92,39),yellowBright:a(93,39),blueBright:a(94,39),magentaBright:a(95,39),cyanBright:a(96,39),whiteBright:a(97,39),bgBlack:a(40,49),bgRed:a(41,49),bgGreen:a(42,49),bgYellow:a(43,49),bgBlue:a(44,49),bgMagenta:a(45,49),bgCyan:a(46,49),bgWhite:a(47,49),bgBlackBright:a(100,49),bgRedBright:a(101,49),bgGreenBright:a(102,49),bgYellowBright:a(103,49),bgBlueBright:a(104,49),bgMagentaBright:a(105,49),bgCyanBright:a(106,49),bgWhiteBright:a(107,49)},{defineProperty:ye,defineProperties:me,setPrototypeOf:B}=Object,ge=/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,be=/(\r*\n)/g,G=function(){let e=t=>t;return e.strip=t=>t.replace(ge,""),e.extend=t=>{for(let o in t){let n=t[o],r=n.open!=null?n:F(...E(n));v[o]={get(){let h=K(this,r);return ye(this,o,{value:h}),h}}}P=me(()=>{},v),B(e,P)},e.extend(fe),e},K=({props:e},{open:t,close:o})=>{let n=(s,...i)=>ve(s,i,n.props),r=t,h=o;return e!==void 0&&(r=e.openStack+t,h=o+e.closeStack),B(n,P),n.props={open:t,close:o,openStack:r,closeStack:h,parent:e},n.open=r,n.close=h,n},ve=(e,t,o)=>{if(!e)return"";let{openStack:n,closeStack:r}=o,h=e.raw!=null?String.raw(e,...t):e;if(~h.indexOf("\x1B"))for(;o!==void 0;)h=ue(h,o.close,o.open),o=o.parent;return~h.indexOf(`
`)&&(h=h.replace(be,r+"$1"+n)),n+h+r},O={ansi:e=>(t=>a(`38;5;${t}`,39))(_(e,0,255)),bgAnsi:e=>(t=>a(`48;5;${t}`,49))(_(e,0,255)),hex:e=>F(...E(e)),bgHex:e=>H(...E(e)),rgb:(e,t,o)=>F(_(e,0,255),_(t,0,255),_(o,0,255)),bgRgb:(e,t,o)=>H(_(e,0,255),_(t,0,255),_(o,0,255))},v={},P;for(let e in O)v[e]={get(){return(...t)=>K(this,O[e](...t))}};v.ansi256=v.fg=v.ansi,v.bgAnsi256=v.bg=v.bgAnsi;var qe=new G;R.Ansis=G,R.default=qe});var Z=N((Fe,D)=>{"use strict";var X=V();D.exports=X.default;D.exports.Ansis=X.Ansis});var T=Y(require("fs")),S=require("path");var y=Y(Z());var w={};k(w,{filters:()=>j,objects:()=>_e,tags:()=>L});var j={abs:{description:"Returns the absolute value of a number",reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/abs/"}},append:{description:"Concatenates two strings and returns the concatenated value",snippet:"append: '$1' $0",arguments:[{type:"string",required:!0}],reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/append/"}},at_least:{description:"Limits a number to a minimum value",snippet:"at_least: $1 $0",arguments:[{type:"number",required:!0}],reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/at_least/"}},at_most:{description:"Limits a number to a maximum value",snippet:"at_most: $1 $0",arguments:[{type:"number",required:!0}],reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/at_most/"}},capitalize:{description:"Makes the first character of a string capitalized",reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/capitalize/"}},ceil:{description:"Rounds the input up to the nearest whole number. Liquid tries to convert the input to a number before the filter is applied",reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/ceil/"}},compact:{description:"Removes any `nil` values from an array",reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/compact/"}},concat:{description:"Concatenates (combines) an array with another array. The resulting array contains all the elements of the original arrays",snippet:"concat: $1 $0",arguments:[{type:"array",required:!0}],reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/concat/"}},date:{description:"Converts a timestamp into another date format. The format for this syntax is the same as `strftime` - The input uses the same format as Ruby\u2019s `Time.parse`",snippet:"date: '$1' $0",arguments:[{type:"string",required:!0}],reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/date/"}},default:{description:"Allows you to specify a fallback in case a value doesn\u2019t exist. default will show its value if the left side is `nil`, `false`, or `empty`",snippet:"default: '$1' $0",arguments:[{type:"any",required:!0},{type:"parameter",value:{allow_false:{type:"boolean",description:"To allow variables to return false instead of the default value, you can use the `allow_false` parameter."}}}],reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/default/"}},divided_by:{description:"Divides a number by another number",snippet:"divided_by: $1 $0",arguments:[{type:"number",required:!0}],reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/divided_by/"}},downcase:{description:"Makes each character in a string lowercase. It has no effect on strings which are already all lowercase",reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/downcase/"}},escape:{description:"Escapes a string by replacing characters with escape sequences (so that the string can be used in a URL, for example). It doesn\u2019t change strings that don\u2019t have anything to escape",reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/escape/"}},escape_once:{description:"Escapes a string without changing existing escaped entities. It doesn\u2019t change strings that don\u2019t have anything to escape",reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/escape_once/"}},first:{description:"Returns the first item of an array.",reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/first/"}},floor:{description:"Rounds the input down to the nearest whole number. Liquid tries to convert the input to a number before the filter is applied",reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/floor/"}},join:{description:"Joins the elements of an array with the character passed as the parameter. The result is a single string.",reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/join/"},snippet:"join: '$1' $0",arguments:[{type:"string",required:!0}]},last:{description:"Gets the last element in an array",reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/last/"}},lstrip:{description:"Removes all whitespace (tabs, spaces, and newlines) from the left side of a string. It does not affect spaces between words",reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/lstrip/"}},map:{description:"Accepts an array element\u2019s attribute as a parameter and creates a string out of each array element\u2019s value.",snippet:"map: '$1' $0",arguments:[{type:"string",required:!0}],reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/map/"}},minus:{description:"Subtracts a number from another number",snippet:"minus: $1 $0",arguments:[{type:"number",required:!0}],reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/minus/"}},modulo:{description:"Returns the remainder of a division operation",snippet:"modulo: $1 $0",arguments:[{type:"number",required:!0}],reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/modulo/"}},newline_to_br:{description:"Replaces every newline in a string with an HTML line break (`<br />`)",reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/newline_to_br/"}},plus:{description:"Adds a number to another number",snippet:"plus: $1 $0",arguments:[{type:"number",required:!0}],reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/plus/"}},prepend:{description:"Adds the specified string to the beginning of another string",snippet:"prepend: '$1' $0",arguments:[{type:"string",required:!0}],reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/prepend/"}},remove:{description:"Removes every occurrence of the specified substring from a string",snippet:"remove: '$1' $0",arguments:[{type:"string",required:!0}],reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/remove/"}},remove_first:{description:"Removes only the first occurrence of the specified substring from a string",snippet:"remove_first: '$1' $0",arguments:[{type:"string",required:!0}],reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/remove_first/"}},replace:{description:"Replaces every occurrence of the first argument in a string with the second argument",snippet:"replace: '$1', '$2' $0",arguments:[{type:"string",required:!0},{type:"string",required:!0}],reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/replace/"}},replace_first:{description:"Replaces only the first occurrence of the first argument in a string with the second argument",snippet:"replace_first: '$1', '$2' $0",arguments:[{type:"string",required:!0},{type:"string",required:!0}],reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/replace_first/"}},reverse:{description:"Reverses the order of the items in an array. `reverse` cannot reverse a string",reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/reverse/"}},round:{description:"Rounds a number to the nearest integer or, if a number is passed as an argument, to that number of decimal places",arguments:[{type:"number",required:!1}],reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/round/"}},rstrip:{description:"Removes all whitespace (tabs, spaces, and newlines) from the right side of a string. It does not affect spaces between words",reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/rstrip/"}},size:{description:"Returns the number of characters in a string or the number of items in an array",reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/size/"}},slice:{description:"Returns a substring of 1 character beginning at the index specified by the first argument. An optional second argument specifies the length of the substring to be returned",snippet:"slice: $1 $0",arguments:[{type:"number",required:!0},{type:"number",required:!1}],reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/slice/"}},sort:{description:"Sorts items in an array in case-sensitive order - An optional argument specifies which property of the array\u2019s items to use for sorting",arguments:[{type:"number",required:!1}],reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/sort/"}},sort_natural:{description:"Sorts items in an array in case-insensitive order",reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/sort_natural/"}},split:{description:"Divides a string into an array using the argument as a separator. split is commonly used to convert comma-separated items from a string to an array",snippet:"split: $1",arguments:[{type:"string",required:!0}],reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/split/"}},strip:{description:"Removes all whitespace (tabs, spaces, and newlines) from both the left and right sides of a string. It does not affect spaces between words",reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/strip/"}},strip_html:{description:"Removes any HTML tags from a string",reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/strip_html/"}},strip_newlines:{description:"Removes any newline characters (line breaks) from a string",reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/strip_newlines/"}},times:{description:"Multiplies a number by another number",snippet:"times: $1 $0",arguments:[{type:"number",required:!0}],reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/times/"}},truncate:{description:"Shortens a string down to the number of characters passed as an argument. If the specified number of characters is less than the length of the string, an ellipsis (\u2026) is appended to the string and is included in the character count",snippet:"truncate: $1 $0",arguments:[{type:"number",required:!0},{type:"string",required:!1}],reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/truncate/"}},truncatewords:{description:"Shortens a string down to the number of words passed as an argument. If the specified number of words is less than the number of words in the string, an ellipsis (\u2026) is appended to the string",snippet:"truncatewords: $1 $0",arguments:[{type:"number",required:!0},{type:"string",required:!1}],reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/truncatewords/"}},uniq:{description:"Removes any duplicate elements in an array",reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/uniq/"}},upcase:{description:"Makes each character in a string uppercase. It has no effect on strings which are already all uppercase",reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/upcase/"}},url_decode:{description:"Decodes a string that has been encoded as a URL or by `url_encode`",reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/url_decode/"}},url_encode:{description:"Converts any URL-unsafe characters in a string into percent-encoded characters",reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/url_encode/"}},where:{description:"Creates an array including only the objects with a given property value, or any truthy value by default",snippet:"where: '$1'$0",arguments:[{type:"string",required:!0},{type:"string",required:!1}],reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/filters/where/"}}};var L={"#":{type:"comment",description:"Prevents an expression from being rendered or output.",snippet:"$1",singleton:!0,reference:{name:"Standard Liquid",url:"https://shopify.dev/api/liquid/tags#inline_comment"}},assign:{type:"variable",description:"Creates a new variable.",snippet:"$1 = $2",filters:!0,singleton:!0,reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/tags/variable/#assign"}},break:{type:"iteration",singleton:!0,parents:["for","tablerow"],description:"Causes the loop to stop iterating when it encounters the break tag.",reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/tags/iteration/#break"}},capture:{type:"variable",filters:!1,description:"Captures the string inside of the opening and closing tags and assigns it to a variable. Variables created through `{% capture %}` are strings.",reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/tags/variable/#capture"}},case:{type:"control",description:"Creates a switch statement to compare a variable with different values. case initializes the switch statement, and when compares its values.",children:["when","else"],reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/tags/control-flow/#case"}},comment:{type:"comment",description:"Allows you to leave un-rendered code inside a Liquid template. Any text within the opening and closing comment blocks will not be output, and any Liquid code within will not be executed.",reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/tags/comment/"}},continue:{type:"iteration",description:"Causes the loop to skip the current iteration when it encounters the continue tag.",singleton:!0,parents:["for","tablerow"],reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/tags/iteration/#continue"}},cycle:{type:"iteration",singleton:!0,description:"Loops through a group of strings and outputs them in the order that they were passed as parameters. Each time cycle is called, the next string that was passed as a parameter is output.",parents:["for","tablerow"],reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/tags/iteration/#cycle"}},decrement:{description:"Creates a new number variable, and decreases its value by one every time it is called. The initial value is -1.",singleton:!0,filters:!1,type:"variable",reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/tags/variable/#decrement"}},echo:{type:"output",description:"Using the echo tag is the same as wrapping an expression in curly brackets ({{ and }}). However, unlike the curly bracket method, you can use the echo tag inside liquid tags.",singleton:!0,filters:!0,reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/tags/template/#echo"}},else:{type:"control",description:"Add condition within an if or unless block.",singleton:!0,parents:["if","elsif","case","unless","when","for"],reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/tags/control-flow/#unless"}},elsif:{description:"Adds more conditions within an if or unless block.",singleton:!0,type:"control",parents:["if"],reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/tags/control-flow/#unless"}},for:{description:"Repeatedly executes a block of code.",type:"iteration",snippet:"$1 in $2",reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/tags/iteration/#for"},parameters:{offset:{type:"number",description:"Begins the loop at the specified index"},limit:{type:"number",description:"Limits the loop to the specified number of iterations"},reversed:{type:"keyword",description:"Reverses the order of the loop. Note that this flag\u2019s spelling is different from the filter reverse"}}},if:{description:"Executes a block of code only if a certain condition is met.",type:"control",reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/tags/control-flow/#if"}},increment:{description:"Creates a new number variable, and increases its value by one every time it is called. The initial value is 0.",singleton:!0,filters:!1,type:"variable",reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/tags/variable/#increment"}},liquid:{description:"Encloses multiple tags within one set of delimiters, to allow writing Liquid logic more concisely.",type:"unknown",singleton:!0,reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/tags/template/#liquid"}},raw:{type:"raw",description:"Allows output of Liquid code on a page without being parsed.",reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/tags/raw/"}},render:{description:`Insert the rendered content of another template within the current template.

The code within the rendered template does not automatically have access to the variables assigned using variable tags within the parent template. Similarly, variables assigned within the rendered template cannot be accessed by code in any other template.`,snippet:"'$1'",filters:!1,singleton:!0,type:"import",reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/tags/template/#render"}},tablerow:{description:"Generates an HTML `<table>`. Must be wrapped in an opening `<table>` and closing `</table>` HTML tags.",type:"iteration",parameters:{cols:{type:"number",description:"Defines how many columns the tables should have."},limit:{type:"number",description:"Exits the tablerow loop after a specific index."},offset:{type:"number",description:"Starts the tablerow loop after a specific index."}},reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/tags/iteration/#tablerow"}},unless:{description:"The opposite of if \u2013 executes a block of code only if a certain condition is not met.",type:"control",reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/tags/control-flow/#unless"}},when:{description:'Define the various conditions set by the "{% case %}" tag',singleton:!0,type:"control",parents:["case"],reference:{name:"Standard Liquid",url:"https://shopify.github.io/liquid/tags/control-flow/#casewhen"}}};var _e={};var M={};k(M,{filters:()=>te,objects:()=>ee,tags:()=>Le});var Q={form:{type:"generator",description:"Creates an HTML `<form>` element along with the required `<input>` elements to submit the form to a particular endpoint.",arguments:[{type:"string",required:!0,pattern:/(?:activate_|recover_|reset_|create_)customer_password|contact|guest_login|storefront_password|currency|product|new_comment|(?:create_)?customer(?:_address|_login)?|localization/,value:[{value:"activate_customer_password",template:"customer/activate_account",description:"Generates a form for activating a customer account on the activate_account.liquid template."},{value:"product",description:'Generates a form for adding a product variant to the cart. Requires a "product" object as a parameter.'},{value:"new_comment",template:"article",description:"Generates a form for creating a new comment in the article.liquid template. Requires the article object as a parameter."},{description:"Generates a form for creating a new customer account on the register.liquid template.",value:"create_customer",template:"customer/register"},{value:"customer",description:"Generates a form for creating a new customer without registering a new account. This form is useful for collecting customer information when you don't want customers to log in to your store, such as building a list of emails from a newsletter signup."},{value:"customer_address",description:"Generates a form for creating or editing customer account addresses on the addresses.liquid template. When creating a new address, include the parameter customer.new_address. When editing an existing address, include the parameter address."},{value:"customer_login",description:"Generates a form for logging into Customer Accounts on the login.liquid template.",template:"customer/login"},{value:"recover_customer_password",description:"Generates a form for recovering a lost password on the login.liquid template.",template:"customer/login"},{value:"contact",description:"Generates a form for submitting an email through the Liquid contact form"},{value:"reset_customer_password",description:"Generates a form on the customers/reset_password.liquid template for a customer to reset their password.",template:"customer/login"},{value:"guest_login",description:"Generates a form on the login.liquid template that directs customers back to their checkout session as a guest instead of logging in to an account.",template:"customer/login"},{value:"localization",description:"Generates a form for customers to select their preferred country so they're shown the appropriate language and currency. Inside the form, you can build two different selectors"},{value:"storefront_password",description:"Generates a form on the password.liquid template for entering a password-protected storefront."},{value:"currency",deprecated:!0,description:"Generates a form that lets your customer change the currency in your storefront. This form generator is deprecated, use the `localization` form instead."}]},{type:"object",separator:44,value:{product:[{value:"product",description:"The `product` object is required when generating a form for adding a product variant to the cart"}],new_comment:[{value:"article",description:"The `article` object"}],customer_address:[{value:"customer.new_address",description:"The `customer.new_address` is required for creating a new address"},{value:"address",description:"The `address` is required when editing an existing address"}]}},{type:"parameter",strict:!1,separator:44,value:{id:{type:"string",description:"Provide a custom HTML attribute `id` value."},class:{type:"string",description:"Provide a custom HTML attribute `class`"}}}],reference:{name:"Shopify Liquid",url:"https://shopify.dev/docs/themes/liquid/reference/tags/theme-tags#form"}},include:{description:"The include tag has been deprecated because the way that it handles variables reduces performance and makes theme code harder to both read and maintain.",filters:!1,deprecated:!0,singleton:!0,type:"import",reference:{name:"Shopify Liquid",url:"https://help.shopify.com/en/themes/liquid/tags/deprecated-tags#include"}},layout:{description:`Include "{% layout 'alternate' %}" at the beginning of a template file to use an alternate layout file from the Layout folder of your theme. If you don't define an alternate layout, the theme.liquid template file is used by default:`,singleton:!0,type:"import",arguments:[{type:"string",required:!0}],reference:{name:"Shopify Liquid",url:"https://shopify.dev/api/liquid/tags/theme-tags#layout"}},paginate:{type:"iteration",description:"Splitting products, blog articles, and search results across multiple pages is a necessary part of theme design as you are limited to 50 results per page in any for loop.",arguments:[{type:"array",required:!0},{type:"keyword",value:"by",required:!0},{type:"number",required:!0,pattern:[1,50]}],reference:{name:"Shopify Liquid",url:"https://shopify.dev/api/liquid/tags/theme-tags#paginate"}},section:{description:"Renders a section from the sections folder of a theme.",filters:!1,singleton:!0,type:"import",arguments:[{type:"string",required:!0}],reference:{name:"Shopify Liquid",url:"https://shopify.dev/api/liquid/tags/theme-tags#section"}},sections:{description:"Renders a [section group](https://shopify.dev/themes/architecture/section-groups). Use this tag to render section groups as part of the theme's layout content. Place the sections tag where you want to render it in the layout.",filters:!1,singleton:!0,type:"import",arguments:[{type:"string",required:!0}],reference:{name:"Shopify Liquid",url:"https://shopify.dev/api/liquid/tags/theme-tags#sections"}},schema:{description:"The schema tag is used by Shopify sections. Each section can have a single schema tag, and schema tags must contain valid JSON. schema tags can be placed anywhere within a section file but cannot be nested inside another Liquid tag.  ",filters:!1,language:"json",unique:!0,type:"embedded",reference:{name:"Shopify Liquid",url:"https://help.shopify.com/en/themes/development/sections#using-section-schema-tags"}},style:{type:"embedded",description:"The Liquid style tag renders an HTML `<style>` tag with a Shopify data attribute.",filters:!1,language:"css",reference:{name:"Shopify Liquid",url:"https://help.shopify.com/themes/liquid/tags/theme-tags#style"}},stylesheet:{type:"embedded",description:"The stylesheet tag is used by Shopify sections. Code is concatenated into a single file by Shopify and injected into `{{ content_for_header }}`.",filters:!1,unique:!0,deprecated:!0,language:"css",arguments:[{type:"string",value:"scss",description:"SASS support is used by Shopify sections. Code is concatenated into a single file by Shopify and injected into `{{ content_for_header }}`."}],reference:{name:"Shopify Liquid",url:"https://shopify.dev/themes/architecture/sections/section-schema"}},javascript:{type:"embedded",description:"The javascript tag is used by Shopify sections. Code is concatenated into a single file by Shopify and injected into `{{ content_for_header }}`.",filters:!1,deprecated:!0,language:"javascript",reference:{name:"Shopify Liquid",url:"https://shopify.dev/themes/architecture/sections/section-assets#javascript"}}};var U=Object.assign;var ze=Array.isArray;var ee={media:{summary:"An abstract media object that can represent the following object types:\n\n- [`image`](/docs/api/liquid/objects/image)\n- [`model`](/docs/api/liquid/objects/model)\n- [`video`](/docs/api/liquid/objects/video)\n- [`external_video`](/docs/api/liquid/objects/external_video)",description:`An abstract media object that can represent the following object types:

- [\`image\`](https://shopify.dev/docs/api/liquid/objects/image)
- [\`model\`](https://shopify.dev/docs/api/liquid/objects/model)
- [\`video\`](https://shopify.dev/docs/api/liquid/objects/video)
- [\`external_video\`](https://shopify.dev/docs/api/liquid/objects/external_video) The \`media\` object can be returned by the [\`product.media\` array](https://shopify.dev/docs/api/liquid/objects/product#product-media) or a
[\`file_reference\` metafield](https://shopify.dev/apps/metafields/types).

You can use [media filters](https://shopify.dev/docs/api/liquid/filters/media-filters) to generate URLs and media displays. To learn about how
to use media in your theme, refer to [Support product media](https://shopify.dev/themes/product-merchandising/media/support-media).



**Note**

> Each media type has unique properties in addition to the general \`media\` properties. To learn about these
> additional properties, refer to the reference for each type.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/media)


Last Updated: 5th March 2024


`,type:"object",properties:{id:{type:"number",description:`The ID of the media. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/media/id)


Last Updated: 5th March 2024


`},position:{type:"number",description:`The position of the media in the [\`product.media\` array](https://shopify.dev/docs/api/liquid/objects/product#product-media). If the source is a [\`file_reference\` metafield](https://shopify.dev/apps/metafields/types), then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/media/position)


Last Updated: 5th March 2024


`},media_type:{type:"string",description:`The media type. 



#### Filter for media of a specific type

You can use the \`media_type\` property with the [\`where\` filter](/docs/api/liquid/filters/where) to filter the [\`product.media\` array](/docs/api/liquid/objects/product#product-media) for all media of a desired type.


\`\`\`liquid

{% assign images = product.media | where: 'media_type', 'image' %}

{% for image in images %}
  {{- image | image_url: width: 300 | image_tag }}
{% endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/media/media_type)


Last Updated: 5th March 2024


`,literal:["image","model","video","external_video"]},preview_image:{type:"object",description:`A preview image of the media. 

**Note**

> Preview images don't have an ID attribute.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/media/preview_image)


Last Updated: 5th March 2024


`,scope:"image"},alt:{type:"string",description:`The alt text of the media. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/media/alt)


Last Updated: 5th March 2024


`}}},address:{summary:"An address, such as a customer address or order shipping address.",description:`An address, such as a customer address or order shipping address. 

**Tip**

> Use the [\`format_address\` filter](https://shopify.dev/docs/api/liquid/filters/format_address) to output an address according to its locale.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address)


Last Updated: 5th March 2024


`,type:"object",properties:{company:{type:"string",description:`The company of the address. If no company is specified, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address/company)


Last Updated: 5th March 2024


`},phone:{type:"string",description:`The phone number of the address. If no phone number is specified, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address/phone)


Last Updated: 5th March 2024


`},first_name:{type:"string",description:`The first name of the address. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address/first_name)


Last Updated: 5th March 2024


`},last_name:{type:"string",description:`The last name of the address. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address/last_name)


Last Updated: 5th March 2024


`},name:{type:"string",description:`A combination of the first and last names of the address. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address/name)


Last Updated: 5th March 2024


`},url:{type:"string",description:`The relative URL for the address. 

**Note**

> This only applies to customer addresses.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address/url)


Last Updated: 5th March 2024


`},summary:{type:"string",description:`A summary of the address, including the following properties:

- First and last name
- First and second lines
- City
- Province
- Country 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address/summary)


Last Updated: 5th March 2024


`},id:{type:"number",description:`The ID of the address. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address/id)


Last Updated: 5th March 2024


`},address1:{type:"string",description:`The first line of the address. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address/address1)


Last Updated: 5th March 2024


`},address2:{type:"string",description:`The second line of the address. If no second line is specified, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address/address2)


Last Updated: 5th March 2024


`},city:{type:"string",description:`The city of the address. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address/city)


Last Updated: 5th March 2024


`},zip:{type:"string",description:`The zip or postal code of the address. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address/zip)


Last Updated: 5th March 2024


`},country_code:{type:"string",description:`The country of the address in [ISO 3166-1 (alpha 2) format](https://www.iso.org/glossary-for-iso-3166.html). 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address/country_code)


Last Updated: 5th March 2024


`},province_code:{type:"string",description:`The province of the address in [ISO 3166-2 (alpha 2) format](https://www.iso.org/glossary-for-iso-3166.html). 

**Note**

> The value doesn't include the preceding [ISO 3166-1](https://www.iso.org/glossary-for-iso-3166.html) country code.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address/province_code)


Last Updated: 5th March 2024


`},country:{type:"object",description:`The country of the address. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address/country)


Last Updated: 5th March 2024


`,scope:"country"},street:{type:"string",description:`A combination of the first and second lines of the address. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address/street)


Last Updated: 5th March 2024


`},province:{type:"string",description:`The province of the address. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/address/province)


Last Updated: 5th March 2024


`}}},collections:{summary:"All of the [collections](/docs/api/liquid/objects/collection) on a store.",global:!0,description:`All of the [collections](https://shopify.dev/docs/api/liquid/objects/collection) on a store. 



#### Iterate over the collections

You can iterate over \`collections\` to build a collection list.


\`\`\`liquid

{% for collection in collections %}
  {{- collection.title | link_to: collection.url }}
{% endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collections)


Last Updated: 5th March 2024


`,type:"array",scope:"collection"},pages:{summary:"All of the [pages](/docs/api/liquid/objects/page) on a store.",global:!0,description:`All of the [pages](https://shopify.dev/docs/api/liquid/objects/page) on a store. 



#### Example

You can access a specific page through the \`pages\` object using the page's [handle](/docs/api/liquid/basics#handles).


\`\`\`liquid

{{ pages.contact.title }}
{{ pages['about-us'].title }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/pages)


Last Updated: 5th March 2024


`,type:"array",scope:"page"},all_products:{summary:"All of the products on a store.",global:!0,description:`All of the products on a store. 

**Note**

> The \`all_products\` object has a limit of 20 unique handles per page. If you want more than 20 products,
then consider using a collection instead.

#### Example

You can use \`all_products\` to access a product by its [handle](/docs/api/liquid/basics#handles). This returns the [\`product\`](/docs/api/liquid/objects/product) object for the specified product. If the product isn't found, then \`empty\` is returned.

\`\`\`liquid

{{ all_products['love-potion'].title }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/all_products)


Last Updated: 5th March 2024


`,type:"array",scope:"product"},app:{summary:"An app. This object is usually used to access app-specific information for use with [theme app extensions](/apps/online-store/theme-app-extensions).",description:`An app. This object is usually used to access app-specific information for use with [theme app extensions](https://shopify.dev/apps/online-store/theme-app-extensions). 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/app)


Last Updated: 5th March 2024


`,type:"object",properties:{metafields:{type:22,description:`The [metafields](https://shopify.dev/docs/api/liquid/objects/metafield) that are [owned by the app](https://shopify.dev/apps/metafields/app-owned). 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/app/metafields)


Last Updated: 5th March 2024


`}}},discount:{summary:"A discount applied to a cart, line item, or order.",deprecated:!0,description:`\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F

Deprecated because not all discount types and details are captured.

The \`discount\` object has been replaced by the [\`discount_allocation\`](/docs/api/liquid/objects/discount_allocation) and
[\`discount_application\`](/docs/api/liquid/objects/discount_application) objects.

---

A discount applied to a cart, line item, or order. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount)


Last Updated: 5th March 2024


`,type:"object",properties:{amount:{type:"number",description:`The amount of the discount in the currency's subunit. 

**Note**

> This is the same value as [\`discount.total_amount\`](https://shopify.dev/docs/api/liquid/objects/discount#discount-total_amount).

The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount/amount)


Last Updated: 5th March 2024


`,deprecated:!0},total_amount:{type:"number",description:`The amount of the discount in the currency's subunit. 

**Note**

> This is the same value as [\`discount.amount\`](https://shopify.dev/docs/api/liquid/objects/discount#discount-amount).

The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount/total_amount)


Last Updated: 5th March 2024


`,deprecated:!0},code:{type:"string",description:`The customer-facing name of the discount. 

**Note**

> This is the same value as [\`discount.title\`](https://shopify.dev/docs/api/liquid/objects/discount#discount-title).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount/code)


Last Updated: 5th March 2024


`,deprecated:!0},title:{type:"string",description:`The customer-facing name of the discount. 

**Note**

> This is the same value as [\`discount.code\`](https://shopify.dev/docs/api/liquid/objects/discount#discount-code).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount/title)


Last Updated: 5th March 2024


`,deprecated:!0},type:{type:"string",description:`The type of the discount. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount/type)


Last Updated: 5th March 2024


`,deprecated:!0,literal:["FixedAmountDiscount","PercentageDiscount","ShippingDiscount"]},savings:{type:"number",description:`The amount of the discount as a negative value, in the currency's subunit. 

**Note**

> This is the same value as [\`discount.total_savings\`](https://shopify.dev/docs/api/liquid/objects/discount#discount-total_savings).
The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount/savings)


Last Updated: 5th March 2024


`,deprecated:!0},total_savings:{type:"number",description:`The amount of the discount as a negative value, in the currency's subunit. 

**Note**

> This is the same value as [\`discount.savings\`](https://shopify.dev/docs/api/liquid/objects/discount#discount-savings).
The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount/total_savings)


Last Updated: 5th March 2024


`,deprecated:!0}}},articles:{summary:"All of the articles across the blogs in the store.",global:!0,description:`All of the articles across the blogs in the store. 



#### Example

You can use \`articles\` to access an article by its [handle](/docs/api/liquid/basics#handles).


\`\`\`liquid

{% assign article = articles['potion-notions/new-potions-for-spring'] %}
{{ article.title | link_to: article.url }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/articles)


Last Updated: 5th March 2024


`,type:"array",scope:"article"},article:{summary:"An article, or [blog post](https://help.shopify.com/manual/online-store/blogs/writing-blogs), in a blog.",template:["article"],description:`An article, or [blog post](https://help.shopify.com/manual/online-store/blogs/writing-blogs), in a blog. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article)


Last Updated: 5th March 2024


`,type:"object",properties:{image:{type:"object",description:`The featured image for the article. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article/image)


Last Updated: 5th March 2024


`,scope:"image"},author:{type:"string",description:`The full name of the author of the article. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article/author)


Last Updated: 5th March 2024


`},metafields:{type:"any",description:`The [metafields](https://shopify.dev/docs/api/liquid/objects/metafield) applied to the article. 

**Tip**

> To learn about how to create metafields, refer to [Create and manage metafields](https://shopify.dev/apps/metafields/manage) or visit
> the [Shopify Help Center](https://help.shopify.com/manual/metafields).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article/metafields)


Last Updated: 5th March 2024


`},handle:{type:"string",description:`The [handle](https://shopify.dev/docs/api/liquid/basics#handles) of the article. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article/handle)


Last Updated: 5th March 2024


`},id:{type:"string",description:`The ID of the article. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article/id)


Last Updated: 5th March 2024


`},title:{type:"string",description:`The title of the article. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article/title)


Last Updated: 5th March 2024


`},url:{type:"string",description:`The relative URL of the article. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article/url)


Last Updated: 5th March 2024


`},template_suffix:{type:"string",description:`The name of the [custom template](https://shopify.dev/themes/architecture/templates#alternate-templates) assigned to the article. The name doesn't include the \`article.\` prefix, or the file extension (\`.json\` or \`.liquid\`).

 If a custom template isn't assigned to the article, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article/template_suffix)


Last Updated: 5th March 2024


`},created_at:{type:"string",description:`A timestamp for when the article was created. 

**Tip**

> Use the [\`date\` filter](https://shopify.dev/docs/api/liquid/filters/date) to format the timestamp.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article/created_at)


Last Updated: 5th March 2024


`},published_at:{type:"string",description:`A timestamp for when the article was published. 

**Tip**

> Use the [\`date\` filter](https://shopify.dev/docs/api/liquid/filters/date) to format the timestamp.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article/published_at)


Last Updated: 5th March 2024


`},updated_at:{type:"string",description:`A timestamp for when the article was updated. 

**Tip**

> Use the [\`date\` filter](https://shopify.dev/docs/api/liquid/filters/date) to format the timestamp.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article/updated_at)


Last Updated: 5th March 2024


`},"moderated?":{type:"boolean",description:`Returns \`true\` if the blog that the article belongs to is set to [moderate comments](https://help.shopify.com/manual/online-store/blogs/managing-comments).
Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article/moderated?)


Last Updated: 5th March 2024


`},comments:{type:"array",description:`The published comments for the article. Returns an empty array if comments are disabled.



**Tip**

> Use the [paginate](https://shopify.dev/docs/api/liquid/tags/paginate) tag to choose how many comments to show at once, up to a limit of 50.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article/comments)


Last Updated: 5th March 2024


`,scope:"comment"},comments_count:{type:"number",description:`The number of published comments for the article. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article/comments_count)


Last Updated: 5th March 2024


`},"comments_enabled?":{type:"boolean",description:`Returns \`true\` if comments are enabled. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article/comments_enabled?)


Last Updated: 5th March 2024


`},comment_post_url:{type:"string",description:`The relative URL where POST requests are sent when creating new comments. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article/comment_post_url)


Last Updated: 5th March 2024


`},content:{type:"string",description:`The content of the article. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article/content)


Last Updated: 5th March 2024


`},excerpt:{type:"string",description:`The excerpt of the article. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article/excerpt)


Last Updated: 5th March 2024


`},excerpt_or_content:{type:"string",description:`Returns the article [excerpt](https://shopify.dev/docs/api/liquid/objects/article#article-excerpt) if it exists. Returns the article
[content](https://shopify.dev/docs/api/liquid/objects/article#article-content) if no excerpt exists. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article/excerpt_or_content)


Last Updated: 5th March 2024


`},tags:{type:"array",description:`The tags applied to the article. 



#### Show the total tag count

When looping through \`article.tags\`, you can print how many times a tag is used with \`tag.total_count\`. This number shows visitors how many blog posts have been tagged with a particular tag.


\`\`\`liquid

{% for tag in article.tags -%}
  {{ tag }} ({{ tag.total_count }})
{%- endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article/tags)


Last Updated: 5th March 2024


`},user:{type:"object",description:`The user associated with the author of the article. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/article/user)


Last Updated: 5th March 2024


`,scope:"user"}}},block:{summary:"The content and settings of a [section block](/themes/architecture/sections/section-schema#blocks).",description:`The content and settings of a [section block](https://shopify.dev/themes/architecture/sections/section-schema#blocks). Sections and blocks are reusable modules of content that make up [templates](https://shopify.dev/themes/architecture/templates).

You can include a maxiumum of 50 blocks in a section. To learn more about using blocks, refer to the [Building with sections and blocks](https://shopify.dev/docs/themes/best-practices/templates-sections-blocks).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/block)


Last Updated: 5th March 2024


`,type:"object",properties:{id:{type:"string",description:`The ID of the block. The ID is dynamically generated by Shopify.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/block/id)


Last Updated: 5th March 2024


`},settings:{type:"any",description:`The [settings](https://shopify.dev/themes/architecture/sections/section-schema#blocks) of the block. To learn about how to access settings, refer to [Access settings](https://shopify.dev/themes/architecture/settings#access-settings). To learn which input settings can be applied to the \`type\` property within settings, refer to [Input settings](/themes/architecture/settings/input-settings).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/block/settings)


Last Updated: 5th March 2024


`},type:{type:"string",description:`The type of the block. The type is a free-form string that's defined in the [block's schema](https://shopify.dev/themes/architecture/sections/section-schema#blocks).
You can use the type as an identifier. For example, you might display different markup based on the block type.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/block/type)


Last Updated: 5th March 2024


`},shopify_attributes:{type:"string",description:`The data attributes for the block for use in the theme editor. The theme editor's [JavaScript API](https://shopify.dev/themes/architecture/sections/integrate-sections-with-the-theme-editor#section-and-block-javascript-events)
uses the data attributes to identify blocks and listen for events. No value for \`block.shopify_attributes\` is returned
outside the theme editor.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/block/shopify_attributes)


Last Updated: 5th March 2024


`}}},blogs:{summary:"All of the blogs in the store.",global:!0,description:`All of the blogs in the store. 



#### Example

You can use \`blogs\` to access a blog by its [handle](/docs/api/liquid/basics#handles).


\`\`\`liquid

{% for article in blogs.potion-notions.articles %}
  {{- article.title | link_to: article.url }}
{% endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/blogs)


Last Updated: 5th March 2024


`,type:"array",scope:"blog"},blog:{summary:"Information about a specific [blog](https://help.shopify.com/manual/online-store/blogs/adding-a-blog) in the store.",template:["blog","article"],description:`Information about a specific [blog](https://help.shopify.com/manual/online-store/blogs/adding-a-blog) in the store. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/blog)


Last Updated: 5th March 2024


`,type:"object",properties:{id:{type:"number",description:`The ID of the blog. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/blog/id)


Last Updated: 5th March 2024


`},title:{type:"string",description:`The title of the blog. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/blog/title)


Last Updated: 5th March 2024


`},handle:{type:"string",description:`The [handle](https://shopify.dev/docs/api/liquid/basics#handles) of the blog. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/blog/handle)


Last Updated: 5th March 2024


`},articles:{type:"array",description:`The articles in the blog. 

**Tip**

> Use the [paginate](https://shopify.dev/docs/api/liquid/tags/paginate) tag to choose how many articles to show per page, up to a limit of 50.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/blog/articles)


Last Updated: 5th March 2024


`,scope:"article"},articles_count:{type:"number",description:`The total number of articles in the blog. This total doesn't include hidden articles. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/blog/articles_count)


Last Updated: 5th March 2024


`},metafields:{type:"array",description:`The [metafields](https://shopify.dev/docs/api/liquid/objects/metafield) applied to the blog. 

**Tip**

> To learn about how to create metafields, refer to [Create and manage metafields](https://shopify.dev/apps/metafields/manage) or visit
> the [Shopify Help Center](https://help.shopify.com/manual/metafields).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/blog/metafields)


Last Updated: 5th March 2024


`,scope:"metafield"},url:{type:"string",description:`The relative URL of the blog. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/blog/url)


Last Updated: 5th March 2024


`},template_suffix:{type:"string",description:`The name of the [custom template](https://shopify.dev/themes/architecture/templates#alternate-templates) assigned to the blog. The name doesn't include the \`blog.\` prefix, or the file extension (\`.json\` or \`.liquid\`).

 If a custom template isn't assigned to the blog, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/blog/template_suffix)


Last Updated: 5th March 2024


`},all_tags:{type:"array",description:`All of the tags on the articles in the blog. This includes tags of articles that aren't in the current pagination view.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/blog/all_tags)


Last Updated: 5th March 2024


`},tags:{type:"array",description:`A list of all of the tags on all of the articles in the blog.

Unlike [\`blog.all_tags\`](https://shopify.dev/docs/api/liquid/objects/blog#blog-all_tags), this property only returns tags of articles that are in the
filtered view. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/blog/tags)


Last Updated: 5th March 2024


`},"comments_enabled?":{type:"boolean",description:`Returns \`true\` if comments are enabled for the blog. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/blog/comments_enabled?)


Last Updated: 5th March 2024


`},"moderated?":{type:"boolean",description:`Returns \`true\` if the blog is set to
[moderate comments](https://help.shopify.com/manual/online-store/blogs/managing-comments). Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/blog/moderated?)


Last Updated: 5th March 2024


`},next_article:{type:"object",description:`The next (older) article in the blog. Returns \`nil\` if there is no next article.

This property can be used on the [article page](https://shopify.dev/themes/architecture/templates/article) to output \`next\` links.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/blog/next_article)


Last Updated: 5th March 2024


`,scope:"article"},previous_article:{type:"object",description:`The previous (newer) article in the blog. Returns \`nil\` if there is no previous article.

This property can be used on the [article page](https://shopify.dev/themes/architecture/templates/article) to output \`previous\` links.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/blog/previous_article)


Last Updated: 5th March 2024


`,scope:"article"}}},brand:{summary:"The [brand assets](https://help.shopify.com/manual/promoting-marketing/managing-brand-assets) for the store.",description:`The [brand assets](https://help.shopify.com/manual/promoting-marketing/managing-brand-assets) for the store. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/brand)


Last Updated: 5th March 2024


`,type:"object",properties:{slogan:{type:"string",description:`The slogan for the brand. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/brand/slogan)


Last Updated: 5th March 2024


`},short_description:{type:"string",description:`A short description of the brand. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/brand/short_description)


Last Updated: 5th March 2024


`},favicon_url:{type:"object",description:`The square logo for the brand, resized to 32x32 px. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/brand/favicon_url)


Last Updated: 5th March 2024


`,scope:"image"},cover_image:{type:"object",description:`The square logo for the brand, resized to 32x32 px. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/brand/cover_image)


Last Updated: 5th March 2024


`,scope:"image"},logo:{type:"object",description:`The default logo for the brand. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/brand/logo)


Last Updated: 5th March 2024


`,scope:"image"},square_logo:{type:"object",description:`The square logo for the brand. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/brand/square_logo)


Last Updated: 5th March 2024


`,scope:"image"},colors:{type:22,description:`The brand's colors. To learn about how to access brand colors, refer to [\`brand_color\`](https://shopify.dev/docs/api/liquid/objects/brand_color).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/brand/colors)


Last Updated: 5th March 2024


`},metafields:{type:22,description:`The social links for the brand. Social links are stored in [metafields](https://shopify.dev/docs/api/liquid/objects/metafield), and can be accessed using the syntax \`shop.brand.metafields.social_links.<platform>.value\`.

| Platforms |
| --- |
| \`facebook\` |
| \`pinterest\` |
| \`instagram\` |
| \`tiktok\` |
| \`tumblr\` |
| \`snapchat\` |
| \`vimeo\` |

#### Access social links

\`\`\`liquid

{{ shop.brand.metafields.social_links.twitter.value }}
{{ shop.brand.metafields.social_links.youtube.value }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/brand/metafields)


Last Updated: 5th March 2024


`}}},cart:{summary:"A customer\u2019s cart.",global:!0,template:["cart"],description:`A customer\u2019s cart. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart)


Last Updated: 5th March 2024


`,type:"object",properties:{requires_shipping:{type:"boolean",description:`Returns \`true\` if any of the products in the cart require shipping. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart/requires_shipping)


Last Updated: 5th March 2024


`},note:{type:"string",description:`Additional information captured with the cart. To learn more about capturing cart notes, refer to the [\`cart\` template](https://shopify.dev/themes/architecture/templates/cart#support-cart-notes-and-attributes).

#### Capture cart notes

To capture a cart note, include an HTML input such as a \`<textarea>\` with an attribute of \`name="note"\` within the cart \`<form>\`.

\`\`\`liquid
<label>Gift note:</label>
<textarea name="note"></textarea>
\`\`\`

> Note:
> There can only be one instance of \`{{ cart.note }}\` on the cart page. If there are multiple instances,
> then the one that comes latest in the Document Object Model (DOM) will be submitted with the form.


---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart/note)


Last Updated: 5th March 2024


`},item_count:{type:"number",description:`The number of items in the cart. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart/item_count)


Last Updated: 5th March 2024


`},total_price:{type:"number",description:`The total price of all of the items in the cart in the currency's subunit, after discounts have been applied. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart/total_price)


Last Updated: 5th March 2024


`},checkout_charge_amount:{type:"number",description:`The amount that the customer will be charged at checkout in the currency's subunit. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart/checkout_charge_amount)


Last Updated: 5th March 2024


`},original_total_price:{type:"number",description:`The total price of all of the items in the cart in the currency's subunit, before discounts have been applied. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart/original_total_price)


Last Updated: 5th March 2024


`},items_subtotal_price:{type:"number",description:`The total price of all of the items in the cart in the currency's subunit, after any line item discounts. This
doesn't include taxes (unless taxes are included in the prices), cart discounts, or shipping costs. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart/items_subtotal_price)


Last Updated: 5th March 2024


`},total_discount:{type:"number",description:`The total amount of all discounts (the amount saved) for the cart in the currency's subunit. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart/total_discount)


Last Updated: 5th March 2024


`},items:{type:"array",description:`The line items in the cart. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart/items)


Last Updated: 5th March 2024


`,scope:"line_item"},"empty?":{type:"boolean",description:`Returns \`true\` if there are no items in the cart. Return's \`false\` if there are. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart/empty?)


Last Updated: 5th March 2024


`},currency:{type:22,description:`The currency of the cart. If the store uses multi-currency, then this is the same as the customer's local
(presentment) currency. Otherwise, it's the same as the store currency.



**Tip**

> You can output the store's available currencies using [\`shop.enabled_currencies\`](https://shopify.dev/docs/api/liquid/objects/shop#shop-enabled_currencies).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart/currency)


Last Updated: 5th March 2024


`},total_weight:{type:"number",description:`The total weight of all of the items in the cart in grams. 

**Tip**

> Use the [\`weight_with_unit\`](https://shopify.dev/docs/api/liquid/filters/weight_with_unit) filter to format the weight in
> [the store's format](https://www.shopify.com/admin/settings/general), or override the default unit.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart/total_weight)


Last Updated: 5th March 2024


`},discount_applications:{type:"array",description:`The discount applications for the cart. 



#### Display discount applications

\`\`\`liquid

{% for discount_application in cart.discount_applications %}
  Discount name: {{ discount_application.title }}
  Savings: -{{ discount_application.total_allocated_amount | money }}
{% endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart/discount_applications)


Last Updated: 5th March 2024


`,scope:"discount_application"},attributes:{type:"any",description:`Additional attributes entered by the customer with the cart. To learn more about capturing cart attributes, refer to the [\`cart\` template](https://shopify.dev/themes/architecture/templates/cart#support-cart-notes-and-attributes).

#### Capture cart attributes

To capture a cart attribute, include an HTML input with an attribute of \`name="attributes[attribute-name]"\` within the cart \`<form>\`.

\`\`\`liquid
<label>What do you want engraved on your cauldron?</label>
<input type="text" name="attributes[cauldron-engraving]" value="{{ cart.attributes.cauldron-engraving }}" />
\`\`\`

> Tip:
> You can add a double underscore \`__\` prefix to an attribute name to make it private. Private attributes behave like other cart attributes, except that they can't be read from Liquid or the Ajax API.
> You can use them for data that doesn't affect the page rendering, which allows for more effective page caching.


---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart/attributes)


Last Updated: 5th March 2024


`},cart_level_discount_applications:{type:"array",description:`The cart-specific discount applications for the cart. 



#### Display cart-level discount applications

\`\`\`liquid

{% for discount_application in cart.cart_level_discount_applications %}
  Discount name: {{ discount_application.title }}
  Savings: -{{ discount_application.total_allocated_amount | money }}
{% endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart/cart_level_discount_applications)


Last Updated: 5th March 2024


`,scope:"discount_application"},discounts:{type:"array",description:`\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F

Deprecated because not all discount types and details are available.

The \`cart.discounts\` property has been replaced by [\`cart.discount_applications\`](/docs/api/liquid/objects/cart#cart-discount_applications).

---

The discounts applied to the cart. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart/discounts)


Last Updated: 5th March 2024


`,scope:"discount"},taxes_included:{type:"boolean",description:`Returns \`true\` if taxes are included in the prices of products in the cart. Returns \`false\` if not. This can be set in a store\u2019s [tax settings](https://www.shopify.com/admin/settings/taxes).

If the store includes or exclude tax [based on the customer\u2019s country](https://help.shopify.com/manual/taxes/location#include-or-exclude-tax-based-on-your-customers-country),
then the value reflects the tax requirements of the customer\u2019s country.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart/taxes_included)


Last Updated: 5th March 2024


`},duties_included:{type:"boolean",description:`Returns \`true\` if duties are included in the prices of products in the cart. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/cart/duties_included)


Last Updated: 5th March 2024


`}}},collection:{summary:"A [collection](https://help.shopify.com/manual/products/collections) in a store.",template:["collection"],description:`A [collection](https://help.shopify.com/manual/products/collections) in a store. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection)


Last Updated: 5th March 2024


`,type:"object",properties:{metafields:{type:"array",description:`The [metafields](https://shopify.dev/docs/api/liquid/objects/metafield) applied to the collection. 

**Tip**

> To learn about how to create metafields, refer to [Create and manage metafields](https://shopify.dev/apps/metafields/manage) or visit
> the [Shopify Help Center](https://help.shopify.com/manual/metafields).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection/metafields)


Last Updated: 5th March 2024


`,scope:"metafield"},id:{type:"number",description:`The ID of the collection. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection/id)


Last Updated: 5th March 2024


`},handle:{type:"string",description:`The [handle](https://shopify.dev/docs/api/liquid/basics#handles) of the collection. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection/handle)


Last Updated: 5th March 2024


`},title:{type:"string",description:`The title of the collection. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection/title)


Last Updated: 5th March 2024


`},description:{type:"string",description:`The description of the collection. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection/description)


Last Updated: 5th March 2024


`},template_suffix:{type:"string",description:`The name of the [custom template](https://shopify.dev/themes/architecture/templates#alternate-templates) assigned to the collection. The name doesn't include the \`collection.\` prefix, or the file extension (\`.json\` or \`.liquid\`).

 If a custom template isn't assigned to the collection, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection/template_suffix)


Last Updated: 5th March 2024


`},current_vendor:{type:"string",description:`The vendor name on a vendor collection page. You can query for products from a certain vendor at the \`/collections/vendors\` URL
with a query parameter in the format of \`?q=[vendor]\`, where \`[vendor]\` is your desired product vendor.



**Tip**

> The query value is case-insensitive, so \`apparelco\` is equivalent to \`ApparelCo\` or \`APPARELCO\`.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection/current_vendor)


Last Updated: 5th March 2024


`},current_type:{type:"string",description:`The product type on a product type collection page. You can query for products of a certain type at the \`/collections/types\` URL
with a query parameter in the format of \`?q=[type]\`, where \`[type]\` is your desired product type.



**Tip**

> The query value is case-insensitive, so \`shirts\` is equivalent to \`Shirts\` or \`SHIRTS\`.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection/current_type)


Last Updated: 5th March 2024


`},url:{type:"string",description:`The relative URL of the collection. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection/url)


Last Updated: 5th March 2024


`},published_at:{type:"string",description:`A timestamp for when the collection was published. 

**Tip**

> Use the [\`date\` filter](https://shopify.dev/docs/api/liquid/filters/date) to format the timestamp.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection/published_at)


Last Updated: 5th March 2024


`},image:{type:"object",description:`The image for the collection. This image is added on the collection's page in the Shopify admin.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection/image)


Last Updated: 5th March 2024


`,scope:"image"},sort_options:{type:"array",description:`The available sorting options for the collection. 



#### Output the sort options

\`\`\`liquid

{%- assign sort_by = collection.sort_by | default: collection.default_sort_by -%}

<select>
{%- for option in collection.sort_options %}
  <option
    value="{{ option.value }}"
    {%- if option.value == sort_by %}
      selected="selected"
    {%- endif %}
  >
    {{ option.name }}
  </option>
{% endfor -%}
</select>

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection/sort_options)


Last Updated: 5th March 2024


`,scope:"sort_option"},sort_by:{type:"string",description:`The sort order applied to the collection by the \`sort_by\` URL parameter. If there's no \`sort_by\` URL parameter, then the value is \`nil\`.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection/sort_by)


Last Updated: 5th March 2024


`},default_sort_by:{type:"string",description:`The default sort order of the collection. This is set on the collection's page in the Shopify admin.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection/default_sort_by)


Last Updated: 5th March 2024


`,literal:["manual","best-selling","title-ascending","price-ascending","price-descending","created-ascending","created-descending"]},next_product:{type:"object",description:`The next product in the collection. Returns \`nil\` if there's no next product. This property can be used on the [product page](https://shopify.dev/themes/architecture/templates/product) to output \`next\` links.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection/next_product)


Last Updated: 5th March 2024


`,scope:"product"},previous_product:{type:"object",description:`The previous product in the collection. Returns \`nil\` if there's no previous product. This property can be used on the [product page](https://shopify.dev/themes/architecture/templates/product) to output \`previous\` links.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection/previous_product)


Last Updated: 5th March 2024


`,scope:"product"},products_count:{type:"number",description:`The total number of products in the current view of the collection. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection/products_count)


Last Updated: 5th March 2024


`},products:{type:"array",description:`All of the products in the collection. 

**Tip**

> Use the [paginate](https://shopify.dev/docs/api/liquid/tags/paginate) tag to choose how many products to show per page, up to a limit of 50.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection/products)


Last Updated: 5th March 2024


`,scope:"product"},all_products_count:{type:"number",description:`The total number of products in a collection. This includes products that have been filtered out of the current view.



**Tip**

> To display the number of products in a filtered collection, use [\`collection.products_count\`](https://shopify.dev/docs/api/liquid/objects/collection#collection-products_count).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection/all_products_count)


Last Updated: 5th March 2024


`},all_tags:{type:"array",description:`All of the tags applied to the products in the collection. This includes tags for products that have been filtered out of the current view.
A maximum of 1,000 tags can be returned.



**Tip**

> To display the tags that are currently applied, use [\`collection.tags\`](https://shopify.dev/docs/api/liquid/objects/collection#collection-tags).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection/all_tags)


Last Updated: 5th March 2024


`},tags:{type:"array",description:`The tags that are currently applied to the collection. This doesn't include tags for products that have been filtered out of the current view.
Returns \`nil\` if no tags have been applied, or all products with tags have been filtered out of the current view.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection/tags)


Last Updated: 5th March 2024


`},all_types:{type:"array",description:`All of the product types in a collection. 



#### Create links to product types

Use the [\`link_to_type\`](/docs/api/liquid/filters/link_to_type) filter to create links to the product types in a collection.


\`\`\`liquid

{% for product_type in collection.all_types -%}
  {{- product_type | link_to_type }}
{%- endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection/all_types)


Last Updated: 5th March 2024


`},all_vendors:{type:"array",description:`All of the product vendors in a collection. 



#### Create links to vendors

Use the [\`link_to_vendor\`](/docs/api/liquid/filters/link_to_vendor) filter to create links to the vendors in a collection.


\`\`\`liquid

{% for product_vendor in collection.all_vendors %}
  {{- product_vendor | link_to_vendor }}
{% endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection/all_vendors)


Last Updated: 5th March 2024


`},filters:{type:"array",description:`The [storefront filters](https://help.shopify.com/manual/online-store/themes/customizing-themes/storefront-filters) that
have been set up on the collection. Only filters relevant to the current collection are returned. Filters will be empty for collections that contain over 5000 products.

To learn about supporting filters in your theme, refer to [Support storefront filtering](https://shopify.dev/themes/navigation-search/filtering/storefront-filtering/support-storefront-filtering).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection/filters)


Last Updated: 5th March 2024


`,scope:"filter"},featured_image:{type:"object",description:`The featured image for the collection. The default is the [collection image](https://shopify.dev/docs/api/liquid/objects/collection#collection-image). If this image isn't available, then
Shopify falls back to the featured image of the first product in the collection. If the first product in the collection
doesn't have a featured image, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/collection/featured_image)


Last Updated: 5th March 2024


`,scope:"image"}}},brand_color:{summary:"The colors defined as part of a store's [brand assets](https://help.shopify.com/manual/promoting-marketing/managing-brand-assets).",description:`The colors defined as part of a store's [brand assets](https://help.shopify.com/manual/promoting-marketing/managing-brand-assets). 



#### Example

To access a brand color, specify the following:
- The brand color group: either \`primary\` or \`secondary\`
- The color role: Whether the color is a \`background\` or \`foreground\` (contrasting) color
- The 0-based index of the color within the group and role


\`\`\`liquid

{{ shop.brand.colors.primary[0].background }}
{{ shop.brand.colors.primary[0].foreground }}
{{ shop.brand.colors.secondary[0].background }}
{{ shop.brand.colors.secondary[1].background }}
{{ shop.brand.colors.secondary[0].foreground }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/brand_color)


Last Updated: 5th March 2024


`,type:"string",const:!0},color:{summary:"A color from a [`color` setting](/themes/architecture/settings/input-settings#color).",description:`A color from a [\`color\` setting](https://shopify.dev/themes/architecture/settings/input-settings#color). 

**Tip**

> Use [color filters](https://shopify.dev/docs/api/liquid/filters/color-filters) to modify or extract properties of a \`color\` object.

#### Referencing color settings directly

When a color setting is referenced directly, the hexidecimal color code is returned.


\`\`\`liquid

{{ settings.colors_accent_2 }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/color)


Last Updated: 5th March 2024


`,type:"object",properties:{red:{type:"number",description:`The red component of the color, which is a number between 0 and 255. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/color/red)


Last Updated: 5th March 2024


`},green:{type:"number",description:`The green component of the color, which is a number between 0 and 255. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/color/green)


Last Updated: 5th March 2024


`},blue:{type:"number",description:`The blue component of the color, which is a number between 0 and 255. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/color/blue)


Last Updated: 5th March 2024


`},rgb:{type:"string",description:`The red, green, and blue values of the color, represented as a space-separated string. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/color/rgb)


Last Updated: 5th March 2024


`},rgba:{type:"string",description:`The red, green, blue, and alpha values of the color, represented as a
space-separated string, with a slash before the alpha channel. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/color/rgba)


Last Updated: 5th March 2024


`},hue:{type:"number",description:`The hue component of the color, which is a number between 0 and 360. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/color/hue)


Last Updated: 5th March 2024


`},saturation:{type:"number",description:`The saturation component of the color, which is a number between 0 and 100. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/color/saturation)


Last Updated: 5th March 2024


`},lightness:{type:"number",description:`The lightness component of the color, which is a number between 0 and 100. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/color/lightness)


Last Updated: 5th March 2024


`},alpha:{type:"number",description:`The alpha component of the color, which is a decimal number between 0.0 and 1.0. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/color/alpha)


Last Updated: 5th March 2024


`}}},color_scheme:{summary:"A color_scheme from a [`color_scheme` setting](/themes/architecture/settings/input-settings#color_scheme).",description:`A color_scheme from a [\`color_scheme\` setting](https://shopify.dev/themes/architecture/settings/input-settings#color_scheme). 

**Tip**

> To learn about color scheme groups in themes, refer to [\`color_scheme_group\` setting](https://shopify.dev/themes/architecture/settings/input-settings#color_scheme_group).

#### Referencing color_scheme settings directly

When a color_scheme setting is referenced directly, the color scheme ID is returned.


\`\`\`liquid

{{ settings.card_color_scheme }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/color_scheme)


Last Updated: 5th March 2024


`,type:"object",properties:{id:{type:"string",description:`The ID of the color_scheme 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/color_scheme/id)


Last Updated: 5th March 2024


`},settings:{type:"any",description:`The [settings](https://shopify.dev/docs/themes/architecture/settings/input-settings#color_scheme_group) of the color_scheme. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/color_scheme/settings)


Last Updated: 5th March 2024


`}}},color_scheme_group:{summary:"A color_scheme_group from a [`color_scheme_group` setting](/themes/architecture/settings/input-settings#color_scheme_group).",description:`A color_scheme_group from a [\`color_scheme_group\` setting](https://shopify.dev/themes/architecture/settings/input-settings#color_scheme_group). 

**Tip**

> To learn about color schemes in themes, refer to [\`color_scheme\` setting](https://shopify.dev/themes/architecture/settings/input-settings#color_scheme).

#### Referencing color_scheme_group settings directly

\`\`\`liquid

{% for scheme in settings.color_schemes %}
  .color-{{ scheme.id }} {
    --color-background: {{ scheme.settings.background }};
    --color-text: {{ scheme.settings.text }};
  }
{% endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/color_scheme_group)


Last Updated: 5th March 2024


`,const:!0},company_address:{summary:"The address of a company location.",description:`The address of a company location. To learn about B2B in themes, refer to [Support B2B customers in your theme](https://shopify.dev/themes/pricing-payments/b2b).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_address)


Last Updated: 5th March 2024


`,type:"object",properties:{attention:{type:"string",description:`The attention line of the address. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_address/attention)


Last Updated: 5th March 2024


`},id:{type:"number",description:`The ID of the address. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_address/id)


Last Updated: 5th March 2024


`},address1:{type:"string",description:`The first line of the address. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_address/address1)


Last Updated: 5th March 2024


`},address2:{type:"string",description:`The second line of the address. If no second line is specified, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_address/address2)


Last Updated: 5th March 2024


`},first_name:{type:"string",description:`The first name of the address. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_address/first_name)


Last Updated: 5th March 2024


`},last_name:{type:"string",description:`The last name of the address. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_address/last_name)


Last Updated: 5th March 2024


`},city:{type:"string",description:`The city of the address. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_address/city)


Last Updated: 5th March 2024


`},zip:{type:"string",description:`The zip or postal code of the address. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_address/zip)


Last Updated: 5th March 2024


`},country_code:{type:"string",description:`The country of the address in [ISO 3166-1 (alpha 2) format](https://www.iso.org/glossary-for-iso-3166.html). 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_address/country_code)


Last Updated: 5th March 2024


`},province_code:{type:"string",description:`The province of the address in [ISO 3166-2 (alpha 2) format](https://www.iso.org/glossary-for-iso-3166.html). 

**Note**

> The value doesn't include the preceding [ISO 3166-1](https://www.iso.org/glossary-for-iso-3166.html) country code.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_address/province_code)


Last Updated: 5th March 2024


`},country:{type:"object",description:`The country of the address. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_address/country)


Last Updated: 5th March 2024


`,scope:"country"},street:{type:"string",description:`A combination of the first and second lines of the address. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_address/street)


Last Updated: 5th March 2024


`},province:{type:"string",description:`The province of the address. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_address/province)


Last Updated: 5th March 2024


`}}},company:{summary:"A company that a [customer](/docs/api/liquid/objects/customer) is purchasing for.",description:`A company that a [customer](https://shopify.dev/docs/api/liquid/objects/customer) is purchasing for. To learn about B2B in themes, refer to [Support B2B customers in your theme](https://shopify.dev/themes/pricing-payments/b2b).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company)


Last Updated: 5th March 2024


`,type:"object",properties:{id:{type:"number",description:`The ID of the company. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company/id)


Last Updated: 5th March 2024


`},name:{type:"string",description:`The name of the company. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company/name)


Last Updated: 5th March 2024


`},available_locations:{type:"array",description:`The company locations that the current customer has access to, or can interact with. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company/available_locations)


Last Updated: 5th March 2024


`,scope:"company_location"},metafields:{type:"array",description:`The [metafields](https://shopify.dev/docs/api/liquid/objects/metafield) applied to the company. 

**Tip**

> To learn about how to create metafields, refer to [Create and manage metafields](https://shopify.dev/apps/metafields/manage) or visit
> the [Shopify Help Center](https://help.shopify.com/manual/metafields).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company/metafields)


Last Updated: 5th March 2024


`,scope:"metafield"}}},company_location:{summary:"A location of the [company](/docs/api/liquid/objects/company) that a [customer](/docs/api/liquid/objects/customer) is purchasing for.",description:`A location of the [company](https://shopify.dev/docs/api/liquid/objects/company) that a [customer](https://shopify.dev/docs/api/liquid/objects/customer) is purchasing for. To learn about B2B in themes, refer to [Support B2B customers in your theme](https://shopify.dev/themes/pricing-payments/b2b).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_location)


Last Updated: 5th March 2024


`,type:"object",properties:{id:{type:"number",description:`The ID of the location. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_location/id)


Last Updated: 5th March 2024


`},name:{type:"string",description:`The name of the location. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_location/name)


Last Updated: 5th March 2024


`},url_to_set_as_current:{type:"string",description:`The URL to set the location as the current location for the customer. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_location/url_to_set_as_current)


Last Updated: 5th March 2024


`},"current?":{type:"boolean",description:`Returns \`true\` if the location is currently selected. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_location/current?)


Last Updated: 5th March 2024


`},company:{type:"object",description:`The company that the location is associated with. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_location/company)


Last Updated: 5th March 2024


`,scope:"company"},shipping_address:{type:"object",description:`The address of the location. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_location/shipping_address)


Last Updated: 5th March 2024


`,scope:"company_address"},tax_registration_id:{type:"number",description:`The tax ID of the location. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_location/tax_registration_id)


Last Updated: 5th March 2024


`},metafields:{type:"array",description:`The [metafields](https://shopify.dev/docs/api/liquid/objects/metafield) applied to the company location. 

**Tip**

> To learn about how to create metafields, refer to [Create and manage metafields](https://shopify.dev/apps/metafields/manage) or visit
> the [Shopify Help Center](https://help.shopify.com/manual/metafields).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/company_location/metafields)


Last Updated: 5th March 2024


`,scope:"metafield"}}},content_for_header:{summary:"Dynamically returns all scripts required by Shopify.",global:!0,description:`Dynamically returns all scripts required by Shopify. Include the \`content_for_header\` object in your [layout files](https://shopify.dev/themes/architecture/layouts) between the \`<head>\` and
\`</head>\` HTML tags.

You shouldn't try to modify or parse the \`content_for_header\` object because the contents are subject to change, which can
change the behaviour of your code.



**Note**

> The \`content_for_header\` object is required in \`theme.liquid\`.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/content_for_header)


Last Updated: 5th March 2024


`,const:!0},country:{summary:"A country supported by the store's localization options.",description:`A country supported by the store's localization options. To learn how to use the \`country\` object to offer localization options in your theme,
refer to [Support multiple currencies and languages](https://shopify.dev/themes/internationalization/multiple-currencies-languages).

#### Referencing the \`country\` object directly

When the country object is referenced directly, \`country.name\` is returned.


\`\`\`liquid

{% for country in localization.available_countries -%}
  {{ country }}
{%- endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/country)


Last Updated: 5th March 2024


`,type:"object",properties:{name:{type:"string",description:`The name of the country. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/country/name)


Last Updated: 5th March 2024


`},iso_code:{type:"string",description:`The ISO code of the country in [ISO 3166-1 (alpha 2) format](https://www.iso.org/glossary-for-iso-3166.html). 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/country/iso_code)


Last Updated: 5th March 2024


`},unit_system:{type:"string",description:`The unit system of the country. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/country/unit_system)


Last Updated: 5th March 2024


`,literal:["imperial","metric"]},currency:{type:"object",description:`The currency used in the country. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/country/currency)


Last Updated: 5th March 2024


`,scope:"currency"},market:{type:"object",description:`The market that includes this country. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/country/market)


Last Updated: 5th March 2024


`,scope:"market"},"popular?":{type:"boolean",description:`Returns \`true\` if the country is popular for this shop. Otherwise, returns \`false\`.
This can be useful for sorting countries in a country selector. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/country/popular?)


Last Updated: 5th March 2024


`},continent:{type:"string",description:"The continent that the country is in. Possible values are `Africa`, `Asia`, `Central America`, `Europe`, `North America`, `Oceania`, and `South America`.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/country/continent)\n\n\nLast Updated: 5th March 2024\n\n\n"},available_languages:{type:"array",description:`The languages that have been added to the market that this country belongs to. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/country/available_languages)


Last Updated: 5th March 2024


`,scope:"shop_locale"}}},currency:{summary:"Information about a currency, like the ISO code and symbol.",description:`Information about a currency, like the ISO code and symbol. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/currency)


Last Updated: 5th March 2024


`,type:"object",properties:{iso_code:{type:"string",description:`The [ISO code](https://www.iso.org/iso-4217-currency-codes.html) of the currency. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/currency/iso_code)


Last Updated: 5th March 2024


`},symbol:{type:"string",description:`The symbol of the currency. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/currency/symbol)


Last Updated: 5th March 2024


`},name:{type:"string",description:`The name of the currency. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/currency/name)


Last Updated: 5th March 2024


`}}},customer:{summary:"A [customer](https://help.shopify.com/manual/customers) of the store.",global:!0,template:["customers/account","customers/addresses","customers/order"],description:`A [customer](https://help.shopify.com/manual/customers) of the store. The \`customer\` object is directly accessible globally when a customer is logged in to their account. It's also defined in
the following contexts:

- The [\`customers/account\` template](https://shopify.dev/themes/architecture/templates/customers-account)
- The [\`customers/addresses\` template](https://shopify.dev/themes/architecture/templates/customers-addresses)
- The [\`customers/order\` template](https://shopify.dev/themes/architecture/templates/customers-order)
- When accessing [\`checkout.customer\`](https://shopify.dev/docs/api/liquid/objects/checkout#checkout-customer)
- When accessing [\`gift_card.customer\`](https://shopify.dev/docs/api/liquid/objects/gift_card#gift_card-customer)
- When accessing [\`order.customer\`](https://shopify.dev/docs/api/liquid/objects/order#order-customer)

Outside of the above contexts, if the customer isn't logged into their account, the \`customer\` object returns \`nil\`.

#### Check whether the \`customer\` object is defined

When using the \`customer\` object outside of customer-specific templates or objects that specifically return a customer, you should check whether the \`customer\` object is defined.


\`\`\`liquid

{% if customer %}
  Hello, {{ customer.first_name }}!
{% endif %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer)


Last Updated: 5th March 2024


`,type:"object",properties:{first_name:{type:"string",description:`The first name of the customer. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer/first_name)


Last Updated: 5th March 2024


`},last_name:{type:"string",description:`The last name of the customer. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer/last_name)


Last Updated: 5th March 2024


`},orders_count:{type:"number",description:`The total number of orders that the customer has placed. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer/orders_count)


Last Updated: 5th March 2024


`},total_spent:{type:"number",description:`The total amount that the customer has spent on all orders in the currency's subunit. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer/total_spent)


Last Updated: 5th March 2024


`},orders:{type:"array",description:`All of the orders placed by the customer. 

**Tip**

> Use the [paginate](https://shopify.dev/docs/api/liquid/tags/paginate) tag to choose how many orders to show at once, up to a limit of 20.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer/orders)


Last Updated: 5th March 2024


`,scope:"order"},last_order:{type:"object",description:`The last order placed by the customer, not including test orders. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer/last_order)


Last Updated: 5th March 2024


`,scope:"order"},name:{type:"string",description:`The full name of the customer. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer/name)


Last Updated: 5th March 2024


`},email:{type:"string",description:`The email of the customer. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer/email)


Last Updated: 5th March 2024


`},phone:{type:"string",description:`The phone number of the customer. This phone number is only populated if the customer checks out using a phone number during checkout, opts in to SMS
notifications, or if the merchant has manually entered it.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer/phone)


Last Updated: 5th March 2024


`},has_account:{type:"boolean",description:`Returns \`true\` if the email associated with the customer is tied to a
[customer account](https://help.shopify.com/manual/customers/customer-accounts). Returns \`false\` if not. A customer can complete a checkout without making an account with the store. If the customer
doesn't have an account with the store, then \`customer.has_account\` is \`false\` at checkout.

During the checkout process, if the customer has an account with the store and enters an email associated
with an account, then \`customer.has_account\` is \`true\`. The email is associated with the account regardless
of whether the customer has logged into their account.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer/has_account)


Last Updated: 5th March 2024


`},accepts_marketing:{type:"boolean",description:`Returns \`true\` if the customer accepts marketing. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer/accepts_marketing)


Last Updated: 5th March 2024


`},id:{type:"number",description:`The ID of the customer. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer/id)


Last Updated: 5th March 2024


`},tags:{type:"array",description:`The tags associated with the customer. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer/tags)


Last Updated: 5th March 2024


`},default_address:{type:"object",description:`The default address of the customer. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer/default_address)


Last Updated: 5th March 2024


`,scope:"address"},addresses:{type:"array",description:`All of the addresses associated with the customer. 

**Tip**

> Use the [paginate](https://shopify.dev/docs/api/liquid/tags/paginate) tag to choose how many addresses to show at once, up to a limit of 20.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer/addresses)


Last Updated: 5th March 2024


`,scope:"address"},addresses_count:{type:"number",description:`The number of addresses associated with the customer. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer/addresses_count)


Last Updated: 5th March 2024


`},tax_exempt:{type:"boolean",description:`Returns \`true\` if the customer is exempt from taxes. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer/tax_exempt)


Last Updated: 5th March 2024


`},"b2b?":{type:"boolean",description:`Returns \`true\` if the customer is a B2B customer. Returns \`false\` if not. To learn about B2B in themes, refer to [Support B2B customers in your theme](https://shopify.dev/themes/pricing-payments/b2b).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer/b2b?)


Last Updated: 5th March 2024


`},company_available_locations:{type:"array",description:`The company locations that the customer has access to, or can interact with. To learn about B2B in themes, refer to [Support B2B customers in your theme](https://shopify.dev/themes/pricing-payments/b2b).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer/company_available_locations)


Last Updated: 5th March 2024


`,scope:"company_location"},current_location:{type:"object",description:`The currently selected company location. To learn about B2B in themes, refer to [Support B2B customers in your theme](https://shopify.dev/themes/pricing-payments/b2b).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer/current_location)


Last Updated: 5th March 2024


`,scope:"company_location"},current_company:{type:"object",description:`The company that the customer is purchasing for. To learn about B2B in themes, refer to [Support B2B customers in your theme](https://shopify.dev/themes/pricing-payments/b2b).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/customer/current_company)


Last Updated: 5th March 2024


`,scope:"company"}}},discount_allocation:{summary:"Information about how a discount affects an item.",description:`Information about how a discount affects an item. To learn about how to display discounts in your theme, refer to [Discounts](https://shopify.dev/themes/pricing-payments/discounts).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount_allocation)


Last Updated: 5th March 2024


`,type:"object",properties:{discount_application:{type:"object",description:`The discount application that applies the discount to the item. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount_allocation/discount_application)


Last Updated: 5th March 2024


`,scope:"discount_application"},amount:{type:"number",description:`The amount that the item is discounted by in the currency's subunit. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount_allocation/amount)


Last Updated: 5th March 2024


`}}},discount_application:{summary:"Information about the intent of a discount.",description:`Information about the intent of a discount. To learn about how to display discounts in your theme, refer to [Discounts](https://shopify.dev/themes/pricing-payments/discounts).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount_application)


Last Updated: 5th March 2024


`,type:"object",properties:{total_allocated_amount:{type:"number",description:`The total amount of the discount in the currency's subunit. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount_application/total_allocated_amount)


Last Updated: 5th March 2024


`},title:{type:"string",description:`The customer-facing name of the discount. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount_application/title)


Last Updated: 5th March 2024


`},value:{type:"number",description:`The value of the discount. How this value is interpreted depends on the [value type](https://shopify.dev/docs/api/liquid/objects/discount_application#discount_application-value_type) of the
discount. The following table outlines what the value represents for each value type:

| Value type | Value |
| --- | --- |
| \`fixed_amount\` | The amount of the discount in the currency's subunit. |
| \`percentage\` | The percent amount of the discount. |

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount_application/value)


Last Updated: 5th March 2024


`},target_selection:{type:"string",description:`The selection method for line items or shipping lines to be discounted. 

**Note**

> Whether the selection method applies to line items or shipping lines depends on the discount's
> [target type](https://shopify.dev/docs/api/liquid/objects/discount_application#discount_application-target_type).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount_application/target_selection)


Last Updated: 5th March 2024


`,literal:["all","entitled","explicit"]},type:{type:"string",description:`The type of the discount. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount_application/type)


Last Updated: 5th March 2024


`,literal:["automatic","discount_code","manual","script"]},value_type:{type:"string",description:`The value type of the discount. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount_application/value_type)


Last Updated: 5th March 2024


`,literal:["fixed_amount","percentage"]},target_type:{type:"string",description:`The type of item that the discount applies to. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/discount_application/target_type)


Last Updated: 5th March 2024


`,literal:["line_item","shipping_line"]}}},external_video:{summary:"Information about an external video from YouTube or Vimeo.",description:`Information about an external video from YouTube or Vimeo. 

**Tip**

> Use the [\`external_video_tag\` filter](https://shopify.dev/docs/api/liquid/filters/external_video_tag) to output the video in an
> HTML \`<iframe>\` tag. Use the [\`external_video_url\` filter](https://shopify.dev/docs/api/liquid/filters/external_video_url) to specify parameters
> for the external video player.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/external_video)


Last Updated: 5th March 2024


`,type:"object",properties:{external_id:{type:"string",description:`The ID of the video from its external source. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/external_video/external_id)


Last Updated: 5th March 2024


`},aspect_ratio:{type:"number",description:`The aspect ratio of the video as a decimal. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/external_video/aspect_ratio)


Last Updated: 5th March 2024


`},host:{type:"string",description:`The service that hosts the video. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/external_video/host)


Last Updated: 5th March 2024


`,literal:["youtube","vimeo"]},alt:{type:"string",description:`The alt text of the external video. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/external_video/alt)


Last Updated: 5th March 2024


`},id:{type:"number",description:`The ID of the external video. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/external_video/id)


Last Updated: 5th March 2024


`},media_type:{type:"string",description:`The media type of the external video. Always returns \`external_video\`. 



#### Filter for media of a specific type

You can use the \`media_type\` property with the [\`where\` filter](/docs/api/liquid/filters/where) to filter the [\`product.media\` array](/docs/api/liquid/objects/product#product-media) for all media of a desired type.


\`\`\`liquid

{% assign external_videos = product.media | where: 'media_type', 'external_video' %}

{% for external_video in external_videos %}
  {{- external_video | external_video_tag }}
{% endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/external_video/media_type)


Last Updated: 5th March 2024


`},position:{type:"number",description:`The position of the external video in the [\`product.media\`](https://shopify.dev/docs/api/liquid/objects/product#product-media) array. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/external_video/position)


Last Updated: 5th March 2024


`},preview_image:{type:"object",description:`A preview image of the media. 

**Note**

> Preview images don't have an ID attribute.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/external_video/preview_image)


Last Updated: 5th March 2024


`,scope:"image"}}},filter:{summary:"A [storefront filter](https://help.shopify.com/manual/online-store/themes/customizing-themes/storefront-filters).",description:`A [storefront filter](https://help.shopify.com/manual/online-store/themes/customizing-themes/storefront-filters). To learn about supporting filters in your theme, refer to [Support storefront filtering](https://shopify.dev/themes/navigation-search/filtering/storefront-filtering/support-storefront-filtering).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter)


Last Updated: 5th March 2024


`,type:"object",properties:{param_name:{type:"string",description:`The URL parameter for the filter. For example, \`filter.v.option.color\`. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter/param_name)


Last Updated: 5th March 2024


`},label:{type:"string",description:`The customer-facing label for the filter. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter/label)


Last Updated: 5th March 2024


`},operator:{type:"string",description:"The logical operator used by the filter.\nReturns a value only for `boolean` and `list` type filters. Returns `nil` for other types. Example:\nFor a filter named `color` with values `red` and `blue`:\n  - If the operator is `AND`, it will filter items that are both red and blue.\n  - If the operator is `OR`, it will filter items that are either red or blue or both.\n\nFilters that support the `AND` operator:\n  - Product tags\n  - Metafields of type `list.single_line_text_field` and `list.metaobject_reference`\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter/operator)\n\n\nLast Updated: 5th March 2024\n\n\n",literal:["AND","OR"]},type:{type:"string",description:`The type of the filter. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter/type)


Last Updated: 5th March 2024


`,literal:["boolean","list","price_range"]},active_values:{type:"array",description:`The values of the filter that are currently active.

The array can have values only for \`boolean\` and \`list\` type filters. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter/active_values)


Last Updated: 5th March 2024


`,scope:"filter_value"},inactive_values:{type:"array",description:`The values of the filter that are currently inactive. The array can have values only for \`boolean\` and \`list\` type filters.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter/inactive_values)


Last Updated: 5th March 2024


`,scope:"filter_value"},values:{type:"array",description:`The values of the filter.

The array can have values only for \`boolean\` and \`list\` type filters. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter/values)


Last Updated: 5th March 2024


`,scope:"filter_value"},false_value:{type:"object",description:`The \`false\` filter value.

Returns a value for \`boolean\` type filters if the unfiltered view has at least one result with the \`false\` filter value. Otherwise, it returns \`nil\`. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter/false_value)


Last Updated: 5th March 2024


`,scope:"filter_value"},true_value:{type:"object",description:`The \`true\` filter value.

Returns a value for \`boolean\` type filters if the unfiltered view has at least one result with the \`true\` filter value. Otherwise, it returns \`nil\`. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter/true_value)


Last Updated: 5th March 2024


`,scope:"filter_value"},max_value:{type:"object",description:`The highest filter value.

Returns a value only for \`price_range\` type filters. Returns \`nil\` for other types. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter/max_value)


Last Updated: 5th March 2024


`,scope:"filter_value"},min_value:{type:"object",description:`The lowest filter value.

Returns a value only for \`price_range\` type filters. Returns \`nil\` for other types. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter/min_value)


Last Updated: 5th March 2024


`,scope:"filter_value"},range_max:{type:"number",description:`The highest product price within the collection or search results.

Returns a value only for \`price_range\` type filters. Returns \`nil\` for other types. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter/range_max)


Last Updated: 5th March 2024


`},url_to_remove:{type:"string",description:`The current page URL with the URL parameter related to the filter removed. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter/url_to_remove)


Last Updated: 5th March 2024


`},presentation:{type:"string",description:`Describes how to present the filter values.

Returns a value only for \`list\` type filters. Returns \`nil\` for other types. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter/presentation)


Last Updated: 5th March 2024


`,literal:["swatch","text"]}}},filter_value_display:{summary:"The visual representation of a filter value.",deprecated:!0,description:`\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F

Deprecated in favor of the [swatch](/docs/api/liquid/objects/swatch) drop.

---

The visual representation of a filter value. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter_value_display)


Last Updated: 5th March 2024


`,type:"object",properties:{type:{type:"string",description:`The type of visual representation. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter_value_display/type)


Last Updated: 5th March 2024


`,deprecated:!0,literal:["colors","image"]},value:{type:"any",description:`The visual representation. Can be a list of [\`colors\`](https://shopify.dev/docs/api/liquid/objects/color) or an [\`image\`](https://shopify.dev/docs/api/liquid/objects/image).
Refer to the [\`type\`](#filter_value_display-type) property to determine the type of visual representation.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter_value_display/value)


Last Updated: 5th March 2024


`,deprecated:!0}}},filter_value:{summary:"A specific value of a filter.",description:`A specific value of a filter. To learn about supporting filters in your theme, refer to [Support storefront filtering](https://shopify.dev/themes/navigation-search/filtering/storefront-filtering/support-storefront-filtering).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter_value)


Last Updated: 5th March 2024


`,type:"object",properties:{param_name:{type:"string",description:`The URL parameter for the parent filter of the filter value. For example, \`filter.v.option.color\`.

Filters of type \`price_range\` include an extra component depending on whether the filter value is for the filter's
\`min_value\` or \`max_value\`. The following table outlines the URL parameter for each:

| Value type | URL parameter |
| --- | --- |
| \`min_value\` | \`filter.v.price.gte\` |
| \`max_value\` | \`filter.v.price.lte\` |

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter_value/param_name)


Last Updated: 5th March 2024


`},value:{type:"string",description:`The value for the URL parameter. The \`value\` is paired with the [\`param_name\`](#filter_value-param_name) property. For example, \`High\` will be used in the URL as \`filter.v.option.strength=High\`.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter_value/value)


Last Updated: 5th March 2024


`},active:{type:"boolean",description:`Returns \`true\` if the value is currently active. Returns \`false\` if not.

Can only return \`true\` for filters of type \`boolean\` or \`list\`. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter_value/active)


Last Updated: 5th March 2024


`},count:{type:"number",description:`The number of results related to the filter value.

Returns a value only for \`boolean\` and \`list\` type filters. Returns \`nil\` for \`price_range\` type filters. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter_value/count)


Last Updated: 5th March 2024


`},label:{type:"string",description:`The customer-facing label for the filter value. For example, \`Red\` or \`Rouge\`.

Returns a value only for \`boolean\` and \`list\` type filters. Returns \`nil\` for \`price_range\` type filters. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter_value/label)


Last Updated: 5th March 2024


`},url_to_add:{type:"string",description:`The current page URL with the filter value parameter added. 

**Note**

> Any [pagination](https://shopify.dev/docs/api/liquid/tags/paginate) URL parameters are removed.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter_value/url_to_add)


Last Updated: 5th March 2024


`},url_to_remove:{type:"string",description:`The current page URL with the filter value parameter removed. 

**Note**

> Any [pagination](https://shopify.dev/docs/api/liquid/tags/paginate) URL parameters are also removed.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter_value/url_to_remove)


Last Updated: 5th March 2024


`},display:{type:"object",description:`\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F

Deprecated in favor of the [swatch](#swatch) attribute.

---

The visual representation of the filter value. Returns a visual representation for the filter value.
If no visual representation is available, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter_value/display)


Last Updated: 5th March 2024


`,scope:"filter_value_display"},swatch:{type:"object",description:`The visual representation of the filter value when a swatch is used. Returns a [swatch](https://shopify.dev/docs/api/liquid/objects/swatch) drop for the filter value.
Requires the [filter presentation](https://shopify.dev/docs/api/liquid/objects/filter#filter-presentation) to be \`swatch\` and saved color or image content for the swatch. Otherwise, returns \`nil\`.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/filter_value/swatch)


Last Updated: 5th March 2024


`,scope:"swatch"}}},focal_point:{summary:"The focal point for an image.",description:`The focal point for an image. The focal point will remain visible when the image is cropped by the
theme. [Learn more about supporting focal points in your theme](https://shopify.dev/themes/architecture/settings/input-settings#image-focal-points).



**Tip**

> Use the [\`image_tag\`](https://shopify.dev/docs/api/liquid/filters/image_tag) filter to automatically apply focal point settings to an
> image on the storefront. This applies the focal point using the \`object-position\` CSS property.

#### Referencing the \`focal_point\` object directly

When a \`focal_point\` object is referenced directly, the coordinates are returned as a string, in the format \`X% Y%\`.


\`\`\`liquid

{{ images['potions-header.png'].presentation.focal_point }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/focal_point)


Last Updated: 5th March 2024


`,type:"object",properties:{x:{type:"number",description:`The horizontal position of the focal point, as a percent of the image width. Returns \`50\` if no focal point is set. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/focal_point/x)


Last Updated: 5th March 2024


`},y:{type:"number",description:`The vertical position of the focal point, as a percent of the image height. Returns \`50\` if no focal point is set. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/focal_point/y)


Last Updated: 5th March 2024


`}}},font:{summary:"A font from a [`font_picker` setting](/themes/architecture/settings/input-settings#font_picker).",description:`A font from a [\`font_picker\` setting](https://shopify.dev/themes/architecture/settings/input-settings#font_picker). You can use the \`font\` object in Liquid [assets](https://shopify.dev/themes/architecture#assets) or inside a [\`style\` tag](https://shopify.dev/docs/api/liquid/tags/style)
to apply font setting values to theme CSS.



**Tip**

> Use [font filters](https://shopify.dev/docs/api/liquid/filters/font-filters) to modify properties of the \`font\` object, load the font,
> or obtain font variants.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/font)


Last Updated: 5th March 2024


`,type:"object",properties:{family:{type:"string",description:`The family name of the font. 

**Tip**

> If the family name contains non-alphanumeric characters (A-Z, a-z, 0-9, or '-'), then it will be wrapped in double quotes.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/font/family)


Last Updated: 5th March 2024


`},fallback_families:{type:"string",description:`The fallback families of the font. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/font/fallback_families)


Last Updated: 5th March 2024


`},baseline_ratio:{type:"number",description:`The baseline ratio of the font as a decimal. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/font/baseline_ratio)


Last Updated: 5th March 2024


`},weight:{type:"number",description:`The weight of the font. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/font/weight)


Last Updated: 5th March 2024


`},style:{type:"string",description:`The style of the font. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/font/style)


Last Updated: 5th March 2024


`},variants:{type:"array",description:`The variants in the family of the font. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/font/variants)


Last Updated: 5th March 2024


`,scope:"font"},"system?":{type:"boolean",description:`Returns \`true\` if the font is a system font. Returns \`false\` if not. 

**Tip**

> You can use this property to determine whether you need to include a corresponding [font-face](https://shopify.dev/docs/api/liquid/filters/font_face)
> declaration for the font.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/font/system?)


Last Updated: 5th March 2024


`}}},form:{summary:"Information about a form created by a [`form` tag](/docs/api/liquid/tags/form).",description:`Information about a form created by a [\`form\` tag](https://shopify.dev/docs/api/liquid/tags/form). 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form)


Last Updated: 5th March 2024


`,type:"object",properties:{errors:{type:"object",description:`Any errors from the form. If there are no errors, then \`nil\` is returned.



**Tip**

> You can apply the [\`default_errors\` filter](https://shopify.dev/docs/api/liquid/filters/default_errors) to \`form.errors\` to output default
> error messages without having to loop through the array.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form/errors)


Last Updated: 5th March 2024


`,scope:"form_errors"},address1:{type:"string",description:`The first address line associated with the address. This property is exclusive to the [\`customer_address\` form](https://shopify.dev/docs/api/liquid/tags/form#form-customer_address).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form/address1)


Last Updated: 5th March 2024


`},address2:{type:"string",description:`The second address line associated with the address. This property is exclusive to the [\`customer_address\` form](https://shopify.dev/docs/api/liquid/tags/form#form-customer_address).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form/address2)


Last Updated: 5th March 2024


`},author:{type:"string",description:`The name of the author of the article comment. This property is exclusive to the [\`new_comment\` form](https://shopify.dev/docs/api/liquid/tags/form#form-new_comment).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form/author)


Last Updated: 5th March 2024


`},body:{type:"string",description:`The content of the contact submission or article comment. This property is exclusive to the [\`contact\`](https://shopify.dev/docs/api/liquid/tags/form#form-contact) and [\`new_comment\`](https://shopify.dev/docs/api/liquid/tags/form#form-new_comment)
forms.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form/body)


Last Updated: 5th March 2024


`},city:{type:"string",description:`The city associated with the address. This property is exclusive to the [\`customer_address\` form](https://shopify.dev/docs/api/liquid/tags/form#form-customer_address).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form/city)


Last Updated: 5th March 2024


`},company:{type:"string",description:`The company associated with the address. This property is exclusive to the [\`customer_address\` form](https://shopify.dev/docs/api/liquid/tags/form#form-customer_address).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form/company)


Last Updated: 5th March 2024


`},country:{type:"string",description:`The country associated with the address. This property is exclusive to the [\`customer_address\` form](https://shopify.dev/docs/api/liquid/tags/form#form-customer_address).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form/country)


Last Updated: 5th March 2024


`},email:{type:"string",description:`The email associated with the form. This property is exclusive to the following forms:

- [\`contact\`](https://shopify.dev/docs/api/liquid/tags/form#form-contact)
- [\`create_customer\`](https://shopify.dev/docs/api/liquid/tags/form#form-create_customer)
- [\`customer\`](https://shopify.dev/docs/api/liquid/tags/form#form-customer)
- [\`customer_login\`](https://shopify.dev/docs/api/liquid/tags/form#form-customer_login)
- [\`new_comment\`](https://shopify.dev/docs/api/liquid/tags/form#form-new_comment)
- [\`recover_customer_password\`](https://shopify.dev/docs/api/liquid/tags/form#form-recover_customer_password)
- [\`product\`](https://shopify.dev/docs/api/liquid/tags/form#form-product)

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form/email)


Last Updated: 5th March 2024


`},first_name:{type:"string",description:`The first name associated with the customer or address. This property is exclusive to the [\`create_customer\`](https://shopify.dev/docs/api/liquid/tags/form#form-create_customer) and
[\`customer_address\`](https://shopify.dev/docs/api/liquid/tags/form#form-customer_address) forms.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form/first_name)


Last Updated: 5th March 2024


`},id:{type:"string",description:`The ID of the form. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form/id)


Last Updated: 5th March 2024


`},last_name:{type:"string",description:`The last name associated with the customer or address. This property is exclusive to the [\`create_customer\`](https://shopify.dev/docs/api/liquid/tags/form#form-create_customer) and
[\`customer_address\`](https://shopify.dev/docs/api/liquid/tags/form#form-customer_address) forms.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form/last_name)


Last Updated: 5th March 2024


`},password_needed:{type:"boolean",description:`Returns \`true\`. This property is exclusive to the [\`customer_login\` form](https://shopify.dev/docs/api/liquid/tags/form#form-customer_login).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form/password_needed)


Last Updated: 5th March 2024


`},phone:{type:"string",description:`The phone number associated with the address. This property is exclusive to the [\`customer_address\` form](https://shopify.dev/docs/api/liquid/tags/form#form-customer_address).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form/phone)


Last Updated: 5th March 2024


`},"posted_successfully?":{type:"boolean",description:`Returns \`true\` if the form was submitted successfully. Returns \`false\` if there were errors. 

**Note**

> The [\`customer_address\` form](https://shopify.dev/docs/api/liquid/tags/form#form-customer_address) always returns \`true\`.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form/posted_successfully?)


Last Updated: 5th March 2024


`},province:{type:"string",description:`The province associated with the address. This property is exclusive to the [\`customer_address\` form](https://shopify.dev/docs/api/liquid/tags/form#form-customer_address).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form/province)


Last Updated: 5th March 2024


`},set_as_default_checkbox:{type:"string",description:`Renders an HTML checkbox that can submit the address as the customer's default address. This property is exclusive to the [\`customer_address\` form](https://shopify.dev/docs/api/liquid/tags/form#form-customer_address).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form/set_as_default_checkbox)


Last Updated: 5th March 2024


`},name:{type:"string",description:`The nickname of the gift card recipient. This property is exclusive to the [\`product\` form](https://shopify.dev/docs/api/liquid/tags/form#form-product).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form/name)


Last Updated: 5th March 2024


`},message:{type:"string",description:`The personalized message intended for the recipient. This property is exclusive to the [\`product\` form](https://shopify.dev/docs/api/liquid/tags/form#form-product).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form/message)


Last Updated: 5th March 2024


`},zip:{type:"string",description:`The zip or postal code associated with the address. This property is exclusive to the [\`customer_address\` form](https://shopify.dev/docs/api/liquid/tags/form#form-customer_address).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form/zip)


Last Updated: 5th March 2024


`}}},fulfillment:{summary:`An order [fulfillment](https://help.shopify.com/manual/orders/fulfillment), which includes information like the line items
being fulfilled and shipment tracking.`,description:`An order [fulfillment](https://help.shopify.com/manual/orders/fulfillment), which includes information like the line items
being fulfilled and shipment tracking. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/fulfillment)


Last Updated: 5th March 2024


`,type:"object",properties:{created_at:{type:"string",description:`A timestamp for when the fulfillment was created. 

**Tip**

> Use the [\`date\` filter](https://shopify.dev/docs/api/liquid/filters/date) to format the timestamp.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/fulfillment/created_at)


Last Updated: 5th March 2024


`},item_count:{type:"number",description:`The number of items in the fulfillment. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/fulfillment/item_count)


Last Updated: 5th March 2024


`},fulfillment_line_items:{type:"array",description:`The line items in the fulfillment. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/fulfillment/fulfillment_line_items)


Last Updated: 5th March 2024


`,scope:"line_item"},tracking_company:{type:"string",description:`The name of the fulfillment service. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/fulfillment/tracking_company)


Last Updated: 5th March 2024


`},tracking_numbers:{type:"array",description:`An array of the fulfillment's tracking numbers. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/fulfillment/tracking_numbers)


Last Updated: 5th March 2024


`},tracking_number:{type:"string",description:`The fulfillment's tracking number. If there's no tracking number, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/fulfillment/tracking_number)


Last Updated: 5th March 2024


`},tracking_url:{type:"string",description:`The URL for the fulfillment's tracking number. If there's no tracking number, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/fulfillment/tracking_url)


Last Updated: 5th March 2024


`}}},generic_file:{summary:"A file from a `file_reference` type [metafield](/docs/api/liquid/objects/metafield) that is neither an image or video.",description:`A file from a \`file_reference\` type [metafield](https://shopify.dev/docs/api/liquid/objects/metafield) that is neither an image or video. 

**Tip**

> To learn about metafield types, refer to [Metafield types](https://shopify.dev/apps/metafields/types).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/generic_file)


Last Updated: 5th March 2024


`,type:"object",properties:{url:{type:"string",description:`The [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for the file. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/generic_file/url)


Last Updated: 5th March 2024


`},id:{type:"number",description:`The ID of the file. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/generic_file/id)


Last Updated: 5th March 2024


`},media_type:{type:"string",description:`The media type of the model. Always returns \`generic_file\`. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/generic_file/media_type)


Last Updated: 5th March 2024


`},preview_image:{type:"object",description:`A preview image for the file. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/generic_file/preview_image)


Last Updated: 5th March 2024


`,scope:"image"},position:{type:"number",description:`The position of the media in the [\`product.media\` array](https://shopify.dev/docs/api/liquid/objects/product#product-media). If the source is a [\`file_reference\` metafield](https://shopify.dev/apps/metafields/types), then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/generic_file/position)


Last Updated: 5th March 2024


`},alt:{type:"string",description:`The alt text of the media. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/generic_file/alt)


Last Updated: 5th March 2024


`}}},gift_card:{summary:"A [gift card](https://help.shopify.com/manual/products/gift-card-products) that's been issued to a customer or a recipient.",template:["gift_card.liquid"],description:`A [gift card](https://help.shopify.com/manual/products/gift-card-products) that's been issued to a customer or a recipient. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card)


Last Updated: 5th March 2024


`,type:"object",properties:{balance:{type:"number",description:`The remaining balance of the gift card in the currency's subunit. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card/balance)


Last Updated: 5th March 2024


`},code:{type:"string",description:`The code used to redeem the gift card. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card/code)


Last Updated: 5th March 2024


`},currency:{type:"string",description:`The [ISO code](https://www.iso.org/iso-4217-currency-codes.html) of the currency that the gift card was issued in. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card/currency)


Last Updated: 5th March 2024


`},customer:{type:"object",description:`The customer associated with the gift card. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card/customer)


Last Updated: 5th March 2024


`,scope:"customer"},recipient:{type:"object",description:`The recipient associated with the gift card. If there is no recipient associated with the gift card, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card/recipient)


Last Updated: 5th March 2024


`,scope:"recipient"},message:{type:"string",description:`The personalized message intended for the recipient. If there is no message intended for the recipient, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card/message)


Last Updated: 5th March 2024


`},send_on:{type:"string",description:`The scheduled date on which the gift card will be sent to the recipient. If the gift card does not have a scheduled date, then \`nil\` is returned.


**Tip**

> Use the [\`date\` filter](https://shopify.dev/docs/api/liquid/filters/date) to format the date.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card/send_on)


Last Updated: 5th March 2024


`},enabled:{type:"boolean",description:`Returns \`true\` if the gift card is enabled. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card/enabled)


Last Updated: 5th March 2024


`},expired:{type:"boolean",description:`Returns \`true\` if the gift card is expired. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card/expired)


Last Updated: 5th March 2024


`},expires_on:{type:"string",description:`A timestamp for when the gift card expires. If the gift card never expires, then \`nil\` is returned.


**Tip**

> Use the [\`date\` filter](https://shopify.dev/docs/api/liquid/filters/date) to format the timestamp.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card/expires_on)


Last Updated: 5th March 2024


`},initial_value:{type:"number",description:`The initial balance of the gift card in the currency's subunit. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card/initial_value)


Last Updated: 5th March 2024


`},url:{type:"string",description:`The URL to view the gift card. This URL is on the \`checkout.shopify.com\` domain. 

**Tip**

> The page at this URL is rendered through the [\`gift_card.liquid\` template](https://shopify.dev/themes/architecture/templates/gift-card-liquid)
> of the theme.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card/url)


Last Updated: 5th March 2024


`},template_suffix:{type:"string",description:`The name of the [custom template](https://shopify.dev/themes/architecture/templates#alternate-templates) assigned to the gift card. The name doesn't include the \`gift_card.\` prefix, or the \`.liquid\` file extension.

 If a custom template isn't assigned to the gift card, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card/template_suffix)


Last Updated: 5th March 2024


`},properties:{type:"array",description:`The [line item properties](https://shopify.dev/docs/api/liquid/objects/line_item#line_item-properties) assigned to the gift card. If there aren't any line item properties, then an [\`EmptyDrop\`](https://shopify.dev/docs/api/liquid/basics#emptydrop) is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card/properties)


Last Updated: 5th March 2024


`,scope:"untyped"},qr_identifier:{type:"string",description:`A string used to generate a QR code for the gift card. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card/qr_identifier)


Last Updated: 5th March 2024


`},pass_url:{type:"string",description:`The URL to download the gift card as an Apple Wallet Pass. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card/pass_url)


Last Updated: 5th March 2024


`},product:{type:"object",description:`The product associated with the gift card. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card/product)


Last Updated: 5th March 2024


`,scope:"product"},last_four_characters:{type:"string",description:`The last 4 characters of the code used to redeem the gift card. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/gift_card/last_four_characters)


Last Updated: 5th March 2024


`}}},image:{summary:"An image, such as a product or collection image.",description:`An image, such as a product or collection image. To learn about the image formats that Shopify supports, visit the [Shopify Help Center](https://help.shopify.com/manual/online-store/images/theme-images#image-formats).



**Tip**

> Use the [\`image_url\`](https://shopify.dev/docs/api/liquid/filters/image_url) and [\`image_tag\`](https://shopify.dev/docs/api/liquid/filters/image_tag) filters to display
> images on the storefront.

#### Referencing the \`image\` object directly

When an \`image\` object is referenced directly, the image's relative URL path is returned.


\`\`\`liquid

{{ product.featured_image }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/image)


Last Updated: 5th March 2024


`,type:"object",scope:"image",properties:{presentation:{type:"object",description:`The presentation settings for the image. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/image/presentation)


Last Updated: 5th March 2024


`,scope:"image_presentation"},src:{type:"string",description:`The relative URL of the image. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/image/src)


Last Updated: 5th March 2024


`},width:{type:"number",description:`The width of the image in pixels. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/image/width)


Last Updated: 5th March 2024


`},height:{type:"number",description:`The height of the image in pixels. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/image/height)


Last Updated: 5th March 2024


`},aspect_ratio:{type:"number",description:`The aspect ratio of the image as a decimal. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/image/aspect_ratio)


Last Updated: 5th March 2024


`},alt:{type:"string",description:`The alt text of the image. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/image/alt)


Last Updated: 5th March 2024


`},"attached_to_variant?":{type:"boolean",description:`Returns \`true\` if the image is associated with a variant. Returns \`false\` if not. The \`attached_to_variant?\` property is only available for images accessed through the following sources:

- [\`product.featured_image\`](https://shopify.dev/docs/api/liquid/objects/product#product-featured_image)
- [\`product.images\`](https://shopify.dev/docs/api/liquid/objects/product#product-images)

If you reference this property on an image from another source, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/image/attached_to_variant?)


Last Updated: 5th March 2024


`},id:{type:"number",description:`The ID of the image. If you reference the \`id\` property for preview images of [\`generic_file\`](https://shopify.dev/docs/api/liquid/objects/generic_file) or
[\`media\`](https://shopify.dev/docs/api/liquid/objects/media) objects, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/image/id)


Last Updated: 5th March 2024


`},media_type:{type:"string",description:`The media type of the image. Always returns \`image\`. The \`media_type\` property is only available for images accessed through the following sources:

- [\`product.media\`](https://shopify.dev/docs/api/liquid/objects/product#product-media)
- [\`file_reference\` type metafields](https://shopify.dev/apps/metafields/types#supported-types)

If you reference this property on an image from another source, then \`nil\` is returned.

#### Filter for media of a specific type

You can use the \`media_type\` property with the [\`where\` filter](/docs/api/liquid/filters/where) to filter the [\`product.media\` array](/docs/api/liquid/objects/product#product-media) for all media of a desired type.


\`\`\`liquid

{% assign images = product.media | where: 'media_type', 'image' %}

{% for image in images %}
  {{- image | image_url: width: 300 | image_tag }}
{% endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/image/media_type)


Last Updated: 5th March 2024


`},position:{type:"number",description:`The position of the image in the [\`product.images\`](https://shopify.dev/docs/api/liquid/objects/product#product-images) or [\`product.media\`](https://shopify.dev/docs/api/liquid/objects/product#product-media)
array. The \`position\` property is only available for images that are associated with a product. If you reference this property
on an image from another source, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/image/position)


Last Updated: 5th March 2024


`},preview_image:{type:"object",description:`A preview image for the image. The \`preview_image\` property is only available for images accessed through the following sources:

- [\`product.featured_media\`](https://shopify.dev/docs/api/liquid/objects/product#product-featured_media)
- [\`product.media\`](https://shopify.dev/docs/api/liquid/objects/product#product-media)
- [\`file_reference\` type metafields](https://shopify.dev/apps/metafields/types#supported-types)

If you reference this property on an image from another source, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/image/preview_image)


Last Updated: 5th March 2024


`,scope:"image"},product_id:{type:"number",description:`The ID of the product that the image is associated with. The \`product_id\` property is only available for images associated with a product. If you reference this property on
an image from another source, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/image/product_id)


Last Updated: 5th March 2024


`},variants:{type:"array",description:`The product variants that the image is associated with. The \`variants\` property is only available for images accessed through the following sources:

- [\`product.featured_image\`](https://shopify.dev/docs/api/liquid/objects#product-featured_image)
- [\`product.images\`](https://shopify.dev/docs/api/liquid/objects/product#product-images)

If you reference this property on an image from another source, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/image/variants)


Last Updated: 5th March 2024


`,scope:"variant"}}},image_presentation:{summary:"The presentation settings for an image.",description:`The presentation settings for an image. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/image_presentation)


Last Updated: 5th March 2024


`,type:"object",properties:{focal_point:{type:"object",description:`The focal point for the image. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/image_presentation/focal_point)


Last Updated: 5th March 2024


`,scope:"focal_point"}}},images:{summary:`All of the [images](/docs/api/liquid/objects/image) that have been [uploaded](https://help.shopify.com/manual/online-store/images/theme-images#upload-images)
to a store.`,global:!0,description:`All of the [images](https://shopify.dev/docs/api/liquid/objects/image) that have been [uploaded](https://help.shopify.com/manual/online-store/images/theme-images#upload-images)
to a store. 



#### Example

You can access images from the \`images\` array by their filename.


\`\`\`liquid

{{ images['potions-header.png'] | image_url: width: 300 | image_tag }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/images)


Last Updated: 5th March 2024


`,type:"array",scope:"image"},line_item:{summary:"A line in a cart, checkout, or order. Each line item represents a product variant.",description:`A line in a cart, checkout, or order. Each line item represents a product variant. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item)


Last Updated: 5th March 2024


`,type:"object",properties:{id:{type:"number",description:`The ID of the line item. The ID differs depending on the context. The following table outlines the possible contexts and their associated values:

| Context | Value |
| --- | --- |
| [\`cart.items\`](https://shopify.dev/docs/api/liquid/objects/cart#cart-items) | The ID of the line item's variant.<br><br>This ID isn't unique, and can be shared by multiple items with the same variant. |
| [\`checkout.line_items\`](https://shopify.dev/docs/api/liquid/objects/checkout#checkout-line_items) | A temporary unique hash generated for the checkout. |
| [\`order.line_items\`](https://shopify.dev/docs/api/liquid/objects/order#order-line_items) | A unique integer ID. |

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/id)


Last Updated: 5th March 2024


`},quantity:{type:"number",description:`The quantity of the line item. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/quantity)


Last Updated: 5th March 2024


`},price:{type:"number",description:`\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F

Deprecated because discounts from automatic discounts and discount codes aren't included.

The \`line_item.price\` property has been replaced by [\`line_item.final_price\`](/docs/api/liquid/objects/line_item#line_item-final_price).

---

The price of the line item in the currency's subunit. This includes any discounts from [Shopify Scripts](https://help.shopify.com/manual/checkout-settings/script-editor). The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/price)


Last Updated: 5th March 2024


`},line_price:{type:"number",description:`\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F

Deprecated because discounts from automatic discounts and discount codes aren't included.

The \`line_item.line_price\` property has been replaced by [\`line_item.final_line_price\`](/docs/api/liquid/objects/line_item#line_item-final_line_price).

---

The combined price, in the currency's subunit, of all of the items in a line item. This includes any discounts from [Shopify Scripts](https://help.shopify.com/manual/checkout-settings/script-editor). The value is equal to \`line_item.price\` multiplied by \`line_item.quantity\`. It's output in the customer's local
(presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/line_price)


Last Updated: 5th March 2024


`},total_discount:{type:"number",description:`\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F

Deprecated because discounts from automatic discounts and discount codes aren't included.

The \`line_item.total_discount\` property has been replaced by [\`line_item.line_level_total_discount\`](/docs/api/liquid/objects/line_item#line_item-line_level_total_discount).

---

The total amount, in the currency's subunit, of any discounts applied to the line item by [Shopify Scripts](https://help.shopify.com/manual/checkout-settings/script-editor). The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/total_discount)


Last Updated: 5th March 2024


`},discount_allocations:{type:"array",description:`The discount allocations that apply to the line item.

> Caution:
> Not applicable for item component as discounts are applied to the parent line item.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/discount_allocations)


Last Updated: 5th March 2024


`,scope:"discount_allocation"},final_price:{type:"number",description:`The price of the line item in the currency's subunit. This includes any line-level discounts. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/final_price)


Last Updated: 5th March 2024


`},final_line_price:{type:"number",description:`The combined price, in the currency's subunit, of all of the items in the line item. This includes any line-level discounts. The value is equal to \`line_item.final_price\` multiplied by \`line_item.quantity\`. It's output in the customer's local
(presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/final_line_price)


Last Updated: 5th March 2024


`},variant_id:{type:"number",description:`The [ID](https://shopify.dev/docs/api/liquid/objects/variant#variant-id) of the line item's variant. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/variant_id)


Last Updated: 5th March 2024


`},product_id:{type:"number",description:`The [ID](https://shopify.dev/docs/api/liquid/objects/product#product-id) of the line item's product. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/product_id)


Last Updated: 5th March 2024


`},product:{type:"object",description:`The product associated with the line item. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/product)


Last Updated: 5th March 2024


`,scope:"product"},variant:{type:"object",description:`The variant associated with the line item. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/variant)


Last Updated: 5th March 2024


`,scope:"variant"},tax_lines:{type:"array",description:`The tax lines for the line item. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/tax_lines)


Last Updated: 5th March 2024


`,scope:"tax_line"},fulfillment:{type:"object",description:`The fulfillment of the line item. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/fulfillment)


Last Updated: 5th March 2024


`,scope:"fulfillment"},successfully_fulfilled_quantity:{type:"number",description:`The number of items from the line item that have been successfully fulfilled. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/successfully_fulfilled_quantity)


Last Updated: 5th March 2024


`},fulfillment_service:{type:"string",description:`The [fulfillment service](https://help.shopify.com/manual/shipping/understanding-shipping/dropshipping-and-fulfillment-services)
for the vartiant associated with the line item. If there's no fulfillment service, then \`manual\` is returned. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/fulfillment_service)


Last Updated: 5th March 2024


`},properties:{type:"array",description:`The properties of the line item. You can add, or allow customers to add, custom information to a line item with line item properties.

Line item properties consist of a name and value pair. They can be captured with the following methods:

- [A custom input inside a product form](https://shopify.dev/themes/architecture/templates/product#line-item-properties)
- [The AJAX Cart API](https://shopify.dev/api/ajax/reference/cart#add-line-item-properties)



**Tip**

> To learn about how to display captured properties, refer to [Display line item properties](https://shopify.dev/themes/architecture/templates/cart#display-line-item-properties).

#### Capture line item properties in the product form

To capture line item properties inside the [product form](/docs/api/liquid/tags/form#form-product), you need to include an input, for each property. Each  input needs a unique \`name\` attribute. Use the following format:

\`\`\`
name="properties[property-name]"
\`\`\`

The value of the input is captured as the value of the property.

For example, you can use the following code to capture custom engraving text for a product:

\`\`\`liquid
{% form 'product', product %}
  ...
  <label for="engravingText">Engraving<label>
  <input type="text" id="engravingText" name="properties[Engraving]">
  ...
{% endform %}
\`\`\`

> Tip:
> You can add an underscore to the beginning of a property name to hide it from customers at checkout. For example,
> \`properties[_hiddenPropertyName]\`.


---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/properties)


Last Updated: 5th March 2024


`,scope:"untyped"},unit_price_measurement:{type:"object",description:`The unit price measurement of the line item. 

**Note**

> Unit prices are available only to stores located in Germany or France.

To learn about how to display unit prices in your theme, refer to [Unit pricing](https://shopify.dev/themes/pricing-payments/unit-pricing).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/unit_price_measurement)


Last Updated: 5th March 2024


`,scope:"unit_price_measurement"},unit_price:{type:"number",description:`The [unit price](https://help.shopify.com/manual/intro-to-shopify/initial-setup/sell-in-france/price-per-unit#add-unit-prices-to-your-product)
 of the line item in the currency's subunit. The price reflects any discounts that are applied to the line item. The value is output in the customer's local
(presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Note**

> Unit prices are available only to stores located in Germany and France.

To learn about how to display unit prices in your theme, refer to [Unit pricing](https://shopify.dev/themes/pricing-payments/unit-pricing).



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/unit_price)


Last Updated: 5th March 2024


`},sku:{type:"string",description:`The [sku](https://shopify.dev/docs/api/liquid/objects/variant#variant-sku) of the variant associated with the line item. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/sku)


Last Updated: 5th March 2024


`},message:{type:"string",description:`Information about the discounts that have affected the line item. The following table outlines what's returned depending on the number of discounts affecting the line item:

| Number of discounts | Value |
| --- | --- |
| 0 | \`nil\` |
| 1 | The [title](https://shopify.dev/docs/api/liquid/objects/discount_application#discount_application-title) of the discount. |
| More than 1 | A Shopify generated string noting how many discounts have been applied. |

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/message)


Last Updated: 5th March 2024


`},vendor:{type:"string",description:`The vendor of the variant associated with the line item. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/vendor)


Last Updated: 5th March 2024


`},title:{type:"string",description:`The title of the line item. The title is a combination of \`line_item.product.title\` and \`line_item.variant.title\`, separated
by a hyphen. In most contexts, the line item title appears in the customer's preferred language. However, in the context of an
[order](https://shopify.dev/docs/api/liquid/objects/order), the line item title appears in the language that the customer checked out in.

#### Line item title history

When referencing line item, product, and variant titles in the context of an order, the following changes might result
in a different output than you expect:

- A product or variant being deleted
- A product or variant title being edited

When \`line_item.title\` is referenced for an order, the line item title at the time of the order is returned.
However, when \`line_item.product.title\` and \`line_item.variant.title\` are referenced, the current value for
each title is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/title)


Last Updated: 5th March 2024


`},taxable:{type:"boolean",description:`Returns \`true\` if taxes should be charged on the line item. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/taxable)


Last Updated: 5th March 2024


`},original_price:{type:"number",description:`The price of the line item in the currency's subunit, before discounts have been applied. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/original_price)


Last Updated: 5th March 2024


`},original_line_price:{type:"number",description:`The combined price of all of the items in a line item in the currency's subunit, before any discounts have been applied. The value is equal to \`line_item.original_price\` multiplied by \`line_item.quantity\`. It's output in the customer's local
(presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/original_line_price)


Last Updated: 5th March 2024


`},line_level_total_discount:{type:"number",description:`The total amount of any discounts applied to the line item in the currency's subunit. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/line_level_total_discount)


Last Updated: 5th March 2024


`},line_level_discount_allocations:{type:"array",description:`The discount allocations that apply directly to the line item.

> Caution:
> Not applicable for item component as discounts are applied to the parent line item.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/line_level_discount_allocations)


Last Updated: 5th March 2024


`,scope:"discount_allocation"},discounts:{type:"array",description:`\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F

Deprecated because not all discount types and details are available.

The \`line_item.discounts\` property has been replaced by [\`line_item.discount_allocations\`](/docs/api/liquid/objects/line_item#line_item-discount_allocations).

---

The discounts applied to the line item. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/discounts)


Last Updated: 5th March 2024


`,scope:"discount"},gift_card:{type:"boolean",description:`Returns \`true\` if the product associated with the line item is a gift card. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/gift_card)


Last Updated: 5th March 2024


`},requires_shipping:{type:"boolean",description:`Returns \`true\` if the variant associated with the line item requires shipping. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/requires_shipping)


Last Updated: 5th March 2024


`},options_with_values:{type:"array",description:`The name and value pairs for each option of the variant associated with the line item. 

**Note**

> The array is never empty because variants with no options still have a default option. Because of this, you should use
> \`line_item.product.has_only_default_variant\` to check whether there's any information to output.

#### Output the option values

\`\`\`liquid

{% for item in cart.items %}
<div class="cart__item">
  <p class="cart__item-title">
    {{ item.title }}
  </p>

  {%- unless item.product.has_only_default_variant %}
  <ul>
    {% for option in item.options_with_values -%}
    <li>{{ option.name }}: {{ option.value }}</li>
    {%- endfor %}
  </ul>
  {% endunless %}
</div>
{% endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/options_with_values)


Last Updated: 5th March 2024


`,scope:"untyped"},key:{type:"string",description:`The key of the line item. Line item keys are unique identifiers that consist of the following components separated by a colon:

- The ID of the variant associated with the line item
- A hash of the properties of the line item, even if there are no properties

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/key)


Last Updated: 5th March 2024


`},grams:{type:"number",description:`The weight of the line item in the store's [default weight unit](https://help.shopify.com/manual/intro-to-shopify/initial-setup/setup-business-settings#set-or-change-your-stores-default-weight-unit). 

**Tip**

> Use this property with the [\`weight_with_unit\` filter](https://shopify.dev/docs/api/liquid/filters/weight_with_unit) to format the weight.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/grams)


Last Updated: 5th March 2024


`},url:{type:"string",description:`The relative URL of the variant associated with the line item. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/url)


Last Updated: 5th March 2024


`},url_to_remove:{type:"string",description:`A URL to remove the line item from the cart. 

**Tip**

> To learn more about how to use this property in your theme, refer to [Remove line items from the cart](https://shopify.dev/themes/architecture/templates/cart#remove-line-items-from-the-cart).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/url_to_remove)


Last Updated: 5th March 2024


`},image:{type:"object",description:`The image of the line item. The image can come from one of the following sources:

- The image of the variant associated with the line item
- The featured image of the product associated with the line item, if there's no variant image

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/image)


Last Updated: 5th March 2024


`,scope:"image"},selling_plan_allocation:{type:"object",description:`The selling plan allocation of the line item. If the line item doesn't have a selling plan allocation, then \`nil\` is returned. #### Availability of selling plan information

The following properties aren't available when referencing selling plan information through an
[order's line items](https://shopify.dev/docs/api/liquid/objects/order#order-line_items):

- [\`selling_plan_allocation.compare_at_price\`](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation#selling_plan_allocation-compare_at_price)
- [\`selling_plan_allocation.price_adjustments\`](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation#selling_plan_allocation-price_adjustments)
- [\`selling_plan_allocation.selling_plan.group_id\`](https://shopify.dev/docs/api/liquid/objects/selling_plan#selling_plan-group_id)
- [\`selling_plan_allocation.selling_plan.options\`](https://shopify.dev/docs/api/liquid/objects/selling_plan#selling_plan-options)
- [\`selling_plan_allocation.selling_plan.price_adjustments\`](https://shopify.dev/docs/api/liquid/objects/selling_plan#selling_plan-price_adjustments)
- [\`selling_plan_allocation.selling_plan_group_id\`](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation#selling_plan_allocation-selling_plan_group_id)



**Tip**

> If you need to show selling plan information post-purchase, then you should use [\`selling_plan.name\`](https://shopify.dev/docs/api/liquid/objects/selling_plan#selling_plan-name).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/selling_plan_allocation)


Last Updated: 5th March 2024


`,scope:"selling_plan_allocation"},item_components:{type:"array",description:`The components of a line item. 

**Note**

> This field is applicable for cart line item only.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/item_components)


Last Updated: 5th March 2024


`,scope:"line_item"},error_message:{type:"string",description:`An informational error message about the status of the line item in the buyer's chosen language. 

**Note**

This field is applicable for cart line item only and currently available for shops using Checkout Extensibility.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/line_item/error_message)


Last Updated: 5th March 2024


`}}},link:{summary:"A link in a [menu](https://help.shopify.com/manual/online-store/menus-and-links/drop-down-menus).",description:`A link in a [menu](https://help.shopify.com/manual/online-store/menus-and-links/drop-down-menus). To learn about how to implement navigation in a theme, refer to [Add navigation to your theme](https://shopify.dev/themes/navigation-search/navigation).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/link)


Last Updated: 5th March 2024


`,type:"object",properties:{active:{type:"boolean",description:`Returns \`true\` if the link is active. Returns \`false\` if not. A link is considered to be active if the current URL path matches, or contains, the link's [url](https://shopify.dev/docs/api/liquid/objects/link#link-url).
For example, if the current URL path is \`/blog/potion-notions/new-potions-for-spring\`, then the following link URLs
would be considered active:

- \`/blog/potion-notions/new-potions-for-spring\`
- \`/blog/potion-notions\`



**Tip**

> The \`link.active\` property is useful for menu designs that highlight when top-level navigation categories are being
> viewed. For example, if a customer is viewing an article from the "Potion notions" blog, then the "Potion notions" link
> is highlighted in the menu.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/link/active)


Last Updated: 5th March 2024


`},current:{type:"boolean",description:`Returns \`true\` if the current URL path matches the [URL](https://shopify.dev/docs/api/liquid/objects/link#link-url) of the link. Returns \`false\` if not. 

**Note**

> URL parameters are ignored when determining a match.
>
> Product URLs [within the context of a collection](https://shopify.dev/docs/api/liquid/filters/within) are treated as equal to a standard product
> URL for the same product.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/link/current)


Last Updated: 5th March 2024


`},child_active:{type:"boolean",description:`Returns \`true\` if a link's child link is active. Returns \`false\` if not. A link is considered to be active if the current URL path matches, or contains, the [URL](https://shopify.dev/docs/api/liquid/objects/link#link-url) of
the link.

For example, if the current URL path is \`/blog/potion-notions/new-potions-for-spring\`, then the following link URLs
would be considered active:

- \`/blog/potion-notions/new-potions-for-spring\`
- \`/blog/potion-notions\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/link/child_active)


Last Updated: 5th March 2024


`},child_current:{type:"boolean",description:`Returns \`true\` if current URL path matches a link's child link [URL](https://shopify.dev/docs/api/liquid/objects/link#link-url). Returns \`false\` if not. 

**Note**

> URL parameters are ignored when determining a match.
>
> Product URLs [within the context of a collection](https://shopify.dev/docs/api/liquid/filters/within) and standard product URLs are treated
> the same.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/link/child_current)


Last Updated: 5th March 2024


`},handle:{type:"string",description:`The [handle](https://shopify.dev/docs/api/liquid/basics#handles) of the link. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/link/handle)


Last Updated: 5th March 2024


`},links:{type:"array",description:`The child links of the link. 



#### Check the number of links

\`\`\`liquid

{% for link in linklists.main-menu.links -%}
  {% if link.links.size > 0 -%}
    - {{ link.title }} ({{ link.links.size }} children)<br>
  {%- else -%}
    - {{ link.title }}<br>
  {%- endif %}
{%- endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/link/links)


Last Updated: 5th March 2024


`,scope:"link"},object:{type:"any",description:`The object associated with the link. The object can be one of the following:

- [\`article\`](https://shopify.dev/docs/api/liquid/objects/article)
- [\`blog\`](https://shopify.dev/docs/api/liquid/objects/blog)
- [\`collection\`](https://shopify.dev/docs/api/liquid/objects/collection)
- [\`metaobject\`](docs/api/liquid/objects/metaobject)
- [\`page\`](https://shopify.dev/docs/api/liquid/objects/page)
- [\`policy\`](https://shopify.dev/docs/api/liquid/objects/policy)
- [\`product\`](https://shopify.dev/docs/api/liquid/objects/product)

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/link/object)


Last Updated: 5th March 2024


`},title:{type:"string",description:`The title of the link. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/link/title)


Last Updated: 5th March 2024


`},type:{type:"string",description:`The type of the link. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/link/type)


Last Updated: 5th March 2024


`,literal:["article_link","blog_link","catalog_link","collection_link","collections_link","frontpage_link","http_link","metaobject_link","page_link","policy_link","product_link","search_link"]},levels:{type:"number",description:`The number of nested levels under the link. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/link/levels)


Last Updated: 5th March 2024


`},url:{type:"string",description:`The URL of the link. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/link/url)


Last Updated: 5th March 2024


`}}},linklists:{summary:"All of the [menus](https://help.shopify.com/manual/online-store/menus-and-links/drop-down-menus) in a store.",global:!0,description:`All of the [menus](https://help.shopify.com/manual/online-store/menus-and-links/drop-down-menus) in a store. 



#### Example

You can access a specific menu through the \`linklists\` object using the menu's [handle](/docs/api/liquid/basics#handles).


\`\`\`liquid

<!-- Main menu -->
{% for link in linklists.main-menu.links -%}
  {{ link.title | link_to: link.url }}
{%- endfor %}

<!-- Footer menu -->
{% for link in linklists['footer'].links -%}
  {{ link.title | link_to: link.url }}
{%- endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/linklists)


Last Updated: 5th March 2024


`,type:"array",scope:"linklist"},linklist:{summary:"A [menu](https://help.shopify.com/manual/online-store/menus-and-links/drop-down-menus) in a store.",description:`A [menu](https://help.shopify.com/manual/online-store/menus-and-links/drop-down-menus) in a store. To learn about how to implement navigation in a theme, refer to [Add navigation to your theme](https://shopify.dev/themes/navigation-search/navigation).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/linklist)


Last Updated: 5th March 2024


`,type:"object",properties:{links:{type:"array",description:`The links in the menu. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/linklist/links)


Last Updated: 5th March 2024


`,scope:"link"},handle:{type:"string",description:`The [handle](https://shopify.dev/docs/api/liquid/basics#handles) of the menu. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/linklist/handle)


Last Updated: 5th March 2024


`},levels:{type:"number",description:`The number of nested levels in the menu. 

**Note**

> There's a maximum of 3 levels.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/linklist/levels)


Last Updated: 5th March 2024


`},title:{type:"string",description:`The title of the menu. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/linklist/title)


Last Updated: 5th March 2024


`}}},forloop:{summary:"Information about a parent [`for` loop](/docs/api/liquid/tags/for).",description:`Information about a parent [\`for\` loop](https://shopify.dev/docs/api/liquid/tags/for). 



#### Use the \`forloop\` object

\`\`\`liquid

{% for page in pages -%}
  {%- if forloop.length > 0 -%}
    {{ page.title }}{% unless forloop.last %}, {% endunless -%}
  {%- endif -%}
{% endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/forloop)


Last Updated: 5th March 2024


`,type:"object",properties:{length:{type:"number",description:`The total number of iterations in the loop. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/forloop/length)


Last Updated: 5th March 2024


`},parentloop:{type:"object",description:`The parent \`forloop\` object. If the current \`for\` loop isn't nested inside another \`for\` loop, then \`nil\` is returned.

#### Use the \`parentloop\` property

\`\`\`liquid

{% for i in (1..3) -%}
  {% for j in (1..3) -%}
    {{ forloop.parentloop.index }} - {{ forloop.index }}
  {%- endfor %}
{%- endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/forloop/parentloop)


Last Updated: 5th March 2024


`,scope:"forloop"},index:{type:"number",description:`The 1-based index of the current iteration. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/forloop/index)


Last Updated: 5th March 2024


`},index0:{type:"number",description:`The 0-based index of the current iteration. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/forloop/index0)


Last Updated: 5th March 2024


`},rindex:{type:"number",description:`The 1-based index of the current iteration, in reverse order. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/forloop/rindex)


Last Updated: 5th March 2024


`},rindex0:{type:"number",description:`The 0-based index of the current iteration, in reverse order. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/forloop/rindex0)


Last Updated: 5th March 2024


`},first:{type:"boolean",description:`Returns \`true\` if the current iteration is the first. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/forloop/first)


Last Updated: 5th March 2024


`},last:{type:"boolean",description:`Returns \`true\` if the current iteration is the last. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/forloop/last)


Last Updated: 5th March 2024


`}}},tablerowloop:{summary:"Information about a parent [`tablerow` loop](/docs/api/liquid/tags/tablerow).",description:`Information about a parent [\`tablerow\` loop](https://shopify.dev/docs/api/liquid/tags/tablerow). 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tablerowloop)


Last Updated: 5th March 2024


`,type:"object",properties:{length:{type:"number",description:`The total number of iterations in the loop. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tablerowloop/length)


Last Updated: 5th March 2024


`},col:{type:"number",description:`The 1-based index of the current column. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tablerowloop/col)


Last Updated: 5th March 2024


`},row:{type:"number",description:`The 1-based index of current row. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tablerowloop/row)


Last Updated: 5th March 2024


`},index:{type:"number",description:`The 1-based index of the current iteration. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tablerowloop/index)


Last Updated: 5th March 2024


`},index0:{type:"number",description:`The 0-based index of the current iteration. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tablerowloop/index0)


Last Updated: 5th March 2024


`},col0:{type:"number",description:`The 0-based index of the current column. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tablerowloop/col0)


Last Updated: 5th March 2024


`},rindex:{type:"number",description:`The 1-based index of the current iteration, in reverse order. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tablerowloop/rindex)


Last Updated: 5th March 2024


`},rindex0:{type:"number",description:`The 0-based index of the current iteration, in reverse order. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tablerowloop/rindex0)


Last Updated: 5th March 2024


`},first:{type:"boolean",description:`Returns \`true\` if the current iteration is the first. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tablerowloop/first)


Last Updated: 5th March 2024


`},last:{type:"boolean",description:`Returns \`true\` if the current iteration is the last. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tablerowloop/last)


Last Updated: 5th March 2024


`},col_first:{type:"boolean",description:`Returns \`true\` if the current column is the first in the row. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tablerowloop/col_first)


Last Updated: 5th March 2024


`},col_last:{type:"boolean",description:`Returns \`true\` if the current column is the last in the row. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tablerowloop/col_last)


Last Updated: 5th March 2024


`}}},localization:{summary:"Information about the countries and languages that are available on a store.",global:!0,description:`Information about the countries and languages that are available on a store. The \`localization\` object can be used in a [localization form](https://shopify.dev/docs/api/liquid/tags/form#form-localization).

To learn about how to offer localization options in your theme, refer to [Support multiple currencies and languages](https://shopify.dev/themes/internationalization/multiple-currencies-languages).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/localization)


Last Updated: 5th March 2024


`,type:"object",properties:{available_countries:{type:"array",description:`The countries that are available on the store. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/localization/available_countries)


Last Updated: 5th March 2024


`,scope:"country"},available_languages:{type:"array",description:`The languages that are available on the store. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/localization/available_languages)


Last Updated: 5th March 2024


`,scope:"shop_locale"},market:{type:"object",description:`The currently selected market on the storefront. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/localization/market)


Last Updated: 5th March 2024


`,scope:"market"},country:{type:"object",description:`The currently selected country on the storefront. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/localization/country)


Last Updated: 5th March 2024


`,scope:"country"},language:{type:"object",description:`The currently selected language on the storefront. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/localization/language)


Last Updated: 5th March 2024


`,scope:"shop_locale"}}},location:{summary:"A store [location](https://help.shopify.com/manual/locations).",description:`A store [location](https://help.shopify.com/manual/locations). 

**Tip**

> The \`location\` object is defined only if one or more locations has [local pickup](https://help.shopify.com/manual/shipping/setting-up-and-managing-your-shipping/local-methods/local-pickup)
> enabled.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/location)


Last Updated: 5th March 2024


`,type:"object",properties:{id:{type:"number",description:`The location's ID. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/location/id)


Last Updated: 5th March 2024


`},name:{type:"string",description:`The location's name. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/location/name)


Last Updated: 5th March 2024


`},address:{type:"object",description:`The location's address. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/location/address)


Last Updated: 5th March 2024


`,scope:"address"},latitude:{type:"number",description:`The latitude of the location's address. If the location's address isn't verified, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/location/latitude)


Last Updated: 5th March 2024


`},longitude:{type:"number",description:`The longitude of the location's address. If the location's address isn't verified, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/location/longitude)


Last Updated: 5th March 2024


`},metafields:{type:"any",description:`The [metafields](https://shopify.dev/docs/api/liquid/objects/metafield) applied to the location. 

**Tip**

> To learn about how to create metafields, refer to [Create and manage metafields](https://shopify.dev/apps/metafields/manage) or visit
> the [Shopify Help Center](https://help.shopify.com/manual/metafields).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/location/metafields)


Last Updated: 5th March 2024


`}}},market:{summary:"A group of one or more regions of the world that a merchant is targeting for sales.",description:`A group of one or more regions of the world that a merchant is targeting for sales. To learn more about markets, refer to [Shopify Markets](https://shopify.dev/docs/apps/markets).
To make sure that visitors interact with the optimal version of a store using Shopify Markets,
refer to [Detect and set a visitor's optimal localization](https://shopify.dev/docs/themes/markets/localization-discovery).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/market)


Last Updated: 5th March 2024


`,type:"object",properties:{id:{type:"string",description:`The ID of the market. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/market/id)


Last Updated: 5th March 2024


`},handle:{type:"string",description:`The [handle](https://shopify.dev/docs/api/liquid/basics#handles) of the market. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/market/handle)


Last Updated: 5th March 2024


`},metafields:{type:"array",description:`The [metafields](https://shopify.dev/docs/api/liquid/objects/metafield) applied to the market. 

**Tip**

> To learn about how to create metafields, refer to [Create and manage
> metafields](https://shopify.dev/apps/metafields/manage) or visit the [Shopify Help
> Center](https://help.shopify.com/manual/metafields).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/market/metafields)


Last Updated: 5th March 2024


`,scope:"metafield"}}},measurement:{summary:"A measurement from one of the following metafield types:\n\n- `dimension`\n- `volume`\n- `weight`",description:`A measurement from one of the following metafield types:

- \`dimension\`
- \`volume\`
- \`weight\` 

**Tip**

> To learn about metafield types, refer to [Metafield types](https://shopify.dev/apps/metafields/types).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/measurement)


Last Updated: 5th March 2024


`,type:"object",properties:{type:{type:"string",description:`The measurement type. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/measurement/type)


Last Updated: 5th March 2024


`,literal:["dimension","volume","weight"]},value:{type:"number",description:`The measurement value. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/measurement/value)


Last Updated: 5th March 2024


`},unit:{type:"string",description:`The measurement unit. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/measurement/unit)


Last Updated: 5th March 2024


`}}},metafield:{summary:"A [metafield](/apps/metafields) attached to a parent object.",description:`A [metafield](https://shopify.dev/apps/metafields) attached to a parent object. To learn about how to access a metafield on a specific object, refer to [Access metafields](https://shopify.dev/docs/api/liquid/objects/metafield#metafield-access-metafields).

Metafields support [multiple data types](https://shopify.dev/apps/metafields/types), which determine the kind of information that's stored
in the metafield. You can also output the metafield content in a type-specific format using
[metafield filters](https://shopify.dev/docs/api/liquid/filters/metafield-filters).



**Note**

> You can't create metafields in Liquid. Metafields can be created in only the following ways:
>
> - [In the Shopify admin](https://help.shopify.com/manual/metafields)
> - [Through an app](https://shopify.dev/apps/metafields)



**Note**

> Metafields of type \`integer\`, \`json_string\`, and \`string\` are older implementations that don't have the properties
  noted on this page, and aren't compatible with metafield filters. To learn more, refer to [Deprecated metafields](https://shopify.dev/docs/api/liquid/objects/metafield#metafield-deprecated-metafields).

#### Access metafields

The access path for metafields consists of two layers:

- namespace - A grouping of metafields to prevent conflicts.
- key - The metafield name.

Given this, you can access the metafield object with the following syntax:

\`\`\`liquid
{{ resource.metafields.namespace.key }}
\`\`\`


\`\`\`liquid

Type: {{ product.metafields.information.directions.type }}
Value: {{ product.metafields.information.directions.value }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/metafield)


Last Updated: 5th March 2024


`,type:"object",properties:{value:{type:"any",description:`The value of the metafield. The following table outlines the value format for each metafield type:

<table>
  <thead>
    <tr>
      <th>Type</th>
      <th>Returned format</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>single_line_text_field</code><br><br>
        <code>multi_line_text_field</code>
      </td>
      <td><a href="/docs/api/liquid/basics#string">A string</a></td>
    </tr>
    <tr>
      <td>
        <code>rich_text_field</code>
      </td>
      <td>A field that supports headings, lists, links, bold, and italics</td>
    </tr>
    <tr>
      <td>
        <code>product_reference</code>
      </td>
      <td><a href="/docs/api/liquid/objects/product">A product object</a></td>
    </tr>
    <tr>
      <td>
        <code>collection_reference</code>
      </td>
      <td><a href="/docs/api/liquid/objects/collection">A collection object</a></td>
    </tr>
    <tr>
      <td>
        <code>variant_reference</code>
      </td>
      <td><a href="/docs/api/liquid/objects/variant">A variant object</a></td>
    </tr>
    <tr>
      <td>
       <code>page_reference</code>
     </td>
     <td><a href="/docs/api/liquid/objects/page">A page object</a></td>
    </tr>
    <tr>
      <td>
        <code>file_reference</code>
     </td>
     <td>
       <a href="/docs/api/liquid/objects/generic-file">A generic_file object</a><br><br>
       <a href="/docs/api/liquid/objects/media">A media object (images and videos only)</a>
     </td>
    </tr>
    <tr>
      <td>
        <code>number_integer</code><br><br>
        <code>number_decimal</code>
      </td>
      <td><a href="/docs/api/liquid/basics#number">A number</a></td>
    </tr>
    <tr>
      <td>
        <code>date</code><br><br>
        <code>date_time</code>
      </td>
      <td>A date string. To format the string, use the <a href="/docs/api/liquid/filters/date">date</a> filter.</td>
    </tr>
    <tr>
      <td>
        <code>url_reference</code>
      </td>
      <td><a href="/docs/api/liquid/basics#string">A url string</a></td>
    </tr>
    <tr>
      <td>
        <code>json</code>
      </td>
      <td><a href="https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON">A JSON object</a></td>
    </tr>
    <tr>
      <td>
       <code>boolean</code>
      </td>
      <td><a href="/docs/api/liquid/basics#boolean">A boolean</a></td>
    <tr>
      <td>
        <code>color</code>
      </td>
      <td><a href="/docs/api/liquid/objects/color">A color object</a></td>
    </tr>
    <tr>
      <td>
        <code>weight</code><br><br>
        <code>volume</code><br><br>
        <code>dimension</code>
      </td>
      <td><a href="/docs/api/liquid/objects/measurement">A measurement object</a></td>
    </tr>
    <tr>
      <td>
        <code>rating</code>
      </td>
      <td><a href="/docs/api/liquid/objects/rating">A rating object</a></td>
    </tr>
    <tr>
      <td>
        <code>money</code>
      </td>
      <td><a href="/docs/api/liquid/objects/money">A money object, displayed in the customer's local (presentment) currency.</a></td>
    </tr>
  </tbody>
</table>

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/metafield/value)


Last Updated: 5th March 2024


`},type:{type:"string",description:`The [type](https://shopify.dev/apps/metafields/types) of the metafield. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/metafield/type)


Last Updated: 5th March 2024


`,literal:["single_line_text_field","multi_line_text_field","rich_text_field","product_reference","collection_reference","variant_reference","page_reference","file_reference","number_integer","number_decimal","date","date_time","url_reference","json","boolean","color","weight","volume","dimension","rating","money"]},"list?":{type:"boolean",description:`Returns \`true\` if the metafield is a list type. Returns \`false\` if not. 

**Tip**

> To learn about metafield types, refer to [Metafield types](https://shopify.dev/apps/metafields/types).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/metafield/list?)


Last Updated: 5th March 2024


`}}},metaobject_definition:{summary:"A `metaobject_definition` defines the structure of a metaobject type for the store, which consists of\na merchant-defined set of [field definitions](https://help.shopify.com/en/manual/metafields/metafield-definitions).",description:`A \`metaobject_definition\` defines the structure of a metaobject type for the store, which consists of
a merchant-defined set of [field definitions](https://help.shopify.com/en/manual/metafields/metafield-definitions). One or more corresponding [\`metaobject\`](https://shopify.dev/docs/api/liquid/objects#metaobject) objects contain values for
the fields specified in the metaobject definition.

#### Loop over entries of a metaobject definition

If a metaobject definition has multiple metaobject entries, then you can loop over them using the \`values\` property.
You can loop over a maximum of 50 entries in a metaobject definition.
For example, you can display the field \`author\` for each metaobject using the following \`forloop\`:

\`\`\`liquid
{% for testimonial in shop.metaobjects.testimonials.values %}
  {{ testimonial.author.value }}
{% endfor %}
\`\`\`

> Note:
> When the [\`publishable\` capability](/apps/data-extensions/metaobjects/capabilities) is enabled, loops return only metaobjects with a status of \`active\`. Metaobjects with a status of \`draft\` are skipped.


---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/metaobject_definition)


Last Updated: 5th March 2024


`,type:"object",properties:{values:{type:"array",description:`The [metaobjects](https://shopify.dev/docs/api/liquid/objects#metaobject) that follow the definition. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/metaobject_definition/values)


Last Updated: 5th March 2024


`,scope:"metaobject"},values_count:{type:"number",description:`The total number of entries for the metaobject definition. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/metaobject_definition/values_count)


Last Updated: 5th March 2024


`}}},metaobject:{summary:"A metaobject entry, which includes the values for a set of [fields](/docs/api/liquid/objects#metafield).\nThe set is defined by the parent [`metaobject_definition`](/docs/api/liquid/objects#metaobject_definition).",template:["metaobject"],description:`A metaobject entry, which includes the values for a set of [fields](https://shopify.dev/docs/api/liquid/objects#metafield).
The set is defined by the parent [\`metaobject_definition\`](https://shopify.dev/docs/api/liquid/objects#metaobject_definition). 



#### Access metaobjects individually

The access path for a metaobject consists of two layers:

- type - The type of the parent metaobject definition.
- handle - The unique [handle](/docs/api/liquid/basics#handles) of the metaobject.

Given this, you can access a metaobject with the following syntax:

\`\`\`liquid
{{ shop.metaobjects.type.handle }}
\`\`\`

You can also use square bracket notation:

\`\`\`liquid
{{ shop.metaobjects['type']['handle'] }}
\`\`\`

A metaobjects's field values can be accessed using the key of the desired field:

\`\`\`liquid
{{ shop.metaobjects.testimonials.homepage.title }}
{{ shop.metaobjects['highlights']['washable'].image.value }}
\`\`\`

> Note:
> When the [\`publishable\` capability](/apps/data-extensions/metaobjects/capabilities) is enabled, a metaobject can only be accessed if its status is \`active\`.  If its status is \`draft\`, then the return value is \`nil\`.


---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/metaobject)


Last Updated: 5th March 2024


`,type:"object",properties:{system:{type:"object",description:`Basic information about the metaobject. These properties are grouped under the \`system\` object to avoid collisions between system property names and user-defined metaobject fields. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/metaobject/system)


Last Updated: 5th March 2024


`,scope:"metaobject_system"}}},metaobject_system:{summary:"Basic information about a [`metaobject`](/api/liquid/objects#metaobject). These properties are grouped under the `system` object to avoid collisions between system property names and user-defined metaobject fields.",description:`Basic information about a [\`metaobject\`](https://shopify.dev/api/liquid/objects#metaobject). These properties are grouped under the \`system\` object to avoid collisions between system property names and user-defined metaobject fields. 



#### Using the \`metaobject_system\` object

You can access the \`metaobject_system\` object and its properties through the metaobject's \`system\` property. You can use the following syntax:

\`\`\`liquid
{{ shop.metaobjects.testimonials["home_page"].system.id }}
\`\`\`

You can also access \`metaobject_system\` properties when iterating over a list of metaobjects:

\`\`\`liquid
{% for metaobject in product.metafields.custom.mixed_metaobject_list.value %}
  {% if metaobject.system.type == "testimonial" %}
    {% render 'testimonial' with metaobject as testimonial  %}
  {% else %}
    {{ metaobject.system.handle }}
  {% endif %}
{% endfor %}
\`\`\`


---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/metaobject_system)


Last Updated: 5th March 2024


`,type:"object",properties:{type:{type:"string",description:`The type of the metaobject definition. This is a free-form string that's defined when the metaobject definition is created.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/metaobject_system/type)


Last Updated: 5th March 2024


`},handle:{type:"string",description:`The unique [handle](https://shopify.dev/api/liquid/basics#handles) of the metaobject. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/metaobject_system/handle)


Last Updated: 5th March 2024


`},id:{type:"number",description:`The ID of the metaobject. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/metaobject_system/id)


Last Updated: 5th March 2024


`},url:{type:"string",description:`The relative URL of the metaobject. Only set for metaobjects that have the \`online_store\` capability.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/metaobject_system/url)


Last Updated: 5th March 2024


`}}},model:{summary:"A 3D model uploaded as product media.",description:`A 3D model uploaded as product media. 

**Tip**

> Use the [\`model_viewer_tag\` filter](https://shopify.dev/docs/api/liquid/filters/model_viewer_tag) to output a [Google model viewer component](https://modelviewer.dev)
> for the model.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/model)


Last Updated: 5th March 2024


`,type:"object",properties:{sources:{type:"array",description:`The source files for the model. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/model/sources)


Last Updated: 5th March 2024


`,scope:"model_source"},alt:{type:"string",description:`The alt text of the model. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/model/alt)


Last Updated: 5th March 2024


`},id:{type:"number",description:`The ID of the model. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/model/id)


Last Updated: 5th March 2024


`},media_type:{type:"string",description:`The media type of the model. Always returns \`model\`. 



#### Filter for media of a specific type

You can use the \`media_type\` property with the [\`where\` filter](/docs/api/liquid/filters/where) to filter the [\`product.media\` array](/docs/api/liquid/objects/product#product-media) for all media of a desired type.


\`\`\`liquid

{% assign models = product.media | where: 'media_type', 'model' %}

{% for model in models %}
  {{- model | model_viewer_tag }}
{% endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/model/media_type)


Last Updated: 5th March 2024


`},position:{type:"number",description:`The position of the model in the [\`product.media\`](https://shopify.dev/docs/api/liquid/objects/product#product-media) array. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/model/position)


Last Updated: 5th March 2024


`},preview_image:{type:"object",description:`A preview image for the model. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/model/preview_image)


Last Updated: 5th March 2024


`,scope:"image"}}},model_source:{summary:"A model source file.",description:`A model source file. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/model_source)


Last Updated: 5th March 2024


`,type:"object",properties:{format:{type:"string",description:`The format of the model source file. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/model_source/format)


Last Updated: 5th March 2024


`},mime_type:{type:"string",description:`The [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) of the model source file. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/model_source/mime_type)


Last Updated: 5th March 2024


`},url:{type:"string",description:`The [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) of the model source file. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/model_source/url)


Last Updated: 5th March 2024


`}}},money:{summary:"A money value, in the the customer's local (presentment) currency.",description:`A money value, in the the customer's local (presentment) currency. 

**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.

#### Referencing money objects directly

When a money object is referenced directly, the money value in cents is returned.


\`\`\`liquid

{{ product.metafields.details.price_per_100g.value }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/money)


Last Updated: 5th March 2024


`,type:"object",properties:{currency:{type:"object",description:`The customer's local (presentment) currency. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/money/currency)


Last Updated: 5th March 2024


`,scope:"currency"}}},order:{summary:"An [order](https://help.shopify.com/manual/orders).",template:["customers/order"],description:`An [order](https://help.shopify.com/manual/orders). 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order)


Last Updated: 5th March 2024


`,type:"object",properties:{discounts:{type:"object",description:`\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F

Deprecated because not all discount types and details are captured.

The \`order.discounts\` property has been replaced by [\`order.discount_applications\`](/docs/api/liquid/objects/order#order-discount_applications).

---

The discounts on the order. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/discounts)


Last Updated: 5th March 2024


`,scope:"discount"},attributes:{type:"any",description:`The attributes on the order. If there are no attributes on the order, then \`nil\` is returned.


**Tip**

> Attributes are [collected with the cart](https://shopify.dev/themes/architecture/templates/cart#support-cart-notes-and-attributes).

#### Output the attributes

\`\`\`liquid
<ul>
  {% for attribute in order.attributes -%}
    <li><strong>{{ attribute.first }}:</strong> {{ attribute.last }}</li>
  {%- endfor %}
</ul>
\`\`\`


---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/attributes)


Last Updated: 5th March 2024


`},cancel_reason:{type:"string",description:`The reason that the order was cancelled. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/cancel_reason)


Last Updated: 5th March 2024


`,literal:["customer","declined","fraud","inventory","staff","other"]},cancel_reason_label:{type:"string",description:`The localized version of the [cancellation reason](https://shopify.dev/docs/api/liquid/objects/order#order-cancel_reason) for the order. 

**Tip**

> Use this property to output the cancellation reason on the storefront.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/cancel_reason_label)


Last Updated: 5th March 2024


`},cancelled:{type:"boolean",description:`Returns \`true\` if the order was cancelled. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/cancelled)


Last Updated: 5th March 2024


`},cancelled_at:{type:"string",description:`A timestamp for when the order was cancelled. 

**Tip**

> Use the [\`date\` filter](https://shopify.dev/docs/api/liquid/filters/date) to format the timestamp.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/cancelled_at)


Last Updated: 5th March 2024


`},cart_level_discount_applications:{type:"array",description:`The discount applications that apply at the order level. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/cart_level_discount_applications)


Last Updated: 5th March 2024


`,scope:"discount_application"},created_at:{type:"string",description:`A timestamp for when the order was created. 

**Tip**

> Use the [\`date\` filter](https://shopify.dev/docs/api/liquid/filters/date) to format the timestamp.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/created_at)


Last Updated: 5th March 2024


`},total_duties:{type:"number",description:`The sum of all duties applied to the line items in the order in the currency's subunit. If there are no duties, then \`nil\` is returned. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/total_duties)


Last Updated: 5th March 2024


`},customer_url:{type:"string",description:`The URL for the customer to view the order in their account. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/customer_url)


Last Updated: 5th March 2024


`},customer:{type:"object",description:`The customer that placed the order. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/customer)


Last Updated: 5th March 2024


`,scope:"customer"},discount_applications:{type:"array",description:`All of the discount applications for the order and its line items. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/discount_applications)


Last Updated: 5th March 2024


`,scope:"discount_application"},total_discounts:{type:"number",description:`The total amount of all discounts applied to the order in the currency's subunit. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/total_discounts)


Last Updated: 5th March 2024


`},total_net_amount:{type:"number",description:`The net amount of the order in the currency's subunit. The amount is calculated after refunds are applied, so is equal to \`order.total_price\` minus \`order.total_refunded_amount\`.

The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/total_net_amount)


Last Updated: 5th March 2024


`},tax_price:{type:"number",description:`The total amount of taxes applied to the order in the currency's subunit. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/tax_price)


Last Updated: 5th March 2024


`},total_refunded_amount:{type:"number",description:`The total amount that's been refunded from the order in the currency's subunit. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/total_refunded_amount)


Last Updated: 5th March 2024


`},email:{type:"string",description:`The email that's associated with the order. If no email is associated with the order, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/email)


Last Updated: 5th March 2024


`},financial_status:{type:"string",description:`The order's financial status. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/financial_status)


Last Updated: 5th March 2024


`,literal:["authorized","expired","paid","partially_paid","partially_refunded","pending","refunded","unpaid","voided"]},financial_status_label:{type:22,description:`The localized version of the [financial status](https://shopify.dev/docs/api/liquid/objects/order#order-financial_status) of the order. 

**Tip**

> Use this property to output the financial status on the storefront.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/financial_status_label)


Last Updated: 5th March 2024


`},fulfillment_status:{type:"string",description:`The fulfillment status of the order. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/fulfillment_status)


Last Updated: 5th March 2024


`},fulfillment_status_label:{type:"string",description:`The localized version of the [fulfillment status](https://shopify.dev/docs/api/liquid/objects/order#order-fulfillment_status) of the order. 

**Tip**

> Use this property to output the fulfillment status on the storefront.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/fulfillment_status_label)


Last Updated: 5th March 2024


`,literal:["complete","fulfilled","partial","restocked","unfulfilled"]},id:{type:"string",description:`The ID of the order. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/id)


Last Updated: 5th March 2024


`},metafields:{type:"any",description:`The [metafields](https://shopify.dev/docs/api/liquid/objects/metafield) applied to the order. 

**Tip**

> To learn about how to create metafields, refer to [Create and manage metafields](https://shopify.dev/apps/metafields/manage) or visit
> the [Shopify Help Center](https://help.shopify.com/manual/metafields).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/metafields)


Last Updated: 5th March 2024


`},name:{type:"string",description:`The name of the order. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/name)


Last Updated: 5th March 2024


`},note:{type:"string",description:`The note on the order. If there's no note on the order, then \`nil\` is returned.


**Tip**

> Notes are [collected with the cart](https://shopify.dev/themes/architecture/templates/cart#support-cart-notes-and-attributes).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/note)


Last Updated: 5th March 2024


`},confirmation_number:{type:"string",description:`A randomly generated alpha-numeric identifier for the order that may be shown to the customer
instead of the sequential order name. For example, "XPAV284CT", "R50KELTJP" or "35PKUN0UJ".
This value isn't guaranteed to be unique. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/confirmation_number)


Last Updated: 5th March 2024


`},order_number:{type:"number",description:`The integer representation of the order [name](https://shopify.dev/docs/api/liquid/objects/order#order-name). 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/order_number)


Last Updated: 5th March 2024


`},order_status_url:{type:"string",description:`The URL for the [**Order status** page](https://help.shopify.com/manual/orders/status-tracking) for the order. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/order_status_url)


Last Updated: 5th March 2024


`},customer_order_url:{type:"string",description:`The URL for the new order details page. The new customer accounts includes a list of Buyers Orders and an Order Details View.
This liquid function exposes a URL to a specific Orders Details in new customer accounts.
[Setup process for the new order details page](https://help.shopify.com/en/manual/customers/customer-accounts/new-customer-accounts)
can be found in the help center.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/customer_order_url)


Last Updated: 5th March 2024


`},phone:{type:"string",description:`The phone number associated with the order. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/phone)


Last Updated: 5th March 2024


`},shipping_address:{type:"object",description:`The shipping address of the order. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/shipping_address)


Last Updated: 5th March 2024


`,scope:"address"},billing_address:{type:"object",description:`The billing address of the order. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/billing_address)


Last Updated: 5th March 2024


`,scope:"address"},tags:{type:"array",description:`The [tags](https://help.shopify.com/manual/shopify-admin/productivity-tools/using-tags) on the order. The tags are returned in alphabetical order.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/tags)


Last Updated: 5th March 2024


`},tax_lines:{type:"array",description:`The tax lines on the order. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/tax_lines)


Last Updated: 5th March 2024


`,scope:"tax_line"},transactions:{type:"array",description:`The transactions of the order. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/transactions)


Last Updated: 5th March 2024


`,scope:"transaction"},line_items:{type:"array",description:`The line items in the order. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/line_items)


Last Updated: 5th March 2024


`,scope:"line_item"},subtotal_line_items:{type:"array",description:`The non-tip line items in the order. 

**Note**

> These line items are used to calculate the the [subtotal price](https://shopify.dev/docs/api/liquid/objects/order#order-subtotal_price).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/subtotal_line_items)


Last Updated: 5th March 2024


`,scope:"line_item"},item_count:{type:"number",description:`The number of items in the order. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/item_count)


Last Updated: 5th March 2024


`},shipping_methods:{type:"array",description:`The shipping methods for the order. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/shipping_methods)


Last Updated: 5th March 2024


`,scope:"shipping_method"},line_items_subtotal_price:{type:"number",description:`The sum of the prices of all of the line items in the order in the currency's subunit, after any line item discounts have
been applied. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/line_items_subtotal_price)


Last Updated: 5th March 2024


`},subtotal_price:{type:"number",description:`The sum of the prices of the [subtotal line items](https://shopify.dev/docs/api/liquid/objects/order#order-subtotal_line_items) in the currency's subunit, after any line item or
cart discounts have been applied. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/subtotal_price)


Last Updated: 5th March 2024


`},total_price:{type:"number",description:`The total price of the order in the currency's subunit. 

**Note**

> The total price is calculated before refunds are applied. Use [\`order.total_net_amount\`](https://shopify.dev/docs/api/liquid/objects/order#order-total_net_amount)
> to output the total minus any refunds.

The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/total_price)


Last Updated: 5th March 2024


`},shipping_price:{type:"number",description:`The shipping price of the order in the currency's subunit. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/shipping_price)


Last Updated: 5th March 2024


`},"pickup_in_store?":{type:"boolean",description:`Returns \`true\` if the order is a store pickup order. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/order/pickup_in_store?)


Last Updated: 5th March 2024


`}}},page:{summary:"A [page](https://help.shopify.com/manual/online-store/themes/theme-structure/pages) on a store.",template:["page"],description:`A [page](https://help.shopify.com/manual/online-store/themes/theme-structure/pages) on a store. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/page)


Last Updated: 5th March 2024


`,type:"object",properties:{id:{type:"number",description:`The ID of the page. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/page/id)


Last Updated: 5th March 2024


`},author:{type:"string",description:`The author of the page. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/page/author)


Last Updated: 5th March 2024


`},handle:{type:"string",description:`The [handle](https://shopify.dev/docs/api/liquid/basics#handles) of the page. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/page/handle)


Last Updated: 5th March 2024


`},title:{type:"string",description:`The title of the page. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/page/title)


Last Updated: 5th March 2024


`},template_suffix:{type:"string",description:`The name of the [custom template](https://shopify.dev/themes/architecture/templates#alternate-templates) assigned to the page. The name doesn't include the \`page.\` prefix, or the file extension (\`.json\` or \`.liquid\`).

 If a custom template isn't assigned to the page, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/page/template_suffix)


Last Updated: 5th March 2024


`},content:{type:"string",description:`The content of the page. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/page/content)


Last Updated: 5th March 2024


`},url:{type:"string",description:`The relative URL of the page. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/page/url)


Last Updated: 5th March 2024


`},metafields:{type:"any",description:`The [metafields](https://shopify.dev/docs/api/liquid/objects/metafield) applied to the page. 

**Tip**

> To learn about how to create metafields, refer to [Create and manage metafields](https://shopify.dev/apps/metafields/manage) or visit
> the [Shopify Help Center](https://help.shopify.com/manual/metafields).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/page/metafields)


Last Updated: 5th March 2024


`},published_at:{type:"string",description:`A timestamp for when the page was published. 

**Tip**

> Use the [\`date\` filter](https://shopify.dev/docs/api/liquid/filters/date) to format the timestamp.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/page/published_at)


Last Updated: 5th March 2024


`}}},paginate:{summary:"Information about the pagination inside a set of [`paginate` tags](/docs/api/liquid/tags/paginate).",description:`Information about the pagination inside a set of [\`paginate\` tags](https://shopify.dev/docs/api/liquid/tags/paginate). 

**Tip**

> Use the [\`default_pagination\` filter](https://shopify.dev/docs/api/liquid/filters/default_pagination) to output pagination links.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/paginate)


Last Updated: 5th March 2024


`,type:"object",properties:{page_size:{type:"number",description:`The number of items displayed per page. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/paginate/page_size)


Last Updated: 5th March 2024


`},current_offset:{type:"number",description:`The total number of items on pages previous to the current page. For example, if you show 5 items per page and are on page 3, then the value of \`paginate.current_offset\` is 10.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/paginate/current_offset)


Last Updated: 5th March 2024


`},current_page:{type:"number",description:`The page number of the current page. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/paginate/current_page)


Last Updated: 5th March 2024


`},items:{type:"number",description:`The total number of items to be paginated. For example, if you paginate a collection of 120 products, then the value of \`paginate.items\` is 120.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/paginate/items)


Last Updated: 5th March 2024


`},parts:{type:"array",description:`The pagination parts. Pagination parts are used to build pagination navigation.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/paginate/parts)


Last Updated: 5th March 2024


`,scope:"part"},next:{type:"object",description:`The pagination part to go to the next page. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/paginate/next)


Last Updated: 5th March 2024


`,scope:"part"},previous:{type:"object",description:`The pagination part to go to the previous page. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/paginate/previous)


Last Updated: 5th March 2024


`,scope:"part"},pages:{type:"number",description:`The total number of pages. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/paginate/pages)


Last Updated: 5th March 2024


`},page_param:{type:"string",description:`The URL parameter denoting the pagination. The default value is \`page\`.

If you paginate over an array defined in a setting or a metafield list type, then a unique key is appended to page to allow the paginated list to
operate independently from other lists on the page. For example, a paginated list defined in a setting might use the key
\`page_a9e329dc\`.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/paginate/page_param)


Last Updated: 5th March 2024


`}}},predictive_search:{summary:`Information about the results from a predictive search query through the
[Predictive Search API](/api/ajax/reference/predictive-search#get-locale-search-suggest).`,description:`Information about the results from a predictive search query through the
[Predictive Search API](https://shopify.dev/api/ajax/reference/predictive-search#get-locale-search-suggest). 

**Note**

> The \`predictive_search\` object returns results only when rendered in a section using the Predictive Search API and the
[Section Rendering API](https://shopify.dev/api/section-rendering). To learn about how to include predictive search in your theme,
> refer to [Add predictive search to your theme](https://shopify.dev/themes/navigation-search/search/predictive-search).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/predictive_search)


Last Updated: 5th March 2024


`,type:"object",properties:{performed:{type:"boolean",description:`Returns \`true\` when being referenced inside a section that's been rendered using the Predictive Search API and
the Section Rendering API. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/predictive_search/performed)


Last Updated: 5th March 2024


`},resources:{type:"object",description:`The resources associated with the query. You can check whether any resources of a specific type were returned using the [\`size\` filter](https://shopify.dev/docs/api/liquid/filters/size).

\`\`\`liquid
{% if predictive_search.resources.articles.size > 0 %}
  {% for article in predictive_search.resources.articles %}
    {{ article.title }}
  {% endfor %}
{% endif %}
\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/predictive_search/resources)


Last Updated: 5th March 2024


`,scope:"predictive_search_resources"},terms:{type:"string",description:`The entered search terms. 

**Tip**

> Use the [\`highlight\` filter](https://shopify.dev/docs/api/liquid/filters/highlight) to highlight the search terms in search results content.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/predictive_search/terms)


Last Updated: 5th March 2024


`},types:{type:"array",description:`The object types that the search was performed on. Searches can be performed on the following object types:

- [\`article\`](https://shopify.dev/docs/api/liquid/objects/article)
- [\`collection\`](https://shopify.dev/docs/api/liquid/objects/collection)
- [\`page\`](https://shopify.dev/docs/api/liquid/objects/page)
- [\`product\`](https://shopify.dev/docs/api/liquid/objects/product)



**Note**

> The types are determined by the [\`type\` query parameter](https://shopify.dev/api/ajax/reference/predictive-search#query-parameters).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/predictive_search/types)


Last Updated: 5th March 2024


`}}},selling_plan_price_adjustment:{summary:"Information about how a selling plan changes the price of a variant for a given period of time.",description:`Information about how a selling plan changes the price of a variant for a given period of time. To learn about how to support selling plans in your theme, refer to [Purchase options](https://shopify.dev/themes/pricing-payments/purchase-options).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_price_adjustment)


Last Updated: 5th March 2024


`,type:"object",properties:{order_count:{type:"number",description:`The number of orders that the price adjustment applies to. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_price_adjustment/order_count)


Last Updated: 5th March 2024


`},position:{type:"number",description:`The 1-based index of the price adjustment in the [\`selling_plan.price_adjustments\` array](https://shopify.dev/docs/api/liquid/objects/selling_plan#selling_plan-price_adjustments). 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_price_adjustment/position)


Last Updated: 5th March 2024


`},value_type:{type:"string",description:`The type of price adjustment. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_price_adjustment/value_type)


Last Updated: 5th March 2024


`,literal:["percentage","fixed_amount","price"]},value:{type:"number",description:`The value of the price adjustment as a decimal. How this value is interpreted depends on the [value type](https://shopify.dev/docs/api/liquid/objects/selling_plan_price_adjustment#selling_plan_price_adjustment-value_type) of
the price adjustment. The following table outlines what the value represents for each value type:

| Value type | Value |
| --- | --- |
| \`fixed_amount\` | The amount that the original price is being adjusted by, in the currency's subunit. |
| \`percentage\` | The percent amount that the original price is being adjusted by. |
| \`price\` | The adjusted amount in the currency's subunit. |

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_price_adjustment/value)


Last Updated: 5th March 2024


`}}},product:{summary:"A [product](https://help.shopify.com/manual/products) in the store.",template:["product"],description:`A [product](https://help.shopify.com/manual/products) in the store. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product)


Last Updated: 5th March 2024


`,type:"object",properties:{images:{type:"array",description:`The images attached to the product. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/images)


Last Updated: 5th March 2024


`,scope:"image"},metafields:{type:"any",description:`The [metafields](https://shopify.dev/docs/api/liquid/objects/metafield) applied to the product. 

**Tip**

> To learn about how to create metafields, refer to [Create and manage metafields](https://shopify.dev/apps/metafields/manage) or visit
> the [Shopify Help Center](https://help.shopify.com/manual/metafields).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/metafields)


Last Updated: 5th March 2024


`},options_with_values:{type:"array",description:`The options on the product. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/options_with_values)


Last Updated: 5th March 2024


`,scope:"product_option"},variants:{type:"array",description:`The variants of the product. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/variants)


Last Updated: 5th March 2024


`,scope:"variant"},id:{type:"number",description:`The ID of the product. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/id)


Last Updated: 5th March 2024


`},title:{type:"string",description:`The title of the product. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/title)


Last Updated: 5th March 2024


`},handle:{type:"string",description:`The [handle](https://shopify.dev/docs/api/liquid/basics#handles) of the product. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/handle)


Last Updated: 5th March 2024


`},template_suffix:{type:"string",description:`The name of the [custom template](https://shopify.dev/themes/architecture/templates#alternate-templates) of the product. The name doesn't include the \`product.\` prefix, or the file extension (\`.json\` or \`.liquid\`).

If a custom template isn't assigned to the product, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/template_suffix)


Last Updated: 5th March 2024


`},vendor:{type:"string",description:`The vendor of the product. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/vendor)


Last Updated: 5th March 2024


`},description:{type:"string",description:`The description of the product. 

**Note**

> This is the same value as [\`product.content\`](https://shopify.dev/docs/api/liquid/objects/product#product-content).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/description)


Last Updated: 5th March 2024


`},content:{type:"string",description:`The description of the product. 

**Note**

> This is the same value as [\`product.description\`](https://shopify.dev/docs/api/liquid/objects/product#product-description).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/content)


Last Updated: 5th March 2024


`},featured_image:{type:"object",description:`The first (featured) image attached to the product. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/featured_image)


Last Updated: 5th March 2024


`,scope:"image"},featured_media:{type:"object",description:`The first (featured) media attached to the product. 

**Tip**

> You can use [media filters](https://shopify.dev/docs/api/liquid/filters/media-filters) to output media URLs and displays. To learn about how
> to include media in your theme, refer to [Support product media](https://shopify.dev/themes/product-merchandising/media/support-media).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/featured_media)


Last Updated: 5th March 2024


`,scope:"media"},media:{type:"array",description:`The media attached to the product, sorted by the date it was added to the product. 

**Tip**

> You can use [media filters](https://shopify.dev/docs/api/liquid/filters/media-filters) to output media URLs and displays. To learn about how
> to include media in your theme, refer to [Support product media](https://shopify.dev/themes/product-merchandising/media/support-media).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/media)


Last Updated: 5th March 2024


`,scope:"media"},price_min:{type:"number",description:`The lowest price of any variants of the product in the currency's subunit. 

**Note**

> This is the same value as [\`product.price\`](https://shopify.dev/docs/api/liquid/objects/product#product-price).

The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/price_min)


Last Updated: 5th March 2024


`},price:{type:"number",description:`The lowest price of any variants of the product in the currency's subunit. 

**Note**

> This is the same value as [\`product.price_min\`](https://shopify.dev/docs/api/liquid/objects/product#product-price_min).

The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/price)


Last Updated: 5th March 2024


`},price_max:{type:"number",description:`The highest price of any variants of the product in the currency's subunit. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/price_max)


Last Updated: 5th March 2024


`},price_varies:{type:"boolean",description:`Returns \`true\` if the product's variant prices vary. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/price_varies)


Last Updated: 5th March 2024


`},selected_or_first_available_variant:{type:"object",description:`The currently selected or first available variant of the product. 

**Note**

> The selected variant is determined by the \`variant\` URL parameter. The \`selected_variant\` parameter is available on product pages only.

For a variant to be available, it needs to meet one of the following criteria:

- The \`variant.inventory_quantity\` is greater than 0.
- The \`variant.inventory_policy\` is set to \`continue\`.
- The \`variant.inventory_management\` is \`nil\`.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/selected_or_first_available_variant)


Last Updated: 5th March 2024


`,scope:"variant"},collections:{type:"array",description:`The collections that the product belongs to. 

**Note**

> Collections that aren't [available](https://help.shopify.com/manual/products/collections/make-collections-available) on
> the Online Store sales channel aren't included.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/collections)


Last Updated: 5th March 2024


`,scope:"collection"},selected_variant:{type:"object",description:`The currently selected variant of the product. If no variant is currently selected, then \`nil\` is returned.



**Note**

> The selected variant is determined by the \`variant\` URL parameter. This URL parameter is available on product pages URLs only.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/selected_variant)


Last Updated: 5th March 2024


`,scope:"variant"},first_available_variant:{type:"object",description:`The first available variant of the product. For a variant to be available, it needs to meet one of the following criteria:

- The \`variant.inventory_quantity\` is greater than 0.
- The \`variant.inventory_policy\` is set to \`continue\`.
- The \`variant.inventory_management\` is \`nil\`.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/first_available_variant)


Last Updated: 5th March 2024


`,scope:"variant"},available:{type:"boolean",description:`Returns \`true\` if at least one of the variants of the product is available. Returns \`false\` if not. For a variant to be available, it needs to meet one of the following criteria:

- The \`variant.inventory_quantity\` is greater than 0.
- The \`variant.inventory_policy\` is set to \`continue\`.
- The \`variant.inventory_management\` is \`nil\`.
- The variant has an associated [delivery profile](https://shopify.dev/docs/apps/selling-strategies/purchase-options/deferred/shipping-delivery/delivery-profiles) with a valid shipping rate.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/available)


Last Updated: 5th March 2024


`},options:{type:"array",description:`The option names of the product. 



#### Output the options

You can use the [\`size\` filter](/docs/api/liquid/filters/size) with dot notation to determine how many options a product has.


\`\`\`liquid

{% if product.options.size > 0 -%}
  {% for option in product.options -%}
    - {{ option }}
  {%- endfor %}
{%- endif %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/options)


Last Updated: 5th March 2024


`},type:{type:"string",description:`The type of the product. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/type)


Last Updated: 5th March 2024


`},compare_at_price_min:{type:"number",description:`The lowest **compare at** price of any variants of the product in the currency's subunit. This is the same as
\`product.compare_at_price\`. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/compare_at_price_min)


Last Updated: 5th March 2024


`},compare_at_price_max:{type:"number",description:`The highest **compare at** price of any variants of the product in the currency's subunit. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/compare_at_price_max)


Last Updated: 5th March 2024


`},compare_at_price:{type:"number",description:`The lowest **compare at** price of any variants of the product in the currency's subunit. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/compare_at_price)


Last Updated: 5th March 2024


`},compare_at_price_varies:{type:"boolean",description:`Returns \`true\` if the variant **compare at** prices of the product vary. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/compare_at_price_varies)


Last Updated: 5th March 2024


`},url:{type:"string",description:`The relative URL of the product. If a product is [recommended](https://shopify.dev/docs/themes/product-merchandising/recommendations), then the URL contains tracking parameters:

\`\`\`liquid
/products/gorgeous-wooden-computer?pr_choice=default&pr_prod_strat=description&pr_rec_pid=13&pr_ref_pid=17&pr_seq=alternating
\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/url)


Last Updated: 5th March 2024


`},tags:{type:"array",description:`The [tags](https://help.shopify.com/manual/shopify-admin/productivity-tools/using-tags) of the product. 

**Note**

> The tags are returned in alphabetical order.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/tags)


Last Updated: 5th March 2024


`},published_at:{type:"string",description:`A timestamp for when the product was published. 

**Tip**

> Use the [\`date\` filter](https://shopify.dev/docs/api/liquid/filters/date) to format the timestamp.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/published_at)


Last Updated: 5th March 2024


`},created_at:{type:"string",description:`A timestamp for when the product was created. 

**Tip**

> Use the [\`date\` filter](https://shopify.dev/docs/api/liquid/filters/date) to format the timestamp.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/created_at)


Last Updated: 5th March 2024


`},options_by_name:{type:"any",description:`Allows you to access a specific [product option](https://shopify.dev/docs/api/liquid/objects/product_option) by its name. 



#### Output the values for a specific option

When accessing a specific option, the name is case-insensitive.

\`\`\`liquid

<label>
  Strength
  <select>
    {%- for value in product.options_by_name['strength'].values %}
    <option>{{ value }}</option>
    {%- endfor %}
  </select>
</label>

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/options_by_name)


Last Updated: 5th March 2024


`},has_only_default_variant:{type:"boolean",description:`Returns \`true\` if the product doesn't have any options. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/has_only_default_variant)


Last Updated: 5th March 2024


`},"quantity_price_breaks_configured?":{type:"boolean",description:`Returns \`true\` if the product has at least one variant with quantity price breaks in the current customer context.
Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/quantity_price_breaks_configured?)


Last Updated: 5th March 2024


`},requires_selling_plan:{type:"boolean",description:`Returns \`true\` if all of the variants of the product require a selling plan. Returns \`false\` if not. 

**Note**

> A variant requires a selling plan if [\`variant.requires_selling_plan\`](https://shopify.dev/docs/api/liquid/objects/variant#variant-requires_selling_plan)
> is \`true\`.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/requires_selling_plan)


Last Updated: 5th March 2024


`},selling_plan_groups:{type:"array",description:`The selling plan groups that the variants of the product are included in. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/selling_plan_groups)


Last Updated: 5th March 2024


`,scope:"selling_plan_group"},selected_selling_plan:{type:"object",description:`The currently selected selling plan. If no selling plan is selected, then \`nil\` is returned.



**Note**

> The selected selling plan is determined by the \`selling_plan\` URL parameter.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/selected_selling_plan)


Last Updated: 5th March 2024


`,scope:"selling_plan"},selected_selling_plan_allocation:{type:"object",description:`The currently selected selling plan allocation for the currently selected variant. If no variant and selling plan are selected, then \`nil\` is returned.



**Note**

> The selected variant is determined by the \`variant\` URL parameter, and the selected selling plan is determined by the
> \`selling_plan\` URL parameter.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/selected_selling_plan_allocation)


Last Updated: 5th March 2024


`,scope:"selling_plan_allocation"},selected_or_first_available_selling_plan_allocation:{type:"object",description:`The currently selected, or first available, selling plan allocation. The following logic is used to determine which selling plan allocation is returned:

| Selling plan allocation | Return criteria |
| --- | --- |
| The currently selected allocation | Returned if a variant and selling plan are selected.<br><br>The selected variant is determined by the \`variant\` URL parameter, and the selected selling plan is determined by the \`selling_plan\` URL parameter. |
| The first allocation on the first available variant | Returned if no allocation is currently selected. |
| The first allocation on the first variant | Returned if no allocation is currently selected, and there are no available variants. |

If the product doesn't have any selling plans, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/selected_or_first_available_selling_plan_allocation)


Last Updated: 5th March 2024


`,scope:"selling_plan_allocation"},"gift_card?":{type:"boolean",description:`Returns \`true\` if the product is a gift card. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product/gift_card?)


Last Updated: 5th March 2024


`}}},product_option:{summary:"A product option, such as size or color.",description:`A product option, such as size or color. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product_option)


Last Updated: 5th March 2024


`,type:"object",properties:{name:{type:"string",description:`The name of the product option. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product_option/name)


Last Updated: 5th March 2024


`},position:{type:"number",description:`The 1-based index of the product option in the [\`product.options_with_values\` array](https://shopify.dev/docs/api/liquid/objects/product#product-options_with_values). 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product_option/position)


Last Updated: 5th March 2024


`},values:{type:"array",description:`The possible values for the product option. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product_option/values)


Last Updated: 5th March 2024


`,scope:"product_option_value"},selected_value:{type:"string",description:`The currently selected product option value. If no value is currently selected, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product_option/selected_value)


Last Updated: 5th March 2024


`}}},product_option_value:{summary:'A product option value, such as "red" for the option "color".',description:`A product option value, such as "red" for the option "color". 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product_option_value)


Last Updated: 5th March 2024


`,type:"object",properties:{id:{type:"number",description:`The ID of the product option value. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product_option_value/id)


Last Updated: 5th March 2024


`},name:{type:"string",description:`The name of the product option value. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product_option_value/name)


Last Updated: 5th March 2024


`},swatch:{type:"object",description:`> Beta:
> This feature is currently in early access. To be considered for early access to these API updates and the Shopify Product Taxonomy, [sign up here](https://www.shopify.com/editions/winter2024#new-taxonomy).

The swatch for this value, if one exists. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product_option_value/swatch)


Last Updated: 5th March 2024


`,scope:"swatch"},selected:{type:"boolean",description:`Whether or not the option value is selected. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product_option_value/selected)


Last Updated: 5th March 2024


`},variant:{type:"object",description:`The variant associated with this option value combined with the other currently selected option values, if one exists.

> Beta:
> This feature is currently in early access. To be considered for early access to these API updates and/or the Shopify Combined Listings app, please reach out to <a href="https://partners.shopify.com/current/support">Partner support</a>.

If this option value is selected (\`selected == true\`), this returns the \`selected_or_first_available_variant\`.

If this option value is not selected (\`selected == false\`), this returns the variant that is associated with the current
option value and the other currently selected option values.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product_option_value/variant)


Last Updated: 5th March 2024


`,scope:"variant"},product_url:{type:"string",description:`The relative URL of the product.

> Beta:
> This feature is currently in early access. To be considered for early access to these API updates and/or the Shopify Combined Listings app, please reach out to <a href="https://partners.shopify.com/current/support">Partner support</a>.

\`\`\`liquid
/products/gorgeous-wooden-computer
\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/product_option_value/product_url)


Last Updated: 5th March 2024


`}}},swatch:{summary:`Color and image for visual representation.
Available for [product option values](/docs/api/liquid/objects/product_option_value) and [filter values](/docs/api/liquid/objects/filter_value).`,description:`Color and image for visual representation.
Available for [product option values](https://shopify.dev/docs/api/liquid/objects/product_option_value) and [filter values](https://shopify.dev/docs/api/liquid/objects/filter_value). 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/swatch)


Last Updated: 5th March 2024


`,type:"object",properties:{color:{type:"object",description:`The swatch color. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/swatch/color)


Last Updated: 5th March 2024


`,scope:"color"},image:{type:"object",description:`The swatch image. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/swatch/image)


Last Updated: 5th March 2024


`,scope:"image"}}},variant:{summary:"A [product variant](https://help.shopify.com/manual/products/variants).",description:`A [product variant](https://help.shopify.com/manual/products/variants). 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant)


Last Updated: 5th March 2024


`,type:"object",properties:{metafields:{type:"any",description:`The [metafields](https://shopify.dev/docs/api/liquid/objects/metafield) applied to the variant. 

**Tip**

> To learn about how to create metafields, refer to [Create and manage metafields](https://shopify.dev/apps/metafields/manage) or visit
> the [Shopify Help Center](https://help.shopify.com/manual/metafields).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/metafields)


Last Updated: 5th March 2024


`},product:{type:"object",description:`The parent product of the variant. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/product)


Last Updated: 5th March 2024


`,scope:"product"},selected:{type:"boolean",description:`Returns \`true\` if the variant is currently selected. Returns \`false\` if it's not. 

**Note**

> The selected variant is determined by the \`variant\` URL parameter. This URL parameter is available on product pages URLs only.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/selected)


Last Updated: 5th March 2024


`},matched:{type:"boolean",description:`Returns \`true\` if the variant has been matched by a [storefront filter](https://shopify.dev/themes/navigation-search/filtering/storefront-filtering).
Returns \`false\` if it hasn't. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/matched)


Last Updated: 5th March 2024


`},id:{type:"number",description:`The ID of the variant. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/id)


Last Updated: 5th March 2024


`},title:{type:"string",description:`A concatenation of each variant option, separated by a \`/\`. 



#### The variant title

\`\`\`liquid

{{ product.variants.first.title }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/title)


Last Updated: 5th March 2024


`},quantity_rule:{type:"object",description:`The quantity rule for the variant. If no rule exists, then a default value is returned.

This rule can be set as part of a [B2B catalog](https://help.shopify.com/manual/b2b/catalogs/quantity-pricing).



**Note**

> The default quantity rule is \`min=1,max=null,increment=1\`.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/quantity_rule)


Last Updated: 5th March 2024


`,scope:"quantity_rule"},quantity_price_breaks:{type:"array",description:`Returns \`quantity_price_break\` objects for the variant in the current customer context. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/quantity_price_breaks)


Last Updated: 5th March 2024


`,scope:"quantity_price_break"},"quantity_price_breaks_configured?":{type:"boolean",description:`Returns \`true\` if the variant has any quantity price breaks available in the current customer context.
Returns \`false\` if it doesn't. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/quantity_price_breaks_configured?)


Last Updated: 5th March 2024


`},price:{type:"number",description:`The price of the variant in the currency's subunit. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/price)


Last Updated: 5th March 2024


`},compare_at_price:{type:"number",description:`The **compare at** price of the variant in the currency's subunit. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/compare_at_price)


Last Updated: 5th March 2024


`},selected_selling_plan_allocation:{type:"object",description:`The selected \`selling_plan_allocation\`. If no selling plan is selected, then \`nil\` is returned.



**Note**

> The selected selling plan is determined by the \`selling_plan\` URL parameter.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/selected_selling_plan_allocation)


Last Updated: 5th March 2024


`,scope:"selling_plan_allocation"},selling_plan_allocations:{type:"array",description:`The \`selling_plan_allocation\` objects for the variant. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/selling_plan_allocations)


Last Updated: 5th March 2024


`,scope:"selling_plan_allocation"},sku:{type:"string",description:`The SKU of the variant. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/sku)


Last Updated: 5th March 2024


`},barcode:{type:"string",description:`The barcode of the variant. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/barcode)


Last Updated: 5th March 2024


`},available:{type:"boolean",description:`Returns \`true\` if the variant is available. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/available)


Last Updated: 5th March 2024


`},options:{type:"string",description:`The values of the variant for each [product option](https://shopify.dev/docs/api/liquid/objects/product_option). 



#### Output the options of each variant

\`\`\`liquid

{% for variant in product.variants -%}
  {%- capture options -%}
    {% for option in variant.options -%}
      {{ option }}{%- unless forloop.last -%}/{%- endunless -%}
    {%- endfor %}
  {%- endcapture -%}
  
  {{ variant.id }}: {{ options }}
{%- endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/options)


Last Updated: 5th March 2024


`},option1:{type:"string",description:`\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F

Deprecated. Prefer to use [\`variant.options\`](/docs/api/liquid/objects/variant#variant-options) instead.

---

The value of the variant for the first product option. If there's no first product option, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/option1)


Last Updated: 5th March 2024


`},option2:{type:"string",description:`\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F

Deprecated. Prefer to use [\`variant.options\`](/docs/api/liquid/objects/variant#variant-options) instead.

---

The value of the variant for the second product option. If there's no second product option, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/option2)


Last Updated: 5th March 2024


`},option3:{type:"string",description:`\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F

Deprecated. Prefer to use [\`variant.options\`](/docs/api/liquid/objects/variant#variant-options) instead.

---

The value of the variant for the third product option. If there's no third product option, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/option3)


Last Updated: 5th March 2024


`},url:{type:"string",description:`The URL of the variant. Variant URLs use the following structure:

\`\`\`
/products/[product-handle]?variant=[variant-id]
\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/url)


Last Updated: 5th March 2024


`},weight_unit:{type:"string",description:`The unit for the weight of the variant. 

**Tip**

> To output the weight of a variant in this unit, use this property, and the \`variant.weight_in_unit\` property, with the
> [\`weight_with_unit\` filter](https://shopify.dev/docs/api/liquid/filters/weight_with_unit).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/weight_unit)


Last Updated: 5th March 2024


`},weight_in_unit:{type:"number",description:`The weight of the variant in the unit specified by \`variant.weight_unit\`. 

**Tip**

> To output this weight, use this property, and the \`variant.weight_unit\` property, with the [\`weight_with_unit\` filter](https://shopify.dev/docs/api/liquid/filters/weight_with_unit).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/weight_in_unit)


Last Updated: 5th March 2024


`},weight:{type:"number",description:`The weight of the variant in grams. 

**Tip**

> Use the [\`weight_with_unit\`](https://shopify.dev/docs/api/liquid/filters/weight_with_unit) filter to format the weight in
> [the store's format](https://www.shopify.com/admin/settings/general).
>
> Use \`variant.weight_in_unit\` to output the weight in the unit configured on the variant.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/weight)


Last Updated: 5th March 2024


`},unit_price_measurement:{type:"object",description:`The unit price measurement of the variant. 

**Note**

> Unit prices are available only to stores located in Germany and France.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/unit_price_measurement)


Last Updated: 5th March 2024


`,scope:"unit_price_measurement"},unit_price:{type:"number",description:`The [unit price](https://help.shopify.com/manual/intro-to-shopify/initial-setup/sell-in-france/price-per-unit#add-unit-prices-to-your-product)
of the variant in the currency's subunit. The price reflects any discounts that are applied to the line item. The value is output in the customer's local
(presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Note**

> Unit prices are available only to stores located in Germany and France.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/unit_price)


Last Updated: 5th March 2024


`},inventory_quantity:{type:"number",description:`The inventory quantity of the variant. If inventory isn't tracked, then the number of items sold is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/inventory_quantity)


Last Updated: 5th March 2024


`},inventory_management:{type:"string",description:`The inventory management service of the variant. If inventory isn't tracked, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/inventory_management)


Last Updated: 5th March 2024


`},inventory_policy:{type:"string",description:`Whether the variant should continue to be sold when it's out of stock. 

**Tip**

> To learn about why merchants might want to continue selling products when they're out of stock, visit the
> [Shopify Help Center](https://help.shopify.com/manual/products/inventory/getting-started-with-inventory/selling-when-out-of-stock).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/inventory_policy)


Last Updated: 5th March 2024


`,literal:["continue","deny"]},requires_shipping:{type:"boolean",description:`Returns \`true\` if the variant requires shipping. Returns \`false\` if it doesn't. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/requires_shipping)


Last Updated: 5th March 2024


`},taxable:{type:"boolean",description:`Returns \`true\` if taxes should be charged on the variant. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/taxable)


Last Updated: 5th March 2024


`},featured_image:{type:"object",description:`The image attached to the variant. 

**Note**

> This is the same value as [\`variant.image\`](https://shopify.dev/docs/api/liquid/objects/variant#variant-image).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/featured_image)


Last Updated: 5th March 2024


`,scope:"image"},image:{type:"object",description:`The image attached to the variant. 

**Note**

> This is the same value as [\`variant.featured_image\`](https://shopify.dev/docs/api/liquid/objects/variant#variant-featured_image).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/image)


Last Updated: 5th March 2024


`,scope:"image"},featured_media:{type:"object",description:`The first media object attached to the variant. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/featured_media)


Last Updated: 5th March 2024


`,scope:"media"},incoming:{type:"boolean",description:`Returns \`true\` if the variant has incoming inventory. Returns \`false\` if not. Incoming inventory information is populated by [inventory transfers](https://help.shopify.com/manual/products/inventory/transfers),
[purchase orders](https://help.shopify.com/manual/products/inventory/purchase-orders), and
[third-party apps](https://shopify.dev/docs/apps/fulfillment/inventory-management-apps).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/incoming)


Last Updated: 5th March 2024


`},next_incoming_date:{type:"string",description:`The arrival date for the next incoming inventory of the variant. Incoming inventory information is populated by [inventory transfers](https://help.shopify.com/manual/products/inventory/transfers),
[purchase orders](https://help.shopify.com/manual/products/inventory/purchase-orders), and
[third-party apps](https://shopify.dev/docs/apps/fulfillment/inventory-management-apps).



**Tip**

> Use the [\`date\` filter](https://shopify.dev/docs/api/liquid/filters/date) to format the date.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/next_incoming_date)


Last Updated: 5th March 2024


`},store_availabilities:{type:"array",description:`The store availabilities for the variant. The array is defined in only the following cases:

- \`variant.selected\` is \`true\`
- The variant is the product's first available variant. For example, \`product.first_available_variant\` or \`product.selected_or_first_available_variant\`.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/store_availabilities)


Last Updated: 5th March 2024


`,scope:"store_availability"},requires_selling_plan:{type:"boolean",description:`Returns \`true\` if the variant is set to require a \`selling_plan\` when being added to the cart. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/variant/requires_selling_plan)


Last Updated: 5th March 2024


`}}},quantity_price_break:{summary:"The per-unit price of a variant when purchasing the minimum quantity or more.",description:`The per-unit price of a variant when purchasing the minimum quantity or more. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/quantity_price_break)


Last Updated: 5th March 2024


`,type:"object",properties:{minimum_quantity:{type:"number",description:`The minimum quantity required to qualify for the price break. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/quantity_price_break/minimum_quantity)


Last Updated: 5th March 2024


`},price:{type:"number",description:`The price for the quantity price break once the minimum quantity is met. The value is the price in the customer's local (presentment) currency.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/quantity_price_break/price)


Last Updated: 5th March 2024


`}}},rating:{summary:"Information for a [`rating` type](/apps/metafields/types) metafield.",description:`Information for a [\`rating\` type](https://shopify.dev/apps/metafields/types) metafield. 

**Tip**

> To learn about metafield types, refer to [Metafield types](https://shopify.dev/apps/metafields/types).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/rating)


Last Updated: 5th March 2024


`,type:"object",properties:{rating:{type:"number",description:`The rating value. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/rating/rating)


Last Updated: 5th March 2024


`},scale_min:{type:"number",description:`The minimum value of the rating scale. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/rating/scale_min)


Last Updated: 5th March 2024


`},scale_max:{type:"number",description:`The maximum value of the rating scale. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/rating/scale_max)


Last Updated: 5th March 2024


`}}},recipient:{summary:"A recipient that is associated with a [gift card](https://help.shopify.com/manual/products/gift-card-products).",template:["gift_card.liquid"],description:`A recipient that is associated with a [gift card](https://help.shopify.com/manual/products/gift-card-products). 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/recipient)


Last Updated: 5th March 2024


`,type:"object",properties:{nickname:{type:"string",description:`The nickname of the recipient. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/recipient/nickname)


Last Updated: 5th March 2024


`},email:{type:"string",description:`The email of the recipient. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/recipient/email)


Last Updated: 5th March 2024


`},name:{type:"string",description:`The full name of the recipient. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/recipient/name)


Last Updated: 5th March 2024


`}}},recommendations:{summary:"Product recommendations for a specific product based on sales data, product descriptions, and collection relationships.",description:`Product recommendations for a specific product based on sales data, product descriptions, and collection relationships. Product recommendations become more accurate over time as new orders and product data become available. To learn more about
how product recommendations are generated, refer to [Product recommendations](https://shopify.dev/themes/product-merchandising/recommendations).



**Note**

> The \`recommendations\` object returns products only when rendered in a section using the [Product Recommendations API](https://shopify.dev/api/ajax/reference/product-recommendations)
> and the [Section Rendering API](https://shopify.dev/api/section-rendering). To learn about how to include product recommendations in your theme,
> refer to [Show product recommendations](https://shopify.dev/themes/product-merchandising/recommendations/show-product-recommendations).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/recommendations)


Last Updated: 5th March 2024


`,type:"object",properties:{"performed?":{type:"boolean",description:`Returns \`true\` when being referenced inside a section that's been rendered using the Product Recommendations API and
the Section Rendering API. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/recommendations/performed?)


Last Updated: 5th March 2024


`},products:{type:"array",description:`The recommended products. If \`performed?\` is \`false\`, then an [EmptyDrop](https://shopify.dev/docs/api/liquid/basics#emptydrop) is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/recommendations/products)


Last Updated: 5th March 2024


`,scope:"product"},products_count:{type:"number",description:`The number of recommended products. If \`performed?\` is \`false\`, then 0 is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/recommendations/products_count)


Last Updated: 5th March 2024


`},intent:{type:"string",description:`The recommendation intent. If \`performed?\` is \`false\`, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/recommendations/intent)


Last Updated: 5th March 2024


`}}},request:{summary:"Information about the current URL and the associated page.",global:!0,description:`Information about the current URL and the associated page. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/request)


Last Updated: 5th March 2024


`,type:"object",properties:{design_mode:{type:"boolean",description:`Returns \`true\` if the request is being made from within the theme editor. Returns \`false\` if not. You can use \`request.design_mode\` to control theme behavior depending on whether the theme is being viewed in the editor.
For example, you can prevent session data from being tracked by tracking scripts in the theme editor.

> Caution:
> You shouldn't use \`request.design_mode\` to change customer-facing functionality. The theme editor preview should match
> what the merchant's customers see on the live store.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/request/design_mode)


Last Updated: 5th March 2024


`},visual_preview_mode:{type:"boolean",description:`Returns \`true\` if the request is being made from within the theme editor's visual section preview. Returns \`false\` if not. You can use \`request.visual_preview_mode\` to control theme behavior depending on whether the theme is being viewed in the editor's visual section preview.
For example, you can remove any scripts that interefere with how the section is displayed.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/request/visual_preview_mode)


Last Updated: 5th March 2024


`},page_type:{type:"string",description:`The type of page being requested. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/request/page_type)


Last Updated: 5th March 2024


`,literal:["404","article","blog","captcha","cart","collection","list-collections","customers/account","customers/activate_account","customers/addresses","customers/login","customers/order","customers/register","customers/reset_password","gift_card","index","metaobject","page","password","policy","product","search"]},host:{type:"string",description:`The domain that the request is hosted on. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/request/host)


Last Updated: 5th March 2024


`},origin:{type:"string",description:`The protocol and host of the request. 



#### Create a context-aware absolute URL

You can use \`request.origin\` with any object, object property, or filter that returns a relative URL to build a context-aware absolute URL.


\`\`\`liquid

{{ product.selected_variant.url | default: product.url | prepend: request.origin }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/request/origin)


Last Updated: 5th March 2024


`},path:{type:"string",description:`The path of the request. 

**Note**

> If the current path is for a page that doesn't exist, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/request/path)


Last Updated: 5th March 2024


`},locale:{type:"object",description:`The locale of the request. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/request/locale)


Last Updated: 5th March 2024


`,scope:"shop_locale"}}},robots:{summary:"The default rule groups for the `robots.txt` file.",template:["robots.txt.liquid"],description:`The default rule groups for the \`robots.txt\` file. 

**Tip**

> You can [customize the \`robots.txt\` file](https://shopify.dev/themes/seo/robots-txt) with the [\`robots.txt.liquid\` template](/themes/architecture/templates/robots-txt-liquid).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/robots)


Last Updated: 5th March 2024


`,type:"object",properties:{default_groups:{type:"array",description:`The rule groups. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/robots/default_groups)


Last Updated: 5th March 2024


`,scope:"group"}}},group:{summary:"A group of rules for the `robots.txt` file.",description:`A group of rules for the \`robots.txt\` file. 

**Tip**

> You can [customize the \`robots.txt\` file](https://shopify.dev/themes/seo/robots-txt) with the [\`robots.txt.liquid\` template](/themes/architecture/templates/robots-txt-liquid).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/group)


Last Updated: 5th March 2024


`,type:"object",properties:{user_agent:{type:"object",description:`The user agent for the group. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/group/user_agent)


Last Updated: 5th March 2024


`,scope:"user_agent"},rules:{type:"array",description:`The rules in the group. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/group/rules)


Last Updated: 5th March 2024


`,scope:"rule"},sitemap:{type:"object",description:`The sitemap for the group. If the group doesn't require a sitemap, then \`blank\` is returned.

The sitemap can be accessed at \`/sitemap.xml\`.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/group/sitemap)


Last Updated: 5th March 2024


`,scope:"sitemap"}}},rule:{summary:"A rule for the `robots.txt` file, which tells crawlers which pages can, or can't, be accessed.",description:`A rule for the \`robots.txt\` file, which tells crawlers which pages can, or can't, be accessed. A rule consists of a directive, which can be either \`Allow\` or \`Disallow\`, and a value of the associated URL path.

For example:

\`\`\`
Disallow: /policies/
\`\`\`

You can output a rule directly, instead of referencing each of its properties.



**Tip**

> You can [customize the \`robots.txt\` file](https://shopify.dev/themes/seo/robots-txt) with the [\`robots.txt.liquid\` template](/themes/architecture/templates/robots-txt-liquid).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/rule)


Last Updated: 5th March 2024


`,type:"object",properties:{directive:{type:"string",description:`The directive of the rule. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/rule/directive)


Last Updated: 5th March 2024


`},value:{type:"string",description:`The value of the rule. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/rule/value)


Last Updated: 5th March 2024


`}}},routes:{summary:"Allows you to generate standard URLs for the storefront.",global:!0,description:`Allows you to generate standard URLs for the storefront. Using the \`routes\` object instead of hardcoding URLs helps ensure that your theme supports
[multiple languages](https://shopify.dev/themes/internationalization/multiple-currencies-languages), as well as any possible changes in URL
format.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes)


Last Updated: 5th March 2024


`,type:"object",properties:{root_url:{type:"string",description:`The index (home page) URL. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes/root_url)


Last Updated: 5th March 2024


`},account_url:{type:"string",description:`The [account page](https://help.shopify.com/manual/customers/customer-accounts) URL. Redirects to [new customer accounts](https://help.shopify.com/en/manual/customers/customer-accounts/new-customer-accounts) when enabled. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes/account_url)


Last Updated: 5th March 2024


`},account_login_url:{type:"string",description:`The [account login page](https://shopify.dev/themes/architecture/templates/customers-login) URL. Redirects to [new customer accounts](https://help.shopify.com/en/manual/customers/customer-accounts/new-customer-accounts) when enabled. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes/account_login_url)


Last Updated: 5th March 2024


`},account_logout_url:{type:"string",description:`The URL to log a customer out of their account. Redirects to [new customer accounts](https://help.shopify.com/en/manual/customers/customer-accounts/new-customer-accounts) when enabled. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes/account_logout_url)


Last Updated: 5th March 2024


`},account_recover_url:{type:"string",description:`The [password recovery page](https://shopify.dev/themes/architecture/templates/customers-reset-password) URL. Redirects to [new customer accounts](https://help.shopify.com/en/manual/customers/customer-accounts/new-customer-accounts) when enabled. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes/account_recover_url)


Last Updated: 5th March 2024


`},account_register_url:{type:"string",description:`The [account registration page](https://shopify.dev/themes/architecture/templates/customers-register) URL. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes/account_register_url)


Last Updated: 5th March 2024


`},account_addresses_url:{type:"string",description:`The [account addresses page](https://shopify.dev/themes/architecture/templates/customers-addresses) URL. Redirects to [new customer accounts](https://help.shopify.com/en/manual/customers/customer-accounts/new-customer-accounts) when enabled. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes/account_addresses_url)


Last Updated: 5th March 2024


`},collections_url:{type:"string",description:`The [collection list page](https://shopify.dev/themes/architecture/templates/list-collections) URL. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes/collections_url)


Last Updated: 5th March 2024


`},all_products_collection_url:{type:"string",description:`The all-products collection page URL. The all-products collection is automatically generated by Shopify and contains all products in the store.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes/all_products_collection_url)


Last Updated: 5th March 2024


`},search_url:{type:"string",description:`The [search page](https://shopify.dev/themes/architecture/templates/search) URL. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes/search_url)


Last Updated: 5th March 2024


`},predictive_search_url:{type:"string",description:`The [Predictive Search API](https://shopify.dev/api/ajax/reference/predictive-search) URL. 

**Tip**

> To learn about how to support predictive search in your theme, refer to [Add predictive search to your theme](https://shopify.dev/themes/navigation-search/search/predictive-search).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes/predictive_search_url)


Last Updated: 5th March 2024


`},cart_url:{type:"string",description:`The [cart page](https://shopify.dev/themes/architecture/templates/cart) URL. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes/cart_url)


Last Updated: 5th March 2024


`},cart_add_url:{type:"string",description:`The URL for the [\`/cart/add\` Cart API endpoint](https://shopify.dev/api/ajax/reference/cart#post-locale-cart-add-js). 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes/cart_add_url)


Last Updated: 5th March 2024


`},cart_change_url:{type:"string",description:`The URL for the [\`/cart/change\` Cart API endpoint](https://shopify.dev/api/ajax/reference/cart#post-locale-cart-change-js). 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes/cart_change_url)


Last Updated: 5th March 2024


`},cart_clear_url:{type:"string",description:`The URL for the [\`/cart/clear\` Cart API endpoint](https://shopify.dev/api/ajax/reference/cart#post-locale-cart-clear-js). 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes/cart_clear_url)


Last Updated: 5th March 2024


`},cart_update_url:{type:"string",description:`The URL for the [\`/cart/update\` Cart API endpoint](https://shopify.dev/api/ajax/reference/cart#post-locale-cart-update-js). 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes/cart_update_url)


Last Updated: 5th March 2024


`},product_recommendations_url:{type:"string",description:`The [Product Recommendations API](https://shopify.dev/api/ajax/reference/product-recommendations) URL. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/routes/product_recommendations_url)


Last Updated: 5th March 2024


`}}},script:{summary:`Information about a Shopify Script.
&gt; Caution:
&gt; Shopify Scripts will be sunset on August 28, 2025. Migrate your existing scripts to [Shopify Functions](/docs/api/functions) before this date.`,description:`Information about a Shopify Script.
> Caution:
> Shopify Scripts will be sunset on August 28, 2025. Migrate your existing scripts to [Shopify Functions](https://shopify.dev/docs/api/functions) before this date. 

**Tip**

> To learn more about Shopify Scripts and the Script Editor, visit the [Shopify Help Center](https://help.shopify.com/manual/checkout-settings/script-editor).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/script)


Last Updated: 5th March 2024


`,type:"object",properties:{id:{type:"number",description:`The ID of the script. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/script/id)


Last Updated: 5th March 2024


`},name:{type:"string",description:`The name of the script. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/script/name)


Last Updated: 5th March 2024


`}}},search:{summary:"Information about a storefront search query.",template:["search"],description:`Information about a storefront search query. To learn about storefront search and how to include it in your theme, refer to [Storefront search](https://shopify.dev/themes/navigation-search/search).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/search)


Last Updated: 5th March 2024


`,type:"object",properties:{terms:{type:"string",description:`The entered search terms. 

**Tip**

> Use the [\`highlight\` filter](https://shopify.dev/docs/api/liquid/filters/highlight) to highlight the search terms in search result content.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/search/terms)


Last Updated: 5th March 2024


`},filters:{type:"array",description:`The filters that have been set up on the search page. Only filters that are relevant to the current search results are returned. If the search results contain more than 1000
products, then the array will be empty.



**Tip**

> To learn about how to set up filters in the admin, visit the [Shopify Help Center](https://help.shopify.com/manual/online-store/themes/customizing-themes/storefront-filters).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/search/filters)


Last Updated: 5th March 2024


`,scope:"filter"},performed:{type:"boolean",description:`Returns \`true\` if a search was successfully performed. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/search/performed)


Last Updated: 5th March 2024


`},results:{type:"any",description:`The search result items. An item can be an [\`article\`](https://shopify.dev/docs/api/liquid/objects/article), a [\`page\`](https://shopify.dev/docs/api/liquid/objects/page), or a
[\`product\`](https://shopify.dev/docs/api/liquid/objects/product).



**Tip**

> Use the [paginate](https://shopify.dev/docs/api/liquid/tags/paginate) tag to choose how many results to show per page, up to a limit of 50.

#### Search result \`object_type\`

Search results have an additional \`object_type\` property that returns the object type of the result.

\`\`\`liquid

{% for item in search.results %}
<!-- Result {{ forloop.index }}-->
<h3>
  {{ item.title | link_to: item.url }}
</h3>

{% if item.object_type == 'article' -%}
  {%- comment -%}
     'item' is an article
     All article object properties can be accessed.
  {%- endcomment -%}

  {% if item.image -%}
    <div class="result-image">
      <a href="{{ item.url }}" title="{{ item.title | escape }}">
        {{ item | image_url: width: 100 | image_tag }}
       </a>
    </div>
   {% endif %}
{%- elsif item.object_type == 'page' -%}
  {%- comment -%}
    'item' is a page.
     All page object properties can be accessed.
  {%- endcomment -%}
{%- else -%}
  {%- comment -%}
     'item' is a product.
     All product object properties can be accessed.
  {%- endcomment -%}

  {%- if item.featured_image -%}
    <div class="result-image">
       <a href="{{ item.url }}" title="{{ item.title | escape }}">
         {{ item.featured_image | image_url: width: 100 | image_tag }}
      </a>
    </div>
  {% endif %}
{%- endif -%}

<span>{{ item.content | strip_html | truncatewords: 40 | highlight: search.terms }}</span>
{% endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/search/results)


Last Updated: 5th March 2024


`},results_count:{type:"number",description:`The number of results. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/search/results_count)


Last Updated: 5th March 2024


`},sort_options:{type:"array",description:`The available sorting options for the search results. 



#### Output the sort options

\`\`\`liquid

{%- assign sort_by = search.sort_by | default: search.default_sort_by -%}

<select>
{%- for option in search.sort_options %}
  <option
    value="{{ option.value }}"
    {%- if option.value == sort_by %}
      selected="selected"
    {%- endif %}
  >
    {{ option.name }}
  </option>
{% endfor -%}
</select>

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/search/sort_options)


Last Updated: 5th March 2024


`,scope:"sort_option"},sort_by:{type:22,description:`The sort order of the search results. This is determined by the \`sort_by\` URL parameter. If there's no \`sort_by\` URL parameter, then the value is \`nil\`.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/search/sort_by)


Last Updated: 5th March 2024


`},default_sort_by:{type:"string",description:`The default sort order of the search results, which is \`relevance\`. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/search/default_sort_by)


Last Updated: 5th March 2024


`},types:{type:"array",description:`The object types that the search was performed on. A search can be performed on the following object types:

- [\`article\`](https://shopify.dev/docs/api/liquid/objects/article)
- [\`page\`](https://shopify.dev/docs/api/liquid/objects/page)
- [\`product\`](https://shopify.dev/docs/api/liquid/objects/product)



**Note**

> The types are determined by the [\`type\` query parameter](https://shopify.dev/api/ajax/reference/predictive-search#query-parameters).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/search/types)


Last Updated: 5th March 2024


`}}},section:{summary:"The properties and settings of a section.",description:`The properties and settings of a section. 

**Tip**

> To learn about sections and using them in a theme, refer to [Sections](https://shopify.dev/themes/architecture/sections).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/section)


Last Updated: 5th March 2024


`,type:"object",properties:{id:{type:"string",description:`The ID of the section. The ID for sections included through [JSON templates](https://shopify.dev/themes/architecture/templates/json-templates) are dynamically
generated by Shopify.

The ID for static sections is the section file name without the \`.liquid\` extension. For example, a \`header.liquid\`
section has an ID of \`header\`.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/section/id)


Last Updated: 5th March 2024


`},settings:{type:"any",description:`The [settings](https://shopify.dev/themes/architecture/sections/section-schema#settings) of the section. To learn about how to access settings, refer to [Access settings](https://shopify.dev/themes/architecture/settings#access-settings).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/section/settings)


Last Updated: 5th March 2024


`},index:{type:"number",description:`The 1-based index of the current section within its location. Use this property to adjust section behavior based on its position within its location ([template](https://shopify.dev/docs/themes/architecture/templates), [section group](/docs/themes/architecture/section-groups)) and on the page. The \`index\` starts at 1 within each location.

An example use case is for programmatically setting \`loading="lazy"\` for images below the fold based on an index higher than, for example, 3. Note that this is now the default behavior for the [\`image_tag\` filter](https://shopify.dev/docs/api/liquid/filters#image_tag).

Only use this for non-display use cases like web performance. Because of various limitations, the \`index\` property returns \`nil\` in the following contexts:

- When rendered as a [static section](https://shopify.dev/docs/themes/architecture/sections#statically-render-a-section)
- While rendering in the online store editor
- When using the [Section Rendering API](https://shopify.dev/docs/api/section-rendering)

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/section/index)


Last Updated: 5th March 2024


`},index0:{type:"number",description:`The 0-based index of the current section within its location. This is the same as the \`index\` property except that the index starts at 0 instead of 1.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/section/index0)


Last Updated: 5th March 2024


`},location:{type:"string",description:"The scope or context of the section (template, section group, or global). Sections can have one of four different location types. For sections rendered within a [template](https://shopify.dev/docs/themes/architecture/templates), the location will be `template`. For sections rendered within a [section group](/docs/themes/architecture/section-groups), the location will be the section group type, e.g., `header`, `footer`, `custom.<type>`. Sections [rendered statically](/docs/themes/architecture/sections#statically-render-a-section) will be `static`. Finally, if you're still using `content_for_index`, then the value will be `content_for_index`.\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/section/location)\n\n\nLast Updated: 5th March 2024\n\n\n"},blocks:{type:"array",description:`The blocks of the section. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/section/blocks)


Last Updated: 5th March 2024


`,scope:"block"}}},selling_plan_allocation:{summary:"Information about how a specific [selling plan](/apps/subscriptions/selling-plans) affects a line item.",description:`Information about how a specific [selling plan](https://shopify.dev/apps/subscriptions/selling-plans) affects a line item. To learn about how to support selling plans in your theme, refer to [Purchase options](https://shopify.dev/themes/pricing-payments/purchase-options).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation)


Last Updated: 5th March 2024


`,type:"object",properties:{price:{type:"number",description:`The price of the selling plan allocation in the currency's subunit. The value is output in the customer's local (presentment) currency.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation/price)


Last Updated: 5th March 2024


`},compare_at_price:{type:"number",description:`The **compare at** price of the selling plan allocation in the currency's subunit. The value of the **compare at** price is the line item's price without the selling plan applied.

The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation/compare_at_price)


Last Updated: 5th March 2024


`},price_adjustments:{type:"array",description:`The selling plan allocation price adjustments. The maximum length of the array is two. If the associated selling plan doesn't create any price adjustments, then the
array is empty.

Each \`selling_plan_allocation_price_adjustment\` maps to a [\`selling_plan_price_adjustment\`](https://shopify.dev/docs/api/liquid/objects/selling_plan_price_adjustment)
in the [\`selling_plan.price_adjustments\` array](https://shopify.dev/docs/api/liquid/objects/selling_plan#selling_plan-price_adjustments). The
\`selling_plan.price_adjustments\` array contains the intent of the selling plan, and the
\`selling_plan_allocation.price_adjustments\` array contains the resulting money amounts.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation/price_adjustments)


Last Updated: 5th March 2024


`,scope:"selling_plan_allocation_price_adjustment"},unit_price:{type:"number",description:`The [unit price](https://shopify.dev/docs/api/liquid/objects/variant#variant-unit_price) of the variant associated with the selling plan, in the currency's subunit. If the variant doesn't have a unit price, then \`nil\` is returned.

The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation/unit_price)


Last Updated: 5th March 2024


`},per_delivery_price:{type:"number",description:`The price for each delivery in the selling plan in the currency's subunit. If a selling plan includes multiple deliveries, then the \`per_delivery_price\` is the \`price\` divided by the number of
deliveries.

The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation/per_delivery_price)


Last Updated: 5th March 2024


`},selling_plan:{type:"object",description:`The selling plan that created the allocation. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation/selling_plan)


Last Updated: 5th March 2024


`,scope:"selling_plan"},selling_plan_group_id:{type:"string",description:`The ID of the [\`selling_plan_group\`](https://shopify.dev/docs/api/liquid/objects/selling_plan_group) that the selling plan of the allocation belongs to. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation/selling_plan_group_id)


Last Updated: 5th March 2024


`},checkout_charge_amount:{type:"number",description:`The amount that the customer will be charged at checkout in the currency's subunit. The value is output in the customer's local (presentment) currency.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation/checkout_charge_amount)


Last Updated: 5th March 2024


`},remaining_balance_charge_amount:{type:"number",description:`The remaining amount for the customer to pay, in the currency's subunit. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation/remaining_balance_charge_amount)


Last Updated: 5th March 2024


`}}},selling_plan_allocation_price_adjustment:{summary:"The resulting price from the intent of the associated [`selling_plan_price_adjustment`](/docs/api/liquid/objects/selling_plan_price_adjustment).",description:`The resulting price from the intent of the associated [\`selling_plan_price_adjustment\`](https://shopify.dev/docs/api/liquid/objects/selling_plan_price_adjustment). To learn about how to support selling plans in your theme, refer to [Purchase options](https://shopify.dev/themes/pricing-payments/purchase-options).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation_price_adjustment)


Last Updated: 5th March 2024


`,type:"object",properties:{position:{type:"number",description:`The 1-based index of the price adjustment in the
[\`selling_plan_allocation.price_adjustments\` array](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation#selling_plan_allocation-price_adjustments). 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation_price_adjustment/position)


Last Updated: 5th March 2024


`},price:{type:"number",description:`The price that will be charged for the price adjustment's lifetime, in the currency's subunit. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation_price_adjustment/price)


Last Updated: 5th March 2024


`}}},selling_plan_checkout_charge:{summary:`Information about how a specific [selling plan](/apps/subscriptions/selling-plans) affects the amount that a
customer needs to pay for a line item at checkout.`,description:`Information about how a specific [selling plan](https://shopify.dev/apps/subscriptions/selling-plans) affects the amount that a
customer needs to pay for a line item at checkout. To learn about how to support selling plans in your theme, refer to [Purchase options](https://shopify.dev/themes/pricing-payments/purchase-options).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_checkout_charge)


Last Updated: 5th March 2024


`,type:"object",properties:{value_type:{type:"string",description:`The value type of the checkout charge. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_checkout_charge/value_type)


Last Updated: 5th March 2024


`,literal:["percentage","price"]},value:{type:"number",description:`The value of the checkout charge. How this value is interpreted depends on the [value type](https://shopify.dev/docs/api/liquid/objects/selling_plan_checkout_charge#selling_plan_checkout_charge-value_type) of
the checkout charge. The following table outlines what the value represents for each value type:

| Value type | Value |
| --- | --- |
| \`percentage\` | The percent amount of the original price that the customer needs to pay.<br><br>For example, if the value is 50, then the customer needs to pay 50% of the original price. |
| \`price\` | The amount that the customer needs to pay in the currency's subunit. |

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_checkout_charge/value)


Last Updated: 5th March 2024


`}}},selling_plan:{summary:"Information about the intent of how a specific [selling plan](/apps/subscriptions/selling-plans) affects a line item.",description:`Information about the intent of how a specific [selling plan](https://shopify.dev/apps/subscriptions/selling-plans) affects a line item. To learn about how to support selling plans in your theme, refer to [Purchase options](https://shopify.dev/themes/pricing-payments/purchase-options).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan)


Last Updated: 5th March 2024


`,type:"object",properties:{id:{type:"number",description:`The ID of the selling plan. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan/id)


Last Updated: 5th March 2024


`},name:{type:"string",description:`The name of the selling plan. 

**Note**

> The name is shown at checkout with the line item summary.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan/name)


Last Updated: 5th March 2024


`},description:{type:"string",description:`The description of the selling plan. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan/description)


Last Updated: 5th March 2024


`},group_id:{type:"string",description:`The ID of the [\`selling_plan_group\`](https://shopify.dev/docs/api/liquid/objects/selling_plan_group) that the selling plan belongs to. 

**Note**

> The name is shown at checkout with the line item summary.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan/group_id)


Last Updated: 5th March 2024


`},recurring_deliveries:{type:"boolean",description:`Returns \`true\` if the selling plan includes multiple deliveries. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan/recurring_deliveries)


Last Updated: 5th March 2024


`},options:{type:"array",description:`The selling plan options. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan/options)


Last Updated: 5th March 2024


`,scope:"selling_plan_option"},price_adjustments:{type:"array",description:`The selling plan price adjustments. The maximum length of the array is two. If the selling plan doesn't create any price adjustments, then the
array is empty.

Each \`selling_plan_price_adjustment\` maps to a [\`selling_plan_allocation_price_adjustment\`](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation_price_adjustment)
in the [\`selling_plan_allocation.price_adjustments\` array](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation#selling_plan_allocation-price_adjustments).
The \`selling_plan.price_adjustments\` array contains the intent of the selling plan, and the
\`selling_plan_allocation.price_adjustments\` contains the resulting money amounts.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan/price_adjustments)


Last Updated: 5th March 2024


`,scope:"selling_plan_price_adjustment"},selected:{type:"boolean",description:`Returns \`true\` if the selling plan is currently selected. Returns \`false\` if not. 

**Note**

> The selected selling plan is determined by the \`selling_plan\` URL parameter.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan/selected)


Last Updated: 5th March 2024


`},checkout_charge:{type:"object",description:`The checkout charge of the selling plan. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan/checkout_charge)


Last Updated: 5th March 2024


`,scope:"selling_plan_checkout_charge"}}},selling_plan_group:{summary:`Information about a specific group of [selling plans](/apps/subscriptions/selling-plans) that include any of a
product's variants.`,description:`Information about a specific group of [selling plans](https://shopify.dev/apps/subscriptions/selling-plans) that include any of a
product's variants. Selling plans are grouped based on shared [selling plan option names](https://shopify.dev/docs/api/liquid/objects/selling_plan_option#selling_plan_option-name).

To learn about how to support selling plans in your theme, refer to [Purchase options](https://shopify.dev/themes/pricing-payments/purchase-options).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_group)


Last Updated: 5th March 2024


`,type:"object",properties:{selling_plans:{type:"array",description:`The selling plans in the group. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_group/selling_plans)


Last Updated: 5th March 2024


`,scope:"selling_plan"},id:{type:"number",description:`The ID of the selling plan group. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_group/id)


Last Updated: 5th March 2024


`},name:{type:"string",description:`The name of the selling plan group. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_group/name)


Last Updated: 5th March 2024


`},app_id:{type:"string",description:`An optional string provided by an app to identify selling plan groups created by that app. If the app doesn't provide a value, then \`nil\` is returned.



**Tip**

> You can use this property, with the [\`where\` filter](https://shopify.dev/docs/api/liquid/filters/where), to filter the
> [\`product.selling_plan_groups\` array](https://shopify.dev/docs/api/liquid/objects/product#product-selling_plan_groups) for all selling plan groups
> from a specific app.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_group/app_id)


Last Updated: 5th March 2024


`},options:{type:"array",description:`The selling plan group options. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_group/options)


Last Updated: 5th March 2024


`,scope:"selling_plan_group_option"},selling_plan_selected:{type:"boolean",description:`Returns \`true\` if the currently selected selling plan is part of the selling plan group. Returns \`false\` if not. 

**Note**

> The selected selling plan is determined by the \`selling_plan\` URL parameter.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_group/selling_plan_selected)


Last Updated: 5th March 2024


`}}},selling_plan_group_option:{summary:"Information about a specific option in a [selling plan group](/docs/api/liquid/objects/selling_plan_group).",description:`Information about a specific option in a [selling plan group](https://shopify.dev/docs/api/liquid/objects/selling_plan_group). 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_group_option)


Last Updated: 5th March 2024


`,type:"object",properties:{name:{type:"string",description:`The name of the option. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_group_option/name)


Last Updated: 5th March 2024


`},position:{type:"number",description:`The 1-based index of the option in the [\`selling_plan_group.options\` array](https://shopify.dev/docs/api/liquid/objects/selling_plan_group#selling_plan_group-options). 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_group_option/position)


Last Updated: 5th March 2024


`},values:{type:"array",description:`The values of the option. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_group_option/values)


Last Updated: 5th March 2024


`},selected_value:{type:"string",description:`The option value of the currently selected selling plan. If no selling plan is currently selected, then \`nil\` is returned.



**Note**

> The selected selling plan is determined by the \`selling_plan\` URL parameter.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_group_option/selected_value)


Last Updated: 5th March 2024


`}}},selling_plan_option:{summary:"Information about a selling plan's value for a specific [`selling_plan_group_option`](/docs/api/liquid/objects/selling_plan_group_option).",description:`Information about a selling plan's value for a specific [\`selling_plan_group_option\`](https://shopify.dev/docs/api/liquid/objects/selling_plan_group_option). To learn about how to support selling plans in your theme, refer to [Purchase options](https://shopify.dev/themes/pricing-payments/purchase-options).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_option)


Last Updated: 5th March 2024


`,type:"object",properties:{name:{type:"string",description:`The name of the associated \`selling_plan_group_option\`. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_option/name)


Last Updated: 5th March 2024


`},position:{type:"number",description:`The 1-based index of the selling plan option in the associated [\`selling_plan_group.options\` array](https://shopify.dev/docs/api/liquid/objects/selling_plan_group#selling_plan_group-options). 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_option/position)


Last Updated: 5th March 2024


`},value:{type:"string",description:`The value of the selling plan option. The value is one of the [\`selling_plan_group_option.values\`](https://shopify.dev/docs/api/liquid/objects/selling_plan_group_option#selling_plan_group_option-values).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/selling_plan_option/value)


Last Updated: 5th March 2024


`}}},shipping_method:{summary:"Information about the shipping method for an order.",description:`Information about the shipping method for an order. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shipping_method)


Last Updated: 5th March 2024


`,type:"object",properties:{title:{type:"string",description:`The title of the shipping method. In most contexts, the shipping method title appears in the customer's preferred language. However, in the context of an
[order](https://shopify.dev/docs/api/liquid/objects/order), the shipping method title appears in the language that the customer checked out in.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shipping_method/title)


Last Updated: 5th March 2024


`},original_price:{type:"number",description:`The price of the shipping method in the currency's subunit, before discounts have been applied. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shipping_method/original_price)


Last Updated: 5th March 2024


`},price:{type:"number",description:`The price of the shipping method in the currency's subunit, after discounts have been applied. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shipping_method/price)


Last Updated: 5th March 2024


`},handle:{type:"string",description:`The [handle](https://shopify.dev/docs/api/liquid/basics#handles) of the shipping method. 

**Note**

> The price of the shipping method is appended to handle.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shipping_method/handle)


Last Updated: 5th March 2024


`},id:{type:"string",description:`The ID of the shipping method. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shipping_method/id)


Last Updated: 5th March 2024


`},tax_lines:{type:"array",description:`The tax lines for the shipping method. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shipping_method/tax_lines)


Last Updated: 5th March 2024


`,scope:"tax_line"},discount_allocations:{type:"array",description:`The discount allocations that apply to the shipping method. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shipping_method/discount_allocations)


Last Updated: 5th March 2024


`,scope:"discount_allocation"}}},shop:{summary:"Information about the store, such as the store address, the total number of products, and various settings.",global:!0,description:`Information about the store, such as the store address, the total number of products, and various settings. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop)


Last Updated: 5th March 2024


`,type:"object",properties:{id:{type:"string",description:`The ID of the store. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/id)


Last Updated: 5th March 2024


`},name:{type:"string",description:`The name of the store. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/name)


Last Updated: 5th March 2024


`},description:{type:"string",description:`The [description](https://help.shopify.com/manual/online-store/setting-up/preferences#edit-the-title-and-meta-description)
of the store. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/description)


Last Updated: 5th March 2024


`},enabled_currencies:{type:"array",description:`The currencies that the store accepts. 

**Tip**

> You can get the store's currency with [\`shop.currency\`](https://shopify.dev/docs/api/liquid/objects/shop#shop-currency).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/enabled_currencies)


Last Updated: 5th March 2024


`,scope:"currency"},published_locales:{type:"array",description:`The locales (languages) that are published on the store. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/published_locales)


Last Updated: 5th March 2024


`,scope:"shop_locale"},enabled_locales:{type:"array",description:`\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F

Deprecated because the name didn't make it clear that the returned locales were published.

The \`shop.enabled_locales\` property has been replaced by [\`shop.published_locales\`](/docs/api/liquid/objects/shop#shop-published_locales).

---

The locales (languages) that are published on the store. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/enabled_locales)


Last Updated: 5th March 2024


`,scope:"shop_locale"},locale:{type:"object",description:`\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F

Deprecated because this value is contextual to the request and not a property of the shop resource.

The \`shop.locale\` property has been replaced by [request.locale](/docs/api/liquid/objects/request#request-locale).

---

The currently active locale (language). 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/locale)


Last Updated: 5th March 2024


`,scope:"shop_locale"},url:{type:"string",description:`The full URL of the store. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/url)


Last Updated: 5th March 2024


`},email:{type:"string",description:`The [sender email](https://help.shopify.com/manual/intro-to-shopify/initial-setup/setup-your-email#change-your-sender-email-address)
of the store. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/email)


Last Updated: 5th March 2024


`},secure_url:{type:"string",description:`The full URL of the store, with an \`https\` protocol. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/secure_url)


Last Updated: 5th March 2024


`},domain:{type:"string",description:`The primary domain of the store. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/domain)


Last Updated: 5th March 2024


`},permanent_domain:{type:"string",description:`The \`.myshopify.com\` domain of the store. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/permanent_domain)


Last Updated: 5th March 2024


`},phone:{type:"string",description:`The phone number of the store. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/phone)


Last Updated: 5th March 2024


`},password_message:{type:"string",description:`The password page message of the store. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/password_message)


Last Updated: 5th March 2024


`},address:{type:"object",description:`The address of the store. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/address)


Last Updated: 5th March 2024


`,scope:"address"},customer_accounts_enabled:{type:"boolean",description:`Returns \`true\` if customer accounts are required to complete checkout. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/customer_accounts_enabled)


Last Updated: 5th March 2024


`},customer_accounts_optional:{type:"boolean",description:`Returns \`true\` if customer accounts are optional to complete checkout. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/customer_accounts_optional)


Last Updated: 5th March 2024


`},currency:{type:"string",description:`The currency of the store. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/currency)


Last Updated: 5th March 2024


`},money_format:{type:"object",description:`The money format of the store. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/money_format)


Last Updated: 5th March 2024


`,scope:"currency"},money_with_currency_format:{type:"object",description:`The money format of the store with the currency included. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/money_with_currency_format)


Last Updated: 5th March 2024


`,scope:"currency"},metafields:{type:22,description:`The [metafields](https://shopify.dev/docs/api/liquid/objects/metafield) applied to the store. 

**Tip**

> To learn about how to create metafields, refer to [Create and manage metafields](https://shopify.dev/apps/metafields/manage) or visit
> the [Shopify Help Center](https://help.shopify.com/manual/metafields).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/metafields)


Last Updated: 5th March 2024


`},enabled_payment_types:{type:"array",description:`The accepted payment types on the store. The payment types are based on the store's enabled [payment providers](https://help.shopify.com/manual/payments) and
the customer's current region and currency.



**Tip**

> You can output an \`svg\` logo for each payment type with the [\`payment_type_svg_tag\` filter](https://shopify.dev/docs/api/liquid/filters/payment_type_svg_tag).
> Alternatively, you can get the source URL for each \`svg\` with the [\`payment_type_img_url\` filter](https://shopify.dev/docs/api/liquid/filters/payment_type_img_url).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/enabled_payment_types)


Last Updated: 5th March 2024


`},taxes_included:{type:"boolean",description:`\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F

Deprecated because whether or not prices have taxes included is dependent on the customer's country.

The \`shop.taxes_included\` property has been replaced by [cart.taxes_included](/docs/api/liquid/objects/cart#cart-taxes_included).

---

Returns \`true\` if prices include taxes. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/taxes_included)


Last Updated: 5th March 2024


`},refund_policy:{type:"object",description:`The refund policy for the store. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/refund_policy)


Last Updated: 5th March 2024


`,scope:"policy"},shipping_policy:{type:"object",description:`The shipping policy for the store. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/shipping_policy)


Last Updated: 5th March 2024


`,scope:"policy"},privacy_policy:{type:"object",description:`The privacy policy for the store. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/privacy_policy)


Last Updated: 5th March 2024


`,scope:"policy"},terms_of_service:{type:"object",description:`The terms of service for the store. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/terms_of_service)


Last Updated: 5th March 2024


`,scope:"policy"},subscription_policy:{type:"object",description:`The subscription policy for the store. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/subscription_policy)


Last Updated: 5th March 2024


`,scope:"policy"},policies:{type:"array",description:`The policies for the store. The policies are set in the store's [Policies settings](https://www.shopify.com/admin/settings/legal).

#### Output the policies

\`\`\`liquid

<ul>
{%- for policy in shop.policies %}
  <li>{{ policy.title }}</li>
{%- endfor %}
</ul>

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/policies)


Last Updated: 5th March 2024


`,scope:"policy"},vendors:{type:"array",description:`All of the product vendors for the store. 



#### Output the vendors

\`\`\`liquid

{% for vendor in shop.vendors %}
  {{- vendor | link_to_vendor }}
{% endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/vendors)


Last Updated: 5th March 2024


`},types:{type:"array",description:`All of the product types in the store. 



#### Output the product types

\`\`\`liquid

{% for type in shop.types %}
  {{- type | link_to_type }}
{% endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/types)


Last Updated: 5th March 2024


`},products_count:{type:"number",description:`The number of products in the store. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/products_count)


Last Updated: 5th March 2024


`},collections_count:{type:"number",description:`The number of collections in the store. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/collections_count)


Last Updated: 5th March 2024


`},accepts_gift_cards:{type:"boolean",description:`Returns \`true\` if the store accepts gift cards. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/accepts_gift_cards)


Last Updated: 5th March 2024


`},brand:{type:"object",description:`The [brand assets](https://help.shopify.com/manual/promoting-marketing/managing-brand-assets) for the store. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/brand)


Last Updated: 5th March 2024


`,scope:"brand"},metaobjects:{type:22,description:`All of the [metaobjects](https://shopify.dev/docs/api/liquid/objects/metaobject) of the store. Metaobjects can only be accessed by specifying their type and handle. For more information, refer to [Access metaobjects individually](https://shopify.dev/docs/api/liquid/objects#metaobject-access-metaobjects-individually).

Metaobjects are created in the [Content](https://www.shopify.com/admin/content) page of the Shopify admin.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop/metaobjects)


Last Updated: 5th March 2024


`}}},shop_locale:{summary:"A language in a store.",description:`A language in a store. To learn how to offer localization options in your theme, refer to [Support multiple currencies and languages](https://shopify.dev/themes/internationalization/multiple-currencies-languages).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop_locale)


Last Updated: 5th March 2024


`,type:"object",properties:{name:{type:"string",description:`The name of the locale in the store's primary locale. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop_locale/name)


Last Updated: 5th March 2024


`},endonym_name:{type:"string",description:`The name of the locale in the locale itself. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop_locale/endonym_name)


Last Updated: 5th March 2024


`},iso_code:{type:"string",description:`The ISO code of the locale in [IETF language tag format](https://en.wikipedia.org/wiki/IETF_language_tag). 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop_locale/iso_code)


Last Updated: 5th March 2024


`},primary:{type:"boolean",description:`Returns \`true\` if the locale is the store's primary locale. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop_locale/primary)


Last Updated: 5th March 2024


`},root_url:{type:"string",description:`The relative root URL of the locale. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/shop_locale/root_url)


Last Updated: 5th March 2024


`}}},policy:{summary:"A [store policy](https://help.shopify.com/manual/checkout-settings/refund-privacy-tos), such as a privacy or return policy.",description:`A [store policy](https://help.shopify.com/manual/checkout-settings/refund-privacy-tos), such as a privacy or return policy. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/policy)


Last Updated: 5th March 2024


`,type:"object",properties:{id:{type:"string",description:`The ID of the policy. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/policy/id)


Last Updated: 5th March 2024


`},body:{type:"string",description:`The content of the policy. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/policy/body)


Last Updated: 5th March 2024


`},url:{type:"string",description:`The relative URL of the policy. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/policy/url)


Last Updated: 5th March 2024


`},title:{type:"string",description:`The title of the policy. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/policy/title)


Last Updated: 5th March 2024


`}}},store_availability:{summary:"A variant's inventory information for a physical store location.",description:`A variant's inventory information for a physical store location. If a location doesn't stock a variant, then there won't be a \`store_availability\` for that variant and location.



**Note**

> The \`store_availability\` object is defined only if one or more locations has [local pickup](https://help.shopify.com/manual/shipping/setting-up-and-managing-your-shipping/local-methods/local-pickup)
> enabled.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/store_availability)


Last Updated: 5th March 2024


`,type:"object",properties:{available:{type:"boolean",description:`Returns \`true\` if the variant has available inventory at the location. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/store_availability/available)


Last Updated: 5th March 2024


`},pick_up_enabled:{type:"boolean",description:`Returns \`true\` if the location has pickup enabled. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/store_availability/pick_up_enabled)


Last Updated: 5th March 2024


`},pick_up_time:{type:"string",description:`The amount of time that it takes for pickup orders to be ready at the location. 

**Tip**

> This value can be configured in the Shopify admin. To learn more, visit the [Shopify Help Center](https://help.shopify.com/en/manual/sell-in-person/shopify-pos/order-management/local-pickup-for-online-orders#manage-preferences-for-a-local-pickup-location).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/store_availability/pick_up_time)


Last Updated: 5th March 2024


`},location:{type:"object",description:`The location that the variant is stocked at. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/store_availability/location)


Last Updated: 5th March 2024


`,scope:"location"}}},tax_line:{summary:"Information about a tax line of a checkout or order.",description:`Information about a tax line of a checkout or order. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tax_line)


Last Updated: 5th March 2024


`,type:"object",properties:{title:{type:"string",description:`The title of the tax. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tax_line/title)


Last Updated: 5th March 2024


`},price:{type:"number",description:`The tax amount in the currency's subunit. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted price.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tax_line/price)


Last Updated: 5th March 2024


`},rate:{type:"number",description:`The decimal value of the tax rate. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tax_line/rate)


Last Updated: 5th March 2024


`},rate_percentage:{type:"number",description:`The decimal value of the tax rate, as a percentage. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/tax_line/rate_percentage)


Last Updated: 5th March 2024


`}}},theme:{summary:"Information about the current theme.",global:!0,deprecated:!0,description:`\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F

Deprecated because the values of this object's properties are subject to change, so can't be relied on within the theme.

If you want to link to the theme editor for the published theme, then you can use the URL path \`/admin/themes/current/editor\`.

While this object is deprecated in Liquid and shouldn't be used, you can still access it through the [REST Admin API](/api/admin-rest/current/resources/theme).

---

Information about the current theme. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/theme)


Last Updated: 5th March 2024


`,type:"object",properties:{id:{type:"number",description:`The ID of the theme. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/theme/id)


Last Updated: 5th March 2024


`,deprecated:!0},name:{type:"string",description:`The name of the theme. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/theme/name)


Last Updated: 5th March 2024


`,deprecated:!0},role:{type:"string",description:`The role of the theme. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/theme/role)


Last Updated: 5th March 2024


`,deprecated:!0,literal:["main","unpublished","demo","development"]}}},settings:{summary:"Allows you to access all of the theme's settings from the [`settings_schema.json` file](/themes/architecture/config/settings-schema-json).",global:!0,description:`Allows you to access all of the theme's settings from the [\`settings_schema.json\` file](https://shopify.dev/themes/architecture/config/settings-schema-json). 

**Tip**

> To learn about the available setting types, refer to [Input settings](https://shopify.dev/themes/architecture/settings/input-settings).

#### Reference a setting value

\`\`\`liquid

{% if settings.favicon != blank %}
  <link rel="icon" type="image/png" href="{{ settings.favicon | image_url: width: 32, height: 32 }}">
{% endif %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/settings)


Last Updated: 5th March 2024


`,const:!0},template:{summary:"Information about the current [template](/docs/themes/architecture/templates).",global:!0,description:`Information about the current [template](https://shopify.dev/docs/themes/architecture/templates). 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/template)


Last Updated: 5th March 2024


`,type:"object",properties:{name:{type:"string",description:`The name of the template's [type](https://shopify.dev/docs/themes/architecture/templates#template-types). 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/template/name)


Last Updated: 5th March 2024


`,literal:["404","article","blog","cart","collection","list-collections","customers/account","customers/activate_account","customers/addresses","customers/login","customers/order","customers/register","customers/reset_password","gift_card","index","page","password","product","search"]},suffix:{type:"string",description:`The custom name of an [alternate template](https://shopify.dev/themes/architecture/templates#alternate-templates). Returns \`nil\` if the default template is being used.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/template/suffix)


Last Updated: 5th March 2024


`},directory:{type:"string",description:`The name of the template's parent directory. Returns \`nil\` if the template's parent directory is \`/templates\`.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/template/directory)


Last Updated: 5th March 2024


`}}},transaction:{summary:"A transaction associated with a checkout or order.",description:`A transaction associated with a checkout or order. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction)


Last Updated: 5th March 2024


`,type:"object",properties:{id:{type:"number",description:`The ID of the transaction. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction/id)


Last Updated: 5th March 2024


`},name:{type:"string",description:`The name of the transaction. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction/name)


Last Updated: 5th March 2024


`},status:{type:"string",description:`The status of the transaction. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction/status)


Last Updated: 5th March 2024


`,literal:["success","pending","failure","error"]},created_at:{type:"string",description:`A timestamp of when the transaction was created. 

**Tip**

> Use the [\`date\` filter](https://shopify.dev/docs/api/liquid/filters/date) to format the timestamp.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction/created_at)


Last Updated: 5th March 2024


`},receipt:{type:"string",description:`Information from the payment provider about the payment receipt. This includes things like whether the payment was a test, or an authorization code if there was one.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction/receipt)


Last Updated: 5th March 2024


`},kind:{type:"string",description:`The type of transaction. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction/kind)


Last Updated: 5th March 2024


`,literal:["authorization","capture","sale","void","refund"]},gateway:{type:"string",description:`The [handleized](https://shopify.dev/docs/api/liquid/basics#modifying-handles) name of the payment provider used for the transaction. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction/gateway)


Last Updated: 5th March 2024


`},status_label:{type:"string",description:`The status of the transaction, translated based on the current locale. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction/status_label)


Last Updated: 5th March 2024


`},payment_details:{type:"object",description:`The transaction payment details. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction/payment_details)


Last Updated: 5th March 2024


`,scope:"transaction_payment_details"},amount:{type:"number",description:`The amount of the transaction in the currency's subunit. The amount is in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction/amount)


Last Updated: 5th March 2024


`},gateway_display_name:{type:"string",description:`The name of the payment provider used for the transaction. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction/gateway_display_name)


Last Updated: 5th March 2024


`},"show_buyer_pending_payment_instructions?":{type:"boolean",description:`Whether the transaction is pending, and whether additional customer info is required to process the payment. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction/show_buyer_pending_payment_instructions?)


Last Updated: 5th March 2024


`},buyer_pending_payment_notice:{type:"string",description:`A notice that contains instructions for the customer on how to complete their payment.
The messages are specific to the payment method used. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction/buyer_pending_payment_notice)


Last Updated: 5th March 2024


`},buyer_pending_payment_instructions:{type:"array",description:`A list of \`pending_payment_instruction_input\` header-value pairs, with payment method-specific details.
The customer can use these details to complete their purchase offline.

If the payment method doesn\u2019t support pending payment instructions, then an empty array is returned.

| Supported payment method | Expected Values |
| --- | ----------- |
| ShopifyPayments - Multibanco | [{header="Entity", value="12345"}, {header="Reference", value="999999999"}] | 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction/buyer_pending_payment_instructions)


Last Updated: 5th March 2024


`,scope:"pending_payment_instruction_input"}}},unit_price_measurement:{summary:`Information about how units of a product variant are measured. It's used to calculate
[unit prices](https://help.shopify.com/manual/intro-to-shopify/initial-setup/sell-in-france/price-per-unit#add-unit-prices-to-your-product).`,description:`Information about how units of a product variant are measured. It's used to calculate
[unit prices](https://help.shopify.com/manual/intro-to-shopify/initial-setup/sell-in-france/price-per-unit#add-unit-prices-to-your-product). 

**Note**

> Unit prices are available only to stores located in Germany and France.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/unit_price_measurement)


Last Updated: 5th March 2024


`,type:"object",properties:{measured_type:{type:"string",description:`The type of unit measurement. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/unit_price_measurement/measured_type)


Last Updated: 5th March 2024


`,literal:["volume","weight","dimension"]},quantity_value:{type:"number",description:`The quantity of the unit. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/unit_price_measurement/quantity_value)


Last Updated: 5th March 2024


`},quantity_unit:{type:"string",description:`The unit of measurement used to measure the [\`quantity_value\`](https://shopify.dev/docs/api/liquid/objects/unit_price_measurement#unit_price_measurement-quantity_value). 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/unit_price_measurement/quantity_unit)


Last Updated: 5th March 2024


`},reference_value:{type:"number",description:`The quantity of the unit for the base unit price. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/unit_price_measurement/reference_value)


Last Updated: 5th March 2024


`},reference_unit:{type:"string",description:`The unit of measurement used to measure the [\`reference_value\`](https://shopify.dev/docs/api/liquid/objects/unit_price_measurement#unit_price_measurement-reference_value). 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/unit_price_measurement/reference_unit)


Last Updated: 5th March 2024


`}}},user:{summary:"The author of a blog article.",description:`The author of a blog article. 

**Tip**

> The information returned by the \`user\` object can be edited on the [**Account** page](https://www.shopify.com/admin/settings/account)
> of the Shopify admin.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/user)


Last Updated: 5th March 2024


`,type:"object",properties:{account_owner:{type:"boolean",description:`Returns \`true\` if the author is the account owner of the store. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/user/account_owner)


Last Updated: 5th March 2024


`},bio:{type:"string",description:`The bio associated with the author's account. If no bio is specified, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/user/bio)


Last Updated: 5th March 2024


`},email:{type:"string",description:`The email associated with the author's account. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/user/email)


Last Updated: 5th March 2024


`},first_name:{type:"string",description:`The first name associated with the author's account. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/user/first_name)


Last Updated: 5th March 2024


`},homepage:{type:"string",description:`The URL for the personal website associated with the author's account. If no personal website is specified, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/user/homepage)


Last Updated: 5th March 2024


`},image:{type:"object",description:`The image associated with the author's account. If no image is specified, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/user/image)


Last Updated: 5th March 2024


`,scope:"image"},last_name:{type:"string",description:`The last name associated with the author's account. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/user/last_name)


Last Updated: 5th March 2024


`},name:{type:"string",description:`The first and last name associated with the author's account. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/user/name)


Last Updated: 5th March 2024


`}}},video:{summary:"Information about a video uploaded as [product media](/docs/api/liquid/objects/product-media) or a [`file_reference` metafield](/apps/metafields/types).",description:`Information about a video uploaded as [product media](https://shopify.dev/docs/api/liquid/objects/product-media) or a [\`file_reference\` metafield](https://shopify.dev/apps/metafields/types). 

**Tip**

> Use the [\`video_tag\` filter](https://shopify.dev/docs/api/liquid/filters/video_tag) to output the video in an HTML \`<video>\` tag.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/video)


Last Updated: 5th March 2024


`,type:"object",properties:{sources:{type:"array",description:`The source files for the video. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/video/sources)


Last Updated: 5th March 2024


`,scope:"video_source"},duration:{type:"number",description:`The duration of the video in milliseconds. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/video/duration)


Last Updated: 5th March 2024


`},aspect_ratio:{type:"number",description:`The aspect ratio of the video as a decimal. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/video/aspect_ratio)


Last Updated: 5th March 2024


`},alt:{type:"string",description:`The alt text of the video. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/video/alt)


Last Updated: 5th March 2024


`},id:{type:"number",description:`The ID of the video. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/video/id)


Last Updated: 5th March 2024


`},media_type:{type:"string",description:`The media type of the model. Always returns \`video\`. 



#### Filter for media of a specific type

You can use the \`media_type\` property with the [\`where\` filter](/docs/api/liquid/filters/where) to filter the [\`product.media\` array](/docs/api/liquid/objects/product#product-media) for all media of a desired type.


\`\`\`liquid

{% assign videos = product.media | where: 'media_type', 'video' %}

{% for video in videos %}
  {{- video | video_tag }}
{% endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/video/media_type)


Last Updated: 5th March 2024


`},position:{type:"number",description:`The position of the video in the [\`product.media\`](https://shopify.dev/docs/api/liquid/objects/product#product-media) array. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/video/position)


Last Updated: 5th March 2024


`},preview_image:{type:"object",description:`A preview image for the video. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/video/preview_image)


Last Updated: 5th March 2024


`,scope:"image"}}},video_source:{summary:"Information about the source files for a video.",description:`Information about the source files for a video. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/video_source)


Last Updated: 5th March 2024


`,type:"object",properties:{width:{type:"number",description:`The width of the video source file. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/video_source/width)


Last Updated: 5th March 2024


`},format:{type:"string",description:`The format of the video source file. 

**Note**

> When mp4 videos are uploaded, Shopify generates an m3u8 file as an additional video source. An m3u8 file enables video
> players to leverage HTTP live streaming (HLS), resulting in an optimized video experience based on the user's internet
> connection.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/video_source/format)


Last Updated: 5th March 2024


`,literal:["mov","mp4","m3u8"]},height:{type:"number",description:`The height of the video source file. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/video_source/height)


Last Updated: 5th March 2024


`},mime_type:{type:"string",description:`The [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) of the video source file. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/video_source/mime_type)


Last Updated: 5th March 2024


`},url:{type:"string",description:`The [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) of the video source file. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/video_source/url)


Last Updated: 5th March 2024


`}}},additional_checkout_buttons:{summary:"Returns `true` if a store has any payment providers with offsite checkouts, such as PayPal Express Checkout.",global:!0,description:`Returns \`true\` if a store has any payment providers with offsite checkouts, such as PayPal Express Checkout. Use \`additional_checkout_buttons\` to check whether these payment providers exist, and
[\`content_for_additional_checkout_buttons\`](https://shopify.dev/docs/api/liquid/objects/content_for_additional_checkout_buttons)
to show the associated checkout buttons. To learn more about how to use these objects, refer to
[Accelerated checkout](https://shopify.dev/themes/pricing-payments/accelerated-checkout).

\`\`\`liquid
{% if additional_checkout_buttons %}
  {{ content_for_additional_checkout_buttons }}
{% endif %}
\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/additional_checkout_buttons)


Last Updated: 5th March 2024


`,type:"boolean",const:!0},all_country_option_tags:{summary:"Creates an `&lt;option&gt;` tag for each country.",global:!0,description:`Creates an \`<option>\` tag for each country. An attribute called \`data-provinces\` is set for each \`<option>\`, and contains a JSON-encoded array of the
country or region's subregions. If a country doesn't have any subregions, then an empty array is set for
its \`data-provinces\` attribute.



**Tip**

> To return only the countries and regions included in the store's shipping zones, use the [\`country_option_tags\` object](https://shopify.dev/docs/api/liquid/objects/country_option_tags).

#### Example

You can wrap the \`all_country_option_tags\` object in \`<select>\` tags to build a country option selector.

\`\`\`liquid
<select name="country">
  {{ all_country_option_tags }}
</select>
\`\`\`


---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/all_country_option_tags)


Last Updated: 5th March 2024


`,type:"string",const:!0},canonical_url:{summary:"The canonical URL for the current page.",global:!0,description:`The canonical URL for the current page. To learn about canonical URLs, refer to [Google's documentation](https://support.google.com/webmasters/answer/139066?hl=en).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/canonical_url)


Last Updated: 5th March 2024


`,type:"string",const:!0},checkout:{summary:"A customer's checkout.",template:["checkout"],description:`A customer's checkout.

> Deprecated:
> <p>The <code>checkout</code> object will be deprecated for the Information, Shipping, and Payment pages on August 13, 2024. Merchants who have customized these pages using <code>checkout.liquid</code> need to <a href="https://help.shopify.com/manual/online-store/themes/theme-structure/extend/checkout-migration#migrate-to-checkout-extensibility">upgrade to Checkout Extensibility</a> before August 13, 2024.</p>
> <p>Learn <a href="/apps/checkout">how to build checkout extensions</a> that extend the functionality of Shopify checkout.</p>

You can access the \`checkout\` object on the [**Order status** page](https://help.shopify.com/manual/orders/status-tracking/customize-order-status).

Shopify Plus merchants can access the \`checkout\` object in the [\`checkout.liquid\` layout](https://shopify.dev/themes/architecture/layouts/checkout-liquid).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout)


Last Updated: 5th March 2024


`,type:"object",properties:{applied_gift_cards:{type:"array",description:`The gift cards applied to the checkout. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/applied_gift_cards)


Last Updated: 5th March 2024


`,scope:"gift_card"},attributes:{type:"any",description:`Additional attributes entered by the customer with the [cart](https://shopify.dev/docs/api/liquid/objects/cart#cart-attributes). Shopify Plus merchants that have access to \`checkout.liquid\` can [capture attributes at checkout](https://shopify.dev/themes/architecture/layouts/checkout-liquid#capture-checkout-attributes).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/attributes)


Last Updated: 5th March 2024


`},billing_address:{type:"object",description:`The billing address entered at checkout. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/billing_address)


Last Updated: 5th March 2024


`,scope:"address"},buyer_accepts_marketing:{type:"boolean",description:`Returns \`true\` if the customer checks the email marketing subscription checkbox. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/buyer_accepts_marketing)


Last Updated: 5th March 2024


`},cancelled:{type:"boolean",description:`\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F

Deprecated because \`false\` is always returned.

---

Returns \`true\` if the checkout has been cancelled. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/cancelled)


Last Updated: 5th March 2024


`},cart_level_discount_applications:{type:"array",description:`The cart-specific discount applications for the checkout. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/cart_level_discount_applications)


Last Updated: 5th March 2024


`,scope:"discount_application"},currency:{type:"string",description:`The [ISO code](https://www.iso.org/iso-4217-currency-codes.html) of the currency of the checkout. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/currency)


Last Updated: 5th March 2024


`},customer:{type:"object",description:`The customer associated with the checkout.
> Note:
> The [\`customer\` object](https://shopify.dev/docs/api/liquid/objects/customer) is directly accessible globally when a customer is logged in to their account. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/customer)


Last Updated: 5th March 2024


`,scope:"customer"},discount:{type:"object",description:`\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F

Deprecated because an unsaved discount doesn't exist on the [**Order status** page](https://help.shopify.com/manual/orders/status-tracking).

---

A discount applied to the checkout without being saved. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/discount)


Last Updated: 5th March 2024


`,scope:"discount"},discounts:{type:"array",description:`\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F

Deprecated because not all discount types and details are captured.

The \`checkout.discounts\` property has been replaced by [\`checkout.discount_applications\`](/docs/api/liquid/objects/checkout#checkout-discount_applications).

---

The discounts applied to the checkout. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/discounts)


Last Updated: 5th March 2024


`,scope:"discount"},discount_applications:{type:"array",description:`The discount applications for the checkout. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/discount_applications)


Last Updated: 5th March 2024


`,scope:"discount_application"},discounts_amount:{type:"array",description:`The total amount of the discounts applied to the checkout in the currency's subunit. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/discounts_amount)


Last Updated: 5th March 2024


`,scope:"discount_application"},discounts_savings:{type:"array",description:`The total amount of the discounts applied to the checkout in the currency's subunit, as a negative value. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/discounts_savings)


Last Updated: 5th March 2024


`,scope:"discount_application"},email:{type:"string",description:`The email associated with the checkout. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/email)


Last Updated: 5th March 2024


`},financial_status:{type:"string",description:`\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F

Deprecated because \`nil\` is always returned.

---

The financial status of the checkout. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/financial_status)


Last Updated: 5th March 2024


`},fulfilled_at:{type:"string",description:`\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F

Deprecated because \`nil\` is always returned.

---

A timestamp for the fulfullment of the checkout. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/fulfilled_at)


Last Updated: 5th March 2024


`},fulfilled_line_items:{type:"array",description:`\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F

Deprecated because the array is always empty.

---

The fulfilled line items from the checkout. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/fulfilled_line_items)


Last Updated: 5th March 2024


`,scope:"line_item"},fulfillment_status:{type:"string",description:`\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F

Deprecated because \`unfulfilled\` is always returned.

---

The fulfillment status of the checkout. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/fulfillment_status)


Last Updated: 5th March 2024


`},gift_cards_amount:{type:"number",description:`The amount of the checkout price paid in gift cards. The value is output in the customer's local (presentment) currency.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/gift_cards_amount)


Last Updated: 5th March 2024


`},id:{type:"number",description:`The ID of the checkout. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/id)


Last Updated: 5th March 2024


`},line_items:{type:"array",description:`The line items of the checkout. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/line_items)


Last Updated: 5th March 2024


`,scope:"line_item"},line_items_subtotal_price:{type:"number",description:`The sum of the prices of all of the line items of the checkout in the currency's subunit, after any line item discounts.
have been applied. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/line_items_subtotal_price)


Last Updated: 5th March 2024


`},name:{type:"number",description:`The name of the checkout. This value is the same as [\`checkout.id\`](https://shopify.dev/docs/api/liquid/objects/checkout#checkout-id) with a \`#\` prepended to it.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/name)


Last Updated: 5th March 2024


`},note:{type:"string",description:`Additional information entered by the customer with the [cart](https://shopify.dev/docs/api/liquid/objects/cart#cart-note). 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/note)


Last Updated: 5th March 2024


`},order:{type:"object",description:`The order created by the checkout. Depending on the payment provider, the order might not have been created when the [**Thank you** page](https://help.shopify.com/en/manual/orders/status-tracking)
is first viewed. In this case, \`nil\` is returned.


**Note**

> The \`order\` object isn't available on the **Thank you** page.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/order)


Last Updated: 5th March 2024


`,scope:"order"},order_id:{type:"string",description:`The ID of the order created by the checkout. The value is the same as [\`order.id\`](https://shopify.dev/docs/api/liquid/objects/order#order-id).

Depending on the payment provider, the order might not have been created when the [**Order status** page](https://help.shopify.com/en/manual/orders/status-tracking)
is first viewed. In this case, \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/order_id)


Last Updated: 5th March 2024


`},order_name:{type:"string",description:`The name of the order created by the checkout. The value is the same as [\`order.name\`](https://shopify.dev/docs/api/liquid/objects/order#order-name).

Depending on the payment provider, the order might not have been created when the [**Order status** page](https://help.shopify.com/en/manual/orders/status-tracking)
is first viewed. In this case, \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/order_name)


Last Updated: 5th March 2024


`},order_number:{type:"string",description:`An integer representation of the name of the order created by the checkout. The value is the same as [\`order.order_number\`](https://shopify.dev/docs/api/liquid/objects/order#order-order_number).

Depending on the payment provider, the order might not have been created when the [**Order status** page](https://help.shopify.com/en/manual/orders/status-tracking)
is first viewed. In this case, \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/order_number)


Last Updated: 5th March 2024


`},requires_shipping:{type:"boolean",description:`Returns \`true\` if any of the line items of the checkout require shipping. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/requires_shipping)


Last Updated: 5th March 2024


`},shipping_address:{type:"object",description:`The shipping address of the checkout. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/shipping_address)


Last Updated: 5th March 2024


`,scope:"address"},shipping_method:{type:"object",description:`The shipping method of the checkout. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/shipping_method)


Last Updated: 5th March 2024


`,scope:"shipping_method"},shipping_price:{type:"number",description:`The shipping price of the checkout in the currency's subunit. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/shipping_price)


Last Updated: 5th March 2024


`},tax_lines:{type:"array",description:`The tax lines for the checkout. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/tax_lines)


Last Updated: 5th March 2024


`,scope:"tax_line"},tax_price:{type:"number",description:`The total tax amount of the checkout in the currency's subunit. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/tax_price)


Last Updated: 5th March 2024


`},total_price:{type:"number",description:`The total price of the checkout in the currency's subunit. The value is output in the customer's local (presentment) currency.

For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.



**Tip**

> Use [money filters](https://shopify.dev/docs/api/liquid/filters/money-filters) to output a formatted amount.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/total_price)


Last Updated: 5th March 2024


`},transactions:{type:"array",description:`The transactions of the checkout. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/transactions)


Last Updated: 5th March 2024


`,scope:"transaction"},unavailable_line_items:{type:"array",description:`\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F

Deprecated because the array is always empty.

---

The unavailable line items of the checkout. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/unavailable_line_items)


Last Updated: 5th March 2024


`,scope:"line_item"},unfulfilled_line_items:{type:"array",description:`\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F

Deprecated because the array is always the same as [\`checkout.line_items\`](/docs/api/liquid/objects/checkout#checkout-line_items).

---

The unfulfilled line items of the checkout. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/unfulfilled_line_items)


Last Updated: 5th March 2024


`,scope:"line_item"},item_count:{type:"number",description:`The number of items in the checkout. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/checkout/item_count)


Last Updated: 5th March 2024


`}}},comment:{summary:"An article comment.",description:`An article comment. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/comment)


Last Updated: 5th March 2024


`,type:"object",properties:{author:{type:"string",description:`The full name of the author of the comment. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/comment/author)


Last Updated: 5th March 2024


`},content:{type:"string",description:`The content of the comment. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/comment/content)


Last Updated: 5th March 2024


`},created_at:{type:"string",description:`A timestamp for when the comment was created. 

**Tip**

> Use the [\`date\` filter](https://shopify.dev/docs/api/liquid/filters/date) to format the timestamp.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/comment/created_at)


Last Updated: 5th March 2024


`},email:{type:"string",description:`The email of he author of the comment. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/comment/email)


Last Updated: 5th March 2024


`},id:{type:"number",description:`The ID of the comment. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/comment/id)


Last Updated: 5th March 2024


`},status:{type:"string",description:`The status of the comment. Always returns \`published\`. Outside of the Liquid context, the status of a comment can vary based on spam detection and whether blog comments are
moderated. However, only comments with a status of \`published\` are included in the [\`article.comments\` array](https://shopify.dev/docs/api/liquid/objects/article#article-comments).



**Tip**

> To learn more about blog comments, visit the [Shopify Help Center](https://help.shopify.com/manual/online-store/blogs/managing-comments).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/comment/status)


Last Updated: 5th March 2024


`},updated_at:{type:"string",description:`A timestamp for when the status of the comment was last updated. 

**Tip**

> Use the [\`date\` filter](https://shopify.dev/docs/api/liquid/filters/date) to format the timestamp.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/comment/updated_at)


Last Updated: 5th March 2024


`},url:{type:"string",description:`The relative URL of the article that the comment is associated with, with [\`comment.id\`](https://shopify.dev/docs/api/liquid/objects/comment#comment-id)
appended. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/comment/url)


Last Updated: 5th March 2024


`}}},content_for_additional_checkout_buttons:{summary:"Returns checkout buttons for any active payment providers with offsite checkouts.",global:!0,description:`Returns checkout buttons for any active payment providers with offsite checkouts. Use [\`additional_checkout_buttons\`](https://shopify.dev/docs/api/liquid/objects/additional_checkout_buttons)
to check whether these payment providers exist, and \`content_for_additional_checkout_buttons\`
to show the associated checkout buttons. To learn more about how to use these objects, refer to
[Accelerated checkout](https://shopify.dev/themes/pricing-payments/accelerated-checkout).

\`\`\`liquid
{% if additional_checkout_buttons %}
  {{ content_for_additional_checkout_buttons }}
{% endif %}
\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/content_for_additional_checkout_buttons)


Last Updated: 5th March 2024


`,type:"string",const:!0},content_for_index:{summary:"Dynamically returns the content of [sections](/themes/architecture/sections) to be rendered on the home page.",global:!0,description:`Dynamically returns the content of [sections](https://shopify.dev/themes/architecture/sections) to be rendered on the home page. If you use a [Liquid index template](https://shopify.dev/themes/architecture/templates/index-template) (\`templates/index.liquid\`), then you must include \`{{ content_for_index }}\` in the template. This object can't be used in JSON index templates.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/content_for_index)


Last Updated: 5th March 2024


`,type:"string",const:!0},content_for_layout:{summary:"Dynamically returns content based on the current [template](/themes/architecture/templates).",global:!0,description:`Dynamically returns content based on the current [template](https://shopify.dev/themes/architecture/templates). Include the \`content_for_layout\` object in your [layout files](https://shopify.dev/themes/architecture/layouts) between the \`<body>\` and
\`</body>\` HTML tags.



**Note**

> The \`content_for_layout\` object is required in \`theme.liquid\`.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/content_for_layout)


Last Updated: 5th March 2024


`,type:"string",const:!0},country_option_tags:{summary:"Creates an `&lt;option&gt;` tag for each country and region that's included in a shipping zone on the [Shipping](https://www.shopify.com/admin/settings/shipping) page of the Shopify admin.",global:!0,description:`Creates an \`<option>\` tag for each country and region that's included in a shipping zone on the [Shipping](https://www.shopify.com/admin/settings/shipping) page of the Shopify admin. An attribute called \`data-provinces\` is set for each \`<option>\`, and contains a JSON-encoded array of the
country or region's subregions. If a country doesn't have any subregions, then an empty array is set for its
\`data-provinces\` attribute.



**Tip**

> To return all countries and regions included in the store's shipping zones, use [\`all_country_option_tags\`](https://shopify.dev/docs/api/liquid/objects/all_country_option_tags).

#### Example

You can wrap the \`country_option_tags\` object in \`<select>\` tags to build a country option selector.

\`\`\`liquid

<select name="country">
  {{ country_option_tags }}
</select>

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/country_option_tags)


Last Updated: 5th March 2024


`,type:"string",const:!0},current_page:{summary:"The current page number.",global:!0,description:`The current page number. The \`current_page\` object has a value of 1 for non-paginated resources.

#### Example

\`\`\`liquid

{{ page_title }}{% unless current_page == 1 %} - Page {{ current_page }}{% endunless %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/current_page)


Last Updated: 5th March 2024


`,type:"number",const:!0},current_tags:{summary:"The currently applied tags.",template:["blog","collection"],description:`The currently applied tags. You can [add tags](https://help.shopify.com/en/manual/shopify-admin/productivity-tools/using-tags) to articles and
products. Article tags can be used to [filter a blog page](https://shopify.dev/themes/architecture/templates/blog#filter-articles-by-tag)
to show only articles with specific tags. Similarly, product tags can be used to [filter a collection page](https://shopify.dev/themes/navigation-search/filtering/tag-filtering)
to show only products with specific tags.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/current_tags)


Last Updated: 5th March 2024


`,type:"array"},form_errors:{summary:"The error category strings for errors from a form created by a [`form` tag](/docs/api/liquid/tags/form).",description:`The error category strings for errors from a form created by a [\`form\` tag](https://shopify.dev/docs/api/liquid/tags/form). The following table outlines the strings that can be returned and the reason that they would be:

| Form property name | Return reason |
| --- | --- |
| \`author\` | There were issues with required name fields. |
| \`body\` | There were issues with required text content fields. |
| \`email\` | There were issues with required email fields. |
| \`form\` | There were general issues with the form. |
| \`password\` | There were issues with required password fields. |

#### Output form errors

You can output the name of the field related to the error, and the error message, by using the error as a key to access the \`translated_fields\` and \`messages\` properties.

\`\`\`liquid
<ul>
  {% for error in form.errors %}
    <li>
      {% if error == 'form' %}
        {{ form.errors.messages[error] }}
      {% else %}
        {{ form.errors.translated_fields[error] }} - {{ form.errors.messages[error] }}
      {% endif %}
    </li>
  {% endfor %}
</ul>
\`\`\`


---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form_errors)


Last Updated: 5th March 2024


`,type:"object",properties:{messages:{type:"array",description:`The translated error messages for each value in the \`form_errors\` array. You can access a specific message in the array by using a specific error from the \`form_errors\` array as a key.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form_errors/messages)


Last Updated: 5th March 2024


`},translated_fields:{type:"array",description:`The translated names for each value in the \`form_errors\` array. You can access a specific field in the array by using a specific error from the \`form_errors\` array as a key.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/form_errors/translated_fields)


Last Updated: 5th March 2024


`}}},handle:{summary:"The [handle](/docs/api/liquid/basics#handles) of the resource associated with the current template.",global:!0,description:`The [handle](https://shopify.dev/docs/api/liquid/basics#handles) of the resource associated with the current template. The \`handle\` object will return a value only when the following templates are being viewed:

- [article](https://shopify.dev/themes/architecture/templates/article)
- [blog](https://shopify.dev/themes/architecture/templates/blog)
- [collection](https://shopify.dev/themes/architecture/templates/collection)
- [page](https://shopify.dev/themes/architecture/templates/page)
- [product](https://shopify.dev/themes/architecture/templates/product)

If none of the above templates are being viewed, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/handle)


Last Updated: 5th March 2024


`,type:"string",const:!0},page_description:{summary:"The meta description of the current page.",global:!0,description:`The meta description of the current page. The \`page_description\` object can be used to provide a brief description of a page for search engine listings and social
media previews.

To learn about where to edit the meta description for a page, visit the [Shopify Help Center](https://help.shopify.com/manual/promoting-marketing/seo/adding-keywords#edit-the-title-and-meta-description-for-a-page).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/page_description)


Last Updated: 5th March 2024


`,type:"string",const:!0},page_image:{summary:"An image to be shown in search engine listings and social media previews for the current page.",global:!0,description:`An image to be shown in search engine listings and social media previews for the current page. The resource's featured image for product and collection pages, and blog posts, is used. For all other pages, or pages where
there's no featured image, the [social sharing image](https://help.shopify.com/manual/online-store/images/showing-social-media-thumbnail-images?#setting-the-social-sharing-image-in-your-admin)
is used.

### Open Graph fallback tags

The \`page_image\` object can be used for creating [Open Graph](https://ogp.me/) \`og:image\` meta tags.

If a theme doesn't include \`og:image\` tags for a page, then Shopify automatically generates the following tags using the
\`page_image\` object:

- \`og:image\`
- \`og:image:secure_url\`
- \`og:image:width\`
- \`og:image:height\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/page_image)


Last Updated: 5th March 2024


`,type:"object",scope:"image",const:!0},page_title:{summary:"The page title of the current page.",global:!0,description:`The page title of the current page. The \`page_title\` object can be used to specify the title of page for search engine listings and social media previews.

To learn about where to edit the title for a page, visit the [Shopify Help Center](https://help.shopify.com/manual/promoting-marketing/seo/adding-keywords#edit-the-title-and-meta-description-for-a-page).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/page_title)


Last Updated: 5th March 2024


`,type:"string",const:!0},part:{summary:"A part in the navigation for pagination.",description:`A part in the navigation for pagination. 



#### Create pagination navigation with \`part\`

You can create a pagination navigation by iterating over each \`part\` of a [\`paginate\` object](/docs/api/liquid/objects/paginate).


\`\`\`liquid

{% paginate collection.products by 5 -%}
  {% for part in paginate.parts -%}
    {% if part.is_link -%}
      {{ part.title | link_to: part.url}}
    {%- else -%}
      <span>{{ part.title }}</span>
    {% endif %}
  {%- endfor %}
{%- endpaginate %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/part)


Last Updated: 5th March 2024


`,type:"object",properties:{is_link:{type:"boolean",description:`Returns \`true\` if the part is a link. Returns \`false\` if not. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/part/is_link)


Last Updated: 5th March 2024


`},title:{type:"string",description:`The page number associated with the part. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/part/title)


Last Updated: 5th March 2024


`},url:{type:"string",description:`The URL of the part. It consists of the current page URL path with the pagination parameter for the current part appended.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/part/url)


Last Updated: 5th March 2024


`}}},pending_payment_instruction_input:{summary:`Header-value pairs that make up the list of payment information specific to the payment method.
This information can be be used by the customer to complete the transaction offline.`,description:`Header-value pairs that make up the list of payment information specific to the payment method.
This information can be be used by the customer to complete the transaction offline. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/pending_payment_instruction_input)


Last Updated: 5th March 2024


`,type:"object",properties:{header:{type:"string",description:`The header of the payment instruction.
These are payment method-specific. Example: "Entity" and "Reference" for Multibanco 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/pending_payment_instruction_input/header)


Last Updated: 5th March 2024


`},value:{type:"string",description:`Contains the corresponding values to the headers of the payment instruction. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/pending_payment_instruction_input/value)


Last Updated: 5th March 2024


`}}},powered_by_link:{summary:"Creates an HTML link element that links to a localied version of `shopify.com`, based on the locale of the store.",global:!0,description:`Creates an HTML link element that links to a localied version of \`shopify.com\`, based on the locale of the store. 



#### Example

\`\`\`liquid

{{ powered_by_link }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/powered_by_link)


Last Updated: 5th March 2024


`,const:!0},predictive_search_resources:{summary:"Contains arrays of objects for each resource type that can be returned by a [predictive search query](/api/ajax/reference/predictive-search#get-locale-search-suggest).",description:`Contains arrays of objects for each resource type that can be returned by a [predictive search query](https://shopify.dev/api/ajax/reference/predictive-search#get-locale-search-suggest). You can check whether any resources of a specific type were returned using the [\`size\` filter](https://shopify.dev/docs/api/liquid/filters/size).

\`\`\`liquid
{% if predictive_search.resources.articles.size > 0 %}
  {% for article in predictive_search.resources.articles %}
    {{ article.title }}
  {% endfor %}
{% endif %}
\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/predictive_search_resources)


Last Updated: 5th March 2024


`,type:"object",properties:{articles:{type:"array",description:`The articles associated with the query. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/predictive_search_resources/articles)


Last Updated: 5th March 2024


`,scope:"article"},collections:{type:"array",description:`The collections associated with the query. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/predictive_search_resources/collections)


Last Updated: 5th March 2024


`,scope:"collection"},pages:{type:"array",description:`The pages associated with the query. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/predictive_search_resources/pages)


Last Updated: 5th March 2024


`,scope:"page"},products:{type:"array",description:`The products associated with the query. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/predictive_search_resources/products)


Last Updated: 5th March 2024


`,scope:"product"}}},quantity_rule:{summary:"A variant order quantity rule.",description:`A variant order quantity rule. If no rule exists, then a default value is returned.

This rule can be set as part of a [B2B catalog](https://help.shopify.com/manual/b2b/catalogs/quantity-pricing).



**Note**

> The default quantity rule is \`min=1,max=null,increment=1\`.

#### The variant order quantity rule

\`\`\`liquid

{{ product.variants.first.quantity_rule }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/quantity_rule)


Last Updated: 5th March 2024


`,type:"object",properties:{min:{type:"number",description:`The minimum order quantity. The default value is \`1\`. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/quantity_rule/min)


Last Updated: 5th March 2024


`},max:{type:"number",description:`The maximum order quantity. If there is no maximum quantity, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/quantity_rule/max)


Last Updated: 5th March 2024


`},increment:{type:"number",description:`The number the order quantity can be incremented by. The default value is \`1\`. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/quantity_rule/increment)


Last Updated: 5th March 2024


`}}},scripts:{summary:`The active scripts, of each script type, on the store.
&gt; Caution:
&gt; Shopify Scripts will be sunset on August 28, 2025. Migrate your existing scripts to [Shopify Functions](/docs/api/functions) before this date.`,global:!0,description:`The active scripts, of each script type, on the store.
> Caution:
> Shopify Scripts will be sunset on August 28, 2025. Migrate your existing scripts to [Shopify Functions](https://shopify.dev/docs/api/functions) before this date. There can be only one active script of each type. Currently, the only type accessible in Liquid is
\`cart_calculate_line_items\`.



**Tip**

> To learn more about Shopify Scripts and the Script Editor, visit the [Shopify Help Center](https://help.shopify.com/manual/checkout-settings/script-editor).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/scripts)


Last Updated: 5th March 2024


`,type:"object",properties:{cart_calculate_line_items:{type:"object",description:`The active line item script. If no line item script is currently active, then \`nil\` is returned.

#### Advertise the currently active line item script

\`\`\`liquid

{% if scripts.cart_calculate_line_items %}
  <p>Don't miss our current sale: <strong>{{ scripts.cart_calculate_line_items.name }}</strong></p>
{% endif %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/scripts/cart_calculate_line_items)


Last Updated: 5th March 2024


`,scope:"script"}}},sitemap:{summary:"The sitemap for a specific group in the [`robots.txt` file](/themes/architecture/templates/robots-txt-liquid).",description:`The sitemap for a specific group in the [\`robots.txt\` file](https://shopify.dev/themes/architecture/templates/robots-txt-liquid). The sitemap provides information about the pages and content on a site, and the relationships between them, which helps
crawlers crawl a site more efficiently.



**Tip**

> To learn more about sitemaps, refer to [Google's documentation](https://developers.google.com/search/docs/advanced/sitemaps/overview).

The \`sitemap\` object consists of a \`Sitemap\` directive, and a value of the URL that the sitemap is hosted at. For example:

\`\`\`
Sitemap: https://your-store.myshopify.com/sitemap.xml
\`\`\`



**Tip**

> You can [customize the \`robots.txt\` file](https://shopify.dev/themes/seo/robots-txt) with the [\`robots.txt.liquid\` template](/themes/architecture/templates/robots-txt-liquid).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/sitemap)


Last Updated: 5th March 2024


`,type:"object",properties:{directive:{type:"string",description:`Returns \`Sitemap\`. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/sitemap/directive)


Last Updated: 5th March 2024


`},value:{type:"string",description:`The URL that the sitemap is hosted at. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/sitemap/value)


Last Updated: 5th March 2024


`}}},sort_option:{summary:"A sort option for a collection or search results page.",description:`A sort option for a collection or search results page. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/sort_option)


Last Updated: 5th March 2024


`,type:"object",properties:{name:{type:"string",description:`The customer-facing name of the sort option. The name can be edited by merchants in the [language editor](https://help.shopify.com/manual/online-store/themes/customizing-themes/language/change-wording).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/sort_option/name)


Last Updated: 5th March 2024


`},value:{type:"string",description:`The value of the sort option. This value is used when assigning the [\`collection.sort_by\`](https://shopify.dev/docs/api/liquid/objects/collection#collection-sort_by) and
[\`search.sort_by\`](https://shopify.dev/docs/api/liquid/objects/search#search-sort_by) parameters.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/sort_option/value)


Last Updated: 5th March 2024


`}}},transaction_payment_details:{summary:"Information about the payment methods used for a transaction.",description:`Information about the payment methods used for a transaction. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction_payment_details)


Last Updated: 5th March 2024


`,type:"object",properties:{credit_card_company:{type:"string",description:`The name of the company that issued the credit card used for the transaction. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction_payment_details/credit_card_company)


Last Updated: 5th March 2024


`},credit_card_last_four_digits:{type:"string",description:`The last four digits of the credit card number of the credit card used for the transaction. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction_payment_details/credit_card_last_four_digits)


Last Updated: 5th March 2024


`},credit_card_number:{type:"string",description:`The credit card number of the credit card used for the transaction. All but the last four digits are redacted.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction_payment_details/credit_card_number)


Last Updated: 5th March 2024


`},gift_card:{type:"object",description:`The gift card used for the transaction. If no gift card was used, then \`nil\` is returned.

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/transaction_payment_details/gift_card)


Last Updated: 5th March 2024


`,scope:"gift_card"}}},user_agent:{summary:"The user-agent, which is the name of the crawler, for a specific group in the [`robots.txt` file](/themes/architecture/templates/robots-txt-liquid).",description:`The user-agent, which is the name of the crawler, for a specific group in the [\`robots.txt\` file](https://shopify.dev/themes/architecture/templates/robots-txt-liquid). The \`user_agent\` object consists of a \`User-agent\` directive, and a value of the name of the user-agent. For example:

\`\`\`
User-agent: *
\`\`\`



**Tip**

> You can [customize the \`robots.txt\` file](https://shopify.dev/themes/seo/robots-txt) with the [\`robots.txt.liquid\` template](/themes/architecture/templates/robots-txt-liquid).

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/user_agent)


Last Updated: 5th March 2024


`,type:"object",properties:{directive:{type:"string",description:`Returns \`User-agent\`. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/user_agent/directive)


Last Updated: 5th March 2024


`},value:{type:"string",description:`The name of the user-agent. 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/user_agent/value)


Last Updated: 5th March 2024


`}}}};var te={item_count_for_variant:{description:`Returns the total item count for a specified variant in the cart. 



#### Example

\`\`\`liquid

{{ cart | item_count_for_variant: 39888235757633 }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/item_count_for_variant)

`,returns:"number",snippet:"item_count_for_variant: ${1}",arguments:[{type:"any",required:!0}]},link_to_type:{description:`Generates an HTML \`<a>\` tag with an \`href\` attribute linking to a collection page that lists all products of the given
product type. 



#### Example

\`\`\`liquid

{{ 'Health' | link_to_type }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/link_to_type)

`,returns:"string",snippet:"link_to_type"},link_to_vendor:{description:`Generates an HTML \`<a>\` tag with an \`href\` attribute linking to a collection page that lists all products of a given
product vendor. 



#### Example

\`\`\`liquid

{{ "Polina's Potent Potions" | link_to_vendor }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/link_to_vendor)

`,snippet:"link_to_vendor",returns:"string"},sort_by:{description:"Generates a collection URL with the provided `sort_by` parameter appended. This filter must be applied to a collection URL. Accepts the following values:\n\n- `manual`\n- `best-selling`\n- `title-ascending`\n- `title-descending`\n- `price-ascending`\n- `price-descending`\n- `created-ascending`\n- `created-descending`\n\n\n\n**Tip**\n\n> You can append the `sort_by` filter to the [`url_for_type`](https://shopify.dev/docs/api/liquid/filters/url_for_type)\n> and [`url_for_vendor`](https://shopify.dev/docs/api/liquid/filters/url_for_vendor) filters.\n\n#### Example\n\n```liquid\n\n{{ collection.url | sort_by: 'best-selling' }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/sort_by)\n\n",snippet:"sort_by: '${1|manual,best-selling,title-ascending,title-descending,price-ascending,price-descending,created-ascending,created-descending|}'",returns:"string",arguments:[{type:"string",required:!0,value:["manual","best-selling","title-ascending","title-descending","price-ascending","price-descending","created-ascending","created-descending"]}]},url_for_type:{description:`Generates a URL for a collection page that lists all products of the given product type. 



#### Example

\`\`\`liquid

{{ 'health' | url_for_type }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/url_for_type)

`,returns:"string"},url_for_vendor:{description:`Generates a URL for a collection page that lists all products from the given product vendor. 



#### Example

\`\`\`liquid

{{ "Polina's Potent Potions" | url_for_vendor }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/url_for_vendor)

`,returns:"string"},within:{description:`Generates a product URL within the context of the provided collection. When the collection context is included, you can access the associated [\`collection\` object](https://shopify.dev/docs/api/liquid/objects/collection)
in the [product template](https://shopify.dev/themes/architecture/templates/product).

> Caution:
> Because a standard product page and a product page in the context of a collection have the same content on separate
> URLs, you should consider the SEO implications of using the \`within\` filter.

#### Example

\`\`\`liquid

{%- assign collection_product = collection.products.first -%}

{{ collection_product.url | within: collection }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/within)

`,snippet:"within: ${1}",returns:"string",arguments:[{type:"array",required:!0}]},brightness_difference:{description:`Calculates the [perceived brightness difference](https://www.w3.org/WAI/ER/WD-AERT/#color-contrast) between two colors. 

**Tip**

> For accessibility best practices, it's recommended to have a minimum brightness difference of 125.

#### Example

\`\`\`liquid

{{ '#E800B0' | brightness_difference: '#FECEE9' }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/brightness_difference)

`,snippet:"brightness_difference: '${1:#FECEE9}'",arguments:[{type:"string",pattern:/#(?:[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/,required:!0}],returns:"number"},color_brightness:{description:`Calculates the [perceived brightness](https://www.w3.org/WAI/ER/WD-AERT/#color-contrast) of a given color. 



#### Example

\`\`\`liquid

{{ '#EA5AB9' | color_brightness }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_brightness)

`,returns:"number"},color_contrast:{description:`Calculates the contrast ratio between two colors and returns the ratio's numerator. The ratio's denominator, which isn't
returned, is always 1. For example, with a contrast ratio of 3.5:1, this filter returns 3.5. The order in which you specify the colors doesn't matter.



**Tip**

> For accessibility best practices, the
> [WCAG 2.0 level AA](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.0#qr-visual-audio-contrast-contrast) requires a
> minimum contrast ratio of 4.5:1 for normal text, and 3:1 for large text. [Level AAA](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.0#qr-visual-audio-contrast7)
> requires a minimum contrast ratio of 7:1 for normal text, and 4.5:1 for large text.

#### Example

\`\`\`liquid

{{ '#E800B0' | color_contrast: '#D9D8FF' }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_contrast)

`,snippet:"color_contrast: color: ${1:#FFF3F9}",arguments:[{type:"string",description:"A color to compare with the provided color.",pattern:/#(?:[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/,required:!0}],returns:"number"},color_darken:{description:`Darkens a given color by a specific percentage. The percentage must be between 0 and 100. 



#### Example

\`\`\`liquid

{{ '#EA5AB9' | color_darken: 30 }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_darken)

`,returns:"string",snippet:"color_darken: ${1:30}",arguments:[{type:"number",description:"A color to compare with the provided color.",pattern:[0,100],required:!0}]},color_desaturate:{description:`Desaturates a given color by a specific percentage. The percentage must be between 0 and 100. 



#### Example

\`\`\`liquid

{{ '#EA5AB9' | color_desaturate: 30 }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_desaturate)

`,snippet:"color_desaturate: ${1:30}",arguments:[{type:"number",required:!0,pattern:[0,100],description:"The amount to desaturate the provided color by."}],returns:"string"},color_difference:{description:`Calculates the [color difference](https://www.w3.org/WAI/ER/WD-AERT/#color-contrast) between two colors. 

**Tip**

> For accessibility best practices, it's recommended to have a minimum color difference of 500.

#### Example

\`\`\`liquid

{{ '#720955' | color_difference: '#FFF3F9' }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_difference)

`,snippet:"color_difference: ${1:#FFF3F9}",arguments:[{type:"string",pattern:/#(?:[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/,required:!0,description:"A color to compare with the provided color."}],returns:"number"},color_extract:{description:`Extracts a specific color component from a given color. Accepts the following color components:

- \`alpha\`
- \`red\`
- \`green\`
- \`blue\`
- \`hue\`
- \`saturation\`
- \`lightness\`

#### Example

\`\`\`liquid

{{ '#EA5AB9' | color_extract: 'red' }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_extract)

`,returns:"number",snippet:"color_extract: '${1|alpha,red,green,blue,hue,saturation,lightness|}'",arguments:[{type:"string",required:!0,value:["alpha","red","green","blue","hue","saturation","lightness"]}]},color_lighten:{description:`Lightens a given color by a specific percentage. The percentage must be between 0 and 100. 



#### Example

\`\`\`liquid

{{ '#EA5AB9' | color_lighten: 30 }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_lighten)

`,snippet:"color_lighten: percent: ${1:30}",arguments:[{type:"number",pattern:[0,100],required:!0,description:"The amount to lighten the provided color by."}],returns:"string"},color_mix:{description:`Blends two colors together by a specific percentage factor. The percentage must be between 0 and 100. 

**Tip**

> A percentage factor of 100 returns the color being filtered. A percentage factor of 0 returns the color
> supplied to the filter.

#### Example

\`\`\`liquid

{{ '#E800B0' | color_mix: '#00936F', 50 }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_mix)

`,snippet:"color_mix: '${1:#FECEE9}', ${2:100}",arguments:[{type:"string",pattern:/#(?:[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/,required:!0},{type:"number",pattern:[0,100],required:!0}],returns:"string"},color_modify:{description:`Modifies a specific color component of a given color by a specific amount. The following table outlines valid color components, and the value range for their modifications:

| Component | Value range |
| --- | --- |
| <ul><li>\`red\`</li><li>\`green\`</li><li>\`blue\`</li></ul> | An integer between 0 and 255 |
| \`alpha\` | A decimal between 0 and 1 |
| \`hue\` | An integer between 0 and 360 |
| <ul><li>\`saturation\`<li>\`lightness\`</li></ul> | An integer between 0 and 100 |

#### Example

\`\`\`liquid

{{ '#EA5AB9' | color_modify: 'red', 255 }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_modify)

`,snippet:"color_modify: '${1|red,green,blue,alpha,hue,saturation,lightness|}', ${2:100}",arguments:[{type:"string",required:!0,value:["red","green","blue","alpha","hue","saturation","lightness"]},{type:"number",required:!0,pattern:{red:[0,255],green:[0,255],blue:[0,255],alpha:[0,1],hue:[0,360],saturation:[0,100]}}],returns:"string"},color_saturate:{description:`Saturates a given color by a specific percentage. The percentage must be between 0 and 100. 



#### Example

\`\`\`liquid

{{ '#EA5AB9' | color_saturate: 30 }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_saturate)

`,snippet:"color_saturate: ${1:30}",arguments:[{type:"number",pattern:[0,100],required:!0,description:"The amount to saturate the provided color by."}],returns:"string"},color_to_hex:{description:`Converts a CSS color string to hexadecimal format (\`hex6\`). Because colors are converted to \`hex6\` format, if a color with an alpha component is provided, then the alpha component
is excluded from the output.

#### Example

\`\`\`liquid

{{ 'rgb(234, 90, 185)' | color_to_hex }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_to_hex)

`,returns:"string"},color_to_hsl:{description:`Converts a CSS color string to \`HSL\` format. If a color with an alpha component is provided, the color is converted to \`HSLA\` format.

#### Example

\`\`\`liquid

{{ '#EA5AB9' | color_to_hsl }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_to_hsl)

`,returns:"string"},color_to_rgb:{description:`Converts a CSS color string to \`RGB\` format. If a color with an alpha component is provided, then the color is converted to \`RGBA\` format.

#### Example

\`\`\`liquid

{{ '#EA5AB9' | color_to_rgb }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/color_to_rgb)

`,returns:"string"},hex_to_rgba:{description:`\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F

The \`hex_to_rgba\` filter has been replaced by [\`color_to_rgb\`](/docs/api/liquid/filters/color_to_rgb) and
[\`color_modify\`](/docs/api/liquid/filters/color_modify).

---

Converts a CSS color string from  hexadecimal format to \`RGBA\` format. Shorthand hexadecimal formatting (\`hex3\`) is also accepted. 



#### Example

\`\`\`liquid

{{ '#EA5AB9' | hex_to_rgba }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/hex_to_rgba)

`,returns:"string",deprecated:!0,snippet:"hex_to_rgba"},hmac_sha1:{description:`Converts a string into an SHA-1 hash using a hash message authentication code (HMAC). The secret key for the message is supplied as a parameter to the filter.

#### Example

\`\`\`liquid

{%- assign secret_potion = 'Polyjuice' | hmac_sha1: 'Polina' -%}

My secret potion: {{ secret_potion }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/hmac_sha1)

`,returns:"string",snippet:"hmac_sha1: $1",arguments:[{type:"any",required:!0}]},hmac_sha256:{description:`Converts a string into an SHA-256 hash using a hash message authentication code (HMAC). The secret key for the message is supplied as a parameter to the filter.

#### Example

\`\`\`liquid

{%- assign secret_potion = 'Polyjuice' | hmac_sha256: 'Polina' -%}

My secret potion: {{ secret_potion }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/hmac_sha256)

`,returns:"string",snippet:"hmac_sha256: $1",arguments:[{type:"any",required:!0}]},md5:{description:`Converts a string into an MD5 hash. 



#### Example

\`\`\`liquid

{{ '' | md5 }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/md5)

`,returns:"string"},sha1:{description:`Converts a string into an SHA-1 hash. 



#### Example

\`\`\`liquid

{%- assign secret_potion = 'Polyjuice' | sha1 -%}

My secret potion: {{ secret_potion }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/sha1)

`,returns:"string"},sha256:{description:`Converts a string into an SHA-256 hash. 



#### Example

\`\`\`liquid

{%- assign secret_potion = 'Polyjuice' | sha256 -%}

My secret potion: {{ secret_potion }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/sha256)

`,returns:"string",snippet:"sha256"},currency_selector:{description:`\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F

Deprecated without a direct replacement because the [currency form](/docs/api/liquid/tags/form#form-currency) has also been
deprecated.

---

Generates an HTML \`<select>\` element with an option for each currency available on the store. The \`currency_selector\` filter must be applied to the [\`form\` object](https://shopify.dev/docs/api/liquid/objects/form) within a
[currency form](https://shopify.dev/docs/api/liquid/tags/form#form-currency).

#### Example

\`\`\`liquid

{% form 'currency' %}
  {{ form | currency_selector }}
{% endform %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/currency_selector)

`,scope:"form",deprecated:!0,returns:"string",snippet:"currency_selector"},customer_login_link:{description:`Generates an HTML link to the customer login page. 



#### Example

\`\`\`liquid

{{ 'Log in' | customer_login_link }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/customer_login_link)

`,returns:"string"},customer_logout_link:{description:`Generates an HTML link to log the customer out of their account and redirect to the homepage. 



#### Example

\`\`\`liquid

{{ 'Log out' | customer_logout_link }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/customer_logout_link)

`,returns:"string"},customer_register_link:{description:`Generates an HTML link to the customer registration page. 



#### Example

\`\`\`liquid

{{ 'Create an account' | customer_register_link }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/customer_register_link)

`,returns:"string"},date:{description:`Converts a timestamp into another date format. The \`date\` filter accepts the same parameters as Ruby's strftime method for formatting the date. For a list of shorthand
formats, refer to the [Ruby documentation](https://ruby-doc.org/core-3.1.1/Time.html#method-i-strftime) or
[strftime reference and sandbox](http://www.strfti.me/).

#### Example

\`\`\`liquid

{{ article.created_at | date: '%B %d, %Y' }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/date)

`,arguments:[{type:"string",required:!1,description:"The desired date format."}],returns:"string"},font_face:{description:`Generates a CSS [\`@font_face\` declaration](https://developer.mozilla.org/en-US/docs/Web/CSS/%40font-face) to load the provided font. 



#### Example

\`\`\`liquid

{{ settings.type_header_font | font_face }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/font_face)

`,arguments:[{type:"parameter",value:{font_display:{type:"string",pattern:/\b(?:auto|block|swap|fallback|optional)\b/,description:"[string] Customize the [`font_display` property](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display) of the `@font-face` declaration.",value:[{value:"auto",description:"The font display strategy is defined by the user agent."},{value:"block",description:"Gives the font face a short block period and an infinite swap period."},{value:"swap",description:"Gives the font face an extremely small block period and an infinite swap period."},{value:"fallback",description:"Gives the font face an extremely small block period and a short swap period."},{value:"optional",description:"Gives the font face an extremely small block period and no swap period."}]}}}],returns:"string"},font_modify:{description:`Modifies a specific property of a given font. The \`font_modify\` filter requires two parameters. The first indicates which property should be modified and the second is
either the new value, or modification amount, for that property.



**Tip**

> You can access every variant of the chosen font's family by using [\`font.variants\`](https://shopify.dev/docs/api/liquid/objects/font#font-variants).
> However, you can more easily access specific styles and weights by using the \`font_modify\` filter.

The following table outlines the valid font properties and modification values:

<table>
  <thead>
    <th>Property</th>
    <th>Modification value</th>
    <th>Output</th>
  </thead>
  <tbody>
    <tr>
      <td rowspan=3><code>style</code></td>
      <td><code>normal</code></td>
      <td>Returns the normal variant of the same weight, if it exists.</td>
    </tr>
    <tr>
      <td><code>italic</code></td>
      <td>Returns the italic variant of the same weight, if it exists.</td>
    </tr>
    <tr>
      <td><code>oblique</code></td>
      <td>
        <p>Returns the oblique variant of the same weight, if it exists.</p>
        <p>Oblique variants are similar to italic variants in appearance. All Shopify fonts have only oblique or italic variants, not both.</p>
      </td>
    </tr>
    <tr>
      <td rowspan=7><code>weight</code></td>
      <td><code>100</code> &rarr; <code>900</code></td>
      <td>Returns a variant of the same style with the given weight, if it exists.</td>
    </tr>
    <tr>
      <td><code>normal</code></td>
      <td>Returns a variant of the same style with a weight of <code>400</code>, if it exists.</td>
    </tr>
    <tr>
      <td><code>bold</code></td>
      <td>Returns a variant of the same style with a weight of <code>700</code>, if it exists.</td>
    </tr>
    <tr>
      <td><code>+100</code> &rarr; <code>+900</code></td>
      <td>
        <p>Returns a variant of the same style with a weight incremented by the given value, if it exists.</p>
        <p>For example, if a font has a weight of <code>400</code>, then using <code>+100</code> would return the font with a weight of <code>500</code>.</p>
      </td>
    </tr>
    <tr>
      <td><code>-100</code> &rarr; <code>-900</code></td>
      <td>
        <p>Returns a variant of the same style with a weight decremented by the given value, if it exists.</p>
        <p>For example, if a font has a weight of <code>400</code>, then using <code>-100</code> would return the font with a weight of <code>300</code>.</p>
      </td>
    </tr>
    <tr>
      <td><code>lighter</code></td>
      <td>Returns a lighter variant of the same style by applying the rules used by the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#Meaning_of_relative_weights">CSS <code>font-weight</code> property</a> and browser <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#Fallback_weights">fallback weights</a>, if it exists.</td>
    </tr>
    <tr>
      <td><code>bolder</code></td>
      <td>Returns a bolder variant of the same style by applying the rules used by the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#Meaning_of_relative_weights">CSS <code>font-weight</code> property</a> and browser <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#Fallback_weights">fallback weights</a>, if it exists.</td>
    </tr>
  </tbody>
</table>

#### Example

\`\`\`liquid

{%- assign bold_font = settings.type_body_font | font_modify: 'weight', 'bold' -%}

h2 {
  font-weight: {{ bold_font.weight }};
}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/font_modify)

`,snippet:"font_modify: '${1|normal,italic,oblique|}', '${2|100,200,300,400,500,600,700,800,900,lighter,normal,bold,bolder|}'",arguments:[{type:"string",required:!0,value:["style","weight"]},{type:"string",required:!0,pattern:{style:/\b(?:normal|italic|oblique)\b/,weight:/\b(?:normal|bold|bolder|lighter|[+-]?[1-9]0{2})\b/},value:{style:[{value:"normal",description:"Returns the normal variant of the same weight (if it exists)"},{value:"italic",description:"Returns the italic variant of the same weight (if it exists)"},{value:"oblique",description:"Has the same behavior as italic. None of the font families provided by Shopify have both italic and oblique styles."}],weight:[{value:"normal",description:"Has the same behavior as `400`."},{value:"bold",description:"Has the same behavior as `700`"},{value:"bolder",description:"Returns a bolder variant of the same style by applying the rules used by the CSS `font-weight` property and browser fallback weights (if it exists)."},{value:"lighter",description:"Returns a lighter variant of the same style by applying the rules used by the CSS `font-weight` property and browser fallback weights (if it exists)."}]}}],returns:"any"},font_url:{description:`Returns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for the provided font in \`woff2\` format. 



#### Example

\`\`\`liquid

{{ settings.type_header_font | font_url }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/font_url)

`,arguments:[{type:"string",required:!1,description:"Choose to return the URL for the font in `woff` format, instead of `woff2`."}],returns:"string"},default_errors:{description:`Generates default error messages for each possible value of [\`form.errors\`](https://shopify.dev/docs/themes/liquid/reference/objects/form#form-errors). 



---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/default_errors)

`,scope:"form",returns:"string"},payment_button:{description:`Generates an HTML container to host [dynamic checkout buttons](https://help.shopify.com/manual/online-store/dynamic-checkout)
for a product. The \`payment_button\` filter must be used on the \`form\` object within a [product form](https://shopify.dev/docs/api/liquid/tags/form#form-product). 

**Note**

> You can't render dynamic checkout buttons through AJAX requests, including those through the
> [Section Rendering API](https://shopify.dev/api/section-rendering). The dynamic checkout buttons are added by JavaScript included
> by Shopify through the [\`content_for_header\`](https://shopify.dev/docs/api/liquid/objects/content_for_header) object, which only runs on
> the initial page load.

#### Example

\`\`\`liquid

{% form 'product', product %}
  {{ form | payment_button }}
{% endform %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/payment_button)

`,scope:"form",returns:"string"},payment_terms:{description:`Generates the HTML for the [Shop Pay Installments banner](https://shopify.dev/themes/pricing-payments/installments). The \`payment_terms\` filter must be used on the \`form\` object within a [product form](https://shopify.dev/docs/api/liquid/tags/form#form-product) or
[cart form](https://shopify.dev/docs/api/liquid/tags/form#form-cart).

\`\`\`liquid
{% form 'product', product %}
  {{ form | payment_terms }}
{% endform %}
\`\`\`

\`\`\`liquid
{% form 'cart', cart %}
  {{ form | payment_terms }}
{% endform %}
\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/payment_terms)

`,returns:"string"},time_tag:{description:`Converts a timestamp into an HTML \`<time>\` tag. The \`time_tag\` filter accepts the same parameters as Ruby's strftime method for formatting the date. For a list of shorthand
formats, refer to the [Ruby documentation](https://ruby-doc.org/core-3.1.1/Time.html#method-i-strftime) or
[strftime reference and sandbox](http://www.strfti.me/).

#### Example

\`\`\`liquid

{{ article.created_at | time_tag: '%B %d, %Y' }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/time_tag)

`,arguments:[{type:"string",pattern:/%[AaBbCcDdeFGgHhIjkLlMmNnPpRrSsTtrUuVvWwXxYyZz0-9^%_-]+/,description:"The time_tag filter accepts the same parameters as Ruby's strftime method."},{type:"parameter",value:{datetime:{type:"string",pattern:/%[AaBbCcDdeFGgHhIjkLlMmNnPpRrSsTtrUuVvWwXxYyZz0-9^%_-]+/,description:"A datetime parameter with strftime shorthand formats to use a custom format for the datetime attribute of the output `<time>` tag."},format:{type:"string",description:"The font-display descriptor determines how a font face is displayed based on whether and when it is downloaded and ready to use",strict:!1,value:[{value:"abbreviated_date",description:"Dec 31, 2018"},{value:"basic",description:"12/31/2018"},{value:"date",description:"December 31, 2018"},{value:"date_at_time",description:"December 31, 2018 at 1:00 pm"},{value:"default",description:"Monday, December 31, 2018 at 1:00 pm -0500"},{value:"on_date",description:"on Dec 31, 2018"}]}}}],returns:"string",snippet:"time_tag"},translate:{description:`Returns a string of translated text for a given translation key from a [locale file](https://shopify.dev/themes/architecture/locales). The \`translate\` filter has an alias of \`t\`, which is more commonly used.



**Tip**

> To learn more about using the \`t\` filter, refer to [storefront locale file usage](https://shopify.dev/themes/architecture/locales/storefront-locale-files#usage)
> or [schema locale file usage](https://shopify.dev/themes/architecture/locales/schema-locale-files#usage).

#### Example

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/translate)

`,returns:"string"},json:{description:`Converts a string, or object, into JSON format. 

**Tip**

> When using the JSON output in JavaScript, you don't need to wrap it in quotes because the \`json\` filter includes them.
> The \`json\` filter also escapes any quotes inside the output.

#### Product inventory

When applied to a [\`product\` object](https://shopify.dev/docs/api/liquid/objects/product) on any Shopify store created after December 5, 2017, the
\`json\` filter doesn't output values for the \`inventory_quantity\` and \`inventory_policy\` properties of any associated
[variants](https://shopify.dev/docs/api/liquid/objects/variant). These properties are excluded to help prevent bots and crawlers from retrieving
inventory quantities for stores to which they aren't granted access.

If you need inventory information, you can access it through individual variants.

#### Example

\`\`\`liquid

{{ product | json }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/json)

`,returns:"string"},abs:{description:`Returns the absolute value of a number. 



#### Example

\`\`\`liquid

{{ -3 | abs }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/abs)

`,returns:"number"},append:{description:`Adds a given string to the end of a string. 



#### Example

\`\`\`liquid

{%-  assign path = product.url -%}

{{ request.origin | append: path }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/append)

`,snippet:"append: '${1}'",arguments:[{type:"string",required:!0}],returns:"string"},at_least:{description:`Limits a number to a minimum value. 



#### Example

\`\`\`liquid

{{ 4 | at_least: 5 }}
{{ 4 | at_least: 3 }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/at_least)

`,snippet:"at_least: $1 $0",arguments:[{type:"number",required:!0}],returns:"number"},at_most:{description:`Limits a number to a maximum value. 



#### Example

\`\`\`liquid

{{ 6 | at_most: 5 }}
{{ 4 | at_most: 5 }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/at_most)

`,snippet:"at_most: $1 $0",arguments:[{type:"number",required:!0}],returns:"number"},base64_decode:{description:`Decodes a string in [Base64 format](https://developer.mozilla.org/en-US/docs/Glossary/Base64). 



#### Example

\`\`\`liquid

{{ 'b25lIHR3byB0aHJlZQ==' | base64_decode }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/base64_decode)

`,returns:"string"},base64_encode:{description:`Encodes a string to [Base64 format](https://developer.mozilla.org/en-US/docs/Glossary/Base64). 



#### Example

\`\`\`liquid

{{ 'one two three' | base64_encode }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/base64_encode)

`,returns:"string"},base64_url_safe_decode:{description:`Decodes a string in URL-safe [Base64 format](https://developer.mozilla.org/en-US/docs/Glossary/Base64). 



#### Example

\`\`\`liquid

{{ 'b25lIHR3byB0aHJlZQ==' | base64_url_safe_decode }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/base64_url_safe_decode)

`,returns:"string"},base64_url_safe_encode:{description:`Encodes a string to URL-safe [Base64 format](https://developer.mozilla.org/en-US/docs/Glossary/Base64). 



#### Example

To produce URL-safe Base64, this filter uses \`-\` and \`_\` in place of \`+\` and \`/\`.

\`\`\`liquid

{{ 'one two three' | base64_url_safe_encode }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/base64_url_safe_encode)

`,returns:"string"},capitalize:{description:`Capitalizes the first word in a string. 



#### Example

\`\`\`liquid

{{ 'this sentence should start with a capitalized word.' | capitalize }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/capitalize)

`,returns:"string"},ceil:{description:`Rounds a number up to the nearest integer. 



#### Example

\`\`\`liquid

{{ 1.2 | ceil }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/ceil)

`,returns:"number"},compact:{description:`Removes any \`nil\` items from an array. 



#### Example

\`\`\`liquid

{%- assign original_prices = collection.products | map: 'compare_at_price' -%}

Original prices:

{% for price in original_prices -%}
  - {{ price }}
{%- endfor %}

{%- assign compacted_original_prices = original_prices | compact -%}

Original prices - compacted:

{% for price in compacted_original_prices -%}
  - {{ price }}
{%- endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/compact)

`,returns:"array"},concat:{description:`Concatenates (combines) two arrays. 

**Note**

> The \`concat\` filter won't filter out duplicates. If you want to remove duplicates, then you need to use the
> [\`uniq\` filter](https://shopify.dev/docs/api/liquid/filters/uniq).

#### Example

\`\`\`liquid

{%- assign types_and_vendors = collection.all_types | concat: collection.all_vendors -%}

Types and vendors:

{% for item in types_and_vendors -%}
  {%- if item != blank -%}
    - {{ item }}
  {%- endif -%}
{%- endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/concat)

`,snippet:"concat: ${1}",arguments:[{type:"array",required:!0}],returns:"array"},default:{description:`Sets a default value for any variable whose value is one of the following:

- [\`empty\`](https://shopify.dev/docs/api/liquid/basics#empty)
- [\`false\`](https://shopify.dev/docs/api/liquid/basics#truthy-and-falsy)
- [\`nil\`](https://shopify.dev/docs/api/liquid/basics#nil) 



#### Example

\`\`\`liquid

{{ product.selected_variant.url | default: product.url }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/default)

`,arguments:[{type:"parameter",value:{allow_false:{type:"boolean",description:"Whether to use false values instead of the default."}}}],returns:"any"},divided_by:{description:`Divides a number by a given number. The \`divided_by\` filter produces a result of the same type as the divisor. This means if you divide by an integer, the result will be an integer, and if you divide by a float, the result will be a float. 



#### Example

\`\`\`liquid

{{ 4 | divided_by: 2 }}

# divisor is an integer
{{ 20 | divided_by: 7 }}

# divisor is a float 
{{ 20 | divided_by: 7.0 }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/divided_by)

`,snippet:"divided_by: $1",arguments:[{type:"number",required:!0}],returns:"number"},downcase:{description:`Converts a string to all lowercase characters. 



#### Example

\`\`\`liquid

{{ product.title | downcase }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/downcase)

`,returns:"string"},escape:{description:`Escapes special characters in HTML, such as \`<>\`, \`'\`, and \`&\`, and converts characters into escape sequences. The filter doesn't effect characters within the string that don\u2019t have a corresponding escape sequence.". 



#### Example

\`\`\`liquid

{{ '<p>Text to be escaped.</p>' | escape }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/escape)

`,returns:"string"},escape_once:{description:`Escapes a string without changing characters that have already been escaped. 



#### Example

\`\`\`liquid

{%- assign escaped_text = '<p>Text to be escaped.</p>' | escape -%}

{{ escaped_text }}
{{ escaped_text | escape_once }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/escape_once)

`,returns:"string"},first:{description:`Returns the first item in an array. 



#### Example

\`\`\`liquid

{%- assign first_product = collection.products | first -%}

{{ first_product.title }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/first)

`,returns:"any"},floor:{description:`Rounds a number down to the nearest integer. 



#### Example

\`\`\`liquid

{{ 1.2 | floor }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/floor)

`,returns:"number"},join:{description:`Combines all of the items in an array into a single string, separated by a space. 



#### Example

\`\`\`liquid

{{ collection.all_tags | join }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/join)

`,snippet:"join: '$1' $0",arguments:[{type:"string",required:!0}],returns:"string"},last:{description:`Returns the last item in an array. 



#### Example

\`\`\`liquid

{%- assign last_product = collection.products | last -%}

{{ last_product.title }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/last)

`,returns:"any"},lstrip:{description:`Strips all whitespace from the left of a string. 



#### Example

\`\`\`liquid

{%- assign text = '  Some potions create whitespace.      ' -%}

"{{ text }}"
"{{ text | lstrip }}"

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/lstrip)

`,returns:"string"},map:{description:`Creates an array of values from a specific property of the items in an array. 



#### Example

\`\`\`liquid

{%- assign product_titles = collection.products | map: 'title' -%}

{{ product_titles | join: ', ' }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/map)

`,snippet:"map: $1",arguments:[{type:"any",required:!0}],returns:"array"},minus:{description:`Subtracts a given number from another number. 



#### Example

\`\`\`liquid

{{ 4 | minus: 2 }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/minus)

`,snippet:"minus: $1",arguments:[{type:"number",required:!0}],returns:"number"},modulo:{description:`Returns the remainder of dividing a number by a given number. 



#### Example

\`\`\`liquid

{{ 12 | modulo: 5 }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/modulo)

`,snippet:"modulo: $1",arguments:[{type:"number",required:!0}],returns:"number"},newline_to_br:{description:`Converts newlines (\`\\n\`) in a string to HTML line breaks (\`<br>\`). 



#### Example

\`\`\`liquid

{{ product.description | newline_to_br }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/newline_to_br)

`,returns:"string"},plus:{description:`Adds two numbers. 



#### Example

\`\`\`liquid

{{ 2 | plus: 2 }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/plus)

`,snippet:"plus: $1",arguments:[{type:"number",required:!0}],returns:"number"},prepend:{description:`Adds a given string to the beginning of a string. 



#### Example

\`\`\`liquid

{%- assign origin = request.origin -%}

{{ product.url | prepend: origin }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/prepend)

`,snippet:"prepend: '$1' $0",arguments:[{type:"string",required:!0}],returns:"string"},remove:{description:`Removes any instance of a substring inside a string. 



#### Example

\`\`\`liquid

{{ "I can't do it!" | remove: "'t" }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/remove)

`,snippet:"remove: '$1' $0",arguments:[{type:"string",required:!0}],returns:"string"},remove_first:{description:`Removes the first instance of a substring inside a string. 



#### Example

\`\`\`liquid

{{ "I hate it when I accidentally spill my duplication potion accidentally!" | remove_first: ' accidentally' }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/remove_first)

`,snippet:"remove_first: $1",arguments:[{type:"string",required:!0}],returns:"string"},remove_last:{description:`Removes the last instance of a substring inside a string. 



#### Example

\`\`\`liquid

{{ "I hate it when I accidentally spill my duplication potion accidentally!" | remove_last: ' accidentally' }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/remove_last)

`,returns:"string",snippet:"remove_last: ${1}",arguments:[{type:"string",required:!0}]},replace:{description:`Replaces any instance of a substring inside a string with a given string. 



#### Example

\`\`\`liquid

{{ product.handle | replace: '-', ' ' }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/replace)

`,snippet:"replace: $1, $2",arguments:[{type:"string",required:!0},{type:"string",required:!0}],returns:"string"},replace_first:{description:`Replaces the first instance of a substring inside a string with a given string. 



#### Example

\`\`\`liquid

{{ product.handle | replace_first: '-', ' ' }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/replace_first)

`,snippet:"replace_first: $1, $2",arguments:[{type:"string",required:!0},{type:"string",required:!0}],returns:"string"},replace_last:{description:`Replaces the last instance of a substring inside a string with a given string. 



#### Example

\`\`\`liquid

{{ product.handle | replace_last: '-', ' ' }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/replace_last)

`,returns:"string",snippet:"replace_last: $1, $2",arguments:[{type:"string",required:!0},{type:"string",required:!0}]},reverse:{description:`Reverses the order of the items in an array. 



#### Example

\`\`\`liquid

Original order:
{{ collection.products | map: 'title' | join: ', ' }}

Reverse order:
{{ collection.products | reverse | map: 'title' | join: ', ' }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/reverse)

`,returns:"array"},round:{description:`Rounds a number to the nearest integer. 



#### Example

\`\`\`liquid

{{ 2.7 | round }}
{{ 1.3 | round }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/round)

`,arguments:[{type:"number",required:!1}],returns:"number"},rstrip:{description:`Strips all whitespace from the right of a string. 



#### Example

\`\`\`liquid

{%- assign text = '  Some potions create whitespace.      ' -%}

"{{ text }}"
"{{ text | rstrip }}"

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/rstrip)

`,returns:"string"},size:{description:`Returns the size of a string or array. The size of a string is the number of characters that the string includes. The size of an array is the number of items
in the array.

#### Example

\`\`\`liquid

{{ collection.title | size }}
{{ collection.products | size }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/size)

`,returns:"number"},slice:{description:`Returns a substring or series of array items, starting at a given 0-based index. By default, the substring has a length of one character, and the array series has one array item. However, you can
provide a second parameter to specify the number of characters or array items.

#### Example

\`\`\`liquid

{{ collection.title | slice: 0 }}
{{ collection.title | slice: 0, 5 }}

{{ collection.all_tags | slice: 1, 2 | join: ', ' }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/slice)

`,snippet:"slice: $1 $0",arguments:[{type:"number",required:!0},{type:"number",required:!1}],returns:"string"},sort:{description:`Sorts the items in an array in case-sensitive alphabetical, or numerical, order. 



#### Example

\`\`\`liquid

{% assign tags = collection.all_tags | sort %}

{% for tag in tags -%}
  {{ tag }}
{%- endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/sort)

`,arguments:[{type:"number",required:!1}],returns:"array"},sort_natural:{description:`Sorts the items in an array in case-insensitive alphabetical order.

> Caution:
> You shouldn't use the \`sort_natural\` filter to sort numerical values. When comparing items an array, each item is converted to a
> string, so sorting on numerical values can lead to unexpected results.

#### Example

\`\`\`liquid

{% assign tags = collection.all_tags | sort_natural %}

{% for tag in tags -%}
  {{ tag }}
{%- endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/sort_natural)

`,returns:"array"},split:{description:`Splits a string into an array of substrings based on a given separator. 



#### Example

\`\`\`liquid

{%- assign title_words = product.handle | split: '-' -%}

{% for word in title_words -%}
  {{ word }}
{%- endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/split)

`,snippet:"split: $1",arguments:[{type:"any",required:!0}],returns:"array"},strip:{description:`Strips all whitespace from the left and right of a string. 



#### Example

\`\`\`liquid

{%- assign text = '  Some potions create whitespace.      ' -%}

"{{ text }}"
"{{ text | strip }}"

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/strip)

`,returns:"string"},strip_html:{description:`Strips all HTML tags from a string. 



#### Example

\`\`\`liquid

<!-- With HTML -->
{{ product.description }}

<!-- HTML stripped -->
{{ product.description | strip_html }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/strip_html)

`,returns:"string"},strip_newlines:{description:`Strips all newline characters (line breaks) from a string. 



#### Example

\`\`\`liquid

<!-- With newlines -->
{{ product.description }}

<!-- Newlines stripped -->
{{ product.description | strip_newlines }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/strip_newlines)

`,returns:"string"},sum:{description:`Returns the sum of all elements in an array. 



#### Example

\`\`\`liquid

{% assign fibonacci = '0, 1, 1, 2, 3, 5' | split: ', ' %}

{{ fibonacci | sum }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/sum)

`},times:{description:`Multiplies a number by a given number. 



#### Example

\`\`\`liquid

{{ 2 | times: 2 }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/times)

`,snippet:"times: $1",arguments:[{type:"number",required:!0}],returns:"number"},truncate:{description:`Truncates a string down to a given number of characters. If the specified number of characters is less than the length of the string, then an ellipsis (\`...\`) is appended to
the truncated string. The ellipsis is included in the character count of the truncated string.

#### Example

\`\`\`liquid

{{ article.title | truncate: 15 }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/truncate)

`,snippet:"truncate: $1",arguments:[{type:"number",required:!0}],returns:"string"},truncatewords:{description:`Truncates a string down to a given number of words. If the specified number of words is less than the number of words in the string, then an ellipsis (\`...\`) is appended to
the truncated string.

> Caution:
> HTML tags are treated as words, so you should strip any HTML from truncated content. If you don't strip HTML, then
> closing HTML tags can be removed, which can result in unexpected behavior.

#### Example

\`\`\`liquid

{{ article.content | strip_html | truncatewords: 15 }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/truncatewords)

`,snippet:"truncatewords: $1",arguments:[{type:"number",required:!0}],returns:"string"},uniq:{description:`Removes any duplicate items in an array. 



#### Example

\`\`\`liquid

{% assign potion_array = 'invisibility, health, love, health, invisibility' | split: ', ' %}

{{ potion_array | uniq | join: ', ' }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/uniq)

`,returns:"array"},upcase:{description:`Converts a string to all uppercase characters. 



#### Example

\`\`\`liquid

{{ product.title | upcase }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/upcase)

`,returns:"string"},url_decode:{description:`Decodes any [percent-encoded](https://developer.mozilla.org/en-US/docs/Glossary/percent-encoding) characters
in a string. 



#### Example

\`\`\`liquid

{{ 'test%40test.com' | url_decode }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/url_decode)

`,returns:"string"},url_encode:{description:`Converts any URL-unsafe characters in a string to the
[percent-encoded](https://developer.mozilla.org/en-US/docs/Glossary/percent-encoding) equivalent. 

**Note**

> Spaces are converted to a \`+\` character, instead of a percent-encoded character.

#### Example

\`\`\`liquid

{{ 'test@test.com' | url_encode }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/url_encode)

`,returns:"string"},where:{description:`Filters an array to include only items with a specific property value. This requires you to provide both the property name and the associated value.

#### Example

\`\`\`liquid

{% assign polina_products = collection.products | where: 'vendor', "Polina's Potent Potions" %}

Products from Polina's Potent Potions:

{% for product in polina_products -%}
  - {{ product.title }}
{%- endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/where)

`,snippet:"where: ${1}, ${2}",arguments:[{type:"string",required:!0},{type:"string",required:!0}],returns:"array"},external_video_tag:{description:`Generates an HTML \`<iframe>\` tag containing the player for a given external video. The input for the \`external_video_tag\`
filter can be either a [\`media\` object](https://shopify.dev/docs/api/liquid/objects/media) or [\`external_video_url\`](https://shopify.dev/docs/api/liquid/filters/external_video_url). If [alt text is set on the video](https://help.shopify.com/en/manual/products/product-media/add-alt-text), then it's
included in the \`title\` attribute of the \`<iframe>\`. If no alt text is set, then the \`title\` attribute is set to the
product title.

#### Example

\`\`\`liquid

{% for media in product.media %}
  {% if media.media_type == 'external_video' %}
    {% if media.host == 'youtube' %}
      {{ media | external_video_url: color: 'white' | external_video_tag }}
    {% elsif media.host == 'vimeo' %}
      {{ media | external_video_url: loop: '1', muted: '1' | external_video_tag }}
    {% endif %}
  {% endif %}
{% endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/external_video_tag)

`,returns:"string"},external_video_url:{description:`Returns the URL for a given external video. Use this filter to specify parameters for the external video player generated
by the [\`external_video_tag\` filter](https://shopify.dev/docs/api/liquid/filters/external_video_tag). 



#### Example

You can specify [YouTube](https://developers.google.com/youtube/player_parameters#Parameters) and [Vimeo](https://vimeo.zendesk.com/hc/en-us/articles/360001494447-Using-Player-Parameters) video parameters by adding a parameter that matches the parameter name, and the desired value.


\`\`\`liquid

{% for media in product.media %}
  {% if media.media_type == 'external_video' %}
    {% if media.host == 'youtube' %}
      {{ media | external_video_url: color: 'white' | external_video_tag }}
    {% elsif media.host == 'vimeo' %}
      {{ media | external_video_url: loop: '1', muted: '1' | external_video_tag }}
    {% endif %}
  {% endif %}
{% endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/external_video_url)

`,returns:"string",snippet:"external_video_url: $1: $2",arguments:[{type:"any",required:!0},{type:"any",required:!0}]},image_tag:{description:`Generates an HTML \`<img>\` tag for a given [\`image_url\`](https://shopify.dev/docs/api/liquid/filters/image_url). By default, \`width\` and \`height\` attributes are added to the \`<img>\` tag based on the dimensions and aspect ratio from
the image URL. However, you can override these attributes with the [width](https://shopify.dev/docs/api/liquid/filters/image_tag#image_tag-width) and [height](https://shopify.dev/docs/api/liquid/filters/image_tag#image_tag-height)
parameters. If only one parameter is provided, then only that attribute is added.



**Note**

> This filter automatically applies the \`object-position\` css style from the focal point value if set. For more
> information, refer to the [\`focal_point\` object](https://shopify.dev/docs/api/liquid/objects/focal_point).

#### Example

\`\`\`liquid

{{ product | image_url: width: 200 | image_tag }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/image_tag)

`,returns:"string",snippet:"image_tag"},media_tag:{description:`Generates an appropriate HTML tag for a given media object. 



#### Example

\`\`\`liquid

{% for media in product.media %}
  {{- media | media_tag }}
{% endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/media_tag)

`,returns:"string",snippet:"media_tag"},model_viewer_tag:{description:`Generates a [Google model viewer component](https://modelviewer.dev/) for a given 3D model. 



#### Example

\`\`\`liquid

{% for media in product.media %}
  {% if media.media_type == 'model' %}
    {{ media | model_viewer_tag }}
  {% endif %}
{% endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/model_viewer_tag)

`,returns:"string",snippet:"model_viewer_tag"},video_tag:{description:`Generates an HTML \`<video>\` tag for a given video. 

**Note**

> When \`mp4\` videos are uploaded, Shopify generates an \`m3u8\` file as an additional [\`video_source\`](https://shopify.dev/docs/api/liquid/objects/video_source).
> An \`m3u8\` file enables video players to leverage [HTTP live streaming (HLS)](https://developer.apple.com/streaming/),
> resulting in an optimized video experience based on the user's internet connection. If loop is enabled, the HLS source is not used
> in order to allow progessive download to cache the video.
>
> If the \`m3u8\` source isn't supported, then the player falls back to the \`mp4\` source.

#### Example

\`\`\`liquid

{% for media in product.media %}
  {% if media.media_type == 'video' %}
    {{ media | video_tag }}
  {% endif %}
{% endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/video_tag)

`,returns:"string",snippet:"video_tag"},metafield_tag:{description:'Generates an HTML element to host the metafield data. The type of element that\'s generated differs depending on the\ntype of metafield. \n\n**Note**\n\n> The `metafield_tag` filter doesn\'t support list metafields other than `list.single_line_text_field`.\n\n#### Basic types\n\nMost metafield types return a simple HTML element:\n\n| Type | Element | Attributes |\n| --- | --- | --- |\n| `boolean` | `<span>` | `class="metafield-boolean"` |\n| `collection_reference` | `<a>` | `class="metafield-collection_reference"` |\n| `color` | `<span>` | `class="metafield-color"` |\n| `date` | `<time>` | `datetime="<the metafield value>"`<br><br>`class="metafield-date"`<br><br>Value is localized to the customer |\n| `date_time` | `<time>` | `datetime="<the metafield value>"`<br><br>`class="metafield-date"`<br><br>Value is localized to the customer |\n| `json` | `<script>` | `type="application/json"`<br><br>`class="metafield-json"` |\n| `money` | `<span>` | `class="metafield-money"`<br><br>Value is formatted using the store\'s [HTML with currency setting](https://help.shopify.com/manual/payments/currency-formatting) |\n| `multi_line_text_field` | `<span>` | `class="metafield-multi_line_text_field"` |\n| `number_decimal` | `<span>` | `class="metafield-number_decimal"` |\n| `number_integer` | `<span>` | `class="metafield-number_integer"` |\n| `page_reference` | `<a>` | `class="metafield-page_reference"` |\n| `product_reference` | `<a>` | `class="metafield-page_reference"` |\n| `rating` | `<span>` | `class="metafield-rating"` | |\n| `single_line_text_field` | `<span>` | `class="metafield-single_line_text_field"` |\n| `url` | `<a>` | `class="metafield-url"` |\n| `variant_reference` | `<a>` | `class="metafield-variant_reference"` |\n| `rich_text_field` | `<div>` | `class="metafield-rich_text_field"` |\n\n\n```liquid\n\n<!-- boolean -->\n{{ product.metafields.information.seasonal | metafield_tag }}\n\n<!-- collection_reference -->\n{{ product.metafields.information.related_collection | metafield_tag }}\n\n<!-- color -->\n{{ product.metafields.details.potion_color | metafield_tag }}\n\n<!-- date -->\n{{ product.metafields.information.expiry | metafield_tag }}\n\n<!-- date_time -->\n{{ product.metafields.information.brew_date | metafield_tag }}\n\n<!-- json -->\n{{ product.metafields.information.burn_temperature | metafield_tag }}\n\n<!-- money -->\n{{ product.metafields.details.price_per_ml | metafield_tag }}\n\n<!-- multi_line_text_field -->\n{{ product.metafields.information.shipping | metafield_tag }}\n\n<!-- number_decimal -->\n{{ product.metafields.information.salinity | metafield_tag }}\n\n<!-- number_integer -->\n{{ product.metafields.information.doses_per_day | metafield_tag }}\n\n<!-- page_reference -->\n{{ product.metafields.information.dosage | metafield_tag }}\n\n<!-- product_reference -->\n{{ product.metafields.information.related_product | metafield_tag }}\n\n<!-- rating -->\n{{ product.metafields.details.rating | metafield_tag }}\n\n<!-- single_line_text_field -->\n{{ product.metafields.information.directions | metafield_tag }}\n\n<!-- url -->\n{{ product.metafields.information.health | metafield_tag }}\n\n<!-- variant_reference -->\n{{ product.metafields.information.health | metafield_tag }}\n\n<!-- rich_text_field -->\n{{ product.metafields.information.rich_description | metafield_tag }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/metafield_tag)\n\n',returns:"string"},metafield_text:{description:"Generates a text version of the metafield data. The following outlines the output for each metafield type:\n\n| Metafield type | Output |\n| --- | --- |\n| `single_line_text_field` | The metafield text. |\n| `multi_line_text_field` | The metafield text. |\n| `page_reference` | The page title. |\n| `product_reference` | The product title. |\n| `collection_reference` | The collection title. |\n| `variant_reference` | The variant title. |\n| `file_reference` | The file URL. |\n| `number_integer` | The number. |\n| `number_decimal` | The number. |\n| `date` | The date. |\n| `date-time` | The date and time. |\n| `url` | The URL. |\n| `json` | The JSON. |\n| `boolean` | The boolean value. |\n| `color` | The color value. |\n| `weight` | The weight value and unit.<br><br>If the value is a decimal with more than two places, then it'll be formatted to have a precision of two with trailing zeros removed. |\n| `volume` | The volume value and unit.<br><br>If the value is a decimal with more than two places, then it'll be formatted to have a precision of two with trailing zeros removed. |\n| `dimension` | The dimension value and unit.<br><br>If the value is a decimal with more than two places, then it'll be formatted to have a precision of two with trailing zeros removed. |\n| `rating` | The rating value. |\n| `list.single_line_text_field` | The metafield values converted to a sentence.<br><br>For example, if you had the values `Toronto`, `Ottawa`, and `Vancouver`, then the output would be:<br><br>`Toronto, Ottawa, and Vancouver` |\n| `money` | The money value, formatted using the store's [**HTML with currency** setting](https://help.shopify.com/manual/payments/currency-formatting). |\n| `rich_text_field` | The rich text value as simple text. |\n\n#### Example\n\n```liquid\n\n{{ product.metafields.information.dosage | metafield_text }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/metafield_text)\n\n",returns:"string"},money:{description:`Formats a given price based on the store's [**HTML without currency** setting](https://help.shopify.com/manual/payments/currency-formatting). 



#### Example

\`\`\`liquid

{{ product.price | money }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/money)

`,returns:"string"},money_with_currency:{description:`Formats a given price based on the store's [**HTML with currency** setting](https://help.shopify.com/manual/payments/currency-formatting). 



#### Example

\`\`\`liquid

{{ product.price | money_with_currency }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/money_with_currency)

`,returns:"string"},money_without_currency:{description:`Formats a given price based on the store's [**HTML without currency** setting](https://help.shopify.com/manual/payments/currency-formatting), without the currency symbol. 



#### Example

\`\`\`liquid

{{ product.price | money_without_currency }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/money_without_currency)

`,returns:"string"},money_without_trailing_zeros:{description:`Formats a given price based on the store's [**HTML without currency** setting](https://help.shopify.com/manual/payments/currency-formatting), excluding the decimal separator
(either \`.\` or \`,\`) and trailing zeros.

If the price has a non-zero decimal value, then the output is the same as the [\`money\` filter](https://shopify.dev/docs/api/liquid/filters#money). 



#### Example

\`\`\`liquid

{{ product.price | money_without_trailing_zeros }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/money_without_trailing_zeros)

`,returns:"string"},default_pagination:{description:`Generates HTML for a set of links for paginated results. Must be applied to the [\`paginate\` object](https://shopify.dev/docs/api/liquid/objects/paginate). 



#### Example

\`\`\`liquid

{% paginate collection.products by 2 %}
  {% for product in collection.products %}
    {{- product.title }}
  {% endfor %}

  {{- paginate | default_pagination -}}
{% endpaginate %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/default_pagination)

`,scope:"paginate",returns:"string"},login_button:{description:`Generates an HTML Button that enables a customer to follow the Shop in the Shop App Configure the storefront for Follow on Shop. [Learn more](https://help.shopify.com/manual/online-store/themes/customizing-themes/follow-on-shop)



**Note**

> The presence of the [Shop](https://shopify.dev/docs/api/liquid/objects/shop) object
> is required for validation purposes only.



**Note**

> The \`action\` specified is always \`'follow'\`. If this parameter is not supplied the button will not render.

\`\`\`liquid
{{ shop | login_button: action: 'follow' }}
\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/login_button)

`,returns:"string",scope:"shop",snippet:"login_button: action: 'follow'",arguments:[{type:"parameter",requires:["action"],value:{action:{type:"string",value:"follow"}}}]},camelize:{description:`Converts a string to CamelCase. 



#### Example

\`\`\`liquid

{{ 'variable-name' | camelize }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/camelize)

`,returns:"string"},handleize:{description:`Converts a string into a [handle](https://shopify.dev/docs/api/liquid/basics#handles). 

**Note**

> The \`handleize\` filter has an alias of \`handle\`.

#### Example

\`\`\`liquid

{{ product.title | handleize }}
{{ product.title | handle }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/handleize)

`,returns:"string"},url_escape:{description:`Escapes any URL-unsafe characters in a string. 



#### Example

\`\`\`liquid

{{ '<p>Health & Love potions</p>' | url_escape }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/url_escape)

`,returns:"string"},url_param_escape:{description:`Escapes any characters in a string that are unsafe for URL parameters. The \`url_param_escape\` filter escapes the same characters as [\`url_escape\`](https://shopify.dev/docs/api/liquid/filters/url_escape), with the
addition of \`&\`.

#### Example

\`\`\`liquid

{{ '<p>Health & Love potions</p>' | url_param_escape }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/url_param_escape)

`,returns:"string"},highlight_active_tag:{description:`Wraps a given tag in an HTML \`<span>\` tag, with a \`class\` attribute of \`active\`, if the tag is currently active. Only
applies to collection tags. 



#### Example

\`\`\`liquid

{% for tag in collection.all_tags %}
  {{- tag | highlight_active_tag | link_to_tag: tag }}
{% endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/highlight_active_tag)

`,scope:"collection",returns:"string"},link_to_add_tag:{description:`Generates an HTML \`<a>\` tag with an \`href\` attribute linking to the current blog or collection, filtered to show
only articles or products that have a given tag, as well as any currently active tags. 

**Tip**

> To learn more about filtering by tag, refer to [Filter articles by tag](https://shopify.dev/themes/architecture/templates/blog#filter-articles-by-tag)
> or [Filter collections by tag](https://shopify.dev/themes/navigation-search/filtering/tag-filtering).

#### Example

\`\`\`liquid

{% for tag in collection.all_tags %}
  {%- if current_tags contains tag -%}
    {{ tag }}
  {%- else -%}
    {{ tag | link_to_add_tag: tag }}
  {%- endif -%}
{% endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/link_to_add_tag)

`,snippet:"link_to_add_tag: $1",arguments:[{type:"string",required:!0}],returns:"string"},link_to_remove_tag:{description:`Generates an HTML \`<a>\` tag with an \`href\` attribute linking to the current blog or collection, filtered to show
only articles or products that have any currently active tags, except the provided tag. 

**Tip**

> To learn more about filtering by tag, refer to [Filter articles by tag](https://shopify.dev/themes/architecture/templates/blog#filter-articles-by-tag)
> or [Filter collections by tag](https://shopify.dev/themes/navigation-search/filtering/tag-filtering).

#### Example

\`\`\`liquid

{% for tag in collection.all_tags %}
  {%- if current_tags contains tag -%}
    {{ tag | link_to_remove_tag: tag }}
  {%- else -%}
    {{ tag | link_to_add_tag: tag }}
  {%- endif -%}
{% endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/link_to_remove_tag)

`,snippet:"link_to_remove_tag: $1",arguments:[{type:"string",required:!0}],returns:"string"},link_to_tag:{description:`Generates an HTML \`<a>\` tag with an \`href\` attribute linking to the current blog or collection, filtered to show
only articles or products that have a given tag. 

**Tip**

> To learn more about filtering by tag, refer to [Filter articles by tag](https://shopify.dev/themes/architecture/templates/blog#filter-articles-by-tag)
> or [Filter collections by tag](https://shopify.dev/themes/navigation-search/filtering/tag-filtering).

#### Example

\`\`\`liquid

{% for tag in collection.all_tags %}
  {{- tag | link_to_tag: tag }}
{% endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/link_to_tag)

`,snippet:"link_to_tag: $1",arguments:[{type:"string",required:!0}],returns:"string"},format_address:{description:`Generates an HTML address display, with each address component ordered according to the address's locale. 



#### Example

\`\`\`liquid

{{ shop.address | format_address }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/format_address)

`,returns:"string"},highlight:{description:`Wraps all instances of a specific string, within a given string, with an HTML \`<strong>\` tag with a \`class\` attribute
of \`highlight\`. 



#### Example

\`\`\`liquid

{% for item in search.results %}
  {% if item.object_type == 'product' %}
    {{ item.description | highlight: search.terms }}
  {% else %}
    {{ item.content | highlight: search.terms }}
  {% endif %}
{% endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/highlight)

`,scope:"search",returns:"string",snippet:"highlight: ${1:search.terms}",arguments:[{type:"string",required:!0}]},pluralize:{description:`Outputs the singular or plural version of a string based on a given number.

> Caution:
> The \`pluralize\` filter applies English pluralization rules to determine which string to output. You shouldn't use this
> filter on non-English strings because it could lead to incorrect pluralizations.

#### Example

\`\`\`liquid

Cart item count: {{ cart.item_count }} {{ cart.item_count | pluralize: 'item', 'items' }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/pluralize)

`,returns:"string",snippet:"pluralize: $1, $2",arguments:[{type:"string",required:!0},{type:"string",required:!0}]},article_img_url:{description:`\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F

The \`article_img_url\` filter has been replaced by [\`image_url\`](/docs/api/liquid/filters/image_url).

---

Returns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for an [article's image](https://shopify.dev/docs/api/liquid/objects/article#article-image). 



#### Example

\`\`\`liquid

{{ article.image | article_img_url }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/article_img_url)

`,returns:"string",deprecated:!0,snippet:"article_img_url"},asset_img_url:{description:`Returns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for an image in the
[\`assets\` directory](https://shopify.dev/themes/architecture#assets) of a theme. 



#### Example

\`\`\`liquid

{{ 'red-and-black-bramble-berries.jpg' | asset_img_url }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/asset_img_url)

`,arguments:[{type:"string",description:"The original image size",pattern:/\b(?:master|x?[1-9]\d{2,3}|[1-9]\d{2,3}x|[1-9]\d{2,3}x[1-9]\d{2,3})\b/,value:["master","2000x","1500x","1000x","500x","250x","1500x1500","1000x1000","500x500","250x250"]},{type:"parameter",value:{crop:{type:"string",description:"You can specify a crop parameter to make sure that the resulting image's dimensions match the requested dimensions. If the entire image won't fit in your requested dimensions, the crop parameter specifies what part of the image to show",pattern:/\b(?:top|center|bottom|right)\b/,value:["top","center","bottom","left","right"]},scale:{type:"number",description:"The scale parameter lets you specify the pixel density of the image",pattern:/\b[23]\b/,value:["2","3"]},format:{type:"string",description:"The format parameter lets you specify what file format to use for the displayed image.",pattern:/\bp?jpg\b/,value:[{value:"jpg"},{value:"pjpg",description:"pjpg is progressive JPEG. A browser loads a full-sized progressive JPEG with gradually increasing quality, instead of loading the full-quality image from top to bottom like a traditional JPEG."}]}}}],returns:"string",snippet:"asset_img_url"},asset_url:{description:`Returns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for a file in the
[\`assets\` directory](https://shopify.dev/themes/architecture#assets) of a theme. 



#### Example

\`\`\`liquid

{{ 'cart.js' | asset_url }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/asset_url)

`,returns:"string"},collection_img_url:{description:`\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F

The \`collection_img_url\` filter has been replaced by [\`image_url\`](/docs/api/liquid/filters/image_url).

---

Returns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for a [collection's image](https://shopify.dev/docs/api/liquid/objects/collection#collection-image). 



#### Example

\`\`\`liquid

{{ collection.image | collection_img_url }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/collection_img_url)

`,returns:"string",deprecated:!0,snippet:"collection_img_url"},file_img_url:{description:`Returns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for an image from the
[Files](https://www.shopify.com/admin/settings/files) page of the Shopify admin. 



#### Example

\`\`\`liquid

{{ 'potions-header.png' | file_img_url }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/file_img_url)

`,snippet:"file_img_url",returns:"string"},file_url:{description:`Returns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for a file from the
[Files](https://www.shopify.com/admin/settings/files) page of the Shopify admin. 



#### Example

\`\`\`liquid

{{ 'disclaimer.pdf' | file_url }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/file_url)

`,returns:"string",snippet:"file_url"},global_asset_url:{description:"Returns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for a global asset. Global assets are kept in a directory on Shopify's server. Using global assets can be faster than loading the resource\ndirectly.\n\nDepending on the resource type, you might need to use an additional filter to load the resource. The following table\noutlines which filter to use for specific resource types.\n\n| Resource type | Additional filter |\n| --- | --- |\n| JavaScript (`.js`) | [`script_tag`](https://shopify.dev/docs/api/liquid/filters/script_tag) |\n| CSS (`.css`) | [`stylesheet_tag`](https://shopify.dev/docs/api/liquid/filters/stylesheet_tag)  |\n\nThe following table outlines the available global assets:\n\n| Category | Assets |\n| --- | --- |\n| Firebug | - `firebug/firebug.css`<br>- `firebug/firebug.html`<br>- `firebug/firebug.js`<br>- `firebug/firebugx.js`<br>- `firebug/errorIcon.png`<br>- `firebug/infoIcon.png`<br>- `firebug/warningIcon.png` |\n| JavaScript libraries | - `controls.js`<br>- `dragdrop.js`<br>- `effects.js`<br>- `ga.js`<br>- `mootools.js` |\n| Lightbox | - `lightbox.css`<br>- `lightbox.js`<br><br>- `lightbox/v1/lightbox.css`<br>- `lightbox/v1/lightbox.js`<br><br>- `lightbox/v2/lightbox.css`<br>- `lightbox/v2/lightbox.js`<br>- `lightbox/v2/close.gif`<br>- `lightbox/v2/loading.gif`<br>- `lightbox/v2/overlay.png`<br>- `lightbox/v2/zoom-lg.gif`<br><br>- `lightbox/v204/lightbox.css`<br>- `lightbox/v204/lightbox.js`<br>- `lightbox/v204/bullet.gif`<br>- `lightbox/v204/close.gif`<br>- `lightbox/v204/closelabel.gif`<br>- `lightbox/v204/donatebutton.gif`<br>- `lightbox/v204/downloadicon.gif`<br>- `lightbox/v204/loading.gif`<br>- `lightbox/v204/nextlabel.png`<br>- `lightbox/v204/prevlabel.gif` |\n| Prototype | - `prototype.js`<br>- `prototype/1.5/prototype.js`<br>- `prototype/1.6/prototype.js` |\n| script.aculo.us | - `scriptaculous/1.8.2/scriptaculous.js`<br>- `scriptaculous/1.8.2/builder.js`<br>- `scriptaculous/1.8.2/controls.js`<br>- `scriptaculous/1.8.2/dragdrop.js`<br>- `scriptaculous/1.8.2/effects.js`<br>- `scriptaculous/1.8.2/slider.js`<br>- `scriptaculous/1.8.2/sound.js`<br>- `scriptaculous/1.8.2/unittest.js` |\n| Shopify | - `list-collection.css`<br>- `textile.css` |\n\n#### Example\n\n```liquid\n\n{{ 'lightbox.js' | global_asset_url | script_tag }}\n\n{{ 'lightbox.css' | global_asset_url | stylesheet_tag }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/global_asset_url)\n\n",returns:"string"},image_url:{description:`Returns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for an image. You can use the \`image_url\` filter on the following objects, as well as their \`src\` property:

- [\`article\`](https://shopify.dev/docs/api/liquid/objects/article)
- [\`collection\`](https://shopify.dev/docs/api/liquid/objects/collection)
- [\`image\`](https://shopify.dev/docs/api/liquid/objects/image)
- [\`line_item\`](https://shopify.dev/docs/api/liquid/objects/line_item)
- [\`product\`](https://shopify.dev/docs/api/liquid/objects/product)
- [\`variant\`](https://shopify.dev/docs/api/liquid/objects/variant)
- [\`country\`](https://shopify.dev/docs/api/liquid/objects/country)

> Caution:
> You need to specify either a [\`width\`](https://shopify.dev/docs/api/liquid/filters/image_url#image_url-width) or
> [\`height\`](https://shopify.dev/docs/api/liquid/filters/image_url#image_url-height) parameter. If neither are specified, then an error is returned.



**Note**

> Regardless of the specified dimensions, an image can never be resized to be larger than its original dimensions.

#### Example

\`\`\`liquid

{{ product | image_url: width: 450 }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/image_url)

`,returns:"string",objects:["article","collection","image","line_item","product","variant","country"],snippet:"image_url: ${1|width,height|}: $2",arguments:[{type:"parameter",strict:!0,requires:/\b(?:width|height)\b/,value:{width:{type:"number",description:"Specify the width of the image up to a maximum of `5760px`. If only the width is specified, then the height is automatically calculated based on the image's dimensions.",pattern:[0,5760]},height:{type:"number",description:"Specify the height of the image up to a maximum of `5760px`. If only the height is specified, then the width is automatically calculated based on the image's dimensions.",pattern:[0,5760]},format:{type:"string",description:"Specify which file format to use for the image. The valid formats are `pjpg` and `jpg`.\n\nIt's not practical to convert a lossy image format, like `jpg`, to a lossless image format, like `png`, so Shopify can do only the following conversions:\n\n- `png` to `jpg`\n- `png` to `pjpg`\n- `jpg` to `pjpg`\n\n> **Note**\n>\n>Shopify automatically detects which image formats are supported by the client (e.g. `WebP`, `AVIF`, etc.) and selects a file format for optimal quality and file size. When a format is specified, Shopify takes into account the features (e.g. progressive, alpha channel) of the specified file format when making the final automatic format selection. To learn more, visit [https://cdn.shopify.com/](https://cdn.shopify.com/).",pattern:/\b(?:p?jpg)\b/,value:["jpg","pjpg"]},pad_color:{type:"string",pattern:/(?:[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/,description:"Specify a color to pad the image if the specified dimensions result in an aspect ratio that differs from the original. The color must be in hexadecimal format (`hex3` or `hex6`)."},crop:{type:"string",description:"Specify which part of the image to show if the specified dimensions result in an aspect ratio that differs from the original. You can use the following values:\n\n- top\n- center\n- bottom\n- left\n- right\n- region\n\nThe default value is `center`.\n\nWhen using the `region` crop mode, the starting point for the crop is defined by `crop_left` and `crop_top` and extends to the `crop_width` and `crop_height`. Optionally, to resize the region extracted by the crop, use the width and height parameters.",value:["top","center","bottom","left","right","region"]},crop_left:{type:"number",pattern:[0,5760],when:[["crop","region"]]},crop_top:{type:"number",pattern:[0,5760],when:[["crop","region"]]},crop_width:{type:"number",pattern:[0,5760],when:[["crop","region"]]},crop_height:{type:"number",pattern:[0,5760],when:[["crop","region"]]}}}]},img_tag:{description:`\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F

The \`img_tag\` filter has been replaced by [\`image_tag\`](/docs/api/liquid/filters/image_tag).

---

Generates an HTML \`<img>\` tag for a given image URL. You can also use the \`img_tag\` filter on the following objects:

- [\`article\`](https://shopify.dev/docs/api/liquid/objects/article)
- [\`collection\`](https://shopify.dev/docs/api/liquid/objects/collection)
- [\`image\`](https://shopify.dev/docs/api/liquid/objects/image)
- [\`line_item\`](https://shopify.dev/docs/api/liquid/objects/line_item)
- [\`product\`](https://shopify.dev/docs/api/liquid/objects/product)
- [\`variant\`](https://shopify.dev/docs/api/liquid/objects/variant)

#### Example

\`\`\`liquid

{{ product | img_tag }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/img_tag)

`,returns:"string",deprecated:!0,arguments:[{type:"string"},{type:"string"},{type:"string"}]},img_url:{description:`\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F

The \`img_url\` filter has been replaced by [\`image_url\`](/docs/api/liquid/filters/image_url).

---

Returns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for an image. You can use the \`img_url\` filter on the following objects:

- [\`article\`](https://shopify.dev/docs/api/liquid/objects/article)
- [\`collection\`](https://shopify.dev/docs/api/liquid/objects/collection)
- [\`image\`](https://shopify.dev/docs/api/liquid/objects/image)
- [\`line_item\`](https://shopify.dev/docs/api/liquid/objects/line_item)
- [\`product\`](https://shopify.dev/docs/api/liquid/objects/product)
- [\`variant\`](https://shopify.dev/docs/api/liquid/objects/variant)

#### Example

\`\`\`liquid

{{ product | img_url }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/img_url)

`,snippet:"img_url: '${2:medium}'",returns:"string",deprecated:!0,objects:["article","collection","image","line_item","product","variant","country"]},link_to:{description:`Generates an HTML \`<a>\` tag. 



#### Example

\`\`\`liquid

{{ 'Shopify' | link_to: 'https://www.shopify.com' }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/link_to)

`,snippet:"link_to: $1",arguments:[{type:"string",required:!0,description:"The URL to link to."},{type:"parameter",strict:!1,description:`You can specify [HTML attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attributes) by including a parameter that matches the attribute name, and the desired value.

#### Example

\`\`\`liquid

{{ 'Shopify' | link_to: 'https://www.shopify.com', class: 'link-class' }}

\`\`\`

`,value:{class:{type:"string"},id:{type:"string"},title:{type:"string"}}}],returns:"string"},line_items_for:{description:`Returns the subset of cart line items that include a specified product or variant. Accepts the following object types:

- \`product\`
- \`variant\`

#### Example

\`\`\`liquid

{% assign product = all_products['bloodroot-whole'] %}
{% assign line_items = cart | line_items_for: product %}

Total cart quantity for product: {{ line_items | sum: 'quantity' }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/line_items_for)


Last Updated: 0th October 2023


`,returns:"array",snippet:"line_items_for: $1,",arguments:[{type:"any",required:!0}]},payment_type_img_url:{description:`Returns the URL for an SVG image of a given [payment type](https://shopify.dev/docs/api/liquid/objects/shop#shop-enabled_payment_types). 



#### Example

\`\`\`liquid

{% for type in shop.enabled_payment_types %}
<img src="{{ type | payment_type_img_url }}" />
{% endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/payment_type_img_url)

`,returns:"string"},payment_type_svg_tag:{description:`Generates an HTML \`<svg>\` tag for a given [payment type](https://shopify.dev/docs/api/liquid/objects/shop#shop-enabled_payment_types). 



#### Example

\`\`\`liquid

{% for type in shop.enabled_payment_types -%}
  {{ type | payment_type_svg_tag }}
{% endfor %}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/payment_type_svg_tag)

`,returns:"string"},placeholder_svg_tag:{description:"Generates an HTML `<svg>` tag for a given placeholder name. Accepts the following placeholder names:\n\n- `collection-1`\n- `collection-2`\n- `collection-3`\n- `collection-4`\n- `collection-5`\n- `collection-6`\n- `image`\n- `lifestyle-1`\n- `lifestyle-2`\n- `product-1`\n- `product-2`\n- `product-3`\n- `product-4`\n- `product-5`\n- `product-6`\n\n#### Example\n\n```liquid\n\n{{ 'collection-1' | placeholder_svg_tag }}\n\n```\n\n---\n\n[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/placeholder_svg_tag)\n\n",returns:"string"},preload_tag:{description:`Generates an HTML \`<link>\` tag with a \`rel\` attribute of \`preload\` to prioritize loading a given Shopify-hosted asset.
The asset URL is also added to the [Link header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link)
with a \`rel\` attribute of \`preload\`. You should use this filter sparingly. For example, consider preloading only resources necessary for rendering
above-the-fold content. To learn more about preloading resources, refer to
[Performance best practices for Shopify themes](https://shopify.dev/themes/best-practices/performance#preload-key-resources-defer-or-avoid-loading-others).



**Tip**

> If you want to preload a stylesheet, then use [\`stylesheet_tag\`](https://shopify.dev/docs/api/liquid/filters/stylesheet_tag). If you want to
> preload an image, then use [\`image_tag\`](https://shopify.dev/docs/api/liquid/filters/image_tag).

The input to this filter must be a URL from one of the following filters:

- [\`asset_url\`](https://shopify.dev/docs/api/liquid/filters/asset_url)
- [\`global_asset_url\`](https://shopify.dev/docs/api/liquid/filters/global_asset_url)
- [\`shopify_asset_url\`](https://shopify.dev/docs/api/liquid/filters/shopify_asset_url)

The \`preload_tag\` filter also requires an [\`as\` parameter](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#attr-as)
based on the kind of resource being preloaded.

#### Example

\`\`\`liquid

{{ 'cart.js' | asset_url | preload_tag: as: 'script' }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/preload_tag)

`,returns:"string",snippet:"preload_tag: as: ${1|audio,document,embed,fetch,font,image,object,script,style,track,video,worker|}",filters:["asset_url","global_asset_url","shopify_asset_url"],arguments:[{type:"parameter",strict:!1,requires:["as"],value:{as:{type:"string",value:["audio","document","embed","fetch","font","image","object","script","style","track","video","worker"]}}}]},product_img_url:{description:`\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F

The \`product_img_url\` filter has been replaced by [\`image_url\`](/docs/api/liquid/filters/image_url).

---

Returns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for a [product image](https://shopify.dev/docs/api/liquid/objects/product). This can be the product's \`featured_image\` or any image from the \`images\` array.

#### Example

\`\`\`liquid

{{ product.featured_image | product_img_url }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/product_img_url)

`,returns:"string",deprecated:!0,snippet:"product_img_url"},script_tag:{description:`Generates an HTML \`<script>\` tag for a given resource URL. The tag has a \`type\` attribute of \`text/javascript\`. 



#### Example

\`\`\`liquid

{{ 'cart.js' | asset_url | script_tag }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/script_tag)

`,returns:"string"},shopify_asset_url:{description:`Returns the [CDN URL](https://shopify.dev/themes/best-practices/performance/platform#shopify-cdn) for a globally accessible Shopify asset. The following are the globally accessible Shopify assets:

- \`option_selection.js\`
- \`api.jquery.js\`
- \`shopify_common.js\`
- \`customer_area.js\`
- \`currencies.js\`
- \`customer.css\`

#### Example

\`\`\`liquid

{{ 'option_selection.js' | shopify_asset_url }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/shopify_asset_url)

`,returns:"string"},stylesheet_tag:{description:`Generates an HTML \`<link>\` tag for a given resource URL. The tag has the following parameters:

| Attribute | Value |
| --- | --- |
| \`rel\` | \`stylesheet\` |
| \`type\` | \`text/css\` |
| \`media\` | \`all\` | 



#### Example

\`\`\`liquid

{{ 'base.css' | asset_url | stylesheet_tag }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/stylesheet_tag)

`,returns:"string",snippet:"stylesheet_tag",arguments:[{type:"parameter",value:{preload:{type:"boolean",description:`Specify whether the stylesheet should be preloaded. When preload is set to true, a resource hint is sent as a Link header with a rel value of [preload](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preload).

This option doesn't affect the HTML link tag directly. You should use the preload parameter sparingly. For example, consider preloading only render-blocking stylesheets that are needed for initial functionality of the page, such as above-the-fold content. To learn more about resource hints in Shopify themes, refer to [Performance best practices for Shopify themes](https://shopify.dev/themes/best-practices/performance#preload-key-resources-defer-or-avoid-loading-others).`}}}]},weight_with_unit:{description:`Generates a formatted weight for a [\`variant\` object](https://shopify.dev/docs/api/liquid/objects/variant#variant-weight). The weight unit is
set in the [general settings](https://www.shopify.com/admin/settings/general) in the Shopify admin. 



#### Example

\`\`\`liquid

{%- assign variant = product.variants.first -%}

{{ variant.weight | weight_with_unit }}

\`\`\`

---

[Shopify Liquid](https://shopify.dev/docs/api/liquid/filters/weight_with_unit)

`,arguments:[{type:"string",required:!1,description:"The weight unit to use in place of the default weight unit."}],returns:"string"}};var Le=U({},Q,L);var C={};k(C,{filters:()=>je,objects:()=>se,tags:()=>we});var ne={relative_url:{description:"Prepend the baseurl value to the input. Useful if your site is hosted at a subpath rather than the root of the domain.",reference:{name:"Jekyll Liquid",url:"https://jekyllrb.com/docs/liquid/filters/"}},absolute_url:{description:"Prepend the url and baseurl value to the input.",reference:{name:"Jekyll Liquid",url:"https://jekyllrb.com/docs/liquid/filters/"}},date_to_xmlschema:{description:"Convert a Date into XML Schema (ISO 8601) format.",reference:{name:"Jekyll Liquid",url:"https://jekyllrb.com/docs/liquid/filters/"}},date_to_rfc822:{description:"Convert a Date into the RFC-822 format used for RSS feeds.",reference:{name:"Jekyll Liquid",url:"https://jekyllrb.com/docs/liquid/filters/"}},date_to_string:{description:"Convert a date to short format.",reference:{name:"Jekyll Liquid",url:"https://jekyllrb.com/docs/liquid/filters/"}}};var ie={post_url:{type:"output",description:"Link to a post on your site, the post_url tag will generate the correct permalink URL for the post you specify",singleton:!0,reference:{name:"Jekyll Liquid",url:"https://jekyllrb.com/docs/liquid/tags/#linking-to-posts"}},include:{type:"import",description:"The include tag allows you to include the content from another file stored in the _includes folder",singleton:!0,reference:{name:"Jekyll Liquid",url:"https://jekyllrb.com/docs/includes"}},include_relative:{type:"import",description:"Include file fragments relative to the current file by using the include_relative tag",singleton:!0,reference:{name:"Jekyll Liquid",url:"https://jekyllrb.com/docs/includes/#including-files-relative-to-another-file"}},link:{type:"output",filters:!0},highlight:{type:"raw",description:"Render a code block with syntax highlighting.",snippet:"highlight ${1}",filters:!1,reference:{name:"Jekyll Liquid",url:"https://jekyllrb.com/docs/liquid/tags/#code-snippet-highlighting"}}};var se={site:{type:"object",description:"Site wide information + configuration settings from _config.yml. See below for details.",properties:{pages:{description:"A list of all Pages.",type:"array"},posts:{description:"A reverse chronological list of all Posts.",type:"array"},related_posts:{type:"array",description:"If the page being processed is a Post, this contains a list of up to ten related Posts. By default, these are the ten most recent posts. For high quality but slow to compute results, run the jekyll command with the --lsi (latent semantic indexing) option. "},time:{description:"The current time (when you run the jekyll command).",type:"string"}},reference:{name:"Jekyll Liquid",url:"https://jekyllrb.com/docs/variables/#site-variables"}}};var je=Object.assign(Object.create(null),ne,j),we=Object.assign(Object.create(null),ie,L);var $={};k($,{filters:()=>Te,objects:()=>ae,tags:()=>Se});var oe={url:{description:"Works with the pathPrefix configuration option to properly normalize absolute paths in your content with the `pathPrefix` added. Useful if you host your site on GitHub Pages, which normally live in a subdirectory, e.g. `https://11ty.github.io/eleventy-base-blog/`.\n\n**Note**\n\nIf you don\u2019t need `pathPrefix` (or don\u2019t ever plan on moving your site\u2019s top-level directory structure), you probably don\u2019t need to use the `url` filter.\n\n[11ty Liquid](https://www.11ty.dev/docs/filters/url/)",returns:"string",snippet:"url",reference:{name:"Eleventy Liquid",url:"https://www.11ty.dev/docs/filters/url/"}},slug:{description:"\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F\n\nStarting in Eleventy v1.0.0 it is recommended to use [the slugify Universal Filter](https://www.11ty.dev/docs/filters/slugify/) instead of `slug`. For backwards compatibility, `slug` is still included and supported but `slugify` has better default behavior for URLs with special characters. **If you want to swap `slug` to `slugify` wholesale in old projects, [please read this warning about breaking URLs](https://www.11ty.dev/docs/filters/slugify/#upgrade-from-slug-to-slugify). Be careful!\n\nUses the [@sindresorhus/slugify](https://www.npmjs.com/package/@sindresorhus/slugify) npm package to convert a string into a URL slug. Typically used with permalinks.",returns:"string",snippet:"slug",deprecated:!0},slugify:{description:"Uses the [@sindresorhus/slugify](https://www.npmjs.com/package/@sindresorhus/slugify) npm package to convert a string into a URL slug. Typically used with permalinks.",returns:"string",snippet:"slugify",reference:{name:"Eleventy Liquid",url:"https://www.11ty.dev/docs/filters/slugify/"}},log:{description:'An easy way to `console.log` anything from inside of a template file. This is functionally the same as running `console.log("My Title")` inside of your template.',snippet:"log"}};var ae={page:{summary:"The `page` object has information about the current page.",description:`The \`page\` object has information about the current page. For example, \`page.url\` is useful for finding the current page in a collection.

[Read more about Collections](https://www.11ty.dev/docs/collections/) (look at Example: Navigation Links with an active class added for on the current page).

[11ty Liquid](https://www.11ty.dev/docs/data-eleventy-supplied/#page-variable)

`,type:"object",global:!0,properties:{url:{type:"string",description:"Can be used in `<a href>` to link to other templates.\n\n**Note**\n\nThis value will be `false` if `permalink` is set to `false`.\n\n**Example**\n\n```\n\n/current/page/myFile/\n\n```\n\n"},fileSlug:{type:"string",description:`The \`fileSlug\` variable is mapped from \`inputPath\`, and is useful for creating your own clean [permalinks](https://www.11ty.dev/docs/permalinks/).

\`fileSlug\` returns information on the parent directory if the file is an \`index\` template.

**Note**

For permalinks: inputPath filename minus template file extension.

**Example**

\`\`\`

page.url: /current/page/myFile/
page.fileSlug: myFile

\`\`\`

[11ty Liquid](https://www.11ty.dev/docs/data-eleventy-supplied/#fileslug)

`},filePathStem:{type:"string",description:`The \`filePathStem\` variable is mapped from \`inputPath\`, and is useful if you\u2019ve inherited a project that doesn\u2019t use clean [permalinks](https://www.11ty.dev/docs/permalinks/).

**Note**

Careful with this one! Remember that [Cool URI\u2019s don\u2019t change](https://www.11ty.dev/docs/permalinks/#cool-uris-dont-change).

[11ty Liquid](https://www.11ty.dev/docs/data-eleventy-supplied/#filepathstem)`},date:{type:"string",description:`The date associated with the page. Defaults to the content\u2019s file created date but can be overridden. [Read more at Content Dates](https://www.11ty.dev/docs/dates/).

[11ty Liquid](https://www.11ty.dev/docs/data-eleventy-supplied/#date)

`},inputPath:{type:"string",description:`The path to the original source file for the template.

**Note**

This will include your input directory path!.

**Example**

\`\`\`

./current/page/myFile.md

\`\`\`

`},outputPath:{type:"string",description:"Depends on your output directory (the default is _site). You probably won\u2019t use this: `url` is better.\n\n**Note**\n\nThis value will be `false` if `permalink` is set to `false`"},outputFileExtension:{type:"string",description:"Useful with `page.filePathStem` when using custom file extensions."}}},eleventy:{description:"Contains Eleventy-specific data from environment variables and the Serverless plugin (if used).",global:!0,type:"object",properties:{version:{type:"string",description:"Eleventy version"},generator:{type:"string",description:`For use with \`<meta name="generator">\`.

It\u2019s helpful if you add \`<meta name="generator">\` to your existing Eleventy project as shown below. Learn more from David Darnes\u2019 blog post: [You should add a generator tag to your Eleventy site](https://darn.es/you-should-add-a-generator-tag-to-your-eleventy-site/).

**Example**

\`\`\`liquid

<meta name="generator" content="{{ eleventy.generator }}">

\`\`\`

`},env:{type:"object",description:"Eleventy also supplies its own Eleventy-specific environment variables, usually intended for more advanced use cases. You can use these in your configuration or in data files as needed.",properties:{root:{type:"string",description:"Absolute path to the directory in which you\u2019ve run the Eleventy command."},config:{type:"string",description:"Absolute path to the current config file"},source:{type:"string",description:" The method, either `cli` or `script`",literal:["cli","script"]},runMode:{type:"string",description:"One of `serve`, `watch`, or `build`",literal:["serve","watch","build"]},serverless:{type:"object",properties:{path:{type:"object",description:" An object containing the values from any Dynamic URL slugs from Serverless paths. e.g. A slug for `/path/:id/` and a URL for `/path/1/` would give `{ id: 1 }`"},query:{type:"object",description:"The `event.queryStringParameters` received from the serverless function. Note these are not available in Netlify On-demand Builders, e.g. `?id=1 would be { id: 1 }`"}}}},reference:{name:"Eleventy Liquid",url:"https://www.11ty.dev/docs/environment-vars/#eleventy-supplied"}}},reference:{name:"Eleventy Liquid",url:"https://www.11ty.dev/docs/data-eleventy-supplied/#eleventy-variable"}},pagination:{type:"object",global:!0,description:`Pagination allows you to iterate over a data set and create multiple files from a single template. The input data can be in the form of an array or object defined in your frontmatter or in [global data](https://www.11ty.dev/docs/data-global/), or you can paginate a collection to make an easily digestible list of your posts.

> **NOTE**
>
> To iterate over a data set and create pages for individual chunks of data, use pagination. Enable in your template\u2019s front matter by adding the pagination key.`,properties:{items:{type:"array",description:"Array of current page\u2019s chunk of data"},pageNumber:{type:"number",description:"Current page number, `0` indexed"},hrefs:{type:"array",description:"Array of all page hrefs (in order)",items:"string"},href:{type:"object",properties:{next:{type:"string",description:'Put inside `<a href="">Next Page</a>`'},prev:{type:"string",description:'Put inside `<a href="">Previous Page</a>`'},first:{type:"string"},last:{type:"string"}}},pages:{type:"array",description:"Array of all chunks of paginated data (in order)"},page:{type:"object",properties:{next:{type:"any",description:'Put inside `<a href="">Next Page</a>`'},prev:{type:"any",description:'Put inside `<a href="">Previous Page</a>`'},first:{type:"any"},last:{type:"any"}}}},reference:{name:"Eleventy Liquid",url:"https://www.11ty.dev/docs/pagination/"}}};var Te=U({},oe,j),Se=U({},L);var x=process.cwd(),q=`${y.default.gray("[")}SPECS${y.default.gray("]")} ${y.default.magenta("RUN")}`,{log:b}=console;Ue();function Ue(){b(`${q} ${y.default.magenta.bold("Building Shopify Specifications")}`),Re(),ke(),b(`${q} ${y.default.magenta.bold("Finished Shopify Specifications")}`)}function Me(){let e=new Date,t=e.getFullYear(),o=e.getMonth()+1,n=e.getDay(),r=s=>({1:"January",2:"February",3:"March",4:"April",5:"May",6:"June",7:"July",8:"August",9:"September",10:"October",11:"November",12:"December"})[s];return`${(s=>{let i=s%10,p=s%100;return s+(i===1&&p!==11?"st":i===2&&p!==12?"nd":i===3&&p!==13?"rd":"th")})(n)} ${r(o)} ${t}`}function xe(e,t,o){return`import { ${e} } from '../..'

export const ${t}: ${e} = ${o}`}function m(e){return e=e.replace(/&lt;/g,"<"),e=e.replace(/&gt;/g,">"),e=e.replace(/&quot;/g,'"'),e=e.replace(/&#39;/g,"'"),e=e.replace(/&amp;/g,"&"),e}function J(e,t,o){let n=[],{name:r,summary:h=null,description:s=null,examples:i,deprecated:p,deprecation_reason:c}=t;if(p===!0&&(n.push("\u26A0\uFE0F **DEPRECATED** \u26A0\uFE0F"),c!==""?n.push(m(c),"---"):n.push("No deprecation reason has been provided by the Shopify team \u{1F921}.","---")),s!==""&&h!==null){let d=m(s).replace(/>\s(Tip|Note):/g,`

**$1**
`).replace(/\(\/(docs\/api.*(?=\)))/g,"(https://shopify.dev/$1").replace(/\]\(\/(.*)(?=\))/g,"](https://shopify.dev/$1"),f=m(h).replace(/\(\/(docs\/api.*(?=\)))/g,"(https://shopify.dev/$1").replace(/\]\(\/(.*)(?=\))/g,"](https://shopify.dev/$1");d.trimStart()[0]===">"?n.push(m(f),d):n.push(m(f)+" "+d)}else{let d="";if(s!==""&&(d=m(s).replace(/>\s(Tip|Note):/g,`

**$1**
`).replace(/\(\/(docs\/api.*(?=\)))/g,"(https://shopify.dev/$1").replace(/\]\(\/(.*)(?=\))/g,"](https://shopify.dev/$1")),h.length>0){let f=m(h).replace(/\(\/(docs\/api.*(?=\)))/g,"(https://shopify.dev/$1").replace(/\]\(\/(.*)(?=\))/g,"](https://shopify.dev/$1");d.trimStart()[0]===">"?n.push(m(f),d):n.push(m(f)+" "+d)}n.push(d)}if(i.length>0){let[d]=i;d.name===""?n.push("#### Example"):n.push(`#### ${d.name}`),d.description!==""&&n.push(m(d.description)),d.raw_liquid!==""&&n.push("```liquid",m(d.raw_liquid),"```")}return n.push("---"),o?n.push(`[Shopify Liquid](https://shopify.dev/docs/api/liquid/${e}/${o}/${r})
`):n.push(`[Shopify Liquid](https://shopify.dev/docs/api/liquid/${e}/${r})
`),n.push(`Last Updated: ${Me()}`,`
`),n.join(`

`)}function ke(){b(`${q} ${y.default.magenta("Shopify Filters")}`);let e=(0,S.join)(x,"node_modules/.specs/data","filters.json"),t=T.default.readFileSync(e).toString(),o=JSON.parse(t),n={},r=M.filters;for(let i of o)if(!(i.name in r))if(n[i.name]={},n[i.name].description=J("filters",i),i.return_type[0].type==="string"?n[i.name].returns="string":i.return_type[0].type==="number"?n[i.name].returns="number":i.return_type[0].type==="boolean"?n[i.name].returns="boolean":i.return_type[0].type==="array"?n[i.name].returns="array":i.return_type[0].type==="boolean"?n[i.name].returns="boolean":i.return_type[0].type==="object"?n[i.name].returns="object":n[i.name].returns="any",i.deprecated===!0&&(n[i.name].deprecated=i.deprecated),i.parameters.length===0){let p=[],c=[],d=i.syntax.split(" ");if(d[2][d[2].length-1]===":"){p.push(d[2]);let f=0;for(let l of d.slice(3)){f=f+1;let u;l.slice(0,-1)==="string"?u="string":l.slice(0,-1)==="number"?u="number":l.slice(0,-1)==="boolean"?u="boolean":l.slice(0,-1)==="array"?u="array":l.slice(0,-1)==="boolean"?u="boolean":l.slice(0,-1)==="object"?u="object":u="any",l[l.length-1]===","?(u==="string"?p.push("'$"+f+"',"):p.push("$"+f+","),c.push({type:u,required:!0})):(u==="string"?p.push("'$"+f+"'"):p.push("$"+f+","),c.push({type:u,required:!0}))}n[i.name].snippet=p.join(" "),n[i.name].arguments=c}}else{let p=i.syntax.split(" "),c=[],d=[];c.push(p[2]),p.splice(0,3);for(let f=0;f<i.parameters.length;f++){let l=i.parameters[f];if(p.length>0&&p[0][p[0].length-1]===","){if("arguments"in n[i.name]&&n[i.name].arguments.length<0)for(let u=0;u<p.length;u++){let g;l.types[0]==="string"?g="string":l.types[0]==="number"?g="number":l.types[0]==="boolean"?g="boolean":l.types[0]==="array"?g="array":l.types[0]==="boolean"?g="boolean":l.types[0]==="object"?g="object":g="any";let z=p[u],A={type:g};l.required===!0&&(A.required=!0),l.description!==""&&(A.description=m(l.description).replace(/\]\(\/(.*)(?=\))/g,"](https://shopify.dev/$1")),d.push(A),z[z.length-1]===","?g==="string"?c.push("'$"+(u+1)+"',"):c.push("$"+(u+1)+","):g==="string"?c.push("'$"+(u+1)+"'"):c.push("$"+(u+1))}}else if(Array.isArray(n[i.name].arguments)){d.length===0&&d.push({type:"parameter",value:{}}),d[d.length-1].type!=="parameter"&&d.push({type:"parameter",value:{}}),l.required&&c.push(`${l.name}:`,"${"+(f+1)+"}");let u;l.types[0]==="string"?u="string":l.types[0]==="number"?u="number":l.types[0]==="boolean"?u="boolean":l.types[0]==="array"?u="array":l.types[0]==="boolean"?u="boolean":l.types[0]==="object"?u="object":u="any",d[d.length-1].value[l.name]={type:u,required:l.required},l.description!==""&&(d[d.length-1].value[l.name].description=m(l.description).replace(/\]\(\/(.*)(?=\))/g,"](https://shopify.dev/$1"))}}c.length>0&&(c.length===1&&c[0][c[0].length-1]===":"&&(c[0]=c[0].slice(0,-1)),n[i.name].snippet=c.join(" ")),d.length>0&&(n[i.name].arguments=d)}let h=JSON.stringify(n,function(i,p){return p&&p.exec===RegExp.prototype.exec?new RegExp(p).source:p},2);Object.keys(n).length>0&&(b(q+" "+y.default.bold.redBright("NEW FILTERS AVAILABLE")),b(q+y.default.cyan(` Writing filters JSON: ${y.default.whiteBright("data/liquid/shopify/filters.json")} `)),T.default.writeFileSync((0,S.join)(x,"data/liquid/shopify/filters.json"),h),Object.keys(n).forEach(i=>{b(q+" "+y.default.white(i))}))}function Re(){b(`${q} ${y.default.magenta("Shopify Objects")}`);let e=(s,i)=>{let p={scope:null,items:null,type:"any",literal:null},c=s[0].type,d=s[0].array_value;c==="string"||c==="boolean"||c==="number"?p.type=c:c==="array"?(p.type=c,d==="string"||d==="boolean"||d==="number"?p.items=d:p.scope=d):c!==""&&i.some(f=>f.name===c)&&(p.type="object",p.scope=c);for(let{name:f}of s)f!==""&&(p.literal===null&&(p.literal=[]),p.literal.push(f));return p},t=(0,S.join)(x,"node_modules/.specs/data","objects.json"),o=T.default.readFileSync(t).toString(),n=JSON.parse(o),r={};for(let s of n){if(r[s.name]={summary:s.summary},s.access.global===!0&&(r[s.name].global=s.access.global),s.deprecated===!0&&(r[s.name].deprecated=s.deprecated),s.access.template.length>0&&(r[s.name].template=s.access.template),r[s.name].description=J("objects",s),s.return_type.length>0){let{type:i,scope:p,literal:c}=e(s.return_type,n);c!==null&&(r[s.name].literal=c),p!==null?(r[s.name].type=i,r[s.name].scope=p):r[s.name].type=i}if(s.properties.length>0){r[s.name].type="object",typeof r[s.name].properties!="object"&&(r[s.name].properties={});for(let i of s.properties)if(b(y.default.gray(`  - ${i.name}`)),r[s.name].properties[i.name]={type:22},r[s.name].properties[i.name].description=J("objects",i,s.name),s.deprecated===!0&&(r[s.name].properties[i.name].deprecated=s.deprecated),i.return_type.length>0){let{type:p,scope:c,literal:d}=e(i.return_type,n);d!==null&&(r[s.name].properties[i.name].literal=d),c!==null?(r[s.name].properties[i.name].type=p,r[s.name].properties[i.name].scope=c):r[s.name].properties[i.name].type=p}}else r[s.name].type!=="array"&&(r[s.name].const=!0)}let h=JSON.stringify(r,null,2);b(q+y.default.cyan(` Writing objects JSON: ${y.default.whiteBright("data/liquid/shopify/objects.json")} `)),T.default.writeFileSync((0,S.join)(x,"data/liquid/shopify/objects.json"),h),b(q+y.default.cyan(` Writing objects DATA: ${y.default.whiteBright("src/liquid/data/shopify/objects.ts")} `)),T.default.writeFileSync((0,S.join)(x,"src/liquid/data/shopify/objects.ts"),xe("Objects","objects",h))}
