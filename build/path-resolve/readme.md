## <img src="https://img.shields.io/circleci/build/github/panoply/liquify/circleci-project-setup?token=54a787fdd39139be0add226455eb4d07f34f9d3f&style=flat-square&logo=CircleCI&label=&labelColor=555" align="left" />&nbsp;&nbsp;<img align="left" src="https://img.shields.io/librariesio/release/npm/@liquify/specs?style=flat-square&label=&logoWidth=28&labelColor=555&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCA5LjMzIj48dGl0bGU+bnBtPC90aXRsZT48cGF0aCBkPSJNMCwwVjhINi42N1Y5LjMzSDEyVjhIMjRWMFpNNi42Nyw2LjY2SDUuMzN2LTRINHY0SDEuMzRWMS4zM0g2LjY3Wm00LDBWOEg4VjEuMzNoNS4zM1Y2LjY2SDEwLjY3Wm0xMiwwSDIxLjM0di00SDIwdjRIMTguNjd2LTRIMTcuMzR2NEgxNC42N1YxLjMzaDhabS0xMi00SDEyVjUuMzNIMTAuNjZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+" />

# @liquify/path-resolve

Resolves paths contained within a pnpm monorepo. This module is used by the [Liquify](#) IDE extension/package development workspace to resolve paths defined in rollup configuration files.

## Why?

The [Liquify](#) codebase leverages [rollup](#) and a collection of custom plugins to facilitate bundling. This module will resolve paths to files at any location in the project and is used to combine closed and open sourced packages from root.

## Install

```cli
pnpm i @liquify/path-resolve --save-dev
```

## Usage

```js
import pkg from "./package.json";

const { p } = require("@liquify/path-resolve")(pkg);

// Literal
p`dir/file.js`;

// String
p("dir/*.js");

// Array
p(["dir/*.js"]);

// Object
p({ "dir/*.js": "name.js" });
```

## Author

🥛 <small>Laced with [Vellocet](#) by [Νίκος Σαβίδης](mailto:nicos@gmx.com)</small> <img align="right" src="https://img.shields.io/badge/-@sisselsiv-1DA1F2?logo=twitter&logoColor=fff" />
