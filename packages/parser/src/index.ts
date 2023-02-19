import type { TextDocumentItem } from 'vscode-languageserver-types';
import { q, Engine } from '@liquify/specs';
import { parse } from './parser/parse';
import { create, update, get, remove, model } from './tree/model';
import { AST } from './tree/ast';
import { assign } from './parser/utils';
import { config, IConfig } from './config';
import { Node } from './tree/nodes';
import { Embed } from './tree/embed';
import merge from 'mergerino';

/* EXPOSED EXPORTS ---------------------------- */

export type { TextDocument, Position, Range } from 'vscode-languageserver-textdocument';
export type { AST as IAST } from './tree/ast';
export type { INode } from './tree/typings';
export * from './lexical/';
export * from '@liquify/specs';

/* EXPOSED EXPORT TYPES ----------------------- */

export declare type IEmbed = Node & Embed

export class LiquidParser {

  constructor (options: IConfig) {

    assign(config, merge(config, options));

    q.setEngine(config.engine);

  }

  get config () { return config; }

  /**
   * Change Specification Engine
   */
  engine (engine: Engine): void {

    return q.setEngine(engine);

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
  scan (textDocument: TextDocumentItem): AST {

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

  get (uri: string): AST {

    return get(uri);
  }

  delete (uri: string) {

    return remove(uri);
  }

  update ({ textDocument, contentChanges }: any): AST {

    return parse(update(textDocument, contentChanges));
  }

}
