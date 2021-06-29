/* eslint no-unused-vars: "off" */

import { Range } from 'vscode-languageserver-textdocument';
import { NodeKind } from 'lexical/kind';
import { NodeType } from 'lexical/types';
import { NodeLanguage } from 'lexical/language';
import { document } from 'tree/model';
import { findFirst } from 'parser/utils';
import inRange from 'lodash.inrange';

export const enum Type {
  Root,
  Pair,
  Void,
  Start
}

export const enum Token {
  Token = 1,
  Start = 1,
  Inner,
  Ender,
  Outer
}

/**
 * AST Node
 *
 * Creates token nodes on the AST
 */
export class INode {

  public errors: number[] = [];
  public tag: string | undefined;;
  public root: number;
  public parent: INode
  public children: INode[] = [];
  public index: number;
  public kind: NodeKind = NodeKind.Liquid
  public offsets: [number?, number?, number?, number?] = [];
  public singular: boolean;
  public objects?: object;
  public attributes?: object;
  public filters?: object;
  public type: Type | NodeType
  public languageId?: NodeLanguage;

  constructor (
    inode?: Type,
    start?: number,
    parent?: INode,
    kind?: NodeKind
  ) {

    if (inode === Type.Root) {

      this.offsets.push(0, document.size);
      this.children = [];
      this.type = inode;
      this.tag = 'ROOT';

    } else {

      this.offsets.push(start);
      this.parent = parent;

      this.kind = kind;
      this.index = parent.children.length;
      this.singular = true;

      if (this.kind === NodeKind.HTML) {
        this.attributes = {};
        this.type = inode;
      } else {
        this.objects = {};
        this.filters = {};
      }

      if (inode === Type.Pair) {
        this.singular = false;
      }
    }
  }

  /**
   * Returns diagnostics existing on this node
   */
  get diagnostics () {
    return this.errors.map(e => document.errors[e]);
  }

  /**
   * Returns the starting offset index of this node
   */
  get start () {
    return this.offsets[0];
  }

  /**
   * Returns the ending offset index of this node
   */
  get end () {
    return this.offsets[this.offsets.length - 1];
  }

  /**
   * Provide a offset reset on the last offset. This helps
   * align parse errors
   */
  set end (offset: number) {
    this.offsets.splice(this.offsets.length - 1, 1, offset);
  }

  /**
   * The start and end Range position of the node.
   */
  get range (): Range {
    return document.getRange(this.start, this.end);
  };

  /**
   * Returns the previous sibling immediately preceding this node.
   * If the previous node is the fist child of this parent then
   * `null` is returned.
   */
  get prevSibling () {
    return this.parent?.children?.[this.index - 1] || null;
  }

  /**
   * Returns the next sibling immediately following this node.
   * If the next node is the last child of this parent then
   * `null` is returned.
   */
  get nextSibling (): INode | null {

    return this.parent?.type === Type.Root
      ? (document.nodes[this.root + 1].children[0] || null)
      : (this.parent?.children?.[this.index + 1] || null);
  }

  /**
   * Returns the first child in this nodes tree. Returns `null`
   * if the node has no children or is a void/singular type.
   */
  get firstChild (): INode | undefined {
    return this.children?.[0] || null;
  }

  /**
   * Returns the last child in this nodes tree. Returns `null`
   * if the node has no children or is a void/singular type.
   */
  get lastChild (): INode | undefined {
    return this.children?.[this.children.length - 1] || null;
  }

  /**
   * Validates a node tag and kind. This is used by the parser
   * to detect parent nodes.
   */
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
   * Returns raw string content token of the node.
   */
  public getToken (offset: number = document.cursor): string {

    if (inRange(offset, this.offsets[0], this.offsets[1])) {
      return this.getToken(Token.Start);
    }

    if (inRange(offset, this.offsets[1], this.offsets[2])) {
      return this.getToken(Token.Inner);
    }

    if (inRange(offset, this.offsets[2], this.offsets[3])) {
      return this.getToken(Token.Ender);
    }

  }

  /**
   * Returns node at the provided offset location.
   * Use the AST `getNodeAt()` method to convert from
   * a position to offset and return this method.
   *
   * - Lifted from vscode-html-languageservice
   */
  public getNodeAt (offset: number): INode {

    const node = findFirst(this.children, ({ start }) => offset <= start) - 1;

    if (node >= 0) {
      const child = this.children[node];
      if (offset > child.start && offset <= child.end) return child.getNodeAt(offset);
    }

    return this.type !== Type.Root ? this : this.firstChild || this;

  }

};
