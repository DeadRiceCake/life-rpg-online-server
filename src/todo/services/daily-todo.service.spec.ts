import { Test, TestingModule } from '@nestjs/testing';

import { Hero } from '../../hero/entities/hero.entity';
import { HeroService } from '../../hero/services/hero.service';
import { AppLogger } from '../../shared/logger/logger.service';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { User } from '../../user/entities/user.entity';
import { CreateDailyTodoRequest } from '../dtos/create-daily-todo.dto';
import { DailyTodoRepository } from '../repositories/daily-todo.repository';
import { REWARD_STAT } from '../types/reward-stat.type';
import { TodoUtils } from '../utils/todo.util';
import { DailyTodoService } from './daily-todo.service';

describe('DailyTodoService', () => {
  let service: DailyTodoService;

  const mockedHeroService = {
    getHeroByUserId: jest.fn(),
  };

  const mockedRepository = {
    save: jest.fn(),
  };

  const mockedLogger = { setContext: jest.fn(), log: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DailyTodoService,
        { provide: HeroService, useValue: mockedHeroService },
        { provide: DailyTodoRepository, useValue: mockedRepository },
        { provide: AppLogger, useValue: mockedLogger },
      ],
    }).compile();

    service = module.get<DailyTodoService>(DailyTodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  const ctx = new RequestContext();

  describe('createDailyTodo', () => {
    it('정상 작동 여부', async () => {
      ctx.user = {id: 1} as User;
      const createDailyTodoRequest = new CreateDailyTodoRequest();
      createDailyTodoRequest.name = '모닝 똥 싸기';
      createDailyTodoRequest.description = '하루의 시작을 똥과 함께';
      createDailyTodoRequest.rewardStat = REWARD_STAT.DEXTERITY;

      const hero = Hero.of('똥쟁이', new User());
      hero.dailyTodos = [];
      
      mockedHeroService.getHeroByUserId.mockResolvedValue(hero);
      mockedRepository.save.mockResolvedValue({});
      jest.spyOn(TodoUtils, 'getLastDisplayOrder').mockReturnValue(0);

      await service.createDailyTodo(ctx, createDailyTodoRequest);

      expect(mockedRepository.save).toHaveBeenCalledWith({
        id: undefined,
        name: '모닝 똥 싸기',
        description: '하루의 시작을 똥과 함께',
        displayOrder: 0,
        rewardStat: REWARD_STAT.DEXTERITY,
        isDone: false,
        createdAt: undefined,
        hero,
      });
    });
  });
});
