import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, FindOneOptions, Repository } from 'typeorm';

import { DailyTodo } from '../entities/daily-todo.entity';

@Injectable()
export class DailyTodoRepository extends Repository<DailyTodo> {
  constructor(private dataSource: DataSource) {
    super(DailyTodo, dataSource.createEntityManager());
  }

  async getDailyTodo(findOptions: FindOneOptions<DailyTodo>): Promise<DailyTodo> {
    const dailyTodo = await this.findOne(findOptions);

    if (!dailyTodo) {
      throw new NotFoundException('네놈이 찾는 일일 할 일은 없다');
    }

    return dailyTodo;
  }
}
