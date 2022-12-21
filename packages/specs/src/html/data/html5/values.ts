import { HTMLValues } from '../../';

export const values: HTMLValues = {
  b: [
    {
      label: 'true'
    },
    {
      label: 'false'
    }
  ],
  u: [
    {
      label: 'true'
    },
    {
      label: 'false'
    },
    {
      label: 'undefined'
    }
  ],
  o: [
    {
      label: 'on'
    },
    {
      label: 'off'
    }
  ],
  y: [
    {
      label: 'yes'
    },
    {
      label: 'no'
    }
  ],
  w: [
    {
      label: 'soft'
    },
    {
      label: 'hard'
    }
  ],
  d: [
    {
      label: 'ltr'
    },
    {
      label: 'rtl'
    },
    {
      label: 'auto'
    }
  ],
  m: [
    {
      label: 'get',
      documentation: {
        kind: 'markdown',
        value: "Corresponds to the HTTP [GET method](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.3); form data are appended to the `action` attribute URI with a '?' as separator, and the resulting URI is sent to the server. Use this method when the form has no side-effects and contains only ASCII characters."
      }
    },
    {
      label: 'post',
      documentation: {
        kind: 'markdown',
        value: 'Corresponds to the HTTP [POST method](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.5); form data are included in the body of the form and sent to the server.'
      }
    },
    {
      label: 'dialog',
      documentation: {
        kind: 'markdown',
        value: 'Use when the form is inside a [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) element to close the dialog when submitted.'
      }
    }
  ],
  fm: [
    {
      label: 'get'
    },
    {
      label: 'post'
    }
  ],
  s: [
    {
      label: 'row'
    },
    {
      label: 'col'
    },
    {
      label: 'rowgroup'
    },
    {
      label: 'colgroup'
    }
  ],
  t: [
    {
      label: 'hidden'
    },
    {
      label: 'text'
    },
    {
      label: 'search'
    },
    {
      label: 'tel'
    },
    {
      label: 'url'
    },
    {
      label: 'email'
    },
    {
      label: 'password'
    },
    {
      label: 'datetime'
    },
    {
      label: 'date'
    },
    {
      label: 'month'
    },
    {
      label: 'week'
    },
    {
      label: 'time'
    },
    {
      label: 'datetime-local'
    },
    {
      label: 'number'
    },
    {
      label: 'range'
    },
    {
      label: 'color'
    },
    {
      label: 'checkbox'
    },
    {
      label: 'radio'
    },
    {
      label: 'file'
    },
    {
      label: 'submit'
    },
    {
      label: 'image'
    },
    {
      label: 'reset'
    },
    {
      label: 'button'
    }
  ],
  im: [
    {
      label: 'verbatim'
    },
    {
      label: 'latin'
    },
    {
      label: 'latin-name'
    },
    {
      label: 'latin-prose'
    },
    {
      label: 'full-width-latin'
    },
    {
      label: 'kana'
    },
    {
      label: 'kana-name'
    },
    {
      label: 'katakana'
    },
    {
      label: 'numeric'
    },
    {
      label: 'tel'
    },
    {
      label: 'email'
    },
    {
      label: 'url'
    }
  ],
  bt: [
    {
      label: 'button'
    },
    {
      label: 'submit'
    },
    {
      label: 'reset'
    },
    {
      label: 'menu'
    }
  ],
  lt: [
    {
      label: '1'
    },
    {
      label: 'a'
    },
    {
      label: 'A'
    },
    {
      label: 'i'
    },
    {
      label: 'I'
    }
  ],
  mt: [
    {
      label: 'context'
    },
    {
      label: 'toolbar'
    }
  ],
  mit: [
    {
      label: 'command'
    },
    {
      label: 'checkbox'
    },
    {
      label: 'radio'
    }
  ],
  et: [
    {
      label: 'application/x-www-form-urlencoded'
    },
    {
      label: 'multipart/form-data'
    },
    {
      label: 'text/plain'
    }
  ],
  tk: [
    {
      label: 'subtitles'
    },
    {
      label: 'captions'
    },
    {
      label: 'descriptions'
    },
    {
      label: 'chapters'
    },
    {
      label: 'metadata'
    }
  ],
  pl: [
    {
      label: 'none'
    },
    {
      label: 'metadata'
    },
    {
      label: 'auto'
    }
  ],
  sh: [
    {
      label: 'circle'
    },
    {
      label: 'default'
    },
    {
      label: 'poly'
    },
    {
      label: 'rect'
    }
  ],
  xo: [
    {
      label: 'anonymous'
    },
    {
      label: 'use-credentials'
    }
  ],
  target: [
    {
      label: '_self'
    },
    {
      label: '_blank'
    },
    {
      label: '_parent'
    },
    {
      label: '_top'
    }
  ],
  sb: [
    {
      label: 'allow-forms'
    },
    {
      label: 'allow-modals'
    },
    {
      label: 'allow-pointer-lock'
    },
    {
      label: 'allow-popups'
    },
    {
      label: 'allow-popups-to-escape-sandbox'
    },
    {
      label: 'allow-same-origin'
    },
    {
      label: 'allow-scripts'
    },
    {
      label: 'allow-top-navigation'
    }
  ],
  tristate: [
    {
      label: 'true'
    },
    {
      label: 'false'
    },
    {
      label: 'mixed'
    },
    {
      label: 'undefined'
    }
  ],
  inputautocomplete: [
    {
      label: 'additional-name'
    },
    {
      label: 'address-level1'
    },
    {
      label: 'address-level2'
    },
    {
      label: 'address-level3'
    },
    {
      label: 'address-level4'
    },
    {
      label: 'address-line1'
    },
    {
      label: 'address-line2'
    },
    {
      label: 'address-line3'
    },
    {
      label: 'bday'
    },
    {
      label: 'bday-year'
    },
    {
      label: 'bday-day'
    },
    {
      label: 'bday-month'
    },
    {
      label: 'billing'
    },
    {
      label: 'cc-additional-name'
    },
    {
      label: 'cc-csc'
    },
    {
      label: 'cc-exp'
    },
    {
      label: 'cc-exp-month'
    },
    {
      label: 'cc-exp-year'
    },
    {
      label: 'cc-family-name'
    },
    {
      label: 'cc-given-name'
    },
    {
      label: 'cc-name'
    },
    {
      label: 'cc-number'
    },
    {
      label: 'cc-type'
    },
    {
      label: 'country'
    },
    {
      label: 'country-name'
    },
    {
      label: 'current-password'
    },
    {
      label: 'email'
    },
    {
      label: 'family-name'
    },
    {
      label: 'fax'
    },
    {
      label: 'given-name'
    },
    {
      label: 'home'
    },
    {
      label: 'honorific-prefix'
    },
    {
      label: 'honorific-suffix'
    },
    {
      label: 'impp'
    },
    {
      label: 'language'
    },
    {
      label: 'mobile'
    },
    {
      label: 'name'
    },
    {
      label: 'new-password'
    },
    {
      label: 'nickname'
    },
    {
      label: 'off'
    },
    {
      label: 'on'
    },
    {
      label: 'organization'
    },
    {
      label: 'organization-title'
    },
    {
      label: 'pager'
    },
    {
      label: 'photo'
    },
    {
      label: 'postal-code'
    },
    {
      label: 'sex'
    },
    {
      label: 'shipping'
    },
    {
      label: 'street-address'
    },
    {
      label: 'tel-area-code'
    },
    {
      label: 'tel'
    },
    {
      label: 'tel-country-code'
    },
    {
      label: 'tel-extension'
    },
    {
      label: 'tel-local'
    },
    {
      label: 'tel-local-prefix'
    },
    {
      label: 'tel-local-suffix'
    },
    {
      label: 'tel-national'
    },
    {
      label: 'transaction-amount'
    },
    {
      label: 'transaction-currency'
    },
    {
      label: 'url'
    },
    {
      label: 'username'
    },
    {
      label: 'work'
    }
  ],
  autocomplete: [
    {
      label: 'inline'
    },
    {
      label: 'list'
    },
    {
      label: 'both'
    },
    {
      label: 'none'
    }
  ],
  current: [
    {
      label: 'page'
    },
    {
      label: 'step'
    },
    {
      label: 'location'
    },
    {
      label: 'date'
    },
    {
      label: 'time'
    },
    {
      label: 'true'
    },
    {
      label: 'false'
    }
  ],
  dropeffect: [
    {
      label: 'copy'
    },
    {
      label: 'move'
    },
    {
      label: 'link'
    },
    {
      label: 'execute'
    },
    {
      label: 'popup'
    },
    {
      label: 'none'
    }
  ],
  invalid: [
    {
      label: 'grammar'
    },
    {
      label: 'false'
    },
    {
      label: 'spelling'
    },
    {
      label: 'true'
    }
  ],
  live: [
    {
      label: 'off'
    },
    {
      label: 'polite'
    },
    {
      label: 'assertive'
    }
  ],
  orientation: [
    {
      label: 'vertical'
    },
    {
      label: 'horizontal'
    },
    {
      label: 'undefined'
    }
  ],
  relevant: [
    {
      label: 'additions'
    },
    {
      label: 'removals'
    },
    {
      label: 'text'
    },
    {
      label: 'all'
    },
    {
      label: 'additions text'
    }
  ],
  sort: [
    {
      label: 'ascending'
    },
    {
      label: 'descending'
    },
    {
      label: 'none'
    },
    {
      label: 'other'
    }
  ],
  roles: [
    {
      label: 'alert'
    },
    {
      label: 'alertdialog'
    },
    {
      label: 'button'
    },
    {
      label: 'checkbox'
    },
    {
      label: 'dialog'
    },
    {
      label: 'gridcell'
    },
    {
      label: 'link'
    },
    {
      label: 'log'
    },
    {
      label: 'marquee'
    },
    {
      label: 'menuitem'
    },
    {
      label: 'menuitemcheckbox'
    },
    {
      label: 'menuitemradio'
    },
    {
      label: 'option'
    },
    {
      label: 'progressbar'
    },
    {
      label: 'radio'
    },
    {
      label: 'scrollbar'
    },
    {
      label: 'searchbox'
    },
    {
      label: 'slider'
    },
    {
      label: 'spinbutton'
    },
    {
      label: 'status'
    },
    {
      label: 'switch'
    },
    {
      label: 'tab'
    },
    {
      label: 'tabpanel'
    },
    {
      label: 'textbox'
    },
    {
      label: 'timer'
    },
    {
      label: 'tooltip'
    },
    {
      label: 'treeitem'
    },
    {
      label: 'combobox'
    },
    {
      label: 'grid'
    },
    {
      label: 'listbox'
    },
    {
      label: 'menu'
    },
    {
      label: 'menubar'
    },
    {
      label: 'radiogroup'
    },
    {
      label: 'tablist'
    },
    {
      label: 'tree'
    },
    {
      label: 'treegrid'
    },
    {
      label: 'application'
    },
    {
      label: 'article'
    },
    {
      label: 'cell'
    },
    {
      label: 'columnheader'
    },
    {
      label: 'definition'
    },
    {
      label: 'directory'
    },
    {
      label: 'document'
    },
    {
      label: 'feed'
    },
    {
      label: 'figure'
    },
    {
      label: 'group'
    },
    {
      label: 'heading'
    },
    {
      label: 'img'
    },
    {
      label: 'list'
    },
    {
      label: 'listitem'
    },
    {
      label: 'math'
    },
    {
      label: 'none'
    },
    {
      label: 'note'
    },
    {
      label: 'presentation'
    },
    {
      label: 'region'
    },
    {
      label: 'row'
    },
    {
      label: 'rowgroup'
    },
    {
      label: 'rowheader'
    },
    {
      label: 'separator'
    },
    {
      label: 'table'
    },
    {
      label: 'term'
    },
    {
      label: 'text'
    },
    {
      label: 'toolbar'
    },
    {
      label: 'banner'
    },
    {
      label: 'complementary'
    },
    {
      label: 'contentinfo'
    },
    {
      label: 'form'
    },
    {
      label: 'main'
    },
    {
      label: 'navigation'
    },
    {
      label: 'region'
    },
    {
      label: 'search'
    },
    {
      label: 'doc-abstract'
    },
    {
      label: 'doc-acknowledgments'
    },
    {
      label: 'doc-afterword'
    },
    {
      label: 'doc-appendix'
    },
    {
      label: 'doc-backlink'
    },
    {
      label: 'doc-biblioentry'
    },
    {
      label: 'doc-bibliography'
    },
    {
      label: 'doc-biblioref'
    },
    {
      label: 'doc-chapter'
    },
    {
      label: 'doc-colophon'
    },
    {
      label: 'doc-conclusion'
    },
    {
      label: 'doc-cover'
    },
    {
      label: 'doc-credit'
    },
    {
      label: 'doc-credits'
    },
    {
      label: 'doc-dedication'
    },
    {
      label: 'doc-endnote'
    },
    {
      label: 'doc-endnotes'
    },
    {
      label: 'doc-epigraph'
    },
    {
      label: 'doc-epilogue'
    },
    {
      label: 'doc-errata'
    },
    {
      label: 'doc-example'
    },
    {
      label: 'doc-footnote'
    },
    {
      label: 'doc-foreword'
    },
    {
      label: 'doc-glossary'
    },
    {
      label: 'doc-glossref'
    },
    {
      label: 'doc-index'
    },
    {
      label: 'doc-introduction'
    },
    {
      label: 'doc-noteref'
    },
    {
      label: 'doc-notice'
    },
    {
      label: 'doc-pagebreak'
    },
    {
      label: 'doc-pagelist'
    },
    {
      label: 'doc-part'
    },
    {
      label: 'doc-preface'
    },
    {
      label: 'doc-prologue'
    },
    {
      label: 'doc-pullquote'
    },
    {
      label: 'doc-qna'
    },
    {
      label: 'doc-subtitle'
    },
    {
      label: 'doc-tip'
    },
    {
      label: 'doc-toc'
    }
  ],
  metanames: [
    {
      label: 'application-name'
    },
    {
      label: 'author'
    },
    {
      label: 'description'
    },
    {
      label: 'format-detection'
    },
    {
      label: 'generator'
    },
    {
      label: 'keywords'
    },
    {
      label: 'publisher'
    },
    {
      label: 'referrer'
    },
    {
      label: 'robots'
    },
    {
      label: 'theme-color'
    },
    {
      label: 'viewport'
    }
  ],
  haspopup: [
    {
      label: 'false',
      documentation: {
        kind: 'markdown',
        value: '(default) Indicates the element does not have a popup.'
      }
    },
    {
      label: 'true',
      documentation: {
        kind: 'markdown',
        value: 'Indicates the popup is a menu.'
      }
    },
    {
      label: 'menu',
      documentation: {
        kind: 'markdown',
        value: 'Indicates the popup is a menu.'
      }
    },
    {
      label: 'listbox',
      documentation: {
        kind: 'markdown',
        value: 'Indicates the popup is a listbox.'
      }
    },
    {
      label: 'tree',
      documentation: {
        kind: 'markdown',
        value: 'Indicates the popup is a tree.'
      }
    },
    {
      label: 'grid',
      documentation: {
        kind: 'markdown',
        value: 'Indicates the popup is a grid.'
      }
    },
    {
      label: 'dialog',
      documentation: {
        kind: 'markdown',
        value: 'Indicates the popup is a dialog.'
      }
    }
  ],
  decoding: [
    {
      label: 'sync'
    },
    {
      label: 'async'
    },
    {
      label: 'auto'
    }
  ],
  loading: [
    {
      label: 'eager'
    },
    {
      label: 'lazy'
    }
  ],
  referrerpolicy: [
    {
      label: 'no-referrer'
    },
    {
      label: 'no-referrer-when-downgrade'
    },
    {
      label: 'origin'
    },
    {
      label: 'origin-when-cross-origin'
    },
    {
      label: 'same-origin'
    },
    {
      label: 'strict-origin'
    },
    {
      label: 'strict-origin-when-cross-origin'
    },
    {
      label: 'unsafe-url'
    }
  ]
};
