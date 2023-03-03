"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compact = exports.format = exports.validate = exports.abbreviation = exports.localName = exports.name = void 0;
const util_1 = require("../util");
const nn_1 = require("./nn");
const bis_1 = require("./bis");
function clean(input) {
    return util_1.strings.cleanUnicode(input, ' -.');
}
const impl = {
    name: 'Belgian Social Security Identification Number',
    localName: 'Identificatienummer van de Sociale Zekerheid',
    abbreviation: 'INSZ, NISS',
    compact(input) {
        const [value, err] = clean(input);
        if (err) {
            throw err;
        }
        return value;
    },
    format(input) {
        const [value] = clean(input);
        return value;
    },
    validate(input) {
        const results = [(0, nn_1.validate)(input), (0, bis_1.validate)(input)];
        const validResult = results.find(r => r.isValid);
        if (validResult)
            return validResult;
        const checksumErrorResult = results.find(r => r.error && r.error.name === 'InvalidChecksum');
        return checksumErrorResult || results[0];
    },
};
exports.name = impl.name, exports.localName = impl.localName, exports.abbreviation = impl.abbreviation, exports.validate = impl.validate, exports.format = impl.format, exports.compact = impl.compact;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zei5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iZS9pbnN6LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQVdBLGtDQUFrQztBQUNsQyw2QkFBOEM7QUFDOUMsK0JBQWdEO0FBR2hELFNBQVMsS0FBSyxDQUFDLEtBQWE7SUFDMUIsT0FBTyxjQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM1QyxDQUFDO0FBRUQsTUFBTSxJQUFJLEdBQWM7SUFDdEIsSUFBSSxFQUFFLCtDQUErQztJQUNyRCxTQUFTLEVBQUUsOENBQThDO0lBQ3pELFlBQVksRUFBRSxZQUFZO0lBQzFCLE9BQU8sQ0FBQyxLQUFhO1FBQ25CLE1BQU0sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWxDLElBQUksR0FBRyxFQUFFO1lBQ1AsTUFBTSxHQUFHLENBQUM7U0FDWDtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUNELE1BQU0sQ0FBQyxLQUFhO1FBQ2xCLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBQ0QsUUFBUSxDQUFDLEtBQWE7UUFDcEIsTUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFBLGFBQVUsRUFBQyxLQUFLLENBQUMsRUFBRSxJQUFBLGNBQVcsRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakQsSUFBSSxXQUFXO1lBQUUsT0FBTyxXQUFXLENBQUM7UUFNcEMsTUFBTSxtQkFBbUIsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzdGLE9BQU8sbUJBQW1CLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7Q0FDRixDQUFDO0FBRWEsWUFBSSxHQUNqQixJQUFJLE9BRGUsaUJBQVMsR0FDNUIsSUFBSSxZQUQwQixvQkFBWSxHQUMxQyxJQUFJLGVBRHdDLGdCQUFRLEdBQ3BELElBQUksV0FEa0QsY0FBTSxHQUM1RCxJQUFJLFNBRDBELGVBQU8sR0FDckUsSUFBSSxTQUFDIn0=