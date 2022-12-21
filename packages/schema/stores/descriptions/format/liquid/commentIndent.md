&nbsp;⚙️&nbsp;&nbsp;&nbsp;**Default** `false`

&nbsp;💁🏽‍♀️&nbsp;&nbsp;&nbsp;Recommended setting is `true`

#### Comment Indent

Applies single indentation to containing content of Liquid comments.

#### Note

Liquid line type comments are currently not supported by this rule. Only block type Liquid tokens will be handled.

#

---

#### Before Formatting

_Below is an example of how this rule works if it's enabled, ie: `true`. By default, comment contents do not apply indentation. Notice how the inner content appears at the same starting points of the start and end tags._

```liquid

{% comment %}
I am not indented
I am not indented
{% endcomment %}
<div>
  {% comment %}
  I am not indented
  I am not indented
  {% endcomment %}
  <nav>
    <ul>
      <li>Foo</li>
    </ul>
  </nav>
</div>

```

#### After Formatting

_Notice how after formatting when this rule is enabled that the inner contents of the Liquid comment tag regions are now indented._

```liquid

{% comment %}
  I am now indented
  I am now indented
{% endcomment %}
<div>
  {% comment %}
    I am now indented
    I am now indented
  {% endcomment %}
  <nav>
    <ul>
      <li>Foo</li>
    </ul>
  </nav>
</div>


```
