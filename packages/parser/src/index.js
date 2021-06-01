import stream from 'parser/stream'
import specs from 'parser/specs'
import { parse } from 'parser/parse'
import config from 'parser/options'
import { OffsetsFromRange } from 'parser/utils'
import iDocument from 'parser/documents'

/* EXPOSED EXPORTS ---------------------------- */

export { TokenTags } from 'enums/tags'
export { TokenKind } from 'enums/kinds'
export * as CharCodes from 'lexical/characters'

export const Document = iDocument

/**
 * Liquid Parser
 *
 * Creates the parsing instance. Provides methods which
 * shortcut through the scanning process.
 */
export function LiquidParser (options) {

  Object.assign(config, options)

  // @ts-ignore
  specs.ref(config.engine, config.license)

  if (config.associate_tags.length > 0) specs.associates.setup(config.associate_tags)

  return {

    /**
     * Specification Engine
     *
     * @param {Specs.Engine} engine
     * @memberof LiquidParser
     */
    engine: (engine) => specs.ref(engine, config.license),

    /**
     * Returns Specification
     *
     * @memberof LiquidParser
     * @return {Specs.Variation}
     */
    get spec () { return specs.variation },

    /**
     * Test Code Character at TextDocument position
     *
     * @memberof LiquidParser
     */
    isCodeChar (code, position) {

      const offset = stream.OffsetFromPosition(position)

      return stream.CodeCharAt(code, offset)

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
