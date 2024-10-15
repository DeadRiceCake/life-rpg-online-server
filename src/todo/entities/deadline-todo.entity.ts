import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Hero } from '../../hero/entities/hero.entity';
import { Todo } from './base-todo.entity';

@Entity('deadline_todos')
export class DeadlineTodo extends Todo {
  @Column({ type: 'timestamp' })
  deadline: Date; // 마감일
  
  // relations ==============================================

  @ManyToOne(() => Hero, (hero) => hero.deadlineTodos)
  @JoinColumn({ name: 'hero_id' })
  hero: Hero;

  // methods ================================================

  static of(
    name: string,
    description: string,
    displayOrder: number,
    deadline: Date,
  ): DeadlineTodo {
    const deadlineTodo = new DeadlineTodo();
    deadlineTodo.name = name;
    deadlineTodo.description = description;
    deadlineTodo.displayOrder = displayOrder;
    deadlineTodo.deadline = deadline;
    
    return deadlineTodo;
  }
}
