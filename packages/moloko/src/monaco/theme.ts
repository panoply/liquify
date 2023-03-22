import { editor } from 'monaco-editor';

const shared: editor.ITokenThemeRule[] = [
  {
    foreground: '888888',
    token: 'comment'
  },
  {
    foreground: 'FAFAFA',
    token: 'delimiter'
  },
  {
    foreground: 'FFF9A6',
    token: 'string'
  },
  {
    foreground: 'F48FB1',
    token: 'constant.numeric'
  },
  {
    foreground: 'ae81ff',
    token: 'constant.language'
  },
  {
    foreground: 'ae81ff',
    token: 'constant.character'
  },
  {
    foreground: 'ae81ff',
    token: 'constant.other'
  },
  {
    foreground: 'f92672',
    token: 'keyword'
  },
  {
    foreground: 'f92672',
    token: 'storage'
  },
  {
    foreground: '66d9ef',
    fontStyle: 'italic',
    token: 'storage.type'
  }
];

/**
 * Liquid Colours
 */
const liquid: editor.ITokenThemeRule[] = [
  {
    // {% in {% tag %}
    foreground: 'FAFAFA',
    token: 'delimiter.liquid'
  },
  {
    // - in {%- or {{-
    foreground: 'E91E63',
    token: 'delimiter.whitespace.liquid'
  },
  {
    // tag in {% tag %}
    foreground: 'E91E63',
    token: 'tag.liquid'
  },
  {
    // true false nil
    foreground: 'FF80F4',
    token: 'boolean.liquid'
  },
  {
    foreground: 'FFAB40',
    token: 'keyword.parameter.liquid'
  },
  {
    // == in {% if x == %}
    foreground: 'E91E63',
    token: 'operator.liquid'
  },
  {
    foreground: '5CD7E0D5',
    token: 'keyword.filter.liquid'
  },
  {
    // object in {{ object.prop }}
    foreground: 'FAFAFA',
    token: 'tag.output.liquid'
  },
  {
    // object in {{ object.prop }}
    foreground: '81D4FA',
    token: 'keyword.object.liquid'
  }
];

/**
 * HTML Colours
 */
const html: editor.ITokenThemeRule[] = [
  {
    // div in <div class="xxx">
    foreground: 'FF93BC',
    token: 'tag.html'
  },
  {
    // < in <div>
    foreground: 'BECAFF',
    token: 'delimiter.html'
  },
  {
    // = in <div class="xxx">
    foreground: 'FF93BC',
    token: 'delimiter.equals.html'
  },
  {
    // class in <div class="xxx">
    foreground: '91EBC2',
    token: 'attribute.name.html'
  },
  {
    // "xxx" in <div class="xxx">
    foreground: 'FFF9A6',
    token: 'attribute.value.html'
  }
];

/**
 * CSS Colours
 */
const css: editor.ITokenThemeRule[] = [

];

/**
 * JSON Colours
 */
const json: editor.ITokenThemeRule[] = [

];

/**
 * JavaScript Colours
 */
const javascript: editor.ITokenThemeRule[] = [

];

const rules: editor.ITokenThemeRule[] = [
  ...shared,
  ...liquid,
  ...html,
  ...css,
  ...json,
  ...javascript
];

export const PotionTheme: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  colors: {
    'editor.background': '#0f1215',
    'editor.foreground': '#fafafa',
    'editor.selectionBackground': '#253B76',
    'editor.lineHighlightBackground': '#FFFFFF0F',
    'editorCursor.foreground': '#FFFFFFA6',
    'editorWhitespace.foreground': '#FFFFFF40',
    'editorHoverWidget.background': '#161616'
  },
  rules
};

export const PotionPreview: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  colors: {
    'editor.background': '#0e0e0e',
    'editor.foreground': '#fafafa',
    'editor.selectionBackground': '#253B76',
    'editor.lineHighlightBackground': '#FFFFFF0F',
    'editorCursor.foreground': '#FFFFFFA6',
    'editorWhitespace.foreground': '#FFFFFF40',
    'editorHoverWidget.background': '#161616'
  },
  rules
};
