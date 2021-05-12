import { TokenType } from '../enums/types'
import { TokenContext } from '../enums/context'
import { TokenKind } from '../enums/kinds'
import { ParseError } from '../enums/errors'
import { TokenTags } from '../enums/parse'
import Node from './node'
import scanner from './scanner'
import spec from './specs'

/**
 * Parser
 *
 * Liquid/HTML parser function which constructs and tokenized syntaxes.
 *
 *
 * @param {object} document
 * @this {Parser.Options}
 */
export function parse (document) {

  /**
   * @type {number}
   */
  let token = scanner.scan()

  /**
   * @type {Parser.ASTNode}
   */
  let node

  let track
  let context

  while (token !== TokenType.EOS) {

    switch (token) {

      // CONTEXT - SEPARATOR CHARACTER
      //
      // Pushes separator characters to stack
      // -----------------------------------------------------------------
      case TokenType.Separator:

        node.context(TokenContext.Separator)

        break

      // CONTEXT - WHITESPACE
      //
      // Tracks whitespace spacing between tokens
      // -----------------------------------------------------------------
      case TokenType.Whitespace:

        if (this.context && this.whitespace) {
          if (node?.context) node.context(TokenContext.Whitespace)
        }

        break

      case TokenType.Newline:

        if (this.context && this.whitespace) {
          if (node?.context) node.context(TokenContext.Newline)
        }

        break

      // PARSER - PARSE ERROR
      //
      // Pushes parse errors onto node stack
      // -----------------------------------------------------------------
      case TokenType.ParseWarning:

        node.end = scanner.offset
        // node.range.end = scanner.position
        // node.offsets.push(node.end)
        node.error(scanner.error)

        // document.ast.push(node)

        break

      // PARSER - PARSE ERROR
      //
      // Pushes parse errors onto node stack
      // -----------------------------------------------------------------
      case TokenType.ParseError:

        // @ts-ignore - Create node if undefined
        if (!node) node = new Node()

        node.end = scanner.offset
        // node.range.end = scanner.position
        // node.offsets.push(node.end)
        node.error(scanner.error)

        // document.ast.push(node)

        break

      // PRESET - LIQUID TAG OPEN
      //
      // Presets the starting offset position of tag scanned
      //
      // ^{{ object
      // ^{% tag
      // ^{% endtag
      // -----------------------------------------------------------------
      case TokenType.LiquidObjectTag:
      case TokenType.LiquidTag:

        // @ts-ignore
        node = new Node()

        break

      // LIQUID WHITESPACE DASH LEFT
      //
      // {{-^
      // -----------------------------------------------------------------
      case TokenType.LiquidTrimDashLeft:
        node.context(TokenContext.LeftTrim)

        break

      // LIQUID WHITESPACE DASH RIGHT
      //
      // -^}}
      // -----------------------------------------------------------------
      case TokenType.LiquidTrimDashRight:
        node.context(TokenContext.RightTrim)
        break

      // LIQUID TAG NAME KEYWORD
      //
      // Tag reference is created and added to the AST
      //
      // name^ %}
      // name^ }}
      // -----------------------------------------------------------------
      case TokenType.LiquidSingularTag:

        // console.log('get text: ' + scanner.dash)
        // @ts-ignore
        node = new Node()

        node.name = scanner.token

        // Push non-singular tags onto hierarch
        if (token === TokenType.LiquidTag) {
          Node.hierarch.push(document.ast.length)
        }

        break

      // LIQUID END TAG
      //
      // Match returns text proceeding "end" in "end^tag", eg:
      //
      // ^name %}
      // -----------------------------------------------------------------
      case TokenType.LiquidEndTag:

        // Find hierarch - The parental node
        node = document.ast[Node.hierarch[Node.hierarch.length - 1] - 1]

        // Checks for a matching parent
        if (node?.name === scanner.token) {
          node.offsets.push(scanner.offset)
          break
        }

        // The endtag is invalid - missing parental hierarch
        // create a new node on the AST representing this invalid node
        // @ts-ignore
        node = new Node()

        // Populate node match
        node.name = scanner.token

        console.log('error, unmatched tag pair')

        break

      // LIQUID TAG CLOSE
      //
      // Closing delimiters of Liquid tags
      //
      // %}^
      // }}^
      // -----------------------------------------------------------------
      case TokenType.LiquidTagClose:
      case TokenType.LiquidEndTagClose:
      case TokenType.LiquidObjectTagClose:
      case TokenType.LiquidSingularTagClose:

        node.end = scanner.offset
        node.range.end = scanner.range.end
        node.token = scanner.tag
        node.offsets.push(node.end)

        // Push node onto AST stack
        document.ast.push(node)

        // Assume tag has no ender
        // We will splice this out in "LiquidEndTag"
        if (token === TokenType.LiquidTagClose) {
          // node.error(ParseError.MissingEndTag)
        } else if (token === TokenType.LiquidEndTagClose) {
          Node.hierarch.splice(Node.hierarch.length - 1, 1)
          Node.errors.splice(Node.hierarch.length - 1, 1)
        }

        // Reset Preset & Spec
        node.reset(document.ast.length - 1)
        spec.reset()

        // Reset
        node = undefined

        break

      case TokenType.String:
        node.context(TokenContext.String)
        break

      case TokenType.StringSingleQuote:
        node.context(TokenContext.Object)
        break

      case TokenType.StringDoubleQuote:
        node.context(TokenContext.Object)
        break

      // LIQUID OBJECT
      // -----------------------------------------------------------------
      case TokenType.Object:
        node.context(TokenContext.Object)
        node.objects = scanner.token
          .split('.')
          .filter(Boolean)
          .reduce((objects, prop) => (
            {
              ...objects
              , [scanner.offset + prop.length]: prop
            }
          ), {})

        break

      // LIQUID OBJECT PROPERTY OPEN BRACKET
      // -----------------------------------------------------------------
      case TokenType.ObjectBracketNotationOpen:
        node.context(TokenContext.OpenBracket)
        break
      // LIQUID OBJECT PROPERTY OPEN BRACKET
      // -----------------------------------------------------------------
      case TokenType.ObjectBracketNotationClose:
        node.context(TokenContext.CloseBracket)
        break
      // LIQUID OBJECT PROPERTY
      // -----------------------------------------------------------------
      case TokenType.ObjectProperty:
        node.context(TokenContext.Property)
        break

      // LIQUID OBJECT PROPERTY STRING
      // -----------------------------------------------------------------
      case TokenType.ObjectPropertyString:
        node.context(TokenContext.PropertyString)
        break

      // LIQUID OBJECT PROPERTY OBJECT
      // -----------------------------------------------------------------
      case TokenType.ObjectPropertyObject:
        node.context(TokenContext.PropertyObject)
        break

      case TokenType.Filter:
        node.context(TokenContext.Keyword)
        track = scanner.offset
        node.filter(track)
        break

      case TokenType.FilterParameter:
        node.context(TokenContext.Parameter)
        node.filters[track].context.push()
        node.filters[track].offset[1] = scanner.offset
        node.filters[track].token = scanner.getText(
          node.filters[track].offset[0],
          node.filters[track].offset[node.filters[track].offset.length - 1]
        )
        node.filters[track].params.push({
          range: scanner.range,
          value: scanner.token
        })
        break

      // LIQUID CONTROL CONDITION
      // -----------------------------------------------------------------
      case TokenType.ControlCondition:

        node.context(TokenContext.Identifier)

        console.log('in here')

        break

      // LIQUID CONTROL OPERATOR
      // -----------------------------------------------------------------
      case TokenType.ControlOperator:

        node.context(TokenContext.Operator)

        if (/[=!><]/.test(scanner.token) && scanner.token.length > 2) {
          node.error(ParseError.InvalidOperator)
          break
        }

        if (!/^(?:==|!=|>=|<=|<|>|\b(?:or|and)\b)$/.test(scanner.token)) {
          node.error(ParseError.InvalidOperator)
        }

        break

      // LIQUID ITERATION ITEREE
      // -----------------------------------------------------------------
      case TokenType.IterationIteree:

        node.context(TokenContext.Iteree)

        if (!/^(?:[^\W\s]+|[.-]+)+/.test(scanner.token)) {
          node.errors.push('Invalid characters detected in iteree')
        }

        break

      // LIQUID ITERATION OPERATOR
      // -----------------------------------------------------------------
      case TokenType.IterationOperator:

        node.context(TokenContext.Operator)

        if (!/\bin\b/.test(scanner.token)) {
          node.errors.push('Invalid Logical Operator')
        }

        break

      // LIQUID ITERATION ARRAY
      // -----------------------------------------------------------------
      case TokenType.IterationArray:

        node.context(TokenContext.Array)

        break

      // LIQUID ITERATION PARAMETERS
      // -----------------------------------------------------------------
      case TokenType.IterationParameter:

        node.context(TokenContext.Keyword)

        break

      // LIQUID ITERATION PARAMETER VALUE
      // -----------------------------------------------------------------
      case TokenType.IterationParameterValue:

        if (/\d{1,}/.test(scanner.token)) {
          node.context(TokenContext.Number)
        } else {
          node.context(TokenContext.Invalid)
          node.errors.push('Invalid Parameter Value, must be number value')
        }

        break

      // HTML START TAG OPEN
      // -----------------------------------------------------------------
      case TokenType.HTMLStartTagOpen:

        node = document.ast[document.ast.push(new Node()) - 1]
        node.start = scanner.offset
        node.name = scanner.token

        break

      // YAML FRONTMATTER OPEN
      // -----------------------------------------------------------------
      case TokenType.FrontmatterStart:

        node = document.ast[document.ast.push(new Node()) - 1]
        node.type = TokenTags.embedded
        node.kind = TokenKind.Yaml
        node.token.push(scanner.getText(0, scanner.end + 1))
        node.offsets.push(0, scanner.end + 1)

        break

      // YAML FRONTMATTER CLOSE
      // -----------------------------------------------------------------
      case TokenType.FrontmatterEnd:

        node.name = 'frontmatter'
        node.offsets.push(scanner.getIndex, scanner.end)
        node.token.push(scanner.getText(scanner.getIndex))

        break

    }

    token = scanner.scan()

  }

  document.parseErrors = [ ...document.parseErrors, ...Node.errors ]

  // console.log(Node.hierarch)

  return document

}
