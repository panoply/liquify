import m from 'mithril';
import { file, icon } from '@icons';
import { language, sample, paths } from '@store';
import { newMode } from '@actions';
import { ext, langmap as getlang } from '@utils';
import type { Attrs } from '@types';

const langmap = {
  text: 'Plain Text',
  html: 'HTML',
  liquid: 'Liquid + HTML',
  css: 'CSS',
  scss: 'SCSS',
  javascript: 'JavaScript',
  jsx: 'JSX',
  typescript: 'TypeScript',
  tsx: 'TSX',
  json: 'JSON',
  markdown: 'Markdown',
  xml: 'XML',
  yaml: 'YAML'
};

/* const getSamples = (attrs: Attrs) => {

  const x = (attrs.language === 'auto' || attrs.language === 'text')
    ? Object.entries(paths.samples)
    : Object.entries(paths.samples).filter(([ v ]) => extlang[attrs.language] === ext(v));

  return x.length === 0 ? Object.entries(paths.samples) : x;
}; */

export const Footer: m.Component<Attrs> = {
  view: ({ attrs }) => [
    attrs.selectLanguage ? m('div', {
      style: 'position: fixed; left: 201px; top: 0; right: 0; bottom: 0; z-index: 9999;',
      onclick: () => {
        setTimeout(() => {
          attrs.selectLanguage = !attrs.selectLanguage;
          m.redraw();
        }, 210);
      }
    }) : null,
    m(
      '.select-language',
      { class: attrs.selectLanguage ? 'close' : 'open' },
      m('ul',
        Object.entries(langmap).map(
          ([ lang, id ]) => m('li.language', {

            class: attrs.pane === 'preview'
              ? 'locked'
              : attrs.language === lang
                ? 'selected'
                : '',

            onclick: async () => {

              if (attrs.language !== lang) {

                const mode = await language(lang as any);
                attrs.language = lang as any;
                attrs.languageName = id;
                attrs.input.setMode(mode);
                attrs.output.setMode(mode);

                await newMode();

                setTimeout(() => {
                  attrs.selectLanguage = !attrs.selectLanguage;
                  m.redraw();
                }, 100);

              }

            }
          }, [
            file(lang as any),
            m('span', id)
          ])
        ))
    ),
    attrs.selectSample ? m('div', {
      style: 'position: fixed; left: 0; top: 0; right: 0; bottom: 0; z-index: 8888',
      onclick: () => {
        setTimeout(() => {
          attrs.selectSample = !attrs.selectSample;
          m.redraw();
        }, 210);
      }
    }) : null,
    m(
      '.select-sample',
      { class: attrs.selectSample ? 'close' : 'open' },
      m(
        'ul',
        Object.entries(paths.samples).map(([ name ]) => {

          return m('li.language', {

            class: attrs.sample === name
              ? 'selected'
              : '',

            onclick: async () => {

              if (attrs.sample !== name) {

                const content = await sample(name as any);
                const lang = getlang(ext(name));

                attrs.sample = name as any;

                if (typeof lang === 'string' && lang !== attrs.language) {
                  const mode = await language(lang as any);
                  attrs.language = lang as any;
                  attrs.languageName = langmap[lang];
                  attrs.input.setMode(mode);
                  attrs.output.setMode(mode);
                }
                attrs.input.setValue(`${content}`);
                attrs.selectSample = !attrs.selectSample;

              }

            }
          }, [
            file(getlang(ext(name)) as any),
            m('span', name)
          ]);
        })
      )
    ),
    m(
      '.potion_footer'
      , m(
        'footer'
        , {
          style: 'width: 50%; border-right: 0.01rem solid #666; display: inline-block;'
        }
        , m(
          'ul'
          , m('li.language-auto', {
            class: attrs.autoDetect ? 'active' : '',
            onclick: () => {
              attrs.autoDetect = !attrs.autoDetect;
            }
          }, attrs.autoDetect ? [
            icon('zap'),
            m('span.hover-above', 'Automatic language detect is enabled')
          ] : [
            icon('zapoff'),
            m('span.hover-above', 'Enable automatic language detection (not reccommended)')
          ])
          , m('li.language', {
            onclick: () => {
              attrs.selectLanguage = !attrs.selectLanguage;
            }
          }, [
            file(attrs.language as any),
            m('span', attrs.languageName),
            m('span.hover', '– Change the language mode')
          ])

          , m('li.samples', {
            onclick: () => {
              attrs.selectSample = !attrs.selectSample;
            }
          }, attrs.sample ? [
            m('span', attrs.sample),
            icon('code')
          ] : [
            m('span.hover', 'Use a code snippet sample –'),
            m('span', 'Code Samples'),
            icon('plus')
          ])
          , attrs.sample ? m('li.reload-sample', [
            m('span.hover', 'Reload the code sample'),
            icon('refresh')
          ]) : null

        )
      )
      , m(
        'footer'
        , {
          style: 'width: 50%; display: inline-block; position: absolute;'
        }

        , m(
          'ul'
          , m('li.prettify', m.trust(attrs.stats.prettifyTime))
          , m('li.file-size', attrs.stats.sizeOfFile)
          , m('li.chars', attrs.stats.characterLength)
        )
      )
    )
  ]
};
