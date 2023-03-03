export class ValidationError extends Error {
    constructor(msg) {
        super(msg);
        this.name = 'ValidationError';
    }
}
export class InvalidFormat extends ValidationError {
    constructor(msg = 'The number has an invlidad format.') {
        super(msg);
        this.name = 'InvalidFormat';
    }
}
export class InvalidChecksum extends ValidationError {
    constructor(msg = "The number number's checksum or check digit is invalid.") {
        super(msg);
        this.name = 'InvalidChecksum';
    }
}
export class InvalidLength extends ValidationError {
    constructor(msg = 'The number has an invalid length.') {
        super(msg);
        this.name = 'InvalidLength';
    }
}
export class InvalidComponent extends ValidationError {
    constructor(msg = 'One of the parts of the number are invalid or unknown.') {
        super(msg);
        this.name = 'InvalidComponent';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjZXB0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9leGNlcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWFBLE1BQU0sT0FBTyxlQUFnQixTQUFRLEtBQUs7SUFDeEMsWUFBWSxHQUFXO1FBQ3JCLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxJQUFJLEdBQUcsaUJBQWlCLENBQUM7SUFDaEMsQ0FBQztDQUNGO0FBUUQsTUFBTSxPQUFPLGFBQWMsU0FBUSxlQUFlO0lBQ2hELFlBQVksR0FBRyxHQUFHLG9DQUFvQztRQUNwRCxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQztJQUM5QixDQUFDO0NBQ0Y7QUFLRCxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxlQUFlO0lBQ2xELFlBQVksR0FBRyxHQUFHLHlEQUF5RDtRQUN6RSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsSUFBSSxHQUFHLGlCQUFpQixDQUFDO0lBQ2hDLENBQUM7Q0FDRjtBQUtELE1BQU0sT0FBTyxhQUFjLFNBQVEsZUFBZTtJQUNoRCxZQUFZLEdBQUcsR0FBRyxtQ0FBbUM7UUFDbkQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLElBQUksR0FBRyxlQUFlLENBQUM7SUFDOUIsQ0FBQztDQUNGO0FBU0QsTUFBTSxPQUFPLGdCQUFpQixTQUFRLGVBQWU7SUFDbkQsWUFBWSxHQUFHLEdBQUcsd0RBQXdEO1FBQ3hFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxJQUFJLEdBQUcsa0JBQWtCLENBQUM7SUFDakMsQ0FBQztDQUNGIn0=