import { BadRequestException, Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

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

    const dailyTodo = await this.dailyTodoRepository.getDailyTodo(
      {
        where: { id: dailyTodoId, hero: { user: { id: ctx.user!.id } } },
        relations: { hero: { user: true } },
      }
    );

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

  @Transactional()
  async finishDailyTodo(
    ctx: RequestContext,
    dailyTodoId: number,
  ): Promise<DailyTodo> {
    this.logger.log(ctx, `${this.finishDailyTodo.name} was called`);

    const dailyTodo = await this.dailyTodoRepository.getDailyTodo(
      {
        where: { id: dailyTodoId, hero: { user: { id: ctx.user!.id } } },
        relations: { hero: { user: true } },
      }
    );

    if (dailyTodo.isDone) {
      throw new BadRequestException('이미 완료한 일일 것인데 왜 또 완료하려 하느냐?');
    }

    dailyTodo.done();

    await this.dailyTodoRepository.update({ id: dailyTodoId }, dailyTodo);
    await this.heroService.updateHero(ctx, dailyTodo.hero);

    return await this.dailyTodoRepository.getDailyTodo(
      {
        where: { id: dailyTodo.id },
      }
    );
  }

  async deleteDailyTodo(
    ctx: RequestContext,
    dailyTodoId: number,
  ): Promise<void> {
    this.logger.log(ctx, `${this.deleteDailyTodo.name} was called`);

    const dailyTodo = await this.dailyTodoRepository.getDailyTodo(
      {
        where: { id: dailyTodoId, hero: { user: { id: ctx.user!.id } } },
        relations: { hero: { user: true } },
      }
    );

    await this.dailyTodoRepository.delete({ id: dailyTodo.id });
  }
}
