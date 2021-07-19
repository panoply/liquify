import { Attributes as IAttributes } from '../../types/markup';

export let Attributes: IAttributes;

Attributes = {
  accesskey: {
    description: 'Provides a hint for generating a keyboard shortcut for the current element. This attribute consists of a space-separated list of characters. The browser should use the first one that exists on the computer keyboard layout.',
    reference: {
      name: 'MDN Reference',
      url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/accesskey'
    }
  },
  autocapitalize: {
    description: 'Controls whether and how text input is automatically capitalized as it is entered/edited by the user. It can have the following values:\n\n*   `off` or `none`, no autocapitalization is applied (all letters default to lowercase)\n*   `on` or `sentences`, the first letter of each sentence defaults to a capital letter; all other letters default to lowercase\n*   `words`, the first letter of each word defaults to a capital letter; all other letters default to lowercase\n*   `characters`, all letters should default to uppercase',
    reference: {
      name: 'MDN Reference',
      url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/autocapitalize'
    }
  },
  class: {
    description: 'A space-separated list of the classes of the element. Classes allows CSS and JavaScript to select and access specific elements via the [class selectors](/en-US/docs/Web/CSS/Class_selectors) or functions like the method [`Document.getElementsByClassName()`](/en-US/docs/Web/API/Document/getElementsByClassName "returns an array-like object of all child elements which have all of the given class names.").',
    reference: {
      name: 'MDN Reference',
      url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/class'
    }
  },
  contenteditable: {
    description: 'An enumerated attribute indicating if the element should be editable by the user. If so, the browser modifies its widget to allow editing. The attribute must take one of the following values:\n\n*   `true` or the _empty string_, which indicates that the element must be editable;\n*   `false`, which indicates that the element must not be editable.',
    reference: {
      name: 'MDN Reference',
      url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/contenteditable'
    }
  },
  contextmenu: {
    description: 'The `[**id**](#attr-id)` of a [`<menu>`](/en-US/docs/Web/HTML/Element/menu "The HTML <menu> element represents a group of commands that a user can perform or activate. This includes both list menus, which might appear across the top of a screen, as well as context menus, such as those that might appear underneath a button after it has been clicked.") to use as the contextual menu for this element.',
    reference: {
      name: 'MDN Reference',
      url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/contextmenu'
    }
  },
  dir: {
    value: 'd',
    description: "An enumerated attribute indicating the directionality of the element's text. It can have the following values:\n\n*   `ltr`, which means _left to right_ and is to be used for languages that are written from the left to the right (like English);\n*   `rtl`, which means _right to left_ and is to be used for languages that are written from the right to the left (like Arabic);\n*   `auto`, which lets the user agent decide. It uses a basic algorithm as it parses the characters inside the element until it finds a character with a strong directionality, then it applies that directionality to the whole element.",
    reference: {
      name: 'MDN Reference',
      url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/dir'
    }
  },
  draggable: {
    value: 'b',
    description: 'An enumerated attribute indicating whether the element can be dragged, using the [Drag and Drop API](/en-us/docs/DragDrop/Drag_and_Drop). It can have the following values:\n\n*   `true`, which indicates that the element may be dragged\n*   `false`, which indicates that the element may not be dragged.',
    reference: {
      name: 'MDN Reference',
      url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/draggable'
    }
  },
  dropzone: {
    description: 'An enumerated attribute indicating what types of content can be dropped on an element, using the [Drag and Drop API](/en-US/docs/DragDrop/Drag_and_Drop). It can have the following values:\n\n*   `copy`, which indicates that dropping will create a copy of the element that was dragged\n*   `move`, which indicates that the element that was dragged will be moved to this new location.\n*   `link`, will create a link to the dragged data.'
  },
  exportparts: {
    description: 'Used to transitively export shadow parts from a nested shadow tree into a containing light tree.',
    reference: {
      name: 'MDN Reference',
      url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/exportparts'
    }
  },
  hidden: {
    value: 'v',
    description: "A Boolean attribute indicates that the element is not yet, or is no longer, _relevant_. For example, it can be used to hide elements of the page that can't be used until the login process has been completed. The browser won't render such elements. This attribute must not be used to hide content that could legitimately be shown.",
    reference: {
      name: 'MDN Reference',
      url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/hidden'
    }
  },
  id: {
    description: 'Defines a unique identifier (ID) which must be unique in the whole document. Its purpose is to identify the element when linking (using a fragment identifier), scripting, or styling (with CSS).',
    reference: {
      name: 'MDN Reference',
      url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/id'
    }
  },
  inputmode: {
    description: 'Provides a hint to browsers as to the type of virtual keyboard configuration to use when editing this element or its contents. Used primarily on [`<input>`](/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") elements, but is usable on any element while in `[contenteditable](/en-US/docs/Web/HTML/Global_attributes#attr-contenteditable)` mode.',
    reference: {
      name: 'MDN Reference',
      url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/inputmode'
    }
  },
  is: {
    description: 'Allows you to specify that a standard HTML element should behave like a registered custom built-in element (see [Using custom elements](/en-US/docs/Web/Web_Components/Using_custom_elements) for more details).',
    reference: {
      name: 'MDN Reference',
      url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/is'
    }
  },
  itemid: {
    description: 'The unique, global identifier of an item.',
    reference: {
      name: 'MDN Reference',
      url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemid'
    }
  },
  itemprop: {
    description: 'Used to add properties to an item. Every HTML element may have an `itemprop` attribute specified, where an `itemprop` consists of a name and value pair.',
    reference: {
      name: 'MDN Reference',
      url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemprop'
    }
  },
  itemref: {
    description: 'Properties that are not descendants of an element with the `itemscope` attribute can be associated with the item using an `itemref`. It provides a list of element ids (not `itemid`s) with additional properties elsewhere in the document.',
    reference: {
      name: 'MDN Reference',
      url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemref'
    }
  },
  itemscope: {
    value: 'v',
    description: '`itemscope` (usually) works along with `[itemtype](/en-US/docs/Web/HTML/Global_attributes#attr-itemtype)` to specify that the HTML contained in a block is about a particular item. `itemscope` creates the Item and defines the scope of the `itemtype` associated with it. `itemtype` is a valid URL of a vocabulary (such as [schema.org](https://schema.org/)) that describes the item and its properties context.',
    reference: {
      name: 'MDN Reference',
      url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemscope'
    }
  },
  itemtype: {
    description: 'Specifies the URL of the vocabulary that will be used to define `itemprop`s (item properties) in the data structure. `[itemscope](/en-US/docs/Web/HTML/Global_attributes#attr-itemscope)` is used to set the scope of where in the data structure the vocabulary set by `itemtype` will be active.',
    reference: {
      name: 'MDN Reference',
      url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemtype'
    }
  },
  lang: {
    description: 'Helps define the language of an element: the language that non-editable elements are in, or the language that editable elements should be written in by the user. The attribute contains one “language tag” (made of hyphen-separated “language subtags”) in the format defined in [_Tags for Identifying Languages (BCP47)_](https://www.ietf.org/rfc/bcp/bcp47.txt). [**xml:lang**](#attr-xml:lang) has priority over it.',
    reference: {
      name: 'MDN Reference',
      url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/lang'
    }
  },
  part: {
    description: 'A space-separated list of the part names of the element. Part names allows CSS to select and style specific elements in a shadow tree via the [`::part`](/en-US/docs/Web/CSS/::part "The ::part CSS pseudo-element represents any element within a shadow tree that has a matching part attribute.") pseudo-element.',
    reference: {
      name: 'MDN Reference',
      url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/part'
    }
  },
  role: {
    value: 'roles'
  },
  slot: {
    description: "Assigns a slot in a [shadow DOM](/en-US/docs/Web/Web_Components/Shadow_DOM) shadow tree to an element: An element with a `slot` attribute is assigned to the slot created by the [`<slot>`](/en-US/docs/Web/HTML/Element/slot \"The HTML <slot> element—part of the Web Components technology suite—is a placeholder inside a web component that you can fill with your own markup, which lets you create separate DOM trees and present them together.\") element whose `[name](/en-US/docs/Web/HTML/Element/slot#attr-name)` attribute's value matches that `slot` attribute's value.",
    reference: {
      name: 'MDN Reference',
      url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/slot'
    }
  },
  spellcheck: {
    value: 'b',
    description: 'An enumerated attribute defines whether the element may be checked for spelling errors. It may have the following values:\n\n*   `true`, which indicates that the element should be, if possible, checked for spelling errors;\n*   `false`, which indicates that the element should not be checked for spelling errors.',
    reference: {
      name: 'MDN Reference',
      url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/spellcheck'
    }
  },
  style: {
    description: 'Contains [CSS](/en-US/docs/Web/CSS) styling declarations to be applied to the element. Note that it is recommended for styles to be defined in a separate file or files. This attribute and the [`<style>`](/en-US/docs/Web/HTML/Element/style "The HTML <style> element contains style information for a document, or part of a document.") element have mainly the purpose of allowing for quick styling, for example for testing purposes.',
    reference: {
      name: 'MDN Reference',
      url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/style'
    }
  },
  tabindex: {
    description: 'An integer attribute indicating if the element can take input focus (is _focusable_), if it should participate to sequential keyboard navigation, and if so, at what position. It can take several values:\n\n*   a _negative value_ means that the element should be focusable, but should not be reachable via sequential keyboard navigation;\n*   `0` means that the element should be focusable and reachable via sequential keyboard navigation, but its relative order is defined by the platform convention;\n*   a _positive value_ means that the element should be focusable and reachable via sequential keyboard navigation; the order in which the elements are focused is the increasing value of the [**tabindex**](#attr-tabindex). If several elements share the same tabindex, their relative order follows their relative positions in the document.',
    reference: {
      name: 'MDN Reference',
      url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/tabindex'
    }
  },
  title: {
    description: 'Contains a text representing advisory information related to the element it belongs to. Such information can typically, but not necessarily, be presented to the user as a tooltip.',
    reference: {
      name: 'MDN Reference',
      url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/title'
    }
  },
  translate: {
    value: 'y',
    description: "An enumerated attribute that is used to specify whether an element's attribute values and the values of its [`Text`](/en-US/docs/Web/API/Text \"The Text interface represents the textual content of Element or Attr. If an element has no markup within its content, it has a single child implementing Text that contains the element's text. However, if the element contains markup, it is parsed into information items and Text nodes that form its children.\") node children are to be translated when the page is localized, or whether to leave them unchanged. It can have the following values:\n\n*   empty string and `yes`, which indicates that the element will be translated.\n*   `no`, which indicates that the element will not be translated.",
    reference: {
      name: 'MDN Reference',
      url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/translate'
    }
  },
  onabort: {
    description: 'The loading of a resource has been aborted.'
  },
  onblur: {
    description: 'An element has lost focus (does not bubble).'
  },
  oncanplay: {
    description: 'The user agent can play the media, but estimates that not enough data has been loaded to play the media up to its end without having to stop for further buffering of content.'
  },
  oncanplaythrough: {
    description: 'The user agent can play the media up to its end without having to stop for further buffering of content.'
  },
  onchange: {
    description: "The change event is fired for <input>, <select>, and <textarea> elements when a change to the element's value is committed by the user."
  },
  onclick: {
    description: 'A pointing device button has been pressed and released on an element.'
  },
  oncontextmenu: {
    description: 'The right button of the mouse is clicked (before the context menu is displayed).'
  },
  ondblclick: {
    description: 'A pointing device button is clicked twice on an element.'
  },
  ondrag: {
    description: 'An element or text selection is being dragged (every 350ms).'
  },
  ondragend: {
    description: 'A drag operation is being ended (by releasing a mouse button or hitting the escape key).'
  },
  ondragenter: {
    description: 'A dragged element or text selection enters a valid drop target.'
  },
  ondragleave: {
    description: 'A dragged element or text selection leaves a valid drop target.'
  },
  ondragover: {
    description: 'An element or text selection is being dragged over a valid drop target (every 350ms).'
  },
  ondragstart: {
    description: 'The user starts dragging an element or text selection.'
  },
  ondrop: {
    description: 'An element is dropped on a valid drop target.'
  },
  ondurationchange: {
    description: 'The duration attribute has been updated.'
  },
  onemptied: {
    description: 'The media has become empty; for example, this event is sent if the media has already been loaded (or partially loaded), and the load() method is called to reload it.'
  },
  onended: {
    description: 'Playback has stopped because the end of the media was reached.'
  },
  onerror: {
    description: 'A resource failed to load.'
  },
  onfocus: {
    description: 'An element has received focus (does not bubble).'
  },
  onformchange: {},
  onforminput: {},
  oninput: {
    description: 'The value of an element changes or the content of an element with the attribute contenteditable is modified.'
  },
  oninvalid: {
    description: "A submittable element has been checked and doesn't satisfy its constraints."
  },
  onkeydown: {
    description: 'A key is pressed down.'
  },
  onkeypress: {
    description: 'A key is pressed down and that key normally produces a character value (use input instead).'
  },
  onkeyup: {
    description: 'A key is released.'
  },
  onload: {
    description: 'A resource and its dependent resources have finished loading.'
  },
  onloadeddata: {
    description: 'The first frame of the media has finished loading.'
  },
  onloadedmetadata: {
    description: 'The metadata has been loaded.'
  },
  onloadstart: {
    description: 'Progress has begun.'
  },
  onmousedown: {
    description: 'A pointing device button (usually a mouse) is pressed on an element.'
  },
  onmousemove: {
    description: 'A pointing device is moved over an element.'
  },
  onmouseout: {
    description: 'A pointing device is moved off the element that has the listener attached or off one of its children.'
  },
  onmouseover: {
    description: 'A pointing device is moved onto the element that has the listener attached or onto one of its children.'
  },
  onmouseup: {
    description: 'A pointing device button is released over an element.'
  },
  onmousewheel: {},
  onpause: {
    description: 'Playback has been paused.'
  },
  onplay: {
    description: 'Playback has begun.'
  },
  onplaying: {
    description: 'Playback is ready to start after having been paused or delayed due to lack of data.'
  },
  onprogress: {
    description: 'In progress.'
  },
  onratechange: {
    description: 'The playback rate has changed.'
  },
  onreset: {
    description: 'A form is reset.'
  },
  onresize: {
    description: 'The document view has been resized.'
  },
  onreadystatechange: {
    description: 'The readyState attribute of a document has changed.'
  },
  onscroll: {
    description: 'The document view or an element has been scrolled.'
  },
  onseeked: {
    description: 'A seek operation completed.'
  },
  onseeking: {
    description: 'A seek operation began.'
  },
  onselect: {
    description: 'Some text is being selected.'
  },
  onshow: {
    description: 'A contextmenu event was fired on/bubbled to an element that has a contextmenu attribute'
  },
  onstalled: {
    description: 'The user agent is trying to fetch media data, but data is unexpectedly not forthcoming.'
  },
  onsubmit: {
    description: 'A form is submitted.'
  },
  onsuspend: {
    description: 'Media data loading has been suspended.'
  },
  ontimeupdate: {
    description: 'The time indicated by the currentTime attribute has been updated.'
  },
  onvolumechange: {
    description: 'The volume has changed.'
  },
  onwaiting: {
    description: 'Playback has stopped because of a temporary lack of data.'
  },
  'aria-activedescendant': {
    description: 'Identifies the currently active element when DOM focus is on a [`composite`](https://www.w3.org/TR/wai-aria-1.1/#composite) widget, [`textbox`](https://www.w3.org/TR/wai-aria-1.1/#textbox), [`group`](https://www.w3.org/TR/wai-aria-1.1/#group), or [`application`](https://www.w3.org/TR/wai-aria-1.1/#application).',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-activedescendant'
    }
  },
  'aria-atomic': {
    value: 'b',
    description: 'Indicates whether [assistive technologies](https://www.w3.org/TR/wai-aria-1.1/#dfn-assistive-technology) will present all, or only parts of, the changed region based on the change notifications defined by the [`aria-relevant`](https://www.w3.org/TR/wai-aria-1.1/#aria-relevant) attribute.',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-atomic'
    }
  },
  'aria-autocomplete': {
    value: 'autocomplete',
    description: "Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be presented if they are made.",
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-autocomplete'
    }
  },
  'aria-busy': {
    value: 'b',
    description: 'Indicates an element is being modified and that assistive technologies _MAY_ want to wait until the modifications are complete before exposing them to the user.',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-busy'
    }
  },
  'aria-checked': {
    value: 'tristate',
    description: 'Indicates the current "checked" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) of checkboxes, radio buttons, and other [widgets](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget). See related [`aria-pressed`](https://www.w3.org/TR/wai-aria-1.1/#aria-pressed) and [`aria-selected`](https://www.w3.org/TR/wai-aria-1.1/#aria-selected).',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-checked'
    }
  },
  'aria-colcount': {
    description: 'Defines the total number of columns in a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-colindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-colindex).',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-colcount'
    }
  },
  'aria-colindex': {
    description: "Defines an [element's](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) column index or position with respect to the total number of columns within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-colcount`](https://www.w3.org/TR/wai-aria-1.1/#aria-colcount) and [`aria-colspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-colspan).",
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-colindex'
    }
  },
  'aria-colspan': {
    description: 'Defines the number of columns spanned by a cell or gridcell within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-colindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-colindex) and [`aria-rowspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan).',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-colspan'
    }
  },
  'aria-controls': {
    description: 'Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) whose contents or presence are controlled by the current element. See related [`aria-owns`](https://www.w3.org/TR/wai-aria-1.1/#aria-owns).',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-controls'
    }
  },
  'aria-current': {
    value: 'current',
    description: 'Indicates the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) that represents the current item within a container or set of related elements.',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-current'
    }
  },
  'aria-describedat': {
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-describedat'
    }
  },
  'aria-describedby': {
    description: 'Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) that describes the [object](https://www.w3.org/TR/wai-aria-1.1/#dfn-object). See related [`aria-labelledby`](https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby).',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-describedby'
    }
  },
  'aria-disabled': {
    value: 'b',
    description: 'Indicates that the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is [perceivable](https://www.w3.org/TR/wai-aria-1.1/#dfn-perceivable) but disabled, so it is not editable or otherwise [operable](https://www.w3.org/TR/wai-aria-1.1/#dfn-operable). See related [`aria-hidden`](https://www.w3.org/TR/wai-aria-1.1/#aria-hidden) and [`aria-readonly`](https://www.w3.org/TR/wai-aria-1.1/#aria-readonly).',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-disabled'
    }
  },
  'aria-dropeffect': {
    value: 'dropeffect',
    description: '\\[Deprecated in ARIA 1.1\\] Indicates what functions can be performed when a dragged object is released on the drop target.',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-dropeffect'
    }
  },
  'aria-errormessage': {
    description: 'Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) that provides an error message for the [object](https://www.w3.org/TR/wai-aria-1.1/#dfn-object). See related [`aria-invalid`](https://www.w3.org/TR/wai-aria-1.1/#aria-invalid) and [`aria-describedby`](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby).',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage'
    }
  },
  'aria-expanded': {
    value: 'u',
    description: 'Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-expanded'
    }
  },
  'aria-flowto': {
    description: "Identifies the next [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) in an alternate reading order of content which, at the user's discretion, allows assistive technology to override the general default of reading in document source order.",
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-flowto'
    }
  },
  'aria-grabbed': {
    value: 'u',
    description: "\\[Deprecated in ARIA 1.1\\] Indicates an element's \"grabbed\" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) in a drag-and-drop operation.",
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-grabbed'
    }
  },
  'aria-haspopup': {
    value: 'haspopup',
    description: 'Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element).',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup'
    }
  },
  'aria-hidden': {
    value: 'b',
    description: 'Indicates whether the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is exposed to an accessibility API. See related [`aria-disabled`](https://www.w3.org/TR/wai-aria-1.1/#aria-disabled).',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-hidden'
    }
  },
  'aria-invalid': {
    value: 'invalid',
    description: 'Indicates the entered value does not conform to the format expected by the application. See related [`aria-errormessage`](https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage).',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-invalid'
    }
  },
  'aria-kbdshortcuts': {
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-kbdshortcuts'
    }
  },
  'aria-label': {
    description: 'Defines a string value that labels the current element. See related [`aria-labelledby`](https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby).',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-label'
    }
  },
  'aria-labelledby': {
    description: 'Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) that labels the current element. See related [`aria-describedby`](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby).',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby'
    }
  },
  'aria-level': {
    description: 'Defines the hierarchical level of an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) within a structure.',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-level'
    }
  },
  'aria-live': {
    value: 'live',
    description: 'Indicates that an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) will be updated, and describes the types of updates the [user agents](https://www.w3.org/TR/wai-aria-1.1/#dfn-user-agent), [assistive technologies](https://www.w3.org/TR/wai-aria-1.1/#dfn-assistive-technology), and user can expect from the [live region](https://www.w3.org/TR/wai-aria-1.1/#dfn-live-region).',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-live'
    }
  },
  'aria-modal': {
    value: 'b',
    description: 'Indicates whether an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is modal when displayed.',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-modal'
    }
  },
  'aria-multiline': {
    value: 'b',
    description: 'Indicates whether a text box accepts multiple lines of input or only a single line.',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-multiline'
    }
  },
  'aria-multiselectable': {
    value: 'b',
    description: 'Indicates that the user may select more than one item from the current selectable descendants.',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-multiselectable'
    }
  },
  'aria-orientation': {
    value: 'orientation',
    description: "Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.",
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-orientation'
    }
  },
  'aria-owns': {
    description: 'Identifies an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) in order to define a visual, functional, or contextual parent/child [relationship](https://www.w3.org/TR/wai-aria-1.1/#dfn-relationship) between DOM elements where the DOM hierarchy cannot be used to represent the relationship. See related [`aria-controls`](https://www.w3.org/TR/wai-aria-1.1/#aria-controls).',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-owns'
    }
  },
  'aria-placeholder': {
    description: 'Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value. A hint could be a sample value or a brief description of the expected format.',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder'
    }
  },
  'aria-posinset': {
    description: "Defines an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element)'s number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. See related [`aria-setsize`](https://www.w3.org/TR/wai-aria-1.1/#aria-setsize).",
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-posinset'
    }
  },
  'aria-pressed': {
    value: 'tristate',
    description: 'Indicates the current "pressed" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) of toggle buttons. See related [`aria-checked`](https://www.w3.org/TR/wai-aria-1.1/#aria-checked) and [`aria-selected`](https://www.w3.org/TR/wai-aria-1.1/#aria-selected).',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-pressed'
    }
  },
  'aria-readonly': {
    value: 'b',
    description: 'Indicates that the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is not editable, but is otherwise [operable](https://www.w3.org/TR/wai-aria-1.1/#dfn-operable). See related [`aria-disabled`](https://www.w3.org/TR/wai-aria-1.1/#aria-disabled).',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-readonly'
    }
  },
  'aria-relevant': {
    value: 'relevant',
    description: 'Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified. See related [`aria-atomic`](https://www.w3.org/TR/wai-aria-1.1/#aria-atomic).',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-relevant'
    }
  },
  'aria-required': {
    value: 'b',
    description: 'Indicates that user input is required on the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) before a form may be submitted.',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-required'
    }
  },
  'aria-roledescription': {
    description: 'Defines a human-readable, author-localized description for the [role](https://www.w3.org/TR/wai-aria-1.1/#dfn-role) of an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element).',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-roledescription'
    }
  },
  'aria-rowcount': {
    description: 'Defines the total number of rows in a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-rowindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex).',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount'
    }
  },
  'aria-rowindex': {
    description: "Defines an [element's](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) row index or position with respect to the total number of rows within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-rowcount`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount) and [`aria-rowspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan).",
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex'
    }
  },
  'aria-rowspan': {
    description: 'Defines the number of rows spanned by a cell or gridcell within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-rowindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex) and [`aria-colspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-colspan).',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan'
    }
  },
  'aria-selected': {
    value: 'u',
    description: 'Indicates the current "selected" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) of various [widgets](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget). See related [`aria-checked`](https://www.w3.org/TR/wai-aria-1.1/#aria-checked) and [`aria-pressed`](https://www.w3.org/TR/wai-aria-1.1/#aria-pressed).',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-selected'
    }
  },
  'aria-setsize': {
    description: 'Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. See related [`aria-posinset`](https://www.w3.org/TR/wai-aria-1.1/#aria-posinset).',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-setsize'
    }
  },
  'aria-sort': {
    value: 'sort',
    description: 'Indicates if items in a table or grid are sorted in ascending or descending order.',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-sort'
    }
  },
  'aria-valuemax': {
    description: 'Defines the maximum allowed value for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget).',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax'
    }
  },
  'aria-valuemin': {
    description: 'Defines the minimum allowed value for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget).',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin'
    }
  },
  'aria-valuenow': {
    description: 'Defines the current value for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget). See related [`aria-valuetext`](https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext).',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow'
    }
  },
  'aria-valuetext': {
    description: 'Defines the human readable text alternative of [`aria-valuenow`](https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow) for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget).',
    reference: {
      name: 'WAI-ARIA Reference',
      url: 'https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext'
    }
  },
  'aria-details': {
    description: 'Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) that provides a detailed, extended description for the [object](https://www.w3.org/TR/wai-aria-1.1/#dfn-object). See related [`aria-describedby`](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby).'
  },
  'aria-keyshortcuts': {
    description: 'Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.'
  }
};
