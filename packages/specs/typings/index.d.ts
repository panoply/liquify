import { Variation } from './@types/variation';
export * from './@types/variation';
export * from './@types/filters';
export * from './@types/tags';
export * from './@types/objects';

export interface Options {
  variation: 'standard' | 'shopify' | 'jekyll' | 'eleventy';
  license?: string;
}

export default function specs(options: Options): Variation;

export as namespace Specs;

/**
     * Finds an argument by a value, property of by index.
     */
export const find = (value: string | number = prev() as string | number):
      IArguments |
      boolean |
      string |
      number => {

  if (!cursor.argument) return false;

  const args = cursor.filter || cursor.tag;
  const arrs = Array.isArray(args.arguments);

  if (args.arguments?.[value]) return args.arguments[value];

  if (arrs) {

    let arg = index;

    while (arg--) {
      if (args.arguments[arg]?.value === value as string) return args.arguments[arg];

      if (Array.isArray(args.arguments[arg]?.value)) {
        for (const item of args.arguments[arg]?.value) {
          if (item === value || item.value === value) return args.arguments[arg];
        }
      }
    }
  }

  for (const trace of tracer) {
    if (args.arguments[trace].value === value) return args.arguments[trace];
    if (Array.isArray(args.arguments[trace]?.value)) {
      for (const item of args.arguments[trace]?.value) {
        if (item === value || item.value === value) return args.arguments[trace];
      }
    }
  }

  return false;

};
