<img src="https://img.shields.io/circleci/build/github/panoply/liquify/circleci-project-setup?token=54a787fdd39139be0add226455eb4d07f34f9d3f&style=flat-square&logo=CircleCI&label=&labelColor=555" align="left" />&nbsp;&nbsp;<img align="left" src="https://img.shields.io/librariesio/release/npm/@liquify/specs?style=flat-square&label=&logoWidth=28&labelColor=555&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCA5LjMzIj48dGl0bGU+bnBtPC90aXRsZT48cGF0aCBkPSJNMCwwVjhINi42N1Y5LjMzSDEyVjhIMjRWMFpNNi42Nyw2LjY2SDUuMzN2LTRINHY0SDEuMzRWMS4zM0g2LjY3Wm00LDBWOEg4VjEuMzNoNS4zM1Y2LjY2SDEwLjY3Wm0xMiwwSDIxLjM0di00SDIwdjRIMTguNjd2LTRIMTcuMzR2NEgxNC42N1YxLjMzaDhabS0xMi00SDEyVjUuMzNIMTAuNjZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+" />
<br>

<pre><code><strong>
  💧 <i>WIP</i></strong>
<p><i>
  Liquify is still under development. The project has been open sourced as the beta
  release is planned for 2023. You can find various projects the exist as part of
  Liquify already in circulation. The containing readme files are not up to date so
  please grain of salt content.</i>
</p>
  → <a href="https://discord.gg/eUNEsxMuWt"><i>Join the Discord and collaborate on the project</i></a>

</code></pre>

<img src="https://github.com/panoply/liquify/blob/next/assets/github-banner-center.gif?raw=true"  alt="Liquify Logo"  width="100%">

# Liquify

