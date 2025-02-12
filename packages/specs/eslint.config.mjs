import shared from '@liquify/eslint-config';

export default [
  {
    ignores: [
    "package/**",
      "bin/**"
    ]
  },
  ...shared,
 {
    rules: {
      "no-template-curly-in-string": "off",
      "no-unused-vars": "off",
      "no-control-regex": "off",
      "prefer-const": "off"
    }
 }
];
