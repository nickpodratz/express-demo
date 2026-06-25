import express, { type Request, type Response, type NextFunction } from 'express';

export class TodoNotFound extends Error {
    constructor(id: number) {
        super(`Todo with id=${id} not found.`);
    }
}

export const handleTodoErrors = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof TodoNotFound) {
        return res.status(404).json({ error: error.message })
    }
}