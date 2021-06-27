import { TokenType } from 'lexical/tokens';
import { NodeKind } from 'lexical/kind';
import { NodeLanguage } from 'lexical/language';
import { IDiagnostic } from 'lexical/diagnostics';
import { NodeType } from 'lexical/types';
import { ParseError as e } from 'lexical/errors';
import { IAST } from 'tree/ast';
import { INode, Type } from 'tree/nodes';
import { HTMLAttributeJS, HTMLAttributeJSON } from 'lexical/regex';
import * as s from 'parser/stream';
import * as scanner from 'parser/scanning';

/* -------------------------------------------- */
/* CONSTANTS                                    */
/* -------------------------------------------- */

/**
 * Pair set keeps track of missing syntactic
 * nodes that might otherwise be skipped due to
 * hierarach placements.
 */
const pair: Set<INode> = new Set();

/* -------------------------------------------- */
/* PARSE                                        */
/* -------------------------------------------- */

/**
 * Liquid/HTML parser function which constructs
 * and tokenizes syntaxes to build an AST.
 */
export function parse (document: IAST): IAST {

  document.root = new INode(Type.Root);

  let attr: string | number;
  let root: INode = document.root;
  let node: INode;
  let token: number = scanner.scan();
  let error: (node: INode) => void;

  while (token !== TokenType.EOS) {

    switch (token) {

      /* -------------------------------------------- */
      /* PARSE ERROR                                  */
      /* -------------------------------------------- */
      case TokenType.ParseError:

        document.report(scanner.error)(node);

        break;

      /* -------------------------------------------- */
      /* HTML                                         */
      /* -------------------------------------------- */
      case TokenType.HTMLStartTagOpen:

        node = new INode(Type.Pair, scanner.start, root, NodeKind.HTML);
        node.offsets.push(s.offset);
        node.tag = s.token;
        node.index = root.children.length;
        node.singular = false;

        // A HTML start tags is a parent-root type tag
        root.children.push(node);
        root = node;

        // Syntactic pair matching
        pair.add(node);

        break;

      case TokenType.HTMLStartTagClose:

        node.end = s.offset;

        break;

      case TokenType.HTMLVoidTagOpen:

        node = new INode(Type.Void, scanner.start, root, NodeKind.HTML);
        node.offsets.push(s.offset);
        node.tag = s.token;
        node.singular = true;

        // Push node onto the AST as a child
        root.children.push(node);

        break;

      case TokenType.HTMLVoidTagClose:

        node.offsets.push(s.offset);
        node.closed = true;

        break;

      case TokenType.HTMLEndTagOpen:

        // Find the closest html parent node
        while (node.tag !== s.token && node.kind === NodeKind.HTML) {
          node = node.parent;
        }

        // the parent root node should match current node
        if (root.type === node.type) {

          node.offsets.push(scanner.start, s.offset);

          // Remove any pair syntactics in cache
          if (pair.has(node)) pair.delete(node);

          break;
        }

        // We create new node and append to root
        node = new INode(Type.Pair, scanner.start, root, NodeKind.HTML);
        node.tag = s.token;
        node.offsets.push(s.offset);
        root.children.push(node);

        // Missing start tag, assert an error
        error = document.report(e.MissingStartTag);

        break;

      case TokenType.HTMLEndTagClose:

        node.end = s.offset;
        node.closed = true;

        // align root to the parent
        root = node.parent;

        // Syntactic pair match, remove from the set
        pair.delete(node);

        if (error) {
          error(node);
          error = undefined;
        }

        break;

      case TokenType.HTMLAttributeName:

        attr = s.token;
        node.attributes[attr] = null;
        node.end = s.offset;

        if (attr === 'src') node.type = NodeType.import;

        break;

      case TokenType.HTMLAttributeValue:

        if (HTMLAttributeJS.test(s.token)) {
          node.languageId = NodeLanguage.javascript;
        } else if (HTMLAttributeJSON.test(s.token)) {
          node.languageId = NodeLanguage.json;
        }

        node.attributes[attr] = s.token;
        node.end = s.offset;
        attr = undefined;

        break;

      /* -------------------------------------------- */
      /* LIQUID                                       */
      /* -------------------------------------------- */
      case TokenType.TagOpen:

        node = new INode(Type.Pair, scanner.start, root);

        break;

      case TokenType.OutputTagOpen:
        node = new INode(Type.Void, scanner.start, root);
        break;

      case TokenType.StartTagName:

        node.tag = s.token;
        node.index = root.children.length;
        node.singular = false;

        break;

      case TokenType.SingularTagName:
      case TokenType.OutputTagName:

        node.tag = s.token;
        node.singular = true;
        node.closed = true;

        break;

      case TokenType.StartTagClose:

        node.offsets.push(s.offset);
        root.children.push(node);
        root = node;
        html = undefined;

        break;

      case TokenType.OutputTagClose:
      case TokenType.SingularTagClose:

        node.offsets.push(s.offset);
        root.children.push(node);

        break;

      case TokenType.EndTagOpen:

        node = root;

        break;

      case TokenType.EndTagName:

        if (node.tag === s.token) {
          node.offsets.push(scanner.start);
          break;
        }

        error = document.report(e.MissingEndTag);

        break;

      case TokenType.EndTagClose:

        root = node.parent;
        node.closed = true;

        if (error) {
          error.range = node.range;
          error.data.offset = node.start;
          error = undefined;
          break;
        }

        node.offsets.push(s.offset);

        break;

    }

    token = scanner.scan();

  }

  if (pair.size > 0) {
    pair.forEach(document.report(e.MissingEndTag));
    pair.clear();
  }

  return document;
}
