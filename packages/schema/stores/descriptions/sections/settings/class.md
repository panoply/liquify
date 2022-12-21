When Shopify renders a section, it’s wrapped in an HTML element with a class of `shopify-section`. You can add to that class with the `class` attribute:

**Example**

```liquid

{% schema %}
{
  "name": "Slideshow",
  "tag": "section",
  "class": "slideshow"
}
{% endschema %}

```

**Output**

```html

<section id="shopify-section-[id]" class="shopify-section slideshow">
  <!-- Output of the section content -->
</section>

```

#

---

[Shopify Documentation](https://shopify.dev/themes/architecture/sections/section-schema#class)
