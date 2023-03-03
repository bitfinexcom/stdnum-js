export declare function weightedSum(value: string, { alphabet, reverse, weights, modulus, sumByDigit, }: {
    alphabet?: string;
    reverse?: boolean;
    modulus: number;
    weights?: number[];
    sumByDigit?: boolean;
}): number;
export declare function luhnChecksum(value: string, alphabet?: string): number;
export declare function luhnChecksumValidate(value: string, alphabet?: string): boolean;
export declare function luhnChecksumValue(value: string, alphabet?: string): number;
export declare function luhnChecksumDigit(value: string, alphabet?: string): string;
export declare function verhoeffGenerate(array: string): number;
export declare function verhoeffValidate(array: string): boolean;
export declare function mod97base10Validate(value: string): boolean;
export declare function mod11mod10Validate(value: string): boolean;
