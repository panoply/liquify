import { TextDocument, Range } from 'vscode-languageserver-textdocument';
import { NodeKind } from 'lexical/kind';
import { NodeType } from 'lexical/types';
import { NodeLanguage } from 'lexical/language';
import * as context from 'tree/context';
import { document } from 'tree/model';

/**
 * AST Node
 *
 * Creates token nodes on the AST
 */
export class INode {

  /**
   * The name of the node
   */
  public name: string = null;

  /**
   * The root node index position on the AST. It informs of
   * the parent index. If this is equal with `index` the node
   * is not a child of nested within a pair.
   */
  public root: number = null;

  /**
   * The parent node index position on the AST. The parent index
   * is the tag which is encapsulating the node.
   */
  public parent: number = null;

  /**
   * The index position of the node located on the AST.
   */
  public index: number = 0;

  /**
   * The node type value, which is used to distinguish its
   * functionality and use, as described in Node Types.
   */
  public type = NodeType.unknown;

  /**
   * Whether or not the node is a singular type node, ie:
   * is not syntactic.
   */
  public singular: boolean = true;

  /**
   * The embedded index
   */
  public embed: number = NaN;

  /**
   * The offsets location. This contains a list of offsets,
   * starting from the open location of the node and finishing at
   * the closing location of the node. When this node is a
   * syntactic pair, it will contain `4` entries, the first `2`
   * are the starting node and the last `2` are the ending node.
   */
  offsets: [number?, number?, number?, number?] = [];

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
  errors: number[] = [];

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
  attributes?: object ={};

  /**
   * Filters this tag contains. Each property contained on the
   * object is an offset location, its value is the name of the filter.
   *
   * @todo IMPROVE THIS LOGIC
   */
  filters?: object = {};

  /**
   * The start and end Range position of the node.
   */
  get range (): Range {

    return document.getRange(this.start, this.end);

  };

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

    return document.getText(
      this.offsets[1],
      this.offsets[2]
    );
  }

  /**
   * Returns the root node of this node. If no root node exists
   * then the node is returned.
   */
  public getRoot (): INode {

    return document.nodes[this.root];
  }

  /**
   * Returns the parent node of this node. If no root node exists
   * then the node is returned.
   */
  public getParent (): INode {

    return document.nodes[this.parent];
  }

  /**
   * Returns node context which contains character by character
   * parsed data about the nodes inner contents.
   */
  public getContext (): [context.IContext][] {

    return context.get(this.context);
  }

  /**
   * Returns a Text Document instance for embedded language
   * type nodes, else returns boolean false.
   */
  public getDocument (ext?: '.html' | '.css' | '.js'): TextDocument {

    if (this.language === 'liquid' || this.content.length === 0) return null;

    return TextDocument.create(
     `${this.name}-${this.index}.${this.language}${ext || ''}`,
     this.language,
     document.version,
     this.content
    );

  }

};
