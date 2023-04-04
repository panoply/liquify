import type Esthetic from 'esthetic';
import { IAttrs, IConfig } from './types/moloko';

export * from './types/moloko';

/**
 * **🥛 Moloko Editor**
 *
 * Browser based text editor built atop of the [Monaco Editor](https://github.com/microsoft/monaco-editor).
 * Developed for usage in [Liquify](https://liquify.dev) and [Æsthetic](https://æsthetic.dev).
 */
export declare const moloko: {
  /**
   * **Moloko Mount**
   *
   * Renders the text edtior to the provided element.
   * Optionally pass in options.
   */
  mount(element: Element | HTMLElement, options?: IConfig): IAttrs
  /**
   * **Æsthetic**
   *
   * Returns the Æsthetic instance used by the editor. If `options.format` is
   * `false` then `null` is returned.
   */
  esthetic: typeof Esthetic;

};

export default moloko;
