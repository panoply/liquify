
export const sparser = {
  lexers: {},
  libs: {},
  options: {
    lexerOptions: {
      markup: {
        attributeSort: false
        , attributeSortList: []
        , parseSpace: false
        , preserveText: false
        , quoteConvert: 'none'
        , tagMerge: false
        , tagSort: false
        , preserveAttribute: false
      }
      , script: {
        endComma: 'none'
        , objectSort: false
        , quoteConvert: 'none'
        , variableList: 'none'
      }
      , style: {
        noLeadZero: false
        , objectSort: false
        , quoteConvert: 'none'
      }
    }
    , attemptCorrection: false
    , crlf: false
    , format: 'arrays'
    , language: 'auto'
    , lexer: 'auto'
    , preserveComment: false
    , source: ''
    , wrap: 0
  }
  , parseError: ''
  , version: {
    date: '18 Aug 2019'
    , number: '1.4.12'
  }
};
