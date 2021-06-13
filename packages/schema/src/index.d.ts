declare type Filenames =
  | "liquidrc"
  | "specs"
  | "shopify/sections"
  | "shopify/settings_schema"
  | "shopify/settings_data"
  | "shopify/locales"
  | "jekyll/_config";

/**
 * Returns the schema store
 */
export function store(filename: Filenames): Promise<object>;

/**
 * **!! INTERNAL USE ONLY !!**
 *
 * ---
 *
 * Returns `node_modules` local path uri. This is used internally
 * within the Liquify monorepo workspace. Its job is to simply prepend
 * the path location
 *
 * @param {Filenames|Filenames[]} filename
 * @param {string} prepend
 * Defaults to `'/node_modules/@liquify/schema-stores/@stores`
 */
export function path(
  filename: Filenames | Filenames[],
  prepend?: string
): string | string[];


export default store
