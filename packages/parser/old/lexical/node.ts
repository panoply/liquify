import { NodeKind } from "lexical/kind";
import { NodeType } from "lexical/types";
import { NodeLanguage } from "lexical/language";
import Scanner from "lexical/scanner";
import yamljs from "yamljs";
import Context from "parser/context";
import { TextDocument, Position } from "vscode-languageserver-textdocument";
/**
 * AST Node
 *
 * Creates token nodes on the AST
 *
 * @type {Parser.INode}
 */
export default (document: Parser.AST) =>
  class INode {
    name: string = null;
    root: number = null;
    parent: number = null;
    index = document.nodes.length;
    type = NodeType.unknown;
    singular: boolean = true;
    range: { start: Position; end?: Position } = { start: Scanner.range.start };
    offsets: [number, number?, number?, number?] = [Scanner.start];
    kind = NodeKind.Liquid;
    language = NodeLanguage.liquid;
    token: [string, string?];
    context: number[];
    error: number = document.errors.length;
    children?: number[];
    objects?: object;
    attributes?: object;
    filters?: object;

    get start(): number {
      return this.offsets[0];
    }

    get end(): number {
      return this.offsets[this.offsets.length - 1];
    }

    get content(): string {
      if (this.kind === NodeKind.Frontmatter) {
        return yamljs.parse(Scanner.GetText(this.offsets[1], this.offsets[2]));
      }

      return document.getText(
        document.toRange(this.offsets[1], this.offsets[2])
      );
    }

    public getContext() {
      return Context.get(this.context);
    }

    public document(): TextDocument {
      if (this.language === "liquid") return null;
      if (this.content.length === 0) return null;

      return TextDocument.create(
        document.textDocument.uri.replace(".liquid", `.${this.language}`),
        this.language,
        document.textDocument.version,
        this.content
      );
    }
  };
