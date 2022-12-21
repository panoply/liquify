A setting of type `video_url` outputs a URL entry field. In addition to the [standard attributes](https://shopify.dev/themes/architecture/settings/input-settings#standard-attributes) of an input setting.

When accessing the value of a video_url type setting, data is returned as one of the following:

- A [string](https://shopify.dev/api/liquid/basics/types#string) that contains the entered URL.
- `nil`, if nothing has been entered.

Additionally, there's access to the `id` and `type` (YouTube or Vimeo) of the video.

For example, assuming you're using [this video](https://www.youtube.com/watch?v=_9VUPq3SxOc) with the above setting, the following Liquid generates the following output:

**Setting**

```liquid

ID: {{ settings.product_description_video.id }}
Type: {{ settings.product_description_video.type }}

```

**Output**

```

ID: _9VUPq3SxOc
Type: youtube

```

#

---

[Shopify Documentation](https://shopify.dev/themes/architecture/settings/input-settings#video_url)
