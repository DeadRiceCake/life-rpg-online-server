import { Module } from '@nestjs/common';

import { HeroController } from './controllers/hero.controller';
import { HeroService } from './services/hero.service';

@Module({
  providers: [HeroService],
  controllers: [HeroController]
})
export class HeroModule {}
