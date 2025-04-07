import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

import { Hero } from '../entities/hero.entity';

export class CreateHeroDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 20)
  @IsString()
  nickname: string;

  toEntity(userId: string): Hero {
    return Hero.of(this.nickname, userId)
  }
}
