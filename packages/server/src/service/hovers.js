/* ---------------------------------------------------------------- */
/* PRIVATE                                                          */
/* ---------------------------------------------------------------- */

/**
 * Returns the current line text
 *
 * @export
 * @param document { import("vscode-languageserver").TextDocument }
 * @param position { import("vscode-languageserver").Position }
 * @returns {{ content: string, character: number }}
 */
function getLine (document, position) {

  const start = { line: position.line, character: 0 }
  const character = document.offsetAt(position) - document.offsetAt(start)
  const content = document.getText({
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
 * @param {import("vscode-languageserver").TextDocument} document
 * @param {import("vscode-languageserver").Position} position
 * @returns {string}
 */
export function getWordAtPosition (document, position) {

  const { content, character } = getLine(document, position)
  const first = content.lastIndexOf(' ', character)
  const last = content.indexOf(' ', character)

  return content.substring(
    first !== -1 ? first : 0,
    last !== -1 ? last : content.length - 1
  ).trim()

}
