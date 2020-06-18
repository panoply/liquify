import { FullTextDocument } from '../parser/manager'
// import { mergeSort, getWellformedEdit } from '../parser/utils'

export default (() => {

  /**
   * Creates a new text document.
   *
   * @param {string} uri The document's uri.
   * @param {string} languageId  The document's language Id.
   * @param {number} version The document's initial version number.
   * @param {string} text The document's content.
   */
  function create (uri, languageId, version, text) {

    return new FullTextDocument(uri, languageId, version, text)

  }

  /**
   * Updates a TextDocument by modifing its content.
   *
   * @param {object} document the document to update.
   * @param changes the changes to apply to the document.
   * @returns The updated document instance passed in as first parameter.
   *
   */
  function update (document, changes, version) {

    if (document instanceof FullTextDocument) {
      document.update(changes, version)
      return document
    }

    throw new Error('TextDocument.update: document must be created by TextDocument.create')

  }

  function applyEdits (document, edits) {

    const spans = []
    const text = document.getText()
    const sortedEdits = mergeSort(edits.map(getWellformedEdit), (
      begin
      , end
      , diff = begin.range.start.line - begin.range.start.line
    ) => diff === 0 ? end.range.start.character - end.range.start.character : diff)

    let modified = 0

    for (const { range, newText } of sortedEdits) {

      const start = document.offsetAt(range.start)

      if (start < modified) throw new Error('Overlapping edit')
      if (start > modified) spans.push(text.substring(modified, start))
      if (newText.length) spans.push(newText)

      modified = document.offsetAt(range.end)

    }

    spans.push(text.substr(modified))
    return spans.join('')

  }

  return {
    create
    , update
    , applyEdits
  }

})()
