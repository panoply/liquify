import { TokenType } from 'enums/types'
import { TokenTags } from 'enums/tags'
import { TokenContext } from 'enums/context'
import { TokenKind } from 'enums/kinds'
import { ParseError } from 'enums/errors'
import Context from 'parser/context'
import ASTNode from 'parser/node'
import Scanner from 'parser/scanner'
import Spec from 'parser/specs'
import Config from 'parser/options'

/**
 * Parser
 *
 * Liquid/HTML parser function which constructs and tokenized syntaxes.
 *
 * @param {Parser.IAST} document
 */
export function parse (document, cursor = false) {

  ASTNode.Update(document)
  Context.Update(document.textDocument.uri)

  /**
   * @type {number}
   */
  let token = Scanner.scan()

  /**
   * @type {any}
   */
  let state

  /**
   * @type {Parser.ASTNode}
   */
  let node

  while (token !== TokenType.EOS) {

    switch (token) {

      // SPACING
      // -----------------------------------------------------------------
      case TokenType.DelimiterOpen:
        if (Config.context) Context.add(TokenContext.OpenTag)
        break
      case TokenType.DelimiterClose:
        if (Config.context) Context.add(TokenContext.CloseTag)
        break

      // SPACING
      // -----------------------------------------------------------------
      case TokenType.Whitespace:
        if (Config.context && Config.whitespace) Context.add(TokenContext.Whitespace)
        break
      case TokenType.Newline:
        if (Config.context && Config.newlines) Context.add(TokenContext.Newline)
        break

        // BOOLEAN
      // -----------------------------------------------------------------
      case TokenType.Variable:
        if (Config.context) Context.add(TokenContext.Variable)
        break

      // BOOLEAN
      // -----------------------------------------------------------------
      case TokenType.Boolean:
        if (Config.context) Context.add(TokenContext.Boolean)
        break

      // NUMBERS
      // -----------------------------------------------------------------
      case TokenType.Integer:
        if (Config.context) Context.add(TokenContext.Integer)
        break
      case TokenType.Float:
        if (Config.context) Context.add(TokenContext.Float)
        break
      case TokenType.Number:
        if (Config.context) Context.add(TokenContext.Number)
        break

      // STRINGS
      // -----------------------------------------------------------------
      case TokenType.String:
        if (Config.context) Context.add(TokenContext.String)
        break
      case TokenType.StringSingleQuote:
        if (Config.context) Context.add(TokenContext.Object)
        break
      case TokenType.StringDoubleQuote:
        if (Config.context) Context.add(TokenContext.Object)
        break

      // TRIMS
      // -----------------------------------------------------------------
      case TokenType.LiquidTrimDashLeft:
        if (Config.context) Context.add(TokenContext.LeftTrim)
        break
      case TokenType.LiquidTrimDashRight:
        if (Config.context) Context.add(TokenContext.RightTrim)
        break

      case TokenType.Separator:
        if (Config.context) Context.add(TokenContext.Separator)
        break

      // DIAGNOSTICS
      // -----------------------------------------------------------------
      case TokenType.ParseWarning:

        ASTNode.IError(Scanner.error)

        break

      case TokenType.ParseError:

        ASTNode.IError(Scanner.error)

        break

      case TokenType.ParseSkip:

        if (node) {

          if (!node.singular) {
            ASTNode.Pairs.list.pop()
            ASTNode.Pairs.list.pop()
          }

          node = undefined
        }

        break

      // HTML TAGS
      // -----------------------------------------------------------------
      case TokenType.HTMLStartTagOpen:
        if (Config.context) Context.add(TokenContext.OpenTag)
        break

      case TokenType.HTMLTagName:

        ASTNode.node = document.nodes.length

        // @ts-ignore
        node = new ASTNode.Node()

        node.type = TokenTags.associate
        node.kind = TokenKind.HTML
        node.singular = false

        if (Config.context) {
          node.context.push(Context.size)
          Context.add(TokenContext.Identifier)
        }

        node.name = Scanner.token
        ASTNode.Pairs.list.push(node.name, node.index)

        break

      case TokenType.HTMLAttributeName:
        if (Config.context) Context.add(TokenContext.Attribute)
        state = Scanner.token
        node.attributes[state] = null
        break
      case TokenType.HTMLOperatorValue:
        if (Config.context) Context.add(TokenContext.Operator)
        break
      case TokenType.HTMLAttributeValue:
        if (Config.context) Context.add(TokenContext.String)
        node.attributes[state] = Scanner.token
        break
      case TokenType.HTMLEndTag:

        // Find hierarch - The parental node
        node = document.nodes[ASTNode.Pairs.match]

        // Validate the parent matches the hierarch node
        if (node?.name === Scanner.token) {

          // CONTEXT
          if (Config.context) Context.add(TokenContext.EndTag)

          node.offsets.push(Scanner.start)

          if (Config.context) node.context.push(Context.size)

          // AST LOGIC
          ASTNode.node = node.index

          break
        }

        break

      case TokenType.HTMLEndTagClose:
      case TokenType.HTMLEndCommentTag:
      case TokenType.HTMLStartTagClose:

        if (!node) break

        node.offsets.push(Scanner.offset)
        node.token.push(Scanner.tag)
        node.range.end = Scanner.range.end

        // CONTEXT
        if (Config.context) Context.add(TokenContext.CloseTag)

        // ADD ONLY START BASIC TAGS TO AST
        if (token !== TokenType.HTMLEndTagClose) {

          node.language = Spec.associates.match(node.name, Object.values(node.attributes))
          node.index = document.nodes.length

          document.embeds.push(node.index)
          document.nodes.push(node)
        }

        break

      // LIQUID TAGS
      // -----------------------------------------------------------------
      case TokenType.LiquidTag:

        ASTNode.node = document.nodes.length

        // @ts-ignore
        node = new ASTNode.Node()
        node.type = Spec.type
        node.singular = false

        if (Config.context) node.context.push(Context.size)

        break

      // OUTPUT OBJECT TYPE TAGS
      // -----------------------------------------------------------------
      case TokenType.ObjectTag:

        ASTNode.node = document.nodes.length

        // @ts-ignore
        node = new ASTNode.Node()
        node.type = Spec.type

        if (Config.context) node.context.push(Context.size)

        break

      // SINGULAR LIQUID TAGS
      // -----------------------------------------------------------------
      case TokenType.LiquidSingularTag:

        ASTNode.node = document.nodes.length

        // @ts-ignore
        node = new ASTNode.Node()
        node.type = Spec.type

        if (Config.context) node.context.push(Context.size)

        break

      // BASIC END TAG
      // -----------------------------------------------------------------
      case TokenType.LiquidEndTag: {

        // Find hierarch - The parental node
        node = document.nodes[ASTNode.Pairs.match]

        // console.log(ASTNode.Pairs.list, node?.name, Scanner.token)
        // Validate the parent matches the hierarch node
        if (node?.name === Scanner.token) {

          // CONTEXT
          if (Config.context) Context.add(TokenContext.EndTag)

          // document.cursor IN NODE
          if (cursor) {
            if (node.type === TokenTags.embedded) {
              if (node.end > document.cursor[0] && Scanner.start < document.cursor[1]) {
                ASTNode.node = node.index
                document.node = node
                cursor = false
              }
            }
          }

          node.offsets.push(Scanner.start)

          if (Config.context) node.context.push(Context.size)

          // AST LOGIC
          ASTNode.node = node.index

          break
        }

        // The endtag is invalid - missing parental hierarch
        // create a new node on the AST representing this invalid node

        // @ts-ignore
        node = new ASTNode.Node()
        node.offsets.push(Scanner.offset)
        if (Config.context) node.context.push(Context.size)

        // AST LOGIC
        ASTNode.IError(ParseError.InvalidSyntactic)

        // CONTEXT
        if (Config.context) Context.add(TokenContext.EndTag)

        break
      }
      // CLOSE TAGS
      // -----------------------------------------------------------------
      case TokenType.LiquidTagClose:
      case TokenType.LiquidEndTagClose:

        node.offsets.push(Scanner.offset)
        node.token.push(Scanner.tag)
        node.range.end = Scanner.range.end

        if (Scanner.error === ParseError.MissingCloseDelimiter) {
          ASTNode.IError(Scanner.error)
        }

        // CONTEXT
        if (Config.context) Context.add(TokenContext.CloseTag)

        // ADD ONLY START BASIC TAGS TO AST
        if (token !== TokenType.LiquidEndTagClose) {

          node.index = document.nodes.length
          document.nodes.push(node)

          if (cursor) {
            if (document.cursor[0] > node.start && document.cursor[1] < node.end) {
              document.node = node
              ASTNode.node = node.index
              cursor = false
            }
          }

        }

        // RESETS
        node = undefined
        Spec.reset()
        Spec.object.reset()

        break

      // LIQUID OBJECT
      // -----------------------------------------------------------------
      case TokenType.Object:

        if (Config.context) Context.add(TokenContext.Object)

        // SAVE OFFSET
        Spec.object.at(Scanner.offset)

        node.objects = {
          ...node.objects,
          [Spec.object.offset]: [ Scanner.token ]
        }

        break

        // LIQUID OBJECT
      // -----------------------------------------------------------------
      case TokenType.LiquidTagName:

        if (Config.context) Context.add(TokenContext.Identifier)

        node.name = Scanner.token

        if (!Scanner.spec?.singular) {
          // ASSERT HIERARCH
          ASTNode.Pairs.list.push(node.name, node.index)
        }

        break

      // EMBEDDED TYPES
      // -----------------------------------------------------------------
      case TokenType.Embedded:

        node.name = Scanner.token
        node.type = Spec.type
        node.language = Spec.get.language

        // ASSERT HIERARCH
        ASTNode.Pairs.list.push(node.name, node.index)
        document.embeds.push(node.index)

        if (Config.context) Context.add(TokenContext.Identifier)

        break

      // LIQUID CONTROL CONDITION
      // -----------------------------------------------------------------
      case TokenType.Control:

        node.name = Scanner.token
        node.type = Spec.type

        ASTNode.Pairs.list.push(node.name, node.index)

        if (Config.context) Context.add(TokenContext.Identifier)

        break

      case TokenType.ControlCondition:
        if (Config.context) Context.add(TokenContext.Condition)
        break
      case TokenType.ControlOperator:
        if (Config.context) Context.add(TokenContext.Operator)
        break

      case TokenType.ObjectBracketNotationOpen:
        if (Config.context) Context.add(TokenContext.OpenBracket)
        break
      case TokenType.ObjectBracketNotationClose:
        if (Config.context) Context.add(TokenContext.CloseBracket)
        break
      case TokenType.ObjectProperty:

        if (Config.context) Context.add(TokenContext.Property)

        // VALIDATE PROPERTY
        if (Scanner.isError(ParseError.UnknownProperty)) ASTNode.IError(Scanner.error)

        // PUSH NEXT PROPERTY
        node.objects[Spec.object.offset].push(Scanner.token)
        node.objects[Scanner.offset + 1] = Spec.object.offset

        // SAVE OFFSET
        Spec.object.at(Scanner.offset)

        break
      case TokenType.ObjectPropertyString:

        if (Config.context) Context.add(TokenContext.Property)

        // PUSH NEXT PROPERTY
        node.objects[Spec.object.offset].push(Scanner.token)
        node.objects[Scanner.offset + 1] = Spec.object.offset

        // SAVE OFFSET
        Spec.object.at(Scanner.offset)

        break
      case TokenType.ObjectPropertyNumber:
        if (Config.context) Context.add(TokenContext.Integer)
        break
      case TokenType.ObjectPropertyObject:
        if (Config.context) Context.add(TokenContext.PropertyObject)
        break
      case TokenType.ObjectDotNotation:
        if (Config.context) Context.add(TokenContext.Separator)
        break

      // FILTERS
      // -----------------------------------------------------------------
      case TokenType.Filter:
        if (Config.context) Context.add(TokenContext.Separator)
        break
      case TokenType.FilterIdentifier:
        if (Config.context) Context.add(TokenContext.Keyword)
        node.filters = {
          ...node.filters,
          [Scanner.offset + Scanner.token.length]: Scanner.token
        }
        break
      case TokenType.FilterOperator:
        if (Config.context) Context.add(TokenContext.Operator)
        break
      case TokenType.FilterArgument:
        if (Config.context) Context.add(TokenContext.String)
        break
      case TokenType.FilterArgumentNumber:
        if (Config.context) Context.add(TokenContext.Integer)
        break
      case TokenType.FilterParameter:
        if (Config.context) Context.add(TokenContext.Parameter)
        break

      // LIQUID ITERATION ITEREE
      // -----------------------------------------------------------------
      case TokenType.IterationIteree:

        Context.add(TokenContext.Iteree)

        break

      case TokenType.IterationOperator:
        Context.add(TokenContext.Operator)
        break
      case TokenType.IterationArray:
        Context.add(TokenContext.Array)
        break
      case TokenType.IterationParameter:
        Context.add(TokenContext.Keyword)
        break
      case TokenType.IterationParameterValue:
        Context.add(TokenContext.Integer)
        break

    }

    token = Scanner.scan()

  }

  ASTNode.Pairs.hierarch(ParseError.MissingEndTag)

  return document

}
