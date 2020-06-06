<img src="https://img.shields.io/circleci/build/github/panoply/liquify/circleci-project-setup?token=54a787fdd39139be0add226455eb4d07f34f9d3f&style=flat-square&logo=CircleCI&label=&labelColor=555" align="left" />&nbsp;&nbsp;<img align="left" src="https://img.shields.io/librariesio/release/npm/@liquify/specs?style=flat-square&label=&logoWidth=28&labelColor=555&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCA5LjMzIj48dGl0bGU+bnBtPC90aXRsZT48cGF0aCBkPSJNMCwwVjhINi42N1Y5LjMzSDEyVjhIMjRWMFpNNi42Nyw2LjY2SDUuMzN2LTRINHY0SDEuMzRWMS4zM0g2LjY3Wm00LDBWOEg4VjEuMzNoNS4zM1Y2LjY2SDEwLjY3Wm0xMiwwSDIxLjM0di00SDIwdjRIMTguNjd2LTRIMTcuMzR2NEgxNC42N1YxLjMzaDhabS0xMi00SDEyVjUuMzNIMTAuNjZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+" />

<br>

# @liquify/rollup-plugin-utils

Various rollup plugin utilities for [Liquify](#) IDE extension/package. These utilities are collection of commonly used modules in the development workspace.

## Why?

In the Liquify development workspace modules are bundled using [Rollup](#) and a collection of various project specific plugins that assist in bundling process of various packages. The utilties exported in this module provide a clean and easy way to execute commonly used functions.

## Install

```cli
<pnpm|npm|yarn> i @liquify/rollup-plugin-utils --save-dev
```

## Usage

```js
import globs from "@liquify/rollup-plugin-globs";
import { jsonmin } from "@liquify/rollup-plugin-utils";

export default {
  input: "src/index.js",
  output: {
    dir: "output",
    format: "cjs",
  },
  plugins: [
    globs({
      globs: ["dir/**/*.json", "assets/*.svg"],
      dest: "dest",
      clean: true,
      transform: jsonmin,
    }),
  ],
};
```

## Contributing

This package licensed under MIT but it exists as part of a monorepo that is closed source. Currently, any contributions, issues and/or feature requests by end users is not possible.

## Author

🥛 <small>Laced with [Vellocet](#) by [Νίκος Σαβίδης](mailto:nicos@gmx.com)</small> <img align="right" src="https://img.shields.io/badge/-@sisselsiv-1DA1F2?logo=twitter&logoColor=fff" />
