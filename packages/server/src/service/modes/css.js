// @ts-check

import _ from 'lodash'
import url from 'url'
import {
  getCSSLanguageService,
  getSCSSLanguageService,
  LanguageService
} from 'vscode-css-languageservice'

/**
 * JSON Language Service
 *
 * @export
 * @typedef {import('vscode-json-languageservice').LanguageSettings} settings
 * @typedef {import('vscode-json-languageservice').LanguageServiceParams} params
 * @class CSSService
 */
export class CSSService {

  constructor () {

    /**
   * Get Language Service
   *
   * @memberof CSSService
   * @private
   */
    this.service = getCSSLanguageService()

  }

  /**
   * Service Settings
   *
   * @type {settings}
   * @memberof CSSService
   * @private
   */

  /**
   * Configure
   *
   * @returns
   * @memberof CSSService
   */
  configure () {

  }

  parse (node) {

    const { embeddedDocument, languageId } = node
    const prop = _.upperCase(languageId) + 'Document'

    node[prop] = this.service.parseStylesheet(embeddedDocument)

  }

  /**
   * Validate JSON
   *
   * @param {import('vscode-languageserver').TextDocument} textDocument
   * @param {array} ast
   * @returns {array}
   * @memberof CSSService
   */
  doValidation (textDocument, { ast }) {

  }

  /**
   * Generate a JSON text document
   *
   * @param {import('vscode-languageserver').TextDocument} textDocument
   * @param {string} content The text document content
   */
  doHover (
    textDocument
    , { embeddedDocument, lineOffset }
    , { line, character }
    , position = {
      character,
      line: _.subtract(line, lineOffset)
    }
  ) {

  }

  /**
   * JSON completion feature
   *
   * @param {import('vscode-languageserver').TextDocument} textDocument
   * @param {object} position The position of completion
   * @param {number} lineOffset The line offset of embedded region
   * @return {Promise}
   */
  doComplete (
    textDocument
    , { embeddedDocument, lineOffset }
    , { line, character }
    , position = {
      character,
      line: _.subtract(line, lineOffset)
    }
  ) {

  }

  /**
   * Generate a JSON text document
   *
   * @param {object} document The text document to create
   * @param {string} content The text document content
  */
  doResolve (completionItem) {

    // return this.service.doResolve(completionItem)

  }

}

// const test = new CSSService()
// test.