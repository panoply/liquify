&nbsp;⚙️&nbsp;&nbsp;&nbsp;**Default** `preserve`

&nbsp;💁🏽‍♀️&nbsp;&nbsp;&nbsp;Recommended setting is `tags`


#### Delimiter Trims&nbsp;&nbsp;💧

How delimiter whitespace trim dashes (`{%-`, `-%}`, `{{-` and `-}}`) should handled in Liquid tags and output object tokens. You should _maybe_ avoid setting this to `force` in order to avoid stripping whitespace in cases where text content contains Liquid.


#### Note

This rule will not touch Liquid tokens encapsulated within strings, ie: `"{{ foo }}"` or `'{{ foo }}'` are left intact.

#

---


#### 👍 &nbsp;&nbsp; `preserve`

_Below is an example of how this rule works if set to `preserve` which is the **default** and will leave all occurrences of trims on Liquid tokens intact_

```liquid

<!-- Before Formatting -->
{% if x -%}
  {{- foo }} {{- bar }}
{% endif -%}

<!-- After Formatting -->
{% if x -%}
  {{- foo }} {{- bar }}
{% endif -%}


```

---

#### 👍 👍 &nbsp;&nbsp; `tags`

_Below is an example of how this rule works if set to `tags` which will apply trims to Liquid tag tokens but leave object output tokens intact. This is typically the best option to use._

```liquid

<!-- Before formatting -->
{% if x %}
 {{ foo -}} {{- bar }}
{% endof %}

<!-- Before formatting -->
{%- if x -%}
 {{ foo -}} {{- bar }}
{%- endof -%}


```

---

#### 👎 &nbsp;&nbsp; `outputs`

_Below is an example of how this rule works if set to `outputs` which will apply trims to Liquid object output tokens but leave tag tokens intact. Notice how the `if` and `endif` tag is not touched but the `{{ foo }}` and `{{ bar }}` tokens have trims applied **after** formatting._

```liquid

<!-- Before formatting -->
{% if x -%}
 {{ foo }} {{ bar }}
{%- endof %}

<!-- After formatting -->
{% if x -%}
  {{- foo -}} {{- bar -}}
{%- endof %}


```

---

#### 👎 &nbsp;&nbsp; `strip`

_Below is an example of how this rule works if set to `strip` which will remove all occurrences of trims from Liquid tokens. Notice how the all tags and output object token trims are removed  **after** formatting._

```liquid

<!-- Before Formatting -->
{%- if x -%}
  {{- foo -}} {{- bar -}}
{%- endif -%}

<!-- After Formatting -->
{% if x %}
  {{ foo }} {{ bar }}
{% endif %}


```

---

#### 👎 👎 &nbsp;&nbsp; `force`

_Below is an example of how this rule works if set to `force` which will apply trims to all Liquid tokens. You should maybe avoid using this option unless you are completely sure it will not cause issues when Liquid code is rendered in your project_

```liquid

<!-- Before Formatting -->
{% if x %}
  {{ foo }} {{ bar }}
{% endif %}


<!-- After Formatting -->
{%- if x -%}
  {{- foo -}} {{- bar -}}
{%- endif -%}


```

