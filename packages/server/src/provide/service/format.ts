import * as format from '@liquify/beautify';
import { Formatting } from 'types/server';
import { is } from 'utils/common';
import { NodeKind, INode, IEmbed, IAST, TextDocument } from '@liquify/liquid-parser';
import { TextEdit } from 'vscode-languageserver';
import indentString from 'indent-string';

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

/* -------------------------------------------- */
/* LOCAL FUNCTIONS                              */
/* -------------------------------------------- */

/**
 * Format Pre-Placements
 *
 * Applies some pre-placement adjustments to document contents
 * before we pass to PrettyDiff so as to prevent formatting issues
 * from occurring.
 */
function preplacement (editText: string): string {

  return editText

    // Reset HTML Liquid string attributes
    .replace(/=(["'])(\{[{%]-?)/g, '=$1 $2')

    // Enforce comments to use trims
    .replace(/({%-?)\s*(\b(?:end)?comment\s*)(-?%})/g, '{%- $2 -%}');

};

/**
 * Format Replacements
 *
 * Removes patched document content manipulations which help
 * prevent errors from occurring at the Sparser parsing level.
 */
function replacements (newText: string): string {

  return newText

    // Patches Liquid Quotation alignments
    .replace(/=(["'])\s*(\{[{%]-?)/g, '=$1$2')

    // Ignores Embedded HTML language regions
    .replace(/<!--parse-ignore-start-->/g, '')
    .replace(/\/\*parse-ignore-start\*\//g, '')
    .replace(/\/\*parse-ignore-end\*\//g, '')
    .replace(/<!--parse-ignore-end-->/g, '');

};

/**
 * Indentation Levels
 *
 * Used for embedded blocks of code that are nested or child
 * nodes contained within HTML elements which must adhere to an
 * indentation level
 */
function indentation (literal: TextDocument, offset: number, tabSize: number) {

  const align = offset - literal.offsetAt({
    line: literal.positionAt(offset).line,
    character: 0
  });

  return (align / tabSize) * tabSize;

};

/**
 * HTML Regions
 *
 * Format HTML Embedded Tags - Applies an ignore attribute to HTML
 * embedded tags like `<style>` or `<script>` to prevent PrettyDiff
 * formatting its contents.
 */
function HTMLRegions (
  literal: TextDocument,
  textEdit: TextEdit[],
  newText: string,
  { offsets, range: { start, end } }: INode
): TextEdit[] {

  const open = literal.positionAt(offsets[1]);
  const close = literal.positionAt(offsets[2]);

  textEdit.push(
    // { newText: '\n/*parse-ignore-start*/\n', range: { start: open, end: open } },
    // { newText: '\n/*parse-ignore-end*/\n', range: { start: close, end: close } },
    { newText: '\n', range: { start, end: start } },
    { newText: '\n', range: { start: end, end } },
    { newText, range: { start: open, end: close } }
  );

  return textEdit;

};
/**
 * Liquid Regions
 *
 * Patches prettydiff formatting issue which fails when editing embedded
 * tags like `{% style %}` - The tag name is modified to trick PrettyDiff
 * into treating it as it would any Liquid tag block. The temporary name
 * is removed in the final format cycle.
 */
function LiquidRegions (
  literal: TextDocument,
  textEdit: TextEdit[],
  newText: string,
  { offsets, range: { start, end } }: INode
): TextEdit[] {

  const open = literal.positionAt(offsets[1]);
  const close = literal.positionAt(offsets[2]);

  textEdit.push(

    /* NEWLINE OFFSETS ---------------------------- */

    { newText: '\n', range: { start, end: start } },
    { newText: '\n', range: { start: end, end } },
    { newText: '\n', range: { start: open, end: open } },
    { newText: '\n<!--parse-ignore-start-->\n', range: { start, end: start } },
    { newText: '<!--parse-ignore-end-->', range: { start: end, end } },
    { newText, range: { start: open, end: close } }
  );

  return textEdit;

};

/**
 * Embedded Regions
 *
 * Constructs the text edit formats which will be applied to embedded
 * document regions. The return function is a reducer using the
 * AST `linting` array value as its accumulator. For every region
 * we encounted, we assert new rulesets and pass them to prettydiff.
 */
function embedded (literal: TextDocument, { languageRules, editorRules }: Formatting) {

  return (textEdit: TextEdit[], node: INode & IEmbed) => {

    const rules = languageRules[node.languageId];

    rules.indent_level = is(node.parent.type, 0)
      ? 0
      : indentation(literal, node.start, editorRules.tabSize);

    const beautify = format.prettydiff(node.innerContent, rules);

    // Check Sparser for errors
    // Validations will handle missing pairs
    // We still echo Sparser log for additional context.
    if (beautify.errors) {
      console.error(beautify.errors);
      return textEdit;
    }

    // Apply indentation to tag block
    return is(node.kind, NodeKind.HTML)
      ? HTMLRegions(literal, textEdit, beautify.source, node)
      : LiquidRegions(literal, textEdit, beautify.source, node);

  };

}

/**
 * Format Markup
 *
 * This function executes HTML formatting, its the final beautification
 * process we execute on the document. The `markup()` export returns
 * this function as does the `regions()` function.
 */
function formatMarkup (source: string, { languageRules }: Formatting) {

  // console.log(source);

  const beautify = format.prettydiff(preplacement(source), languageRules.html);

  if (beautify.errors) {
    console.error(beautify.errors);
    return replacements(source);
  }

  return replacements(beautify.source);

}

/**
 * Linting
 *
 * Proccesses fixable lints. Code errors or warnings that are fixable
 * are stored on the AST property `linting[]` as a list of `TextEdits[]`
 * We process all lintable formats before passing to prettydiff for
 * beautification so as to prevent any overlapping edits to occur.
 *
 * This function will return a a document literal.
 */
export function linting (document: IAST): string {

  const literal = document.literal();
  const content = TextDocument.applyEdits(literal, document.linting);

  document.linting = [];

  return content;

}

/* -------------------------------------------- */
/* EXPORT FUNCTIONS                             */
/* -------------------------------------------- */

/**
 * Regions
 *
 * Applies formatting to embedded regions detected within the
 * document, like JavaScript, JSON, CSS and SCSS tags. The inner contents
 * of those tags are formatted and then all markup beautification is
 * applied following regional formats.
 */
export function regions (document: IAST, rules: Formatting): TextEdit[] {

  const literal: TextDocument = document.literal();
  const regions = document.regions.reduce(embedded(literal, rules), []);
  const formats = TextDocument.applyEdits(literal, regions);
  const range = document.getRange(0, formats.length);

  return [
    TextEdit.replace(range, linting(document)),
    TextEdit.replace(range, formatMarkup(formats, rules))
  ];

}

/**
 * Markup
 *
 * When a document contains no embedded regions, we process
 * a markup beautification. This function is different from
 * `regions()` in the sense that no regions exists and only HTML
 * and Liquid syntaxes are detected.
 */
export function markup (document: IAST, rules: Formatting): TextEdit[] {

  const source = document.literal().getText();
  const range = document.getRange(0, source.length);

  return [
    TextEdit.replace(range, linting(document)),
    TextEdit.replace(range, formatMarkup(source, rules))
  ];

};
