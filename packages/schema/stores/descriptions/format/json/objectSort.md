&nbsp;⚙️&nbsp;&nbsp;&nbsp;**Default** `false`

&nbsp;💁🏽‍♀️&nbsp;&nbsp;&nbsp;Recommended setting is `false`

#### Object Sort

The `objectSort` rule will alphanumerically sort object properties. This rule is typically a matter of preference and it's maybe a good idea to skip sorting object property keys.

#

---


#### Before Formatting

*Take the following code example, where object properties (keys) and sorted in a non specific manner. The order of each property will change **after** formatting has been applied, sorting object properties in an alphanumerically (A-Z ~ 0-9) manner.*

```json

{
  "e": "5",
  "b": "2",
  "d": "4",
  "a": "1",
  "f": "6",
  "c": "3"
}


```

#### After Formatting

*Using the above code example, notice how all properties on the JSON object have been sorted alphanumerically (A-Z).*

```json

{
  "a": "1",
  "b": "2",
  "c": "3",
  "d": "4",
  "e": "5",
  "f": "6"
}


```
