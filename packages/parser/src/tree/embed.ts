import { Node, NodeType } from 'tree/nodes';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { document } from 'tree/model';
import { NodeLanguage } from 'lexical/language';
import { customChanges } from 'parser/utils';

// TODO
//
// CURRENT NEW VIRTUAL DOCUMENTS ARE RE-CREATED WHEN REGIONS
// ARE REMOVED OR NEW REGIONS ARE CREATED - NEED TO WORK ON
// THE ALGORITHM TO UPDATE THESE NODES IN AN INCREMENTAL MANNER
// AND PREVENT RE-CREATION OCCURING

export class Embed extends Node {

  public regionIndex: number
  public languageId: Exclude<NodeLanguage, NodeLanguage.liquid | NodeLanguage.html>;
  public textDocument: TextDocument

  constructor ({ start, parent, kind, tag, type }: Node) {

    super(NodeType.Embed, start, parent, kind);

    this.tag = tag;
    this.type = type;
    this.parent.children.pop();

  }

  /**
   * Region
   *
   * Typically generated on the first parse. Creates an embedded document
   * region TextDocument. The embed is stored on the AST `embedded` array
   * and a reference to its index is asserts on the node.
   */
  public region (index: number) {

    const uri = `${index}-${this.tag}.${this.languageId}`;
    const region: Embed = document.regions?.[index];

    if (region) {
      if (
        region.regionIndex === index &&
        region.languageId === this.languageId &&
        region.tag === this.tag &&
        region.kind === this.kind
      ) return this.update(region.textDocument, index); else {
        document.regions.splice(index);
      }

    }

    return this.create(uri, index);

  };

  /**
   * Create
   *
   * Typically generated on the first parse. Creates an embedded document
   * region TextDocument. The embed is stored on the AST `embedded` array
   * and a reference to its index is asserts on the node.
   */
  private create (uri: string, index: number) {

    this.regionIndex = index;
    this.textDocument = TextDocument.create(uri, this.languageId, 1, this.innerContent);
    document.regions.push(this);

    return index + 1;
  }

  /**
   * Update
   *
   * Updates an embedded region text document. The inner contents
   * of the embeds will remain untouched, retaining a their versions
   * unless adjustments are detected within the nodes.
   */
  private update (textDocument: TextDocument, index: number) {

    const changes = customChanges(this.innerContent, textDocument);
    const version = textDocument.version + 1;
    this.textDocument = TextDocument.update(textDocument, changes, version);
    this.regionIndex = index;
    document.regions.splice(index, 1, this);

    return index + 1;

  }

}
