import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { ArrayNotEmpty, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

import { WeeklyTodo } from '../entities/weekly-todo.entity';
import { DAY, Day } from '../types/days.constant';
import { REWARD_STAT, RewardStat } from '../types/reward-stat.type';

export class CreateWeeklyTodoRequest {
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
  @ArrayNotEmpty()
  @IsEnum(DAY, { each: true })
  @Transform(({ value }) => {
    value = new Set(value);
    return Array.from(value);
  })
  daysToRepeat: Day[];

  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(REWARD_STAT)
  rewardStat: RewardStat;

  toEntity(displayOrder: number): WeeklyTodo {
    return WeeklyTodo.of(this.name, this.description, displayOrder, this.daysToRepeat, this.rewardStat); 
  }
}
