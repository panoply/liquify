// @ts-check

import _ from 'lodash'
import {
  getLanguageService as getHTMLLanguageService,
  LanguageService,
  ClientCapabilities,
  TokenType
} from 'vscode-html-languageservice'
import { TextDocument } from 'vscode-languageserver-textdocument'

function getAttributeLanguage (attributeName) {
  const match = attributeName.match(/^(style)$|^(on\w+)$/i)
  if (!match) {
    return null
  }
  return match[1] ? 'css' : 'javascript'
}

export function getDocumentRegions (languageService, document) {
  const regions = []
  let scanner = languageService.createScanner(document.getText()),
    lastTagName = '',
    lastAttributeName = null,
    languageIdFromType,
    importedScripts = [],
    token = scanner.scan()

  console.log(token)
  while (token !== TokenType.EOS) {
    switch (token) {
      case TokenType.Styles:
        regions.push({ languageId: 'css', start: scanner.getTokenOffset(), end: scanner.getTokenEnd() })
        break
      case TokenType.Script:
        regions.push({ languageId: languageIdFromType, start: scanner.getTokenOffset(), end: scanner.getTokenEnd() })
        break
      case TokenType.AttributeName:
        lastAttributeName = scanner.getTokenText()
        break
      case TokenType.AttributeValue:
        if (lastAttributeName === 'src' && lastTagName.toLowerCase() === 'script') {
          let value = scanner.getTokenText()
          if (value[0] === '\'' || value[0] === '"') {
            value = value.substr(1, value.length - 1)
          }
          importedScripts.push(value)
        } else if (lastAttributeName === 'type' && lastTagName.toLowerCase() === 'script') {
          if (/["'](module|(text|application)\/(java|ecma)script|text\/babel)["']/.test(scanner.getTokenText())) {
            languageIdFromType = 'javascript'
          } else if (/["']text\/typescript["']/.test(scanner.getTokenText())) {
            languageIdFromType = 'typescript'
          } else {
            languageIdFromType = undefined
          }
        } else {
          const attributeLanguageId = getAttributeLanguage(lastAttributeName)
          if (attributeLanguageId) {
            let start = scanner.getTokenOffset(),
              end = scanner.getTokenEnd(),
              firstChar = document.getText()[start]
            if (firstChar === '\'' || firstChar === '"') {
              start++
              end--
            }
            regions.push({ languageId: attributeLanguageId, start, end, attributeValue: true })
          }
        }
        lastAttributeName = null
        break
    }
    token = scanner.scan()
  }

  return {
    languageIdFromType,
    importedScripts,
    lastTagName,
    regions
  }
}

/**
 * JSON Language Service
 *
 * @export
 * @typedef {import('vscode-json-languageservice').LanguageSettings} settings
 * @typedef {import('vscode-json-languageservice').LanguageServiceParams} params
 */
export function HTMLService () {

  /**
   * Get Language Service
   *
   * @memberof CSSService
   * @private
   */
  const service = getHTMLLanguageService()

  // let document

  /**
   * Service Settings
   *
   * @type {settings}
   * @memberof CSSService
   * @private
   */
  return {
    /**
     * Configure
     *
     * @returns
     * @memberof CSSService
     */
    configure () {

    },

    /**
     *
     *
     * @param {Document.Scope} document
     */
    parse (doc) {
      const document = TextDocument.create(doc.uri, 'html', doc.version, doc.content)

      const scan = getDocumentRegions(service, document)

      console.log('html', scan)

    },

    async doHover (doc, position) {

      return null

      const text = service.parseHTMLDocument(document)
      const hover = await service.doHover(document, position, text)

      console.log(hover)

      return hover

    }

  }

}

// const test = new CSSService()
// test.
