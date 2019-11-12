/** @format */

// Third Parties
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class TodosTodoEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  text: string;

  @Column()
  isDone: boolean;
}
