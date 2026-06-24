
type Todo = string;

let todos: Todo[] = [];

const create = (todo: Todo) => {
    todos.push(todo);
}

const findAll = () => {
    return todos;
}

const findByIndex = (index: number): Todo | null => {
    return todos[index] ?? null;
}

export default {
    create,
    findAll,
    findByIndex
}