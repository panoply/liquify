import { Variation, VariationEntries, IEngine } from '@liquify/liquid-language-specs';
import { VersionedTextDocumentIdentifier, Range } from 'vscode-languageserver-types';
import { Specs } from 'parser/specs';
import { parse } from 'parser/parse';
import { create, update, get, remove } from 'tree/model';
import { IAST } from './tree/ast';
import { Config, IConfig } from './config';

/* EXPOSED EXPORTS ---------------------------- */

export { IEngine } from '@liquify/liquid-language-specs';
export { TextDocument, Position, Range } from 'vscode-languageserver-textdocument';
export { IAST } from './tree/ast';
export { INode } from './tree/node';
export { NodeLanguage } from './lexical/language';
export { NodeType } from './lexical/types';
export { NodeKind } from './lexical/kind';
export * as Characters from './lexical/characters';

export class LiquidParser {

  static engine (engine: IEngine) {

    return Specs.ref(engine, Config.license);

  }

  constructor (options: IConfig) {

    Object.assign(Config, options);

    Specs.ref(Config.engine, Config.license);

  }

  get spec () {
    return {
      get variant (): Variation {

        return Specs.variation;
      },
      get entries (): VariationEntries {

        return Specs.variation.entries;
      }
    };
  }

  /**
     * Change Specification Engine
     */
  engine (engine: IEngine): void {

    return Specs.ref(
      engine,
      Config.license
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

    return parse(
      create(textDocument)
    );
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
