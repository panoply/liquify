<img align="left" src="https://img.shields.io/badge/closed%20source%20-hotpink?label=&logoWidth=20&logo=github&logoColor=ffffff&labelColor=555&style=flat-square" /><img align="left" src="https://img.shields.io/circleci/build/github/panoply/liquify/circleci-project-setup?token=54a787fdd39139be0add226455eb4d07f34f9d3f&style=flat-square&logo=CircleCI&label=&labelColor=555" /><img align="left" src="https://img.shields.io/librariesio/release/npm/@liquify/specs?style=flat-square&label=&logoWidth=28&labelColor=555&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCA5LjMzIj48dGl0bGU+bnBtPC90aXRsZT48cGF0aCBkPSJNMCwwVjhINi42N1Y5LjMzSDEyVjhIMjRWMFpNNi42Nyw2LjY2SDUuMzN2LTRINHY0SDEuMzRWMS4zM0g2LjY3Wm00LDBWOEg4VjEuMzNoNS4zM1Y2LjY2SDEwLjY3Wm0xMiwwSDIxLjM0di00SDIwdjRIMTguNjd2LTRIMTcuMzR2NEgxNC42N1YxLjMzaDhabS0xMi00SDEyVjUuMzNIMTAuNjZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+" />
<br>

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
