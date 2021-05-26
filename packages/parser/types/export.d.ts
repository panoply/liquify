import { Context, IParseError, Variation, Nodes } from "./index";
import { ASTNode } from "./ast";
import { Scope } from "./vscode";
import { Options } from "./options";

export class LiquidParser {
  constructor(options: Options);
  engine(engine: Specs.Engine): void;
  get context(): Context;
  get errors(): IParseError[];
  get spec(): Variation;
  get embedded(): ASTNode[];
  parse(scope: Scope): Scope;
  getEmbeds(document: Scope): ASTNode[];
  // increment (param, contentChanges) {}
}
