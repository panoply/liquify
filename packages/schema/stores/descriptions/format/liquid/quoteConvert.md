&nbsp;⚙️&nbsp;&nbsp;&nbsp;**Default** `none`

&nbsp;💁🏽‍♀️&nbsp;&nbsp;&nbsp;Recommended setting is `double`

#### Quote Convert

How quotation characters of markup attributes and Liquid tokens should be handled. Allows for conversion to single quotes or double quotes. Markup tag attributes should always use double quotations, it's the standard in languages like HTML.

#### Tip

When working with Liquid, use `single` quotes for strings and always infer `double` in the markup.

#

---

#### 👍 &nbsp;&nbsp; `none`

_Below is an example of how this rule works if set to `none` which is the **default** setting. No conversion of quotations is applied when using `none` as per the **before** and **after** examples_

```html

<!-- Before Formatting -->
<div class='single' id="double"></div>

<!-- After Formatting -->
<div class='single' id="double"></div>

```

---

#### 👍 👍 &nbsp;&nbsp; `double`

_Below is an example of how this rule works if set to `double` which will go about converting and ensuring all markup quotations and using doubles._


```html

<!-- Before Formatting -->
<div class='foo' id='bar'></div>

<!-- After Formatting -->
<div class="foo" id="bar"></div>

```

---

#### 👎 &nbsp;&nbsp; `single`


_Below is an example of how this rule works if set to `single` which will go about converting and ensuring all markup quotations and using singles._

```html

<!-- Before Formatting -->
<div class="foo" id="bar"></div>

<!-- After Formatting -->
<div class='foo' id='bar'></div>


```

