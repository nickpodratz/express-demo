import { type Request, type Response } from "express";
import service from "./todo.service.ts"

interface PostTodoParams {
    text?: string
}

export const postTodo = (req: Request<any, any, any, PostTodoParams>, res: Response) => {
    const { text } = req.query;

    if (!text) {
        return res.status(400)
    }

    service.create(text);
    res.status(201).send();
}

export const getAllTodos = (_: Request, res: Response) => {
    const todos = service.findAll();
    res.status(200).json({ todos });
}

interface GetByIdParams {
    id?: string
}

export const getById = (req: Request<any, any, any, GetByIdParams>, res: Response) => {
    const { id } = req.params;

    const index = Number(id);
    const todo = service.findByIndex(index);

    if (!todo) {
        return res.status(404).send();
    }

    return res.status(200).json({ text: todo });
}

export default {
    post: postTodo,
    getAll: getAllTodos,
    getById: getById
}