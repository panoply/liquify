import { TokenType } from 'lexical/tokens';
import { NodeKind } from 'lexical/kind';
import { NodeLanguage } from 'lexical/language';
import { NodeType } from 'lexical/types';
import { ScanCache } from 'lexical/state';
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

  /* ROOT NODE ---------------------------------- */

  document.root = new INode(Type.Root);

  /* LETTINGS ----------------------------------- */

  /**
   * Index number reference to the root node
   */
  let root: number;

  /**
   * Parent node reference
   */
  let parent: INode = document.root;

  /**
   * Child node instance
   */
  let node: INode;

  /**
   * Node errors
   */
  let error: (node: INode) => void;

  /**
   * Token type reference
   */
  let token: number = scanner.scan();

  /**
   * HTML attributes reference
   */
  let attr: string | number | INode;

  /* PAIR SETS ---------------------------------- */

  /**
   * Pair set keeps track of missing syntactic
   * nodes that might otherwise be skipped due to
   * hierarach placements.
   */
  const pair: Set<INode> = new Set();

  /* -------------------------------------------- */
  /* TOKENIZE                                     */
  /* -------------------------------------------- */

  while (token !== TokenType.EOS) {

    switch (token) {

      case TokenType.ParseError:

        if (scanner.error === ParseError.MissingCloseDelimiter) {
          if (node.offsets.length < 2) node.offsets.push(s.offset);
        }

        console.log(node);

        // Remove syntactic placement errors
        document.report(scanner.error)(node);
        break;

      case TokenType.HTMLStartTagOpen:

        if (parent.type === Type.Root) root = parent.children.length;

        createNode(Type.Pair, NodeKind.HTML);

        parent = node;
        pair.add(node);

        break;

      case TokenType.HTMLStartTagClose:

        while (node.kind !== NodeKind.HTML && node.parent) node = node.parent;

        closeNode(Type.Start);

        break;

      case TokenType.HTMLVoidTagOpen:

        createNode(Type.Void, NodeKind.HTML);

        break;

      case TokenType.HTMLVoidTagClose:

        closeNode(Type.Void);

        break;

      case TokenType.HTMLEndTagOpen:

        if (!startEnd(NodeKind.HTML)) {

          // Assert a missing start tag error
          error = document.report(ParseError.MissingStartTag);

        }

        break;

      case TokenType.HTMLEndTagClose:

        closeNode(Type.Pair);

        break;

      case TokenType.HTMLLiquidAttribute:

        node = node.parent;

        break;

      case TokenType.HTMLLiquidAttributeEnd:

        node = node.parent;

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

        createNode(Type.Pair, NodeKind.Liquid);

        parent = node;

        break;

      case TokenType.StartTagName:

        node.tag = s.token;
        node.index = parent.children.length;
        node.singular = false;

        pair.add(node);

        break;

      case TokenType.StartTagClose:

        closeNode(Type.Start);

        break;

      case TokenType.OutputTagOpen:

        // Create Node
        createNode(Type.Pair, NodeKind.Liquid);

        // Assert node type
        node.type = NodeType.output;

        break;

      case TokenType.OutputTagName:

        node.tag = s.token;

        break;

      case TokenType.OutputTagClose:

        node.offsets.push(s.offset);

        break;

      case TokenType.SingularTagName:
        break;

      case TokenType.SingularTagClose:

        closeNode(Type.Void);

        break;

      case TokenType.EndTagOpen:

        if (!startEnd(NodeKind.Liquid)) {

          // Assert a missing start tag error
          error = document.report(ParseError.MissingStartTag);

        }

        break;

      case TokenType.EndTagClose:

        closeNode(Type.Pair);

        // console.log(node.children[1]);

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
  function createNode (type: Type, kind: NodeKind): void {

    if (parent.type === Type.Root) root = parent.children.length;

    node = new INode(type, scanner.begin, parent, kind);
    node.tag = s.token;
    node.root = root;

    // Add this node child to the parent
    parent.children.push(node);

  };

  /**
   * Handles an opening close type tag. This is executed
   * when a start/end parent node close tag is encountered.
   * It walks the AST to locate the parent node.
   */
  function startEnd (kind: NodeKind | undefined): boolean {

    // Find the closest html parent node
    // Logic for this is lifted from vscode-html-languageservice
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

      // Handle situations where Liquid is used within HTML attributes
      parent = node.parent;

      // Syntactic pair match, remove from the set
      if (pair.has(node)) pair.delete(node);

      if (error) {
        error(node);
        error = undefined;
      }
    }

  };

}
