import type { Filters, Tags } from '../..';
import * as standard from '../standard/export';
import { FILTERS } from './filters';
import { TAGS } from './tags';

export { objects } from './objects';

/**
 * Liquid Jekyll Specification: Filters
 */
export const filters: Filters = Object.assign(Object.create(null), FILTERS, standard.filters);

/**
 * Liquid Jekyll Specification: Tags
 */
export const tags: Tags = Object.assign(Object.create(null), TAGS, standard.tags);
