/**
 * Schema Stores
 *
 * Returns the JSON Schema Store.
 *
 * @param {import('./index.d').Filenames} store
 */
export async function store (name) {

  try {

    const schema = await import(`./stores/${name}.json`);

    return schema;

  } catch (e) {

    throw new Error(e);

  }
}

/**
 * Paths Export
 *
 * Provides direct uri to the node_modules path. Used internally
 * within the Liquify workspace.
 *
 * @param {import('./index.d').Filenames} store
 */
export function path (
  name,
  prepend = 'node_modules/@liquify/schema-stores/package/stores'
) {

  if (typeof name === 'string') return `${prepend}/${name}.json`;

  if (Array.isArray(name)) return name.map(id => `${prepend}/${id}.json`);

}

export default store;
