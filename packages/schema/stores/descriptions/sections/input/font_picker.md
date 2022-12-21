A setting of type `font_picker` outputs a font picker field that's automatically populated with fonts from the [Shopify font library](https://shopify.dev/themes/architecture/settings/fonts#shopify-font-library). This library includes web-safe fonts, a selection of Google Fonts, and fonts licensed by Monotype.

You can use these fields to capture a font selection for various theme elements, such as the base heading font.

When accessing the value of a `font_picker` type setting, data is returned as a [font object](https://shopify.dev/api/liquid/objects/font).

> **CAUTION**
>
> The `default` attribute is required. Failing to include it will result in an error. You can find the possible values through the [available fonts](https://shopify.dev/themes/architecture/settings/fonts#available-fonts) in the Shopify font library.

#

---

[Shopify Documentation](https://shopify.dev/themes/architecture/settings/input-settings#font_picker)
