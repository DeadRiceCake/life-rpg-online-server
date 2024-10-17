import { Injectable } from '@nestjs/common';

import { HeroService } from '../../hero/services/hero.service';
import { AppLogger } from '../../shared/logger/logger.service';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { CreateDailyTodoRequest } from '../dtos/create-daily-todo.dto';
import { DailyTodo } from '../entities/daily-todo.entity';
import { DailyTodoRepository } from '../repositories/daily-todo.repository';
import { getLastDisplayOrder } from '../utils/get-last-display-order.util';

@Injectable()
export class DailyTodoService {
  constructor(
    private readonly heroService: HeroService,
    private readonly dailyTodoRepository: DailyTodoRepository,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(DailyTodoService.name);
  }

  async createDailyTodo(ctx: RequestContext, createDailyTodoRequest: CreateDailyTodoRequest): Promise<DailyTodo> {
    this.logger.log(ctx, `${this.createDailyTodo.name} was called`);

    const hero = await this.heroService.getHeroByUserId(
      ctx, 
      ctx.user!.id,
      { dailyTodos: true }
    );

    const createdDailyTodo = createDailyTodoRequest.toEntity(getLastDisplayOrder(hero.dailyTodos));

    createdDailyTodo.hero = hero;

    return await this.dailyTodoRepository.save(createdDailyTodo);
  }

  async getDailyTodos(ctx: RequestContext): Promise<DailyTodo[]> {
    this.logger.log(ctx, `${this.getDailyTodos.name} was called`);

    const hero = await this.heroService.getHeroByUserId(
      ctx,
      ctx.user!.id,
      { dailyTodos: true }
    );

    return hero.dailyTodos;
  }
}
