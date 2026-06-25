import { type Request, type Response, type NextFunction } from 'express';

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class AuthError extends Error {
    constructor() {
        super("Authentication failed");
    }
}

export class ResourceNotFound extends Error {
    constructor(message: string) {
        super(message);
    }
}

export const handleErrors = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ValidationError) {
        return res.status(400).json({ error: error.message })
    }
    if (error instanceof AuthError) {
        return res.status(401).json({ error: error.message })
    }
    if (error instanceof ResourceNotFound) {
        return res.status(404).json({ error: error.message })
    }

    console.log(error.stack)
    return res.status(500).json({ error: "An unknown error occured." });
}