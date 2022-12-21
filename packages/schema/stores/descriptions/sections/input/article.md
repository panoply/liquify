A setting of type `article` outputs an article picker field that's automatically populated with the available articles for the store. You can use these fields to capture an article selection, such as the article to feature on the homepage.

When accessing the value of a `article` type setting, data is returned as one of the following:

- An [article object](https://shopify.dev/api/liquid/objects/article).
  To ensure backwards compatibility with [legacy resource-based settings](https://shopify.dev/themes/architecture/settings#legacy-resource-based-settings), outputting the setting directly will return the object's handle.
- `blank` if no selection has been made, the selection isn't visible, or the selection no longer exists.

> **NOTE**
>
> Settings of type `article` are not updated when switching presets. `article` settings also don't support the `default` attribute.

#

---

[Shopify Documentation](https://shopify.dev/themes/architecture/settings/input-settings#article)
