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
const checksum_1 = require("../util/checksum");
const AREA_NUMBER_OPTIONS = [
    '02',
    '03',
    '04',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '23',
    '24',
    '25',
    '26',
    '28',
    '29',
    '38',
    '39',
    '40',
    '80',
    '81',
    '82',
    '89',
].concat([...Array(79 - 42 + 1).keys()].map(x => (x + 42).toString()));
const BIRTH_MONTH_OPTIONS = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
];
const checkAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const checkAlphabetDict = checkAlphabet
    .split('')
    .reduce((acc, c, idx) => (Object.assign(Object.assign({}, acc), { [c]: String(idx + 1).padStart(2, '0') })), {});
function clean(input) {
    return util_1.strings.cleanUnicode(input, ' -./,');
}
const impl = {
    name: 'German Pension Insurance Number',
    localName: 'Sozialversicherungsnummer',
    abbreviation: 'SVNR',
    compact(input) {
        const [value, err] = clean(input);
        if (err) {
            throw err;
        }
        return value;
    },
    format(input) {
        const [value] = clean(input);
        return util_1.strings.splitAt(value, 2, 8, 9).join(' ');
    },
    validate(input) {
        const [value, error] = clean(input);
        if (error) {
            return { isValid: false, error };
        }
        if (value.length !== 12) {
            return { isValid: false, error: new exceptions.InvalidLength() };
        }
        if (!util_1.strings.isalphanumeric(value)) {
            return { isValid: false, error: new exceptions.InvalidFormat() };
        }
        if (!AREA_NUMBER_OPTIONS.includes(value.substring(0, 2))) {
            return { isValid: false, error: new exceptions.InvalidComponent() };
        }
        if (!util_1.strings.isdigits(value.substring(2, 4))) {
            return { isValid: false, error: new exceptions.InvalidComponent() };
        }
        if (!BIRTH_MONTH_OPTIONS.includes(value.substring(4, 6))) {
            return { isValid: false, error: new exceptions.InvalidComponent() };
        }
        if (!util_1.strings.isdigits(value.substring(6, 8))) {
            return { isValid: false, error: new exceptions.InvalidComponent() };
        }
        if (!util_1.strings.isalpha(value[8])) {
            return { isValid: false, error: new exceptions.InvalidComponent() };
        }
        if (!util_1.strings.isdigits(value.substring(9, 11))) {
            return { isValid: false, error: new exceptions.InvalidComponent() };
        }
        const [frontWithAlpha, check] = util_1.strings.splitAt(value, 11);
        const front = frontWithAlpha
            .split('')
            .map(c => { var _a; return (_a = checkAlphabetDict[c]) !== null && _a !== void 0 ? _a : c; })
            .join('');
        const sum = (0, checksum_1.weightedSum)(front, {
            weights: [2, 1, 2, 5, 7, 1, 2, 1, 2, 1, 2, 1],
            modulus: 10,
            sumByDigit: true,
        });
        if (String(sum % 10) !== check) {
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
exports.name = impl.name, exports.localName = impl.localName, exports.abbreviation = impl.abbreviation, exports.validate = impl.validate, exports.format = impl.format, exports.compact = impl.compact;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Zuci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZS9zdm5yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBYUEsMERBQTRDO0FBQzVDLGtDQUFrQztBQUNsQywrQ0FBK0M7QUFHL0MsTUFBTSxtQkFBbUIsR0FBRztJQUMxQixJQUFJO0lBQ0osSUFBSTtJQUNKLElBQUk7SUFDSixJQUFJO0lBQ0osSUFBSTtJQUNKLElBQUk7SUFDSixJQUFJO0lBQ0osSUFBSTtJQUNKLElBQUk7SUFDSixJQUFJO0lBQ0osSUFBSTtJQUNKLElBQUk7SUFDSixJQUFJO0lBQ0osSUFBSTtJQUNKLElBQUk7SUFDSixJQUFJO0lBQ0osSUFBSTtJQUNKLElBQUk7SUFDSixJQUFJO0lBQ0osSUFBSTtJQUNKLElBQUk7SUFDSixJQUFJO0lBQ0osSUFBSTtJQUNKLElBQUk7SUFDSixJQUFJO0lBQ0osSUFBSTtJQUNKLElBQUk7SUFDSixJQUFJO0lBQ0osSUFBSTtJQUNKLElBQUk7Q0FDTCxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFdkUsTUFBTSxtQkFBbUIsR0FBRztJQUMxQixJQUFJO0lBQ0osSUFBSTtJQUNKLElBQUk7SUFDSixJQUFJO0lBQ0osSUFBSTtJQUNKLElBQUk7SUFDSixJQUFJO0lBQ0osSUFBSTtJQUNKLElBQUk7SUFDSixJQUFJO0lBQ0osSUFBSTtJQUNKLElBQUk7Q0FDTCxDQUFDO0FBRUYsTUFBTSxhQUFhLEdBQUcsNEJBQTRCLENBQUM7QUFDbkQsTUFBTSxpQkFBaUIsR0FBMkIsYUFBYTtLQUM1RCxLQUFL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