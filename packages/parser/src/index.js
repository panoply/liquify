import Specs from 'parser/specs'
import Config from 'parser/options'
import { global } from 'parser/global'

/* EXPOSED EXPORTS ---------------------------- */

export { TextDocument } from 'vscode-languageserver-textdocument'
export { NodeLanguage } from 'lexical/language'
export { NodeType } from 'lexical/types'
export { NodeKind } from 'lexical/kind'
export * as Characters from 'lexical/characters'

/**
 * Liquid Parser
 *
 * Creates the parsing instance. Provides methods which
 * shortcut through the scanning process.
 *
 */
export function LiquidParser (options) {

  Object.assign(Config, options)

  // @ts-ignore
  Specs.ref(Config.engine, Config.license)

  if (Config.associate_tags.length > 0) {
    Specs.associates.setup(Config.associate_tags)
  }

  global.Spec = {
    engine: engine => Specs.ref(engine, Config.license),
    get variant () { return Specs.variation },
    get entries () { return Specs.variation.entries }
  }

  return global

}
