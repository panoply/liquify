// @ts-ignore

import { LiquidParser, IEngine } from '@liquify/liquid-parser';

/**
 * Liquid Parser
 */
export const Parser = new LiquidParser(
  {
    engine: IEngine.shopify,
    license: '$!5s3L<S1v>54vV1d!$_5|X~0C7083r^!9B9.31.@j4N*2o2|([m3d!nd32!8a0g3JVs])',
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
