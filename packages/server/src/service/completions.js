import _ from 'lodash'
import { CompletionItemKind, InsertTextFormat } from 'vscode-languageserver'
import { Server } from '../export'

/**
 * Completion Functions
 *
 * Auto completions features are applied according to a series of trigger
 * characters. Completions will extract words and/or symbols from the
 * passed in location of the document and from here reference records from
 * the variation specification.
 *
 * @typedef {import("vscode-languageserver").TextDocument} TextDocument
 * @typedef {import('defs').ASTEmbeddedRegion} ASTEmbeddedRegion
 * @typedef {import('vscode-languageserver').TextEdit} TextEdit
 */

/* ---------------------------------------------------------------- */
/* PUBLIC                                                           */
/* ---------------------------------------------------------------- */

/**
 * Set Completion Items
 *
 * Sets the completion items that are passed to the completion resolver.
 * Extracts necessary values from the passed in specification record.
 *
 * @export
 * @param {import('defs').Specification} specification
 */
export function setCompletionItems (specification) {

  const { name, snippet, description } = specification

  return ({
    label: name,
    kind: CompletionItemKind.Property,
    insertText: snippet,
    insertTextFormat: InsertTextFormat.Snippet,
    documentation: description,
    data: {
      snippet: snippet
    }
  })

}

/**
 * Get Object Completion
 *
 * Gets completion items for Liquid objects. The
 * AST applies an `objects` property to its record where its keys are the
 * offset index numbers and property value ear either string of array types.
 *
 * @export
 * @param {import('defs').AST} ASTnode
 * @param {number} offset
 * @returns {array|false}
 */
export function getObjectCompletion ({ ast }, offset) {

  console.log(ast)
  if (!ast?.objects) return false

  const prop = ast.objects[offset]

  if (prop.length === 1) return Server.specification[prop[0]].properties

  let objects = Server.specification[prop[0]]

  for (const nameProp of prop.slice(1)) {
    if (objects?.properties) {
      objects = objects.properties.filter(({ name }) => name === nameProp)
    } else {
      for (const deepProp of objects) {
        (deepProp?.properties) && (objects = deepProp.properties)
      }
    }
  }

  // If last property exists in record we will return `false`
  return !_.some(objects, { name: prop[prop.length - 2] }) ? objects : false

}

/**
 * Get Trigger Completion
 *
 * @export
 * @param {import("vscode-languageserver").TextDocument} document
 * @param {import("vscode-languageserver").Position} position
 * @returns
 */
export function getTiggerCompletion (document, position) {

  const type = document.getText({
    start: {
      line: position.line,
      character: position.character - 3
    },
    end: {
      line: position.line,
      character: position.character + 3
    }
  })

  if (/{{\s*}}/.test(type)) {

    const props = Object.entries(Server.specification).map(([
      prop,
      { type, description }
    ]) => type === 'object' && { name: prop, description }).filter(Boolean)

    return props

  } else if (/{%\s*%}/.test(type)) {

    const props = Object.entries(Server.specification).map(([
      prop,
      { type, description, snippet = false }
    ]) => (type !== 'object' && type !== 'filter') && {
      name: prop,
      description,
      snippet
    }).filter(Boolean)

    return props

  }

}
