/**
 * Schema Stores
 *
 * Returns the JSON Schema Store.
 *
 * @param {import('./index.d').Filenames} store
 */
async function store (name) {

  try {

    const schema = await import(`./@stores/${name}.json`)

    return schema

  } catch (e) {

    throw new Error(e)

  }
}

export default store
