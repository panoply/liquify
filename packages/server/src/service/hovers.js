/* ---------------------------------------------------------------- */
/* PRIVATE                                                          */
/* ---------------------------------------------------------------- */

/**
 * Returns the current line text
 *
 * @export
 * @param {LSP.TextDocument} textDocument
 * @param {LSP.Position} position
 * @returns {{ content: string, character: number }}
 */
function getLine (textDocument, position) {

  const start = { line: position.line, character: 0 }
  const character = textDocument.offsetAt(position) - textDocument.offsetAt(start)
  const content = textDocument.getText({
    start,
    end: {
      line: position.line + 1,
      character: 0
    }
  })

  return { content, character }

}

/* ---------------------------------------------------------------- */
/* PUBLIC                                                           */
/* ---------------------------------------------------------------- */

/**
 * Returns the word in range
 *
 * @todo Rethink how to capture words as `indexOf` and `lastIndexOf` are
 * captures whitespace only. `\n\r\t` all need to be considered but
 * would like to do this without parsing and reference using regex.
 *
 * @export
 * @param {Parser.AST} document
 * @param {LSP.Position} position
 * @returns {string}
 */
export function getWordAtPosition (document, position) {

  const lineRange = document.toLineRange(position)
  const getText = document.getText(lineRange)
  const character = document.offsetAt(position) - document.offsetAt(lineRange.start)
  const first = getText.lastIndexOf(' ', character)
  const last = getText.indexOf(' ', character)
  const word = getText.substring(
    first !== -1 ? first : 0,
    last !== -1 ? last : getText.length - 1
  ).match(/[^\W]+/)

  if (word !== null) return word[0]

  return null

}
