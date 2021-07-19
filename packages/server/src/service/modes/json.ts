import { IAST, INode, IEmbed, Position } from '@liquify/liquid-parser';
import {
  Diagnostic,
  CompletionList,
  CompletionItem,
  InsertReplaceEdit,
  Hover
} from 'vscode-languageserver-protocol';
import {
  getLanguageService,
  ClientCapabilities,
  DiagnosticSeverity,
  LanguageService
} from 'vscode-json-languageservice';

export class JSONService {

  service: LanguageService = getLanguageService({
    clientCapabilities: ClientCapabilities.LATEST
  })

  constructor (schema: object) {

    this.service.configure({
      validate: true,
      schemas: [
        {
          uri: 'http://json-schema.org/draft-07/schema',
          fileMatch: [ '*.json' ],
          schema
        }
      ]
    });

  }

  public async doValidation (
    document: IAST,
    node: IEmbed & INode
  ): Promise<Diagnostic[] | null> {

    const JSONDocument = this.service.parseJSONDocument(node.textDocument);
    const diagnostics = await this.service.doValidation(node.textDocument, JSONDocument);

    if (!diagnostics) return null;

    for (const diagnostic of diagnostics) {

      diagnostic.range.start.line += node.regionOffset;
      diagnostic.range.end.line += node.regionOffset;
      diagnostic.source = `Liquid ${node.tag} tag`;

      if (diagnostic.severity !== DiagnosticSeverity.Error) continue;
      if (document.format) {
        document.format.enable = false;
        document.format.error = diagnostic;
      }

    }

    return diagnostics;

  }

  /**
   * JSON hover capabilities
   */
  public async doHover (
    node: IEmbed & INode,
    { line, character }: Position
  ): Promise<Hover | null> {

    const JSONDocument = this.service.parseJSONDocument(node.textDocument);
    const position = { character, line: line - node.regionOffset };
    const location = await this.service.doHover(node.textDocument, position, JSONDocument);

    if (!location) return null;

    location.range.start.line = line;
    location.range.end.line = line;

    return location;

  }

  public async doComplete (
    node: INode & IEmbed,
    { character, line }: Position

  ): Promise<CompletionList | null> {

    const position = { character, line: line - node.range.start.line };
    const JSONDocument = this.service.parseJSONDocument(node.textDocument);
    const completion = await this.service.doComplete(node.textDocument, position, JSONDocument);

    for (const complete of completion.items) {

      const textEdit = (complete.textEdit as InsertReplaceEdit);

      if (textEdit?.insert) {
        textEdit.insert.start.line = line;
        textEdit.insert.end.line = line;
      }

      if (textEdit?.replace) {
        textEdit.replace.start.line = line;
        textEdit.replace.end.line = line;
      }
    }

    return completion;

  }

  public doResolve (completionItem: CompletionItem): Thenable<CompletionItem> {

    return this.service.doResolve(completionItem);

  }

}
