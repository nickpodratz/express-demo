export class CredentialsInvalid extends Error {
    constructor() {
        super("The provided credentials were incorrect.");
    }
}

export class SessionMissing extends Error {
    constructor() {
        super("You are not signed in.");
    }
}