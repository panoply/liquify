<img src="https://img.shields.io/circleci/build/github/panoply/liquify/circleci-project-setup?token=54a787fdd39139be0add226455eb4d07f34f9d3f&style=flat-square&logo=CircleCI&label=&labelColor=555" align="left" />&nbsp;&nbsp;<img align="left" src="https://img.shields.io/librariesio/release/npm/@liquify/specs?style=flat-square&label=&logoWidth=28&labelColor=555&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCA5LjMzIj48dGl0bGU+bnBtPC90aXRsZT48cGF0aCBkPSJNMCwwVjhINi42N1Y5LjMzSDEyVjhIMjRWMFpNNi42Nyw2LjY2SDUuMzN2LTRINHY0SDEuMzRWMS4zM0g2LjY3Wm00LDBWOEg4VjEuMzNoNS4zM1Y2LjY2SDEwLjY3Wm0xMiwwSDIxLjM0di00SDIwdjRIMTguNjd2LTRIMTcuMzR2NEgxNC42N1YxLjMzaDhabS0xMi00SDEyVjUuMzNIMTAuNjZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+" />

# @liquify/rollup-plugin-cryptospec

A Rollup plugin used for development on the [Liquify IDE](#) extension/package codebase. Facilitates encryption using [aes-256](https://en.wikipedia.org/wiki/Galois/Counter_Mode) algorithms. Transforms objects, strings and numbers. This plugin is intended to be consumed within the Liquify development workspace.

## Why?

Liquify operates on a freemium license model. Some parts of the codebase can be consumed via the public NPM registry which exposes closed source code and data. This module facilitates encryption so proprietary code and/or data becomes _enigmatic_ so as to prevent reverse engineering the tool without capable context.

## Install

```cli
<pnpm|npm|yarn> i @liquify/rollup-plugin-cryptospec --save-dev
```

## Usage

Inputs reference the Liquid specifications which is written in JSON. The plugin will hijack the inputs and generate a virtual entry `index.js` file. Each specification will be encoded and any additional `defaults` merged will each variation specification.

```js
import cryptospec from "@liquify/rollup-plugin-cryptospec";

export default {
  input: {
    a: "a.json",
    b: "b.json",
    c: "c.json",
  },
  output: {
    dir: "output",
    format: "cjs",
  },
  plugins: [
    cryptospec({
      password: process.env.MASTER_KEY,
      defaults: {
        filters: {
          type: "filter",
        },
        objects: {
          type: "object",
          filters: true,
          singular: true,
          global: false,
          deprecated: false,
          trims: true,
        },
        tags: {
          filters: false,
          singular: false,
          trims: true,
          deprecated: false,
        },
      },
    }),
  ],
};
```

## Contributing

This package licensed under [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/) but and exists as part of a monorepo that is mostly closed source. Contributions from outside developers is prohibited as the package only exists on the public NPM registry for consumption internally.

## Author

🥛 <small>[Νίκος Σαβίδης](mailto:nicos@gmx.com)</small> <img align="right" src="https://img.shields.io/badge/-@sisselsiv-1DA1F2?logo=twitter&logoColor=fff" />
