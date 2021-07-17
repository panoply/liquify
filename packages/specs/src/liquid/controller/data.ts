import * as Specification from '../data/export';
import { IEngine, Variation } from '../types/common';
import { IProvide } from '../types/data';
import { documentation } from './utils';

/* -------------------------------------------- */
/* EXPORTED SCOPE                               */
/* -------------------------------------------- */

export let engine: IEngine = IEngine.standard;

/**
 * Data Provider
 */
export let variation: Variation = Specification.standard;

/**
 * Data Provider
 */
export let provider: IProvide = Completions();

/* -------------------------------------------- */
/* FUNCTIONS                                    */
/* -------------------------------------------- */

/**
 * Set Engine
 *
 * Sets the Liquid `variation` and `engine` variable.
 * This will change what specification we reference.
 */
export function Engine (name: IEngine): void {

  if (engine !== name) {
    engine = name;
    variation = Specification[engine];
    provider = Completions();
  }

};

/**
 * Completions
 *
 * Constructs LSP completion-ready lists from the current
 * specification reference. Returns a closure getter combinator
 * with array lists for various tags, filters and objects.
 */
export function Completions (): IProvide {

  /* -------------------------------------------- */
  /* TAG COMPLETIONS                              */
  /* -------------------------------------------- */

  const tags = Object.entries(variation.tags).map(
    ([
      label,
      {
        description,
        reference,
        deprecated = false,
        singular = false,
        snippet = null
      }
    ]) => ({
      label,
      deprecated,
      documentation: documentation(description, reference),
      data: { snippet, singular }
    })
  );

  /* -------------------------------------------- */
  /* FILTER COMPLETIONS                           */
  /* -------------------------------------------- */

  const filters = Object.entries(variation.filters).map(
    ([
      label,
      {
        description,
        reference,
        deprecated = false
      }
    ]) => ({
      label,
      deprecated,
      documentation: documentation(description, reference)
    })
  );

  /* -------------------------------------------- */
  /* OBJECT COMPLETIONS                           */
  /* -------------------------------------------- */

  const objects = variation?.objects ? Object.entries(variation.objects).map(
    ([
      label,
      {
        description,
        reference,
        deprecated = false,
        singular = false
      }
    ]) => ({
      label,
      deprecated,
      documentation: documentation(description, reference),
      data: { singular }
    })
  ) : null;

  return {
    get tags () {
      return tags;
    },
    get filters () {
      return filters;
    },
    get objects () {
      return objects;
    }
  };

}
