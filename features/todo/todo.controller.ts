import { type Request, type Response } from "express";
import service from "./todo.service.ts"
import { ValidationError } from "../../utils/error.ts";

export const postTodo = async (req: Request<any, any, { text?: string }>, res: Response) => {
    const { text } = req.body ?? {};

    if (!text) throw new ValidationError("Post text absent");

    await service.create(text);

    res.status(201).send();
}

export const getAllTodos = async (_: Request, res: Response) => {
    const todos = await service.findAll();
    res.json({ todos });
}

export const getById = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    const index = Number(id);
    const todo = await service.findByIndex(index);

    res.json({ text: todo });
}

export default {
    post: postTodo,
    getAll: getAllTodos,
    getById: getById
}