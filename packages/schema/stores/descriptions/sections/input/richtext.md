A setting of type `richtext` outputs a multi-line text field with the following basic formatting options:

- Bold
- Italic
- Underline
- Link
- Paragraph
- Unordered list

> **NOTE**
>
> No underline option appears in the rich text component. Merchants can underline text using the `CMD`+`U` or `CTRL`+`U` keyboard shortcut.

You can use these fields to capture formatted text content, such as introductory brand content on the homepage.

When accessing the value of a richtext type setting, data is returned as one of the following:

- A [string](https://shopify.dev/api/liquid/basics/types#string) that contains the entered content.
- An [empty object](https://shopify.dev/api/liquid/basics/types#emptydrop), if nothing has been entered.

**[default](https://shopify.dev/themes/architecture/settings/input-settings#default)**

The `default` attribute isn't required. However, if it's used, then only `<p>` or `<ul>` tags are supported as top-level elements.

The following HTML tags are also supported inside the parent `<p>` tag:

```html

- <p>
- <br>
- <strong>
- <b>
- <em>
- <i>
- <u>
- <span>
- <a>

```

> **CAUTION**
>
> Failing to wrap the default content in `<p>` or `<ul>` tags will result in an error.

#

---

[Shopify Documentation](https://shopify.dev/themes/architecture/settings/input-settings#richtext)
