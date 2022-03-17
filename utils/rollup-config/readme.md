# @liquify/rollup-config

Shareable rollup configuration used within the [Liquify](https://liquify.dev) monorepo. The module acts as an interface, it exports an instance of Rollup and several plugins that are frequently used by packages contained across the workspace. Each plugin is wrapped as a getter which help negate exposing unused plugins on the export.

### Install

[pnpm](https://pnpm.js.org/en/cli/install)

```cli
pnpm add @liquify/rollup-config -save-dev
```

### Usage

This is an ESM module, your rollup config file must use a `.mjs` extension (`rollup.config.mjs`) or else Node will complain. The `rollup()` export is totally optional, its a re-export of `defineConfig` and used to provide type completions.

<!-- prettier-ignore -->
```ts
import { rollup, env, plugin } from "@liquify/rollup-config";

export default rollup(
  {
    input: "src/file.ts",
    output:   {
      format: 'cjs',
      dir: 'package',
      sourcemap: env.is('dev', 'inline'), // Inline sourcemap in development else false
      interop: 'default'
    },
    plugins: env.if('div')(
      [
        plugin.commonjs(options: {}),
        plugin.esbuild(options: {}),
        // etc etc
      ]
    )(
      [
        plugin.minify()
      ]
    )
  }
);
```

> Types are re-exported and provided for all plugins which support them. Rollup configuration files within our workspace.

### Plugins

All plugins are available via the named `plugin` export. In addition to the plugins rollup's `defineConfig` function is exported as `rollup` namespace so configuration options have typings on the default export. Below is the complete list of included plugins:

| Export              | Plugin                                                                                                         |
| ------------------- | -------------------------------------------------------------------------------------------------------------- |
| `plugin.alias`      | [@rollup/plugin-alias](https://git.io/JuTc9)                                                                   |
| `plugin.copy`       | [rollup-plugin-copy](https://git.io/JuTux)                                                                     |
| `plugin.commonjs`   | [@rollup/plugin-commonjs](https://git.io/JuTcI)                                                                |
| `plugin.del`        | [rollup-plugin-delete](https://git.io/JuTz3)                                                                   |
| `plugin.esbuild`    | [rollup-plugin-esbuild](https://git.io/J1DEP)                                                                  |
| `plugin.filesize`   | [rollup-plugin-filesize](https://git.io/JuTzw)                                                                 |
| `plugin.json`       | [@rollup/plugin-json](https://git.io/JuTni)                                                                    |
| `plugin.obfuscator` | [@liquify/plugin-obfuscator](https://github.com/panoply/liquify/master/utils/rollup-plugins/rollup-obfuscator) |
| `plugin.resolve`    | [@rollup/plugin-node-resolve](https://git.io/JOqCR)                                                            |
| `plugin.replace`    | [@rollup/plugin-replace](https://git.io/JuTcC)                                                                 |
| `plugin.minify`     | [rollup-plugin-esbuild](https://git.io/J1DEP)                                                                  |
| `plugin.dts`        | [rollup-plugin-serve](https://github.com/Swatinem/rollup-plugin-dts)                                           |
| `plugin.enums`      | [@liquify/rollup-enums](https://github.com/panoply/liquify/master/utils/rollup-plugins/rollup-obfuscator)      |
| `plugin.watch`      | [@liquify/rollup-watch](https://github.com/panoply/liquify/master/utils/rollup-plugins/rollup-watch)           |

### Peer Dependencies

The module includes several peer dependencies, one being Rollup itself. Ensure that if you are using a plugin you install any peers it might require.

- [ESBuild](https://esbuild.github.io/)
- [Rollup](https://rollupjs.org/guide/en/)
- [TypeScript](https://www.typescriptlang.org/)

### License

Licensed under [MIT](#LICENSE).
