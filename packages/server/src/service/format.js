// @ts-ignore
import prettydiff from 'prettydiff'
import cloneDeep from 'lodash/cloneDeep'
import repeat from 'lodash/repeat'
import { NodeKind, NodeLanguage } from '@liquify/liquid-parser'
import Server from 'provide/server'

/**
 * Default PrettyDiff Rules - Used to reset prettyDiff format rules
 */
const defaultRules = cloneDeep(prettydiff.options)

/**
 * Formatting Functions
 *
 * Formatting is provided by leveraging the language aware
 * beautification tool known as PrettyDiff. PrettyDiff ships with
 * some minor issues when deeply integrated with Liquid and so
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
 * @param {Parser.AST} document
 * @param {Parser.TextDocument} literal
 */
export function Format (document, literal) {

  const { languageRules } = Server.formatting

  /**
   * Indentation Levels
   *
   * Used for embedded blocks of code that are nested or child
   * nodes contained within HTML elements which must adhere to an
   * indentation level
   *
   * @param {number} offset
   * @returns {number}
   */
  const indentation = offset => {

    const align = offset - literal.offsetAt(
      {
        line: literal.positionAt(offset).line,
        character: 0
      }
    )

    // const indent = kind === TokenKind.liquid
    // ? pos / tabSize
    // : pos / tabSize + tabSize / tabSize

    // return indent

    return align / Server.formatting.editorRules.tabSize

  }

  /**
   * Format Pre-Placements
   *
   * Applies some pre-placement adjustments to document contents
   * before we pass to PrettyDiff so as to prevent formatting issues
   * from occurring.
   *
   * @param {string} editText
   * @returns {string}
   */
  const preplacement = (editText) => (

    editText

      // Reset HTML Liquid string attributes
      .replace(/="(\{[{%]-?)/g, '=" $1')

      // Enforce comments to use trims
      .replace(/({%-?)\s*(\b(?:end)?comment\s*)(-?%})/g, '{%- $2 -%}')

  )

  /**
   * Format Replacements
   *
   * Removes patched document content manipulations which help
   * prevent errors from occurring at the Sparser parsing level.
   *
   * @param {string} newText
   * @returns {string}
   */
  const replacements = (newText) => (

    newText

      // Patches Liquid Quotation alignments
      .replace(/="\s*(\{[{%]-?)/g, '="$1')

      // Ignores Embedded HTML language regions
      .replace(/\s*data-prettydiff-ignore>/g, '>\n')

      // Patches embedded Liquid language regions
      .replace(/__pdp/g, '')

  )

  /**
   * Format HTML Embedded Tags - Applies an ignore attribute to HTML
   * embedded tags like `<style>` or `<script>` to prevent PrettyDiff
   * formatting its contents.
   *
   * @param {LSP.TextEdit[]} textEdit
   * @param {String} newText
   * @param {Parser.ASTNode} node
   * @returns {LSP.TextEdit[]}
   */
  const HTMLEmbeds = (textEdit, newText, node) => {

    textEdit.push(
      {
        newText: 'data-prettydiff-ignore>',
        range: {
          start: literal.positionAt(
            node.offsets[1] - 1
          ),
          end: literal.positionAt(
            node.offsets[1]
          )
        }
      },
      {
        newText,
        range: {
          start: literal.positionAt(
            node.offsets[3] + 1
          ),
          end: literal.positionAt(
            node.offsets[2]
          )
        }
      }
    )

    return textEdit

  }

  /**
   * Format Liquid Embedded Tags
   *
   * Patches prettydiff formatting issue which fails when editing embedded
   * tags like `{% style %}` - The tag name is modified to trick PrettyDiff
   * into treating it as it would any Liquid tag block. The temporary name
   * is removed in the final format cycle.
   *
   * @param {LSP.TextEdit[]} textEdit
   * @param {string} newText
   * @param {Parser.ASTNode} node
   * @returns {LSP.TextEdit[]}
   */
  const LiquidEmbeds = (textEdit, newText, node) => {

    const startName = node.token[0].indexOf(node.name)
    const closeName = node.token[1].indexOf(`end${node.name}`)

    textEdit.push(
      {
        newText: `${node.name}__pdp`,
        range: {
          start: literal.positionAt(
            node.offsets[0] + startName
          ),
          end: literal.positionAt(
            node.offsets[0] + startName + node.name.length
          )
        }
      },
      {
        newText: `end${node.name}__pdp`,
        range: {
          start: literal.positionAt(
            node.offsets[2] + closeName
          ),
          end: literal.positionAt(
            node.offsets[2] + closeName + node.name.length + 3
          )
        }
      },
      {
        newText,
        range: {
          start: literal.positionAt(
            node.offsets[1]
          ),
          end: literal.positionAt(
            node.offsets[2]
          )
        }
      }
    )

    return textEdit

  }

  /**
   * Embedded Regions - JavaScript, JSON, CSS and SCSS
   *
   * @param {Parser.ASTNode[]} nodes
   * @returns {LSP.TextEdit[]}
   */
  const embeds = nodes => nodes.reduce((textEdit, node) => {

    // If embedded region have parse issues, we will exclude
    // from formatting and prevent any defect formats.
    if (!node.content || document.errors.slice(document.lastNode.error).some(
      ({ data }) => data?.index === node.index && !data?.capabilities?.doFormat
    )) return textEdit

    const indent_level = indentation(node.offsets[0])
    const rules = languageRules[node.language]

    // Set formatting rules
    // Apply `indent_level` when nested within elements
    Object.assign(prettydiff.options, defaultRules, rules, {
      source: node.content,
      indent_level
    })

    // Execute formats
    const formats = prettydiff()

    if (prettydiff.sparser.parseerror.length > 0) {
      console.error(prettydiff.sparser.parseerror)
      return textEdit
    }

    // Apply indentation to tag block
    const newText = '\n' + repeat(rules.indent_char, indent_level) + formats

    if (node.kind === NodeKind.HTML && !/\s*$/.test(node.content)) {
      return HTMLEmbeds(textEdit, newText, node)
    }

    if (node.language === NodeLanguage.scss || node.language === NodeLanguage.css) {
      return LiquidEmbeds(textEdit, newText, node)
    }

    textEdit.push(
      {
        newText,
        range: {
          start: literal.positionAt(node.offsets[1]),
          end: literal.positionAt(node.offsets[2])
        }
      }
    )

    return textEdit

  }, [])

  /**
   * Liquid Formatting
   *
   */
  const liquid = () => {

    // TODO

  }

  /**
   * HTML Markup formatting
   *
   * @param {string} [source]
   * @returns {string}
   */
  const markup = (source = literal.getText()) => {

    // This patch fixes newline HTML attributes
    Object.assign(prettydiff.options, defaultRules, languageRules.html, {
      source: preplacement(source)
    })

    try {

      const formats = prettydiff()

      // Check Sparser for errors
      // Validations will handle missing pairs
      // We still echo Sparser log for additional context.
      if (prettydiff.sparser.parseerror.length > 0) {

        console.error(prettydiff.sparser.parseerror)
        return replacements(source)
      }

      return replacements(formats)

    } catch (e) {

      return replacements(source)

    }

  }

  return {
    markup,
    embeds,
    liquid
  }

}
