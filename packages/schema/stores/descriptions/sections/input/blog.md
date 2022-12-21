A setting of type `blog` outputs a blog picker field that's automatically populated with the available blogs for the store. You can use these fields to capture a blog selection, such as the blog to feature in the sidebar.

When accessing the value of a `blog` type setting, data is returned as one of the following

- A [blog object](https://shopify.dev/api/liquid/objects/blog).
  To ensure backwards compatibility with [legacy resource-based settings](https://shopify.dev/themes/architecture/settings#legacy-resource-based-settings), outputting the setting directly will return the object's handle.
- `blank` if no selection has been made, the selection isn't visible, or the selection no longer exists.

> **NOTE**
>
> Settings of type `blog` are not updated when switching presets. `blog` settings also don't support the `default` attribute.

#

---

[Shopify Documentation](https://shopify.dev/themes/architecture/settings/input-settings#blog)
