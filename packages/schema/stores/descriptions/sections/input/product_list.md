A setting of type `product_list` outputs a product picker field that's automatically populated with the available products for the store. You can use these fields to capture multiple products, such as a group of products to feature on the homepage.

When accessing the value of a `product_list` type setting, data is returned as one of the following:

- An array of [product objects](https://shopify.dev/api/liquid/objects/product).
  This array supports pagination using the [paginate](https://shopify.dev/api/liquid/tags/paginate#paginate-paginating-setting-arrays) tag. You can also append `.count` to the [setting key](https://shopify.dev/themes/architecture/settings#access-settings) to return the number of products in the array.
- `blank` if no selection has been made, the selection isn't visible, or the selection no longer exists.

#

---

[Shopify Documentation](https://shopify.dev/themes/architecture/settings/input-settings#product_list)

