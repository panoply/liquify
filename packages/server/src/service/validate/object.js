import _ from 'lodash'
import { DiagnosticSeverity } from 'vscode-languageserver'
import { Server } from '../../export'
import { TokenTag, TokenType } from '../../parser/lexical'
import { regexp } from '../../../.scripts/old/lexical'

export default ({

  /**
   * Validation Meta
   *
   * @type {import('../../../../release/vscode-liquify/server/node_modules/defs').ValidationMeta}
   */
  meta: {
    group: 'object',
    rules: {
      name: true,
      property: true
    },
    types: [
      TokenType.control,
      TokenType.import,
      TokenType.iteration,
      TokenType.object,
      TokenType.variable
    ],
    tags: [
      TokenTag.start,
      TokenTag.singular,
      TokenTag.child
    ]
  },

  /**
   * Validate Function
   *
   * @param {object} context
   * @returns {import('vscode-languageserver').Diagnostic | false}
   */
  validate: async context => {

    return context.token

    /* if (!ASTnode.objects) return false

    const problems = []

    for (const [ name, keys ] of Object.entries(ASTnode.objects)) {

      // Get the specification record - we will use the passed in record
      // specification else we locate the spec record
      const spec = Server.specification[name]

      // Fast forward if spec `properties` key does not exist or `false`
      if (spec?.props) {

        if (typeof spec.props === 'boolean' && !spec.props) {

          problems.push([
            `"${name}" is not an object\n"${keys.join('.')}" are not required.`,
            DiagnosticSeverity.Warning,
            token.indexOf(name),
            name.length
          ])

          break

        }

      } else break

      // Validate the props of all objects
      const flatten = _.flattenDeep(spec.props)
      const invalid = keys.filter(i => !flatten.includes(i))

      // Fast forward if properties are valid
      if (invalid.length === 0) break

      // Generate an expression of the invalid properties
      const regex = new RegExp(`\\b${invalid.join('|')}\\b`, 'g')

      // Iterate over invalid properties
      regexp(regex, token, { problems })(capture => [

        `Property "${capture[0]}" is invalid or does not exist on this object`,
        DiagnosticSeverity.Error,
        start + capture.index,
        start + capture.index + capture[0].length

      ])

    }

    return document => problems.map(([
      message,
      severity,
      startPos,
      endPos
    ]) => (
      {
        source,
        severity,
        message,
        range: {
          start: document.positionAt(startPos),
          end: document.positionAt(endPos)
        }
      }
    ))
    */
  }
})
