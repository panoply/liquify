A setting of type `liquid` outputs a multi-line text field that accepts HTML and [limited](https://shopify.dev/themes/architecture/settings/input-settings#limitations) Liquid markup. You can use these fields to capture custom blocks of HTML and Liquid content, such as a product-specific message. Merchants can also use a liquid setting to add the code needed to integrate certain types of [apps](https://shopify.dev/apps/online-store) into your theme.

When accessing the value of a `liquid` type setting, data is returned as one of the following:

- A [string](https://shopify.dev/api/liquid/basics/types#string) that contains the entered content.
- An [empty object](https://shopify.dev/api/liquid/basics/types#emptydrop), if nothing has been entered.

> **NOTE**
>
> The `default` attribute is optional. However, if you use it, then its value can't be an empty string. Additionally, unclosed HTML tags are automatically closed when the setting is saved. This might not line up with your intended formatting, so be sure to verify your input.

**[Limitations](https://shopify.dev/themes/architecture/settings/input-settings#limitations)**

Settings of type `liquid` don't have access to the following liquid objects/tags:

- [layout](https://shopify.dev/api/liquid/tags/layout)
- [content_for_header](https://shopify.dev/api/liquid/objects/content_for_header)
- [content_for_layout](https://shopify.dev/api/liquid/objects/content_for_layout)
- [content_for_index](https://shopify.dev/api/liquid/objects/content_for_index)
- [section](https://shopify.dev/api/liquid/tags/section)
- [javascript](https://shopify.dev/themes/architecture/sections/section-assets#javascript)
- [stylesheet](https://shopify.dev/themes/architecture/sections/section-assets#stylesheet)
- [schema](https://shopify.dev/themes/architecture/sections/section-schema)
- [settings](https://shopify.dev/api/liquid/objects/settings)

However, liquid settings can access the following:

- [Global Liquid objects](https://shopify.dev/api/liquid/objects)
- Template specific objects like `collection`, `product`, etc. (within their respective templates)
- Standard Liquid [tags](https://shopify.dev/api/liquid/tags) and [filters](https://shopify.dev/api/liquid/filters)

If your content includes non-existent, or empty, Liquid tags, then they will be rendered as empty strings. For example, the following setting generates the following output:

**Setting**

```json
{
  "type": "liquid",
  "id": "message",
  "label": "Message",
  "default": "Hello {{ not_a_real_tag }}, welcome to our shop."
}
```

**Output**

```
Hello , welcome to our shop.
```

> **CAUTION**
>
> Content entered in these settings can't exceed 50kb. Saving content that either exceeds this limit or includes invalid Liquid will result in an error.

#

---

[Shopify Documentation](https://shopify.dev/themes/architecture/settings/input-settings#liquid)
