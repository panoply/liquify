import { TextDocument } from 'vscode-languageserver-textdocument';
// import { TextDocumentContentChangeEvent } from 'vscode-languageserver-protocol';
// import { TextEdit } from 'vscode-languageserver';
import inRange from 'lodash.inrange';
import { AST } from './ast';
import { Node } from './nodes';
import { NodeLanguage, NodeType } from '../lexical';
import { customChanges } from '../parser/utils';

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
  public regionIndex: number;

  /**
   * The line offset number of the embedded region. This points to
   * the start range line number and used to align features in LSP.
   */
  public regionOffset: number;

  /**
   * Embedded Language ID. This value excludes `HTML` and `Liquid` and
   * used to identify the language
   */
  declare public languageId: Exclude<NodeLanguage, NodeLanguage.liquid | NodeLanguage.html>;

  /**
   * The TextDocument literal reference. This value is passed to Language
   * service within LSP.
   */
  public textDocument: TextDocument;

  /**
   * Region
   *
   * Typically generated on the first parse. Creates an embedded document
   * region TextDocument. The embed is stored on the AST `embedded` array
   * and a reference to its index is added on the node.
   */
  public region (index: number, literal: TextDocument) {

    const region: Embed = AST.document.regions?.[index];

    if (region) {

      if (
        region.regionIndex === index &&
        region.languageId === this.languageId &&
        region.tag === this.tag &&
        region.kind === this.kind
      ) return this.update(region.textDocument, index, literal);

      AST.document.regions.splice(index, 1);

    }

    return this.create(index, literal);

  };

  /**
   * Parses the inner contents of the node and returns a workable
   * strucuture for usage in the Language Server. Typically used
   * for `{% schema %}` and `---` YAML Frontmatter regions.
   */
  public parse<T> (): T {

    const content = this.textDocument.getText();
    const parse = JSON.parse(content);

    return parse;

  }

  public compatible () {

    // console.log(this.textDocument);

    return this.textDocument;

  }

  /**
   * Create
   *
   * Typically generated on the first parse. Creates an embedded document
   * region TextDocument. The embed is stored on the AST `embedded` array
   * and a reference to its index is asserts on the node.
   */
  private create (index: number, literal: TextDocument) {

    this.regionIndex = index;
    this.regionOffset = this.range.start.line;
    this.textDocument = TextDocument.create(
      this.tag + '.' + this.languageId,
      this.languageId, 1,
      literal.getText({
        start: literal.positionAt(this.offsets[1]),
        end: literal.positionAt(this.offsets[2])
      })
    );

    return AST.document.regions.push(this) - 1;
  }

  /**
   * Update
   *
   * Updates an embedded region text document. The inner contents
   * of the embeds will remain untouched, retaining a their versions
   * unless adjustments are detected within the nodes.
   */
  private update (textDocument: TextDocument, index: number, literal: TextDocument) {

    this.regionIndex = index;
    this.regionOffset = this.range.start.line;

    if (!inRange(AST.document.cursor, this.offsets[1], this.offsets[2])) {
      this.textDocument = textDocument;
    } else {

      const region = literal.getText({
        start: literal.positionAt(this.offsets[1]),
        end: literal.positionAt(this.offsets[2])
      });

      const changes = customChanges(region, textDocument);

      // update the embedded region
      this.textDocument = TextDocument.update(textDocument, changes, textDocument.version + 1);
    }

    AST.document.regions.splice(index, 1, this);

    return index + 1;

  }

}
