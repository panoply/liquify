import F from './filters';
import T from './tags';
import { Filters as IFilters } from '../../types/filters';

export namespace standard {

  /**
   * Liquid Standard: Filters
   */
  export const filters: IFilters = F;

  /**
   * Liquid Standard Type: Filter List
   */
  export type FilterList = keyof typeof filters;

  /**
   * Liquid Standard Spec: Tags
   */
  export const tags = T;

  /**
   * Liquid Standard Type: Tag List
   */
  export type TagsList = Array<keyof typeof tags>;

}
