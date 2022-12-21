&nbsp;⚙️&nbsp;&nbsp;&nbsp;**Default** `false`

&nbsp;💁🏽‍♀️&nbsp;&nbsp;&nbsp;Recommended setting is `false`

#### Ignore Styles

Whether or not to format regions of code that are identified to be CSS. Tags such as `<style>` and `{% style %}` can contain CSS and by default beautification is applied using the `style` rules. When ignored (ie: `true`) Prettify will not apply formatting to these regions.

#### Note

When enabled (ie: `true`) the entire `<style>` and `{% style %}` regions will be excluded including indentation levels.

#

---

#### Before Formatting

*Below is an example of how some input **might** look and the rule is enabled, ie: `true`. The only changes that will be applied in **after** formatting example will be applied to the `<title>` tags.*

```liquid

<!-- Before formatting -->
<section>
    <div> {% if x%}

<style>
.class { font-size: 12px; }
</style>

{% endif %}
</div> </section>


```

#### After Formatting

*After formatting the above sample notice how the `<style></style>` region has been completely skipped from formatting. Ignored regions are excluded in a strict manner, so indentation levels are completely void of change and will persist, so it is up to you to apply beautification in your preferred manner. Only the surrounding tokens have beautification applied, the `<style></style>` tag remains in the same position and state as it was **before** formatting.*

```liquid

<!-- After formatting -->
<section>
  <div>
    {% if x%}

<style>
.class { font-size: 12px; }
</style>

    {% endif %}
  </div>
</section>


```
