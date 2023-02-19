import { $, q, Type } from '@liquify/specs';
import { Range, TextDocument } from 'vscode-languageserver-textdocument';
import { NodeKind, NodeLanguage, TokenType, NodeType, ParseError } from '../lexical';
import { AST } from '../tree/ast';
import { Node } from '../tree/nodes';
import { Embed } from '../tree/embed';
import { assign, isNumber, isString, has, last } from '../parser/utils';
import * as s from '../parser/stream';
import * as scanner from '../parser/scanner';

/**
 * Liquid/HTML parser function which constructs
 * and tokenizes syntaxes to build an AST.
 */
export function parse (document: AST): AST {

  q.reset(true);

  /* NODE ROOT ---------------------------------- */

  document.root = new Node(NodeType.Root);

  /* NODE REFERENCES ---------------------------- */

  /**
   * The current token positions
   */
  let token: number = scanner.scan();

  /**
   * A text document literal
   */
  let literal: TextDocument;

  /**
   * The parent node of the current node
   */
  let parent: Node = document.root;

  /**
   * The current node
   */
  let node: Node | Embed;

  /**
   * A node to track
   */
  let track: Node;

  /**
   * A parse error callback
   */
  let error: (range?: Range) => void;

  /**
   * Embedded region index
   */
  let embed: number = 0;

  /**
   * Scope reference
   */
  let scope: string | Type | number;

  /**
   * HTML Attribute reference
   */
  let attr: string | number;

  /**
   * Filter index reference
   */
  let filter: number = NaN;

  /**
   * Argument index reference
   */
  let args: number = NaN;

  /**
   * The last known object or object property offset index reference
   */
  let object: number = NaN;

  /**
   * Paired Sets
   */
  const pair: Set<Node> = new Set();

  /* -------------------------------------------- */
  /* TOKENIZER                                    */
  /* -------------------------------------------- */

  while (token !== TokenType.EOS) {

    switch (token) {

      /* -------------------------------------------- */
      /* PARSER ERROR                                 */
      /* -------------------------------------------- */
      case TokenType.ParseError:

        node.errors.push(document.errors.length);

        if (scanner.error === ParseError.MissingCloseDelimiter) {
          track = undefined;
          node?.offsets?.length > 2 || node.offsets.push(s.offset);
          document.report(scanner.error)(node.range);
          break;
        }

        document.report(scanner.error)(); // Remove syntactic placement errors

        break;

      /* -------------------------------------------- */
      /* WHITESPACE                                   */
      /* -------------------------------------------- */
      case TokenType.Whitespace:

        if (node.kind === NodeKind.Liquid) {
          if (s.spaces >= 2) {
            document.report(ParseError.WarnWhitespace);
          }
        }

        break;

      /* -------------------------------------------- */
      /* WHITESPACE                                   */
      /* -------------------------------------------- */
      case TokenType.Newline:

        if (node && isNaN(node.line)) node.line = s.offset;

        break;

      /* -------------------------------------------- */
      /* HTML START TAG OPEN                          */
      /* -------------------------------------------- */
      case TokenType.HTMLStartTagOpen:

        HTMLNode(NodeType.Pair);

        break;

      /* -------------------------------------------- */
      /* HTML START TAG CLOSE                         */
      /* -------------------------------------------- */
      case TokenType.HTMLStartTagClose:

        parent = node = parent;
        NodeClose(NodeType.Start);
        track = undefined;

        break;

      /* -------------------------------------------- */
      /* HTML VOID TAG CLOSE                          */
      /* -------------------------------------------- */
      case TokenType.HTMLVoidTagOpen:

        HTMLNode(NodeType.Void);

        break;

      /* -------------------------------------------- */
      /* HTML VOID TAG CLOSE                          */
      /* -------------------------------------------- */
      case TokenType.HTMLVoidTagClose:

        NodeClose(NodeType.Void);

        track = undefined;

        break;

      /* -------------------------------------------- */
      /* HTML END TAG CLOSE                           */
      /* -------------------------------------------- */
      case TokenType.HTMLEndTagOpen:

        parent = node = parent;

        if (!NodeEnder(NodeKind.HTML)) {
          error = document.report(ParseError.MissingStartTag);
        }

        break;

      /* -------------------------------------------- */
      /* HTML END TAG CLOSE                           */
      /* -------------------------------------------- */
      case TokenType.HTMLEndTagClose:

        NodeClose(NodeType.Pair);
        track = undefined;

        break;

      /* -------------------------------------------- */
      /* HTML LIQUID ATTRIBUTE                        */
      /* -------------------------------------------- */
      case TokenType.HTMLLiquidAttribute:

        node = parent;

        break;

      /* -------------------------------------------- */
      /* HTML ATTRIBUTE NAME                          */
      /* -------------------------------------------- */
      case TokenType.HTMLAttributeName:

        attr = s.token;
        node.attributes[attr] = null;

        if (attr === 'src') node.type = Type.import;

        break;

      /* -------------------------------------------- */
      /* HTML ATTRIBUTE VALUE                         */
      /* -------------------------------------------- */
      case TokenType.HTMLAttributeValue:

        if (node.type === Type.embedded) {
          node.languageId = q.isLanguage(s.token) as NodeLanguage;
        }

        node.attributes[attr as string] = s.token;
        attr = undefined;

        break;

      /* -------------------------------------------- */
      /* LIQUID TAG OPEN                              */
      /* -------------------------------------------- */
      case TokenType.TagOpen:

        node = new Node(NodeType.Pair, scanner.begin, parent, NodeKind.Liquid);
        parent.children.push(node); // Add this node child to the parent

        break;

      /* -------------------------------------------- */
      /* LIQUID TAG CLOSE                             */
      /* -------------------------------------------- */
      case TokenType.TagClose:

        if (node.singular) {
          NodeClose(NodeType.Singular);
        } else {
          NodeClose(NodeType.Pair);
        }

        break;

      /* -------------------------------------------- */
      /* LIQUID TAG UNKNOWN                           */
      /* -------------------------------------------- */
      case TokenType.Unknown:

        node.tag = s.token;
        node.type = Type.unknown;

        parent = node;

        break;

      /* -------------------------------------------- */
      /* LIQUID START TAG NAME                        */
      /* -------------------------------------------- */
      case TokenType.StartTagName:

        node.tag = s.token;
        node.type = $.liquid.tag.type as any;
        node.singular = false;

        parent = node;

        if (node.type === Type.embedded) {
          node = new Embed(node);
          node.parent.children.push(node);
          parent = node;
          literal = document.literal();
        }

        pair.add(node);

        break;

      /* -------------------------------------------- */
      /* LIQUID TAG ARGUMENT                          */
      /* -------------------------------------------- */
      case TokenType.TagArgument:

        args = s.offset + s.cursor;
        node.arguments[args] = [ s.token ];

        break;

      /* -------------------------------------------- */
      /* LIQUID START TAG CLOSE                       */
      /* -------------------------------------------- */
      case TokenType.StartTagClose:

        NodeClose(NodeType.Start);

        break;

      /* -------------------------------------------- */
      /* LIQUID OUTPUT TAG OPEN                       */
      /* -------------------------------------------- */
      case TokenType.OutputTagOpen:

        node = new Node(NodeType.Output, scanner.begin, parent, NodeKind.Liquid);
        node.type = Type.output;
        parent.children.push(node); // Add this node child to the parent

        break;

      /* -------------------------------------------- */
      /* LIQUID OUTPUT TAG CLOSE                      */
      /* -------------------------------------------- */
      case TokenType.OutputTagClose:

        NodeClose(NodeType.Output);

        break;

      /* -------------------------------------------- */
      /* LIQUID SINGULAR TAG NAME                     */
      /* -------------------------------------------- */
      case TokenType.SingularTagName:

        node.tag = s.token;
        node.type = $.liquid.tag.type as Type;
        node.singular = true;

        pair.delete(node);

        break;

      /* -------------------------------------------- */
      /* LIQUID SINGULAR TAG CLOSE                    */
      /* -------------------------------------------- */
      case TokenType.SingularTagClose:

        NodeClose(NodeType.Output);

        break;

      /* -------------------------------------------- */
      /* LIQUID END TAG OPEN                          */
      /* -------------------------------------------- */
      case TokenType.EndTagOpen:
      case TokenType.EndTagName:

        parent = node = parent;

        if (!NodeEnder(NodeKind.Liquid)) {
          error = document.report(ParseError.MissingStartTag);
        }

        break;

      /* -------------------------------------------- */
      /* LIQUID END TAG CLOSE                         */
      /* -------------------------------------------- */
      case TokenType.EndTagClose:

        NodeClose(NodeType.Pair);

        break;

      /* -------------------------------------------- */
      /* LIQUID EMBEDDED TAG JSON                     */
      /* -------------------------------------------- */
      case TokenType.EmbeddedJSON:

        node.languageId = NodeLanguage.json;

        document.regions.push(node as Embed);

        break;

      /* -------------------------------------------- */
      /* LIQUID EMBEDDED TAG CSS                      */
      /* -------------------------------------------- */
      case TokenType.EmbeddedCSS:

        node.languageId = NodeLanguage.css;

        document.regions.push(node as Embed);

        break;

      /* -------------------------------------------- */
      /* LIQUID EMBEDDED TAG JAVASCRIPT               */
      /* -------------------------------------------- */
      case TokenType.EmbeddedJavaScript:

        node.languageId = NodeLanguage.javascript;

        break;

      /* -------------------------------------------- */
      /* LIQUID CONTROL ELSE TAG                      */
      /* -------------------------------------------- */
      case TokenType.ControlElse:

        if (!q.isParent(node.parent.tag)) {
          error = document.report(ParseError.InvalidPlacement);
        }

        break;

      /* -------------------------------------------- */
      /* LIQUID ITERATION TAG                         */
      /* -------------------------------------------- */
      case TokenType.Iteration:

        node.scope = {};

        break;

      /* -------------------------------------------- */
      /* LIQUID ITERATION ITEREE                      */
      /* -------------------------------------------- */
      case TokenType.IterationIteree:

        scope = s.token;
        node.scope[s.token] = null;

        break;

      /* -------------------------------------------- */
      /* LIQUID ITERATION ARRAY                       */
      /* -------------------------------------------- */
      case TokenType.IterationArray:

        // node.scope[scope] = ($.liquid.object as Properties)?.items;

        if (node.parent.type === Type.iteration) {
          // assign(node.scope, node.parent.scope);
        }

        break;

      /* -------------------------------------------- */
      /* LIQUID ITERATION PARAMETER                   */
      /* -------------------------------------------- */
      case TokenType.IterationParameter:

        args = s.offset + s.cursor;
        node.arguments[args] = [ s.token ];

        break;

      /* -------------------------------------------- */
      /* LIQUID ITERATION PARAMETER                   */
      /* -------------------------------------------- */
      case TokenType.IterationParameterValue:

        node.arguments[args].push(s.token);

        break;

      /* -------------------------------------------- */
      /* LIQUID OUTPUT TAG NAME                       */
      /* -------------------------------------------- */
      case TokenType.OutputTagName:

        node.tag = s.token;

        if (node.parent.type === Type.iteration) {
          node.scope = node.parent?.scope?.[node.tag];
        }

        break;

      /* -------------------------------------------- */
      /* LIQUID OUTPUT OBJECT TAG NAME                */
      /* -------------------------------------------- */
      case TokenType.ObjectTagName:

        object = s.offset;
        node.tag = s.token;
        node.objects[s.offset] = [ s.token ];

        if (isNumber($.liquid.scope)) {
          node.scope[s.token] = $.liquid.scope;
        }

        if (node.parent.type === Type.iteration) {
          node.scope = node.parent.scope[s.token];
        }

        if (scanner.error === ParseError.UnknownObject) {
          document.warning(scanner.error);
        }

        break;

      /* -------------------------------------------- */
      /* LIQUID OBJECT                                */
      /* -------------------------------------------- */
      case TokenType.Object:
      case TokenType.ObjectPropertyObject:

        if (token === TokenType.ObjectPropertyObject) {
          node.objects[object].push(s.offset);
        }

        object = s.offset;

        node.objects[s.offset] = [ s.token ];

        if (isNumber($.liquid.scope)) {
          node.scope[s.token] = $.liquid.scope;
        }

        if (node.parent.type === Type.iteration) {
          if (node.parent.scope?.[s.token]) {
            assign(node.scope, node.parent.scope);
            q.setObject(node.parent.scope[s.token]);
          }
        }

        if (scanner.error === ParseError.UnknownObject) {
          document.warning(scanner.error);
        }

        if (!isNaN(filter) && has(filter, node.filters)) {
          node.filters[filter].push(object);
        }

        break;

      /* -------------------------------------------- */
      /* LIQUID OBJECT PROPERTY                       */
      /* -------------------------------------------- */
      case TokenType.ObjectProperty:
      case TokenType.ObjectPropertyNumber:

        console.log($.liquid);

        if (token === TokenType.ObjectPropertyNumber) {

          const prev = last(node.objects[object]);

          if (isNumber(prev)) {
            node.objects[prev as number].push('[' + s.token + ']');
            node.objects[s.offset] = prev;
          } else {
            node.objects[object].push('[' + s.token + ']');
            node.objects[s.offset] = object;
          }

        } else {

          // console.log(node.objects[object]);
          node.objects[object].push(s.token);
          node.objects[s.offset] = object;
        }

        if (scanner.error === ParseError.UnknownProperty) {
          document.warning(scanner.error);
        }

        if (node.type === Type.iteration) {

          node.scope[scope] = $.liquid.object?.scope;

          if (!q.isObjectType(Type.array)) {
            document.warning(ParseError.InvalidIterationType);
          }

          if (isString(node.scope[scope])) {
            if (!q.setObject(node.scope[scope])) {
              document.report(ParseError.UnknownObject)();
            }
          }

        }

        if (isNumber(node.scope)) {
          if (!q.isObjectType(node.scope as number)) {
            document.report(ParseError.RejectObject)();
          }
        }

        break;

      case TokenType.ObjectBracketNotationClose:

        // object = node.objects[object];

        break;

      /* -------------------------------------------- */
      /* LIQUID VARIABLE KEYWORD                      */
      /* -------------------------------------------- */
      case TokenType.VariableKeyword:

        node.variable = s.token;
        q.setVariable(s.token);

        break;

      /* -------------------------------------------- */
      /* LIQUID VARIABLE OBJECT ASSIGNMENT            */
      /* -------------------------------------------- */
      case TokenType.VariableValueObject:

        // console.log(s.token);

        break;

      /* -------------------------------------------- */
      /* LIQUID VARIABLE VALUE                        */
      /* -------------------------------------------- */
      case TokenType.VariableValue:

        // document.root.scope[scope] = s.token;

        break;

      /* -------------------------------------------- */
      /* LIQUID FILTER                                */
      /* -------------------------------------------- */
      case TokenType.Filter:

        filter = s.offset + s.cursor;

        assign(node.filters, { [filter]: [] });

        if (scanner.error === ParseError.MissingWhitespace) {
          document.report(ParseError.MissingWhitespace);
        }

        break;

      /* -------------------------------------------- */
      /* LIQUID FILTER INDENTIFIER                    */
      /* -------------------------------------------- */
      case TokenType.FilterIdentifier:

        node.filters[filter].push(s.token);
        node.filters[s.offset + 1] = filter;

        break;

      /* -------------------------------------------- */
      /* LIQUID FILTER ARGUMENT                       */
      /* -------------------------------------------- */
      case TokenType.FilterArgument:

        node.filters[filter].push(s.token);
        node.filters[s.offset + 1] = filter;

        break;

      /* -------------------------------------------- */
      /* LIQUID FILTER END                            */
      /* -------------------------------------------- */
      case TokenType.FilterEnd:

        filter = NaN;

        break;

    }

    token = scanner.scan();

  }

  /* NODE SYNTACTICS ---------------------------- */

  if (embed >= document.regions.length) document.regions.splice(embed);

  pair.forEach(({ range }) => document.report(ParseError.MissingEndTag)(range));
  pair.clear();

  /* RETURN ------------------------------------- */

  // console.log(document);

  (document.node as Node) = document.getNodeAt(document.cursor);

  return document;

  /* -------------------------------------------- */
  /* HTML NODES                                   */
  /* -------------------------------------------- */

  /**
   * HTML Node
   *
   * Creates a child node instance, this is called each time we encounter
   * HTML starting `<` delimeters. Child Nodes are when recognized as non-void
   * types. When `track` is an instance of `Node` we will invoke a pending callback.
   */
  function HTMLNode (type: NodeType): void {

    if (track instanceof Node) {
      HTMLPending(document.report(ParseError.MissingCloseDelimiter));
    }

    node = new Node(type, scanner.begin, parent, NodeKind.HTML);
    node.tag = s.token;
    node.languageId = NodeLanguage.html;
    parent.children.push(node);

    if (type === NodeType.Pair) {

      const languageId = q.isEmbedded(node.tag);

      if (languageId) {
        node = new Embed(node);
        node.type = Type.embedded;
        node.languageId = languageId as NodeLanguage;
        node.parent.children.push(node);
        literal = document.literal();
      }

      parent = node;
      pair.add(node);

    }

    track = node;
  }

  /**
   * HTML Pending
   *
   * Tracks unterminated HTML Node types which are pending
   * closure. The function executes a reverse walk of the AST
   * until it finds a match.
   */
  function HTMLPending (report: (location?: Range) => void): void {

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

    report(track.range);
    track = undefined;
  }

  /* -------------------------------------------- */
  /* SHARED TOKENIZERS                            */
  /* -------------------------------------------- */

  /**
   * Node Close
   *
   * Invoked when a node is identified to be closed. This function
   * will completes the token parse. It's called each time we have
   * successfully completed parsing a node of any type, ie: HTML or Liquid.
   */
  function NodeClose (type: NodeType): void {

    node.offsets.push(s.offset);

    if (type === NodeType.Pair) {

      // Syntactic pair match, remove from the set
      pair.delete(node);
      parent = node.parent;

      if (node.type === Type.embedded) {
        embed = (node as Embed).region(embed, literal);
      }

      if (error) {
        error(node.range);
        error = undefined;
      }

    } else if (node.singular && error) {

      error(node.range);
      error = undefined;

    }

  }

  /**
   * Node Ender
   *
   * Handles an opening close type tag. This is invoked when a start/end
   * parent node (close tag) is encountered. It walks the AST to locate
   * the parent and pairs them together.
   */
  function NodeEnder (kind: NodeKind | undefined): boolean {

    while (!node.isSameNode(s.token, kind) && node.parent) node = node.parent;

    // Ensure the node is not root and matches the token
    if (parent.type !== NodeType.Root && node.tag === s.token) {
      node.offsets.push(scanner.begin);
      scope = undefined;
      return true;
    }

    // If we get here, we have invalid syntactic placement
    node = new Node(NodeType.Pair, scanner.begin, parent, kind);
    node.tag = s.token;
    parent.children.push(node);
    return false;
  }

}
