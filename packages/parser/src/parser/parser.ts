import { TokenType } from 'lexical/tokens';
import { NodeKind } from 'lexical/kind';
import { NodeLanguage } from 'lexical/language';
import { NodeType } from 'lexical/types';
import { ParseError } from 'lexical/errors';
import { IAST } from 'tree/ast';
import { INode, Type } from 'tree/nodes';
import { HTMLAttributeJS, HTMLAttributeJSON } from 'lexical/regex';
import * as s from 'parser/stream';
import * as scanner from 'parser/scanning';

/* -------------------------------------------- */
/* PARSE                                        */
/* -------------------------------------------- */

/**
 * Liquid/HTML parser function which constructs
 * and tokenizes syntaxes to build an AST.
 */
export function parse (document: IAST): IAST {

  /* PAIR SETS ---------------------------------- */

  const pair: Set<INode> = new Set();

  /* NODE ROOT ---------------------------------- */

  document.root = new INode(Type.Root);

  /* STATE -------------------------------------- */

  let liquid: INode = document.root;
  let html: INode = liquid;
  let node: INode;
  let track: INode;
  let error: (node: INode) => void;
  let token: number = scanner.scan();
  let attr: string | number;

  /* -------------------------------------------- */
  /* TOKENIZE                                     */
  /* -------------------------------------------- */

  while (token !== TokenType.EOS) {

    switch (token) {

      case TokenType.ParseError:

        if (scanner.error === ParseError.MissingCloseDelimiter) {
          track = undefined;
          if (node.offsets.length < 2) node.offsets.push(s.offset);
        }

        // Remove syntactic placement errors
        document.report(scanner.error)(node);

        break;

      case TokenType.HTMLStartTagOpen:

        htmlNode(Type.Pair);

        break;

      case TokenType.HTMLStartTagClose:

        closeNode(Type.Start);
        track = undefined;

        break;
      case TokenType.HTMLVoidTagOpen:

        htmlNode(Type.Void);

        break;

      case TokenType.HTMLVoidTagClose:
        closeNode(Type.Void);
        track = undefined;
        break;

      case TokenType.HTMLEndTagOpen:

        html = node = html;

        if (!startEnd(NodeKind.HTML, html)) {
          error = document.report(ParseError.MissingStartTag);
        }

        break;

      case TokenType.HTMLEndTagClose:

        closeNode(Type.Pair);
        track = undefined;

        break;

      case TokenType.HTMLLiquidAttribute:

        // node = parent;
        node = liquid;

        break;

      case TokenType.HTMLAttributeName:

        attr = s.token;
        node.attributes[attr] = null;

        if (attr === 'src') node.type = NodeType.import;

        break;

      case TokenType.HTMLAttributeValue:

        if (HTMLAttributeJS.test(s.token)) {
          node.languageId = NodeLanguage.javascript;
        } else if (HTMLAttributeJSON.test(s.token)) {
          node.languageId = NodeLanguage.json;
        }

        node.attributes[attr as string] = s.token;

        attr = undefined;

        break;

      /* -------------------------------------------- */
      /* LIQUID                                       */
      /* -------------------------------------------- */
      case TokenType.TagOpen:

        liquidNode(Type.Pair);

        break;

      case TokenType.StartTagName:

        node.tag = s.token;
        node.singular = false;

        pair.add(node);

        break;

      case TokenType.StartTagClose:

        closeNode(Type.Start);

        break;

      case TokenType.OutputTagOpen:

        liquidNode(Type.Void);

        node.type = NodeType.output;

        break;

      case TokenType.OutputTagName:

        node.tag = s.token;

        break;

      case TokenType.OutputTagClose:

        closeNode(Type.Void);

        break;

      case TokenType.SingularTagName:
        break;

      case TokenType.SingularTagClose:

        closeNode(Type.Void);

        break;

      case TokenType.EndTagOpen:

        liquid = node = liquid;

        if (!startEnd(NodeKind.Liquid, liquid)) {
          error = document.report(ParseError.MissingStartTag);
        }

        break;

      case TokenType.EndTagClose:

        closeNode(Type.Pair);

        break;

    }

    token = scanner.scan();

  }

  /* NODE SYNTACTICS ---------------------------- */

  if (pair.size > 0) {

    pair.forEach(document.report(ParseError.MissingEndTag));
    pair.clear();
  }

  /* RETURN ------------------------------------- */

  return document;

  /* -------------------------------------------- */
  /* HELPER FUNCTIONS                             */
  /* -------------------------------------------- */

  /**
   * Creates a child node instance, this is called
   * each time we encounter a starting delimeters.
   */
  function htmlNode (type: Type): void {

    if (track instanceof INode) pendingClose();

    node = new INode(type, scanner.begin, html, NodeKind.HTML);
    node.tag = s.token;
    html.children.push(node);

    if (type === Type.Pair) {
      html = node;
      pair.add(node);
    }

    track = node;

  };

  /**
   * Creates a child node instance, this is called
   * each time we encounter a starting delimeters.
   */
  function liquidNode (type: Type): void {

    node = new INode(type, scanner.begin, liquid, NodeKind.Liquid);

    // Add this node child to the parent
    liquid.children.push(node);

    // parent = node;
    if (type === Type.Pair) {
      liquid = node;
      pair.add(node);
    }

  };

  /**
   * Handles an opening close type tag. This is executed
   * when a start/end parent node close tag is encountered.
   * It walks the AST to locate the parent node.
   */
  function startEnd (kind: NodeKind | undefined, parent: INode): boolean {

    while (!node.isSameNode(s.token, kind) && node.parent) node = node.parent;

    // Ensure the node is not root and matches the token
    if (parent.type !== Type.Root && node.tag === s.token) {
      node.offsets.push(scanner.begin);
      return true;
    }

    // If we get here, we have invalid syntactic placement
    node = new INode(Type.Pair, scanner.begin, parent, kind);
    node.tag = s.token;
    parent.children.push(node);
    return false;

  };

  /**
   * Closed a node and completes the parse of the
   * token. Called each time we have successfully
   * completed parsing a node or any type.
   */
  function closeNode (type: Type): void {

    node.offsets.push(s.offset);

    if (type === Type.Pair) {

      // Syntactic pair match, remove from the set
      pair.delete(node);

      if (node.kind === NodeKind.HTML) html = node.parent;
      if (node.kind === NodeKind.Liquid) liquid = node.parent;
      if (!error) return undefined;

      error(node);
      error = undefined;

    }

  };

  function pendingClose () {

    let idx = track.children.length;

    if (idx === 0) {
      track.offsets.push(s.offset);
    } else {

      while (idx--) {

        const child = track.children[idx];

        if (child.singular) {
          track.offsets.push(child.end);
          break;
        } else if (child.offsets.length > 2) {
          track.offsets.push(child.end);
          break;
        }
      }
    }

    document.report(ParseError.MissingCloseDelimiter)(track);
    track = undefined;

  }

}
