import { type Response } from "express"
import { type Request } from "../auth/types/Request.ts"
import userService from "./user.service.ts"

const getSelf = (req: Request, res: Response) => {
    return res.json({
        username: req.session!.username,
        createdAt: req.session!.createdAt.toISOString()
    })
}

const createUser = async (req: Request<any, any, { username: string }>, res: Response) => {
    const { username } = req.body ?? {};

    const user = await userService.create(username);

    res.status(201).json(user);
}

const findUser = async (req: Request<{ id: number }>, res: Response) => {
    const { id } = req.params;

    const user = await userService.find(id);

    res.json(user);
}

export default {
    getSelf,
    create: createUser,
    find: findUser
}