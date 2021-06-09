# ESLint Config

Liquify is development in both JavaScript and TypeScript. This directory contains an **extendable** shareable config for eslint which maintain a code style aesthetic across the project in by languages. ESLint [Standard](https://github.com/standard/eslint-config-standard) is extended with additional rule sets.

### Reasoning

Liquify exists as a monorepo that ships both closed open sourced packages. The more complex modules contained in the project are written in TypeScript while smaller packages are written in JavaScript. These lint configs are included as development dependencies in all the packages and used to enforce the aesthetics upon all modules regardless of the open or closed source status.

### Install

[pnpm](https://pnpm.js.org/en/cli/install)

```cli
pnpm i @liquify/eslint-config --save-dev
```

### Usage

This is used as an extendable and within Liquify is digested by `eslint-config-js` and `eslint-config-ts` in their respective packages.

```json
{
  "extends": ["@liquify/eslint-config"]
}
```

> Required peer dependency on eslint is required

### Shareable

#### [@liquify/eslint-config-js](https://github.com/panoply/liquify/tree/next/build/eslint-config/packages/javascript)

Consumed within JavaScript packages.

#### [@liquify/eslint-config-ts](https://github.com/panoply/liquify/tree/next/build/eslint-config/packages/typescript)

Consumed within TypeScript packages.

### Author

🥛 <small>[Νίκος Σαβίδης](mailto:nicos@gmx.com)</small> <img align="right" src="https://img.shields.io/badge/-@sisselsiv-1DA1F2?logo=twitter&logoColor=fff" />
