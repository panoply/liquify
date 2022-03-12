<img src="https://img.shields.io/circleci/build/github/panoply/liquify/circleci-project-setup?token=54a787fdd39139be0add226455eb4d07f34f9d3f&style=flat-square&logo=CircleCI&label=&labelColor=555" align="left" />&nbsp;&nbsp;<img align="left" src="https://img.shields.io/librariesio/release/npm/@liquify/specs?style=flat-square&label=&logoWidth=28&labelColor=555&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCA5LjMzIj48dGl0bGU+bnBtPC90aXRsZT48cGF0aCBkPSJNMCwwVjhINi42N1Y5LjMzSDEyVjhIMjRWMFpNNi42Nyw2LjY2SDUuMzN2LTRINHY0SDEuMzRWMS4zM0g2LjY3Wm00LDBWOEg4VjEuMzNoNS4zM1Y2LjY2SDEwLjY3Wm0xMiwwSDIxLjM0di00SDIwdjRIMTguNjd2LTRIMTcuMzR2NEgxNC42N1YxLjMzaDhabS0xMi00SDEyVjUuMzNIMTAuNjZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+" />

<br>

# @liquify/rollup-utils

Various rollup plugin utilities for [Liquify](https://liquify.dev) IDE extension/package. These utilities are collection of commonly used modules in the development workspace.

## Why?

In the Liquify development workspace modules are bundled using [Rollup](https://rollupjs.org/). This package is a collection of various utilities that assist in the bundling and transpilation process of JavaScript/TypeScript packages. The utilities exported in this module provide a clean and easy way to execute commonly used functions. Using this enables us to provide a DRY configuration export and improves productivity in the workspace.

## Install

```cli
<pnpm|npm|yarn> i @liquify/rollup-plugin-utils --save-dev
```

# Utilities

| Export                       | Description                                                                |
| ---------------------------- | -------------------------------------------------------------------------- |
| `path(string)`               | Resolves a Path to location to current working directory.                  |
| `env.*`                      | Provides ENV operations for `dev`, `prod` and `watch` builds.              |
| `config.*`                   | Enables `package.json` or other config files within `rollup.config.mjs`    |
| `banner({}, string)`         | Generates comment banner in bundles that includes License and information  |
| `jsonmin(string)`            | Minifies JSON, used with [rollup-plugin-copy](https://git.io/J0Lv9)        |
| `date(utc?: Date \| string)` | Returns a pretty formatted date with number suffix, eg: `1st October 2021` |

### Usage

Typings explain the utilities in good detail. It's important that when using the `env` util environment values are passed on the command line using the Rollup `--environment` flag. Pass `prod` for production and either omit or pass `dev` for development.

> Custom flags are not supported, only `prod` and `dev` are available, you can however pass a flag who's value evaluates to a `'true'` or `'false'` boolean.

<!-- prettier-ignore -->
```js
import { env, config } from "@liquify/rollup-utils";

export default {
  input: "src/file.js",
  output: {
    format: 'cjs',
    file: config.output.cjs, // The exports.require value in package.json
    sourcemap: env.is('dev', 'inline') // Inline sourcemap in development else false
    interop: 'default'
  },
  plugins: env.if('div')(
    [
      // Development plugins
    ]
  )(
    [
      // Production plugins
    ]
  )
}
```

## `env.*`

The `env` export exposes a bunch of utility methods the pertain to the environment execution you a running a rollup build. This export is used together with rollup `--environment` flags.

#### `env.dev`

Returns a `boolean` of either `true` or `false` depending on the `--environment` flag value

#### `env.prod`

Returns a `boolean` of either `true` or `false` depending on the `--environment` flag value

#### `env.watch`

Returns a `boolean` of either `true` or `false` depending on the `--environment` flag value

#### `env.vars`

The `env.vars` method will return a parsed list of environment variables contained within a `.env` file. This method uses the [dotenv](https://www.npmjs.com/package/dotenv) package for this.

> The `.env` file will be parsed using the default options of [dotenv](https://www.npmjs.com/package/dotenv).

#### `env.if`

The `env.if()` allows us to use single file for development and production bundles. When an `--environment` flag is passed with a of value of `prod` the plugins are concatenated, so first curried parameter is combined with the second curried parameter, which should both be an array list of plugins[]. If you pass a `boolean` type to the first argument in the curry, then `false` will load `dev` plugins whereas `true` executes a concatenation.

The `dev` is default, so running `rollup -c -w` results in:

<!-- prettier-ignore -->
```ts
import { env } from '@brixtol/rollup-utils'

env.if('dev')([ plugin.commonjs(), plugin.ts() ])([ plugin.terser() ])
// => [ commonjs(), ts() ]
```

If you run `rollup -c --environment prod` it results in:

<!-- prettier-ignore -->
```ts
import { env } from '@brixtol/rollup-utils'


env.if('dev')([ plugin.commonjs(), plugin.ts() ])([ plugin.terser() ])
// => [ commonjs(), ts(), terser() ]
```

The value supplied must be a predefined value:

<!-- prettier-ignore -->
```ts
import { env } from '@brixtol/rollup-utils'

// VALID
env.if('dev')([])([])
env.if('prod')([])([])
env.if('watch')([])([])

// This will look for an env variable called "foo" and see if its value is "true" or "false"
env.if('foo')([])([])
```

Passing a `boolean` evaluation opposed to `dev`, `prod` or `watch` value:

<!-- prettier-ignore -->
```ts
import { env } from '@brixtol/rollup-utils'

// SAME AS PASSING "dev"
env.if(1 === 2)([])([])

// SAME AS PASSING "prod"
env.if(1 === 1)([])([])

```

#### `env.is`

Similar to the `env.if()` method the `env.is()` is a conditional executor. The `env.is()` method will either return the 2nd parameter when an `--environment` flag value is matched else it returns boolean `false` or `null` value (depending on the type passed). The 2nd parameter can be of a type `string`, `boolean` or rollup `plugin()`.

The `dev` is default, so running `rollup -c -w` results in:

<!-- prettier-ignore -->
```ts
import { env, plugin } from '@brixtol/rollup-utils'

// String
env.is('dev', 'hello world')    // => 'hello world'
env.is('watch', 'hello world')  // => 'hello world'

//
// This will return false as we called -c and -w
//
env.is('prod', 'hello world')   // => false

// Plugins
env.is('dev', plugin.minify())    // => minify()
env.is('watch', plugin.minify())  // => minify()

//
// This will return null as we called -c and -w
//
env.is('prod', plugin.minify())   // => null
```

If you run `rollup -c --environment prod` it results in:

<!-- prettier-ignore -->
```ts
import { env, plugin } from '@liquify/rollup-utils'

// String
env.is('prod', 'hello world')   // => 'hello world'

//
// These will return false because we have an "--environment prod" flag
//
env.is('dev', 'hello world')    // => false
env.is('watch', 'hello world')  // => false

// Plugins
env.is('prod',  plugin.minify())   // =>  plugin.minify()

//
// These will return null because we have an "--environment prod" flag
//
env.is('dev',  plugin.minify())    // => null
env.is('watch',  plugin.minify())  // => null
```

## `config.*`

The `config` export holds a parsed copy of different configuration files contained within your project. The methods give us a quick and effective way to read JSON files or get useful context about of current working directory.

#### `config.cwd`

Returns the current working directory path location (via `process.cwd()`).

#### `config.external`

Returns a `string[]` list of dependencies that can be passed to `rollup.external[]`.

#### `config.package`

Returns the `package.json` file contained in your project. This method will give you an jsdoc annotated typing reference so you can quickly access fields.

#### `config.tsconfig`

Returns the `tsconfig.json` file contained in your project. This method will give you an jsdoc annotated typing reference so you can quickly access fields. If no file is found it returns `null`.

#### `config.output{}`

Returns values contained within your projects `package.json` file that can passed to `rollup.output`. This is a sugar method, you can access also access these fields via `config.package`. If no value is found it returns `null`.

<!-- prettier-ignore -->
```ts
import { config } from '@liquify/rollup-utils'

// returns the value of exports.require
config.output.cjs

// returns the value of exports.import
config.output.esm;

// returns the exports value (string or object)
config.exports;

// returns the value of the main field
config.main;

// returns the value of the module field
config.module;
```

## `date`

The `date` export returns UTC Time/Date in pretty format with suffixed number. Optionally accepts parameter value of UTC date string.

```ts
import { date } from "@liquify/rollup-utils";

date(); // => 1st October 2021
```

## `path`

The `path` export is a resolver function that will resolve paths from the current working directory. This is just sugar for `path.resolve(process.cwd(), '/path/file.js')` but uses the cached `cwd` reference. Helpful if you need complete paths.

## `jsonmin`

The `jsonmin` export can be either used together with [rollup-plugin-copy](https://github.com/vladshcherbin/rollup-plugin-copy#readme) or process files separate from the rollup build. It will minify `.json` files. This export can also process JSON files using comments (`.jsonc`) and gracefully strip comments upon minification.

```ts
import { jsonmin } from "@liquify/rollup-utils";

jsonmin(`/* comment */ { "field": "value" }`); // => {"field":"value"}
```

## `banner`

The `banner` export can be passed to `rollup.output.banner` which will return an inline Licence. The licenses will use fields contained within your `package.json` to inform upon project specifics in the licenses (like copyright, version, author etc).

In your `rollup.config.mjs` file:

```ts
import { banner } from "@liquify/rollup-utils";

export default {
  input: "src/file.js",
  output: {
    banner: banner("MIT" | "PROPRIETARY" | "REFER"),
    // ...
  },
};
```

<details>
<summary>
PROPRIETARY
</summary>

The template literals represent fields in your `package.json` file.

```js
/**
 * !! THIS IS PROPRIETARY SOFTWARE !!
 *
 * @license
 *
 * ${basename(main)}
 *
 * Copyright © of ${owner} - All Rights Reserved.
 *
 * Unauthorized copying or modification of this file, via any medium is strictly
 * prohibited. Please refer to the LICENSE and/or ThirdPartyNotices.txt files
 * included in bundle.
 *
 * License:  ${license}
 * Package:  ${name}
 * Version:  ${version}
 * Updated:  ${date}
 *
 */
```

</details>

<details>
<summary>
MIT
</summary>

The template literals represent fields in your `package.json` file.

```js
/**
 * @license
 *
 * MIT License
 *
 * ${basename(main)}
 *
 * Copyright © ${owner}
 *
 * Package:  ${name}
 * Version:  ${version}
 * Updated:  ${date}
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
```

</details>

<details>
<summary>
REFER
</summary>

This option will require you to include the `LICENSE` as the generated text will refer to such a file. The template literals represent fields in your `package.json` file.

```js
/**
 * @license
 *
 * ${basename(main)}
 *
 * Copyright © ${owner}
 *
 * License:  ${license}
 * Package:  ${name}
 * Version:  ${version}
 * Updated:  ${date}
 *
 * Please refer to the LICENSE and/or ThirdPartyNotices.txt files included in bundle.
 *
 */
```

</details>

## Author

🥛 <small>[Νίκος Σαβίδης](mailto:nicos@gmx.com)</small> <img align="right" src="https://img.shields.io/badge/-@sisselsiv-1DA1F2?logo=twitter&logoColor=fff" />
