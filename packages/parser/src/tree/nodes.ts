/* eslint no-unused-vars: "off" */

import { Range } from 'vscode-languageserver-textdocument';
import { AST } from './ast';
import { findFirst } from '../parser/utils';
import { Type } from '@liquify/liquid-language-specs';
import { NodeKind, TagType, NodeLanguage, NodeType, CharCode as c } from '../lexical';
import { INode } from './typings';

// import inRange from 'lodash.inrange';

/**
 * AST Node
 *
 * Creates token nodes on the AST
 */
export class Node implements INode {

  public kind: NodeKind = NodeKind.Liquid;
  public offsets: [number?, number?, number?, number?] = [];
  public attributes?: object;
  public type: Type | NodeType;
  public languageId?: NodeLanguage = NodeLanguage.liquid;
  public line: number = NaN;
  public tag: string;
  public variable?: string;
  public root: number;
  public index: number;
  public parent: Node;
  public children: Node[] = [];
  public scope: {};
  public objects?: {};
  public filters?: {};
  public arguments?: {};
  public singular: boolean;
  public lastError: number;
  public errors: number[] = [];

  constructor (type: NodeType, start?: number, parent?: Node, kind?: NodeKind) {

    if (type === NodeType.Root) {

      this.tag = 'ROOT';
      this.type = NodeType.Root;
      this.offsets.push(0, AST.document.size);
      this.children = [];

    } else {

      this.offsets.push(start);
      this.parent = parent;
      this.kind = kind;
      this.root = AST.document.root.children.length;
      this.index = parent.children.length;
      this.singular = true;

      if (this.kind === NodeKind.HTML) {
        this.attributes = {};
        this.type = type;
      } else {
        this.scope = {};
        this.objects = {};
        this.filters = {};
        this.arguments = {};
      }

      if (type === NodeType.Pair) {
        this.singular = false;
      }
    }
  }

  get tagType (): TagType {

    return this.offsets.length > 2
      ? TagType.Template
      : AST.document.isCodeChar(c.LCB, this.offsets[0] + 1)
        ? TagType.Output
        : TagType.Singleton;
  }

  get start (): number {
    return this.offsets[0];
  }

  get startToken (): string {
    return AST.document.getText(this.offsets[0], this.offsets[1]);
  }

  get end (): number {
    return this.offsets[this.offsets.length - 1];
  }

  get endToken (): string {
    return AST.document.getText(this.offsets[2], this.offsets[3]);
  }

  get tokenContent () {

    const token = this.startToken;
    const ltrim = token.charCodeAt(2) === c.DSH ? 3 : 2;
    const rtrim = token.length - 2;

    return token.charCodeAt(rtrim) === c.DSH
      ? token.substring(ltrim, rtrim)
      : token.substring(ltrim, rtrim - 1);

  }

  get innerContent (): string {
    return AST.document.getText(this.offsets[1], this.offsets[2]);
  }

  get range (): Range {
    return AST.document.getRange(this.start, this.end);
  };

  get prevSibling (): Node | null {
    return this.parent.children[this.index - 1] || null;
  }

  get nextSibling (): Node | null {
    return this.parent.children?.[this.index + 1] || null;
  }

  get firstChild (): Node | undefined {
    return this.children?.[0] || null;
  }

  get prevChild () {
    const idx = this.parent.children.length;
    return idx === 1
      ? this.parent
      : this.parent.children[idx - 2];
  }

  get lastChild (): Node | undefined {

    return this.children?.[this.children.length - 1] || null;
  }

  get lastWord (): string {

    const token = this.startToken.slice(2, AST.document.cursor - this.start);
    const match = /\w+?(?=\s*?[^\w]*?$)/.exec(token);

    if (!match) return null;

    return match[0];

  }

  public isSameNode (tag: string, kind: NodeKind) {

    if (this.tag === undefined && this.kind === undefined) {
      return tag === undefined && kind === undefined;
    }

    return (
      tag !== undefined &&
      kind !== undefined &&
      this.tag !== undefined &&
      this.tag === tag &&
      this.kind === kind
    );
  }

  /**
   * Returns node at the provided offset location.
   * Use the AST `getNodeAt()` method to convert from
   * a position to offset and return this method.
   *
   * - Lifted from vscode-html-languageservice
   */
  public getNodeAt (offset: number): Node {

    const node = findFirst(this.children, ({ start }) => offset <= start) - 1;

    if (node >= 0) {
      const child = this.children[node];
      if (offset > child.start && offset <= child.end) return child.getNodeAt(offset);
    }

    return this.type === NodeType.Root ? null : this;
  }

};
