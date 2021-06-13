import {
  LanguageMode,
  LanguageService as HTMLLanguageService,
  Position,
  TextDocument
} from 'modes/languages';

export function getHTMLMode (htmlLanguageService: HTMLLanguageService): LanguageMode {
  return {
    getId () {
      return 'html';
    },
    doComplete (document: TextDocument, position: Position) {
      return htmlLanguageService.doComplete(
        document,
        position,
        htmlLanguageService.parseHTMLDocument(document)
      );
    },
    onDocumentRemoved (_document: TextDocument) {},
    dispose () {}
  };
}
