import type { Attrs, Languages } from 'types';
import m from 'mithril';
import { file, icon } from 'editor/icons';
import { language } from 'store';
import { newMode } from 'actions';

export const Footer: m.Component<Attrs> = {
  view: (
    {
      attrs
    }
  ) => [
    attrs.selectLanguage ? m(
      'div'
      , {
        onclick: () => (
          attrs.selectLanguage = !attrs.selectLanguage
        )
        , style: {
          position: 'fixed',
          left: '201px',
          top: '0',
          right: '0',
          bottom: '0',
          zIndex: '9999'
        }
      }
    ) : null
    , m(
      '.select-language'
      , {
        class: attrs.selectLanguage
          ? 'close'
          : 'open'
      }
      , m(
        'ul'
        , [
          [ 'text', 'Plain Text' ],
          [ 'html', 'HTML' ],
          [ 'liquid', 'Liquid + HTML' ],
          [ 'css', 'CSS' ],
          [ 'scss', 'SCSS' ],
          [ 'javascript', 'JavaScript' ],
          [ 'jsx', 'JSX' ],
          [ 'typescript', 'TypeScript' ],
          [ 'tsx', 'TSX' ],
          [ 'json', 'JSON' ],
          [ 'markdown', 'Markdown' ],
          [ 'xml', 'XML' ],
          [ 'yaml', 'YAML' ]
        ].map((
          [
            lang,
            name
          ]: [
            Languages,
            string
          ]
        ) => m(
          'li.language'
          , {
            class: attrs.pane === 'preview'
              ? 'locked'
              : attrs.language === lang
                ? 'selected'
                : ''
            , onclick: async () => {

              if (attrs.language !== lang) {

                const mode = await language(lang);

                attrs.language = lang;
                attrs.languageName = name;
                attrs.input.setMode(mode);
                attrs.output.setMode(mode);

                await newMode();

                attrs.selectLanguage = !attrs.selectLanguage;

              }

            }
          }
          , [
            file(lang)
            , m('span', name)
          ]
        ))
      )
    ),
    m(
      '.potion_footer'
      , m(
        'footer'
        , {
          style: {
            width: '50%',
            display: 'inline-block',
            'border-right': '0.01rem solid #666'
          }
        }
        , m(
          'ul'
          , m(
            'li.language-auto'
            , {
              class: attrs.autoDetect ? 'active' : ''
              , onclick: () => (
                attrs.autoDetect = !attrs.autoDetect
              )
            }
            , attrs.autoDetect ? [
              icon('zap')
              , m(
                'span.hover-above'
                , 'Automatic language detect is enabled'
              )
            ] : [
              icon('zapoff')
              , m(
                'span.hover-above'
                , 'Enable automatic language detection (not reccommended)'
              )
            ]
          )
          , m(
            'li.language'
            , {
              onclick: () => (
                attrs.selectLanguage = !attrs.selectLanguage
              )
            }
            , [
              file(attrs.language)
              , m('span', attrs.languageName)
              , m(
                'span.hover'
                , '– Change the language mode'
              )
            ]
          )
        )
      )
      , m(
        'footer'
        , {
          style: {
            width: '50%',
            display: 'inline-block',
            position: 'absolute'
          }
        }
        , m(
          'ul'
          , m('li.prettify', m.trust(attrs.stats.estheticTime))
          , m('li.chars', attrs.stats.characterLength)
        )
      )
    )
  ]
};
