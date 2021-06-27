import { ParseError } from 'lexical/errors';
import { Diagnostics, IDiagnostic } from 'lexical/diagnostics';
import { NodeKind } from 'lexical/kind';
import { INode } from 'tree/nodes';
import { Position, Range } from 'vscode-languageserver-types';

export class Errors {

  public node: INode
  public issues: number
  public syntactic: Set<INode> = new Set()
  public entries: IDiagnostic[] = []

  public add (error: ParseError): (node: INode) => void {

    const diagnostic = Diagnostics[error];

    return ({
      range,
      start,
      errors
    }: INode) => {

      errors.push(this.entries.length);

      this.entries.push({
        ...diagnostic,
        range,
        data: {
          offset: start
        }
      });

    };

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

    if (at.length > 0) return at.map(e => this.entries[e]);

    return at;
  }

  public get (
    at: number | number[] = this.entries.length - 1,
    fn?: (undefined | ((
      errors: IDiagnostic[],
      error: IDiagnostic,
      index: number
    ) => IDiagnostic))
  ) {

    if (typeof at === 'number') {
      if (fn === undefined) return this.entries[at];
      return fn(this.entries, this.entries[at], at);
    }

    for (const e of at) fn(this.entries, this.entries[e], e);

  }

}
