# Variables

Liquify treats variable assignments in a similar way as TypeScript. Comment annotations are supported which allows you to provide documentation descriptions to describe assignments and captures.

```liquid

{% comment %}
  This assignment holds the value used to match something.
{% endcomment %}
{% assign variable = 'foo' %}

```
