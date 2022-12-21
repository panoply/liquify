export default (
/* html */`
<h1>Embedded Languages</h1>

<p>Prettify gracefully handles embedded code regions and extends support to not only HTML but also Liquid embedded code regions.</p>

{% comment %}
Lets start with a HTML style tag with some Liquid infused
{% endcomment %}

<style>
  header-drawer {
  justify-self:   start;
  margin-left:          -1.2rem;
}
.header__heading-logo
{
  max-width:
   {{ section.settings.logo_width }}px;
}
@media screen and (min-width: 990px) {
  {% if x %}
header-drawer {
    display: none;
  }
  {% endif %}
}

.menu-drawer-container {
  display: {% unless x %}flex{% else %}block{% endunless%};
}

@media screen and (min-width: 750px) {
  .list-menu__item--link {
    padding-bottom:

    0.5rem;
    padding-top:    0.5rem;
  }
}
</style>


{% comment %}
Lets dabble a Shopify schema code block.
Use the JSON formatting options to customize how the code is beautified.
{% endcomment %}

{% schema %}
{
"name": "t:sections.header.name",
"class": "section-header",
"settings": [
{
"type": "select",
"id": "color_scheme",
"options": [
  {
    "value": "accent-1",
           "label": "t:sections.all.colors.accent_1.label"
  },
  {"value": "accent-2",  "label": "t:sections.all.colors.accent_2.label"
  }
  ,
],
"default": "background-1",
"label": "t:sections.all.colors.label"
},
{
"type": "select",
"id": "logo_position",
"options": [
  {
    "value": "middle-left",
    "label": "t:sections.header.settings.logo_position.options__1.label"
  },{ "value": "top-left",
    "label": "t:sections.header.settings.logo_position.options__2.label"
  },{
    "value":
    "top-center",
    "label": "t:sections.header.settings.logo_position.options__3.label"
  }
],
"default": "middle-left",
"label": "t:sections.header.settings.logo_position.label",
"info": "t:sections.header.settings.logo_position.info"
},
{
"type": "link_list",
"id": "menu","default": "main-menu",
"label": "t:sections.header.settings.menu.label"
},
{
"type": "select",
"id": "menu_type_desktop",
"options": [
  {
    "value": "dropdown",
  "label": "t:sections.header.settings.menu_type_desktop.options__1.label"
  },
  {
    "value": "mega",
"label": "t:sections.header.settings.menu_type_desktop.options__2.label"}
],
"default": "dropdown",
"label": "t:sections.header.settings.menu_type_desktop.label",
"info": "t:sections.header.settings.menu_type_desktop.info"
}
]
}
{% endschema %}

`);
