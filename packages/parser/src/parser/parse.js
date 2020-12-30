import { TokenType } from '../enums/types'
import { TokenContext } from '../enums/context'
import { TokenKind } from '../enums/kinds'
import { ParseError } from '../enums/errors'
import * as TokenTags from '../lexical/tags'
import Node from './node'
import scan from './scanner'
import spec from './specs'

/**
 * Parser
 *
 * Liquid/HTML parser function which constructs and tokenizes syntaxes.
 *
 *
 * @this {Parser.Options}
 * @param {object} document
 * @this {Parser.Options}
 */
export function parse (document) {

  /**
   * @type {number}
   */
  let token = scan.scanner()

  /**
   * @type {Parser.ASTNode}
   */
  let node

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
          if (node?.context) {
            node.context(TokenContext.Whitespace)
          }
        }

        break

      // PRESET - LIQUID WHITESPACE DASH
      //
      // Presets whitespace strip dash - to node
      // -----------------------------------------------------------------
      case TokenType.LiquidWhitespaceDash:

        if (this.context) {
          Node.preset.dash = TokenContext.Dash
        }

        break

      // PARSER - PARSE ERROR
      //
      // Pushes parse errors onto node stack
      // -----------------------------------------------------------------
      case TokenType.ParseError:

        node.end = scan.position
        node.range.end = scan.getRange()
        node.offsets.push(node.end)
        node.error(scan.error)

        console.log('parse erroor', node)

        //  document.ast.push(node)

        break

      // PRESET - LIQUID TAG OPEN
      //
      // Presets the starting offset position of tag scanned
      //
      // ^{{ object
      // ^{% tag
      // ^{% endtag
      // -----------------------------------------------------------------
      case TokenType.LiquidTagOpen:
      case TokenType.LiquidEndTagOpen:
      case TokenType.LiquidObjectTagOpen:

        Node.preset.start = scan.index

        break

      // LIQUID TAG NAME KEYWORD
      //
      // Tag reference is created and added to the AST
      //
      // name^ %}
      // name^ }}
      // -----------------------------------------------------------------
      case TokenType.LiquidTag:
      case TokenType.LiquidObjectTag:
      case TokenType.LiquidSingularTag:

        // @ts-ignore
        node = new Node()

        node.name = scan.token

        if (this.context) {
          if (Node.preset.dash) {
            node.context(Node.preset.dash)
          }
          node.context((token === TokenType.LiquidObjectTag
            ? TokenContext.Object
            : TokenContext.Keyword
          ))
        }

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
        if (node?.name === scan.token) {
          node.offsets.push(scan.index)
          break
        }

        // The endtag is invalid - missing parental hierarch
        // create a new node on the AST representing this invalid node
        // @ts-ignore
        node = new Node()

        // Populate node match
        node.name = scan.token

        console.log('error, unmatched tag pair')

        break

      // LIQUID TAG CLOSE
      //
      // Closing delimiters of Liquid tags
      //
      // %}^
      // }}^
      // --------------------------------------`---------------------------
      case TokenType.LiquidTagClose:
      case TokenType.LiquidEndTagClose:
      case TokenType.LiquidObjectTagClose:
      case TokenType.LiquidSingularTagClose:

        node.end = scan.position
        node.range.end = scan.getRange()
        node.token.push(scan.getText(Node.preset.start))
        node.offsets.push(node.end)

        // Push node onto AST stack
        document.ast.push(node)

        // Assume tag has no ender
        // We will splice this out in "LiquidEndTag"
        if (token === TokenType.LiquidTagClose) {
          node.error(ParseError.MissingEndTag)
        } else if (token === TokenType.LiquidEndTagClose) {
          Node.hierarch.splice(Node.hierarch.length - 1, 1)
          Node.errors.splice(Node.hierarch.length - 1, 1)
        }

        // Reset Preset & Spec
        node.reset(document.ast.length - 1)
        spec.reset()

        break

      case TokenType.Object:

        if (this.context) {
          node.context(TokenContext.Object)
        }

        node.objects = scan.token
          .split('.')
          .filter(Boolean)
          .reduce((objects, prop) => (
            {
              ...objects
              , [scan.index + prop.length]: prop
            }
          ), {})

        break

      case TokenType.ObjectProperties:

        node.context(TokenContext.Property)

        break

      // LIQUID CONTROL CONDITION
      // -----------------------------------------------------------------
      case TokenType.ControlCondition:

        node.context(TokenContext.Identifier)

        break

      // LIQUID CONTROL OPERATOR
      // -----------------------------------------------------------------
      case TokenType.ControlOperator:

        node.context(TokenContext.Operator)

        if (/[=!><]/.test(scan.token) && scan.token.length > 2) {
          node.error(ParseError.InvalidOperator)
          break
        }

        if (!/^(?:==|!=|>=|<=|<|>|\b(?:or|and)\b)$/.test(scan.token)) {
          node.error(ParseError.InvalidOperator)
        }

        break

      // LIQUID ITERATION ITEREE
      // -----------------------------------------------------------------
      case TokenType.IterationIteree:

        node.context(TokenContext.Iteree)

        if (!/^(?:[^\W\s]+|[.-]+)+/.test(scan.getToken())) {
          node.errors.push('Invalid characters detected in iteree')
        }

        break

      // LIQUID ITERATION OPERATOR
      // -----------------------------------------------------------------
      case TokenType.IterationOperator:

        node.context(TokenContext.Operator)

        if (!/\bin\b/.test(scan.token)) {
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

        if (/\d{1,}/.test(scan.token)) {
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
        node.start = scan.index
        node.name = scan.getToken()

        break

      // YAML FRONTMATTER OPEN
      // -----------------------------------------------------------------
      case TokenType.FrontmatterStart:

        node = document.ast[document.ast.push(new Node()) - 1]
        node.type = TokenTags.embedded
        node.kind = TokenKind.Yaml
        node.token.push(scan.getText(0, scan.end + 1))
        node.offsets.push(0, scan.end + 1)

        break

      // YAML FRONTMATTER CLOSE
      // -----------------------------------------------------------------
      case TokenType.FrontmatterEnd:

        node.name = 'frontmatter'
        node.offsets.push(scan.getIndex, scan.end)
        node.token.push(scan.getText(scan.getIndex))

        break

    }

    token = scan.scanner()

  }

  document.parseErrors = [ ...document.parseErrors, ...Node.errors ]

  console.log(Node.hierarch)

  return document

}
