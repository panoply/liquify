import rollup from 'rollup';

interface Options {
  /**
   * Include
   */
  readonly include: string[];

  /**
   * Exclude
   */
  readonly exclude: string[];

  /**
   * Key Value replacers
   */
  readonly enums: {
    [key: string]: number
  }
}

/**
 * Liquify Rollup plugin for converting specification type strings
 * into enum number values.
 */
export default function enums (options: Options): rollup.Plugin;
