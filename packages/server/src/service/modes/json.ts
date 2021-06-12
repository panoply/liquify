import merge from 'lodash/merge';
import isEmpty from 'lodash/isEmpty';
import { INode, Position } from '@liquify/liquid-parser';

import {
  Diagnostic,
  CompletionList,
  CompletionItem
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

    this.service.configure(
      {
        validate: true,
        schemas: [
          {
            uri: 'http://json-schema.org/draft-07/schema',
            fileMatch: [ '*.json' ],
            schema
          }
        ]
      }
    );

  }

  public async doValidation (node: INode): Promise<Diagnostic[] | null> {

    const document = node.getDocument();

    if (!document) return null;

    const JSONDocument = this.service.parseJSONDocument(document);
    const diagnostics = await this.service.doValidation(document, JSONDocument);

    if (isEmpty(diagnostics)) return null;

    return diagnostics.map(diagnostic => (
      merge(diagnostic, {
        range: {
          start: { line: diagnostic.range.start.line + node.range.start.line },
          end: { line: diagnostic.range.end.line + node.range.start.line }
        },
        data: {
          index: node.index,
          capabilities: {
            doFormat: diagnostic.severity !== DiagnosticSeverity.Error
          }
        }
      })
    ));

  }

  /**
   * JSON hover capabilities
   */
  public async doHover (
    node: INode,
    {
      line,
      character
    }: Position
  ) {

    const document = node.getDocument();

    if (!document) return null;

    const JSONDocument = this.service.parseJSONDocument(document);
    const doHover = await this.service.doHover(
      document,
      { character, line: line - node.range.start.line },
      JSONDocument
    );

    return merge(doHover, {
      range: {
        start: { line },
        end: { line }
      }
    });

  }

  public async doComplete (
    node: INode,
    {
      character,
      line
    }: Position

  ): Promise<CompletionList | null> {

    const document = node.getDocument();

    if (!document) return null;

    const JSONDocument = this.service.parseJSONDocument(document);

    const doComplete = await this.service.doComplete(
      document
      , { character, line: line - node.range.start.line }
      , JSONDocument
    );

    for (const { textEdit } of doComplete.items) {
      merge(textEdit, {
        range: {
          start: { line },
          end: { line }
        }
      });
    }

    return doComplete;

  }

  public doResolve (completionItem: CompletionItem): Thenable<CompletionItem> {

    return this.service.doResolve(completionItem);

  }

}
