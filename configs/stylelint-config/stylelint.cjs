module.exports = {
  plugins: ["stylelint-scss"],
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-rational-order",
  ],
  rules: {
    "string-quotes": "double",
    "selector-class-pattern": "^[a-zA-Z_-]+$",
    "scss/dollar-variable-empty-line-before": null,
    indentation: 2,
    "block-no-empty": null,
    "color-no-invalid-hex": true,
    "comment-empty-line-before": [
      "always",
      {
        ignore: ["stylelint-commands", "after-comment"],
      },
    ],
    "declaration-colon-newline-after": null,
    "no-descending-specificity": null,
    "declaration-colon-space-after": "always",
    "max-empty-lines": 2,
    "block-opening-brace-newline-after": "always-multi-line",
    "rule-empty-line-before": [
      "always-multi-line",
      {
        "ignore": [
          "after-comment",
          "first-nested"
        ]
      }
    ]
  }
};
