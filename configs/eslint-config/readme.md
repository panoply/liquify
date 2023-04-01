# ESLint Config

Shareable config for eslint to maintain a code style aesthetic across the Liquify project. ESLint [Standard](https://github.com/standard/eslint-config-standard) is extended with additional rule sets.

### Install

[pnpm](https://pnpm.js.org/en/cli/install)

```cli
pnpm add @liquify/eslint-config -D
```

### Usage

Extend the `package.json` file of each module and/or project.

```json
{
  "extends": ["@liquify/eslint-config"]
}
```

> Required peer dependency on eslint

### Related

- [@liquify/prettier-config](https://github.com/panoply/liquify/tree/next/build/eslint-config)
- [@liquify/tsconfig](https://github.com/panoply/liquify/tree/next/build/tsconfig)
- [@liquify/rollup-config](https://github.com/panoply/liquify/tree/next/build/rollup-config)

### Author

🥛 <small>[Νίκος Σαβίδης](mailto:n.savvidis@gmx.com)</small> <img align="right" src="https://img.shields.io/badge/-@sisselsiv-1DA1F2?logo=twitter&logoColor=fff" />
