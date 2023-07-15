import { IAST, IEmbed, Position } from '@liquify/parser';
import { NodeLanguage } from '@liquify/parser/lexical';
import { TextEdit, Diagnostic, CompletionList, Hover } from 'vscode-languageserver-protocol';
import { getCSSLanguageService, DiagnosticSeverity, LanguageService } from 'vscode-css-languageservice';

export class CSSLanguageService {

  public service: LanguageService = getCSSLanguageService();

  init () {

  }

  /**
   * CSS Validation
   */
  doValidation (document: IAST, node: IEmbed): Diagnostic[] | null {

    const CSSDocument = this.service.parseStylesheet(node.textDocument);
    const diagnostics = this.service.doValidation(node.textDocument, CSSDocument);

    if (!diagnostics) return null;

    diagnostics.forEach(diagnostic => {

      diagnostic.range.start.line += node.regionOffset;
      diagnostic.range.end.line += node.regionOffset;
      diagnostic.source = `Liquid ${node.tag} tag`;

      if (diagnostic.severity !== DiagnosticSeverity.Error) return;
      if (document.format) {
        document.format.enable = false;
        document.format.error = diagnostic;
      }

    });

    return diagnostics;

  }

  /**
   * CSS Hovers
   */
  doHover (node: IEmbed, { line, character }: Position): Hover {

    const CSSDocument = this.service.parseStylesheet(node.textDocument);
    const position = { character, line: line - node.regionOffset };
    const hovers = this.service.doHover(node.textDocument, position, CSSDocument);

    if (!hovers) return null;

    hovers.range.start.line = line;
    hovers.range.end.line = line;

    return hovers;

  }

  /**
   * CSS Completions
   */
  doComplete (node: IEmbed, { character, line }: Position): CompletionList {

    const position = { character, line: line - node.regionOffset };
    const CSSDocument = this.service.parseStylesheet(node.textDocument);
    const completions = this.service.doComplete(node.textDocument, position, CSSDocument);

    for (const complete of completions.items) {
      (complete.textEdit as TextEdit).range.start.line = line;
      (complete.textEdit as TextEdit).range.end.line = line;
      complete.data = {
        token: NodeLanguage.css,
        languageId: node.languageId
      };
    }

    return completions;
  }

}
