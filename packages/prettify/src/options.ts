import { IMarkupOptions } from './types/markup'
import { IStyleOptions } from './types/style'
import { IJSONOptions } from './types/json'

interface IGlobalOptions {
  markup: IMarkupOptions,
  style: IStyleOptions,
  json: IJSONOptions
}


interface IPrettify {


  /**
   * Updates formatting options
   */
  rules(options: IGlobalOptions): void
  /**
   * Executes Markup beautification
   *
   * **Support Languages:**
   *
   * - HTML
   * - Liquid
   * - HTML + Liquid
   */
  markup(input: string): Promise<string>

  /**
   * Executes Style beautification
   *
   * **Support Languages:**
   *
   * - CSS
   * - CSS + Liquid
   * - SCSS
   * - SCSS + Liquid
   * - LESS
   * - LESS +  Liquid
   */
  style(input: string): Promise<string>

  /**
   * Executes Script beautification
   *
   * **Support Languages:**
   *
   * - JavaScript
   * - JavaScript + Liquid
   * - JSX
   * - JSX + Liquid
   * - TypeScript
   * - TypeScript +  Liquid
   */
  // script(input: string): Promise<string>

  /**
   * Executes JSON beautification
   *
   * **Support Languages:**
   *
   * - JSON
   */
  json(input: string): Promise<string>

  /**
   * Executes Script beautification
   *
   * **Support Languages:**
   *
   * - YAML
   * - YAML + Frontmatter
   */
  // yaml(input: string): Promise<string>

  /**
   * Executes JSON beautification
   *
   * **Support Languages:**
   *
   * - Markdown
   * - Markdown + Liquid
   */
  // markdown(input: string): Promise<string>

}

export {
  IPrettify,
  IGlobalOptions,
  IJSONOptions,
  IMarkupOptions,
  IStyleOptions
}
