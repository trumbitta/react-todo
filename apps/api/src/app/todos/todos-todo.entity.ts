/** @format */

// Third Parties
import {
  Entity,
  Column,
  PrimaryColumn,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TodosTodoEntity {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column()
  text: string;

  @Column()
  isDone: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
