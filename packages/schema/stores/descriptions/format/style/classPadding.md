&nbsp;⚙️&nbsp;&nbsp;&nbsp;**Default** `false`

&nbsp;💁🏽‍♀️&nbsp;&nbsp;&nbsp;Recommended setting is `true`

#### Class Padding

This rules will insert a new line between class selectors. If you've set `preserveLine` to `0` then the rule will run precedence (override) and ensure new line separation is applied (top down) for each class selector expressed.

#### Note

This rule is typically a matter of preference and widely adopted structural pattern when it comes to CSS class selectors. If you're infusing CSS together with Liquid then it is **highly recommended** that you enable this rule.

#

---

#### 👍 &nbsp;&nbsp; Enabled

_This is an example when this rule is enabled (ie: `true`). Notice how **before** formatting each class selector immediately proceeds the last closing brace `}` character, whereas **after** formatting the selector class names have a new line inserted. When this rule is disabled, Prettify will not assert a break as per the **disabled** example below._

```css

/* Before Formatting */

.class {
  color: #111;
}
.class-2 {
  background: pink;
}
.class-3 {
  font-size: 12px;
}

/* After Formatting */

.class {
  color: #111;
}

.class-2 {
  background: pink;
}

.class-3 {
  font-size: 12px;
}


```

---


#### 👎 👎 &nbsp;&nbsp; Disabled

_Below is an example when this option is disabled (ie: `false`) which is the default setting. Though the recommendation is to enable this rule, Prettify does not assume intent and instead assumes new line breaks in accordance with the `preserveLine` value you've set. In the below example there no difference **before** and **after** formatting, the code structure is respected and no new lines are added._

```css

/* Before Formatting */

.class {
  color: #111;
}
.class-2 {
  background: pink;
}
.class-3 {
  font-size: 12px;
}

/* After Formatting */

.class {
  color: #111;
}
.class-2 {
  background: pink;
}
.class-3 {
  font-size: 12px;
}


```
