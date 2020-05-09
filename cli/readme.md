## <img src="https://img.shields.io/circleci/build/github/panoply/liquify/circleci-project-setup?token=54a787fdd39139be0add226455eb4d07f34f9d3f&style=flat-square&logo=CircleCI&label=&labelColor=555" align="left" />&nbsp;&nbsp;<img align="left" src="https://img.shields.io/librariesio/release/npm/@liquify/specs?style=flat-square&label=&logoWidth=28&labelColor=555&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCA5LjMzIj48dGl0bGU+bnBtPC90aXRsZT48cGF0aCBkPSJNMCwwVjhINi42N1Y5LjMzSDEyVjhIMjRWMFpNNi42Nyw2LjY2SDUuMzN2LTRINHY0SDEuMzRWMS4zM0g2LjY3Wm00LDBWOEg4VjEuMzNoNS4zM1Y2LjY2SDEwLjY3Wm0xMiwwSDIxLjM0di00SDIwdjRIMTguNjd2LTRIMTcuMzR2NEgxNC42N1YxLjMzaDhabS0xMi00SDEyVjUuMzNIMTAuNjZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+" />

<!-- NPM BANNER  -->

<br><br>

<h3 align="center">CLOSED SOURCE PACKAGE</h3>
<h6 align="center">THIS MODULE IS USED FOR <a href="https://liquify.dev">PROPRIETARY</a> SOFTWARE</h6>
<br><br>

# @liquify/cli

This module is avialible on the npm registery exclusively for [@liquify](#) packages. This is a closed source command line tool used by collaborators and contributors working on propietary and/or open source packages of the [Liquify](#) text editor extension.

## Why?

[Liquify](https://liquify.dev) is private mono/multi repository project that operates on a freemium licensing model. The project ships proprietarty, open and closed sourced modules that use this cli to perform package specific operations based on development workspace.

## Usage <img align="right" src="https://pnpm.js.org/img/logos/pnpm-standard.svg" width="30">

This package is a dependency module. Commands are preset to package `scripts` in [@liquify](#) modules. Liquify uses the [Pnpm Package Manager](#) for working with the npm registery and will enforce this upon developers working with the code base.

```cli
$ pnpx liquify <pkg> --flags
```

<details>
<summary>
  Dependents
</summary>
<p>

- [@liquify/atom](#)
- [@liquify/liquid-language-server](#)
- [@liquify/liquid-language-grammars](#)
- [@liquify/sublime](#)
- [@liquify/vscode](#)
- [@liquify/liquify.dev](#)

</p>
</details>

## Commands

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

<img src="https://raw.githubusercontent.com/panoply/liquify/next/assets/line.svg?token=ABVXCLHQXKGG6A6H7G2JQGK6YBWSS" />

🥛 <small>Laced with [Vellocet](#) by [Νίκος Σαβίδης](mailto:nicos@gmx.com)</small> <img align="right" src="https://img.shields.io/badge/-@sisselsiv-1DA1F2?logo=twitter&logoColor=fff" />
