import { ParseError } from 'lexical/errors';
import { Diagnostics, IDiagnostic } from 'lexical/diagnostics';
import { INode } from 'tree/nodes';
import { Position, Range } from 'vscode-languageserver-types';

export class Errors {

  public issues: number
  public cursor: IDiagnostic
  public diagnostics: IDiagnostic[] = []

  public create (error: ParseError, node: INode) {

    const diagnostic = Diagnostics[error];

    diagnostic.range = node.range;
    diagnostic.data.offset = node.start;

    node.errors.push(this.diagnostics.length);

    this.issues = this.diagnostics.push(diagnostic);

  }

  public report (error: ParseError, node: INode) {

    const diagnostic = Diagnostics[error];

    diagnostic.data.offset = node.start;
    node.errors.push(this.diagnostics.length);

    this.issues = this.diagnostics.push(diagnostic);

    return diagnostic;

  }

  public assert (range: Range, offset: number) {

    this.cursor.range = range;
    this.cursor.data.offset = offset;
    this.cursor = undefined;

  }

  public edit (offset: number) {
    //
  }

  public increment (offset: number) {
    //
  }

  public update (offset: number) {
    //
  }

  public map (at: number[]) {

    if (at.length > 0) return at.map(e => this.diagnostics[e]);

    return at;
  }

  public get (
    at: number | number[] = this.diagnostics.length - 1,
    fn?: (undefined | ((
      errors: IDiagnostic[],
      error: IDiagnostic,
      index: number
    ) => IDiagnostic))
  ) {

    if (typeof at === 'number') {
      if (fn === undefined) return this.diagnostics[at];
      return fn(this.diagnostics, this.diagnostics[at], at);
    }

    for (const e of at) fn(this.diagnostics, this.diagnostics[e], e);

  }

}
