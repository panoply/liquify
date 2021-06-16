import { ITag } from '@liquify/liquid-language-specs';
import { TokenType } from 'lexical/tokens';
import { TokenContext } from 'lexical/context';
import { NodeType } from 'lexical/types';
import { NodeLanguage } from 'lexical/language';
import { NodeKind } from 'lexical/kind';
import { ParseError } from 'lexical/errors';
import { Config as config } from 'config';
import { errors } from 'parser/errors';
import { IAST } from 'tree/ast';
import { INode } from 'tree/node';
// import { embedded } from 'tree/model';
import * as regex from 'lexical/expressions';
import * as specs from 'parser/specs';
import * as context from 'tree/context';
import * as stream from 'parser/stream';
import * as scanner from 'parser/scanner';

/**
 * Parser
 *
 * Liquid/HTML parser function which constructs and tokenized syntaxes.
 *
 * @param {Parser.AST} document
 */
export function parse (document: IAST): IAST {

  /**
   * Token Index
   *
   * Represents the token type returned by the scanner.
   * Up until EOS (End of String) enum is returned.
   */
  let token: number = scanner.scan();

  /**
   * State Reference
   *
   * Holds a state value that can interchange between
   * parse execution. Generally points an enum value
   * to reference between cases.
   */
  let state: number | string;

  /**
   * AST Node Index
   *
   * The current index of a node on the tree. Essentially
   * this is just holding the length of the AST.
   */
  let index: number;

  /**
   * AST Node Instance
   *
   * Holds an instance of the current node being parsed.
   * We construct the data of each node via this letting.
   */
  let node: INode;

  /**
   * Root Node Index
   *
   * Holds the value of a root nodes contains on the AST.
   * Root nodes are pair types which contain children, for
   * example a root node would be a `{% for %}` tag and all
   * decendents of the root hold reference to its AST index.
   */
  let root: number | undefined;

  /**
   * Resets the current parse lettings. We execute this
   * after every node we sucessfully parse.
   */
  const reset = (): void => {
    // RESET LETTINGS
    state = undefined;
    node = undefined;

    // RESET SPECS
    specs.Reset();
    specs.object.Reset();
  };

  while (token !== TokenType.EOS) {
    switch (token) {
      // SPACING
      // -----------------------------------------------------------------
      case TokenType.Whitespace:
        if (config.context && config.whitespace) { context.add(TokenContext.Whitespace); }
        break;
      case TokenType.Newline:
        if (config.context && config.newlines) { context.add(TokenContext.Newline); }
        break;

      // BOOLEAN
      // -----------------------------------------------------------------
      case TokenType.Boolean:
        if (config.context) context.add(TokenContext.Boolean);
        break;

      // NUMBERS
      // -----------------------------------------------------------------
      case TokenType.Integer:
        if (config.context) context.add(TokenContext.Integer);
        break;
      case TokenType.Float:
        if (config.context) context.add(TokenContext.Float);
        break;
      case TokenType.Number:
        if (config.context) context.add(TokenContext.Number);
        break;

      // STRINGS
      // -----------------------------------------------------------------
      case TokenType.String:
        if (config.context) context.add(TokenContext.String);
        break;
      case TokenType.StringSingleQuote:
        if (config.context) context.add(TokenContext.Object);
        break;
      case TokenType.StringDoubleQuote:
        if (config.context) context.add(TokenContext.Object);
        break;

      // PARSE ERROR
      // -----------------------------------------------------------------
      case TokenType.ParseError:

        node.errors.push(
          document.errors.push(
            errors(
              scanner.error,
              document.getRange(),
              stream.offset
            )
          ) - 1
        );

        break;

      // PARSE CANCEL
      // -----------------------------------------------------------------
      case TokenType.ParseCancel:
        break;

      // PARSE SKIP
      // -----------------------------------------------------------------
      case TokenType.ParseSkip:
        if (node) {
          if (!node.singular) {
            scanner.syntactic.list.pop();
            scanner.syntactic.list.pop();
          }

          node = undefined;
        }

        break;

      // DELIMITER OPEN
      // -----------------------------------------------------------------
      case TokenType.DelimiterOpen:
        if (config.context) context.add(TokenContext.OpenTag);
        break;

      // DELIMITER TRIMS
      // -----------------------------------------------------------------
      case TokenType.TrimDashLeft:
        if (config.context) context.add(TokenContext.LeftTrim);
        break;
      case TokenType.TrimDashRight:
        if (config.context) context.add(TokenContext.RightTrim);
        break;

      case TokenType.Separator:
        if (config.context) context.add(TokenContext.Separator);
        break;

      // OUTPUT TAG NAME
      // -----------------------------------------------------------------
      case TokenType.ObjectTag:
      case TokenType.SingularTag:
      case TokenType.Unknown:
      case TokenType.StartTag:

        index = document.nodes.length;

        node = new INode();

        node.type = specs.type;
        node.index = index;
        node.root = typeof root === 'number' ? root : index;
        node.parent = scanner.syntactic.parentNode || index;
        node.offsets.push(scanner.start);

        if (token === TokenType.StartTag) {
          node.singular = false;
          if (typeof root === 'undefined') root = index;
        }

        if (config.context) node.context.push(context.size());

        break;

      // END TAG
      // -----------------------------------------------------------------
      case TokenType.EndTag: {

        // Find hierarch - The parental node
        node = document.nodes[scanner.syntactic.match];

        // console.log(scanner.syntactic.list, node?.name, stream.token)

        // Validate the parent matches the hierarch node
        if (node?.name === stream.token) {

          if (scanner.syntactic.list.length === 0) root = undefined;
          if (config.context) context.add(TokenContext.EndTag);

          node.offsets.push(scanner.start);

          if (config.context) node.context.push(context.size());

          // AST LOGIC
          index = node.index;
          state = TokenType.EndTag;
          break;
        }

        // The endtag is invalid - missing parental hierarch
        // create a new node on the AST representing this invalid node

        node = new INode();
        node.name = stream.token;

        // AST LOGIC
        state = ParseError.InvalidSyntactic;

        // CONTEXT
        if (config.context) {
          context.add(TokenContext.EndTag);
          node.context.push(context.size());
        }

        break;
      }

      // DELIMITER CLOSE
      // -----------------------------------------------------------------
      case TokenType.DelimiterClose:
      case TokenType.DelimiterEnder:

        node.offsets.push(stream.offset);
        node.token.push(document.getText(scanner.start, stream.offset));
        node.range.end = document.getRange().end;

        if (config.context) context.add(TokenContext.CloseTag);

        // ONLY START OR SINGULAR TYPE TAGS ARE PUSHED ONTO AST
        if (token === TokenType.DelimiterClose) document.nodes.push(node);

        if (state === ParseError.InvalidSyntactic) {
          node.index = document.nodes.length;
          node.errors.push(
            document.errors.push(
              errors(
                ParseError.InvalidSyntactic,
                node.range,
                stream.offset
              )
            ) - 1
          );
        }

        reset();

        break;

      // VARIABLE
      // -----------------------------------------------------------------
      case TokenType.Variable:
        if (config.context) context.add(TokenContext.Variable);

        break;

      case TokenType.VariableIdentifier:
        if (config.context) context.add(TokenContext.Identifier);

        node.name = stream.token;
        node.type = specs.type;

        if (!(specs.cursor as ITag)?.singular) {
          scanner.syntactic.list.push(node.name, index);
        }

        break;

      case TokenType.VariableKeyword:
        if (config.context) context.add(TokenContext.Keyword);

        document.variables[node.index] = { label: stream.token };

        if (document.nodes[node.index - 1]?.type === NodeType.comment) {
          document.variables[node.index].description =
            document.nodes[node.index - 1].content;
        }

        break;

      case TokenType.VariableOperator:
        if (config.context) context.add(TokenContext.Operator);
        break;
      case TokenType.VariableValue:
        if (config.context) context.add(TokenContext.Assignment);
        break;

      // OBJECT NAME
      // -----------------------------------------------------------------
      case TokenType.Object:
        if (config.context) context.add(TokenContext.Object);

        // SAVE OFFSET
        specs.object.Start(stream.offset);

        node.objects = {
          ...node.objects,
          [specs.object.offset]: [ stream.token ]
        };

        break;

      case TokenType.ObjectBracketNotationOpen:
        if (config.context) context.add(TokenContext.OpenBracket);
        break;
      case TokenType.ObjectBracketNotationClose:
        if (config.context) context.add(TokenContext.CloseBracket);
        break;
      case TokenType.ObjectProperty:
        if (config.context) context.add(TokenContext.Property);

        // VALIDATE PROPERTY
        if (scanner.error === ParseError.UnknownProperty) {
          node.errors.push(
            document.errors.push(
              errors(
                scanner.error,
                document.getRange(),
                stream.offset
              )
            ) - 1
          );
        }

        // PUSH NEXT PROPERTY
        node.objects[specs.object.offset].push(stream.token);
        node.objects[stream.offset + 1] = specs.object.offset;

        // SAVE OFFSET
        specs.object.Start(stream.offset);

        break;
      case TokenType.ObjectPropertyString:
        if (config.context) context.add(TokenContext.Property);

        // PUSH NEXT PROPERTY
        node.objects[specs.object.offset].push(stream.token);
        node.objects[stream.offset + 1] = specs.object.offset;

        // SAVE OFFSET
        specs.object.Start(stream.offset);

        break;
      case TokenType.ObjectPropertyNumber:
        if (config.context) context.add(TokenContext.Integer);
        break;
      case TokenType.ObjectPropertyObject:
        if (config.context) context.add(TokenContext.PropertyObject);
        break;
      case TokenType.ObjectDotNotation:
        if (config.context) context.add(TokenContext.Separator);
        break;

      // BASIC TAG NAME
      // -----------------------------------------------------------------
      case TokenType.LiquidTagName:
        if (config.context) context.add(TokenContext.Identifier);

        console.log(node);

        node.name = stream.token;

        if (!(specs.cursor as ITag)?.singular) {
          // ASSERT HIERARCH
          scanner.syntactic.list.push(node.name, index);
        }

        break;

      // EMBEDDED LANGUAGE TAG
      // -----------------------------------------------------------------
      case TokenType.Embedded:
        node.name = stream.token;
        node.type = specs.type;
        node.language = NodeLanguage[(specs.cursor as ITag).language];

        // ASSERT HIERARCH
        scanner.syntactic.list.push(node.name, index);
        document.embeds.push(index);

        if (config.context) context.add(TokenContext.Identifier);

        break;

      // COMMENT TAG
      // -----------------------------------------------------------------
      case TokenType.Comment:
        node.name = stream.token;
        node.type = specs.type;

        // ASSERT HIERARCH
        scanner.syntactic.list.push(node.name, index);

        document.comments.push(index);

        if (config.context) context.add(TokenContext.Identifier);

        break;

      // CONTROL TAG
      // -----------------------------------------------------------------
      case TokenType.Control:
        node.name = stream.token;
        node.type = specs.type;

        if (!(specs.cursor as ITag).singular) {
          scanner.syntactic.list.push(node.name, index);
        }

        if (config.context) context.add(TokenContext.Identifier);

        break;

      case TokenType.ControlCondition:
        if (config.context) context.add(TokenContext.Condition);
        break;
      case TokenType.ControlOperator:
        if (config.context) context.add(TokenContext.Operator);
        break;

      // FILTERS
      // -----------------------------------------------------------------
      case TokenType.Filter:
        if (config.context) context.add(TokenContext.Separator);
        break;
      case TokenType.FilterIdentifier:
        if (config.context) context.add(TokenContext.Keyword);
        node.filters = {
          ...node.filters,
          [stream.offset + stream.token.length]: stream.token
        };
        break;
      case TokenType.FilterOperator:
        if (config.context) context.add(TokenContext.Operator);
        break;
      case TokenType.FilterArgument:
        if (config.context) context.add(TokenContext.String);
        break;
      case TokenType.FilterArgumentNumber:
        if (config.context) context.add(TokenContext.Integer);
        break;
      case TokenType.FilterParameter:
        if (config.context) context.add(TokenContext.Parameter);
        break;

      // ITERATION TAG
      // -----------------------------------------------------------------
      case TokenType.Iteration:
        node.name = stream.token;
        node.type = specs.type;

        if (!(specs.cursor as ITag).singular) {
          scanner.syntactic.list.push(node.name, index);
        }

        if (config.context) context.add(TokenContext.Identifier);

        break;
      case TokenType.IterationIteree:
        if (config.context) context.add(TokenContext.Iteree);
        break;
      case TokenType.IterationOperator:
        if (config.context) context.add(TokenContext.Operator);
        break;
      case TokenType.IterationArray:
        if (config.context) context.add(TokenContext.Array);
        break;
      case TokenType.IterationParameter:
        if (config.context) context.add(TokenContext.Keyword);
        break;
      case TokenType.IterationParameterValue:
        if (config.context) context.add(TokenContext.Integer);
        break;

      // HTML START TAG OPEN
      // -----------------------------------------------------------------
      case TokenType.HTMLStartTagOpen:
        if (config.context) context.add(TokenContext.OpenTag);
        break;

      case TokenType.HTMLTagName:

        index = document.nodes.length;

        node = new INode();

        node.name = stream.token;
        node.index = index;
        node.type = NodeType.embedded;
        node.kind = NodeKind.HTML;
        node.singular = false;
        node.root = typeof root === 'number' ? root : index;
        node.parent = scanner.syntactic.parentNode || index;
        node.offsets.push(scanner.start);

        if (regex.HTMLScriptEmbed.test(stream.token)) {
          node.language = NodeLanguage.javascript;
        }

        if (regex.HTMLStyleEmbed.test(stream.token)) {
          node.language = NodeLanguage.css;
        }

        scanner.syntactic.list.push(node.name, node.index);

        if (config.context) {
          node.context.push(context.size());
          context.add(TokenContext.Identifier);
        }

        break;

      // HTML ATTRIBUTE
      // -----------------------------------------------------------------
      case TokenType.HTMLAttributeName:

        if (config.context) context.add(TokenContext.Attribute);

        state = stream.token;
        node.attributes[state] = null;

        if (state === 'src') node.type = NodeType.import;

        break;

      case TokenType.HTMLOperatorValue:
        if (config.context) context.add(TokenContext.Operator);
        break;

      case TokenType.HTMLAttributeValue:

        if (config.context) context.add(TokenContext.String);

        if (regex.HTMLAttrJS.test(stream.token)) {
          node.language = NodeLanguage.javascript;
        }

        if (regex.HTMLAttrJSON.test(stream.token)) {
          node.language = NodeLanguage.json;
        }

        node.attributes[state] = stream.token;
        state = undefined;

        break;

      case TokenType.HTMLEndTag:

        // Find hierarch - The parental node
        node = document.nodes[scanner.syntactic.match];

        // console.log(node);
        // Validate the parent matches the hierarch node
        if (node?.name === stream.token) {
          // CONTEXT
          if (config.context) context.add(TokenContext.EndTag);

          node.offsets.push(scanner.start);

          if (config.context) node.context.push(context.size());

          // AST LOGIC
          index = node.index;

          break;
        }

        break;

      // HTML START TAG OPEN
      // -----------------------------------------------------------------
      case TokenType.HTMLEndTagClose:
      case TokenType.HTMLEndCommentTag:
      case TokenType.HTMLStartTagClose:

        if (!node) break;

        node.offsets.push(stream.offset);
        node.token.push(document.getText(scanner.start, stream.offset));
        node.range.end = document.getRange().end;

        // CONTEXT
        if (config.context) context.add(TokenContext.CloseTag);

        // ADD ONLY START BASIC TAGS TO AST
        if (token !== TokenType.HTMLEndTagClose) {
          // node.language = spec.associates.match(
          //   node.name,
          //   Object.values(node.attributes)
          // );
          node.index = document.nodes.length;

          document.embeds.push(node.index);
          document.nodes.push(node);

        } else {

          // embedded(node);

        }

        reset();

        break;
    }

    token = scanner.scan();

  }

  scanner.syntactic.hierarch(document);

  return document;
}
