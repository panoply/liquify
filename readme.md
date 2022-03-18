<img src="https://img.shields.io/circleci/build/github/panoply/liquify/circleci-project-setup?token=54a787fdd39139be0add226455eb4d07f34f9d3f&style=flat-square&logo=CircleCI&label=&labelColor=555" align="left" />&nbsp;&nbsp;<img align="left" src="https://img.shields.io/librariesio/release/npm/@liquify/specs?style=flat-square&label=&logoWidth=28&labelColor=555&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCA5LjMzIj48dGl0bGU+bnBtPC90aXRsZT48cGF0aCBkPSJNMCwwVjhINi42N1Y5LjMzSDEyVjhIMjRWMFpNNi42Nyw2LjY2SDUuMzN2LTRINHY0SDEuMzRWMS4zM0g2LjY3Wm00LDBWOEg4VjEuMzNoNS4zM1Y2LjY2SDEwLjY3Wm0xMiwwSDIxLjM0di00SDIwdjRIMTguNjd2LTRIMTcuMzR2NEgxNC42N1YxLjMzaDhabS0xMi00SDEyVjUuMzNIMTAuNjZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+" />
<br>

<img src="https://github.com/panoply/liquify/blob/next/assets/github-banner-center.gif?raw=true"  atl="Liquify Logo"  width="100%">

# Liquify

Language tooling for the [Liquid Template Language](#). Liquify provides IDE capabilities to developers working with Liquid and its multiple variations. Contained in this monorepo repository is various packages and modules used by the Liquify text editor extension available in [VSCode](https://code.visualstudio.com).

- [Documentation](https://liquify.dev)
- [VSCode Extension](#)

### Why

The Liquid template language has been around for a long time. Created by Shopify CEO [Tobi Lütke](https://twitter.com/tobi) it is leveraged by hundreds of SaaS services and thousands of open source projects. Despite Liquid being actively maintained by Shopify and the foundation of its storefront theme development very little effort has been made by the company to provide modern IDE features for those developers working within environments that leverage this language.

Liquify was created to solve this issue and provide everything required for Liquid and Shopify theme projects. It aims to deliver powerful editor capabilities that enrich the programing experience and lives of developers.

### Pricing / License

Liquify is currently free to use in this alpha pre-release stage. A yearly licensing cost may _potentially_ be incurred for those who want features which pertain to the Shopify variation. There are no plans as of yet to implement this pay wall so it exists free to use with all features available to all users.

###### IMPORTANT

**Packages may operating under [MIT](https://mit-license.org/), [PROPRIETARY](#) or [CC BY-NC-ND 4.0](#). Packages operating under [PROPRIETARY](#) consider source code as [Trade Secret](https://en.wikipedia.org/wiki/Proprietary_software#Types). Though code is public, please be aware of the licensing imposed upon each package.**

### Client Packages

These packages are the text editor [LSP](https://microsoft.github.io/language-server-protocol/specifications/specification-current/) clients.

- [@liquify/vscode](#)

### Core Packages

These packages are considered the _core_ modules of the project.

- [@liquify/liquid-parser](#)
- [@liquify/liquid-language-server](#)
- [@liquify/liquid-language-specs](#)
- [@liquify/prettify](#)
- [@liquify/schema-specs](#)
- [@liquify/syncify](#)

### Utility Packages

These packages are mostly project specific [Rollup](https://rollupjs.org) plugins.

- [@liquify/cryptographer](#)
- [@liquify/rollup-cryptospec](#)
- [@liquify/rollup-obfuscator](#)
- [@liquify/rollup-enums](#)
- [@liquify/rollup-utils](#)
- [@liquify/rollup-watch](#)

### Config Packages

These packages are the sharable configurations for the development workspace.

- [@liquify/eslint-config](#)
- [@liquify/prettier-config](#)
- [@liquify/rollup-config](#)
- [@liquify/tsconfig](#)

## Contributing

The project is a monorepo that uses [pnpm](https://pnpm.js.org/) for dependency and workspace management. Development is intended to be conducted within the [vscode](https://code.visualstudio.com/) text editor.

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
pnpm dev                 Watch input files/directories and rebuild on changes
pnpm build               Build production/development bundles
pnpm test **    --flags  Tests a file in watch mode, use <pnpm test dev> in development
pnpm test:cases --flags  Runs all test which exists within /cases directory
pnpm publish             Publish package to third party services, eg: npm registry
pnpm package             Package compression of bundles like pnpm pack
-w, --watch              Watch input files/directories and rebuild on changes
-d, --dev                Development build and/or bundle
-p, --prod               Production build and/or bundle
--dry-run                Dry run the command
```

<img src="https://raw.githubusercontent.com/panoply/liquify/build/assets/line.svg?token=ABVXCLEXKEVWIXMT4M2GCSLBAUC6A" />

##### CONTRIBUTORS

Want to contribute? Shoot me an [email](mailto:n.savvidis@gmx.com).

🥛 <small>[Νίκος Σαβίδης](mailto:n.savvidis@gmx.com)</small> <img align="right" src="https://img.shields.io/badge/-@kaossissel-1DA1F2?logo=twitter&logoColor=fff" />
<br>
🍔 <small>[Joseph Curtis](#)</small> <img align="right" src="https://img.shields.io/badge/-@jCurt-1DA1F2?logo=twitter&logoColor=fff" />

##### ACKNOWLEDGEMENTS

Liquify took a considerable amount of time to build. Many sleepless nights and a lot of hours were poured into the project as not many were willing to take on the task. Thanks to all those who used the previous version of this extension and a special thanks to a couple of developers who were key players in the overall approach

- [Mansedan](#)
- [Dave W](#)
