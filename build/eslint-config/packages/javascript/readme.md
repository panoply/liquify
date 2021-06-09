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

### Troubleshoot

If the shareable config is being consumed outside the Liquify monorepo then you may need install deps into that project, however this should be last resort, everything should load correctly.

```cli
pnpm i @babel/eslint-parser @babel/eslint-plugin eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise --save-dev
```

### Related

- [@liquify/eslint-config-ts](https://github.com/liquify)

### License

[MIT](#LICENCE)
