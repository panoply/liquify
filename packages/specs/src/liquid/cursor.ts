import { IFilter } from './types/filters';
import { ITag } from './types/tags';
import { IObject, IProperties } from './types/objects';
import { IArgument, IEngine } from './types/common';

/* -------------------------------------------- */
/* CURSOR STATE                                 */
/* -------------------------------------------- */

export namespace cursor {

  /**
   * Engine Variation Name
   */
  export let engine: IEngine = IEngine.standard;

  /**
   * Tag Specification
   */
  export let tag: ITag | null = null;

  /**
   * Object Specification
   */
  export let object: IObject & IProperties | null = null;

  /**
   * Filter Specification
   */
  export let filter: IFilter | null = null;

  /**
   * Argument Specification
   */
  export let argument: IArgument | null = null;

}
