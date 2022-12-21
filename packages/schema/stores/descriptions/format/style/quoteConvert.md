&nbsp;⚙️&nbsp;&nbsp;&nbsp;**Default** `none`

&nbsp;💁🏽‍♀️&nbsp;&nbsp;&nbsp;Recommended setting is `double`

#### Quote Convert

How quotation characters within style languages should be handled. Allows for conversion to single quotes or double quotes for code which requires strings expressions.

#

---

#### 👎 &nbsp;&nbsp; `none`

_Below is an example of how this rule works if set to `none` which is the **default** setting. No conversion of quotations is applied when using `none` as per the **before** and **after** examples_

```css

/* Before Formatting*/
.class-1 {
  background-image: url("example"); /* double quotations */
}

.class-2 {
  background-image: url('example'); /* single quotations */
}

/* After Formatting*/

.class-1 {
  background-image: url("example"); /* No changes applied */
}

.class-2 {
  background-image: url('example'); /* No changes applied* /
}


```

---

#### 👍 👍 &nbsp;&nbsp; `double`

_Below is an example of how this rule works if set to `double` which will go about converting and ensuring all style language quotations and using doubles._


```css

/* Before Formatting*/
.class-1 {
  background-image: url('example'); /* single quotations */
}

/* After Formatting*/

.class-1 {
  background-image: url("example"); /* double quotation conversion */
}


```

---

#### 👍 &nbsp;&nbsp; `single`


_Below is an example of how this rule works if set to `single` which will go about converting and ensuring all style language quotations and using singles._


```css

/* Before Formatting*/
.class-1 {
  background-image: url("example"); /* double quotations */
}

/* After Formatting*/

.class-1 {
  background-image: url('example'); /* single quotation conversion */
}


```

