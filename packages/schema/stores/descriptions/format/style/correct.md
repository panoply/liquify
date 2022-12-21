**Default** `false` 💁🏽‍♀️ &nbsp;&nbsp; Recommended setting is: `false`

Automatically correct some sloppiness in style languages and allows Prettify to reason with intended structures. The option acts as a very mild form of linting,wherein invalid or language specification preferred code will attempt to be corrected in the least obtrusive manner possible with respect to language standards. Enabling this rule is not going to produce miracles and for the most part will have little effect overall but can help in some situations.


> This rule is still experimental and will be both improved and refined in future versions.

#

---

#### Applied Corrections

Below is a list of current applied corrections supported when the rule is enabled, (ie: `true`). The comments in the example below will inform upon corrections that the rule will apply to code where necessary.

```css

/* Semicolon will be added when missing */
.class {
  font-weight: 200
}


```

