import { type Request, type Response } from "express";
import service from "./todo.service.ts"

export const post = (req: Request, res: Response) => {
    const { text } = req.query as { text?: string };

    if (!text) {
        return res.status(400)
    }

    service.create(text);
    res.status(201).send();
}

export const getAll = (_: Request, res: Response) => {
    const todos = service.findAll();
    res.status(200).json({ todos });
}

export const getById = (req: Request, res: Response) => {
    const { id } = req.params  as { id?: string };

    const index = Number(id);
    const todo = service.findByIndex(index);

    if (!todo) {
        return res.status(404).send();
    }

    return res.status(200).json({ text: todo });
}

export default {
    post,
    getAll,
    getById
}