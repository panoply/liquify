import type { Options } from '@types';
import prettify from '@liquify/prettify';
import { Editor } from '@editor';
import { Footer } from '@footer';
import { attrs, basePath } from '@attrs';
import { paths, options } from '@store';
import { normal } from '@utils';
import * as ace from 'ace';
import * as hash from '@hash';
import m from 'mithril';

export { beautify, toggleViews as pane } from '@actions';

/* -------------------------------------------- */
/* PRESETS                                      */
/* -------------------------------------------- */

ace.config.set('useWorker', true);
ace.config.set('packaged', true);

prettify.format.after(() => {
  attrs.stats.prettifyTime = `Formatted&nbsp;in&nbsp;${prettify.format.stats.time}ms`;
  attrs.stats.languageName = prettify.format.stats.language;
  attrs.stats.characterLength = `${(prettify.format.stats.chars || 0).toLocaleString('en-US')} Characters`;
  attrs.stats.sizeOfFile = prettify.format.stats.size as any;
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

  for (const ext in paths.extensions) {
    paths.extensions[ext] = normal(path + paths.extensions[ext].slice(1));
  };

  for (const lang in paths.languages) {
    paths.languages[lang] = normal(path + paths.languages[lang].slice(1));
  };

  for (const theme in paths.themes) {
    paths.themes[theme] = normal(path + paths.themes[theme].slice(1));
  };

  for (const sample in paths.samples) {
    paths.samples[sample] = normal(path + paths.samples[sample].slice(1));
  };

  for (const worker in paths.workers) {
    paths.workers[worker] = normal(path + paths.workers[worker].slice(1));
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

  prettify.options({
    wrap: 80,
    indentSize: 2
  });

  prettify.format.after(() => {
    m.redraw();
    hash.encode();
  });

  prettify.options.listen((rules) => {
    attrs.editor.getEditor(attrs.idx).setPrintMarginColumn(rules.wrap);
    attrs.languageName = rules.languageName;
    hash.encode();
  });

  return config;

};

/**
 * Quickly checks if the editor session is
 * hashed and preloads any required modules.
 */
async function configure (opts: Options) {

  if (window.location.hash.charCodeAt(1) === 77 && window.location.hash.charCodeAt(2) === 61) {
    attrs.hash = window.location.hash.slice(3);
  } else {
    attrs.hash = null;
  }

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
      //  m(Tabs, attrs),
        m(Editor, attrs),
        // !config.allowSettings || m(Settings, attrs),
        m(Footer, attrs)
      ])
    ]
  });

  return attrs;

}
