import test from 'ava'
import * as format from '../package/index'

test('test', t => {

  const beautify = format.prettydiff(`
  <div>
    <div>

<div
  id="name"
  {% if foo %}
  class="something"
  {% endif %}
  data-attr>

</div></div>
</div>
  `, {
    new_line: true,
    space_close: false,
    indent_size: 2,
    indent_level: 0,
    preserve: 2,
    preserve_comment: true,
    comment_line: true,
    comments: true,
    preserve_text: true,
    correct: false,
    attribute_sort: false,
    attribute_sort_list: '',
    force_attribute: true,
    force_indent: false,
    quote_convert: 'none',
    tag_merge: false,
    tag_sort: false,
    unformatted: false,
    indent_char: ' ',
    wrap: 0
  })

  console.log(beautify.source)

  t.pass()
})
