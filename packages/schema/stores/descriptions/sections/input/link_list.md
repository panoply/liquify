A setting of type `link_list` outputs a menu picker field that's automatically populated with the available menus for the store. You can use these fields to capture a menu selection, such as the menu to use for footer links.

When accessing the value of a link_list type setting, data is returned as one of the following:

- A [linklist object](https://shopify.dev/api/liquid/objects/linklist).
- `blank`, if either no selection has been made or the selection no longer exists.

> **NOTE**
>
> Accepted values for the `default` attribute are `main-menu` and `footer`.

#

---

[Shopify Documentation](https://shopify.dev/themes/architecture/settings/input-settings#link_list)
