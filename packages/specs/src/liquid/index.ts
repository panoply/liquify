import * as Specification from './export';
import { IFilter } from './types/filters';
import { ITag } from './types/tags';
import { IObject } from './types/objects';

/* ENGINE ENUM -------------------------------- */

export const enum IEngine {

  /**
   * Liquid Standard Variation
   *
   * **FREE**
   */
  standard = 'standard',

  /**
   * Liquid Shopify Variation
   *
   * **LICENSED**
   */
  shopify = 'shopify',

  /**
   * Liquid Jekyll Variation
   *
   * **FREE**
   */
  jekyll = 'jekyll',

  /**
   * Liquid Eleventy Variation
   *
   * **FREE**
   */
  eleventy = 'eleventy'

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
  readonly filters: Entries<IFilter>;
  readonly objects?: Entries<IObject>;
  readonly tags: Entries<ITag>;
}

/* VARIATION ---------------------------------- */

export interface Variation {
  readonly engine?: IEngine;
  readonly updated?: string;
  readonly filters?: { [tag: string]: IFilter }
  readonly objects?:{ [tag: string]: IObject; }
  readonly tags?: { [tag: string]: ITag; }
}

/* SPECIFIER ---------------------------------- */

export type Specifiers = IFilter & IObject & ITag;

/* -------------------------------------------- */
/* CONTROLLER                                   */
/* -------------------------------------------- */

/**
 * Variation
 */
export let variation: Variation;

/**
 * Cursor
 */
export let cursor: IFilter | IObject | ITag;

/**
 * Liquid Engine
 *
 * Sets the variation specification. Called upon
 * initialization before parsing begins, the engine
 * must be passed and the license.
 */
export function Engine (engine: keyof typeof IEngine): void {

  variation = Specification[engine] as Variation;
}

/**
 * Liquid Cursor
 *
 * Represents an in-stream specification. The cursor is changed
 * each time a new tag with a reference specification is encountered
 * it will be made available on private `cursor` prop.
 */
export function Cursor (
  name: string,
  tag: 'filters' | 'tags' | 'objects'
): boolean {

  if (variation === undefined || !name) return false;

  if (tag === 'tags') {
    if (variation?.tags?.[name]) {
      cursor = variation.tags[name] as ITag;
      return true;

    }
  }

  if (tag === 'filters') {
    if (variation?.filters?.[name]) {
      cursor = variation.filters[name] as IFilter;
      return true;
    }
  }

  if (tag === 'objects') {

    // Liquid Standard has no known objects in its specification
    // we will prevent any walks occuring.
    if (variation.engine !== IEngine.standard && variation?.objects?.[name]) {
      cursor = variation.objects[name] as IObject;
      return true;
    }
  }

  cursor = undefined;

  return false;

};
