import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ROLE } from '../../auth/constants/role.constant';
import { Hero } from '../../hero/entities/hero.entity';
import { UserJoinType } from '../types/user-join.type';
import { UserStatus } from '../types/user-status.type';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 10 })
  joinBy: UserJoinType;

  @Column({ default: null })
  password: string;

  @Column({ length: 200 })
  email: string;

  @Column({ length: 255, nullable: true })
  snsKey?: string;

  @Column('simple-array')
  roles: ROLE[];

  @Column({ default: UserStatus.NORMAL})
  status: UserStatus;

  @Column({ default: null })
  lastLoginAt: Date;

  @CreateDateColumn({ name: 'created_at', nullable: true, type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true, type: 'timestamptz' })
  updatedAt: Date;

  // relations ==============================================

  @OneToOne(() => Hero, (hero) => hero.user, { nullable: true })
  hero: Hero;

  // methods ================================================

  static of(
    joinBy: UserJoinType, 
    password: string, 
    email: string, 
    snsKey: string | undefined, 
    status: UserStatus
  ): User {
    const user = new User();
    user.joinBy = joinBy;
    user.password = password;
    user.email = email;
    user.snsKey = snsKey;
    user.roles = [ROLE.USER];
    user.status = status;
    
    return user;
  }
}
