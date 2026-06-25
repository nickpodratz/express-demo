import { TodoNotFound, TodoTooShortError } from "./todo.error.ts";

type Todo = string;

let todos: Todo[] = [];

const create = async (todo: Todo) => {
    if (todo.length < 4) {
        throw new TodoTooShortError(4);
    }
    todos.push(todo);
}

const findAll = async () => {
    return todos;
}

const findByIndex = async (index: number): Promise<Todo> => {
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