export const markup = `

{%- style -%}
  .section-{{ section.id }}-padding {
padding-top: {{ section.settings.padding_top | times: 0.75 | round: 0 }}px;
padding-bottom: {{ section.settings.padding_bottom | times: 0.75 | round: 0 }}px;
}

.class-foo,
.foo-bar > .bar & + .foo,
.class {
   width: 100%;
 position: absolute;
    top: 0;
    padding-left: 0;
    background-color: red;
    border-bottom: 0.01rem solid #202020;

    left: 0;

    height: 40px;
  right: 0;
}
@media screen and (min-width: 750px) {
.section-{{ section.id }}-padding {
padding-top: {{ section.settings.padding_top }}px;
padding-bottom: {{ section.settings.padding_bottom }}px;
}
}
{%- endstyle -%}

{{ 'component-cart.css' | asset_url | stylesheet_tag }}
{{ 'component-totals.css' | asset_url | stylesheet_tag }}
{{ 'component-price.css' | asset_url | stylesheet_tag }}
{{ 'component-discounts.css' | asset_url | stylesheet_tag }}

<div class="page-width{% if cart == empty %} is-empty{% endif %}" id="main-cart-footer" data-id="{{ section.id }}">
  <div>
    <div class="cart__footer">
      {%- if settings.show_cart_note -%}
        <cart-note class="cart__note field">
          <label for="Cart-note">{{ 'sections.cart.note' | t }}</label>
          <textarea class="text-area field__input" name="note" form="cart" id="Cart-note" placeholder="{{ 'sections.cart.note' | t }}">{{ cart.note }}</textarea>
        </cart-note>
      {%- endif -%}

      <div class="cart__blocks">
        {% for block in section.blocks %}
          {%- case block.type -%}
            {%- when '@app' -%}
              {% render block %}
            {%- when 'subtotal' -%}
              <div class="js-contents" {{ block.shopify_attributes }}>
                <div class="totals">
                  <h2 class="totals__subtotal">{{ 'sections.cart.subtotal' | t }}</h2>
                  <p class="totals__subtotal-value">{{ cart.total_price | money_with_currency }}</p>
                </div>

                <div>
                  {%- if cart.cart_level_discount_applications.size > 0 -%}
                    <ul class="discounts list-unstyled" role="list" aria-label="{{ 'customer.order.discount' | t }}">
                      {%- for discount in cart.cart_level_discount_applications -%}
                        <li class="discounts__discount discounts__discount--position">
                          {%- render 'icon-discount' -%}
                          {{ discount.title }}
                          (-{{ discount.total_allocated_amount | money }})
                        </li>
                      {%- endfor -%}
                    </ul>
                  {%- endif -%}
                </div>

                <small class="tax-note caption-large rte">
                  {%- if cart.taxes_included and shop.shipping_policy.body != blank -%}
                    {{ 'sections.cart.taxes_included_and_shipping_policy_html' | t: link: shop.shipping_policy.url }}
                  {%- elsif cart.taxes_included -%}
                    {{ 'sections.cart.taxes_included_but_shipping_at_checkout' | t }}
                  {%- elsif shop.shipping_policy.body != blank -%}
                    {{ 'sections.cart.taxes_and_shipping_policy_at_checkout_html' | t: link: shop.shipping_policy.url }}
                  {%- else -%}
                    {{ 'sections.cart.taxes_and_shipping_at_checkout' | t }}
                  {%- endif -%}
                </small>
              </div>
            {%- else -%}
              <div class="cart__ctas" {{ block.shopify_attributes }}>
                <noscript>
                  <button type="submit" class="cart__update-button button button--secondary" form="cart">
                    {{ 'sections.cart.update' | t }}
                  </button>
                </noscript>

                <button type="submit" id="checkout" class="cart__checkout-button button" name="checkout"{% if cart == empty %} disabled{% endif %} form="cart">
                  {{ 'sections.cart.checkout' | t }}
                </button>
              </div>

              {%- if additional_checkout_buttons -%}
                <div class="cart__dynamic-checkout-buttons additional-checkout-buttons">
                  {{ content_for_additional_checkout_buttons }}
                </div>
              {%- endif -%}
          {%- endcase -%}
        {% endfor %}

        <div id="cart-errors"></div>
      </div>
    </div>
  </div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    function isIE() {
      const ua = window.navigator.userAgent;
      const msie = ua.indexOf('MSIE ');
      const trident = ua.indexOf('Trident/');

      return (msie > 0 || trident > 0);
    }

    if (!isIE()) return;
    const cartSubmitInput = document.createElement('input');
    cartSubmitInput.setAttribute('name', 'checkout');
    cartSubmitInput.setAttribute('type', 'hidden');
    document.querySelector('#cart').appendChild(cartSubmitInput);
    document.querySelector('#checkout').addEventListener('click', function(event) {
      document.querySelector('#cart').submit();
    });
  });
</script>



{% javascript %}

  class LocalizationForm extends HTMLElement {

    constructor() {

      super();

      this.elements = {
        input: this.querySelector("input[name='locale_code'], input[name='country_code']"),
        button: this.querySelector("button"),
        panel: this.querySelector(".disclosure__list-wrapper"), };


      this.elements.button.addEventListener("click", this.openSelector.bind(this));
      this.elements.button.addEventListener("focusout", this.closeSelector.bind(this));
      this.addEventListener("keyup", this.onContainerKeyUp.bind(this));

      this.querySelectorAll("a").forEach(item => {
        return item.addEventListener("click", this.onItemClick.bind(this))
      });

    }
  }


 const localization = new LocalizationForm()

 const foo=(bar) => bar

 var isLoggedIn = false

var Login = {
    view: function() {
        return m("form", [
            m("button[type=button]", {
                onclick: function() {
                    isLoggedIn = true
                    m.route.set("/secret")
                }
            }, "Login")
        ])
    }
}

m.route(document.body, "/secret", {
    "/secret": {
        onmatch: function() {
            if (!isLoggedIn) m.route.set("/login")
            else return Home
        }
    },
    "/login": Login
})

var Auth = {
    username: "",
    password: "",

    setUsername: function(value) {
        Auth.username = value
    },
    setPassword: function(value) {
        Auth.password = value
    },
    login: function() {
        m.request({
            url: "/api/v1/auth",
            params: {username: Auth.username, password: Auth.password}
        }).then(function(data) {
            localStorage.setItem("auth-token", data.token)
            m.route.set("/secret")
        })
    }
}

var Login = {
    view: function() {
        return m("form", [
            m("input[type=text]", {
                oninput: function (e) { Auth.setUsername(e.target.value) },
                value: Auth.username
            }),
            m("input[type=password]", {
                oninput: function (e) { Auth.setPassword(e.target.value) },
                value: Auth.password
            }),
            m("button[type=button]", {onclick: Auth.login}, "Login")
        ])
    }
}

m.route(document.body, "/secret", {
    "/secret": {
        onmatch: function() {
            if (!localStorage.getItem("auth-token")) m.route.set("/login")
            else return Home
        }
    },
    "/login": Login
})

 function HelloWorld({greeting = "hello", greeted = '"World"', silent = false, onMouseOver,}) {

    switch(gretting) {
      case 'hello':
        return 'goodbye'
      case 'word':
      case 'foo':
        greeting = 'bar'
      break
    }

}

{% endjavascript %}

{% form 'customer', class: 'newsletter-form' %}
  <input type="hidden" name="contact[tags]" value="newsletter">
  <div class="newsletter-form__field-wrapper">
    <div class="field">

{% comment %}
Some comment goes here
{%endcomment %}
      <input
        id="NewsletterForm--{{ section.id }}"
        type="email"
        name="contact[email]"
        class="field__input"
        value="{{ form.email }}"
        aria-required="true"
        autocorrect="off"
        autocapitalize="off"
        autocomplete="email"
        {% if form.errors %}
          autofocus
          aria-invalid="true"
          aria-describedby="Newsletter-error--{{ section.id }}"
        {% elsif form.posted_successfully? %}
          aria-describedby="Newsletter-success--{{ section.id }}"
        {% endif %}
        placeholder="{{ 'newsletter.label' | t }}"
        required
      >
      {% comment %}
Some comment goes here
{%endcomment %}
      <label class="field__label" for="NewsletterForm--{{ section.id }}">
        {{ 'newsletter.label' | t }}
      </label>
      <button type="submit" class="newsletter-form__button field__button" name="commit" id="Subscribe" aria-label="{{ 'newsletter.button_label' | t }}">
        {% render 'icon-arrow' %}
      </button>
    </div>
  {% comment %}
Some comment goes here
{%endcomment %}
    {%- if form.errors -%}
      <small class="newsletter-form__message form__message" id="Newsletter-error--{{ section.id }}">{% render 'icon-error' %}{{ form.errors.translated_fields['email'] | capitalize }} {{ form.errors.messages['email'] }}</small>
    {%- endif -%}
  </div>
  {%- if form.posted_successfully? -%}
    <h3 class="newsletter-form__message newsletter-form__message--success form__message" id="Newsletter-success--{{ section.id }}" tabindex="-1" autofocus>{% render 'icon-success' %}{{ 'newsletter.success' | t }}</h3>
  {%- endif -%}
{% endform %}`;
