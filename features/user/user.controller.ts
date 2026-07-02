import { type Response } from "express"
import { type Request } from "../auth/types/Request.ts"
import userService from "./user.service.ts"

const getSelf = (req: Request, res: Response) => {
    return res.json({
        username: req.session!.username,
        createdAt: req.session!.createdAt.toISOString()
    })
}

const createUser = async (req: Request<any, any, { username?: string }>, res: Response) => {
    const { username } = req.body ?? {}

    if (!username) {
        return res.status(400).json({ error: "Username must be provided." })
    }

    const user = await userService.create(username)

    res.status(201).json(user)
}

const findUser = async (req: Request<{ id: number }>, res: Response) => {
    const { id } = req.params

    const user = await userService.find(id)

    res.json(user)
}

const findAllUsers = async (req: Request, res: Response) => {
    const users = await userService.findAll()

    res.json(users)
}

export default {
    getSelf,
    create: createUser,
    find: findUser,
    findAll: findAllUsers
}