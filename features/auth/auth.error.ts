import { type Request, type Response, type NextFunction } from 'express';

export class BadCredentialsError extends Error {
    constructor() {
        super("The provided credentials were wrong.");
    }
}

export class NoSessionError extends Error {
    constructor() {
        super("You are not signed in.");
    }
}

export const handleAuthErrors = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof BadCredentialsError) {
        return res.status(401).json({ error: error.message })
    }

    if (error instanceof NoSessionError) {
        return res.status(401).json({ error: error.message })
    }

    next(error)
}