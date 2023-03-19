import type { Options } from 'types';
import esthetic from 'esthetic';
import { Editor } from 'editor/editor';
import { Footer } from 'editor/footer';
import { attrs, basePath } from 'attrs';
import { paths, options } from 'store';
import { normal } from 'utils';
import m from 'mithril';
import ace from 'ace';
import { Rules } from 'editor/rules';
import tools from 'ace/language-tools';

export { format, pane } from 'actions';

/* -------------------------------------------- */
/* PRESETS                                      */
/* -------------------------------------------- */

ace.config.set('useWorker', false);
ace.config.set('packaged', true);
ace.config.setModuleUrl('ace/ext/language_tools', tools);
ace.config.loadModule('ace/ext/language_tools');

esthetic.config({
  logColors: false
}).on('format', function ({ stats }) {
  attrs.stats.estheticTime = `Formatted&nbsp;in&nbsp;${esthetic.stats.time}`;
  attrs.stats.languageName = stats.language;
  attrs.stats.characterLength = `${(stats.chars || 0).toLocaleString('en-US')} Characters`;
});

export function state () {

  return attrs;
}

/* -------------------------------------------- */
/* INITIALIZE                                   */
/* -------------------------------------------- */

/**
 * Sets the module path location for the
 * project so ESM modules can digested.
 */
function locations (path: string) {

  for (const lang in paths.languages) {
    paths.languages[lang] = normal(path + paths.languages[lang].slice(1));
  };

  for (const theme in paths.themes) {
    paths.themes[theme] = normal(path + paths.themes[theme].slice(1));
  };

};

/**
 * Editor settings merging.
 */
async function settings (opts: Options): Promise<Options> {

  const config: Options = Object.assign(options, opts);

  if (config.basePath !== basePath) locations(config.basePath);

  ace.config.set('basePath', config.basePath);
  ace.config.set('modePath', normal(`${config.basePath}/languages`));
  ace.config.set('themePath', normal(`${config.basePath}/themes`));
  ace.config.set('workerPath', normal(`${config.basePath}/package`));

  await import(paths.themes[config.theme]);

  esthetic.rules({
    wrap: 80,
    indentSize: 2
  });

  // esthetic.on('format', function () {
  //   m.redraw();
  //   hash.encode();
  // });

  // esthetic.on('rules', (rules) => {
  //   attrs.editor.getEditor(attrs.idx).setPrintMarginColumn(rules.wrap);
  //   attrs.languageName = rules.languageName;
  //   hash.encode();
  // });

  return config;

};

/**
 * Quickly checks if the editor session is
 * hashed and preloads any required modules.
 */
async function configure (opts: Options) {

  // if (window.location.hash.charCodeAt(1) === 77 && window.location.hash.charCodeAt(2) === 61) {
  //   attrs.hash = window.location.hash.slice(3);
  // } else {
  //   attrs.hash = null;
  // }

  return settings(opts);

};

/**
 * Moloko Initialize
 */
export async function mount (element: Element, opts: Options = {}) {

  await configure(opts);

  m.mount(element, {
    view: () => [
      m('section.moloko-editor', [
        m(Rules, attrs),
        m(Editor, attrs)
        // m(Footer, attrs)
      ])
    ]
  });

  return attrs;

}
