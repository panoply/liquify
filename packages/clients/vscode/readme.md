<img src="https://github.com/panoply/liquify/blob/next/assets/github-banner-center.gif?raw=true"  atl="Liquify Logo"  width="100%">

# Liquify (vscode)

💧 A vscode extension for the [Liquid Template Language](https://shopify.github.io/liquid/). Liquify brings intelliSense features for multiple [Liquid variations](#) to vscode and provides modern IDE capabilities to developers who are working the language.

- [Documentation](https://liquify.dev)
- [Playground](https://liquify.dev)

### Key Features

- Intellisense features for Liquid [Standard](https://shopify.github.io/liquid/), [Jekyll](https://jekyllrb.com/docs/liquid/) and [Shopify](https://www.shopify.com/partners/shopify-cheat-sheet) variations
- Code linting, validations and diagnostics
- Code auto-completion for tags, objects, embedded regions and more
- Syntax highlighting for Liquid contained in CSS, SCSS, JavaScript, Markdown files
- Auto formatting and beautification provided with the powerful [PrettyDiff](https://prettydiff.com/)
- Hover descriptions and reference information for tags and completions
- Codelens quick view support and path completion for include/import tags

### Installation

The extension can be installed via the [Marketplace](#) or the command line:

```cli
code --install-extension sissel.liquify
```

## Licensing

Liquify operates on a freemium license model and developers are free to use the software unlicensed. Variations of Liquid pertaining to an open source project (ie: Jekyll). Unlicensed users will have access some licensed features but when the variation is pertaining to a SaaS (ie: Shopify) unlicensed users will only have access to unlicensed features.

- [Get License](https://liquify.dev/licensing)

## Contributing

This repository is part of a closed source [monorepo](#) which leverages [pnpm](#) for dependency management. Liquify implements the Language Server Protocol and though the proprietary code is closed source the language clients and syntax grammars have been released under a different license which allow contributions.

## Credits

Liquify is made possible by leveraging a collection open source projects. Please refer to the [Third Party Notices](#) files for licensing information of these tools.

- [prettydiff](#)
- [sparser](#)
- [vscode-languageserver-node](#)
- [vscode-languageserver-textdocument](#)
- [vscode-html-features](#)
- [vscode-json-languageservice](#)
- [vscode-css-languageservice](#)
- [vscode-uri](#)

> Users that choose to license Liquify will also be contributing to projects like [PrettyDiff](#) with part of the profits generated going back to the community of open source tools the project depends on.

<hr>

🥛 <small>[Νίκος Σαβίδης](mailto:nicos@gmx.com)</small>
