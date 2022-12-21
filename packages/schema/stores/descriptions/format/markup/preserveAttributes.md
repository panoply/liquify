&nbsp;⚙️&nbsp;&nbsp;&nbsp;**Default** `false`

&nbsp;💁🏽‍♀️&nbsp;&nbsp;&nbsp;Recommended setting is `false`

#### Preserve Attributes

Whether or not markup tags should have their insides preserved, ie: attributes. This option is only available to markup and does not support child tokens that require a different lexer. When enabled, this rule will run precedence and override all attribute related rules.

#### Tip

If you're working with a JavaScript framework that implements a data-attribute development based architecture (like Alpine or Angular) which requires a build-step then this rule _might_ help prevent Prettify augmenting code or failing when it encounters otherwise invalid structures not supported or recognized by official markup based language specifications.

#

---

#### Example

Below is an example of how this rule works if it's enabled, ie: `true`. There is no difference between the _before_ and _after_ version of the code when this option is enabled. Typically, you are not going to want to enable this rule unless of course your project is better off using it.

```html

<!-- Before Formatting -->
<div
  id="x"    data-x="foo"
 class="xx"></div>

<!-- After Formatting -->
<div
  id="x"    data-x="foo"
 class="xx"></div>


```
