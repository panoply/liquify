# @liquify/prettify

Liquid Language formatting support that provides beatification/diffing features in languages that couple with Liquid. Prettify leverages the [Sparser](https://github.com/unibeautify/sparser) lexing engine and its parse approach has been adapted from the distributed source code of [PrettyDiff](https://github.com/prettydiff/prettydiff). In addition, Prettify streamlines input to [Prettier](https://prettier.io/) when dealing with some embedded code regions (like frontmatter) or for handling languages like markdown.

### Supported Languages

Prettify supports beautification of Liquid together with several other languages.

- Liquid + HTML.
- Liquid + CSS, SCSS and LESS
- Liquid + JavaScript and TypeScript
- Liquid + JSX
- Markdown + Frontmatter
- JSON (No Liquid)
- YAML (No Liquid)

# Install

This module is used by the [Liquify IDE](https://liquify.dev) extension. The project is available on the public NPM registry and can be consumed by individuals and used by other projects.

```cli
<pnpm|npm|yarn> i @liquify/prettify --save-dev
```

# Usage

The tool provides beautification rules for multiple languages. Each supported language exposes different formatting options. The export accepts a `string` type and second (optional) rules object. There are different modes available, each mode is representative of a single language or multiple languages.

- markup
- style
- script
- json
- yaml
- markdown

Keeping the PrettyDiff logic, 3 lexer modes are supplied (`markup`, `style` and `script`) each mode can be used to beautify languages within a matching nexus. The `json` and `yaml` modes are used to beautify single languages only. JSON and Yaml are data languages and these modes do not handle Liquid contained within their syntax whereas `markup`, `style` and `script` do.

### Language Instance

An optional class instance is available which accepts a global rule-set. Each beautification method will use the pre-defined options provided via the instance. This approach is how formatting is applied within [Liquify](https://liquify.dev) as it allows us to deal with multiple languages and ensures embedded regions will be formatted using rules defined within the [.liquidrc](#) configuration file.

The instance exposes the same methods provided by the language specifics export. The difference being that you cannot pass options to the specifics. This approach also provides an additional `rules()` method which can be used to update the globals we supplied the instance.

```typescript
import { Prettify } from "@liquify/prettify";

const prettify = new Prettify(rules: object)

// Update Rules
prettify.rules(rules: options): void

// Markup = HTML
prettify.markup(source: string): Promise<string>

// Style = CSS, SCSS or LESS
prettify.style(source: string): Promise<string>

// Script = JavaScript, TypeScript or JSX
prettify.script(source: string): Promise<string>

// JSON
prettify.json(source: string): Promise<string>

// YAML
prettify.yaml(source: string): Promise<string>

```

### Language Specific

Prettify exposes direct access to methods on the export and can be used when you require per-language beautification. Passing a string and an optional set of beautification options to a language mode.

> This approach will apply defaults to embedded regions when using `markup` lexer mode. If you need control of how contents of embedded regions are formatted within markup, use a language instance instead.

```typescript
import * as prettify from "@liquify/prettify";

// Markup = HTML
const markup = prettify.markup(source: string, rules?: object): Promise<string>

// Style = CSS, SCSS or LESS
const style  = prettify.style(source: string, rules?: object): Promise<string>

// Script = JavaScript, TypeScript or JSX
const script = prettify.script(source: string, rules?: object): Promise<string>

// JSON
const json = prettify.json(source: string, rules?: object): Promise<string>

// YAML
const yaml = prettify.yaml(source: string, rules?: object): Promise<string>

```

### Parse Errors

Each method returns a promise, so when formatting fails or a parse error occurs, `.catch()` is invoked. The error returns an object. The object contains the provided input (`source`) and the error message.

```typescript
import { Prettify } from "@liquify/prettify";

const prettify = new Prettify(rules: object)

prettify.markup("{% if x %} {{ x }}").catch((input, error) => {

  console.error(error);

  // Return the original input
  return input;

});
```

### Options

Prettify uses a custom set of beautification rules (options). Though input is forwarded to Prettier and internally uses PrettyDiff, options names differ as its combining these 2 tools to generate the output. If you are formatting on a per-language basis, you can simply provide options as a second parameter, but if you are dealing with multiple languages you can preset formatting options.

```typescript
{
  markup: {
    newlineEnd: true,
    selfCloseSpace: false,
    indentLevel: 0,
    preserveLines: 3,
    indentSize: 2,
    wrap: 80,
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
  },
  style: {
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
  },
  script: {
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
  },
  json: {
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
}
```

### Markup Rules

Refer to the [typings](#) declaration file for description.

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

### Style Rules

Refer to the [typings](#) declaration file for description.

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

### JSON Rules

Refer to the [typings](#) declaration file for description.

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

### Script Rules

Refer to the [typings](#) declaration file for description.

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

# Inline Formatting

Prettify provides inline formatting support via comments. Inline formatting adopts a similar approach used in linters and other projects. The difference is how inline formats are expressed. You can direct Prettify to format a specific block or region of code by encapsulating it between 2 comment blocks or you can define formatting option to be applied to an entire file.

### HTML Comments

- `<!-- @prettify: format:file {} -->`
- `<!-- @prettify: format:start {} -->`
- `<!-- @prettify: format:end -->`

### CSS, SCSS or LESS Comments

- `/* @prettify format:file {} */`
- `/* @prettify format:start {} */`
- `/* @prettify format:end */`

### JavaScript, TypeScript Comments

- `// @prettify: format:file {}`
- `// @prettify: format:start {}`
- `// @prettify: format:end`

### Liquid Comments

- `{% comment %} @prettify: format: {} {% endcomment %}`
- `{% comment %} @prettify: format:start {} {% endcomment %}`
- `{% comment %} @prettify: format:end {% endcomment %}`

### Example

<!-- prettier-ignore -->
```html

<!-- @prettify: format:start {
  "attributeSort": true,
  "attributeSortList": ["class", "id", "data-attr"],
  "forceAttribute": true,
} -->

<div
 class="a"
 id="b"
 data-attr="c">
 {{ some.tag }}
</div>

<!-- @prettify: format:end -->
```

Inline formats are asserted by referencing the `@prettify` keyword followed by an operation. There are 3 operations available:

- `@prettify disable`
- `@prettify format:file {}`
- `@prettify format:start {}`
- `@prettify format:end`
- `@prettify ignore:start`
- `@prettify ignore:end`

# Ignoring Code

Lexer modes provide inline comments control and support ignoring regions of code. This logic is mostly lifted from within PrettyDiff and supports Liquid comments:

### HTML Comments

- `<!-- @prettify: ignore:start -->`
- `<!-- @prettify: ignore:end -->`

### CSS, SCSS or LESS Comments

- `/* @prettify ignore:start */`
- `/* @prettify ignore:end */`

### JavaScript, TypeScript Comments

- `// @prettify: ignore:start`
- `// @prettify: ignore:end`

### Liquid Comments

- `{% comment %} @prettify: ignore:start {% endcomment %}`
- `{% comment %} @prettify: ignore:end {% endcomment %}`

# Credits

Prettify is made possible by combining 2 beautification tools. Prettier and PrettyDiff. The export is a wrapper around these packages that forwards string input.

### [PrettyDiff](https://github.com/prettydiff/prettydiff) and [Sparser](https://github.com/unibeautify/sparser)

[Austin Cheney](https://github.com/prettydiff) who is the original author of [PrettyDiff](https://github.com/prettydiff/prettydiff) and [Sparser](https://github.com/unibeautify/sparser) created these two projects and this module is only possible because of the work he has done. PrettyDiff was abandoned in 2019 and Austin has since created [Shared File Systems](https://github.com/prettydiff/share-file-systems) which is a privacy first point-to-point communication tool, please check it out and also have a read of [wisdom](https://github.com/prettydiff/wisdom) which personally helped me become a better developer.

### [Prettier](https://prettier.io/)

Thanks to the maintainers and creators of this beloved and brilliant tool. If you are not working with Liquid, then you will not need Prettify, instead just use Prettier. It is important to reiterate that Prettify is mostly a wrapper, it passes the input of some languages to Prettier.

## Author

🥛 [Νίκος Σαβίδης](mailto:nicos@gmx.com) <img align="right" src="https://img.shields.io/badge/-@sisselsiv-1DA1F2?logo=twitter&logoColor=fff" />
