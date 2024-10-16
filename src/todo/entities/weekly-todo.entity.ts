import { ForbiddenException } from '@nestjs/common';
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
    const weeklyTodo = new WeeklyTodo();
    weeklyTodo.name = name;
    weeklyTodo.description = description;
    weeklyTodo.displayOrder = displayOrder;
    weeklyTodo.daysToRepeat = daysToRepeat;
    weeklyTodo.daysCompleted = [];
    
    return weeklyTodo;
  }

  checkAuthority(heroId: number): void {
    if (this.hero.id !== heroId) {
      throw new ForbiddenException('권한도 없는 주제에 건방지구나.');
    }
  }
}
