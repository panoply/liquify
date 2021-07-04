## TESTS

Parser tests are executed with [AVA](#). Multiple use-cases are tested against and all files prepended with `.test.js` are the running files.

### Usage

The `dev.test.js` file located at root is used as the console reporter in development via `pnpm dev`and will initialize along side [Rollup](#) and [TypeScript](#). Below are the commands:

```cli

pnpm test
pnpm test:html
pnpm test:liquid
pnpm test:model
pnpm test:ast
pnpm test:scanner
pnpm test:parser
pnpm test:validation

```

# Validation

Validation tests cover the follow diagnostic reporting cases:

### HTML

###### MISSING X

- Missing End Tag
- Missing Start Tag
- Missing Closing Delimiter

### LIQUID

###### MISSING X

- Missing End Tag
- Missing Start Tag
- Missing Closing Delimiter
- Missing Object Property

###### MISSING X
