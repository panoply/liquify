A setting of type `video` outputs a video picker that's automatically populated with the available videos from the [Files](https://help.shopify.com/en/manual/shopify-admin/productivity-tools/file-uploads) section of the Shopify admin. The merchant also has the option to upload new videos.

> _The `video` type setting also accepts metafields of type `file_reference` as a [dynamic source](https://shopify.dev/themes/architecture/settings#dynamic-sources)._

When accessing the value of a `video` type setting, data is returned as one of the following:

- A [video object](https://shopify.dev/api/liquid/objects#video).
- `nil`, if:
  - no selection has been made,
  - the selection no longer exists, or
  - the selection is a `file_reference` metafield that points to a non-video file.

> **NOTE**
>
> `video` settings don't support the `default` attribute.

#

---

[Shopify Documentation](https://shopify.dev/themes/architecture/settings/input-settings#video)
