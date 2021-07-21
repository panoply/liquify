/* eslint no-unused-vars: "off" */

import { Range } from 'vscode-languageserver-textdocument';
import { NodeKind } from 'lexical/kind';
import { document } from 'tree/model';
import { findFirst } from 'parser/utils';
import { IScopes, NodeType, INode } from 'tree/typings';
import { NodeLanguage } from 'lexical/language';
import { Type } from 'types/export';
import inRange from 'lodash.inrange';
export { NodeType, Token, IScopes } from 'tree/typings';

// import inRange from 'lodash.inrange';

/**
 * AST Node
 *
 * Creates token nodes on the AST
 */
export class Node implements INode {

  public kind: NodeKind = NodeKind.Liquid
  public offsets: [number?, number?, number?, number?] = [];
  public objects?: object;
  public attributes?: object;
  public filters?: object;
  public type: Type | NodeType;
  public languageId?: NodeLanguage;
  public scope: string | number | IScopes;
  public tag: string;
  public root: number;
  public index: number;
  public parent: Node;
  public children: Node[] = [];
  public singular: boolean;
  public lastError: number;
  public errors: number[] = []

  constructor (type?: NodeType, start?: number, parent?: Node, kind?: NodeKind) {

    if (type === NodeType.Root) {

      this.type = NodeType.Root;
      this.offsets.push(0, document.size);
      this.children = [];
      this.scope = {};

    } else {

      this.offsets.push(start);
      this.parent = parent;

      this.kind = kind;
      this.root = document.root.children.length;
      this.index = parent.children.length;
      this.singular = true;

      if (this.kind === NodeKind.HTML) {
        this.attributes = {};
        this.type = type;
      } else {
        this.objects = {};
        this.filters = {};
      }

      if (type === NodeType.Pair) {
        this.singular = false;
      }
    }
  }

  /**
   * Returns the starting offset index of this node
   */
  get start (): number {
    return this.offsets[0];
  }

  /**
   * Returns the start token as a string
   */
  get startToken (): string {
    return document.getText(this.offsets[0], this.offsets[1]);
  }

  /**
   * Returns the ending offset index of this node
   */
  get end (): number {
    return this.offsets[this.offsets.length - 1];
  }

  /**
   * Returns the end token as a string
   */
  get endToken (): string {
    return document.getText(this.offsets[2], this.offsets[3]);
  }

  /**
   * Returns inner contents of the node as string
   */
  get innerContent (): string {
    return document.getText(this.offsets[1], this.offsets[2]);
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
  get prevSibling (): Node | null {
    return this.parent.children[this.index - 1];
  }

  /**
   * Returns the next sibling immediately following this node.
   * If the next node is the last child of this parent then
   * `null` is returned.
   */
  get nextSibling (): Node | null {
    return this.parent.children?.[this.index + 1] || null;
  }

  /**
   * Returns the first child in this nodes tree. Returns `null`
   * if the node has no children or is a void/singular type.
   */
  get firstChild (): Node | undefined {
    return this.children?.[0] || null;
  }

  /**
   * Returns the last child in this nodes tree. Returns `null`
   * if the node has no children or is a void/singular type.
   */
  get lastChild (): Node | undefined {
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
   * Returns node at the provided offset location.
   * Use the AST `getNodeAt()` method to convert from
   * a position to offset and return this method.
   *
   * - Lifted from vscode-html-languageservice
   */
  public getTokenAt (offset: number): Node {

    const node = findFirst(this.children, ({ start }) => offset <= start) - 1;

    if (node >= 0) {

      const child = this.children[node];

      if (inRange(offset, child.offsets[0], child.offsets[1])) {
        return child.getTokenAt(offset);
      }

      if (child.offsets.length > 2) {
        if (inRange(offset, child.offsets[2], child.offsets[3])) {
          return child.getTokenAt(offset);
        }
      }

      if (offset > child.offsets[1]) {
        return !child.children.length && node === 1
          ? this.children[0].getTokenAt(offset)
          : child.getTokenAt(offset);
      }

    }

    return this;

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
      if (offset > child.start && offset <= child.end) {
        return child.getNodeAt(offset);
      }
    }

    return this.type !== NodeType.Root ? this : this.children[node] || this;

  }

};
