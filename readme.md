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

Liquify provides powerful developer tooling for the [Liquid Template Language](https://shopify.github.io/liquid/).

- [Discord](https://discord.gg/eUNEsxMuWt)

### Why

The Liquid template language has been around for a long time. Created by Shopify CEO [Tobi Lütke](https://twitter.com/tobi) it is leveraged by hundreds of different SaaS services, thousands of open source projects and tends to be the preferred choice for JAM~Stacked (SSG) generated web applications. Despite Liquid being actively maintained by Shopify, their current solutions are missing a lot of key capabilities which I consider necessities.

Liquify was created to solve the issue of lack-lustered and otherwise incompatible solutions which exist within nexus. It intends to provide everything required for Shopify themes, Jekyll and 11ty static sites or custom projects leveraging Liquid as the consumer facing language. It aims to deliver powerful text editor features that enrich the programming experience and lives of those working with the template language.

###### LICENSING

**Package licensing matters! [MIT](https://mit-license.org/), [PROPRIETARY](#) or [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/) licenses are imposed. Though the code is public, please be aware of the licensing of each package.**

# Packages

Liquify is a [pnpm](https://pnpm.js.org/en/cli/install) powered monorepo project. Most packages contained within this repository are available for download via the NPM Registry. Consult the readme of each package for a deeper understanding of a modules use-case and appropriation. Some packages are maintained in an isolated repositories using [Git Sub-Modules](https://git-scm.com/book/en/v2/Git-Tools-Submodules). PR's and issues pertaining to submodule projects are tracked outside of this repository.

## Client Packages

These packages are the text editor [LSP](https://microsoft.github.io/language-server-protocol/specifications/specification-current/) clients.

- [@liquify/vscode](https://github.com/panoply/liquify/tree/next/packages/vscode)
- [@liquify/sublime](https://github.com/panoply/liquify/tree/next/packages/sublime)
- [@liquify/vim](https://github.com/panoply/liquify/tree/next/packages/vim)

## Core Packages

These packages are considered the _core_ modules of the project.

- [@liquify/parser](https://github.com/panoply/liquify/tree/next/packages/parser)
- [@liquify/server](https://github.com/panoply/liquify/tree/next/packages/server)
- [@liquify/specs](https://github.com/panoply/liquify/tree/next/packages/specs)
- [@liquify/schema](https://github.com/panoply/liquify/tree/next/packages/schema)

> The `@liquify/schema` package is published as a sub-module.

## Config Packages

These packages are the sharable configurations for popular development tools leveraged in the workspace.

- [@liquify/tsconfig](https://github.com/panoply/liquify/tree/next/utils/tsconfig)
- [@liquify/eslint-config](https://github.com/panoply/liquify/tree/next/utils/eslint-config)
- [@liquify/prettier-config](https://github.com/panoply/liquify/tree/next/utils/prettier-config)
- [@liquify/stylelint-config](https://github.com/panoply/liquify/tree/next/utils/stylelint-config)

## Extended Packages

These are an assortment a different packages which were developed for specific purposes. They are made available as modules for consumption by projects that may wish to use or require them.

- [@liquify/highlight](https://github.com/panoply/liquify/tree/next/packages/highlight)
- [@liquify/papyrus](https://github.com/panoply/liquify/tree/next/packages/prism)

## Testing Package

This is test runner extension package which extends upon [AVA](https://github.com/avajs/ava). The module helps alleviate some of the complexities involved with testing AST structures in projects like [@liquify/parser](https://github.com/panoply/liquify/tree/next/packages/parser), [Æsthetic](https://github.com/panoply/esthetic) and more.

- [@liquify/ava](https://github.com/panoply/liquify/tree/next/packages/ava)

## Submodule Packages

These packages exist in the monorepo but are distributed independent of the Liquify organization NPM registry name. These packages are published and maintained in an isolated repositories using [Git Sub-Modules](https://git-scm.com/book/en/v2/Git-Tools-Submodules).

- [moloko](https://github.com/panoply/liquify/tree/next/packages/moloko)
- [esthetic](https://github.com/panoply/liquify/tree/next/packages/esthetic)
- [papyrus](https://github.com/panoply/liquify/tree/next/packages/papyrus)
- [syncify](https://github.com/panoply/liquify/tree/next/packages/syncify)

# Documentation

Several different projects exist within Liquify. Some projects have their own designated documentation and domain address. Documentation packages are marked as **private** and are served up via [Netlify](https://netlify.com/). Refer to below list of documentation websites shipped from this monorepo.

- [liquify.dev](https://liquify.dev)
- [æsthetic.dev](https://æsthetic.dev)
- [papyrus.js.org](https://papyrus.js.org)
- syncify.js.org

Refer to readme files contained within the **docs** sub-directory of each project for more information.

# Contributing

The project and its containing modules use [pnpm](https://pnpm.js.org/) for dependency and workspace management. Development is intended to be conducted within the [vscode](https://code.visualstudio.com/) text editor. It is important that you install all the recommended extensions and also disable the unwanted extensions. The **recommended** extensions are important as they ensure the best possible development experience.

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

The project will be complied and all packages will build in `postinstall`. You can `cd` into any package or alternatively you can run `pnpm dev` from workspace root to start watch + build mode on packages that are specific to Liquify. The `pnpm dev` when executed from workspace root will target only specific packages relating to Liquify and exclude utils/docs etc.

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
pnpm @server            <dev|build|test>         Targets the Liquid Language Server package
pnpm @esthetic          <dev|build|test>         Targets the Æsthetic package
pnpm @parser            <dev|build|test>         Targets the Liquid Language Parser package
pnpm @specs             <dev|build|test>         Targets the Liquid Language Specs package
pnpm @vscode            <dev|build>              Targets the vscode client package
pnpm @moloko            <dev|build>              Targets the Moloko (monaco) text editor package
pnpm @highlight         <dev|build|test>         Targets the CLI syntax highlight package
pnpm @ava               <dev|build>              Targets the AVA test extender package
pnpm @schema            <build|generate>         Targets the Schema Stores package
```

#### Documentation (Workspace Root)

```
pnpm @docs:liquify      <dev|build|deploy>        Targets the liquify.dev documentation
pnpm @docs:esthetic     <dev|build|deploy>        Targets the æsthetic.dev documentation
pnpm @docs:moloko       <dev|build|deploy>        Targets the moloko.js.org documentation
pnpm @docs:syncify      <dev|build|deploy>        Targets the syncify.js.org documentation
pnpm @docs:papyrus      <dev|build|deploy>        Targets the papyrus.js.org documentation
```

## Testing

Package testing is somewhat incomplete. The Liquify project uses [AVA](https://github.com/avajs/ava) for tests and also for printing stdout responses to the CLI in modules like the [@liquify/parser](https://github.com/panoply/liquify/tree/next/packages/parser) and [Æsthetic](https://github.com/panoply/esthetic).

## Contributors

Want to contribute? Shoot me an [email](mailto:n.savvidis@gmx.com) or reach out via [Twitter](https://twitter.com/niksavvidis).
