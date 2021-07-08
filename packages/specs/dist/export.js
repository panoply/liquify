'use strict';

const filters = {
    abs: {
        description: 'Returns the absolute value of a number',
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/abs/'
            }
        ]
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
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/append/'
            }
        ]
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
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/at_least/'
            }
        ]
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
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/at_most/'
            }
        ]
    },
    capitalize: {
        description: 'Makes the first character of a string capitalized',
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/capitalize/'
            }
        ]
    },
    ceil: {
        description: 'Rounds the input up to the nearest whole number. Liquid tries to convert the input to a number before the filter is applied',
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/ceil/'
            }
        ]
    },
    compact: {
        description: 'Removes any `nil` values from an array',
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/compact/'
            }
        ]
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
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/concat/'
            }
        ]
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
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/date/'
            }
        ]
    },
    default: {
        description: {
            kind: 'markdown',
            value: 'Allows you to specify a fallback in case a value doesn’t exist. default will show its value if the left side is `nil`, `false`, or `empty`'
        },
        snippet: "default: '$1' $0",
        arguments: [
            {
                type: 'any',
                required: true
            },
            {
                type: 'parameter',
                value: 'allow_false',
                required: false,
                description: 'To allow variables to return false instead of the default value, you can use the `allow_false` parameter.',
                accepts: 'boolean'
            }
        ],
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/default/'
            }
        ]
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
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/divided_by/'
            }
        ]
    },
    downcase: {
        description: 'Makes each character in a string lowercase. It has no effect on strings which are already all lowercase',
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/downcase/'
            }
        ]
    },
    escape: {
        description: 'Escapes a string by replacing characters with escape sequences (so that the string can be used in a URL, for example). It doesn’t change strings that don’t have anything to escape',
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/escape/'
            }
        ]
    },
    escape_once: {
        description: 'Escapes a string without changing existing escaped entities. It doesn’t change strings that don’t have anything to escape',
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/escape_once/'
            }
        ]
    },
    first: {
        description: 'Returns the first item of an array.',
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/first/'
            }
        ]
    },
    floor: {
        description: 'Rounds the input down to the nearest whole number. Liquid tries to convert the input to a number before the filter is applied',
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/floor/'
            }
        ]
    },
    join: {
        description: 'Joins the elements of an array with the character passed as the parameter. The result is a single string.',
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/join/'
            }
        ],
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
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/last/'
            }
        ]
    },
    lstrip: {
        description: 'Removes all whitespace (tabs, spaces, and newlines) from the left side of a string. It does not affect spaces between words',
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/lstrip/'
            }
        ]
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
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/map/'
            }
        ]
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
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/minus/'
            }
        ]
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
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/modulo/'
            }
        ]
    },
    newline_to_br: {
        description: 'Replaces every newline in a string with an HTML line break (`<br />`)',
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/newline_to_br/'
            }
        ]
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
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/plus/'
            }
        ]
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
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/prepend/'
            }
        ]
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
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/remove/'
            }
        ]
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
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/remove_first/'
            }
        ]
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
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/replace/'
            }
        ]
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
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/replace_first/'
            }
        ]
    },
    reverse: {
        description: 'Reverses the order of the items in an array. `reverse` cannot reverse a string',
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/reverse/'
            }
        ]
    },
    round: {
        description: 'Rounds a number to the nearest integer or, if a number is passed as an argument, to that number of decimal places',
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/round/'
            }
        ]
    },
    rstrip: {
        description: 'Removes all whitespace (tabs, spaces, and newlines) from the right side of a string. It does not affect spaces between words',
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/rstrip/'
            }
        ]
    },
    size: {
        description: 'Returns the number of characters in a string or the number of items in an array',
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/size/'
            }
        ]
    },
    slice: {
        description: 'Returns a substring of 1 character beginning at the index specified by the first argument. An optional second argument specifies the length of the substring to be returned',
        snippet: 'slice: $1 $0',
        arguments: [
            {
                type: 'number',
                required: true
            },
            {
                type: 'number',
                required: false
            }
        ],
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/slice/'
            }
        ]
    },
    sort: {
        description: 'Sorts items in an array in case-sensitive order - An optional argument specifies which property of the array’s items to use for sorting',
        arguments: [
            {
                type: 'number',
                required: false
            }
        ],
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/sort/'
            }
        ]
    },
    sort_natural: {
        description: 'Sorts items in an array in case-insensitive order',
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/sort_natural/'
            }
        ]
    },
    split: {
        description: 'Divides a string into an array using the argument as a separator. split is commonly used to convert comma-separated items from a string to an array',
        snippet: 'split: $1',
        arguments: [
            {
                type: 'number',
                required: true
            }
        ],
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/split/'
            }
        ]
    },
    strip: {
        description: 'Removes all whitespace (tabs, spaces, and newlines) from both the left and right sides of a string. It does not affect spaces between words',
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/strip/'
            }
        ]
    },
    strip_html: {
        description: 'Removes any HTML tags from a string',
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/strip_html/'
            }
        ]
    },
    strip_newlines: {
        description: 'Removes any newline characters (line breaks) from a string',
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/strip_newlines/'
            }
        ]
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
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/times/'
            }
        ]
    },
    truncate: {
        description: 'Shortens a string down to the number of characters passed as an argument. If the specified number of characters is less than the length of the string, an ellipsis (…) is appended to the string and is included in the character count',
        snippet: 'truncate: $1 $0',
        arguments: [
            {
                type: 'number',
                required: true
            },
            {
                type: 'string',
                required: false
            }
        ],
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/truncate/'
            }
        ]
    },
    truncatewords: {
        description: 'Shortens a string down to the number of words passed as an argument. If the specified number of words is less than the number of words in the string, an ellipsis (…) is appended to the string',
        snippet: 'truncatewords: $1 $0',
        arguments: [
            {
                type: 'number',
                required: true
            },
            {
                type: 'string',
                required: false
            }
        ],
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/truncatewords/'
            }
        ]
    },
    uniq: {
        description: 'Removes any duplicate elements in an array',
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/uniq/'
            }
        ]
    },
    upcase: {
        description: 'Makes each character in a string uppercase. It has no effect on strings which are already all uppercase',
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/upcase/'
            }
        ]
    },
    url_decode: {
        description: 'Decodes a string that has been encoded as a URL or by `url_encode`',
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/url_decode/'
            }
        ]
    },
    url_encode: {
        description: 'Converts any URL-unsafe characters in a string into percent-encoded characters',
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/url_encode/'
            }
        ]
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
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/filters/where/'
            }
        ]
    }
};

const Tags$1 = {
    assign: {
        type: 'variable',
        description: 'Creates a new variable.',
        snippet: '$1 = $2',
        filters: true,
        singular: true,
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/tags/variable/#assign'
            }
        ]
    },
    break: {
        type: 'iteration',
        singular: true,
        parents: [
            'for',
            'tablerow'
        ],
        description: 'Causes the loop to stop iterating when it encounters the break tag.',
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/tags/iteration/#break'
            }
        ]
    },
    capture: {
        type: 'variable',
        filters: false,
        description: 'Captures the string inside of the opening and closing tags and assigns it to a variable. Variables created through `{% capture %}` are strings.',
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/tags/variable/#capture'
            }
        ]
    },
    case: {
        type: 'control',
        description: 'Creates a switch statement to compare a variable with different values. case initializes the switch statement, and when compares its values.',
        children: ['when', 'else'],
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/tags/control-flow/#case'
            }
        ]
    },
    comment: {
        type: 'comment',
        description: 'Allows you to leave un-rendered code inside a Liquid template. Any text within the opening and closing comment blocks will not be output, and any Liquid code within will not be executed.',
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/tags/comment/'
            }
        ]
    },
    continue: {
        type: 'iteration',
        description: 'Causes the loop to skip the current iteration when it encounters the continue tag.',
        singular: true,
        parents: [
            'for',
            'tablerow'
        ],
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/tags/iteration/#continue'
            }
        ]
    },
    cycle: {
        type: 'iteration',
        singular: true,
        description: 'Loops through a group of strings and outputs them in the order that they were passed as parameters. Each time cycle is called, the next string that was passed as a parameter is output.',
        parents: ['for', 'tablerow'],
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/tags/iteration/#cycle'
            }
        ]
    },
    decrement: {
        description: 'Creates a new number variable, and decreases its value by one every time it is called. The initial value is -1.',
        singular: true,
        filters: false,
        type: 'variable',
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/tags/variable/#decrement'
            }
        ]
    },
    else: {
        type: 'control',
        description: 'Add condition within an if or unless block.',
        singular: true,
        parents: [
            'if',
            'elsif',
            'case',
            'unless',
            'when',
            'for'
        ],
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/tags/control-flow/#unless'
            }
        ]
    },
    elsif: {
        description: 'Adds more conditions within an if or unless block.',
        singular: true,
        type: 'control',
        parents: ['if'],
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/tags/control-flow/#unless'
            }
        ]
    },
    for: {
        description: 'Repeatedly executes a block of code.',
        type: 'iteration',
        snippet: '$1 in $2',
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/tags/iteration/#for'
            }
        ],
        parameters: {
            offset: {
                description: 'Begins the loop at the specified index',
                accepts: 'number'
            },
            limit: {
                description: 'Limits the loop to the specified number of iterations',
                accepts: 'number'
            },
            reversed: {
                keyword: true,
                description: 'Reverses the order of the loop. Note that this flag’s spelling is different from the filter reverse'
            }
        }
    },
    if: {
        description: 'Executes a block of code only if a certain condition is met.',
        type: 'control',
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/tags/control-flow/#if'
            }
        ]
    },
    increment: {
        description: 'Creates a new number variable, and increases its value by one every time it is called. The initial value is 0.',
        singular: true,
        filters: false,
        type: 'variable',
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/tags/variable/#increment'
            }
        ]
    },
    raw: {
        type: 'raw',
        description: 'Allows output of Liquid code on a page without being parsed.',
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/tags/raw/'
            }
        ]
    },
    render: {
        description: 'Insert the rendered content of another template within the current template.\n\nThe code within the rendered template does not automatically have access to the variables assigned using variable tags within the parent template. Similarly, variables assigned within the rendered template cannot be accessed by code in any other template.',
        snippet: "'$1'",
        filters: false,
        singular: true,
        type: 'import',
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/tags/template/#render'
            }
        ]
    },
    tablerow: {
        description: 'Generates an HTML `<table>`. Must be wrapped in an opening `<table>` and closing `</table>` HTML tags.',
        type: 'iteration',
        parameters: {
            cols: {
                description: 'Defines how many columns the tables should have.',
                accepts: 'number'
            },
            limit: {
                description: 'Exits the tablerow loop after a specific index.',
                accepts: 'number'
            },
            offset: {
                description: 'Starts the tablerow loop after a specific index.',
                accepts: 'number'
            }
        },
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/tags/iteration/#tablerow'
            }
        ]
    },
    unless: {
        description: 'The opposite of if – executes a block of code only if a certain condition is not met.',
        type: 'control',
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/tags/control-flow/#unless'
            }
        ]
    },
    when: {
        description: 'Define the various conditions set by the "{% case %}" tag',
        singular: true,
        type: 'control',
        parents: ['case'],
        references: [
            {
                name: 'Standard Liquid',
                url: 'https://shopify.github.io/liquid/tags/control-flow/#casewhen'
            }
        ]
    }
};

