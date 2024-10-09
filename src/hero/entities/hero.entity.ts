import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { Job } from '../constants/job.constant';


@Entity('heroes')
export class Hero {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  name: string;

  @Column()
  job: Job;

  @Column()
  level: number;

  @Column()
  experience: number;

  @Column()
  hp: number;

  @Column()
  mp: number;
  
  @Column()
  strength: number;
  
  @Column()
  intelligence: number;
  
  @Column()
  dexterity: number;

  @Column()
  dodge: number;

  @Column()
  critical: number;
  
  @Column()
  physicalAttack: number;

  @Column()
  magicalAttack: number;

  @Column()
  physicalDefense: number;

  @Column()
  magicalDefense: number;

  @Column()
  fatigue: number;

  @CreateDateColumn({ name: 'createdAt', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', nullable: true })
  updatedAt: Date;

  // relations ==============================================

  @OneToOne(() => User, (user) => user.hero)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // methods ================================================

  static createHero(name: string, job: Job, user: User): Hero {
    const hero = new Hero();
    hero.name = name;
    hero.job = job;
    hero.level = 1;
    hero.experience = 0;
    hero.hp = 100;
    hero.mp = 100;
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

  experienceToNextLevel(): number {
    return this.level * 100;
  }
}
