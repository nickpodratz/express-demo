export class TodoNotFound extends Error {
    constructor(id: number) {
        super(`Todo with id=${id} not found.`)
        this.name = new.target.name
    }
}

export class TodoTooShort extends Error {
    static readonly minLength = 4

    constructor() {
        super(`A Todo text must have at least ${TodoTooShort.minLength} characters.`)
        this.name = new.target.name
    }
}