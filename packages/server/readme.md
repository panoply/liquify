<pre><code><strong>
  💧 <i>WIP</i></strong>
<p><i>
  Liquid Language Server is still in development</i>
</p>
  → <a href="https://discord.gg/eUNEsxMuWt"><i>Join the Discord and collaborate on the project</i></a>

</code></pre>

# Liquid Language Server

An [LSP](https://langserver.org/) implementation for the Liquid template language.

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

Server capabilities are made possible by providing the Language Server with Liquid specification variation reference data. The Liquid Language Server supports 4 specifications:

- [Liquid Standard](https://github.com/panoply/liquify/tree/dev/packages/specs/src/liquid/data/standard)
- [Liquid Shopify](https://github.com/panoply/liquify/tree/dev/packages/specs/src/liquid/data/shopify)
- [Liquid Jekyll](https://github.com/panoply/liquify/tree/dev/packages/specs/src/liquid/data/jekyll)
- [Liquid Eleventy](https://github.com/panoply/liquify/tree/dev/packages/specs/src/liquid/data/11ty)

## Parser

The parser only cares about Liquid and HTML syntax. It supports full and incremental parses. The parser will build a detailed AST representation of documents on a per change basis.

- [@liquify/liquid-parser](#)

## Language Services

Supported language services via LSP. The server also supports embedded language regions in documents providing standard capabilities like completions and validations.

- HTML
- JSON
- JavaScript
- Yaml
- CSS/SCSS
