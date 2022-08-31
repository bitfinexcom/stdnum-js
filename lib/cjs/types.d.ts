import { ValidationError } from './exceptions';
interface ValidateSuccess {
    isValid: true;
    compact: string;
    isIndividual: boolean;
    isCompany: boolean;
}
interface ValidateFail {
    isValid: false;
    error: ValidationError;
}
export declare type ValidateReturn = {
    error?: ValidationError;
} & (ValidateSuccess | ValidateFail);
export interface Validator {
    name: string;
    localName: string;
    abbreviation?: string;
    compact(value: string): string;
    format(value: string): string;
    validate(value: string): ValidateReturn;
}
export {};
