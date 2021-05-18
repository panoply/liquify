import { TokenType } from 'enums/types'
import { TokenContext } from 'enums/context'
import { ParseError } from 'enums/errors'
import { NodeAST } from 'parser/node'
import scanner from 'parser/scanner'
import spec from 'parser/specs'

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

  while (token !== TokenType.EOS) {

    switch (token) {

      // SPACING
      // -----------------------------------------------------------------
      case TokenType.Whitespace:
        if (this.context && this.whitespace) node.context(TokenContext.Whitespace)
        break
      case TokenType.Newline:
        if (this.context && this.newlines) node.context(TokenContext.Newline)
        break

      // BOOLEAN
      // -----------------------------------------------------------------
      case TokenType.Boolean:
        if (this.context) node.context(TokenContext.Boolean)
        break

      // NUMBERS
      // -----------------------------------------------------------------
      case TokenType.Integer:
        if (this.context) node.context(TokenContext.Integer)
        break
      case TokenType.Float:
        if (this.context) node.context(TokenContext.Float)
        break

      // STRINGS
      // -----------------------------------------------------------------
      case TokenType.String:
        if (this.context) node.context(TokenContext.String)
        break
      case TokenType.StringSingleQuote:
        if (this.context) node.context(TokenContext.Object)
        break
      case TokenType.StringDoubleQuote:
        if (this.context) node.context(TokenContext.Object)
        break

      // TRIMS
      // -----------------------------------------------------------------
      case TokenType.LiquidTrimDashLeft:
        if (this.context) node.context(TokenContext.LeftTrim)
        break
      case TokenType.LiquidTrimDashRight:
        if (this.context) node.context(TokenContext.RightTrim)
        break

      case TokenType.Separator:
        if (this.context) node.context(TokenContext.Separator)
        break

      // DIAGNOSTICS
      // -----------------------------------------------------------------
      case TokenType.ParseWarning:

        node.offset(scanner.offset)
        node.error(scanner.error)

        break

      case TokenType.ParseError:

        node.offset(scanner.offset)
        node.error(scanner.error)

        break

      // OBJECT TAGS
      // -----------------------------------------------------------------
      case TokenType.LiquidObjectTag:

        // @ts-ignore
        node = new NodeAST()

        break

      // BASIC TAGS
      // -----------------------------------------------------------------
      case TokenType.LiquidTag:

        // @ts-ignore
        node = new NodeAST()

        break

      // SINGULAR TAGS
      // -----------------------------------------------------------------
      case TokenType.LiquidSingularTag:

        // @ts-ignore
        node = new NodeAST()

        break

      // BASIC END TAG
      // -----------------------------------------------------------------
      case TokenType.LiquidEndTag:

        // Find hierarch - The parental node
        node = document.ast[NodeAST.hierarch.pop()]

        // Checks for a matching parent
        if (node?.name === scanner.token) {
          node.offset(scanner.offset)
          break
        }

        // The endtag is invalid - missing parental hierarch
        // create a new node on the AST representing this invalid node
        // @ts-ignore
        node = new NodeAST()
        node.name = scanner.token

        break

      // CLOSE TAGS
      // -----------------------------------------------------------------
      case TokenType.LiquidTagClose:
      case TokenType.LiquidEndTagClose:

        node.offset(scanner.offset)
        node.token.push(scanner.tag)
        node.range.end = scanner.range.end

        if (scanner.error === ParseError.MissingCloseDelimiter) {
          node.error(scanner.error)
        }

        if (token === TokenType.LiquidEndTagClose) {
          NodeAST.errors.delete(node.start)
          break
        }

        document.ast.push(node)
        spec.reset()
        node = undefined

        break

      // LIQUID OBJECT
      // -----------------------------------------------------------------
      case TokenType.Object:

        if (this.context) node.context(TokenContext.Object)

        node.name = scanner.token
        node.type = spec.type
        node.objects.set(scanner.offset + scanner.token.length, scanner.token)

        break

      case TokenType.ObjectBracketNotationOpen:
        if (this.context) node.context(TokenContext.OpenBracket)
        break
      case TokenType.ObjectBracketNotationClose:
        if (this.context) node.context(TokenContext.CloseBracket)
        break
      case TokenType.ObjectProperty:
        if (this.context) node.context(TokenContext.Property)
        break
      case TokenType.ObjectPropertyString:
        if (this.context) node.context(TokenContext.PropertyString)
        break
      case TokenType.ObjectPropertyNumber:
        if (this.context) node.context(TokenContext.Integer)
        break
      case TokenType.ObjectPropertyObject:
        if (this.context) node.context(TokenContext.PropertyObject)
        break

      // FILTERS
      // -----------------------------------------------------------------
      case TokenType.Filter:
        if (this.context) node.context(TokenContext.Separator)
        break
      case TokenType.FilterIdentifier:
        if (this.context) node.context(TokenContext.Keyword)
        node.filters.set(scanner.offset + scanner.token.length, scanner.token)
        break
      case TokenType.FilterOperator:
        if (this.context) node.context(TokenContext.Operator)
        break
      case TokenType.FilterArgument:
        if (this.context) node.context(TokenContext.String)
        break
      case TokenType.FilterArgumentNumber:
        if (this.context) node.context(TokenContext.Integer)
        break
      case TokenType.FilterParameter:
        if (this.context) node.context(TokenContext.Parameter)
        break

      // LIQUID CONTROL CONDITION
      // -----------------------------------------------------------------
      case TokenType.Control:

        if (this.context) node.context(TokenContext.Identifier)

        node.name = scanner.token
        node.type = spec.type
        node.hierarch(document.ast.length)
        node.error(ParseError.MissingEndTag)

        break

      case TokenType.ControlCondition:
        if (this.context) node.context(TokenContext.Condition)
        break
      case TokenType.ControlOperator:
        if (this.context) node.context(TokenContext.Operator)
        break

      // LIQUID ITERATION ITEREE
      // -----------------------------------------------------------------
      case TokenType.IterationIteree:

        node.context(TokenContext.Iteree)

        break

      case TokenType.IterationOperator:
        node.context(TokenContext.Operator)
        break
      case TokenType.IterationArray:
        node.context(TokenContext.Array)
        break
      case TokenType.IterationParameter:
        node.context(TokenContext.Keyword)
        break
      case TokenType.IterationParameterValue:
        node.context(TokenContext.Integer)
        break

    }

    token = scanner.scan()

  }

  return document

}
