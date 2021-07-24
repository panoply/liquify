import { Node, NodeType } from 'tree/nodes';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { document } from 'tree/model';
import { NodeLanguage } from 'lexical/language';
import { customChanges } from 'parser/utils';
import inRange from 'lodash.inrange';

export class Embed extends Node {

  constructor ({ start, parent, kind, tag, type }: Node) {
    super(NodeType.Embed, start, parent, kind);
    this.tag = tag;
    this.type = type;
    this.parent.children.pop();
  }

  /**
   * The index reference of the embedded region on `AST.regions[]`
   */
  public regionIndex: number

  /**
   * The line offset number of the embedded region. This points to
   * the start range line number and used to align features in LSP.
   */
  public regionOffset: number

  /**
   * Embedded Language ID. This value excludes `HTML` and `Liquid` and
   * used to identify the language
   */
  public languageId: Exclude<NodeLanguage, NodeLanguage.liquid | NodeLanguage.html>;

  /**
   * The TextDocument literal reference. This value is passed to Language
   * service within LSP.
   */
  public textDocument: TextDocument

  /**
   * Region
   *
   * Typically generated on the first parse. Creates an embedded document
   * region TextDocument. The embed is stored on the AST `embedded` array
   * and a reference to its index is asserts on the node.
   */
  public region (index: number) {

    const region: Embed = document.regions?.[index];

    if (region) {

      if (
        region.regionIndex === index &&
        region.languageId === this.languageId &&
        region.tag === this.tag &&
        region.kind === this.kind
      ) return this.update(region.textDocument, index);

      document.regions.splice(index);

    }

    return this.create(index);

  };

  /**
   * Create
   *
   * Typically generated on the first parse. Creates an embedded document
   * region TextDocument. The embed is stored on the AST `embedded` array
   * and a reference to its index is asserts on the node.
   */
  private create (index: number) {

    this.regionIndex = index;
    this.regionOffset = this.range.start.line;
    this.textDocument = TextDocument.create(
      this.tag + '.' + this.languageId,
      this.languageId, 1,
      this.innerContent
    );

    return document.regions.push(this);
  }

  /**
   * Update
   *
   * Updates an embedded region text document. The inner contents
   * of the embeds will remain untouched, retaining a their versions
   * unless adjustments are detected within the nodes.
   */
  private update (textDocument: TextDocument, index: number) {

    this.regionIndex = index;
    this.regionOffset = this.range.start.line;

    if (!inRange(document.cursor, this.offsets[1], this.offsets[2])) {
      this.textDocument = textDocument;
    } else {

      // update the embedded region
      this.textDocument = TextDocument.update(
        textDocument,
        customChanges(this.innerContent, textDocument),
        textDocument.version + 1
      );
    }

    document.regions.splice(index, 1, this);

    return index + 1;

  }

}
