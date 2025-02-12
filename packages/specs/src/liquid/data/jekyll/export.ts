import type { Filters, Tags } from '../..';

import { FILTERS } from './filters';
import { TAGS } from './tags';
import * as standard from '../standard/export';

export { objects } from './objects';

/**
 * Liquid Jekyll Specification: Filters
 */
export const filters: Filters = Object.assign(Object.create(null), FILTERS, standard.filters);

/**
 * Liquid Jekyll Specification: Tags
 */
export const tags: Tags = Object.assign(Object.create(null), TAGS, standard.tags);
