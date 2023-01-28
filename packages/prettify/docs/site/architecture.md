---
title: 'Architecture'
layout: docs.liquid
permalink: '/architecture/index.html'
order: 4
sidebar:
  - 'Algorithm'
  - 'Parse Table'
  - 'Terminology'
---

# Algorithm

The lexing alogirthm and parse approach employed in Prettify is an original strategic concept created by [Austin Cheney](https://github.com/prettydiff) that was first introduced in [Sparser](https://sparser.io/) to provide a simple data format that can accurately describe any language. Parsers typically produce an [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) (abstract syntax tree) whereas Prettify and its implemention of Sparser will produces a uniformed table like structure.

Many different algorithms can be made to work to acheive the same result as that which is produced by the Sparser table structure, but they all come with tradeoffs relative to the others. Most tools in this nexus seem to be using some variant of [ANTLR](https://en.wikipedia.org/wiki/ANTLR) or [PEG](https://en.wikipedia.org/wiki/Parsing_expression_grammar). PEG has less ambiguity than LR parsers but may produce worse error messages for users and consume more memory. Hand-rolled recursive-descent parsers may be slower than the ones produced by parser generators, but are unambiguous. When the task involves making sense of combined language formations (ie: Liquid inside of JavaScript inside HTML) there is no "right way" or consensus on how it should be done nor does it seem to have been studied much in academia likely due the edge case in which it exists.

The originalitly of the Sparser language parsing alogirthm allows for otherwise complex structures to be traversed and interpreted for handling without having to bend and augmented to address weaknesses. This table structure is produces allows for basic reasoning during the beautifical cycle and more controlled results. This lexical analyis and universal nature achieved by using the Sparser parse algorithm is made possible through three realizations:

### Languages are composed of structures.

A structure is a logical grouping that is typically defined by a language through syntax and sometimes by context. A simple scheme that identifies the atomic particles of a language by structure is sufficient to describe the language. That simple scheme is what allows the Prettify to describe different languages equally and universally.

### Descriptions of language structures are universally extensible.

Language structures are not flat. One structure may include other child structures. Those child structures may be of a different grammar, syntax, or language from the parent structure. A universal description of language structure allows complex documents, which are documents composed of more than one language, to be described as a single uniform piece of data.

### Structure provides context.

Understanding any arrangment of complex information takes into account context. Context is the meaning of a thing in relation to other things of close proximity. Sometimes the pieces of a language are partially or wholly defined by their context. A uniform and universal description of structure provides implicit definitions of a language fragment that becomes explicit when extended with additional descriptive data.

# Parse Table

Object trees are painful to traverse and hard to analyze from single global perspective which is why the uniformed data structure that Prettify produces for its usage in the beautification cycle is a table like structure. The table can actually represent an AST shape by pointing to a code token's starting structuring with a reference location (array index) and thus can easily adapt and infer identification to other parsing considerations.

### Example

Take the following markup code sample which contained 4 different languages (HTML, Liquid, JavaScript and CSS). Notice how both the HTML and both the `<style>` and `<script>` embedded regions contain Liquid syntax.

```html
<style>
  .list {
    background-color: {{ bg.color }};
  }
</style>

<script>
  {% if condition %}
    window.foo = {{ foo }};
  {% else %}
    window.foo = {{ bar }};
  {% endif %}
</script>

<main id="{{ object.prop }}">
  <ul class="list">
    {% for i in arr %}
    <li>{{ i.prop }}</li>
    {% endfor %}
  </ul>
</main>
```

### Table

Using the above code sample, below is table representation of the produced structure. Each column name in the table is representative on an object property key value in and each row is representative of an item within an array.

| index | begin | ender | lexer  | lines | stack       | types         | token                    |
| ----- | ----- | ----- | ------ | ----- | ----------- | ------------- | ------------------------ |
| 0     | -1    | 8     | markup | 0     | global      | start         | `<style>`                |
| 1     | 0     | 8     | style  | 0     | style       | selector      | `.list`                  |
| 2     | 0     | 7     | style  | 1     | style       | start         | `{`                      |
| 3     | 2     | 7     | style  | 2     | .list       | property      | `background-color`       |
| 4     | 2     | 7     | style  | 0     | .list       | colon         | `:`                      |
| 5     | 2     | 7     | style  | 1     | .list       | liquid_output | `{{ bg.color }}`         |
| 6     | 2     | 7     | style  | 0     | .list       | separator     | `;`                      |
| 7     | 2     | 7     | style  | 2     | .list       | end           | `}`                      |
| 8     | 0     | 8     | markup | 0     | style       | end           | `</style>`               |
| 9     | 1     | 25    | markup | 0     | global      | start         | `<script>`               |
| 10    | 9     | 17    | script | 0     | script      | liquid_start  | `{% if condition %}`     |
| 11    | 10    | 17    | script | 2     | liquid_if   | word          | `window`                 |
| 12    | 10    | 17    | script | 0     | liquid_if   | separator     | `.`                      |
| 13    | 10    | 17    | script | 0     | liquid_if   | word          | `foo`                    |
| 14    | 10    | 17    | script | 1     | liquid_if   | operator      | `=`                      |
| 15    | 10    | 17    | script | 1     | liquid_if   | liquid        | `{{ foo }}`              |
| 16    | 10    | 17    | script | 0     | liquid_if   | separator     | `;`                      |
| 17    | 10    | 24    | script | 2     | liquid_if   | liquid_else   | `{% else %}`             |
| 18    | 17    | 24    | script | 2     | liquid_else | word          | `window`                 |
| 19    | 17    | 24    | script | 0     | liquid_else | separator     | `.`                      |
| 20    | 17    | 24    | script | 0     | liquid_else | word          | `foo`                    |
| 21    | 17    | 24    | script | 1     | liquid_else | operator      | `=`                      |
| 22    | 17    | 24    | script | 1     | liquid_else | liquid        | `{{ bar }}`              |
| 23    | 17    | 24    | script | 0     | liquid_else | separator     | `;`                      |
| 24    | 17    | 24    | script | 2     | liquid_else | liquid_end    | `{% endif %}`            |
| 25    | 9     | 25    | markup | 0     | script      | end           | `</script>`              |
| 26    | 1     | 36    | markup | 0     | global      | start         | `<main>`                 |
| 27    | 26    | 36    | markup | 0     | main        | attribute     | `id="{{ object.prop }}"` |
| 28    | 26    | 35    | markup | 0     | main        | start         | `<ul>`                   |
| 29    | 28    | 35    | markup | 0     | ul          | attribute     | `class="list"`           |
| 30    | 28    | 34    | markup | 0     | ul          | liquid_start  | `{% for i in arr %}`     |
| 31    | 30    | 33    | markup | 0     | for         | start         | `<li>`                   |
| 32    | 31    | 33    | markup | 0     | li          | liquid        | `{{ i.prop }}`           |
| 33    | 31    | 33    | markup | 0     | li          | end           | `</li>`                  |
| 34    | 30    | 34    | markup | 0     | for         | liquid_end    | `{% endfor %}`           |
| 35    | 28    | 35    | markup | 0     | ul          | end           | `</ul>`                  |
| 36    | 26    | 36    | markup | 0     | main        | end           | `</main>`                |

# Terminology
