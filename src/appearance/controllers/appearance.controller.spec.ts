import { Test, TestingModule } from '@nestjs/testing';

import { AppearanceController } from './appearance.controller';

describe('AppearanceController', () => {
  let controller: AppearanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppearanceController],
    }).compile();

    controller = module.get<AppearanceController>(AppearanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
