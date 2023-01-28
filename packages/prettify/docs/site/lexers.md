---
title: 'Lexers'
layout: docs.liquid
permalink: '/lexers/index.html'
order: 3
sidebar:
  - 'HTML'
  - 'Liquid'
  - 'CSS'
  - 'SCSS'
  - 'LESS'
  - 'JSON'
  - 'JavaScript'
  - 'TypeScript'
  - 'JSX'
  - 'TSX'
---

# Routing

SPX exposes a routing approach for cases where per-page lifecycle control is desired. Because we are dealing with SSR markup and intercepting navigations we are able to intercept and execute operations at different points in the render cycles. SPX routes accept components which can be leveraged in your application.

# Components

An SPX component is just an object literal that contains lifecycle methods, otherwise known as hooks. Components are a mechanism that encapsulates logic for specific routes. Here's an SPX component:

<!-- prettier-ignore -->
```typescript
import spx from 'spx'

spx.route('/path/:id', {
  connect: function (state) {

    spx.state({ })

  },
  fetch: function (state) {

    spx.progress(200)

  },
  visit: function (dom) {

    spx.capture('img')

  },
  cache: function (dom) {

    spx.store({ })

  },
  render: function (element) {

    spx.target('active', {})

  },
  load: function (state) {

    spx.script('..')
    spx.style('..')

  },
  leave: function (route) {

    // teardown


  }
};
```

# Mounting

The module exposes a low-level routing approach using simple wildcard path matching. Routes execute right before fragments are replaced in the rendering lifecycle. Routes allow you to augment the target documents and state before replacement occur.

<!-- prettier-ignore -->
```typescript
import spx from 'spx'

spx.route({

  '/:value': (state?: IState, target?: IRoute) => void | Document,

  '/path/*': (state?: IState, target?: IRoute) => void | Document,

  '/?param': (state?: IState, target?: IRoute) => void | Document,

  '/path/:id': {
    connect: function() {},
    prefetch: function() {},
    visit: function() {},
    cache: function() {},
    render: function(){},
    load: function () {},
    leave: function () {}
  }

});
```
