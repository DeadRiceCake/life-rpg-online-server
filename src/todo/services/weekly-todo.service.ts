import { Injectable } from '@nestjs/common';

import { HeroService } from '../../hero/services/hero.service';
import { AppLogger } from '../../shared/logger/logger.service';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { CreateWeeklyTodoRequest } from '../dtos/create-weekly-todo.dto';
import { WeeklyTodo } from '../entities/weekly-todo.entity';
import { WeeklyTodoRepository } from '../repositories/weekly-todo.repository';
import { getLastDisplayOrder } from '../utils/get-last-display-order.util';
@Injectable()
export class WeeklyTodoService {
  constructor(
    private readonly heroService: HeroService,
    private readonly weeklyTodoRepository: WeeklyTodoRepository,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(WeeklyTodoService.name);
  }

  async createWeeklyTodo(
    ctx: RequestContext, 
    createWeeklyTodoRequest: CreateWeeklyTodoRequest
  ): Promise<WeeklyTodo> {
    this.logger.log(ctx, `${this.createWeeklyTodo.name} was called`);

    const hero = await this.heroService.getHeroByUserId(
      ctx,
      ctx.user!.id,
      { weeklyTodos: true }
    );

    const weeklyTodo = createWeeklyTodoRequest.toEntity(getLastDisplayOrder(hero.weeklyTodos));

    weeklyTodo.hero = hero;

    return await this.weeklyTodoRepository.save(weeklyTodo);
  }
}
