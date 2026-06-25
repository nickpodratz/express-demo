import { CredentialsInvalid } from "./auth.error.ts";

const assertCredentials = (username: string, password: string) => {
    if (username !== "admin" || password !== "123") {
        throw new CredentialsInvalid();
    }
}

export default {
    assertCredentials
}