import { TextEdit, CompletionItem } from 'vscode-languageserver';
import {
  Position,
  Characters as c
} from '@liquify/liquid-parser';

/* -------------------------------------------- */
/* LOCAL SCOPES                                 */
/* -------------------------------------------- */

export let textEdits: TextEdit[];

/* -------------------------------------------- */
/* EXPORT FUNCTIONS                             */
/* -------------------------------------------- */

export function TagEdits (position: Position, trigger: number): TextEdit[] {

  position.character -= trigger === c.WSP ? 3 : 1;

  return [ TextEdit.insert(position, String.fromCharCode(c.LCB)) ];

}

export function OutputEdits (position: Position, trigger: number): TextEdit[] {

  position.character -= trigger === c.WSP ? 3 : 1;

  return [ TextEdit.insert(position, String.fromCharCode(c.LCB)) ];

}
