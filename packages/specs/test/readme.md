## TESTS

Specs and tested using [AVA](http://avajs.dev/).

### Development

The `dev.test.js` file located at root is used as the console reporter, the contents of this file can contain _anything_ and is not subject to any specific context. The `dev.test.js` file runs via the `pnpm test` which can be run along side development builds.

> Using a terminal emulator like [iTerm](https://iterm2.com/) or one where you can run `pnpm dev` and `pnpm test` in separate panes is the best approach.

### Cases

Below are the independent test cases for this module.

```cli
pnpm test:provide
pnpm test:queries
pnpm test:states
pnpm test:schema
```
