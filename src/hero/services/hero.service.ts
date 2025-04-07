import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsRelations } from 'typeorm';

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

  async getHeroByUserId(
    ctx: RequestContext, 
    userId: string, 
    relations?: FindOptionsRelations<Hero>
  ): Promise<Hero> {
    this.logger.log(ctx, `${this.getHeroByUserId.name} was called`);

    this.logger.log(ctx, `calling ${HeroRepository.name}.findOne`);
    const hero = await this.repository.findOne({ 
      where: { user: { id: userId } }, 
      relations
    });

    if (!hero) {
      throw new NotFoundException('존재하지 않는 영웅입니다.');
    }

    return hero;
  }

  async updateHero(ctx: RequestContext, hero: Hero): Promise<void> {
    this.logger.log(ctx, `${this.updateHero.name} was called`);

    this.logger.log(ctx, `calling ${HeroRepository.name}.save`);
    await this.repository.update({ id: hero.id }, hero);
  }
}
