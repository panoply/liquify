// @ts-ignore
import prettydiff from 'prettydiff'
import cloneDeep from 'lodash/cloneDeep'
import repeat from 'lodash/repeat'
import { NodeKind, NodeLanguage } from '@liquify/liquid-parser'
import Server from 'provide/server'
import mergerino from 'mergerino'
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
 */

export default (function Format () {

  /**
   * Default PrettyDiff Rules - Used to reset prettyDiff format rules
   */
  const defaultRules = cloneDeep(prettydiff.options)

  /**
   * Indentation Levels
   *
   * Used for embedded blocks of code that are nested or child
   * nodes contained within HTML elements which must adhere to an
   * indentation level
   *
   * @param {LSP.TextDocument} literal
   * @param {number} offset
   * @returns {number}
   */
  const indentation = (literal, offset) => {

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
   * Format Replacements
   *
   * Removes patched document content manipulations which help
   * prevent errors from occurring at the Sparser parsing level.
   *
   * @param {string} content
   * @returns {string}
   */
  const replacements = (content) => (

    content

      // Patches Liquid Quotation alignments
      .replace(/=" (\{[{%]-?)/g, '="$1')

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
   * @param {Parser.AST} document
   * @param {String} newText
   * @param {Parser.ASTNode} ASTnode
   * @returns {LSP.TextEdit[]}
   */
  const HTMLEmbeds = (document, newText, ASTnode) => [
    {
      newText: 'data-prettydiff-ignore>',
      range: document.toRange(
        ASTnode.offsets[1] - 1,
        ASTnode.offsets[1]
      )
    },
    {
      newText,
      range: document.toRange(
        ASTnode.offsets[3] + 1,
        ASTnode.offsets[2]
      )
    }
  ]

  /**
   * Format Liquid Embedded Tags
   *
   * Patches prettydiff formatting issue which fails when editing embedded
   * tags like `{% style %}` - The tag name is modified to trick PrettyDiff
   * into treating it as it would any Liquid tag block. The temporary name
   * is removed in the final format cycle.
   *
   * @param {Parser.AST} document
   * @param {Parser.ASTNode} ASTNode
   * @param {string} newText
   * @returns {LSP.TextEdit[]}
   */
  const LiquidEmbeds = (document, ASTNode, newText) => {

    const startName = ASTNode.token[0].indexOf(ASTNode.name)
    const closeName = ASTNode.token[1].indexOf(`end${ASTNode.name}`)

    return [
      {
        newText: `${ASTNode.name}__pdp`,
        range: document.toRange(
          ASTNode.offsets[0] + startName,
          ASTNode.offsets[0] + startName + ASTNode.name.length
        )
      },
      {
        newText: `end${ASTNode.name}__pdp`,
        range: document.toRange(
          ASTNode.offsets[2] + closeName,
          ASTNode.offsets[2] + closeName + ASTNode.name.length + 3
        )
      },
      {
        newText,
        range: document.toRange(ASTNode.offsets[1], ASTNode.offsets[2])
      }
    ]
  }

  /**
   * Embedded Regions - JavaScript, JSON, CSS and SCSS
   *
   * @param {Parser.AST} document
   * @param {LSP.TextDocument} literal
   * @returns {(ASTNode: Parser.ASTNode) => LSP.TextEdit[]}
   */
  const embeds = (document, literal) => node => {

    // If embedded region have parse issues, we will exclude
    // from formatting and prevent any defect formats.
    if (!node.content || document.errors.slice(document.lastNode.error).some(({
      data: {
        // @ts-ignore
        index,
        // @ts-ignore
        capabilities: { doFormat }
      }
    }) => (index === node.index && !doFormat))) {
      return [
        {
          newText: node.content,
          range: document.toRange(
            node.offsets[1],
            node.offsets[2]
          )
        }
      ]
    }

    const indent_level = indentation(literal, node.offsets[0])
    const rules = Server.formatting.languageRules[node.language]
    const source = node.content

    // Set formatting rules
    // Apply `indent_level` when nested within elements
    Object.assign(prettydiff.options, rules, { source, indent_level })

    // Execute formats
    const formats = prettydiff()

    //    console.log(rules, source, prettydiff.sparser)

    if (prettydiff.sparser.parseerror.length > 0) {
      console.error(prettydiff.sparser.parseerror)
      return [
        {
          newText: node.content,
          range: document.toRange(
            node.offsets[1],
            node.offsets[2]
          )
        }
      ]
    }

    Object.assign(prettydiff.options, defaultRules) // Reset PrettyDiff rules

    // Apply indentation to tag block
    const newText = '\n' + repeat(rules.indent_char, indent_level) + formats

    if (node.kind === NodeKind.HTML && !/\s*$/.test(source)) {
      return HTMLEmbeds(
        document,
        newText,
        node
      )
    }

    if (node.language === NodeLanguage.scss || node.language === NodeLanguage.css) {
      return LiquidEmbeds(
        document,
        node,
        newText
      )
    }

    return [
      {
        newText,
        range: document.toRange(
          node.offsets[1],
          node.offsets[2]
        )
      }
    ]
  }

  /**
   * HTML Markup formatting
   *
   * @param {string} source
   * @returns {string}
   */
  const markup = source => {

    // This patch fixes newline HTML attributes
    Object.assign(
      prettydiff.options,
      defaultRules,
      Server.formatting.languageRules.html,
      {
        source: source.replace(/="(\{[{%]-?)/g, '=" $1')
      }
    )

    const output = prettydiff()

    // Check Sparser for errors
    // Validations will handle missing pairs
    // We still echo Sparser log for additional context.
    if (prettydiff.sparser.parseerror.length > 0) {
      console.error(prettydiff.sparser.parseerror)
      return replacements(source)
    }

    Object.assign(prettydiff.options, defaultRules)

    return replacements(output)

  }

  return {
    markup,
    embeds
  }

}())
