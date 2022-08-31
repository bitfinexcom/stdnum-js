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
    return util_1.strings.cleanUnicode(input, ' -:');
}
function checkBirthdate(value) {
    let [dd, mm, yy, rest] = util_1.strings
        .splitAt(value, 2, 4, 6, 9)
        .map(v => parseInt(v, 10));
    if (dd > 40) {
        dd -= 40;
    }
    if (mm > 40) {
        mm -= 40;
    }
    if (rest < 500) {
        yy += 1900;
    }
    else if (rest < 750 && yy > 54) {
        yy += 1800;
    }
    else if (rest < 1000 && yy < 40) {
        yy += 2000;
    }
    else if (rest < 1000 && yy >= 40) {
        yy += 1900;
    }
    else {
        return false;
    }
    return (0, util_1.isValidDate)(String(yy), String(mm), String(dd));
}
const impl = {
    name: 'Norwegian National Identity Number',
    localName: 'Fødselsnummer',
    compact(input) {
        const [value, err] = clean(input);
        if (err) {
            throw err;
        }
        return value;
    },
    format(input) {
        const [value] = clean(input);
        return util_1.strings.splitAt(value, 6).join(' ');
    },
    validate(input) {
        const [value, error] = clean(input);
        if (error) {
            return { isValid: false, error };
        }
        if (value.length !== 11) {
            return { isValid: false, error: new exceptions.InvalidLength() };
        }
        if (!util_1.strings.isdigits(value)) {
            return { isValid: false, error: new exceptions.InvalidFormat() };
        }
        if (!checkBirthdate(value)) {
            return { isValid: false, error: new exceptions.InvalidComponent() };
        }
        const [front1, check1] = util_1.strings.splitAt(value, 9, 10);
        const [front2, check2] = util_1.strings.splitAt(value, 10);
        const sum1 = (0, util_1.weightedSum)(front1, {
            weights: [3, 7, 6, 1, 8, 9, 4, 5, 2],
            modulus: 11,
        });
        const sum2 = (0, util_1.weightedSum)(front2, {
            weights: [5, 4, 3, 2, 7, 6, 5, 4, 3, 2],
            modulus: 11,
        });
        if (String(11 - sum1) !== check1 || String(11 - sum2) !== check2) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9kc2Vsc251bW1lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9uby9mb2RzZWxzbnVtbWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBY0EsMERBQTRDO0FBQzVDLGtDQUE0RDtBQUc1RCxTQUFTLEtBQUssQ0FBQyxLQUFhO0lBQzFCLE9BQU8sY0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDNUMsQ0FBQztBQUVELFNBQVMsY0FBYyxDQUFDLEtBQWE7SUFFbkMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLGNBQU87U0FDN0IsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDMUIsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBSTdCLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUNYLEVBQUUsSUFBSSxFQUFFLENBQUM7S0FDVjtJQUdELElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUNYLEVBQUUsSUFBSSxFQUFFLENBQUM7S0FDVjtJQUNELElBQUksSUFBSSxHQUFHLEdBQUcsRUFBRTtRQUNkLEVBQUUsSUFBSSxJQUFJLENBQUM7S0FDWjtTQUFNLElBQUksSUFBSSxHQUFHLEdBQUcsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ2hDLEVBQUUsSUFBSSxJQUFJLENBQUM7S0FDWjtTQUFNLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ2pDLEVBQUUsSUFBSSxJQUFJLENBQUM7S0FDWjtTQUFNLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ2xD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