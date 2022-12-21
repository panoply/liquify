&nbsp;⚙️&nbsp;&nbsp;&nbsp;**Default** `default`

&nbsp;💁🏽‍♀️&nbsp;&nbsp;&nbsp;Recommended setting is `indent`

#### Object Indent

The `objectSort` rule will control how object keys should be handled. You can apply indented, never indented, or left to the default. Typically, you will want to leave this option to the default to prevent unreadable objects.

#

---


#### 👍 &nbsp;&nbsp; `indent`

```json

{
  "foo": {
    "bar": {
      "bax": true
    }
  }
}


```

---

#### 👎  &nbsp;&nbsp; `default`

```json

{
  "foo": {
    "bar": { "bax": true }
  }
}


```

---

#### 👎  &nbsp;&nbsp; `inline`

```json

{
  "foo": { "bar": { "bax": true } }
}


```
