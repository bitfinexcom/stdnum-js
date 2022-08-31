import { Validator } from './types';
export { Validator } from './types';
export declare const stdnum: Record<string, Record<string, Validator>>;
export declare const personValidators: Record<string, Validator[]>;
export declare const entityValidators: Record<string, Validator[]>;
export declare const euVat: Record<string, Validator[]>;
export declare function validatePerson(country: string, value: string): {
    checked: boolean;
    isValid?: boolean;
    matchedValidators?: Validator[];
};
export declare function validateEntity(country: string, value: string): {
    checked: boolean;
    isValid?: boolean;
    matchedValidators?: Validator[];
};
