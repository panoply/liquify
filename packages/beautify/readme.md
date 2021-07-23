## @liquify/format

This module contains Liquid formatting vendors and modules used by the [Liquify](https://liquify.dev) text editor extension/plugin. Provided in this repository are modified packages that have been adjusted to work within Liquify. These are **not standalone** modules and though this can be consumed on the NPM registry, there would be very little use-case where this can be used outside of Liquify.

### What's Included

- [PrettyDiff](https://github.com/prettydiff/prettydiff) (hard fork)

##### Coming Soon

- [JS Beautify](https://github.com/beautify-web/js-beautify)
- [Prettier](https://prettier.io/)

## How it works

Liquify supports formatting capabilities and performs beautification to multiple languages. As of 2021, there is no formatter other than a language aware tool known as [PrettyDiff](https://github.com/prettydiff/prettydiff) that can perform formatting on a template language like Liquid. PrettyDiff is an abandoned project and though no longer maintained its capable of supporting Liquid, HTML and other languages rather efficiently.

Liquid documents are typically HTML (Markup) files and it is likely that such documents contain embedded language regions, like `<script>` or `<style>` tags. If you are using Jekyll or 11ty, you may also have Yaml frontmatter blocks. In the Shopify Liquid variation you also JSON `{% schema %}` tags.

Liquify provides formatting to such regions via switching between formatting tools and consumes external configuration files from various tools, like prettier and applies beautification in accordance with those rule-sets.

#### IMPORTANT

Liquid contained within embedded languages other than HTML is not formatted. There is currently no way to perform beautification within languages other than HTML (markup). If you are looking for formatting support for liquid within CSS, JavaScript or other non-markup languages, it is not possible and support is not yet available for this, this module is used as a dispatcher within Liquify, and if embedded regions contain Liquid, beautification is aborted.

## Install

```cli
<pnpm|npm|yarn> i @liquify/formatting
```

## Usage

The module provides a namespace export called `format` which gives access to the beautification tool to execute formats. The function returns an object which contains the formatted source, the provided source and errors which has a value of `null` if beautification was successful, else a string message.

```js
import { format } from "@liquify/formatting";

format.prettydiff(source: string, rules: object);
format.jsbeautify(source: string, rules: object);
format.prettier(source: string, rules: object);

// Executing Format

const beautify = format.prettydiff('{% if foo %}<div>bar</div>{% endif %}', {
  space_close: false,
  indent_size: 2,
  indent_level: 0,
  preserve: 2,
  preserve_comment: true,
  comment_line: true,
  comments: true,
  preserve_text: true,
  correct: false,
  attribute_sort: false,
  attribute_sort_list: '',
  force_attribute: false,
  force_indent: false,
  quote_convert: 'none',
  tag_merge: false,
  tag_sort: false,
})

// We will ensure that no error were encountered
if(beautify.error) {

  // The error value is a text string with message
  console.log(beautify.error)

  // Return the source
  return beautify.source

}

beautify.source // Format was successful

```

### Rules

Each formatting tool requires a `rules` parameter be passed. Rules must contain a `language` property in order to switch between formatters.

## Author

🥛 [Νίκος Σαβίδης](mailto:nicos@gmx.com) <img align="right" src="https://img.shields.io/badge/-@sisselsiv-1DA1F2?logo=twitter&logoColor=fff" />
