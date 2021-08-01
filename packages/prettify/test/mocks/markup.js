/* -------------------------------------------- */
/* INLINE IGNORES                               */
/* -------------------------------------------- */

/**
 * Ignore Code Inline
 *
 * Mock represents a comment ignore
 */
export const markup_ignore_inline = `

<ul>
<li>

{{ foo | replace: article.id, 'dd' }}

</li>


<!-- @prettify ignore:start -->
<li>
<div> WILL NOT FORMAT </div>
</li>
<!-- @prettify ignore:end -->

<li>
{{ baz }}
</li>

<li>
{{ 'sss' }}
</li>
<li {{ bae }}>
{{ bae }}
</li>
<li>
{{ s }}
</li>
</ul>

`;

/**
 * Invalid Markup Mock data
 *
 * Error is is a missing comma character located at
 * `</div> `because `{% endif %}` is missing
 */
export const markup_invalid = `
<div>
{%if customer.name == "kevin" %}
Hey Kevin!
{% elsif customer.name == "anonymous" %}
Hey Anonymous!
{% else %}
Hi Stranger!

</div>

<ul>
<li>
{{ s }}
</li>
</ul>
`;

/* -------------------------------------------- */
/* UNFORMATTED BEAUTIFICATION                   */
/* -------------------------------------------- */

export const markup_unformatted = `

{%tablerow x in items %}
{{ x }}
<div data-attr="foo" id="{{ some.tag }}"   ></div>
{% endtablerow-%}

{%if customer.name == "kevin" %}
Hey Kevin!
{% elsif customer.name == "anonymous" %}
Hey Anonymous!
{% else %}
Hi Stranger!
{% endif %}

<html lang="en">
<head>

<meta
charset="UTF-8" />

<meta
http-equiv="X-UA-Compatible"
content="IE=edge">

<meta
name="viewport"
content="width=device-width">

<title>Document</title>

</head>
<body>
<ul>
<li accesskey="{{ product |append: 10000 }}"
aria-colcount="{{ product |append: 10000 }}"
aria-checked="{{ product |append: 10000 }}"
{% if something %}
id="bar" {% else %}
id="bar"
class="quux"
{% endif %}
{% unless something %}
bar {% endunless %}>

{{ foo | replace: article.id, 'dd' }}

</li>
<li {% if something %}
id="" {% endif %}>
{{ bar }}
</li>
<li>
{{ baz }}
</li>
<li>
{{ 'sss' }}
</li>
<li {{ bae }}>
{{ bae }}
</li>
<li>
{{ s }}
</li>
</ul>
</body>
</html>
`;
