Sections can provide their own set of translated strings through the `locales` object. This is separate from the `locales` directory of the theme, which makes it a useful feature for sections that are meant to be installed on multiple themes or shops.

The `locales` object has the following general format:

```json

{
  "locales": {
    "language": {
      "translation_key": "translation_value"
    }
  }
}

```

**Example**

```liquid

{% schema %}
{
  "name": "Slideshow",
  "class": "slideshow",
  "settings": [
    {
      "type": "text",
      "id": "title",
      "label": "Slideshow"
    }
  ],
  "locales": {
    "en": {
      "title": "Slideshow"
    },
    "fr": {
      "title": "Diaporama"
    }
  }
}
{% endschema %}

```

Any translations will show up under the Sections tab of the language editor for merchants to edit. When edits are made, the changes are saved directly to the applicable locale file, and the section schema is unchanged.

These translations can be accessed through the Liquid [translation filter](https://shopify.dev/api/liquid/filters/translate) (`t` filter) where the key will be in the following format:

```
sections.[section-name].[translation-description]
```

For example, if you want to reference the title translation from the example above, then use the following:

```liquid
{{ 'sections.slideshow.title' | t }}
```

#

---

[Shopify Documentation](https://shopify.dev/themes/architecture/sections/section-schema#locales)
