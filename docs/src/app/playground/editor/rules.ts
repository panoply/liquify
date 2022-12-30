import type { Definition, LexerNames } from '@liquify/prettify';
import type { Attrs } from '../model/types';
import m from 'mithril';
import moloko from '@liquify/moloko';
import prettify from '@liquify/prettify';
import relapse from 'relapse';
import { entries, keys } from '../../utilities/native';
import { object } from '../../utilities/helpers';

/* -------------------------------------------- */
/* TYPINGS                                      */
/* -------------------------------------------- */

/**
 * Generated Rules
 */
type Rule = Definition & { rule: string; }

/**
 * Generated dataset
 */
interface Generate {
  /**
   * Global formatting rules
   */
  global: Rule[];
  /**
   * Liquid specific rules
   */
  liquid: Rule[],
  /**
   * Markup specific rules
   */
  markup: Rule[],
  /**
   * Style specific rules
   */
  style: Rule[],
  /**
   * Script specific rules
   */
  script: Rule[],
  /**
   * JSON specific rules
   */
  json: Rule[]
}

/* -------------------------------------------- */
/* UTILITIES                                    */
/* -------------------------------------------- */

/**
 * Generate Rules
 *
 * This a reducer function which constructs an options mapping
 * categorization of formatting rule definitions.
 */

function generate (acc: Generate, [ rule, options ]) {

  if ((
    rule === 'language' ||
    rule === 'lexer' ||
    rule === 'mode' ||
    rule === 'languageDefault'
  )) return acc;

  if (options.lexer === 'all') {
    if (rule === 'quoteConvert') {

      acc.liquid.push({ ...options, rule, lexer: 'markup', language: 'liquid' });
      acc.markup.push({ ...options, rule, lexer: 'markup' });
      acc.script.push({ ...options, rule, lexer: 'style' });
      acc.style.push({ ...options, rule, lexer: 'script' });

    } else if (rule === 'correct') {
      acc.markup.push({ ...options, rule, lexer: 'markup' });
      acc.script.push({ ...options, rule, lexer: 'style' });
      acc.style.push({ ...options, rule, lexer: 'script' });
      acc.json.push({ ...options, rule, lexer: 'script', language: 'json' });
    } else {
      acc.global.push({ ...options, rule, lexer: 'global' });
    }
  } else if (options.lexer === 'markup') {

    if (
      rule === 'commentIndent' ||
      rule === 'commentNewline' ||
      rule === 'correct' ||
      rule === 'preserveComment'
    ) {

      acc.liquid.push({ ...options, rule, lexer: 'markup' });
      acc.markup.push({ ...options, rule, lexer: 'markup' });

    } else if (
      rule === 'delimiterTrims' ||
      rule === 'ignoreTagList' ||
      rule === 'lineBreakSeparator' ||
      rule === 'normalizeSpacing' ||
      rule === 'valueForce'
    ) {

      acc.liquid.push({ ...options, rule, lexer: 'markup' });

    } else {

      acc.markup.push({ ...options, rule, lexer: 'markup' });
    }

  } else if (options.lexer === 'style') {

    acc.style.push({ ...options, rule, lexer: 'style' });

  } else if (options.lexer === 'script') {

    acc.script.push({ ...options, rule, lexer: 'script' });

    if (
      rule === 'bracePadding' ||
      rule === 'objectSort' ||
      rule === 'objectIndent' ||
      rule === 'arrayFormat') {
      acc.json.push({ ...options, rule, lexer: 'script', language: 'json' });
    }
  }

  return acc;

}

/* -------------------------------------------- */
/* COMPONENT                                    */
/* -------------------------------------------- */

/**
 * Rules Sidebar
 *
 * Formatting rules component. This will render the format
 * rulesets to the side of the playground. State is maintained
 * using a meiosis.js variation pattern.
 */
