## @brixtol/eslint-config-javascript

This package includes the shareable ESLint configuration consumed by [Liquify](https://liquify.dev). The config supports JavaScript via the [Babel Parser](https://github.com/babel/babel/tree/main/eslint/babel-eslint-parser).

### Install

[pnpm](https://pnpm.js.org/en/cli/install)

```cli
pnpm i @brixtol/eslint-config-javascript --save-dev
```

### Usage

Extend the configuration with `package.json`.

```json
{
  "eslintConfig": {
    "ignorePatterns": "*.html",
    "extends": ["@liquify/eslint-config"],
    "rules": {}
  }
}
```

### TypeScript

The TypeScript projects require

### Troubleshoot

If the shareable config is being consumed outside the brixtol monorepo then you may need install deps into that project:

```cli
pnpm i @babel/eslint-parser @babel/eslint-plugin eslint eslint-config-standard eslint-import-resolver-babel-module eslint-plugin-import eslint-plugin-node eslint-plugin-promise --save-dev
```

### Related

- [@brixtol/eslint-config-typescript](https://github.com/brixtol/eslint-config-typescript)
- [@brixtol/prettier-config](https://github.com/brixtol/prettier-config)
- [@brixtol/browserslist-config](https://github.com/brixtol/browserslist-config)

### License

[MIT](#LICENCE)

---

We [♡](https://www.brixtoltextiles.com/discount/4D3V3L0P3RS]) open source!
