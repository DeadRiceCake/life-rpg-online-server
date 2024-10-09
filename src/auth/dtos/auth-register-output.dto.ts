import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

import { User } from '../../user/entities/user.entity';
import { ROLE } from '../constants/role.constant';

export class RegisterOutput {
  @Exclude() private readonly _id: number;
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _username: string;
  @Exclude() private readonly _roles: ROLE[];
  @Exclude() private readonly _email: string;
  @Exclude() private readonly _isAccountDisabled: boolean;
  @Exclude() private readonly _createdAt: Date;
  @Exclude() private readonly _updatedAt: Date;

  constructor(
    user: User,
  ) {
    this._id = user.id;
    this._name = user.name;
    this._username = user.username;
    this._roles = user.roles;
    this._email = user.email;
    this._isAccountDisabled = user.isAccountDisabled;
    this._createdAt = user.createdAt;
    this._updatedAt = user.updatedAt;
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
  get username(): string {
    return this._username;
  }

  @Expose()
  @ApiProperty({ example: [ROLE.USER] })
  get roles(): ROLE[] {
    return this._roles;
  }

  @Expose()
  @ApiProperty()
  get email(): string {
    return this._email;
  }

  @Expose()
  @ApiProperty()
  get isAccountDisabled(): boolean {
    return this._isAccountDisabled;
  }

  @Expose()
  @ApiProperty()
  get createdAt(): Date {
    return this._createdAt;
  }

  @Expose()
  @ApiProperty()
  get updatedAt(): Date {
    return this._updatedAt;
  }
}
