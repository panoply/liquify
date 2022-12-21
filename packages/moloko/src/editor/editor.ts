import { Attrs } from '@types';
import * as ace from 'ace';
import { Split } from 'ace/split';
import * as hash from '@hash';
import * as store from '@store';
import { toggleViews } from '@actions';
import m from 'mithril';

/* function create (attrs: Attrs, dom: HTMLElement) {

  const editor = ace.edit(dom as HTMLElement);

  editor.container.style.lineHeight = '1.0845rem';
  editor.$blockScrolling = Infinity;
  editor.renderer.setPadding(5);
  editor.renderer.setAnimatedScroll(true);
  editor.renderer.setScrollMargin(15, 15, 0, 0);
  editor.setShowPrintMargin(true);
  editor.setOptions({
    animatedScroll: false,
    autoScrollEditorIntoView: undefined,
    behavioursEnabled: true,
    copyWithEmptySelection: false,
    cursorStyle: 'slim',
    displayIndentGuides: true,
    dragDelay: 100,
    dragEnabled: true,
    enableAutoIndent: true,
    enableBlockSelect: true,
    enableMultiselect: false,
    fadeFoldWidgets: false,
    firstLineNumber: 1,
    fixedWidthGutter: undefined,
    focusTimeout: 0,
    foldStyle: 'markbegin',
    fontSize: '11px',
    hScrollBarAlwaysVisible: false,
    hasCssTransforms: undefined,
    highlightActiveLine: true,
    highlightGutterLine: true,
    highlightSelectedWord: true,
    indentedSoftWrap: false,
    keyboardHandler: undefined,
    maxLines: undefined,
    maxPixelHeight: 0,
    mergeUndoDeltas: true,
    minLines: undefined,
    mode: 'ace/mode/text',
    navigateWithinSoftTabs: false,
    newLineMode: 'auto',
    overwrite: true,
    placeholder: undefined,
    printMargin: 80,
    printMarginColumn: 150,
    readOnly: false,
    relativeLineNumbers: undefined,
    scrollPastEnd: 0,
    scrollSpeed: 1,
    selectionStyle: 'line',
    showFoldWidgets: true,
    showGutter: true,
    showInvisibles: true,
    showLineNumbers: true,
    showPrintMargin: true,
    tabSize: 4,
    theme: 'ace/theme/potion',
    tooltipFollowsMouse: true,
    useSoftTabs: true,
    useTextareaForIME: true,
    useWorker: false,
    vScrollBarAlwaysVisible: false,
    wrapBehavioursEnabled: true
  });

} */

export const Editor: m.Component<Attrs> = {

  oncreate: async ({ dom, attrs }) => {

    attrs.editor = new Split(dom, 'ace/theme/potion', 2);

    if (store.options.hash && attrs.hash) {

      const text = hash.decode(attrs.hash);
      const mode = await store.language(text.language);

      attrs.input = ace.createEditSession(text.input, mode);
      attrs.output = ace.createEditSession(text.output, mode);
      attrs.language = text.language;
      attrs.autoDetect = text.autoDetect;
      attrs.sample = text.sample;
      attrs.languageName = text.languageName;
      attrs.stats = text.stats;
      attrs.mode = text.mode;

    } else {

      const mode = await store.language(attrs.language);

      attrs.input = ace.createEditSession('', mode);
      attrs.output = ace.createEditSession('', mode);

      if (store.options.hash) hash.encode();

    }

    toggleViews(attrs.pane);

    attrs.ready = true;

  },
  view: () => m('#editor')
};
