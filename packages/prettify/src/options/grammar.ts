import { Grammars, Options, LanguageProperName } from 'types/prettify';
import { set } from '@utils/helpers';
import { isArray } from '@utils/native';

interface LiquidEmbed {

  language?: LanguageProperName;
  attribute?(token: string): boolean
  end?(token: string): boolean

}

interface HTMLEmbed {

  language?: LanguageProperName;
  attribute?: string;
  value?(token: string):boolean

}

export const grammar = new class Grammar {

  static script: Grammars['script'] = {
    keywords: [
      'ActiveXObject',
      'ArrayBuffer',
      'AudioContext',
      'Canvas',
      'CustomAnimation',
      'DOMParser',
      'DataView',
      'Date',
      'Error',
      'EvalError',
      'FadeAnimation',
      'FileReader',
      'Flash',
      'Float32Array',
      'Float64Array',
      'FormField',
      'Frame',
      'Generator',
      'HotKey',
      'Image',
      'Iterator',
      'Intl',
      'Int16Array',
      'Int32Array',
      'Int8Array',
      'InternalError',
      'Loader',
      'Map',
      'MenuItem',
      'MoveAnimation',
      'Notification',
      'ParallelArray',
      'Point',
      'Promise',
      'Proxy',
      'RangeError',
      'Rectangle',
      'ReferenceError',
      'Reflect',
      'RegExp',
      'ResizeAnimation',
      'RotateAnimation',
      'Set',
      'SQLite',
      'ScrollBar',
      'Set',
      'Shadow',
      'StopIteration',
      'Symbol',
      'SyntaxError',
      'Text',
      'TextArea',
      'Timer',
      'TypeError',
      'URL',
      'Uint16Array',
      'Uint32Array',
      'Uint8Array',
      'Uint8ClampedArray',
      'URIError',
      'WeakMap',
      'WeakSet',
      'Web',
      'Window',
      'XMLHttpRequest'
    ]
  };

  static html: Grammars['html'] = {
    embedded: {
      script: [
        {
          language: 'javascript'
        },
        {
          language: 'json',
          attribute: {
            type: [
              'application/json',
              'application/ld+json'
            ]
          }
        },
        {
          language: 'jsx',
          attribute: {
            type: [
              'text/jsx',
              'application/jsx'
            ]
          }
        }
      ],
      style: [
        {
          language: 'css'
        }
      ]
    },
    voids: [
      'area',
      'base',
      'br',
      'col',
      'embed',
      'hr',
      'img',
      'input',
      'keygen',
      'link',
      'menuitem',
      'meta',
      'param',
      'path',
      'circle',
      'source',
      'track',
      'wbr'
    ],
    tags: [
      'body',
      'colgroup',
      'dd',
      'dt',
      'head',
      'html',
      'li',
      'option',
      'tbody',
      'td',
      'tfoot',
      'th',
      'thead',
      'tr'
    ]
  };

  static liquid: Grammars['liquid'] = {
    embedded: {
      schema: [
        { language: 'json' }
      ],
      style: [
        { language: 'css' }
      ],
      stylesheet: [
        { language: 'css' },
        { language: 'scss', argument: /\s*['"]scss['"]/ }
      ],
      javascript: [
        { language: 'javascript' }
      ]
    },
    tags: [
      'form',
      'paginate',
      'capture',
      'case',
      'comment',
      'for',
      'if',
      'raw',
      'tablerow',
      'unless',
      'schema',
      'style',
      'script',
      'stylesheet',
      'javascript'
    ],
    control: [
      'if',
      'unless',
      'case'
    ],
    else: [
      'else',
      'elsif'

    ],
    singletons: [
      'include',
      'layout',
      'section',
      'assign',
      'liquid',
      'break',
      'continue',
      'cycle',
      'decrement',
      'echo',
      'increment',
      'render',
      'when'
    ]
  };

  static style: Grammars['style'] = {
    units: [
      '%',
      'cap',
      'ch',
      'cm',
      'deg',
      'dpcm',
      'dpi',
      'dppx',
      'em',
      'ex',
      'fr',
      'grad',
      'Hz',
      'ic',
      'in',
      'kHz',
      'lh',
      'mm',
      'ms',
      'mS',
      'pc',
      'pt',
      'px',
      'Q',
      'rad',
      'rem',
      'rlh',
      's',
      'turn',
      'vb',
      'vh',
      'vi',
      'vmax',
      'vmin',
      'vw'
    ],
    atrules: [
      '@charset',
      '@color-profile',
      '@counter-style',
      '@font-face',
      '@font-feature-values',
      '@font-palette-values',
      '@import',
      '@keyframes',
      '@layer',
      '@media',
      '@namespace',
      '@page',
      '@supports'
    ],
    webkit: {
      classes: [
        'webkit-any',
        'webkit-any-link*',
        'webkit-autofill'
      ],
      elements: [
        'webkit-file-upload-button',
        'webkit-inner-spin-button',
        'webkit-input-placeholder',
        'webkit-meter-bar',
        'webkit-meter-even-less-good-value',
        'webkit-meter-inner-element',
        'webkit-meter-optimum-value',
        'webkit-meter-suboptimum-value',
        'webkit-outer-spin-button',
        'webkit-progress-bar',
        'webkit-progress-inner-element',
        'webkit-progress-value',
        'webkit-search-cancel-button',
        'webkit-search-results-button',
        'webkit-slider-runnable-track',
        'webkit-slider-thumb'
      ]
    },
    pseudo: {
      classes: [
        'active',
        'any-link',
        'checked',
        'default',
        'defined',
        'disabled',
        'empty',
        'enabled',
        'first',
        'first-child',
        'first-of-type',
        'fullscreen',
        'focus',
        'focus-visible',
        'focus-within',
        'host',
        'hover',
        'indeterminate',
        'in-range',
        'invalid',
        'is',
        'lang',
        'last-child',
        'last-of-type',
        'left',
        'link',
        'modal',
        'not',
        'nth-child',
        'nth-col',
        'nth-last-child',
        'nth-last-of-type',
        'nth-of-type',
        'only-child',
        'only-of-type',
        'optional',
        'out-of-range',
        'picture-in-picture',
        'placeholder-shown',
        'paused',
        'playing',
        'read-only',
        'read-write',
        'required',
        'right',
        'root',
        'scope',
        'target',
        'valid',
        'visited',
        'where'
      ],
      elements: [
        'after',
        'backdrop',
        'before',
        'cue',
        'cue-region',
        'first-letter',
        'first-line',
        'file-selector-button',
        'marker',
        'part',
        'placeholder',
        'selection',
        'slotted'
      ],
      functions: [
        'after',
        'before',
        'first-letter',
        'first-line',
        'host',
        'host-context',
        'part',
        'slotted',
        'lang',
        'not',
        'nth-child',
        'nth-col',
        'nth-last-child',
        'nth-last-of-type',
        'nth-of-type',
        'where'
      ]
    }
  };

  public script: { keywords?: Set<string>; } = {};

  public style: {
    units?: Set<string>;
    atrules?: Set<string>;
    pseudoClasses?: Set<string>;
    pseudoElements?: Set<string>;
    pseudoFunctions?: Set<string>;
    webkitElements?: Set<string>;
    webkitClasses?: Set<string>;
  } = {};

  public html: {
    tags?: Set<string>;
    voids?: Set<string>;
    embed?: { [tagName: string]: HTMLEmbed }
  } = { embed: {} };

  public liquid: {
    tags?: Set<string>;
    singletons?: Set<string>;
    control?: Set<string>;
    else?: Set<string>;
    embed?: { [tagName: string]: LiquidEmbed };
    scripts?: Set<string>;
    styles?: Set<string>;
  } = { embed: {} };

  constructor () {

    this.script.keywords = set(Grammar.script.keywords);
    this.style.units = set(Grammar.style.units);
    this.style.atrules = set(Grammar.style.atrules);
    this.style.pseudoFunctions = set(Grammar.style.pseudo.functions);
    this.style.pseudoClasses = set(Grammar.style.pseudo.classes);
    this.style.pseudoElements = set(Grammar.style.pseudo.elements);
    this.style.webkitClasses = set(Grammar.style.webkit.classes);
    this.style.webkitElements = set(Grammar.style.webkit.elements);
    this.html.tags = set(Grammar.html.tags);
    this.html.voids = set(Grammar.html.voids);
    this.liquid.tags = set(Grammar.liquid.tags);
    this.liquid.control = set(Grammar.liquid.control);
    this.liquid.else = set(Grammar.liquid.else);
    this.liquid.singletons = set(Grammar.liquid.singletons);
    this.liquid.scripts = new Set();
    this.liquid.styles = new Set();

    this.defaults();
  }

  defaults () {

    for (const tag in Grammar.html.embedded) {

      this.html.embed[tag] = {};

      for (const { language, attribute = null } of Grammar.html.embedded[tag]) {

        this.html.embed[tag].language = language;

        if (typeof attribute === 'object') {
          for (const attr in attribute) {

            this.html.embed[tag].attribute = attr;

            if (isArray(attribute[attr])) {
              this.html.embed[tag].value = (v) => new Set(attribute[attr] as string).has(v);
            } else {
              this.html.embed[tag].value = (v) => new RegExp(attribute[attr] as string).test(v);
            }
          }
        } else {
          this.html.embed[tag].attribute = null;
        }
      }
    }

    for (const tag in Grammar.liquid.embedded) {

      this.liquid.embed[tag] = { end: (v) => new RegExp(`^{%-?\\s*end${tag}`).test(v) };

      for (const { language, argument } of Grammar.liquid.embedded[tag]) {

        this.liquid.embed[tag].language = language;

        if (argument) {
          if (isArray(argument)) {
            this.liquid.embed[tag].attribute = (v) => new Set(argument).has(v);
          } else {
            this.liquid.embed[tag].attribute = (v) => new RegExp(argument).test(v);
          }
        } else {
          this.liquid.embed[tag].attribute = null;
        }
      }

    }

  }

  atrules (input: string) {

    for (const rule of Grammar.style.atrules) if (input.startsWith(rule)) return rule;

    return input;

  }

  embed <T extends 'html' | 'liquid', R extends T extends 'liquid' ? LiquidEmbed : HTMLEmbed > (
    language: T,
    tag: string
  ): false | R {

    if (tag in this[language].embed) {

      return this[language].embed[tag] as R;

    }

    return false;

  }

  extend (rules: Options['grammar']) {

    for (const rule in rules) {

      /* -------------------------------------------- */
      /* HTML GRAMMARS                                */
      /* -------------------------------------------- */

      if (rule === 'html') {

        if ('tags' in rules[rule] && isArray(rules[rule].tags)) {
          for (const tag of rules[rule].tags) {
            if (!this.html.tags.has(tag)) {
              Grammar.html.tags.push(tag);
              this.html.tags.add(tag);
            }
          }
        }

        if ('voids' in rules[rule] && isArray(rules[rule].voids)) {
          for (const tag of rules[rule].voids) {
            if (!this.html.voids.has(tag)) {
              Grammar.html.voids.push(tag);
              this.html.voids.add(tag);
            }
          }
        }

        if ('embedded' in rules[rule]) {
          // TODO
        }

      }

      /* -------------------------------------------- */
      /* LIQUID GRAMMARS                              */
      /* -------------------------------------------- */

      if (rule === 'liquid') {

        if ('tags' in rules[rule] && isArray(rules[rule].tags)) {
          for (const tag of rules[rule].tags) {
            if (!this.liquid.tags.has(tag)) {
              Grammar.liquid.tags.push(tag);
              this.liquid.tags.add(tag);
            }
          }
        }

        if ('else' in rules[rule] && isArray(rules[rule].else)) {
          for (const tag of rules[rule].else) {
            if (!this.liquid.else.has(tag)) {
              Grammar.liquid.else.push(tag);
              this.liquid.else.add(tag);
            }
          }
        }

        if ('singletons' in rules[rule] && isArray(rules[rule].singletons)) {
          for (const tag of rules[rule].singletons) {
            if (!this.liquid.singletons.has(tag)) {
              Grammar.liquid.singletons.push(tag);
              this.liquid.singletons.add(tag);
            }
          }
        }

        /* EMBEDDED REGIONS --------------------------- */

        if ('embedded' in rules[rule] && typeof rules[rule].embedded === 'object') {
          for (const tag in rules[rule].embedded) {

            if (!(tag in this.liquid.embed)) {
              this.liquid.embed[tag] = { end: (v) => new RegExp(`{%-?\\s*end${tag}`).test(v) };
            }

            for (const { language, argument } of rules[rule].embedded[tag]) {

              if (this.liquid.embed[tag].language !== language) {
                this.liquid.embed[tag].language = language;
              }

              if (argument) {
                if (this.liquid.embed[tag].attribute === null) {
                  if (isArray(argument)) {
                    this.liquid.embed[tag].attribute = (v) => set(argument).has(v);
                  } else {
                    this.liquid.embed[tag].attribute = (v) => new RegExp(argument).test(v);
                  }
                } else {

                  const args = [];

                  for (const defaults of Grammar.liquid.embedded[tag]) {
                    if (isArray(defaults.argument)) {
                      for (const def of defaults.argument) {
                        if (argument !== def) args.push(argument); else args.push(def);
                      }
                      this.liquid.embed[tag].attribute = (v) => set(args).has(v);
                    } else {
                      if (defaults.argument !== argument) {
                        this.liquid.embed[tag].attribute = (v) => new RegExp(argument as string).test(v);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      /* -------------------------------------------- */
      /* STYLE GRAMMARS                               */
      /* -------------------------------------------- */

      if (rule === 'style') {

        if ('units' in rules[rule] && isArray(rules[rule].units)) {
          for (const tag of rules[rule].units) {
            if (!this.style.units.has(tag)) {
              Grammar.style.units.push(tag);
              this.style.units.add(tag);
            }
          }
        }

        if ('atrules' in rules[rule] && isArray(rules[rule].atrules)) {
          for (const tag of rules[rule].atrules) {
            if (!this.style.atrules.has(tag)) {
              Grammar.style.atrules.push(tag);
              this.style.atrules.add(tag);
            }
          }
        }

        if ('webkit' in rules[rule]) {

          if ('classes' in rules[rule].webkit && isArray(rules[rule].webkit.classes)) {
            for (const tag of rules[rule].webkit.classes) {
              if (!this.style.webkitClasses.has(tag)) {
                Grammar.style.webkit.classes.push(tag);
                this.style.webkitClasses.add(tag);
              }
            }
          }

          if ('elements' in rules[rule].webkit && isArray(rules[rule].webkit.elements)) {
            for (const tag of rules[rule].webkit.elements) {
              if (!this.style.webkitElements.has(tag)) {
                Grammar.style.webkit.elements.push(tag);
                this.style.webkitElements.add(tag);
              }
            }
          }
        }

        if ('pseudo' in rules[rule]) {

          if ('classes' in rules[rule].pseudo && isArray(rules[rule].pseudo.classes)) {
            for (const tag of rules[rule].pseudo.classes) {
              if (!this.style.pseudoClasses.has(tag)) {
                Grammar.style.pseudo.classes.push(tag);
                this.style.pseudoClasses.add(tag);
              }
            }
          }

          if ('elements' in rules[rule].pseudo && isArray(rules[rule].pseudo.elements)) {
            for (const tag of rules[rule].pseudo.elements) {
              if (!this.style.pseudoElements.has(tag)) {
                Grammar.style.pseudo.elements.push(tag);
                this.style.pseudoElements.add(tag);
              }
            }
          }
        }
      }

      /* -------------------------------------------- */
      /* SCRIPT GRAMMARS                              */
      /* -------------------------------------------- */

      if (rule === 'script') {
        if ('keywords' in rules[rule] && isArray(rules[rule].keywords)) {
          for (const tag of rules[rule].keywords) {
            if (!this.script.keywords.has(tag)) {
              Grammar.script.keywords.push(tag);
              this.script.keywords.add(tag);
            }
          }
        }
      }

    }
  }

}();
