import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { EquipmentType } from '../types/equipment.type';
import { RarityType } from '../types/rarity.type';

@Entity('equipment')
export class Equipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: EquipmentType;

  @Column()
  name: string;

  @Column()
  rarity: RarityType;

  @Column()
  levelLimit: number;

  @Column()
  description: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
