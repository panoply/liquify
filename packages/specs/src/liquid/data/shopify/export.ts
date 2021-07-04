import { standard } from '../standard/export';
import F from './filters';
import T from './tags';
import O from './objects';

export namespace shopify {

  /**
   * Liquid Shopify Spec: Objects
   */
  export const objects = O;

  /**
   * Liquid Shopify Type: Object List
   */
  export type ObjectList = Array<keyof typeof objects>;

  /**
   * Liquid Shopify Spec: Filters
   */
  export const filters = { ...F, ...standard.filters };

  /**
   * Liquid Shopify Type: Filter List
   */
  export type FilterList = keyof typeof filters;

  /**
   * Liquid Shopify Spec: Tags
   */
  export const tags = { ...T, ...standard.tags };

  /**
   * Liquid Shopify Type: Filter List
   */
  export type TagList = Array<keyof typeof tags>;

}
