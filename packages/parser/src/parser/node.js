
import { object } from './utils'

export default (function () {

  let range
    , space

  return class Node {

    /**
     * Tag Name
     *
     * @type{string}
     */
    name = undefined

    type = undefined

    /**
     * Tag Kind
     *
     * @type{string}
     */
    kind = 'liquid'

    /**
     * String Literal tokens
     *
     * @type{string[]}
     */
    token = []

    /**
     * Offset - Index position offsets
     *
     * @type {number[]}
     */
    offset = []

    /**
     * Range - Line/character position
     *
     * @type {object}
     */
    range = {}

    /**
     * Range - Line/character position
     *
     * @type {array}
     */
    context = []

    /**
     * Start Offset - Left most starting index
     *
     * @type {object}
     */
    get start () {

      return this.offset[0]

    }

    /**
     * End Offset - right most starting index
     *
     * @type {object}
     */
    get end () {

      return this.offset[this.offset.length - 1]

    }

    /**
     * Space -  Whitespacing
     *
     * @type {object}
     */
    get space () {

      return space

    }

    /**
     * Space -  Whitespacing
     *
     * @type {object}
     */
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
