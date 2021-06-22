<img src="https://img.shields.io/circleci/build/github/panoply/liquify/circleci-project-setup?token=54a787fdd39139be0add226455eb4d07f34f9d3f&style=flat-square&logo=CircleCI&label=&labelColor=555" align="left" />&nbsp;&nbsp;<img align="left" src="https://img.shields.io/librariesio/release/npm/@liquify/specs?style=flat-square&label=&logoWidth=28&labelColor=555&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCA5LjMzIj48dGl0bGU+bnBtPC90aXRsZT48cGF0aCBkPSJNMCwwVjhINi42N1Y5LjMzSDEyVjhIMjRWMFpNNi42Nyw2LjY2SDUuMzN2LTRINHY0SDEuMzRWMS4zM0g2LjY3Wm00LDBWOEg4VjEuMzNoNS4zM1Y2LjY2SDEwLjY3Wm0xMiwwSDIxLjM0di00SDIwdjRIMTguNjd2LTRIMTcuMzR2NEgxNC42N1YxLjMzaDhabS0xMi00SDEyVjUuMzNIMTAuNjZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+" />

# @liquify/language-specs

This package is available on the npm registry for modules consumed by the [Liquify](https://liquify.dev) parser and text editor extension/plugin.

**Liquify is partially proprietary closed source software. The distributed code provided in this package is enigmatic and has been encrypted using an [aes-256-gcm](https://en.wikipedia.org/wiki/Galois/Counter_Mode) algorithm**

## Reasoning

Due to the versatile nature of Liquid and in order to provide LSP capabilities to the Liquid Language Server the tool adopts and extends upon the approach introduced by the VS Code team, specifically that of the HTML language Service.

## Why?

The [liquify](#) parser treats HTML and Liquid as a single language. Providing LSP capabilities to both languages was extraneous considering Liquid (generally) extends markup.

## Specs === Grammars

In the context of the Liquid Language Server, variation specifications are just data references that describe Liquid syntax. They are not quite Grammars but close enough and exists to enable developers of any level to quickly compose contextual grammars and formal schema that described tags, filters and objects. A template language like Liquid exists in a multitude of variations that extend upon its default [standard](https://shopify.github.io/liquid/) variation. There are implementations of Liquid and these files allow us to establish formal specs for the language.

## Author

🥛 [Νίκος Σαβίδης](mailto:nicos@gmx.com) <img align="right" src="https://img.shields.io/badge/-@sisselsiv-1DA1F2?logo=twitter&logoColor=fff" />
