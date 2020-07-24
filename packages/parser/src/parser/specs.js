import { TagType } from '../enums/tags.ts'

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

      return spec[this.type === TagType.object ? 'objects' : 'tags'][this.name]

    }

    set spec (data) {

      spec = data

    }

  }()

})()
