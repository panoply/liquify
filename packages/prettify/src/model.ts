/* eslint-disable no-lone-blocks */

import { Prettify } from 'types/prettify';

/* -------------------------------------------- */
/* EXPORT                                       */
/* -------------------------------------------- */

export const prettify: Prettify = (function () {

  const env = (typeof process !== 'undefined' && process.versions != null) ? 'node' : 'browser';

  let input: string | Buffer = '';

  return {
    env,
    mode: 'beautify',
    end: 0,
    iterator: 0,
    start: 0,
    scopes: [],
    beautify: {},
    lexers: {},
    get source (): string {
      return env === 'node' && Buffer.isBuffer(input)
        ? input.toString()
        : input as string;
    },
    set source (source: string | Buffer) {
      input = env === 'node'
        ? Buffer.isBuffer(source) ? source : Buffer.from(source)
        : source;
    },
    data: {
      begin: [],
      ender: [],
      lexer: [],
      lines: [],
      stack: [],
      token: [],
      types: []
    },
    hooks: {
      before: [],
      language: [],
      rules: [],
      after: []
    },
    stats: {
      chars: -1,
      time: -1,
      size: '',
      language: ''
    },
    options: {
      lexer: 'auto',
      language: 'text',
      languageName: 'Plain Text',
      mode: 'beautify',
      indentLevel: 0,
      crlf: false,
      commentIndent: true,
      endNewline: false,
      indentChar: ' ',
      indentSize: 2,
      preserveComment: false,
      preserveLine: 2,
      wrap: 0,
      grammar: {},
      liquid: {
        commentNewline: false,
        commentIndent: true,
        delimiterTrims: 'preserve',
        ignoreTagList: [],
        lineBreakSeparator: 'default',
        normalizeSpacing: true,
        preserveComment: false,
        quoteConvert: 'none',
        valueForce: 'intent'
      },
      markup: {
        correct: false,
        commentNewline: false,
        commentIndent: true,
        attributeCasing: 'preserve',
        attributeSort: false,
        attributeSortList: [],
        forceAttribute: 3,
        forceLeadAttribute: true,
        forceIndent: false,
        ignoreStyles: false,
        ignoreScripts: false,
        preserveComment: false,
        preserveText: false,
        preserveAttributes: false,
        selfCloseSpace: true,
        quoteConvert: 'none'
      },
      style: {
        correct: false,
        atRuleSpace: true,
        compressCSS: false,
        classPadding: false,
        noLeadZero: false,
        sortSelectors: false,
        sortProperties: false,
        quoteConvert: 'none',
        forceValue: 'preserve'
      },
      script: {
        correct: false,
        braceNewline: false,
        bracePadding: false,
        braceStyle: 'none',
        braceAllman: false,
        commentNewline: false,
        caseSpace: false,
        elseNewline: false,
        endComma: 'never',
        arrayFormat: 'default',
        objectSort: false,
        objectIndent: 'default',
        functionNameSpace: false,
        functionSpace: false,
        styleGuide: 'none',
        ternaryLine: false,
        methodChain: 4,
        neverFlatten: false,
        noCaseIndent: false,
        noSemicolon: false,
        quoteConvert: 'none',
        variableList: 'none',
        vertical: false
      },
      json: {
        useStringify: false,
        arrayFormat: 'default',
        braceAllman: false,
        bracePadding: false,
        objectIndent: 'default',
        objectSort: false
      }
    }
  };

})();
