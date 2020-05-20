<img src="https://github.com/panoply/liquify/blob/master/assets/github-banner-center.gif?raw=true"  atl="Liquify Logo"  width="100%">

# Liquify (vscode)

💧A vscode extension for the [Liquid Templating Language](https://shopify.github.io/liquid/). Liquify brings intelliSense features for multiple [Liquid variations](#) to vscode which provides modern IDE tooling to developers who are working the language.

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

Liquify operates on a freemium license model and developers are free to use the software unlicenced. Variations of Liquid pertaining to an open source project (ie: Jekyll) unlicenced users will have access some licensed features but when the variation is pertaining to a SaaS (ie: Shopify) unlicensed users will only have access to unlicensed features.

- [Get License](https://liquify.dev/licensing)

## Contributing

This repository is part of a closed source [monorepo](#) which leverages [pnpm](#) for dependency management. Liquify implements the Language Server Protocol and though the proprietary code is closed source the language clients and syntax grammars have been released under an [MIT license](#) so contributions are welcome 📥 here.

### Development

Those who wish to contribute to this project:

1. Ensure Liquify is installed in your editor.
2. Clone this repository and run `pnpm install`
3. Run `pnpm run dev` and launch the debugger.

> Liquify will automatically detect the development workspace and can distinguish between contributors and collaborator environments which is made possible using the [@liquify/cli](#) tool.

| Command         | Description                                 |
| --------------- | ------------------------------------------- |
| `pnpm run cli`  | Launches the interactive CLI                |
| `pnpm run dev`  | Launches debugger and bundler in watch mode |
| `pnpm run test` | Runs a bunch of tests using Mocha           |

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
