export declare class ValidationError extends Error {
    constructor(msg: string);
}
export declare class InvalidFormat extends ValidationError {
    constructor(msg?: string);
}
export declare class InvalidChecksum extends ValidationError {
    constructor(msg?: string);
}
export declare class InvalidLength extends ValidationError {
    constructor(msg?: string);
}
export declare class InvalidComponent extends ValidationError {
    constructor(msg?: string);
}
