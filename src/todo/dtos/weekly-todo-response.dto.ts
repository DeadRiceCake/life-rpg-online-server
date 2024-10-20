import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

import { WeeklyTodo } from "../entities/weekly-todo.entity";
import { Day } from "../types/days.constant";
import { RewardStat } from "../types/reward-stat.type";
import { BaseTodoResponse } from "./base-todo-response.dto";

export class WeeklyTodoResponse extends BaseTodoResponse {
  @Exclude() private readonly _daysToRepeat: Day[];
  @Exclude() private readonly _daysCompleted: Day[];
  @Exclude() private readonly _rewardStat: RewardStat;
  
  constructor(weeklyTodo: WeeklyTodo) {
    super(weeklyTodo);
    this._daysToRepeat = weeklyTodo.daysToRepeat;
    this._daysCompleted = weeklyTodo.daysCompleted;
    this._rewardStat = weeklyTodo.rewardStat;
  }

  @Expose() 
  @ApiProperty()
  get daysToRepeat(): Day[] {
    return this._daysToRepeat;
  }

  @Expose()
  @ApiProperty()
  get daysCompleted(): Day[] {
    return this._daysCompleted;
  }

  @Expose()
  @ApiProperty()
  get rewardStat(): RewardStat {
    return this._rewardStat;
  }
}
