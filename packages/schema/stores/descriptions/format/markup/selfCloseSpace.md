&nbsp;⚙️&nbsp;&nbsp;&nbsp;**Default** `false`

&nbsp;💁🏽‍♀️&nbsp;&nbsp;&nbsp;Recommended setting is `true`

#### Self Close Space

Whether markup self-closing (void) tags should apply a single space to ending portion of the delimiter which  results in the tag output to produce `' />'` instead of `'/>'`.

#### Tip

If you're working with SVG tags then this rule is highly recommended.

#

---

#### Example

_Below is an example of how this rule works if it's enabled, ie: `true`. Typically it is best to enable this option_

```html

<!-- Before formatting -->
<picture>
  <path srcset="."/>
  <path srcset="."/>
</picture>

<!-- After Formatting - Notice the the space insertion applied -->
<picture>
  <path srcset="." />
  <path srcset="." />
</picture>


```
