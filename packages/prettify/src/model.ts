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
      grammar: {},
      lexer: 'markup',
      language: 'liquid',
      languageName: 'Liquid',
      mode: 'beautify',
      indentLevel: 0,
      crlf: false,
      endNewline: false,
      indentChar: ' ',
      indentSize: 2,
      preserveLine: 2,
      wrap: 0,
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
        arrayFormat: 'default',
        braceNewline: false,
        bracePadding: false,
        braceStyle: 'none',
        braceAllman: false,
        caseSpace: false,
        commentIndent: false,
        commentNewline: false,
        correct: false,
        elseNewline: false,
        endComma: 'never',
        functionNameSpace: false,
        functionSpace: false,
        methodChain: 4,
        neverFlatten: false,
        noCaseIndent: false,
        noSemicolon: false,
        objectSort: false,
        objectIndent: 'default',
        preserveComment: false,
        quoteConvert: 'none',
        styleGuide: 'none',
        ternaryLine: false,
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
