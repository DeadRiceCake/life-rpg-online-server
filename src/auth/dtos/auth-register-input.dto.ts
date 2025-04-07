import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

import { User } from '../../user/entities/user.entity';
import { UserJoinType } from '../../user/types/user-join.type';
import { UserStatus } from '../../user/types/user-status.type';

export class LocalRegisterInput {
  @ApiProperty()
  @IsNotEmpty()
  @Length(6, 100)
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;

  toEntity(): User {
    return User.of(
      UserJoinType.LOCAL,
      this.password,
      this.email,
      undefined,
      UserStatus.NORMAL,
    );
  }
}
