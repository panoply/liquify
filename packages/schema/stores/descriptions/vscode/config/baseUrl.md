**Default** `.`

The `liquid.config.baseUrl` option can be used to define a **relative** directory path for resolving `.liquidrc` or `.liquidrc.json` files. The option will only work in projects that use `.liquidrc` files and has no effect if `liquid.config.method` is set `workspace` Consider the following directory layout:

```

 root
 ├─ .vscode
 │  └─ settings.json
 ├─ docs
 │  ├─ .liquidrc.json
 │  └─ index.liquid
 └─ src
    ├─ includes
    └─ views

```

By default, when no `.liquidrc` exist in a projects root, then it is assumed beautification rules have been defined in the `.vscode/settings.json` workspace file. When no formatting rules are defined in the workspace file then the default rules will be used. In situations where you need the extension to use a config file that is located outside of the root you can provide a `baseUrl` to the directory containing one of the supported file types.

Targeting the `.liquidrc.json` file located in `docs` directory:

<!--prettier-ignore-->
```jsonc
{
  "liquid.config.baseUrl": "./docs"
}
```

_The `baseUrl` must point to a relative directory not a file. If the directory provided cannot be resolved, root is used._
