import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsRelations } from 'typeorm';

import { ERROR_CODE } from '../../auth/constants/error-code.contants';
import { AppLogger } from '../../shared/logger/logger.service';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { CreateHeroDto } from '../dto/create-hero.dto';
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

  async createHero(ctx: RequestContext, createHeroDto: CreateHeroDto): Promise<void> {
    this.logger.log(ctx, `${this.createHero.name} was called`);

    const existingHero = await this.repository.findOne({
      where: { userId: ctx.user!.id }, 
    });

    if (existingHero) {
      throw new BadRequestException({
        message: 'Already exists a hero for this user',
        errorCode: ERROR_CODE.HERO.ALREADY_EXISTS,
      });
    }
    
    const hero =  createHeroDto.toEntity(ctx.user!.id);
    
    this.logger.log(ctx, `calling ${HeroRepository.name}.save`);
    await this.repository.insert(hero);
  }

  async getHeroByUserId(
    ctx: RequestContext, 
    userId: string, 
    relations?: FindOptionsRelations<Hero>
  ): Promise<Hero> {
    this.logger.log(ctx, `${this.getHeroByUserId.name} was called`);

    this.logger.log(ctx, `calling ${HeroRepository.name}.findOne`);
    const hero = await this.repository.findOne({ 
      where: { userId }, 
      relations
    });

    if (!hero) {
      throw new NotFoundException({
        message: 'Hero not found',
        errorCode: ERROR_CODE.HERO.NOT_FOUND,
      });
    }

    return hero;
  }

  async updateHero(ctx: RequestContext, hero: Hero): Promise<void> {
    this.logger.log(ctx, `${this.updateHero.name} was called`);

    this.logger.log(ctx, `calling ${HeroRepository.name}.save`);
    await this.repository.update({ id: hero.id }, hero);
  }
}
