import { NodeLanguage } from '../lexical/language';

/**
 * Tags are captured and applied as an array of strings.
 * There should never be more than 2 values that exist here.
 * When the parser encounters tag blocks, value will be 2.
 */
export type Token = string;

/**
 * Tags offsets reflect the positions of each captured token
 * in the document. Offsets will either have a value of 2 or 4.
 */
export type Offsets = number[];

/**
 * Line and Character position
 */
export type Cursor = Specs.IObject | Specs.IFilter | Specs.ITag;

export interface AssociateTags {
  language: NodeLanguage;
  kind: 'html' | 'liquid';
  name: string;
  attr?: string;
}
/* -------------------------------------------- */
/*                  DIAGNOSTIC                  */
/* -------------------------------------------- */

/**
 * IFIlter Specification tracker
 */
export interface IIFilters {
  /**
   * The name of the filter
   */
  name: string;
  /**
   * If we are within a filter, used when we are parsing
   * a filter argument object.
   */
  within: boolean;
  /**
   * The Argument we are currently parsing, this is incremented
   * via the filter.next() method getter.
   */
  argument: number;
  /**
   * The specification reference for the filter. This is applied
   * when we encounter a filter in a token ad changes each
   * time a new filter identifier is detected.
   */
  spec: Specs.IFilter;
}
