&nbsp;⚙️&nbsp;&nbsp;&nbsp;**Default** `default`

&nbsp;💁🏽‍♀️&nbsp;&nbsp;&nbsp;Recommended setting is `before`

#### Line Break Separator&nbsp;&nbsp;💧

Controls the placement of Liquid separator type characters in new line structures. In situations where you write a multiline tag expression this rule can augment the order of leading operator characters such as the parameter comma `,` separator.


#### Note

This rule will not break tag content on to new lines for you, it instead together with the inferred structure you've expressed. This means that you will need to manually new line the arguments.

#

---

#### 👍 &nbsp;&nbsp; `default`

_Below is an example of how this rule works if set to `default` which is the **default** setting and will leave operator placement intact. Notice in the example how the comma separator of `param_1` begins at the end of the argument whereas the comma separator of `param_3` and `param_4` begins at the start._

```liquid

<!-- Before Formatting -->
{% render 'snippet',
   param_1: true,
   param_2: 1000
   , param_3: 'string'
   , param_4: nil %}

<!-- After Formatting -->
{% render 'snippet',
   param_1: true,
   param_2: 1000
   , param_3: 'string'
   , param_4: nil %}


```

---

#### 👍 👍 &nbsp;&nbsp; `before`

_Below is an example of how this rule works if set to `before` which is recommended approach. This will ensure all operator separators begin at the start of arguments. Notice how **before** formatting the comma separators are placed at the end of each parameter argument but **after** formatting they are moved to the start._

```liquid

<!-- Before Formatting -->
{%- render 'snippet',
  param_1: true,
  param_2: 1000,
  param_3: 'string',
  param_4: nil -%}

<!-- After Formatting -->
{%- render 'snippet'
  , param_1: true
  , param_2: 1000
  , param_3: 'string'
  , param_4: nil %}


```

---

#### 👎 &nbsp;&nbsp; `after`

_Below is an example of how this rule works if set to `after` which is what most developers tend to prefer it making expressions more difficult to read._

```liquid

<!-- Before Formatting -->
{% render 'snippet'
 , param_1: true
 , param_2: 1000
 , param_3: 'string'
 , param_4: nil %}


<!-- After Formatting -->
{% render 'snippet',
   param_1: true,
   param_2: 1000,
   param_3: 'string',
   param_4: nil %}


```


