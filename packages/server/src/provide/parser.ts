// @ts-ignore

import { LiquidParser, IEngine } from '@liquify/liquid-parser';

/**
 * Liquid Parser
 */
export const Parser = new LiquidParser(
  {
    engine: IEngine.shopify,
    context: false,
    frontmatter: false,
    whitespace: false,
    persist: true,
    comments: true,
    linting: {},
    newlines: false,
    strict: true,
    variables: true,
    associate_tags: []
  }
);
