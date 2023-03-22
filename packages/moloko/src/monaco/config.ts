import { PotionPreview, PotionTheme } from 'monaco/theme';
import { configuration, liquid } from 'monaco/liquid';
import * as monaco from 'monaco-editor';

/* -------------------------------------------- */
/* WORKERS                                      */
/* -------------------------------------------- */

self.MonacoEnvironment = {
  getWorkerUrl: (_, label) => {

    switch (label) {
      case 'json':

        return './dist/workers/json.js';

      case 'css':
      case 'scss':
      case 'less':

        return './dist/workers/css.js';

      case 'html':
      case 'xml':
      case 'liquid':

        return './dist/workers/html.js';

      case 'javascript':
      case 'typescript':
      case 'jsx':
      case 'tsx':

        return './dist/workers/typescript.js';

      default:

        return './dist/workers/editor.js';
    }
  }
};

/* -------------------------------------------- */
/* PRESETS                                      */
/* -------------------------------------------- */

monaco.languages.setMonarchTokensProvider('liquid', liquid);
monaco.languages.setLanguageConfiguration('liquid', configuration);

/* -------------------------------------------- */
/* METHODS                                      */
/* -------------------------------------------- */

/**
 * Monaco Defaults
 *
 * Assigns the `defaultValue` to Monaco and returns the `options`
 */
export function defaults (options: monaco.editor.IEditorOptions) {

  monaco.editor.defineTheme('potion-preview', PotionPreview);
  monaco.editor.defineTheme('potion', PotionTheme);
  monaco.editor.setTheme('potion');

  for (const option in options) {

    monaco.editor.EditorOptions[option].defaultValue = options[option];

  }

  return options;

}
