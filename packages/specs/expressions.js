/* eslint key-spacing: ["error", {
    "align": {
        "beforeColon": true,
        "afterColon": true
    }
}] */

export default {

  indentifier : /[a-zA-Z0-9_]/,
  string      : [
    /${argument}/,
    /in/,
    /${argument}|\\(${number|variable}[.]{2}${number|variable}\\)/,
    /\b(limit)\b:/,
    /${number|variable}/
  ]
}
