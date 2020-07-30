/**
 * Creates an empty object
 *
 * @export
 * @returns {object}
 */
export function object () {

  return Object.create(null)

}

export function parentNodes ({ ast }, parents = []) {

  let parent

  return ({
    children: name => {
      if (parent?.name === name && parent?.children) {
        return parent.children[parent.children.push(name) - 1]
      }
    },
    parent: (name, node) => {
      const find = parents.indexOf(name)
      if (find >= 0) {
        const parent = ast[find + 1]
        parents.splice(find, 2)
        if (parent?.name === name) {
          return parent.children[parent.children.push(node) - 1]
        }
      }

      return false

    },
    set: name => parents.push(name, ast.length)
  })

}
