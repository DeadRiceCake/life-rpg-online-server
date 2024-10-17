import { ForbiddenException } from '@nestjs/common';
import {
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Hero } from '../../hero/entities/hero.entity';
import { Todo } from './base-todo.entity';

@Entity('daily_todos', { orderBy: { displayOrder: 'ASC' } })
export class DailyTodo extends Todo {
  // relations ==============================================

  @ManyToOne(() => Hero, (hero) => hero.dailyTodos)
  @JoinColumn({ name: 'hero_id' })
  hero: Hero;

  // methods ================================================

  static of(name: string, description: string, displayOrder: number): DailyTodo {
    const dailyTodo = new DailyTodo();
    dailyTodo.name = name;
    dailyTodo.description = description;
    dailyTodo.displayOrder = displayOrder;
    return dailyTodo;
  }

  checkAuthority(heroId: number): void {
    if (this.hero.id !== heroId) {
      throw new ForbiddenException('권한도 없는 주제에 건방지구나.');
    }
  }

  done(): void {
    if (this.isDone) {
      return;
    }
    this.isDone = true;
    this.hero.doneDailyTodo();
  }
}
