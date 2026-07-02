import { type Request, type Response, type NextFunction } from "express"
import { TodoNotFound, TodoTooShort } from "./todo.errors.ts"

export const todoErrorHandler = (error: Error, _: Request, res: Response, next: NextFunction) => {
    if (error instanceof TodoTooShort) {
        return res.status(400).json({ error: error.message })
    }

    if (error instanceof TodoNotFound) {
        return res.status(404).json({ error: error.message })
    }

    next(error)
}
