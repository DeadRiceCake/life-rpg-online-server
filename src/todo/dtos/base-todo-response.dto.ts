import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

import { Todo } from '../entities/base-todo.entity';

export class BaseTodoResponse {
  @Exclude()
  @ApiProperty()
  private readonly _id: number;
  
  @Exclude()
  @ApiProperty()
  private readonly _name: string;

  @Exclude()
  @ApiProperty()
  private readonly _description: string;

  @Exclude()
  @ApiProperty()
  private readonly _displayOrder: number;

  @Exclude()
  @ApiProperty()
  private readonly _isDone: boolean;

  @Exclude()
  @ApiProperty()
  private readonly _createdAt: Date;
  
  constructor(
    todo: Todo
  ) {
    this._id = todo.id;
    this._name = todo.name;
    this._description = todo.description;
    this._displayOrder = todo.displayOrder;
    this._isDone = todo.isDone;
    this._createdAt = todo.createdAt;
  }

  @Expose()
  get id(): number {
    return this._id;
  }

  @Expose()
  get name(): string {
    return this._name;
  }

  @Expose()
  get description(): string {
    return this._description;
  }

  @Expose()
  get displayOrder(): number {
    return this._displayOrder;
  }

  @Expose()
  get isDone(): boolean {
    return this._isDone;
  }

  @Expose()
  get createdAt(): Date {
    return this._createdAt;
  }
}
