A setting of type `html` outputs a multi-line text field that accepts HTML markup. In addition to the [standard attributes](https://shopify.dev/themes/architecture/settings/input-settings#standard-attributes) of an input setting.

You can use these fields to capture custom blocks of HTML content, such as a video embed.

The following HTML tags will be automatically removed:

```html

<html>
<head>
<body>

```

When accessing the value of an `html` type setting, data is returned as one of the following:

- A [string](https://shopify.dev/api/liquid/basics/types#string) that contains the entered content.
- An [empty object](https://shopify.dev/api/liquid/basics/types#emptydrop), if nothing has been entered.

> **NOTE**
>
> Unclosed HTML tags are automatically closed when the setting is saved. This may not line up with your intended formatting, so be sure to verify your input.

#

---

[Shopify Documentation](https://shopify.dev/themes/architecture/settings/input-settings#html)
