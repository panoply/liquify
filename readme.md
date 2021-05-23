<img src="https://img.shields.io/circleci/build/github/panoply/liquify/circleci-project-setup?token=54a787fdd39139be0add226455eb4d07f34f9d3f&style=flat-square&logo=CircleCI&label=&labelColor=555" align="left" />&nbsp;&nbsp;<img align="left" src="https://img.shields.io/librariesio/release/npm/@liquify/specs?style=flat-square&label=&logoWidth=28&labelColor=555&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCA5LjMzIj48dGl0bGU+bnBtPC90aXRsZT48cGF0aCBkPSJNMCwwVjhINi42N1Y5LjMzSDEyVjhIMjRWMFpNNi42Nyw2LjY2SDUuMzN2LTRINHY0SDEuMzRWMS4zM0g2LjY3Wm00LDBWOEg4VjEuMzNoNS4zM1Y2LjY2SDEwLjY3Wm0xMiwwSDIxLjM0di00SDIwdjRIMTguNjd2LTRIMTcuMzR2NEgxNC42N1YxLjMzaDhabS0xMi00SDEyVjUuMzNIMTAuNjZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+" />
<br>

<img src="https://github.com/panoply/liquify/blob/next/assets/github-banner-center.gif?raw=true"  atl="Liquify Logo"  width="100%">

# Liquify

Language tooling for the [Liquid Template Language](#). Liquify brings modern IDE features to developers working with Liquid and its multiple variations. Contained in this repository is various packages and modules used by the Liquify text editor extension/plugin available in [VSCode](https://code.visualstudio.com), [Sublime](#) and [Atom](#).

###### IMPORTANT

**Liquify operates on a [Freemium](#) licensing model and distributes the codebase as a series of proprietary, closed and open source licensed packages. All developers who are not employed or have any connection to Shopify can browse the code. If you work for Shopify, please go away.**

### Why

The Liquid template language has been around for a long time. Originally created by [Tobi Lütke](https://twitter.com/tobi) it is used by other open source projects like Jekyll, Eleventy and long list of SaaS services. Despite Shopify existing as a multi-billion dollar company who hire thousands of engineers they have failed to brings support for Liquid in a modern development ecosystem. Liquify was created to solve this issue and provide developers the tooling they to their fingertips.

### Pricing / License

Liquify is currently free to use as it exists in an alpha pre-release stage. A yearly licensing cost will be incurred for those who want all the features for the Shopify variation upon its official 1.0 release.

### Packages

- [@liquify/liquid-language-server](#)
- [@liquify/liquid-parser](#)
- [@liquify/liquid-grammar](#)
- [@liquify/liquid-linter](#)
- [@liquify/schema-stores](#)
- [@liquify/liquid-language-specs](#)
- [@liquify/cryptographer](#)
- [@liquify/rollup-plugin-cryptospec](#)
- [@liquify/rollup-plugin-globs](#)
- [@liquify/rollup-plugin-obfuscator](#)
- [@liquify/rollup-plugin-utils](#)

###### IMPORTANT

**Packages operating on a [PROPRIETARY](#) or [CC BY-NC-ND 4.0](#) license consider source code as [Trade Secret](https://en.wikipedia.org/wiki/Proprietary_software#Types) so their production bundles are mangled, minified and obfuscated upon prior to distribution. Objects and large data sources like [Liquid Specifications](#) use a [aes-256-gcm](https://en.wikipedia.org/wiki/Galois/Counter_Mode) encryption algorithm.**

# Setup

The project is a combination monorepo/multirepo that uses [pnpm](https://pnpm.js.org/) for dependency and workspace management. Development is intended to be conducted using the [vscode](https://code.visualstudio.com/) text editor. You can use the [liquify.code-workspace](#) or traditional workspace hierarchy. The development environments requires the following:

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

### Development

All packages build using the powerful [Rollup](https://rollupjs.org) bundler and all contain a `rollup.config.js` file. The entire monorepo and several of the modules may use Rollup for compiling or generating virtual components. Each package provides a standardized command execution. If you call these commands from workspace root execution will run globally on each package.

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

<img src="https://raw.githubusercontent.com/panoply/liquify/next/assets/line.svg?token=ABVXCLHQXKGG6A6H7G2JQGK6YBWSS" />

🥛 <small>[Νίκος Σαβίδης](mailto:nicos@gmx.com)</small> <img align="right" src="https://img.shields.io/badge/-@sisselsiv-1DA1F2?logo=twitter&logoColor=fff" />
