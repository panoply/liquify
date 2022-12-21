&nbsp;⚙️&nbsp;&nbsp;&nbsp;**Default** `false`

&nbsp;💁🏽‍♀️&nbsp;&nbsp;&nbsp;Recommended setting is `false`

#### Attribute Sort

Provides sorting of HTML Attributes. When enabled (ie: `true`) it will sort attributes in an alpha-numeric order. Sorting is ignored on tags which contain or use Liquid output and tag tokens as attributes.

#### Related Rule

When enabled you can use the `attributeSortList` rule to defined sorting order.

#

---


#### Before Formatting

_Take the following tag with several attributes defined in no specific order. When the rule is enabled (ie: `true`) the sorting order of these attributes will change._

```html

<!-- After formatting -->
<div
  class="xxx"
  data-a="foo"
  data-b="100"
  data-c="true"
  id="x"></div>


```

#### After Formatting

_Using the above **before** sample, notice how all the attributes have now been alphabetically sorted (A-Z)._

```html

<!-- After formatting -->
<div
  class="xxx"
  data-a="foo"
  data-b="100"
  data-c="true"
  id="x"></div>


```
