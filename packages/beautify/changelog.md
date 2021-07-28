## _CHANGELOG_

Various changes applied to formatting vendors and the formatting wrapper. Typically this will list PrettyDiff amendments, due to that project being the most used throughout Liquify.

### PrettyDiff

This first release applied a huge number adjustments to both Sparser and PrettyDiff internals. Having understood the functionality and lexing approach of the tools, I was able to purge the vast majority of features that were otherwise laying dormant and not being used.

#### Fixes

- Fixed unformatted option, in markup all internal markup attributes are ignored.

```js
<div
    id="foo"
data-att="bar"
   class="baz"  data-something="qux">
```

When `unformatted` is set to `true` then one would expect these attributes to be ignored and remain untouched, but it seemed this was only true for HTML markup. When Liquid tags or template tags were infused this option would wreak absolute chaos, for example the above code would return the following:

```js
<div
    id="foo"
data-att="bar"
   class="baz" { data-something="qux"{ {% if %} {% endif %}>
```

Essentially, this would fuck-up Liquid in a really horrible way. This option was fixed and now Liquid contained within markup is ignored correctly.

- Fixed the newline semi-colons for template languages infused in in CSS/SCSS and LESS

To may surprise, the origin author Austin built in support for this, however there was a slight issue with the semicolon formats, resulting in this:

```js
.class {
  color: {{ some.tag }}
  ;
}
```
This was fixed, so now Liquid and CSS, SCSS and LESS can be formatted within an issue. Very Cool.

- Fixed tag name capture, Liquid name were failing when not appended with whitespace

```js
{% elsif%} // would fail
{% endfor%} // would fail
```

This was caused due to the lexing `tagName` function returning `endfor%}` of `elsif%}` as the token name, it seems that Austin (PrettyDiff author) only build in captures for output type tag names, eg: `{{tag}}` this was fixed and name such tags are correctly parsed and beautification applied.

#### Amendments

- Changed tag name capture expression, only matches Liquid delimiters
- Removed the `const name = function some_name(){}` approach, instead just calls function name.
- Reformatted the conditional, these are very exhausting in the lexing process, because the project is being edited from the distributed source, it is hard to understand what is going on.

#### Additions


#### Options Removed

**color**<br>

The option is used for reports, we don't need it.


**jsscope**<br>

The logic for jsscope was completely removed and is not supported in the variation.

**minify**<br>

Minification is not provided and all logic related to minification was completely removed, this also includes
the `mode` option `minify` and in addition the following to options:

- minify_keep_comments
- minify_wrap
- top_comments
- conditional

#### Language Removed

- CSV
- Java
- CSharp
- DustJS
- Silver Stripe
- Vapor Leaf
- Markdown
- PHP
- PHP HTML
- Titanium
- EJS
- ERB (Ruby) Template
- Apache Velocity
- Volt
- HTML TWIG Template
