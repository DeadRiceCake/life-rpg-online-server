import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';

import { DailyTodoRepository } from './daily-todo.repository';


describe('DailyTodoRepository', () => {
  let repository: DailyTodoRepository;

  let dataSource: {
    createEntityManager: jest.Mock;
  };

  beforeEach(async () => {
    dataSource = {
      createEntityManager: jest.fn(),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        DailyTodoRepository,
        {
          provide: DataSource,
          useValue: dataSource,
        },
      ],
    }).compile();

    repository = moduleRef.get<DailyTodoRepository>(DailyTodoRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
