import * as prettify from '@liquify/prettify';

prettify.markup(

`
<div>
{% for i in arr %} <ul><li>{{ i }}</li></ul>{% endfor %}
</div>
`
).then(output => {

  console.log(output);

});
