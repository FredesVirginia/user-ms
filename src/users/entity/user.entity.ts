import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { TodoListState } from '../enums/enums';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  month: string;

  @Column({
    type: 'enum',
    enum: TodoListState,
    default: TodoListState.ASSIGNED,
  })
  state: TodoListState;

  @Column('text')
  content:  string;


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
