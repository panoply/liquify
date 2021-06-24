<img src="https://github.com/panoply/liquify/blob/next/assets/github-banner-center.gif?raw=true"  atl="Liquify Logo"  width="100%">

# Liquify (vscode)

💧 A vscode extension for the [Liquid Template Language](https://shopify.github.io/liquid/). Liquify brings intelliSense features for multiple [Liquid variations](#) to vscode and provides modern IDE capabilities to developers working with the language or an environment which implements it.

- [Marketplace](#)
- [Documentation](https://liquify.dev)
- [Playground](https://liquify.dev)

###### IMPORTANT

###### Do not use Liquify along side the [theme-check](https://marketplace.visualstudio.com/items?itemName=Shopify.theme-check-vscode) extension by Shopify, see [below][#] for more info.

## Key Features

- Intellisense features for Liquid [Standard](https://shopify.github.io/liquid/), [Jekyll](https://jekyllrb.com/docs/liquid/) and [Shopify](https://www.shopify.com/partners/shopify-cheat-sheet) variations
- Code linting, validations and diagnostics
- Code auto-completion for tags, objects, embedded regions and more
- Syntax highlighting for Liquid contained in CSS, SCSS, JavaScript, Markdown files.
- Auto formatting and beautification provided with the powerful [PrettyDiff](https://prettydiff.com/)
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

## Licensing

Liquify is currently free to use as it exists in an alpha pre-release stage. A versioning license cost will be incurred for those who want all the features for the Shopify variation upon the official 1.0 release. Liquify will operate on a _freemium_ license model and developers will be free to use the software unlicensed when working with variations of Liquid which will pertain to an open source project (ie: Jekyll/11ty).

Unlicensed users will have access to some licensed features but when the variation is pertaining to a SaaS (ie: Shopify) unlicensed users will only have access to unlicensed features.

- [Get License](https://liquify.dev/licensing)

> **Please Note:** This project is developed independently. Liquify is used by thousands of developers every day. Ensuring features and capabilities are maintained and APIs kept aligned with a Company like Shopify takes time, so by licensing you help keep the project alive.

## Liquify or Theme Check

Shopify recently released an extension that is shipped under the name [Shopify Liquid](#) which is available on the Marketplace. This extension requires you to have Ruby, Homebrew/Gems and [Theme Check](#) installed in order to provide its **very** basic capabilities over LSP. All the features provided by the Shopify Liquid extension are supported in Liquify independent of Theme Check and Ruby so you should not use Liquify along side the Theme Check (Shopify Liquid) extension.

### Reasoning

The Shopify Liquid extension is poorly thought through and offers 1/10th of what Liquify provides to you as a developer working with Liquid and in a Shopify theme environment. Using it along side Liquify will result in extraneous connections being sent back and fourth as you will be communicating with multiple Language Servers from the client. If you are using Liquify then either uninstall or disable [Shopify Liquid](#) because you don't need it.

## Contributing

This repository is part of a closed source [monorepo](#) which leverages [pnpm](#) for dependency management. Liquify implements the Language Server Protocol and though the proprietary code is closed source the language clients and syntax grammars have been released under a different license which allow contributions.

## Credits

Liquify is made possible by leveraging a collection open source projects. Please refer to the [Third Party Notices](#) files for licensing information of these tools.

- [vscode-languageserver-node](#)
- [vscode-languageserver-textdocument](#)
- [vscode-json-languageservice](#)
- [vscode-css-languageservice](#)
- [vscode-uri](#)
- [prettydiff](#)
- [sparser](#)

> Users that choose to license Liquify will also be contributing to projects like [PrettyDiff](#) with part of the profits generated going back to the community of open source tools the project depends on.

<hr>

🥛 <small>[Νίκος Σαβίδης](mailto:nicos@gmx.com)</small>
