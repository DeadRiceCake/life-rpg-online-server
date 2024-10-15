import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { Todo } from '../entities/base-todo.entity';

export class BaseTodoResponse {
  @Expose()
  @ApiProperty()
  private readonly _id: number;
  
  @Expose()
  @ApiProperty()
  private readonly _name: string;

  @Expose()
  @ApiProperty()
  private readonly _description: string;

  @Expose()
  @ApiProperty()
  private readonly _displayOrder: number;

  @Expose()
  @ApiProperty()
  private readonly _isDone: boolean;

  @Expose()
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

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get displayOrder(): number {
    return this._displayOrder;
  }

  get isDone(): boolean {
    return this._isDone;
  }

  get createdAt(): Date {
    return this._createdAt;
  }
}
