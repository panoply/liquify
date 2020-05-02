<img src="https://github.com/panoply/liquify/blob/master/assets/github-banner-center.gif?raw=true"  atl="Liquify Logo"  width="100%">

## Liquify (vscode)

A vscode extension for the [Liquid Templating Language](https://shopify.github.io/liquid/). Liquify brings modern tooling and intelliSense features to vscode and supports multiple [Liquid variations](#).

- [Documentation](https://liquify.dev)
- [Playground](https://liquify.dev)

> Checkout the [Potion Theme](#) for vscode and take advantage of Liquid specific syntax highlighting in combination dark material x monokai colours.

## Key Features

- Intellisense features for Liquid [Standard](https://shopify.github.io/liquid/), [Jekyll](https://jekyllrb.com/docs/liquid/) and [Shopify](https://www.shopify.com/partners/shopify-cheat-sheet) variations
- Code linting, validations and diagnostics
- Code auto-completion for tags, objects, embedded regions and more
- Syntax highlighting for Liquid contained in CSS, SCSS, JavaScript, Markdown files
- Auto formatting and beautification provided with the powerful [PrettyDiff](https://prettydiff.com/)
- Hover descriptions and reference information for tags and completions

## Licensing

Liquify operates on a freemium license model. Developers are free to use Liquify unlicenced and can take advantage of the features. Variations of Liquid pertaining to an open source project (ie: Jekyll) unlicenced users will have access some licensed features but when the variation is pertaining to a SaaS (ie: Shopify) unlicensed users will only have access to unlicensed features.

- [Get License](https://liquify.dev/licensing)

## Contributing

This repository is part of a [monorepo](#) which leverages [pnpm](#) for dependency management. Liquify implements the Language Server Protocol. The proprietary code is closed source but the language clients and syntax grammars are released under an MIT license so PR's are welcome 📥 here. Liquify will automatically detect the development workspace and can distinguish between contributors and collaborator environments.

> Take a peek at the [liquify.dev](#) website [source code](#) if you're curious about JAMStack static websites built with [11ty](#) and would like to see a real world project using Liquify.

### Development

Those who wish to contribute to this project:

1. Ensure Liquify is installed in your editor.
2. Clone this repository and run `pnpm install`
3. Run `pnpm run dev` and launch the debugger.

> Contributor workspaces are unable to execute closed sourced commands and will use the pre-installed Liquify extension source in debug mode.

<details>
<summary>
  <strong>Contributor Commands</strong>
</summary>
<p>

| Command         | Description                                 |
| --------------- | ------------------------------------------- |
| `pnpm run cli`  | Launches the interactive CLI                |
| `pnpm run dev`  | Launches debugger and bundler in watch mode |
| `pnpm run test` | Runs a bunch of tests using Mocha           |

</p>
</details>

## Credits

Liquify is made possible by leveraging a collection open source projects.

- [prettydiff](#)
- [sparser](#)
- [vscode-languageserver-node](#)
- [vscode-languageserver-textdocument](#)
- [vscode-html-features](#)
- [vscode-json-languageservice](#)
- [vscode-css-languageservice](#)
- [vscode-uri](#)
