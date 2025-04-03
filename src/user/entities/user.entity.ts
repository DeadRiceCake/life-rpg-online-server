import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Article } from '../../article/entities/article.entity';
import { ROLE } from '../../auth/constants/role.constant';
import { Hero } from '../../hero/entities/hero.entity';
import { UserStatus } from '../types/user-status.type';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  joinBY: string;

  @Column({ default: null })
  password: string;

  @Column({ length: 200 })
  email: string;

  @Column({ length: 255 })
  snsKey: string;

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

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];

  @OneToOne(() => Hero, (hero) => hero.user, { nullable: true })
  hero: Hero;

  // methods ================================================

  static of(params: Partial<User>): User {
    const user = new User();
    Object.assign(user, params);
    return user;
  }
}
