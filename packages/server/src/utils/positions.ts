/**
 * Subtract from Character within position
 *
 * @param {number} offset
 * @param {LSP.Position} position
 * @returns
 */
export const PosCharSubtract = (offset, { character, line }) => (
  {
    character: character - offset,
    line
  }
);

/**
 * Add to Character within position
 *
 * @param {number} offset
 * @param {LSP.Position} position
 * @returns
 */
export const PosCharAdd = (offset, { character, line }) => (
  {
    character: character + offset,
    line
  }
);

/**
 * Add to line within position
 *
 * @param {number} increment
 * @param {LSP.Position} position
 * @returns
 */
export const PosLineAdd = (increment, { character, line }) => (
  {
    character,
    line: line + increment
  }
);

/**
 * Subtract from line within position
 *
 * @param {number} increment
 * @param {LSP.Position} position
 * @returns
 */
export const PosLineSubtract = (increment, { character, line }) => (
  {
    character,
    line: line - increment
  }
);
