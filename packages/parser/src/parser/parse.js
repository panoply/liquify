import { TokenType } from 'lexical/tokens'
import { TokenContext } from 'lexical/context'
import { NodeType } from 'lexical/types'
import { NodeLanguage } from 'lexical/language'
import { NodeKind } from 'lexical/kind'
import { ParseError } from 'lexical/errors'
import Context from 'parser/context'
import ASTNode from 'parser/node'
import Scanner from 'parser/scanner'
import Spec from 'parser/specs'
import Config from 'parser/options'
import Errors from 'parser/errors'

/**
 * Parser
 *
 * Liquid/HTML parser function which constructs and tokenized syntaxes.
 *
 * @param {Parser.AST} document
 */
export function parse (document, cursor = false) {

  const INode = ASTNode(document)

  /**
   * @type {number}
   */
  let token = Scanner.scan()

  /**
   * @type {any}
   */
  let state

  /**
   * @type {any}
   */
  let index

  /**
   * @type {Parser.ASTNode}
   */
  let node

  let root

  /**
   * Resets the current parsing state
   * references we are using
   *
   * @returns {void}
   */
  const reset = (context = NaN) => {

    // RESET LETTINGS
    state = undefined
    node = undefined

    // RESET SPECS
    Spec.reset()
    Spec.object.reset()

    if (!isNaN(context)) Context.remove(context)

  }

  while (token !== TokenType.EOS) {

    switch (token) {

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

      // PARSE ERROR
      // -----------------------------------------------------------------
      case TokenType.ParseError:

        document.errors.push(Errors(Scanner.error, Scanner.range))

        break

      // PARSE CANCEL
      // -----------------------------------------------------------------
      case TokenType.ParseCancel:

        break

      // PARSE SKIP
      // -----------------------------------------------------------------
      case TokenType.ParseSkip:

        if (node) {

          if (!node.singular) {
            Scanner.syntactic.list.pop()
            Scanner.syntactic.list.pop()
          }

          node = undefined
        }

        break

      // DELIMITER OPEN
      // -----------------------------------------------------------------
      case TokenType.DelimiterOpen:
        if (Config.context) Context.add(TokenContext.OpenTag)
        break

      // DELIMITER TRIMS
      // -----------------------------------------------------------------
      case TokenType.TrimDashLeft:
        if (Config.context) Context.add(TokenContext.LeftTrim)
        break
      case TokenType.TrimDashRight:
        if (Config.context) Context.add(TokenContext.RightTrim)
        break

      case TokenType.Separator:
        if (Config.context) Context.add(TokenContext.Separator)
        break

      // OUTPUT TAG NAME
      // -----------------------------------------------------------------
      case TokenType.ObjectTag:
      case TokenType.SingularTag:
      case TokenType.StartTag:

        index = document.nodes.length

        node = new INode()
        node.type = Spec.type
        node.root = typeof root === 'number' ? root : index
        node.parent = Scanner.syntactic.parent || index

        if (token === TokenType.StartTag) {
          node.singular = false
          if (typeof root === 'undefined') root = index
        }

        if (Config.context) node.context.push(Context.size)

        break

      // END TAG
      // -----------------------------------------------------------------
      case TokenType.EndTag: {

        // Find hierarch - The parental node
        node = document.nodes[Scanner.syntactic.match]

        // console.log(Scanner.syntactic.list, node?.name, Scanner.token)

        // Validate the parent matches the hierarch node
        if (node?.name === Scanner.token) {

          if (Scanner.syntactic.list.length === 0) root = undefined

          if (Config.context) Context.add(TokenContext.EndTag)

          if (cursor && node.type === NodeType.embedded) {
            if (node.end > document.cursor && Scanner.start < document.cursor) {
              document.node = node
              index = node.index
              cursor = false
            }
          }

          node.offsets.push(Scanner.start)

          if (Config.context) node.context.push(Context.size)

          // AST LOGIC
          index = node.index
          state = TokenType.EndTag
          break
        }

        // The endtag is invalid - missing parental hierarch
        // create a new node on the AST representing this invalid node

        node = new INode()
        node.name = Scanner.token

        // AST LOGIC
        state = ParseError.InvalidSyntactic

        // CONTEXT
        if (Config.context) {
          Context.add(TokenContext.EndTag)
          node.context.push(Context.size)
        }

        break

      }

      // DELIMITER CLOSE
      // -----------------------------------------------------------------
      case TokenType.DelimiterClose:
      case TokenType.DelimiterEnder:

        node.offsets.push(Scanner.offset)
        node.token.push(Scanner.tag)
        node.range.end = Scanner.range.end

        if (Config.context) Context.add(TokenContext.CloseTag)

        // ONLY START OR SINGULAR TYPE TAGS ARE PUSHED ONTO AST
        if (token === TokenType.DelimiterClose) {

          document.nodes.push(node)

          if (cursor) {
            if (document.cursor > node.start && document.cursor < node.end) {
              document.node = node
              index = node.index
              cursor = false
            }
          }
        }

        if (state === ParseError.InvalidSyntactic) {
          node.index = document.nodes.length
          document.errors.push(
            Errors(
              ParseError.InvalidSyntactic,
              node.range
            )
          )
        }

        reset()

        break

      // VARIABLE
      // -----------------------------------------------------------------
      case TokenType.Variable:

        if (Config.context) Context.add(TokenContext.Variable)

        break

      case TokenType.VariableIdentifier:

        if (Config.context) Context.add(TokenContext.Identifier)

        node.name = Scanner.token
        node.type = Spec.type

        if (!Scanner.spec?.singular) {
          Scanner.syntactic.list.push(node.name, index)
        }

        break

      case TokenType.VariableKeyword:

        if (Config.context) Context.add(TokenContext.Keyword)

        document.variables[node.index] = { label: Scanner.token }

        if (document.nodes[node.index - 1]?.type === NodeType.comment) {
          document.variables[node.index].description = document.nodes[node.index - 1].content
        }

        break

      case TokenType.VariableOperator:
        if (Config.context) Context.add(TokenContext.Operator)
        break
      case TokenType.VariableValue:
        if (Config.context) Context.add(TokenContext.Assignment)
        break

      // OBJECT NAME
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

      case TokenType.ObjectBracketNotationOpen:
        if (Config.context) Context.add(TokenContext.OpenBracket)
        break
      case TokenType.ObjectBracketNotationClose:
        if (Config.context) Context.add(TokenContext.CloseBracket)
        break
      case TokenType.ObjectProperty:

        if (Config.context) Context.add(TokenContext.Property)

        // VALIDATE PROPERTY
        if (Scanner.error === ParseError.UnknownProperty) {

          document.errors.push(
            Errors(
              Scanner.error,
              Scanner.range
            )
          )
        }

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

      // BASIC TAG NAME
      // -----------------------------------------------------------------
      case TokenType.LiquidTagName:

        if (Config.context) Context.add(TokenContext.Identifier)

        node.name = Scanner.token

        if (!Scanner.spec?.singular) {
          // ASSERT HIERARCH
          Scanner.syntactic.list.push(node.name, index)
        }

        break

      // EMBEDDED LANGUAGE TAG
      // -----------------------------------------------------------------
      case TokenType.Embedded:

        node.name = Scanner.token
        node.type = Spec.type
        node.language = NodeLanguage[Spec.get.language]

        // ASSERT HIERARCH
        Scanner.syntactic.list.push(node.name, index)
        document.embeds.push(index)

        if (Config.context) Context.add(TokenContext.Identifier)

        break

        // COMMENT TAG
      // -----------------------------------------------------------------
      case TokenType.Comment:

        node.name = Scanner.token
        node.type = Spec.type

        // ASSERT HIERARCH
        Scanner.syntactic.list.push(node.name, index)

        document.comments.push(index)

        if (Config.context) Context.add(TokenContext.Identifier)

        break

      // CONTROL TAG
      // -----------------------------------------------------------------
      case TokenType.Control:

        node.name = Scanner.token
        node.type = Spec.type

        Scanner.syntactic.list.push(node.name, index)

        if (Config.context) Context.add(TokenContext.Identifier)

        break

      case TokenType.ControlCondition:
        if (Config.context) Context.add(TokenContext.Condition)
        break
      case TokenType.ControlOperator:
        if (Config.context) Context.add(TokenContext.Operator)
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

      // ITERATION TAG
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

      // HTML START TAG OPEN
      // -----------------------------------------------------------------
      case TokenType.HTMLStartTagOpen:
        if (Config.context) Context.add(TokenContext.OpenTag)
        break

      case TokenType.HTMLTagName:

        index = document.nodes.length

        // @ts-ignore
        node = new INode()

        node.kind = NodeKind.HTML
        node.singular = false

        if (Config.context) {
          node.context.push(Context.size)
          Context.add(TokenContext.Identifier)
        }

        node.name = Scanner.token
        Scanner.syntactic.list.push(node.name, node.index)

        break

      // HTML ATTRIBUTE
      // -----------------------------------------------------------------
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
        node = document.nodes[Scanner.syntactic.match]

        // Validate the parent matches the hierarch node
        if (node?.name === Scanner.token) {

          // CONTEXT
          if (Config.context) Context.add(TokenContext.EndTag)

          node.offsets.push(Scanner.start)

          if (Config.context) node.context.push(Context.size)

          // AST LOGIC
          index = node.index

          break
        }

        break

      // HTML START TAG OPEN
      // -----------------------------------------------------------------
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

    }

    token = Scanner.scan()

  }

  Scanner.syntactic.hierarch(document)

  return document

}
