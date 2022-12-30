### v0.4.4-beta.1

_This module is in its infancy and working towards an official release candidate. Refer to the [Language Support](#language-support) before using the module and please note that this readme will be subject to change._

# 🎀 Prettify

The new generation code beautification tool for formatting HTML, Liquid, CSS/SCSS, JavaScript, TypeScript and more! Prettify is built atop of the Sparser lexing algorithm and its parse approach was adapted from the distributed source code of the late and powerful PrettyDiff.

- [playground](https://liquify.dev/prettify)
- [vscode-liquid](https://github.com/panoply/vscode-liquid)

### Features

- Fast, performant and lightweight (45kb gzip).
- Cross platform support. Browser and Node environments.
- Language aware. Automatically infers handling.
- Provides a granular set of formatting rules.
- Uniformed array data structures
- Drop-in solution with no complexities (boomer friendly)
- 15 different languages supported

### Documentation

Currently working on documentation to better inform upon rules and overall architecture. Below are the descriptions used in the Schema Stores and do a great job at explaining each rule.

- [Global](https://github.com/panoply/liquify-schema/tree/master/stores/descriptions/format/global)
- [Liquid](https://github.com/panoply/liquify-schema/tree/master/stores/descriptions/format/liquid)
- [Markup](https://github.com/panoply/liquify-schema/tree/master/stores/descriptions/format/markup)
- [Json](https://github.com/panoply/liquify-schema/tree/master/stores/descriptions/format/json)
- [Style](https://github.com/panoply/liquify-schema/tree/master/stores/descriptions/format/style)

> **Note**&nbsp;
> Script mode documentation is still being worked on.

### Why Prettify?

Prettify is mostly geared towards web projects and exists an alternative to [Prettier](https://prettier.io/) and [JS Beautify](https://beautifier.io/). It's the perfect choice for projects that leverage the [Liquid](https://shopify.github.io/liquid/) template language and was developed for usage in the [Liquify](https://liquify.dev) text editor extension/plugin. Prettify allows developers to comfortably infuse Liquid into different languages without sacrificing beautification support, it intends to be the solution you'd employ when working with the template language.

### Language Support

Below is current support list of languages, their completion status and whether you can run Prettify for beautification. You can leverage on languages above 90% completion, anything below that is not yet ready for the big time. Languages with an above 80% completion status will work with basic structures, but may not be viable in some cases and can be problematic.

| Language            | Status       | Operational | Usage                           |
| ------------------- | ------------ | ----------- | ------------------------------- |
| XML                 | 92% Complete | ✓           | _Safe enough to use_            |
| HTML                | 92% Complete | ✓           | _Safe enough to use_            |
| Liquid + HTML       | 92% Complete | ✓           | _Safe enough to use_            |
| Liquid + CSS        | 87% Complete | ✓           | _Safe enough to use_            |
| JSON                | 88% Complete | ✓           | _Safe enough to use_            |
| CSS                 | 92% Complete | ✓           | _Safe enough to use_            |
| SCSS                | 82% Complete | ✓           | _Use with caution_              |
| Liquid + JSON       | 80% Complete | ✓           | _Use with caution_              |
| Liquid + JavaScript | 80% Complete | ✓           | _Use with caution_              |
| JavaScript          | 78% Complete | 𐄂           | _Use with caution_              |
| TypeScript          | 70% Complete | 𐄂           | _Avoid using, many defects_     |
| JSX                 | 70% Complete | 𐄂           | _Avoid using, many defects_     |
| LESS                | 60% Complete | 𐄂           | _Avoid using, many defects_     |
| TSX                 | 40% Complete | 𐄂           | _Avoid using, many defects_     |
| YAML                | 50% Complete | 𐄂           | _Do not use, not yet supported_ |

_Those wonderful individuals who come across any bugs or defects. Please inform about them. Edge cases are very important and submitting an issue is a huge help for me and the project._

# Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [Format](#format)
  - [Format Sync](#format-sync)
  - [Format Options](#options)
  - [Parse](#parse)
  - [Parse Sync](#parse-sync)
  - [Language](#language)
  - [Definitions](#definitions)
- [Rules](#options)
  - [Global Rules](#global-rules)
  - [Liquid Rules](#liquid-rules)
  - [Markup Rules](#markup-rules)
  - [Style Rules](#style-rules)
  - [JSON Rules](#json-rules)
  - [Script Rules](#script-rules)
- [Parse Errors](#parse-errors)
  - [Asynchronous](#asynchronous)
  - [Synchronous](#synchronous)
- [Inline Control](#inline-control)
  - [Disable Prettify](#disable-prettify)
  - [Inline Rules](#inline-rules)
  - [Ignoring Regions](#ignoring-regions)
- [Caveats](#caveats)
  - [Prettier + Prettify](#prettier--prettify)
  - [Linters](#linters)
  - [Shopify Themes](#shopify-themes)
  - [Jekyll and 11ty](#jekyll-and-11ty)
- [Prettify vs Shopify's Liquid Prettier Plugin](#prettify-vs-shopifys-liquid-prettier-plugin)
  - [Intention vs Impedance](#intention-vs-impedance)
  - [Standard Markup Comparison](#standard-markup-comparison)
  - [Embedded Languages Comparison](#embedded-languages-comparison)
- [Credits](#credits)

# Installation

This module is currently used by the [vscode-liquid](https://github.com/panoply/vscode-liquid)] extension.

```bash
pnpm add @liquify/prettify -D
```

_Because [pnpm](https://pnpm.js.org/en/cli/install) is dope and does dope shit_

# Usage

The tool provides a granular set of beautification rules. Each supported language exposes different formatting options and keeping the PrettyDiff logic 3 lexer modes are supplied `markup`, `style` and `script`. Each mode can be used to beautify languages within a matching nexus. Prettify will automatically detect the language and forward input to the appropriate lexer for handling but it is recommended that you provide `lexer` and/or `language` values.

<!-- prettier-ignore -->
```typescript
import prettify from '@liquify/prettify';

const code = '<div class="example">{% if x %} {{ x }} {% endif %}</div>';

prettify.format(code, {
  language: 'liquid',
  indentSize: 2
}).then(output => {

  console.log(output)

  // Do something with the beautified output

}).catch(error => {

  // Print the error
  console.error(error);

  // Return the original input
  return code;

});
```

# API

Prettify does not yet provide CLI support but will in future releases. The API exports several methods on the default and intends to make usage as simple as possible with respect to extendability for more advanced use cases.

### Format

The format method returns a promise and is exposed on the default export. The function requires a `string` parameter be passed and accepts an optional second `rules` parameter. The format method also exposes 2 additional _hook_ methods that can be invoked before or after beautification. An additional `stats` getter is also available which will return some execution information.

```typescript
import prettify from "@liquify/prettify";

// Formatting Code
prettify.format(source: string, rules?: Options): Promise<string>;

// Hook that will be invoked before formatting
prettify.format.before((rules: Options, input: string) => void | false)

// Hook that will be invoked after formatting
prettify.format.after((output: string, rules: Options) => void | false)

// Returns some statistical information related to the operation
prettify.format.stats: Stats
```

> Returning `false` in either the `prettify.format.before` or `prettify.format.after` will cancel beautification.

### Format Sync

Prettify also exposes a synchronous formatting method on the default. This option is similar to `prettify.format` but when an error occurs the `prettify.formatSync` method throws an instance of an Error.

```typescript
import prettify from "@liquify/prettify";

// Formatting Code using Sync
prettify.formatSync(source: string, rules?: Options): string;

```

### Format Options

The options methods will augment formatting options (rules). Formatting options are persisted, so when you apply changes they are used for every beautification process thereafter. The `prettify.options(rules)` method also exposes 2 _hook_ methods. The `prettify.options.listen` method allows you to listen for changes applied to options and the `prettify.options.rules` getter returns a **readonly** reference of the current formatting options.

```typescript
import prettify from "@liquify/prettify";

// Change formatting rules
prettify.options(rules?: Options): Rules;

// Hook listener that will be invoked when options change
prettify.options.listen((rules: Options) => void)

// Returns the current formatting options Prettify is using
prettify.options.rules: Rules
```

### Parse

The parse method can be used to inspect the data structures the Prettify constructs. Prettify is using the sparser lexing algorithm under the hood, the generated parse tree returned by this method is representative of sparser's data structures. The method also exposes an additional `stats` getter which returns some execution information pertaining to the parse process.

```typescript
import prettify from "@liquify/prettify";

// The generated sparser data structure
prettify.parse(source: string): Promise<ParseTree>

// Returns some statistical information related to the parse
prettify.parse.stats: Stats
```

### Parse Sync

Prettify also exposes a synchronous parse method on the default. This option is similar to `prettify.parse` but when an error occurs the `prettify.parseSync` method throws an instance of an Error.

```typescript
import prettify from "@liquify/prettify";

// Parsing code using Sync
prettify.parseSync(source: string, rules?: Options): ParseTree

```

### Language

The `language` method is a utility method that Prettify uses in the beautification process. It's typically used for language detection and its how Prettify determines the lexing engine to be used on provided source string input.

```typescript
import prettify from "@liquify/prettify";

// Detects a language from a string sample
prettify.language(sample: string): Language

// Hook listener which is invoked after language detection
prettify.language.listen((language: Language) => void | Language)
```

> You can augment the language reference detected in the `prettify.language.listen` hook.

### Definitions

The definitions is a named export that exposes a definition list of the available formatting options. The definitions are used when validating rules. This is just an object, nothing really special.

```typescript
import { definitions } from '@liquify/prettify';

// Print the definitions to console
console.log(definitions);
```

# Rules

Prettify provides a granular set of beautification options (rules). The projects [Typings](https://github.com/panoply/prettify/tree/pre-release/types/rules) explains in good detail the effect each available rule has on code. You can also checkout the [Playground](https://liquify.dev/prettify) to get a better idea of how code will be beautified.

```typescript
{
  grammar: {},
  language: 'auto',
  lexer: 'auto',
  indentSize: 2,
  indentChar: ' ',
  wrap: 0,
  crlf: false,
  endNewline: false,
  preserveLine: 3,
  liquid: {
    commentIndent: false,
    commentNewline: false,
    delimiterTrims: 'preserve',
    ignoreStyles: false,
    ignoreScripts: false,
    ignoreJson: false,
    lineBreakSeparator: 'default',
    normalizeSpacing: true,
    preserveCaptures: false,
    preserveComment: true,
    quoteConvert: 'double',
    valueForce: 'intent',
  },
  markup: {
    commentIndent: false,
    commentNewline: false,
    attributeCasing: 'preserve',
    attributeSort: false,
    attributeSortList: [],
    forceAttribute: false,
    forceLeadAttribute: false,
    forceIndent: false,
    ignoreStyles: false,
    ignoreScripts: false,
    preserveAttributes: false,
    preserveComment: true,
    preserveText: true,
    quoteConvert: 'double',
    selfCloseSpace: false
  },
  style: {
    atRuleSpace: false,
    commentIndent: false,
    commentNewline: false,
    correct: false,
    classPadding: false,
    noLeadZero: false,
    preserveComment: true,
    sortProperties: false,
    sortSelectors: false,
    quoteConvert: 'none',
  },
  json: {
    arrayFormat: 'default',
    braceAllman: true,
    bracePadding: false,
    objectIndent: 'indent',
    objectSort: false
  },
  script: {
    commentIndent: false,
    commentNewline: false,
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
}
```

### Global Rules

Global rules will be applied to all lexer modes. You cannot override globals on a per lexer basis. Globals are exposed as first level properties.

```ts
{
  grammar: {},
  language: 'auto',
  lexer: 'auto',
  indentSize: 2,
  indentChar: ' ',
  wrap: 0,
  crlf: false,
  endNewline: false,
  preserveLine: 3,
  grammar: {},
}
```

### Liquid Rules

Refer to the [typings](https://github.com/panoply/prettify/blob/pre-release/types/rules/liquid.d.ts) declaration file for description. Rules will be used when formatting the following languages:

- Liquid

```ts
{
  commentIndent: false,
  commentNewline: false,
  delimiterTrims: 'preserve',
  ignoreStyles: false,
  ignoreScripts: false,
  ignoreJson: false,
  lineBreakSeparator: 'default',
  normalizeSpacing: true,
  preserveCaptures: false,
  preserveComment: true,
  quoteConvert: 'double',
  valueForce: 'intent',
}
```

### Markup Rules

Refer to the [typings](https://github.com/panoply/prettify/blob/pre-release/types/rules/markup.d.ts) declaration file for description. Rules will be used when formatting the following languages:

- Liquid
- HTML
- XHTML
- XML
- JSX
- TSX

```ts
{
  commentIndent: false,
  commentNewline: false,
  attributeCasing: 'preserve',
  attributeSort: false,
  attributeSortList: [],
  forceAttribute: false,
  forceLeadAttribute: false,
  forceIndent: false,
  ignoreStyles: false,
  ignoreScripts: false,
  preserveAttributes: false,
  preserveComment: true,
  preserveText: true,
  quoteConvert: 'double',
  selfCloseSpace: false
}
```

### Style Rules

Refer to the [typings](https://github.com/panoply/prettify/blob/pre-release/types/rules/style.d.ts) declaration file for description. Rules will be used when formatting the following languages:

- CSS
- SCSS/SASS
- LESS

```ts
{
  atRuleSpace: false,
  commentIndent: false,
  commentNewline: false,
  correct: false,
  classPadding: false,
  noLeadZero: false,
  preserveComment: true,
  sortProperties: false,
  sortSelectors: false,
  quoteConvert: 'none',
}
```

> _Prettify supports Liquid infused style formatting and when encountered it will apply beautification using Markup rules_

### Script Rules

Refer to the [typings](https://github.com/panoply/prettify/blob/pre-release/types/rules/script.d.ts) declaration file for description. Rules will be used when formatting the following languages:

- JavaScript
- TypeScript
- JSX
- TSX

```ts
{
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
```

> _Prettify supports Liquid infused script formatting and when encountered it will apply beautification using Markup rules_

### JSON Rules

Refer to the [JSON](/docs/rules/json.md) declaration file for description. Rules will be used when formatting the following languages:

- JSON

```ts
{
  arrayFormat: 'default',
  braceAllman: true,
  bracePadding: false,
  objectIndent: 'indent',
  objectSort: false
}
```

> _Prettify partially supports Liquid infused JSON formatting, but you should avoid coupling these 2 language together._

# Parse Errors

The `format` method returns a promise, so when beautification fails and a parse error occurs `.catch()` is invoked. The error message will typically inform you of the issue but it's rather blasé and not very informative. There are plans to improve this aspect in future releases.

> It's important to note that Liquify and Prettify are using different Parsers. The Liquify parser constructs an AST that provides diagnostic capabilities (ie: linting) whereas the Prettify parser constructs a data~structure. The errors of these tools will differ dramatically. Liquify will give you far more context opposed to Prettify.

### Asynchronous

<!-- prettier-ignore -->
```typescript
import prettify from '@liquify/prettify';

// Invalid code
const code = '{% if x %} {{ x }} {% endless %}';

prettify.format(code).then(output => console.log(output)).catch(error => {

  // Print the PrettyDiff error
  console.error(error);

  // Return the original input
  return code;

});
```

### Synchronous

<!-- prettier-ignore -->
```typescript
import prettify from '@liquify/prettify';

// Invalid code
const code = '{% if x %} {{ x }} {% endless %}';

try {

  const output = prettify.formatSync(code)

} catch (error) {

  // Print the PrettyDiff error
  console.error(error.message);

  // Return the original input
  return code;

}
```

# Inline Control

Inline control is supported and can be applied within comments. Inline control allows your to ignore files, code regions or apply custom formatting options. Comments use the following structures:

- `@prettify-ignore`
- `@prettify-ignore-next`
- `@prettify-ignore-start`
- `@prettify-ignore-end`
- `@prettify: ....`

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

# Caveats

Prettify is comparatively _recluse_ in terms of PnP integrations/extensibility. Depending on your stack and development preferences you may wish to use Prettify together with additional tools like [eslint](https://eslint.org/), [stylelint](https://stylelint.io/) or even [Prettier](https://prettier.io/). There are a few notable caveats you should be aware before running Prettify, most of which are trivial.

### Prettier + Prettify

It is not uncommon for developers to use Prettier in their projects but you avoid executing Prettier along-side Prettify. You can easily prevent issues arising by excluding the files Prettify handles by adding them to a `.prettierignore` file. More on this [below](#intention-vs-impedance).

### Linters

Prettify can be used together with tools like ESLint and Stylelint without the need to install additional plugins but the caveats come when you introduce Liquid into the code. Prettify can format Liquid contained in JavaScript, TypeScript, JSX and TSX but tools like ESLint are currently unable to process content of that nature and as such without official linting support for Liquid by these tools it is best to only run Prettify with linters on code that does not contain Liquid.

### Shopify Themes

Developers working with straps like [Dawn](https://github.com/Shopify/dawn) should take some consideration before running Prettify on the distributed code contained within the project. Dawn is chaotic, novice and it employs some terrible approaches. Using Prettify blindly on the project may lead to problematic scenarios and readability issues.

### Jekyll and 11ty

Developers working with JAMStack static site building tools like Jekyll or 11ty are fine to leverage Prettify but need to be aware that by default the Liquid processing will use the Shopify Liquid variation as a base reference. This means that you may need to disable and customize some rules to prevent Prettify from applying beautification in accordance.

# Prettify vs Shopify's Liquid Prettier Plugin

Shopify recently shipped a Liquid prettier plugin but it does not really do much beyond indentation. It's great to see Shopify begin to bring support for Liquid beautification and it's thanks to the brilliant work [C.P](https://github.com/charlespwd) has been doing on behalf of Shopify and its community which has made that possible. Developers who prefer the Prettier style should indeed choose that solution.

Prettify is cut from a different cloth and takes a complete different approach to both Prettier and the Liquid Prettier Plugin. Under the hood, Prettify implements the Sparser lexing algorithm which allows for all traversal operations to done internally without the need for third party parsers. The generated data structure produced by Prettify has refined context specifically designed for beautification usage.

The Sparser algorithm along side its sister tool PrettyDiff at the time of their adaption into Prettify were efficient at handling Liquid contained in Markup, Script and Style languages. Both these tools allowed me to refine the analysis handling and extend upon their pre-existing logic. While the end product of both Prettify and the Liquid Prettier Plugin are similar, the goals and capabilities differ. The ambition I have for Prettify is make it competitive alternative to Prettier and disrupt the "opinionated" convention imposed which imo is kinda shitty and restrictive.

### Intention vs Inference.

The Liquid Prettier Plugin appropriates the opinionated conventions of Prettier so when producing output the solution is indirectly impeding itself into your workflow. The restrictions of Prettier is great in a lot of cases but when you need to defer for the status-quo you'll find restrictions. This is a double edged sword and problematic when working with a template language like Liquid due to the manner in which developers infuse and express the syntax with other languages.

Prettify uses the developers intent and refines its result in accordance, this allows you to determine what works best for the project at hand with respecting to correctness. The granular set of beautification rules exposed by Prettify enables developers to progressively adapt the tool to their preferred code style.

### Standard Markup Comparison

Below is a formatting specific feature comparison as of October 2022 for Markup (Liquid + HTML). This a minimal comparison and I have omitted the cumbersome capabilities, overall Shopify's Prettier based solution offers 1/10th of what Prettify currently provides and is around 7x slower.

| Feature                        | Liquid Prettier Plugin | Prettify |
| ------------------------------ | ---------------------- | -------- |
| Tag Indentation                | ✓                      | ✓        |
| HTML Attribute Indentation     | ✓                      | ✓        |
| Comment Formatting             | ✓                      | ✓        |
| Delimiter Spacing              | ✓                      | ✓        |
| Delimiter Trims                | 𐄂                      | ✓        |
| Content Controlled Indentation | 𐄂                      | ✓        |
| Wrapping Indentation           | 𐄂                      | ✓        |
| Attribute Casing               | 𐄂                      | ✓        |
| Attribute Sorting              | 𐄂                      | ✓        |
| Liquid Attribute Indentations  | 𐄂                      | ✓        |
| Liquid Newline Filters         | 𐄂                      | ✓        |
| Liquid Line Break Separators   | 𐄂                      | ✓        |
| Liquid + CSS/SCSS              | 𐄂                      | ✓        |
| Liquid + JS                    | 𐄂                      | ✓        |
| Frontmatter                    | 𐄂                      | ✓        |

### Embedded Languages Comparison

Below is the embedded language support comparison. Shopify's solution employs Prettier native formatters when handling regions that contain external languages. Given Prettify is still under heavy development, Shopify's Liquid Prettier Plugin may suffice here but it does not support Liquid infused within the languages whereas Prettify does.

| Feature               | Tag                | Liquid Prettier Plugin | Prettify |
| --------------------- | ------------------ | ---------------------- | -------- |
| Embedded CSS          | `<style>`          | ✓                      | ✓        |
| Embedded JS           | `<script>`         | ✓                      | ✓        |
| Embedded CSS          | `{% style %}`      | ✓                      | ✓        |
| Embedded CSS          | `{% stylesheet %}` | ✓                      | ✓        |
| Embedded JS           | `{% javascript %}` | ✓                      | ✓        |
| Embedded JSON         | `{% schema %}`     | ✓                      | ✓        |
| Embedded CSS + Liquid | `{% style %}`      | 𐄂                      | ✓        |
| Embedded CSS + Liquid | `<style>`          | 𐄂                      | ✓        |
| Embedded JS + Liquid  | `<script>`         | 𐄂                      | ✓        |

# Credits

Prettify owes its existence to Sparser and PrettyDiff. This project has been adapted from these 2 brilliant tools and while largely refactored + overhauled the original parse architecture remains intact.

### [PrettyDiff](https://github.com/prettydiff/prettydiff) and [Sparser](https://github.com/unibeautify/sparser)

[Austin Cheney](https://github.com/prettydiff) who is the original author of [PrettyDiff](https://github.com/prettydiff/prettydiff) and [Sparser](https://github.com/unibeautify/sparser) created these two projects and this module is only possible because of the work he has done. Austin is one of the great minds in JavaScript and I want to thank him for open sourcing these tools.

Both PrettyDiff and Sparser were abandoned in 2019 after a nearly a decade of production. Austin has since created [Shared File Systems](https://github.com/prettydiff/share-file-systems) which is a privacy first point-to-point communication tool, please check it out and also have a read of
[wisdom](https://github.com/prettydiff/wisdom) which personally helped me become a better developer.

## Author 🥛 [Νίκος Σαβίδης](mailto:nicos@gmx.com)

<img
  align="right"
  src="https://img.shields.io/badge/-@sisselsiv-1DA1F2?logo=twitter&logoColor=fff"
/>
