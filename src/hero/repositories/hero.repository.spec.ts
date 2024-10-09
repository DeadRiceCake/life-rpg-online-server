import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';

import { HeroRepository } from './hero.repository';

describe('HeroRepository', () => {
  let repository: HeroRepository;

  let dataSource: {
    createEntityManager: jest.Mock;
  };

  beforeEach(async () => {
    dataSource = {
      createEntityManager: jest.fn(),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        HeroRepository,
        {
          provide: DataSource,
          useValue: dataSource,
        },
      ],
    }).compile();

    repository = moduleRef.get<HeroRepository>(HeroRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
