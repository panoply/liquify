export default (
/* html */`
<!doctype html>
<html class="no-js" lang="{{ request.locale.iso_code }}">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="theme-color" content="">

    <link rel="canonical" href="{{ canonical_url }}">
    <link rel="preconnect" href="https://cdn.shopify.com" crossorigin>

    {%- if settings.favicon != blank -%}
      <link rel="icon" type="image/png" href="{{ settings.favicon | image_url: width: 32, height: 32 }}">
    {%- endif -%}

    {%- unless settings.type_header_font.system? and settings.type_body_font.system? -%}
      <link rel="preconnect" href="https://fonts.shopifycdn.com" crossorigin>
    {%- endunless -%}

    <title>
      {{ page_title }}
      {%- if current_tags %} &ndash; tagged "{{ current_tags | join: ', ' }}"{% endif -%}
      {%- if current_page != 1 %} &ndash; Page {{ current_page }}{% endif -%}
      {%- unless page_title contains shop.name %} &ndash; {{ shop.name }}{% endunless -%}
    </title>

    {% if page_description %}
      <meta name="description" content="{{ page_description | escape }}">
    {% endif %}

    {% render 'meta-tags' %}

    <script src="{{ 'global.js' | asset_url }}" defer="defer"></script>

    {{ content_for_header }}

    {%- liquid
      assign body_font_bold = settings.type_body_font | font_modify: 'weight', 'bold'
      assign body_font_italic = settings.type_body_font | font_modify: 'style', 'italic'
      assign body_font_bold_italic = body_font_bold | font_modify: 'style', 'italic'
    %}

    {% style %}
      {{ settings.type_body_font | font_face: font_display: 'swap' }}
      {{ body_font_bold | font_face: font_display: 'swap' }}
      {{ body_font_italic | font_face: font_display: 'swap' }}
      {{ body_font_bold_italic | font_face: font_display: 'swap' }}
      {{ settings.type_header_font | font_face: font_display: 'swap' }}

      :root {
        --font-body-family: {{ settings.type_body_font.family }}, {{ settings.type_body_font.fallback_families }};
        --font-body-style: {{ settings.type_body_font.style }};
        --font-body-weight: {{ settings.type_body_font.weight }};
        --font-body-weight-bold: {{ settings.type_body_font.weight | plus: 300 | at_most: 1000 }};
        --font-heading-style: {{ settings.type_header_font.style }};
        --font-heading-weight: {{ settings.type_header_font.weight }};

        --gradient-base-background-1: {% if settings.gradient_background_1 != blank %}{{ settings.gradient_background_1 }}{% else %}{{ settings.colors_background_1 }}{% endif %};
        --gradient-base-background-2: {% if settings.gradient_background_2 != blank %}{{ settings.gradient_background_2 }}{% else %}{{ settings.colors_background_2 }}{% endif %};
        --gradient-base-accent-1: {% if settings.gradient_accent_1 != blank %}{{ settings.gradient_accent_1 }}{% else %}{{ settings.colors_accent_1 }}{% endif %};
        --gradient-base-accent-2: {% if settings.gradient_accent_2 != blank %}{{ settings.gradient_accent_2 }}{% else %}{{ settings.colors_accent_2 }}{% endif %};

        --media-padding: {{ settings.media_padding }}px;
        --media-border-opacity: {{ settings.media_border_opacity | divided_by: 100.0 }};
        --media-border-width: {{ settings.media_border_thickness }}px;
        --media-radius: {{ settings.media_radius }}px;
        --media-shadow-opacity: {{ settings.media_shadow_opacity | divided_by: 100.0 }};
        --media-shadow-horizontal-offset: {{ settings.media_shadow_horizontal_offset }}px;
        --media-shadow-vertical-offset: {{ settings.media_shadow_vertical_offset }}px;
        --media-shadow-blur-radius: {{ settings.media_shadow_blur }}px;
        --media-shadow-visible: {% if settings.media_shadow_opacity > 0 %}1{% else %}0{% endif %};
      }

      *,
      *::before,
      *::after {
        box-sizing: inherit;
      }

      html {
        box-sizing: border-box;
        font-size: calc(var(--font-body-scale) * 62.5%);
        height: 100%;
      }

      body {
        display: grid;
        grid-template-rows: auto auto 1fr auto;
        grid-template-columns: 100%;
        min-height: 100%;
        margin: 0;
        font-size: 1.5rem;
        letter-spacing: 0.06rem;
        line-height: calc(1 + 0.8 / var(--font-body-scale));
        font-family: var(--font-body-family);
        font-style: var(--font-body-style);
        font-weight: var(--font-body-weight);
      }

      @media screen and (min-width: 750px) {
        body {
          font-size: 1.6rem;
        }
      }
    {% endstyle %}

    {{ 'base.css' | asset_url | stylesheet_tag }}

    {%- unless settings.type_body_font.system? -%}
      <link rel="preload" as="font" href="{{ settings.type_body_font | font_url }}" type="font/woff2" crossorigin>
    {%- endunless -%}
    {%- unless settings.type_header_font.system? -%}
      <link rel="preload" as="font" href="{{ settings.type_header_font | font_url }}" type="font/woff2" crossorigin>
    {%- endunless -%}

    {%- if settings.predictive_search_enabled -%}
      <link rel="stylesheet" href="{{ 'component-predictive-search.css' | asset_url }}" media="print" onload="this.media='all'">
    {%- endif -%}

    <script>
      document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
      if (Shopify.designMode) {
        document.documentElement.classList.add('shopify-design-mode');
      }
    </script>
  </head>

  <body class="gradient">
    <a class="skip-to-content-link button visually-hidden" href="#MainContent">
      {{ "accessibility.skip_to_text" | t }}
    </a>

    {%- if settings.cart_type == 'drawer' -%}
      {%- render 'cart-drawer' -%}
    {%- endif -%}

    {% section 'announcement-bar' %}
    {% section 'header' %}

    <main id="MainContent" class="content-for-layout focus-none" role="main" tabindex="-1">
      {{ content_for_layout }}
    </main>

    {% section 'footer' %}

    <ul hidden>
      <li id="a11y-refresh-page-message">{{ 'accessibility.refresh_page' | t }}</li>
      <li id="a11y-new-window-message">{{ 'accessibility.link_messages.new_window' | t }}</li>
    </ul>

    <script>

      window.shopUrl = '{{ request.origin }}';

      window.routes = {
        cart_add_url: '{{ routes.cart_add_url }}',
        cart_change_url: '{{ routes.cart_change_url }}',
        cart_update_url: '{{ routes.cart_update_url }}',
        cart_url: '{{ routes.cart_url }}',
        predictive_search_url: '{{ routes.predictive_search_url }}'
      };

      window.cartStrings = {
        error: "{{ 'sections.cart.cart_error' | t }}",
        quantityError: "{{ 'sections.cart.cart_quantity_error_html' | t: quantity: '[quantity]' }}"
      }

      window.variantStrings = {
        addToCart: "{{ 'products.product.add_to_cart' | t }}",
        soldOut: "{{ 'products.product.sold_out' | t }}",
        unavailable: "{{ 'products.product.unavailable' | t }}",
      }

      window.accessibilityStrings = {
        imageAvailable: "{{ 'products.product.media.image_available' | t: index: '[index]' }}",
        shareSuccess: "{{ 'general.share.success_message' | t }}",
        pauseSlideshow: "{{ 'sections.slideshow.pause_slideshow' | t }}",
        playSlideshow: "{{ 'sections.slideshow.play_slideshow' | t }}",
      }

    </script>

    {%- if settings.predictive_search_enabled -%}
      <script src="{{ 'predictive-search.js' | asset_url }}" defer="defer"></script>
    {%- endif -%}
  </body>
</html>
`);
