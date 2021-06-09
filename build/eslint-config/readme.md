# ESLint Configs

Liquify is development in both JavaScript and TypeScript. This directory contains 2 shareable eslint configs which are available on the public NPM registry to any project that wishes to use them. All packages in the [Liquify](https://https://liquify.dev) workspace are employing the configurations on a per-project basis as a development dependency.

### Reasoning

Liquify exists as a monorepo that ships both closed open sourced packages. The more complex modules contained in the project are written in TypeScript while smaller packages are written in JavaScript. Contributing to the open sourced modules without access to the lint rule sets would result in code that does align with the style aesthetics maintained across the project. These lint configs are included as development dependencies in all the packages and used to enforce the aesthetics upon all modules regardless of the open or closed source status.

### Rules

Both TypeScript and JavaScript languages are using a shared rule set. The packages available configurations available for consumption included the additional eslint plugins required by the language. This approach might seem extraneous but it limits the amount of dependencies each sharable config will depend upon.

### Build

The `rules/eslint.rules.js` file is used by both configs. Because we are sharing the rule sets, we need to trigger a build via `pnpm build` or `pnpm dev` (for watching) which will write CJS files to each packages. Contained in the `packages` directory is the shareable configs which is linked to the pnpm workspace.

### Configs

#### [@liquify/eslint-config-js](https://github.com/panoply/liquify/tree/next/build/eslint-config/packages/javascript)

Consumed within JavaScript packages.

#### [@liquify/eslint-config-ts](https://github.com/panoply/liquify/tree/next/build/eslint-config/packages/typescript)

Consumed within TypeScript packages.

### Author

🥛 <small>[Νίκος Σαβίδης](mailto:nicos@gmx.com)</small> <img align="right" src="https://img.shields.io/badge/-@sisselsiv-1DA1F2?logo=twitter&logoColor=fff" />
