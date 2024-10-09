import { Test, TestingModule } from '@nestjs/testing';

import { AppLogger } from '../../shared/logger/logger.service';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { User } from '../../user/entities/user.entity';
import { JOB } from '../constants/job.constant';
import { HeroRepository } from '../repositories/hero.repository';
import { HeroService } from './hero.service';

describe('HeroService', () => {
  let service: HeroService;

  const mockedRepository = {
    save: jest.fn(),
  };

  const mockedLogger = { setContext: jest.fn(), log: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HeroService,
        { provide: HeroRepository, useValue: mockedRepository },
        { provide: AppLogger, useValue: mockedLogger },
      ],
    }).compile();

    service = module.get<HeroService>(HeroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const ctx = new RequestContext();

  describe('create hero', () => {
    it('should create hero method with correct params', async () => {
      const user = User.of({
        id: 1,
        username: 'jhon',
        name: 'Jhon doe',
      })
      
      const heroName = 'Kihira';

      const currentDate = new Date();

      const saveHeroInput = {
        name: heroName,
        job: JOB.CITIZEN,
        level: 1,
        experience: 0,
        maxHp: 100,
        currentHp: 100,
        maxMp: 100,
        currentMp: 100,
        strength: 10,
        intelligence: 10,
        dexterity: 10,
        dodge: 0,
        critical: 0,
        physicalAttack: 10,
        magicalAttack: 10,
        physicalDefense: 0,
        magicalDefense: 0,
        fatigue: 0,
        user,
      };

      const expectedOutput = {
        id: 1,
        name: heroName,
        job: JOB.CITIZEN,
        level: 1,
        experience: 0,
        maxHp: 100,
        currentHp: 100,
        maxMp: 100,
        currentMp: 100,
        strength: 10,
        intelligence: 10,
        dexterity: 10,
        dodge: 0,
        critical: 0,
        physicalAttack: 10,
        magicalAttack: 10,
        physicalDefense: 0,
        magicalDefense: 0,
        fatigue: 0,
        user,
        createdAt: currentDate,
        updatedAt: currentDate,
      };

      mockedRepository.save.mockResolvedValue(expectedOutput);

      const output = await service.createHero(ctx, user, heroName);
      
      expect(mockedRepository.save).toHaveBeenCalledWith(saveHeroInput);
      expect(output).toEqual(expectedOutput);
    });
  });
});
