&nbsp;⚙️&nbsp;&nbsp;&nbsp;**Default** `false`

&nbsp;💁🏽‍♀️&nbsp;&nbsp;&nbsp;Recommended setting is `false`

#### Ignore JSON

Whether or not to format regions of code that are identified to be JSON. Such tags are typically identified using attribute annotations like `<script type="application/json">`. By default, beautification is applied using the `json` rules. When ignored (ie: `true`) Prettify will not apply formatting to these regions.



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

<script type="application/ld+json">
{
  "foo": "bar",
"bax": "qux"
}
</script>

</head>


```

#### After Formatting

*After formatting the above sample notice how the `<script type="application/ld+json"></script>` region has been completely skipped from formatting. Ignored regions are excluded in a strict manner, so indentation levels are completely void of change and will persist. Only the surrounding tokens will have beautification applied.*

```liquid

<!-- After formatting -->
<head>

  <title>
    Example
  </title>

<script type="application/ld+json">
{
  "foo": "bar",
"bax": "qux"
}
</script>

</head>


```
