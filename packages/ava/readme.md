# @liquify/ava

An [AVA](https://github.com/avajs/ava) test runner extension pack for projects contained within the [Liquify](https://liquify.dev) monorepo workspace. This module provides test utilities which help alleviate some of the complexities involved with testing AST structures in projects like [@liquify/liquid-parser](https://github.com/panoply/liquify/tree/next/packages/parser), [Æsthetic](https://github.com/panoply/liquify/tree/next/packages/prettify) and more!

**The package is designed for usage on projects contained within the [Liquify](https://liquify.dev) monorepo workspace.**

### Install

The module has a peer dependency on [AVA](https://github.com/avajs).

```bash
pnpm add ava @liquify/ava -D
```

### Workspace Types

Some additional configuration is required to ensure typings are made available in `*.test.mjs` files. Due to limitation imposed within pnpm workspace monorepos and modern package exports/imports fields. Containing `tsconfig.json` files will need
to point to type declaration files explicitly.

Add the following configuration to `tsconfig.json` files.

```jsonc
{
  "extends": "@liquify/tsconfig",
  "include": ["tests/**/*.mjs"], // include test files
  "compilerOptions": {
    "allowJs": true, // ensure allow js is enabled
    "paths": {
      // Reference the declaration when importing @liquify/ava/parser
      "@liquify/ava/parser": ["./node_modules/@liquify/ava/package/parser.d.ts"],

      // Reference the declaration when importing @liquify/ava/prettify
      "@liquify/ava/esthetic": ["./node_modules/@liquify/ava/package/esthetic.d.ts"]
    }
  }
}
```

# Overview

The module provides various import files with exposed utilities as named exports. The Liquify monorepo workspace contains several different packages, each of which differ in terms of their function and contribution to the project. You should consult the **readme** contained in the `tests` directory of each package for additional information on the test setups.

The import will pertain to the package it's leveraged by. Despite sharing identical naming conventions, the named exports of each import perform vastly different operations.

- [CLI](#cli)
- [@liquify/ava/parser](#liquifyavaparser)
  - [dev](#dev--liquifyavaparser)
  - [forSnippet](#forsnippet--liquifyavaparser)
  - [forSample](#forsample--liquifyavaparser)
- [@liquify/ava/esthetic](#liquifyavaesthetic)
  - [dev](#dev)
  - [forSnippet](#forsnippet--liquifyavaparser)
  - [forSample](#forsample--liquifyavaparser)

# CLI

The module exposes a bin executable using the name `tests` and when invoked will provide a list of test files. The command accepts a single flag of `-t` and expects a list of directory names relative to the `tests` directory.

```json
{
  "scripts": {
    "tests": "tests -t cases"
  }
}
```

### Features

The CLI allows for some refined control over test execution. The choice prompts allow for cherry-picking test files and containing tests via generating appropriate targets using AVA's` match=''` flag. The CLI exposes the following sugars:

- Run all tests in watch mode within a test file
- Run all tests within a test file
- Run a specific test within a test file.
- Run a specific test within a test file in watch mode.

# @liquify/ava/parser

The `parser` import is used within the [@liquify/liquid-language-parser](#) package. The utilities provided in this import module are designed for test cases by this module.

## Dev ~ @liquify/ava/parser

The `dev` export is used for development mode. Development mode for the Liquid Parser consists of parsing an external `.liquid` file and providing several utilities for inspecting the parse tree.

> By default, the `dev` export will parse the containing `dev.liquid` file existing in the root of the `parser/tests ` directory.

<!--prettier-ignore-->
```js
import test from 'ava';
import { dev, explore } from '@liquify/ava/parser';
import { LiquidParser } from '@liquify/liquid-parser';

export const parser = new LiquidParser({ engine: 'shopify' });

test('develop', async t => {

  await dev(t)(async text => {

    // Use the explore export for interfacing with the AST
    explore.ast = parser.scan(
      {
        languageId: 'liquid',
        version: 1,
        text,
        uri: 'test.liquid'
      }
    );

    // Print the parsed stack scope and objects in the tree
    explore.stack([ 'scope', 'objects' ]);

    // optionally return some additional operation instructions
    return {
      repeat: 1, // Repeat the parse
      logger: false // prints the parsed response
      finish: () => {} // A callback function to run after repeats finished
    };

  });

});
```

## forSnippet ~ @liquify/ava/parser

The `forSnippet` export is used to test an array list of string literals, returning each literal in a curried callback function, which from here can be inspected using the `explore` export or have assertion applied.

<!--prettier-ignore-->
```js
import test from 'ava';
import { liquid, forSnippet, explore } from '@liquify/ava/parser';
import { LiquidParser } from '@liquify/liquid-parser';

const parser = new LiquidParser({ engine: 'shopify' });

test('Some Test', t => {

  forSnippet(t)(
    [
      liquid`{% assign is_nil = nil %}` // use the liquid literal to pass code samples
    ]
  )(function (sample) {

    const ast = parser.parse(sample);

    // Use explore to print sane parse errors
    explore.errors(t)(ast);

    // snapshot testing
    t.snapshot(ast);

  });

});
```

## forSample ~ @liquify/ava/parser

The `forSample` export resolves a list of sample files. It will return the code snippet

<!--prettier-ignore-->
```js
import test from 'ava';
import { liquid, forSample, explore } from '@liquify/ava/parser';
import { LiquidParser } from '@liquify/liquid-parser';

const parser = new LiquidParser({ engine: 'shopify' });

test('Some Test', t => {

  // TODO

});
```

# @liquify/ava/esthetic

The `esthetic` import is used within the [@liquify/esthetic](#) package. The utilities provided in this import module are designed for exhaustive and extensive testing of code formatting.

## Dev ~ @liquify/ava/esthetic

The `dev` export is used for development mode. Development mode for esthetic consists of parsing an external `.txt` file and providing several utilities for inspecting the beautified result.

> By default, the `dev` export will parse the containing `dev.txt` file existing in the root of the `esthetic/tests ` directory.

<!--prettier-ignore-->
```js
import test from 'ava';
import { dev } from '@liquify/ava/esthetic';
import esthetic from '@liquify/esthetic';

test('develop', async t => {

  await dev(t)(async (source) => {

    const output = await esthetic.format(source, {
      language: 'liquid',
      wrap: 0,
      markup: {
        preserveText: true,
        forceIndent: false,
        forceAttribute: 3
      },
      json: {
        braceAllman: true,
        objectSort: true
      }
    });

    return {
      inspect: true,
      repeat: 4,
      source: output,
      logger: false,
      finish: () => t.log(output) // same as setting inspect to true
    };

  })

});
```

### Returned Object

This `dev` test export requires an object be returned and accepts the following options:

| Property  | Description                                                                               |
| --------- | ----------------------------------------------------------------------------------------- |
| `inspect` | Whether or not to log the `output` result after formatting completes                      |
| `repeat`  | Repeats the test using the `output` as source. Used to simulate an onSave in text editors |
| `source`  | Reference to the provided `output` returned by Æsthetic after beautification              |
| `logger`  | An optional setting for logging the `output` for each `repeat` run                        |
| `finish`  | A callback that will invoke after the beautification cycle concludes.                     |

> The `inspect` and `logger` options are similar, but when `logger` is enabled (ie: `true`) **inspect** will not execute and instead the final log output will be handled by the **logger** operation in the repeat cycle.

## getSample ~ @liquify/ava/esthetic

The `getSample` utility resolves a sample file and returns it's source. It is a simple and trivial helper which merely resolves an external file and prints output to the terminal console. The method returns a function with 2 parameters. The first (`source`) contains the contents of the sample file as a string, the second **optional** parameter `highlight` will provide syntax highlighting in the CLI.

<!--prettier-ignore-->
```js
import test from 'ava'
import { getSample  } from '@liquify/ava/esthetic';

test('x', async t => {

  await getSample('path/to/sample', async (source, highlight) => {

    // The contents of the sample file as a string
    t.log(source)

    // optionally highlight output
    t.log(highlight(output, {

      // highlight options

    }))

  });

});

```

## forSample ~ @liquify/ava/esthetic

The `forSample` utility resolves a list of sample files. It will return the code snippet and description in the callback function hook. This utility is great for running repeated test cases with a persisted set of rules to ensure the output is the same.

##### Callback

The callback function returns 3 parameters and is called in an iterable manner. The first parameter is the content contained in the sample file provided as a _string_ type that you can pass to esthetic. The second is label generator for AVA snapshot reports that will stringify the rule options that the assertion ran and inject them into the markdown reports. The label parameter is a function that contains a getter, so you can optionally pass in the rules you've tested against.

<!--prettier-ignore-->
```js
import test from 'ava'
import { forSample  } from '@liquify/ava/esthetic';

test('x', async t => {

  await forSample('some/directory')([
    'file-1',
    'file-2',
    'file-3',
    'file-4'
  ], async function (source, label) {

      // The contents of each sample file as a string
      t.log(source)

      // Target the description contained the sample
      t.snapshot(output, label.description);

      // Optionally pass rules to be injected
      t.snapshot(output, label(rules))
    }
  );

});
```

## forRule ~ @liquify/ava/esthetic

The `forRule` utility is designed for usage within [esthetic](https://github.com/panoply/liquify/tree/next/packages/esthetic). The method will resolve samples and pass different beautification rules and a second argument. This utility exposes several features for working with code snippet samples.

The function is curried, the first caller expects the sample directory relative path to be provided and also accepts a 2nd parameter that can infer a `lexer` target. The returning caller expects 2 parameters. The first parameter can be either an _array_ list of options or _object_ type map who's `keys` are the sample filenames contained in the directory provided in the first argument and the value an _array_ list of lexer of options to run on each sample. The second parameter is a function callback that will be invoked for each rule (option) provided by the first argument.

##### Callback

The callback function returns 3 parameters and is called in an iterable manner. The first parameter is the content contained in the sample file provided as a _string_ type that you can pass to esthetic. The second is the rule value and the third parameter is a label generator for AVA snapshot reports that will stringify the rule options that the assertion ran and inject them into the markdown reports.

<!--prettier-ignore-->
```js
import test from 'ava'
import { forRule  } from '@liquify/ava/esthetic';
import esthetic from 'esthetic';

test('x', async t => {

  await forRule('cases/directory', { lexer: 'markup' })({
    'casing-1': [
      {
        wrap: 80,
        attributeCasing: 'lowercase',
        forceAttribute: true
      }
    ],
    'casing-2': [
      {
        attributeCasing: 'preserve',
        attributeSorting: true,
        forceAttribute: true
      }
    ]
  }, async function (source, rule, label) {

    const output = await prettify.format(source, rule);

    t.snapshot(output, label.description);

  });

});

test('x', async t => {

  await util.forRule('markup/attribute-sort')([
    {
      attributeSort: true
    },
    {
      attributeSort: false
    },
  ], async function (source, markup, label) {

    const output = await prettify.format(source, { markup });

    t.snapshot(output, label({ markup }));

  });

});

test('x', async t => {

  await util.forRule('markup/attribute-casing')([
    'preserve',
    'lowercase',
    'lowercase-name',
    'lowercase-value'
  ], async function (source, attributeCasing, label) {

    const output = await prettify.format(source, { markup: { attributeCasing }});

    t.snapshot(output, label({ markup: { attributeCasing } }));

  });

});
```
