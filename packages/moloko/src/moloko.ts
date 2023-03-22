import type { IOptions } from 'types';
import esthetic from 'esthetic';
import * as hash from 'editor/hash';
import { attrs, config } from 'attrs';
import m from 'mithril';
import b from 'bss';
import { Sidebar } from 'src/components/sidebar';
import { Footer } from 'src/components/footer';
import { getEditor, getRules } from 'monaco/models';
import { defaults } from 'monaco/config';
import { Input } from 'editor/input';
import { Rules } from 'editor/rules';

esthetic.config({
  logColors: false
});

/* -------------------------------------------- */
/* INITIALIZE                                   */
/* -------------------------------------------- */

/**
 * Quickly checks if the editor session is
 * hashed and preloads any required modules.
 */
function configure (options: IOptions) {

  if (options.hash) {
    if (window.location.hash.charCodeAt(1) === 77 && window.location.hash.charCodeAt(2) === 61) {
      attrs.hash = window.location.hash.slice(3);
    }
  } else {
    attrs.hash = null;
  }

  if (attrs.hash) {

    const text = hash.decode(attrs.hash);

    if (text.input.length > 0) {
      for (const file of text.input) {

        attrs.model.input.push({
          language: file.language,
          languageName: file.languageName,
          order: file.order,
          uri: file.uri,
          model: getEditor(file.language, file.model)
        });

      }
    }

    attrs.idx = text.idx;
    attrs.detectLanguage = text.detectLanguage;
    attrs.languagesOpen = text.languagesOpen;
    attrs.rulesOpen = text.rulesOpen;
    attrs.previewMode = text.previewMode;
    attrs.previewOpen = text.previewOpen;
    attrs.rulesOpen = text.rulesOpen;

    attrs.model.rules = getRules(text.rules);

    esthetic.rules(text.rules);

  } else {

    esthetic.rules({ language: options.language });

    attrs.model.rules = getRules(attrs.rules);
    attrs.input = {
      model: getEditor(options.language, options.input),
      language: options.language,
      languageName: options.language,
      order: 0,
      uri: `file.${options.language}`
    };

  }

};

/**
 * Moloko Initialize
 */
export async function mount (element: HTMLElement, options: IOptions = {}) {

  if ('monaco' in options) Object.assign(config.monaco, options.monaco);
  if ('sidebar' in options) Object.assign(config.sidebar, options.sidebar);
  if ('footer' in options) Object.assign(config.footer, options.footer);
  if ('colors' in options) Object.assign(config.colors, options.colors);

  Object.assign(config, options);

  defaults(config.monaco);
  configure(config);

  document.body.style.backgroundColor = config.colors.background;
  document.body.style.overflow = 'hidden';

  m.mount(element, {
    oncreate: ({ dom }) => {
      dom.parentElement.style.width = `${dom.clientWidth}px`;
      dom.parentElement.style.height = `${dom.clientHeight}px`;
      dom.parentElement.style.overflow = 'hidden';
    },
    view: () => m('section', [
      config.sidebar.enable ? m(Sidebar, attrs) : null,
      m(
        'div' + b(
          {
            position: 'absolute',
            display: 'block',
            width: '100%',
            right: '0',
            top: `${config.offset}px`,
            overflow: 'hidden',
            left: `${config.sidebar.width + 1}px`,
            bottom: config.footer.enable ? `${config.footer.height - 1}px` : '0'
          }
        )
        , m('div' + b(
          {
            position: 'relative',
            display: 'block',
            height: '100%',
            width: '100%',
            overflow: 'hidden'
          }
        ),
        [
          attrs.rulesOpen ? m(
            '#rules' + b(
              {
                width: '40%',
                position: 'absolute',
                height: '100%',
                left: '0',
                top: '0',
                bottom: '0',
                right: '60%'
              }
            )
            , m(Rules, attrs)
          ) : null
          ,
          m(
            '#input' + b(
              {
                height: '100%',
                position: 'absolute',
                top: '0',
                bottom: '0',
                right: '0',
                width: attrs.rulesOpen && attrs.previewOpen === false ? '40%' : attrs.previewOpen ? '50%' : '100%',
                left: attrs.rulesOpen && attrs.previewOpen === false ? '40%' : '0',
                display: attrs.rulesOpen && attrs.previewOpen
                  ? 'none'
                  : ''
              }
            )
            ,
            m(Input, attrs)
          ),
          attrs.previewOpen ? m(
            '#preview' + b(
              {
                height: '100%',
                position: 'absolute',
                top: '0',
                bottom: '0',
                right: '0',
                width: attrs.rulesOpen ? '60%' : '50%',
                left: attrs.rulesOpen ? '40%' : '50%',
                overflow: 'scroll',
                scrollBehavior: 'smooth',
                borderLeft: '0.01rem solid #2f3539',
                padding: '25px 10px',
                backgroundColor: config.colors.background
              }
            )
            , m(
              `pre.potion[data-lang="text/${attrs.input.language}"]`
              , {
                style: {
                  fontFamily: '"Courier New", Monaco, Menlo, Monaco, "Courier New", monospace',
                  fontWeight: 'normal',
                  fontSize: '16px',
                  fontFeatureSettings: '"liga" 0, "calt" 0',
                  fontVariationSettings: 'normal',
                  lineHeight: '19px',
                  letterSpacing: '0px',
                  backgroundColor: config.colors.background,
                  marginTop: '0',
                  marginBottom: '0'
                },

                oncreate: ({ dom }) => {

                  attrs.editor.input.onDidScrollChange(event => {
                    dom.parentElement.scroll({
                      behavior: 'smooth',
                      top: event.scrollTop,
                      left: event.scrollLeft
                    });
                  });

                }
              }
              , m.trust(attrs.editor.diff)
            )
          ) : null
        ])
      )
      , config.footer.enable ? m(Footer, attrs) : null
    ])

  });

  return attrs;

}
