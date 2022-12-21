A setting of type `image_picker` outputs an image picker field that's automatically populated with the available images from the [Files](https://help.shopify.com/en/manual/shopify-admin/productivity-tools/file-uploads) section of Shopify admin, and has the option to upload new images. Merchants also have an opportunity to enter alt text and select a [focal point](https://shopify.dev/themes/architecture/settings/input-settings#image-focal-points) for their image.

You can use these fields to capture an image selection, such as logos, favicons, and slideshow images.

When accessing the value of an `image_picker` type setting, data is returned as one of the following:

- An [image object](https://shopify.dev/api/liquid/objects/image).
- [nil](https://shopify.dev/api/liquid/basics/types#nil), if either no selection has been made or the selection no longer exists.

> **NOTE**
>
> Settings of type `image_picker` are not updated when switching presets. `image_picker` settings also don't support the `default` attribute.

**[Image focal points](https://shopify.dev/themes/architecture/settings/input-settings#image-focal-points)**

Images selected using an `image_picker` setting support focal points. A focal point is a position in an image that the merchant wants to remain in view as the image is cropped and adjusted by the theme. Focal points can be set in the theme editor `image_picker` setting, or from the Files page.

To make sure that your theme respects the focal point of the image, do the following:

- Render your images using the [image_tag](https://shopify.dev/api/liquid/filters/image_tag) filter.
- Consider positioning images within containers using `object-fit: cover`.

Using `image_tag`, if a focal point was provided, then an `object-position` style is added to the image tag, with the value set to the focal point.

**Input**

```liquid

{{ section.settings.image_with_text_image | image_url: width: 1500 | image_tag }}

```

**Output**

```html

<img src="octopus-tentacle.jpg?v=1&width=1500" alt="My alt text"
 srcset="octopus-tentacle.jpg?v=1&width=352 352w,
         octopus-tentacle.jpg?v=1&width=832 832w,
         octopus-tentacle.jpg?v=1&width=1200 1200w"
 width="1500" height="1875"
 style="object-position:25% 10%;">


```

If you need override the `object-position` style for a specific use case, then pass a style: `object-position: inherit;` property to the `image_tag` filter.

> **TIP**
>
> You can also access the focal point data using [image.presentation.focal_point](https://shopify.dev/api/liquid/objects/image_presentation#image_presentation-focal_point).

#

---

[Shopify Documentation](https://shopify.dev/themes/architecture/settings/input-settings#image_picker)
