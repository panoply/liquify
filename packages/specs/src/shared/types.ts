export { IEngine } from '../liquid/types/common';

export const enum Tokens {
  HTMLTag = 1,
  HTMLAttribute,
  HTMLValue,
  LiquidEmbedded,
  LiquidTag,
  LiquidOutput,
  LiquidObject,
  LiquidProperty,
  LiquidFilter,
  LiquidParameter,
  LiquidArgument
}
