import { BadCredentialsError } from "./auth.error.ts"

const validateCredentials = (username: string, password: string) => {
    if (username !== "admin" || password !== "123") {
        throw new BadCredentialsError();
    }
}

export default {
    validateCredentials
}