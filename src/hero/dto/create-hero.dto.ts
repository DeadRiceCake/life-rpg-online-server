import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

import { Gender, GenderType } from '../../appearance/types/gender.type';
import { Hero } from '../entities/hero.entity';

export class CreateHeroDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 20)
  @IsString()
  nickname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(GenderType)
  gender: Gender;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  skinId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  eyeId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  hairId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  beardId: string;

  toHeroEntity(userId: string): Hero {
    return Hero.of(
      this.nickname, 
      userId, 
      {
        beardId: this.beardId,
        eyeId: this.eyeId,
        gender: this.gender,
        hairId: this.hairId,
        skinId: this.skinId,
      }
    );
  }
}
