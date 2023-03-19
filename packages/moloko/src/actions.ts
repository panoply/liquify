import { Ace } from 'types';
import esthetic, { Rules } from 'esthetic';
import { attrs } from 'attrs';
import m from 'mithril';
import './build/moloko.css';

export async function newMode () {

  const options = esthetic.detect(attrs.language as any);

  try {

    const value = esthetic.format(attrs.input.getValue(), options);
    attrs.output.setValue(value);

  } catch (text) {

    return attrs.output.setValue(text);

  }

}

/**
 * onChange Event
 *
 * Invoked for every document change, passes input
 * to esthetic and updates the output content.
 */
export function onChange () {

  const input = attrs.input.getValue();

  try {

    const value = esthetic.format(input);
    attrs.output.setValue(value);

  } catch (error) {

    attrs.output.setValue(error);

  }

}

/**
 * Format Code
 *
 * Invokes beautification, uses the editors input
 * and update the output content.
 */
export function format (options?: Rules) {

  if (options) esthetic.rules(options);

  try {

    const output = esthetic.format(attrs.input.getValue());
    attrs.output.setValue(output);

  } catch (error) {

    attrs.output.setValue(error);

  }

}

/**
 * Input Editor
 *
 * The Ace editor configuration for the input
 * rendered. The input renderer is editable.
 */
export function input (editor: Ace.Editor) {

  // CONTAINER
  editor.container.style.borderRight = '0.01rem solid #666';
  editor.container.style.zIndex = '100';
  editor.renderer.$cursorLayer.element.style.opacity = '1';

  editor.commands.addCommand({
    exec (editor) {

      try {

        const value = esthetic.format(editor.getValue());
        attrs.output.setValue(value);

      } catch (e) {

        console.log(e);

      }

    },
    name: 'save',
    bindKey: {
      win: 'Ctrl-S',
      mac: 'Command-S'
    }
  });

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
export function output (editor: Ace.Editor) {

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
export function pane (view: 'split' | 'editor' | 'preview') {

  attrs.pane = view;
  attrs.editor.setFontSize(attrs.fontSize);

  if (view === 'editor') {

    attrs.idx = 1;

    attrs.editor.setSplits(1);
    attrs.editor.setSession(attrs.input, 0);

    input(attrs.editor.getEditor(0));

  } else if (view === 'preview') {

    attrs.idx = 0;

    if (attrs.onChange === true) {
      attrs.editor.getEditor(0).off('change', onChange);
      attrs.onChange = false;
    }

    attrs.editor.setSplits(1);
    attrs.editor.setSession(attrs.output, 0);

    output(attrs.editor.getEditor(0));

  } else if (view === 'split') {

    attrs.idx = 1;

    attrs.editor.setSplits(2);
    attrs.editor.setSession(attrs.input, 0);
    attrs.editor.setSession(attrs.output, 1);

    input(attrs.editor.getEditor(0));
    output(attrs.editor.getEditor(1));
  }

  m.redraw();

};
