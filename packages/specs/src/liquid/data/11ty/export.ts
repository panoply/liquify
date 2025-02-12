import type { Filters as IFilters, Tags } from '../..';

import { Filters } from './filters';
import { assign } from '../../../utils/native';
import * as standard from '../standard/export';

export { objects } from './objects';

/**
 * Liquid 11ty Specification: Filters
 */
export const filters: IFilters = assign({}, Filters, standard.filters);

/**
 * Liquid 11ty Specification: Tags
 */
export const tags: Tags = assign({}, standard.tags);
