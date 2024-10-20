import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

import { REWARD_STAT, RewardStat } from '../types/reward-stat.type';

export class UpdateDailyTodoRequest {
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
  @IsEnum(REWARD_STAT)
  rewardStat: RewardStat;
}
