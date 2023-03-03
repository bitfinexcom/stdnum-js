import { ValidateReturn } from '../types';
export declare function validPrefix(value: string): boolean;
export declare const name: string, localName: string, abbreviation: string | undefined, validate: (value: string) => ValidateReturn, format: (value: string) => string, compact: (value: string) => string;
