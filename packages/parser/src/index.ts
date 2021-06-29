import { Variation, VariationEntries, IEngine } from '@liquify/liquid-language-specs';
import { VersionedTextDocumentIdentifier, Range } from 'vscode-languageserver-types';
import { Engine, variation } from 'parser/specs';
import { parse } from 'parser/parser';
import { create, update, get, remove, model } from 'tree/model';
import { IAST } from './tree/ast';
import { Config, IConfig } from './config';
import { INode, Type } from './tree/nodes';

/* EXPOSED EXPORTS ---------------------------- */

export { IEngine } from '@liquify/liquid-language-specs';
export { TextDocument, Position, Range } from 'vscode-languageserver-textdocument';
export { IAST } from './tree/ast';
export { INode } from './tree/nodes';
export { NodeLanguage } from './lexical/language';
export { NodeType } from './lexical/types';
export { NodeKind } from './lexical/kind';
export * as Characters from './lexical/characters';

export class LiquidParser {

  static engine (engine: IEngine) {

    return Engine(engine, Config.license);

  }

  constructor (options: IConfig) {

    Object.assign(Config, options);

    Engine(Config.engine, Config.license);

  }

  get spec () {
    return {
      get variant (): Variation {

        return variation;
      },
      get entries (): VariationEntries {

        return variation.entries;
      }
    };
  }

  /**
     * Change Specification Engine
     */
  engine (engine: IEngine): void {

    return Engine(engine, Config.license);

  }

  parse (text: string) {

    if (model.has('raw')) model.delete('raw');

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
  scan (
    textDocument: {
      uri: string,
      languageId: string,
      version: number,
      text: string
    }
  ): IAST {

    return parse(create(textDocument));
  }

  get (uri: string): IAST {

    return get(uri);
  }

  delete (uri: string) {

    return remove(uri);
  }

  update (
    {
      textDocument,
      contentChanges
    }: {
        textDocument: VersionedTextDocumentIdentifier,
        contentChanges: {
          range: Range,
          text: string
        }[]
      }
  ): IAST {

    return parse(
      update(
        textDocument,
        contentChanges
      )
    );
  }

}
