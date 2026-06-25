export class TodoNotFound extends Error {
    constructor(id: number) {
        super(`Todo with id=${id} not found.`);
        this.name = new.target.name;
    }
}

export class TodoTooShort extends Error {
    constructor(minLength: number) {
        super(`Todo text must have at least ${minLength} characters.`);
        this.name = new.target.name;
    }
}