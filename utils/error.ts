import express, { type Request, type Response, type NextFunction } from 'express';

export class MissingParameter extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class InvalidParameter extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class AuthFailed extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class ResourceNotFound extends Error {
    constructor(message: string) {
        super(message);
    }
}

export const handleErrors = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof MissingParameter) {
        return res.status(400).json({ error: error.message })
    }
    if (error instanceof InvalidParameter) {
        return res.status(400).json({ error: error.message })
    }
    if (error instanceof AuthFailed) {
        return res.status(401).json({ error: error.message })
    }
    if (error instanceof ResourceNotFound) {
        return res.status(404).json({ error: error.message })
    }

    console.log(error.stack)
    return res.status(500).json({ error: "An unknown error occured." });
}