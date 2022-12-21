export const schema = `{% schema %}
{
"name": "t:sections.newsletter.name",
"tag": "section",
"class": "section",
"settings": [
{
"type": "select",
"id": "color_scheme",
"options": [
{
"value": "accent-1",
"label": "t:sections.all.colors.accent_1.label"
},
{
"value": "accent-2",
"label": "t:sections.all.colors.accent_2.label"
},
{
"value": "background-1",
"label": "t:sections.all.colors.background_1.label"
},
{
"value": "background-2",
"label": "t:sections.all.colors.background_2.label"
},
{
"value": "inverse",
"label": "t:sections.all.colors.inverse.label"
}
],
"default": "background-1",
"label": "t:sections.all.colors.label"
},
{
"type": "checkbox",
"id": "full_width",
"default": true,
"label": "t:sections.newsletter.settings.full_width.label"
},
{
"type": "paragraph",
"content": "t:sections.newsletter.settings.paragraph.content"
},
{
"type": "header",
"content": "t:sections.all.padding.section_padding_heading"
},
{
"type": "range",
"id": "padding_top",
"min": 0,
"max": 100,
"step": 4,
"unit": "px",
"label": "t:sections.all.padding.padding_top",
"default": 40
},
{
"type": "range",
"id": "padding_bottom",
"min": 0,
"max": 100,
"step": 4,
"unit": "px",
"label": "t:sections.all.padding.padding_bottom",
"default": 52
}
],
"blocks": [
{
"type": "heading",
"name": "t:sections.newsletter.blocks.heading.name",
"limit": 1,
"settings": [
{
"type": "text",
"id": "heading",
"default": "Subscribe to our emails",
"label": "t:sections.newsletter.blocks.heading.settings.heading.label"
},
{
"type": "select",
"id": "heading_size",
"options": [
{
  "value": "h2",
  "label": "t:sections.all.heading_size.options__1.label"
},
{
  "value": "h1",
  "label": "t:sections.all.heading_size.options__2.label"
},
{
  "value": "h0",
  "label": "t:sections.all.heading_size.options__3.label"
}
],
"default": "h1",
"label": "t:sections.all.heading_size.label"
}
]
},
{
"type": "paragraph",
"name": "t:sections.newsletter.blocks.paragraph.name",
"limit": 1,
"settings": [
{
"type": "richtext",
"id": "text",
"default": "<p>Be the first to know about new collections and exclusive offers.</p>",
"label": "t:sections.newsletter.blocks.paragraph.settings.paragraph.label"
}
]
},
{
"type": "email_form",
"name": "t:sections.newsletter.blocks.email_form.name",
"limit": 1
},
{
"type": "@app"
}
],
"presets": [
{
"name": "t:sections.newsletter.presets.name",
"blocks": [
{
"type": "heading"
},
{
"type": "paragraph"
},
{
"type": "email_form"
}
]
}
]
}
{% endschema %}`;
