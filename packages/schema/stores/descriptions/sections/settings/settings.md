You can create section specific [settings](https://shopify.dev/themes/architecture/settings/input-settings) to allow merchants to customize the section with the `settings` object:

**Example**

```liquid

{% schema %}
{
  "name": "Slideshow",
  "tag": "section",
  "class": "slideshow",
  "settings": [
    {
      "type": "text",
      "id": "header",
      "label": "Header"
    }
  ]
}
{% endschema %}

```

**[Input Settings](https://shopify.dev/themes/architecture/settings/input-settings)**

Input settings are generally composed of [standard attributes](https://shopify.dev/themes/architecture/settings/input-settings#standard-attributes), and there are two categories:

- [Basic input settings](https://shopify.dev/themes/architecture/settings/input-settings#basic-input-settings)
- [Specialized input settings](https://shopify.dev/themes/architecture/settings/input-settings#specialized-input-settings)

To learn how to access the values of these settings for use in your theme, refer to the [settings overview](https://shopify.dev/themes/architecture/settings#access-settings).


#

---

[Shopify Documentation](https://shopify.dev/themes/architecture/settings/input-settings)
