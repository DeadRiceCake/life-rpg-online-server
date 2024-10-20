import { Test, TestingModule } from '@nestjs/testing';

import { AppLogger } from '../../shared/logger/logger.service';
import { HeroService } from '../services/hero.service';
import { HeroController } from './hero.controller';

describe('HeroController', () => {
  let controller: HeroController;

  const mockedHeroService = {
    getHeroByUserId: jest.fn(),
  };

  const mockedLogger = { setContext: jest.fn(), log: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeroController],
      providers: [
        { provide: HeroService, useValue: mockedHeroService },
        { provide: AppLogger, useValue: mockedLogger },
      ],
    }).compile();

    controller = module.get<HeroController>(HeroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
