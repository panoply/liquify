import type { Tags as ITags } from '../../../types';
import { Tags } from './tags';
import { assign } from '../../../utils/native';
import * as standard from '../standard/export';

/* -------------------------------------------- */
/* EXPORTS                                      */
/* -------------------------------------------- */

export { objects } from './objects';

export { filters } from './filters';

/**
 * Liquid Shopify Spec: Tags
 */
export const tags: ITags = assign({}, Tags, standard.tags);
