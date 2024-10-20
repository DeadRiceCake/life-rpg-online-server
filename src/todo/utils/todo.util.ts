import { Todo } from "../entities/base-todo.entity";
import { DAY,Day } from "../types/days.constant";

export class TodoUtils {
  static getLastDisplayOrder(todos: Todo[]): number {
    return todos.reduce((acc, todo) => {
      return todo.displayOrder > acc ? todo.displayOrder : acc;
    }, 0);
  }

  static getToday(): Day {
    return Object.values(DAY)[new Date().getDay()];
  }
}
