You can create blocks for a section. Blocks are reusable modules of content that can be added, removed, and reordered within a section.

Blocks have the following attributes:

**`type`** (required)

> The block type. This is a free-form string that you can use as an identifier. You can access this value through the `type` attribute of the [block object](https://shopify.dev/api/liquid/objects/block#block-type).

**`name`** (required)

> The block name, which will show as the block title in the theme editor.

**`limit`**

> The number of blocks of this type that can be used.

**`settings`**

> Any [input](https://shopify.dev/themes/architecture/settings/input-settings) or [sidebar](https://shopify.dev/themes/architecture/settings/sidebar-settings) settings that you want for the block. Certain settings might be used as the [title of the block in the theme editor.](https://shopify.dev/themes/architecture/sections/section-schema#show-dynamic-block-titles-in-the-theme-editor)

#

---

[Shopify Documentation](https://shopify.dev/themes/architecture/sections/section-schema#blocks)
