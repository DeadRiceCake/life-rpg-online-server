import { ForbiddenException, Injectable } from '@nestjs/common';

import { HeroService } from '../../hero/services/hero.service';
import { AppLogger } from '../../shared/logger/logger.service';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { CreateDailyTodoRequest } from '../dtos/create-daily-todo.dto';
import { UpdateDailyTodoRequest } from '../dtos/update-daily-todo.dto';
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

  async updateDailyTodo(
    ctx: RequestContext,
    dailyTodoId: number,
    updateDailyTodoRequest: UpdateDailyTodoRequest,
  ): Promise<DailyTodo> {
    this.logger.log(ctx, `${this.updateDailyTodo.name} was called`);

    const hero = await this.heroService.getHeroByUserId(
      ctx,
      ctx.user!.id,
    );

    const dailyTodo = await this.dailyTodoRepository.getDailyTodo(
      {
        where: { id: dailyTodoId },
        relations: { hero: true },
      }
    );

    if (dailyTodo.hero.id !== hero.id) {
      throw new ForbiddenException('권한도 없는 주제에 건방지구나');
    }

    await this.dailyTodoRepository.update(
      { id: dailyTodo.id },
      updateDailyTodoRequest
    );

    return await this.dailyTodoRepository.getDailyTodo(
      {
        where: { id: dailyTodo.id },
      }
    );
  }
}
