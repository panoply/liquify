import { IActions, IAttrs, ISidebar } from 'types';
import m from 'mithril';
import b from 'bss';
import { file, icon } from './icons';
import { config } from 'attrs';
import esthetic from 'esthetic';
import * as monaco from 'monaco-editor';

export function ghissue (options = {}) {

  const url = new URL('https://github.com/panoply/esthetic/issues/new');

  const types = [
    'body',
    'title',
    'labels',
    'template',
    'milestone',
    'assignee',
    'projects'
  ];

  for (const type of types) {

    let value = options[type];

    if (value === undefined) continue;

    if (type === 'labels' || type === 'projects') {
      if (!Array.isArray(value)) throw new TypeError(`The \`${type}\` option should be an array`);
      value = value.join(',');
    }

    url.searchParams.set(type, value);

  }

  return url.toString();
}

export const Sidebar: m.ClosureComponent<IAttrs> = ({ attrs }) => {

  /* -------------------------------------------- */
  /* CONSTANTS                                    */
  /* -------------------------------------------- */

  const actions = Object.entries(config.sidebar.actions);

  /* -------------------------------------------- */
  /* STYLES                                       */
  /* -------------------------------------------- */

  const button = b({
    background: 'transparent',
    margin: '20px auto',
    border: 'none',
    color: '#fafafa',
    ':hover': {
      color: config.colors.accents,
      cursor: 'pointer'
    }
  });

  return {
    view: () => m(
      'div' + b(
        {
          width: `${config.sidebar.width}`,
          height: '100%',
          position: 'absolute',
          left: '0',
          top: `${config.offset}px`,
          bottom: '0',
          display: 'flex',
          background: config.sidebar.background,
          borderRight: `0.01rem solid ${config.colors.borders}`,
          flexWrap: 'wrap',
          flexDirection: 'column'
        }
      )
      , m(
        'button[type="button"]' + button
        , {

          onclick: () => {}
        }
        , file(attrs.input.language)
      )
      , actions.map(([ key, action ]: [keyof ISidebar['actions'], IActions ]) => (
        m(
          'button[type="button"]' + button
          , {
            onclick: async () => {

              if (key === 'file') {
                config.sidebar.actions.rules.active = false;
                attrs.rulesOpen = false;
              } else if (key === 'rules') {
                if (action.active) {
                  action.active = false;
                  attrs.rulesOpen = false;
                } else {
                  action.active = true;
                  attrs.rulesOpen = true;
                }
              } else if (key === 'preview') {
                if (action.active) {
                  action.active = false;
                  attrs.previewOpen = false;
                } else {

                  action.active = true;
                  attrs.previewOpen = true;

                  const value = attrs.input.model.getValue();
                  const text = esthetic.format(value);
                  attrs.editor.diff = await monaco.editor.colorize(text, attrs.input.language, {});

                }
              }

            },
            style: {
              color: action.active ? config.colors.accents : ''
            }
          }
          , icon(action.icon)
        )
      ))
    )
  };
};
