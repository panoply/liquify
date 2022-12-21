&nbsp;⚙️&nbsp;&nbsp;&nbsp;**Default** `false`

&nbsp;💁🏽‍♀️&nbsp;&nbsp;&nbsp;Recommended setting is `true`

#### Comment Indent

Whether or not to indent the containing content of comment blocks.

#### Note

This rule may not work as expected in `script` and `style` languages, but `markup` language are fully supported.

#

---

#### Before Formatting

_Below is an example of how this rule works if it's enabled, ie: `true`. Notice the comment content starts on the same line as the opening and closing delimiters. When applying beautification the content will be indented in accordance with `indentChar` and `indentSize` values._

```liquid

<ul>
 <li>Hello</li>
 <!--
 I am currently not indented
 -->
 <li>World</li>
</ul>


```

#### After Formatting

_Using the above sample with the rule enabled (ie: `true`), notice how the comment contents are indented._

```html


<ul>
  <li>Hello</li>
  <!--
    I am now indented
  -->
 <li>World</li>
</ul>

```
