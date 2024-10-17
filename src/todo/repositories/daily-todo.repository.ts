import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { DailyTodo } from '../entities/daily-todo.entity';

@Injectable()
export class DailyTodoRepository extends Repository<DailyTodo> {
  constructor(private dataSource: DataSource) {
    super(DailyTodo, dataSource.createEntityManager());
  }
}
