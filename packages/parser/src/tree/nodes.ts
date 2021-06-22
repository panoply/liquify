import { TextDocument, Range } from 'vscode-languageserver-textdocument';
import { NodeKind } from 'lexical/kind';
import { NodeType } from 'lexical/types';
import { NodeLanguage } from 'lexical/language';
import * as context from 'tree/context';
import { document } from 'tree/model';
import { findFirst } from 'parser/utils';
/**
 * AST Node
 *
 * Creates token nodes on the AST
 */
export class INode {

  constructor (public start: number, public end: number, public children: INode[], public parent?: INode) {

    this.start = start;
    this.end = end;
    this.children = children;
    this.parent = parent;
  }

  public tag: string | undefined;
  public closed: boolean = false;
  public startTagEnd: number | undefined;
  public endTagStart: number | undefined;

  public isSameTag (tagInLowerCase: string | undefined) {
    if (this.tag === undefined) {
      return tagInLowerCase === undefined;
    } else {
      return tagInLowerCase !== undefined && this.tag.length === tagInLowerCase.length && this.tag.toLowerCase() === tagInLowerCase;
    }
  }

  public get firstChild (): INode | undefined { return this.children[0]; }
  public get lastChild (): INode | undefined {
    return this.children.length ? this.children[this.children.length - 1] : undefined;
  }

  public findNodeBefore (offset: number): INode {
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

  public findNodeAt (offset: number): INode {
    const idx = findFirst(this.children, c => offset <= c.start) - 1;
    if (idx >= 0) {
      const child = this.children[idx];
      if (offset > child.start && offset <= child.end) {
        return child.findNodeAt(offset);
      }
    }
    return this;
  }

  public get attributeNames (): string[] {
    return this.attributes ? Object.keys(this.attributes) : [];
  }

  root: boolean
  index: number = 0;
  singular: boolean = true;

  kind = NodeKind.Liquid;
  language = NodeLanguage.liquid;
  type: NodeType

  /**
   * Objects this tag contains. Each property contained on the
   * object is an offset location, the value of each property will either
   * be a string array or a number.
   *
   * When the value of the property is type number, is value will point to
   * offset property which contains the string values. When property values
   * are a string array, each items in that array is the property value
   * expressed.
   *
   * ----
   *
   * Example:
   *
   * `{{ object.prop.foo | filter: bar.baz }}`
   *
   * ```javascript
   * {
   *   4:[ 'object', 'prop', 'foo' ],
   *   11: 4,
   *   16: 4,
   *   30: ['bar', 'baz'],
   *   34: 30
   * }
   * ```
   *
   * Notice here how the offsets point back to the property where
   * the object began. The objects within Liquid tags are asserted
   * in this manner as we want to walk the specifications in the fasted
   * possible manner.
   */
  objects?: object = Object.create(null);

  /**
   * An object containing attribute values.
   *
   *  @todo IMPROVE THIS LOGIC
   */
  attributes?: object = Object.create(null);

  /**
   * Filters this tag contains. Each property contained on the
   * object is an offset location, its value is the name of the filter.
   *
   * @todo IMPROVE THIS LOGIC
   */
  filters?: object = Object.create(null);

  /**
   * The start and end Range position of the node.
   */
  get range (): Range {

    return document.getRange(this.start, this.end);

  };

};
