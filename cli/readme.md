[![license](https://img.shields.io/badge/license-proprietary-pink.svg?style=popout-square)](#) &nbsp; ![CircleCI](https://img.shields.io/circleci/build/github/panoply/liquify/circleci-project-setup?token=54a787fdd39139be0add226455eb4d07f34f9d3f) &nbsp; ![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/@liquify/specs) &nbsp; ![Twitter URL](https://img.shields.io/twitter/url?label=%40sisselsiv&style=social&url=https%3A%2F%2Ftwitter.com%2Fsisselsiv)

# @liquify/cli

Command line tooling for propietary and open source packages of the [Liquify IDE](#) extension. This module is closed source and avilable on the npm registery exclusively for packages which use the `@liquify/*` organization name.

## Why?

[Liquify](https://liquify.dev) is private monorepo multi-repository project that operates on a freemium licensing model. The tool is made up of a collection of open and closed source packages which use this CLI to perform project wide operations like bundling, publishments, testing and more.

## Usage

This module is shipped as dependency of various open and closed source Liquify packages. It's designed to operate in Liquify specific projects and therefore

## Commands

| Command   | Repository            |
| --------- | --------------------- |
| `init`    | [packages/grammar](#) |
| `client`  | [cli](#)              |
| `grammar` | [packages/specs](#)   |
| `server`  | [packages/schema](#)  |
| `schema`  | [packages/server](#)  |
| `specs`   | [packages/grammar](#) |
| `publish` | [packages/grammar](#) |
| `package` | [packages/grammar](#) |
| `website` | [packages/grammar](#) |

## Flags

```cli
-c, --config  <file>      Use a .liquifyrc.json configuration file
-m, --main    <file>      Define a main file entry to use (optional)
-i, --input   <glob>      Input directory path or file
-o, --output  <dir>       Output directory path or file
-w, --watch               Watch input files/directories and rebuild on changes
-d, --dev                 Development build and/or bundle
-p, --prod                Production build and/or bundle
-v, --version             Show version number
-h, --help                Show this help message
--preinstall              Run the pre-install NPM script of package
--postinstall             Run the post-install NPM script of package
```

## Contributing

This poject command line tooling for open and closed source proprietary software. Cont distributed version avilable on public NPM registery has been encrypted

<hr>

🥛 <small>Laced with Vellocet by [Νίκος Σαβίδης](mailto:nicos@gmx.com)</small>
