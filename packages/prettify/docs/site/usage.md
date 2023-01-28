---
title: 'Usage'
permalink: '/connection/index.html'
layout: docs.liquid
order: 2
sidebar:
  - 'Installation'
  - 'CLI'
  - 'API'
  - 'Format'
  - 'Parse'
  - 'Options'
  - 'Language'
  - 'Defintions'
  - 'Error Handling'
  - 'Parse Errors'
  - 'Error Codes'
---

## Installation

Prettify can be used in both browser and node environments. The module can be consumed via the NPM registry:

```bash
pnpm add @liquify/prettify
```

#### CDN

Use the [unpkg](https://unpkg.com/@liquify/prettify) CDN for quick usage in web browser.

```bash
https://unpkg.com/@liquify/prettify
```

#### Schema

The module also provided JSON Schema Store reference for usage in JSON files via `$schema` properties or within text editors like [VSCode](https://code.visualstudio.com/) which support store digestion.

```bash
https://unpkg.com/@liquify/prettify/schema.json
```

## API

### Format

```js
import prettify from '@liquify/prettify';

prettify.format(input: string, rules?: Rules): Promise<string>;

prettify.format.sync(input: string, rules?: Rules): Promise<string>


prettify.format.stats:

```

### Parse

### Language

### Options

Prettify provides a granular set of beautification rules. There are 4 different lexer modes and each mode can be used to beautify languages within a matching nexus. Prettify will automatically detect the language and forward input to the appropriate lexer for handling but it is recommended that you provide `lexer` and/or `language` values.

> The typings provided in this package will describe each option in good detail, below are the defaults. Settings are optional.

```js
import prettify from '@liquify/prettify';

prettify.options({
  grammar: {},
  language: 'auto',
  lexer: 'auto',
  indentSize: 2,
  indentChar: ' ',
  wrap: 0,
  crlf: false,
  endNewline: false,
  preserveLine: 3,
  commentIndent: false,
  markup: {
    correct: false,
    attributeCasing: 'preserve',
    attributeSort: false,
    attributeSortList: [],
    delimiterTrims: 'preserve',
    commentNewline: false,
    forceAttribute: false,
    forceLeadAttribute: false,
    forceIndent: false,
    ignoreStyles: false,
    ignoreScripts: false,
    ignoreJson: false,
    lineBreakSeparator: 'default',
    normalizeSpacing: true,
    preserveAttributes: false,
    preserveComment: true,
    preserveText: true,
    preserveCaptures: false,
    quoteConvert: 'double',
    selfCloseSpace: false,
    valueForce: 'intent'
  },
  json: {
    arrayFormat: 'default',
    braceAllman: true,
    bracePadding: false,
    objectIndent: 'indent',
    objectSort: false
  },
  style: {
    correct: false,
    classPadding: false,
    noLeadZero: false,
    sortProperties: false,
    sortSelectors: false,
    quoteConvert: 'none',
    functionSpace: false
  },
  script: {
    arrayFormat: 'default',
    braceAllman: false,
    bracePadding: false,
    braceStyle: 'none',
    endComma: 'never',
    braceNewline: true,
    correct: false,
    caseSpace: false,
    elseNewline: true,
    functionNameSpace: true,
    functionSpace: false,
    methodChain: 0,
    neverFlatten: false,
    noCaseIndent: false,
    noSemicolon: false,
    objectIndent: 'indent',
    objectSort: false,
    preserveComment: true,
    preserveText: true,
    quoteConvert: 'single',
    ternaryLine: false,
    variableList: 'none',
    vertical: false,
    styleGuide: 'none'
  }
});
```

### Error

### Defintions

# Inline Control

Inline control is supported and can be applied within comments. Inline control allows your to ignore files, code regions or apply custom formatting options. Comments use the following structures:

- `@prettify-ignore`
- `@prettify-ignore-next`
- `@prettify-ignore-start`
- `@prettify-ignore-end`
- `@prettify {}`

### Disable Prettify

You can prevent Prettify from formatting a file by placing an inline control comment at the type of the document.

```liquid
{% # @prettify-ignore %}

<div>
  <ul>
    <li>The entire file will not be formatted</li>
  </ul>
</div>
```

### Inline Rules

Prettify provides inline formatting support via comments. Inline formatting adopts a similar approach used in linters and other projects. The difference is how inline formats are expressed, in Prettify you express formats using inline annotation at the top of the document with a value of `@prettify` followed by either a space of newline.

**Not all inline ignore capabilities are operational**

#### HTML Comments

```html
<!-- @prettify forceAttribute: true, indentLevel: 4 -->
```

#### Liquid Block Comments

```liquid
{% comment %}
  @prettify forceAttribute: true, indentLevel: 4
{% endcomment %}
```

#### Liquid Line Comments

```liquid
{% # @prettify forceAttribute: true, indentLevel: 4 %}
```

#### Block comment

```css
/* @prettify forceAttribute: true, indentLevel: 4 */
```

#### Line comments

```javascript
// @prettify forceAttribute: true, indentLevel: 4
```

### Ignoring Regions

Lexer modes provide inline comments control and support ignoring regions (blocks) of code. All content contained between the comments will be preserved and unformatted.

#### HTML Comments

- `<!-- @prettify-ignore-start -->`
- `<!-- @prettify-ignore-end -->`

#### Liquid Block Comments

- `{% comment %} @prettify-ignore-start {% endcomment %}`
- `{% comment %} @prettify-ignore-end {% endcomment %}`

#### Liquid Line Comments

- `{% # @prettify-ignore-start %}`
- `{% # @prettify-ignore-end %}`

#### Block Comments

- `/* @prettify-ignore-start */`
- `/* @prettify-ignore-end */`

#### Line Comments

- `// @prettify-ignore-start`
- `// @prettify-ignore-end`

# Error Handling