Liquify provides powerful language tooling for the [Liquid Template Language](https://shopify.github.io/liquid/). The packages available in this project provide developers working with Liquid an integrated development experience.

- [Documentation](https://liquify.dev)
- [Discord](https://discord.gg/eUNEsxMuWt)

### Why

The Liquid template language has been around for a long time. Created by Shopify CEO [Tobi Lütke](https://twitter.com/tobi) it is leveraged by hundreds of different SaaS services, thousands of open source projects and tends to be the preferred choice for JAM~Stacked generated web applications. Despite Liquid being actively maintained by Shopify, their current solutions are missing a lot of key capabilities which I consider necessities.

Liquify was created to solve the issue of lack-lustered and otherwise incompatible solutions which exist in the Liquid nexus. It intends to provide everything required for Shopify themes, Jekyll and 11ty static sites or custom projects leveraging Liquid as the consumer. It aims to deliver powerful text editor features that enrich the programing experience and lives of those working with the template language.

###### LICENSING

**Package licensing matters! [MIT](https://mit-license.org/), [PROPRIETARY](#) or [CC BY-NC-ND 4.0](#) licenses are imposed. Though the code is public, please be aware of the licensing of each package.**

# Packages

Liquify is monorepo project and most packages contained within this repository are available for download on the NPM Registry. Consult the readme of each package for a deeper understanding of a modules use-case and appropriation.

### Client Packages

These packages are the text editor [LSP](https://microsoft.github.io/language-server-protocol/specifications/specification-current/) clients.

- [@liquify/vscode](https://github.com/panoply/liquify/tree/next/packages/vscode)
- [@liquify/atom](https://github.com/panoply/liquify/tree/next/packages/atom)
- [@liquify/sublime](https://github.com/panoply/liquify/tree/next/packages/sublime)
- [@liquify/vim](https://github.com/panoply/liquify/tree/next/packages/vim)

### Core Packages

These packages are considered the _core_ modules of the project.

- [@liquify/liquid-parser](https://github.com/panoply/liquify/tree/next/packages/parser)
- [@liquify/liquid-language-server](https://github.com/panoply/liquify/tree/next/packages/server)
- [@liquify/liquid-language-specs](https://github.com/panoply/liquify/tree/next/packages/specs)
- [@liquify/prettify](https://github.com/panoply/liquify/tree/next/packages/prettify)
- [@liquify/schema](https://github.com/panoply/liquify/tree/next/packages/schema)
- [@liquify/syncify](https://github.com/panoply/liquify/tree/next/packages/syncify)

### Config Packages

These packages are the sharable configurations for the development workspace.

- [@liquify/eslint-config](https://github.com/panoply/liquify/tree/next/utils/eslint-config)
- [@liquify/prettier-config](https://github.com/panoply/liquify/tree/next/utils/prettier-config)
- [@liquify/tsconfig](https://github.com/panoply/liquify/tree/next/utils/tsconfig)

### Miscellaneous Packages

These are an assortment a different packages which were developed for specific purposes. They are made available as modules for consumption by projects that may wish to use or require them.

- [@liquify/moloko](https://github.com/panoply/liquify/tree/next/packages/moloko)
- [@liquify/highlight](https://github.com/panoply/liquify/tree/next/packages/highlight)

### Documentation Package

This is where the documentation for [liquify.dev](https://liquify.dev) exists, the [playground](https://liquify.dev/prettify/playground) for [Prettify](https://github.com/panoply/liquify/tree/next/packages/prettify) and other public facing content.

- [@liquify/docs](https://github.com/panoply/liquify/tree/next/docs)

### Testing Package

This is test runner extension pack for working with [AVA](https://github.com/avajs/ava). It helps alleviate some of the complexities involved with testing AST structures in projects like [@liquify/liquid-parser](https://github.com/panoply/liquify/tree/next/packages/parser), [@liquify/prettify](https://github.com/panoply/liquify/tree/next/packages/prettify) and more!

- [@liquify/ava](https://github.com/panoply/liquify/tree/next/packages/ava)

# Contributing

The project and containing modules use [pnpm](https://pnpm.js.org/) for dependency and workspace management. Development is intended to be conducted within the [vscode](https://code.visualstudio.com/) text editor. It is important that you install all the recommended extensions and also disable the unwanted extensions.

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

<details>
<summary>
  Third Parties (optional)
</summary>

<p>

- [Potion Theme](https://marketplace.visualstudio.com/items?itemName=sissel.material-potion)
- [Github Desktop](https://desktop.github.com/)
- [iTerm2](https://iterm2.com/)

> _While not required, if you wish to recreate the environment in which this project is developed then you can install and leverage the above additional third-party tooling._

</p>
</details>

## Installation

- Ensure [pnpm](https://pnpm.js.org/) is installed globally `npm i pnpm -g`
- Leverage `pnpm env` if you need to align node versions
- Clone this repository `git clone https://github.com/panoply/liquify.git`
- Run `pnpm i` in the root directory

The project will be complied and all packages will build in `postinstall`. You can `cd` into any package or alternatively you can run `pnpm dev` from workspace root to start watch + build mode on packages that are specific to Liquify. The `pnpm dev` when executed from workspace root will target only specific packages relating to Liquify (excluding utils/docs etc).

## Developing

All packages are compiled with [ESBuild](https://esbuild.github.io/) via [tsup](https://tsup.egoist.sh/#usage). In packages which require an additional build step you'll be able to find any additional logic in a containing `scripts` directory. When developing on the Language Server and Language Client you can run `pnpm dev` which will invoke watch and build instances for those core packages and then from here start up the extension host within vscode.

#### Per Package

```
pnpm dev                    Watch and build modes
pnpm build                  Build mode only (production)
pnpm test   <case|file>     Run tests, the project uses AVA
```

> If you cannot be bothered to `cd` into each package then you can target packages from root directory of the workspace or alternatively just run `pnpm dev` and all core packages will run in watch mode.

#### Recursive (Workspace Root)

```
pnpm dev                    Watch and build all projects relating to editor capabilities
pnpm build                  Build production/development bundles (this is a production build)
pnpm test                   Tests all packages in the repository
```

#### Targeting (Workspace Root)

```
pnpm lsp               <dev|build|test>         Targets the Liquid Language Server package
pnpm prettify          <dev|build|test>         Targets the Prettify package
pnpm parser            <dev|build|test>         Targets the Liquid Language Parser package
pnpm specs             <dev|build|test>         Targets the Liquid Language Specs package
pnpm vscode            <dev|build>              Targets the vscode client package
pnpm moloko            <dev|build>              Targets the Ace based Liquid browser editor
pnpm schema            <build|generate>         Targets the Schema Stores package
```

## Testing

Package testing is somewhat incomplete. The Liquify project uses [AVA](https://github.com/avajs/ava) for tests and also for printing stdout responses to the CLI in modules like the [@liquify/liquid-parser](https://github.com/panoply/liquify/tree/next/packages/parser) and [@liquify/prettify](https://github.com/panoply/liquify/tree/next/packages/prettify).

## Contributors

Want to contribute? Shoot me an [email](mailto:n.savvidis@gmx.com).

🥛 <small>[Νίκος Σαβίδης](mailto:n.savvidis@gmx.com)</small> <img align="right" src="https://img.shields.io/badge/-@sisselsiv-1DA1F2?logo=twitter&logoColor=fff" />
<br>
🍔 <small>[Joseph Curtis](#)</small> <img align="right" src="https://img.shields.io/badge/-@jCurt-1DA1F2?logo=twitter&logoColor=fff" />

## Acknowledgements

Liquify took a considerable amount of time to build and has been colossal undertaking. Many sleepless nights and a lot of hours were poured into this project as not many were willing to take on this task. Thanks to all those who used the previous version of this extension.
