import { INode, Position, TextDocument } from '@liquify/liquid-parser';
import {
  CompletionList
} from 'vscode-languageserver-protocol';

import {
  getLanguageService,
  LanguageService
} from 'vscode-html-languageservice';

export class HTMLService {

  service: LanguageService = getLanguageService()

  /**
   * JSON hover capabilities
   */
  public doHover (
    textDocument: TextDocument,
    position: Position
  ) {

    if (!textDocument) return null;

    const HTMLDocument = this.service.parseHTMLDocument(textDocument);

    return this.service.doHover(textDocument, position, HTMLDocument);

  }

  public async doComplete (
    textDocument: TextDocument,
    position: Position
  ): Promise<CompletionList | null> {

    if (!textDocument) return null;

    const HTMLDocument = this.service.parseHTMLDocument(textDocument);

    return this.service.doComplete(textDocument, position, HTMLDocument);

  }

}
