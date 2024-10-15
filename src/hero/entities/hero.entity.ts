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

  @Column()
  job: Job; // 직업: "citizen" | "warrior" | "mage" | "theif"

  @Column()
  level: number; // 레벨

  @Column()
  experience: number; // 경험치

  @Column({ name: 'max_hp' })
  maxHp: number; // 최대 체력

  @Column({ name: 'current_hp' })
  currentHp: number; // 현재 체력

  @Column({ name: 'max_mp' })
  maxMp: number; // 최대 마나

  @Column({ name: 'current_mp' })
  currentMp: number; // 현재 마나
  
  @Column()
  strength: number; // 힘 (물리 공격력, 체력 관여)
  
  @Column()
  intelligence: number; // 지능 (마법 공격력, 마나 관여)
  
  @Column()
  dexterity: number; // 민첩 (회피율, 치명타율 관여)

  @Column()
  dodge: number; // 회피율

  @Column()
  critical: number; // 치명타율
  
  @Column()
  physicalAttack: number; // 물리 공격력

  @Column()
  magicalAttack: number; // 마법 공격력

  @Column()
  physicalDefense: number; // 물리 방어력

  @Column()
  magicalDefense: number; // 마법 방어력

  @Column()
  fatigue: number; // 피로도 (0 ~ 100) 0: 피로 없음, 100: 피로 최대 (피로도가 100이 되면 전투 불가)

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  // relations ==============================================

  @OneToOne(() => User, (user) => user.hero)
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
    hero.job = JOB.CITIZEN;
    hero.level = 1;
    hero.experience = 0;
    hero.maxHp = 100;
    hero.currentHp = 100;
    hero.maxMp = 100;
    hero.currentMp = 100;
    hero.strength = 10;
    hero.intelligence = 10;
    hero.dexterity = 10;
    hero.dodge = 0;
    hero.critical = 0;
    hero.physicalAttack = 10;
    hero.magicalAttack = 10;
    hero.physicalDefense = 0;
    hero.magicalDefense = 0;
    hero.fatigue = 0;
    hero.user = user;
    return hero;
  }

  /**
   * 다음 레벨까지 필요한 경험치
   */
  experienceToNextLevel(): number {
    return this.level * 100;
  }
}
