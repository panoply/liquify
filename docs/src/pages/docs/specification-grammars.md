---
category: specs
licensed_feature: true
permalink: docs/specs/grammars
pertains:
  - 11ty
  - jekyll
---

# Grammars

No formal grammar exists for Liquid, its just a templating language but in order to provide features like diagnostics, validations, linting, formatting and other capabiltites to your text editor the [parser](#) Liquify uses provides a way to express the structure of Liquid syntax and compose parseable grammars.

If you're used tools like [ANTLR](https://en.wikipedia.org/wiki/ANTLR) to create context-free grammars for parsing you'll find the approach to generating or extending upon the available Liquid Specifications a little different. In Liquify, users can compose grammars that extend upon existing variations by supplying custom specs from within their projects workspace configuration file (`.liquidrc`) using the `context[]` property available via `specs{}` option.

## `context[]`

Tags and Filters can take advantage of the `context[]` property to express the formation and structure of Liquid token syntax. Tag and Filter contexts are expressed using a simple metasyntax notation:

| Keyword        | Example                           |
| -------------- | --------------------------------- |
| `$keyword`     | `tag_name`                        |
| `$variable`    | `variable`                        |
| `$operator`    | `[<>=!]`, `and`, `or`             |
| `$array`       | `array[0]` _or_ `array[variable]` |
| `$object`      | `object.property`                 |
| `$string`      | `"string"` _or_ `'string'`        |
| `$boolean`     | `true` _or_ `false`               |
| `$number`      | `[0-9]`                           |
| `$parenthesis` | `(` _or_ `)`                      |
| `$colon`       | `:`                               |
| `$comma`       | `,`                               |
| `$dot`         | `.`                               |

> Curious readers that find themselves here, you're best to checkout the Liquify docs on [extending variations](#) which documents extending
