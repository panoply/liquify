import m from 'mithril';
import * as ace from 'ace';
import type { Attrs, Ace } from '@types';
import { icon } from '@icons';
import { langmap, ghissue } from '@utils';
import { language, options } from '@store';

export const Tabs: m.ClosureComponent<Attrs> = ({ attrs }) => {

  let create = -1;
  let lastopen = 0;
  let filename = null;
  let langname = null;

  /**
   * Creates a new editor session
   */
  const createSession = (file: Attrs['files'][0]) => {

    create = -1;

    language().then((mode) => {

      attrs.files.push({
        filename,
        language: langname,
        session: ace.createEditSession('', mode)
      });

      m.redraw();

    });
  };

  /**
   * Restores an editor session
   */
  const restoreSession = (file: Attrs['files'][0]) => {

    create = -1;

    attrs.active = lastopen;

    attrs.editor.setSession(file.session, attrs.idx);
    attrs.editor.focus();

    m.redraw();

  };

  return {

    view: () => [
      m(
        'nav.potion_tabs'
        , m(
          'ul'
          , attrs.files.map((item, index) => m(
            'li'

            // CREATE NEW FILE
            //
            , create > -1 ? m(
              '.tab_item.new'
              , m(
                'input[type="text"]'
                , {
                  oncreate: ({ dom }) => {

                    (dom as HTMLInputElement).focus();

                  },
                  onkeydown: ({ keyCode }) => {

                    if (keyCode === 27 && create > -1) {
                      restoreSession(item);
                    } else if (keyCode === 13 && create === 1) {
                      createSession(item);
                    }

                  },
                  onfocusout: () => {

                    if (create === 1) createSession(item);

                  },
                  oninput: ({ target }) => {

                    if (create === 1 && target.value[target.value.length - 1] === '.') {

                      create = 0;

                      filename = target.value;
                      langname = null;

                    } else {

                      const language = target.value.slice(target.value.lastIndexOf('.'));
                      const extmap = langmap(language);

                      if (extmap) {

                        create = 1;

                        filename = target.value;
                        langname = extmap;

                        attrs.response = '<strong>Great stuff!</strong>, hit the return key or press the checkmark.';

                      } else if (target.value.indexOf('.') > -1 && language.length > 1) {

                        attrs.response = `Moloko does not support the file extension <strong>${language}</strong>`;

                      }
                    }
                  }
                }
              )

            // CURRENT FILES
            //
            ) : m(
              'button.tab_item'
              , {
                class: attrs.active === index ? 'active' : ''
                , ondblclick: () => {

                  // TODO

                }
                , onclick: () => {

                  if (create === 0 && attrs.active !== index) {

                    restoreSession(item);

                  } else {

                    lastopen = attrs.active;
                    attrs.active = index;
                    attrs.editor.setSession(item.session, attrs.idx);
                    attrs.editor.focus();

                  }
                }
              }

              // DELETE FILE
              //
              , [
                m('span', item.filename)
                , attrs.files.length > 1
                  ? m(
                    'span.delete'
                    , {
                      onclick: () => {
                        attrs.active = lastopen;
                        attrs.files.splice(index, 1);
                      }
                    }
                    , icon('cross')
                  ) : null
              ]
            )
          ))

          // ADD NEW FILE BUTTON
          //
          , m(
            'li'
            , m(
              'button.tab_item.add'
              , {
                onclick: () => {

                  if (create >= 1) {

                    m.redraw();

                  } else if (create === 0) {

                    restoreSession(attrs.files[attrs.active]);

                  } else if (create === -1) {

                    create = 0;
                    lastopen = attrs.active;
                    attrs.active = attrs.files.length;

                    attrs.response = 'Enter a filename with extension and press the return key to create a new file.';
                  }
                }
              }
              , create >= 0 ? create >= 1 ? icon('check') : icon('cross') : icon('plus')
            )
          )
        )

      )
      , create >= 0 && create !== 3
        ? m(
          '.newfile_overlay'
          , [
            m('p', m.trust(attrs.response)),
            options.components.newFile
              ? m(options.components.newFile, attrs)
              : null
          ]
        )
        : null
    ]

  };
};
