// @ts-ignore
import prettydiff from 'prettydiff';
import cloneDeep from 'lodash/cloneDeep';
import repeat from 'lodash/repeat';
import { Server } from 'export';
import { NodeKind, NodeLanguage, INode, IAST, TextDocument } from '@liquify/liquid-parser';
import { TextEdit } from 'vscode-languageserver-protocol';

/**
 * Default PrettyDiff Rules - Used to reset prettyDiff format rules
 */
const defaultRules = cloneDeep(prettydiff.options);

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
 */
export function Format (document: IAST, literal: TextDocument) {

  const { languageRules } = Server.formatting;

  /**
   * Indentation Levels
   *
   * Used for embedded blocks of code that are nested or child
   * nodes contained within HTML elements which must adhere to an
   * indentation level
   */
  const indentation = (offset: number): number => {

    const align = offset - literal.offsetAt({
      line: literal.positionAt(offset).line,
      character: 0
    });

    // const indent = kind === TokenKind.liquid
    // ? pos / tabSize
    // : pos / tabSize + tabSize / tabSize

    // return indent

    return align / Server.formatting.editorRules.tabSize;

  };

  /**
   * Format Pre-Placements
   *
   * Applies some pre-placement adjustments to document contents
   * before we pass to PrettyDiff so as to prevent formatting issues
   * from occurring.
   */
  const preplacement = (editText: string): string => (

    editText

      // Reset HTML Liquid string attributes
      .replace(/="(\{[{%]-?)/g, '=" $1')

      // Enforce comments to use trims
      .replace(/({%-?)\s*(\b(?:end)?comment\s*)(-?%})/g, '{%- $2 -%}')

  );

  /**
   * Format Replacements
   *
   * Removes patched document content manipulations which help
   * prevent errors from occurring at the Sparser parsing level.
   */
  const replacements = (newText:string): string => (

    newText

      // Patches Liquid Quotation alignments
      .replace(/="\s*(\{[{%]-?)/g, '="$1')

      // Ignores Embedded HTML language regions
      .replace(/\s*data-prettydiff-ignore>/g, '>\n')

      // Patches embedded Liquid language regions
      .replace(/__pdp/g, '')

  );

  /**
   * Format HTML Embedded Tags - Applies an ignore attribute to HTML
   * embedded tags like `<style>` or `<script>` to prevent PrettyDiff
   * formatting its contents.
   */
  const HTMLEmbeds = (textEdit: TextEdit[], newText: string, node: INode) => {

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
    );

    return textEdit;

  };

  /**
   * Format Liquid Embedded Tags
   *
   * Patches prettydiff formatting issue which fails when editing embedded
   * tags like `{% style %}` - The tag name is modified to trick PrettyDiff
   * into treating it as it would any Liquid tag block. The temporary name
   * is removed in the final format cycle.
   */
  const LiquidEmbeds = (
    textEdit: TextEdit[],
    newText: string,
    node: INode
  ): TextEdit[] => {

    const startName = node.startToken.indexOf(node.tag);
    const closeName = node.endToken.indexOf(`end${node.tag}`);

    textEdit.push(
      {
        newText: `${node.tag}__pdp`,
        range: {
          start: literal.positionAt(
            node.offsets[0] + startName
          ),
          end: literal.positionAt(
            node.offsets[0] + startName + node.tag.length
          )
        }
      },
      {
        newText: `end${node.tag}__pdp`,
        range: {
          start: literal.positionAt(
            node.offsets[2] + closeName
          ),
          end: literal.positionAt(
            node.offsets[2] + closeName + node.tag.length + 3
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
    );

    return textEdit;

  };

  /**
   * Embedded Regions - JavaScript, JSON, CSS and SCSS
   */
  const embeds = (regions: INode[]): TextEdit[] => regions.reduce((textEdit, node) => {

    // If embedded region have parse issues, we will exclude
    // from formatting and prevent any defect formats.
    if (!document.format) return textEdit;

    const indent_level = indentation(node.start);
    const rules = languageRules[node.languageId];

    // Set formatting rules
    // Apply `indent_level` when nested within elements
    Object.assign(
      prettydiff.options,
      defaultRules,
      rules,
      {
        source: node.innerContent,
        indent_level
      }
    );

    // Execute formats
    const formats = prettydiff();

    if (prettydiff.sparser.parseerror.length > 0) {
      console.error(prettydiff.sparser.parseerror);
      return textEdit;
    }

    // Apply indentation to tag block
    const newText = '\n' + repeat(rules.indent_char, indent_level) + formats;

    if (node.kind === NodeKind.HTML && !/\s*$/.test(node.innerContent)) {
      return HTMLEmbeds(textEdit, newText, node);
    }

    if (node.languageId === NodeLanguage.scss || node.languageId === NodeLanguage.css) {
      return LiquidEmbeds(textEdit, newText, node);
    }

    textEdit.push(
      {
        newText,
        range: {
          start: literal.positionAt(node.offsets[1]),
          end: literal.positionAt(node.offsets[2])
        }
      }
    );

    return textEdit;

  }, []);

  /**
   * Liquid Formatting
   *
   */
  const liquid = () => {

    // TODO

  };

  /**
   * HTML Markup formatting
   *
   * @param {string} [source]
   * @returns {string}
   */
  const markup = (source: string = literal.getText()): string => {

    // This patch fixes newline HTML attributes
    Object.assign(
      prettydiff.options,
      defaultRules,
      languageRules.html,
      {
        source: preplacement(source)
      }
    );

    try {

      const formats = prettydiff();

      // Check Sparser for errors
      // Validations will handle missing pairs
      // We still echo Sparser log for additional context.
      if (prettydiff.sparser.parseerror.length > 0) {

        console.error(prettydiff.sparser.parseerror);
        return replacements(source);
      }

      return replacements(formats);

    } catch (e) {

      return replacements(source);

    }

  };

  return {
    markup,
    embeds,
    liquid
  };

}
