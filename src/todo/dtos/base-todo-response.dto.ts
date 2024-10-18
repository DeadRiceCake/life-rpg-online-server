import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

import { Todo } from '../entities/base-todo.entity';

export class BaseTodoResponse {
  @Exclude() private readonly _id: number;
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _description: string;
  @Exclude() private readonly _displayOrder: number;
  @Exclude() private readonly _isDone: boolean;
  @Exclude() private readonly _createdAt: Date;
  
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
  get description(): string {
    return this._description;
  }

  @Expose()
  @ApiProperty()
  get displayOrder(): number {
    return this._displayOrder;
  }

  @Expose()
  @ApiProperty()
  get isDone(): boolean {
    return this._isDone;
  }

  @Expose()
  @ApiProperty()
  get createdAt(): Date {
    return this._createdAt;
  }
}
