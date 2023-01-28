---
title: 'Introduction'
layout: docs.liquid
permalink: '/introduction/index.html'
order: 1
sidebar:
  - 'What is Prettify?'
  - 'Motivation'
  - 'Language Support'
  - 'Feature Comparison'
  - 'Intention vs. Inference'
  - 'Caveats'
---

## What is Prettify?

Prettify is a lightweight, fast and extensible code beautification tool. It currently provides formatting support for 15 different languages and is used by the [Liquify](https://liquify.dev) text editor extension/plugin. Prettify implements a variation of the universal [Sparser](https://sparser.io/docs-html/tech-documentation.xhtml#universal-parse-model) lexing algorithm and was originally adapted from the distributed source of [PrettyDiff](https://github.com/prettydiff/prettydiff/blob/master/options.md). The module has been refined for usage in front-end projects working with common client side languages and it exists as an alternative to [Prettier](https://prettier.io/) and [JS Beautify](https://beautifier.io/).

#### Purpose

The main purpose of Prettify is to take code input of a language, restructure formations expressed within the code and return a more refined output. The tool is not a linter, and it is not designed to correct invalid syntax, it's developed for code beautification of client side consumer facing languages.

#### Backstory

Prettify was developed to handle chaotic and unpredictable Liquid + HTML markup structures. Before creating Prettify, alternative solutions did not support Liquid infused syntax and thus developers using this template language were not able to leverage beautifiers. I learned of Sparser and PrettyDiff while seeking a solution to this problem and discovered that both these tools supported Liquid and several additional template language infused beautification. Sparser and PrettyDiff had unfortunately fallen into disarray and were no longer being _actively_ maintained as of 2019 so I began sifting through the code and was fascinated with the original universal parse algorithm that author [Austin Cheney](https://github.com/prettydiff) created and employed.

#### Why Prettify?

The reapplication of Sparser and PrettyDiff into Prettify is an example of evolutionary open source. Prettify provides developers with a granular set of beautification rules that allow for customized output allows developers to comfortably infuse Liquid into different languages without sacrificing beautification support, it intends to be the solution you'd employ when working with the template language.

The lexing algorithm and parse approach employed in Prettify is an original strategic concept. Parsers typically produce an [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) (abstract syntax tree) Prettify implementation of Sparser will produces a uniformed table like structure.

## Language Support

Below is a current support list of languages, their completion status and whether you can run Prettify for beautification. You can leverage on languages above 90% completion, anything below that is not yet ready for the big time. Languages with an above 80% completion status will work with basic structures, but may not be viable in some cases and can be problematic.

#### Completion Status

| Language            | Status       | Usage                           | Operational |
| ------------------- | ------------ | ------------------------------- | :---------: |
| XML                 | 92% Complete | _Safe enough to use_            |      ✓      |
| HTML                | 94% Complete | _Safe enough to use_            |      ✓      |
| Liquid + HTML       | 92% Complete | _Safe enough to use_            |      ✓      |
| Liquid + CSS        | 87% Complete | _Safe enough to use_            |      ✓      |
| Liquid + JSON       | 80% Complete | _Use with caution_              |      ✓      |
| Liquid + JavaScript | 80% Complete | _Use with caution_              |      ✓      |
| JSON                | 88% Complete | _Safe enough to use_            |      ✓      |
| CSS                 | 92% Complete | _Safe enough to use_            |      ✓      |
| SCSS                | 82% Complete | _Use with caution_              |      ✓      |
| JavaScript          | 78% Complete | _Use with caution_              |      𐄂      |
| TypeScript          | 70% Complete | _Avoid using, many defects_     |      𐄂      |
| JSX                 | 70% Complete | _Avoid using, many defects_     |      𐄂      |
| LESS                | 60% Complete | _Avoid using, many defects_     |      𐄂      |
| TSX                 | 40% Complete | _Avoid using, many defects_     |      𐄂      |
| YAML                | 50% Complete | _Do not use, not yet supported_ |      𐄂      |
