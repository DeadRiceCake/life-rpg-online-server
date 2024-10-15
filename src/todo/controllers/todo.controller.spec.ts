import { Test, TestingModule } from '@nestjs/testing';

import { AppLogger } from '../../shared/logger/logger.service';
import { DailyTodoService } from '../services/daily-todo.service';
import { TodoController } from './todo.controller';

describe('TodoController', () => {
  let controller: TodoController;

  const mockedDailyTodoService = {
    createDailyTodo: jest.fn(),
  };

  const mockedLogger = { setContext: jest.fn(), log: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        { provide: DailyTodoService, useValue: mockedDailyTodoService },
        { provide: AppLogger, useValue: mockedLogger },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
