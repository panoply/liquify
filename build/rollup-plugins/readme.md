# Rollup Plugins

Liquify leverages the [Rollup](https://rollupjs.org/guide/en/) module bundler for transpilation. Packages within the Liquify project use these plugins to assist development process.

### Reasoning

The Rollup [plugin](https://rollupjs.org/guide/en/#plugin-development) API provides a efficient way to hook into the transpilation process when generating distributed bundles. Developing a Rollup plugin is rather simple and prevents the need of having to rely upon additional tooling.

### Plugins

#### [@liquify/rollup-plugin-cryptospec](https://github.com/panoply/liquify/tree/next/build/rollup-plugins/cryptospec)

Facilitates encryption using [aes-256](https://en.wikipedia.org/wiki/Galois/Counter_Mode) algorithms. Transforms objects, strings and numbers. The cryptospec plugin transforms the proprietary specifications into enigmatic strings exports.

#### [@liquify/rollup-plugin-obfuscator](https://github.com/panoply/liquify/tree/next/build/rollup-plugins/obfuscator)

Implements [JavaScript Obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator) and facilitates in obfuscation. This is a hard-fork of the current[rollup-plugin-javascript-obfuscator](https://github.com/javascript-obfuscator/) plugin which is using a deprecated API.

#### [@liquify/rollup-plugin-utils](https://github.com/panoply/liquify/tree/next/build/rollup-plugins/utils)

Various project specific rollup plugin utilities that are commonly used modules across the [Liquify](https://github.com/panoply/liquify) monorepo and included within package `rollup.config.js` files contained in the workspace.

### Usage

Plugins are installed as a development dependencies via `pnpm i` in packages.

```cli
pnpm i @liquify/rollup-plugin-* --save-dev
```

### Author

🥛 <small>[Νίκος Σαβίδης](mailto:nicos@gmx.com)</small> <img align="right" src="https://img.shields.io/badge/-@sisselsiv-1DA1F2?logo=twitter&logoColor=fff" />
