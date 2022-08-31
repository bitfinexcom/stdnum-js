"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidComponent = exports.InvalidLength = exports.InvalidChecksum = exports.InvalidFormat = exports.ValidationError = void 0;
class ValidationError extends Error {
    constructor(msg) {
        super(msg);
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
class InvalidFormat extends ValidationError {
    constructor(msg = 'The number has an invlidad format.') {
        super(msg);
        this.name = 'InvalidFormat';
    }
}
exports.InvalidFormat = InvalidFormat;
class InvalidChecksum extends ValidationError {
    constructor(msg = "The number number's checksum or check digit is invalid.") {
        super(msg);
        this.name = 'InvalidChecksum';
    }
}
exports.InvalidChecksum = InvalidChecksum;
class InvalidLength extends ValidationError {
    constructor(msg = 'The number has an invalid length.') {
        super(msg);
        this.name = 'InvalidLength';
    }
}
exports.InvalidLength = InvalidLength;
class InvalidComponent extends ValidationError {
    constructor(msg = 'One of the parts of the number are invalid or unknown.') {
        super(msg);
        this.name = 'InvalidComponent';
    }
}
exports.InvalidComponent = InvalidComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjZXB0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9leGNlcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQWFBLE1BQWEsZUFBZ0IsU0FBUSxLQUFLO0lBQ3hDLFlBQVksR0FBVztRQUNyQixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsSUFBSSxHQUFHLGlCQUFpQixDQUFDO0lBQ2hDLENBQUM7Q0FDRjtBQUxELDBDQUtDO0FBUUQsTUFBYSxhQUFjLFNBQVEsZUFBZTtJQUNoRCxZQUFZLEdBQUcsR0FBRyxvQ0FBb0M7UUFDcEQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLElBQUksR0FBRyxlQUFlLENBQUM7SUFDOUIsQ0FBQztDQUNGO0FBTEQsc0NBS0M7QUFLRCxNQUFhLGVBQWdCLFNBQVEsZUFBZTtJQUNsRCxZQUFZLEdBQUcsR0FBRyx5REFBeUQ7UUFDekUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLElBQUksR0FBRyxpQkFBaUIsQ0FBQztJQUNoQyxDQUFDO0NBQ0Y7QUFMRCwwQ0FLQztBQUtELE1BQWEsYUFBYyxTQUFRLGVBQWU7SUFDaEQsWUFBWSxHQUFHLEdBQUcsbUNBQW1DO1FBQ25ELEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxJQUFJLEdBQUcsZUFBZSxDQUFDO0lBQzlCLENBQUM7Q0FDRjtBQUxELHNDQUtDO0FBU0QsTUFBYSxnQkFBaUIsU0FBUSxlQUFlO0lBQ25ELFlBQVksR0FBRyxHQUFHLHdEQUF3RDtRQUN4RSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsSUFBSSxHQUFHLGtCQUFrQixDQUFDO0lBQ2pDLENBQUM7Q0FDRjtBQUxELDRDQUtDIn0=