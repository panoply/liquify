&nbsp;⚙️&nbsp;&nbsp;&nbsp;**Default** `true`

&nbsp;💁🏽‍♀️&nbsp;&nbsp;&nbsp;Recommended setting is `true`

#### Normalize Spacing&nbsp;&nbsp;💧

Whether or not to normalize and correct the inner spacing of Liquid tokens. This rule will equally distribute whitespace characters contained within Liquid tags and output tokens. The rule will also inject spacing in accordance with common Liquid code structures.


#### Note

Normalized spacing does not strip newline characters and does not process code encapsulated in quotation characters (ie: "string" or 'string'). Below is an example of how this rule works if it's enabled, ie: `true` which is the default.

#

---

#### Before Formatting

*Take the following Liquid output and tag type tokens. Notice how the output (`object.prop`) token contains extraneous whitespace and `args` filter is not correctly spaced. In the `assign` tag token, the assignment operator (`=`), object dot notation `.` and `foo|bar` filter pipe separators are not using equally distributing whitespace.


```liquid

<!-- Before formatting -->

{{  object.prop   |args:'x'  , 'xx'|    filter   :   ' preserve   string '   }}

{% assign  foo  =   'preserved  '   |  append : object . prop |foo|bar    %}


```

#### After Formatting

*Using the above **before** formatting example, both the output and tag tokens are corrected. All extraneous whitespace is stripped and injected where necessary. Notice how all string tokens are left intact, this is because the `normalizeSpacing` rule does not touch or process string structures.*


```liquid

<!-- After formatting -->

{{ object.prop | filter: 'x', 'xx' | filter: ' preserve   string ' }}

{% assign foo = 'preserved  ' | append: object.prop %}


```
