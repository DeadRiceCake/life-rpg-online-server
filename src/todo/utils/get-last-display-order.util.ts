import { Todo } from "../entities/base-todo.entity";

export const getLastDisplayOrder = (todos: Todo[]): number => {
  return todos.reduce((acc, todo) => {
    return todo.displayOrder > acc ? todo.displayOrder : acc;
  }, 0);
}
