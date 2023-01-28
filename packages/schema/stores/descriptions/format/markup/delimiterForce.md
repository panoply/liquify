&nbsp;⚙️&nbsp;&nbsp;&nbsp;**Default** `false`

&nbsp;💁🏽‍♀️&nbsp;&nbsp;&nbsp;Recommended setting is `false`

#### Delimiter Force

Whether or not ending HTML tag delimiters should be forced onto a newline. This will emulate the style of Prettier's `singleAttributePerLine` formatting option, wherein the last `>` delimiter character breaks itself onto a new line. Though this output style was popularized by Prettier, the resulting structures produced are far from elegant (aesthetically).

#

---

#### 👍 &nbsp;&nbsp; Disabled

_Below is the default, which does not force ending delimiters `>` onto newlines in tags containing attributes._

```html

<div
  id="x"
  class="xx">

  <div
    id="x"
    class="xx">

  </div>

</div>


```

---

#### 👎  &nbsp;&nbsp; Enabled

_Below is an example of how this rule works if it's enabled, ie: `true`. Notice how the ending delimiters are forced onto newlines._

```html

<div
  id="x"
  class="xx"
>

  <div
    id="x"
    class="xx"
  >

  </div>

</div>


```


