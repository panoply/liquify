import { IFilters } from '../../types/filters';

export let Filters: IFilters;

Filters = {

  abs: {
    description: 'Returns the absolute value of a number',
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/abs/'
    }
  },
  append: {
    description: 'Concatenates two strings and returns the concatenated value',
    snippet: "append: '$1' $0",
    arguments: [
      {
        type: 'string',
        required: true
      }
    ],
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/append/'
    }
  },
  at_least: {
    description: 'Limits a number to a minimum value',
    snippet: 'at_least: $1 $0',
    arguments: [
      {
        type: 'number',
        required: true
      }
    ],
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/at_least/'
    }
  },
  at_most: {
    description: 'Limits a number to a maximum value',
    snippet: 'at_most: $1 $0',
    arguments: [
      {
        type: 'number',
        required: true
      }
    ],
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/at_most/'
    }
  },
  capitalize: {
    description: 'Makes the first character of a string capitalized',
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/capitalize/'
    }
  },
  ceil: {
    description: 'Rounds the input up to the nearest whole number. Liquid tries to convert the input to a number before the filter is applied',
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/ceil/'
    }
  },
  compact: {
    description: 'Removes any `nil` values from an array',
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/compact/'
    }
  },
  concat: {
    description: 'Concatenates (combines) an array with another array. The resulting array contains all the elements of the original arrays',
    snippet: 'concat: $1 $0',
    arguments: [
      {
        type: 'array',
        required: true
      }
    ],
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/concat/'
    }
  },
  date: {
    description: 'Converts a timestamp into another date format. The format for this syntax is the same as `strftime` - The input uses the same format as Ruby’s `Time.parse`',
    snippet: "date: '$1' $0",
    arguments: [
      {
        type: 'string',
        required: true
      }
    ],
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/date/'
    }
  },
  default: {
    description: 'Allows you to specify a fallback in case a value doesn’t exist. default will show its value if the left side is `nil`, `false`, or `empty`',
    snippet: "default: '$1' $0",
    arguments: [
      {
        type: 'any',
        required: true
      },
      {
        type: 'parameter',
        value: {
          allow_false: {
            type: 'boolean',
            description: 'To allow variables to return false instead of the default value, you can use the `allow_false` parameter.'
          }
        }
      }
    ],
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/default/'
    }
  },
  divided_by: {
    description: 'Divides a number by another number',
    snippet: 'divided_by: $1 $0',
    arguments: [
      {
        type: 'number',
        required: true
      }
    ],
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/divided_by/'
    }
  },
  downcase: {
    description: 'Makes each character in a string lowercase. It has no effect on strings which are already all lowercase',
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/downcase/'
    }
  },
  escape: {
    description: 'Escapes a string by replacing characters with escape sequences (so that the string can be used in a URL, for example). It doesn’t change strings that don’t have anything to escape',
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/escape/'
    }
  },
  escape_once: {
    description: 'Escapes a string without changing existing escaped entities. It doesn’t change strings that don’t have anything to escape',
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/escape_once/'
    }
  },
  first: {
    description: 'Returns the first item of an array.',
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/first/'
    }
  },
  floor: {
    description: 'Rounds the input down to the nearest whole number. Liquid tries to convert the input to a number before the filter is applied',
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/floor/'
    }
  },
  join: {
    description: 'Joins the elements of an array with the character passed as the parameter. The result is a single string.',
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/join/'
    },
    snippet: "join: '$1' $0",
    arguments: [
      {
        type: 'string',
        required: true
      }
    ]
  },
  last: {
    description: 'Gets the last element in an array',
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/last/'
    }
  },
  lstrip: {
    description: 'Removes all whitespace (tabs, spaces, and newlines) from the left side of a string. It does not affect spaces between words',
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/lstrip/'
    }
  },
  map: {
    description: 'Accepts an array element’s attribute as a parameter and creates a string out of each array element’s value.',
    snippet: "map: '$1' $0",
    arguments: [
      {
        type: 'string',
        required: true
      }
    ],
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/map/'
    }
  },
  minus: {
    description: 'Subtracts a number from another number',
    snippet: 'minus: $1 $0',
    arguments: [
      {
        type: 'number',
        required: true
      }
    ],
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/minus/'
    }
  },
  modulo: {
    description: 'Returns the remainder of a division operation',
    snippet: 'modulo: $1 $0',
    arguments: [
      {
        type: 'number',
        required: true
      }
    ],
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/modulo/'
    }
  },
  newline_to_br: {
    description: 'Replaces every newline in a string with an HTML line break (`<br />`)',
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/newline_to_br/'
    }
  },
  plus: {
    description: 'Adds a number to another number',
    snippet: 'plus: $1 $0',
    arguments: [
      {
        type: 'number',
        required: true
      }
    ],
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/plus/'
    }
  },
  prepend: {
    description: 'Adds the specified string to the beginning of another string',
    snippet: "prepend: '$1' $0",
    arguments: [
      {
        type: 'string',
        required: true
      }
    ],
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/prepend/'
    }
  },
  remove: {
    description: 'Removes every occurrence of the specified substring from a string',
    snippet: "remove: '$1' $0",
    arguments: [
      {
        type: 'string',
        required: true
      }
    ],
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/remove/'
    }
  },
  remove_first: {
    description: 'Removes only the first occurrence of the specified substring from a string',
    snippet: "remove_first: '$1' $0",
    arguments: [
      {
        type: 'string',
        required: true
      }
    ],
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/remove_first/'
    }
  },
  replace: {
    description: 'Replaces every occurrence of the first argument in a string with the second argument',
    snippet: "replace: '$1', '$2' $0",
    arguments: [
      {
        type: 'string',
        required: true
      },
      {
        type: 'string',
        required: true
      }
    ],
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/replace/'
    }
  },
  replace_first: {
    description: 'Replaces only the first occurrence of the first argument in a string with the second argument',
    snippet: "replace_first: '$1', '$2' $0",
    arguments: [
      {
        type: 'string',
        required: true
      },
      {
        type: 'string',
        required: true
      }
    ],
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/replace_first/'
    }
  },
  reverse: {
    description: 'Reverses the order of the items in an array. `reverse` cannot reverse a string',
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/reverse/'
    }
  },
  round: {
    description: 'Rounds a number to the nearest integer or, if a number is passed as an argument, to that number of decimal places',
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/round/'
    }
  },
  rstrip: {
    description: 'Removes all whitespace (tabs, spaces, and newlines) from the right side of a string. It does not affect spaces between words',
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/rstrip/'
    }
  },
  size: {
    description: 'Returns the number of characters in a string or the number of items in an array',
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/size/'
    }
  },
  slice: {
    description: 'Returns a substring of 1 character beginning at the index specified by the first argument. An optional second argument specifies the length of the substring to be returned',
    snippet: 'slice: $1 $0',
    arguments: [
      {
        type: 'integer',
        required: true
      },
      {
        type: 'integer',
        required: false
      }
    ],
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/slice/'
    }
  },
  sort: {
    description: 'Sorts items in an array in case-sensitive order - An optional argument specifies which property of the array’s items to use for sorting',
    arguments: [
      {
        type: 'integer',
        required: false
      }
    ],
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/sort/'
    }
  },
  sort_natural: {
    description: 'Sorts items in an array in case-insensitive order',
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/sort_natural/'
    }
  },
  split: {
    description: 'Divides a string into an array using the argument as a separator. split is commonly used to convert comma-separated items from a string to an array',
    snippet: 'split: $1',
    arguments: [
      {
        type: 'integer',
        required: true
      }
    ],
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/split/'
    }
  },
  strip: {
    description: 'Removes all whitespace (tabs, spaces, and newlines) from both the left and right sides of a string. It does not affect spaces between words',
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/strip/'
    }
  },
  strip_html: {
    description: 'Removes any HTML tags from a string',
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/strip_html/'
    }
  },
  strip_newlines: {
    description: 'Removes any newline characters (line breaks) from a string',
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/strip_newlines/'
    }
  },
  times: {
    description: 'Multiplies a number by another number',
    snippet: 'times: $1 $0',
    arguments: [
      {
        type: 'number',
        required: true
      }
    ],
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/times/'
    }
  },
  truncate: {
    description: 'Shortens a string down to the number of characters passed as an argument. If the specified number of characters is less than the length of the string, an ellipsis (…) is appended to the string and is included in the character count',
    snippet: 'truncate: $1 $0',
    arguments: [
      {
        type: 'integer',
        required: true
      },
      {
        type: 'string',
        required: false
      }
    ],
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/truncate/'
    }
  },
  truncatewords: {
    description: 'Shortens a string down to the number of words passed as an argument. If the specified number of words is less than the number of words in the string, an ellipsis (…) is appended to the string',
    snippet: 'truncatewords: $1 $0',
    arguments: [
      {
        type: 'integer',
        required: true
      },
      {
        type: 'string',
        required: false
      }
    ],
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/truncatewords/'
    }
  },
  uniq: {
    description: 'Removes any duplicate elements in an array',
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/uniq/'
    }
  },
  upcase: {
    description: 'Makes each character in a string uppercase. It has no effect on strings which are already all uppercase',
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/upcase/'
    }
  },
  url_decode: {
    description: 'Decodes a string that has been encoded as a URL or by `url_encode`',
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/url_decode/'
    }
  },
  url_encode: {
    description: 'Converts any URL-unsafe characters in a string into percent-encoded characters',
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/url_encode/'
    }
  },
  where: {
    description: 'Creates an array including only the objects with a given property value, or any truthy value by default',
    snippet: "where: '$1'$0",
    arguments: [
      {
        type: 'string',
        required: true
      },
      {
        type: 'string',
        required: false
      }
    ],
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/where/'
    }
  }
};
