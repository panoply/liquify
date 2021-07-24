<img src="https://img.shields.io/circleci/build/github/panoply/liquify/circleci-project-setup?token=54a787fdd39139be0add226455eb4d07f34f9d3f&style=flat-square&logo=CircleCI&label=&labelColor=555" align="left" />&nbsp;&nbsp;<img align="left" src="https://img.shields.io/librariesio/release/npm/@liquify/specs?style=flat-square&label=&logoWidth=28&labelColor=555&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCA5LjMzIj48dGl0bGU+bnBtPC90aXRsZT48cGF0aCBkPSJNMCwwVjhINi42N1Y5LjMzSDEyVjhIMjRWMFpNNi42Nyw2LjY2SDUuMzN2LTRINHY0SDEuMzRWMS4zM0g2LjY3Wm00LDBWOEg4VjEuMzNoNS4zM1Y2LjY2SDEwLjY3Wm0xMiwwSDIxLjM0di00SDIwdjRIMTguNjd2LTRIMTcuMzR2NEgxNC42N1YxLjMzaDhabS0xMi00SDEyVjUuMzNIMTAuNjZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+" />
<br>

<img src="https://github.com/panoply/liquify/blob/next/assets/github-banner-center.gif?raw=true"  atl="Liquify Logo"  width="100%">

# Liquify

Language tooling for the [Liquid Template Language](#). Liquify provides IDE capabilities to developers working with Liquid and its multiple variations. Contained in this repository is various packages and modules used by the Liquify text editor extension/plugin available in [VSCode](https://code.visualstudio.com), [Sublime](#) and [Atom](#).

###### IMPORTANT

**Liquify operates on a [Freemium](#) licensing model and distributes the codebase as a series of proprietary, closed and open source licensed packages.**

### Why

The Liquid template language has been around for a long time. Created by Shopify CEO [Tobi Lütke](https://twitter.com/tobi), Liquid is leveraged by SaaS services and open source projects like Jekyll, Eleventy and many others as safe and simple consumer facing language. Despite Liquid being actively maintained by Shopify and the foundation of its storefront theme development little effort has been made by the Shopify team and borderline neglect in providing modern IDE features for developers working in environments that use the language.

Liquify was created to solve this issue, it aims to be the _crème de la crème_ and provide developers everything they require for Liquid in their workspace.

### Pricing / License

Liquify is currently free to use in this alpha pre-release stage. A yearly licensing cost may _potentially_ be incurred for those who want features which pertain to the Shopify variation. There are no plans as of yet to implement this pay wall so it exists free to use with all features available to all users.

### Core Packages

These packages are considered the core modules of the project.

- [@liquify/parser](#)
- [@liquify/server](#)
- [@liquify/beautify](#)
- [@liquify/specs](#)
- [@liquify/schema](#)

### Client Packages

These packages are the text editor [LSP](https://microsoft.github.io/language-server-protocol/specifications/specification-current/) clients.

- [@liquify/vscode](#)
- [@liquify/sublime](#)
- [@liquify/atom](#)

### Rollup Plugins

These packages are project specific [Rollup](https://rollupjs.org) plugins.

- [@liquify/rollup-plugin-obfuscator](#)
- [@liquify/rollup-plugin-utils](#)

### Sharable Configs

These packages are the sharable configurations.

- [@liquify/rollup-config](#)
- [@liquify/eslint-config](#)

###### IMPORTANT

**Some packages may operating under [MIT](https://mit-license.org/), [PROPRIETARY](#) or [CC BY-NC-ND 4.0](#). Packages operating under [PROPRIETARY](#) consider source code as [Trade Secret](https://en.wikipedia.org/wiki/Proprietary_software#Types). Though code is public, please be aware of the licensing imposed upon each package.**

# Setup

The project is a combination monorepo/multirepo that uses [pnpm](https://pnpm.js.org/) for dependency and workspace management. Development is intended to be conducted within the [vscode](https://code.visualstudio.com/) text editor. The development environment requires the following:

<details>
<summary>
  Pre-requisites
</summary>
<p>

- [Git](https://git-scm.com/)
- [Node v14^](https://nodejs.org/)
- [Pnpm v5^](https://pnpm.js.org/)
- [VSCode](https://code.visualstudio.com/)

</p>
</details>

### Installation

- Ensure [pnpm](https://pnpm.js.org/) is installed globally `npm i pnpm -g`
- Clone this repository `git clone https://github.com/panoply/liquify.git`
- Run `pnpm i`
- Run `pnpm build`

The project will be complied and all packages will build. You can `cd` into any package or alternatively you can run `pnpm dev` from workspace root to execute a global watch.

> It is recommended to `cd` into the packages and conduct development from within the package opposed to using the global watch command.

### Development

All packages build using the powerful [Rollup](https://rollupjs.org) bundler. Each package contain a `rollup.config.mjs` file. Each contained package follows a standardized script execution pattern, so the same commands be called from both the workspace root or within a package.

```cli
pnpm dev               Watch input files/directories and rebuild on changes
pnpm build  --flags    Build production/development bundles
pnpm test   --flags    Execute and run a bunch of tests
pnpm publish           Publish package to third party services, eg: npm registry
pnpm package           Package compression of bundles like pnpm pack
-w, --watch            Watch input files/directories and rebuild on changes
-d, --dev              Development build and/or bundle
-p, --prod             Production build and/or bundle
--dry-run              Dry run the command
```

<img src="https://raw.githubusercontent.com/panoply/liquify/next/assets/line.svg?token=ABVXCLDIDMNQ3NJPEQ73NTLAXPZLE" />

##### CONTRIBUTORS

Want to contribute? Shoot me an [email][mailto:n.savvidis@gmx.com].

🥛 <small>[Νίκος Σαβίδης](mailto:n.savvidis@gmx.com)</small> <img align="right" src="https://img.shields.io/badge/-@kaossissel-1DA1F2?logo=twitter&logoColor=fff" />
<br>
🍔 <small>[Joseph Curtis](#)</small> <img align="right" src="https://img.shields.io/badge/-@jCurt-1DA1F2?logo=twitter&logoColor=fff" />

##### ACKNOWLEDGEMENTS

Liquify took a considerable amount of time to build. Many sleepless nights and a lot of hours were poured into the project and not many were willing to take on the task. Thanks to all those who used to previous version of this extension and a special thanks to a couple of developers that frequent the [Shopify Developers](https://discord.com/channels/597504637167468564/597507881419407404) discord channel.

- [Mansedan](#)
- [Wolf Grey](#)
- [Dave W](#)
