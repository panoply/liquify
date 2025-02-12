/** @type {import('stylelint').Config} */
export default {
  plugins: [
    "stylelint-scss",
  ],
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-rational-order",
  ],
  rules: {
    // SCSS
    "scss/dollar-variable-empty-line-before": null,
    "scss/function-quote-no-quoted-strings-inside": true,
    "scss/block-no-redundant-nesting": true,

    // BUILT IN
    "function-url-quotes": null,
    "block-no-empty": null,
    "color-no-invalid-hex": true,
    "comment-empty-line-before": [
      "always",
      {
        ignore: ["stylelint-commands", "after-comment"],
      },
    ],
    "no-descending-specificity": null,
    "rule-empty-line-before": [
      "always",
      {
        except: [
          "inside-block-and-after-rule"
        ],
        ignore: [
          "after-comment",
          "first-nested",
          "inside-block"
        ],
      }
    ]
  }
};
