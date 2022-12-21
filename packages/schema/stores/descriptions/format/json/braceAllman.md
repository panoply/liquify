&nbsp;⚙️&nbsp;&nbsp;&nbsp;**Default** `true`

&nbsp;💁🏽‍♀️&nbsp;&nbsp;&nbsp;Recommended setting is `true`

#### Brace Allman

The `braceAllman` rule puts JSON braces onto new lines, producing an [Allman Style](https://en.wikipedia.org/wiki/Indentation_style#Allman_style) output.


#

---


#### 👍 &nbsp;&nbsp; Enabled

_Below is an example of the formatting style applied when this rule is enabled (ie: `true`) which is the **default** setting. Notice how all braces and placed onto new lines._

```json

[
  {
    "prop": "value"
  },
  {
    "prop": "value"
  },
  {
    "prop": "value"
  }
]


```

---


#### 👎 &nbsp;&nbsp; Disabled

_Below is an example of the formatting style applied this rule when it is disabled (ie: `false`). Notice how JSON object braces as inlined. It is typically best to keep this rule enabled when working with JSON for readability purposes._

```json

[
  { "prop": "value" },
  { "prop": "value" },
  { "prop": "value" }
]


```

