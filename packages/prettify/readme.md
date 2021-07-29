## @liquify/prettify

Liquid Language formatting support. Prettify is modified (hard-fork) version of the language aware code comparison tool known as [PrettyDiff](https://github.com/prettydiff/prettydiff). Prettify leverages the [Sparser](https://github.com/unibeautify/sparser) lexing engine and its parse approach was adapted from the distributed source code of [PrettyDiff](https://github.com/prettydiff/prettydiff). This module has been purged, partially re-written and provides beatification/diffing features in languages that couple with Liquid.

### Supported Languages

Prettify support beautification of Liquid together with several other languages.

- Liquid + HTML.
- Liquid + CSS, SCSS and LESS
- Liquid + JavaScript and TypeScript
- Liquid + JSX
- JSON (No Liquid)
- YAML (No Liquid)

## Install

This module is used by the [Liquify IDE](https://liquify.dev) extension. The project is available on the public NPM registry and can be consumed by individuals and used by other projects.

```cli
<pnpm|npm|yarn> i @liquify/prettify --save-dev
```

> The tool is **prohibited** for use within Shopify maintained software, tooling created by Shopify or projects maintained by the Shopify team.

## Usage

The tool provides beautification rules for multiple languages. Each supported language exposes different formatting options. The export accepts a `string` type and second (optional) rules object. There are different modes available, each mode is representative of a single language or multiple languages.

- markup
- style
- script
- json
- yaml

Following PrettyDiff logic the 3 lexer modes supplied `markup`, `style` and `script` are used to beautify languages within a matching nexus. The `json` and `yaml` modes are used to beautify single languages only. JSON and Yaml are data languages and these modes do not handle Liquid contained within their syntax whereas `markup`, `style` and `script` do support this.

```typescript
import * as prettify from "@liquify/prettify";

// Markup = HTML
const markup = prettify.markup(source: string, rules: object): string

// Style = CSS, SCSS or LESS
const style  = prettify.style(source: string, rules: object): string

// Script = JavaScript, TypeScript or JSX
const script = prettify.script(source: string, rules: object): string

```

## Markup Rules

Refer to the [typings](#) declaration file for des

```ts
{
  wrap: 80,
  newlineEnd: true,
  selfCloseSpace: false,
  indentSize: 2,
  indentLevel: 0,
  preserveLines: 3,
  preserveComment: true,
  commentNewline: false,
  commentIndent: false,
  preserveText: false,
  attemptCorrection: false,
  attributeSort: false,
  attributeSortList: [],
  forceAttribute: false,
  forceIndent: false,
  quoteConvert: 'double',
  preserveAttributes: false
}
```

## Style Rules

Refer to the [typings](#) declaration file for des

```ts
{
  wrap: 80,
  newLine: true,
  newlineEnd: true,
  indentSize: 2,
  indentLevel: 0,
  preserveLines: 3,
  selectorList: false,
  propertySort: false,
  bracesAllman: false,
  classPadding: false,
  noLeadZero: false,
  quoteConvert: 'single',
}
```

## JSON Rules

Refer to the [typings](#) declaration file for des

```ts
{
  wrap: 80,
  newLineEnd: true,
  indentSize: 2,
  indentLevel: 0,
  preserveLines: 3,
  objectSort: false,
  objectArrays: 'default',
  bracesAllman: false,
  bracePadding: false,
  arrayFormat: 'default',
}
```

## Script Rules

```ts
{
  braceNewline: false,
  bracePadding: false,
  braceStyle: 'none',
  braceAllman: false,
  caseSpace: false,
  commentNewline: false,
  commentIndent: false,
  attemptCorrection: false,
  elseNewline: false,
  endComma: 'never',
  arrayFormat: 'default',
  objectIndent: 'default',
  functionNameSpace: true,
  functionSpace: true,
  indentLevel: 0,
  indentSize: 2,
  methodChain: false,
  neverFlatten: false,
  endNewline: true,
  noCaseIndent: false,
  noSemicolon: false,
  objectSort: false,
  preserveLine: 2,
  preserveComment: false,
  quoteConvert: 'none',
  semicolon: true,
  ternaryLine: false,
  variableList: 'none',
  vertical: false,
  wrap: 0
}
```

### Ignoring Code

Lexer modes provide inline comments control and support ignoring regions of code. This logic is mostly lifted from within PrettyDiff and supports Liquid comments:

- `<!-- @prettify: format-ignore-start -->`
- `/* @prettify: format-ignore-start */`
- `// @prettify: format-ignore-start`

> You can also use Liquid comment tags `{% comment %}` and express the same keyword within the contents of the tag.

### Credits

The original author of PrettyDiff and Sparser [Austin Cheney](https://github.com/prettydiff) who created those two projects which Prettify is using. This module is only possible because of the work he has done. PrettyDiff was abandoned in 2019 and Austin has since created [Shared File Systems](https://github.com/prettydiff/share-file-systems) which is a privacy first point-to-point communication tool, please check it out.

## Author

🥛 [Νίκος Σαβίδης](mailto:nicos@gmx.com) <img align="right" src="https://img.shields.io/badge/-@sisselsiv-1DA1F2?logo=twitter&logoColor=fff" />
