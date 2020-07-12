interface Data {
  /**
   * The title of the test
   */
  readonly title: string;

  /**
   * The string contents
   */
  readonly string: string[];
}

/**
 * Cryptospec Rollup plugin used by the Liquify IDE plugin which will
 * encrypt JSON input files.
 */
export function fixtures(
  data: Data[]
): {
  fixture: string;
  tests: Data;
};
