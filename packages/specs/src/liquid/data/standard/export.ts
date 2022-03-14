import { Filters } from './filters';
import { Tags } from './tags';
import { IFilters } from 'liquid/types/filters';

/**
 * Liquid Standard: Filters
 */
export const filters: IFilters = Filters;

/**
 * Liquid Standard Type: Filter List
 */
export type FilterList = keyof typeof Filters;

/**
 * Liquid Standard Spec: Tags
 */
export const tags = Tags;

/**
 * Liquid Standard Type: Tag List
 */
export type TagsList = Array<keyof typeof tags>;
