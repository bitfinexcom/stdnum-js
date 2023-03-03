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
const faOffices = {
    '03': { office: 'Wien 3/6/7/11/15 Schwechat Gerasdorf', region: 'Wien' },
    '04': { office: 'Wien 4/5/10', region: 'Wien' },
    '06': { office: 'Wien 8/16/17', region: 'Wien' },
    '07': { office: 'Wien 9/18/19 Klosterneuburg', region: 'Wien' },
    '08': { office: 'Wien 12/13/14 Purkersdorf', region: 'Wien' },
    '09': { office: 'Wien 1/23', region: 'Wien' },
    '10': { office: 'für Gebühren, Verkehrsteuern und Glücksspiel', region: '' },
    '12': { office: 'Wien 2/20/21/22', region: 'Wien' },
    '15': { office: 'Amstetten Melk Scheibbs', region: 'Niederösterreich' },
    '16': { office: 'Baden Mödling', region: 'Niederösterreich' },
    '18': { office: 'Gänserndorf Mistelbach', region: 'Niederösterreich' },
    '22': { office: 'Hollabrunn Korneuburg Tulln', region: 'Niederösterreich' },
    '23': { office: 'Waldviertel', region: 'Niederösterreich' },
    '29': { office: 'Lilienfeld St. Pölten', region: 'Niederösterreich' },
    '33': { office: 'Neunkirchen Wr. Neustadt', region: 'Niederösterreich' },
    '38': {
        office: 'Bruck Eisenstadt Oberwart',
        region: 'Burgenland, Niederösterreich',
    },
    '41': { office: 'Braunau Ried Schärding', region: 'Oberösterreich' },
    '46': { office: 'Linz', region: 'Oberösterreich' },
    '51': { office: 'Kirchdorf Perg Steyr', region: 'Oberösterreich' },
    '52': { office: 'Freistadt Rohrbach Urfahr', region: 'Oberösterreich' },
    '53': { office: 'Gmunden Vöcklabruck', region: 'Oberösterreich' },
    '54': { office: 'Grieskirchen Wels', region: 'Oberösterreich' },
    '57': { office: 'Klagenfurt', region: 'Kärnten' },
    '59': { office: 'St. Veit Wolfsberg', region: 'Kärnten' },
    '61': { office: 'Spittal Villach', region: 'Kärnten' },
    '65': { office: 'Bruck Leoben Mürzzuschlag', region: 'Steiermark' },
    '67': { office: 'Oststeiermark', region: 'Steiermark' },
    '68': { office: 'Graz-Stadt', region: 'Steiermark' },
    '69': { office: 'Graz-Umgebung', region: 'Steiermark' },
    '71': { office: 'Judenburg Liezen', region: 'Steiermark' },
    '72': { office: 'Deutschlandsberg Leibnitz Voitsberg', region: 'Steiermark' },
    '81': { office: 'Innsbruck', region: 'Tirol' },
    '82': { office: 'Kitzbühel Lienz', region: 'Tirol' },
    '83': { office: 'Kufstein Schwaz', region: 'Tirol' },
    '84': { office: 'Landeck Reutte', region: 'Tirol' },
    '90': { office: 'St. Johann Tamsweg Zell am See', region: 'Salzburg' },
    '91': { office: 'Salzburg-Stadt', region: 'Salzburg' },
    '93': { office: 'Salzburg-Land', region: 'Salzburg' },
    '97': { office: 'Bregenz', region: 'Vorarlberg' },
    '98': { office: 'Feldkirch', region: 'Vorarlberg' },
};
function clean(input) {
    return util_1.strings.cleanUnicode(input, ' -./,');
}
const impl = {
    name: 'Austrian Tax Identification Number',
    localName: 'Abgabenkontonummer',
    abbreviation: 'TIN',
    compact(input) {
        const [value, err] = clean(input);
        if (err) {
            throw err;
        }
        return value;
    },
    format(input) {
        const [value] = clean(input);
        const [a, b, c] = util_1.strings.splitAt(value, 2, 5);
        return `${a}-${b}/${c}`;
    },
    validate(input) {
        const [value, error] = clean(input);
        if (error) {
            return { isValid: false, error };
        }
        if (value.length !== 9) {
            return { isValid: false, error: new exceptions.InvalidLength() };
        }
        if (!util_1.strings.isdigits(value)) {
            return { isValid: false, error: new exceptions.InvalidComponent() };
        }
        const [office, front, check] = util_1.strings.splitAt(value, 2, 8);
        if (faOffices[office] === undefined) {
            return { isValid: false, error: new exceptions.InvalidComponent() };
        }
        const sum = `${office}${front}`
            .split('')
            .map(x => parseInt(x, 10))
            .reduce((acc, digit, idx) => acc + (idx % 2 === 1 ? [0, 2, 4, 6, 8, 1, 3, 5, 7, 9][digit] : digit), 0);
        const digit = String((10 - (sum % 10)) % 10);
        if (check !== digit) {
            return { isValid: false, error: new exceptions.InvalidChecksum() };
        }
        return {
            isValid: true,
            compact: value,
            isIndividual: false,
            isCompany: true,
        };
    },
};
exports.name = impl.name, exports.localName = impl.localName, exports.abbreviation = impl.abbreviation, exports.validate = impl.validate, exports.format = impl.format, exports.compact = impl.compact;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2F0L3Rpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQSwwREFBNEM7QUFDNUMsa0NBQWtDO0FBS2xDLE1BQU0sU0FBUyxHQUFHO0lBQ2hCLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxzQ0FBc0MsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFO0lBQ3hFLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRTtJQUMvQyxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUU7SUFDaEQsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLDZCQUE2QixFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUU7SUFDL0QsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLDJCQUEyQixFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUU7SUFDN0QsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFO0lBQzdDLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSw4Q0FBOEMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO0lBQzVFLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFO0lBQ25ELElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLEVBQUUsa0JBQWtCLEVBQUU7SUFDdkUsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsa0JBQWtCLEVBQUU7SUFDN0QsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLHdCQUF3QixFQUFFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRTtJQUN0RSxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUs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