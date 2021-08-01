import { sparser } from '../parser/sparser';

export default (function options_init () {

  const optionDef = {
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
      lexer: [ 'style' ],
      type: 'boolean'
    },
    objectSort: {
      default: false,
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
  };

  // @ts-ignore
  sparser.libs.optionDef = optionDef;
}());
