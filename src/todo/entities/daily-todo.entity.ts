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
}
