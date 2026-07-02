import { type Request, type Response, type NextFunction } from "express"
import { UserCreationFailed, UsernameTaken, UsernameTooShort, UserNotFound } from "./user.errors.ts"

export const userErrorHandler = (error: Error, _: Request, res: Response, next: NextFunction) => {
    if (error instanceof UsernameTooShort) {
        return res.status(400).json({ error: error.message })
    }

    if (error instanceof UserNotFound) {
        return res.status(404).json({ error: error.message })
    }

    if (error instanceof UsernameTaken) {
        return res.status(409).json({ error: error.message })
    }

    if (error instanceof UserCreationFailed) {
        return res.status(500).json({ error: error.message })
    }

    next(error)
}
