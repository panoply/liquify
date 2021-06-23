import { TokenType } from 'lexical/tokens';
import { NodeKind } from 'lexical/kind';
import { IAST } from 'tree/ast';
import { INode } from 'tree/nodes';
import * as stream from 'parser/stream';
import * as scanner from 'parser/scanning';
import { Config as config } from 'config';

/**
 * Parser
 *
 * Liquid/HTML parser function which constructs and tokenized syntaxes.
 *
 * @param {Parser.AST} document
 */
export function parse (document: IAST): IAST {

  let token: number = scanner.scan();

  let root: INode;
  let node: INode;
  let parent: INode;

  const pairs: INode[] = [];

  while (token !== TokenType.EOS) {

    switch (token) {

      case TokenType.HTMLStartTagOpen:
      case TokenType.TagOpen:
      case TokenType.OutputTagOpen:

        node = new INode();
        node.offsets.push(scanner.start);

        if (token === TokenType.HTMLStartTagOpen) {
          node.kind = NodeKind.HTML;
        }

        break;

      case TokenType.HTMLEndTagOpen:
      case TokenType.EndTagOpen:

        node = root;
        node.offsets.push(scanner.start);

        break;

      case TokenType.HTMLStartTagName:
      case TokenType.StartTagName:

        parent = pairs[pairs.length - 1];

        node.tag = stream.token;
        node.parent = parent;
        node.singular = false;

        root = node;

        pairs.push(node);

        break;

      case TokenType.HTMLVoidTagName:
      case TokenType.SingularTagName:
      case TokenType.OutputTagName:

        node.tag = stream.token;

        break;

      case TokenType.HTMLStartTagClose:
      case TokenType.StartTagClose:

        node.offsets.push(stream.offset);

        break;

      case TokenType.HTMLVoidTagClose:
      case TokenType.OutputTagClose:
      case TokenType.SingularTagClose:

        node.parent = node;
        node.offsets.push(stream.offset);

        parent = node;

        if (pairs.length === 0) {
          document.nodes.push(node);
        } else {
          root.children.push(node);
        }

        break;

      case TokenType.HTMLEndTagName:
      case TokenType.EndTagName:

        if (node.tag === stream.token) {

          // node.offsets.push(scanner.start);
        }

        break;

      case TokenType.HTMLEndTagClose:
      case TokenType.EndTagClose: {

        node.offsets.push(stream.offset);

        if (pairs.length > 1) {
          pairs[pairs.length - 2].children.push(pairs.pop());
          root = pairs[pairs.length - 1];
          break;
        }

        document.nodes.push(node);

        break;
      }

    }

    token = scanner.scan();

  }

  return document;
}
