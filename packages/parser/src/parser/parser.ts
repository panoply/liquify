import { ITag } from '@liquify/liquid-language-specs';
import { TokenType } from 'lexical/tokens';
import { TokenContext } from 'lexical/context';
import { NodeType } from 'lexical/types';
import { NodeLanguage } from 'lexical/language';
import { NodeKind } from 'lexical/kind';
import { ParseError } from 'lexical/errors';
import { Config as config } from 'config';
import { errors } from 'parser/errors';
import { IAST } from 'tree/ast';
import { INode } from 'tree/nodes';
// import { embedded } from 'tree/model';
import * as regex from 'lexical/expressions';
import * as specs from 'parser/specs';
import * as context from 'tree/context';
import * as stream from 'parser/stream';
import * as scanner from 'parser/scanning';

const voids = /\b(area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)\b/;

/**
 * Parser
 *
 * Liquid/HTML parser function which constructs and tokenized syntaxes.
 *
 * @param {Parser.AST} document
 */
export function parse (document: IAST): IAST {

  let token: number = scanner.scan();

  const htmlDocument = new INode(0, document.content.length, [], void 0);
  let curr = htmlDocument;
  let endTagStart: number = -1;
  let endTagName: string | undefined;

  while (token !== TokenType.EOS) {

    switch (token) {

      case TokenType.StartTagOpen: {
        const child = new INode(scanner.start, document.content.length, [], curr);
        document.nodes.push(child);
        curr = child;
        break;
      } case TokenType.StartTag:
        curr.tag = stream.token;
        break;

      case TokenType.StartTagClose:

        if (curr.parent) {
          curr.end = stream.offset; // might be later set to end tag position

          if (stream.token.length > 0) {
            curr.startTagEnd = stream.offset;
            if (curr.tag && voids.test(curr.tag)) {
              curr.closed = true;
              curr = curr.parent;
            }
          } else {
            // pseudo close token from an incomplete start tag
            curr = curr.parent;
          }
        }
        break;

      case TokenType.ObjectTag:
        if (curr.parent) {
          curr.closed = true;
          curr.end = stream.offset;
          curr = curr.parent;
        }
        break;
      case TokenType.EndTagOpen:
        endTagStart = stream.token.length;
        endTagName = undefined;
        break;
      case TokenType.EndTag:
        endTagName = stream.token;
        break;
      case TokenType.EndTagClose:

        let node = curr;
        // see if we can find a matching tag
        while (!node.isSameTag(endTagName) && node.parent) {
          node = node.parent;
        }

        if (node.parent) {

          while (curr !== node) {
            curr.end = endTagStart;
            curr.closed = false;
            curr = curr.parent!;
          }

          curr.closed = true;
          curr.endTagStart = endTagStart;
          curr.end = stream.offset;
          curr = curr.parent!;

        }

        break;
    }

    token = scanner.scan();

  }

  while (curr.parent) {
    curr.end = document.content.length;
    curr.closed = false;
    curr = curr.parent;
  }

  return document;
}
