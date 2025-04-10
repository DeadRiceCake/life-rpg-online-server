import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AppearanceType } from '../types/appearance.type';


@Entity('appearance')
export class Appearance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: AppearanceType;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
