declare type Filenames =
  | "liquidrc"
  | "liquidspecs"
  | "shopify-sections"
  | "shopify-settings"
  | "shopify-locales"
  | "jekyll-config";

/**
 * Returns the schema store
 *
 * @param filename
 */
export default function store(filename: Filenames):Promise<object>;
