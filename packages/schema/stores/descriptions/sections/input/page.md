A setting of type `page` outputs a page picker field that's automatically populated with the available pages for the store. You can use these fields to capture a page selection, such as the page to feature content for in a size-chart display.

When accessing the value of a `page` type setting, data is returned as one of the following:

- A [page object](https://shopify.dev/api/liquid/objects/page).
  To ensure backwards compatibility with [legacy resource-based settings](https://shopify.dev/themes/architecture/settings#legacy-resource-based-settings), outputting the setting directly will return the object's handle.
- `blank`, if no selection has been made, the selection isn't visible, or the selection no longer exists.

> **NOTE**
>
> Settings of type page are not updated when switching presets. `page` settings also don't support the `default` attribute.

#

---

[Shopify Documentation](https://shopify.dev/themes/architecture/settings/input-settings#page)

