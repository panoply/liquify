<img src="https://img.shields.io/circleci/build/github/panoply/liquify/circleci-project-setup?token=54a787fdd39139be0add226455eb4d07f34f9d3f&style=flat-square&logo=CircleCI&label=&labelColor=555" align="left" />&nbsp;&nbsp;<img align="left" src="https://img.shields.io/librariesio/release/npm/@liquify/specs?style=flat-square&label=&logoWidth=28&labelColor=555&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCA5LjMzIj48dGl0bGU+bnBtPC90aXRsZT48cGF0aCBkPSJNMCwwVjhINi42N1Y5LjMzSDEyVjhIMjRWMFpNNi42Nyw2LjY2SDUuMzN2LTRINHY0SDEuMzRWMS4zM0g2LjY3Wm00LDBWOEg4VjEuMzNoNS4zM1Y2LjY2SDEwLjY3Wm0xMiwwSDIxLjM0di00SDIwdjRIMTguNjd2LTRIMTcuMzR2NEgxNC42N1YxLjMzaDhabS0xMi00SDEyVjUuMzNIMTAuNjZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+" />

# @liquify/rollup-enums

**CUSTOM USE CASE PLUGIN**

A Liquify specific rollup plugin that converts Liquid specification reference type string values into enumerable number equivalent. This plugin is specifically developed for use within Liquify IDE development process.

### Why

Because number evaluation is faster than string evaluation. The Liquid language specifications act as grammar references for the Liquify parser. The plugin augments the specifications so the `type` properties in specs are converted to integer enumerable references. Passing the specs through this build step negates having to rely on TypeScript const enums. In additional, ESBuild will produce object `key > value` maps when it encounters TypeScript enums resulting in the specs have multiple references that they simply do not need.

## Install

```cli
<pnpm|npm|yarn> i @liquify/rollup-enums --save-dev
```

## Usage

This plugin is exposed within the project [@liquify/rollup-config](#) via the `plugin` export, which is what the below code example is using as the import.

```js
import { plugin } from '@liquify/rollup-config';

export default {
  plugins: [
    plugin.enums(
      {
        include: [
          'path-1/*.ts',
          'path-2/*.ts'
        ]
        enums: {
          any: 1,
          object: 2,
          integer: 3,
          number: 4,
          boolean: 5,
          string: 6,
          // etc etc
        }
      }
    )
  ]
};
```

## Overview

Liquid specifications used by Liquify are data references. The specs require a `type` reference to be defined that informs the Liquify [Parser](#) on how to handle certain syntax. Liquid specifications are written as follows:

```js
{
  filters: {
    append: {
      arguments: [
        {
          type: 'string',
        }
      ]
    }
  },
  tags: {
    if: {
      type: 'control'
    },
    increment: {
      type: 'variable',
    }
  }
}
```

Notice how we express the `type` of tag or filter arguments in string form. The plugin will simply convert those string values to their enumerable equivalent, so the above would output:

```js
{
  filters: {
    append: {
      arguments: [
        {
          type: 6
        }
      ]
    }
  },
  tags: {
    if: {
      type: 12
    },
    increment: {
      type: 20,
    }
  }
}

```

## Author

🥛 <small>[Νίκος Σαβίδης](mailto:n.savvidis@gmx.com)</small> <img align="right" src="https://img.shields.io/badge/-@sisselsiv-1DA1F2?logo=twitter&logoColor=fff" />
