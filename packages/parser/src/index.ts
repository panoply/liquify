import { query as q, IEngine } from '@liquify/liquid-language-specs';
import { parse } from './parser/parse';
import { create, update, get, remove, model } from 'tree/model';
import { IAST } from './tree/ast';
import { Config, IConfig } from './config';
import { Node } from './tree/nodes';
import { Embed as IIEmbed } from './tree/embed';
import { TextDocumentItem } from 'vscode-languageserver-types';

/* EXPOSED EXPORTS ---------------------------- */

export { TextDocument, Position, Range } from 'vscode-languageserver-textdocument';
export { IAST } from './tree/ast';
export { Node as INode } from './tree/nodes';
export { NodeLanguage } from './lexical/language';
export { NodeKind } from './lexical/kind';
export { TokenType as Tokens } from './lexical/tokens';
export * from '@liquify/liquid-language-specs';
export * as Regexp from './lexical/expressions';
export * as Characters from './lexical/characters';

/* EXPOSED EXPORT TYPES ----------------------- */

export type IEmbed = Node & IIEmbed

export class LiquidParser {

  constructor (options: IConfig) {

    Object.assign(Config, options);

    q.setEngine(Config.engine);

  }

  /**
     * Change Specification Engine
     */
  engine (engine: IEngine): void {

    return q.setEngine(engine);

  }

  parse (text: string) {

    if (model.has('raw')) {
      // model.get('raw').errors = [];
      model.delete('raw');
    }

    return parse(
      create(
        {
          uri: 'raw',
          languageId: 'raw',
          version: 1,
          text
        }
      )
    );
  }

  /**
   * Executes a full document scan. Call this method to create
   * a document reference and perform a full text scan.
   */
  scan (textDocument: TextDocumentItem): IAST {

    return parse(create(textDocument));
  }

  reparse (uri?: string): void {

    if (uri) {
      if (model.has(uri)) {
        parse(model.get(uri));
      }
    } else {
      return model.forEach(document => {
        document.errors = [];
        document.linting = [];
        return parse(document);
      });
    }

  }

  get (uri: string): IAST {

    return get(uri);
  }

  delete (uri: string) {

    return remove(uri);
  }

  update ({ textDocument, contentChanges }: DidChangeTextDocumentParams): IAST {

    return parse(
      update(
        textDocument,
        contentChanges
      )
    );
  }

}
