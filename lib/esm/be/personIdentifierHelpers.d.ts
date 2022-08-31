export declare function toDateArray(number: string): Array<string>;
declare function defaultToDob(origFirstSix: string): string;
export declare function validStructure(number: string, toDob?: typeof defaultToDob): boolean;
export declare function validChecksum(number: string, toDob?: typeof defaultToDob): boolean;
export {};
