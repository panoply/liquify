import { Range } from 'vscode-languageserver-textdocument';
import { NodeKind } from 'lexical/kind';
import { NodeType } from 'lexical/types';
import { NodeLanguage } from 'lexical/language';
import { document } from 'tree/model';
import { findFirst } from 'parser/utils';
/**
 * AST Node
 *
 * Creates token nodes on the AST
 */
export class INode {

  tag: string | undefined;
  offsets: [number?, number?, number?, number?] = [];
  parent: INode
  children: INode[] = []
  root: boolean
  index: number = 0;
  singular: boolean = true;
  kind = NodeKind.Liquid;
  type: NodeType

  get start () {
    return this.offsets[0];
  }

  get end () {
    return this.offsets[this.offsets.length - 1];
  }

  get range (): Range {
    return document.getRange(this.start, this.end);
  };

  get startToken () {
    return document.getText(this.offsets[0], this.offsets[1]);
  }

  get endToken () {
    return this.singular ? null : document.getText(this.offsets[2], this.offsets[3]);
  }

  get firstChild (): INode | undefined {
    return this.children[0];
  }

  get lastChild (): INode | undefined {
    return this.children.length
      ? this.children[this.children.length - 1]
      : undefined;
  }

  isSameTag (tagInLowerCase: string | undefined) {
    if (this.tag === undefined) {
      return tagInLowerCase === undefined;
    } else {
      return tagInLowerCase !== undefined && this.tag.length === tagInLowerCase.length && this.tag.toLowerCase() === tagInLowerCase;
    }
  }

  findNodeBefore (offset: number): INode {

    const idx = findFirst(this.children, c => offset <= c.start) - 1;

    if (idx >= 0) {
      const child = this.children[idx];
      if (offset > child.start) {
        if (offset < child.end) {
          return child.findNodeBefore(offset);
        }
        const lastChild = child.lastChild;
        if (lastChild && lastChild.end === child.end) {
          return child.findNodeBefore(offset);
        }
        return child;
      }
    }
    return this;
  }

  findNodeAt (offset: number): INode {
    const idx = findFirst(this.children, c => offset <= c.start) - 1;
    if (idx >= 0) {
      const child = this.children[idx];
      if (offset > child.start && offset <= child.end) {
        return child.findNodeAt(offset);
      }
    }
    return this;
  }

  // public get attributeNames (): string[] { return this.attributes ? Object.keys(this.attributes) : [];
  // }

  // objects?: object = Object.create(null);
  // attributes?: object = Object.create(null);
  // filters?: object = Object.create(null);

};
