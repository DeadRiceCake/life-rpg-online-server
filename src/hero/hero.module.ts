import { Module } from '@nestjs/common';

import { SharedModule } from '../shared/shared.module';
import { HeroController } from './controllers/hero.controller';
import { HeroRepository } from './repositories/hero.repository';
import { HeroService } from './services/hero.service';

@Module({
  imports: [SharedModule],
  providers: [HeroService, HeroRepository],
  controllers: [HeroController],
  exports: [HeroService],
})
export class HeroModule {}
