<img src="https://img.shields.io/circleci/build/github/panoply/liquify/circleci-project-setup?token=54a787fdd39139be0add226455eb4d07f34f9d3f&style=flat-square&logo=CircleCI&label=&labelColor=555" align="left" />&nbsp;&nbsp;<img align="left" src="https://img.shields.io/librariesio/release/npm/@liquify/specs?style=flat-square&label=&logoWidth=28&labelColor=555&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCA5LjMzIj48dGl0bGU+bnBtPC90aXRsZT48cGF0aCBkPSJNMCwwVjhINi42N1Y5LjMzSDEyVjhIMjRWMFpNNi42Nyw2LjY2SDUuMzN2LTRINHY0SDEuMzRWMS4zM0g2LjY3Wm00LDBWOEg4VjEuMzNoNS4zM1Y2LjY2SDEwLjY3Wm0xMiwwSDIxLjM0di00SDIwdjRIMTguNjd2LTRIMTcuMzR2NEgxNC42N1YxLjMzaDhabS0xMi00SDEyVjUuMzNIMTAuNjZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+" />

# @liquify/rollup-watch

Hard forked ESM version of [rollup-plugin-watch-assets](https://www.npmjs.com/package/rollup-plugin-watch-assets) that helps extend assets to the Rollup watch chokidar instance.

## Why?

Rollup is used to compose various packages across the Liquify workspace. This plugin assists in that process.

## Install

```cli
<pnpm|npm|yarn> i @liquify/rollup-watch --save-dev
```

## Usage

```js
import watch from "@liquify/rollup-watch";

export default {
  input: 'src/index.js,
  output: {
    dir: "output",
    format: "cjs",
  },
  plugins: [
    watch({
      ecma: 6
      , warnings: 'verbose'
      , compress: { passes: 2 }
    }),
  ],
};
```

## Contributing

This package licensed under MIT but it exists as part of a monorepo that is mostly closed source.

## Author

🥛 <small>[Νίκος Σαβίδης](mailto:nicos@gmx.com)</small> <img align="right" src="https://img.shields.io/badge/-@sisselsiv-1DA1F2?logo=twitter&logoColor=fff" />
