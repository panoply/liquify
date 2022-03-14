import { Tags } from './tags';
/**
 * Liquid Shopify Spec: Objects
 */
export declare const objects: import("../../types").IObjects;
/**
 * Liquid Shopify Type: Object List
 */
export declare type ObjectList = Array<keyof typeof objects>;
/**
 * Liquid Shopify Spec: Filters
 */
export declare const filters: {
    [x: string]: import("../../types").IFilter;
};
/**
 * Liquid Shopify Type: Filter List
 */
export declare type FilterList = keyof typeof filters;
/**
 * Liquid Shopify Spec: Tags
 */
export declare const tags: {
    [x: string]: import("../../types").ITag;
};
/**
 * Liquid Shopify Type: Filter List
 */
export declare type TagList = Array<keyof typeof Tags>;
