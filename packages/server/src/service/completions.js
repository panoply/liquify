import _ from 'lodash'
import { CompletionItemKind, InsertTextFormat } from 'vscode-languageserver'
import { Parser } from 'provide/parser'

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

export async function getObjectCompletion (ASTnode, offset) {

  const record = ASTnode.objects[offset]

  if (!record) return false

  const properties = Parser.spec.objects[record]

  return Object.entries(properties).map(([ name, { description } ]) => ({
    name,
    description
  }))

  return (function walk (objects, props) {

    const prop = props.find(({ name }) => name === objects[0])

    return objects.length > 1
      ? walk(objects.slice(1), prop.properties)
      : prop?.properties || false

  }(record, properties))

}

/**
 * Get Trigger Completion
 *
 * @export
 * @param {import("vscode-languageserver").TextDocument}textDocument
 * @param {import("vscode-languageserver").Position} position
 * @returns
 */
export function getTriggerCompletion (textDocument, position) {

  const type = textDocument.getText({
    start: {
      line: position.line,
      character: position.character - 3
    },
    end: {
      line: position.line,
      character: position.character + 3
    }
  })

  console.log(type)

  if (/{%\s*%}/.test(type)) {

    const props = Object.entries(Parser.spec.tags).map(([
      prop,
      {
        description,
        snippet = false
      }
    ]) => ({
      name: prop,
      description,
      snippet
    }))

    return props

  }

  if (/{{-?\s*-?}}/.test(type)) {

    const props = Object.entries(Parser.spec).map(([
      prop,
      { type, description }
    ]) => type === 'object' && { name: prop, description }).filter(Boolean)

    return props

  } else if (/{%\s*%}/.test(type)) {

    const props = Object.entries(Parser.spec.tags).map(([
      prop,
      {
        description,
        snippet = false
      }
    ]) => ({
      name: prop,
      description,
      snippet
    }))

    return props

  }

}
