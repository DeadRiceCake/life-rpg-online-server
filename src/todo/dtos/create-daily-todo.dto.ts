import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

import { DailyTodo } from '../entities/daily-todo.entity';
import { REWARD_STAT, RewardStat } from '../types/reward-stat.type';

export class CreateDailyTodoRequest {
  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @Transform(({ value }) => value ?? '')
  description: string;

  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  @IsIn([REWARD_STAT.STRENGTH, REWARD_STAT.INTELLIGENCE, REWARD_STAT.DEXTERITY])
  rewardStat: RewardStat;

  toEntity(displayOrder: number): DailyTodo {
    return DailyTodo.of(this.name, this.description, displayOrder, this.rewardStat); 
  }
}
