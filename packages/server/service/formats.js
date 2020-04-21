// @ts-check
// @ts-ignore
import prettydiff from 'prettydiff'
import _ from 'lodash'
import { Server, connection } from '../export'
import { TokenKind } from '../parser/lexical'

/**
 * Formatting Functions
 *
 * Formatting is provided by leveraging the language aware
 * beautification tool known as PrettyDiff. PrettyDiff ships with
 * some minor issues when deeply intergrated with Liquid and so
 * the private functions here are used to patch those issues.
 *
 * For more information see:
 *
 * PrettyDiff
 * @see https://prettydiff.com/documentation.xhtml
 *
 * Sparser
 * @see https://sparser.io/docs-html/tech-documentation.xhtml
 *
 * @typedef {import("vscode-languageserver").TextDocument} TextDocument
 * @typedef {import('defs').ASTEmbeddedRegion} ASTEmbeddedRegion
 * @typedef {import('vscode-languageserver').TextEdit} TextEdit
 */

/* ---------------------------------------------------------------- */
/* PRIVATE                                                          */
/* ---------------------------------------------------------------- */

/**
 * Default PrettyDiff Rules - Used to reset prettyDiff format rules
 */
const defaultRules = _.cloneDeep(prettydiff.options)

/**
 * Indentation Levels
 *
 * Used for embedded blocks of code that are neseted or child
 * nodes contiained within HTML elements which must adhere to an
 * indentation level
 *
 * @param {TextDocument} document
 * @param {number} kind
 * @param {number} offset
 * @returns {number}
 */
function indentLevel (document, kind, offset) {

  const { tabSize } = Server.formatRules.editorRules
  const { line } = document.positionAt(offset)
  const pos = offset - document.offsetAt({ line, character: 0 })
  const lvl = kind === TokenKind.liquid
    ? pos / tabSize
    : pos / tabSize + tabSize / tabSize

  // TODO: This offsets the first line - NEEDS FIXING
  return lvl

}

/**
 * Format Replacements
 *
 * Removes patched document content manipulations which help
 * prevent errors from occuring at the Sparser parsing level.
 *
 * @param {string} content
 * @returns {string}
 */
function formatReplace (content) {

  return content
  .replace(/=" {{/g, '="{{')
  .replace(/\s*data-prettydiff-ignore>/g, '>\n')
  .replace(/_pdp/g, '')

}

/**
 * Format HTML Embedded Tags - Applies an ignore attribute to HTML
 * embedded tags like `<style>` or `<script>` to prevent PrettyDiff
 * formatting its contents.
 *
 * @param {TextDocument} document
 * @param {String} newText
 * @param {ASTEmbeddedRegion} ASTnode
 * @returns {TextEdit[]}
 */
function formatHTMLEmbeds (document, newText, ASTnode) {

  const { offset } = ASTnode

  return [
    {
      newText: 'data-prettydiff-ignore>',
      range: {
        start: document.positionAt(offset[1] - 1),
        end: document.positionAt(offset[1])
      }
    },
    {
      newText,
      range: {
        start: document.positionAt(offset[3] + 1),
        end: document.positionAt(offset[2])
      }
    }
  ]

}

/**
 * Format Liquid Embedded Tags
 *
 * Patches prettydiff formatting issue which fails when editing embedded
 * tags like `{% style %}` - The tag name is modified to trick PrettyDiff
 * into treating it as it would any Liquid tag block. The temporary name
 * is removed in the final format cycle.
 *
 * @param {TextDocument} document
 * @param {String} newText
 * @param {ASTEmbeddedRegion} ASTnode
 * @returns {TextEdit[]}
 */
function formatLiquidEmbeds (document, newText, ASTnode) {

  const { token, name, offset } = ASTnode
  const startName = token[0].indexOf(name)
  const closeName = token[1].indexOf(`end${name}`)

  return [
    {
      newText: `${name}_pdp`,
      range: {
        start: document.positionAt(offset[0] + startName),
        end: document.positionAt(offset[0] + startName + name.length)
      }
    }, {
      newText: `end${name}_pdp`,
      range: {
        start: document.positionAt(offset[2] + closeName),
        end: document.positionAt(offset[2] + closeName + name.length + 3)
      }
    }, {
      newText,
      range: {
        start: document.positionAt(offset[1]),
        end: document.positionAt(offset[2])
      }
    }
  ]

}

/* ---------------------------------------------------------------- */
/* PUBLIC                                                           */
/* ---------------------------------------------------------------- */

/**
 * Embedded Regions - JavaScript, JSON, CSS and SCSS
 *
 * @param {TextDocument} document
 * @param {ASTEmbeddedRegion} ASTnode
 * @returns
 */
export function embeds (document, ASTnode) {

  const { languageId, kind, embeddedDocument, offset } = ASTnode
  const source = embeddedDocument.getText()
  const indent_level = indentLevel(document, kind, offset[0])
  const rules = Server.formatRules.languageRules[languageId]

  // Set formatting rules
  // Apply `indent_level` when nested within elements
  Object.assign(prettydiff.options, rules, { source, indent_level })

  // Execute formats
  const beautify = prettydiff()

  // Apply indentation to tag block
  const newText = `\n${_.repeat(rules.indent_char, indent_level)}${beautify}`

  if (prettydiff.sparser.parseerror.length > 0) {
    connection.console.error(prettydiff.sparser.parseerror)
    return source
  }

  // Reset PrettyDiff rules.
  Object.assign(prettydiff.options, defaultRules)

  if (kind === TokenKind.html && !/\s*$/.test(source)) {
    return formatHTMLEmbeds(embeddedDocument, newText, ASTnode)
  } else if (languageId === 'scss' || languageId === 'css') {
    return formatLiquidEmbeds(document, newText, ASTnode)
  }

  return {
    newText,
    range: {
      start: document.positionAt(offset[1]),
      end: document.positionAt(offset[2])
    }
  }

}

/**
 * HTML Formatting (Markup) - Will run HTML formatting on the
 * document content.
 *
 * @param {string} source
 * @returns {string} The beautified text document content
 */
export function markup (source) {

  // This patch fixes newline HTML attributes
  Object.assign(
    prettydiff.options
    , Server.formatRules.languageRules.html
    , { source: source.replace(/="{{/g, '=" {{') }
  )

  const output = prettydiff()

  // Check Sparser for errors
  // Validations will handle missing pairs
  // We still echo Sparsers log for additional context.
  if (prettydiff.sparser.parseerror.length > 0) {
    connection.console.error(prettydiff.sparser.parseerror)
    return formatReplace(source)
  }

  Object.assign(prettydiff.options, defaultRules)

  return formatReplace(output)

}
