import { state as $, query as q, Type, IProperties } from '@liquify/liquid-language-specs';
import { TokenType } from '../lexical/tokens';
import { Range, TextDocument } from 'vscode-languageserver-textdocument';
// import { TextEdit } from 'vscode-languageserver';
import { NodeKind } from '../lexical/kind';
import { NodeLanguage } from '../lexical/language';
import { ParseError as Errors } from '../lexical/errors';
import { IAST } from '../tree/ast';
import { Node, NodeType } from '../tree/nodes';
import { Embed } from '../tree/embed';
import { assign } from '../parser/utils';
import * as s from '../parser/stream';
import * as scanner from '../parser/scanner';

/* PAIR SETS ---------------------------------- */

const pair: Set<Node> = new Set();

/**
 * Liquid/HTML parser function which constructs
 * and tokenizes syntaxes to build an AST.
 */
export function parse (document: IAST): IAST {

  /* NODE ROOT ---------------------------------- */

  document.root = new Node(NodeType.Root);

  let literal: TextDocument;

  /* NODE REFERENCES ---------------------------- */

  let parent: Node = document.root;
  let node: Node | Embed;
  let track: Node;

  /* NODE INTERNALS ----------------------------- */

  let embed: number = 0;
  let scope: string | Type;
  let error: (range?: Range) => void;
  let token: number = scanner.scan();
  let attr: string | number;
  let filter: number = NaN;
  let object: number = NaN;

  /* -------------------------------------------- */
  /* TOKENIZE                                     */
  /* -------------------------------------------- */

  while (token !== TokenType.EOS) {

    switch (token) {

      /* -------------------------------------------- */
      /* PARSER ERROR                                 */
      /* -------------------------------------------- */
      case TokenType.ParseError:

        node.errors.push(document.errors.length);

        if (scanner.error === Errors.MissingCloseDelimiter) {
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
            document.report(Errors.WarnWhitespace);
          }
        }

        break;

      /* -------------------------------------------- */
      /* HTML START TAG OPEN                          */
      /* -------------------------------------------- */
      case TokenType.HTMLStartTagOpen:

        htmlNode(NodeType.Pair);

        break;

      /* -------------------------------------------- */
      /* HTML START TAG CLOSE                         */
      /* -------------------------------------------- */
      case TokenType.HTMLStartTagClose:

        parent = node = parent;

        // console.log(node.tag);

        closeNode(NodeType.Start);
        track = undefined;

        break;

      /* -------------------------------------------- */
      /* HTML VOID TAG CLOSE                          */
      /* -------------------------------------------- */
      case TokenType.HTMLVoidTagOpen:

        htmlNode(NodeType.Void);

        break;

      /* -------------------------------------------- */
      /* HTML VOID TAG CLOSE                          */
      /* -------------------------------------------- */
      case TokenType.HTMLVoidTagClose:

        closeNode(NodeType.Void);

        track = undefined;

        break;

      /* -------------------------------------------- */
      /* HTML END TAG CLOSE                           */
      /* -------------------------------------------- */
      case TokenType.HTMLEndTagOpen:

        parent = node = parent;

        if (!startEnd(NodeKind.HTML)) {
          error = document.report(Errors.MissingStartTag);
        }

        break;

      /* -------------------------------------------- */
      /* HTML END TAG CLOSE                           */
      /* -------------------------------------------- */
      case TokenType.HTMLEndTagClose:

        closeNode(NodeType.Pair);
        track = undefined;

        break;

      /* -------------------------------------------- */
      /* HTML LIQUID ATTRIBUTE                        */
      /* -------------------------------------------- */
      case TokenType.HTMLLiquidAttribute:

        // node = parent;
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
          node.embeddedId = node.languageId;
        }

        node.attributes[attr as string] = s.token;
        attr = undefined;

        break;

      /* -------------------------------------------- */
      /* LIQUID TAG OPEN                              */
      /* -------------------------------------------- */
      case TokenType.TagOpen:

        liquidNode(NodeType.Pair);

        break;

      /* -------------------------------------------- */
      /* LIQUID TAG CLOSE                             */
      /* -------------------------------------------- */
      case TokenType.TagClose:

        if (node.singular) {
          closeNode(NodeType.Singular);
        } else {
          closeNode(NodeType.Pair);
        }

        break;

      /* -------------------------------------------- */
      /* LIQUID START TAG NAME                        */
      /* -------------------------------------------- */
      case TokenType.StartTagName:

        node.tag = s.token;
        node.type = $.liquid.tag.type;
        node.singular = false;
        parent = node;

        if (node.type === Type.embedded) {
          node = new Embed(node);
          node.parent.children.push(node);
          parent = node;
        }

        pair.add(node);

        break;

      /* -------------------------------------------- */
      /* LIQUID START TAG CLOSE                       */
      /* -------------------------------------------- */
      case TokenType.StartTagClose:

        closeNode(NodeType.Start);

        break;

      /* -------------------------------------------- */
      /* LIQUID OUTPUT TAG OPEN                       */
      /* -------------------------------------------- */
      case TokenType.OutputTagOpen:

        liquidNode(NodeType.Void);

        node.type = Type.output;

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

        node.tag = s.token;
        object = s.offset;

        if (node.parent.type === Type.iteration) {
          node.scope = node.parent.scope[s.token];
        }

        console.log(node.scope);

        // console.log(liquid.parent.scope[s.token]);

        assign(node.objects, { [s.offset]: [ s.token ] });

        if (!isNaN(filter) && node.filters?.[filter]) {
          node.filters[filter].push(object);
        }

        break;

      /* -------------------------------------------- */
      /* LIQUID OUTPUT TAG CLOSE                      */
      /* -------------------------------------------- */
      case TokenType.OutputTagClose:

        closeNode(NodeType.Output);

        break;

      /* -------------------------------------------- */
      /* LIQUID SINGULAR TAG NAME                     */
      /* -------------------------------------------- */
      case TokenType.SingularTagName:

        node.tag = s.token;
        node.type = $.liquid.tag.type;
        node.singular = true;

        pair.delete(node);

        break;

      /* -------------------------------------------- */
      /* LIQUID SINGULAR TAG CLOSE                    */
      /* -------------------------------------------- */
      case TokenType.SingularTagClose:

        closeNode(NodeType.Output);

        break;

      /* -------------------------------------------- */
      /* LIQUID END TAG OPEN                          */
      /* -------------------------------------------- */
      case TokenType.EndTagOpen:

        parent = node = parent;

        if (!startEnd(NodeKind.Liquid)) {
          error = document.report(Errors.MissingStartTag);
        }

        break;

      /* -------------------------------------------- */
      /* LIQUID END TAG CLOSE                         */
      /* -------------------------------------------- */
      case TokenType.EndTagClose:

        closeNode(NodeType.Pair);

        break;

      /* -------------------------------------------- */
      /* LIQUID EMBEDDED TAG JSON                     */
      /* -------------------------------------------- */
      case TokenType.EmbeddedJSON:

        node.languageId = NodeLanguage.json;
        node.embeddedId = node.languageId;

        break;

      /* -------------------------------------------- */
      /* LIQUID EMBEDDED TAG CSS                      */
      /* -------------------------------------------- */
      case TokenType.EmbeddedCSS:

        node.languageId = NodeLanguage.css;
        node.embeddedId = node.languageId;

        break;

      /* -------------------------------------------- */
      /* LIQUID EMBEDDED TAG JAVASCRIPT               */
      /* -------------------------------------------- */
      case TokenType.EmbeddedJavaScript:

        node.languageId = NodeLanguage.javascript;
        node.embeddedId = node.languageId;

        break;

      /* -------------------------------------------- */
      /* LIQUID CONTROL ELSE TAG                      */
      /* -------------------------------------------- */
      case TokenType.ControlElse:

        if (!q.isParent(node.prevChild.tag)) {
          error = document.report(Errors.InvalidPlacement);
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

        // node.scope[scope] = ($.liquid.object as IProperties)?.object;

        if (node.parent.type === Type.iteration) {
        //  assign(node.scope, node.parent.scope);
        }

        break;

      /* -------------------------------------------- */
      /* LIQUID OBJECT                                */
      /* -------------------------------------------- */
      case TokenType.Object:

        object = s.offset;

        assign(node.objects, { [s.offset]: [ s.token ] });

        if (node.parent.type === Type.iteration) {
          if (node.parent.scope?.[s.token]) {
            assign(node.scope, node.parent.scope);
            q.setObject(node.parent.scope[s.token]);
          }
        } else {
          q.setObject(s.token);
        }

        if (!isNaN(filter) && node.filters?.[filter]) {
          node.filters[filter].push(object);
        }

        break;

      /* -------------------------------------------- */
      /* LIQUID OBJECT PROPERTY                       */
      /* -------------------------------------------- */
      case TokenType.ObjectProperty:

        node.objects[object].push(s.token);
        node.objects[s.offset] = object;

        q.isProperty(s.token);

        if (node.type === Type.iteration) {

          node.scope[scope] = ($.liquid.object as IProperties)?.object;

          if (!q.isObjectType(Type.array)) {
            document.report(Errors.InvalidIterationType)();
          }

          if (typeof node.scope[scope] === 'string') {
            q.setObject(node.scope[scope]);
          }

        }

        if (typeof node.scope === 'number') {
          if (!q.isObjectType(node.scope as number)) {
            document.report(Errors.RejectObject)();
          }
        } else if (q.setObject(node.scope as string) && !q.isProperty(s.token)) {
          document.report(Errors.UnknownProperty)();
        }

        break;

      /* -------------------------------------------- */
      /* LIQUID FILTER                                */
      /* -------------------------------------------- */
      case TokenType.Filter:

        filter = s.offset + s.cursor;

        assign(node.filters, { [filter]: [] });

        if (scanner.error === Errors.MissingWhitespace) {
          document.report(Errors.UnknownProperty);
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

      /* -------------------------------------------- */
      /* LIQUID VARIABLE KEYWORD                      */
      /* -------------------------------------------- */
      case TokenType.VariableKeyword:

        scope = s.token;
        document.root.scope[s.token] = null;

        break;

      /* -------------------------------------------- */
      /* LIQUID VARIABLE VALUE                        */
      /* -------------------------------------------- */
      case TokenType.VariableValue:

        document.root.scope[scope] = s.token;

        break;

    }

    token = scanner.scan();

  }

  /* NODE SYNTACTICS ---------------------------- */

  if (document.regions.length >= embed) document.regions.splice(embed);

  pair.forEach(({ range }) => document.report(Errors.MissingEndTag)(range));
  pair.clear();

  /* RETURN ------------------------------------- */

  // console.log(document);

  (document.node as Node) = document.getNodeAt(document.cursor);

  return document;

  /* -------------------------------------------- */
  /* HELPER FUNCTIONS                             */
  /* -------------------------------------------- */

  /**
   * Creates a child node instance, this is called
   * each time we encounter a starting delimeters.
   */
  function htmlNode (type: NodeType): void {

    if (track instanceof Node) pendingClose();

    node = new Node(type, scanner.begin, parent, NodeKind.HTML);
    node.tag = s.token;
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
   * Creates a child node instance, this is called
   * each time we encounter a starting delimeters.
   */
  function liquidNode (type: NodeType): void {

    node = new Node(type, scanner.begin, parent, NodeKind.Liquid);

    // Add this node child to the parent
    parent.children.push(node);

    // s parent = node;

  }

  /**
   * Handles an opening close type tag. This is executed
   * when a start/end parent node close tag is encountered.
   * It walks the AST to locate the parent node.
   */
  function startEnd (kind: NodeKind | undefined): boolean {

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

  /**
   * Closed a node and completes the parse of the
   * token. Called each time we have successfully
   * completed parsing a node or any type.
   */
  function closeNode (type: NodeType): void {

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

    } else if (node.singular) {

      if (error) {
        error(node.range);
        error = undefined;
      }
    }

  }

  function pendingClose (): void {

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

    document.report(Errors.MissingCloseDelimiter)(track.range);
    track = undefined;
  }
}
