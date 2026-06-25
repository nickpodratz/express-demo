
const validateCredentials = (username: string, password: string): boolean => {
    return username === "admin" && password === "123"
}

export default {
    validateCredentials
}