exports.standard = void 0;
(function (standard) {
    standard.filters = filters;
    standard.tags = Tags$1;
})(exports.standard || (exports.standard = {}));

const Filters = {
    asset_img_url: {
        description: {
            kind: 'markdown',
            value: 'Returns the asset URL of an image in the `/assets` folder of a theme. asset_img_url accepts an image size parameter.\n\nYou can specify only a `width` or only a `height` and Shopify will calculate the other dimension based on the original image size, keeping the original image\'s aspect ratio.'
        },
        arguments: [
            {
                value: 'master',
                type: 'string',
                description: 'The original image size',
                required: false
            },
            {
                value: 'crop',
                type: 'parameter',
                required: false,
                description: {
                    kind: 'markdown',
                    value: 'You can specify a crop parameter to make sure that the resulting image\'s dimensions match the requested dimensions. If the entire image won\'t fit in your requested dimensions, the crop parameter specifies what part of the image to show'
                },
                accepts: [
                    {
                        value: 'top',
                        type: 'string'
                    },
                    {
                        value: 'center',
                        type: 'string'
                    },
                    {
                        value: 'bottom',
                        type: 'string'
                    },
                    {
                        value: 'left',
                        type: 'string'
                    },
                    {
                        value: 'right',
                        type: 'string'
                    }
                ]
            },
            {
                type: 'parameter',
                value: 'scale',
                description: 'The scale parameter lets you specify the pixel density of the image',
                accepts: [
                    {
                        value: '2',
                        type: 'string'
                    },
                    {
                        value: '3',
                        type: 'string'
                    }
                ]
            },
            {
                type: 'parameter',
                value: 'format',
                description: 'The format parameter lets you specify what file format to use for the displayed image.',
                accepts: [
                    {
                        value: 'jpg',
                        type: 'string'
                    },
                    {
                        value: 'pjpg',
                        type: 'string',
                        description: 'pjpg is progressive JPEG. A browser loads a full-sized progressive JPEG with gradually increasing quality, instead of loading the full-quality image from top to bottom like a traditional JPEG.'
                    }
                ]
            }
        ],
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/themes/liquid/filters/url-filters#asset_img_url'
            }
        ]
    },
    asset_url: {
        description: 'Returns the URL of a file in the "assets" folder of a theme.',
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/themes/liquid/filters/url-filters#asset_url'
            }
        ]
    },
    currency_selector: {
        description: 'Generates a drop-down list that customers can use to select an accepted currency on your storefront. This filter must be used on the form object within a currency form',
        snippet: 'class: $1, id: $2',
        scope: ['form'],
        deprecated: true
    },
    customer_login_link: {
        description: 'Generates a link to the customer login page.',
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/themes/liquid/filters/url-filters#customer_login_link'
            }
        ]
    },
    file_img_url: {
        description: 'Returns the URL of an image in the Files page of the admin. file_img_url accepts an image size parameter.',
        snippet: '${1|file_img_url|file_img_url: ${2}}',
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/themes/liquid/filters/url-filters#file_img_url'
            }
        ]
    },
    file_url: {
        description: 'Returns the URL of a file in the Files page of the admin.',
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/themes/liquid/filters/url-filters#file_url'
            }
        ]
    },
    font_face: {
        description: 'Returns a CSS @font-face declaration to load the chosen font',
        arguments: [
            {
                type: 'parameter',
                value: 'font_display',
                description: 'The font-display descriptor determines how a font face is displayed based on whether and when it is downloaded and ready to use',
                accepts: [
                    {
                        type: 'string',
                        value: 'auto',
                        description: 'The font display strategy is defined by the user agent.'
                    },
                    {
                        type: 'string',
                        value: 'block',
                        description: 'Gives the font face a short block period and an infinite swap period.'
                    },
                    {
                        type: 'string',
                        value: 'swap',
                        description: 'Gives the font face an extremely small block period and an infinite swap period.'
                    },
                    {
                        type: 'string',
                        value: 'fallback',
                        description: 'Gives the font face an extremely small block period and a short swap period.'
                    },
                    {
                        type: 'string',
                        value: 'optional',
                        description: 'Gives the font face an extremely small block period and no swap period.'
                    }
                ]
            }
        ],
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/en/themes/liquid/filters/font-filters#font_face'
            }
        ]
    },
    font_modify: {
        description: 'font_modify takes two arguments. The first indicates which property should be modified and the second is the modification to be made.',
        snippet: "font_modify:  '${1|normal,italic,oblique|}', '${2|100,200,300,400,500,600,700,800,900,lighter,normal,bold,bolder|}'",
        arguments: [
            {
                type: 'string',
                required: true,
                value: [
                    {
                        value: 'style'
                    },
                    {
                        value: 'weight'
                    }
                ]
            },
            {
                type: 'string',
                required: true
            }
        ],
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/en/themes/liquid/filters/font-filters#font_face'
            }
        ]
    },
    font_url: {
        description: 'Returns a CDN URL for the chosen font. By default, font_url returns the woff2 version, but it can also be called with an additional parameter to specify the format. Both woff and woff2 are supported.',
        snippet: "${1|font_url|font_url: 'woff'}",
        arguments: [
            {
                type: 'string',
                required: false
            }
        ],
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/en/themes/liquid/filters/font-filters#font_face'
            }
        ]
    },
    global_asset_url: {
        description: 'Returns the URL of a global asset. Global assets are kept in a central directory on Shopify’s servers. Using global assets can improve the load times of your pages.',
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/themes/liquid/filters/url-filters#global_asset_url'
            }
        ]
    },
    img_tag: {
        description: 'Generates an image tag.',
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/themes/liquid/filters/html-filters#img_tag'
            }
        ]
    },
    img_url: {
        description: 'Returns the URL of an image. Accepts an image size as a parameter.',
        snippet: '${1|img_url|img_url: ${2}}',
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/themes/liquid/filters/url-filters#img_url'
            }
        ]
    },
    link_to: {
        description: 'Generates an HTML link. The first parameter is the URL of the link, and the optional second parameter is the title of the link.',
        snippet: "link_to: '${1:url}', '${2:title}'",
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
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/themes/liquid/filters/url-filters#link_to'
            }
        ]
    },
    link_to_add_tag: {
        description: 'Creates a link to all products in a collection that have a given tag as well as any tags that have been already selected.',
        snippet: 'link_to_add_tag: ${1}',
        arguments: [
            {
                type: 'string',
                required: true
            }
        ],
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/themes/liquid/filters/url-filters#link_to_add_tag'
            }
        ]
    },
    link_to_remove_tag: {
        description: 'Generates a link to all products in a collection that have the given tag and all the previous tags that might have been added already.',
        snippet: 'link_to_remove_tag: ${1}',
        arguments: [
            {
                type: 'string',
                required: true
            }
        ],
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/themes/liquid/filters/url-filters#link_to_remove_tag'
            }
        ]
    },
    link_to_tag: {
        description: 'Creates a link to all products in a collection that have a given tag.',
        snippet: 'link_to_tag: ${1}',
        arguments: [
            {
                type: 'string',
                required: true
            }
        ],
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/themes/liquid/filters/url-filters#link_to_tag'
            }
        ]
    },
    link_to_type: {
        description: 'Creates an HTML link to a collection page that lists all products belonging to a product type.',
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/themes/liquid/filters/url-filters#link_to_type'
            }
        ]
    },
    link_to_vendor: {
        description: 'Creates an HTML link to a collection page that lists all products belonging to a vendor.',
        snippet: 'link_to_vendor',
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/themes/liquid/filters/url-filters#link_to_vendor'
            }
        ]
    },
    money: {
        description: 'Formats the price based on the shop’s `HTML without currency` setting',
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/en/themes/liquid/filters/money-filters#money'
            }
        ]
    },
    money_with_currency: {
        description: 'Formats the price based on the shop’s `HTML with currency` setting.',
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/en/themes/liquid/filters/money-filters#money_with_currency'
            }
        ]
    },
    money_without_currency: {
        description: 'Formats the price using a decimal.',
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/en/themes/liquid/filters/money-filters#money_without_currency'
            }
        ]
    },
    money_without_trailing_zeros: {
        description: 'Formats the price based on the shop’s `HTML with currency` setting and excludes the decimal point and trailing zeros.',
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/en/themes/liquid/filters/money-filters#money_without_trailing_zeros'
            }
        ]
    },
    payment_button: {
        description: 'Creates a dynamic checkout button for a product. This filter must be used on the form object within a product form.',
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/themes/liquid/filters/html-filters#payment_button'
            }
        ]
    },
    payment_type_img_url: {
        description: 'Returns the URL of the payment type’s SVG image. Used in conjunction with the shop.enabled_payment_types variable.',
        snippet: 'link_to_remove_tag: ${1}',
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/themes/liquid/filters/url-filters#payment_type_img_url'
            }
        ]
    },
    payment_type_svg_tag: {
        description: 'Returns the `<svg>` tag of the requested payment type image for inlining purposes. Used in conjunction with the `shop.enabled_payment_types` variable.',
        snippet: 'class: ${1}',
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/themes/liquid/filters/html-filters#payment_button'
            }
        ]
    },
    script_tag: {
        description: 'Generates a script tag.',
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/themes/liquid/filters/html-filters#payment_button'
            }
        ]
    },
    shopify_asset_url: {
        description: 'Returns the URL of a global assets that are found on Shopify’s servers.',
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/themes/liquid/filters/url-filters#shopify_asset_url'
            }
        ]
    },
    sort_by: {
        description: 'Creates a URL to a collection page with the provided sort_by parameter. This filter must be applied to a collection URL.',
        snippet: 'sort_by: ${1}',
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/en/themes/liquid/filters/url-filters#sort_by'
            }
        ]
    },
    stylesheet_tag: {
        description: 'Generates a link tag that points to the given stylesheet.',
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/themes/liquid/filters/html-filters#payment_button'
            }
        ]
    },
    url_for_type: {
        description: 'Creates a URL that links to a collection page containing products with a specific product type.',
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/themes/liquid/filters/url-filters#url_for_type'
            }
        ]
    },
    url_for_vendor: {
        description: 'Creates a URL that links to a collection page containing products with a specific product vendor.',
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/themes/liquid/filters/url-filters#url_for_vendor'
            }
        ]
    },
    within: {
        description: 'Creates a collection-aware product URL by prepending /collections/collection-handle to a product URL, where collection-handle is the handle of the collection that is currently being viewed.',
        snippet: 'within: ${1}',
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/themes/liquid/filters/url-filters#within'
            }
        ]
    }
};

