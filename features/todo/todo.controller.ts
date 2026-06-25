import { type NextFunction, type Request, type Response } from "express";
import service from "./todo.service.ts"
import { ValidationError } from "../../utils/error.ts";

interface PostTodoParams {
    text?: string
}

export const postTodo = async (req: Request<any, any, any, PostTodoParams>, res: Response, next: NextFunction) => {
    const { text } = req.query;

    if (!text) throw new ValidationError("Post text absent");

    await service.create(text);

    res.status(201).send();
}

export const getAllTodos = async (_: Request, res: Response) => {
    const todos = await service.findAll();
    res.status(200).json({ todos });
}

interface GetByIdParams {
    id?: string
}

export const getById = async (req: Request<any, any, any, GetByIdParams>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const index = Number(id);
    const todo = await service.findByIndex(index);
    return res.json({ text: todo });
}

export default {
    post: postTodo,
    getAll: getAllTodos,
    getById: getById
}