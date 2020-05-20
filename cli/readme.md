## <img src="https://img.shields.io/circleci/build/github/panoply/liquify/circleci-project-setup?token=54a787fdd39139be0add226455eb4d07f34f9d3f&style=flat-square&logo=CircleCI&label=&labelColor=555" align="left" />&nbsp;&nbsp;<img align="left" src="https://img.shields.io/librariesio/release/npm/@liquify/specs?style=flat-square&label=&logoWidth=28&labelColor=555&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCA5LjMzIj48dGl0bGU+bnBtPC90aXRsZT48cGF0aCBkPSJNMCwwVjhINi42N1Y5LjMzSDEyVjhIMjRWMFpNNi42Nyw2LjY2SDUuMzN2LTRINHY0SDEuMzRWMS4zM0g2LjY3Wm00LDBWOEg4VjEuMzNoNS4zM1Y2LjY2SDEwLjY3Wm0xMiwwSDIxLjM0di00SDIwdjRIMTguNjd2LTRIMTcuMzR2NEgxNC42N1YxLjMzaDhabS0xMi00SDEyVjUuMzNIMTAuNjZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+" />

<!-- NPM BANNER  -->

<br>

# @liquify/cli

This package is available on the npm registry exclusively for [@liquify](#) modules. This is a **closed source** command line tool which is used by collaborators and contributors working on proprietary and/or open source packages of the [Liquify](https://liquify.dev) text-editor extension/plugin.

**Distributed code provided in this package has been mangled, minified, obfuscated and encrypted using an [aes-256-gcm](https://en.wikipedia.org/wiki/Galois/Counter_Mode) algorithm. The resulting production bundle is enigmatic so as to prevent reverse engineering the tool and its dependents without capable context of the source.**

## Why?

Liquify's private and public packages use this cli tool as a dependency module to provide package specific build scripts and bundle operations to open and closed source development workspaces. The cli is an effective and performant solution when working with the Liquify code base and allows for parts of the project to be open sourced and contribution friendly without sacraficing the integitry of proprietary packages.

# Usage <img align="right" src="https://raw.githubusercontent.com/panoply/liquify/next/assets/pnpm.svg?token=ABVXCLHHRU3WQKQOVKHYPIS6YBYYY" width="40" height="40">

Commands are preset in [@liquify](#) packages and can are executed in run scripts. When working on the cli dependents you will need to use the [Pnpm Package Manager](#) to work with the npm registry and the cli will enforce this.

```cli
$ pnpx liquify <cmd> <pkg> --flags
```

<details>
<summary>
  Dependents
</summary>
<p>

- [@liquify/atom](#)
- [@liquify/liquid-language-server](#)
- [@liquify/liquid-language-grammars](#)
- [@liquify/liquid-language-specs](#)
- [@liquify/sublime](#)
- [@liquify/vscode](#)
- [@liquify/liquify.dev](#)

</p>
</details>

## Commands

```cli
dev      <pkg>   --flags    Define a main file entry to use (optional)
build    <pkg>   --flags    Define a main file entry to use (optional)
git      <pkg>   --flags    Various Git related operations
peep     <pkg>   --flags    Peep into JSON and other files via the cli
publish  <pkg>   --flags    Publish package to third party services, eg: npm registry
package  <pkg>   --flags    Package compression of bundles like pnpm pack
test     <pkg>   --flags    Execute and run a bunch of tests
```

## Flags

```cli
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

## Config

Packages distributed by Liquify might be using a `build.config.json` configuration file to help generate bundles and provide the cli with additional build options. Configuration settings available in `build.config.json` files use a preset [JSON Schema Store](#) which help prevent incorrect or invalid settings being defined on a per-package basis. In order to use a build config file, you will need use the `-c` or `--config` flag and instruct the cli to look for a build configuration file.

```cli
$ pnpx liquify <cmd> <pkg> -c
```

<img src="https://raw.githubusercontent.com/panoply/liquify/next/assets/line.svg?token=ABVXCLHQXKGG6A6H7G2JQGK6YBWSS" />

🥛 <small>Laced with [Vellocet](#) by [Νίκος Σαβίδης](mailto:nicos@gmx.com)</small> <img align="right" src="https://img.shields.io/badge/-@sisselsiv-1DA1F2?logo=twitter&logoColor=fff" />
