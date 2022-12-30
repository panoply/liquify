import test from 'ava';
import highlight from '../index.js';

const string = `

<!-- comment -->
{% if condition  == 'string' %}

  <div class="xxx">
    {{ object.prop | filter: 'something' }}
  </div>

{% endif %}

<script>

  const foo = {
    string: 'xxx',
    boolean: false,
    number: 123456
  }

</script>

<title>
  {{- page_title -}}
  {%- if current_tags -%}
    {%- assign meta_tags = current_tags | join: ", " -%}
    {{ "general.meta.tags" | t: tags: meta_tags | prepend: " &ndash; " }}
  {%- endif -%}
  {%- if current_page != 1 -%}
    {{ "general.meta.page" | t: page: current_page | prepend: " &ndash; " }}
  {%- endif -%}
  {%- unless page_title contains shop.name -%}
    {{ shop.name | prepend: " &ndash;" }}
  {%- endunless -%}
</title>


{% render 'snippet' with product.array as product, param: 123
%}

{%- # comment %}

{% comment %}
 hello world
{% endcomment %}

`;

test('Highlight Liquid', t => {

  console.log(highlight(string));

});
