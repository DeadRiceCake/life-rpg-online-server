import { Test, TestingModule } from '@nestjs/testing';

import { DailyTodoService } from './daily-todo.service';

describe('DailyTodoService', () => {
  let service: DailyTodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailyTodoService],
    }).compile();

    service = module.get<DailyTodoService>(DailyTodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
