&nbsp;⚙️&nbsp;&nbsp;&nbsp;**Default** `preserve`

&nbsp;💁🏽‍♀️&nbsp;&nbsp;&nbsp;Recommended setting is `preserve`

#### Attribute Casing

How markup attribute names and value casing should be processed. This defaults to `preserve` which will leave casing intact and _typically_ the best option to use.

#

---


#### 👍 &nbsp;&nbsp; `preserve`

_Below is an example of how this rule works when it is set to `preserve`. This is the default and the safest option to use._

```html

<!-- Before Formatting -->
<div data-attr="FOO-BAR"></div>

<!-- After Formatting -->
<div data-attr="FOO-BAR"></div>


```

---

#### 👎 &nbsp;&nbsp; `lowercase`

_Below is an example of how this rule work it it's set to `lowercase`. This might be problematic to use projects where casing needs to be respected as both attribute names and values will be converted to lowercase_

```html

<!-- Before Formatting -->
<div DATA-ATTR="FOO-BAR"></div>

<!-- After Formatting -->
<div data-attr="foo-bar"></div>


```

---

#### 👎 &nbsp;&nbsp; `lowercase-name`

_Below is an example of how this rule work it it's set to `lowercase-name`. This will leave attribute values intact but convert attribute names to lowercase_

```html

<!-- Before Formatting -->
<div DATA-ATTR="FOO-BAR"></div>

<!-- After Formatting -->
<div class="FOO-BAR"></div>


```

---

#### 👎 &nbsp;&nbsp; `lowercase-value`

_Below is an example of how this rule work it it's set to `lowercase-value`. This will leave attribute names intact but convert attribute values to lowercase_

```html

<!-- Before Formatting -->
<div DATA-ATTR="FOO-BAR"></div>

<!-- After Formatting -->
<div DATA-ATTR="foo-bar"></div>


```
