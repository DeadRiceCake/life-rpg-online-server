import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class Todo {
  @PrimaryGeneratedColumn()
  id: number; // PK

  @Column({ length: 50 })
  name: string; // 할 일 이름

  @Column({ length: 255, default: '' })
  description: string; // 할 일 설명

  @Column({ name: 'display_order' })
  displayOrder: number; // 표시 순서

  @Column({ name: 'is_done', default: false })
  isDone: boolean; // 완료 여부

  @CreateDateColumn({ name: 'created_at', nullable: true, type: 'timestamptz' })
  createdAt: Date;

  // methods ================================================

  abstract checkAuthority(heroId: string): void;
}