export const Rules: m.ClosureComponent<Attrs> = ({ attrs: { s, a } }) => {

  /* -------------------------------------------- */
  /* DATASET                                      */
  /* -------------------------------------------- */

  /**
   * Accumulator dataset record. The object will be
   * passed to the reducer generator. We live in a society,
   * we are not animals and as such we don't use the prototype.
   */
  const data = object<Generate>({
    global: []
    , liquid: []
    , markup: []
    , script: []
    , style: []
    , json: []
  });

  /**
   * Composes a workable data list of formatting rules
   * from the `definitions` named export or Prettify.
   */
  const defs = entries(prettify.definitions).reduce(generate, data);

  /* -------------------------------------------- */
  /* BEGIN                                        */
  /* -------------------------------------------- */

  /**
   * Holds input value entered in `array()`
   */
  let input: string;

  /**
   * Boolean Type Options
   *
   * The function returns virtual nodes for type `boolean` rule
   * defintions. State is updated `onclick`
   */
  function boolean (lexer: LexerNames, option: Rule) {

    const rule: boolean = s.rules[lexer][option.rule];

    return [
      m(
        'button.boolean.btn.d-flex.jc-start.w-100'
        , {
          class: rule ? 'enabled' : ''
          , onclick: () => {
            s.rules[lexer][option.rule] = !rule;
            return a.format(s.rules);
          }
        }
        , m(
          'svg.icon'
          , m(`use[xlink:href="#svg-${rule ? 'checked' : 'unchecked'}"]`)
        ),
        m(
          'code.fc-white.fs-sm.ml-3'
          , option.rule
        )
        , m(
          'code.code-badge.ml-auto'
          , JSON.stringify(rule)
        )
      ),
      m(
        'p.fs-xs.px-3.fc-gray.mt-0'
        , option.description
      )
    ];

  };

  /**
   * String Type Options
   *
   * The function returns virtual nodes for type `string` rule
   * defintions. State is updated `oninput`
   */
  function string (lexer: LexerNames, option: Definition & { rule: string }) {

    const value: string = s.rules[lexer][option.rule];

    return [
      m(
        '.string.d-flex.jc-start.w-100'
        , m(
          'input.input'
          , {
            value
            , oninput: (
              {
                target
              }: {
                target: HTMLInputElement
              }
            ) => {
              s.rules[lexer][option.rule] = target.value;
              a.format(s.rules);
            }
          }
        )
        , m(
          'code.fc-white.fs-sm.ml-3'
          , option.rule
        )
        , m(
          'code.code-badge.ml-auto'
          , JSON.stringify(value)
        )
      ),
      m(
        'p.fs-xs.px-3.fc-gray.mt-0'
        , option.description
      )
    ];

  };

  /**
   * Array Type Options
   *
   * The function returns virtual nodes for type `string[]` rule
   * defintions. These rules accept a string list of customer
   * defined options. State is updated `onclick`
   */
  function array (lexer: LexerNames, option: Rule) {

    const list: string[] = s.rules[lexer][option.rule];

    return m('.array', [
      m(
        '.d-flex.jc-start.w-100.mb-3'
        , m(
          'svg.icon.ml-1'
          , m('use[xlink:href="#svg-corner-left"]')
        )
        , m(
          'code.fc-white.fs-sm.ml-3'
          , option.rule
        )
        , m(
          'code.code-badge.ml-auto'
          , JSON.stringify(list.length === 0 ? list : `string[${list.length}]`)
        )
      )
      , list.map((item: string, count: number) => m(
        '.d-flex.ml-2.mb-1.array-item'
        , m(
          '.fs-sm.ff-code.d-inline.mr-2'
          , `${count}`
        )
        , m(
          'code.d-inline.ml-3.fc-white.code'
          , item
        )
        , m(
          'button.btn-remove',
          {
            onclick: () => {
              list.splice(count, 1);
              s.rules[lexer][option.rule] = list;
              return a.format(s.rules);
            }
          }
          , m('svg.icon', m('use[xlink:href="#svg-cross"]'))
        )
      ))
      , m(
        '.d-block.btn-add'
        , m(
          '.ml-2.d-inline.next-no.fs-sm.ff-code'
          , `${s.rules[lexer][option.rule].length}`
        )
        , m(
          'input.input'
          , {
            placeholder: 'Value...'
            , value: input
            , oninput: ({ target: { value } }) => {
              input = value;
            }
            , onkeydown: ({ keyCode, target }) => {
              if (keyCode === 27) {
                target.value = '';
              } else if (keyCode === 13 && !list.includes(input) && input.length > 0) {
                list.push(input);
                input = '';
                s.rules[lexer][option.rule] = list;
                return a.format(s.rules);
              }
            }
          }
        )
        , m(
          'button.button'
          , {
            type: 'button',
            disabled: !input,
            onclick: () => {
              if (input && input.length > 0 && !list.includes(input)) {
                list.push(input);
                input = '';
                s.rules[lexer][option.rule] = list;
                return a.format(s.rules);
              }
            }
          }
          , m('svg.icon', m('use[xlink:href="#svg-plus"]'))
        )
      )
      , m(
        'p.fs-xs.fc-gray.mt-3'
        , option.description
      )
    ]);

  };

  /**
   * Select Type Options
   *
   * The function returns virtual nodes for type `select` rule
   * defintions. These rules use a pre-defined set of options.
   * The definitions expose the accepted values as an array and
   * each option is rendered as a radio-list.
   */
  function select (lexer: LexerNames, option: Rule) {

    /**
     * Maintains a reference to the selected rule
     */
    const selected: string = s.rules[lexer][option.rule];

    return [
      m(
        '.select.d-flex.jc-start.w-100'
        , m(
          'svg.icon.ml-1'
          , m('use[xlink:href="#svg-corner-left"]')
        )
        , m(
          'code.fc-white.fs-sm.ml-3'
          , option.rule
        )
        , m(
          'code.code-badge.ml-auto'
          , JSON.stringify(selected)
        )
      )
      , m(
        'p.fs-xs.px-3.fc-gray.mt-2'
        , option.description
      )
      , option.values.map(value => {

        const enabled = value.rule === selected;

        return [
          m(
            'button.boolean.btn.d-flex.jc-start.w-100'
            , {
              class: enabled ? 'enabled' : ''
              , onclick: () => {
                s.rules[lexer][option.rule] = value.rule;
                return a.format(s.rules);
              }

            }
            , m(
              'svg.icon'
              , m(`use[xlink:href="#svg-${enabled ? 'checked' : 'unchecked'}"]`)
            )
            , m(
              'code.fc-white.fs-sm.mx-3'
              , value.rule
            )
          )
          , m(
            'p.fs-xs.fc-gray.d.block.mx-3'
            , value.description
          )
        ];
      })

    ];

  };

  /**
   * Number Type Options
   *
   * The function returns virtual nodes for type `number` rule
   * defintions. State is updated `oninput`
   */
  function number (lexer: LexerNames, option: Rule) {

    const value: number = s.rules[lexer][option.rule];

    return [
      m(
        '.number.d-flex.jc-start.w-100'
        , m(
          'input.input'
          , {
            value
            , type: 'number'
            , min: -1
            , oninput: ({
              target
            }: {
              target: HTMLInputElement
            }) => {
              s.rules[lexer][option.rule] = Number(target.value);
              return a.format(s.rules);
            }
          }
        )
        , m(
          'code.fc-white.fs-sm.ml-3'
          , option.rule
        )
        , m(
          'code.code-badge.ml-auto'
          , JSON.stringify(value)
        )
      )
      , m(
        'p.fs-xs.px-3.fc-gray.mt-0'
        , option.description
      )
    ];

  };

  /**
   * Multi Type Option
   *
   * The function returns virtual nodes for a multitype
   * option definition, like (for example) `forceAttribute`
   * which accepts either a _boolean_ or _number_.
   */
  function multitype (lexer: LexerNames, option: Rule) {

    /**
     * Maintains a reference to the selected rule
     */
    let selected: number | boolean = s.rules[lexer][option.rule];

    return [
      m(
        '.select.d-flex.jc-start.w-100'
        , m(
          'svg.icon.ml-1'
          , m('use[xlink:href="#svg-corner-left"]')
        )
        , m(
          'code.fc-white.fs-sm.ml-3'
          , option.rule
        )
        , m(
          'code.code-badge.ml-auto'
          , JSON.stringify(selected)
        )
      )
      , m(
        'p.fs-xs.px-3.fc-gray.mt-2'
        , option.description
      )
      , Array.isArray(option.type) ? option.type.map((value, i) => {

        const rule = option.multi[value];
        const or = i > 0 ? m('span.stripe', 'OR') : null;

        if (value === 'number') {
          return [
            or,
            m(
              '.number.d-flex.jc-start.w-100'
              , m(
                'input.input'
                , {
                  value: typeof selected === 'boolean' ? '' : selected
                  , type: 'number'
                  , min: 1
                  , oninput: ({
                    target
                  }: {
                    target: HTMLInputElement
                  }) => {

                    selected = Number(target.value);
                    s.rules[lexer][option.rule] = selected;

                    return a.format(s.rules);
                  }
                }
              )
              , m(
                'code.fc-white.fs-sm.ml-3'
                , value
              )
            )
            , m(
              'p.fs-xs.px-3.fc-gray.mt-0'
              , rule.description
            )
          ];
        } else if (value === 'boolean') {

          return [
            or,
            m(
              'button.boolean.btn.d-flex.jc-start.w-100'
              , {
                class: (
                  typeof option.default === 'boolean' &&
                  typeof selected === 'boolean' &&
                  selected
                ) ? 'enabled'
                  : ''
                , onclick: () => {

                  s.rules[lexer][option.rule] = !selected;

                  return a.format(s.rules);
                }

              }
              , m(
                'svg.icon'
                , m(`use[xlink:href="#svg-${(
                  typeof selected === 'boolean' &&
                  selected
                ) ? 'checked'
                  : 'unchecked'}"]`)
              )
              , m(
                'code.fc-white.fs-sm.mx-3'
                , value
              )
            )
            , m(
              'p.fs-xs.fc-gray.d.block.mx-3'
              , rule.description
            )
          ];

        }

        return null;

      }) : null

    ];
  }

  /**
   * Type Dispatch
   *
   * This function determines the option type are will pass
   * the defintion onto the appropriate vnode function.
   */
  function types (lexer: LexerNames, option: Rule) {

    if (
      option.rule === 'delimiterTrims' ||
      option.rule === 'ignoreTagList' ||
      option.rule === 'lineBreakSeparator' ||
      option.rule === 'normalizeSpacing' ||
      option.rule === 'valueForce') {

      lexer = 'liquid';

    }

    if (Array.isArray(option.type)) {
      return multitype(lexer, option);
    } else {
      switch (option.type) {
        case 'boolean':
          return boolean(lexer, option);
        case 'string':
          return string(lexer, option);
        case 'number':
          return number(lexer, option);
        case 'select':
          return select(lexer, option);
        case 'array':
          return array(lexer, option);
      }
    }
  };

  /* -------------------------------------------- */
  /* VDOM                                         */
  /* -------------------------------------------- */
  const view = () => m(
    'aside'
    , [
      m(
        '.row.jc-center.bd.bd-white.rad.my-3.mb-2.w-75.m-auto'
        , [
          'split',
          'editor',
          'preview'
        ].map((pane, i) => m(
          '.btn.btn-sm.col.bd.bd-left.bd-white'
          , {
            class: pane === moloko.state().pane
              ? 'bg-white fc-black ' + (i === 0 ? 'rad-left' : i === 2 ? 'rad-right' : '')
              : '',
            onclick: () => moloko.pane(pane as any)
          }
          , pane.toUpperCase()
        ))
      )
      , m(
        'p.fs-xs.px-3.fc-gray.mt-0.tc'
        , 'Toggle the editor panes for optimal visualization'
      )
      , m(
        '.relapse'
        , {
          id: 'lexer',
          class: 'relapse',
          oncreate: ({ dom }) => relapse(dom, {
            persist: false,
            multiple: false
          })
        }
        , keys(data).map((mode: LexerNames) => [
          m(
            'button.relapse-btn.d-flex.jc-between',
            {
              id: mode
            }
            , m(
              'span.uppercase'
              , mode
            )
            , m(
              'svg.icon.icon-close'
              , m('use[xlink:href="#svg-chevron-right"]')
            )
            , m(
              'svg.icon.icon-open', m('use[xlink:href="#svg-chevron-down"]')
            )
          )
          , m(
            'section.relapse-fold'
            , defs[mode].map((rule: Rule) => m('.rule-block.d-block.py-3.px-1', types(mode, rule)))
          )
        ])
      )
    ]
  );

  return { view };
};
