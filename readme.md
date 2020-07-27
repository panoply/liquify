<img src="https://img.shields.io/circleci/build/github/panoply/liquify/circleci-project-setup?token=54a787fdd39139be0add226455eb4d07f34f9d3f&style=flat-square&logo=CircleCI&label=&labelColor=555" align="left" />&nbsp;&nbsp;<img align="left" src="https://img.shields.io/librariesio/release/npm/@liquify/specs?style=flat-square&label=&logoWidth=28&labelColor=555&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCA5LjMzIj48dGl0bGU+bnBtPC90aXRsZT48cGF0aCBkPSJNMCwwVjhINi42N1Y5LjMzSDEyVjhIMjRWMFpNNi42Nyw2LjY2SDUuMzN2LTRINHY0SDEuMzRWMS4zM0g2LjY3Wm00LDBWOEg4VjEuMzNoNS4zM1Y2LjY2SDEwLjY3Wm0xMiwwSDIxLjM0di00SDIwdjRIMTguNjd2LTRIMTcuMzR2NEgxNC42N1YxLjMzaDhabS0xMi00SDEyVjUuMzNIMTAuNjZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+" />
<br>

# Liquify

An extension/package tool for the [Liquid Templating Language](#). Liquify uses the [Language Sever Protocol](#) implementation to provide modern IDE tooling and features to developers working with Liquid and using text editors like [VSCode](#), [Sublime](#) and [Atom](#). The tool operates on a [Freemium](#) licensing model and distributes the codebase as a series of proprietary, closed and open source licenced packages.

### Packages

- [@liquify/cli](#)
- [@liquify/liquid-language-server](#)
- [@liquify/liquid-parser](#)
- [@liquify/liquid-grammar](#)
- [@liquify/liquid-linter](#)
- [@liquify/liquid-schema-stores](#)
- [@liquify/liquid-language-specs](#)
- [@liquify/cryptographer](#)
- [@liquify/rollup-plugin-cryptospec](#)
- [@liquify/rollup-plugin-globs](#)
- [@liquify/rollup-plugin-logger](#)
- [@liquify/rollup-plugin-obfuscator](#)
- [@liquify/rollup-plugin-supplant](#)
- [@liquify/rollup-plugin-utils](#)

| Repository                          | Description                                          | License              |
| ----------------------------------- | ---------------------------------------------------- | -------------------- |
| [@liquify/cli](#)                   | CLI tool used for development on Liquify packages.   | [CC BY-NC-ND 4.0](#) |
| [@liquify/rollup-plugins](#)        | Various Rollup plugins used by Liquify packages      | [MIT](#)             |
| [@liquify/path-resolve](#)          | Path resolver which detects workspace path           | [MIT](#)             |
| [@liquify/liquid-language-specs](#) | Liquid variation specification references.           | [PROPRIETARY](#)     |
| [@liquify/schema-stores](#)         | Schema Stores used for configuration files and JSON. | [CC BY-NC-ND 4.0](#) |
| [liquify.dev](#)                    | Liquify website for documentation and licensing.     | [CC BY-NC-ND 4.0](#) |
| [liquid-language-server](#)         | Liquid Language server implementation using LSP      | [PROPRIETARY](#)     |
| [liquify-atom ](#)                  | Atom Liquify package using Atom LSP Client           | [MIT](#)             |
| [liquify-sublime](#)                | Sublime Liquify package using Sublime LSP            | [MIT](#)             |
| [liquify-vscode](#)                 | VSCode Liquify extension using VSCode LSP Client     | [MIT](#)             |

###### IMPORTANT

**Packages operating on a [PROPRIETARY](#) or [CC BY-NC-ND 4.0](#) license consider source code as [Trade Secret](https://en.wikipedia.org/wiki/Proprietary_software#Types) so their producton bundles are mangled, minified and obfuscated upon prior to distribution. Objects and large data sources like [Liquid Specifications](#) use a [aes-256-gcm](https://en.wikipedia.org/wiki/Galois/Counter_Mode) encryption algorithm.**

# Setup

The project is a combination monorepo/multirepo that uses [pnpm](#) for dependency and workspace management. Development is intended to be conducted using the [vscode](#) text editor. You can use the [liquify.code-workspace](#) or traditional workspace hierarchy. The development environments requires the following:

<details>
<summary>
  Pre-requisites
</summary>
<p>

- [Git](#)
- [Node](#)
- [Pnpm](#)
- [VS Code](#)

</p>
</details>

### Installation

- Ensure [pnpm](#) is installed globally `npm i pnpm -g`
- Clone this repository `git clone https://github.com/panoply/liquify.git`
- Run `pnpm install`

# CLI

Liquify provides an interactive CLI that allows you to run common tasks. The interactive CLI will provide shortcut execution for Git operations, deployments, publishments, bundling and more. You can initialize the interactive CLI by running `pnpm run cli` command and following the prompts.

### Commands

```cli
bundle   <pkg>   --flags    Define a main file entry to use (optional)
git      <pkg>   --flags    Various Git related operations
peep     <pkg>   --flags    Peep into JSON and other files via the cli
publish  <pkg>   --flags    Publish package to third party services, eg: npm registry
package  <pkg>   --flags    Package compression of bundles like pnpm pack
test     <pkg>   --flags    Execute and run a bunch of tests
-c, --config  <file>        Build configuration file defaults to "build.config.json"
-i, --input   <glob>        Input directory path glob pattern, eg: "--input dir/**/*.json"
-o, --output  <dir>         Output directory path, eg: "--output `path/to/output`"
-w, --watch                 Watch input files/directories and rebuild on changes
-d, --dev                   Development build and/or bundle
-p, --prod                  Production build and/or bundle
-v, --version               Show version number
-h, --help                  Show this help message
--preinstall                Run the pre-install NPM script of package
--postinstall               Run the post-install NPM script of package
--dry-run                   Dry run the command
```

### Interactive CLI

```cli
$ pnpx liquify
```

### PNPM Scripts

```cli
pnpm run dev
pnpm run build
pnpm run pack
pnpm run peep
pnpm run status
pnpm run test
```

<img src="https://raw.githubusercontent.com/panoply/liquify/next/assets/line.svg?token=ABVXCLHQXKGG6A6H7G2JQGK6YBWSS" />

🥛 <small>Laced with [Vellocet](#) by [Νίκος Σαβίδης](mailto:nicos@gmx.com)</small> <img align="right" src="https://img.shields.io/badge/-@sisselsiv-1DA1F2?logo=twitter&logoColor=fff" />
