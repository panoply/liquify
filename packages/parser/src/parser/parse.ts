import { state as $, query as q, Type, IProperties } from '@liquify/liquid-language-specs';
import { TokenType } from 'lexical/tokens';
import { Range, TextDocument } from 'vscode-languageserver-textdocument';
import { TextEdit } from 'vscode-languageserver';
import { NodeKind } from 'lexical/kind';
import { NodeLanguage } from 'lexical/language';
import { ParseError as Errors } from 'lexical/errors';
import { IAST } from 'tree/ast';
import { Node, NodeType } from 'tree/nodes';
import { Embed } from 'tree/embed';
import { alignRange } from 'parser/utils';
import * as Regexp from 'lexical/expressions';
import * as s from 'parser/stream';
import * as scanner from 'parser/scanner';

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

      case TokenType.Whitespace:

        if (node.kind === NodeKind.Liquid) {
          if (s.spaces >= 2) {
            document.report(Errors.WarnWhitespace);
          }
        }

        break;

      case TokenType.HTMLStartTagOpen:

        htmlNode(NodeType.Pair);

        break;

      case TokenType.HTMLStartTagClose:

        parent = node = parent;

        // console.log(node.tag);

        closeNode(NodeType.Start);
        track = undefined;

        break;
      case TokenType.HTMLVoidTagOpen:

        htmlNode(NodeType.Void);

        break;

      case TokenType.HTMLVoidTagClose:

        closeNode(NodeType.Void);

        track = undefined;

        break;

      case TokenType.HTMLEndTagOpen:

        parent = node = parent;

        if (!startEnd(NodeKind.HTML)) {
          error = document.report(Errors.MissingStartTag);
        }

        break;

      case TokenType.HTMLEndTagClose:

        closeNode(NodeType.Pair);
        track = undefined;

        break;

      case TokenType.HTMLLiquidAttribute:

        // node = parent;
        node = parent;

        break;

      case TokenType.HTMLAttributeName:

        attr = s.token;
        node.attributes[attr] = null;

        if (attr === 'src') node.type = Type.import;

        break;

      case TokenType.HTMLAttributeValue:

        if (node.type === Type.embedded) {
          node.languageId = q.isLanguage(s.token) as NodeLanguage;
          node.embeddedId = node.languageId;

        }

        node.attributes[attr as string] = s.token;
        attr = undefined;

        break;

      /* -------------------------------------------- */
      /* LIQUID                                       */
      /* -------------------------------------------- */
      case TokenType.TagOpen:

        liquidNode(NodeType.Pair);

        break;

      case TokenType.StartTagName:

        node.tag = s.token;
        node.type = $.liquid.tag.type;
        node.singular = false;

        if (node.type === Type.embedded) {
          node = new Embed(node);
          node.parent.children.push(node);
          parent = node;
        }

        pair.add(node);

        break;

      case TokenType.StartTagClose:

        closeNode(NodeType.Start);

        break;

      case TokenType.OutputTagOpen:

        liquidNode(NodeType.Void);

        node.type = Type.output;

        break;

      case TokenType.OutputTagName:

        node.tag = s.token;

        if (node.parent.type === Type.iteration) {
          node.scope = node.parent?.scope?.[node.tag];
        }

        break;

      case TokenType.ObjectTagName:

        node.tag = s.token;
        object = s.offset;

        if (node.parent.type === Type.iteration) {
          node.scope = node.parent.scope[s.token];
        }

        // console.log(liquid.parent.scope[s.token]);

        Object.assign(node.objects, { [s.offset]: [ s.token ] });

        if (!isNaN(filter) && node.filters?.[filter]) {
          node.filters[filter].push(object);
        }

        break;

      case TokenType.OutputTagClose:

        closeNode(NodeType.Output);

        break;

      case TokenType.SingularTagName:

        node.tag = s.token;
        node.type = $.liquid.tag.type;

        pair.delete(node);

        break;

      case TokenType.SingularTagClose:

        closeNode(NodeType.Output);

        break;

      case TokenType.EndTagOpen:

        parent = node = parent;

        if (!startEnd(NodeKind.Liquid)) {
          error = document.report(Errors.MissingStartTag);
        }

        break;

      case TokenType.EndTagClose:

        closeNode(NodeType.Pair);

        break;

      case TokenType.EmbeddedJSON:

        node.languageId = NodeLanguage.json;
        node.embeddedId = node.languageId;

        break;

      case TokenType.EmbeddedCSS:

        node.languageId = NodeLanguage.css;
        node.embeddedId = node.languageId;

        break;

      case TokenType.EmbeddedJavaScript:

        node.languageId = NodeLanguage.javascript;
        node.embeddedId = node.languageId;

        break;

      case TokenType.Iteration:

        node.scope = {};

        break;

      case TokenType.IterationIteree:

        scope = s.token;
        node.scope[s.token] = null;

        break;

      case TokenType.IterationArray:

        // node.scope[scope] = q.cursor.object?.object as string;

        if (node.parent.type === Type.iteration) {
        //  Object.assign(node.scope, node.parent.scope);
        }

        break;

      case TokenType.Object:

        object = s.offset;

        Object.assign(node.objects, { [s.offset]: [ s.token ] });

        if (node.parent.type === Type.iteration) {
          if (node.parent.scope?.[s.token]) {
            Object.assign(node.scope, node.parent.scope);
            q.setObject(node.parent.scope[s.token]);
          }
        } else {
          q.setObject(s.token);
        }

        if (!isNaN(filter) && node.filters?.[filter]) {
          node.filters[filter].push(object);
        }

        break;

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

      case TokenType.Filter:

        filter = s.offset + s.cursor;

        Object.assign(node.filters, { [filter]: [] });

        if (scanner.error === Errors.MissingWhitespace) {
          document.report(Errors.UnknownProperty);
        }

        break;

      case TokenType.FilterIdentifier:

        node.filters[filter].push(s.token);
        node.filters[s.offset + 1] = filter;

        break;

      case TokenType.FilterArgument:

        node.filters[filter].push(s.token);
        node.filters[s.offset + 1] = filter;

        break;

      case TokenType.FilterEnd:

        filter = NaN;

        break;

      case TokenType.VariableKeyword:

        scope = s.token;
        document.root.scope[s.token] = null;

        break;

      case TokenType.VariableValue:

        document.root.scope[scope] = s.token;

        break;

    }

    token = scanner.scan();

  }

  /* NODE SYNTACTICS ---------------------------- */

  if (document.regions.length >= embed) document.regions.splice(embed);

  for (const { range } of pair) document.report(Errors.MissingEndTag)(range);

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
        node.embeddedId = node.languageId;
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
    node.embeddedId = parent.embeddedId ?? parent.languageId;

    // Add this node child to the parent
    parent.children.push(node);

    // parent = node;
    if (type === NodeType.Pair) parent = node;

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

      if (node.embeddedId === NodeLanguage.css && node.kind === NodeKind.Liquid) {

        literal = TextDocument.update(literal, [
          {
            text: `/*${node.endToken.slice(2, -2)}*/`,
            range: {
              start: literal.positionAt(node.offsets[2]),
              end: literal.positionAt(node.offsets[3])
            }
          }
        ], literal.version + 1);
      }

      // Syntactic pair match, remove from the set
      pair.delete(node);

      parent = node.parent;
      // if (node.kind === NodeKind.HTML) html = node.parent;
      // if (node.kind === NodeKind.Liquid) liquid = node.parent;
      if (node.type === Type.embedded) {
        embed = (node as Embed).region(embed, literal);
      }

      if (error) {
        error(node.range);
        error = undefined;
      }

    }

    if (type === NodeType.Start) {

      if (node.embeddedId === NodeLanguage.css && node.kind === NodeKind.Liquid) {

        // console.log(node);
        literal = TextDocument.update(literal, [
          {
            text: `/*${node.startToken.slice(2, -2)}*/`,
            range: {
              start: literal.positionAt(node.offsets[0]),
              end: literal.positionAt(node.offsets[1])
            }
          }
        ], literal.version + 1);
      }

    }

    if (type === NodeType.Output) {

      if (node.embeddedId === NodeLanguage.css && node.kind === NodeKind.Liquid) {
        literal = TextDocument.update(literal, [
          {
            range: node.range,
            text: '--' + 'x'.repeat(node.startToken.length - 2)
          }
        ], literal.version + 1);
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
