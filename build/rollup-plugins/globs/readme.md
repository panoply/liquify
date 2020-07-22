<img src="https://img.shields.io/circleci/build/github/panoply/liquify/circleci-project-setup?token=54a787fdd39139be0add226455eb4d07f34f9d3f&style=flat-square&logo=CircleCI&label=&labelColor=555" align="left" />&nbsp;&nbsp;<img align="left" src="https://img.shields.io/librariesio/release/npm/@liquify/specs?style=flat-square&label=&logoWidth=28&labelColor=555&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCA5LjMzIj48dGl0bGU+bnBtPC90aXRsZT48cGF0aCBkPSJNMCwwVjhINi42N1Y5LjMzSDEyVjhIMjRWMFpNNi42Nyw2LjY2SDUuMzN2LTRINHY0SDEuMzRWMS4zM0g2LjY3Wm00LDBWOEg4VjEuMzNoNS4zM1Y2LjY2SDEwLjY3Wm0xMiwwSDIxLjM0di00SDIwdjRIMTguNjd2LTRIMTcuMzR2NEgxNC42N1YxLjMzaDhabS0xMi00SDEyVjUuMzNIMTAuNjZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+" />

<br>

# @liquify/rollup-plugin-globs

A [rollup](https://rollupjs.org) plugin used by the [Liquify](#) IDE extension/package. The plugin provides watch, copy, transform, repath and rename capabilities for files in a development workspace.

## Why?

The vast majority of rollup plugins which provide file transforms and/or copies were a bunch of smoke and mirrors and kept falling short in what was required in the [Liquify](#) development workspace. The plugin is essentially a stripped down and hard-fork extended version of [rollup-plugin-globsync](https://github.com/tivac/) that has been re-written, uses different dependencies and facilitates file transformations + type declarations.

## Install

```cli
<pnpm|npm|yarn> i @liquify/rollup-plugin-globs --save-dev
```

## Usage

```js
import globs from "@liquify/rollup-plugin-globs";

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
      transform: Object | function,
    }),
  ],
};
```

## Transforms

The plugin `transform` option will allow you to rename, repath and/or modify contents of a file. The transform option accepts either an `object` or `function` which will supply an object parameter argument. Transforms **must** return either a string or object value. When an transform returns a `string` it is interpreted as a combination rename and repath, see below example:

#### Transforming multiple files

```js
globs({
  globs: ["dir/**/*.json", "assets/*.svg"],
  dest: "dest",
  transform: {
    "img/**/file.png": "rename.png" // string without slash will rename the file
    "image.jpg": "images/prepend-[name].[ext]" // string with slash / will repath from dest/
    "data/*.json": ({ content }) => {

      // Returning a function on all '.json' files and do some modifications
      // For example, lets beautify these JSON files with an indentation of 4
      const json = JSON.stringify(JSON.parse(content), null, 4)

      // Returning an object using you can repath and rename the files using the
      return {
        content: json, // the transformed contents, should always be a string!
        file: `new-[name].json`, // prepend `new-` to these all filenames
        dest: 'json/dest' // output files to a new destination relative to workspace root
      }
    },
  },
}),
```

#### Transforming all files

```js
import { minify } from 'html-minifier'

globs({
  globs: ["views/*.html"],
  dest: "pages",
  transform: ({ content }) => {

      // This will modify all files referenced in globs
      // for example, let minify all HTML files
      const html =  minify(content.toString());

      return {
        content: html, // the transformed contents, should always be a string!
        file: `[name].liquid`, // all files should use a `.liquid` extension
      }
    },
  },
}),
```

## Contributing

This package licensed under MIT but it exists as part of a monorepo that is closed source. Currently, any contributions, issues and/or feature requests by end users is not possible.

## Author

🥛 <small>Laced with [Vellocet](#) by [Νίκος Σαβίδης](mailto:nicos@gmx.com)</small> <img align="right" src="https://img.shields.io/badge/-@sisselsiv-1DA1F2?logo=twitter&logoColor=fff" />
