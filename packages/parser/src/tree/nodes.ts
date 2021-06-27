import { Range } from 'vscode-languageserver-textdocument';
import { NodeKind } from 'lexical/kind';
import { NodeType } from 'lexical/types';
import { NodeLanguage } from 'lexical/language';
import { IDiagnostic } from 'lexical/diagnostics';
import { document } from 'tree/model';
import { findFirst, createObject } from 'parser/utils';
import { cursor } from 'parser/specs';

export const enum Type {
  Root,
  Pair,
  Void
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

  constructor (
    inode?: Type,
    start?: number,
    parent?: INode,
    kind?: NodeKind
  ) {

    if (inode === Type.Root) {

      this.offsets.push(0, document.size);
      this.children = [];
      this.type = Type.Root;

    } else {

      this.offsets.push(start);
      this.kind = kind;
      this.parent = parent;

      if (this.kind === NodeKind.HTML) {
        this.attributes = {};
        this.type = inode;
      } else {
        this.objects = {};
        this.filters = {};
      }

      if (inode === Type.Pair) {
        this.closed = false;
        this.singular = false;
      }
    }
  }

  public errors: number[] = [];
  public tag: string | undefined;;
  public parent: INode
  public children: INode[] = [];
  public index: number;
  public kind: NodeKind = NodeKind.Liquid
  public offsets: [number?, number?, number?, number?] = [];
  public type: Type | NodeType
  public closed: boolean = false
  public singular: boolean;
  public objects?: object;
  public attributes?: object;
  public filters?: object;
  public languageId?: NodeLanguage;

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
   * Returns the ending offset index of this node
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
    return this.parent?.children?.[this.index + 1] || null;
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
   * Returns raw string content token of the node.
   */
  public getToken (token?: Token): string {

    if (token === Token.Start || this.singular) {
      return document.getText(this.offsets[0], this.offsets[1]);
    }

    if (!this.singular && this.closed) {

      if (token === Token.Outer) {
        return document.getText(this.start, this.end);
      }

      if (token === Token.Inner) {
        return document.getText(this.offsets[1], this.offsets[2]);
      }

      if (token === Token.Ender) {
        return document.getText(this.offsets[2], this.offsets[3]);
      }
    }

    return this.getToken(Token.Outer);

  }

  public isSameTag (tagInLowerCase: string | undefined) {

    if (this.tag === undefined) return tagInLowerCase === undefined;

    return (
      tagInLowerCase !== undefined &&
      this.tag.length === tagInLowerCase.length &&
      this.tag.toLowerCase() === tagInLowerCase
    );

  }

  public getNodeBefore (offset: number): INode {

    const node = findFirst(this.children, ({ start }) => offset <= start) - 1;

    if (node >= 0) {

      const child = this.children[node];

      if (offset > child.start) {
        if (offset < child.end) return child.getNodeBefore(offset);
        const { lastChild } = child;
        if (lastChild && lastChild.end === child.end) return child.getNodeBefore(offset);
        return child;
      }
    }

    return this.type !== Type.Root ? this : this.firstChild || this;

  }

  /**
   * Returns a node located the provided location offset index.
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
