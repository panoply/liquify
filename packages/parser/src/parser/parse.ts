import { spec, Type as Types, IProperties } from '@liquify/liquid-language-specs';
import { TokenType } from 'lexical/tokens';
import { Range } from 'vscode-languageserver-textdocument';
import { NodeKind } from 'lexical/kind';
import { NodeLanguage } from 'lexical/language';
import { ParseError as Errors } from 'lexical/errors';
import { IAST } from 'tree/ast';
import { INode, Type } from 'tree/nodes';
import * as Regexp from 'lexical/expressions';
import * as s from 'parser/stream';
import * as scanner from 'parser/scanner';

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
  let scope: string | Types;
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

        // Remove syntactic placement errors
        document.report(scanner.error)();

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
          error = document.report(Errors.MissingStartTag);
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

        if (attr === 'src') node.type = Types.import;

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

        liquidNode(Type.Pair);

        break;

      case TokenType.StartTagName:

        node.tag = s.token;
        node.singular = false;
        node.type = spec.tag.type;

        pair.add(node);

        break;

      case TokenType.StartTagClose:
        closeNode(Type.Start);

        break;

      case TokenType.OutputTagOpen:

        liquidNode(Type.Void);

        node.type = Types.output;

        break;

      case TokenType.OutputTagName:

        node.tag = s.token;
        node.scope = node.parent?.scope?.[node.tag];

        break;

      case TokenType.ObjectTagName:

        node.tag = s.token;
        object = s.offset;

        if (node.parent.type === Types.iteration) {
          node.scope = node.parent.scope[s.token];
        }

        // console.log(liquid.parent.scope[s.token]);

        Object.assign(node.objects, { [s.offset]: [ s.token ] });

        if (!isNaN(filter) && node.filters?.[filter]) {
          node.filters[filter].push(object);
        }

        break;

      case TokenType.OutputTagClose:

        closeNode(Type.Void);

        break;

      case TokenType.SingularTagName:

        node.tag = s.token;
        node.type = spec.tag.type;

        pair.delete(node);

        break;

      case TokenType.SingularTagClose:
        closeNode(Type.Void);

        break;

      case TokenType.EndTagOpen:
        liquid = node = liquid;

        if (!startEnd(NodeKind.Liquid, liquid)) {
          error = document.report(Errors.MissingStartTag);
        }

        break;

      case TokenType.EndTagClose:
        closeNode(Type.Pair);

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

        if (node.parent.type === Types.iteration) {
        //  Object.assign(node.scope, node.parent.scope);
        }

        break;

      case TokenType.Object:

        object = s.offset;

        Object.assign(node.objects, { [s.offset]: [ s.token ] });

        if (node.parent.type === Types.iteration) {
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

        if (node.type === Types.iteration) {
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

      case TokenType.EmbeddedJSON:

        node.languageId = NodeLanguage.json;

        break;
    }

    token = scanner.scan();
  }

  /* NODE SYNTACTICS ---------------------------- */

  if (pair.size > 0) {
    for (const { range } of pair) document.report(Errors.MissingEndTag)(range);
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
  }

  /**
   * Creates a child node instance, this is called
   * each time we encounter a starting delimeters.
   */
  function liquidNode (type: Type): void {
    node = new INode(type, scanner.begin, liquid, NodeKind.Liquid);

    // Add this node child to the parent
    liquid.children.push(node);

    // parent = node;
    if (type === Type.Pair) liquid = node;

  }

  /**
   * Handles an opening close type tag. This is executed
   * when a start/end parent node close tag is encountered.
   * It walks the AST to locate the parent node.
   */
  function startEnd (kind: NodeKind | undefined, parent: INode): boolean {
    while (!node.isSameNode(s.token, kind) && node.parent) {
      node = node.parent;
    }

    // Ensure the node is not root and matches the token
    if (parent.type !== Type.Root && node.tag === s.token) {
      node.offsets.push(scanner.begin);
      scope = undefined;
      return true;
    }

    // If we get here, we have invalid syntactic placement
    node = new INode(Type.Pair, scanner.begin, parent, kind);
    node.tag = s.token;
    parent.children.push(node);
    return false;
  }

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

      error(node.range);
      error = undefined;
    }
  }

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

    document.report(Errors.MissingCloseDelimiter)(track.range);
    track = undefined;
  }
}
