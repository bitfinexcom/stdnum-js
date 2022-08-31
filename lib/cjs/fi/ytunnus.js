"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compact = exports.format = exports.validate = exports.abbreviation = exports.localName = exports.name = void 0;
const util_1 = require("../util");
const alv_1 = require("./alv");
function clean(input) {
    return util_1.strings.cleanUnicode(input, ' -');
}
const impl = {
    name: 'Finnish Business Identifier',
    localName: 'Yritys- ja yhteisötunnus',
    abbreviation: 'Y-tunnus',
    compact(input) {
        const [value, err] = clean(input);
        if (err) {
            throw err;
        }
        return value;
    },
    format(input) {
        const [value] = clean(input);
        return util_1.strings.splitAt(value, -1).join('-');
    },
    validate(input) {
        const [value, error] = clean(input);
        if (error) {
            return { isValid: false, error };
        }
        return (0, alv_1.validate)(value);
    },
};
exports.name = impl.name, exports.localName = impl.localName, exports.abbreviation = impl.abbreviation, exports.validate = impl.validate, exports.format = impl.format, exports.compact = impl.compact;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXR1bm51cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9maS95dHVubnVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQVFBLGtDQUFrQztBQUVsQywrQkFBZ0Q7QUFFaEQsU0FBUyxLQUFLLENBQUMsS0FBYTtJQUMxQixPQUFPLGNBQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUFFRCxNQUFNLElBQUksR0FBYztJQUN0QixJQUFJLEVBQUUsNkJBQTZCO0lBQ25DLFNBQVMsRUFBRSwwQkFBMEI7SUFDckMsWUFBWSxFQUFFLFVBQVU7SUFDeEIsT0FBTyxDQUFDLEtBQWE7UUFDbkIsTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFbEMsSUFBSSxHQUFHLEVBQUU7WUFDUCxNQUFNLEdBQUcsQ0FBQztTQUNYO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQWE7UUFDbEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU3QixPQUFPLGNBQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBYTtRQUNwQixNQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVwQyxJQUFJLEtBQUssRUFBRTtZQUNULE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDO1NBQ2xDO1FBRUQsT0FBTyxJQUFBLGNBQVcsRUFBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDO0NBQ0YsQ0FBQztBQUVhLFlBQUksR0FDakIsSUFBSSxPQURlLGlCQUFTLEdBQzVCLElBQUksWUFEMEIsb0JBQVksR0FDMUMsSUFBSSxlQUR3QyxnQkFBUSxHQUNwRCxJQUFJLFdBRGtELGNBQU0sR0FDNUQsSUFBSSxTQUQwRCxlQUFPLEdBQ3JFLElBQUksU0FBQyJ9