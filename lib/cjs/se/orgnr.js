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
const impl = {
    name: 'Swedish Company Number',
    localName: 'Organisationsnummer',
    abbreviation: 'Orgnr',
    compact(input) {
        const [value, err] = clean(input);
        if (err) {
            throw err;
        }
        return value;
    },
    format(input) {
        const [value] = clean(input);
        return util_1.strings.splitAt(value, -4).join('-');
    },
    validate(input) {
        const [value, error] = clean(input);
        if (error) {
            return { isValid: false, error };
        }
        if (value.length !== 10) {
            return { isValid: false, error: new exceptions.InvalidLength() };
        }
        if (!util_1.strings.isdigits(value)) {
            return { isValid: false, error: new exceptions.InvalidFormat() };
        }
        if (!(0, checksum_1.luhnChecksumValidate)(value)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnbnIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2Uvb3JnbnIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFXQSwwREFBNEM7QUFDNUMsa0NBQWtDO0FBRWxDLCtDQUF3RDtBQUV4RCxTQUFTLEtBQUssQ0FBQyxLQUFhO0lBQzFCLE9BQU8sY0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDNUMsQ0FBQztBQUVELE1BQU0sSUFBSSxHQUFjO0lBQ3RCLElBQUksRUFBRSx3QkFBd0I7SUFDOUIsU0FBUyxFQUFFLHFCQUFxQjtJQUNoQyxZQUFZLEVBQUUsT0FBTztJQUNyQixPQUFPLENBQUMsS0FBYTtRQUNuQixNQUFNLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVsQyxJQUFJLEdBQUcsRUFBRTtZQUNQLE1BQU0sR0FBRyxDQUFDO1NBQ1g7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBYTtRQUNsQixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTdCLE9BQU8sY0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFhO1FBQ3BCLE1BQU0sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXBDLElBQUksS0FBSyxFQUFFO1lBQ1QsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUM7U0FDbEM7UUFDRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssRUFBRSxFQUFFO1lBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLFVBQVUsQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDO1NBQ2xFO1FBQ0QsSUFBSSxDQUFDLGNBQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDNUIsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksVUFBVSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUM7U0FDbEU7UUFFRCxJQUFJLENBQUMsSUFBQSwrQkFBb0IsRUFBQyxLQUFLLENBQUMsRUFBRTtZQUNoQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxVQUFVLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQztTQUNwRTtRQUVELE9BQU87WUFDTCxPQUFPLEVBQUUsSUFBSTtZQUNiLE9BQU8sRUFBRSxLQUFLO1lBQ2QsWUFBWSxFQUFFLEtBQUs7WUFDbkIsU0FBUyxFQUFFLElBQUk7U0FDaEIsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFDO0FBRWEsWUFBSSxHQUNqQixJQUFJLE9BRGUsaUJBQVMsR0FDNUIsSUFBSSxZQUQwQixvQkFBWSxHQUMxQyxJQUFJLGVBRHdDLGdCQUFRLEdBQ3BELElBQUksV0FEa0QsY0FBTSxHQUM1RCxJQUFJLFNBRDBELGVBQU8sR0FDckUsSUFBSSxTQUFDIn0=