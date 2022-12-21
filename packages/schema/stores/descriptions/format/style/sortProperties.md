&nbsp;⚙️&nbsp;&nbsp;&nbsp;**Default** `false`

&nbsp;💁🏽‍♀️&nbsp;&nbsp;&nbsp;Recommended setting is `true`

#### Sort Properties

This option will alphabetically sort class properties. This can be an expensive operation when dealing with large CSS files with over 5k properties. Below is an example of this rule when it is enabled (ie: `true`) which is the **recommended** setting.

#

---

#### Before Formatting

_Take the following CSS class when containing properties which are not sorted in any particular order. When this rule is enabled, then sorting order will change as per below **after** formatting example._

```css

.class {
  width: 100px;
  color: blue;
  font-size: 20px;
  background: pink
}


```

#### After Formatting

_Using the above **before** formatting example, all class properties **after** formatting have now been alphabetically (A-Z) sorted._

```css

.class {
  color: blue;
  background: pink;
  font-size: 20px;
  width: 100px;
}


```
