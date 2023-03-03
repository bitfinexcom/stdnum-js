import { ValidateReturn } from '../types';
export declare function ikCheck(value: string): boolean;
export declare function ikCheckDate(value: string): boolean;
export declare const name: string, localName: string, abbreviation: string | undefined, validate: (value: string) => ValidateReturn, format: (value: string) => string, compact: (value: string) => string;
