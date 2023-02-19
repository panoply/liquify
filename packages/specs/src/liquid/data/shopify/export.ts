import type { Tags as ITags } from '../../../types';
import type { Filters as IFilters } from '../../../types/filters';
import { Filters } from './filters';
import { Tags } from './tags';
import { assign } from '../../../utils/native';
import * as standard from '../standard/export';

/* -------------------------------------------- */
/* EXPORTS                                      */
/* -------------------------------------------- */

export { objects } from './objects';

/**
 * Liquid Shopify Spec: Filters
 */
export const filters: IFilters = assign({}, Filters, standard.filters);

/**
 * Liquid Shopify Spec: Tags
 */
export const tags: ITags = assign({}, Tags, standard.tags);
