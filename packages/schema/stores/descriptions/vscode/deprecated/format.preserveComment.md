DEPRECATED

The "liquid.format.preserveComment" workspace setting is deprecated. This formatting rule is no longer considered global and can now be defined on a per language level within the "liquid.format.rules" object setting.

NEW SETTINGS AS OF v3.4^

{
  "liquid.format.rules": {
    "wrap": 0,
    "liquid": {
      "preserveComment": true,
    },
    "markup": {
      "preserveComment": true,
    },
    "style": {
      "preserveComment": false,
    },
    "script": {
      "preserveComment": false,
    }
  }
}
