import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Hero } from '../../hero/entities/hero.entity';

@Entity('daily_todos')
export class DailyTodo {
  @PrimaryGeneratedColumn()
  id: number; // PK

  @Column({ length: 50 })
  name: string; // 할 일 이름

  @Column({ length: 255 })
  description: string; // 할 일 설명

  @Column({ name: 'display_order' })
  displayOrder: number; // 표시 순서

  @Column({ default: false })
  isDone: boolean; // 완료 여부

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt: Date;

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
