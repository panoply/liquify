A setting of type `product` outputs a product picker field that's automatically populated with the available products for the store. You can use these fields to capture a product selection, such as the product to feature on the homepage.

- A [product object](https://shopify.dev/api/liquid/objects/product).
  To ensure backwards compatibility with [legacy resource-based settings](https://shopify.dev/themes/architecture/settings#legacy-resource-based-settings), outputting the setting directly will return the object's handle.
- `blank`, if no selection has been made, the selection isn't visible, or the selection no longer exists.

> **NOTE**
>
> Settings of type product are not updated when switching presets. `product` settings also don't support the `default` attribute.

#

---

[Shopify Documentation](https://shopify.dev/themes/architecture/settings/input-settings#product)
