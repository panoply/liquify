import { Filters } from './filters';
import { IFilters } from '../../types/filters';
/**
 * Liquid Standard: Filters
 */
export declare const filters: IFilters;
/**
 * Liquid Standard Type: Filter List
 */
export declare type FilterList = keyof typeof Filters;
/**
 * Liquid Standard Spec: Tags
 */
export declare const tags: import("../../types").ITags;
/**
 * Liquid Standard Type: Tag List
 */
export declare type TagsList = Array<keyof typeof tags>;
