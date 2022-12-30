import { Ace } from '@types';
import prettify, { Options as PrettifyOptions, Language } from '@liquify/prettify';
import { attrs } from '@attrs';
import { language } from '@store';
import m from 'mithril';
import './build/moloko.css';

export async function newMode () {

  const options = prettify.language.reference(attrs.language as any);

  try {
    const value = await prettify.format(attrs.input.getValue(), options);
    attrs.output.setValue(value);
  } catch (text) {
    return attrs.output.setValue(text);
  }

}

function onChangeTest (input: string, options: Language) {

  language(options.language as any).then(mode => {

    attrs.input.setMode(mode);
    attrs.output.setMode(mode);

    attrs.language = options.language as any;
    attrs.languageName = options.languageName;

    prettify.format(input, options).then(value => {

      attrs.output.setValue(value);

    }).catch(error => attrs.output.setValue(error));

  });
}

/**
 * onChange Event
 *
 * Invoked for every document change, passes input
 * to Prettify and updates the output content.
 */
export function onChange (delta: Ace.Delta) {

  const input = attrs.input.getValue();

  if (delta.action === 'insert' && delta.lines.length > 3 && attrs.autoDetect === true) {
    const lang = prettify.language(input);
    if (lang.language !== attrs.language) return onChangeTest(input, lang);
  }

  const options = prettify.language.reference(attrs.language as any);

  prettify.format(input, options).then(value => {

    attrs.output.setValue(value);

  }).catch(error => attrs.output.setValue(error));

}

/**
 * Beautify Code
 *
 * Invokes beautification, uses the editors input
 * and update the output content.
 */
export function beautify (options: PrettifyOptions) {

  const { language, languageName, lexer } = prettify.language.reference(attrs.language as any);

  options.language = language;
  options.languageName = languageName;
  options.lexer = lexer;

  prettify.format(attrs.input.getValue(), options).then((value) => {

    attrs.output.setValue(value);

  }).catch(attrs.output.setValue);

}

/**
 * Input Editor
 *
 * The Ace editor configuration for the input
 * rendered. The input renderer is editable.
 */
export function inputEditor (editor: Ace.Editor) {

  // CONTAINER
  editor.container.style.borderRight = '0.01rem solid #666';
  editor.container.style.zIndex = '100';
  editor.renderer.$cursorLayer.element.style.opacity = '1';

  // RENDERER
  editor.renderer.setScrollMargin(15, 15, 0, 0);
  editor.renderer.setPadding(5);
  editor.renderer.showCursor();
  editor.renderer.$cursorLayer.setBlinking(true);

  editor.setOptions({
    readOnly: false,
    highlightActiveLine: true,
    highlightGutterLine: true,
    displayIndentGuides: false,
    enableAutoIndent: true,
    enableBlockSelect: true,
    showInvisibles: false,
    showPrintMargin: false
  });

  // EVENT LISTENER

  if (attrs.onChange === false) {
    editor.on('change', onChange);
    attrs.onChange = true;
  }
}

/**
 * Ouput Editor
 *
 * The Ace editor configuration for the output
 * renderer. The output editor is READ ONLY.
 */
export function outputEditor (editor: Ace.Editor) {

  // RENDERER
  editor.renderer.setScrollMargin(15, 15, 0, 0);
  editor.renderer.setPadding(5);
  editor.renderer.$cursorLayer.element.style.opacity = '0';

  // OPTIONS
  editor.setOptions({
    readOnly: true,
    highlightActiveLine: false,
    highlightGutterLine: false,
    showInvisibles: true,
    showPrintMargin: true,
    displayIndentGuides: true
  });

}

/**
 * Toggle Views
 *
 * Changes the editor panes. Allows for users to
 * toggle split, editor and preview views.
 */
export function toggleViews (pane: 'split' | 'editor' | 'preview') {

  attrs.pane = pane;
  attrs.editor.setFontSize(attrs.fontSize);

  if (pane === 'editor') {

    attrs.idx = 1;

    attrs.editor.setSplits(1);
    attrs.editor.setSession(attrs.input, 0);

    inputEditor(attrs.editor.getEditor(0));

  } else if (pane === 'preview') {

    attrs.idx = 0;

    if (attrs.onChange === true) {
      attrs.editor.getEditor(0).off('change', onChange);
      attrs.onChange = false;
    }

    attrs.editor.setSplits(1);
    attrs.editor.setSession(attrs.output, 0);

    outputEditor(attrs.editor.getEditor(0));

  } else if (pane === 'split') {

    attrs.idx = 1;

    attrs.editor.setSplits(2);
    attrs.editor.setSession(attrs.input, 0);
    attrs.editor.setSession(attrs.output, 1);

    inputEditor(attrs.editor.getEditor(0));
    outputEditor(attrs.editor.getEditor(1));
  }

  m.redraw();

};
