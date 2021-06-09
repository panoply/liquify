## @liquify/eslint-config-ts

This package includes the shareable ESLint configuration consumed by [Liquify](https://liquify.dev). The config supports TypeScript projects.

### Install

[pnpm](https://pnpm.js.org/en/cli/install)

```cli
pnpm i @liquify/eslint-config-ts --save-dev
```

### Usage

Extend the configuration with `package.json`.

```json
{
  "eslintConfig": {
    "ignorePatterns": "*.html",
    "extends": ["@liquify/eslint-config-ts"],
    "rules": {}
  }
}
```

> Required peer dependency on eslint is required

### Troubleshoot

If the shareable config is being consumed outside the Liquify monorepo then you may need install deps into that project, however this should be last resort, everything should load correctly.

```cli
pnpm i @typescript-eslint/eslint-plugin eslint-config-standard @typescript-eslint/parser --save-dev
```

### Related

- [@liquify/eslint-config-js](https://github.com/liquify)

### License

[MIT](#LICENCE)
