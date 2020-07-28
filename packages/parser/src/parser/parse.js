import { TokenType } from '../enums/types'
import { TokenContext } from '../enums/context'
import { TokenKind } from '../enums/kinds'
import Node from './node'
import scanner from './scanner'
import specs from './specs'
import * as TokenTags from '../lexical/tags'

export function parse (document) {

  let node
    , errors = []
    , token = scanner.scan()

  while (token !== TokenType.EOS) {

    //  console.log(String.fromCharCode(token))

    switch (token) {

      case TokenType.ParseError:

        node.end = scanner.position
        node.token.push(scanner.getText(node.start))
        // console.log('error at', scanner.getRange())

        break

      // YAML FRONTMATTER OPEN
      // -----------------------------------------------------------------
      case TokenType.YAMLFrontmatterStart:

        node = document.ast[document.ast.push(new Node()) - 1]
        node.type = TokenTags.embedded
        node.kind = TokenKind.Yaml
        node.token.push(scanner.getText(0, scanner.end + 1))
        node.offsets.push(0, scanner.end + 1)

        break

      // YAML FRONTMATTER CLOSE
      // -----------------------------------------------------------------
      case TokenType.YAMLFrontmatterClose:

        node.name = 'frontmatter'
        node.offsets.push(scanner.getIndex, scanner.end)
        node.token.push(scanner.getText(scanner.getIndex))

        break

      // LIQUID TAG OPEN
      // -----------------------------------------------------------------
      case TokenType.LiquidTagOpen:

        node = document.ast[document.ast.push(new Node()) - 1]
        node.start = scanner.index

        break

      // LIQUID WHITESPACE DASH
      // -----------------------------------------------------------------
      case TokenType.WhitespaceDash:

        node.context = TokenContext.Dash

        break

      // LIQUID TAG NAME KEYWORD
      // -----------------------------------------------------------------
      case TokenType.LiquidTagName:

        node.name = scanner.getToken()
        node.type = TokenTags[specs.spec.type] || TokenTags.unknown
        node.context = TokenContext.Keyword

        break

      // LIQUID TAG CLOSE
      // -----------------------------------------------------------------
      case TokenType.LiquidTagClose:

        //  node.offsets.push(scanner.start)
        node.end = scanner.position
        node.token.push(scanner.getText(node.start))

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

        if (!/==|!=|>=|<=|<|>/.test(scanner.token)) {
          if (!/\band\b|\bor\b/.test(scanner.token)) {
            node.errors.push('Invalid Logical Operator')
          } else if (scanner.token.length > 3) {
            node.errors.push('Extrenous Operators')
          } else {
            node.errors.push('Invalid Operator Sequence')
          }
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
      case TokenType.IterationParameters:

        node.context = TokenContext.Keyword

        break

      case TokenType.HTMLStartTagOpen:

        node = document.ast[document.ast.push(new Node()) - 1]
        node.start = scanner.index
        node.name = scanner.getToken()

        break

    }

    token = scanner.scan()

  }

  return document

}
