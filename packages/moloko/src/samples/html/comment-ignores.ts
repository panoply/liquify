export default (
/* html */`
<h1>This is an example of HTML inline comment ignores</h1>

<p>You can also use Liquid comment ignored in Markup languages. Have a look at comment-ignores.liquid sample file
  to see how you can leverage liquid inline comment control. Below is how we can inform Prettify to ignore specific
  regions of code using inline comment ignores.
</p>
<ul>
<li>

{{ foo | replace: article.id, 'dd' }}

</li>


<!-- @prettify-ignore-start -->
<li>
<div> WILL NOT FORMAT </div>
</li>
<!-- @prettify-ignore-end -->

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

<!-- @prettify-ignore-start -->

{%if customer.name == "xxx" %} THIS WILL BE IGNORED AND NOT FORMATTED
{% elsif customer.name == "xx" %}
The lines and spacing will be preserved {% else %}Hi Stranger!         {% endif %}

<!-- @prettify-ignore-end -->

Formatting is applied:

<div>
<ul>
<li>one</li>
<li>two</li>
</ul>
</div>


Lets test Liquid comments

<!-- @prettify-ignore-start -->

{%- comment -%}
example
{%- endcomment -%}

<div>
<ul>
<li>one</li>
<li>two</li>
</ul>
</div>


<!-- @prettify-ignore-end -->

<h1>Everything here will be formatted</h1>

<div class="bar"> <div>foo </div></div>


<div>
<ul>
<li>one</li>
<li>two</li>
<li>three</li>
</ul>
</div>
`);
