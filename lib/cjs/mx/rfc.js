"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compact = exports.format = exports.validate = exports.abbreviation = exports.localName = exports.name = void 0;
const exceptions = __importStar(require("../exceptions"));
const util_1 = require("../util");
function clean(input) {
    return util_1.strings.cleanUnicode(input, '-_ ');
}
const nameBlacklist = new Set([
    'BUEI',
    'BUEY',
    'CACA',
    'CACO',
    'CAGA',
    'CAGO',
    'CAKA',
    'CAKO',
    'COGE',
    'COJA',
    'COJE',
    'COJI',
    'COJO',
    'CULO',
    'FETO',
    'GUEY',
    'JOTO',
    'KACA',
    'KACO',
    'KAGA',
    'KAGO',
    'KAKA',
    'KOGE',
    'KOJO',
    'KULO',
    'MAME',
    'MAMO',
    'MEAR',
    'MEAS',
    'MEON',
    'MION',
    'MOCO',
    'MULA',
    'PEDA',
    'PEDO',
    'PENE',
    'PUTA',
    'PUTO',
    'QULO',
    'RATA',
    'RUIN',
]);
const checkAlphabet = '0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ';
const impl = {
    name: 'Mexican Tax Number',
    localName: 'Registro Federal de Contribuyentes',
    abbreviation: 'RFC',
    compact(input) {
        const [value, err] = clean(input);
        if (err) {
            throw err;
        }
        return value.toLocaleUpperCase();
    },
    format(input) {
        const [value] = clean(input);
        if (value.length === 12) {
            return util_1.strings.splitAt(value, 3, 9).join(' ');
        }
        if (value.length === 13) {
            return util_1.strings.splitAt(value, 4, 10).join(' ');
        }
        return util_1.strings.splitAt(value, 4).join(' ');
    },
    validate(input) {
        const [value, error] = clean(input);
        if (error) {
            return { isValid: false, error };
        }
        if (value.length === 10 || value.length === 13) {
            if (!/^[A-Z&Ñ]{4}[0-9]{6}([0-9A-Z]{3})?$/.test(value)) {
                return { isValid: false, error: new exceptions.InvalidComponent() };
            }
            if (nameBlacklist.has(value.substr(0, 4))) {
                return { isValid: false, error: new exceptions.InvalidComponent() };
            }
            if (!(0, util_1.isValidDateCompactYYMMDD)(value.substr(4, 6))) {
                return { isValid: false, error: new exceptions.InvalidComponent() };
            }
        }
        else if (value.length === 12) {
            if (!/^[A-Z&Ñ]{3}[0-9]{6}[0-9A-Z]{3}$/.test(value)) {
                return { isValid: false, error: new exceptions.InvalidComponent() };
            }
            if (!(0, util_1.isValidDateCompactYYMMDD)(value.substr(3, 6))) {
                return { isValid: false, error: new exceptions.InvalidComponent() };
            }
        }
        else {
            return { isValid: false, error: new exceptions.InvalidLength() };
        }
        if (value.length >= 12) {
            if (!/[1-9A-V][1-9A-Z][0-9A]$/.test(value)) {
                return { isValid: false, error: new exceptions.InvalidComponent() };
            }
            const [front, check] = util_1.strings.splitAt(value, -1);
            const sum = (0, util_1.weightedSum)(front.padStart(12, ' '), {
                modulus: 11,
                alphabet: checkAlphabet,
                weights: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                reverse: true,
            });
            const mod = 11 - (sum % 11);
            let val;
            if (mod === 11) {
                val = '0';
            }
            else if (mod === 10) {
                val = 'A';
            }
            else {
                val = String(mod);
            }
            if (check !== val) {
                return { isValid: false, error: new exceptions.InvalidChecksum() };
            }
        }
        return {
            isValid: true,
            compact: value,
            isIndividual: value.length !== 12,
            isCompany: value.length === 12,
        };
    },
};
exports.name = impl.name, exports.localName = impl.localName, exports.abbreviation = impl.abbreviation, exports.validate = impl.validate, exports.format = impl.format, exports.compact = impl.compact;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmZjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL214L3JmYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQThCQSwwREFBNEM7QUFDNUMsa0NBQXlFO0FBR3pFLFNBQVMsS0FBSyxDQUFDLEtBQWE7SUFDMUIsT0FBTyxjQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM1QyxDQUFDO0FBRUQsTUFBTSxhQUFhLEdBQUcsSUFBSSxHQUFHLENBQUM7SUFDNUIsTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07Q0FDUCxDQUFDLENBQUM7QUFFSCxNQUFNLGFBQWEsR0FBRyx5Q0FBeUMsQ0FBQztBQUtoRSxNQUFNLElBQUksR0FBYztJQUN0QixJQUFJLEVBQUUsb0JBQW9CO0lBQzFCLFNBQVMsRUFBRSxvQ0FBb0M7SUFDL0MsWUFBWSxFQUFFLEtBQUs7SUFDbkIsT0FBTyxDQUFDLEtBQWE7UUFDbkIsTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxLQUFLLENB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