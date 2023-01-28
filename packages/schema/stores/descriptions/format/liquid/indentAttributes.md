&nbsp;⚙️&nbsp;&nbsp;&nbsp;**Default** `false`

&nbsp;💁🏽‍♀️&nbsp;&nbsp;&nbsp;Recommended setting is `false`

#### Indent Attributes&nbsp;&nbsp;💧

Whether or not to apply indentation of HTML attributes within Liquid identified tag blocks contained in HTML Tags. This rule emulates the liquid-prettier-plugin structures with more refined controlling.

#### Related Rule

This requires the `markup` rule `forceAttributes` be set to either `true` or have limit value (e.g: `2`) defined.

#### Note

Normalized spacing does not strip newline characters and does not process code encapsulated in quotation characters (ie: "string" or 'string'). Below is an example of how this rule works if it's enabled, ie: `true` which is the default.

#

---

#### Example Options

_Below is an example of the related rules required in order for this rule to work.`_

```js

{
  liquid: {
    indentAttributes: true
  },
  markup: {
    forceAttribute: true // or you can set a limit, e.g: 2
  }
}


```

#### 👍 &nbsp;&nbsp; Disabled

*Take the following HTML tag which has containing attributes expressed conditionally. When the rule is disabled (ie: `false`) then attributes within the Liquid tags will not have indentation applied.*


```liquid

<!-- Before formatting -->

<div
  class="foo"
  {% if condition %}
  data-attr-1="hello"
  data-attr-2="world"
  {% if xx %}
  data-attr-3="bar"
  {% else %}
  id="xxxxx"
  data-baz="100"
  {% endif %}
  {% endif %}>


</div>


```

#### 👎 &nbsp;&nbsp; Disabled

*Using the above example, this is how your code will be formatted when the rule is enabled (ie: `true`). Notice how all the attributes contained between the `{% if %}` control tags are indented.*


```liquid

<!-- After formatting -->

<div
  class="foo"
  {% if condition %}
    data-attr-1="hello"
    data-attr-2="world"
    {% if xx %}
      data-attr-3="bar"
    {% else %}
      id="xxxxx"
      data-baz="100"
    {% endif %}
  {% endif %}>


</div>


```
