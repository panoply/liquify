&nbsp;⚙️&nbsp;&nbsp;&nbsp;**Default** `false`

&nbsp;💁🏽‍♀️&nbsp;&nbsp;&nbsp;Recommended setting is `3`

#### Force Attribute

How or if markup attributes should be indented each onto their own line. You can optionally provide an integer value of `1` or more. When an integer value is passed, attributes will be forced only if the number of attributes contained on the tag exceeds the supplied value limit.

#### Note

When you define a `wrap` level then attributes will be automatically forced when limit is exceeded unless you've set this rule to `true` or provided an integer threshold.

#

---

#### 👎 &nbsp;&nbsp; Disabled

_Below is the default, wherein attributes are not forced or indented._

```html

<div class="x" id="{{ foo }}" data-x="xx"></div>


```

---

#### 👍 &nbsp;&nbsp; Enabled

_Below is an example of how this rule works if it's enabled, ie: `true`. When working with Liquid this is typically going to be the better option to use opposed when you desire a clear uniform across all your project._

```html

<div
  class="x"
  id="{{ foo }}"
  data-x="xx"></div>


```

---

#### 👍 👍 &nbsp;&nbsp; Limit

_Below is an example of forced attributes when an integer value of `2` was provided. This is typically the best way method to control attribute indentation._

```html

<!-- Tag contains 2 attributes, they will not be forced -->
<div class="x" id="{{ foo }}"></div>

<!-- Tag contains 3 attributes, they will be forced -->
<div
  class="x"
  id="{{ foo }}"
  data-x="xx"></div>

<!-- Tag contains 1 attribute, it will not be forced-->
<div class="x"></div>

<!-- Tag contains 4 attributes, they will be forced -->
<div
  class="x"
  id="{{ foo }}"
  data-x="xx"
  data-xx="xxx"></div>


```
