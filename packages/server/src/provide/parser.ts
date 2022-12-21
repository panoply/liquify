import { LiquidParser, Engine } from '@liquify/liquid-parser';

/**
 * Liquid Parser
 */
export const Parser = new LiquidParser(
  {
    engine: Engine.shopify,
    persist: true,
    html: true,
    strict: true,
    frontmatter: true,
    comments: true,
    variables: true,
    linting: {},
    associates: {}
  }
);
