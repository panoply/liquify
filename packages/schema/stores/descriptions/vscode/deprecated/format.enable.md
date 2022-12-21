DEPRECATED

The "liquid.format.enable" workspace setting is deprecated. Use language specific settings for formatting capabilities, provide the following vscode workspace configuration to enable formatting of Liquid files:

SETTINGS AS OF v3.4^

{
  "[liquid]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "sissel.shopify-liquid"
  }
}
