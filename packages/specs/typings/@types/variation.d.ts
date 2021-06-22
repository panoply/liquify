import { Filters, IFilter } from './filters';
import { Objects, IObject } from './objects';
import { Tags, ITag } from './tags';

/* ENGINES ------------------------------------ */

export type Engine = 'standard' | 'shopify' | 'jekyll' | 'eleventy';

export const enum IEngine {

  /**
   * Liquid Standard Variation
   *
   * **FREE**
   */
  Standard = 'standard',

  /**
   * Liquid Shopify Variation
   *
   * **LICENSED**
   */
  Shopify = 'shopify',

  /**
   * Liquid Jekyll Variation
   *
   * **FREE**
   */
  Jekyll = 'jekyll',

  /**
   * Liquid Eleventy Variation
   *
   * **FREE**
   */
  Eleventy = 'eleventy'

}

/* NODE SPECIFICS ----------------------------- */

export interface Nodes {
  /**
   * Objects contained in the specification
   */
  readonly objects?: Objects;
  /**
   * Filters contained in the specification
   */
  readonly filters: Filters;
  /**
   * Tags contained in the specification
   */
  readonly tags: Tags;
}

/* COMPLETE VARIATION ------------------------- */

type PickByValue<T, V> = Pick<
  T,
  { [K in keyof T]: T[K] extends V ? K : never }[keyof T]
>;

type Entries<T> = {
  [K in keyof T]: [keyof PickByValue<T, T[K]>, T[K]];
}[keyof T][];

export interface VariationEntries {
  readonly filters: Entries<Filters>;
  readonly objects?: Entries<Objects>;
  readonly tags: Entries<Tags>;
}

export interface Variation {
  readonly engine: string;
  readonly updated: string;
  readonly filters: Filters;
  readonly objects?: Objects;
  readonly tags: Tags;
  readonly entries: VariationEntries;
}

export type Specifiers = IFilter & IObject & ITag;
