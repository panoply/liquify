# Liquify

A closed source LSP ([Language Sever Protocol](#)) implementation for the [Liquid Templating Language](#). This repository contains proprietary code used by the [Liquify](#) extension/package IDE tool.

### Repositories

- [panoply/liquify-vscode](#)
- [panoply/liquify-atom](#)
- [panoply/liquify-subime](#)
- [panoply/liquify.dev](#)

# Setup

The project is a combination monorepo/multirepo that uses [pnpm](#) for dependency and workspace management. The project contains both proprietary and open sourced packages. The open source packages are deployed to public repositiories hosted on Github.

> Development is intended to be conducted within the [vscode](#) text editor

### Install

- Ensure [pnpm](#) is installed globally `npm i pnpm -g`
- Clone this repository `git clone https://github.com/panoply/liquify.git`
- Run `pnpm install`

### Commands

| Command            | Description                                                |
| ------------------ | ---------------------------------------------------------- |
| `pnpm run cli`     | Starts the interactive CLI                                 |
| `pnpm run dev`     | Starts debugger, bundler and watchers for entire project   |
| `pnpm run build`   | Builds the production exports of Liquify                   |
| `pnpm run grammar` | Bundles grammar tag names according to specifications      |
| `pnpm run specs`   | Bundles and exports the Liquid Specifications              |
| `pnpm run schemas` | Exports Liquify JSON schema stores to required directories |
| `pnpm run website` | Starts 11ty and Liquify website documentation development  |
| `pnpm run publish` | Initializes the interactive CLI publisher                  |
| `pnpm run test`    | Runs a bunch of tests using Mocha                          |

### Interactive CLI

Liquify provides an interactive CLI that allows you to run common tasks. The interactive CLI will provide shortcut execution for Git operations, deployments, publishments, bundling and more. You can initialize the interactive CLI by running `pnpm run cli` command and following the prompts.

> Unless you have verified SHA, publishing to some service providers may be restricted, such as the vscode [marketplace](#) or sublime [Package Control](#).

# Bundling

Bundles are compiled using [Rollup](#).

# Packages

Liquify is split up into multiple parts. Directories contained within the `packages` directory is where all logic for the tool is kept.

- [packages/clients](#)
- [packages/grammar](#)
- [packages/schema](#)
- [packages/server](#)
- [packages/specs](#)

### Supported Editors

Liquify is split up into multiple parts. Directories contained within the `packages` directory is where you will find the LSP `clients` and `sever` implementations and in addition to those 4 additional directories.

- [atom](#)
- [sublime](#)
- [vscode](#)
