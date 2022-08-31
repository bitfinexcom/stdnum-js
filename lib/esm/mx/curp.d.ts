import { ValidateReturn } from '../types';
export declare function getGender(input: string): 'M' | 'F';
export declare function getBirthDate(input: string): Date;
export declare const name: string, localName: string, abbreviation: string | undefined, validate: (value: string) => ValidateReturn, format: (value: string) => string, compact: (value: string) => string;
