&nbsp;⚙️&nbsp;&nbsp;&nbsp;**Default** `' '`

&nbsp;💁🏽‍♀️&nbsp;&nbsp;&nbsp;Recommended setting is `' '`

#### Indent Char

The string characters to comprise a single indentation. Any string combination is accepted. Generally speaking, you should leave this alone unless you know what you are doing.

#### Related Rule

The `indentSize` rule will use this character. For example, if you were to set `indentSize` to `4` then this character will be repeated 4 times, ie: `    ` - by default the `indentSize` is set to `2`.

#### Example

_Below is we have set `.` to be used as the indentation character. You should never do this, it is for example sake._

```html

<!-- Before Formatting -->
<ul class="foo">
  <li>
    bar
  </li>
  <li>
    baz
  </li>
</ul>

<!-- After Formatting -->
<ul class="foo">
..<li>
....bar
..</li>
..<li>
....baz
..</li>
</ul>


```

