import { TokenType } from '../enums/types'
import { TokenContext } from '../enums/context'
import { TokenKind } from '../enums/kinds'
import Node from './node'
import { parentNodes, object } from './utils'
import scanner from './scanner'
import specs from './specs'
import * as TokenTags from '../lexical/tags'
import { ScanState } from '../enums/state'

export function parse (document) {

  const hierarch = []

  let node
    , errors = []
    , token = scanner.scan()

  while (token !== TokenType.EOS) {

    switch (token) {

      case TokenType.Seperator:

        node.context = TokenContext.Seperator

        break

      case TokenType.ParseError:

        node.end = scanner.position
        //  node.token.push(scanner.getText(node.start))
        // console.log('error at', scanner.getRange())

        break

      // LIQUID START TAG OPEN
      // -----------------------------------------------------------------
      case TokenType.LiquidTagOpen:

        Node.register.start = scanner.index
        Node.register.whitespace = scanner.getState(ScanState.TagOpenDash)

        break

      // LIQUID OBJECT TAG PROPERTY
      // -----------------------------------------------------------------
      case TokenType.ObjectProperties:

        if (scanner.getState(ScanState.ObjectName)) {
          Node.register.object = scanner.token
          node = document.ast[document.ast.push(new Node()) - 1]
          node.name = scanner.token
          node.type = TokenTags[specs.spec.type] || TokenTags.unknown
          node.context = TokenContext.Object
          console.log('in proper', Node.register)

          break
        }

        node.objects[scanner.index] = [ Node.register.object, ...scanner.token.split('.') ]
        node.context = TokenContext.Property

        break

      // LIQUID TAG NAME KEYWORD
      // -----------------------------------------------------------------
      case TokenType.LiquidTagName:

        if (scanner.getState(ScanState.WithinEndTag)) {

          if (document.ast[hierarch[hierarch.length - 1]].name === scanner.token) {
            node = document.ast[hierarch[hierarch.length - 1]]
            node.offsets.push(Node.register.start)
            hierarch.splice(hierarch.length - 1, 1)
            break
          }

          hierarch.splice(hierarch.length - 1, 1)
          console.log('error, unmatched tag pair')

        }

        if (!specs.spec.singular) hierarch.push(document.ast.length)

        node = document.ast[document.ast.push(new Node()) - 1]
        node.name = scanner.token
        node.type = TokenTags[specs.spec.type] || TokenTags.unknown
        node.context = TokenContext.Keyword

        break

      // LIQUID TAG CLOSE
      // -----------------------------------------------------------------
      case TokenType.LiquidTagClose:

        if (scanner.getState(ScanState.TagCloseDash)) {
          node.context = TokenContext.Dash
          break
        }

        if (node.offsets.length >= 2) {
          node.token.push(scanner.getText(Node.register.start))
          node.offsets.push(scanner.index)
          break
        }

        //  node.offsets.push(scanner.start)
        node.end = scanner.position
        node.token.push(scanner.getText(node.start))
        node.offsets.push(node.end)
        node.range.end = scanner.getRange()

        // node = undefined

        break

      // LIQUID CONTROL CONDITION
      // -----------------------------------------------------------------
      case TokenType.ControlCondition:

        node.context = TokenContext.Indentifier

        if (!/^(?:[^"'\W\s]+|[.-]+)+/.test(scanner.getToken())) {
          node.errors.push('Invalid characters used for condition')
        }

        break

      // LIQUID CONTROL OPERATOR
      // -----------------------------------------------------------------
      case TokenType.ControlOperator:

        node.context = TokenContext.Operator

        if (scanner.token.length > 3) {
          node.errors.push('Extrenous Operators')
          break
        }

        if (/^(?:[!><=]=|<|>|\band\b|\bor\b)$/.test(scanner.token)) {
          node.errors.push('Invalid Conditional Operator')
          break
        }

        break

      // LIQUID ITERATION ITEREE
      // -----------------------------------------------------------------
      case TokenType.IterationIteree:

        node.context = TokenContext.Iteree

        if (!/^(?:[^\W\s]+|[.-]+)+/.test(scanner.getToken())) {
          node.errors.push('Invalid characters detected in iteree')
        }

        break

      // LIQUID ITERATION OPERATOR
      // -----------------------------------------------------------------
      case TokenType.IterationOperator:

        node.context = TokenContext.Operator

        if (!/\bin\b/.test(scanner.token)) {
          node.errors.push('Invalid Logical Operator')
        }

        break

      // LIQUID ITERATION ARRAY
      // -----------------------------------------------------------------
      case TokenType.IterationArray:

        node.context = TokenContext.Array

        break

      // LIQUID ITERATION PARAMETERS
      // -----------------------------------------------------------------
      case TokenType.IterationParameter:

        node.context = TokenContext.Keyword

        break

      // LIQUID ITERATION PARAMETER VALUE
      // -----------------------------------------------------------------
      case TokenType.IterationParameterValue:

        if (/\d{1,}/.test(scanner.token)) {
          node.context = TokenContext.Number
        } else {
          node.context = TokenContext.Invalid
          node.errors.push('Invalid Parameter Value, must be number value')
        }

        break

      // HTML START TAG OPEN
      // -----------------------------------------------------------------
      case TokenType.HTMLStartTagOpen:

        node = document.ast[document.ast.push(new Node()) - 1]
        node.start = scanner.index
        node.name = scanner.getToken()

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

  return document

}
