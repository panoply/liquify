## Filters

```json
{
  "arguments": [
    {
      "name": "style",
      "type": "argument",
      "accepts": ["$string", "$reference"],
      "options": [
        {
          "name": "normal",
          "description": "Returns the normal variant of the same weight (if it exists)."
        },
        {
          "name": "italic",
          "description": "Returns the italic variant of the same weight (if it exists).."
        },
        {
          "name": "oblique",
          "description": "Has the same behavior as italic. None of the font families provided by Shopify have both italic and oblique styles."
        }
      ]
    }
  ]
}
```

### Arguments `object[]`

##### Type is `argument`

| Keyword         | Type       | Required |
| --------------- | ---------- | -------- |
| `name`          | `string`   | Yes      |
| `documentation` | `string`   | No       |
| `snippet`       | `string`   | No       |
| `arguments`     | `object[]` | No       |
