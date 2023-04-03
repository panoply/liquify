# ESLint Config

Shareable config for eslint to maintain a code style aesthetic across the Liquify project. ESLint [Standard](https://github.com/standard/eslint-config-standard) is extended with additional rule sets.

### Install

[pnpm](https://pnpm.js.org/en/cli/install)

```cli
pnpm add @liquify/eslint-config -D
```

> Required peer dependency on eslint

### Usage

Extend the `package.json` file of each module and/or project.

```json
{
  "eslintConfig": {
    "extends": ["@liquify/eslint-config"]
  }
}
```

In some packages ESLint will be limited to the specific project itself by inferring `true` on the `root` key option.

```json
{
  "eslintConfig": {
    "root": true
  }
}
```

### Related

- [@liquify/tsconfig](https://github.com/panoply/liquify/tree/master/configs/tsconfig)
- [@liquify/prettier-config](https://github.com/panoply/liquify/tree/master/configs/eslint-config)
- [@liquify/stylelint-config](https://github.com/panoply/liquify/tree/master/configs/stylelint-config)

### Author

🥛 <small>[Νίκος Σαβίδης](mailto:n.savvidis@gmx.com)</small> <img align="right" src="https://img.shields.io/badge/-@niksavvidis-1DA1F2?logo=twitter&logoColor=fff" />
