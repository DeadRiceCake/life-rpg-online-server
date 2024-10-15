import { Test, TestingModule } from '@nestjs/testing';

import { HeroService } from '../../hero/services/hero.service';
import { AppLogger } from '../../shared/logger/logger.service';
import { DailyTodoService } from './daily-todo.service';

describe('DailyTodoService', () => {
  let service: DailyTodoService;

  const mockedHeroService = {
    getHeroByUserId: jest.fn(),
    updateHero: jest.fn(),
  };

  const mockedLogger = { setContext: jest.fn(), log: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DailyTodoService,
        { provide: HeroService, useValue: mockedHeroService },
        { provide: AppLogger, useValue: mockedLogger },
      ],
    }).compile();

    service = module.get<DailyTodoService>(DailyTodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
