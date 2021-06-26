import { TokenType } from 'lexical/tokens';
import { NodeKind } from 'lexical/kind';
import { NodeLanguage } from 'lexical/language';
import { NodeType } from 'lexical/types';
import { ParseError } from 'lexical/errors';
import { IAST } from 'tree/ast';
import { INode, Type } from 'tree/nodes';
import { IDiagnostic } from 'lexical/diagnostics';
import * as pair from 'parser/hierarch';
import * as stream from 'parser/stream';
import * as regex from 'lexical/regex';
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

  document.root = new INode(Type.Root);

  let root: INode = document.root;
  let node: INode;
  let attr: string | number;

  let error: IDiagnostic;

  while (token !== TokenType.EOS) {

    switch (token) {
      case TokenType.HTMLStartTagOpen:
        node = new INode(Type.Pair, scanner.start, root, NodeKind.HTML);
        break;
      case TokenType.TagOpen:
        node = new INode(Type.Pair, scanner.start, root);
        break;
      case TokenType.OutputTagOpen:
        node = new INode(Type.Void, scanner.start, root);
        break;

      case TokenType.StartTagName:
      case TokenType.HTMLStartTagName:

        node.tag = stream.token;
        node.index = root.children.length;
        node.singular = false;

        break;

      case TokenType.HTMLVoidTagName:
      case TokenType.SingularTagName:
      case TokenType.OutputTagName:

        node.tag = stream.token;
        node.singular = true;
        node.closed = true;

        break;

      case TokenType.HTMLStartTagClose:
      case TokenType.StartTagClose:

        node.offsets.push(stream.offset);
        root.children.push(node);

        root = node;

        break;

      case TokenType.HTMLVoidTagClose:
      case TokenType.OutputTagClose:
      case TokenType.SingularTagClose:

        node.offsets.push(stream.offset);
        node.closed = true;
        root.children.push(node);

        break;

      case TokenType.HTMLEndTagOpen:
      case TokenType.EndTagOpen:

        node = root;

        break;

      case TokenType.HTMLEndTagName:
      case TokenType.EndTagName:

        if (node.tag === stream.token) {
          node.offsets.push(scanner.start);
          break;
        }

        error = document.errors.report(ParseError.MissingEndTag, node);

        break;

      case TokenType.HTMLEndTagClose:
      case TokenType.EndTagClose: {

        root = node.parent;
        node.closed = true;

        if (error) {
          error.range = node.range;
          error.data.offset = node.start;
          error = undefined;
          break;
        }

        node.offsets.push(stream.offset);

        break;
      }

      case TokenType.HTMLAttributeName:

        attr = stream.token;
        node.attributes[attr] = null;

        if (attr === 'src') node.type = NodeType.import;

        break;

      case TokenType.HTMLAttributeValue:

        if (regex.HTMLJavaScript.test(stream.token)) {
          node.languageId = NodeLanguage.javascript;
        } else if (regex.HTMLJSON.test(stream.token)) {
          node.languageId = NodeLanguage.json;
        }

        node.attributes[attr] = stream.token;
        attr = undefined;

        break;

    }

    token = scanner.scan();

  }

  return document;
}
