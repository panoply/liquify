---
title: 'Inline Control'
layout: docs.liquid
permalink: '/inline-control/index.html'
order: 3
sidebar:
  - 'Inline Rules'
  - 'Ignore Code'
  - 'Preserve Code'
  - 'Disable Prettify'
---

## Inline Control

Inline control allows you to ignore, preserve or apply custom formatting options inline by using custom comments. There are several different comment control structures supported.

#### Comment Types

- `//`
- `/* */`
- `{% # %}`
- `{%  %}`
- `<!-- -->`

#### Ignored vs Preserved

In Prettify, you have 2 different exclusion options for skipping code inline. Using **ignore** will exclude regions from formatting in their entirety whereas **preserve** operates in much the same way but respects level indentation.

## Inline Rules

You can define formatting rules to be applied on a file basis. Inline formatting adopts a similar approach used in linters and other projects. When applying document level rules, it is expected that the comment annotations are placed at the very top of files. Inline rules start with a value of `@prettify` followed by either a space of newline and then the custom rules.

#### HTML Comments

```html
<!-- @prettify forceAttribute: true indentLevel: 4 -->
```

#### Liquid Block Comments

```liquid
{% comment %}
  @prettify forceAttribute: true indentLevel: 4
{% endcomment %}
```

#### Liquid Line Comments

```liquid
{% # @prettify forceAttribute: true indentLevel: 4 %}
```

#### Block comment

```css
/* @prettify forceAttribute: true indentLevel: 4 */
```

### Line comments

```javascript
// @prettify forceAttribute: true indentLevel: 4
```

# Ignore Code

Prettify offers file, region and next line ignore options. When using comment ignores the targeted code will be excluded from beautification which includes indentation, whitespace control etc.

- `prettify-ignore`
- `prettify-ignore-next`
- `prettify-ignore-start`
- `prettify-ignore-end`

## File Ignores

You can prevent Prettify from formatting a file by placing an inline control comment at the type of the document.

```liquid
{% # @prettify-ignore %}

<div>
  <ul>
    <li>The entire file will not be formatted</li>
  </ul>
</div>
```

## Region Ignores

Lexer modes provide comment ignore control and support ignoring regions (blocks) of code. All content contained between the comments will be preserved and unformatted.

### HTML Comments

- `<!-- @prettify-ignore-start -->`
- `<!-- @prettify-ignore-end -->`

### Liquid Block Comments

- `{% comment %} @prettify-ignore-start {% endcomment %}`
- `{% comment %} @prettify-ignore-end {% endcomment %}`

### Liquid Line Comments

- `{% # @prettify-ignore-start %}`
- `{% # @prettify-ignore-end %}`

### Block Comments

- `/* @prettify-ignore-start */`
- `/* @prettify-ignore-end */`

### Line Comments

- `// @prettify-ignore-start`
- `// @prettify-ignore-end`

## Line Ignores

Similar to region ignores, you can instead have Prettify ignore the next known line. This comment ignore will span multiple lines when it is annotated about a tag block start/end token structure.

#### HTML Comments

- `<!-- @prettify-ignore-next -->`

#### Liquid Block Comments

- `{% comment %} @prettify-ignore-next {% endcomment %}`

#### Liquid Line Comments

- `{% # @prettify-ignore-next %}`

#### Block Comments

- `/* @prettify-ignore-next */`

#### Line Comments

- `// @prettify-ignore-next`
