import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Hero } from '../entities/hero.entity';

@Injectable()
export class HeroRepository extends Repository<Hero> {
  constructor(private dataSource: DataSource) {
    super(Hero, dataSource.createEntityManager());
  }
}
