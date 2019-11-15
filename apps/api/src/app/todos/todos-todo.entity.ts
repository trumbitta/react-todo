/** @format */

// Third Parties
import { Entity, Column, PrimaryColumn, Generated } from 'typeorm';

@Entity()
export class TodosTodoEntity {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column()
  text: string;

  @Column()
  isDone: boolean;
}
