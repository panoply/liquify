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
        plugin.ts(options: {}),
        // etc etc
      ]
    )(
      [
        plugin.terser()
      ]
    )
  }
);
```

> Types are re-exported and provided for all plugins which support them. Rollup configuration files within our workspace.

### Plugins

All plugins are available via the named `plugin` export. In addition to the plugins rollup's `defineConfig` function is exported as `rollup` namespace so configuration options have typings on the default export. Below is the complete list of included plugins:

| Export              | Plugin                                               | Description                                      |
| ------------------- | ---------------------------------------------------- | ------------------------------------------------ |
| `plugin.alias`      | [@rollup/plugin-alias](https://git.io/JuTc9)         | Alias modules in a build                         |
| `plugin.beep`       | [@rollup/plugin-beep](https://git.io/JuTEW)          | Beeps when a build ends with errors              |
| `plugin.copy`       | [rollup-plugin-copy](https://git.io/JuTux)           | Copy files and folders, with glob support        |
| `plugin.commonjs`   | [@rollup/plugin-commonjs](https://git.io/JuTcI)      | Convert CommonJS modules to ES Modules           |
| `plugin.del`        | [rollup-plugin-delete](https://git.io/JuTz3)         | Delete files and folders                         |
| `plugin.filesize`   | [rollup-plugin-filesize](https://git.io/JuTzw)       | Show files size in the cli                       |
| `plugin.html`       | [@rollup/plugin-html](https://git.io/JuTWL)          | Creates HTML files to serve Rollup bundles       |
| `plugin.json`       | [@rollup/plugin-json](https://git.io/JuTni)          | Convert JSON files to ES Modules                 |
| `plugin.livereload` | [rollup-plugin-livereload](https://git.io/JuTu8)     | Live Reload after changes                        |
| `plugin.multi`      | [@rollup/plugin-multi-entry](https://git.io/JwRT2)   | Use multiple entry points for a bundle.          |
| `plugin.polyfills`  | [rollup-plugin-node-polyfills](https://git.io/JuTuV) | Allows the node builtins to be required/imported |
| `plugin.resolve`    | [@rollup/plugin-node-resolve](https://git.io/JOqCR)  | Use the Node resolution algorithm                |
| `plugin.postcss`    | [rollup-plugin-postcss](https://git.io/JuEZg)        | Seamless integration between Rollup and PostCSS  |
| `plugin.replace`    | [@rollup/plugin-replace](https://git.io/JuTcC)       | Replace occurrences of a set of strings          |
| `plugin.ts`         | [@rollup/plugin-typescript](https://git.io/JuTng)    | Integration with Typescript.                     |
| `plugin.ts2`        | [rollup-plugin-typescript2](https://git.io/JuEpw)    | Alternative Rollup with TypeScript integration.  |
| `plugin.tspaths`    | [rollup-plugin-ts-paths](https://git.io/JuTEV)       | Resolve import from paths in tsconfig.json       |
| `plugin.scss`       | [rollup-plugin-scss](https://git.io/JuEZp)           | Process SASS and SCSS files                      |
| `plugin.serve`      | [rollup-plugin-serve](https://git.io/JuTuq)          | Serve a generated bundle                         |
| `plugin.terser`     | [rollup-plugin-terser](https://git.io/JuTz5)         | Minify generated es bundles using with terser    |

### Optional Dependencies

The module includes several optional dependencies, one being Rollup itself. Ensure that if you are using a plugin you install any optional it might require.

- [Autoprefixer](https://github.com/postcss/autoprefixer)
- [PostCSS](https://github.com/postcss/postcss)
- [Rollup](https://rollupjs.org/guide/en/)
- [TypeScript](https://www.typescriptlang.org/)



### License

Licensed under [MIT](#LICENSE).

