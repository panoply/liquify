import { Variation } from './@types/variation'
export * from './@types/variation'
export * from './@types/filters'
export * from './@types/tags'
export * from './@types/objects'

export interface Options {
  variation: "standard" | "shopify" | "jekyll" | "eleventy";
  license?: string;
}

export default function specs(options: Options): Variation;

export as namespace Specs;