const Tags = {
    echo: {
        type: 'variable',
        description: 'Outputs an expression in the rendered HTML. This is identical to wrapping an expression in `{{` and `}}`, but works inside liquid tags. Filters are supported.',
        singular: true,
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/en/themes/liquid/tags/theme-tags#echo'
            }
        ]
    },
    form: {
        type: 'output',
        description: 'Creates an HTML `<form>` element along with the required `<input>` elements to submit the form to a particular endpoint.',
        arguments: [
            {
                type: 'string',
                value: 'activate_customer_password',
                template: 'customer/activate_account',
                description: 'Generates a form for activating a customer account on the activate_account.liquid template.'
            },
            {
                type: 'string',
                value: 'product',
                description: 'Generates a form for adding a product variant to the cart. Requires a "product" object as a parameter.',
                parameters: {
                    product: {
                        description: 'The `product` object is required when generating a form for adding a product variant to the cart',
                        keyword: true,
                        seperator: 'comma'
                    }
                }
            },
            {
                type: 'string',
                value: 'new_comment',
                template: 'article',
                description: 'Generates a form for creating a new comment in the article.liquid template. Requires the article object as a parameter.',
                parameters: {
                    article: {
                        description: 'The `article` object',
                        keyword: true,
                        seperator: 'comma'
                    }
                }
            },
            {
                description: 'Generates a form for creating a new customer account on the register.liquid template.',
                type: 'string',
                value: 'create_customer',
                template: 'customer/register'
            },
            {
                type: 'string',
                value: 'customer',
                description: "Generates a form for creating a new customer without registering a new account. This form is useful for collecting customer information when you don't want customers to log in to your store, such as building a list of emails from a newsletter signup."
            },
            {
                type: 'string',
                value: 'customer_address',
                description: 'Generates a form for creating or editing customer account addresses on the addresses.liquid template. When creating a new address, include the parameter customer.new_address. When editing an existing address, include the parameter address.',
                parameters: {
                    'customer.new_address': {
                        keyword: true,
                        description: 'The `customer.new_address` is required for creating a new address',
                        seperator: 'comma'
                    }
                }
            },
            {
                value: 'customer_login',
                description: 'Generates a form for logging into Customer Accounts on the login.liquid template.',
                type: 'string',
                template: 'customer/login'
            },
            {
                value: 'recover_customer_password',
                description: 'Generates a form for recovering a lost password on the login.liquid template.',
                type: 'string',
                template: 'customer/login'
            },
            {
                value: 'contact',
                description: 'Generates a form for submitting an email through the Liquid contact form',
                type: 'string'
            },
            {
                value: 'reset_customer_password',
                description: 'Generates a form on the customers/reset_password.liquid template for a customer to reset their password.',
                type: 'string',
                template: 'customer/login'
            },
            {
                value: 'guest_login',
                description: 'Generates a form on the login.liquid template that directs customers back to their checkout session as a guest instead of logging in to an account.',
                type: 'string',
                template: 'customer/login'
            },
            {
                value: 'storefront_password',
                description: 'Generates a form on the password.liquid template for entering a password-protected storefront.',
                type: 'string'
            },
            {
                value: 'currency',
                description: 'Generates a form that lets your customer change the currency in your storefront.',
                type: 'string'
            }
        ],
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://shopify.dev/docs/themes/liquid/reference/tags/theme-tags#form'
            }
        ]
    },
    include: {
        description: 'The include tag has been deprecated because the way that it handles variables reduces performance and makes theme code harder to both read and maintain.',
        filters: false,
        trims: false,
        deprecated: true,
        singular: true,
        type: 'import',
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/en/themes/liquid/tags/deprecated-tags#include'
            }
        ]
    },
    layout: {
        description: "Include \"{% layout 'alternate' %}\" at the beginning of a template file to use an alternate layout file from the Layout folder of your theme. If you don't define an alternate layout, the theme.liquid template file is used by default:",
        singular: true,
        type: 'import',
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/en/themes/liquid/tags/deprecated-tags#include'
            }
        ]
    },
    page_description: {
        type: 'object',
        description: 'Returns the description of a page set in its respective section in the admin',
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://shopify.dev/docs/themes/liquid/reference/objects/page-description'
            }
        ]
    },
    paginate: {
        description: 'Splitting products, blog articles, and search results across multiple pages is a necessary part of theme design as you are limited to 50 results per page in any for loop.',
        type: 'iteration',
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/en/themes/liquid/tags/deprecated-tags#include'
            }
        ]
    },
    section: {
        description: 'Renders a section from the sections folder of a theme.',
        filters: false,
        singular: true,
        type: 'import',
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/en/themes/development/sections#using-section-schema-tags'
            }
        ]
    },
    schema: {
        description: 'The javascript tag is used by Shopify sections. Each section can have a single schema tag, and schema tags must contain valid JSON. schema tags can be placed anywhere within a section file but cannot be nested inside another Liquid tag.  ',
        filters: false,
        language: 'json',
        type: 'embedded',
        trims: false,
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/en/themes/development/sections#using-section-schema-tags'
            }
        ]
    },
    style: {
        type: 'embedded',
        description: 'The Liquid style tag renders an HTML `<style>` tag with a Shopify data attribute.',
        filters: false,
        trims: false,
        language: 'css',
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/themes/liquid/tags/theme-tags#style'
            }
        ]
    },
    stylesheet: {
        type: 'embedded',
        description: 'The stylesheet tag is used by Shopify sections. Code is concatenated into a single file by Shopify and injected into `{{ content_for_header }}`.',
        filters: false,
        trims: false,
        deprecated: true,
        language: 'css',
        arguments: [
            {
                type: 'string',
                value: 'scss',
                description: 'SASS support is used by Shopify sections. Code is concatenated into a single file by Shopify and injected into `{{ content_for_header }}`.'
            }
        ],
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/en/themes/development/sections#javascript-and-stylesheet-tags'
            }
        ]
    },
    javascript: {
        type: 'embedded',
        description: 'The javascript tag is used by Shopify sections. Code is concatenated into a single file by Shopify and injected into `{{ content_for_header }}`.',
        filters: false,
        deprecated: true,
        trims: false,
        language: 'javascript',
        references: [
            {
                name: 'Shopify Liquid',
                url: 'https://help.shopify.com/en/themes/development/sections#javascript-and-stylesheet-tags'
            }
        ]
    }
};

