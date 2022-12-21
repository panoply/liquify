By default, there's no limit to how many times a section can be added to a template. You can specify a limit of 1 or 2 with the `limit` attribute:

**Example**

```liquid

{% schema %}
{
  "name": "Slideshow",
  "tag": "section",
  "class": "slideshow",
  "limit": 1
}
{% endschema %}

```

#

---

[Shopify Documentation](https://shopify.dev/themes/architecture/sections/section-schema#limit)
