import Stream from 'parser/stream'
import Specs from 'parser/specs'
import Config from 'parser/options'
import Document from 'parser/documents'

/* EXPOSED EXPORTS ---------------------------- */

export { TokenTags } from 'enums/tags'
export { TokenKind } from 'enums/kinds'
export * as CharCodes from 'lexical/characters'

/**
 * Liquid Parser
 *
 * Creates the parsing instance. Provides methods which
 * shortcut through the scanning process.
 */
export function LiquidParser (options) {

  Object.assign(Config, options)

  // @ts-ignore
  Specs.ref(Config.engine, Config.license)

  if (Config.associate_tags.length > 0) {
    Specs.associates.setup(Config.associate_tags)
  }

  return {

    Document,

    /**
     * Specification Engine
     *
     * @param {Specs.Engine} engine
     * @memberof LiquidParser
     */
    Engine: (engine) => Specs.ref(engine, Config.license),

    /**
     * Returns Specification
     *
     * @memberof LiquidParser
     * @return {Specs.Variation}
     */
    get Spec () { return Specs.variation },

    /**
     * Test Code Character at TextDocument position
     *
     * @memberof LiquidParser
     */
    isCodeChar (code, position) {

      const offset = Stream.OffsetFromPosition(position)

      return Stream.CodeCharAt(code, offset)

    },

    /**
     * Test Code Character at TextDocument position
     *
     * @memberof LiquidParser
     */
    isRegExp (position, code) {

    }

  }

}
