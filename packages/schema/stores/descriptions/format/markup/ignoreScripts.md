&nbsp;⚙️&nbsp;&nbsp;&nbsp;**Default** `false`

&nbsp;💁🏽‍♀️&nbsp;&nbsp;&nbsp;Recommended setting is `false`

#### Ignore Scripts

Whether or not to format regions of code that are identified to be JavaScript. Tags such as `<script>` and `{% javascript %}` can contain JavaScript and by default beautification is applied using the `script` rules. When ignored (ie: `true`) Prettify will not apply formatting to these regions.

#### Note

When enabled (ie: `true`) the entire `<script>` region is excluded including indentation levels. If the `<script>` tag is being used to link an external file (eg: `<script src="/path/fle.js"></script>`) and no code is detected between the opening and closing tags then formatting will be applied in accordance with defined rules pertaining to markup.

#

---

#### Before Formatting

*Below is an example of how some input **might** look and the rule is enabled, ie: `true`. The only changes that will be applied in **after** formatting example will be applied to the `<title>` tags.*

```liquid

<!-- Before formatting -->
<head>

      <title>
  Example
      </title>

<script>
// This entire region will remain the same between formatting
// the <script> tag will not move nor will this content.
const foo = 'bar';
</script>

</head>


```

#### After Formatting

*After formatting the above sample notice how the `<script></script>` region has been completely skipped from formatting. Ignored regions are excluded in a strict manner, so indentation levels are completely void of change and will persist. Only the surrounding tokens will have beautification applied.*

```liquid

<!-- After formatting -->
<head>

  <title>
    Example
  </title>

<script>
// This entire region will remain the same between formatting
// the <script> tag will not move nor will this content.
const foo = 'bar';
</script>

</head>


```
