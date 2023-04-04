import { ParseHook } from './parse/parser';

export declare interface Hooks<T> {
  /**
   * Parse Hook
   *
   * Hook into the parse cycle of Æsthetic and optionally augment
   * records before insertion into the data structure. The hook will
   * be invoked for every token insertion.
   *
   * **Advanced Usage**
   *
   * Hooks are for advanced usage of Æsthetic.
   */
  (name: 'parse', callback: ParseHook): T;

}
