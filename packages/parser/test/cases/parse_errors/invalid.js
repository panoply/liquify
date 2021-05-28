import * as Regex from '../../../src/lexical/regex'

export default (
  [
    {
      title: 'Invalid Liquid Object Name',
      description: 'Parsing error for number (digit) object values.',
      capture: {
        regex: Regex.Digits,
        colour: 'redBright',
        stringify: false
      },
      tests: (
        [
          {
            test: '{{ 100 }}',
            pass: {
              severity: 1,
              message: 'Invalid object name was expressed',
              node: 0,
              range: {
                start: { line: 0, character: 9 },
                end: { line: 0, character: 9 }
              }
            }
          }
        ]
      )
    },
    {
      title: 'Missing object property',
      description: 'Object property is missing',
      capture: {
        regex: /[.]/,
        colour: 'redBright',
        stringify: false
      },
      tests: (
        [
          {
            test: '{{ object. }}',
            pass: {
              severity: 1,
              message: 'Invalid object name was expressed',
              node: 0,
              range: {
                start: { line: 0, character: 9 },
                end: { line: 0, character: 9 }
              }
            }
          }
        ]
      )
    }
  ]
)
