A setting of type `inline_richtext` outputs HTML markup that isn't wrapped in paragraph tags (`<p>`). The setting includes the following basic formatting options:

- Bold
- Italic
- Link

> **NOTE**
>
> The `inline_richtext` setting doesn't support the following features:
>
> - Line breaks (`<br>`)
> - An underline option in the rich text editor. Merchants can underline text using the `CMD`+`U` or `CTRL`+`U` keyboard shortcut.

You can use these fields to capture formatted text content, such as introductory brand content on the homepage.

When accessing the value of a `inline_richtext` type setting, data is returned as one of the following:

- A [string](https://shopify.dev/api/liquid/basics/types#string) that contains the entered content.
- An [empty object](https://shopify.dev/api/liquid/basics/types#emptydrop), if nothing has been entered.

#

---

[Shopify Documentation](https://shopify.dev/themes/architecture/settings/input-settings#inline_richtext)
