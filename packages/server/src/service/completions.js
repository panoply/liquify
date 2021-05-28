import isArray from 'lodash/isArray'
import { CompletionItemKind, InsertTextFormat, TextEdit } from 'vscode-languageserver'
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
 */
export function setCompletionItems (
  [
    name,
    {
      description,
      snippet = name
    }
  ]
) {

  return {
    label: name,
    kind: CompletionItemKind.Property,
    insertText: snippet,
    insertTextFormat: InsertTextFormat.Snippet,
    documentation: description,
    data: { snippet }
  }

}

/**
 * Get Object Completion
 *
 * Gets completion items for Liquid objects. The
 * AST applies an `objects` property to its record where its keys are the
 * offset index numbers and property value ear either string of array types.
 *
 * @export
 * @param {Parser.ASTNode} ASTNode
 * @param {number} offset
 */

export async function getObjectCompletion (ASTNode, offset) {

  const record = ASTNode.objects[offset]

  if (!record) return false

  if (isArray(record) && record.length === 1) {
    const { properties } = Parser.spec.objects[record[0]]
    return Object.entries(properties)
  }

  if (typeof record === 'number') {

    const objects = ASTNode.objects[record]

    return (function walk (prop, spec) {

      const object = spec?.[prop[0]]?.properties

      return prop.length > 1
        ? object && walk(prop.slice(1), object)
        : object
          ? Object.entries(object)
          : false

    }(objects.slice(1), Parser.spec.objects[objects[0]].properties))

  }

}

/**
 * Get Trigger Completion
 *
 * @export
 * @param {Parser.ASTNode|undefined} ASTNode
 * @param {Parser.Scope} document
 * @param {LSP.Position} position
 * @param {LSP.CompletionContext} context
 * @returns
 */
export function getTriggerCompletion (ASTNode, document, position, context) {

  const type = document.textDocument.getText({
    start: {
      line: position.line,
      character: position.character - 4
    },
    end: {
      line: position.line,
      character: position.character + 1
    }
  })

  if (/\|\s*/.test(type.slice(1))) {

    return Object.entries(Parser.spec.filters).map((
      [
        label,
        {
          description,
          snippet = label + ' $0'
        }
      ]
    ) => (
      {
        label,
        kind: CompletionItemKind.Keyword,
        insertText: snippet,
        insertTextFormat: InsertTextFormat.Snippet,
        documentation: description,
        data: {
          snippet
        }
      }
    ))

  }

  if (/{{\s*/.test(type)) {

    return Object.entries(Parser.spec.objects).map((
      [
        label,
        {
          description
        }
      ]
    ) => (
      {
        label,
        kind: CompletionItemKind.Keyword,
        documentation: description
      }
    ))

  }

  if (/{%\s*/.test(type)) {

    return Object.entries(Parser.spec.tags).map((
      [
        label,
        {
          description
        }
      ]
    ) => (
      {
        label,
        kind: CompletionItemKind.Keyword,
        documentation: description
      }
    ))
  }
}
