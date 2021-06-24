# Liquid Syntax Support (vscode)

💧 Textmate grammars for the Liquid Template Language. These grammars are shipped with [Liquify](https://liquify.dev) as an extension dependency.

### Why?

The [Liquify](https://liquify.dev) extension/plugin provides modern IDE support for developers working with the Liquid in environments that implementing it as a consumer facing template language. These grammars are maintained along side Liquify to provide syntax highlighting support in text editors that understand TextMate Grammar files.

#### Supported Syntaxes

- Liquid Standard
- Liquid Shopify
- Liquid Jekyll + Rouge Support
- Liquid 11ty

## Install

If you are using [Liquify](https://liquify.dev) these grammars will be pre-installed so you do not need to install these. If you do not use Liquify, you may install the grammars independently on the [VSCode Marketplace](#) or the command line:

```cli
code --install-extension sissel.liquid-syntax-support
```

## Language Modes

Each Liquid variation extends the Standard Liquid grammar and each variation is treated as its own Language. You will need to activate [Language](https://code.visualstudio.com/docs/languages/overview) modes

## Licensing

Liquify operates on a freemium license model and developers are free to use the software unlicensed. Variations of Liquid pertaining to an open source project (ie: Jekyll). Unlicensed users will have access some licensed features but when the variation is pertaining to a SaaS (ie: Shopify) unlicensed users will only have access to unlicensed features.

- [Get License](https://liquify.dev/licensing)

## Contributing

This repository is part of a closed source [monorepo](#) which leverages [pnpm](#) for dependency management. Liquify implements the Language Server Protocol and though the proprietary code is closed source the language clients and syntax grammars have been released under a different license which allow contributions.

<hr>

🥛 <small>[Νίκος Σαβίδης](mailto:nicos@gmx.com)</small>
