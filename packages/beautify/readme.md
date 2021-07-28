## @liquify/format

This module contains Liquid formatting vendors and modules used by the [Liquify](https://liquify.dev) text editor extension/plugin. Provided in this repository is a heavily modified version of [PrettyDiff](https://github.com/prettydiff/prettydiff) which has been edited to work within Liquify. These are **not standalone** modules and though this can be consumed on the NPM registry, there would be very little use-case where this can be used outside of Liquify.

### Supported

- Liquid in HTML
- Liquid in CSS
- Liquid in SCSS

### What's Included

- [PrettyDiff](https://github.com/prettydiff/prettydiff) (hard fork)

##### Coming Soon

- [JS Beautify](https://github.com/beautify-web/js-beautify)
- [Prettier](https://prettier.io/)

## How it works

Liquify supports formatting capabilities and performs beautification to multiple languages. As of 2021, there is no formatter other than a language aware tool known as [PrettyDiff](https://github.com/prettydiff/prettydiff) that can perform formatting on a template language like Liquid. PrettyDiff is an abandoned project and though no longer maintained its capable of supporting Liquid, HTML and other languages rather efficiently. The version of PrettyDiff used in Liquify has had its source modified and stripped of various aspects that hold no virtue in Liquify.

Liquid documents are typically HTML (Markup) files and it is likely that such documents contain embedded language regions, like `<script>` or `<style>` tags. If you are using Jekyll or 11ty, you may also have Yaml frontmatter blocks. In the Shopify Liquid variation you also JSON `{% schema %}` tags.

Liquify provides formatting to such regions via switching between formatting tools and consumes external configuration files from various tools, like prettier and applies beautification in accordance with those rule-sets.

## PrettyDiff Changes

The PrettyDiff parser and its internal parsing engine Sparser have been heavily modified. Due to the chaotic nature in which the original project exists and because PrettyDiff and Sparser were designed to support a multitude of different languages, this hard-forked version used by Liquify has completely stripped support out for various languages.

#### Fixes

PrettyDiff had some minor issues when working with Liquid and HTML markup languages. This hard-fork fixed some of those issues that were wreaking havoc or causing invalid beautification.

- Fixed unformatted option, in markup all internal markup attributes are ignored.
- Fixed the newline semi-colons for template languages infused in in CSS/SCSS and LESS


#### Additions

Various additions were added to the parsing and beautification process within PrettyDiff. Specifically that which related to the formatting of Liquid and Markup (HTML).

- Added new logic to Liquid tags used in HTML attributes
- Single line expressions

When tags are expressed on a single line and their contents contains no spaces then that alignment is respected and tags are not indented. For example:

```js

// This will not indent and formatting will respect its structure
{% if x %}will_not_indent{% endif %}

// This will be indented as the content contains a whitespace
{% if x %}will indent{% endif %}

```

In the 2nd example the formatter will place the start token `{% if b %}`, the `will indent` text content and the `{% endif %}` token all onto newlines, resulting in this:

```js
{% if x %}
  will indent
{% endif %}
```

PrettyDiff would indent the `{% endif %}` token but respect the `{% if b %}` expression. This update gives an optional manner into how we indent tags without needing to express a rule for such.

#### Removals

Because we only seek beautification from PrettyDiff, we have the vast majority of code report features used when diffing. This purge means we remove a number of options which were used.

Refer to the [changelog](/changelog.md) for a details list of modifications.

- minify_keep_comments
- minify_wrap
- top_comments
- conditional

#### Languages

- HTML
- XML
- CSS
- SCSS
- LESS
- TypeScript
- JavaScript
- JSP
- JSX
- Handlebars
- ~~CSV~~
- ~~Java~~
- ~~CSharp~~
- ~~DustJS~~
- ~~Silver Stripe~~
- ~~Vapor Leaf~~
- ~~Markdown~~
- ~~PHP~~
- ~~PHP HTML~~
- ~~Titanium~~
- ~~EJS~~
- ~~ERB (Ruby) Template~~
- ~~Apache Velocity~~
- ~~Volt~~
- ~~HTML TWIG Template~~

Anyone who has studied the PrettyDiff and Sparser projects would be well aware of just how beautifully chaotic the architecture and the overall design of these tools are. Despite PrettyDiff being a TypeScript project, its distributed code is composed using an internal cli. This approach is fitting for those using PrettyDiff as a diffing engine or client but for its use-case within Liquify, we only leverage the beautification aspects for a select few languages. The vendor file `prettydiff.js` is the generated distributed node source, it is from that file amendments and changes have been made.

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
