
import { LanguageService as CSSLanguageService } from 'vscode-css-languageservice';
import { HTMLDocumentRegions } from '../regions';
import { LanguageModelCache } from '../cache';
import { LanguageMode, Position, TextDocument } from '../modes';

export function getCSSMode (
  cssLanguageService: CSSLanguageService,
  documentRegions: LanguageModelCache<HTMLDocumentRegions>
): LanguageMode {
  return {
    getId () { return 'css'; },
    doValidation (document: TextDocument) {

      // Get virtual CSS document, with all non-CSS code replaced with whitespace
      const embedded = documentRegions.get(document).getEmbeddedDocument('css');
      const stylesheet = cssLanguageService.parseStylesheet(embedded);
      return cssLanguageService.doValidation(embedded, stylesheet);
    },
    doComplete (document: TextDocument, position: Position) {

      // Get virtual CSS document, with all non-CSS code replaced with whitespace
      const embedded = documentRegions.get(document).getEmbeddedDocument('css');
      const stylesheet = cssLanguageService.parseStylesheet(embedded);
      return cssLanguageService.doComplete(embedded, position, stylesheet);
    },
    onDocumentRemoved (_document: TextDocument) {},
    dispose () {}
  };
}
