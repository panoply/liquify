import { Range } from 'vscode-languageserver-textdocument';

export function GetFormedRange (range: Range): Range {

  const { start, end } = range;

  return (
    start.line > end.line || (
      start.line === end.line &&
          start.character > end.character
    )
  ) ? { start: end, end: start } : range;

}
