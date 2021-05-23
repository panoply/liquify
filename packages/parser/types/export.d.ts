import { Context, IParseError, Variation } from "./index";
import { Scope } from "./vscode";

export class LiquidParser {
  engine(engine: Specs.Engine): void;
  get context(): Context;
  get errors(): IParseError[];
  get spec(): Variation;
  parse(scope: Scope): Scope;
  // increment (param, contentChanges) {}
}
