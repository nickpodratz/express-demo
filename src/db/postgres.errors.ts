export class UniqueConstraintViolation extends Error {
    constructor() {
        super()
        this.name = new.target.name
    }
}
