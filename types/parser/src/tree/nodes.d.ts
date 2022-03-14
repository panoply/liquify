import { Range } from 'vscode-languageserver-textdocument';
import { NodeKind } from '../lexical/kind';
import { NodeLanguage } from '../lexical/language';
import { NodeType, INode } from './typings';
import { Type } from '../types/export';
export { NodeType, Token, IScopes } from './typings';
/**
 * AST Node
 *
 * Creates token nodes on the AST
 */
export declare class Node implements INode {
    kind: NodeKind;
    offsets: [number?, number?, number?, number?];
    attributes?: object;
    filters?: object;
    type: Type | NodeType;
    languageId?: NodeLanguage;
    tag: string;
    root: number;
    index: number;
    parent: Node;
    children: Node[];
    objects?: {};
    scope: {};
    singular: boolean;
    lastError: number;
    errors: number[];
    constructor(type?: NodeType, start?: number, parent?: Node, kind?: NodeKind);
    /**
     * Returns the starting offset index of this node
     */
    get start(): number;
    /**
     * Returns the start token as a string
     */
    get startToken(): string;
    /**
     * Returns the ending offset index of this node
     */
    get end(): number;
    /**
     * Returns the end token as a string
     */
    get endToken(): string;
    /**
     * Returns inner contents of the node as string
     */
    get innerContent(): string;
    /**
     * The start and end Range position of the node.
     */
    get range(): Range;
    /**
     * Returns the previous sibling immediately preceding this node.
     * If the previous node is the fist child of this parent then
     * `null` is returned.
     */
    get prevSibling(): Node | null;
    /**
     * Returns the next sibling immediately following this node.
     * If the next node is the last child of this parent then
     * `null` is returned.
     */
    get nextSibling(): Node | null;
    /**
     * Returns the first child in this nodes tree. Returns `null`
     * if the node has no children or is a void/singular type.
     */
    get firstChild(): Node | undefined;
    /**
     * Returns the previous child in the node tree. When only 1 child
     * exists within the tree the parent is returned, else we return
     * the previous child
     */
    get prevChild(): Node;
    /**
     * Returns the last child in this nodes tree. Returns `null`
     * if the node has no children or is a void/singular type.
     */
    get lastChild(): Node | undefined;
    /**
     * Returns the last word from the current cursor position.
     * If no word is found, returns
     */
    get lastWord(): string;
    /**
     * Validates a node tag and kind. This is used by the parser
     * to detect parent nodes.
     */
    isSameNode(tag: string, kind: NodeKind): boolean;
    /**
     * Returns node at the provided offset location.
     * Use the AST `getNodeAt()` method to convert from
     * a position to offset and return this method.
     *
     * - Lifted from vscode-html-languageservice
     */
    getNodeAt(offset: number): Node;
}
