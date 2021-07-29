import test from 'ava'
import { Prettify } from '../package/index'

const prettify = new Prettify({
  markup: {
    forceAttribute: false
  }
})

const str = `

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


  `

test('test', t => {

  prettify.rules({
    markup: {
      forceAttribute: false
    }
  })

  prettify.markup(str).then(value => {

    console.log(value)

  }).catch(error => {
    console.log(error.message)
    return error.input
  })

  t.pass()
})
