import { HTMLAttributes, HTMLTags, HTMLValues } from './html';
import { attributes, tags, values, voids } from './html/data/index';
import { Filters, Objects, Tags } from './liquid';
import { extend, generate, purge } from './liquid/controller/extend';
import { eleventy, jekyll, shopify, standard } from './liquid/data/index';
import { Engine } from './utils/enums';

/**
 * Liquid Specifications
 */
export const liquid: {
  /**
   * Purge Specification
   *
   * This function allows the specification to be extended
   * with custom support for different references.
   */
  purge: (engine: Engine, spec: {
    objects?: string[],
    filters?: string[],
    tags?: string[]
  }) => {
    objects?: Objects,
    filters: Filters,
    tags: Tags
  }

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
   * Generate Specification
   *
   * Traverses a data structure and composes a Liquid specification that can be
   * understand by the query engine. Used for cases like the 11ty data cascade,
   * frontmatter and more. Expects an `input` object reference and specification type.
   */
  generate: <T>(input: any, spec?: any) => T;

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
   *
   * **NOT YET AVAILABLE**
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

  /**
   * Eleventy Liquid
   */
  get eleventy(): {
    /**
     * Eleventy Specification: Tags
     *
     * Tags extend the Standard Variation and will be made
     * available here.
     */
    tags: Tags;
    /**
       * Eleventy Specification: Filters
       *
       * Filters extend the Standard Variation and will be made
       * available here.
       */
    filters: Filters;
    /**
       * Eleventy Specification: Filters
       *
       * Filters extend the Standard Variation and will be made
       * available here.
       */
    objects: Objects;
  }

} = {

  purge,
  extend,
  generate,

  get standard () {
    return standard;
  },
  get shopify () {
    return shopify;
  },
  get jekyll () {
    return jekyll;
  },
  get eleventy () {
    return eleventy;
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
