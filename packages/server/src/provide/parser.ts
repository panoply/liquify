import { LiquidParser } from '@liquify/liquid-parser';
import { Engine } from '@liquify/specs'

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
    associates: {}
  }
);
