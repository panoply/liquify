import { DiagnosticSeverity } from 'vscode-languageserver'
import { Characters } from '../../parser/lexical'

/**
 *
 * @param {import('vscode-languageserver').TextDocument} document
 * @param {[import('vscode-languageserver').Diagnostic]} Diagnostics
 * @param {object} lexer
 * @returns
 */


    diagnostics.push({
          source,
          severity: DiagnosticSeverity.Error,
          message: `The "${name}" tag must be contained within\n"${within}" tag types.`,
          range: {
            start: document.positionAt(start),
            end: document.positionAt(end)
          }
        })

export function Validate (document) {

  const { DQO, SQO } = TokenCharacters
  const source = Client.engineLabel

  return diagnostics => ({

     // console.log(token)

        diagnostics.push({
          severity: DiagnosticSeverity.Error,
          message: TokenTag.Close === tag
            ? 'Missing an open/start tag'
            : 'Missing an close/end tag',
          source,
          range: {
            start: document.positionAt(start),
            end: document.positionAt(end)
          }
        }),

    /**
     * Tag Placement
     *
     * @export
     * @param {*} token
     * @param {*} [ start, end ]
     * @param {*} { name, within }
     */
    operators ({
      source,
      token,
      position,
      offset: [ start ],
      record: { filters }
    }) {

      if (TokenGrammers.OP.test(token[position - 2])) {
        if (TokenGrammers.OP.test(token[position])) {
          return document => ({
            source,
            severity: DiagnosticSeverity.Error,
            message: 'Extraneous operator value',
            range: {
              start: document.positionAt(start + position),
              end: document.positionAt(start + position + 1)
            }
          })
        }
      }

      return false

    },

    filters ({
      token,
      problems = [],
      offset: [ start, end ],
      record: { name, filters }
    }) {

      let match

      if (filters === false) {

        const disabled = ending.exec(token)

        if (disabled === null) return false

        problems.push([
          `The "${name}" tag does not accept filter attributes`,
          DiagnosticSeverity.Error,
          start + disabled.index,
          start + disabled.index + disabled[0].length
        ])

      } else {

        while ((match = filter.exec(token)) !== null) {

          match.index === filter.lastIndex && filter.lastIndex++

          for (const m of match) {
            problems.push([
              `Incomplete filter definition on the ${name} tag`,
              DiagnosticSeverity.Warning,
              start + match.index,
              start + match.index + m.length
            ])
          }
        }
      }

      return document => problems.map(([
        message,
        severity,
        position,
        length
      ]) => (
        {
          severity,
          message,
          range: {
            start: document.positionAt(position),
            end: document.positionAt(length)
          }
        }
      ))

    },

    objects ({
      token,
      offset: [ start ],
      record
    }) {

      // Find all matches
      const match = token.match(TokenGrammers.properties)

      if (match === null) return false

      // Filter out string values
      const items = match.filter(([ str ]) => !TokenGrammers.quotes.test(str))

      if (items.length === 0) return false

      const problems = []
      const props = items.map(i => [ i.split('.')[0], i.split('.').slice(1) ])

      for (const prop of props) {

        const [ name, keys ] = prop

        // Get the specification record - we will use the passed in record
        // specification else we locate the spec record
        const spec = (record.type === TokenType.object && items.length === 1)
          ? record
          : Specification.filter(i => i.name === name)[0]

        // Fast forward if spec `properties` key does not exist or `false`
        if (_.has(spec, 'properties')) {
          if (typeof spec.properties === 'boolean' && spec.properties === false) {
            problems.push([
              `"${name}" is not an object\n"${keys.join('.')}" are not required.`,
              DiagnosticSeverity.Warning,
              token.indexOf(name),
              name.length
            ])
            break
          }
        } else break

        // Validate the properties of all objects
        const invalidProps = keys.filter(i => !_.flattenDeep(spec.properties).includes(i))

        // Fast forward if properties are valid
        if (invalidProps.length === 0) break

        // Generate an expression of the invalid properties
        const regex = new RegExp(`\\b${invalidProps.join('|')}\\b`, 'g')

        let property

        // Iterate over invalid properties
        while ((property = regex.exec(token)) !== null) {

          property.index === regex.lastIndex && regex.lastIndex++

          // Iterate over all matches
          for (const p of property) {
            problems.push([
              `Property "${p}" is invalid or does not exist on this object`,
              DiagnosticSeverity.Error,
              property.index,
              p.length
            ])
          }
        }
      }

      return document => problems.map(([
        message,
        severity,
        index,
        characters
      ]) => (
        {
          severity,
          message,
          range: {
            start: document.positionAt(start + index),
            end: document.positionAt(start + index + characters)
          }
        }
      ))

    },

    whitespace ({
      source,
      token,
      position,
      document,
      problems = [],
      offset: [ start ],
      record: { whitespace = true }
    }) {

      if (whitespace) return false

      const { DSH } = TokenCharacters

      if (token.charCodeAt(2) === DSH) {
        problems.push(start + 2)
      }

      if (token.charCodeAt(token.length - 3) === DSH) {
        problems.push(start + token.length - 3)
      }

      if (problems.length === 0) return false

      return document => problems.map(position => (
        {
          severity: DiagnosticSeverity.Error,
          message: 'Tag does not accept whitespace dashes',
          range: {
            start: document.positionAt(position),
            end: document.positionAt(position + 1)
          }
        }
      ))

    }

  })

}
