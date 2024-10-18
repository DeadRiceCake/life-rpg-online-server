import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';

import { WeeklyTodoRepository } from './weekly-todo.repository';


describe('WeeklyTodoRepository', () => {
  let repository: WeeklyTodoRepository;

  let dataSource: {
    createEntityManager: jest.Mock;
  };

  beforeEach(async () => {
    dataSource = {
      createEntityManager: jest.fn(),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        WeeklyTodoRepository,
        {
          provide: DataSource,
          useValue: dataSource,
        },
      ],
    }).compile();

    repository = moduleRef.get<WeeklyTodoRepository>(WeeklyTodoRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
