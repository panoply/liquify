import { spec, Type, IProperties } from '@liquify/liquid-language-specs';
import { TokenType } from 'lexical/tokens';
import { Range } from 'vscode-languageserver-textdocument';
import { NodeKind } from 'lexical/kind';
import { NodeLanguage } from 'lexical/language';
import { ParseError as Errors } from 'lexical/errors';
import { IAST } from 'tree/ast';
import { Root, Node, NodeType } from 'tree/nodes';
import { Embed } from 'tree/embed';
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

  document.root = new Root();

  /* NODE REFERENCES ---------------------------- */

  let liquid: Node = document.root;
  let html: Node = liquid;
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

        if (scanner.error === Errors.MissingCloseDelimiter) {
          track = undefined;
          node.offsets.length > 2 || node.offsets.push(s.offset);
          document.report(scanner.error)(node.range);
          break;
        }

        document.report(scanner.error)(); // Remove syntactic placement errors

        break;

      case TokenType.HTMLStartTagOpen:

        htmlNode(NodeType.Pair);

        break;

      case TokenType.HTMLStartTagClose:

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

        html = node = html;

        if (!startEnd(NodeKind.HTML, html)) {
          error = document.report(Errors.MissingStartTag);
        }

        break;

      case TokenType.HTMLEndTagClose:

        closeNode(NodeType.Pair);
        track = undefined;

        break;

      case TokenType.HTMLLiquidAttribute:

        // node = parent;
        node = liquid;

        break;

      case TokenType.HTMLAttributeName:

        attr = s.token;
        node.attributes[attr] = null;

        if (attr === 'src') node.type = Type.import;

        break;

      case TokenType.HTMLAttributeValue:

        if (Regexp.HTMLAttributeJS.test(s.token)) {
          node.languageId = NodeLanguage.javascript;
        } else if (Regexp.HTMLAttributeJSON.test(s.token)) {
          node.languageId = NodeLanguage.json;
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
        node.type = spec.tag.type;
        node.singular = false;

        if (node.type === Type.embedded) {
          node = new Embed(node);
          node.parent.children.push(node);
          liquid = node;
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

        closeNode(NodeType.Void);

        break;

      case TokenType.SingularTagName:

        node.tag = s.token;
        node.type = spec.tag.type;

        pair.delete(node);

        break;

      case TokenType.SingularTagClose:

        closeNode(NodeType.Void);

        break;

      case TokenType.EndTagOpen:

        liquid = node = liquid;

        if (!startEnd(NodeKind.Liquid, liquid)) {
          error = document.report(Errors.MissingStartTag);
        }

        break;

      case TokenType.EndTagClose:

        closeNode(NodeType.Pair);

        break;

      case TokenType.EmbeddedJSON:

        node.languageId = NodeLanguage.json;

        break;

      case TokenType.EmbeddedCSS:

        node.languageId = NodeLanguage.css;

        break;

      case TokenType.Iteration:

        node.scope = {};

        break;

      case TokenType.IterationIteree:

        scope = s.token;
        node.scope[s.token] = null;

        break;

      case TokenType.IterationArray:

        // node.scope[scope] = spec.cursor.object?.object as string;

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
            spec.SetObject(node.parent.scope[s.token]);
          }
        } else {
          spec.SetObject(s.token);
        }

        if (!isNaN(filter) && node.filters?.[filter]) {
          node.filters[filter].push(object);
        }

        break;

      case TokenType.ObjectProperty:

        node.objects[object].push(s.token);
        node.objects[s.offset + 1] = object;

        spec.isProperty(s.token);

        if (node.type === Type.iteration) {
          node.scope[scope] = (spec.object as IProperties)?.object;
          if (typeof node.scope[scope] === 'string') {
            spec.SetObject(node.scope[scope]);
          }
        }

        if (typeof node.scope === 'number') {
          if (!spec.isObjectType(node.scope as number)) {
            document.report(Errors.RejectObject)();
          }
        } else if (spec.SetObject(node.scope as string) && !spec.isProperty(s.token)) {
          document.report(Errors.UnknownProperty)();
        }

        break;

      case TokenType.Filter:

        filter = s.offset + s.cursor;

        Object.assign(node.filters, { [filter]: [] });

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

  if (document.regions.length >= embed) {
    document.regions.splice(embed);
  }

  for (const { range } of pair) {
    document.report(Errors.MissingEndTag)(range);
  }

  pair.clear();

  /* RETURN ------------------------------------- */

  console.log(document);

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

    node = new Node(type, scanner.begin, html, NodeKind.HTML);
    node.tag = s.token;
    html.children.push(node);

    if (type === NodeType.Pair) {
      html = node;
      pair.add(node);
    }

    track = node;
  }

  /**
   * Creates a child node instance, this is called
   * each time we encounter a starting delimeters.
   */
  function liquidNode (type: NodeType): void {

    node = new Node(type, scanner.begin, liquid, NodeKind.Liquid);

    // Add this node child to the parent
    liquid.children.push(node);

    // parent = node;
    if (type === NodeType.Pair) liquid = node;

  }

  /**
   * Handles an opening close type tag. This is executed
   * when a start/end parent node close tag is encountered.
   * It walks the AST to locate the parent node.
   */
  function startEnd (kind: NodeKind | undefined, parent: Node): boolean {

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

      if (node.kind === NodeKind.HTML) html = node.parent;
      if (node.kind === NodeKind.Liquid) liquid = node.parent;
      if (node.type === Type.embedded) embed = (node as Embed).region(embed);

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

        if (child.singular || child.offsets.length > 2) {
          track.offsets.push(child.end);
          break;
        }
      }
    }

    document.report(Errors.MissingCloseDelimiter)(track.range);
    track = undefined;
  }
}
