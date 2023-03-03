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
exports.compact = exports.format = exports.validate = exports.abbreviation = exports.localName = exports.name = exports.getBirthDate = exports.getGender = void 0;
const exceptions = __importStar(require("../exceptions"));
const util_1 = require("../util");
function clean(input) {
    return util_1.strings.cleanUnicode(input, ' ');
}
const nameBlacklist = new Set([
    'BACA',
    'BAKA',
    'BUEI',
    'BUEY',
    'CACA',
    'CACO',
    'CAGA',
    'CAGO',
    'CAKA',
    'CAKO',
    'COGE',
    'COGI',
    'COJA',
    'COJE',
    'COJI',
    'COJO',
    'COLA',
    'CULO',
    'FALO',
    'FETO',
    'GETA',
    'GUEI',
    'GUEY',
    'JETA',
    'JOTO',
    'KACA',
    'KACO',
    'KAGA',
    'KAGO',
    'KAKA',
    'KAKO',
    'KOGE',
    'KOGI',
    'KOJA',
    'KOJE',
    'KOJI',
    'KOJO',
    'KOLA',
    'KULO',
    'LILO',
    'LOCA',
    'LOCO',
    'LOKA',
    'LOKO',
    'MAME',
    'MAMO',
    'MEAR',
    'MEAS',
    'MEON',
    'MIAR',
    'MION',
    'MOCO',
    'MOKO',
    'MULA',
    'MULO',
    'NACA',
    'NACO',
    'PEDA',
    'PEDO',
    'PENE',
    'PIPI',
    'PITO',
    'POPO',
    'PUTA',
    'PUTO',
    'QULO',
    'RATA',
    'ROBA',
    'ROBE',
    'ROBO',
    'RUIN',
    'SENO',
    'TETA',
    'VACA',
    'VAGA',
    'VAGO',
    'VAKA',
    'VUEI',
    'VUEY',
    'WUEI',
    'WUEY',
]);
const validStates = new Set([
    'AS',
    'BC',
    'BS',
    'CC',
    'CH',
    'CL',
    'CM',
    'CS',
    'DF',
    'DG',
    'GR',
    'GT',
    'HG',
    'JC',
    'MC',
    'MN',
    'MS',
    'NE',
    'NL',
    'NT',
    'OC',
    'PL',
    'QR',
    'QT',
    'SL',
    'SP',
    'SR',
    'TC',
    'TL',
    'TS',
    'VZ',
    'YN',
    'ZS',
]);
const checkAlphabet = '0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ';
const checkAlphabetDict = checkAlphabet
    .split('')
    .reduce((acc, c, idx) => (Object.assign(Object.assign({}, acc), { [c]: idx })), {});
const impl = {
    name: 'Mexican Personal Identification',
    localName: 'Clave Única de Registro de Población',
    abbreviation: 'CURP',
    compact(input) {
        const [value, err] = clean(input);
        if (err) {
            throw err;
        }
        return value.toLocaleUpperCase();
    },
    format(input) {
        const [value] = clean(input);
        return value;
    },
    validate(input) {
        const [value, error] = clean(input);
        if (error) {
            return { isValid: false, error };
        }
        if (value.length !== 18) {
            return { isValid: false, error: new exceptions.InvalidLength() };
        }
        if (!/^[A-Z]{4}[0-9]{6}[A-Z]{6}[0-9A-Z][0-9]$/.test(value)) {
            return { isValid: false, error: new exceptions.InvalidFormat() };
        }
        if (!(0, util_1.isValidDateCompactYYMMDD)(value.substr(4, 6))) {
            return { isValid: false, error: new exceptions.InvalidComponent() };
        }
        if (nameBlacklist.has(value.substr(0, 4))) {
            return { isValid: false, error: new exceptions.InvalidComponent() };
        }
        if (!['H', 'M'].includes(value[10])) {
            return { isValid: false, error: new exceptions.InvalidComponent() };
        }
        if (!validStates.has(value.substr(11, 2))) {
            return { isValid: false, error: new exceptions.InvalidComponent() };
        }
        const check = value
            .substr(0, 17)
            .split('')
            .reduce((acc, c, idx) => { var _a; return acc + ((_a = checkAlphabetDict[c]) !== null && _a !== void 0 ? _a : 0) * (18 - idx); }, 0);
        const checkStr = String((10 - (check % 10)) % 10);
        if (checkStr !== value.substr(17, 1)) {
            return { isValid: false, error: new exceptions.InvalidChecksum() };
        }
        return {
            isValid: true,
            compact: value,
            isIndividual: true,
            isCompany: false,
        };
    },
};
function getBirthDateImpl(value) {
    const parts = util_1.strings.splitAt(value, 4, 6, 8);
    const yyN = parseInt(parts[1], 10);
    const mmN = parseInt(parts[2], 10) - 1;
    const ddN = parseInt(parts[3], 10);
    if (!Number.isNaN(parseInt(value[16], 10))) {
        return new Date(yyN + 1900, mmN, ddN);
    }
    return new Date(yyN + 2000, mmN, ddN);
}
function getGender(input) {
    const value = impl.compact(input);
    return value[10] === 'H' ? 'M' : 'F';
}
exports.getGender = getGender;
function getBirthDate(input) {
    const value = impl.compact(input);
    return getBirthDateImpl(value);
}
exports.getBirthDate = getBirthDate;
exports.name = impl.name, exports.localName = impl.localName, exports.abbreviation = impl.abbreviation, exports.validate = impl.validate, exports.format = impl.format, exports.compact = impl.compact;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9teC9jdXJwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZUEsMERBQTRDO0FBQzVDLGtDQUE0RDtBQUc1RCxTQUFTLEtBQUssQ0FBQyxLQUFhO0lBQzFCLE9BQU8sY0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDMUMsQ0FBQztBQUVELE1BQU0sYUFBYSxHQUFHLElBQUksR0FBRyxDQUFDO0lBQzVCLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFD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