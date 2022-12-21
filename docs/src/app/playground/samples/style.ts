export const style = `
code[class*="language-"] {
padding-left: 1rem;
color: $cyan;
font-size: 0.945rem;
font-family: $font-family-code;
white-space: pre;
white-space: pre-wrap;
text-shadow: none;
word-wrap: normal;
tab-size: 2;
hyphens: none;
border-left: 0.01rem $gray-700 solid;
}

pre {
position: relative;
height: 100%;
margin-top: 0;
padding: 5px 15px;
overflow: auto;
border: none;
border-radius: 0;

&[class*="language-"] {
color: $cyan;
font-family: $font-family-code;
white-space: pre;
white-space: pre-wrap;
text-shadow: none;
word-wrap: normal;
tab-size: 2;
hyphens: none;
background: transparent;
}

code {
display: block;
white-space: pre;
}

> code[class*="language-"] {
font-size: 0.845rem;
}
}

pre[data-number] {
position: relative;
margin-left: 0.1rem;
padding: 1em 0 1rem 3rem;
}

.line-number {
position: absolute;
right: 0;
left: 0;
margin-top: 1em;
padding: inherit 0;
line-height: inherit;
white-space: pre;

/* Same as .prism's padding-top */

background: transparent;
pointer-events: none;
}

.line-number::before,
.line-number[data-end]::after {
position: absolute;
top: 0.4em;
left: 0.5rem;
min-width: 1em;
padding: 0 0.5rem;
color: $gray-600;
font: 85%/1 $font-family-code;
text-align: center;
text-shadow: none;
vertical-align: 0.3em;
border: 0;
border-radius: 999px;
content: attr(data-start);
}

.line-number[data-end]::after {
top: auto;
bottom: 0.4em;
content: attr(data-end);
}

.token.tab:not(:empty),
.token.cr,
.token.lf,
.token.space {
position: relative;
}

.token.tab:not(:empty)::before,
.token.cr::before,
.token.lf::before,
.token.space::before {
position: absolute;
color: $gray-600;
opacity: 0.2;
}


:not(pre) > code[class*="language-"] {
font-size: $font-size-sm;
background: $gray-800;
border-radius: 0.3em;
}


.token {
&.selector,
&.inserted {
color: $green;
}

&.atrule,
&.attr-value,
&.keyword,
&.important,
&.deleted {
color: $pink;
}

&.regex,
&.statement {
color: $cyan;
}

&.placeholder,
&.variable {
color: $white;
}

&.important,
&.statement,
&.bold {
font-weight: bold;
}

&.punctuation {
color: #ccc;
}

&.entity {
cursor: help;
}

&.italic {
font-style: italic;
}

&.namespace {
opacity: 0.7;
}

&.comment,
&.prolog,
&.doctype,
&.cdata {
color: #ccc;
}

&.operator,
&.boolean,
&.number {
color: $purple;
}

&.attr-name,
&.string,
&.entity,
&.url {
color: $yellow;
}
}

.language-css .token.string,
.style .token.string {
color: $yellow;
}

.token.liquid {
// tokens
&-object {
color: #81d4fa;
}

&-punctuation {
color: $pink;
}

&-property {
color: $white;
}
}


.token.style {
&.token {
> .selector > .combinator {
color: #e91e63;
}

> .delimeters {
color: $yellow;
}

> .atrule > .unit,
> .unit {
color: #d66088;
}

> .atrule {
color: #81d4fa;

> .rule {
  color: #cb3f6e;
}
}

> .property {
color: #81d4fa;
}

> .value {
color: $yellow;
}

> .hexcode > .hash {
color: #d66088;
}

>.hexcode > .decimal {
color: #978fff;
}
}
}


.token.javascript {
color: $gray-400;

.token {
&.parameter-type,
&.return-type,
&.semi {
color: $gray-300;
}

&.punctuation {
color: $gray-400;
}

&.comment {
color: $gray-600;
}


&.parameter-optional,
&.parameter {
color: $orange;
}

&.literal-property {
color: #0dd4c8;
}

&.type-object,
&.type-array {
color: #228d9f;
}

&.types {
color: $sea;
}

&.function,
&.method,
&.keyword,
&.browser-objects,
&.variable {
color: #81d4fa;
}

&.keyword.scope {
color: $orange;
}

&.op,
&.tag,
&.punctuation-chars,
&.operator,
&.control-flow,
&.module {
color: #cb3f6e;
}


&.function {
color: $green;
}


&.number {
color: $salmon;
}

&.nil,
&.boolean {
color: $purple;
}


&.attr-name {
color: $green;
}

&.attr-value {
color: $yellow;
}

&.style {
color: $cyan;
}

&.script {
color: #81d4fa;

.token.keyword {
  color: #81d4fa;
}
}
}
}

code.language-liquid {
.token {
&.tag {
color: #65a4c7;
}
}
}

code.language-html {
color: $gray-100;

.token {
&.liquid-comment,
&.comment {
color: $gray-600;
}

&.ran-lan {
color: #becaff;
}

&.tag {
color: #ff93bc;
}

&.attr-object,
&.filter {
color: #81d4fa;
}

&.attr-property {
color: $white;
}

&.tag-name {
color: #cb3f6e;
}

&.attr-name {
color: #91ebc2;
}

&.operators,
&.attr-equals {
color: #ff93bc;
}

&.attr-value {
color: #fff9a6;
}

&.string-property    ,

                &.string {
color: #fff9a6;
}

&.punctuation-chars {           color: #cb3f6e;
}

&.delimiter {
color: #fafafa;
}

&.style {
color: $cyan;
}

&.script {
color: $gray-200;

.token.function {
  color: $cyan;
}

.token.keyword {



  color: $cyan;
}
}
}
}

code.language-bash {


color: $gray-500;
}

code.language-markup {
color: $gray-200;

.token {
&.tag {


color: $pink;
}

&.attr-name {
color: $green;
}

&.attr-value {
color: $yellow;
}

&.style {
color: $cyan;
}

&.script {
color: $cyan;

.token.function {
  color: $cyan;
}

.token.keyword {
  color: $cyan;
}
}
}
}


`;
