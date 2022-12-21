By default, when Shopify renders a section, it’s wrapped in a `<div>` element with a unique id attribute:

```html

<div id="shopify-section-[id]" class="shopify-section">
  <!-- Output of the section content -->
</div>

```

If you don’t want to use a `<div>`, then you can specify which kind of HTML element to use with the tag attribute. The following are the accepted values:

- `article`
- `aside`
- `div`
- `footer`
- `header`
- `section`

For example, the following schema settings returns the following output:

**Example**

```liquid

{% schema %}
{
  "name": "Slideshow",
  "tag": "section"
}
{% endschema %}

```

**Output**

```html

<section id="shopify-section-[id]" class="shopify-section">
   <!-- Output of the section content -->
</section>

```

#

---

[Shopify Documentation](https://shopify.dev/themes/architecture/sections/section-schema#tag)
