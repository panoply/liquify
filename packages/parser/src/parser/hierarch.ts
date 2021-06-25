import { INode } from 'tree/nodes';
import { document } from 'tree/model';

/**
 * The Pair cache model array. Tracks nodes
 * which require start and end tags so we can
 * correctly populate the AST.
 */
export const pairs: INode[] = [];

export let parent: INode;

/**
 * By default this will returns the last node on the pair array.
 * If a negative number passed it will decrement starting from
 * last node in array, if any number higher than zero is passed
 * it will return a node at that index.
 */
export function GetParent (from: number = -1): INode {

  return from >= 0 ? pairs[from] : pairs[pairs.length + from];
}

/**
 * Sets the current heirarch parent
 */
export function SetParent (node: INode) {

  parent = node;
}

/**
 * Adds node to the root hierarch
 */
export function AddRootChild (node: INode) {

  node.index = document.root.children.length;
  document.root.children.push(node);
}

/**
 * Adds node to parental hierarch
 */
export function AddParentChild (node: INode) {

  if (pairs.length === 0) return AddRootChild(node);

  node.index = parent.children.length;
  parent.children.push(node);
}

/**
 * Adds node to either pair hierarch or root
 */
export function AddNodeChild (node: INode) {

  const size = pairs.length;
  const prev = GetParent(size - 2);

  if (size > 1) {
    node.index = prev.children.length;
    prev.children.push(pairs.pop());
    return pairs[size - 1];
  } else {
    return AddRootChild(node);
  }
}
