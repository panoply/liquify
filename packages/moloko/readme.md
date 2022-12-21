# @liquify/moloko

Moloko is an embedded web based code editor developed for the [Liquid](https://shopify.github.io/liquid/) template language and supports various languages that are typically used along side it within projects. Moloko is heavily inspired by the [Flems](https://flems.io) code playground which is written and maintained by the brilliant [Rasmus Porsager](https://github.com/porsager). Moloko supports the various languages that are typically used along side it within projects.

[Live Example](https://liquify.dev/moloko)

# Installation

Moloko has peer dependencies on [mithril.js](https://mithril.js.org) and [prettify](https://github.com/panoply/prettify). Both these modules need to be installed in order for moloko to be used.

```bash
pnpm add @liquify/moloko @liquify/prettify mithril
```

### Requirements

Moloko is running atop of [Ace](https://ace.c9.io/) and thus it requires several external modules to be placed into a distribution bundle of your project. The module exposes an executable for this which helps alleviate some of the red~tape typically incurred when leveraging the Ace editor in projects of this nature.

After installing, run the following command:

```bash
pnpm moloko
```

Moloko will look in the relative directory of where it was imported for the modules it requires. If your distribution bundle exists in `./dist/js/bundle.js` then you'd pass `--output dist/js ` flag to the moloko command.

CLI Options:

```bash
pnpm moloko -o, --output <dir>   # The output directory to which moloko should be copied
pnpm moloko -s, --standalone     # Generates a standalone build, without ace web workers
```

# Overview

Moloko uses a custom build of the [Ace](https://ace.c9.io/) text editor under the hood and renders a development workspace virtually using the powerful [mithril.js](https://mithril.js.org) SPA framework. The editor employs a custom set of Ace grammars that support embedded code regions and syntax highlighting for Liquid.

### Supported Themes

Currently Moloko provides support for a single (dark) theme:

- Potion

### Supported Languages

In addition to Liquid, Moloko also supports several other languages:

- HTML
- Liquid
- XML
- JavaScript
- TypeScript
- CSS
- SCSS
- JSON
- YAML

# Usage

Moloko leverages the powerful [mithril.js](https://mithril.js.org) SPA framework together with the [Ace](https://ace.c9.io/) text editor. Beautification support is made possible with [prettify](https://github.com/panoply/prettify).

```typescript
import moloko from '@liquify/moloko';

// Render the editor to a document element
moloko.mount(document.body, options?: Options): Promise<Editor>;

// Programmatic invocation for Liquid formatting
moloko.beautify(rules: PrettifyOptions)

// Prettify Instance
moloko.prettify: Prettify

// Interface with current open file
moloko.file.open: boolean
moloko.file.language: Language
moloko.file.session: EditorSession
moloko.file.cursor: Position
moloko.file.name: string
```

# Contributing

Despite running atop of ACE, Moloko is distributed in such a way that it does not have dependency on the module itself, but instead will spin up its own build and expose that. In order to support the grammars and embedded languages of the Shopify Liquid variation the module employs its own grammar, language modes and theme.

<details>
<summary>
  Pre-requisites
</summary>
<p>

- [Git](https://git-scm.com/)
- [Node v16^](https://nodejs.org/)
- [Pnpm v7^](https://pnpm.js.org/)
- [VSCode](https://code.visualstudio.com/)

</p>
</details>

### Setup

- Ensure [pnpm](https://pnpm.js.org/) is installed globally `npm i pnpm -g`
- Leverage `pnpm env` if you need to align node versions
- Clone this repository `git clone https://github.com/panoply/moloko.git`
- Run `pnpm i` in the root directory
- Run `pnpm dev` and start coding

You can run `pnpm build` to generate a distributed bundle or `pnpm ace` to pull in ace from github and setup the required files. Take a look at the package `scripts` for more context.

# Author

🥛 [Νίκος Σαβίδης](mailto:nicos@gmx.com) <img align="right" src="https://img.shields.io/badge/-@sisselsiv-1DA1F2?logo=twitter&logoColor=fff" />
