import { DailyTodo } from "../entities/daily-todo.entity";
import { BaseTodoResponse } from "./base-todo-response.dto";

export class DailyTodoResponse extends BaseTodoResponse {
  constructor(dailyTodo: DailyTodo) {
    super(dailyTodo);
  }
}
