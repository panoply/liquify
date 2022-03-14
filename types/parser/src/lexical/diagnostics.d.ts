import { ParseError } from 'lexical/errors';
import { Diagnostic, Range } from 'vscode-languageserver-types';
declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export interface IDiagnostic extends Omit<Diagnostic, 'range'> {
    range?: Range | {
        start: number;
        end: number;
    };
    data?: {
        offset?: number;
        doFormat?: boolean;
    };
}
export declare const enum Preventions {
    FormattingDisable = 1,
    FormattingEnabled = 2
}
/**
 * Parsing Errors
 *
 * Returns Error Diagnostics when invalid
 * sequences occur. Each error attaches the
 * range (line/column) information so its
 * easily adapted within a Language Server
 *
 * @todo
 * _Provide translations i18n localizations to
 * error messages for non-english developers._
 *
 */
export declare const Diagnostics: {
    [K in ParseError]: IDiagnostic;
};
export {};
