&nbsp;⚙️&nbsp;&nbsp;&nbsp;**Default** `false`

&nbsp;💁🏽‍♀️&nbsp;&nbsp;&nbsp;Recommended setting is `false`

#### No Lead Zero

Whether leading 0s in CSS values immediately preceding a decimal should be removed or prevented. The below example show how the rule works when enabled (ie: `true`). Keep in mind that this rule is disabled (ie: `false`) by **default**.

#

---

#### Before Formatting

_Take the following `font-size` and `transition` values which are inferring a `0` point decimal numbers. Notice how the values are targeting a size less than 1 and using a leading 0 decimal point to assert this. In the **after** formatting example below, the 0s will be stripped._

```css

.class {
  font-size: 0.995rem;
  transition: all 0.5s ease-out;
}


```

#### After Formatting

_Using the above **before** formatting example, both numeric values of `font-size` and `transition` have removed the leading `0` number from the decimal point, resulting in the following:_

```css

.class {
  font-size: .995rem;
  transition: all .5s ease-out;
}


```
