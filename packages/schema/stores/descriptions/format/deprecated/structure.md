DEPRECATED STRUCTURE

As of version 3.4.0 beautification rules within .liquidrc or .liquidrc.json files need to placed within a "format" object. You can generate a new a liquidrc file via the vscode command palette (cmd + shift + p) and choosing "Liquid: Generate .liquidrc (recommended)" which will produce a new file with the best formatting rules preset. Alternatively, you can manually align existing configuration.

NEW SETTINGS AS OF v3.4^

{
  "format": {
    "wrap": 0,
    "liquid": {},
    "markup: {},
    "json": {},
  }
}
