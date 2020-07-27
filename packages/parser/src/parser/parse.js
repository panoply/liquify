import { TokenType } from '../enums/types'
import { TokenContext } from '../enums/context'
import { TokenKind } from '../enums/kinds'
import scanner from './scanner'
import specs from './specs'
import Node from './node'
import * as TokenTags from '../lexical/tags'
import * as Characters from '../lexical/characters'

export function parse (document) {

  let node
    , token = scanner.scan()

  while (token !== TokenType.EOS) {

    console.log(node)

    switch (token) {

      case TokenType.Whitespace:

        node.context = TokenContext.Whitespace

        break

      case TokenType.YAMLFrontmatterStart:

        node = document.ast[document.ast.push(new Node()) - 1]
        node.type = TokenTags.embedded
        node.kind = TokenKind.Yaml
        node.token.push(scanner.getText(0, scanner.end + 1))
        node.offsets.push(0, scanner.end + 1)

        break

      case TokenType.YAMLFrontmatterClose:

        node.name = 'frontmatter'
        node.offsets.push(scanner.getIndex, scanner.end)
        node.token.push(scanner.getText(scanner.getIndex))

        break

      case TokenType.LiquidTagOpen:

        node = document.ast[document.ast.push(new Node()) - 1]
        node.type = specs.type
        node.offsets.push(scanner.start)

        break

      case TokenType.LiquidWhitespaceDash:

        node.context = TokenContext.Dash

        break

      case TokenType.LiquidTagName:

        node.name = scanner.string
        node.context = TokenContext.Indentifier

        break

      case TokenType.LiquidObjectClose:
      case TokenType.LiquidTagClose:

        node.offsets.push(scanner.start)
        node.token.push(scanner.getText(node.start, scanner.start))

        break

      case TokenType.ControlCondition:

        node.context = TokenContext.Condition

        break

      case TokenType.ControlOperator:

        node.context = TokenContext.Operator

        break
    /*  case TokenType.LiquidObjectOpen:
      case TokenType.LiquidTagOpen:

        if (scanner.getState(ScanState.WhitespaceDash)) {
          if (curr?.hasWhitespace) {
            curr.hasWhitespace.push(scanner.getIndex())
          } else curr.hasWhitespace = [ scanner.getIndex() ]
        } else {
          curr.start = scanner.getIndex()
        }

        break

      case TokenType.LiquidTag:
        // console.log('here')
        break

      case TokenType.HTMLStartTagOpen:
        curr.start = scanner.getIndex()
        //  curr.name = scanner.getToken(curr.start + 1)
        break

      case TokenType.HTMLStartTagClose:
        curr.end = scanner.getIndex()
        curr.token = scanner.getToken(curr.start, curr.end)
        document.ast.push(curr)
        curr = {}
        break

      case TokenType.HTMLEndTagOpen:
        curr.start = scanner.getIndex()
        //    curr.name = scanner.getToken(curr.start + 2)
        break

      case TokenType.HTMLEndTagClose:
        curr.end = scanner.getIndex()
        curr.token = scanner.getToken(curr.start, curr.end)
        document.ast.push(curr)
        curr = {}
        break */
    }

    token = scanner.scan()

  }

  return document

}
