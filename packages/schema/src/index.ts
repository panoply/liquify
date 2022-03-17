declare type Filenames =
  | 'liquidrc'
  | 'specs'
  | 'shopify/sections'
  | 'shopify/settings_schema'
  | 'shopify/settings_data'
  | 'shopify/locales'
  | 'jekyll/_config';

/**
 * Schema Stores
 *
 * Returns the JSON Schema Store.
 */
export async function store (name: Filenames) {

  try {

    const schema = await import(`./stores/${name}.json`);

    return schema;

  } catch (e) {

    throw new Error(e);

  }
}

/**
 * **!! INTERNAL USE ONLY !!**
 *
 * ---
 *
 * Returns `node_modules` local path uri. This is used internally
 * within the Liquify monorepo workspace. Its job is to simply prepend
 * the path location
 *
 * Defaults to `'/node_modules/@liquify/schema-stores/stores`
 */
export function path (
  name: Filenames | Filenames[],
  prepend = 'node_modules/@liquify/schema-stores/package/stores'
) {

  if (typeof name === 'string') return `${prepend}/${name}.json`;

  if (Array.isArray(name)) return name.map(id => `${prepend}/${id}.json`);

}

export default store;
