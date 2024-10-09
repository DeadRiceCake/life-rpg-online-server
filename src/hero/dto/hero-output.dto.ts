import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

import { Hero } from '../../hero/entities/hero.entity';
import { User } from '../../user/entities/user.entity';
import { Job } from '../constants/job.constant';

export class HeroOutput {
  @Exclude() private readonly _id: number;
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _job: Job;
  @Exclude() private readonly _level: number;
  @Exclude() private readonly _experience: number;
  @Exclude() private readonly _maxHp: number;
  @Exclude() private readonly _currentHp: number;
  @Exclude() private readonly _maxMp: number;
  @Exclude() private readonly _currentMp: number;
  @Exclude() private readonly _strength: number;
  @Exclude() private readonly _intelligence: number;
  @Exclude() private readonly _dexterity: number;
  @Exclude() private readonly _dodge: number;
  @Exclude() private readonly _critical: number;
  @Exclude() private readonly _physicalAttack: number;
  @Exclude() private readonly _magicalAttack: number;
  @Exclude() private readonly _physicalDefense: number;
  @Exclude() private readonly _magicalDefense: number;
  @Exclude() private readonly _fatigue: number;
  @Exclude() private readonly _createdAt: Date;
  @Exclude() private readonly _updatedAt: Date;
  @Exclude() private readonly _user: User;

  constructor(hero: Hero) {
    this._id = hero.id;
    this._name = hero.name;
    this._job = hero.job;
    this._level = hero.level;
    this._experience = hero.experience;
    this._maxHp = hero.maxHp;
    this._currentHp = hero.currentHp;
    this._maxMp = hero.maxMp;
    this._currentMp = hero.currentMp;
    this._strength = hero.strength;
    this._intelligence = hero.intelligence;
    this._dexterity = hero.dexterity;
    this._dodge = hero.dodge;
    this._critical = hero.critical;
    this._physicalAttack = hero.physicalAttack;
    this._magicalAttack = hero.magicalAttack;
    this._physicalDefense = hero.physicalDefense;
    this._magicalDefense = hero.magicalDefense;
    this._fatigue = hero.fatigue;
    this._createdAt = hero.createdAt;
    this._updatedAt = hero.updatedAt;
    this._user = hero.user;
  }

  @Expose()
  @ApiProperty()
  get id(): number {
    return this._id;
  }
  
  @Expose()
  @ApiProperty()
  get name(): string {
    return this._name;
  }
  
  @Expose()
  @ApiProperty()
  get job(): Job {
    return this._job;
  }
  
  @Expose()
  @ApiProperty()
  get level(): number {
    return this._level;
  }
  
  @Expose()
  @ApiProperty()
  get experience(): number {
    return this._experience;
  }
  
  @Expose()
  @ApiProperty()
  get maxHp(): number {
    return this._maxHp;
  }
  
  @Expose()
  @ApiProperty()
  get currentHp(): number {
    return this._currentHp;
  }
  
  @Expose()
  @ApiProperty()
  get maxMp(): number {
    return this._maxMp;
  }
  
  @Expose()
  @ApiProperty()
  get currentMp(): number {
    return this._currentMp;
  }
  
  @Expose()
  @ApiProperty()
  get strength(): number {
    return this._strength;
  }
  
  @Expose()
  @ApiProperty()
  get intelligence(): number {
    return this._intelligence;
  }
  
  @Expose()
  @ApiProperty()
  get dexterity(): number {
    return this._dexterity;
  }

  @Expose()
  @ApiProperty()
  get dodge(): number {
    return this._dodge;
  }

  @Expose()
  @ApiProperty()
  get critical(): number {
    return this._critical;
  }
  
  @Expose()
  @ApiProperty()
  get physicalAttack(): number {
    return this._physicalAttack;
  }

  @Expose()
  @ApiProperty()
  get magicalAttack(): number {
    return this._magicalAttack;
  }
  
  @Expose()
  @ApiProperty()
  get physicalDefense(): number {
    return this._physicalDefense;
  }

  @Expose()
  @ApiProperty()
  get magicalDefense(): number {
    return this._magicalDefense;
  }

  @Expose()
  @ApiProperty()
  get fatigue(): number {
    return this._fatigue;
  }

  @Expose()
  @ApiProperty()
  get createdAt(): string {
    return this._createdAt.toISOString();
  }

  @Expose()
  @ApiProperty()
  get updatedAt(): string {
    return this._updatedAt.toISOString();
  }

  @Expose()
  @ApiProperty()
  get user(): User {
    return this._user;
  }
}
