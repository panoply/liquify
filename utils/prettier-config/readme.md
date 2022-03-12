## @brixtol/prettier-config

An shareable config for Prettier consumed by Liquify and various projects contained within the monorepo workspace.

### Install

[pnpm](https://pnpm.js.org/en/cli/install)

```cli
pnpm add prettier @liquify/prettier-config -D
```

> Prettier is an `peerDependency` so you will need to install it within your project.

### Usage

We extend configuration from within `package.json` files.

```json
{
  "prettier": "@liquify/prettier-config"
}
```

### Ignored Files

Prettier is not leveraged for various file types because it is extremely opinionated and conflicts with my code styles, especially that found in JavaScript and TypeScript based projects. In almost all packages within the monorepo a `.prettierignore` file is included to prevent prettier from wreaking havoc in the development workspace. Below is standard ignores asserted:

```

_.toml
_.mjs
_.js
_.ts
_.css
_.scss
_.liquid
_.html

```

### Related

- [@liquify/eslint-config](https://github.com/panoply/liquify/tree/next/build/eslint-config)
- [@liquify/tsconfig](https://github.com/panoply/liquify/tree/next/build/tsconfig)
- [@liquify/rollup-config](https://github.com/panoply/liquify/tree/next/build/rollup-config)

### License

[MIT](#LICENSE)

```

```
