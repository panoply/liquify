import { NodeKind } from 'lexical/kind';
import { NodeType } from 'lexical/types';
import { NodeLanguage } from 'lexical/language';
import { Scanner } from 'parser/scanner';
import { Context } from 'tree/context';
import { TextDocument, Range } from 'vscode-languageserver-textdocument';
import { Document } from 'tree/document';

/**
 * AST Node
 *
 * Creates token nodes on the AST
 */
export class INode {

  /**
   * The name of the node
   */
  name: string = null;

  /**
   * The root node index position on the AST. It informs of
   * the parent index. If this is equal with `index` the node
   * is not a child of nested within a pair.
   */
  root: number = null;

  /**
   * The parent node index position on the AST. The parent index
   * is the tag which is encapsulating the node.
   */
  parent: number = null;

  /**
   * The index position of the node located on the AST.
   */
  index = Document.AST.nodes.length;

  /**
   * The node type value, which is used to distinguish its
   * functionality and use, as described in Node Types.
   */
  type = NodeType.unknown;

  /**
   * Whether or not the node is a singular type node, ie:
   * is not syntactic.
   */
  singular: boolean = true;

  /**
   * The start and end Range position of the node.
   */
  range: Range = Scanner.range;

  /**
   * The offsets location. This contains a list of offsets,
   * starting from the open location of the node and finishing at
   * the closing location of the node. When this node is a
   * syntactic pair, it will contain `4` entries, the first `2`
   * are the starting node and the last `2` are the ending node.
   */
  offsets: [number, number?, number?, number?] = [ Scanner.start ];

  /**
   * The nodes kind value, which is used to distinguish the
   * language it belongs to, as described in Node Kinds.
   */
  kind = NodeKind.Liquid;

  /**
   * The language pretaining to this node. This defaults
   * to a `liquid` value.
   */
  language = NodeLanguage.liquid;

  /**
   * The string literal token value/s. When the tag is
   * syntactic the _end_ tag is the second value.
   */
  token: [string?, string?] = [];

  /**
   * The context indexes of the node
   */
  context: number[] = [];

  /**
   * The number of parsing errors encountered before this
   * node was consumed.
   */
  error: number = Document.AST.errors.length;

  /**
   * The nodes children indexes
   *
   * **IMPORTANT**
   *
   * It's important to not that values here are only
   * applied to token that accept accept child tags, eg: `{% else %}`
   */
  children?: number[] = [];

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
  objects?: object = {};

  /**
   * An object containing attribute values.
   *
   *  @todo IMPROVE THIS LOGIC
   */
  attributes?: object = {};

  /**
   * Filters this tag contains. Each property contained on the
   * object is an offset location, its value is the name of the filter.
   *
   * @todo IMPROVE THIS LOGIC
   */
  filters?: object = {};

  /**
   * The starting offset location of the node
   */
  get start (): number {
    return this.offsets[0];
  }

  /**
   * The ending offset location of the node
   */
  get end (): number {
    return this.offsets[this.offsets.length - 1];
  }

  /**
   * Returns the inner contents of the node when it is an
   * syntactic pair type, else returns a boolean false value.
   */
  get content (): string {
    return Document.AST.getText(
      Document.AST.toRange(this.offsets[1], this.offsets[2])
    );
  }

  /**
   * Returns any parse errors/diagnositcs which might exists
   * for this node. If none exist, any empty error will be returned.
   */
  public getErrors (): Array<Parser.Diagnostic> {
    if (this.error === 0) return Document.AST.errors;

    const next = Document.AST.nodes[this.index + 1];
    if (!next) return [];

    return Document.AST.errors.slice(this.error, next.error);
  }

  /**
   * Returns the root node of this node. If no root node exists
   * then the node is returned.
   */
  public getRoot (): INode {
    return Document.AST.nodes[this.root];
  }

  /**
   * Returns the parent node of this node. If no root node exists
   * then the node is returned.
   */
  public getParent (): INode {
    return Document.AST.nodes[this.parent];
  }

  /**
   * Returns node context which contains character by character
   * parsed data about the nodes inner contents.
   */
  public getContext (): Parser.Context[][] {
    return Context.get(this.context);
  }

  /**
   * Returns a Text Document instance for embedded language
   * type nodes, else returns boolean false.
   */
  public document (): TextDocument {
    if (this.language === 'liquid') return null;
    if (this.content.length === 0) return null;

    return TextDocument.create(
      Document.textDocument.uri.replace('.liquid', `.${this.language}`),
      this.language,
      Document.textDocument.version,
      this.content
    );
  }

}
