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
function clean(input) {
    return util_1.strings.cleanUnicode(input, ' -.');
}
function checksum(value) {
    const nineCharValue = value.padStart(9, '0');
    const sum = (0, checksum_1.weightedSum)(nineCharValue, {
        weights: [9, 8, 7, 6, 5, 4, 3, 2, -1],
        modulus: 10000,
    });
    return sum % 11 === 0;
}
const impl = {
    name: 'Dutch Citizen Identification Number',
    localName: 'Burgerservicenummer',
    abbreviation: 'BSN',
    compact(input) {
        const [value, err] = clean(input);
        if (err) {
            throw err;
        }
        return value;
    },
    format(input) {
        const [value] = clean(input);
        return util_1.strings.splitAt(value, 4, 6).join('.');
    },
    validate(input) {
        const [value, error] = clean(input);
        if (error) {
            return { isValid: false, error };
        }
        if (![8, 9].includes(value.length)) {
            return { isValid: false, error: new exceptions.InvalidLength() };
        }
        if (!util_1.strings.isdigits(value)) {
            return { isValid: false, error: new exceptions.InvalidFormat() };
        }
        if (!checksum(value)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnNuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL25sL2Jzbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQSwwREFBNEM7QUFDNUMsa0NBQWtDO0FBRWxDLCtDQUErQztBQUUvQyxTQUFTLEtBQUssQ0FBQyxLQUFhO0lBQzFCLE9BQU8sY0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDNUMsQ0FBQztBQUVELFNBQVMsUUFBUSxDQUFDLEtBQWE7SUFDN0IsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDN0MsTUFBTSxHQUFHLEdBQUcsSUFBQSxzQkFBVyxFQUFDLGFBQWEsRUFBRTtRQUNyQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sRUFBRSxLQUFLO0tBQ2YsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxHQUFHLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUN4QixDQUFDO0FBRUQsTUFBTSxJQUFJLEdBQWM7SUFDdEIsSUFBSSxFQUFFLHFDQUFxQztJQUMzQyxTQUFTLEVBQUUscUJBQXFCO0lBQ2hDLFlBQVksRUFBRSxLQUFLO0lBQ25CLE9BQU8sQ0FBQyxLQUFhO1FBQ25CLE1BQU0sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWxDLElBQUksR0FBRyxFQUFFO1lBQ1AsTUFBTSxHQUFHLENBQUM7U0FDWDtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFhO1FBQ2xCLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFN0IsT0FBTyxjQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxRQUFRLENBQUMsS0FBYTtRQUNwQixNQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVwQyxJQUFJLEtBQUssRUFBRTtZQUNULE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDO1NBQ2xDO1FBQ0QsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDbEMsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksVUFBVSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUM7U0FDbEU7UUFDRCxJQUFJLENBQUMsY0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM1QixPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxVQUFVLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQztTQUNsRTtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDcEIsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksVUFBVSxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUM7U0FDcEU7UUFFRCxPQUFPO1lBQ0wsT0FBTyxFQUFFLElBQUk7WUFDYixPQUFPLEVBQUUsS0FBSztZQUNkLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFNBQVMsRUFBRSxLQUFLO1NBQ2pCLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQztBQUVhLFlBQUksR0FDakIsSUFBSSxPQURlLGlCQUFTLEdBQzVCLElBQUksWUFEMEIsb0JBQVksR0FDMUMsSUFBSSxlQUR3QyxnQkFBUSxHQUNwRCxJQUFJLFdBRGtELGNBQU0sR0FDNUQsSUFBSSxTQUQwRCxlQUFPLEdBQ3JFLElBQUksU0FBQyJ9