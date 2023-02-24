import { shopify, standard, jekyll } from './liquid/data/index';
import { Tags, Objects, Filters } from './liquid';
import { extend } from './liquid/controller/extend';
import { attributes, tags, values, voids } from './html/data/index';
import { HTMLAttributes, HTMLTags, HTMLValues } from './html';
import { Engine } from './utils/enums';

/**
 * Liquid Specifications
 */
export const liquid: {
/**
 * Extend Specification
 *
 * This function allows the specification to be extended
 * with custom support for different references.
 */
  extend: (engine: Engine, spec: {
    objects?: Objects,
    filters?: Filters,
    tags?: Tags
  }) => {
    objects?: Objects,
    filters: Filters,
    tags: Tags
  }

  /**
   * Standard Liquid
   */
  get standard(): {
    /**
     * Liquid Standard Specification: Tags
     */
    tags: Tags;
    /**
     * Liquid Standard Filters: Tags
     */
    filters: Filters;
  }
  /**
   * Shopify Liquid
   */
  get shopify(): {
    /**
     * Liquid Shopify Specification: Tags
     *
     * Tags extend the Standard Variation and will be made
     * available here.
     */
    tags: Tags;
    /**
     * Liquid Shopify Specification: Filters
     *
     * Filters extend the Standard Variation and will be made
     * available here.
     */
    filters: Filters;
    /**
     * Liquid Shopify Specification: Filters
     *
     * Filters extend the Standard Variation and will be made
     * available here.
     */
    objects: Objects;
  }
  /**
   * Jekyll Liquid
   */
  get jekyll(): {
    /**
     * Liquid Jekyll Specification: Tags
     *
     * Tags extend the Standard Variation and will be made
     * available here.
     */
    tags: Tags;
    /**
     * Liquid Jekyll Specification: Filters
     *
     * Filters extend the Standard Variation and will be made
     * available here.
     */
    filters: Filters;
    /**
     * Liquid Jekyll Specification: Filters
     *
     * Filters extend the Standard Variation and will be made
     * available here.
     */
    objects: Objects;
  }

} = {

  extend,

  get standard () {
    return standard;
  },
  get shopify () {
    return shopify;
  },
  get jekyll () {
    return jekyll;
  }

};

/**
 * Liquid Specifications
 */
export const html: {
  /**
   * HTML Attributes
   */
  get attributes (): HTMLAttributes
  /**
   * HTML Tags
   */
  get tags(): HTMLTags;
  /**
   * HTML Values
   */
  get values(): HTMLValues;
  /**
   * HTML Voids
   */
  get voids(): string[]

} = {

  get attributes () {
    return attributes;
  },
  get tags () {
    return tags;
  },
  get values () {
    return values;
  },
  get voids () {
    return voids;
  }

};

/* QUERY ENGINE ------------------------------- */

export * as $ from './s';
export * as p from './p';
export * as q from './q';

/* SHARED TYPINGS ----------------------------- */

export * from './utils/enums';
export * from './liquid/types';
export * from './html/types';
export * from './types';
