import { type Request, type Response } from 'express'

export const getHealth = (_: Request, res: Response) => {
    return res.json({
        message: "Server is running",
        timestamp: new Date().toISOString()
    })
}