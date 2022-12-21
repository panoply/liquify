<img src="https://github.com/panoply/liquify/blob/next/assets/github-banner-center.gif?raw=true"  atl="Liquify Logo"  width="100%">

# Liquify (vscode)

💧 A vscode extension for the [Liquid Template Language](https://shopify.github.io/liquid/). Liquify brings intelliSense features for multiple [Liquid variations](#) to vscode and provides modern IDE capabilities to developers working with the language or an environment which implements it.

- [Marketplace](#)
- [Documentation](https://liquify.dev)
- [Playground](https://liquify.dev)

## Key Features

- Intellisense features for Liquid [Standard](https://shopify.github.io/liquid/), [Jekyll](https://jekyllrb.com/docs/liquid/) and [Shopify](https://www.shopify.com/partners/shopify-cheat-sheet) variations
- Code linting, validations and diagnostics
- Code auto-completion for tags, objects, embedded regions and more
- Syntax highlighting for Liquid contained in CSS, SCSS, JavaScript, Markdown files.
- Hover descriptions and reference information for tags and completions.
- Codelens quick view support and path completion for include/import/render tags.
- Respects and provided HTML IntelliSense capabilities and completions.
- IDE features provided over the LSP (Language Server Protocol).
- Provides extendable custom Liquid variation capabilities.

## Install

The extension can be installed via the [Marketplace](#) or the command line:

```cli
code --install-extension sissel.liquify
```

> **Please Note:** This project is developed independently. Liquify is used by thousands of developers every day. Ensuring features and capabilities are maintained and APIs kept aligned with a Company like Shopify takes time, so by licensing you help keep the project alive.

## Liquify or Theme Check

Shopify recently released an extension that is shipped under the name [Shopify Liquid](#) which is available on the Marketplace. This extension requires you to have Ruby, Homebrew/Gems and [Theme Check](#) installed in order to provide its capabilities over LSP. All the features provided by the Shopify Liquid extension are supported in Liquify independent of Theme Check and Ruby.

## Contributing

This repository is part of a closed source [monorepo](#) which leverages [pnpm](#) for dependency management. Liquify implements the Language Server Protocol and though the proprietary code is closed source the language clients and syntax grammars have been released under a different license which allow contributions.

<hr>

🥛 <small>[Νίκος Σαβίδης](mailto:nicos@gmx.com)</small>
