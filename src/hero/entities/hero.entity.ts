import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { DailyTodo } from '../../todo/entities/daily-todo.entity';
import { DeadlineTodo } from '../../todo/entities/deadline-todo.entity';
import { WeeklyTodo } from '../../todo/entities/weekly-todo.entity';
import { User } from '../../user/entities/user.entity';
import { JOB, Job } from '../constants/job.constant';


@Entity('heroes')
export class Hero {
  @PrimaryGeneratedColumn()
  id: number; // PK

  @Column({ length: 10 })
  name: string; // 영웅 이름

  @Column({ default: JOB.CITIZEN })
  job: Job; // 직업: "citizen" | "warrior" | "mage" | "theif"

  @Column({ default: 1 })
  level: number; // 레벨

  @Column({ default: 0 })
  experience: number; // 경험치

  @Column({ name: 'max_hp', default: 100 })
  maxHp: number; // 최대 체력

  @Column({ name: 'current_hp', default: 100 })
  currentHp: number; // 현재 체력

  @Column({ name: 'max_mp', default: 100 })
  maxMp: number; // 최대 마나

  @Column({ name: 'current_mp', default: 100 })
  currentMp: number; // 현재 마나
  
  @Column({ default: 10 })
  strength: number; // 힘 (물리 공격력, 체력 관여)
  
  @Column({ default: 10 })
  intelligence: number; // 지능 (마법 공격력, 마나 관여)
  
  @Column({ default: 10 })
  dexterity: number; // 민첩 (회피율, 치명타율 관여)

  @Column({ default: 0 })
  dodge: number; // 회피율

  @Column({ default: 0 })
  critical: number; // 치명타율
  
  @Column({ name: 'physical_attack', default: 10 })
  physicalAttack: number; // 물리 공격력

  @Column({ name: 'magical_attack', default: 10 })
  magicalAttack: number; // 마법 공격력

  @Column({ name: 'physical_defense', default: 0 })
  physicalDefense: number; // 물리 방어력

  @Column({ name: 'magical_defense', default: 0 })
  magicalDefense: number; // 마법 방어력

  @Column({ default: 0 })
  fatigue: number; // 피로도 (0 ~ 100) 0: 피로 없음, 100: 피로 최대 (피로도가 100이 되면 전투 불가)

  @Column({ name: 'max_daily_todo_reward', default: 10 })
  maxDailyTodoReward: number; // 일일 할 일 최대 보상

  @Column({ name: 'max_weekly_todo_reward', default: 3 })
  maxWeeklyTodoReward: number; // 주간 할 일 최대 보상

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  // relations ==============================================

  @OneToOne(() => User, (user) => user.hero, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => DailyTodo, (dailyTodo) => dailyTodo.hero)
  dailyTodos: DailyTodo[];

  @OneToMany(() => WeeklyTodo, (weeklyTodo) => weeklyTodo.hero)
  weeklyTodos: WeeklyTodo[];

  @OneToMany(() => DeadlineTodo, (deadlineTodo) => deadlineTodo.hero)
  deadlineTodos: DeadlineTodo[];

  // methods ================================================

  static of(name: string, user: User): Hero {
    const hero = new Hero();
    hero.name = name;
    hero.user = user;
    return hero;
  }

  /**
   * 다음 레벨까지 필요한 경험치
   */
  experienceToNextLevel(): number {
    return this.level * 100;
  }

  addDailyTodo(dailyTodo: DailyTodo): void {
    this.dailyTodos.push(dailyTodo);
  }
}
