
import type {
  Options,
  GlobalOptions,
  MarkupOptions,
  JSONOptions,
  ScriptOptions,
  StyleOptions
} from '@liquify/prettify';

import type { State } from './types';
import { object } from '../../utilities/helpers';

export function state (): State {

  return object<State>({
    version: '0.1.1-beta-1',
    loading: false,
    open: 'markup.liquid',
    error: '',
    rules: object<{
      global: GlobalOptions,
      liquid: Options['liquid'],
      markup: MarkupOptions,
      script: ScriptOptions,
      style: StyleOptions,
      json: JSONOptions
    }>({

      global: {
        indentSize: 2,
        indentChar: ' ',
        indentLevel: 0,
        wrap: 0,
        crlf: false,
        endNewline: false,
        language: 'text',
        languageName: 'Plain Text',
        lexer: 'auto',
        mode: 'beautify',
        preserveLine: 2
      },
      liquid: object<Options['liquid']>(
        {
          commentIndent: true,
          commentNewline: true,
          correct: false,
          delimiterTrims: 'preserve',
          ignoreTagList: [],
          lineBreakSeparator: 'before',
          normalizeSpacing: true,
          preserveComment: false,
          quoteConvert: 'single',
          valueForce: 'intent'
        }
      ),
      markup: object<Options['markup']>(
        {
          attributeCasing: 'preserve',
          correct: false,
          forceLeadAttribute: false,
          attributeSort: false,
          attributeSortList: [],
          commentNewline: false,
          commentIndent: false,
          ignoreScripts: true,
          ignoreStyles: false,
          preserveComment: false,
          forceAttribute: false,
          forceIndent: false,
          preserveAttributes: false,
          preserveText: true,
          quoteConvert: 'double',
          selfCloseSpace: false
        }
      ),
      style: object<Options['style']>(
        {
          atRuleSpace: true,
          correct: true,
          classPadding: false,
          noLeadZero: false,
          sortProperties: false,
          sortSelectors: false,
          quoteConvert: 'none'
        }
      ),
      json: object<Options['json']>(
        {
          arrayFormat: 'default',
          braceAllman: true,
          bracePadding: false,
          objectIndent: 'indent',
          objectSort: false
        }
      ),
      script: object<Options['script']>(
        {
          arrayFormat: 'default',
          braceAllman: false,
          bracePadding: false,
          braceStyle: 'none',
          endComma: 'never',
          braceNewline: false,
          caseSpace: false,
          commentNewline: true,
          styleGuide: 'none',
          elseNewline: true,
          functionNameSpace: true,
          functionSpace: false,
          methodChain: 0,
          neverFlatten: false,
          noCaseIndent: false,
          noSemicolon: false,
          objectIndent: 'indent',
          objectSort: false,
          quoteConvert: 'single',
          ternaryLine: false,
          variableList: 'none',
          vertical: false
        }
      )
    }),
    options: object<Options>(
      {

        indentSize: 2,
        indentChar: ' ',
        indentLevel: 0,
        wrap: 0,
        crlf: false,
        endNewline: false,
        language: 'text',
        languageName: 'Plain Text',
        lexer: 'auto',
        mode: 'beautify',
        preserveLine: 2,
        liquid: object<Options['liquid']>(
          {
            commentIndent: true,
            commentNewline: true,
            correct: false,
            delimiterTrims: 'preserve',
            ignoreTagList: [],
            lineBreakSeparator: 'before',
            normalizeSpacing: true,
            preserveComment: false,
            quoteConvert: 'single',
            valueForce: 'intent'
          }
        ),
        markup: object<Options['markup']>(
          {
            attributeCasing: 'preserve',
            correct: false,
            forceLeadAttribute: false,
            attributeSort: false,
            attributeSortList: [],
            commentNewline: false,
            commentIndent: false,
            ignoreScripts: true,
            ignoreStyles: false,
            preserveComment: false,
            forceAttribute: false,
            forceIndent: false,
            preserveAttributes: false,
            preserveText: true,
            quoteConvert: 'double',
            selfCloseSpace: false
          }
        ),
        style: object<Options['style']>(
          {
            classPadding: false,
            atRuleSpace: true,
            correct: true,
            noLeadZero: false,
            sortProperties: false,
            sortSelectors: false,
            quoteConvert: 'none'
          }
        ),
        json: object<Options['json']>(
          {
            arrayFormat: 'default',
            braceAllman: true,
            bracePadding: false,
            objectIndent: 'indent',
            objectSort: false
          }
        ),
        script: object<Options['script']>(
          {
            arrayFormat: 'default',
            braceAllman: false,
            bracePadding: false,
            braceStyle: 'none',
            endComma: 'never',
            braceNewline: true,
            caseSpace: false,
            commentNewline: true,
            commentIndent: true,
            correct: false,
            preserveComment: false,
            styleGuide: 'none',
            elseNewline: true,
            functionNameSpace: true,
            functionSpace: false,
            methodChain: 0,
            neverFlatten: false,
            noCaseIndent: false,
            noSemicolon: false,
            objectIndent: 'indent',
            objectSort: false,
            quoteConvert: 'single',
            ternaryLine: false,
            variableList: 'none',
            vertical: false
          }
        )
      }
    )
  });
}
