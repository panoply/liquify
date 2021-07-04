import { standard } from '../standard/export';
import F from './filters';
import T from './tags';
import O from './objects';

export namespace jekyll {

  /**
   * Liquid Jekyll Spec: Objects
   */
  export const Objects = O;

  /**
   * Liquid Jekyll Type: Object List
   */
  export type ObjectList = keyof typeof Objects;

  /**
   * Liquid Jekyll Spec: Filters
   */
  export const filters = { ...F, ...standard.filters };

  /**
   * Liquid Jekyll Type: Filter List
   */
  export type FilterList = keyof typeof filters;

  /**
   * Liquid Jekyll Spec: Tags
   */
  export const tags = { ...T, ...standard.tags };

  /**
   * Liquid Jekyll Type: Filter List
   */
  export type TagList = keyof typeof tags;

}
