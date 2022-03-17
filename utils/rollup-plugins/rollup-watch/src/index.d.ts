import rollup from 'rollup';

interface Options {
  /**
   * List of assets files to watch
   */
  readonly assets: string[];

}

/**
 * Liquify Rollup plugin for extending Rollup's watch instance
 * to additional files
 */
export default function watch (options: Options): rollup.Plugin;
