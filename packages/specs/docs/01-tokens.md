# Tokens

The specifications refer to tokens in not so typical manner. We are not dealing with a _real_ programming language and for the most part, the vast majority of developers who are leveraging it are doing so from an intermediate standpoint.

| Name      | Description                                                                      |
| --------- | -------------------------------------------------------------------------------- |
| Tag       | Refers to a pair or singular type token using curly brace + percent delimiters   |
| Output    | Refers to a singular type token using double curly brace delimiters              |
| Filter    | Refers to a pipe separated modifier which is appended to tags and outputs        |
| Object    | Refers to a value that contains properties using a dot or bracket separator      |
| Property  | Refers to a value contained on an object separated by a dot or bracket           |
| Parameter | Refers to a alphanumeric value appended by a colon character                     |
| Argument  | Refers to a value proceeding an actionable operation which is contextually bound |
| Singular  | Refers to a an output tag or a type of tag that does not require an ender        |
| Keyword   | Refers to a alphanumeric word boundary that holds a value of something           |

### Tag

Tags are tokens which use a curly brace and percentage character combination delimiters. Tags can be either `singular` or pairs. By default, all tags are considered _pairs_ which means the tag requires an start and end. Takes that are _singular_ in nature require one to explicitly infer this by asserts `true` to the singular property of tags.

```js
// Example of tag pair
{% capture foo %} {% endcapture %}

// Example of a singular tag
{% assign foo = 'bar' %}

// Example of an output type tag
{{ tag }}
```

### Filter

Filters are contained within _output_ and sometimes _singular_ or _pair_ tags. Filters begin with a pipe character separator and can be expressed as a `keyword` or `parameter`. Filters will typically require _arguments_ to be defined. All filter keywords that contain arguments will check for a `colon` character.

```js
// Example of a BAO (basic argument order) filter
{{ tag | truncate: 1, 'xxx' }}

// Example of an AWP (argument with parameter) filter
{{ tag | default: 'foo', allow_false: false }}

// Example of an PAA (parameter with argument) filter
{{ tag | font_face: font_display: 'block' }}

// Example of an PAM (property and modifier) filter
{{ some_image | font_modify: 'weight', 'bold' }}
```

> More on how we construct [arguments](#) in the specs below.

### Object

Objects are just values. Because liquid is a consumer facing template language, objects will generally ship pre-defined. This is not always the case but for the most part it is. Objects can passed as values to tags, filters or be used as the value of an _output_ type token. The _objects_ specifications are composed different to tags and filters.

```js
// Example of an object used in an output tag
{{ object.property }}

// Example of an object used within a pair type iteration tag
{% for i in object.collection %} {% endfor %}

// Example of an object used within filter arguments
{{ 'hello world' | truncate: some.number, some['string']  }}
```
