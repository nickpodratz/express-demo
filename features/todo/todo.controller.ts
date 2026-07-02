import { type Request, type Response } from "express"
import todoService from "./todo.service.ts"

export const postTodo = async (req: Request<any, any, { text?: string }>, res: Response) => {
    const { text } = req.body ?? {}

    if (!text) {
        return res.status(400).json({ error: "Todo text is missing." })
    }

    await todoService.create(text)

    res.status(201).send()
}

export const getAllTodos = async (_: Request, res: Response) => {
    const todos = await todoService.findAll()

    res.json({ todos })
}

export const getById = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params

    const index = Number(id)
    if (!Number.isInteger(index) || index < 0) {
        return res.status(400).json({ error: "id is not a valid index." })
    }

    const todo = await todoService.findByIndex(index)

    res.json({ text: todo })
}

export default {
    post: postTodo,
    getAll: getAllTodos,
    getById: getById
}