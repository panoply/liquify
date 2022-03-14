/**
 * Start Position
 *
 * The starting position index of each tag,
 * this is reset every time we encounter an
 * open delimiter match
 */
export declare let begin: number;
/**
 * Token
 *
 * Holds the current token record we are scanning
 * and is used to keep track of the token we are within
 */
export declare let token: number;
/**
 * Error Number
 *
 * Parsing errors, holds value of the parse errors
 * encountered while scanning tags.
 */
export declare let error: number;
/**
 * Runs document scan
 *
 * The position offset from which to start scanning
 */
export declare function scan(start?: number): number;
