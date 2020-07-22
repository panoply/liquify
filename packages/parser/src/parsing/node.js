
class Node {

  constructor (kind) {

    this.kind = kind
    this.offset = []
    this.token = []
  }

  set errors (error) {

    Object.assign(this, { error })

  }

  create (name, offset) {

    return Object.assign(this, (typeof offset === 'number' ? {
      name,
      token: [],
      offset: [ offset ]
    } : {
      name,
      token: [ stream.getText(offset[0], offset[1]) ],
      offset: offset
    }))

  }

}
