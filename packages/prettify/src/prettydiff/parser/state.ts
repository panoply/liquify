export const prettydiff = {
  api: {
    optionsDef: {
      attributeSort: {
        api: 'any',
        default: false,
        lexer: 'markup',
        mode: 'any',
        type: 'boolean'
      },
      attributeSortList: {
        api: 'any',
        default: '',
        lexer: 'markup',
        mode: 'any',
        type: 'string'
      },
      braceNewline: {
        api: 'any',
        default: false,
        label: 'Brace Lines',
        lexer: 'script',
        mode: 'beautify',
        type: 'boolean'
      },
      bracePadding: {
        api: 'any',
        default: false,
        lexer: 'script',
        mode: 'beautify',
        type: 'boolean'
      },
      braceStyle: {
        api: 'any',
        default: 'none',
        lexer: 'script',
        mode: 'beautify',
        type: 'string',
        values: [
          'collapse',
          'collapse-preserve-inline',
          'expand',
          'none'
        ]
      },
      braceAllman: {
        api: 'any',
        default: false,
        lexer: 'script',
        mode: 'beautify',
        type: 'boolean'
      },
      caseSpace: {
        api: 'any',
        default: false,
        lexer: 'script',
        mode: 'beautify',
        type: 'boolean'
      },
      commentNewline: {
        api: 'any',
        default: false,
        lexer: 'markup',
        mode: 'beautify',
        type: 'boolean'
      },
      comments: {
        api: 'any',
        default: false,
        lexer: 'any',
        mode: 'beautify',
        type: 'boolean'
      },
      compressCSS: {
        api: 'any',
        default: false,
        lexer: 'style',
        mode: 'beautify',
        type: 'boolean'
      },
      config: {
        api: 'node',
        default: 'none',
        lexer: 'any',
        mode: 'any',
        type: 'string'
      },
      content: {
        api: 'any',
        default: false,
        lexer: 'any',
        mode: 'diff',
        type: 'boolean'
      },
      attemptCorrection: {
        api: 'any',
        default: false,
        lexer: 'any',
        mode: 'any',
        type: 'boolean'
      },
      crlf: {
        api: 'any',
        default: false,
        lexer: 'any',
        mode: 'any',
        type: 'boolean'
      },
      classPadding: {
        api: 'any',
        default: false,
        lexer: 'style',
        mode: 'beautify',
        type: 'boolean'
      },
      diff: {
        api: 'any',
        default: '',
        lexer: 'any',
        mode: 'diff',
        type: 'string'
      },
      elseNewline: {
        api: 'any',
        default: false,
        lexer: 'script',
        mode: 'beautify',
        type: 'boolean'
      },
      endComma: {
        api: 'any',
        default: 'never',
        lexer: 'script',
        mode: 'beautify',
        type: 'string',
        values: [
          'always',
          'never',
          'none'
        ]
      },
      forceAttribute: {
        api: 'any',
        default: false,
        lexer: 'markup',
        mode: 'beautify',
        type: 'boolean'
      },
      forceIndent: {
        api: 'any',
        default: false,
        lexer: 'markup',
        mode: 'beautify',
        type: 'boolean'
      },
      arrayFormat: {
        api: 'any',
        default: 'default',
        lexer: 'script',
        mode: 'beautify',
        type: 'string',
        values: [
          'default',
          'indent',
          'inline'
        ]
      },
      objectIndent: {
        api: 'any',
        default: 'default',
        lexer: 'script',
        mode: 'beautify',
        type: 'string',
        values: [
          'default',
          'indent',
          'inline'
        ]
      },
      functionNameSpace: {
        api: 'any',
        default: false,
        lexer: 'script',
        mode: 'beautify',
        type: 'boolean'
      },
      indentChar: {
        api: 'any',
        default: ' ',
        lexer: 'any',
        mode: 'beautify',
        type: 'string'
      },
      indentLevel: {
        api: 'any',
        default: 0,
        lexer: 'any',
        mode: 'beautify',
        type: 'number'
      },
      indentSize: {
        api: 'any',
        default: 2,
        lexer: 'any',
        mode: 'beautify',
        type: 'number'
      },
      language: {
        api: 'any',
        default: 'auto',
        lexer: 'any',
        mode: 'any',
        type: 'string'
      },
      languageDefault: {
        api: 'any',
        default: 'text',
        lexer: 'any',
        mode: 'any',
        type: 'string'
      },
      languageName: {
        api: 'any',
        default: 'JavaScript',
        lexer: 'any',
        mode: 'any',
        type: 'string'
      },
      lexer: {
        api: 'any',
        default: 'auto',
        lexer: 'any',
        mode: 'any',
        type: 'string',
        values: [
          'auto',
          'markup',
          'script',
          'style'
        ]
      },
      methodChain: {
        api: 'any',
        default: 3,
        lexer: 'script',
        mode: 'beautify',
        type: 'number'
      },
      mode: {
        api: 'any',
        default: 'diff',
        lexer: 'any',
        mode: 'any',
        type: 'string',
        values: [
          'beautify',
          'diff',
          'parse'
        ]
      },
      neverFlatten: {
        api: 'any',
        default: false,
        lexer: 'script',
        mode: 'beautify',
        type: 'boolean'
      },
      endNewline: {
        api: 'any',
        default: false,
        lexer: 'any',
        mode: 'any',
        type: 'boolean'
      },
      noCaseIndent: {
        api: 'any',
        default: false,
        lexer: 'script',
        mode: 'beautify',
        type: 'boolean'
      },
      noLeadZero: {
        api: 'any',
        default: false,
        lexer: 'style',
        mode: 'any',
        type: 'boolean'
      },
      noSemicolon: {
        api: 'any',
        default: false,
        lexer: 'script',
        mode: 'beautify',
        type: 'boolean'
      },
      objectSort: {
        api: 'any',
        default: false,
        lexer: 'any',
        mode: 'beautify',
        type: 'boolean'
      },
      output: {
        api: 'node',
        default: '',
        lexer: 'any',
        mode: 'any',
        type: 'string'
      },
      parseFormat: {
        api: 'any',
        default: 'parallel',
        lexer: 'any',
        mode: 'parse',
        type: 'string',
        values: [
          'parallel',
          'sequential'
        ]
      },
      parseSpace: {
        api: 'any',
        default: false,
        lexer: 'markup',
        mode: 'parse',
        type: 'boolean'
      },
      preserveLine: {
        api: 'any',
        default: 0,
        lexer: 'any',
        mode: 'beautify',
        type: 'number'
      },
      preserveComment: {
        api: 'any',
        default: false,
        lexer: 'any',
        mode: 'beautify',
        type: 'boolean'
      },
      preserveText: {
        api: 'any',
        default: false,
        lexer: 'markup',
        mode: 'any',
        type: 'boolean'
      },
      quote: {
        api: 'any',
        default: false,
        lexer: 'any',
        mode: 'diff',
        type: 'boolean'
      },
      quoteConvert: {
        api: 'any',
        default: 'none',
        lexer: 'any',
        mode: 'any',
        type: 'string',
        values: [
          'double',
          'none',
          'single'
        ]
      },
      selector_list: {
        api: 'any',
        default: false,
        lexer: 'style',
        mode: 'beautify',
        type: 'boolean'
      },
      semicolon: {
        api: 'any',
        default: false,
        lexer: 'script',
        mode: 'diff',
        type: 'boolean'
      },
      source: {
        api: 'any',
        default: '',
        lexer: 'any',
        mode: 'any',
        type: 'string'
      },
      space: {
        api: 'any',
        default: true,
        lexer: 'script',
        mode: 'beautify',
        type: 'boolean'
      },
      selfCloseSpace: {
        api: 'any',
        default: false,
        lexer: 'markup',
        mode: 'beautify',
        type: 'boolean'
      },
      styleguide: {
        api: 'any',
        default: 'none',
        lexer: 'script',
        mode: 'beautify',
        type: 'string',
        values: [
          'airbnb',
          'crockford',
          'google',
          'jquery',
          'jslint',
          'mediawiki',
          'mrdoob',
          'none',
          'semistandard',
          'standard',
          'yandex'
        ]
      },
      tagMerge: {
        api: 'any',
        default: false,
        lexer: 'markup',
        mode: 'any',
        type: 'boolean'
      },
      tagSort: {
        api: 'any',
        default: false,
        lexer: 'markup',
        mode: 'any',
        type: 'boolean'
      },
      ternaryLine: {
        api: 'any',
        default: false,
        lexer: 'script',
        mode: 'beautify',
        type: 'boolean'
      },
      preserveAttribute: {
        api: 'any',
        default: false,
        lexer: 'markup',
        mode: 'any',
        type: 'boolean'
      },
      variableList: {
        api: 'any',
        default: 'none',
        lexer: 'script',
        mode: 'any',
        type: 'string',
        values: [
          'each',
          'list',
          'none'
        ]
      },
      version: {
        api: 'node',
        default: false,
        lexer: 'any',
        mode: 'any',
        type: 'boolean'
      },
      vertical: {
        api: 'any',
        default: false,
        lexer: 'any',
        mode: 'beautify',
        type: 'boolean'
      },
      wrap: {
        api: 'any',
        default: 0,
        label: 'Wrap',
        lexer: 'any',
        mode: 'any',
        type: 'number'
      }
    }
  },
  scopes: [],
  sparser: {
    lexers: {},
    libs: {
      optionsDef: {
        attributeSort: {
          default: false,
          lexer: [ 'markup' ],
          type: 'boolean'
        },
        attributeSortList: {
          default: [],
          lexer: [ 'markup' ],
          type: 'array'
        },
        attemptCorrection: {
          default: false,
          lexer: [ 'all' ],
          type: 'boolean'
        },
        crlf: {
          default: false,
          lexer: [ 'all' ],
          type: 'boolean'
        },
        endComma: {
          default: 'none',
          lexer: [ 'script' ],
          type: 'string',
          values: [
            'always',
            'never',
            'none'
          ]
        },
        format: {
          default: 'arrays',
          lexer: [ 'all' ],
          type: 'string',
          values: [
            'arrays',
            'minimal',
            'objects'
          ]
        },
        language: {
          default: 'auto',
          lexer: [ 'all' ],
          type: 'string'
        },
        lexer: {
          default: 'auto',
          lexer: [ 'all' ],
          type: 'string'
        },
        noLeadZero: {
          default: false,
          definition: 'Whether the zero to the left of the decimal point should be removed from numbers between 0 and 1.',
          label: 'No Lead Zero',
          lexer: [ 'style' ],
          type: 'boolean'
        },
        objectSort: {
          default: false,
          definition: 'Where style properties should be sorted by type and then alphabetically and whether script object properties should be sorted alphabetically.',
          label: 'Object Sort',
          lexer: [ 'script', 'style' ],
          type: 'boolean'
        },
        parseSpace: {
          default: false,
          lexer: [ 'markup' ],
          type: 'boolean'
        },
        preserveComment: {
          default: false,
          lexer: [ 'all' ],
          type: 'boolean'
        },
        preserveText: {
          default: false,
          lexer: [ 'markup' ],
          type: 'boolean'
        },
        quoteConvert: {
          default: 'none',
          lexer: [ 'markup', 'script', 'style' ],
          type: 'string',
          values: [
            'double',
            'none',
            'single'
          ]
        },
        source: {
          default: '',
          lexer: [ 'all' ],
          type: 'string'
        },
        tagMerge: {
          default: false,
          lexer: [ 'markup' ],
          type: 'boolean'
        },
        tagSort: {
          default: false,
          lexer: [ 'markup' ],
          type: 'boolean'
        },
        preserveAttribute: {
          default: false,
          lexer: [ 'markup' ],
          type: 'boolean'
        },
        variableList: {
          default: 'none',
          lexer: [ 'script' ],
          mode: 'any',
          type: 'string',
          values: [
            'each',
            'list',
            'none'
          ]
        },
        wrap: {
          default: 0,
          lexer: [ 'all' ],
          type: 'number'
        }
      }
    },
    options: {
      lexerOptions: {
        markup: {
          attributeSort: false,
          attributeSortList: [],
          parseSpace: false,
          preserveText: false,
          quoteConvert: 'none',
          tagMerge: false,
          tagSort: false,
          preserveAttribute: false
        },
        script: {
          endComma: 'none',
          objectSort: false,
          quoteConvert: 'none',
          variableList: 'none'
        },
        style: {
          noLeadZero: false,
          objectSort: false,
          quoteConvert: 'none'
        }
      },
      attemptCorrection: false,
      crlf: false,
      format: 'arrays',
      language: 'auto',
      lexer: 'auto',
      preserveComment: false,
      source: '',
      wrap: 0
    },
    parseError: '',
    version: {
      date: '18 Aug 2019',
      number: '1.4.12'
    }
  },
  beautify: {},
  start: 0,
  end: 0,
  iterator: 0,
  meta: {
    error: '',
    lang: [ '', '', '' ],
    time: '',
    insize: 0,
    outsize: 0,
    difftotal: 0,
    difflines: 0
  },
  options: {
    attributeSort: false,
    attributeSortList: [],
    braceNewline: false,
    bracePadding: false,
    braceStyle: 'none',
    braceAllman: false,
    caseSpace: false,
    commentNewline: false,
    comments: false,
    compressCSS: false,
    config: '',
    content: false,
    attemptCorrection: false,
    crlf: false,
    classPadding: false,
    diff: '',
    diffFormat: 'text',
    elseNewline: false,
    endComma: 'never',
    endQuietly: 'default',
    forceAttribute: false,
    forceIndent: false,
    arrayFormat: 'default',
    objectIndent: 'default',
    functionNameSpace: false,
    help: 80,
    indentChar: ' ',
    indentLevel: 0,
    indentSize: 4,
    language: 'auto',
    languageDefault: 'text',
    languageName: 'JavaScript',
    lexer: 'auto',
    methodChain: 3,
    mode: 'diff',
    neverFlatten: false,
    endNewline: false,
    noCaseIndent: false,
    noLeadZero: false,
    noSemicolon: false,
    objectSort: false,
    output: '',
    parseFormat: 'parallel',
    parseSpace: false,
    preserveLine: 0,
    preserveComment: false,
    preserveText: false,
    quote: false,
    quoteConvert: 'none',
    selector_list: false,
    semicolon: false,
    source: '',
    space: true,
    selfCloseSpace: false,
    styleguide: 'none',
    tagMerge: false,
    tagSort: false,
    ternaryLine: false,
    preserveAttribute: false,
    variableList: 'none',
    version: false,
    vertical: false,
    wrap: 0,
    lexerOptions: {}
  }
};
