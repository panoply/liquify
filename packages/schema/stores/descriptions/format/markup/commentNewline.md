&nbsp;⚙️&nbsp;&nbsp;&nbsp;**Default** `false`

&nbsp;💁🏽‍♀️&nbsp;&nbsp;&nbsp;Recommended setting is `true`

#### Comment Newline

Inserts a new line above comment tags. When enabled the rule will add a newline even if `preserveLine` is set to `0`. The rule will not inject new lines when the previous expression is determined to already contain a new line.

#### Note

Liquid line type comments are currently not supported by this rule. Only block type Liquid tokens will be handled.

#

---

#### Before Formatting

_Below is an example of how this rule works if it's enabled, ie: `true`. Notice how the HTML type (`<!-- -->`) comment tag immediately follows the `<li>` node, When applying beautification, a new line will be inserted. The HTML comment tag that already has a new line above it will not be touched._

```html

<ul>
 <li>Hello</li>
 <!--
   A newline will be added above me
  -->
 <li>World</li>

 <!--
   I already have a newline contained above me
   so no lines will be inserted.
  -->
 <li>How are you?</li>
</ul>


```

#### After Formatting

_Using the above sample with the rule enabled (ie: `true`), notice how the first comment now has a new line inserted, whereas the the second comment has remained the same._

```html


<ul>
 <li>Hello</li>

 <!--
   A newline will be added above me
  -->
 <li>World</li>

 <!--
   I already have a newline contained above me
   so no lines will be inserted.
  -->
 <li>How are you?</li>
</ul>

```
