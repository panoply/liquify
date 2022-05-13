import { LiquidParser } from '@liquify/liquid-parser';
import { IEngine } from '@liquify/liquid-language-specs';

/**
 * Liquid Parser
 */
export const Parser = new LiquidParser(
  {
    engine: IEngine.shopify,
    frontmatter: false,
    whitespace: false,
    persist: true,
    comments: true,
    linting: {},
    newlines: false,
    strict: false,
    variables: true,
    associate_tags: []
  }
);
