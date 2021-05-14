/**
 * Schema Stores
 *
 * Returns the JSON Schema Store.
 *
 * @param {import('./index.d').Filenames} store
 */
function store (name) {

  try {

    const schema = require(`./${name}.json`)

    return schema

  } catch (e) {

    throw new Error(e)

  }
}

export default store
