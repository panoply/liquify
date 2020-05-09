## <img src="https://img.shields.io/circleci/build/github/panoply/liquify/circleci-project-setup?token=54a787fdd39139be0add226455eb4d07f34f9d3f&style=flat-square&logo=CircleCI&label=&labelColor=555" align="left" />&nbsp;&nbsp;<img align="left" src="https://img.shields.io/librariesio/release/npm/@liquify/specs?style=flat-square&label=&logoWidth=28&labelColor=555&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCA5LjMzIj48dGl0bGU+bnBtPC90aXRsZT48cGF0aCBkPSJNMCwwVjhINi42N1Y5LjMzSDEyVjhIMjRWMFpNNi42Nyw2LjY2SDUuMzN2LTRINHY0SDEuMzRWMS4zM0g2LjY3Wm00LDBWOEg4VjEuMzNoNS4zM1Y2LjY2SDEwLjY3Wm0xMiwwSDIxLjM0di00SDIwdjRIMTguNjd2LTRIMTcuMzR2NEgxNC42N1YxLjMzaDhabS0xMi00SDEyVjUuMzNIMTAuNjZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+" />

<!-- NPM BANNER  -->

<br><br>

<h3 align="center">CLOSED SOURCE PACKAGE</h3>
<h6 align="center">THIS MODULE IS USED FOR <a href="https://liquify.dev">PROPRIETARY</a> SOFTWARE</h6>
<br><br>

# @liquify/cli

This is a closed source command line tool used for the [Liquify IDE](#) extension/package and used propietary and open source modules. This project is closed source and avilable on the npm registery exclusively for packages which use the `@liquify/*` organization name.

## Why? <img src="https://image.flaticon.com/icons/svg/942/942751.svg" width="28" align="right" />

[Liquify](https://liquify.dev) is private monorepo multi-repository project that operates on a freemium licensing model. The tool is made up of a collection of open and closed source packages which use this CLI to perform project wide operations like bundling, publishments, testing and more.

## Usage <img align="right" src="https://pnpm.js.org/img/logos/pnpm-standard.svg" width="30">

This module is designed to only work with Liquify packages.

```cli
$ pnpx liquify <pkg> --flags
```

### Scripts

Commands are executed by running npm scripts from the `package.json` files of packages. The Liquify CLI and entire project is maintained with [pnpm](#).

## Commands <img src="https://image.flaticon.com/icons/svg/2535/2535381.svg" align="right" width="30">

```cli
bundle   <pkg>   --flags      Define a main file entry to use (optional)
git      <pkg>   --flags      Production build and/or bundle
peek     <pkg>   --flags      Production build and/or bundle
publish  <pkg>   --flags      Development build and/or bundle
package  <pkg>   --flags      Production build and/or bundle
test     <pkg>   --flags      Production build and/or bundle
```

### Flags

```cli
-c, --config  <file>          Use a .liquifyrc configuration file
-m, --main    <glob>          Define a main file entry to use (optional)
-i, --input   <glob>          Input directory path or file
-o, --output  <dir>           Output directory path or file
-w, --watch                   Watch input files/directories and rebuild on changes
-d, --dev                     Development build and/or bundle
-p, --prod                    Production build and/or bundle
-v, --version                 Show version number
-h, --help                    Show this help message
--preinstall                  Run the pre-install NPM script of package
--postinstall                 Run the post-install NPM script of package
--dry-run                     Dry run the command
```

## Contributing

This poject command line tooling for open and closed source proprietary software. Cont distributed version avilable on public NPM registery has been encrypted

## Dependents

This module is used by the following packages of the `@liquify` organization

- [@liquify/atom](#)
- [@liquify/liquid-language-server](#)
- [@liquify/liquid-language-grammars](#)
- [@liquify/sublime](#)
- [@liquify/vscode](#)
- [@liquify/liquify.dev](#)

###### &nbsp;

🥛 <small>Laced with Vellocet by [Νίκος Σαβίδης](mailto:nicos@gmx.com)</small> <img align="right" src="https://img.shields.io/badge/-@sisselsiv-1DA1F2?logo=twitter&logoColor=fff" />
