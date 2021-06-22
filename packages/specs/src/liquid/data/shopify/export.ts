import * as Standard from '../standard/export';
import IFilters from './filters';
import ITags from './tags';

export * as Objects from './objects';

export const Tags = { ...ITags, ...Standard.Tags };

export const Filters = { ...IFilters, ...Standard.Tags };
