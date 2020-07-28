import * as TokenTag from '../lexical/tags'

export default (function () {

  let spec
    , type
    , name

  return new class Specs {

    get type () {

      return type

    }

    set type (token) {

      type = token

    }

    get name () {

      return name

    }

    set name (tag) {

      name = tag

    }

    get spec () {

      const nodeSpec = (
        (
          this.type && spec[this.type]?.[this.name]
        ) || (
          spec?.tags?.[this.name]
        ) || (
          !this.type && spec?.objects?.[this.name]
        )
      ) || false

      if (nodeSpec) {
        this.type = TokenTag[nodeSpec.type]
      }

      return nodeSpec

    }

    set spec (data) {

      spec = data

    }

  }()

})()
