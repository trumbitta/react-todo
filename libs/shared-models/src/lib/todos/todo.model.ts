/** @format */

// App Models
import { DatabaseEntity } from '../database-entity';

export interface Todo extends DatabaseEntity {
  text: string;
  isDone?: boolean;
}

export const emptyTodo: Todo = {
  id: '',
  createdAt: null,
  isDone: false,
  text: '',
  updatedAt: null,
};
