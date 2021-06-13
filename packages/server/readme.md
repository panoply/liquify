[![Coverage Status](https://coveralls.io/repos/github/panoply/vscode-liquid/badge.svg?branch=2.4.0)](https://coveralls.io/github/panoply/vscode-liquid?branch=2.4.0)

# Liquid Language Server

An [LSP](#) implementation for the Liquid template language.

## Capabilities

- Hovers
- Completions
- Signatures
- Formatting
- Diagnostics
- Validations
- Codelens

### Install

```
<pnpm|npm|yarn> i liquid-language-server
```

## Specifications

Server capabilities are made possible by providing the Language Server with Liquid specification variation reference data. The Liquid Language Server supports 3 specifications:

- [Liquid Standard](#)
- [Liquid Shopify](#)
- [Liquid Jekyll](#)

## Parser

The parser only cares about Liquid and HTML syntax. It supports full and incremental parses. The parser will build a detailed AST representation of documents on a per change basis.

- [@liquid/liquid-parser](#)

## Language Services

Supported language services via LSP. The server also supports embedded language regions in documents providing standard capabilities like completions and validations.

- HTML
- JSON
- JavaScript
- Yaml
- CSS/SCSS
