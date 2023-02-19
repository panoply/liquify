import esthetic from 'esthetic';
import { Formatting } from 'types/server';
import { IAST, TextDocument } from '@liquify/liquid-parser';
import { TextEdit } from 'vscode-languageserver';

/**
 * Linting
 *
 * Proccesses fixable lints. Code errors or warnings that are fixable
 * are stored on the AST property `linting[]` as a list of `TextEdits[]`
 * We process all lintable formats before passing to prettydiff for
 * beautification so as to prevent any overlapping edits to occur.
 *
 * This function will return a a document literal.
 */
export function linting (document: IAST): string {

  const literal = document.literal();
  const content = TextDocument.applyEdits(literal, document.linting);

  document.linting = [];

  return content;

}

/* -------------------------------------------- */
/* EXPORT FUNCTIONS                             */
/* -------------------------------------------- */

/**
 * Markup
 *
 * When a document contains no embedded regions, we process
 * a markup beautification. This function is different from
 * `regions()` in the sense that no regions exists and only HTML
 * and Liquid syntaxes are detected.
 */
export async function markup (document: IAST, options: Formatting): Promise<TextEdit[]> {

  const source = document.literal().getText();
  const range = document.getRange(0, source.length);

  try {

    const newText = await esthetic.format(source, {
      language: 'liquid'
    });

    return [
      // TextEdit.replace(range, linting(document)),
      TextEdit.replace(range, newText)
    ];

  } catch (e) {

    throw new Error(e);
  }
};
