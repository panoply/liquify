import * as Specification from 'liquid/export';
import { IFilter, Filters } from 'liquid/types/filters';
import { ITag, Tags } from 'liquid/types/tags';
import { IObject, Objects } from 'liquid/types/objects';

/* ENGINE ENUM -------------------------------- */

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

/* COMPLETE VARIATION ------------------------- */

type PickByValue<T, V> = Pick<T, {
  [K in keyof T]: T[K] extends V ? K : never }[keyof T]
>;

/* ENTRIES ------------------------------------ */

type Entries<T> = {
  [K in keyof T]: [keyof PickByValue<T, T[K]>, T[K]];
}[keyof T][];

/* VARIATION ENTRIES -------------------------- */

export interface VariationEntries {
  readonly filters: Entries<Filters>;
  readonly objects?: Entries<Objects>;
  readonly tags: Entries<Tags>;
}

/* VARIATION ---------------------------------- */

export interface Variation {
  readonly engine?: IEngine;
  readonly updated?: string;
  readonly filters?: Filters;
  readonly objects?: Objects;
  readonly tags?: Tags;
}

export type Specifiers = IFilter & IObject & ITag;

/**
 * Variation
 */
export let variation: Variation;

/**
 * Cursor
 */
export let cursor: ITag | IFilter | IObject | undefined;

/**
 * Liquid Engine
 *
 * Sets the variation specification. Called upon
 * initialization before parsing begins, the engine
 * must be passed and the license.
 */
export function Engine (variation: IEngine): void {

  variation = Specification[variation];

}

/**
 * Liquid Cursor
 *
 * Represents an in-stream specification. The cursor is changed
 * each time a new tag with a reference specification is encountered
 * it will be made available on private `cursor` prop.
 */
export function Cursor (name: string): boolean {

  if (variation === undefined || !name) return false;

  if (variation?.tags?.[name] as ITag) {
    cursor = variation.tags[name] as ITag;
    return true;
  }

  if (variation?.filters?.[name]) {
    cursor = variation.filters[name] as IFilter;
    return true;
  }

  // Liquid Standard has no known objects in its specification
  // we will prevent any walks occuring.
  if (variation.engine !== IEngine.Standard && variation?.objects?.[name]) {
    cursor = variation.objects[name] as IObject;
    return true;
  }

  cursor = undefined;

  return false;

};
