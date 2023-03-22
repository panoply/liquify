import type { IAttrs } from 'types';
import type { LanguageName, LanguageOfficialName } from 'esthetic';
import m from 'mithril';
import b from 'bss';
import { file, icon } from 'src/components/icons';
import { config } from 'attrs';

export const Footer: m.Component<IAttrs> = {
  view: (
    {
      attrs
    }
  ) => [
    attrs.languagesOpen ? m(
      'div'
      , {
        onclick: () => (
          attrs.languagesOpen = !attrs.languagesOpen
        )
      }
    ) : null
    // , m(
    //   '.select-language' + b({ display: 'none' })
    //   , {
    //     class: attrs.languagesOpen
    //       ? 'close'
    //       : 'open'
    //   }
    //   , m(
    //     'ul'
    //     , [
    //       [ 'text', 'Plain Text' ],
    //       [ 'html', 'HTML' ],
    //       [ 'liquid', 'Liquid + HTML' ],
    //       [ 'css', 'CSS' ],
    //       [ 'scss', 'SCSS' ],
    //       [ 'javascript', 'JavaScript' ],
    //       [ 'jsx', 'JSX' ],
    //       [ 'typescript', 'TypeScript' ],
    //       [ 'tsx', 'TSX' ],
    //       [ 'json', 'JSON' ],
    //       [ 'markdown', 'Markdown' ],
    //       [ 'xml', 'XML' ],
    //       [ 'yaml', 'YAML' ]
    //     ].map((
    //       [
    //         lang,
    //         name
    //       ]: [
    //         LanguageName,
    //         LanguageOfficialName
    //       ]
    //     ) => m(
    //       'li.language'
    //       , {
    //         class: attrs.input.language === lang
    //           ? 'selected'
    //           : ''
    //         , onclick: () => {

    //           if (attrs.input.language !== lang) {
    //             attrs.input.language = lang;
    //             attrs.input.languageName = name;
    //             attrs.languagesOpen = !attrs.languagesOpen;
    //           }

    //         }
    //       }
    //       , [
    //         file(lang)
    //         , m('span', name)
    //       ]
    //     ))
    //   )
    // )
    , m(
      'footer' + b(
        {
          position: 'absolute',
          display: 'flex',
          right: '0',
          bottom: '0',
          left: `${config.sidebar.width + 1}px`,
          height: `${config.footer.height}px`,
          width: '100%',
          background: config.colors.background,
          borderTop: `0.01rem solid ${config.colors.borders}`,
          backdropFilter: 'blur(7.7px)'

        }
      )
      , m(
        'ul' + b(
          {
            display: 'flex',
            margin: 0,
            listStyleType: 'none',
            color: '#f1f1f1',
            fontFamily: 'system-ui',
            fontWeight: '200',
            fontSize: '.80rem',
            alignItems: 'center',
            paddingLeft: '24px'
          }
        )
        , m(
          'li' + b(
            {
              cursor: 'pointer',
              color: attrs.detectLanguage ? '#56c356' : 'gray',
              ':hover': {
                color: attrs.detectLanguage ? 'gray' : '#56c356'
              }
            }
          )
          , {
            onclick: () => (
              attrs.detectLanguage = !attrs.detectLanguage
            )
          }
          , attrs.detectLanguage ? [
            icon('detect', '18px')
            // , m('span.hover-above', 'Automatic language detect is enabled')
          ] : [
            icon('detectoff', '18px')
            // , m('span.hover-above', 'Enable automatic language detection')
          ]
        )
        , m(
          'li'
          , {
            onclick: () => (
              attrs.languagesOpen = !attrs.languagesOpen
            )
          }
          , [
            file(attrs.input.language)
            , m('span' + b(
              {
                marginLeft: '15px',
                textTransform: 'uppercase',
                letterSpacing: '0.07rem',
                fontWeight: '400',
                fontSize: '0.7rem'
              }
            ), attrs.input.languageName)
            //, m('span', '– Change the language mode')
          ]
        )
      )
    )
  ]
};
