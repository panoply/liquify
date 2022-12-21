Presets are default configurations of sections that enable merchants to easily add a section to a [JSON template](https://shopify.dev/themes/architecture/templates/json-templates) through the theme editor. Presets aren't related to [theme styles](https://shopify.dev/themes/architecture/config/settings-data-json#theme-styles) that are defined in `settings_data.json`.

The presets object has the following attributes:

**`name`** (required)

> The preset name, which will show in the Add section portion of the theme editor.

**`settings`**

> A list of default values for any settings you might want to populate. Each entry should include the setting name and the value.

**`blocks`**

> A list of default blocks that you might want to include. Each entry should be an object with attributes of `type` and `settings`. The type attribute value should reflect the type of the block that you want to include, and the `settings` object should be in the same format as the `settings` attribute above.


#

---

[Shopify Documentation](https://shopify.dev/themes/architecture/sections/section-schema#presets)
