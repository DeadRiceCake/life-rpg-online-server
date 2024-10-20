import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { ArrayNotEmpty, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

import { DAY,Day } from '../types/days.constant';
import { REWARD_STAT, RewardStat } from '../types/reward-stat.type';

export class UpdateWeeklyTodoRequest {
  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @ArrayNotEmpty()
  @IsEnum(DAY, { each: true })
  @Transform(({ value }) => {
    if (value) {
      value = new Set(value);
      return Array.from(value);
    }
  })
  daysToRepeat: Day[];

  daysCompleted: Day[];

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(REWARD_STAT)
  rewardStat: RewardStat;
}
