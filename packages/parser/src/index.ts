import { Config, IConfig } from './config';
import { Specs } from './parser/specs';
import { Document } from './tree/document';
import { Stream } from './parser/stream';
import { Variation, VariationEntries, IEngine } from '@liquify/liquid-language-specs';

/* EXPOSED EXPORTS ---------------------------- */

export { IEngine } from '@liquify/liquid-language-specs';
export { TextDocument } from 'vscode-languageserver-textdocument';
export { NodeLanguage } from './lexical/language';
export { NodeType } from './lexical/types';
export { NodeKind } from './lexical/kind';
export * as Characters from './lexical/characters'; ;

export function LiquidParser (options: IConfig) {

  Object.assign(Config, options);

  Specs.ref(Config.engine, Config.license);

  if (Config.associate_tags.length > 0) Specs.associates.setup(Config.associate_tags);

  return {
    get Document () {
      return Document.documents();
    },
    get Spec () {
      return {
        engine: (engine: IEngine): void => Specs.ref(engine, Config.license),
        get variant (): Variation { return Specs.variation; },
        get entries (): VariationEntries { return Specs.variation.entries; }
      };
    },
    Parser: {
      ...Document.global(),
      ...Stream.global()
    }
  };

}
