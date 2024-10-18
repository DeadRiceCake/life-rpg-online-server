import { Test, TestingModule } from '@nestjs/testing';

import { HeroService } from '../../hero/services/hero.service';
import { AppLogger } from '../../shared/logger/logger.service';
import { WeeklyTodoRepository } from '../repositories/weekly-todo.repository';
import { WeeklyTodoService } from './weekly-todo.service';

jest.mock('../utils/get-last-display-order.util', () => ({
  getLastDisplayOrder: jest.fn(() => 0),
}));

describe('WeeklyTodoService', () => {
  let service: WeeklyTodoService;

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
        WeeklyTodoService,
        { provide: HeroService, useValue: mockedHeroService },
        { provide: WeeklyTodoRepository, useValue: mockedRepository },
        { provide: AppLogger, useValue: mockedLogger },
      ],
    }).compile();

    service = module.get<WeeklyTodoService>(WeeklyTodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
