import { type Response } from "express"
import { type Request } from "../auth/types/Request.ts"

const getSelf = (req: Request, res: Response) => {
    return res.json({
        username: req.session!.username,
        createdAt: req.session!.createdAt.toISOString()
    })
}

export default {
    getSelf
}