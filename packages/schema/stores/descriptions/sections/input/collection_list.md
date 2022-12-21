A setting of type `collection_list` outputs a collection picker field that's automatically populated with the available collections for the store. You can use these fields to capture multiple collections, such as a group of collections to feature on the homepage.

When accessing the value of a `collection_list` type setting, data is returned as one of the following:

- An array of [collection objects](https://shopify.dev/api/liquid/objects/collection).
  This array supports pagination using the [paginate](https://shopify.dev/api/liquid/tags/paginate#paginate-paginating-setting-arrays) tag. You can also append `.count` to the [setting key](https://shopify.dev/themes/architecture/settings#access-settings) to return the number of collections in the array.
- `blank` if no selection has been made, the selection isn't visible, or the selection no longer exists.

#

---

[Shopify Documentation](https://shopify.dev/themes/architecture/settings/input-settings#collection_list)
