## <img src="https://img.shields.io/circleci/build/github/panoply/liquify/circleci-project-setup?token=54a787fdd39139be0add226455eb4d07f34f9d3f&style=flat-square&logo=CircleCI&label=&labelColor=555" align="left" />&nbsp;&nbsp;<img align="left" src="https://img.shields.io/librariesio/release/npm/@liquify/specs?style=flat-square&label=&logoWidth=28&labelColor=555&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCA5LjMzIj48dGl0bGU+bnBtPC90aXRsZT48cGF0aCBkPSJNMCwwVjhINi42N1Y5LjMzSDEyVjhIMjRWMFpNNi42Nyw2LjY2SDUuMzN2LTRINHY0SDEuMzRWMS4zM0g2LjY3Wm00LDBWOEg4VjEuMzNoNS4zM1Y2LjY2SDEwLjY3Wm0xMiwwSDIxLjM0di00SDIwdjRIMTguNjd2LTRIMTcuMzR2NEgxNC42N1YxLjMzaDhabS0xMi00SDEyVjUuMzNIMTAuNjZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+" />

<!-- NPM BANNER  -->

<br><br>

<h3 align="center">CLOSED SOURCE PACKAGE</h3>
<h6 align="center">THIS MODULE IS USED FOR <a href="https://liquify.dev">PROPRIETARY</a> SOFTWARE</h6>
<br><br>

# @liquify/cli

This package is avialible on the npm registery exclusively for [@liquify](#) modules. This is a **closed source** command line tool used by collaborators and contributors working on propietary and/or open source packages of the [Liquify](https://liquify.dev) IDE text editor extension/plugin. Distributed code provided in this package has been mangled, minified and encypted using an [aes-256-gcm](https://en.wikipedia.org/wiki/Galois/Counter_Mode) algorithm. The resulting production bundle is enigmatic which prevents reverse enginnering without capable context.

## Why?

Liquify is developed in private monorepo that operates on a freemium licensing model and ships proprietarty, open and closed source packages from a single/sub-tree git [metarepo](https://notes.burke.libbey.me/metarepo/#metarepo-architecture) (_mono_ + _multi_) repository.

Liquify's private (_proprietary_) and public (_open/closed source_) packages use this cli tool as a dependency module to provide `package.json` specific development build scripts and bundle operations in open sourced package development workspaces.

# Usage<img align="right" src="https://raw.githubusercontent.com/panoply/liquify/next/assets/pnpm.svg?token=ABVXCLHHRU3WQKQOVKHYPIS6YBYYY" width="40" height="40">

Commands are preset to package `scripts` in [@liquify/\*\*](#) modules and unless you are working at root level in Liquify code base you probably wont find yourself using the commands as the run script presets in each package will suffice. When working on the cli dependents you will need to use the [Pnpm Package Manager](#) to work with the npm registery and the cli will enforce this.

```cli
$ pnpx liquify <pkg> --flags
```

<details>
<summary>
  Dependents
</summary>
<p>

The following Liquify packages require the cli module as dependency and ship with preset run script commands or use methods available via the exported api.

- [@liquify/atom](#)
- [@liquify/liquid-language-server](#)
- [@liquify/liquid-language-grammars](#)
- [@liquify/sublime](#)
- [@liquify/vscode](#)
- [@liquify/liquify.dev](#)

</p>
</details>

### Commands

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
