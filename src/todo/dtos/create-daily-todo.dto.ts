import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

import { DailyTodo } from '../entities/daily-todo.entity';

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

  toEntity(displayOrder: number): DailyTodo {
    return DailyTodo.of(this.name, this.description, displayOrder); 
  }
}
