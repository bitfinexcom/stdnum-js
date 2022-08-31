"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isalpha = exports.isdigits = exports.isalphanumeric = void 0;
const alphanumericRE = /^[A-Za-z0-9]+$/;
const digitRE = /^[0-9]+$/;
const alphaRE = /^[A-Za-z]+$/;
function isalphanumeric(value) {
    return alphanumericRE.test(value);
}
exports.isalphanumeric = isalphanumeric;
function isdigits(value) {
    return digitRE.test(value);
}
exports.isdigits = isdigits;
function isalpha(value) {
    return alphaRE.test(value);
}
exports.isalpha = isalpha;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91dGlsL3N0cmluZ3MvY2hhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFNLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQztBQUN4QyxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUM7QUFDM0IsTUFBTSxPQUFPLEdBQUcsYUFBYSxDQUFDO0FBSzlCLFNBQWdCLGNBQWMsQ0FBQyxLQUFhO0lBQzFDLE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwQyxDQUFDO0FBRkQsd0NBRUM7QUFFRCxTQUFnQixRQUFRLENBQUMsS0FBYTtJQUNwQyxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDN0IsQ0FBQztBQUZELDRCQUVDO0FBRUQsU0FBZ0IsT0FBTyxDQUFDLEtBQWE7SUFDbkMsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzdCLENBQUM7QUFGRCwwQkFFQyJ9