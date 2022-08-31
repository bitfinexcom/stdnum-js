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
    return util_1.strings.cleanUnicode(input, ' -./,');
}
function buildMatch(fmt) {
    const pattern = fmt.replace(/([FBUP])\1*/g, m => {
        return `(\\d{${m.length}})`;
    });
    const matcher = new RegExp(`^${pattern}$`);
    return (value) => {
        var _a, _b, _c, _d;
        const m = matcher.exec(value);
        if (!m) {
            return { match: false };
        }
        return {
            match: true,
            f: (_a = m[1]) !== null && _a !== void 0 ? _a : '',
            b: (_b = m[2]) !== null && _b !== void 0 ? _b : '',
            u: (_c = m[3]) !== null && _c !== void 0 ? _c : '',
            p: (_d = m[4]) !== null && _d !== void 0 ? _d : '',
        };
    };
}
function buildMatcher(rfmt, cfmt) {
    return {
        region: buildMatch(rfmt),
        country: buildMatch(cfmt),
    };
}
const REGION_FORMATS = {
    'DE-BW': buildMatcher('FFBBBUUUUP', '28FF0BBBUUUUP'),
    'DE-BY': buildMatcher('FFFBBBUUUUP', '9FFF0BBBUUUUP'),
    'DE-BE': buildMatcher('FFBBBUUUUP', '11FF0BBBUUUUP'),
    'DE-BB': buildMatcher('0FFBBBUUUUP', '30FF0BBBUUUUP'),
    'DE-HB': buildMatcher('FFBBBUUUUP', '24FF0BBBUUUUP'),
    'DE-HH': buildMatcher('FFBBBUUUUP', '22FF0BBBUUUUP'),
    'DE-HE': buildMatcher('0FFBBBUUUUP', '26FF0BBBUUUUP'),
    'DE-MV': buildMatcher('0FFBBBUUUUP', '40FF0BBBUUUUP'),
    'DE-NI': buildMatcher('FFBBBUUUUP', '23FF0BBBUUUUP'),
    'DE-NW': buildMatcher('FFFBBBBUUUP', '5FFF0BBBBUUUP'),
    'DE-RP': buildMatcher('FFBBBUUUUP', '27FF0BBBUUUUP'),
    'DE-SL': buildMatcher('0FFBBBUUUUP', '10FF0BBBUUUUP'),
    'DE-SN': buildMatcher('2FFBBBUUUUP', '32FF0BBBUUUUP'),
    'DE-ST': buildMatcher('1FFBBBUUUUP', '31FF0BBBUUUUP'),
    'DE-SH': buildMatcher('FFBBBUUUUP', '21FF0BBBUUUUP'),
    'DE-TH': buildMatcher('1FFBBBUUUUP', '41FF0BBBUUUUP'),
};
function findMatch(value) {
    let result = null;
    Object.values(REGION_FORMATS).some(({ region, country }) => {
        const rResult = region(value);
        if (rResult.match) {
            result = rResult;
            return true;
        }
        const cResult = country(value);
        if (cResult.match) {
            result = cResult;
            return true;
        }
        return false;
    });
    return result;
}
const impl = {
    name: 'German Tax Number',
    localName: 'Steuernummer',
    abbreviation: ' St.-Nr.',
    compact(input) {
        const [value, err] = clean(input);
        if (err) {
            throw err;
        }
        return value;
    },
    format(input) {
        const [value] = clean(input);
        const match = findMatch(input);
        if (!match || !match.match) {
            return value;
        }
        return `${match.f}/${match.b}/${match.u} ${match.p}`;
    },
    validate(input) {
        const [value, error] = clean(input);
        if (error) {
            return { isValid: false, error };
        }
        if (![10, 11, 13].includes(value.length)) {
            return { isValid: false, error: new exceptions.InvalidLength() };
        }
        if (!util_1.strings.isdigits(value)) {
            return { isValid: false, error: new exceptions.InvalidFormat() };
        }
        if (findMatch(value) === null) {
            return { isValid: false, error: new exceptions.InvalidFormat() };
        }
        const counter = {};
        value
            .substring(0, 10)
            .split('')
            .forEach(v => {
            var _a;
            counter[v] = ((_a = counter[v]) !== null && _a !== void 0 ? _a : 0) + 1;
        });
        const more = Object.values(counter);
        if (!more.some(v => v === 2 || v === 3)) {
            return { isValid: false, error: new exceptions.InvalidComponent() };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Ruci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZS9zdG5yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBLDBEQUE0QztBQUM1QyxrQ0FBa0M7QUFJbEMsU0FBUyxLQUFLLENBQUMsS0FBYTtJQUMxQixPQUFPLGNBQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzlDLENBQUM7QUFjRCxTQUFTLFVBQVUsQ0FBQyxHQUFXO0lBQzdCLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxFQUFFO1FBQzlDLE9BQU8sUUFBUSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUM7SUFDOUIsQ0FBQyxDQUFDLENBQUM7SUFDSCxNQUFNLE9BQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFFM0MsT0FBTyxDQUFDLEtBQWEsRUFBUyxFQUFFOztRQUM5QixNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTlCLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDTixPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDO1NBQ3pCO1FBRUQsT0FBTztZQUNMLEtBQUssRUFBRSxJQUFJO1lBQ1gsQ0FBQyxFQUFFLE1BQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQ0FBSSxFQUFFO1lBQ2IsQ0FBQyxFQUFFLE1BQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQ0FBSSxFQUFFO1lBQ2IsQ0FBQyxFQUFFLE1BQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQ0FBSSxFQUFFO1lBQ2IsQ0FBQyxFQUFFLE1BQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQ0FBSSxFQUFFO1NBQ2QsQ0FBQztJQUNKLENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRCxT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