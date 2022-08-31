"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPattern = void 0;
function formatPattern(pattern, input) {
    const values = input.split('');
    return pattern
        .split('')
        .map(c => {
        if (c === '?') {
            return values.shift();
        }
        return c;
    })
        .join('');
}
exports.formatPattern = formatPattern;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3V0aWwvc3RyaW5ncy9mb3JtYXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBS0EsU0FBZ0IsYUFBYSxDQUFDLE9BQWUsRUFBRSxLQUFhO0lBQzFELE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFL0IsT0FBTyxPQUFPO1NBQ1gsS0FBSyxDQUFDLEVBQUUsQ0FBQztTQUNULEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNQLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRTtZQUNiLE9BQU8sTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3ZCO1FBQ0QsT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDZCxDQUFDO0FBWkQsc0NBWUMifQ==