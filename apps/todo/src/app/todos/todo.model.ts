/** @format */

export interface Todo {
  id: number;
  text: string;
  isDone: boolean;
}

export interface TodosMap {
  [id: number]: Todo;
}
