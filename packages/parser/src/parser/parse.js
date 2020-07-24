import { TokenType } from '../enums/types'
import scanner from './scanner'
import specs from './specs'
import Node from './node'

export function parse (document) {

  let node
    , curr
    , token = scanner.scan()

  while (token !== TokenType.EOS) {

    switch (token) {

      case TokenType.YAMLFrontmatterStart:

        console.log(scanner.getRange(), 'YAML Frontmatter Start', scanner.getToken())

        break

      case TokenType.YAMLFrontmatterClose:

        console.log(scanner.getRange(), 'YAML Frontmatter Close', scanner.getToken())

        break

      case TokenType.LiquidTagOpen:

        curr = new Node()
        node = document.ast[document.ast.push(curr) - 1]
        node.type = specs.type
        node.offset.push(scanner.getPosition())

        // active = scanner.getOffset()
        // console.log(node, 'Liquid Tag Open', scanner.getToken())

        break

      case TokenType.LiquidWhitespaceDash:

        node.context.push({
          type: 'Dash',
          value: scanner.getToken(),
          range: scanner.getRange()
        })

        node.context.push({
          type: 'Whitespace',
          value: scanner.getSpace(),
          range: scanner.getRange()

        })
        // console.log(scanner.getLocation(), 'Liquid Whitespace Dash', scanner.getToken())
        // curr = {}

        break
      case TokenType.LiquidTagName:
        // console.log('Liquid Name', curr)

        node.name = scanner.getToken()
        node.context.push({
          type: 'Indentifier',
          value: scanner.getToken(),
          range: scanner.getRange()
        })

        node.context.push({
          type: 'Whitespace',
          value: scanner.getSpace(),
          range: scanner.getRange()

        })

        // console.log('Spaces:', scanner.getSpace())

        // console.log(curr, 'Liquid Tag Name', scanner.getToken())

        //  console.log('Spec:', scanner.getSpec())

        // curr = {}

        break

      case TokenType.LiquidObjectClose:
      case TokenType.LiquidTagClose:

        node.offset.push(scanner.getPosition())
        node.token.push(scanner.getToken(node.start))
        // console.log(scanner.getRange(), 'Liquid Token Closed', scanner.getToken(active))

        break

      case TokenType.ControlCondition:

        node.context.push({
          type: 'Condition',
          value: scanner.getToken(),
          range: scanner.getRange()

        })

        node.context.push({
          type: 'Whitespace',
          value: scanner.getSpace(),
          range: scanner.getRange()

        })
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
