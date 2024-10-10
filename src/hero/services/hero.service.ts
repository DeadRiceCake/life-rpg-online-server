import { Injectable } from '@nestjs/common';

import { AppLogger } from '../../shared/logger/logger.service';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { User } from '../../user/entities/user.entity';
import { Hero } from '../entities/hero.entity';
import { HeroRepository } from '../repositories/hero.repository';

@Injectable()
export class HeroService {
  constructor(
    private repository: HeroRepository,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(HeroService.name);
  }

  async createHero(ctx: RequestContext, user: User, name: string): Promise<Hero> {
    this.logger.log(ctx, `${this.createHero.name} was called`);

    const hero =  Hero.of(name, user);
    
    this.logger.log(ctx, `calling ${HeroRepository.name}.save`);
    return await this.repository.save(hero);
  }
}
