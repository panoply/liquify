import { Values } from '../liquid/types/common';
export declare const is: (value1: any, value2: any) => boolean;
/**
 * Validates pattern match
 */
export declare const inRange: (start: number, end: number, value: number) => boolean;
/**
 * Validates pattern match
 */
export declare const inPattern: (pattern: RegExp | string, value: string) => boolean;
/**
 * Looks for match within values
 */
export declare const inValues: (array: Values[] | string[], value: string) => boolean;
