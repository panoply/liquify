import { standard } from '../standard/export';
import { Filters } from './filters';
import { Tags } from './tags';
import { Objects } from './objects';

export namespace shopify {

  /**
   * Liquid Shopify Spec: Objects
   */
  export const objects = Objects;

  /**
   * Liquid Shopify Type: Object List
   */
  export type ObjectList = Array<keyof typeof objects>;

  /**
   * Liquid Shopify Spec: Filters
   */
  export const filters = { ...Filters, ...standard.filters };

  /**
   * Liquid Shopify Type: Filter List
   */
  export type FilterList = keyof typeof filters;

  /**
   * Liquid Shopify Spec: Tags
   */
  export const tags = { ...Tags, ...standard.tags };

  /**
   * Liquid Shopify Type: Filter List
   */
  export type TagList = Array<keyof typeof Tags>;

}
