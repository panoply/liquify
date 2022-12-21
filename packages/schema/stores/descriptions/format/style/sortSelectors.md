&nbsp;⚙️&nbsp;&nbsp;&nbsp;**Default** `false`

&nbsp;💁🏽‍♀️&nbsp;&nbsp;&nbsp;Recommended setting is `false`

#### Sort Selectors


This option will alphabetically sort class selectors. This can be an expensive operation when dealing with large CSS files with over 2k selectors present. Below is an example of this rule when it is enabled (ie: `true`).

#

---

#### Before Formatting

_Take the following CSS class selectors which are not sorted in any particular order. When this rule is enabled, then sorting order will change as per below **after** formatting example._

```css

.c-class,
.b-class,
.a-class {
  width: 100px;
  color: blue;
  font-size: 20px;
  background: pink
}


```

#### After Formatting

_Using the above **before** formatting example, class selectors **after** formatting are alphabetically (A-Z) sorted._

```css

.a-class,
.b-class,
.c-class {
  width: 100px;
  color: blue;
  font-size: 20px;
  background: pink
}


```
