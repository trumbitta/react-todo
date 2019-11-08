/** @format */

export interface Todo {
  id?: string;
  text: string;
  isDone?: boolean;
}

export interface TodosMap {
  [id: string]: Todo;
}
