import { Tags } from '../..';

/**
 * Liquid Standard Spec: Tags
 */
export const tags: Tags = {
  '#': {
    type: 'comment',
    description: 'Prevents an expression from being rendered or output.',
    snippet: '$1',
    singleton: true,
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.dev/api/liquid/tags#inline_comment'
    }
  },
  assign: {
    type: 'variable',
    description: 'Creates a new variable.',
    snippet: '$1 = $2',
    filters: true,
    singleton: true,
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/tags/variable/#assign'
    }

  },
  break: {
    type: 'iteration',
    singleton: true,
    parents: [
      'for',
      'tablerow'
    ],
    description: 'Causes the loop to stop iterating when it encounters the break tag.',
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/tags/iteration/#break'
    }

  },
  capture: {
    type: 'variable',
    filters: false,
    description: 'Captures the string inside of the opening and closing tags and assigns it to a variable. Variables created through `{% capture %}` are strings.',
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/tags/variable/#capture'
    }
  },
  case: {
    type: 'control',
    description: 'Creates a switch statement to compare a variable with different values. case initializes the switch statement, and when compares its values.',
    children: [ 'when', 'else' ],
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/tags/control-flow/#case'
    }

  },
  comment: {
    type: 'comment',
    description: 'Allows you to leave un-rendered code inside a Liquid template. Any text within the opening and closing comment blocks will not be output, and any Liquid code within will not be executed.',
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/tags/comment/'
    }

  },
  continue: {
    type: 'iteration',
    description: 'Causes the loop to skip the current iteration when it encounters the continue tag.',
    singleton: true,
    parents: [
      'for',
      'tablerow'
    ],
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/tags/iteration/#continue'
    }

  },
  cycle: {
    type: 'iteration',
    singleton: true,
    description: 'Loops through a group of strings and outputs them in the order that they were passed as parameters. Each time cycle is called, the next string that was passed as a parameter is output.',
    parents: [ 'for', 'tablerow' ],
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/tags/iteration/#cycle'
    }

  },
  decrement: {
    description: 'Creates a new number variable, and decreases its value by one every time it is called. The initial value is -1.',
    singleton: true,
    filters: false,
    type: 'variable',
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/tags/variable/#decrement'
    }

  },
  echo: {
    type: 'output',
    description: 'Using the echo tag is the same as wrapping an expression in curly brackets ({{ and }}). However, unlike the curly bracket method, you can use the echo tag inside liquid tags.',
    singleton: true,
    filters: true,
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/tags/template/#echo'
    }
  },
  else: {
    type: 'control',
    description: 'Add condition within an if or unless block.',
    singleton: true,
    parents: [
      'if',
      'elsif',
      'case',
      'unless',
      'when',
      'for'
    ],
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/tags/control-flow/#unless'
    }

  },
  elsif: {
    description: 'Adds more conditions within an if or unless block.',
    singleton: true,
    type: 'control',
    parents: [ 'if' ],
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/tags/control-flow/#unless'
    }

  },
  for: {
    description: 'Repeatedly executes a block of code.',
    type: 'iteration',
    snippet: '$1 in $2',
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/tags/iteration/#for'
    },
    parameters: {
      offset: {
        type: 'number',
        description: 'Begins the loop at the specified index'
      },
      limit: {
        type: 'number',
        description: 'Limits the loop to the specified number of iterations'
      },
      reversed: {
        type: 'keyword',
        description: 'Reverses the order of the loop. Note that this flag’s spelling is different from the filter reverse'
      }
    }
  },
  if: {
    description: 'Executes a block of code only if a certain condition is met.',
    type: 'control',
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/tags/control-flow/#if'
    }

  },
  increment: {
    description: 'Creates a new number variable, and increases its value by one every time it is called. The initial value is 0.',
    singleton: true,
    filters: false,
    type: 'variable',
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/tags/variable/#increment'
    }

  },
  liquid: {
    description: 'Encloses multiple tags within one set of delimiters, to allow writing Liquid logic more concisely.',
    type: 'unknown',
    singleton: true,
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/tags/template/#liquid'
    }
  },
  raw: {
    type: 'raw',
    description: 'Allows output of Liquid code on a page without being parsed.',
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/tags/raw/'
    }
  },
  render: {
    description: 'Insert the rendered content of another template within the current template.\n\nThe code within the rendered template does not automatically have access to the variables assigned using variable tags within the parent template. Similarly, variables assigned within the rendered template cannot be accessed by code in any other template.',
    snippet: "'$1'",
    filters: false,
    singleton: true,
    type: 'import',
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/tags/template/#render'
    }

  },
  tablerow: {
    description: 'Generates an HTML `<table>`. Must be wrapped in an opening `<table>` and closing `</table>` HTML tags.',
    type: 'iteration',
    parameters: {
      cols: {
        type: 'number',
        description: 'Defines how many columns the tables should have.'
      },
      limit: {
        type: 'number',
        description: 'Exits the tablerow loop after a specific index.'
      },
      offset: {
        type: 'number',
        description: 'Starts the tablerow loop after a specific index.'
      }
    }
    ,
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/tags/iteration/#tablerow'
    }

  },
  unless: {
    description: 'The opposite of if – executes a block of code only if a certain condition is not met.',
    type: 'control',
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/tags/control-flow/#unless'
    }

  },
  when: {
    description: 'Define the various conditions set by the "{% case %}" tag',
    singleton: true,
    type: 'control',
    parents: [ 'case' ],
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/tags/control-flow/#casewhen'
    }

  }
};
