import { LiteralUnion } from 'type-fest';

export enum LogLevel {
  /**
   * Disables logs, only parse errors will show.
   */
  Disable = 1,
  /**
   * Standard logs, this is the default. Operations, errors and warnings.
   */
  Standard,
  /**
   * Detailed logs, various information is printed throught the cycle.
   */
  Detailed
}

export interface IConfig {
  /**
   * **Use `.editorconfig` File**
   *
   * Whether or not Æsthetic should inherit and use options defined in `.editorconfig` files.
   * When an `.editorconfig` file is detected in your projects root directory, Æsthetic will
   * keep track and use inheritable options.
   *
   * @default false
   */
  editorConfig?: boolean;
  /**
   * **Report Statistics**
   *
   * Whether or not Æsthetic should track stats. When disabled, Æsthetic will
   * skip reporting on formatting execution timing of beautification / parse operations.
   *
   * @default true
   */
  reportStats?: boolean;
  /**
   * **Throw Errors**
   *
   * Whether or not Æsthetic should throw exceptions when encountering a
   * parse error. When disabled (`false`) then errors will fail quitely.
   * Use the `esthetic.on('error', (e) => {})` event or check the `esthetic.error`
   * to take control of parse errors when this is disabled.
   *
   * @default true
   */
  throwErrors?: boolean;
  /**
   * **Persist Rules**
   *
   * Whether or not Æsthetic should persist defined rules. By default, Æsthetic
   * maintains a persisted reference of formatting rules. Setting this to `false`
   * will result in Æsthetic merging rules with defaults (or `preset`) each time
   * the `esthetic.format()`, `esthetic.parse()` or `eshetic.rules()` is invoked.
   *
   * @default true
   */
  persistRules?: boolean;
  /**
   * **Log Level**
   *
   * Control the log level when using the CLI. The following levels are available:
   *
   * - `1` - Disables logs, only parse errors will show.
   * - `2` - Standard logs, this is the default. Operations, errors and warnings.
   * - `3` - Detailed logs, various information is printed throught the cycle.
   *
   * @default 2
   */
  logLevel?: 1 | 2 | 3;
  /**
   * **Log Colors**
   *
   * By default, operations which invole printing to console, such are errors will
   * apply ansi coloring. Set this to `false` to prevent highlights being applied.
   *
   * @default true
   */
  logColors?: boolean;
  /**
   * **Resolve Config**
   *
   * Use an external configuration approach for definind rules. Æsthetic supports
   * `package.json` files containing an `esthetic` key, an `.esthetic` or `.esthetic.json`
   * files. You can provide a uri reference to a specific file containing rules.
   *
   * @default 'package.json'
   */
  resolveConfig?: LiteralUnion<'package.json' | '.esthetic' | '.esthetic.json', string>
}

export interface IConfigInternal extends IConfig {
  /**
   * **Environment**
   *
   * Informs up the current execution environment Æsthetic is running.
   *
   * @default 'node'
   */
  env?: 'node' | 'browser';
  /**
   * **CWD**
   *
   * Reference to the current working directory path location. This will
   * be `null` when executing in `browser` environments.
   *
   * @default 'node'
   */
  cwd?: string;
  /**
   * **Version**
   *
   * The Æsthetic version
   *
   * @default 'node'
   */
  version?: string;
  /**
   * **Last Update**
   *
   * The last known update applied to Æsthetic. Relates to the version
   *
   * @default 'node'
   */
  lastUpdate?: string;
}
