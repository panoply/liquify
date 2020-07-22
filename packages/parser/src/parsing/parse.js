import { Scanner } from './scanner'
import { Node } from './node'

import * as TokenType from '../lexical/types'

export function Parser (document, specs) {

  const scanner = Scanner(document, specs)

  let token = scanner.scan()

  while (token !== TokenType.EOS) {

    switch (token) {

      case TokenType.YAMLFrontmatterStart:

        console.log(scanner.getRange(), 'YAML Frontmatter Start', scanner.getToken())

        break

      case TokenType.YAMLFrontmatterClose:

        console.log(scanner.getRange(), 'YAML Frontmatter Close', scanner.getToken())

        break
      case TokenType.LiquidTagOpen:
        console.log(scanner.getRange(), 'Liquid Tag Open', scanner.getToken())
        break

      case TokenType.LiquidWhitespaceDash:

        console.log(scanner.getRange(), 'Liquid Whitespace Dash', scanner.getToken())
        // document.ast.push(curr)
        // curr = {}

        break
      case TokenType.LiquidTagName:
        // console.log('Liquid Name', curr)

        console.log('Spaces:', scanner.getSpace())

        console.log(scanner.getRange(), 'Liquid Tag Name', scanner.getToken())

        //  console.log('Spec:', scanner.getSpec())

        // curr = {}

        break

      case TokenType.LiquidObject:
      case TokenType.LiquidTag:
        // document.ast.push(scanner.getRange())
        console.log(scanner.getRange(), 'Liquid Token', scanner.getToken())

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

      case TokenType.LiquidTagClose:
      case TokenType.LiquidObjectClose:

        curr.end = scanner.getIndex()
        curr.token = scanner.getToken(curr.start, curr.end)
        document.ast.push(curr)
        curr = {}

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
