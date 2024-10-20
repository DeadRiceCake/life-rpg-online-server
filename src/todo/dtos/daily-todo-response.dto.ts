import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

import { DailyTodo } from "../entities/daily-todo.entity";
import { BaseTodoResponse } from "./base-todo-response.dto";

export class DailyTodoResponse extends BaseTodoResponse {
  @Exclude() private readonly _rewardStat: string;
  
  constructor(dailyTodo: DailyTodo) {
    super(dailyTodo);
    this._rewardStat = dailyTodo.rewardStat;
  }

  @Expose()
  @ApiProperty()
  get rewardStat(): string {
    return this._rewardStat;
  }
}
