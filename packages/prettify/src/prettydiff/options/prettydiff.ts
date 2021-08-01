
import { prettydiff } from '../parser/prettydiff';

export default (function options_init () {
  const optionDef = {
    attributeSort: {
      api: 'any'
      , default: false
      , definition: 'Alphanumerically sort markup attributes. Attribute sorting is ignored on tags that contain attributes template attributes.'
      , label: 'Sort Attributes'
      , lexer: 'markup'
      , mode: 'any'
      , type: 'boolean'
    }
    , attributeSortList: {
      api: 'any'
      , default: ''
      , definition: "A comma separated list of attribute names. Attributes will be sorted according to this list and then alphanumerically. This option requires 'attributeSort' have a value of true."
      , label: 'Sort Attribute List'
      , lexer: 'markup'
      , mode: 'any'
      , type: 'string'
    }
    , braceNewline: {
      api: 'any'
      , default: false
      , definition: 'If true an empty line will be inserted after opening curly braceAllman and before clo' +
          'sing curly braceAllman.'
      , label: 'Brace Lines'
      , lexer: 'script'
      , mode: 'beautify'
      , type: 'boolean'
    }
    , bracePadding: {
      api: 'any'
      , default: false
      , definition: 'Inserts a space after the start of a container and before the end of the contain' +
          'er if the contents of that container are not indented; such as: conditions, func' +
          'tion arguments, and escaped sequences of template strings.'
      , label: 'Brace Padding'
      , lexer: 'script'
      , mode: 'beautify'
      , type: 'boolean'
    }
    , braceStyle: {
      api: 'any'
      , default: 'none'
      , definition: "Emulates JSBeautify's braceStyle option using existing Pretty Diff options."
      , label: 'Brace Style'
      , lexer: 'script'
      , mode: 'beautify'
      , type: 'string'
      , values: {
        collapse: "Sets options.objectIndent to 'indent' and options.neverflatten to true."
        , 'collapse-preserve-inline': "Sets options.bracepadding to true and options.objectIndent to 'inline'."
        , expand: "Sets options.braceAllman to true, options.objectIndent to 'indent', and options.never" +
            'flatten to true.'
        , none: 'Ignores this option'
      }
    }
    , braceAllman: {
      api: 'any'
      , default: false
      , definition: 'Determines if opening curly braceAllman will exist on the same line as their conditio' +
          'n or be forced onto a new line. (Allman style indentation).'
      , label: 'Style of Indent'
      , lexer: 'script'
      , mode: 'beautify'
      , type: 'boolean'
    }
    , caseSpace: {
      api: 'any'
      , default: false
      , definition: "If the colon separating a case's expression (of a switch/case block) from its statement should be followed by a space instead of indentation, thereby keeping the case on a single line of code."
      , label: 'Space Following Case'
      , lexer: 'script'
      , mode: 'beautify'
      , type: 'boolean'
    }
    , commentNewline: {
      api: 'any'
      , default: false
      , definition: 'If a blank new line should be forced above comments.'
      , label: 'Force an Empty Line Above Comments'
      , lexer: 'markup'
      , mode: 'beautify'
      , type: 'boolean'
    }
    , comments: {
      api: 'any'
      , default: false
      , definition: 'This will determine whether comments should always start at position 0 of each l' +
          'ine or if comments should be indented according to the code.'
      , label: 'Indent Comments'
      , lexer: 'any'
      , mode: 'beautify'
      , type: 'boolean'
    }
    , compressCSS: {
      api: 'any'
      , default: false
      , definition: 'If CSS should be beautified in a style where the properties and values are minif' +
          'ed for faster reading of selectors.'
      , label: 'Compressed CSS'
      , lexer: 'style'
      , mode: 'beautify'
      , type: 'boolean'
    }
    , config: {
      api: 'node'
      , default: ''
      , definition: "By default Pretty Diff will look into the directory structure contain the value of option 'source' for a file named `.prettydiffrc` for saved option settings. This option allows a user to specify any file at any location in the local file system for configuration settings. A value of 'none' tells the application to bypass reading any configuration file."
      , label: 'Custom Config File Location'
      , lexer: 'any'
      , mode: 'any'
      , type: 'string'
    }
    , content: {
      api: 'any'
      , default: false
      , definition: "This will normalize all string content to 'text' so as to eliminate some differe" +
          'nces from the output.'
      , label: 'Ignore Content'
      , lexer: 'any'
      , mode: 'diff'
      , type: 'boolean'
    }
    , attemptCorrection: {
      api: 'any'
      , default: false
      , definition: 'Automatically correct some sloppiness in code.'
      , label: 'Fix Sloppy Code'
      , lexer: 'any'
      , mode: 'any'
      , type: 'boolean'
    }
    , crlf: {
      api: 'any'
      , default: false
      , definition: 'If line termination should be Windows (CRLF) format.  Unix (LF) format is the de' +
          'fault.'
      , label: 'Line Termination'
      , lexer: 'any'
      , mode: 'any'
      , type: 'boolean'
    }
    , classPadding: {
      api: 'any'
      , default: false
      , definition: 'Inserts new line characters between every CSS code block.'
      , label: 'Insert Empty Lines'
      , lexer: 'style'
      , mode: 'beautify'
      , type: 'boolean'
    }
    , diff: {
      api: 'any'
      , default: ''
      , definition: "The code sample to be compared to 'source' option.  This is required if mode is " +
          "'" + "diff'."
      , label: 'Code to Compare'
      , lexer: 'any'
      , mode: 'diff'
      , type: 'string'
    }
    , elseNewline: {
      api: 'any'
      , default: false
      , definition: "If elseNewline is true then the keyword 'else' is forced onto a new line."
      , label: 'Else On New Line'
      , lexer: 'script'
      , mode: 'beautify'
      , type: 'boolean'
    }
    , endComma: {
      api: 'any'
      , default: 'never'
      , definition: 'If there should be a trailing comma in arrays and objects. Value "multiline" o' +
          'nly applies to modes beautify and diff.'
      , label: 'Trailing Comma'
      , lexer: 'script'
      , mode: 'beautify'
      , type: 'string'
      , values: {
        always: 'Always ensure there is a tailing comma'
        , never: 'Remove trailing commas'
        , none: 'Ignore this option'
      }
    }
    , endQuietly: {
      api: 'node'
      , default: 'default'
      , definition: 'A node only option to determine if terminal summary data should be logged to the' +
          ' console.'
      , label: 'Log Summary to Console'
      , lexer: 'any'
      , mode: 'any'
      , type: 'string'
      , values: {
        default: 'Default minimal summary'
        , log: 'Verbose logging'
        , quiet: 'No extraneous logging'
      }
    }
    , forceAttribute: {
      api: 'any'
      , default: false
      , definition: 'If all markup attributes should be indented each onto their own line.'
      , label: 'Force Indentation of All Attributes'
      , lexer: 'markup'
      , mode: 'beautify'
      , type: 'boolean'
    }
    , forceIndent: {
      api: 'any'
      , default: false
      , definition: 'Will force indentation upon all content and tags without regard for the creation' +
          ' of new text nodes.'
      , label: 'Force Indentation of All Content'
      , lexer: 'markup'
      , mode: 'beautify'
      , type: 'boolean'
    }
    , arrayFormat: {
      api: 'any'
      , default: 'default'
      , definition: 'Determines if all array indexes should be indented, never indented, or left to t' +
          'he default.'
      , label: 'Formatting Arrays'
      , lexer: 'script'
      , mode: 'beautify'
      , type: 'string'
      , values: {
        default: 'Default formatting'
        , indent: 'Always indent each index of an array'
        , inline: 'Ensure all array indexes appear on a single line'
      }
    }
    , objectIndent: {
      api: 'any'
      , default: 'default'
      , definition: 'Determines if all object keys should be indented, never indented, or left to the' +
          ' default.'
      , label: 'Formatting Objects'
      , lexer: 'script'
      , mode: 'beautify'
      , type: 'string'
      , values: {
        default: 'Default formatting'
        , indent: 'Always indent each key/value pair'
        , inline: 'Ensure all key/value pairs appear on the same single line'
      }
    }
    , functionNameSpace: {
      api: 'any'
      , default: false
      , definition: 'If a space should follow a JavaScript function name.'
      , label: 'Space After Function Name'
      , lexer: 'script'
      , mode: 'beautify'
      , type: 'boolean'
    }
    , help: {
      api: 'node'
      , default: 80
      , definition: 'A node only option to print documentation to the console. The value determines w' +
          'here to wrap text.'
      , label: 'Help Wrapping Limit'
      , lexer: 'any'
      , mode: 'any'
      , type: 'number'
    }
    , indentChar: {
      api: 'any'
      , default: ' '
      , definition: 'The string characters to comprise a single indentation. Any string combination i' +
          's accepted.'
      , label: 'Indentation Characters'
      , lexer: 'any'
      , mode: 'beautify'
      , type: 'string'
    }
    , indentLevel: {
      api: 'any'
      , default: 0
      , definition: 'How much indentation padding should be applied to beautification? This option is' +
          ' internally used for code that requires switching between libraries.'
      , label: 'Indentation Padding'
      , lexer: 'any'
      , mode: 'beautify'
      , type: 'number'
    }
    , indentSize: {
      api: 'any'
      , default: 4
      , definition: "The number of 'indentChar' values to comprise a single indentation."
      , label: 'Indent Size'
      , lexer: 'any'
      , mode: 'beautify'
      , type: 'number'
    }
    , language: {
      api: 'any'
      , default: 'auto'
      , definition: "The lowercase single word common name of the source code's programming language. The value 'auto' imposes language and lexer auto-detection, which ignores deliberately specified lexer values. The value 'text' is converted to 'auto' if options 'mode' is not 'diff'. Value 'text' allows literal comparisons."
      , label: 'Language'
      , lexer: 'any'
      , mode: 'any'
      , type: 'string'
    }
    , languageDefault: {
      api: 'any'
      , default: 'text'
      , definition: "The fallback option if option 'lang' is set to 'auto' and a language cannot be d" +
          'etected.'
      , label: 'Language Auto-Detection Default'
      , lexer: 'any'
      , mode: 'any'
      , type: 'string'
    }
    , languageName: {
      api: 'any'
      , default: 'JavaScript'
      , definition: "The formatted proper name of the code sample's language for use in reports read " +
          'by people.'
      , label: "Formatted Name of the Code's Language"
      , lexer: 'any'
      , mode: 'any'
      , type: 'string'
    }
    , lexer: {
      api: 'any'
      , default: 'auto'
      , definition: 'This option determines which sets of rules to use in the language parser. If opt' +
          "ion 'language' has a value of 'auto', which is the default value, this option is" +
          " ignored. The value 'text' is converted to 'auto' if options 'mode' is not 'diff'. Value 'text' allows literal comparisons."
      , label: 'Parsing Lexer'
      , lexer: 'any'
      , mode: 'any'
      , type: 'string'
      , values: {
        auto: "The value 'auto' imposes language and lexer auto-detection, which ignores deliberately specified language values."
        , markup: 'parses languages like XML and HTML'
        , script: 'parses languages with a C style syntax, such as JavaScript'
        , style: 'parses CSS like languages'
      }
    }
    , methodChain: {
      api: 'any'
      , default: 3
      , definition: 'When to break consecutively chained methods and properties onto separate lines. ' +
          'A negative value disables this option. A value of 0 ensures method chains are ne' +
          'ver broken.'
      , label: 'Method Chains'
      , lexer: 'script'
      , mode: 'beautify'
      , type: 'number'
    }
    , mode: {
      api: 'any'
      , default: 'diff'
      , definition: 'The operation to be performed.'
      , label: 'Mode'
      , lexer: 'any'
      , mode: 'any'
      , type: 'string'
      , values: {
        beautify: 'beautifies code and returns a string'
        , diff: 'returns either command line list of differences or an HTML report'
        , parse: "using option 'parseFormat' returns an object with shallow arrays, a multidimensi" +
            'onal array, or an HTML report'
      }
    }
    , neverFlatten: {
      api: 'any'
      , default: false
      , definition: 'If destructured lists in script should never be flattend.'
      , label: 'Never Flatten Destructured Lists'
      , lexer: 'script'
      , mode: 'beautify'
      , type: 'boolean'
    }
    , endNewline: {
      api: 'any'
      , default: false
      , definition: 'Insert an empty line at the end of output.'
      , label: 'New Line at End of Code'
      , lexer: 'any'
      , mode: 'any'
      , type: 'boolean'
    }
    , noCaseIndent: {
      api: 'any'
      , default: false
      , definition: 'If a case statement should receive the same indentation as the containing switch' +
          ' block.'
      , label: 'Case Indentation'
      , lexer: 'script'
      , mode: 'beautify'
      , type: 'boolean'
    }
    , noLeadZero: {
      api: 'any'
      , default: false
      , definition: 'Whether leading 0s in CSS values immediately preceding a decimal should be remo' +
          'ved or prevented.'
      , label: 'Leading 0s'
      , lexer: 'style'
      , mode: 'any'
      , type: 'boolean'
    }
    , noSemicolon: {
      api: 'any'
      , default: false
      , definition: "Removes semicolons that would be inserted by ASI. This option is in conflict with option 'correct' and takes precedence over conflicting features. Use of this option is a possible security/stability risk."
      , label: 'No Semicolons'
      , lexer: 'script'
      , mode: 'beautify'
      , type: 'boolean'
    }
    , objectSort: {
      api: 'any'
      , default: false
      , definition: 'Sorts markup attributes and properties by key name in script and style.'
      , label: 'Object/Attribute Sort'
      , lexer: 'any'
      , mode: 'beautify'
      , type: 'boolean'
    }
    , output: {
      api: 'node'
      , default: ''
      , definition: 'A file path for which to write output. If this option is not specified output will be printed to the shell.'
      , label: 'Output Location'
      , lexer: 'any'
      , mode: 'any'
      , type: 'string'
    }
    , parseFormat: {
      api: 'any'
      , default: 'parallel'
      , definition: "Determines the output format for 'parse' mode."
      , label: 'Parse Format'
      , lexer: 'any'
      , mode: 'parse'
      , type: 'string'
      , values: {
        htmltable: "generates the 'table' type output for the DOM but escapes the HTML tags for rend" +
            'ering as HTML code in a HTML tool'
        , parallel: 'returns an object containing series of parallel arrays'
        , sequential: 'returns an array where each index is a child object containing the parsed token' +
            ' and all descriptive data'
        , table: 'generates a colorful grid of output for either the dom or command line interface'
      }
    }
    , parseSpace: {
      api: 'any'
      , default: false
      , definition: 'Whether whitespace tokens should be included in markup parse output.'
      , label: 'Retain White Space Tokens in Parse Output'
      , lexer: 'markup'
      , mode: 'parse'
      , type: 'boolean'
    }
    , preserveLine: {
      api: 'any'
      , default: 0
      , definition: 'The maximum number of consecutive empty lines to retain.'
      , label: 'Preserve Consecutive New Lines'
      , lexer: 'any'
      , mode: 'beautify'
      , type: 'number'
    }
    , preserveComment: {
      api: 'any'
      , default: false
      , definition: 'Prevent comment reformatting due to option wrap.'
      , label: 'Eliminate Word Wrap Upon Comments'
      , lexer: 'any'
      , mode: 'beautify'
      , type: 'boolean'
    }
    , preserveText: {
      api: 'any'
      , default: false
      , definition: 'If text in the provided markup code should be preserved exactly as provided. Thi' +
          's option eliminates beautification and wrapping of text content.'
      , label: 'Preserve Markup Text White Space'
      , lexer: 'markup'
      , mode: 'any'
      , type: 'boolean'
    }
    , quote: {
      api: 'any'
      , default: false
      , definition: "If true and mode is 'diff' then all single quote characters will be replaced by " +
          'double quote characters in both the source and diff file input so as to eliminat' +
          'e some differences from the diff report HTML output.'
      , label: 'Normalize Quotes'
      , lexer: 'any'
      , mode: 'diff'
      , type: 'boolean'
    }
    , quoteConvert: {
      api: 'any'
      , default: 'none'
      , definition: 'If the quotes of script strings or markup attributes should be converted to sing' +
          'le quotes or double quotes.'
      , label: 'Indent Size'
      , lexer: 'any'
      , mode: 'any'
      , type: 'string'
      , values: {
        double: 'Converts single quotes to double quotes'
        , none: 'Ignores this option'
        , single: 'Converts double quotes to single quotes'
      }
    }
    , selector_list: {
      api: 'any'
      , default: false
      , definition: 'If comma separated CSS selectors should present on a single line of code.'
      , label: 'Indent Size'
      , lexer: 'style'
      , mode: 'beautify'
      , type: 'boolean'
    }
    , semicolon: {
      api: 'any'
      , default: false
      , definition: "If true and mode is 'diff' and lang is 'javascript' all semicolon characters tha" +
          't immediately precede any white space containing a new line character will be re' +
          'moved so as to eliminate some differences from the code comparison.'
      , label: 'Indent Size'
      , lexer: 'script'
      , mode: 'diff'
      , type: 'boolean'
    }
    , source: {
      api: 'any'
      , default: ''
      , definition: 'The source code or location for interpretation. This option is required for all ' +
          'modes.'
      , label: 'Source Sample'
      , lexer: 'any'
      , mode: 'any'
      , type: 'string'
    }
    , space: {
      api: 'any'
      , default: true
      , definition: 'Inserts a space following the function keyword for anonymous functions.'
      , label: 'Function Space'
      , lexer: 'script'
      , mode: 'beautify'
      , type: 'boolean'
    }
    , selfCloseSpace: {
      api: 'any'
      , default: false
      , definition: "Markup self-closing tags end will end with ' />' instead of '/>'."
      , label: 'Close Markup Self-Closing Tags with a Space'
      , lexer: 'markup'
      , mode: 'beautify'
      , type: 'boolean'
    }
    , styleguide: {
      api: 'any'
      , default: 'none'
      , definition: 'Provides a collection of option presets to easily conform to popular JavaScript ' +
          'style guides.'
      , label: 'Script Styleguide'
      , lexer: 'script'
      , mode: 'beautify'
      , type: 'string'
      , values: {
        airbnb: 'https://github.com/airbnb/javascript'
        , crockford: 'http://jslint.com/'
        , google: 'https://google.github.io/styleguide/jsguide.html'
        , jquery: 'https://contribute.jquery.org/style-guide/js/'
        , jslint: 'http://jslint.com/'
        , mediawiki: 'https://www.mediawiki.org/wiki/Manual:Coding_conventions/JavaScript'
        , mrdoob: "https://github.com/mrdoob/three.js/wiki/Mr.doob's-Code-Style%E2%84%A2"
        , none: 'Ignores this option'
        , semistandard: 'https://github.com/Flet/semistandard'
        , standard: 'https://standardjs.com/'
        , yandex: 'https://github.com/ymaps/codestyle/blob/master/javascript.md'
      }
    }
    , tagMerge: {
      api: 'any'
      , default: false
      , definition: 'Allows immediately adjacement start and end markup tags of the same name to be c' +
          'ombined into a single self-closing tag.'
      , label: 'Merge Adjacent Start and End tags'
      , lexer: 'markup'
      , mode: 'any'
      , type: 'boolean'
    }
    , tagSort: {
      api: 'any'
      , default: false
      , definition: 'Sort child items of each respective markup parent element.'
      , label: 'Sort Markup Child Items'
      , lexer: 'markup'
      , mode: 'any'
      , type: 'boolean'
    }
    , ternaryLine: {
      api: 'any'
      , default: false
      , definition: 'If ternary operators in JavaScript ? and : should remain on the same line.'
      , label: 'Keep Ternary Statements On One Line'
      , lexer: 'script'
      , mode: 'beautify'
      , type: 'boolean'
    }
    , preserveAttribute: {
      api: 'any'
      , default: false
      , definition: 'If markup tags should have their insides preserved. This option is only available to markup and does not support child tokens that require a different lexer.'
      , label: 'Markup Tag Preservation'
      , lexer: 'markup'
      , mode: 'any'
      , type: 'boolean'
    }
    , variableList: {
      api: 'any'
      , default: 'none'
      , definition: 'If consecutive JavaScript variables should be merged into a comma separated list' +
          ' or if variables in a list should be separated.'
      , label: 'Variable Declaration Lists'
      , lexer: 'script'
      , mode: 'any'
      , type: 'string'
      , values: {
        each: 'Ensurce each reference is a single declaration statement.'
        , list: 'Ensure consecutive declarations are a comma separated list.'
        , none: 'Ignores this option.'
      }
    }
    , version: {
      api: 'node'
      , default: false
      , definition: 'A Node.js only option to write the version information to the console.'
      , label: 'Version'
      , lexer: 'any'
      , mode: 'any'
      , type: 'boolean'
    }
    , vertical: {
      api: 'any'
      , default: false
      , definition: 'If lists of assignments and properties should be vertically aligned. This option' +
          ' is not used with the markup lexer.'
      , label: 'Vertical Alignment'
      , lexer: 'any'
      , mode: 'beautify'
      , type: 'boolean'
    }
    , wrap: {
      api: 'any'
      , default: 0
      , definition: 'Character width limit before applying word wrap. A 0 value disables this option.' +
          ' A negative value concatenates script strings.'
      , label: 'Wrap'
      , lexer: 'any'
      , mode: 'any'
      , type: 'number'
    }
  };

  // @ts-ignore
  prettydiff.api.optionDef = optionDef;
}());
