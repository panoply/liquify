A setting of type `url` outputs a URL entry field where you can manually enter external URLs and relative paths. It also has a picker that's automatically populated with the following available resources for the shop:

- Articles
- Blogs
- Collections
- Pages
- Products

> _You can use these fields to capture a URL selection, such as the URL to use for a slideshow button link._

When accessing the value of a url type setting, data is returned as one of the following:

- A [string](https://shopify.dev/api/liquid/basics/types#string) that contains the selected URL.
- [nil](https://shopify.dev/api/liquid/basics/types#nil), if nothing has been entered.

> **NOTE**
>
> Accepted values for the `default` attribute are `/collections` and `/collections/all`.

#

---

[Shopify Documentation](https://shopify.dev/themes/architecture/settings/input-settings#url)
