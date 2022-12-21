&nbsp;⚙️&nbsp;&nbsp;&nbsp;**Default** `default`

&nbsp;💁🏽‍♀️&nbsp;&nbsp;&nbsp;Recommended setting is `indent`

#### Array Format

The `arrayFormat` rule controls how arrays on objects are formatted. This rule will determine if all array indexes should be indented, never indented, or left to the default.

#

---


#### 👎 &nbsp;&nbsp; `default`

_Setting the rule to `default` will leave array indexes intact and format according to the provided input style._

```json

{
  "array": [ 1, 2,
    3,
    4,
    5 ]
}


```

---

#### 👍 👍 &nbsp;&nbsp; `indent`

_Setting the rule to use `indent` is the recommended beautification option. This will ensure array indexes always appear on their own line._

```json

{
  "array": [
    1,
    2,
    3,
    4,
    5
  ]
}


```

---

#### 👎 &nbsp;&nbsp; `inline`

_Setting the rule to use `inline` will output all indexes on the same line._

```json

{
  "array": [ 1, 2, 3, 4, 5 ]
}


```
