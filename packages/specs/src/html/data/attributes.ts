export default {
  accesskey: {
    description: {
      kind: 'markdown',
      value: 'Provides a hint for generating a keyboard shortcut for the current element. This attribute consists of a space-separated list of characters. The browser should use the first one that exists on the computer keyboard layout.'
    },
    references: [
      {
        name: 'MDN Reference',
        url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/accesskey'
      }
    ]
  },
  autocapitalize: {
    description: {
      kind: 'markdown',
      value: 'Controls whether and how text input is automatically capitalized as it is entered/edited by the user. It can have the following values:\n\n*   `off` or `none`, no autocapitalization is applied (all letters default to lowercase)\n*   `on` or `sentences`, the first letter of each sentence defaults to a capital letter; all other letters default to lowercase\n*   `words`, the first letter of each word defaults to a capital letter; all other letters default to lowercase\n*   `characters`, all letters should default to uppercase'
    },
    references: [
      {
        name: 'MDN Reference',
        url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/autocapitalize'
      }
    ]
  },
  class: {
    description: {
      kind: 'markdown',
      value: 'A space-separated list of the classes of the element. Classes allows CSS and JavaScript to select and access specific elements via the [class selectors](/en-US/docs/Web/CSS/Class_selectors) or functions like the method [`Document.getElementsByClassName()`](/en-US/docs/Web/API/Document/getElementsByClassName "returns an array-like object of all child elements which have all of the given class names.").'
    },
    references: [
      {
        name: 'MDN Reference',
        url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/class'
      }
    ]
  },
  contenteditable: {
    description: {
      kind: 'markdown',
      value: 'An enumerated attribute indicating if the element should be editable by the user. If so, the browser modifies its widget to allow editing. The attribute must take one of the following values:\n\n*   `true` or the _empty string_, which indicates that the element must be editable;\n*   `false`, which indicates that the element must not be editable.'
    },
    references: [
      {
        name: 'MDN Reference',
        url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/contenteditable'
      }
    ]
  },
  contextmenu: {
    description: {
      kind: 'markdown',
      value: 'The `[**id**](#attr-id)` of a [`<menu>`](/en-US/docs/Web/HTML/Element/menu "The HTML <menu> element represents a group of commands that a user can perform or activate. This includes both list menus, which might appear across the top of a screen, as well as context menus, such as those that might appear underneath a button after it has been clicked.") to use as the contextual menu for this element.'
    },
    references: [
      {
        name: 'MDN Reference',
        url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/contextmenu'
      }
    ]
  },
  dir: {
    description: {
      kind: 'markdown',
      value: "An enumerated attribute indicating the directionality of the element's text. It can have the following values:\n\n*   `ltr`, which means _left to right_ and is to be used for languages that are written from the left to the right (like English);\n*   `rtl`, which means _right to left_ and is to be used for languages that are written from the right to the left (like Arabic);\n*   `auto`, which lets the user agent decide. It uses a basic algorithm as it parses the characters inside the element until it finds a character with a strong directionality, then it applies that directionality to the whole element."
    },
    references: [
      {
        name: 'MDN Reference',
        url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/dir'
      }
    ],
    valueSet: 'd'
  },
  draggable: {
    description: {
      kind: 'markdown',
      value: 'An enumerated attribute indicating whether the element can be dragged, using the [Drag and Drop API](/en-us/docs/DragDrop/Drag_and_Drop). It can have the following values:\n\n*   `true`, which indicates that the element may be dragged\n*   `false`, which indicates that the element may not be dragged.'
    },
    references: [
      {
        name: 'MDN Reference',
        url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/draggable'
      }
    ],
    valueSet: 'b'
  },
  dropzone: {
    description: {
      kind: 'markdown',
      value: 'An enumerated attribute indicating what types of content can be dropped on an element, using the [Drag and Drop API](/en-US/docs/DragDrop/Drag_and_Drop). It can have the following values:\n\n*   `copy`, which indicates that dropping will create a copy of the element that was dragged\n*   `move`, which indicates that the element that was dragged will be moved to this new location.\n*   `link`, will create a link to the dragged data.'
    }
  },
  exportparts: {
    description: {
      kind: 'markdown',
      value: 'Used to transitively export shadow parts from a nested shadow tree into a containing light tree.'
    },
    references: [
      {
        name: 'MDN Reference',
        url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/exportparts'
      }
    ]
  },
  hidden: {
    description: {
      kind: 'markdown',
      value: "A Boolean attribute indicates that the element is not yet, or is no longer, _relevant_. For example, it can be used to hide elements of the page that can't be used until the login process has been completed. The browser won't render such elements. This attribute must not be used to hide content that could legitimately be shown."
    },
    references: [
      {
        name: 'MDN Reference',
        url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/hidden'
      }
    ],
    valueSet: 'v'
  },
  id: {
    description: {
      kind: 'markdown',
      value: 'Defines a unique identifier (ID) which must be unique in the whole document. Its purpose is to identify the element when linking (using a fragment identifier), scripting, or styling (with CSS).'
    },
    references: [
      {
        name: 'MDN Reference',
        url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/id'
      }
    ]
  },
  inputmode: {
    description: {
      kind: 'markdown',
      value: 'Provides a hint to browsers as to the type of virtual keyboard configuration to use when editing this element or its contents. Used primarily on [`<input>`](/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") elements, but is usable on any element while in `[contenteditable](/en-US/docs/Web/HTML/Global_attributes#attr-contenteditable)` mode.'
    },
    references: [
      {
        name: 'MDN Reference',
        url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/inputmode'
      }
    ]
  },
  is: {
    description: {
      kind: 'markdown',
      value: 'Allows you to specify that a standard HTML element should behave like a registered custom built-in element (see [Using custom elements](/en-US/docs/Web/Web_Components/Using_custom_elements) for more details).'
    },
    references: [
      {
        name: 'MDN Reference',
        url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/is'
      }
    ]
  },
  itemid: {
    description: {
      kind: 'markdown',
      value: 'The unique, global identifier of an item.'
    },
    references: [
      {
        name: 'MDN Reference',
        url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemid'
      }
    ]
  },
  itemprop: {
    description: {
      kind: 'markdown',
      value: 'Used to add properties to an item. Every HTML element may have an `itemprop` attribute specified, where an `itemprop` consists of a name and value pair.'
    },
    references: [
      {
        name: 'MDN Reference',
        url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemprop'
      }
    ]
  },
  itemref: {
    description: {
      kind: 'markdown',
      value: 'Properties that are not descendants of an element with the `itemscope` attribute can be associated with the item using an `itemref`. It provides a list of element ids (not `itemid`s) with additional properties elsewhere in the document.'
    },
    references: [
      {
        name: 'MDN Reference',
        url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemref'
      }
    ]
  },
  itemscope: {
    description: {
      kind: 'markdown',
      value: '`itemscope` (usually) works along with `[itemtype](/en-US/docs/Web/HTML/Global_attributes#attr-itemtype)` to specify that the HTML contained in a block is about a particular item. `itemscope` creates the Item and defines the scope of the `itemtype` associated with it. `itemtype` is a valid URL of a vocabulary (such as [schema.org](https://schema.org/)) that describes the item and its properties context.'
    },
    references: [
      {
        name: 'MDN Reference',
        url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemscope'
      }
    ],
    valueSet: 'v'
  },
  itemtype: {
    description: {
      kind: 'markdown',
      value: 'Specifies the URL of the vocabulary that will be used to define `itemprop`s (item properties) in the data structure. `[itemscope](/en-US/docs/Web/HTML/Global_attributes#attr-itemscope)` is used to set the scope of where in the data structure the vocabulary set by `itemtype` will be active.'
    },
    references: [
      {
        name: 'MDN Reference',
        url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemtype'
      }
    ]
  },
  lang: {
    description: {
      kind: 'markdown',
      value: 'Helps define the language of an element: the language that non-editable elements are in, or the language that editable elements should be written in by the user. The attribute contains one “language tag” (made of hyphen-separated “language subtags”) in the format defined in [_Tags for Identifying Languages (BCP47)_](https://www.ietf.org/rfc/bcp/bcp47.txt). [**xml:lang**](#attr-xml:lang) has priority over it.'
    },
    references: [
      {
        name: 'MDN Reference',
        url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/lang'
      }
    ]
  },
  part: {
    description: {
      kind: 'markdown',
      value: 'A space-separated list of the part names of the element. Part names allows CSS to select and style specific elements in a shadow tree via the [`::part`](/en-US/docs/Web/CSS/::part "The ::part CSS pseudo-element represents any element within a shadow tree that has a matching part attribute.") pseudo-element.'
    },
    references: [
      {
        name: 'MDN Reference',
        url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/part'
      }
    ]
  },
  role: {
    valueSet: 'roles'
  },
  slot: {
    description: {
      kind: 'markdown',
      value: "Assigns a slot in a [shadow DOM](/en-US/docs/Web/Web_Components/Shadow_DOM) shadow tree to an element: An element with a `slot` attribute is assigned to the slot created by the [`<slot>`](/en-US/docs/Web/HTML/Element/slot \"The HTML <slot> element—part of the Web Components technology suite—is a placeholder inside a web component that you can fill with your own markup, which lets you create separate DOM trees and present them together.\") element whose `[name](/en-US/docs/Web/HTML/Element/slot#attr-name)` attribute's value matches that `slot` attribute's value."
    },
    references: [
      {
        name: 'MDN Reference',
        url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/slot'
      }
    ]
  },
  spellcheck: {
    description: {
      kind: 'markdown',
      value: 'An enumerated attribute defines whether the element may be checked for spelling errors. It may have the following values:\n\n*   `true`, which indicates that the element should be, if possible, checked for spelling errors;\n*   `false`, which indicates that the element should not be checked for spelling errors.'
    },
    references: [
      {
        name: 'MDN Reference',
        url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/spellcheck'
      }
    ],
    valueSet: 'b'
  },
  style: {
    description: {
      kind: 'markdown',
      value: 'Contains [CSS](/en-US/docs/Web/CSS) styling declarations to be applied to the element. Note that it is recommended for styles to be defined in a separate file or files. This attribute and the [`<style>`](/en-US/docs/Web/HTML/Element/style "The HTML <style> element contains style information for a document, or part of a document.") element have mainly the purpose of allowing for quick styling, for example for testing purposes.'
    },
    references: [
      {
        name: 'MDN Reference',
        url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/style'
      }
    ]
  },
  tabindex: {
    description: {
      kind: 'markdown',
      value: 'An integer attribute indicating if the element can take input focus (is _focusable_), if it should participate to sequential keyboard navigation, and if so, at what position. It can take several values:\n\n*   a _negative value_ means that the element should be focusable, but should not be reachable via sequential keyboard navigation;\n*   `0` means that the element should be focusable and reachable via sequential keyboard navigation, but its relative order is defined by the platform convention;\n*   a _positive value_ means that the element should be focusable and reachable via sequential keyboard navigation; the order in which the elements are focused is the increasing value of the [**tabindex**](#attr-tabindex). If several elements share the same tabindex, their relative order follows their relative positions in the document.'
    },
    references: [
      {
        name: 'MDN Reference',
        url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/tabindex'
      }
    ]
  },
  title: {
    description: {
      kind: 'markdown',
      value: 'Contains a text representing advisory information related to the element it belongs to. Such information can typically, but not necessarily, be presented to the user as a tooltip.'
    },
    references: [
      {
        name: 'MDN Reference',
        url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/title'
      }
    ]
  },
  translate: {
    description: {
      kind: 'markdown',
      value: "An enumerated attribute that is used to specify whether an element's attribute values and the values of its [`Text`](/en-US/docs/Web/API/Text \"The Text interface represents the textual content of Element or Attr. If an element has no markup within its content, it has a single child implementing Text that contains the element's text. However, if the element contains markup, it is parsed into information items and Text nodes that form its children.\") node children are to be translated when the page is localized, or whether to leave them unchanged. It can have the following values:\n\n*   empty string and `yes`, which indicates that the element will be translated.\n*   `no`, which indicates that the element will not be translated."
    },
    references: [
      {
        name: 'MDN Reference',
        url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/translate'
      }
    ],
    valueSet: 'y'
  },
  onabort: {
    description: {
      kind: 'markdown',
      value: 'The loading of a resource has been aborted.'
    }
  },
  onblur: {
    description: {
      kind: 'markdown',
      value: 'An element has lost focus (does not bubble).'
    }
  },
  oncanplay: {
    description: {
      kind: 'markdown',
      value: 'The user agent can play the media, but estimates that not enough data has been loaded to play the media up to its end without having to stop for further buffering of content.'
    }
  },
  oncanplaythrough: {
    description: {
      kind: 'markdown',
      value: 'The user agent can play the media up to its end without having to stop for further buffering of content.'
    }
  },
  onchange: {
    description: {
      kind: 'markdown',
      value: "The change event is fired for <input>, <select>, and <textarea> elements when a change to the element's value is committed by the user."
    }
  },
  onclick: {
    description: {
      kind: 'markdown',
      value: 'A pointing device button has been pressed and released on an element.'
    }
  },
  oncontextmenu: {
    description: {
      kind: 'markdown',
      value: 'The right button of the mouse is clicked (before the context menu is displayed).'
    }
  },
  ondblclick: {
    description: {
      kind: 'markdown',
      value: 'A pointing device button is clicked twice on an element.'
    }
  },
  ondrag: {
    description: {
      kind: 'markdown',
      value: 'An element or text selection is being dragged (every 350ms).'
    }
  },
  ondragend: {
    description: {
      kind: 'markdown',
      value: 'A drag operation is being ended (by releasing a mouse button or hitting the escape key).'
    }
  },
  ondragenter: {
    description: {
      kind: 'markdown',
      value: 'A dragged element or text selection enters a valid drop target.'
    }
  },
  ondragleave: {
    description: {
      kind: 'markdown',
      value: 'A dragged element or text selection leaves a valid drop target.'
    }
  },
  ondragover: {
    description: {
      kind: 'markdown',
      value: 'An element or text selection is being dragged over a valid drop target (every 350ms).'
    }
  },
  ondragstart: {
    description: {
      kind: 'markdown',
      value: 'The user starts dragging an element or text selection.'
    }
  },
  ondrop: {
    description: {
      kind: 'markdown',
      value: 'An element is dropped on a valid drop target.'
    }
  },
  ondurationchange: {
    description: {
      kind: 'markdown',
      value: 'The duration attribute has been updated.'
    }
  },
  onemptied: {
    description: {
      kind: 'markdown',
      value: 'The media has become empty; for example, this event is sent if the media has already been loaded (or partially loaded), and the load() method is called to reload it.'
    }
  },
  onended: {
    description: {
      kind: 'markdown',
      value: 'Playback has stopped because the end of the media was reached.'
    }
  },
  onerror: {
    description: {
      kind: 'markdown',
      value: 'A resource failed to load.'
    }
  },
  onfocus: {
    description: {
      kind: 'markdown',
      value: 'An element has received focus (does not bubble).'
    }
  },
  onformchange: {},
  onforminput: {},
  oninput: {
    description: {
      kind: 'markdown',
      value: 'The value of an element changes or the content of an element with the attribute contenteditable is modified.'
    }
  },
  oninvalid: {
    description: {
      kind: 'markdown',
      value: "A submittable element has been checked and doesn't satisfy its constraints."
    }
  },
  onkeydown: {
    description: {
      kind: 'markdown',
      value: 'A key is pressed down.'
    }
  },
  onkeypress: {
    description: {
      kind: 'markdown',
      value: 'A key is pressed down and that key normally produces a character value (use input instead).'
    }
  },
  onkeyup: {
    description: {
      kind: 'markdown',
      value: 'A key is released.'
    }
  },
  onload: {
    description: {
      kind: 'markdown',
      value: 'A resource and its dependent resources have finished loading.'
    }
  },
  onloadeddata: {
    description: {
      kind: 'markdown',
      value: 'The first frame of the media has finished loading.'
    }
  },
  onloadedmetadata: {
    description: {
      kind: 'markdown',
      value: 'The metadata has been loaded.'
    }
  },
  onloadstart: {
    description: {
      kind: 'markdown',
      value: 'Progress has begun.'
    }
  },
  onmousedown: {
    description: {
      kind: 'markdown',
      value: 'A pointing device button (usually a mouse) is pressed on an element.'
    }
  },
  onmousemove: {
    description: {
      kind: 'markdown',
      value: 'A pointing device is moved over an element.'
    }
  },
  onmouseout: {
    description: {
      kind: 'markdown',
      value: 'A pointing device is moved off the element that has the listener attached or off one of its children.'
    }
  },
  onmouseover: {
    description: {
      kind: 'markdown',
      value: 'A pointing device is moved onto the element that has the listener attached or onto one of its children.'
    }
  },
  onmouseup: {
    description: {
      kind: 'markdown',
      value: 'A pointing device button is released over an element.'
    }
  },
  onmousewheel: {},
  onpause: {
    description: {
      kind: 'markdown',
      value: 'Playback has been paused.'
    }
  },
  onplay: {
    description: {
      kind: 'markdown',
      value: 'Playback has begun.'
    }
  },
  onplaying: {
    description: {
      kind: 'markdown',
      value: 'Playback is ready to start after having been paused or delayed due to lack of data.'
    }
  },
  onprogress: {
    description: {
      kind: 'markdown',
      value: 'In progress.'
    }
  },
  onratechange: {
    description: {
      kind: 'markdown',
      value: 'The playback rate has changed.'
    }
  },
  onreset: {
    description: {
      kind: 'markdown',
      value: 'A form is reset.'
    }
  },
  onresize: {
    description: {
      kind: 'markdown',
      value: 'The document view has been resized.'
    }
  },
  onreadystatechange: {
    description: {
      kind: 'markdown',
      value: 'The readyState attribute of a document has changed.'
    }
  },
  onscroll: {
    description: {
      kind: 'markdown',
      value: 'The document view or an element has been scrolled.'
    }
  },
  onseeked: {
    description: {
      kind: 'markdown',
      value: 'A seek operation completed.'
    }
  },
  onseeking: {
    description: {
      kind: 'markdown',
      value: 'A seek operation began.'
    }
  },
  onselect: {
    description: {
      kind: 'markdown',
      value: 'Some text is being selected.'
    }
  },
  onshow: {
    description: {
      kind: 'markdown',
      value: 'A contextmenu event was fired on/bubbled to an element that has a contextmenu attribute'
    }
  },
  onstalled: {
    description: {
      kind: 'markdown',
      value: 'The user agent is trying to fetch media data, but data is unexpectedly not forthcoming.'
    }
  },
  onsubmit: {
    description: {
      kind: 'markdown',
      value: 'A form is submitted.'
    }
  },
  onsuspend: {
    description: {
      kind: 'markdown',
      value: 'Media data loading has been suspended.'
    }
  },
  ontimeupdate: {
    description: {
      kind: 'markdown',
      value: 'The time indicated by the currentTime attribute has been updated.'
    }
  },
  onvolumechange: {
    description: {
      kind: 'markdown',
      value: 'The volume has changed.'
    }
  },
  onwaiting: {
    description: {
      kind: 'markdown',
      value: 'Playback has stopped because of a temporary lack of data.'
    }
  },
  'aria-activedescendant': {
    description: {
      kind: 'markdown',
      value: 'Identifies the currently active element when DOM focus is on a [`composite`](https://www.w3.org/TR/wai-aria-1.1/#composite) widget, [`textbox`](https://www.w3.org/TR/wai-aria-1.1/#textbox), [`group`](https://www.w3.org/TR/wai-aria-1.1/#group), or [`application`](https://www.w3.org/TR/wai-aria-1.1/#application).'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-activedescendant'
      }
    ]
  },
  'aria-atomic': {
    description: {
      kind: 'markdown',
      value: 'Indicates whether [assistive technologies](https://www.w3.org/TR/wai-aria-1.1/#dfn-assistive-technology) will present all, or only parts of, the changed region based on the change notifications defined by the [`aria-relevant`](https://www.w3.org/TR/wai-aria-1.1/#aria-relevant) attribute.'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-atomic'
      }
    ],
    valueSet: 'b'
  },
  'aria-autocomplete': {
    description: {
      kind: 'markdown',
      value: "Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be presented if they are made."
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-autocomplete'
      }
    ],
    valueSet: 'autocomplete'
  },
  'aria-busy': {
    description: {
      kind: 'markdown',
      value: 'Indicates an element is being modified and that assistive technologies _MAY_ want to wait until the modifications are complete before exposing them to the user.'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-busy'
      }
    ],
    valueSet: 'b'
  },
  'aria-checked': {
    description: {
      kind: 'markdown',
      value: 'Indicates the current "checked" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) of checkboxes, radio buttons, and other [widgets](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget). See related [`aria-pressed`](https://www.w3.org/TR/wai-aria-1.1/#aria-pressed) and [`aria-selected`](https://www.w3.org/TR/wai-aria-1.1/#aria-selected).'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-checked'
      }
    ],
    valueSet: 'tristate'
  },
  'aria-colcount': {
    description: {
      kind: 'markdown',
      value: 'Defines the total number of columns in a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-colindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-colindex).'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-colcount'
      }
    ]
  },
  'aria-colindex': {
    description: {
      kind: 'markdown',
      value: "Defines an [element's](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) column index or position with respect to the total number of columns within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-colcount`](https://www.w3.org/TR/wai-aria-1.1/#aria-colcount) and [`aria-colspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-colspan)."
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-colindex'
      }
    ]
  },
  'aria-colspan': {
    description: {
      kind: 'markdown',
      value: 'Defines the number of columns spanned by a cell or gridcell within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-colindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-colindex) and [`aria-rowspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan).'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-colspan'
      }
    ]
  },
  'aria-controls': {
    description: {
      kind: 'markdown',
      value: 'Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) whose contents or presence are controlled by the current element. See related [`aria-owns`](https://www.w3.org/TR/wai-aria-1.1/#aria-owns).'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-controls'
      }
    ]
  },
  'aria-current': {
    description: {
      kind: 'markdown',
      value: 'Indicates the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) that represents the current item within a container or set of related elements.'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-current'
      }
    ],
    valueSet: 'current'
  },
  'aria-describedat': {
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-describedat'
      }
    ]
  },
  'aria-describedby': {
    description: {
      kind: 'markdown',
      value: 'Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) that describes the [object](https://www.w3.org/TR/wai-aria-1.1/#dfn-object). See related [`aria-labelledby`](https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby).'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-describedby'
      }
    ]
  },
  'aria-disabled': {
    description: {
      kind: 'markdown',
      value: 'Indicates that the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is [perceivable](https://www.w3.org/TR/wai-aria-1.1/#dfn-perceivable) but disabled, so it is not editable or otherwise [operable](https://www.w3.org/TR/wai-aria-1.1/#dfn-operable). See related [`aria-hidden`](https://www.w3.org/TR/wai-aria-1.1/#aria-hidden) and [`aria-readonly`](https://www.w3.org/TR/wai-aria-1.1/#aria-readonly).'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-disabled'
      }
    ],
    valueSet: 'b'
  },
  'aria-dropeffect': {
    description: {
      kind: 'markdown',
      value: '\\[Deprecated in ARIA 1.1\\] Indicates what functions can be performed when a dragged object is released on the drop target.'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-dropeffect'
      }
    ],
    valueSet: 'dropeffect'
  },
  'aria-errormessage': {
    description: {
      kind: 'markdown',
      value: 'Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) that provides an error message for the [object](https://www.w3.org/TR/wai-aria-1.1/#dfn-object). See related [`aria-invalid`](https://www.w3.org/TR/wai-aria-1.1/#aria-invalid) and [`aria-describedby`](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby).'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage'
      }
    ]
  },
  'aria-expanded': {
    description: {
      kind: 'markdown',
      value: 'Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-expanded'
      }
    ],
    valueSet: 'u'
  },
  'aria-flowto': {
    description: {
      kind: 'markdown',
      value: "Identifies the next [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) in an alternate reading order of content which, at the user's discretion, allows assistive technology to override the general default of reading in document source order."
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-flowto'
      }
    ]
  },
  'aria-grabbed': {
    description: {
      kind: 'markdown',
      value: "\\[Deprecated in ARIA 1.1\\] Indicates an element's \"grabbed\" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) in a drag-and-drop operation."
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-grabbed'
      }
    ],
    valueSet: 'u'
  },
  'aria-haspopup': {
    description: {
      kind: 'markdown',
      value: 'Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element).'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup'
      }
    ],
    valueSet: 'haspopup'
  },
  'aria-hidden': {
    description: {
      kind: 'markdown',
      value: 'Indicates whether the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is exposed to an accessibility API. See related [`aria-disabled`](https://www.w3.org/TR/wai-aria-1.1/#aria-disabled).'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-hidden'
      }
    ],
    valueSet: 'b'
  },
  'aria-invalid': {
    description: {
      kind: 'markdown',
      value: 'Indicates the entered value does not conform to the format expected by the application. See related [`aria-errormessage`](https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage).'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-invalid'
      }
    ],
    valueSet: 'invalid'
  },
  'aria-kbdshortcuts': {
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-kbdshortcuts'
      }
    ]
  },
  'aria-label': {
    description: {
      kind: 'markdown',
      value: 'Defines a string value that labels the current element. See related [`aria-labelledby`](https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby).'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-label'
      }
    ]
  },
  'aria-labelledby': {
    description: {
      kind: 'markdown',
      value: 'Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) that labels the current element. See related [`aria-describedby`](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby).'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby'
      }
    ]
  },
  'aria-level': {
    description: {
      kind: 'markdown',
      value: 'Defines the hierarchical level of an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) within a structure.'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-level'
      }
    ]
  },
  'aria-live': {
    description: {
      kind: 'markdown',
      value: 'Indicates that an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) will be updated, and describes the types of updates the [user agents](https://www.w3.org/TR/wai-aria-1.1/#dfn-user-agent), [assistive technologies](https://www.w3.org/TR/wai-aria-1.1/#dfn-assistive-technology), and user can expect from the [live region](https://www.w3.org/TR/wai-aria-1.1/#dfn-live-region).'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-live'
      }
    ],
    valueSet: 'live'
  },
  'aria-modal': {
    description: {
      kind: 'markdown',
      value: 'Indicates whether an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is modal when displayed.'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-modal'
      }
    ],
    valueSet: 'b'
  },
  'aria-multiline': {
    description: {
      kind: 'markdown',
      value: 'Indicates whether a text box accepts multiple lines of input or only a single line.'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-multiline'
      }
    ],
    valueSet: 'b'
  },
  'aria-multiselectable': {
    description: {
      kind: 'markdown',
      value: 'Indicates that the user may select more than one item from the current selectable descendants.'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-multiselectable'
      }
    ],
    valueSet: 'b'
  },
  'aria-orientation': {
    description: {
      kind: 'markdown',
      value: "Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous."
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-orientation'
      }
    ],
    valueSet: 'orientation'
  },
  'aria-owns': {
    description: {
      kind: 'markdown',
      value: 'Identifies an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) in order to define a visual, functional, or contextual parent/child [relationship](https://www.w3.org/TR/wai-aria-1.1/#dfn-relationship) between DOM elements where the DOM hierarchy cannot be used to represent the relationship. See related [`aria-controls`](https://www.w3.org/TR/wai-aria-1.1/#aria-controls).'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-owns'
      }
    ]
  },
  'aria-placeholder': {
    description: {
      kind: 'markdown',
      value: 'Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value. A hint could be a sample value or a brief description of the expected format.'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder'
      }
    ]
  },
  'aria-posinset': {
    description: {
      kind: 'markdown',
      value: "Defines an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element)'s number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. See related [`aria-setsize`](https://www.w3.org/TR/wai-aria-1.1/#aria-setsize)."
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-posinset'
      }
    ]
  },
  'aria-pressed': {
    description: {
      kind: 'markdown',
      value: 'Indicates the current "pressed" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) of toggle buttons. See related [`aria-checked`](https://www.w3.org/TR/wai-aria-1.1/#aria-checked) and [`aria-selected`](https://www.w3.org/TR/wai-aria-1.1/#aria-selected).'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-pressed'
      }
    ],
    valueSet: 'tristate'
  },
  'aria-readonly': {
    description: {
      kind: 'markdown',
      value: 'Indicates that the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is not editable, but is otherwise [operable](https://www.w3.org/TR/wai-aria-1.1/#dfn-operable). See related [`aria-disabled`](https://www.w3.org/TR/wai-aria-1.1/#aria-disabled).'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-readonly'
      }
    ],
    valueSet: 'b'
  },
  'aria-relevant': {
    description: {
      kind: 'markdown',
      value: 'Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified. See related [`aria-atomic`](https://www.w3.org/TR/wai-aria-1.1/#aria-atomic).'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-relevant'
      }
    ],
    valueSet: 'relevant'
  },
  'aria-required': {
    description: {
      kind: 'markdown',
      value: 'Indicates that user input is required on the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) before a form may be submitted.'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-required'
      }
    ],
    valueSet: 'b'
  },
  'aria-roledescription': {
    description: {
      kind: 'markdown',
      value: 'Defines a human-readable, author-localized description for the [role](https://www.w3.org/TR/wai-aria-1.1/#dfn-role) of an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element).'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-roledescription'
      }
    ]
  },
  'aria-rowcount': {
    description: {
      kind: 'markdown',
      value: 'Defines the total number of rows in a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-rowindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex).'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount'
      }
    ]
  },
  'aria-rowindex': {
    description: {
      kind: 'markdown',
      value: "Defines an [element's](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) row index or position with respect to the total number of rows within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-rowcount`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount) and [`aria-rowspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan)."
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex'
      }
    ]
  },
  'aria-rowspan': {
    description: {
      kind: 'markdown',
      value: 'Defines the number of rows spanned by a cell or gridcell within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-rowindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex) and [`aria-colspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-colspan).'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan'
      }
    ]
  },
  'aria-selected': {
    description: {
      kind: 'markdown',
      value: 'Indicates the current "selected" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) of various [widgets](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget). See related [`aria-checked`](https://www.w3.org/TR/wai-aria-1.1/#aria-checked) and [`aria-pressed`](https://www.w3.org/TR/wai-aria-1.1/#aria-pressed).'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-selected'
      }
    ],
    valueSet: 'u'
  },
  'aria-setsize': {
    description: {
      kind: 'markdown',
      value: 'Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. See related [`aria-posinset`](https://www.w3.org/TR/wai-aria-1.1/#aria-posinset).'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-setsize'
      }
    ]
  },
  'aria-sort': {
    description: {
      kind: 'markdown',
      value: 'Indicates if items in a table or grid are sorted in ascending or descending order.'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-sort'
      }
    ],
    valueSet: 'sort'
  },
  'aria-valuemax': {
    description: {
      kind: 'markdown',
      value: 'Defines the maximum allowed value for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget).'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax'
      }
    ]
  },
  'aria-valuemin': {
    description: {
      kind: 'markdown',
      value: 'Defines the minimum allowed value for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget).'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin'
      }
    ]
  },
  'aria-valuenow': {
    description: {
      kind: 'markdown',
      value: 'Defines the current value for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget). See related [`aria-valuetext`](https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext).'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow'
      }
    ]
  },
  'aria-valuetext': {
    description: {
      kind: 'markdown',
      value: 'Defines the human readable text alternative of [`aria-valuenow`](https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow) for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget).'
    },
    references: [
      {
        name: 'WAI-ARIA Reference',
        url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext'
      }
    ]
  },
  'aria-details': {
    description: {
      kind: 'markdown',
      value: 'Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) that provides a detailed, extended description for the [object](https://www.w3.org/TR/wai-aria-1.1/#dfn-object). See related [`aria-describedby`](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby).'
    }
  },
  'aria-keyshortcuts': {
    description: {
      kind: 'markdown',
      value: 'Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.'
    }
  }
};
