import isArray from 'lodash/isArray'
import { CompletionItemKind, InsertTextFormat, TextEdit } from 'vscode-languageserver'
import { Spec, Parser } from 'provide/parser'
import { PosCharSubtract } from 'utils/positions'
import { CompletionState } from 'enums/completions'
import { Characters } from '@liquify/liquid-parser'

export function getTags (position, offset, trigger) {

  const additionalTextEdits = []

  if (!Parser.isPrevCodeChar(Characters.LCB, offset)) {
    additionalTextEdits.push(
      TextEdit.insert(
        PosCharSubtract(trigger === Characters.WSP ? 2 : 1, position),
        String.fromCharCode(Characters.LCB)
      )
    )
  }

  return Spec.entries.tags.map(
    ([
      label,
      {
        description,
        singular,
        snippet = '$1'
      }
    ]) => {

      snippet = ` ${label} ${snippet} %} ${singular ? '$0' : `$0 {% end${label} %}`}`

      return ({
        label,
        additionalTextEdits,
        kind: CompletionItemKind.Keyword,
        insertText: snippet,
        insertTextFormat: InsertTextFormat.Snippet,
        documentation: description,
        data: { snippet }
      })
    }
  )
}

/**
 * Get Object Completion
 *
 * Gets completion items for Liquid objects. The
 * AST applies an `objects` property to its record where its keys are the
 * offset index numbers and property value ear either string of array types.
 *
 */
export function getOutputs (position, offset, trigger) {

  const additionalTextEdits = []

  if (!Parser.isPrevCodeChar(Characters.LCB, offset)) {
    additionalTextEdits.push(
      TextEdit.insert(
        PosCharSubtract(trigger === Characters.WSP ? 2 : 1, position),
        String.fromCharCode(Characters.LCB)
      )
    )
  }
  return Spec.entries.objects.map((
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
      insertText: ` ${label}$1 }} $0`,
      insertTextFormat: InsertTextFormat.Snippet,
      documentation: description,
      additionalTextEdits
    }
  ))
}

/**
 * Completion Functions
 *
 * Auto completions features are applied according to a series of trigger
 * characters. Completions will extract words and/or symbols from the
 * passed in location of the document and from here reference records from
 * the variation specification.
 *
 * @export
 * @param {Parser.IAST} document
 * @param {LSP.Position} position
 * @param {number} trigger
 * @return {*}
 */
export function inToken (document, position, trigger) {

  let state

  console.log(document.getNodeContext().context)

  if (state !== CompletionState.Reset) {

    // If completion character is whitespace we will
    // check for the previous trigger character
    if (trigger === Characters.WSP) {

      // We will persist the completions open when next character
      // When previous trigger matches these characters
      // We reset state if any matches occurred
      switch (state) {
        case CompletionState.TagDelimiter:

          state = CompletionState.Reset
          return getTagCompletions(position)

        case CompletionState.OutputDelimiter:

          state = CompletionState.Reset
          return getOutputCompletions(position)

        case CompletionState.FilterPipe:

          state = CompletionState.Reset
          return getFilterCompletions(position)
      }

    }
  }

  // Determine whether we are within a token
  // This prevents completions executing within tags that should otherwise not
  const ASTNode = Parser.getNode(document.ast, position)

  if (!ASTNode) {
    switch (trigger) {
      case Characters.PER:
        state = CompletionState.TagDelimiter
        return getTagCompletions(position)
      case Characters.LCB:
        state = CompletionState.OutputDelimiter
        return getOutputCompletions(position)
    }
  }

  switch (trigger) {
    case Characters.PIP:

      state = CompletionState.FilterPipe
      return getFilterCompletions(position)

    case Characters.DOT:
      state = CompletionState.FilterPipe
      return getObjectCompletion(document, position)

    case Characters.DQO:
    case Characters.SQO:
      break

  }

}

export async function inEmbedded (document, mode, position) {

  const ASTNode = Parser.node

  if (mode?.[ASTNode.language]) {

    const embed = await mode[ASTNode.language].doComplete(ASTNode, position)
    embed.data = { language: ASTNode.language }

    return embed

  }

  return null

}

export async function findCompleteItems (document, mode, position) {

  console.log(document)

  return null

}

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
 * Generate Tag Type Completions
 *
 * @export
 * @param {LSP.Position} position
 * @returns {LSP.CompletionItem[]}
 */
export function getTagCompletions (position) {

  const additionalTextEdits = []
  const prevCharacter = PosCharSubtract(2, position)

  if (!Parser.isCodeChar(Characters.LCB, prevCharacter)) {
    additionalTextEdits.push(
      TextEdit.insert(
        PosCharSubtract(1, position)
        , '{'
      )
    )
  }

  return Object.entries(Parser.spec.tags).map((
    [
      label,
      {
        description,
        singular,
        snippet = ` ${label} $1 %} ${singular
          ? '$0'
          : `$0 {% end${label} %}`}`
      }
    ]
  ) => (
    {
      label,
      additionalTextEdits,
      kind: CompletionItemKind.Keyword,
      insertText: snippet,
      insertTextFormat: InsertTextFormat.Snippet,
      documentation: description,
      data: { snippet }
    }
  ))
}

/**
 * Generate Output (Object) Completions
 *
 * @export
 * @param {LSP.Position} position
 * @returns {LSP.CompletionItem[]}
 */
export function getOutputCompletions (position) {

  const additionalTextEdits = []
  const prevCharacter = PosCharSubtract(2, position)

  if (!Parser.isCodeChar(Characters.LCB, prevCharacter)) {
    additionalTextEdits.push(
      TextEdit.insert(
        PosCharSubtract(1, position)
        , '{'
      )
    )
  }

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
      insertText: ` ${label}$1 }} $0`,
      insertTextFormat: InsertTextFormat.Snippet,
      documentation: description,
      additionalTextEdits
    }
  ))
}

/**
 * Generate Output (Object) Completions
 *
 * @export
 * @param {LSP.Position} position
 * @returns {LSP.CompletionItem[]}
 */
export function getFilterCompletions (position) {

  return Object.entries(Parser.spec.filters).map((
    [
      label,
      {
        description,
        snippet = ` ${label} $0`
      }
    ]
  ) => ({
    label,
    kind: CompletionItemKind.Keyword,
    insertText: snippet,
    insertTextFormat: InsertTextFormat.Snippet,
    documentation: description,
    data: { snippet }
  }))

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
export function getPreviousCharacter (ASTNode, document, position, context) {

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
    ) => ({
      label,
      kind: CompletionItemKind.Keyword,
      documentation: description,
      insertText: ' ' + label + '$1 }} $0',
      insertTextFormat: InsertTextFormat.Snippet,
      data: {
        snippet: ' ' + label + '$1 }} $0'
      }
    }))

  }

  if (/{%\s*/.test(type)) {

    return Object.entries(Parser.spec.tags).map((
      [
        label,
        {
          description,
          singular,
          snippet = ' ' + label + ' $1 %}' + (
            singular ? '$0' : ` $0 {% end${label} %}`
          )
        }
      ]
    ) => ({
      label,
      kind: CompletionItemKind.Keyword,
      insertText: snippet,
      insertTextFormat: InsertTextFormat.Snippet,
      documentation: description,
      data: {
        snippet
      }
    }))
  }
}
