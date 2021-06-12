[![Coverage Status](https://coveralls.io/repos/github/panoply/vscode-liquid/badge.svg?branch=2.4.0)](https://coveralls.io/github/panoply/vscode-liquid?branch=2.4.0)

# Liquid Language Server

An [LSP](#) implementation for the Liquid template language.

## Capabilities

- Parsing
- Hovers
- Completions
- Signatures
- Formatting
- Diagnostics
- Validations

### Install

```
pnpm i liquid-language-server
```

## Specifications

Server capabilities are made possible by providing the Language Server with Liquid specification variation reference data. The Liquid Language Server supports 3 variation specifications out of the the box:

- [Liquid Standard](#)
- [Liquid Jekyll](#)
- [Liquid Shopify](#)

## Parser

The parser only cares about Liquid syntax and supports both full and incremental parsing. Liquid is a simple enough language that it can be parsed with regular expressions. The parser will build an AST representation of Liquid code present in text documents on a per change basis.

### Token Tags

Token tags describe the type of tag captured.

- Open
- Close
- Child
- Singular

### Token Kinds

Token kinds decribe the tag language kind

- HTML
- Liquid

### Token Types

Token types give reference to a tag.

- Associate
- Embedded
- Comment
- Control
- Filter
- Iteration
- Object
- Variable

### AST Nodes

Nodes contained on the AST will return and object. Depending on what type of node (tag) that is parsed some properties may differ.

```ts
[
  {
    name: string
    token: string[]
    type: number
    tag: number
    offset: number[]
    languageId?: string
    lineOffset?: number
    embeddedDocument?: number
    children?: [
      {
        name: string
        token: string
        offset: number[]
        type: number
        tag: number
        objects?: objects
      }
    ]
    diagnostics: Promise< null | [
      {
        range: object;
        severity?: number;
        code?: number | string;
        source?: string;
        message: string;
      }
    ]>
    objects?: Promise< null | {
      [string: number]: [
        string
      ]
    }>
  }
]
```

## Language Services

Supported language servers

- JSON
- YAML
- CSS

## Validation and Diagnostics

Validations are processed according to the specified Liquid variation engine defined in the `.liquidrc` file. If the severity of validations is considered high it will prevent formatting capabilties from excuting whereas some validations try and prevent bad practices or sloppy code. Diagnostics validations are an optional feature, you can disable/enable each validation as to prevent them from running according to your taste and preferences.

### Tag Validations

Global validations that will be executed on all capture tokens.

- Missing start tag
- Missing end tag
- Missing property value
- Invalid or Unknown Tag
- Tag does not accept whitespace dash

### Object Validations

Validations that are executed on objects and properties used in tokens.

- Missing property value
- Invalid or unknown property value
- Object property not required

### Control Validations

Validations that are execute on control tag tokens.

- Extraneous operator value
- Invalid operator used
- Conditional tag not in parent tag
- Invalid parameter value
- Iteree is invalid or in-use

### Filter Validations

Validations that are executed tag filters.

- Tag does not accept filters
- Missing filter attribution
- Invalid or unknown filter
- Filter is missing parameter value

# Contributing

The Liquid Language Server leverages the Language Server Protocol (LSP) implementation to facilitate features and capabitilities to text editors.

## Developer Notables

The codebase is engineered different to other LSP implementations. The approach taken with the Liquid LSP goes against the grain when compared to other Language servers in the nexus.

- Written in JavaScript [ECMAScript 11](#) (ES2020) and will transpile into ES6
- Dependencies are managed with the [pnpm](#) package manager opposed to Yarn or npm
- Bundling is handled with [rollup](#) and a collection of custom plugins
- TypeScript declarations are supplied and intergrated via JSDocs
- Language is parsed using an error tolerant regular expression parser
