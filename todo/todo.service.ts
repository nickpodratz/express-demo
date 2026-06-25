import { TodoNotFound } from "./todo.error.ts";

type Todo = string;

let todos: Todo[] = [];

const create = (todo: Todo) => {
    todos.push(todo);
}

const findAll = () => {
    return todos;
}

const findByIndex = (index: number): Todo => {
    if (index >= todos.length) {
        throw new TodoNotFound(index);
    }
    return todos[index]!;
}

export default {
    create,
    findAll,
    findByIndex
}