import { TodoNotFound, TodoTooShort } from "./todo.errors.ts"

type Todo = string;

let todos: Todo[] = []

const create = async (todo: Todo) => {
    if (todo.length < TodoTooShort.minLength) {
        throw new TodoTooShort()
    }
    todos.push(todo)
}

const findAll = async () => {
    return todos
}

const findByIndex = async (index: number): Promise<Todo> => {
    if (index >= todos.length) {
        throw new TodoNotFound(index)
    }
    return todos[index]!
}

export default {
    create,
    findAll,
    findByIndex
}