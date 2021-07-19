import { IAST, Position, Characters } from '@liquify/liquid-parser';
import { TextEdit } from 'vscode-languageserver';

/* -------------------------------------------- */
/* LOCAL CONSTANTS                              */
/* -------------------------------------------- */

const LCB = '{';

/* -------------------------------------------- */
/* EXPORT FUNCTIONS                             */
/* -------------------------------------------- */

export function getTagsEdits (
  document: IAST,
  position: Position,
  offset: number,
  trigger: number
): TextEdit[] {

  const additionalTextEdits = [];

  if (!document.isPrevCodeChar(Characters.LCB, offset)) {
    position.character -= trigger === Characters.WSP ? 3 : 1;
    return [ TextEdit.insert(position, LCB) ];
  }

  return additionalTextEdits;

}
