import { TextDocument } from 'vscode-languageserver-textdocument';
import { Node } from './nodes';
import { NodeLanguage } from '../lexical/language';
export declare class Embed extends Node {
    constructor({ start, parent, kind, tag, type }: Node);
    regionLiteral: TextDocument;
    /**
     * The index reference of the embedded region on `AST.regions[]`
     */
    regionIndex: number;
    /**
     * The line offset number of the embedded region. This points to
     * the start range line number and used to align features in LSP.
     */
    regionOffset: number;
    /**
     * Embedded Language ID. This value excludes `HTML` and `Liquid` and
     * used to identify the language
     */
    languageId: Exclude<NodeLanguage, NodeLanguage.liquid | NodeLanguage.html>;
    /**
     * The TextDocument literal reference. This value is passed to Language
     * service within LSP.
     */
    textDocument: TextDocument;
    /**
     * Region
     *
     * Typically generated on the first parse. Creates an embedded document
     * region TextDocument. The embed is stored on the AST `embedded` array
     * and a reference to its index is asserts on the node.
     */
    region(index: number, literal: TextDocument): number;
    compatible(): TextDocument;
    /**
     * Create
     *
     * Typically generated on the first parse. Creates an embedded document
     * region TextDocument. The embed is stored on the AST `embedded` array
     * and a reference to its index is asserts on the node.
     */
    private create;
    /**
     * Update
     *
     * Updates an embedded region text document. The inner contents
     * of the embeds will remain untouched, retaining a their versions
     * unless adjustments are detected within the nodes.
     */
    private update;
}
