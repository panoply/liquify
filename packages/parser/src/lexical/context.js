export default   [
  [
    'liquid_tag_filters'
    ,
    {
      match: (

        /(?<=\|[\s]+)([_a-zA-Z]+)?:?(.*?)(?=\||-?[%}]})/gs

      )

    }
  ]
  ,
  [
    'liquid_tag_parameters'
    ,
    {
      match: (

        /(?<=,|\s)([_a-z-A-Z0-9-]+)\s*([:=])\s*["']?(.+?)(?=,|["']|-?%})/g

      )
    }
  ]
  ,
  [
    'liquid_tag_path'
    ,
    {
      match: (

        /(?<=['"]?)\b[_a-zA-Z0-9.-]+\b(?=["']?)/

      )
    }
  ]
]
