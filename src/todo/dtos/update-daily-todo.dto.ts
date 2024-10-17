import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString, MaxLength } from 'class-validator';

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
}
