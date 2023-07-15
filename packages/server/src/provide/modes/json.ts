import { IAST, IEmbed, Position } from '@liquify/parser';
import { NodeLanguage } from '@liquify/parser/lexical';
import { TextEdit, Diagnostic, CompletionList, CompletionItem, Hover } from 'vscode-languageserver-protocol';
import {
  getLanguageService,
  ClientCapabilities,
  DiagnosticSeverity,
  LanguageService
} from 'vscode-json-languageservice';

export class JSONLanguageService {

  public service: LanguageService = getLanguageService({
    clientCapabilities: ClientCapabilities.LATEST
  });

  constructor (schema: object) {

    this.service.configure({
      validate: true,
      allowComments: false,
      schemas: [
        {
          uri: 'http://json-schema.org/draft-07/schema',
          fileMatch: [ '*.json' ],
          schema
        }
      ]
    });

  }

  /**
   * JSON Validation
   */
  async doValidation (document: IAST, node: IEmbed): Promise<Diagnostic[]> {

    const JSONDocument = this.service.parseJSONDocument(node.textDocument);
    const diagnostics = await this.service.doValidation(node.textDocument, JSONDocument);

    if (!diagnostics) return null;

    for (const diagnostic of diagnostics) {

      diagnostic.range.start.line += node.regionOffset;
      diagnostic.range.end.line += node.regionOffset;
      diagnostic.source = `Liquid ${node.tag} tag`;

      document.errors.push(diagnostic);

      if (diagnostic.severity !== DiagnosticSeverity.Error) continue;

      if (document.format.enable) {
        document.format.enable = false;
        document.format.error = diagnostic;
      }

    }

  }

  /**
   * JSON Hovers
   */
  async doHover (node: IEmbed, { line, character }: Position): Promise<Hover> {

    const position: Position = Object.create(null);

    position.character = character;
    position.line = line - node.regionOffset;

    const JSONDocument = this.service.parseJSONDocument(node.textDocument);
    const location = await this.service.doHover(node.textDocument, position, JSONDocument);

    if (!location) return null;

    location.range.start.line = line;
    location.range.end.line = line;

    return location;

  }

  /**
   * JSON Completions
   */
  async doComplete (node: IEmbed, { character, line }: Position): Promise<CompletionList> {

    const position = { character, line: line - node.regionOffset };
    const JSONDocument = this.service.parseJSONDocument(node.textDocument);
    const completion = await this.service.doComplete(node.textDocument, position, JSONDocument);

    for (const complete of completion.items) {

      complete.data = Object.create(null);
      complete.data.token = NodeLanguage.json;
      complete.data.languageId = node.languageId;

      (complete.textEdit as TextEdit).range.start.line = line;
      (complete.textEdit as TextEdit).range.end.line = line;

    }

    return completion;

  }

  /**
   * JSON Completion Resolve
   */
  doResolve (completionItem: CompletionItem): Thenable<CompletionItem> {

    return this.service.doResolve(completionItem);

  }

}
