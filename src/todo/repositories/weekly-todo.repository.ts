import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, FindOneOptions, Repository } from 'typeorm';

import { WeeklyTodo } from '../entities/weekly-todo.entity';

@Injectable()
export class WeeklyTodoRepository extends Repository<WeeklyTodo> {
  constructor(private dataSource: DataSource) {
    super(WeeklyTodo, dataSource.createEntityManager());
  }

  async getWeeklyTodo(findOptions: FindOneOptions<WeeklyTodo>): Promise<WeeklyTodo> {
    const weeklyTodo = await this.findOne(findOptions);

    if (!weeklyTodo) {
      throw new NotFoundException('네놈이 찾는 주간 할 일은 없다');
    }

    return weeklyTodo;
  }
}
