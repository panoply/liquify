## @liquify/eslint-config-js

This package includes the shareable ESLint configuration consumed by [Liquify](https://liquify.dev). The config supports **JavaScript** via the [Babel Parser](https://github.com/babel/babel/tree/main/eslint/babel-eslint-parser).

### Install

[pnpm](https://pnpm.js.org/en/cli/install)

```cli
pnpm i @liquify/eslint-config-js --save-dev
```

### Usage

Extend the configuration with `package.json`.

```json
{
  "eslintConfig": {
    "ignorePatterns": "*.html",
    "extends": ["@liquify/eslint-config-js"],
    "rules": {}
  }
}
```

> Required peer dependency on eslint is required

### Related

- [@liquify/eslint-config](https://github.com/liquify)
- [@liquify/eslint-config-ts](https://github.com/liquify)

### License

[MIT](#LICENCE)
