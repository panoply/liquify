&nbsp;⚙️&nbsp;&nbsp;&nbsp;**Default** `false`

&nbsp;💁🏽‍♀️&nbsp;&nbsp;&nbsp;Recommended setting is `true`

#### Comment Indent

Applies single indentation to containing content of HTML comments.

#### Note

Liquid line type comments are currently not supported by this rule. Only HTML comments which span newlines are indented.

#

---

#### Before Formatting

_Below is an example of how this rule works if it's enabled, ie: `true`. By default, comment contents do not apply indentation. Notice how the inner content appears at the same starting points of the start and end delimiters._

```liquid

<!--
I am not indented
I am not indented
-->
<div>
  <!--
  I am not indented
  I am not indented
  -->
  <nav>
    <ul>
      <li>Foo</li>
    </ul>
  </nav>
</div>

```

#### After Formatting

_Notice how after formatting when this rule is enabled that the inner contents of the HTML comment are now indented._

```html

<!--
  I am now indented
  I am now indented
-->
<div>
  <!--
    I am now indented
    I am now indented
  -->
  <nav>
    <ul>
      <li>Foo</li>
    </ul>
  </nav>
</div>


```
