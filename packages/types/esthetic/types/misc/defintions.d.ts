import { GlobalRules, JSONRules, LiquidRules, MarkupRules, ScriptRules, StyleRules } from '..';

/**
 * Option defintion type string Literal
 */
export type DefinitionTypes = 'boolean' | 'array' | 'number' | 'string' | 'choice'

/**
 * Option defintion lexer types
 */
export type DefinitionLexerTypes = 'auto' | 'markup' | 'script' | 'style'

/**
 * Definition Reference
 */
export interface Definition {
  /**
   * Rules description
   */
  description: string;
  /**
   * The default setting
   */
  default: boolean | string[] | string | number;
  /**
   * Preset default
   */
  preset?: {
    [K in GlobalRules['preset']]: boolean | string[] | string | number
  }
  /**
   * Types
   *
   * When multiple types are accepted this will contain the references of each type.
   * The property should match the type name
   */
  type: DefinitionTypes | DefinitionTypes[] | {
    /**
     * The rule value
     */
    [K in DefinitionTypes]?: string;

  };
  /**
   * An optional list of pre-selected rule values.
   */
  values?: {
    /**
     * The rule value
     */
    rule: string;
    /**
     * Rule value description
     */
    description: string;
  }[]
}

/**
 * Option Definitions
 */
export interface Definitions {
  global: {
    [K in keyof GlobalRules]: Definition
  };
  liquid: {
    [K in keyof LiquidRules]: Definition
  };
  markup: {
    [K in keyof MarkupRules]: Definition
  };
  style: {
    [K in keyof StyleRules]: Definition
  };
  json: {
    [K in keyof JSONRules]: Definition
  };
  script: {
    [K in keyof ScriptRules]: Definition
  };
}
