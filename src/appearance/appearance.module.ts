import { Module } from '@nestjs/common';

import { AppearanceController } from './controllers/appearance.controller';
import { AppearanceService } from './services/appearance.service';

@Module({
  controllers: [AppearanceController],
  providers: [AppearanceService]
})
export class AppearanceModule {}
