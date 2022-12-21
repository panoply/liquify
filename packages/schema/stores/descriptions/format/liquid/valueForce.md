&nbsp;⚙️&nbsp;&nbsp;&nbsp;**Default** `intent`

&nbsp;💁🏽‍♀️&nbsp;&nbsp;&nbsp;Recommended setting is `intent`

#### Value Force

The `valueForce` beautification rule is a multi-select rule that will force indent all attribute values to new lines in accordance with the attribute value expression provided.

#### Note

This rule will respect `forceIndent` settings, wherein if `forceIndent` is set to `false` newline breaks will not work if structures are chained together with no leading or ending whitespace characters. Please note that this rule overrides `forceAttribute` and executes as `true` so if you've defined a force attribute limit it will be overridden.

#

---

#### 👍 👍 &nbsp;&nbsp; `intent`

_Setting this rule to intent will force attributes when an attribute value is determined to contain a newline character or if the defined wrap limit has exceeded. The intent value combines both `wrap` and `newline` together, forcing when either condition is met._

```liquid

<!-- Before Formatting -->

<div id="foo" data-x="bar" class="{% if cond %}
xxx {% endif %}">
  Attributes will be forced due to newline at "xxx"

  <div id="xxx" class="{% if foo %} xxx {% else %} uuu {% endif %}">
    Assuming this exceeds a defined wrap limit, it will be forced
  </div>
</div>

<!-- After Formatting -->

<div
  id="foo"
  data-x="bar"
  class="
  {% if cond %}
    xxx
  {% endif %}">
  Attributes will be forced due to newline at "xxx"

  <div
    id="xxx"
    class="
    {% if foo %}
      xxx
    {% else %}
      uuu
    {% endif %}">
    Assuming this exceeds a defined wrap limit, it will be forced
  </div>
</div>


```

---

#### 👍 &nbsp;&nbsp; `wrap`

_Setting this rule to wrap will force attributes when an attribute value containing Liquid expressions exceeds word wrap limit. This option expects a wrap limit to be defined._

_Example Rules_

```js
import prettify from '@liquify/prettify';

prettify.options({
  wrap: 80,
  markup: {
    valueForce: 'wrap'
  }
})

```

```liquid

<!-- Before Formatting -->

<div id="xxx" class="{% if x %} xxx {% else %} uuu {% endif %}">
  Assuming this exceeds a defined wrap limit, it will be forced
</div>


<!-- After Formatting -->

<div
  id="xxx"
  class="
  {% if x %}
    xxx
  {% else %}
    uuu
  {% endif %}">
  Assuming this exceeds a defined wrap limit, it will be forced
</div>


```

---

#### 👍 &nbsp;&nbsp; `newline`

_Setting this rule to newline will force attributes when an attribute value with a Liquid expressions contains a newline character. The newline character is a signal to Prettify that the all attributes and the value should be forced. The rule will only ever be invoked when a newline is provided, it does not matter where in the value string._

```liquid

<!-- Before Formatting -->

<div id="foo" data-x="bar" class="{% if cond %}
xxx {% else %} uuu {% endif %}">

  All attributes will be forced due to newline at "xxx"

</div>


<!-- After Formatting -->

<div
  id="foo"
  data-x="bar"
  class="
  {% if cond %}
    xxx
  {% else %}
    uuu
  {% endif %}">

  All attributes will be forced due to newline at "xxx"

</div>


```

---

#### 👎 👎 &nbsp;&nbsp; `always`

_Setting this rule to `always` will force attributes whenever a value contains a Liquid tag block. Liquid output tag tokens will not apply forcing._

```liquid

<!-- Before Formatting -->

<div id="foo" data-x="bar" class="{% if c %} xxx {% else %} uuu {% endif %}">

  All attributes will be forced

</div>


<!-- After Formatting -->

<div
  id="foo"
  data-x="bar"
  class="
  {% if c %}
    xxx
  {% else %}
    uuu
  {% endif %}">

  All attributes will be forced

</div>


```


---

#### 👎 &nbsp;&nbsp; `never`

_Setting the rule to never will disable force value behavior and no value forcing will be applied. In situations where you have set `forceAttribute` to `true` or defined a `wrap` based force, values will still not be forced. You can manually apply indentations and new lines when the rule is set to `never`,_

```liquid

<!-- Before Formatting -->

<div id="foo" data-x="bar" class="{% if c %} xxx {% else %} uuu {% endif %}">

  All attributes will remain intact

</div>


<!-- After Formatting -->

<div id="foo" data-x="bar" class="{% if c %} xxx {% else %} uuu {% endif %}">

  All attributes will remain intact

</div>


```
