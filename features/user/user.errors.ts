export class UsernameTooShort extends Error {
    static readonly minLength = 3;

    constructor() {
        super(`A valid username has at least ${UsernameTooShort.minLength} characters.`);
        this.name = new.target.name;
    }
}

export class UsernameTaken extends Error {
    constructor(username: string) {
        super(`The username '${username}' is already taken.`);
        this.name = new.target.name;
    }
}

export class UserNotFound extends Error {
    constructor(id: number) {
        super(`A user with id=${id} could not be found.`);
        this.name = new.target.name;
    }
}