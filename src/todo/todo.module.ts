import { Module } from '@nestjs/common';

import { HeroModule } from '../hero/hero.module';
import { SharedModule } from '../shared/shared.module';
import { TodoController } from './controllers/todo.controller';
import { DailyTodoRepository } from './repositories/daily-todo.repository';
import { WeeklyTodoRepository } from './repositories/weekly-todo.repository';
import { DailyTodoService } from './services/daily-todo.service';
import { WeeklyTodoService } from './services/weekly-todo.service';

@Module({
  imports: [SharedModule, HeroModule],
  controllers: [TodoController],
  providers: [
    DailyTodoService,
    WeeklyTodoService,
    DailyTodoRepository, 
    WeeklyTodoRepository],
})
export class TodoModule {}
