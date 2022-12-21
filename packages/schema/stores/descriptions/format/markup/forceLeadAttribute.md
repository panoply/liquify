&nbsp;⚙️&nbsp;&nbsp;&nbsp;**Default** `false`

&nbsp;💁🏽‍♀️&nbsp;&nbsp;&nbsp;Recommended setting is `true`

#### Force Lead Attribute

Whether the leading attribute should be forced onto a newline when word `wrap` limit is exceeded or if it should be preserved. By default, Prettify preserves the leading attribute when applying wrap indentation. Enabling this option will force indent all attributes if wrap is exceeded.

#### Related Rule

This rule requires a `wrap` level to be defined.

#### Note

If you have `forceAttribute` enabled or using a force attribute limit value it will override this option. If you desire wrap based attribute indentation, set `forceAttribute` to `false` and ensure a `wrap` level is defined.

#

---

#### 👎 &nbsp;&nbsp; Disabled

_Below is an example of how this rule works if it's disabled (ie: `false`) and attributes have exceeded a defined wrap limit. Notice how leading attributes are preserved that have not exceeded wrap, but proceeding attributes are indented onto their own lines, this is the default behavior Prettify uses._

```html

<!-- Leading attribute is preserved -->
<div class="x"
  id="{{ foo }}"
  data-attribute-example="100"
  data-x="xx"></div>


```

---

#### 👍 &nbsp;&nbsp; Enabled

_Below is an example of how this rule works if it's enabled (ie: `true`) and attributes have exceeded the defined wrap limit. Notice how all attributes and indented onto their own line, including the leading attribute._

```html

<!-- All attributes are forced including the leading attribute  -->
<div
  class="x"
  id="{{ foo }}"
  data-attribute-example="100"
  data-x="xx"></div>


```
