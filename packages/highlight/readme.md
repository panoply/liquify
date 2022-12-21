# @liquify/highlight

Syntax highlighting for Liquid on the command line. Uses [cli-highlight](https://github.com/felixfbecker/cli-highlight) under the hood but does some extra post-processing when dealing with contained syntaxes. It applies Potion themed token colorization.

### Why?

This module was created for usage by the [Prettify](https://github.com/panoply/prettify) CLI but has been appropriated in different packages and projects across the [Liquify](https://liquify.dev) monorepo workspace.

### Install

```bash
pnpm add @liquify/highlight ava -D
```

# Usage

<!-- prettier-ignore -->
```ts
import highlight from '@liquify/highlight';

const string = `
{% if condition %}

  <div class="xxx">
    {{ object.prop | filter: 'something' }}
  </div>

{% endif %}
`

// Returns a coloured string
highlight(string)

// Logs the coloured string
highlight.log(string)
```
