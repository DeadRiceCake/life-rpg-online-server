import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import { Article } from '../../article/entities/article.entity';
import { ROLE } from '../../auth/constants/role.constant';
import { Hero } from '../../hero/entities/hero.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  password: string;

  @Unique('username', ['username'])
  @Column({ length: 200 })
  username: string;

  @Column('simple-array')
  roles: ROLE[];

  @Column()
  isAccountDisabled: boolean;

  @Unique('email', ['email'])
  @Column({ length: 200 })
  email: string;

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