const Objects = {
    additional_checkout_buttons: {
        description: "Returns true if a merchant's store has any payment providers with offsite checkouts, such as PayPal Express Checkout. Use additional_checkout_buttons to check whether these gateways exist, and content_for_additional_checkout_buttons to show the additional buttons.",
        const: true,
        global: true,
        type: 'boolean',
        link: 'https://help.shopify.com/en/themes/liquid/objects#additional-checkout-buttons'
    },
    address: {
        description: "The address object contains information entered by a customer in Shopify's checkout pages.",
        type: 'object',
        properties: {
            province_code: {
                description: 'Returns the abbreviated value of the Province/State field of the address.',
                type: 'string'
            },
            street: {
                description: 'Returns the combined values of the Address1 and Address2 fields of the address.',
                type: 'string'
            },
            url: {
                description: 'Returns the relative URL of the address.',
                type: 'string'
            },
            address1: {
                description: 'Returns the value of the Address1 field of the address.',
                type: 'string'
            },
            address2: {
                description: 'Returns the value of the Address2 field of the address.',
                type: 'string'
            },
            city: {
                description: 'Returns the value of the City field of the address.',
                type: 'string'
            },
            company: {
                description: 'Returns the value of the Company field of the address.',
                type: 'string'
            },
            country_code: {
                description: 'Returns the value of the Country field of the address in ISO 3166-2 standard format.',
                type: 'string'
            },
            country: {
                description: 'Returns the value of the Country field of the address.',
                type: 'string'
            },
            first_name: {
                description: 'Returns the value of the First Name field of the address.',
                type: 'string'
            },
            last_name: {
                description: 'Returns the value of the Last Name field of the address.',
                type: 'string'
            },
            phone: {
                description: 'Returns the value of the Phone field of the address.',
                type: 'string'
            },
            zip: {
                description: 'Returns the value of the Postal/Zip field of the address.',
                type: 'string'
            },
            province: {
                description: 'Returns the value of the Province/State field of the address.',
                type: 'string'
            },
            name: {
                description: 'Returns the values of the First Name and Last Name fields of the address.',
                type: 'string'
            }
        },
        link: 'https://help.shopify.com/en/themes/liquid/objects/address'
    },
    all_country_option_tags: {
        description: "The all_country_option_tags object creates an <option> tag for each country. An attribute called data-provinces is set for each <option>, and contains a JSON-encoded array of the country's subregions. If a country doesn't have any subregions, then an empty array is set for its data-provinces attribute.",
        filters: false,
        link: 'https://help.shopify.com/themes/liquid/objects#all_products',
        type: 'array'
    },
    all_products: {
        description: 'Returns a list of all the products in your store. You can use all_products to access products by their handles.',
        link: 'https://help.shopify.com/themes/liquid/objects#all_products',
        type: 'array'
    },
    article: {
        description: 'Returns a list of all the blog articles in a store.',
        type: 'object',
        properties: {
            tags: {
                description: 'Returns all the tags for the article.',
                type: 'array'
            },
            user: {
                description: "Returns an object with information about the article's author.",
                type: 'object',
                properties: {
                    bio: {
                        description: 'Returns the bio of the author of the article.',
                        type: 'string'
                    },
                    email: {
                        description: 'Returns the email of the author of the article.',
                        type: 'string'
                    },
                    first_name: {
                        description: 'Returns the first name of the author of the article.',
                        type: 'string'
                    },
                    homepage: {
                        description: 'Returns the home page of the article author.',
                        type: 'string'
                    },
                    image: {
                        description: 'Returns the image object of the author of the article.',
                        type: 'object',
                        properties: {
                            alt: {
                                description: "Returns the article image's alt text.",
                                type: 'string'
                            },
                            src: {
                                description: 'Returns the relative URL to the article image.',
                                type: 'string'
                            }
                        }
                    },
                    last_name: {
                        description: 'Returns the last name of the author of the article.',
                        type: 'string'
                    },
                    account_owner: {
                        description: 'Returns true if the author of the article is the account owner of the store. Returns false if the author is not the account owner.',
                        type: 'string'
                    }
                }
            },
            excerpt_or_content: {
                description: 'Returns article.excerpt of the article if it exists. Returns article.content if an excerpt does not exist for the article.',
                type: 'string'
            },
            image: {
                description: "Returns the article's image object.",
                type: 'object',
                properties: {
                    alt: {
                        description: "Returns the article image's alt text.",
                        type: 'string'
                    },
                    src: {
                        description: 'Returns the relative URL to the article image.',
                        type: 'string'
                    }
                }
            },
            content: {
                type: 'string',
                description: 'Returns the content of the article.'
            },
            excerpt: {
                type: 'string',
                description: 'Returns the excerpt of the article.'
            },
            author: {
                type: 'string',
                description: "Returns the full name of the article's author."
            },
            handle: {
                type: 'string',
                description: 'Returns the handle of the article.'
            },
            id: {
                type: 'integer',
                description: 'Returns the id of the article.'
            },
            comments_count: {
                type: 'integer',
                description: 'Returns the number of published comments for the article.'
            },
            comments: {
                type: 'array',
                description: 'Returns the published comments of the article. Returns an empty array if comments are disabled.'
            },
            url: {
                description: 'Returns the relative URL of the article.',
                type: 'string'
            },
            comment_post_url: {
                description: 'Returns the relative URL where POST requests are sent to when creating new comments.',
                type: 'string'
            },
            created_at: {
                description: 'Returns the timestamp of when the article was created. Use the date filter to format the timestamp.',
                type: 'string'
            },
            title: {
                description: 'Returns the title of the article.',
                type: 'string'
            },
            comments_enabled: {
                description: 'Returns true if comments are enabled. Returns false if comments are disabled.',
                type: 'boolean'
            },
            moderated: {
                description: 'Returns true if the blog that the article belongs to is set to moderate comments. Returns false if the blog is not moderated.',
                type: 'boolean'
            }
        },
        link: 'https://shopify.dev/docs/themes/liquid/reference/objects#articles'
    },
    block: {
        description: 'A block represents the content and settings of a single block in an array of section blocks. The block object can be accessed in a section file by looping through section.blocks.',
        type: 'object',
        properties: {
            shopify_attributes: {
                type: 'string',
                description: "Returns a string representing the block's attributes."
            },
            id: {
                type: 'integer',
                description: 'Returns a unique ID dynamically generated by Shopify.'
            },
            settings: {
                type: 'object',
                description: "Returns an object of the block settings set in the theme editor. Retrieve setting values by referencing the setting's unique id."
            },
            type: {
                type: 'string',
                description: "Returns the type defined in the block's schema. This is useful for displaying different markup based on the block.type."
            }
        },
        link: 'https://help.shopify.com/en/themes/liquid/objects/block'
    },
    blog: {
        description: 'Blog object',
        type: 'object',
        properties: {
            tags: {
                description: 'Returns all tags in a blog. Similar to all_tags, but only returns tags of articles that are in the filtered view.',
                type: 'array'
            },
            all_tags: {
                description: 'Returns all tags of all articles of a blog. This includes tags of articles that are not in the current pagination view.',
                type: 'array'
            },
            articles: {
                description: 'Returns an array of all articles in a blog.',
                type: 'array'
            },
            handle: {
                description: 'Returns the handle of the blog.',
                type: 'string'
            },
            id: {
                description: 'Returns the id of the blog.',
                type: 'integer'
            },
            next_article: {
                description: 'Returns the next (older) article. Returns nil if there is no next article.',
                type: 'string'
            },
            previous_article: {
                description: 'Returns the previous (newer) article. Returns nil if there is no next article.',
                type: 'string'
            },
            link: {
                description: 'Returns the relative URL of the blog.',
                type: 'string'
            },
            title: {
                description: 'Returns the title of the blog.',
                type: 'string'
            },
            articles_count: {
                description: 'Returns the total number of articles in a blog. This total does not include hidden articles.',
                type: 'integer'
            },
            comments_enabled: {
                description: 'Returns true if comments are enabled, or false if they are disabled.',
                type: 'boolean'
            },
            moderated: {
                description: 'Returns true if comments are moderated, or false if they are not moderated.',
                type: 'boolean'
            }
        },
        link: 'https://help.shopify.com/themes/liquid/objects#blogs'
    },
    canonical_url: {
        type: 'object',
        description: "Returns the canonical URL of the current page. A page's canonical URL is the page's default URL without any URL parameters. For products and variants, the canonical URL is the default product page with no collection or variant selected.",
        filters: false,
        link: 'https://help.shopify.com/themes/liquid/objects#canonical_url'
    },
    cart: {
        description: 'Cart object',
        type: 'object',
        properties: {
            attributes: {
                type: 'string',
                description: 'Cart attributes allow the capturing of more information on the cart page.'
            },
            items: {
                type: 'array',
                description: 'Returns all of the line items in the cart.'
            },
            cart_level_discount_applications: {
                type: 'array',
                description: 'Returns an array of any cart-specific discount applications for the cart.'
            },
            discount_applications: {
                description: 'Returns an array of discount applications for the cart.',
                type: 'array'
            },
            currency: {
                type: 'string',
                description: "Returns the currency of the cart. If your store uses multi-currency, then the cart.currency is the same as the customer's local (presentment) currency. Otherwise, the cart currency is the same as your store currency."
            },
            item_count: {
                description: 'Returns the number of items inside the cart.',
                type: 'integer'
            },
            original_total_price: {
                description: 'Returns the subtotal of the cart before any discounts have been applied.',
                type: 'integer'
            },
            items_subtotal_price: {
                description: "Returns the sum of the cart's line-item prices after any line-item discount. The subtotal doesn't include taxes (unless taxes are included in the prices), cart discounts, or shipping costs.",
                type: 'integer'
            },
            total_discount: {
                description: 'Returns the total of all discounts (the amount saved) for the cart.',
                type: 'integer'
            },
            total_price: {
                description: 'Returns the total price of all of the items in the cart after discounts have been applied.',
                type: 'integer'
            },
            total_weight: {
                description: 'Returns the total weight of all of the items in the cart.',
                type: 'integer'
            },
            note: {
                description: 'cart.note allows the capturing of more information on the cart page.',
                type: 'string'
            }
        },
        link: 'https://help.shopify.com/themes/liquid/objects#canonical_url'
    },
    collection: {
        filters: false,
        type: 'object',
        description: 'Returns a collection',
        properties: {
            all_tags: {
                description: 'Returns a list of all product tags in a collection. collection.all_tags will return the full list of tags even when the collection view is filtered. collection.all_tags will return at most 1,000 tags',
                type: 'array'
            },
            all_types: {
                description: 'Returns a list of all product types in a collection',
                type: 'array'
            },
            all_vendors: {
                description: 'Returns a list of all product vendors in a collection.',
                type: 'array'
            },
            products: {
                description: 'Returns all of the products in a collection. You can show a maximum of 50 products per page. Use the paginate tag to choose how many products are shown per page',
                type: 'array'
            },
            sort_options: {
                description: 'Returns an array of sorting options for the collection',
                type: 'array'
            },
            id: {
                description: 'Returns the ID number of the collection.',
                type: 'integer'
            },
            link: {
                description: 'Returns the URL of the collection',
                type: 'string'
            },
            handle: {
                description: "Returns the collection's handle",
                type: 'string'
            },
            published_at: {
                description: "Returns the date and time when the collection was published. You can set this information on the collection's page in your Shopify admin by the Set publish date calendar icon. You can use a date filter to format the date",
                type: 'string'
            },
            description: {
                description: 'Returns the description of the collection',
                type: 'string'
            },
            image: {
                description: 'Returns the image of the collection',
                type: 'string'
            },
            template_suffix: {
                description: 'Returns the name of the custom collection template assigned to the `collection`, without the collection. prefix or the `.liquid` extension. Returns `nil` if a custom template is not assigned to the collection.',
                type: 'string'
            },
            next_product: {
                description: 'Returns the next product in the collection. Returns `nil` if there is no next product',
                type: 'string'
            },
            products_count: {
                description: 'Returns the number of products in a collection that match the current view. For example, if you are viewing a collection filtered by tag, collection.`products_count` will return the number of products that match the chosen tag.',
                type: 'integer'
            },
            all_products_count: {
                description: 'Returns the number of products in a collection. collection.all_products_count will return the total number of products even when the collection view is filtered.',
                type: 'integer'
            },
            previous_product: {
                description: 'Returns the previous product in the collection. Returns `nil` if there is no previous product.',
                type: 'string'
            },
            current_type: {
                description: 'Returns the product type on a `/collections/types?q=TYPE` collection page. For example, you may be on the automatic Shirts collection, which lists all products of type ‘shirts’ in the store: `myshop.shopify.com/collections/types?q=Shirts`',
                type: 'string'
            },
            sort_by: {
                description: 'Returns the sort order applied to the collection by the `sort_by` URL parameter. When there is no `sort_by` URL parameter, the value is null.',
                type: 'string'
            },
            default_sort_by: {
                description: 'Returns the sort order of the collection, which is set in the collection pages of the Admin',
                type: 'string'
            },
            tags: {
                description: 'Returns the tags of products in a collection that match the current view. For example, if you are viewing a collection filtered by tag, `collection.tags` will return the tags for the products that match the current filter',
                type: 'array'
            },
            title: {
                description: 'Returns the title of the collection',
                type: 'string'
            },
            current_vendor: {
                description: 'Returns the vendor name on a `/collections/vendors?q=VENDOR` collection page. For example, you may be on the automatic Shopify collection, which lists all products with vendor ‘shopify’ in the store: `myshop.shopify.com/collections/vendors?q=Shopify`',
                type: 'string'
            }
        },
        link: 'https://help.shopify.com/themes/liquid/objects#collection'
    },
    collections: {
        type: 'array',
        description: 'Returns a list of all of the collections in a store',
        filters: false,
        link: 'https://help.shopify.com/themes/liquid/objects#collections'
    },
    comment: {
        type: 'object',
        filters: false,
        description: 'Article Comment',
        properties: {
            link: {
                type: 'string',
                description: 'Returns the URL of the article with `comment.id` appended to it. This is so the page will automatically scroll to the comment'
            },
            author: {
                description: 'Returns the author of the comment',
                type: 'string'
            },
            content: {
                description: 'Returns the content of the comment',
                type: 'string'
            },
            email: {
                type: 'string',
                description: "Returns the e-mail address of the comment's author"
            },
            id: {
                type: 'integer',
                description: 'Returns the id (unique identifier) of the comment'
            },
            status: {
                type: 'string',
                description: 'Returns the status of the comment'
            },
            created_at: {
                type: 'string',
                description: 'Returns the timestamp of when the comment was submitted. Use the `date` filter to convert the timestamp into a more readable format'
            },
            updated_at: {
                type: 'string',
                description: "Returns the timestamp of when the comment's status was last changed. For example, the timestamp of when a comment was approved by the article's author. Use the `date` filter to convert the timestamp into a more readable format"
            }
        },
        link: 'https://help.shopify.com/themes/liquid/objects/comment'
    },
    content_for_additional_checkout_buttons: {
        const: true,
        type: 'variable',
        description: 'Returns checkout buttons for any active payment providers with offsite checkouts. The "additional_checkout_buttons" and "content_for_additional_checkout_buttons" are used in many Shopify themes.',
        link: 'https://shopify.dev/docs/themes/liquid/reference/objects#content_for_additional_checkout_buttons'
    },
    content_for_header: {
        const: true,
        type: 'variable',
        description: 'The content_for_header object is required in theme.liquid. It must be placed inside the HTML <head> tag. It dynamically loads all scripts required by Shopify into the document head. These scripts include Shopify analytics, Google Analytics, and scripts required for Shopify apps.',
        link: 'https://help.shopify.com/en/themes/liquid/objects#content-objects'
    },
    content_for_index: {
        const: true,
        type: 'variable',
        description: 'The content_for_index object contains the content of dynamic sections to be rendered on the home page. This object must be included in templates/index.liquid.',
        link: 'https://help.shopify.com/en/themes/liquid/objects#content-for-index'
    },
    content_for_layout: {
        const: true,
        type: 'variable',
        description: 'The content_for_layout object is required in theme.liquid. It must be placed inside the HTML <body> tag. It dynamically loads content generated by other templates such as index.liquid or product.liquid.',
        link: 'https://help.shopify.com/en/themes/liquid/objects#content-for-layout'
    },
    country_option_tags: {
        const: true,
        type: 'variable',
        description: "The country_option_tags object creates an <option> tag for each country that is included as a shipping zone on the Shipping page of the admin. An attribute called data-provinces is set for each <option>, and contains a JSON-encoded array of the country's subregions. If a country doesn't have any subregions, then an empty array is set for its data-provinces attribute",
        link: 'https://help.shopify.com/en/themes/liquid/objects/country-option-tags'
    },
    currency: {
        description: 'The currency object',
        filters: false,
        type: 'object',
        properties: {
            iso_code: {
                type: 'string',
                description: 'Returns the ISO code of the currency (for example `USD` or `EUR`).'
            },
            symbol: {
                type: 'string',
                description: "Returns the currency's symbol (for example, `$` or `€`)."
            },
            name: {
                type: 'string',
                description: 'Returns the name of the currency (for example United States dollars or Euro).'
            }
        },
        link: 'https://help.shopify.com/en/themes/liquid/objects/country-option-tags',
        trims: false
    },
    current_page: {
        type: 'integer',
        scope: ['paginate'],
        description: 'current_page returns the number of the page you are on when browsing through paginated content. It can be used outside the paginate block',
        filters: false,
        link: 'https://help.shopify.com/themes/liquid/objects#collections'
    },
    current_tags: {
        type: 'array',
        description: 'Product tags are used to filter a collection to only show products that contain a specific product tag. Similarly, article tags are used to filter a blog to only show products that contain a specific article tag. The current_tags variable is an array that contains all tags that are being used to filter a collection or blog.',
        filters: false,
        link: 'https://shopify.dev/docs/themes/liquid/reference/objects/current-tags'
    },
    customer: {
        description: 'The customer object contains information about a customer who has a customer account',
        type: 'object',
        properties: {
            accepts_marketing: {
                description: 'Returns `true` if the customer accepts marketing, returns `false` if the customer does not',
                type: 'boolean'
            },
            addresses: {
                description: 'Returns an array of all addresses associated with a customer',
                type: 'array'
            },
            orders: {
                description: 'Returns an array of all orders placed by the customer',
                type: 'array'
            },
            default_address: {
                description: 'Returns the default customer_address',
                type: 'string'
            },
            email: {
                description: 'Returns the email address of the customer',
                type: 'string'
            },
            first_name: {
                description: 'Returns the first name of the customer',
                type: 'string'
            },
            name: {
                description: 'Returns the full name of the customer',
                type: 'string'
            },
            id: {
                description: 'Returns the id of the customer',
                type: 'integer'
            },
            last_name: {
                description: 'Returns the last name of the customer',
                type: 'string'
            },
            last_order: {
                description: 'Returns the last order placed by the customer, not including test orders',
                type: 'string'
            },
            tags: {
                description: 'Returns the list of tags associated with the customer',
                type: 'array'
            },
            addresses_count: {
                description: 'Returns the number of addresses associated with a customer',
                type: 'integer'
            },
            phone: {
                description: 'Returns the phone number of the customer',
                type: 'string'
            },
            total_spent: {
                description: 'Returns the total amount spent on all orders',
                type: 'string'
            },
            orders_count: {
                description: 'Returns the total number of orders a customer has placed',
                type: 'integer'
            },
            has_account: {
                description: 'Returns true if the email associated with an order is also tied to a customer account. Returns `false` if it is not. Helpful in email templates',
                type: 'boolean'
            },
            tax_exempt: {
                description: 'Returns whether or not the customer is exempt from taxes',
                type: 'boolean'
            }
        },
        link: 'https://shopify.dev/docs/themes/liquid/reference/objects/customer',
        trims: false
    },
    customer_address: {
        description: 'The currency object',
        type: 'object',
        properties: {
            province_code: {
                type: 'string',
                description: 'Returns the abbreviated value of the Province/State field of the address'
            },
            street: {
                type: 'string',
                description: 'Returns the combined values of the Address1 and Address2 fields of the address'
            },
            id: {
                type: 'integer',
                description: 'Returns the id of customer address'
            },
            address1: {
                type: 'string',
                description: 'Returns the value of the Address1 field of the address'
            },
            address2: {
                type: 'string',
                description: 'Returns the value of the Address2 field of the address'
            },
            city: {
                type: 'string',
                description: 'Returns the value of the City field of the address'
            },
            company: {
                type: 'string',
                description: 'Returns the value of the Company field of the address'
            },
            country_code: {
                type: 'string',
                description: 'Returns the value of the Country field of the address in ISO 3166-2 standard format'
            },
            country: {
                type: 'string',
                description: 'Returns the value of the Country field of the address'
            },
            first_name: {
                type: 'string',
                description: 'Returns the value of the First Name field of the address'
            },
            last_name: {
                type: 'string',
                description: 'Returns the value of the Last Name field of the address'
            },
            phone: {
                type: 'string',
                description: 'Returns the value of the Phone field of the address'
            },
            zip: {
                type: 'string',
                description: 'Returns the value of the Postal/Zip field of the address'
            },
            province: {
                type: 'string',
                description: 'Returns the value of the Province/State field of the address'
            }
        },
        link: 'https://shopify.dev/docs/themes/liquid/reference/objects/customer-address',
        trims: false
    },
    discount_allocation: {
        type: 'object',
        description: 'The `discount_allocation` object contains all of the information about how a particular discount affects a line item and how the price reduces. The object can be accessed on customer order and notification templates. **Shopify Plus** merchants can also access properties of the `discount_allocation` object in the `checkout.liquid` layout file.',
        properties: {
            discount_application: {
                type: 'string',
                description: 'The discount application that allocates the amount on the line item'
            },
            amount: {
                type: 'integer',
                description: 'The discounted amount on a line item by a particular discount'
            }
        },
        link: 'https://shopify.dev/docs/themes/liquid/reference/objects/discount-allocation',
        trims: false
    },
    discount_application: {
        type: 'object',
        description: 'The `discount_application` object captures the intent of a `discount applied` on an order. The object can be accessed on customer order and notification templates. **Shopify Plus** merchants can also access properties of the discount_allocation object in the checkout.liquid layout file.',
        properties: {
            target_selection: {
                type: 'string',
                description: 'Describes how a discount selects line items in the cart to be discounted'
            },
            target_type: {
                type: 'string',
                description: 'Describes the type of item that a discount applies to. `target_type` has the following possible values, line_item or shipping_line'
            },
            title: {
                type: 'string',
                description: 'The customer-facing name of the discount. For example, `Welcome10` or `CBBWQQAKYBYY`'
            },
            total_allocated_amount: {
                type: 'integer',
                description: 'The total amount that the price of an order is reduced by the discount'
            },
            type: {
                type: 'string',
                description: 'The type of the discount. type has the following possible values:\n\n- automatic\n- manual\n-discount_code\n-script'
            },
            value: {
                type: 'integer',
                description: 'The value of the discount.'
            },
            value_type: {
                type: 'string',
                description: 'The value type of the discount. value_type has the following possible values:\n\n- fixed_amount\n- percentagel'
            }
        },
        link: 'https://shopify.dev/docs/themes/liquid/reference/objects/discount-application',
        trims: false
    },
    external_video: {
        type: 'object',
        description: "The external_video object can be accessed from the product object's media attribute. It contains information about a YouTube video associated with a product",
        properties: {
            external_id: {
                type: 'integer',
                description: 'Returns the ID of the YouTube video'
            },
            alt: {
                type: 'string',
                description: 'Returns the alt tag of the video set on the product details page of the Shopify admin'
            },
            aspect_ratio: {
                type: 'string',
                description: 'Returns the aspect ratio of the YouTube video'
            },
            id: {
                type: 'integer',
                description: 'Returns the media_id of the external video.'
            },
            video_host: {
                type: 'string',
                description: 'Returns the name of the video host (youtube).'
            },
            position: {
                type: 'string',
                description: "Returns the position of the external_video in the product object's media array."
            },
            media_type: {
                type: 'string',
                description: "Returns the type of the object (external_video). This can be used to filter the product object's media array."
            }
        },
        link: 'https://shopify.dev/docs/themes/liquid/reference/objects/external-video'
    },
    font: {
        type: 'object',
        description: 'The font object is used to access the font_picker settings. It can be accessed via the global settings object',
        properties: {
            variants: {
                description: "Returns all of the variants within the font's family. Each of the variants is also a font object",
                type: 'array'
            },
            family: {
                description: "Returns the font's name",
                type: 'string'
            },
            baseline_ratio: {
                type: 'string',
                description: 'Returns the position of the baseline within the em box (measured from the bottom). You can learn more about baseline ratios in the Plumber SASS documentation'
            },
            style: {
                description: 'Returns the selected font style',
                type: 'string'
            },
            weight: {
                description: 'Returns the selected font weight',
                type: 'string'
            },
            fallback_families: {
                description: 'Returns the suggested fallback font families',
                type: 'string'
            }
        }
    },
    form: {
        type: 'object',
        description: 'The form object is used within the form tag. It contains attributes of its parent form.',
        filters: false,
        scope: ['form'],
        properties: {
            address1: {
                type: 'string',
                description: 'Returns the first address line associated with the address. Exclusive to form tags with the "address" parameter.'
            },
            address2: {
                type: 'string',
                description: 'Returns the second address line associated with the address, if it exists. Exclusive to form tags with the "address" parameter.'
            },
            author: {
                type: 'string',
                description: 'Returns the name of the author of the blog article comment. Exclusive to form tags with the "article" parameter.'
            },
            body: {
                type: 'string',
                description: 'Returns the content of the blog article comment. Exclusive to form tags with the "article" parameter.'
            },
            city: {
                type: 'string',
                description: 'Returns the city associated with the address. Exclusive to form tags with the "address" parameter.'
            },
            company: {
                type: 'string',
                description: 'Returns the company name associated with the address, if it exists. Exclusive to form tags with the "address" parameter.'
            },
            country: {
                type: 'string',
                description: 'Returns the country associated with the address. Exclusive to form tags with the "address" parameter.'
            },
            email: {
                type: 'string',
                description: "Returns the email of the blog article comment's author. Exclusive to form tags with the \"article\" parameter."
            },
            errors: {
                type: 'array',
                description: 'Returns an array of strings if the form was not submitted successfully. The strings returned depend on which fields of the form were left empty or contained errors. Possible values are:\n\n- author\n- body\n- email\n- form\n'
            },
            first_name: {
                type: 'string',
                description: 'Returns the first name associated with the address. Exclusive to form tags with the "address" parameter.'
            },
            id: {
                type: 'integer',
                description: 'Returns the id (unique identifier) of the form.'
            },
            last_name: {
                type: 'string',
                description: 'Returns the last name associated with the address. Exclusive to form tags with the "address" parameter.'
            },
            password_needed: {
                type: 'boolean',
                description: 'Used only for form tags with the "customer_login" parameter. The form.password_needed attribute always returns true.'
            },
            phone: {
                type: 'string',
                description: 'Returns the telephone number associated with the address, if it exists. Exclusive to form tags with the "address" parameter.'
            },
            'posted_successfully?': {
                type: 'boolean',
                description: 'Returns true if the form was submitted successfully, or false if the form contained errors. All forms but the address form set that property. The address form is always submitted successfully.'
            },
            province: {
                type: 'string',
                description: 'Returns the province or state associated with the address. Exclusive to form tags with the "address" parameter.'
            },
            set_as_default_checkbox: {
                type: 'variable',
                description: "Renders an HTML checkbox that can submit the current form as the customer's default address. Exclusive to form tags with the \"address\" parameter"
            },
            zip: {
                type: 'string',
                description: 'Returns the zip code or postal code associated with the address. Exclusive to form tags with the "address" parameter.'
            }
        }
    },
    forloop: {
        scope: ['for'],
        type: 'object',
        description: 'The forloop object contains attributes of its parent for loop.',
        filters: false,
        properties: {
            rindex: {
                description: 'Returns `forloop.index` in reverse order.',
                type: 'integer'
            },
            rindex0: {
                description: 'Returns `forloop.index0` in reverse order.',
                type: 'integer'
            },
            index0: {
                description: 'Returns the current index of the for loop, starting at 0.',
                type: 'integer'
            },
            index: {
                description: 'Returns the current index of the for loop, starting at 1.',
                type: 'integer'
            },
            length: {
                description: 'Returns the number of iterations of the loop.',
                type: 'integer'
            },
            first: {
                description: "Returns true if it's the first iteration of the for loop. Returns false if it is not the first iteration.",
                type: 'boolean'
            },
            last: {
                description: "Returns true if it's the last iteration of the for loop. Returns false if it is not the last iteration.",
                type: 'boolean'
            }
        },
        link: 'https://shopify.dev/docs/themes/liquid/reference/objects/for-loops',
        trims: false
    },
    fulfillment: {
        type: 'object',
        description: 'The fulfillment object',
        link: 'https://shopify.dev/docs/themes/liquid/reference/objects/fulfillment',
        properties: {
            fulfillment_line_items: {
                type: 'array',
                description: 'Returns an array of all line items and their quantity included in the fulfillment. Any line items that have already been fulfilled, or are yet to be fulfilled, will not be included in the array.'
            },
            item_count: {
                type: 'array',
                description: 'Returns the total number of items included in the fulfillment.'
            },
            tracking_company: {
                type: 'string',
                description: 'Returns the name of the fulfillment service.'
            },
            tracking_number: {
                type: 'string',
                description: "Returns a fulfillment's tracking number, if it exists."
            },
            tracking_url: {
                type: 'string',
                description: 'Returns the URL for a tracking number.'
            }
        }
    },
    handle: {
        description: 'Returns the handle of the page that is being viewed',
        link: 'https://help.shopify.com/themes/liquid/objects#handle',
        type: 'string',
        global: true
    },
    image: {
        type: 'object',
        description: 'The image object returns information about an image.',
        properties: {
            variants: {
                description: 'Returns an array of attributes for the variant that the image is associated with.',
                type: 'array'
            },
            alt: {
                description: 'Returns the alt tag of the image, set in the Products page of the Admin.',
                type: 'string'
            },
            aspect_ratio: {
                type: 'string',
                description: 'Returns the aspect ratio (width / height) of the image.'
            },
            height: {
                type: 'integer',
                description: 'Returns the height of the image in pixels.'
            },
            product_id: {
                description: "Returns the id of the image's product.",
                type: 'integer'
            },
            id: {
                description: 'Returns the id of the image.',
                type: 'integer'
            },
            position: {
                type: 'integer',
                description: 'Returns the position of the image, starting at 1. This is the same as outputting forloop.index.'
            },
            src: {
                type: 'string',
                description: 'Returns the relative path of the product image. This is the same as outputting "{{ image }}".'
            },
            width: {
                type: 'integer',
                description: 'Returns the width of the image in pixels.'
            },
            attached_to_variant: {
                type: 'boolean',
                description: 'Returns true if the image has been associated with a variant. Returns false otherwise. This can be used in cases where you want to create a gallery of images that are not associated with variants.'
            }
        },
        link: 'https://help.shopify.com/themes/liquid/objects#image'
    },
    line_item: {
        type: 'object',
        description: 'A line_item represents a single line in the shopping cart. There is one line item for each distinct product variant in the cart. The line_item object can be accessed in all Liquid templates via cart.items',
        link: 'https://shopify.dev/docs/themes/liquid/reference/objects/line_item',
        properties: {
            discount_allocations: {
                type: 'array',
                description: 'Returns a list of all discount allocations containing the discounted amount and the reference to the parent discount application. line_item.discount_allocations is available on line items in carts, checkouts, orders, and draft orders.'
            },
            final_line_price: {
                type: 'integer',
                description: 'Returns the combined price of all the items in the line item. This is equal to line_item.final_price times line_item.quantity.'
            },
            final_price: {
                type: 'integer',
                description: 'Returns the price of the line item including all line level discount amounts.'
            },
            fulfillment: {
                type: 'string',
                description: 'Returns the fulfillment of the line item.'
            },
            fulfillment_service: {
                type: 'string',
                description: "Returns the fulfillment service associated with the line item's variant. Line items that have no fulfillment service will return manual."
            },
            gift_card: {
                type: 'boolean',
                description: "Returns true if the line item's product is a gift card, or false if it is not."
            },
            grams: {
                type: 'integer',
                description: 'Returns the weight of the line item. Use the weight_with_unit filter to format the weight.'
            },
            image: {
                type: 'string',
                description: "Returns the line item's image."
            },
            key: {
                type: 'integer',
                description: "Returns the line item key, a unique identifier for the line item. The line item key is constructed from the line item's variant ID plus a hash of the line item's properties, even if the item has no additional properties."
            },
            line_level_discount_allocations: {
                type: 'array',
                description: 'Returns a list of line-specific discount allocations containing the discounted amount and the reference to the parent discount application.'
            },
            line_level_total_discount: {
                type: 'array',
                description: "Returns the total amount of all discounts applied to the line item specifically. This doesn't include discounts that are added to the cart."
            },
            message: {
                type: 'string',
                description: 'Returns the discount message if a script has applied a discount to the line item.'
            },
            options_with_values: {
                type: 'array',
                description: "Returns an array of selected values from the item's product options."
            },
            original_line_price: {
                type: 'integer',
                description: 'Returns the combined price of the quantity of items included in the line, before discounts were applied.'
            },
            original_price: {
                type: 'integer',
                description: 'Returns the original price of the line item before discounts were applied.'
            },
            product: {
                type: 'object',
                description: 'Returns the product of the line item.'
            },
            product_id: {
                type: 'integer',
                description: "Returns the ID of the line item's product."
            },
            properties: {
                type: 'array',
                description: 'line_item.properties returns an array of custom information for an item that has been added to the cart.'
            },
            quantity: {
                type: 'integer',
                description: 'Returns the quantity of the line item.'
            },
            requires_shipping: {
                type: 'boolean',
                description: 'Returns true if the variant of the line item requires shipping, or false if it does not.'
            },
            selling_plan_allocation: {
                type: 'object',
                description: 'Returns a selling_plan_allocation object when the line item contains a selling plan.'
            },
            sku: {
                type: 'integer',
                description: "Returns the SKU (stock keeping unit) of the line item's variant."
            },
            successfully_fulfilled_quantity: {
                type: 'integer',
                description: 'Returns the successfully fulfilled quantity of the line item.'
            },
            taxable: {
                type: 'boolean',
                description: "Returns true if taxes are charged on the line item's variant, or false if they are not."
            },
            title: {
                type: 'string',
                description: "Returns the title of the line item. line_item.title combines both the line item's product.title and the line item's variant.title, separated by a hyphen."
            },
            unit_price: {
                type: 'integer',
                description: 'Returns the unit price of the line item. The price reflects any discounts that are applied to the line item.'
            },
            unit_price_measurement: {
                type: 'object',
                description: 'Returns a unit_price_measurement object for the line item.'
            },
            url: {
                type: 'string',
                description: "Returns the relative URL of the line item's variant. The relative URL does not include your store's root URL (mystore.myshopify.com)."
            },
            variant: {
                type: 'object',
                description: 'Returns the variant of the line item.'
            },
            variant_id: {
                type: 'integer',
                description: "Returns the ID of the line item's variant."
            },
            vendor: {
                type: 'object',
                description: "Returns the vendor of the line item's product."
            },
            id: {
                type: 'integer',
                description: "Returns the line item's ID."
            }
        }
    },
    link: {
        type: 'object',
        scope: ['linklist'],
        description: 'The link object cannot be invoked on its own. It must be invoked inside a linklist.',
        properties: {
            active: {
                type: 'boolean',
                description: 'Returns true if the link is active, or false if the link is inactive',
                references: [
                    {
                        name: 'Shopify Liquid',
                        url: 'https://help.shopify.com/themes/liquid/objects/link#link-active'
                    }
                ]
            },
            child_active: {
                type: 'boolean',
                description: 'Similar to `link.active`, but returns true if a child link of the parent link is active, or false if no child links of the parent link are active.',
                references: [
                    {
                        name: 'Shopify Liquid',
                        url: 'https://help.shopify.com/themes/liquid/objects/link#link-child_active'
                    }
                ]
            },
            child_current: {
                type: 'boolean',
                description: 'Returns `true` if a child link has a link object with link.current equal to `true`. Returns `false` if no child links have a link object with link.current equal to `true`.',
                references: [
                    {
                        name: 'Shopify Liquid',
                        url: 'https://help.shopify.com/themes/liquid/objects/link#link-child_current'
                    }
                ]
            },
            current: {
                type: 'boolean',
                description: "Returns `true` if the page content associated with the `link` is considered a match to the current page. Returns `false` if the content isn't considered a match",
                references: [
                    {
                        name: 'Shopify Liquid',
                        url: 'https://help.shopify.com/themes/liquid/objects/link#link-current'
                    }
                ]
            },
            levels: {
                type: 'integer',
                description: 'Returns the number of nested levels that a link contains.',
                references: [
                    {
                        name: 'Shopify Liquid',
                        url: 'https://help.shopify.com/themes/liquid/objects/link#link-levels'
                    }
                ]
            },
            links: {
                type: 'array',
                description: 'Returns an array of the child links associated with the parent link.',
                references: [
                    {
                        name: 'Shopify Liquid',
                        url: 'https://help.shopify.com/themes/liquid/objects/link#link-levels'
                    }
                ]
            },
            object: {
                type: 'object',
                description: 'Returns the variable associated to the link. The possible types are: product, collection, page, blog.',
                references: [
                    {
                        name: 'Shopify Liquid',
                        url: 'https://shopify.dev/docs/themes/liquid/reference/objects/link#link-object'
                    }
                ]
            },
            title: {
                type: 'string',
                description: 'Returns the title of the link',
                references: [
                    {
                        name: 'Shopify Liquid',
                        url: 'https://help.shopify.com/themes/liquid/objects/link#link-title'
                    }
                ]
            },
            type: {
                type: 'string',
                description: 'Returns the type of the link. The possible values are:\n\n- collection_link\n- product_link\n- page_link\n- blog_link\n- relative_link\n- http_link',
                references: [
                    {
                        name: 'Shopify Liquid',
                        url: 'https://help.shopify.com/themes/liquid/objects/link#link-type'
                    }
                ]
            },
            url: {
                type: 'string',
                description: 'Returns the URL of the link.',
                references: [
                    {
                        name: 'Shopify Liquid',
                        url: 'https://help.shopify.com/themes/liquid/objects/link#url'
                    }
                ]
            }
        }
    },
    linklist: {
        description: 'linklist objects appear as ‘menus’ in the Navigation page of the Shopify admin.',
        type: 'object',
        link: 'https://help.shopify.com/themes/liquid/objects/linklist',
        properties: {
            handle: {
                type: 'string',
                description: 'Returns the handle of the linklist.',
                references: [
                    {
                        name: 'Shopify Liquid',
                        url: 'https://help.shopify.com/themes/liquid/objects/linklist#linklist-handle'
                    }
                ]
            },
            levels: {
                type: 'integer',
                description: 'Returns the number of nested levels that a linklist contains.',
                references: [
                    {
                        name: 'Shopify Liquid',
                        url: 'https://help.shopify.com/themes/liquid/objects/linklist#linklist-levels'
                    }
                ]
            },
            links: {
                type: 'array',
                description: 'Returns an array of links in the linklist.',
                references: [
                    {
                        name: 'Shopify Liquid',
                        url: 'https://help.shopify.com/themes/liquid/objects/linklist#linklist-links'
                    }
                ]
            },
            title: {
                type: 'string',
                description: 'Returns the title of the linklist',
                references: [
                    {
                        name: 'Shopify Liquid',
                        url: 'https://help.shopify.com/themes/liquid/objects/linklist#linklist-title'
                    }
                ]
            }
        }
    },
    images: {
        type: 'object',
        description: 'Allows you to access any image in a store by its filename',
        link: 'https://help.shopify.com/themes/liquid/objects#images'
    },
    linklists: {
        description: 'Returns a list of all the menus (link lists) in your store. You can use linklists to access your link lists with their handles.',
        link: 'https://help.shopify.com/themes/liquid/objects#linklists',
        type: 'array'
    },
    page: {
        type: 'object',
        link: 'https://shopify.dev/docs/themes/liquid/reference/objects/page',
        description: 'The page object has the following attributes',
        properties: {
            author: {
                type: 'string',
                description: 'Returns the author of a page.'
            },
            content: {
                type: 'string',
                description: 'Returns the content of a page.'
            },
            handle: {
                type: 'string',
                description: 'Returns the handle of the page.'
            },
            id: {
                type: 'string',
                description: 'Returns the id of the page.'
            },
            published_at: {
                type: 'string',
                description: 'Returns the timestamp of when the page was created. Use the date filter to format the timestamp.'
            },
            template_suffix: {
                type: 'string',
                description: 'Returns the name of the custom page template assigned to the page, without the page.'
            },
            title: {
                type: 'string',
                description: 'Returns the title of a page.'
            },
            url: {
                type: 'string',
                description: 'Returns the relative URL of the page.'
            }
        }
    },
    product: {
        type: 'object',
        description: 'Product object',
        properties: {
            collections: {
                type: 'array',
                description: 'Returns an array of all of the collections that a product belongs to, except any collections that are not available on the sales channel being used.'
            },
            tags: {
                type: 'array',
                description: "Returns an array of all of the product's tags. The tags are returned in alphabetical order."
            },
            images: {
                type: 'array',
                description: "Returns an array of the product's images. Use the img_url filter to link to the product image on Shopify's content delivery network (CDN)."
            },
            options: {
                type: 'array',
                description: "Returns an array of the product's option names."
            },
            options_with_values: {
                type: 'array',
                description: "Returns an array of the product's options."
            },
            variants: {
                type: 'array',
                description: "Returns an array of the product's variants."
            },
            content: {
                type: 'string',
                description: 'Returns the description of the product. Alias for product.description.'
            },
            description: {
                type: 'string',
                description: 'Returns the description of the product.'
            },
            handle: {
                type: 'string',
                description: 'Returns the handle of a product.'
            },
            compare_at_price_max: {
                type: 'integer',
                description: 'Returns the highest compare at price.'
            },
            price_max: {
                type: 'integer',
                description: 'Returns the highest price of the product.'
            },
            id: {
                type: 'integer',
                description: 'Returns the id of the product.'
            },
            compare_at_price_min: {
                type: 'integer',
                description: 'Returns the lowest compare at price.'
            },
            price: {
                type: 'integer',
                description: "Returns the lowest price of all the product's variants. This attribute is the same as product.price_min."
            },
            price_min: {
                type: 'integer',
                description: 'Returns the lowest price of the product.'
            },
            template_suffix: {
                type: 'string',
                description: 'Returns the name of the custom product template assigned to the product, without the product. prefix nor the .liquid extension. Returns nil if a custom template is not assigned to the product.'
            },
            featured_image: {
                type: 'string',
                description: "Returns the relative URL of the product's featured image."
            },
            type: {
                type: 'string',
                description: 'Returns the relative URL of the product.'
            },
            title: {
                type: 'string',
                description: 'Returns the title of the product.'
            },
            selected_variant: {
                type: 'object',
                description: 'Returns the variant object of the _currently selected_ variant if there is a valid `?variant=parameter` in the URL. Returns nil if there is not.'
            },
            selected_or_first_available_variant: {
                type: 'object',
                description: 'Returns the variant object of the _currently selected_ variant if there is a valid `?variant=parameter` parameter in the URL. If there is no selected variant, the first available variant is returned. In order for a variant to be available, its `variant.inventory_quantity` must be greater than zero or `variant.inventory_policy` must be set to continue. A variant with no `inventory_management` is considered available.'
            },
            first_available_variant: {
                type: 'object',
                description: 'Returns the variant object of the first product variant that is available for purchase. In order for a variant to be available, its variant.inventory_quantity must be greater than zero or variant.inventory_policy must be set to continue. A variant with no inventory_policy is considered available.'
            },
            vendor: {
                type: 'string',
                description: 'Returns the vendor of the product.'
            },
            available: {
                type: 'boolean',
                description: "Returns true if a product is available for purchase. Returns `false` if all of the products variants' inventory_quantity values are zero or less, and their `inventory_policy` is not set to \"_Allow users to purchase this item, even if it is no longer in stock._\""
            },
            compare_at_price_varies: {
                type: 'boolean',
                description: 'Returns true if the compare_at_price_min is different from the compare_at_price_max. Returns false if they are the same.'
            },
            has_only_default_variant: {
                type: 'boolean',
                description: 'Returns true if the product only has the default variant. This lets you determine whether to show a variant picker in your product forms.'
            },
            price_varies: {
                type: 'boolean',
                description: "Returns true if the product's variants have varying prices. Returns false if all of the product's variants have the same price."
            }
        },
        link: 'https://help.shopify.com/themes/liquid/objects#product'
    },
    location: {
        type: 'object',
        description: 'This object allows you access store location information using Liquid.',
        link: 'https://shopify.dev/docs/themes/liquid/reference/objects/location',
        properties: {
            address: {
                type: 'string',
                description: 'Returns the address object corresponding to this location.'
            },
            id: {
                type: 'string',
                description: 'Returns the ID of the location.'
            },
            latitude: {
                type: 'string',
                description: 'Returns the latitude associated to the location. It will return null if the address is not verified.'
            },
            longitude: {
                type: 'string',
                description: 'Returns the longitude associated with the location. It will return null if the address is not verified.'
            },
            name: {
                type: 'string',
                description: 'Returns the name of location.'
            }
        }
    },
    order: {
        description: "You can access the order object in a theme's Liquid templates with \"customer.orders\"",
        type: 'object',
        link: 'https://shopify.dev/docs/themes/liquid/reference/objects/order',
        properties: {
            attributes: {
                description: "Returns the custom cart attributes for the order, if there are any. You can add as many custom attributes to your cart as you like.\n\nWhen you're looping through attributes, use \"{{ attribute | first }}\" to get the name of the attribute, and \"{{ attribute | last }}\" to get its value.",
                type: 'array'
            },
            billing_address: {
                description: 'Returns the billing address of the order.',
                type: 'string'
            },
            cancelled: {
                description: 'Returns true if an order is canceled, or false if it is not.',
                type: 'string'
            },
            cancelled_at: {
                description: 'Returns the timestamp of when an order was canceled. Use the date filter to format the timestamp.',
                type: 'string'
            },
            cancel_reason: {
                description: 'Returns one of the following cancellation reasons, if an order was canceled:\n\n-items unavailable\n- fraudulent order\n- customer changed/cancelled order\n- other\n',
                type: 'string'
            },
            cancel_reason_label: {
                description: "Returns the translated output of an order's order.cancel_reason.",
                type: 'string'
            },
            cart_level_discount_applications: {
                description: 'Returns an array of order-specific discount applications for an order.',
                type: 'array'
            },
            created_at: {
                description: 'Returns the timestamp of when an order was created. Use the date filter to format the timestamp.',
                type: 'string'
            },
            customer: {
                description: 'Returns the customer associated with the order.',
                type: 'string'
            },
            customer_url: {
                description: 'Returns a unique URL that the customer can use to access the order.',
                type: 'string'
            },
            discount_applications: {
                description: 'Returns an array of discount applications for an order.',
                type: 'string'
            },
            email: {
                description: 'Returns the email address associated with an order, if it exists.',
                type: 'string'
            },
            financial_status: {
                description: 'Returns the financial status of an order. The possible values are:\n\n- pending\n- authorized\n- paid\n- partially_paid\n- refunded\n- partially_refunded\n- voided',
                type: 'string'
            },
            financial_status_label: {
                description: "Returns the translated output of an order's \"financial_status\".",
                type: 'string'
            },
            fulfillment_status: {
                description: 'Returns the fulfillment status of an order.',
                type: 'string'
            },
            fulfillment_status_label: {
                description: "Returns the translated output of an order's fulfillment_status.",
                type: 'string'
            },
            line_items: {
                description: 'Returns an array of line items for the order.',
                type: 'array'
            },
            line_items_subtotal_price: {
                description: "Returns the sum of the order's line-item prices after any line item discounts have been applied. The subtotal amount doesn't include cart discounts, taxes (unless taxes are included in the prices), or shipping costs.",
                type: 'string'
            },
            location: {
                description: '(POS only) Returns the physical location of the order. You can configure locations in the Locations settings of your Shopify admin.',
                type: 'string'
            },
            name: {
                description: 'Returns the name of the order in the format set in the Standards and formats section of the General settings of your Shopify admin.',
                type: 'string'
            },
            note: {
                description: 'Returns the note associated with a customer order.',
                type: 'string'
            },
            order_number: {
                description: 'Returns the integer representation of the order name.',
                type: 'integer'
            },
            order_status_url: {
                description: 'Returns the unique URL for the order status page of the order.',
                type: 'string'
            },
            phone: {
                description: 'Returns the phone number associated with an order, if it exists.',
                type: 'string'
            },
            shipping_address: {
                description: 'Returns the shipping address of the order.',
                type: 'string'
            },
            shipping_methods: {
                description: 'Returns an array of shipping_method variables from the order.',
                type: 'string'
            },
            shipping_price: {
                description: 'Returns the shipping price of an order.',
                type: 'string'
            },
            subtotal_price: {
                description: "Returns the subtotal price of all the items in the order after both line-item and cart discounts have been applied. The subtotal doesn't include taxes (unless taxes are included in the prices) or shipping costs.",
                type: 'string'
            },
            tags: {
                description: "Returns an array of all of the order's tags. The tags are returned in alphabetical order.",
                type: 'array'
            },
            tax_lines: {
                description: 'Returns an array of tax_line variables for an order.',
                type: 'string'
            },
            tax_price: {
                description: "Returns the order's tax price.",
                type: 'string'
            },
            total_discounts: {
                description: 'Returns the total value of all discounts applied to the order.',
                type: 'string'
            },
            total_net_amount: {
                description: 'Returns the net amount of the order.\n\nThe "order.total_net_amount" is calculated after refunds are applied. The value is equivalent to "order.total_price minus" "order.total_refunded_amount".',
                type: 'string'
            },
            total_price: {
                description: 'Returns the total price of an order.\n\nThe "order.total_price amount" is calculated before refunds are applied. To get the value of refunds, use the "order.total_refunded_amount property."',
                type: 'string'
            },
            total_refunded_amount: {
                description: 'Returns the total refunded amount of an order.',
                type: 'string'
            },
            transactions: {
                description: 'Returns an array of transactions from the order.',
                type: 'array'
            }
        }
    },
    section: {
        description: "The section object lets you access a section's properties and setting values.",
        type: 'object',
        link: 'https://shopify.dev/docs/themes/liquid/reference/objects/section',
        properties: {
            blocks: {
                description: "Returns an array of the section's blocks.",
                type: 'array'
            },
            id: {
                description: "For static sections, returns the section's file name without \".liquid\". For dynamic sections, returns a dynamically generated ID.",
                type: 'integer'
            },
            settings: {
                description: "Returns an object of the section settings set in the theme editor. Retrieve setting values by referencing the setting's unique id.",
                type: 'object'
            }
        }
    },
    model: {
        type: 'object',
        link: 'https://shopify.dev/docs/themes/liquid/reference/objects/model',
        description: 'The model object contains information about a 3D model uploaded from the product details page in the Shopify admin.',
        properties: {
            alt: {
                type: 'string',
                description: 'Returns the alt tag of the model set on the product details page of the Shopify admin.'
            },
            id: {
                type: 'string',
                description: 'Returns the media_id of the model.'
            },
            media_type: {
                type: 'object',
                description: 'Returns the type of the object (model).'
            },
            position: {
                type: 'integer',
                description: "Returns the position of the model in the product object's media array"
            },
            preview_image: {
                type: 'string',
                description: 'Returns a preview image for the model.'
            },
            sources: {
                type: 'array',
                description: 'Returns an array of model source objects.'
            }
        }
    },
    model_source: {
        type: 'object',
        link: 'https://shopify.dev/docs/themes/liquid/reference/objects/model-source',
        description: 'The model_source object contains information about the source files for a model associated with a product.',
        properties: {
            mime_type: {
                type: 'string',
                description: 'Returns the MIME type of the model source file.'
            },
            format: {
                type: 'string',
                description: 'Returns the format of the model source file.'
            },
            url: {
                type: 'string',
                description: 'Returns the URL of the model source file.'
            }
        }
    },
    media: {
        type: 'object',
        link: 'https://shopify.dev/docs/themes/liquid/reference/objects/media',
        description: 'The media object represents an object returned in a product.media array.',
        properties: {
            alt: {
                type: 'string',
                description: 'Returns the alt tag of the media'
            },
            id: {
                type: 'integer',
                description: 'Returns the ID of the media.'
            },
            media_type: {
                type: 'object',
                description: 'Returns the media type of the object.'
            },
            position: {
                type: 'object',
                description: "Returns the position of the specific media object in the product object's media array."
            },
            preview_image: {
                type: 'string',
                description: 'Returns a preview image for the media.'
            }
        }
    },
    variant: {
        type: 'object',
        link: 'https://shopify.dev/docs/themes/liquid/reference/objects/variant',
        properties: {
            available: {
                type: 'boolean',
                description: 'Returns true if the variant is available for purchase, or false if it not. For a variant to be available, its variant.inventory_quantity must be greater than zero or variant.inventory_policy must be set to continue. A variant with no variant.inventory_management is also considered available.'
            },
            barcode: {
                type: 'string',
                description: "Returns the variant's barcode."
            },
            compare_at_price: {
                type: 'string',
                description: "Returns the variant's compare at price. Use a money filter to return the value in a monetary format."
            },
            featured_media: {
                type: 'string',
                description: 'Returns the first media item attached to the variant.'
            },
            id: {
                description: "Returns the variant's unique ID.",
                type: 'integer'
            },
            image: {
                description: 'Returns the image object associated with the variant.',
                type: 'object',
                properties: {
                    alt: {
                        description: "Returns the image's alt text.",
                        type: 'string'
                    },
                    src: {
                        description: 'Returns the relative URL to the image.',
                        type: 'string'
                    }
                }
            },
            incoming: {
                type: 'boolean',
                description: 'Returns true if the variant has incoming inventory.'
            },
            inventory_management: {
                type: 'string',
                description: "Returns the variant's inventory tracking service."
            },
            inventory_policy: {
                type: 'string',
                description: 'Returns the string continue if the "Allow users to purchase this item, even if it is no longer in stock." checkbox is checked in the variant options in the Admin. Returns deny if it is unchecked.'
            },
            inventory_quantity: {
                type: 'integer',
                description: "Returns the variant's inventory quantity."
            },
            next_incoming_date: {
                type: 'string',
                description: 'Returns the date when the next incoming inventory will arrive.'
            },
            options: {
                type: 'array',
                description: "Returns an array of the variant's product option values."
            },
            option1: {
                type: 'string',
                description: "Returns the value of the variant's first product option."
            },
            option2: {
                type: 'string',
                description: "Returns the value of the variant's second product option."
            },
            option3: {
                type: 'string',
                description: "Returns the value of the variant's third product option."
            },
            price: {
                type: 'string',
                description: "Returns the variant's price. Use a money filter to return the value in a monetary format."
            },
            requires_shipping: {
                type: 'boolean',
                description: 'Returns true if the variant is set to require shipping.'
            },
            requires_selling_plan: {
                type: 'boolean',
                description: 'Returns true if the variant is set to require a selling_plan when added to the cart.'
            },
            selected: {
                type: 'boolean',
                description: 'Returns true if the variant is currently selected. The selected variant is based on the URL parameter variant.'
            },
            selected_selling_plan_allocation: {
                type: 'integer',
                description: 'Returns a selling_plan_allocation object based on the URL parameter selling_plan.\n\nFor example, given the URL parameters "?variant=12345&selling_plan=8765", the selling plan allocation for the variant 12345 with a selling plan id of 8765 is returned.\n\nIf there is no selected selling plan allocation, then this property returns nil.'
            },
            selling_plan_allocations: {
                type: 'array',
                description: 'An array of selling_plan_allocation objects available for the variant.'
            },
            sku: {
                type: 'string',
                description: "Returns the variant's SKU."
            },
            store_availabilities: {
                type: 'array',
                description: 'Returns an array of store_availability objects if variant.selected is true.'
            },
            taxable: {
                type: 'boolean',
                description: 'Returns true if taxes are charged for the variant, or false if they are not.'
            },
            title: {
                type: 'string',
                description: "Returns the concatenation of all the variant's product option values, joined by / characters."
            },
            unit_price: {
                type: 'string',
                description: 'Unit prices are available only to stores located in Germany or France.Returns the unit price of the product variant.\n\nThe price reflects any discounts that are applied to the line item.'
            },
            unit_price_measurement: {
                type: 'object',
                description: 'Returns a unit_price_measurement object for the product variant.'
            },
            url: {
                type: 'string',
                description: 'Returns a URL that is unique to only one product variant. The variant ID is used as the unique identifier.'
            },
            weight: {
                type: 'integer',
                description: "Returns the variant's weight in grams. Use the weight_with_unit filter to convert it to your store's weight format or the weight unit configured on the variant."
            },
            weight_unit: {
                type: 'integer',
                description: 'Returns the unit for the weight configured on the variant. Works well paired with the weight_in_unit attribute and the weight_with_unit filter.'
            },
            weight_in_unit: {
                type: 'integer',
                description: 'Returns the weight of the product converted to the unit configured on the variant. Works well paired with the weight_unit attribute and the weight_with_unit filter.'
            }
        }
    }
};

exports.shopify = void 0;
(function (shopify) {
    shopify.objects = Objects;
    shopify.filters = Object.assign(Object.assign({}, Filters), exports.standard.filters);
    shopify.tags = Object.assign(Object.assign({}, Tags), exports.standard.tags);
})(exports.shopify || (exports.shopify = {}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LmpzIiwic291cmNlcyI6W10sInNvdXJjZXNDb250ZW50IjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9