## <img src="https://img.shields.io/circleci/build/github/panoply/liquify/circleci-project-setup?token=54a787fdd39139be0add226455eb4d07f34f9d3f&style=flat-square&logo=CircleCI&label=&labelColor=555" align="left" />&nbsp;&nbsp;<img align="left" src="https://img.shields.io/librariesio/release/npm/@liquify/specs?style=flat-square&label=&logoWidth=28&labelColor=555&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCA5LjMzIj48dGl0bGU+bnBtPC90aXRsZT48cGF0aCBkPSJNMCwwVjhINi42N1Y5LjMzSDEyVjhIMjRWMFpNNi42Nyw2LjY2SDUuMzN2LTRINHY0SDEuMzRWMS4zM0g2LjY3Wm00LDBWOEg4VjEuMzNoNS4zM1Y2LjY2SDEwLjY3Wm0xMiwwSDIxLjM0di00SDIwdjRIMTguNjd2LTRIMTcuMzR2NEgxNC42N1YxLjMzaDhabS0xMi00SDEyVjUuMzNIMTAuNjZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+" />

<br>

# @liquify/rollup-plugin-globs

Rollup plugin used by the [Liquify](#) IDE extension/package tool which will watch, copy, transform and rename capabilities when working with files in your workspace. The plugin leverages the rollup watch chokidor instance.

## Why?

The vast majority of rollup plugins which provide file transforms and copies were a bunch of smoke and mirrors. This plugin was originally [rollup-plugin-globsync](https://github.com/tivac/) written by [tivac](https://github.com/tivac) but has since been re-written to better suit the requirements needed in the [Liquify](#) development workspace.

## Install

```cli
<pnpm|npm|yarn> i @liquify/rollup-plugin-globs --save-dev
```

## Usage

```js
import globs from "@liquify/rollup-plugin-globs";

export default {
  input: 'src/index.js',
  output: {
    dir: 'output',
    format: 'cjs',
  },
  plugins: [
    globs({
      globs: ['dir/**/*.json', 'assets/*.svg'],
      dest: "dest",
      clean: true,
      transform: {
        'glob/*.json': ({ content, filename, dest }) => (),
      }
    }),
  ],
};
```

## Contributing

This package exists as part of a monorepo that is closed source which prevents contributions, issues and/or feature requests for end users who have installed this plugin via the npm registry.

## Author

🥛 <small>Laced with [Vellocet](#) by [Νίκος Σαβίδης](mailto:nicos@gmx.com)</small> <img align="right" src="https://img.shields.io/badge/-@sisselsiv-1DA1F2?logo=twitter&logoColor=fff" />