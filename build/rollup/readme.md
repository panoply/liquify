## <img src="https://img.shields.io/circleci/build/github/panoply/liquify/circleci-project-setup?token=54a787fdd39139be0add226455eb4d07f34f9d3f&style=flat-square&logo=CircleCI&label=&labelColor=555" align="left" />&nbsp;&nbsp;<img align="left" src="https://img.shields.io/librariesio/release/npm/@liquify/specs?style=flat-square&label=&logoWidth=28&labelColor=555&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCA5LjMzIj48dGl0bGU+bnBtPC90aXRsZT48cGF0aCBkPSJNMCwwVjhINi42N1Y5LjMzSDEyVjhIMjRWMFpNNi42Nyw2LjY2SDUuMzN2LTRINHY0SDEuMzRWMS4zM0g2LjY3Wm00LDBWOEg4VjEuMzNoNS4zM1Y2LjY2SDEwLjY3Wm0xMiwwSDIxLjM0di00SDIwdjRIMTguNjd2LTRIMTcuMzR2NEgxNC42N1YxLjMzaDhabS0xMi00SDEyVjUuMzNIMTAuNjZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+" />

<!-- NPM BANNER  -->

<br>

# @liquify/rollup-bundle

This package is available on the npm registry exclusively for [@liquify](#) modules and is used when developing and working on the codebase.

## Why?

Liquify's private and public packages use this tool as a dev dependency so as to provide package specific bundle operations within its monorepo workspace and the open sourced modules apart of the codebase.

# Usage

Each package in the Liquify monorepo contains a `rollup.config.js` file. The exported build configurations use the bundle which returns a function with parameters that can be used when composing the rollup config.

```js
import { rollup } from "@liquify/rollup-bundle";
import babel from '@rollup/plugin-babel'
import copy from 'rollup-plugin-copy'

export default rollup(pkg, {
  path,
  plugins: { minifyJSON, replace }
}) => ({
  input: path.pkg('extension/index.js'),
  plugins: [
    replace({
      delimeters: [ '\\b(?:require)\\(\'?"?', '\'?"?\\)' ],
      tags: [ 'some-module' ]
    }),
    babel({
      babelHelpers: 'runtime',
      babelOptions: path.pkg('.babelrc')
    }),
    copy({
      targets: [
        {
          src: path.pkg(['/syntaxes/**/*.json']),
          dest: `${packages.vscode.path}/package/syntaxes`,
          transform: minifyJSON,
          verbose: true
        },
        {
          src: path.pkg(['readme.md', 'changelog.md'])
          dest: path.pkg('package'),
          transform: minifyJSON,
          verbose: true
        }
      ]
    })
  ],
  output: {
    file: path.pkg('package/index.js'),
    format: 'cjs',
    sourcemap: true,
    external: [
      'vscode',
      'vscode-languageclient',
      'liquid-language-server'
    ]
  }
})
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
