&nbsp;⚙️&nbsp;&nbsp;&nbsp;**Default** `[]`

&nbsp;💁🏽‍♀️&nbsp;&nbsp;&nbsp;Recommended setting is `[]`

#### Attribute Sort List

A comma separated list of attribute names. Attributes will be sorted according to this list and then alphanumerically. This option requires `attributeSort` to be enabled, ie: have a value of `true`. If you have not set `attributeSort` to `true` then this rule will have no effect.

#### Required Rule

The `attributeSort` rule must be enabled, ie: `true`

#

---


#### Example Options

_Below is an example of how this rule works and you've defined the following attribute sorting structure_

```js

{
  attributeSort: true, // must be true when using this rule
  attributeSortList: [
    'id',
    'class',
    'data-b',
    'data-z'
  ]
}


```

#### Before Formatting

_Using the above example options, let's consider the following attributes contained on a tag. Notice how each attribute is expressed in a no specific order. This will change **after** formatting as per the **after** example._

```html

<!-- Before formatting -->
<div
  data-z
  data-a
  id="x"
  data-d
  data-c
  data-b
  data-e
  class="xx"></div>


```

#### After Formatting

_Using the above **before** formatting example, notice how **after** formatting the attribute sort order has been changed. The `id`, `class`, `data-b` and `data-z` attributes are now sorted in accordance with above example options. The `data-a`, `data-c` `data-d` and `data-e` attributes have also been sorted but in alphabetical order following the sort list we passed._

_When using the `attributeSortList` rule, all attributes that are not defined will be sorted alphabetically proceeding those you've provided._


```html

<!-- After formatting -->
<div
  id="x"
  class="xx"
  data-b
  data-z
  data-a
  data-c
  data-d></div>


```
