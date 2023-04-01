## @liquify/stylelint-config

Shareable config for [Stylelint](https://stylelint.io/) to maintain a code style aesthetic in SASS/SCSS files across the Liquify project.

### Install

[pnpm](https://pnpm.js.org/en/cli/install)

```cli
pnpm add stylelint @liquify/stylelint-config -D
```

> [Stylelint](https://stylelint.io/) is included as a dependency in the module. The same logic for all plugins.

### Usage

We extend configuration from within `package.json` files.

```json
{
  "stylelint": {
    "extends": "@liquify/stylelint-config",
    "ignoreFiles": ["**/node_modules"]
  }
}
```

### Text Editor (VSCode)

Install the [stylelint.vscode-stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) extension from the marketplace. Depending on how your editor is configured, one may require setting global configuration in a user `settings.json` file:

```jsonc
{
  "stylelint.validate": ["scss", "sass"],
  "stylelint.packageManager": "pnpm",
  "stylelint.enable": true,
  "scss.validate": false, // important to disable vscode validation
  "scss.scannerExclude": ["**/.git", "**/node_modules"],
  "editor.codeActionsOnSave": {
    "source.fixAll.stylelint": true
  }
}
```

### License

[MIT](#LICENSE)
