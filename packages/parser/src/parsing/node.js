
export default (function () {

  let range
    , space

  return class Node {

    token = []
    offset = []

    get range () {

      return range
    }

    get space () {

      return space
    }

    set space (level) {

      if (!Array.isArray(level)) {
        space = []
      }
    }

    set errors (error) {

      Object.assign(this, { error })

    }

  }
})()
