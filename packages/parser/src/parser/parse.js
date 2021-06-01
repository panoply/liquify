import { TokenType } from 'enums/types'
import { TokenTags } from 'enums/tags'
import { TokenContext } from 'enums/context'
import { TokenKind } from 'enums/kinds'
import { ParseError } from 'enums/errors'
import context from 'parser/context'
import iNode from 'parser/node'
import scanner from 'parser/scanner'
import spec from 'parser/specs'
import config from 'parser/options'

/**
 * Parser
 *
 * Liquid/HTML parser function which constructs and tokenized syntaxes.
 *
 * @param {Parser.IAST} document
 */
export function parse (document, cursor = false) {

  /**
   * @type {number}
   */
  let token = scanner.scan()

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
        if (config.context) context.add(TokenContext.OpenTag)
        break
      case TokenType.DelimiterClose:
        if (config.context) context.add(TokenContext.CloseTag)
        break

      // SPACING
      // -----------------------------------------------------------------
      case TokenType.Whitespace:
        if (config.context && config.whitespace) context.add(TokenContext.Whitespace)
        break
      case TokenType.Newline:
        if (config.context && config.newlines) context.add(TokenContext.Newline)
        break

        // BOOLEAN
      // -----------------------------------------------------------------
      case TokenType.Variable:
        if (config.context) context.add(TokenContext.Variable)
        break

      // BOOLEAN
      // -----------------------------------------------------------------
      case TokenType.Boolean:
        if (config.context) context.add(TokenContext.Boolean)
        break

      // NUMBERS
      // -----------------------------------------------------------------
      case TokenType.Integer:
        if (config.context) context.add(TokenContext.Integer)
        break
      case TokenType.Float:
        if (config.context) context.add(TokenContext.Float)
        break
      case TokenType.Number:
        if (config.context) context.add(TokenContext.Number)
        break

      // STRINGS
      // -----------------------------------------------------------------
      case TokenType.String:
        if (config.context) context.add(TokenContext.String)
        break
      case TokenType.StringSingleQuote:
        if (config.context) context.add(TokenContext.Object)
        break
      case TokenType.StringDoubleQuote:
        if (config.context) context.add(TokenContext.Object)
        break

      // TRIMS
      // -----------------------------------------------------------------
      case TokenType.LiquidTrimDashLeft:
        if (config.context) context.add(TokenContext.LeftTrim)
        break
      case TokenType.LiquidTrimDashRight:
        if (config.context) context.add(TokenContext.RightTrim)
        break

      case TokenType.Separator:
        if (config.context) context.add(TokenContext.Separator)
        break

      // DIAGNOSTICS
      // -----------------------------------------------------------------
      case TokenType.ParseWarning:

        iNode.Error(scanner.error)

        break

      case TokenType.ParseError:

        iNode.Error(scanner.error)

        break

      case TokenType.ParseSkip:

        if (node) {

          if (!node.singular) {
            iNode.Pairs.list.pop()
            iNode.Pairs.list.pop()
          }

          node = undefined
        }

        break

      // HTML TAGS
      // -----------------------------------------------------------------
      case TokenType.HTMLStartTagOpen:
        if (config.context) context.add(TokenContext.OpenTag)
        break

      case TokenType.HTMLTagName:

        iNode.node = document.nodes.length

        // @ts-ignore
        node = new iNode.Node()

        node.type = TokenTags.associate
        node.kind = TokenKind.HTML
        node.singular = false

        if (config.context) {
          node.context.push(context.size)
          context.add(TokenContext.Identifier)
        }

        node.name = scanner.token
        iNode.Pairs.list.push(node.name, node.index)

        break

      case TokenType.HTMLAttributeName:
        if (config.context) context.add(TokenContext.Attribute)
        state = scanner.token
        node.attributes[state] = null
        break
      case TokenType.HTMLOperatorValue:
        if (config.context) context.add(TokenContext.Operator)
        break
      case TokenType.HTMLAttributeValue:
        if (config.context) context.add(TokenContext.String)
        node.attributes[state] = scanner.token
        break
      case TokenType.HTMLEndTag:

        // Find hierarch - The parental node
        node = document.nodes[iNode.Pairs.match]

        // Validate the parent matches the hierarch node
        if (node?.name === scanner.token) {

          // CONTEXT
          if (config.context) context.add(TokenContext.EndTag)

          node.offsets.push(scanner.start)

          if (config.context) node.context.push(context.size)

          // AST LOGIC
          iNode.node = node.index

          break
        }

        break

      case TokenType.HTMLEndTagClose:
      case TokenType.HTMLEndCommentTag:
      case TokenType.HTMLStartTagClose:

        if (!node) break

        node.offsets.push(scanner.offset)
        node.token.push(scanner.tag)
        node.range.end = scanner.range.end

        // CONTEXT
        if (config.context) context.add(TokenContext.CloseTag)

        // ADD ONLY START BASIC TAGS TO AST
        if (token !== TokenType.HTMLEndTagClose) {

          node.language = spec.associates.match(node.name, Object.values(node.attributes))
          node.index = document.nodes.length

          document.embeds.push(node.index)
          document.nodes.push(node)
        }

        break

      // LIQUID TAGS
      // -----------------------------------------------------------------
      case TokenType.LiquidTag:

        iNode.node = document.nodes.length

        // @ts-ignore
        node = new iNode.Node()
        node.type = spec.type
        node.singular = false

        if (config.context) node.context.push(context.size)

        break

      // OUTPUT OBJECT TYPE TAGS
      // -----------------------------------------------------------------
      case TokenType.ObjectTag:

        iNode.node = document.nodes.length

        // @ts-ignore
        node = new iNode.Node()
        node.type = spec.type

        if (config.context) node.context.push(context.size)

        break

      // SINGULAR LIQUID TAGS
      // -----------------------------------------------------------------
      case TokenType.LiquidSingularTag:

        iNode.node = document.nodes.length

        // @ts-ignore
        node = new iNode.Node()
        node.type = spec.type

        if (config.context) node.context.push(context.size)

        break

      // BASIC END TAG
      // -----------------------------------------------------------------
      case TokenType.LiquidEndTag: {

        // Find hierarch - The parental node
        node = document.nodes[iNode.Pairs.match]

        // console.log(iNode.Pairs.list, node?.name, scanner.token)
        // Validate the parent matches the hierarch node
        if (node?.name === scanner.token) {

          // CONTEXT
          if (config.context) context.add(TokenContext.EndTag)

          // document.cursor IN NODE
          if (cursor) {
            if (node.type === TokenTags.embedded) {
              if (node.end > document.cursor[0] && scanner.start < document.cursor[1]) {
                iNode.node = node.index
                document.node = node
                cursor = false
              }
            }
          }

          node.offsets.push(scanner.start)

          if (config.context) node.context.push(context.size)

          // AST LOGIC
          iNode.node = node.index

          break
        }

        // The endtag is invalid - missing parental hierarch
        // create a new node on the AST representing this invalid node

        // @ts-ignore
        node = new iNode.Node()
        node.offsets.push(scanner.offset)
        if (config.context) node.context.push(context.size)

        // AST LOGIC
        iNode.Error(ParseError.InvalidSyntactic)

        // CONTEXT
        if (config.context) context.add(TokenContext.EndTag)

        break
      }
      // CLOSE TAGS
      // -----------------------------------------------------------------
      case TokenType.LiquidTagClose:
      case TokenType.LiquidEndTagClose:

        node.offsets.push(scanner.offset)
        node.token.push(scanner.tag)
        node.range.end = scanner.range.end

        if (scanner.error === ParseError.MissingCloseDelimiter) {
          iNode.Error(scanner.error)
        }

        // CONTEXT
        if (config.context) context.add(TokenContext.CloseTag)

        // ADD ONLY START BASIC TAGS TO AST
        if (token !== TokenType.LiquidEndTagClose) {

          node.index = document.nodes.length
          document.nodes.push(node)

          if (cursor) {
            if (document.cursor[0] > node.start && document.cursor[1] < node.end) {
              document.node = node
              iNode.node = node.index
              cursor = false
            }
          }

        }

        // RESETS
        node = undefined
        spec.reset()
        spec.object.reset()

        break

      // LIQUID OBJECT
      // -----------------------------------------------------------------
      case TokenType.Object:

        if (config.context) context.add(TokenContext.Object)

        // SAVE OFFSET
        spec.object.at(scanner.offset)

        node.objects = {
          ...node.objects,
          [spec.object.offset]: [ scanner.token ]
        }

        break

        // LIQUID OBJECT
      // -----------------------------------------------------------------
      case TokenType.LiquidTagName:

        if (config.context) context.add(TokenContext.Identifier)

        node.name = scanner.token

        if (!scanner.spec?.singular) {
          // ASSERT HIERARCH
          iNode.Pairs.list.push(node.name, node.index)
        }

        break

      // EMBEDDED TYPES
      // -----------------------------------------------------------------
      case TokenType.Embedded:

        node.name = scanner.token
        node.type = spec.type
        node.language = spec.get.language

        // ASSERT HIERARCH
        iNode.Pairs.list.push(node.name, node.index)
        document.embeds.push(node.index)

        if (config.context) context.add(TokenContext.Identifier)

        break

      // LIQUID CONTROL CONDITION
      // -----------------------------------------------------------------
      case TokenType.Control:

        node.name = scanner.token
        node.type = spec.type

        iNode.Pairs.list.push(node.name, node.index)

        if (config.context) context.add(TokenContext.Identifier)

        break

      case TokenType.ControlCondition:
        if (config.context) context.add(TokenContext.Condition)
        break
      case TokenType.ControlOperator:
        if (config.context) context.add(TokenContext.Operator)
        break

      case TokenType.ObjectBracketNotationOpen:
        if (config.context) context.add(TokenContext.OpenBracket)
        break
      case TokenType.ObjectBracketNotationClose:
        if (config.context) context.add(TokenContext.CloseBracket)
        break
      case TokenType.ObjectProperty:

        if (config.context) context.add(TokenContext.Property)

        // VALIDATE PROPERTY
        if (scanner.isError(ParseError.UnknownProperty)) iNode.Error(scanner.error)

        // PUSH NEXT PROPERTY
        node.objects[spec.object.offset].push(scanner.token)
        node.objects[scanner.offset + 1] = spec.object.offset

        // SAVE OFFSET
        spec.object.at(scanner.offset)

        break
      case TokenType.ObjectPropertyString:

        if (config.context) context.add(TokenContext.Property)

        // PUSH NEXT PROPERTY
        node.objects[spec.object.offset].push(scanner.token)
        node.objects[scanner.offset + 1] = spec.object.offset

        // SAVE OFFSET
        spec.object.at(scanner.offset)

        break
      case TokenType.ObjectPropertyNumber:
        if (config.context) context.add(TokenContext.Integer)
        break
      case TokenType.ObjectPropertyObject:
        if (config.context) context.add(TokenContext.PropertyObject)
        break
      case TokenType.ObjectDotNotation:
        if (config.context) context.add(TokenContext.Separator)
        break

      // FILTERS
      // -----------------------------------------------------------------
      case TokenType.Filter:
        if (config.context) context.add(TokenContext.Separator)
        break
      case TokenType.FilterIdentifier:
        if (config.context) context.add(TokenContext.Keyword)
        node.filters = {
          ...node.filters,
          [scanner.offset + scanner.token.length]: scanner.token
        }
        break
      case TokenType.FilterOperator:
        if (config.context) context.add(TokenContext.Operator)
        break
      case TokenType.FilterArgument:
        if (config.context) context.add(TokenContext.String)
        break
      case TokenType.FilterArgumentNumber:
        if (config.context) context.add(TokenContext.Integer)
        break
      case TokenType.FilterParameter:
        if (config.context) context.add(TokenContext.Parameter)
        break

      // LIQUID ITERATION ITEREE
      // -----------------------------------------------------------------
      case TokenType.IterationIteree:

        context.add(TokenContext.Iteree)

        break

      case TokenType.IterationOperator:
        context.add(TokenContext.Operator)
        break
      case TokenType.IterationArray:
        context.add(TokenContext.Array)
        break
      case TokenType.IterationParameter:
        context.add(TokenContext.Keyword)
        break
      case TokenType.IterationParameterValue:
        context.add(TokenContext.Integer)
        break

    }

    token = scanner.scan()

  }

  /**
   * Hierarch Errors
   *
   * We push any hierarch errors at the end of the
   * document parsing sequence.
   */
  while (iNode.Pairs.list.length > 0) {
    iNode.Pairs.list.shift()
    const index = iNode.Pairs.list.shift()
    if (typeof index === 'number') {
      iNode.Error(
        ParseError.MissingEndTag,
        document.nodes[index].token[0]
      )
    }
  }

  // RETURN THIS SHIT

  return document

}
