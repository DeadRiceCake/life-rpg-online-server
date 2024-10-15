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

  @Column({ length: 255 })
  description: string; // 할 일 설명

  @Column({ name: 'display_order' })
  displayOrder: number; // 표시 순서

  @Column({ default: false })
  isDone: boolean; // 완료 여부

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt: Date;
}
