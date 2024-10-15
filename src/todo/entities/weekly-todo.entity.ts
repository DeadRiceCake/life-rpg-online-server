import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Hero } from '../../hero/entities/hero.entity';
import { Day } from '../types/days.constant';
import { Todo } from './base-todo.entity';

@Entity('weekly_todos')
export class WeeklyTodo extends Todo {
  @Column({ name: 'days_to_repeat', type: 'simple-array' })
  daysToRepeat: Day[]; // 반복 요일

  @Column({ name: 'days_completed', type: 'simple-array' })
  daysCompleted: Day[]; // 완료한 요일
  
  // relations ==============================================

  @ManyToOne(() => Hero, (hero) => hero.weeklyTodos)
  @JoinColumn({ name: 'hero_id' })
  hero: Hero;

  // methods ================================================

  static of(
    name: string,
    description: string,
    displayOrder: number,
    daysToRepeat: Day[],
  ): WeeklyTodo {
    const dailyTodo = new WeeklyTodo();
    dailyTodo.name = name;
    dailyTodo.description = description;
    dailyTodo.displayOrder = displayOrder;
    dailyTodo.daysToRepeat = daysToRepeat;
    dailyTodo.daysCompleted = [];
    
    return dailyTodo;
  }
}
