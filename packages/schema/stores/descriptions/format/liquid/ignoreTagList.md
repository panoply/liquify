&nbsp;⚙️&nbsp;&nbsp;&nbsp;**Default** `[]`

#### Ignore Tag List

A list of Liquid tags that should excluded from formatting. Only tags which contain a start and end types are valid.

#

---

#### Example Options

_Below is an example of how this rule works and you've set the following Liquid tags to be ignored._

```js

{
  ignoreTagList: [
    'capture',
    'unless'
  ]
}


```

#### Example

*Using the above example configuration whenever Prettify encounters a `{% capture %}` or `{% unless %}` tag region it will be skipped from formatting. It is important to note that ignored tags will not apply indentation, so it is up to you to refine the ignore tag yourself.*

```liquid

<div>
{% if x %}

{% capture foo %}   I will not be formatter   {% endcapture %}

{% if xx %}
<ul>
<li>
Hello World
</li>

{% unless bar %}

<li> I
     will not be formatter  </li>

{% endunless %}

</ul>
{% endif %}
{% endif %}
</div>


```

#### After Formatting

*After formatting the above sample notice how the `{% capture %}` and `{% unless %}` tags region has been completely skipped from formatting. Ignored regions are excluded in a strict manner, so indentation levels are completely void of change and will persist. Only the surrounding tokens will have beautification applied.*

```liquid

<div>
  {% if x %}

{% capture foo %}   I will not be formatted   {% endcapture %}

    {% if xx %}

      <ul>
        <li>
          Hello World
        </li>

{% unless bar %} <li> I will not be formatted </li> {% endunless %}

      </ul>
    {% endif %}
  {% endif %}
</div>

```
